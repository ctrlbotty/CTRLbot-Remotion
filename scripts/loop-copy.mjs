// The copy beside each web loop, handed to the site as data.
//
//   npm run loop:copy                     print it
//   npm run loop:copy -- <path/to.json>   write it
//
// The words next to a loop on ctrlbot.io are HTML, not video — that is the whole design.
// But *when* they change has to agree with what the panel is doing, and the panel's
// timings live in src/marketing/web-loops/webLoopData.ts. Retype them into the site repo
// and they are correct exactly once: the first retime desynchronises them silently, in a
// way no test in either repository can see.
//
// So the site reads this instead. Same trick `video-lint.mjs` uses on destinations.ts —
// transpile the .ts and import the result — so one definition serves the composition and
// the consumer without a build step or a hand-maintained mirror.
//
// `at` stays a fraction of the loop rather than becoming seconds. Seconds would bake in
// the current 10s length, and the length is a property of the destination, not of the
// copy. The site multiplies by the video's own duration.

import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
import ts from 'typescript';

const SOURCE = 'src/marketing/web-loops/webLoopData.ts';

/**
 * The data file imports from remotion and design/theme for the state helpers, neither of
 * which can be loaded here. Only the copy constant is wanted, so it is lifted out and
 * transpiled on its own rather than dragging a React runtime into a build script.
 */
const loadCopy = async () => {
  const source = readFileSync(SOURCE, 'utf8');
  const start = source.indexOf('export const LOOP_COPY');
  if (start === -1) throw new Error(`LOOP_COPY not found in ${SOURCE}`);

  // To the closing `};` of the object literal, which is the first line that is exactly
  // that at column zero after the declaration begins.
  const end = source.indexOf('\n};', start);
  if (end === -1) throw new Error(`could not find the end of LOOP_COPY in ${SOURCE}`);

  const declaration = source
    .slice(start, end + 3)
    .replace(/:\s*Record<string,\s*LoopBeat\[\]>/, '');

  const {outputText} = ts.transpileModule(declaration, {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  });

  return (await import(`data:text/javascript,${encodeURIComponent(outputText)}`)).LOOP_COPY;
};

const copy = await loadCopy();

// Sorted and validated, because the site walks these in order to decide which block is
// current. An out-of-order or out-of-range `at` would silently show the wrong words.
for (const [id, beats] of Object.entries(copy)) {
  let previous = -1;
  for (const beat of beats) {
    if (typeof beat.at !== 'number' || beat.at < 0 || beat.at >= 1) {
      throw new Error(`${id}: beat "at" must be in [0, 1) — got ${beat.at}`);
    }
    if (beat.at <= previous) throw new Error(`${id}: beats must be ordered by "at"`);
    previous = beat.at;
  }
  if (beats[0]?.at !== 0) throw new Error(`${id}: the first beat must start at 0`);
}

const payload = JSON.stringify(copy, null, 2) + '\n';
const target = process.argv[2];

if (target) {
  mkdirSync(dirname(target), {recursive: true});
  writeFileSync(target, payload, 'utf8');
  const count = Object.values(copy).reduce((total, beats) => total + beats.length, 0);
  console.log(`  ${Object.keys(copy).length} loops · ${count} beats -> ${target}`);
} else {
  process.stdout.write(payload);
}
