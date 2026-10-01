// Plan a long cut's edit list into one sample-accurate track and a generated edit file.
//
//   npm run narration:edit -- <narration.ts> <CLIPS export> <ingest slug> --seconds=<cut length> [--out-dir=<dir>]

import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename, dirname, extname, join, relative, resolve} from 'node:path';
import ts from 'typescript';
import {clipTime, loadVoice, planClip, renderTrack, TUTORIAL_CAPS, wav} from './lib/voice.mjs';

const fail = (message) => {
  console.error(`narration:edit: ${message}`);
  process.exit(1);
};

const run = (binary, args, options = {}) =>
  spawnSync(binary, args, {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...options});

const ffmpeg = process.env.FFMPEG_FULL || 'ffmpeg';

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith('--'));
const [modulePath, exportName, slug] = positional;

const secondsArg = args.find((a) => a.startsWith('--seconds='));
const outDirArg = args.find((a) => a.startsWith('--out-dir='));

if (!modulePath || !exportName || !slug || !secondsArg) {
  console.error('usage: narration:edit -- <narration.ts> <CLIPS export> <ingest slug> --seconds=<cut length> [--out-dir=<dir>]');
  process.exit(2);
}

const totalSeconds = Number(secondsArg.slice('--seconds='.length));
if (isNaN(totalSeconds) || totalSeconds <= 0) {
  fail(`invalid --seconds value: ${secondsArg}`);
}

const outDir = outDirArg ? outDirArg.slice('--out-dir='.length) : null;

const load = async (path) => {
  const {outputText} = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};

const wordsPath = join('ingest', slug, 'captions.json');
const heardPath = join('ingest', slug, 'heard.json');

if (!existsSync(wordsPath)) {
  fail(`no ${wordsPath}. Run npm run ingest:recording for ${slug} first.`);
}

const mod = await load(modulePath);
const clips = mod[exportName];
if (!Array.isArray(clips) || clips.length === 0) {
  fail(`${modulePath} exports no clips named ${exportName}`);
}

// Check for overlapping source ranges
for (let i = 0; i < clips.length; i++) {
  for (let j = i + 1; j < clips.length; j++) {
    const a = clips[i];
    const b = clips[j];
    const overlap = Math.min(a.sourceEnd, b.sourceEnd) - Math.max(a.sourceStart, b.sourceStart);
    if (overlap > 0) {
      fail(`clips ${a.id} (${a.sourceStart}-${a.sourceEnd}s) and ${b.id} (${b.sourceStart}-${b.sourceEnd}s) have overlapping source ranges.`);
    }
  }
}

const defaultVoicePath = resolve('public', 'narration', slug, 'source-normalized.m4a');
const voicePath = existsSync(defaultVoicePath)
  ? defaultVoicePath
  : Object.values(mod).find((val) => typeof val === 'string' && val.startsWith('narration/'))
  ? resolve('public', Object.values(mod).find((val) => typeof val === 'string' && val.startsWith('narration/')))
  : defaultVoicePath;

if (!existsSync(voicePath)) {
  fail(`prepared narration track ${voicePath} does not exist. Run npm run ingest:recording for ${slug} first.`);
}

const voice = loadVoice(voicePath, ffmpeg);
const words = JSON.parse(readFileSync(wordsPath, 'utf8')).map((w) => ({
  text: w.text,
  start: w.startMs / 1000,
  end: w.endMs / 1000,
}));
const heard = existsSync(heardPath) ? JSON.parse(readFileSync(heardPath, 'utf8')) : null;

// Plan every clip with TUTORIAL_CAPS, using buildNarration's placement rule:
// A clip never starts later than its `at`; it starts earlier when its first sound begins
// before `sourceStart`, so the words stay where the entry put them.
const placed = clips.map((clip) => {
  let plan;
  try {
    plan = planClip(voice, words, heard, clip, {verbatim: clip.verbatim, caps: TUTORIAL_CAPS});
  } catch (error) {
    fail(`clip ${clip.id}: ${error.message}`);
  }
  return {clip, plan, at: Math.max(0, clip.at + Math.min(0, plan.start - clip.sourceStart))};
});

// Collision and boundary checks
placed.forEach(({clip, plan, at}, k) => {
  const next = placed[k + 1];
  if (next && at + plan.seconds > next.at - 0.05) {
    fail(`clip ${clip.id} runs to ${(at + plan.seconds).toFixed(2)}s, into ${next.clip.id} at ${next.at.toFixed(2)}s. Move ${next.clip.id}'s at.`);
  }
  if (at + plan.seconds > totalSeconds) {
    fail(`clip ${clip.id} runs to ${(at + plan.seconds).toFixed(2)}s, past --seconds=${totalSeconds}s.`);
  }
});

// Log one line per clip, naming what it removed
for (const {clip, plan, at} of placed) {
  const cut = plan.removed.map((r) => `${r.heard ? `"${r.heard}"` : 'a sound'} at ${r.from}s`);
  const shortened = plan.tightened.length ? `, ${plan.tightened.length} pause${plan.tightened.length > 1 ? 's' : ''} shortened` : '';
  console.log(
    `  voice ${clip.id.padEnd(14)} ${plan.start}-${plan.end}s -> ${at.toFixed(2)}s, ${plan.seconds.toFixed(2)}s` +
      `${cut.length ? `, removed ${cut.join(', ')}` : ''}${shortened}`,
  );
}

// Build captions in composition milliseconds
const captions = [];
for (const {plan, at} of placed) {
  for (const word of plan.words) {
    const from = clipTime(plan, at, word.start);
    const to = Math.max(from + 0.05, clipTime(plan, at, word.end));
    const previous = captions.at(-1);
    if (previous && /^[^\sA-Za-z0-9]/.test(word.text.trim()) && Math.round(from * 1000) - previous.endMs < 250) {
      previous.text += word.text.trim();
      previous.endMs = Math.round(to * 1000);
      previous.timestampMs = Math.round((previous.startMs + previous.endMs) / 2);
      continue;
    }
    captions.push({
      text: ` ${word.text.trim()}`,
      startMs: Math.round(from * 1000),
      endMs: Math.round(to * 1000),
      timestampMs: Math.round(((from + to) / 2) * 1000),
      confidence: null,
    });
  }
}

// Build cues: Record<clipId, {text, ms}[]>
const cues = {};
for (const {clip, plan, at} of placed) {
  cues[clip.id] = plan.words.map((word) => ({
    text: word.text.trim(),
    ms: Math.round(clipTime(plan, at, word.start) * 1000),
  }));
}

const exportedClips = placed.map(({clip, plan, at}) => ({
  id: clip.id,
  at: Math.round(at * 1000) / 1000,
  start: plan.start,
  end: plan.end,
  seconds: plan.seconds,
  removed: plan.removed,
}));

// Output paths
const base = basename(modulePath, extname(modulePath));
const outAudio = outDir ? join(outDir, 'edit.m4a') : resolve('public', 'narration', slug, 'edit.m4a');
const generatedFile = outDir
  ? join(outDir, `${base}.generated.ts`)
  : resolve(dirname(modulePath), `${base}.generated.ts`);
const publicSrc = `narration/${slug}/edit.m4a`;

// Loudness measurement and encode
const TARGET = 'I=-16:LRA=11:TP=-1.5';
const loudness = (path) => {
  const result = run(ffmpeg, ['-hide_banner', '-nostats', '-i', path, '-af', `loudnorm=${TARGET}:print_format=json`, '-f', 'null', '-']);
  const json = result.stderr.match(/\{\s*"input_i"[\s\S]*?\}/g)?.at(-1);
  if (result.status !== 0 || !json) fail(`could not measure the loudness of ${path}\n${result.stderr}`);
  return JSON.parse(json);
};

const scratch = join(tmpdir(), `narration-${slug}-${Date.now()}.wav`);
writeFileSync(scratch, wav(renderTrack(voice, placed, totalSeconds)));
const measured = loudness(scratch);

mkdirSync(dirname(outAudio), {recursive: true});
const encoded = run(ffmpeg, [
  '-hide_banner', '-loglevel', 'error', '-y', '-i', scratch,
  '-af',
  `loudnorm=${TARGET}:measured_I=${measured.input_i}:measured_LRA=${measured.input_lra}:measured_TP=${measured.input_tp}` +
    `:measured_thresh=${measured.input_thresh}:offset=${measured.target_offset}:linear=true`,
  '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '1', '-movflags', '+faststart', outAudio,
]);
rmSync(scratch, {force: true});
if (encoded.status !== 0 || !existsSync(outAudio)) fail(`could not write ${outAudio}\n${encoded.stderr}`);

// Write generated file
const relToShorts = relative(dirname(generatedFile), resolve('src/shorts/shortsData')).replace(/\\/g, '/');
const relImport = relToShorts.startsWith('.') ? relToShorts : `./${relToShorts}`;
const specificExport = exportName.replace(/_NARRATION_CLIPS$|_CLIPS$/, '_EDIT');

const generatedContent = `// Written by \`npm run narration:edit\`. Do not edit; change ${modulePath.replace(/\\/g, '/')} and rebuild.

import type {CaptionWord} from '${relImport}';

export type NarrationEditClip = {
  id: string;
  at: number;
  start: number;
  end: number;
  seconds: number;
  removed: Array<{from: number; to: number; kind: string; heard: string}>;
};

export type NarrationCue = {text: string; ms: number};

export type NarrationEdit = {
  src: string;
  seconds: number;
  clips: NarrationEditClip[];
  words: CaptionWord[];
  cues: Record<string, NarrationCue[]>;
};

export const NARRATION_EDIT: NarrationEdit = ${JSON.stringify(
  {
    src: publicSrc,
    seconds: totalSeconds,
    clips: exportedClips,
    words: captions,
    cues,
  },
  null,
  2,
)};
${specificExport !== 'NARRATION_EDIT' ? `\nexport const ${specificExport} = NARRATION_EDIT;\n` : ''}
`;

mkdirSync(dirname(generatedFile), {recursive: true});
writeFileSync(generatedFile, generatedContent);

console.log(`Wrote ${outAudio} and ${generatedFile}.`);
