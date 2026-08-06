// Does this loop actually loop?
//
//   npm run loop:seam -- out/web/eui-loop-route-v1.mp4 [...more]
//
// The gate for `website-panel-loop`. A `<video loop>` element wraps from the last frame
// straight to the first with no dissolve and no gap, so a cut that ends anywhere other
// than where it started shows a jump — silently, forever, in a media cell beside a
// paragraph somebody is reading. Nothing else in this repo catches it: the composition
// typechecks, the linter reads a clean AST, the render succeeds, and the artefact is
// still wrong.
//
// The measurement is the obvious one. The wrap is just another pair of adjacent frames,
// so it should not stand out from the pairs either side of it. Every adjacent pair in
// the loop is scored with the same luminance-grid difference `video-frames.mjs` uses for
// dead air, and the seam — last frame against first — is compared to that distribution.
//
// The threshold is the **median** step, not the largest. Comparing against the largest
// was tried first and is worthless: these surfaces change state instantly, so a source
// lighting up scores 10–27 on its own, and any loop containing one interaction would be
// handed a ceiling high enough to wave a real jump cut through. Measured on the two
// artefacts already in this repository:
//
//   out/web/eui-loop-*-v1.mp4     seam 0.07–0.11   median step 0.05   ← built to loop
//   out/playStore_promo3_30s.mp4  seam 11.41       median step 0.05   ← a cut, not a loop
//
// Three orders of magnitude apart, and the busiest-step rule passed both. So the rule is
// a multiple of the median with an absolute floor underneath it, and it has to keep
// telling those two files apart to still be a rule.

import {existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {decodePng, gridDifference, luminanceGrid} from './lib/png.mjs';

/** Same resolution as the other pixel gate: the grid is 64x36 regardless. */
const SAMPLE = '256:144';

/**
 * How many times the median interior step the seam may be.
 *
 * The median is what one frame of ordinary continuous motion costs — the gradient
 * drifting, a volume bar moving. Twenty times that is generous by two orders of
 * magnitude against the promo's 228x, and leaves room for a loop whose opening frame
 * carries some genuine movement rather than a held state.
 */
const MEDIAN_MULTIPLE = 20;

/**
 * Floor, for a loop quiet enough that its median rounds to nothing.
 *
 * Grid values are 0..255 luminance, so 1.0 is an average change of about 0.4% across the
 * frame. Below that there is nothing to see whatever the ratio says, and without a floor
 * a perfectly still loop would be held to an impossible standard by its own stillness.
 */
const ABSOLUTE_FLOOR = 1;

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

const percentile = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];

const checkLoop = (file, ffmpeg) => {
  if (!existsSync(file)) {
    console.error(`  ${file} — not found`);
    return false;
  }

  const workDir = mkdtempSync(join(tmpdir(), 'loop-seam-'));
  try {
    const extract = spawnSync(
      ffmpeg,
      ['-y', '-loglevel', 'error', '-i', file, '-vf', `scale=${SAMPLE}`, join(workDir, '%05d.png')],
      {encoding: 'utf8'},
    );
    if (extract.status !== 0) {
      console.error(`  ${file} — ffmpeg failed: ${extract.stderr?.trim() ?? extract.error}`);
      return false;
    }

    const frames = readdirSync(workDir)
      .filter((name) => name.endsWith('.png'))
      .sort()
      .map((name) => luminanceGrid(decodePng(join(workDir, name))));

    if (frames.length < 3) {
      console.error(`  ${file} — only ${frames.length} frames decoded`);
      return false;
    }

    const steps = [];
    for (let index = 1; index < frames.length; index += 1) {
      steps.push(gridDifference(frames[index - 1], frames[index]));
    }
    const seam = gridDifference(frames[frames.length - 1], frames[0]);

    const sorted = [...steps].sort((a, b) => a - b);
    const busiest = sorted[sorted.length - 1];
    const median = percentile(sorted, 0.5);
    const ceiling = Math.max(median * MEDIAN_MULTIPLE, ABSOLUTE_FLOOR);
    const ok = seam <= ceiling;

    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${file}\n` +
        `        ${frames.length} frames · seam ${seam.toFixed(2)} · ` +
        `median step ${median.toFixed(2)} · busiest step ${busiest.toFixed(2)} · ` +
        `ceiling ${ceiling.toFixed(2)} (${(seam / ceiling).toFixed(2)}x)`,
    );
    if (!ok) {
      console.log(
        `        The wrap costs ${(seam / Math.max(median, 0.001)).toFixed(0)}x an ` +
          `ordinary frame of motion, so it will read as a cut.\n` +
          `        Whatever moved between the first frame and the last has to come back ` +
          `— see\n        the header of src/marketing/web-loops/webLoopData.ts.`,
      );
    }
    return ok;
  } finally {
    rmSync(workDir, {recursive: true, force: true});
  }
};

const files = process.argv.slice(2).filter((argument) => !argument.startsWith('--'));
if (files.length === 0) {
  console.error('usage: npm run loop:seam -- <loop.mp4> [...more]');
  process.exit(2);
}

console.log('');
const ffmpeg = findFfmpeg();
const results = files.map((file) => checkLoop(file, ffmpeg));
const failed = results.filter((ok) => !ok).length;
console.log(`\n  ${files.length} loops · ${failed} failing\n`);
process.exit(failed > 0 ? 1 : 0);
