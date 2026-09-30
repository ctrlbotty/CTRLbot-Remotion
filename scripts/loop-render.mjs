// Render the web loops the way they have to be rendered.
//
//   npm run loop:render                 every registered loop
//   npm run loop:render -- Route        just one (substring match on composition id)
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
 * leaves anyone who visited in the last four hours watching the old one. So bump only
 * what actually changed, and bump it here BEFORE rendering: the sync at the bottom
 * writes whatever name is in this array.
 *
 * `Web-Loop-Route`, `Web-Loop-Matrix` and `Web-Loop-Audio` are the single-beat wide cuts.
 * The site plays `Web-Loop-Full` instead, which contains all three, and lays the matrix
 * row out square; they are kept registered rather than deleted so the wide compositions
 * do not rot, but there is no need to spend a render on them.
 *
 * **`width`/`height` here is the ffmpeg downscale target and it has to match what
 * `Root.tsx` registers**, or pass two scales a 2x render to the wrong shape and delivers
 * a stretched file under a name the site already trusts. These three sat at 1920 for a
 * while after `WEB_LOOP.width` went to 1600 — harmless only because nothing rendered
 * them.
 */
const LOOPS = [
  {id: 'Web-Loop-Route', name: 'eui-loop-route-v5', width: 1600, height: 1200},
  {id: 'Web-Loop-Matrix', name: 'eui-loop-matrix-v6', width: 1600, height: 1200},
  {id: 'Web-Loop-Audio', name: 'eui-loop-audio-v4', width: 1600, height: 1200},
  {id: 'Web-Loop-Matrix-Square', name: 'eui-loop-matrix-sq-v6', width: 1200, height: 1200},
  {id: 'Web-Loop-App-Square', name: 'eui-loop-app-sq-v5', width: 1200, height: 1200},
  // v2 was the first 4:3 cut, at panelClose 980 — a 1612px panel in a 1600px frame, so
  // the bezel ran off both sides through the end of the matrix beat. v3 is 780/890.
  {id: 'Web-Loop-Full', name: 'eui-loop-full-v3', width: 1600, height: 1200},
  {id: 'Web-Loop-Ai', name: 'ai-loop-v2', width: 1600, height: 1200},
  // v2 gained `connect` and `terminal` and went 30s -> 34s. v3 slowed the whole cut to
  // 48s so the site's copy panel can be read, and gave the return its own block.
  // v4 was rendered at 1600x1200 while HubCell still pinned the camera's viewport to
  // 1920x1200, so it is the left 1600px of the wide frame, not a 4:3 shot. v5 is the
  // same cut with the camera reading the real frame: same shot widths, taller region.
  {id: 'hub-30', name: 'hub-30-v5', width: 1600, height: 1200},
  {id: 'hub-30-square', name: 'hub-30-sq-v1', width: 1200, height: 1200},
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
