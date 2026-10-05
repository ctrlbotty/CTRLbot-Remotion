// Verify one task the way the coordinator did through the 2026-10-02 walkthrough run: in a
// clean worktree holding HEAD plus exactly the task's files, run the fast gates, render a
// still at each frame that matters — the cue frames, not the contact sheet's defaults — in
// both shapes, and tile each shape into one image to look at.
//
//   npm run verify:task -- <composition> --frames=<f1,f2,...> [--files=<a,b>] [--from=<checkout>]
//                          [--base=<rev>] [--tag=<name>]
//
// --files are repository-relative paths copied from --from (default: the checkout this runs
// in; give a lane's worktree when the work was done there). Without --files it verifies HEAD.
// The portrait composition, `<composition>-portrait`, is included when it is registered.
// Stills go to the verify worktree's out/verify/<tag>/. The tiles need an ffmpeg with filters
// on PATH — the one bundled with Remotion is built without them — and are skipped otherwise.
//
// A frame is seconds x 30. For a cue, read CUE_FRAMES in the video's data file, or the frame
// the worker reported, and look a few frames after it, once the action has landed.

import {copyFileSync, mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {join} from 'node:path';
import {checkoutRoot, cleanWorktree, copyInto, diffStat, parseArgs, run} from './lib/worktree.mjs';

const {options, positional} = parseArgs(process.argv.slice(2));
const composition = positional[0];
if (!composition || !options.frames) {
  console.error('usage: verify:task -- <composition> --frames=<f1,f2> [--files=<a,b>] [--from=<checkout>] [--base=<rev>] [--tag=<name>]');
  process.exit(2);
}
const frames = String(options.frames).split(',').map((frame) => Number(frame.trim())).filter(Number.isFinite);
const files = options.files ? String(options.files).split(',').map((file) => file.trim()).filter(Boolean) : [];
const from = options.from ? String(options.from) : checkoutRoot();
const tag = String(options.tag ?? composition);

const {path, rev} = cleanWorktree('verify', options.base ?? 'HEAD');
copyInto(from, path, files);
console.log(`verify worktree at ${rev} + ${files.length} file(s): ${diffStat(path)}`);

const check = run(path, 'npm run --silent check');
console.log(`check: ${check.status === 0 ? 'pass' : 'FAIL'} (${check.seconds}s)`);
if (check.status !== 0) console.log(check.output.split('\n').filter((line) => /error/i.test(line)).slice(0, 12).join('\n'));
const lint = run(path, 'npm run --silent video:lint');
console.log(`lint: ${(lint.output.match(/\d+ errors? · \d+ warnings?/) ?? ['see output'])[0]}${lint.status === 0 ? '' : ' — FAIL'}`);

const shapes = [composition];
if (check.output.includes(`${composition}-portrait `)) shapes.push(`${composition}-portrait`);

const outDirectory = join('out', 'verify', tag);
mkdirSync(join(path, outDirectory), {recursive: true});
const stills = {};
for (const shape of shapes) {
  stills[shape] = [];
  for (const frame of frames) {
    const file = join(outDirectory, `${shape}-${String(frame).padStart(5, '0')}.png`).replaceAll('\\', '/');
    const result = run(path, `npx remotion still src/index.ts ${shape} ${file} --frame=${frame}`);
    if (result.status === 0) stills[shape].push(join(path, file));
    else console.log(`still FAILED: ${shape} @ ${frame}`);
  }
}

// One image per shape: landscape as a grid three wide, portrait as a single row.
const ffmpegHasFilters = spawnSync('ffmpeg', ['-hide_banner', '-filters'], {encoding: 'utf8'}).stdout?.includes('xstack');
for (const [shape, images] of Object.entries(stills)) {
  if (images.length === 0) continue;
  const portrait = shape.endsWith('-portrait');
  const tile = join(path, outDirectory, portrait ? 'portrait.png' : 'landscape.png');
  if (images.length === 1) {
    copyFileSync(images[0], tile);
  } else if (ffmpegHasFilters) {
    const columns = portrait ? images.length : Math.min(3, images.length);
    const offset = (count, unit) => (count === 0 ? '0' : Array(count).fill(unit).join('+'));
    const layout = images.map((_, i) => `${offset(i % columns, 'w0')}_${offset(Math.floor(i / columns), 'h0')}`).join('|');
    const inputs = images.flatMap((image) => ['-i', image]);
    const labels = images.map((_, i) => `[${i}]`).join('');
    spawnSync('ffmpeg', ['-loglevel', 'error', '-y', ...inputs, '-filter_complex',
      `${labels}xstack=inputs=${images.length}:layout=${layout}:fill=black,scale=${portrait ? 2400 : 1920}:-1`, tile]);
  } else {
    console.log('tiles skipped: no ffmpeg with filters on PATH');
    break;
  }
  console.log(`${portrait ? 'portrait' : 'landscape'}: ${tile}`);
}
