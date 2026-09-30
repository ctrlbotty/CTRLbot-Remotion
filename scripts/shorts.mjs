// The short production line. Every short is one entry in src/shorts/shortsData.ts.
//
//   npm run shorts -- list                  every short, its length, and how far along it is
//   npm run shorts -- build [ids]           cut media and the narration into public/shorts/,
//                                           write src/shorts/shorts.generated.ts
//   npm run shorts -- brief [ids]           write videos/short-<id>.md for the gates
//   npm run shorts -- render [ids]          render out/shorts/<id>.mp4, narrated
//   npm run shorts -- kit [ids]             poster, captions.srt and kit.md in out/shorts/<id>/
//   npm run shorts -- all [ids]             build, brief, render and kit, in that order
//
// With no ids, a command runs on every short. A beat is only re-cut when its entry
// changed, so rebuilding everything after editing one short costs one short. The narration
// is re-cut when its clips, its recording's ingest or scripts/lib/voice.mjs change.

import {createTikTokStyleCaptions, serializeSrt} from '@remotion/captions';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join, resolve} from 'node:path';
import ts from 'typescript';
import {clipTime, loadVoice, planClip, renderTrack, wav} from './lib/voice.mjs';

const REMOTION_CLI = 'node_modules/@remotion/cli/remotion-cli.js';
const GENERATED = 'src/shorts/shorts.generated.ts';

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const run = (binary, args, options = {}) =>
  spawnSync(binary, args, {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...options});

const loadData = async () => {
  const {outputText} = ts.transpileModule(readFileSync('src/shorts/shortsData.ts', 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};

// Cropping, retiming and fps conversion need filters the Remotion-bundled ffmpeg is built
// without, so this uses a full build: FFMPEG_FULL, or the ffmpeg on PATH.
const ffmpeg = process.env.FFMPEG_FULL || 'ffmpeg';
const ffprobe = process.env.FFPROBE_FULL || 'ffprobe';

const dimensions = (path) => {
  const result = run(ffprobe, [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'json', path,
  ]);
  if (result.status !== 0) fail(`ffprobe could not read ${path}\n${result.stderr}`);
  const stream = JSON.parse(result.stdout).streams?.[0];
  if (!stream) fail(`No picture in ${path}`);
  return {width: stream.width, height: stream.height};
};

const sourceFile = (beat) => {
  if ('file' in beat.source) {
    const path = resolve(beat.source.file);
    if (!existsSync(path)) fail(`Beat ${beat.id}: ${beat.source.file} does not exist`);
    return path;
  }
  const manifest = join('ingest', beat.source.recording, 'ingest.json');
  if (!existsSync(manifest)) {
    fail(`Beat ${beat.id}: ${beat.source.recording} is not ingested. Run npm run ingest:recording first.`);
  }
  const path = resolve(JSON.parse(readFileSync(manifest, 'utf8')).source.path);
  if (!existsSync(path)) fail(`Beat ${beat.id}: the recording ${path} is missing`);
  return path;
};

const even = 'scale=trunc(iw/2)*2:trunc(ih/2)*2';

const cutBeat = (data, short, beat) => {
  const out = resolve('public', data.mediaPath(short, beat));
  mkdirSync(dirname(out), {recursive: true});
  const source = sourceFile(beat);
  const crop = beat.crop ? `crop=${beat.crop.width}:${beat.crop.height}:${beat.crop.x}:${beat.crop.y},` : '';

  if (data.isImageBeat(beat)) {
    const result = run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-vf', `${crop}${even}`, out]);
    if (result.status !== 0 || !existsSync(out)) fail(`Could not cut ${beat.id}:\n${result.stderr}`);
    return dimensions(out);
  }

  const speed = beat.speed ?? 1;
  const result = run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', String(beat.from), '-t', String(beat.seconds * speed), '-i', source,
    '-an',
    '-vf', `${crop}setpts=PTS/${speed},fps=30,${even},format=yuv420p`,
    '-t', String(beat.seconds),
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-g', '30',
    '-movflags', '+faststart',
    out,
  ]);
  if (result.status !== 0 || !existsSync(out)) fail(`Could not cut ${beat.id}:\n${result.stderr}`);

  const poster = resolve('public', data.posterPath(short, beat));
  const still = run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', out, '-frames:v', '1', '-q:v', '2', poster]);
  if (still.status !== 0 || !existsSync(poster)) fail(`Could not take ${beat.id}'s first frame:\n${still.stderr}`);
  return dimensions(out);
};

const manifestPath = (short) => join('public', 'shorts', short.id, 'build.json');
const readManifest = (short) =>
  existsSync(manifestPath(short)) ? JSON.parse(readFileSync(manifestPath(short), 'utf8')) : {beats: {}};

/** The narration's words as the build cut them, in seconds of the short. */
const mappedCaptions = (data, short) => {
  if (!short.narration) return [];
  const built = readManifest(short).narration;
  if (!built) fail(`${short.id}: its narration is not built. Run npm run shorts -- build ${short.id}.`);
  return built.captions;
};

// The narration edit. scripts/lib/voice.mjs decides what each clip plays; this renders the
// clips into one track per short, at their places, and normalizes it like the voice track.
const TARGET = 'I=-16:LRA=11:TP=-1.5';

const fingerprint = (path) => {
  if (!existsSync(path)) return null;
  const stat = statSync(path);
  return `${stat.size}:${Math.round(stat.mtimeMs)}`;
};

const loudness = (path) => {
  const result = run(ffmpeg, ['-hide_banner', '-nostats', '-i', path, '-af', `loudnorm=${TARGET}:print_format=json`, '-f', 'null', '-']);
  const json = result.stderr.match(/\{\s*"input_i"[\s\S]*?\}/g)?.at(-1);
  if (result.status !== 0 || !json) fail(`Could not measure the loudness of ${path}\n${result.stderr}`);
  return JSON.parse(json);
};

const buildNarration = (data, short, previous) => {
  const {recording, clips} = short.narration;
  const voicePath = resolve('public', data.narrationPath(recording));
  const wordsPath = join('ingest', recording, 'captions.json');
  const heardPath = join('ingest', recording, 'heard.json');
  if (!existsSync(wordsPath)) fail(`${short.id}: no ${wordsPath}. Run npm run ingest:recording for ${recording}.`);
  const out = resolve('public', data.narrationEditPath(short));
  const spec = createHash('sha1')
    .update(JSON.stringify({clips, seconds: data.shortSeconds(short)}))
    .update(readFileSync(new URL('./lib/voice.mjs', import.meta.url)))
    .update(String([voicePath, wordsPath, heardPath].map(fingerprint)))
    .digest('hex')
    .slice(0, 16);
  if (previous?.spec === spec && existsSync(out)) {
    console.log(`  ${short.id}/narration   unchanged`);
    return previous;
  }

  if (!existsSync(heardPath)) {
    console.warn(
      `  WARN: no ${heardPath}, so ${short.id}'s narration is cut on the waveform alone and nothing is removed.\n` +
        `        Run npm run ingest:recording -- ${recording} <recording> to add it.`,
    );
  }
  const voice = loadVoice(voicePath, ffmpeg);
  const words = JSON.parse(readFileSync(wordsPath, 'utf8')).map((w) => ({text: w.text, start: w.startMs / 1000, end: w.endMs / 1000}));
  const heard = existsSync(heardPath) ? JSON.parse(readFileSync(heardPath, 'utf8')) : null;
  const total = data.shortSeconds(short);

  // A clip never starts later than its `at`; it starts earlier when its first sound begins
  // before `sourceStart`, so the words stay where the entry put them.
  const placed = clips.map((clip) => {
    let plan;
    try {
      plan = planClip(voice, words, heard, clip, {verbatim: clip.verbatim});
    } catch (error) {
      fail(`${short.id}: ${error.message}`);
    }
    return {clip, plan, at: Math.max(0, clip.at + Math.min(0, plan.start - clip.sourceStart))};
  });
  placed.forEach(({clip, plan, at}, k) => {
    const next = placed[k + 1];
    if (next && at + plan.seconds > next.at - 0.05) {
      fail(`${short.id}: narration ${clip.id} runs to ${(at + plan.seconds).toFixed(2)}s, into ${next.clip.id} at ${next.at.toFixed(2)}s. Move ${next.clip.id}'s at.`);
    }
    if (at + plan.seconds > total) fail(`${short.id}: narration ${clip.id} runs past the end of the short.`);
  });

  const scratch = join(tmpdir(), `short-${short.id}-narration.wav`);
  writeFileSync(scratch, wav(renderTrack(voice, placed, total)));
  const measured = loudness(scratch);
  mkdirSync(dirname(out), {recursive: true});
  const encoded = run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', scratch,
    '-af',
    `loudnorm=${TARGET}:measured_I=${measured.input_i}:measured_LRA=${measured.input_lra}:measured_TP=${measured.input_tp}` +
      `:measured_thresh=${measured.input_thresh}:offset=${measured.target_offset}:linear=true`,
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '1', '-movflags', '+faststart', out,
  ]);
  rmSync(scratch, {force: true});
  if (encoded.status !== 0 || !existsSync(out)) fail(`Could not write ${out}\n${encoded.stderr}`);

  // A token that starts with punctuation (".AI," after "CTRLbot") is the end of the word
  // before it, so it joins that word rather than risking a caption page between them.
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
  for (const {clip, plan, at} of placed) {
    const cut = plan.removed.map((r) => `${r.heard ? `"${r.heard}"` : 'a sound'} at ${r.from}s`);
    const shortened = plan.tightened.length ? `, ${plan.tightened.length} pause${plan.tightened.length > 1 ? 's' : ''} shortened` : '';
    console.log(
      `  ${short.id} voice ${clip.id.padEnd(10)} ${plan.start}-${plan.end}s -> ${at.toFixed(2)}s, ${plan.seconds.toFixed(2)}s` +
        `${cut.length ? `, removed ${cut.join(', ')}` : ''}${shortened}`,
    );
  }
  return {
    spec,
    file: data.narrationEditPath(short),
    loudness: `${measured.input_i} LUFS in`,
    clips: placed.map(({clip, plan, at}) => ({
      id: clip.id,
      at: Math.round(at * 1000) / 1000,
      source: [plan.start, plan.end],
      seconds: plan.seconds,
      pieces: plan.pieces,
      removed: plan.removed,
      tightened: plan.tightened,
      notes: plan.notes,
    })),
    captions,
  };
};

const writeGenerated = (data) => {
  const media = {};
  const captions = {};
  const narration = {};
  for (const short of data.SHORTS) {
    const manifest = readManifest(short);
    for (const beat of short.beats) {
      const built = manifest.beats[beat.id];
      if (built) media[`${short.id}/${beat.id}`] = {width: built.width, height: built.height};
    }
    if (short.narration && manifest.narration) {
      captions[short.id] = manifest.narration.captions;
      narration[short.id] = manifest.narration.file;
    }
  }
  writeFileSync(
    GENERATED,
    `// Written by \`npm run shorts -- build\`. Do not edit; change src/shorts/shortsData.ts and rebuild.

import type {CaptionWord} from './shortsData';

/** Pixel size of each built beat, keyed \`<short id>/<beat id>\`. */
export const SHORT_MEDIA: Record<string, {width: number; height: number}> = ${JSON.stringify(media, null, 2)};

/** Each short's narration track, cut and placed, relative to public/. */
export const SHORT_NARRATION: Record<string, string> = ${JSON.stringify(narration, null, 2)};

/** Each short's narration as word-timed captions, in seconds of the short. */
export const SHORT_CAPTIONS: Record<string, CaptionWord[]> = ${JSON.stringify(captions)};
`,
  );
};

const build = (data, shorts) => {
  for (const short of shorts) {
    const problems = data.shortProblems(short);
    if (problems.length) fail(`${short.id} is not ready:\n  ${problems.join('\n  ')}`);
    if (short.narration && !existsSync(resolve('public', data.narrationPath(short.narration.recording)))) {
      fail(`${short.id}: no prepared narration for ${short.narration.recording}. Run npm run ingest:recording first.`);
    }

    const manifest = readManifest(short);
    const next = {beats: {}};
    for (const beat of short.beats) {
      if (data.isSurfaceBeat(beat)) {
        console.log(`  ${short.id}/${beat.id.padEnd(12)} live ${beat.source.surface}`);
        continue;
      }
      const spec = JSON.stringify({source: beat.source, from: beat.from, seconds: beat.seconds, speed: beat.speed, crop: beat.crop});
      const previous = manifest.beats[beat.id];
      const present = existsSync(resolve('public', data.mediaPath(short, beat)));
      if (previous?.spec === spec && present) {
        next.beats[beat.id] = previous;
        console.log(`  ${short.id}/${beat.id.padEnd(12)} unchanged`);
        continue;
      }
      const size = cutBeat(data, short, beat);
      next.beats[beat.id] = {spec, ...size};
      console.log(`  ${short.id}/${beat.id.padEnd(12)} cut ${size.width}x${size.height}`);
    }
    if (short.narration) {
      next.narration = buildNarration(data, short, manifest.narration);
      console.log(`  ${short.id} captions: ${next.narration.captions.length} words`);
    }
    mkdirSync(dirname(manifestPath(short)), {recursive: true});
    writeFileSync(manifestPath(short), `${JSON.stringify(next, null, 1)}\n`);
  }
  writeGenerated(data);
  console.log(`Wrote ${GENERATED}.`);
};

const briefPath = (short) => join('videos', `short-${short.id.toLowerCase()}.md`);

const brief = (data, shorts) => {
  for (const short of shorts) {
    const path = briefPath(short);
    if (existsSync(path)) {
      console.log(`  ${path} exists; left alone`);
      continue;
    }
    const captions = mappedCaptions(data, short);
    const said = (from, to) => {
      const text = captions
        .filter((word) => word.startMs >= from * 1000 && word.startMs < to * 1000)
        .map((word) => word.text)
        .join('')
        .trim();
      return text ? `"${text.replace(/\|/g, '/')}"` : '(no narration)';
    };
    const starts = data.beatStarts(short);
    const total = data.shortSeconds(short);
    const plain = short.idea.replace(/\*/g, '');
    const where = (beat) =>
      'surface' in beat.source
        ? `live \`${beat.source.surface}\``
        : 'recording' in beat.source
        ? `\`${beat.source.recording}\` ${beat.from}s${beat.speed ? ` x${beat.speed}` : ''}`
        : `\`${beat.source.file}\`${beat.from !== undefined ? ` ${beat.from}s` : ''}`;
    const rows = [
      `| promise | ${plain} | hook over \`${short.beats[0].id}\` | Title and idea settled at frame 0 over the first screen | ${data.HOOK_SECONDS} |`,
      ...short.beats.map(
        (beat, i) => `| ${beat.id} | ${said(starts[i], starts[i] + beat.seconds)} | ${where(beat)} | ${beat.evidence} | ${beat.seconds} |`,
      ),
      `| close | The product, once | \`Signoff\` | Tricon and ${short.product}; "${short.signoff}" streams in | ${data.SIGNOFF_SECONDS} |`,
    ];
    const narration = short.narration
      ? [
          '- Mode: `source-edit`',
          `- Ingest: \`ingest/${short.narration.recording}/\``,
          `- Prepared audio: \`public/${data.narrationPath(short.narration.recording)}\``,
          `- Edit list: \`src/shorts/shortsData.ts\`, entry ${short.id}`,
          `- Narrated composition: \`${data.compositionId(short)}\``,
          `- Narrated output: \`out/shorts/${short.id}.mp4\``,
        ]
      : ['- Mode: `none`'];
    writeFileSync(
      path,
      `---
id: ${data.compositionId(short)}
destination: ${data.destinationId(short)}
---

# ${short.product}: 30-second short (${short.id})

> Generated from \`src/shorts/shortsData.ts\` by \`npm run shorts -- brief ${short.id}\`. The
> data entry is the source of truth: change it, rebuild, and delete this file to regenerate
> it rather than editing the table by hand.

## Watching

Someone scrolling a feed who has never heard of ${short.product}. They give it three seconds.

## Promise

${plain}

## Narration

${narration.join('\n')}

## Beats

${total}s, ${short.format === 'vertical' ? '1080x1920' : '1920x1080'}. The Claim column is what is said over each beat.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
${rows.join('\n')}

---
<!-- The line runs from here. -->

## Contact sheet

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
`,
    );
    console.log(`  wrote ${path}`);
  }
};

const render = (data, shorts) => {
  for (const short of shorts) {
    const out = join('out', 'shorts', `${short.id}.mp4`);
    mkdirSync(dirname(out), {recursive: true});
    console.log(`Rendering ${data.compositionId(short)} to ${out}...`);
    const result = spawnSync(
      process.execPath,
      [REMOTION_CLI, 'render', 'src/index.ts', data.compositionId(short), out, '--codec=h264', '--crf=20', '--log=error'],
      {stdio: 'inherit'},
    );
    if (result.status !== 0 || !existsSync(out)) fail(`Render of ${short.id} failed.`);
  }
};

const kit = (data, shorts) => {
  for (const short of shorts) {
    const dir = join('out', 'shorts', short.id);
    mkdirSync(dir, {recursive: true});
    const poster = join(dir, 'poster.png');
    const still = spawnSync(
      process.execPath,
      [REMOTION_CLI, 'still', 'src/index.ts', data.compositionId(short), poster, '--frame=0', '--log=error'],
      {stdio: 'inherit'},
    );
    if (still.status !== 0 || !existsSync(poster)) fail(`Poster for ${short.id} failed.`);

    const captions = mappedCaptions(data, short);
    if (captions.length) {
      const pages = data
        .splitAtPauses(captions)
        .flatMap((run) => createTikTokStyleCaptions({captions: run, combineTokensWithinMilliseconds: 2400}).pages);
      const lines = pages.map((page) =>
        page.tokens.map((token) => ({text: token.text, startMs: token.fromMs, endMs: token.toMs, timestampMs: null, confidence: null})),
      );
      writeFileSync(join(dir, 'captions.srt'), serializeSrt({lines}));
    }

    const video = join('out', 'shorts', `${short.id}.mp4`);
    writeFileSync(
      join(dir, 'kit.md'),
      `# ${short.id}: ${short.publish.title}

- **Product:** ${short.product}
- **Format:** ${short.format === 'vertical' ? '1080x1920 vertical' : '1920x1080 landscape'}, ${data.shortSeconds(short)}s
- **Video:** \`${video}\`${existsSync(video) ? '' : ' (not rendered yet)'}
- **Poster:** \`${poster}\`
- **Captions:** ${captions.length ? `\`${join(dir, 'captions.srt')}\`` : 'none'}

## Title

${short.publish.title}

## Description

${short.publish.description}

## Tags

${short.publish.tags.map((tag) => `#${tag.replace(/[^A-Za-z0-9]/g, '')}`).join(' ')}
`,
    );
    console.log(`  ${dir}/: poster.png${captions.length ? ', captions.srt' : ''}, kit.md`);
  }
};

const list = (data) => {
  for (const short of data.SHORTS) {
    const built = short.beats.every((beat) => data.isSurfaceBeat(beat) || readManifest(short).beats[beat.id]);
    const rendered = existsSync(join('out', 'shorts', `${short.id}.mp4`));
    const kitted = existsSync(join('out', 'shorts', short.id, 'kit.md'));
    const state = kitted ? 'kit ready' : rendered ? 'rendered' : built ? 'built' : 'not built';
    console.log(
      `${short.id}  ${short.product.padEnd(20)} ${short.format.padEnd(9)} ${String(data.shortSeconds(short)).padStart(4)}s  ${state}`,
    );
  }
};

const main = async () => {
  const [command, ...ids] = process.argv.slice(2);
  const data = await loadData();
  const pick = () => {
    if (!ids.length) return data.SHORTS;
    return ids.map((id) => data.SHORTS.find((short) => short.id.toLowerCase() === id.toLowerCase()) ?? fail(`No short ${id}`));
  };
  switch (command) {
    case 'list':
      return list(data);
    case 'build':
      return build(data, pick());
    case 'brief':
      return brief(data, pick());
    case 'render':
      return render(data, pick());
    case 'kit':
      return kit(data, pick());
    case 'all':
      build(data, pick());
      brief(data, pick());
      render(data, pick());
      return kit(data, pick());
    default:
      console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 13).join('\n'));
  }
};

main();
