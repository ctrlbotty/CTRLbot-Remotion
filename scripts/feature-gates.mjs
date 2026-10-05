// The final task of a narrated walkthrough, as one command: every feature gate on both shapes,
// both renders, the landscape .srt and the voice check, run in a clean worktree at HEAD so
// nothing half-finished in any checkout reaches the cut. The deliverables are then copied
// into the main checkout's out/.
//
//   npm run video:feature -- <slug> --narration=<clips .ts> --clips=<EXPORT> --corrections=<EXPORT>
//                            [--destinations=<a,b>] [--steps=all|fast] [--base=<rev>]
//
//   W02: --narration=src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts
//        --clips=TERMINATOR_WALKTHROUGH_NARRATION_CLIPS --corrections=TERMINATOR_CAPTION_CORRECTIONS
//        --destinations=social-walkthrough,social-walkthrough-vertical
//   W03: --narration=src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts
//        --clips=IOT_PHONE_NARRATION_CLIPS --corrections=IOT_PHONE_CAPTION_CORRECTIONS
//   W04: --narration=src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts
//        --clips=IOT_TABLET_NARRATION_CLIPS --corrections=IOT_TABLET_CAPTION_CORRECTIONS
//
// --destinations defaults to social-walkthrough, the ceiling a cut over 2:20 needs.
// --steps=fast runs only check, lint and validate. Renders run one shape at a time. A failing
// step is reported and the run goes on, because one failed gate must not hide the others.
// A render already in out/ is kept once as `<name>.prev.mp4` before it is replaced. This does
// not mark a task done, archive a brief or publish anything: the results go in the brief.

import {copyFileSync, cpSync, existsSync, mkdirSync, renameSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {cleanWorktree, parseArgs, run} from './lib/worktree.mjs';

const {options, positional} = parseArgs(process.argv.slice(2));
const slug = positional[0];
const fast = options.steps === 'fast';
if (!slug || (!fast && (!options.narration || !options.clips || !options.corrections))) {
  console.error('usage: video:feature -- <slug> --narration=<clips .ts> --clips=<EXPORT> --corrections=<EXPORT> [--destinations=<a,b>] [--steps=all|fast]');
  process.exit(2);
}
const portrait = `${slug}-portrait`;
const destinations = String(options.destinations ?? 'social-walkthrough').split(',');
const narration = String(options.narration ?? '');
const generated = narration.replace(/\.ts$/, '.generated.ts');

const {main, path, rev} = cleanWorktree('render', options.base ?? 'HEAD');
const logs = join(path, 'out', `feature-${slug}`);
mkdirSync(logs, {recursive: true});
console.log(`render worktree at ${rev}`);

const results = [];
const step = (name, command, env = {}) => {
  const result = run(path, command, {env, log: join(logs, `${name}.log`)});
  results.push({name, ...result});
  console.log(`${name.padEnd(20)} ${result.status === 0 ? 'pass' : `EXIT ${result.status}`}  ${result.seconds}s`);
  return result;
};
const portraitEnv = {VIDEO_COMPOSITION: portrait};

step('check', 'npm run --silent check');
for (const destination of new Set(destinations)) step(`lint-${destination}`, `npm run --silent video:lint -- --destination=${destination}`);
step('validate', `npm run --silent video:frames -- ${slug} validate`);
if (!fast) {
  step('contact-landscape', `npm run --silent video:frames -- ${slug} contact`);
  step('contact-portrait', `npm run --silent video:frames -- ${slug} contact`, portraitEnv);
  step('render-landscape', `npm run --silent render -- ${slug} out/${slug}.mp4 --codec=h264 --crf=20`);
  step('render-portrait', `npm run --silent render -- ${portrait} out/${portrait}.mp4 --codec=h264 --crf=20`);
  step('frames-landscape', `npm run --silent video:frames -- ${slug} check out/${slug}.mp4`);
  step('frames-portrait', `npm run --silent video:frames -- ${slug} check out/${portrait}.mp4`, portraitEnv);
  step('narration-landscape', `npm run --silent narration:check -- out/${slug}.mp4`);
  step('narration-portrait', `npm run --silent narration:check -- out/${portrait}.mp4`);
  step('srt', `npm run --silent narration:srt -- ${narration} ${options.clips} ${slug} out/${slug}.srt --edit=${generated} --corrections=${options.corrections}`);
  step('verify', `npm run --silent narration:verify -- ${generated} out/${slug}.mp4`);
}

// The lines a review note needs, pulled out of the logs.
const pick = (name, pattern) => results.find((result) => result.name === name)?.output.split('\n').filter((line) => pattern.test(line)).map((line) => line.trim()) ?? [];
console.log('\nsummary');
for (const line of [
  ...pick('validate', /beats?,/),
  ...pick('frames-landscape', /inert|ERROR/).map((line) => `landscape: ${line}`),
  ...pick('frames-portrait', /inert|ERROR/).map((line) => `portrait: ${line}`),
  ...pick('narration-landscape', /Duration|loudness|True peak/),
  ...pick('srt', /captions/),
  ...pick('verify', /narration:verify:|FAIL \(/),
]) console.log(`  ${line}`);

if (fast) process.exit(results.every((result) => result.status === 0) ? 0 : 1);

// Deliverables back into the main checkout, keeping the previous render once.
const outMain = join(main, 'out');
for (const file of [`${slug}.mp4`, `${portrait}.mp4`, `${slug}.srt`]) {
  const source = join(path, 'out', file);
  if (!existsSync(source)) continue;
  const target = join(outMain, file);
  if (existsSync(target)) renameSync(target, target.replace(/(\.[a-z0-9]+)$/, '.prev$1'));
  copyFileSync(source, target);
}
for (const shape of [slug, portrait]) {
  const contact = join(path, 'out', shape);
  if (!existsSync(join(contact, 'contact.html'))) continue;
  rmSync(join(outMain, shape, 'contact'), {recursive: true, force: true});
  mkdirSync(join(outMain, shape), {recursive: true});
  cpSync(join(contact, 'contact'), join(outMain, shape, 'contact'), {recursive: true});
  copyFileSync(join(contact, 'contact.html'), join(outMain, shape, 'contact.html'));
}
cpSync(logs, join(outMain, 'coordinator', `feature-${slug}`), {recursive: true});
console.log(`\ndeliverables copied to ${outMain}; logs in out/coordinator/feature-${slug}/`);
process.exit(results.every((result) => result.status === 0) ? 0 : 1);
