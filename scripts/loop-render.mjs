// Render the web loops the way they have to be rendered.
//
//   npm run loop:render                 all four
//   npm run loop:render -- Route        just one
//
// Two passes, and the second one is not optional. Remotion renders the composition at
// **twice** its registered size, then ffmpeg scales it back down with lanczos.
//
// Why: the loops push in by scaling the whole panel, so the app surface inside is being
// resampled to a slightly different size on every single frame. At 1x that lands every
// glyph and every cell border on a fractional pixel boundary a frame at a time, and the
// interface crawls — most visibly on the square cut, which downscales the 1280dp surface
// furthest. Rendering at 2x and filtering down is ordinary supersampling and it is the
// only thing that fixes the cause rather than the symptom.
//
// Measured on Web-Loop-Matrix-Square, mean frame-to-frame change through the push:
//
//   1x, direct           2.473
//   2x, downsampled      1.708      -31%, and a smaller file
//
// Smaller, because most of what the encoder was spending bits on was the shimmer. That
// is also why the CRF here can stay where it is.

import {existsSync, mkdirSync, readdirSync, rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {join} from 'node:path';

const OUT = 'out/web';

/**
 * Composition id -> output basename. The site expects these exact filenames.
 *
 * The version is per-loop, not per-batch, because `/assets/*` on ctrlbot.io has no
 * content hash — only site.css and site.js are cache-busted. Replacing a file in place
 * leaves anyone who visited in the last four hours watching the old one. Route and the
 * two matrix cuts went to v3 when they were re-cut to open and close cold; audio did not
 * change and stays at v2, so its cached copies stay valid.
 */
const LOOPS = [
  {id: 'Web-Loop-Route', name: 'eui-loop-route-v3', width: 1920, height: 1200},
  {id: 'Web-Loop-Matrix', name: 'eui-loop-matrix-v3', width: 1920, height: 1200},
  {id: 'Web-Loop-Audio', name: 'eui-loop-audio-v2', width: 1920, height: 1200},
  {id: 'Web-Loop-Matrix-Square', name: 'eui-loop-matrix-sq-v3', width: 1200, height: 1200},
  {id: 'Web-Loop-App-Square', name: 'eui-loop-app-sq-v1', width: 1200, height: 1200},
];

const CRF = 23;

const findFfmpeg = () => {
  const base = 'node_modules/@remotion';
  const pack = existsSync(base)
    ? readdirSync(base).find((entry) => entry.startsWith('compositor-'))
    : null;
  const candidate = pack
    ? join(base, pack, process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg')
    : null;
  return candidate && existsSync(candidate) ? candidate : 'ffmpeg';
};

const run = (command, args) => {
  const result = spawnSync(command, args, {stdio: 'inherit', shell: process.platform === 'win32'});
  if (result.status !== 0) {
    console.error(`\n  failed: ${command} ${args.join(' ')}`);
    process.exit(result.status ?? 1);
  }
};

const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const selected = only.length
  ? LOOPS.filter((l) => only.some((o) => l.id.toLowerCase().includes(o.toLowerCase())))
  : LOOPS;

if (selected.length === 0) {
  console.error(`no loop matched. known: ${LOOPS.map((l) => l.id).join(', ')}`);
  process.exit(2);
}

mkdirSync(OUT, {recursive: true});
const ffmpeg = findFfmpeg();

for (const loop of selected) {
  const big = join(OUT, `${loop.name}.2x.mp4`);
  const final = join(OUT, `${loop.name}.mp4`);
  console.log(`\n  ${loop.id} -> ${final}  (via ${loop.width * 2}x${loop.height * 2})\n`);

  // Pass one: supersample. Kept cheap on the encoder — this file is an intermediate and
  // every bit of its quality is about to be resampled away.
  run('npx', [
    'remotion', 'render', 'src/index.ts', loop.id, big,
    '--codec=h264', '--crf=16', '--x264-preset=veryfast', '--muted', '--scale=2',
  ]);

  // Pass two: down to delivery size. lanczos over bicubic because it holds the fine
  // horizontal rules in the audio strip and the 1px cell borders without ringing them.
  run(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', big,
    '-vf', `scale=${loop.width}:${loop.height}:flags=lanczos`,
    '-c:v', 'libx264', '-crf', String(CRF), '-preset', 'slower', '-pix_fmt', 'yuv420p',
    '-an', final,
  ]);

  rmSync(big, {force: true});

  // The poster is the first frame of the delivered file, so it cannot disagree with it.
  const posterPng = join(OUT, `poster-${loop.name}.png`);
  const posterWebp = join(OUT, `poster-${loop.name}.webp`);
  run(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', final, '-frames:v', '1',
    posterPng,
  ]);
  run('python', [
    join('scripts', 'convert-webp.py'),
    posterPng,
    posterWebp,
  ]);

  // If the site repo is present next door, sync the assets across
  const siteLoops = join('..', '..', '2 - CTRLbot.io', 'ctrlbot-io-site', 'assets', 'loops');
  if (existsSync(siteLoops)) {
    const {copyFileSync} = await import('node:fs');
    copyFileSync(final, join(siteLoops, `${loop.name}.mp4`));
    if (existsSync(posterWebp)) {
      copyFileSync(posterWebp, join(siteLoops, `poster-${loop.name}.webp`));
    }
    console.log(`  -> synced ${loop.name}.mp4 and poster to ${siteLoops}`);
  }
}

console.log(`\n  ${selected.length} rendered. Run \`npm run loop:seam -- ${OUT}/*.mp4\` next.\n`);
