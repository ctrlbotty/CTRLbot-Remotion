// The anti-slop gate.
//
// docs/AUTHORING.md already contains every rule that made the First-Run cut good. It is
// prose, so it is advisory, so the Master Control promo ignored all of it and rendered
// anyway. This file is the same rules with an exit code.
//
// Two severities, deliberately. `error` blocks; it is reserved for things that are
// objectively wrong — a slideshow with no camera, one block pasted ten times, a colour
// the app does not define. `warn` prints and moves on; taste stays with the human. The
// goal is a cut in the right ballpark that is never slop, not a cut nobody may touch.
//
// Calibrated against two cuts already in this repository: it must fail
// compositions/MasterControlPromo.tsx and pass compositions/FirstRun.tsx with every
// scene clean. If a new rule cannot tell those apart it is not a rule yet.
//
//   npm run video:lint                    every scene and composition
//   npm run video:lint -- --report        measurements, no verdict — for calibration
//   npm run video:lint -- --destination=play-store-preview

import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';
import {
  attrNumber,
  attrText,
  callsNamed,
  jsxElements,
  lineOf,
  parse,
  staticStyleHash,
  styleObjects,
  tagOf,
  ts,
  walk,
} from './lib/tsx-scan.mjs';

const SCOPE = ['src/scenes', 'src/compositions', 'src/marketing'];

/**
 * The worked failure, kept and unregistered — see docs/VIDEO_WORKFLOW.md.
 *
 * It is excluded from ordinary runs for one reason: a gate whose exit code is always 1
 * is not a gate. Nothing can key off it, and people stop reading the output. It is not
 * forgotten, though — `--selftest` lints it on purpose and fails if the rules have
 * stopped catching it, so a rule cannot be quietly weakened into uselessness.
 */
const FIXTURE = 'src/compositions/MasterControlPromo.tsx';
const FIXTURE_MUST_FAIL = ['no-static-slideshow', 'no-duplicate-styles', 'no-device-bezel'];

/** Elements that put a picture on screen rather than building one. */
const IMAGE_TAGS = new Set(['CanvasImage', 'Img', 'Video', 'OffthreadVideo', 'Image']);

/**
 * Screenshots of surfaces this repo can rebuild live.
 *
 * Using one as a full-frame subject is the single decision that turned the promo into a
 * slideshow: a captured surface cannot be pushed into, cannot change state mid-shot, and
 * arrives with its own device bezel and drop shadow already baked in — which the app
 * repo's capture hygiene rules forbid outright.
 */
const SURFACE_SCREENSHOT_DIRS = ['marketing/eui/'];

/** Components that carry viewer-facing copy. */
const COPY_TAGS = new Set(['Callout', 'StageCopy']);
const COPY_PROPS = ['eyebrow', 'title', 'body', 'headline', 'subhead', 'kicker', 'footnote'];

/**
 * Words per second the reading gate allows. Measured, not chosen.
 *
 * `--report` prints the effective rate of every copy block in the approved First-Run
 * cut. On 2026-08-02 the tightest beat there ran at 9.3 w/s — 22 words in 91 frames,
 * EuiHandoff's press-and-hold callout — and the owner considers that cut good.
 *
 * So a style-guide number like 3.5 w/s would fail almost the entire signed-off cut,
 * which would make the gate wrong rather than strict. `ERROR` sits well above the
 * measured maximum and catches only copy nobody could read; `WARN` sits just above it,
 * so anything tighter than the tightest thing ever shipped gets mentioned without
 * blocking. Re-run `--report` and revisit these if the house pace changes.
 *
 * A higher rate is more permissive: it assumes the viewer reads faster, so fewer frames
 * are required.
 */
const READING_RATE_ERROR = 12;
const READING_RATE_WARN = 9.5;
const DEFAULT_FPS = 30;
/** Frames a line needs beyond reading time, to enter and settle before it is read. */
const SETTLE_FRAMES = 20;

const args = process.argv.slice(2);
const reportOnly = args.includes('--report');
const destinationId = args.find((a) => a.startsWith('--destination='))?.split('=')[1];

const findings = [];
const report = [];
const add = (severity, rule, file, line, message) =>
  findings.push({severity, rule, file, line, message});

/**
 * Every .tsx under the scoped directories, recursively.
 *
 * Recursive on purpose: a flat read would mean the first person to group scenes into
 * `src/marketing/promo/` silently dropped every one of them out of the gate, and the
 * gate would keep reporting success. That is the same failure mode as an ffmpeg filter
 * that does not exist — the check does not run, and nobody is told.
 */
const sourceFiles = () => {
  const found = [];
  const walkDirectory = (directory) => {
    if (!existsSync(directory)) return;
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) {
        walkDirectory(path);
      } else if (entry.endsWith('.tsx') && path.split(/[\\/]/).join('/') !== FIXTURE) {
        found.push(path);
      }
    }
  };
  for (const directory of SCOPE) walkDirectory(directory);
  return found.sort();
};

/**
 * The destination profiles, transpiled and imported straight from the .tsx-facing
 * source. One definition serves the compositions and this script, so a banned phrase can
 * never drift from the frame size it belongs to.
 */
const loadDestinations = async () => {
  const source = readFileSync('src/destinations.ts', 'utf8');
  const {outputText} = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  });
  const url = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
  return import(url);
};

/** Every colour the app actually defines, lowercased, for `theme-colors-only`. */
const tokenColors = () => {
  const source = readFileSync('src/design/tokens.generated.ts', 'utf8');
  return new Set((source.match(/#[0-9a-fA-F]{6}\b/g) ?? []).map((hex) => hex.toLowerCase()));
};

/**
 * Walk up to the nearest enclosing `<Sequence>` and read its duration.
 *
 * The parent chain holds `JsxElement` nodes, not the `JsxOpeningElement` that carries
 * the attributes — so a paired `<Sequence>…</Sequence>` has to be unwrapped to its
 * opening tag before anything can be read off it.
 */
const SEQUENCE_TAGS = new Set(['Sequence', 'TransitionSeries.Sequence']);

const enclosingSequenceFrames = (node) => {
  for (let current = node.parent; current; current = current.parent) {
    const opening = ts.isJsxElement(current)
      ? current.openingElement
      : ts.isJsxSelfClosingElement(current)
        ? current
        : null;
    if (opening && SEQUENCE_TAGS.has(tagOf(opening))) {
      return attrNumber(opening, 'durationInFrames');
    }
  }
  return null;
};

const words = (text) => text.trim().split(/\s+/).filter(Boolean).length;

// ── rules ────────────────────────────────────────────────────────────────────────────

const lintFile = (file, {colors, destination}) => {
  const source = parse(file);
  const elements = jsxElements(source);
  const tags = elements.map(tagOf);

  // no-static-slideshow — pictures with nothing moving over them.
  // Three, not one: a brand card legitimately places a wordmark, and the difference
  // between that and a slideshow is how much of the cut is carried by flat images.
  const imageCount = tags.filter((tag) => IMAGE_TAGS.has(tag)).length;
  const hasCamera = tags.includes('Camera') || tags.includes('Stage');
  if (imageCount >= 3 && !hasCamera) {
    add('error', 'no-static-slideshow', file, 1,
      `${imageCount} flat images and no <Camera> or <Stage>. This is a slideshow — ` +
      `render the surface live from src/app-ui/ and move a camera over it.`);
  }

  // no-duplicate-styles — one block, pasted.
  const styleCounts = new Map();
  for (const {element, object} of styleObjects(source)) {
    const hash = staticStyleHash(object);
    if (!hash) continue;
    if (!styleCounts.has(hash)) styleCounts.set(hash, []);
    styleCounts.get(hash).push(element);
  }
  for (const [, group] of styleCounts) {
    if (group.length >= 3) {
      add('error', 'no-duplicate-styles', file, lineOf(source, group[0]),
        `the same ${group.length} static style blocks appear at lines ` +
        `${group.map((element) => lineOf(source, element)).join(', ')}. ` +
        `Extract a component and pass what differs as props.`);
    }
  }

  // no-device-bezel + orphan-asset — what staticFile() is pointed at.
  for (const call of callsNamed(source, 'staticFile')) {
    const [argument] = call.arguments;
    if (!argument || !ts.isStringLiteral(argument)) continue;
    const assetPath = argument.text;
    if (SURFACE_SCREENSHOT_DIRS.some((directory) => assetPath.startsWith(directory))) {
      add('error', 'no-device-bezel', file, lineOf(source, call),
        `"${assetPath}" is a screenshot of a surface this repo rebuilds live. ` +
        `It cannot be pushed into or change state, and it carries a baked-in bezel.`);
    }
    if (!existsSync(join('public', assetPath))) {
      add('error', 'orphan-asset', file, lineOf(source, call),
        `"${assetPath}" does not exist under public/.`);
    }
  }

  // clamped-interpolate — an unclamped interpolate keeps moving past its own range.
  for (const call of callsNamed(source, 'interpolate')) {
    const options = call.arguments[3];
    const text = options ? options.getText() : '';
    if (!text.includes("extrapolateLeft: 'clamp'") || !text.includes("extrapolateRight: 'clamp'")) {
      add('error', 'clamped-interpolate', file, lineOf(source, call),
        `interpolate() without both extrapolateLeft and extrapolateRight: 'clamp'.`);
    }
  }

  // theme-colors-only — a colour the app does not define.
  walk(source, (node) => {
    if (!ts.isStringLiteral(node) && !ts.isJsxText(node)) return;
    for (const hex of node.getText().match(/#[0-9a-fA-F]{6}\b/g) ?? []) {
      if (!colors.has(hex.toLowerCase())) {
        add('error', 'theme-colors-only', file, lineOf(source, node),
          `${hex} is not a colour the app defines. Use src/design/theme.ts.`);
      }
    }
  });

  // no-spring-camera — a springing camera reads as a wobble, not a push-in.
  for (const element of elements) {
    if (tagOf(element) !== 'Camera' && tagOf(element) !== 'Stage') continue;
    const shots = element.attributes.properties.find(
      (property) => ts.isJsxAttribute(property) && property.name?.getText() === 'shots',
    );
    if (shots && shots.getText().includes('Easing.spring')) {
      add('error', 'no-spring-camera', file, lineOf(source, element),
        `Easing.spring in a camera path. Springs overshoot; a camera must not wobble.`);
    }
  }

  // ── copy ───────────────────────────────────────────────────────────────────────────
  for (const element of elements) {
    if (!COPY_TAGS.has(tagOf(element))) continue;
    const line = lineOf(source, element);
    const texts = COPY_PROPS.map((property) => attrText(element, property)).filter(Boolean);
    if (texts.length === 0) continue;
    const copy = texts.join(' ');
    const wordCount = words(copy);
    const frames = enclosingSequenceFrames(element);

    if (frames) {
      const effectiveRate = wordCount / ((frames - SETTLE_FRAMES) / DEFAULT_FPS);
      report.push({file, line, words: wordCount, frames, rate: effectiveRate});
      const framesFor = (rate) => Math.ceil((wordCount / rate) * DEFAULT_FPS) + SETTLE_FRAMES;
      if (frames < framesFor(READING_RATE_ERROR)) {
        add('error', 'reading-time', file, line,
          `${wordCount} words on screen for ${frames} frames — ${effectiveRate.toFixed(1)} w/s ` +
          `is past the ${READING_RATE_ERROR} w/s ceiling. Needs ${framesFor(READING_RATE_ERROR)}.`);
      } else if (frames < framesFor(READING_RATE_WARN)) {
        add('warn', 'reading-time', file, line,
          `${effectiveRate.toFixed(1)} w/s is tighter than anything in the approved cut ` +
          `(${READING_RATE_WARN} w/s). ${framesFor(READING_RATE_WARN)} frames would be comfortable.`);
      }
    }

    for (const {pattern, why} of destination?.banned ?? []) {
      if (pattern.test(copy)) {
        add('error', 'banned-phrases', file, line, `${why}. Found in: "${copy.slice(0, 60)}…"`);
      }
    }
    if (/\bendpoint\b/i.test(copy)) {
      add('error', 'no-deferred-features', file, line,
        `EndPoint switching is deferred and hidden in the build; do not teach it.`);
    }
    if (/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(copy) && !/\b(?:10|127|192\.168|172\.(?:1[6-9]|2\d|3[01]))\./.test(copy)) {
      add('error', 'no-secrets', file, line, `a routable IP address appears in copy.`);
    }

    const title = attrText(element, 'title') ?? attrText(element, 'headline');
    if (title && title.length > 40) {
      add('warn', 'copy-length', file, line,
        `title is ${title.length} characters; keep it under 40.`);
    }
  }
};

// ── run ──────────────────────────────────────────────────────────────────────────────

const {DESTINATIONS} = await loadDestinations();
const destination = destinationId ? DESTINATIONS[destinationId] : null;
if (destinationId && !destination) {
  console.error(`Unknown destination "${destinationId}". Known: ${Object.keys(DESTINATIONS).join(', ')}`);
  process.exit(2);
}

const colors = tokenColors();
const files = sourceFiles();
for (const file of files) lintFile(file, {colors, destination});

// --selftest: prove the gate still works, against the two cuts that defined it.
//
// The rules were calibrated to separate one known-bad composition from one known-good
// one. That calibration rots silently — a rule loosened to unblock some future video
// would still exit 0 everywhere and nobody would notice the gate had stopped gating.
// This asserts both halves out loud.
if (args.includes('--selftest')) {
  const clean = findings.filter((finding) => finding.severity === 'error');
  findings.length = 0;
  lintFile(FIXTURE, {colors, destination});
  const caught = new Set(findings.filter((f) => f.severity === 'error').map((f) => f.rule));

  const missed = FIXTURE_MUST_FAIL.filter((rule) => !caught.has(rule));
  console.log(`\n  selftest\n`);
  console.log(`  ${FIXTURE}`);
  for (const rule of FIXTURE_MUST_FAIL) {
    console.log(`    ${caught.has(rule) ? 'caught ' : 'MISSED '} ${rule}`);
  }
  console.log(`\n  ${files.length} production files: ${clean.length} errors (expected 0)`);

  if (missed.length || clean.length) {
    console.log(
      `\n  FAIL — ${missed.length ? `the fixture is no longer caught by ${missed.join(', ')}. ` : ''}` +
      `${clean.length ? 'production files have errors. ' : ''}` +
      `Do not weaken a rule to unblock a video; fix the video.\n`,
    );
    process.exit(1);
  }
  console.log(`\n  PASS — the gate still separates the two reference cuts.\n`);
  process.exit(0);
}

if (reportOnly) {
  console.log(`\n  copy timing across ${report.length} blocks in ${files.length} files\n`);
  for (const row of report.sort((a, b) => b.rate - a.rate)) {
    console.log(
      `  ${row.rate.toFixed(1).padStart(5)} w/s   ${String(row.words).padStart(3)} words  ` +
      `${String(row.frames).padStart(4)} frames   ${relative('.', row.file)}:${row.line}`,
    );
  }
  const fastest = Math.max(...report.map((row) => row.rate));
  console.log(`\n  fastest block: ${fastest.toFixed(1)} w/s — the reading gate must sit above this.\n`);
  process.exit(0);
}

const errors = findings.filter((finding) => finding.severity === 'error');
const warnings = findings.filter((finding) => finding.severity === 'warn');

for (const finding of [...errors, ...warnings]) {
  const label = finding.severity === 'error' ? 'ERROR' : ' warn';
  console.log(`  ${label}  ${relative('.', finding.file)}:${finding.line}  [${finding.rule}]\n         ${finding.message}`);
}

console.log(
  `\n  ${files.length} files · ${errors.length} error${errors.length === 1 ? '' : 's'} · ` +
  `${warnings.length} warning${warnings.length === 1 ? '' : 's'}` +
  (destination ? ` · destination ${destination.id}` : '') + '\n',
);

process.exit(errors.length > 0 ? 1 : 0);
