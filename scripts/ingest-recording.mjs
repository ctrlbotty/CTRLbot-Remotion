// Turn a narrated screen recording into the material a motion graphic is built from.
//
//   npm run ingest:recording -- <slug> <recording> [--model=medium.en] [--device=auto|cuda|cpu]
//                                                  [--skip=narration,transcript,heard,frames]
//                                                  [--force] [--dry-run]
//   npm run ingest:recording -- --list
//
// One recording in, one folder out:
//
//   public/narration/<slug>/source-normalized.m4a   the polished voice track Remotion plays
//   ingest/<slug>/words.json                         every word, and when it was said
//   ingest/<slug>/transcript.md                      the index; DRAFT until corrected by hand
//   ingest/<slug>/captions.json                      Remotion Caption[] for burned-in captions
//   ingest/<slug>/heard.json                         every sound, ums and repeats included,
//                                                    which the narration edit cuts out
//   ingest/<slug>/frames/ + frames.json              a still at every screen change
//   ingest/<slug>/contact.html                       those stills beside what was being said
//   ingest/<slug>/ingest.json                        what was ingested, from what, and how
//
// The recording is never modified. An output that already exists is reused rather than
// replaced, because two of them are expensive (the transcript) or hand-corrected
// (transcript.md). --force replaces them all.
//
// The slug names the recording, not a cut: one recording can feed a walkthrough, a short
// and a website loop, and each of their briefs points back at the same ingest/<slug>/.

import {existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {basename, join, relative, resolve} from 'node:path';

const INPUT_DIR = 'video input';
const INGEST_DIR = 'ingest';
const NARRATION_DIR = 'public/narration';

// Frame selection for screen recordings. A UI change is discrete and usually small (a
// dialog, a row, a tab), so the scene threshold sits far below a film cut's 0.3. The gap
// keeps a scroll from producing a frame per tick; the floor guarantees a still for a
// screen that holds while the speaker talks over it.
//
// Measured on the Terminator recording (8:39, 10fps, 1460x1080), counting changes at
// least 3s apart: 0.05 found 17, 0.02 found 28, 0.01 found 37, 0.005 found 49. At 0.05
// the 20s floor supplied most of the stills, which is a clock, not a contact sheet.
const SCENE = 0.01;
const MIN_GAP = 3;
const MAX_GAP = 20;

// "Control Bot" is how the name is said and CTRLbot is how it is written. Nothing past
// that is corrected automatically: whether "CTRLbot AI" means CTRLbot.AI or the in-app
// assistant is a judgement for the hand-correction pass, not a regex.
const NAME_RULES = [
  {match: ['control', 'bot'], name: 'CTRLbot'},
  {match: ['ctrl', 'bot'], name: 'CTRLbot'},
  {match: ['controlbot'], name: 'CTRLbot'},
  {match: ['ctrlbot'], name: 'CTRLbot'},
];

const usage = `Ingest a narrated screen recording

  npm run ingest:recording -- <slug> <recording> [options]
  npm run ingest:recording -- --list

<recording> is a path, or a file name inside "${INPUT_DIR}/".

Options:
  --model=medium.en              faster-whisper model (default medium.en)
  --device=auto|cuda|cpu         auto tries the GPU, then falls back to the CPU
  --skip=narration,transcript,heard,frames
  --force                        replace outputs that already exist
  --dry-run                      validate and show the plan without writing

Example:
  npm run ingest:recording -- mirror-walkthrough "CTRLbot Mirror Tutorial.mp4"`;

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const posix = (path) => relative(process.cwd(), path).split('\\').join('/');

const bundled = (name) => {
  const override = process.env[name === 'ffmpeg' ? 'FFMPEG_PATH' : 'FFPROBE_PATH'];
  if (override) return resolve(override);
  const base = resolve('node_modules/@remotion');
  if (existsSync(base)) {
    const platform = readdirSync(base).find((entry) => entry.startsWith('compositor-'));
    const exe = process.platform === 'win32' ? `${name}.exe` : name;
    const path = platform ? resolve(base, platform, exe) : null;
    if (path && existsSync(path)) return path;
  }
  return name;
};

const ffprobe = bundled('ffprobe');
const python = process.env.PYTHON || 'python';

const run = (binary, args, options = {}) =>
  spawnSync(binary, args, {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...options});

// The ffmpeg Remotion bundles is built with --disable-filters and a short allowlist that
// does not include select or showinfo, so scene detection needs a full build: FFMPEG_FULL
// if set, otherwise whatever ffmpeg is on PATH, provided it actually has both filters.
let fullFfmpeg;
const findFullFfmpeg = () => {
  if (fullFfmpeg !== undefined) return fullFfmpeg;
  fullFfmpeg = null;
  for (const candidate of [process.env.FFMPEG_FULL, 'ffmpeg'].filter(Boolean)) {
    const result = run(candidate, ['-hide_banner', '-filters']);
    if (result.status === 0 && / select /.test(result.stdout) && / showinfo /.test(result.stdout)) {
      fullFfmpeg = candidate;
      break;
    }
  }
  return fullFfmpeg;
};

const probe = (path) => {
  const result = run(ffprobe, [
    '-v', 'error',
    '-show_entries',
    'format=duration:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels',
    '-of', 'json',
    path,
  ]);
  if (result.error) fail(`Could not run ${ffprobe}: ${result.error.message}`);
  if (result.status !== 0) fail(`ffprobe could not read ${path}\n${result.stderr.trim()}`);
  const data = JSON.parse(result.stdout);
  const video = data.streams?.find((s) => s.codec_type === 'video');
  const audio = data.streams?.find((s) => s.codec_type === 'audio');
  const [num, den] = String(video?.r_frame_rate ?? '0/1').split('/').map(Number);
  return {
    duration: Number.parseFloat(data.format?.duration ?? '0'),
    video: video
      ? `${video.codec_name} ${video.width}x${video.height} ${den ? Math.round((num / den) * 100) / 100 : '?'}fps`
      : null,
    audio: audio
      ? `${audio.codec_name} ${audio.sample_rate} Hz ${audio.channels === 1 ? 'mono' : `${audio.channels} ch`}`
      : null,
  };
};

const clock = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, '0')}`;
};
const minutes = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;
const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const bare = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

const normalizeWords = (words) => {
  const out = [];
  for (let i = 0; i < words.length; ) {
    const rule = NAME_RULES.find((r) =>
      r.match.every((token, k) => words[i + k] && bare(words[i + k].text) === token),
    );
    if (!rule) {
      out.push(words[i]);
      i += 1;
      continue;
    }
    const span = words.slice(i, i + rule.match.length);
    const lead = span[0].text.match(/^\s*/)[0];
    const trail = span.at(-1).text.match(/[^A-Za-z0-9]*$/)[0];
    out.push({
      text: `${lead}${rule.name}${trail}`,
      start: span[0].start,
      end: span.at(-1).end,
      p: Math.min(...span.map((w) => w.p ?? 1)),
    });
    i += rule.match.length;
  }
  return out;
};

const parseArgs = (argv) => {
  const flags = {};
  const positional = [];
  for (const arg of argv) {
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }
    const [key, value] = arg.slice(2).split('=');
    flags[key] = value ?? true;
  }
  return {flags, positional};
};

// --list -------------------------------------------------------------------------------

const ingested = () => {
  const bySource = new Map();
  if (!existsSync(INGEST_DIR)) return bySource;
  for (const slug of readdirSync(INGEST_DIR)) {
    const manifest = join(INGEST_DIR, slug, 'ingest.json');
    if (!existsSync(manifest)) continue;
    try {
      const data = JSON.parse(readFileSync(manifest, 'utf8'));
      const transcript = join(INGEST_DIR, slug, 'transcript.md');
      const draft = existsSync(transcript) && /Status: DRAFT/.test(readFileSync(transcript, 'utf8'));
      bySource.set(basename(data.source.path), {slug, draft});
    } catch {
      // A malformed manifest is reported by the next ingest of that slug.
    }
  }
  return bySource;
};

const list = () => {
  if (!existsSync(INPUT_DIR)) fail(`No "${INPUT_DIR}/" folder in ${process.cwd()}`);
  const done = ingested();
  const files = readdirSync(INPUT_DIR).filter((f) => /\.(mp4|mov|mkv|webm)$/i.test(f));
  console.log(`Recordings in ${INPUT_DIR}/:`);
  if (!files.length) console.log('  (none)');
  for (const file of files) {
    const path = join(INPUT_DIR, file);
    const size = `${Math.round(statSync(path).size / 1e6)} MB`;
    const length = minutes(probe(path).duration);
    const state = done.get(file);
    const note = state
      ? `${INGEST_DIR}/${state.slug}/ (transcript ${state.draft ? 'DRAFT' : 'corrected'})`
      : 'not ingested';
    console.log(`  ${file.padEnd(40)} ${length.padStart(6)}  ${size.padStart(7)}  ${note}`);
  }
  const archive = join(INPUT_DIR, 'archive');
  if (existsSync(archive)) {
    const archived = readdirSync(archive).filter((f) => /\.(mp4|mov|mkv|webm)$/i.test(f));
    console.log(`\n${archived.length} more in ${INPUT_DIR}/archive/.`);
  }
};

// Steps --------------------------------------------------------------------------------

const prepareNarration = (slug, source, force) => {
  const args = ['scripts/narration.mjs', 'prepare', slug, source];
  if (force) args.push('--force');
  const result = spawnSync(process.execPath, args, {stdio: 'inherit'});
  if (result.status !== 0) fail('Narration preparation failed; nothing after it was run.');
};

/** Run a Whisper script on the GPU, or on the CPU when asked to or when the GPU fails. */
const whisper = (script, label, audio, output, model, device) => {
  const attempt = (dev) =>
    spawnSync(python, [script, audio, output, '--model', model, '--device', dev], {stdio: 'inherit'});
  if (device === 'cpu' || device === 'cuda') {
    if (attempt(device).status !== 0) fail(`${label} failed on ${device}.`);
    return;
  }
  if (attempt('cuda').status === 0) return;
  console.log(`  ${label} failed on the GPU; retrying on the CPU (slower, same model).`);
  if (attempt('cpu').status !== 0) fail(`${label} failed on both the GPU and the CPU.`);
};

const transcribe = (audio, output, model, device) =>
  whisper('scripts/lib/transcribe.py', 'Transcription', audio, output, model, device);

// Whisper writes what was meant; heard.py writes what was said, so the narration edit
// (scripts/lib/voice.mjs) can find the ums, repeats and false starts to take out.
const hear = (audio, output, model, device) =>
  whisper('scripts/lib/heard.py', 'Listening for fillers', audio, output, model, device);

const writeTranscript = (path, {slug, sourceRel, info, narrationRel, words}) => {
  const title = basename(sourceRel).replace(/\.[^.]+$/, '');
  const rows = words.segments.map((segment) => {
    const text = normalizeWords(segment.words).map((w) => w.text).join('').trim() || segment.text;
    return `| ${clock(segment.start)} | ${text.replace(/\|/g, '\\|')} |`;
  });
  const media = [info.video, info.audio].filter(Boolean).join(', ');
  writeFileSync(
    path,
    `# ${title}: transcript

**Status: DRAFT.** Machine transcript from \`${words.tool}\` \`${words.model}\`, not yet
checked against the recording. Correct it by hand against the frames in
\`${INGEST_DIR}/${slug}/contact.html\`, then change this line to \`Status: corrected <date>\`.
Once corrected it is the script of record, and a re-run of \`npm run ingest:recording\`
leaves it alone unless given \`--force\`.

- Source: \`${sourceRel}\` (${minutes(info.duration)}, ${media})
- Narration: \`${narrationRel}\`
- Word timings: \`${INGEST_DIR}/${slug}/words.json\`, in seconds on the narration track, which
  shares the recording's time base. Cut a narration edit list straight from them.

"Control Bot" is written **CTRLbot**. Product names past that, and anything misheard, are
corrected by hand. Filler and false starts stay: this is an index into what was said, not
a polished read.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
${rows.join('\n')}
`,
  );
};

const writeCaptions = (path, words) => {
  const captions = normalizeWords(words.segments.flatMap((s) => s.words)).map((w) => ({
    text: /^\s/.test(w.text) ? w.text : ` ${w.text}`,
    startMs: Math.round(w.start * 1000),
    endMs: Math.round(w.end * 1000),
    timestampMs: Math.round(((w.start + w.end) / 2) * 1000),
    confidence: w.p ?? null,
  }));
  writeFileSync(path, `${JSON.stringify(captions, null, 1)}\n`);
  return captions.length;
};

const extractFrames = (source, dir) => {
  const ffmpeg = findFullFfmpeg();
  if (!ffmpeg) {
    console.warn(
      '  Skipped frames: no ffmpeg with the select and showinfo filters. Install a full build\n' +
        '  (winget install Gyan.FFmpeg) or point FFMPEG_FULL at one.',
    );
    return null;
  }
  rmSync(dir, {recursive: true, force: true});
  mkdirSync(dir, {recursive: true});
  const select =
    `select='isnan(prev_selected_t)+gte(t-prev_selected_t,${MAX_GAP})` +
    `+gt(scene,${SCENE})*gte(t-prev_selected_t,${MIN_GAP})'`;
  const result = run(ffmpeg, [
    '-hide_banner', '-nostats',
    '-i', source,
    '-vf', `${select},showinfo,scale=640:-2`,
    '-fps_mode', 'vfr',
    '-q:v', '4',
    join(dir, 'f_%04d.jpg'),
  ]);
  if (result.status !== 0) fail(`Frame extraction failed:\n${result.stderr.split('\n').slice(-12).join('\n')}`);
  const times = [...result.stderr.matchAll(/Parsed_showinfo[^\n]*?pts_time:\s*([\d.]+)/g)].map((m) =>
    Number.parseFloat(m[1]),
  );
  const files = readdirSync(dir).filter((f) => f.endsWith('.jpg')).sort();
  if (!files.length) fail('Frame extraction wrote no files. Verify the artifact, not the exit code.');
  const frames = files.map((file, i) => ({file: `frames/${file}`, time: Math.round((times[i] ?? 0) * 100) / 100}));
  return {ffmpeg, frames};
};

const writeContact = (path, {slug, sourceRel, info, frames, words}) => {
  const all = words ? normalizeWords(words.segments.flatMap((s) => s.words)) : [];
  const cards = frames.map((frame, i) => {
    const until = frames[i + 1]?.time ?? Infinity;
    const said = all.filter((w) => w.start >= frame.time && w.start < until);
    const text = said.slice(0, 60).map((w) => w.text).join('').trim() + (said.length > 60 ? ' …' : '');
    return `<figure><a href="${frame.file}"><img src="${frame.file}" loading="lazy" alt=""></a>` +
      `<figcaption><div class="t">${clock(frame.time)} · ${frame.time.toFixed(1)}s</div>` +
      `<div class="s">${escapeHtml(text)}</div></figcaption></figure>`;
  });
  writeFileSync(
    path,
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(slug)}: contact sheet</title>
<style>
body{margin:0;background:#0b0d10;color:#e6e6e6;font:14px/1.45 system-ui,sans-serif}
header{padding:14px 20px;border-bottom:1px solid #23272e;position:sticky;top:0;background:#0b0d10}
header a{color:#8ab4f8}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:14px;padding:20px}
figure{margin:0;background:#15181d;border:1px solid #23272e;border-radius:6px;overflow:hidden}
img{display:block;width:100%;height:auto}
figcaption{padding:8px 10px 10px}
.t{font:12px/1 ui-monospace,Consolas,monospace;color:#8ab4f8}
.s{margin-top:6px}
.s:empty::before{content:"(no speech while this screen is up)";color:#666}
</style></head><body>
<header><strong>${escapeHtml(basename(sourceRel))}</strong> · ${minutes(info.duration)} ·
${frames.length} screens · text under each still is what was said while it was up ·
<a href="transcript.md">transcript.md</a></header>
<main>
${cards.join('\n')}
</main></body></html>
`,
  );
};

// Main ---------------------------------------------------------------------------------

const ingest = (argv) => {
  const {flags, positional} = parseArgs(argv);
  if (positional.length !== 2) {
    console.log(usage);
    process.exit(1);
  }
  const [slug, recording] = positional;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(`Slug must be lowercase kebab-case: ${slug}`);

  const candidates = [resolve(recording), resolve(INPUT_DIR, recording)];
  const source = candidates.find((p) => existsSync(p) && statSync(p).isFile());
  if (!source) fail(`Recording not found: ${recording}\nRun npm run ingest:recording -- --list to see "${INPUT_DIR}/".`);

  const force = Boolean(flags.force);
  const dry = Boolean(flags['dry-run']);
  const skip = new Set(String(flags.skip ?? '').split(',').filter(Boolean));
  const model = typeof flags.model === 'string' ? flags.model : 'medium.en';
  const device = typeof flags.device === 'string' ? flags.device : 'auto';
  if (!['auto', 'cuda', 'cpu'].includes(device)) fail(`--device must be auto, cuda or cpu, not ${device}`);

  const dir = resolve(INGEST_DIR, slug);
  const narration = resolve(NARRATION_DIR, slug, 'source-normalized.m4a');
  const out = {
    words: join(dir, 'words.json'),
    transcript: join(dir, 'transcript.md'),
    captions: join(dir, 'captions.json'),
    heard: join(dir, 'heard.json'),
    frames: join(dir, 'frames'),
    framesJson: join(dir, 'frames.json'),
    contact: join(dir, 'contact.html'),
    manifest: join(dir, 'ingest.json'),
  };

  const info = probe(source);
  if (!info.audio) fail(`No audio stream in ${source}. A narrated recording needs its voice.`);
  const sourceRel = posix(source);
  const stat = statSync(source);

  const plan = (label, path, skipKey) => {
    if (skip.has(skipKey)) return 'skip';
    if (existsSync(path) && !force) return 'reuse';
    return 'create';
  };
  const steps = {
    narration: plan('narration', narration, 'narration'),
    words: plan('words', out.words, 'transcript'),
    transcript: plan('transcript', out.transcript, 'transcript'),
    captions: plan('captions', out.captions, 'transcript'),
    heard: plan('heard', out.heard, 'heard'),
    frames: skip.has('frames')
      ? 'skip'
      : existsSync(out.framesJson) && !force
        ? 'reuse'
        : 'create',
  };

  console.log(`Recording: ${sourceRel}`);
  console.log(`  ${minutes(info.duration)}, ${info.video ?? 'no video'}, ${info.audio}`);
  console.log(`Output:    ${posix(dir)}/`);
  for (const [step, state] of Object.entries(steps)) console.log(`  ${step.padEnd(11)} ${state}`);

  if (steps.words === 'create' || steps.heard === 'create') {
    const check = run(python, ['-c', 'import faster_whisper, onnxruntime']);
    if (check.status !== 0) {
      fail(`faster-whisper and onnxruntime are not both importable by "${python}". pip install faster-whisper, or set PYTHON.`);
    }
  }
  if (steps.frames === 'create' && !findFullFfmpeg()) {
    console.warn('  Frames will be skipped: no ffmpeg with the select and showinfo filters on PATH.');
  }
  if (dry) {
    console.log('Dry run passed. Nothing was written.');
    return;
  }

  mkdirSync(dir, {recursive: true});

  if (steps.narration === 'create') {
    console.log('\nPreparing narration...');
    prepareNarration(slug, source, force);
  }
  if (!existsSync(narration) && steps.words === 'create') {
    fail(`The transcript is cut from ${posix(narration)}, which does not exist. Drop --skip=narration.`);
  }

  if (steps.words === 'create') {
    console.log(`\nTranscribing with ${model}...`);
    transcribe(posix(narration), out.words, model, device);
  }
  const words = existsSync(out.words) ? JSON.parse(readFileSync(out.words, 'utf8')) : null;

  if (words && steps.transcript === 'create') {
    writeTranscript(out.transcript, {slug, sourceRel, info, narrationRel: posix(narration), words});
    console.log(`  wrote ${posix(out.transcript)} (DRAFT)`);
  }
  let captionCount = null;
  if (words && steps.captions === 'create') {
    captionCount = writeCaptions(out.captions, words);
    console.log(`  wrote ${posix(out.captions)} (${captionCount} words)`);
  }

  if (steps.heard === 'create') {
    if (!existsSync(narration)) fail(`Listening needs ${posix(narration)}, which does not exist. Drop --skip=narration.`);
    console.log('\nListening for ums, repeats and false starts...');
    hear(posix(narration), out.heard, model, device);
  }
  const heard = existsSync(out.heard) ? JSON.parse(readFileSync(out.heard, 'utf8')) : null;

  let frames = existsSync(out.framesJson) ? JSON.parse(readFileSync(out.framesJson, 'utf8')) : null;
  let ffmpegUsed = null;
  if (steps.frames === 'create') {
    console.log('\nExtracting a still at every screen change...');
    const extracted = extractFrames(source, out.frames);
    if (extracted) {
      frames = extracted.frames;
      ffmpegUsed = extracted.ffmpeg;
      writeFileSync(out.framesJson, `${JSON.stringify(frames, null, 1)}\n`);
      console.log(`  ${frames.length} stills in ${posix(out.frames)}/`);
    }
  }
  if (frames) {
    writeContact(out.contact, {slug, sourceRel, info, frames, words});
    console.log(`  wrote ${posix(out.contact)}`);
  }

  const previous = existsSync(out.manifest) ? JSON.parse(readFileSync(out.manifest, 'utf8')) : {};
  const manifest = {
    slug,
    source: {
      path: sourceRel,
      bytes: stat.size,
      modified: stat.mtime.toISOString(),
      duration: Math.round(info.duration * 100) / 100,
      video: info.video,
      audio: info.audio,
    },
    narration: posix(narration),
    transcript: words
      ? {tool: words.tool, model: words.model, device: words.device, seconds: words.seconds, segments: words.segments.length}
      : previous.transcript ?? null,
    heard: heard
      ? {
          letters: `${heard.letters.model} (${heard.letters.tool})`,
          phrases: `${heard.phrases.model} on ${heard.phrases.device}`,
          seconds: heard.seconds,
          fillers: heard.fillers.length,
        }
      : previous.heard ?? null,
    frames: frames
      ? {
          count: frames.length,
          rule: `scene > ${SCENE}, at least ${MIN_GAP}s apart, at least one every ${MAX_GAP}s`,
          ffmpeg: ffmpegUsed ?? previous.frames?.ffmpeg ?? null,
        }
      : previous.frames ?? null,
    ingested: new Date().toISOString(),
  };
  if (previous.source && previous.source.bytes !== manifest.source.bytes) {
    console.warn(`  NOTE: ${sourceRel} differs from the recording last ingested as ${slug}. Use --force to redo every step.`);
  }
  writeFileSync(out.manifest, `${JSON.stringify(manifest, null, 1)}\n`);

  console.log(`\nIngested ${slug}.
Next:
  1. Open ${posix(out.contact)} and correct ${posix(out.transcript)} against it; mark it corrected.
  2. Copy videos/_TEMPLATE.md to videos/<cut>.md, Narration mode source-edit, source ${INGEST_DIR}/${slug}/.
  3. Cut the voice edit from ${posix(out.words)} (docs/NARRATED-WALKTHROUGH.md, step 5).
     A short's narration is cut for you by npm run shorts -- build, which uses
     ${posix(out.heard)} to take out the ums, repeats and false starts.`);
};

const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.length === 0) {
  console.log(usage);
} else if (argv[0] === '--list') {
  list();
} else {
  ingest(argv);
}
