// The gates that need pixels.
//
// video-lint.mjs reads the source; this reads what the source actually rendered. A
// composition can typecheck, register, render, and still be a static logo holding for
// four seconds inside a black band — none of which is visible in an AST.
//
//   npm run video:frames -- <slug> contact              a still per beat, plus one sheet
//   npm run video:frames -- <slug> contact --beat=route just that beat, for tuning
//   npm run video:frames -- <slug> check out/promo.mp4  dead air and bars
//   npm run video:frames -- <slug> validate             brief arithmetic only, no render
//
// A long video is rendered in two shapes from one brief. VIDEO_COMPOSITION names the
// other one, and its stills and samples then go under out/<that composition>/ rather than
// over the first shape's:
//
//   VIDEO_COMPOSITION=mirror-walkthrough-portrait npm run video:frames -- mirror-walkthrough contact
//
// ffmpeg comes from the Remotion compositor already in node_modules — no new dependency,
// and no assumption about what is on PATH.

import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {join} from 'node:path';
import ts from 'typescript';
import {readBrief, stillFrameFor, validateBrief} from './lib/brief.mjs';
import {contentBox, decodePng, gridDifference, luminanceGrid} from './lib/png.mjs';

const [slug, command = 'contact', ...rest] = process.argv.slice(2);
const only = rest.find((argument) => argument.startsWith('--beat='))?.split('=')[1];
const videoArgument = rest.find((argument) => !argument.startsWith('--'));

if (!slug) {
  console.error('usage: video:frames -- <slug> [contact|check|validate] [--beat=<id>]');
  process.exit(2);
}

const findFfmpeg = () => {
  const base = 'node_modules/@remotion';
  const pack = existsSync(base)
    ? readdirSync(base).find((entry) => entry.startsWith('compositor-'))
    : null;
  const candidate = pack ? join(base, pack, process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg') : null;
  if (candidate && existsSync(candidate)) return candidate;
  return 'ffmpeg'; // fall back to PATH, and let it fail loudly if absent
};
const ffmpeg = findFfmpeg();
// The `bin` entry, not `dist/index.js` — that is the library entry, and running it
// exits 0 having rendered nothing. Which is precisely why the check below is on the
// file existing, not on the exit code.
const REMOTION_CLI = 'node_modules/@remotion/cli/remotion-cli.js';

const loadDestinations = async () => {
  const {outputText} = ts.transpileModule(readFileSync('src/destinations.ts', 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};

const brief = readBrief(slug);
const compositionOverride = process.env.VIDEO_COMPOSITION;
const outName = compositionOverride ?? slug;
const {DESTINATIONS} = await loadDestinations();
const destination = brief.destination ? DESTINATIONS[brief.destination] : null;
const fps = destination?.frame.fps ?? 30;

// Same two severities as video-lint.mjs: `problems` block, `warnings` are said once and
// left to the human at the contact sheet.
const problems = [];
const warnings = [];

// ── validate ─────────────────────────────────────────────────────────────────────────

if (brief.destination && !destination) {
  problems.push(`unknown destination "${brief.destination}"`);
}
problems.push(...validateBrief(brief, destination));

if (command === 'validate') {
  report();
}

// ── contact ──────────────────────────────────────────────────────────────────────────

if (command === 'contact') {
  const outputDirectory = `out/${outName}/contact`;
  mkdirSync(outputDirectory, {recursive: true});
  const compositionId = compositionOverride ?? brief.id;

  // The poster frame.
  //
  // Every other still is sampled 62% into its beat, where the payoff is. Nothing looked
  // at frame 0 — and frame 0 is what an autoplay listing shows as a still before anyone
  // presses play, so it is the single most-seen frame in the cut. The first version of
  // this promo opened mid-camera-move and its poster frame was a cropped grey fragment
  // in a black field. Nobody could have caught that from a contact sheet that starts at
  // 62% of beat one.
  const beats = only
    ? brief.beats.filter((beat) => beat.id === only)
    : [{id: 'poster', claim: 'The frame shown before anyone presses play',
        evidence: 'legible and composed on its own, with no camera move part-way through',
        seconds: 0, startSeconds: 0}, ...brief.beats];
  if (beats.length === 0) problems.push(`no beat named "${only}"`);

  for (const beat of beats) {
    const frame = stillFrameFor(beat, fps);
    const file = join(outputDirectory, `${beat.id}.png`);
    // Run the CLI's own entry point with this Node, rather than going through npx.
    // Node 22 refuses to spawn a .cmd without a shell, and dropping to a shell would
    // put this repository's path — which contains spaces — through Windows quoting.
    // Neither problem exists if the JS is invoked directly.
    const result = spawnSync(
      process.execPath,
      [REMOTION_CLI, 'still', 'src/index.ts', compositionId, file, `--frame=${frame}`],
      {stdio: 'inherit'},
    );
    // Existence, not exit status. A renderer that succeeds without producing a file is
    // not a hypothetical: pointing this at the wrong entry point did exactly that, and
    // the contact sheet reported seven happy beats over an empty directory.
    if (result.status !== 0 || !existsSync(file)) {
      problems.push(
        `beat "${beat.id}" produced no still at frame ${frame}` +
        (result.error ? ` — ${result.error.message}` : ''),
      );
      continue;
    }
    console.log(`  ${beat.id.padEnd(12)} frame ${String(frame).padStart(5)}  ${file}`);
    console.log(`     must show: ${beat.evidence}`);
  }

  // One sheet beats twenty files when a person is reviewing.
  //
  // HTML rather than a tiled image, and not only because ffmpeg's `tile` filter is
  // absent from the bundled build: the review question is "does this frame show its
  // evidence", so the evidence line belongs next to the frame it is being judged
  // against. A tiled PNG cannot carry it.
  if (!only && beats.length > 1) {
    const sheet = `out/${outName}/contact.html`;
    const cards = beats
      .map(
        (beat) => `
    <figure>
      <img src="contact/${beat.id}.png" alt="${beat.id}">
      <figcaption>
        <b>${beat.id}</b> — frame ${stillFrameFor(beat, fps)}
        <span>${beat.claim}</span>
        <em>must show: ${beat.evidence}</em>
      </figcaption>
    </figure>`,
      )
      .join('');

    writeFileSync(
      sheet,
      `<!doctype html><meta charset="utf-8"><title>${outName} — contact sheet</title>
<style>
  body{background:#111;color:#eee;font:14px/1.5 system-ui,sans-serif;margin:32px}
  h1{font-size:18px;font-weight:600}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:24px}
  figure{margin:0}
  img{width:100%;display:block;border-radius:6px;background:#000}
  figcaption{padding-top:8px}
  figcaption span,figcaption em{display:block}
  figcaption span{color:#bbb}
  figcaption em{color:#008FD4;font-style:normal}
</style>
<h1>${outName} — ${beats.length} beats, ${brief.totalSeconds}s</h1>
<p>Judge each frame against its evidence line. Anything that fails becomes a task.</p>
<div class="grid">${cards}
</div>
`,
      'utf8',
    );
    console.log(`\n  contact sheet: ${sheet}`);
  }
}

// ── check ────────────────────────────────────────────────────────────────────────────

if (command === 'check') {
  if (!videoArgument || !existsSync(videoArgument)) {
    console.error(`  pass a rendered file: video:frames -- ${slug} check out/${slug}.mp4`);
    process.exit(2);
  }

  const sampleDirectory = `out/${outName}/samples`;
  mkdirSync(sampleDirectory, {recursive: true});

  // Sample rather than decode every frame: four a second is fine for spotting a shot
  // that is not doing anything, and it keeps a 30s check to a few seconds.
  const step = 0.25;
  const duration = brief.totalSeconds;
  const samples = [];

  for (let at = 0; at < duration; at += step) {
    const file = join(sampleDirectory, `${at.toFixed(2)}.png`);
    // `-ss` before `-i` seeks by keyframe and is fast; `-update 1` is what lets image2
    // write a single file rather than demanding a %03d pattern.
    const result = spawnSync(
      ffmpeg,
      ['-y', '-ss', at.toFixed(2), '-i', videoArgument, '-frames:v', '1', '-update', '1', file],
      {encoding: 'utf8'},
    );
    // Fail loudly. A gate that cannot run must not report success.
    if (result.status !== 0 || !existsSync(file)) {
      problems.push(
        `could not extract a frame at ${at.toFixed(2)}s — the frame gates did not run.\n` +
        `         ${(result.stderr ?? '').trim().split('\n').at(-1) ?? 'no output'}`,
      );
      break;
    }
    samples.push({at, image: decodePng(file)});
  }

  if (samples.length > 1) {
    const grids = samples.map((sample) => luminanceGrid(sample.image));

    /**
     * Both of these thresholds are measured against the two cuts in `out/`, not chosen.
     * Sampling both at 0.25s on 2026-08-02 gave:
     *
     *                              promo (bad)   First-Run tablet (good)
     *   inert intervals               72%              48%
     *   longest inert run            2.75s            4.25s
     *   median content area           0.71             0.96
     *
     * The longest-run number is why this is not a "dead air" check. The approved cut
     * holds *longer* than the slop does — AUTHORING.md requires a hold before and after
     * every camera move, so a run of still frames is the house style, and a gate on run
     * length would have failed the cut that is already signed off while passing the one
     * we are trying to prevent. What actually separates them is how much of the whole
     * cut is inert.
     *
     * Content area uses the median for the same reason: the worst single frame is
     * always a fade through black, which is legitimate on both.
     */
    const NOTICEABLE = 0.6;      // mean luminance change that counts as something happening
    const MAX_INERT_FRACTION = destination?.maxInertFraction ?? 0.6;
    const MIN_CONTENT_AREA = 0.85;

    let inert = 0;
    for (let index = 1; index < grids.length; index += 1) {
      if (gridDifference(grids[index - 1], grids[index]) <= NOTICEABLE) inert += 1;
    }
    const inertFraction = inert / (grids.length - 1);
    if (inertFraction > MAX_INERT_FRACTION) {
      problems.push(
        `${(inertFraction * 100).toFixed(0)}% of this cut shows no perceptible change ` +
        `(ceiling ${MAX_INERT_FRACTION * 100}%). Holding a shot is fine; holding most of ` +
        `them is a slideshow. Give the shots something to do, or cut them shorter.`,
      );
    }

    // Does the cut open composed, or part-way through a move?
    //
    // Play shows frame 0 as a still before anyone presses play, so it is the most-seen
    // frame in the cut. The first version of this promo opened on a 0.62 camera shot
    // that pulled back over 74 frames, and its poster frame was a cropped grey fragment
    // in a black field.
    //
    // Measuring how *full* frame 0 is does not catch that — a crop of a dense UI is
    // still dense. What catches it is comparing frame 0 to where the opening beat
    // settles: if the two differ, the cut is animating through its own poster frame. A
    // fade up from black trips this too, and should — black is a bad poster.
    const openingBeat = brief.beats[0];
    const settledAt = Math.min(
      grids.length - 1,
      Math.round(openingBeat.seconds * 0.62 / step),
    );
    const openingDrift = gridDifference(grids[0], grids[settledAt]);
    const OPENS_COMPOSED = 8;

    if (openingDrift > OPENS_COMPOSED) {
      problems.push(
        `the cut opens part-way through a move — frame 0 differs from where beat ` +
        `"${openingBeat.id}" settles by ${openingDrift.toFixed(1)} (limit ${OPENS_COMPOSED}). ` +
        `Play shows frame 0 as a still, so compose it; do not animate into it.`,
      );
    }

    const areas = samples.map((sample) => contentBox(sample.image).area).sort((a, b) => a - b);
    const medianArea = areas[Math.floor(areas.length / 2)];
    if (medianArea < MIN_CONTENT_AREA) {
      // A warning, not a failure, and measurement is why. Across three cuts this scored
      // 0.71 for the promo, 0.80 for the approved phone cut and 0.97 for the approved
      // tablet cut — so the honest margin between "has bars" and "is a dark portrait UI"
      // is about four points, which is not enough to block a build on. CTRLbot is a
      // black-on-black product: large areas of the frame are legitimately near-zero
      // luminance, and this metric cannot tell that from empty. Worth saying out loud,
      // not worth stopping for. The contact sheet is where a person settles it.
      warnings.push(
        `content typically fills ${(medianArea * 100).toFixed(0)}% of the frame ` +
        `(${MIN_CONTENT_AREA * 100}% is the comfortable floor). Check the contact sheet ` +
        `for bars — on a dark UI this can also just be black by design.`,
      );
    }

    console.log(
      `  ${samples.length} frames sampled from ${videoArgument} ` +
      `against ${destination?.id ?? 'no destination'}\n` +
      `  ${(inertFraction * 100).toFixed(0)}% inert · median content area ` +
      `${(medianArea * 100).toFixed(0)}%`,
    );
  }
}

report();

function report() {
  console.log('');
  for (const problem of problems) console.log(`  ERROR  ${problem}`);
  for (const warning of warnings) console.log(`   warn  ${warning}`);

  if (problems.length === 0) {
    console.log(
      `\n  ${slug}: ${brief.beats.length} beats, ${brief.totalSeconds}s — no problems` +
      (warnings.length ? `, ${warnings.length} warning${warnings.length === 1 ? '' : 's'}` : '') +
      '\n',
    );
    process.exit(0);
  }
  console.log(
    `\n  ${problems.length} problem${problems.length === 1 ? '' : 's'}` +
    (warnings.length ? `, ${warnings.length} warning${warnings.length === 1 ? '' : 's'}` : '') +
    '\n',
  );
  process.exit(1);
}
