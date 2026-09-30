import {existsSync, mkdirSync, readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, resolve} from 'node:path';

const TARGET_I = -16;
const TARGET_LRA = 11;
const TARGET_TP = -1.5;

const usage = `Narrated walkthrough utilities

Prepare a walkthrough's real voice track for Remotion, polished (high-pass, gentle
compression) and normalized to ${TARGET_I} LUFS:
  npm run narration:prepare -- <slug> <source-video> [--force] [--dry-run]

Check the audio in a rendered video:
  npm run narration:check -- <rendered-video>

Examples:
  npm run narration:prepare -- new-walkthrough "C:\\recordings\\walkthrough.mp4"
  npm run narration:check -- out/new-walkthrough-narrated.mp4`;

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const remotionBinary = (name) => {
  const override = process.env[name === 'ffmpeg' ? 'FFMPEG_PATH' : 'FFPROBE_PATH'];
  if (override) return resolve(override);

  const remotionDirectory = resolve('node_modules/@remotion');
  if (existsSync(remotionDirectory)) {
    const platformPackage = readdirSync(remotionDirectory).find((entry) =>
      entry.startsWith('compositor-'),
    );
    const executable = process.platform === 'win32' ? `${name}.exe` : name;
    const bundled = platformPackage
      ? resolve(remotionDirectory, platformPackage, executable)
      : null;
    if (bundled && existsSync(bundled)) return bundled;
  }

  return name;
};

const ffmpeg = remotionBinary('ffmpeg');
const ffprobe = remotionBinary('ffprobe');

// The voice polish, ahead of loudness normalization: a high-pass under the voice for desk
// and handling rumble, and gentle compression that evens out word-to-word level for phone
// speakers. The threshold follows the recording's own loudness, so a quiet recording is
// treated like a loud one. There is no noise reduction: these recordings arrive gated,
// their pauses measuring -60 dB and below, and denoising gated audio only adds artefacts.
const polish = (inputI) =>
  `highpass=f=80,acompressor=threshold=${(inputI + 3).toFixed(1)}dB:ratio=2:attack=8:release=150`;

// Remotion's bundled ffmpeg is built without those filters, so polishing uses a full
// build: FFMPEG_FULL, or the ffmpeg on PATH, provided it has both.
let polisher;
const findPolisher = () => {
  if (polisher !== undefined) return polisher;
  polisher = null;
  for (const candidate of [process.env.FFMPEG_FULL, 'ffmpeg'].filter(Boolean)) {
    const result = spawnSync(candidate, ['-hide_banner', '-filters'], {encoding: 'utf8', maxBuffer: 8 * 1024 * 1024});
    if (result.status === 0 && / highpass /.test(result.stdout) && / acompressor /.test(result.stdout)) {
      polisher = candidate;
      break;
    }
  }
  return polisher;
};

const runCaptured = (binary, args) => {
  const result = spawnSync(binary, args, {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.error) {
    fail(`Could not run ${binary}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail((result.stderr || result.stdout || `${binary} exited ${result.status}`).trim());
  }
  return result;
};

const probe = (path) => {
  const result = runCaptured(ffprobe, [
    '-v',
    'error',
    '-show_entries',
    'format=duration:stream=index,codec_type,codec_name,sample_rate,channels,duration',
    '-of',
    'json',
    path,
  ]);
  try {
    return JSON.parse(result.stdout);
  } catch {
    fail(`ffprobe returned invalid JSON for ${path}`);
  }
};

const parseLoudness = (stderr, path) => {
  const matches = stderr.match(/\{\s*"input_i"[\s\S]*?\}/g);
  if (!matches?.length) {
    fail(`Could not measure loudness for ${path}`);
  }
  try {
    return JSON.parse(matches.at(-1));
  } catch {
    fail(`FFmpeg returned invalid loudness data for ${path}`);
  }
};

/** Loudness as loudnorm will receive it: after `chain`, when there is one. */
const measureLoudness = (path, chain = '', binary = ffmpeg) => {
  const result = runCaptured(binary, [
    '-hide_banner',
    '-nostats',
    '-i',
    path,
    '-map',
    '0:a:0',
    '-af',
    `${chain}loudnorm=I=${TARGET_I}:LRA=${TARGET_LRA}:TP=${TARGET_TP}:print_format=json`,
    '-f',
    'null',
    '-',
  ]);
  return parseLoudness(result.stderr, path);
};

const number = (value) => Number.parseFloat(String(value));
const seconds = (value) => `${number(value).toFixed(2)}s`;
const db = (value, unit) => `${number(value).toFixed(2)} ${unit}`;

const requireMedia = (path) => {
  if (!existsSync(path)) fail(`Media file does not exist: ${path}`);
  const metadata = probe(path);
  const audio = metadata.streams?.find((stream) => stream.codec_type === 'audio');
  if (!audio) fail(`No audio stream found in: ${path}`);
  return {metadata, audio};
};

const prepare = (args) => {
  const flags = new Set(args.filter((arg) => arg.startsWith('--')));
  const positional = args.filter((arg) => !arg.startsWith('--'));
  if (positional.length !== 2 || flags.has('--help')) {
    console.log(usage);
    process.exit(flags.has('--help') ? 0 : 1);
  }

  const [slug, sourceArgument] = positional;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(`Slug must be lowercase kebab-case: ${slug}`);
  }

  const source = resolve(sourceArgument);
  const output = resolve('public/narration', slug, 'source-normalized.m4a');
  const {metadata, audio} = requireMedia(source);
  const duration = metadata.format?.duration ?? audio.duration;

  if (existsSync(output) && !flags.has('--force') && !flags.has('--dry-run')) {
    fail(`Narration asset already exists: ${output}\nUse --force only when replacement is intentional.`);
  }

  console.log(`Source: ${source}`);
  console.log(`Audio: ${audio.codec_name}, ${audio.sample_rate ?? 'unknown'} Hz, ${audio.channels ?? 'unknown'} channel(s)`);
  console.log(`Duration: ${seconds(duration)}`);
  console.log(`Output: ${output}`);

  if (flags.has('--dry-run')) {
    console.log('Dry run passed. No file was written.');
    return;
  }

  console.log('Measuring source loudness...');
  const raw = measureLoudness(source);
  const measurable = (values) =>
    [values.input_i, values.input_lra, values.input_tp, values.input_thresh, values.target_offset]
      .map(number)
      .every(Number.isFinite);
  if (!measurable(raw)) fail('The source audio is silent or could not be measured reliably.');
  console.log(`Source loudness: ${db(raw.input_i, 'LUFS')}, range ${number(raw.input_lra).toFixed(1)} LU`);

  const polisherBinary = findPolisher();
  const chain = polisherBinary ? `${polish(number(raw.input_i))},` : '';
  if (polisherBinary) {
    console.log(`Polish: ${chain.slice(0, -1)}`);
  } else {
    console.warn(
      'WARN: no ffmpeg with the highpass and acompressor filters, so the voice is only loudness-normalized.\n' +
        '      Install a full build (winget install Gyan.FFmpeg) or point FFMPEG_FULL at one.',
    );
  }
  const binary = polisherBinary ?? ffmpeg;
  // loudnorm's second pass is told what it will receive, which is the polished voice.
  const measured = polisherBinary ? measureLoudness(source, chain, binary) : raw;
  if (!measurable(measured)) fail('The polished audio could not be measured reliably.');

  mkdirSync(dirname(output), {recursive: true});
  const filter = [
    `loudnorm=I=${TARGET_I}`,
    `LRA=${TARGET_LRA}`,
    `TP=${TARGET_TP}`,
    `measured_I=${measured.input_i}`,
    `measured_LRA=${measured.input_lra}`,
    `measured_TP=${measured.input_tp}`,
    `measured_thresh=${measured.input_thresh}`,
    `offset=${measured.target_offset}`,
    'linear=true',
    'print_format=summary',
  ].join(':');

  const result = spawnSync(
    binary,
    [
      '-hide_banner',
      '-loglevel',
      'warning',
      flags.has('--force') ? '-y' : '-n',
      '-i',
      source,
      '-map',
      '0:a:0',
      '-vn',
      '-af',
      `${chain}${filter}`,
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '-ar',
      '48000',
      '-ac',
      '1',
      '-movflags',
      '+faststart',
      '-f',
      'mp4',
      output,
    ],
    {stdio: 'inherit'},
  );
  if (result.error) fail(`Could not run ${binary}: ${result.error.message}`);
  if (result.status !== 0 || !existsSync(output)) {
    fail(`Narration preparation failed${result.status === null ? '' : ` with exit code ${result.status}`}.`);
  }

  const outputLoudness = measureLoudness(output);
  console.log(`Prepared: ${output}`);
  console.log(`Integrated loudness: ${db(outputLoudness.input_i, 'LUFS')}`);
  console.log(`True peak: ${db(outputLoudness.input_tp, 'dBTP')}`);
};

const check = (args) => {
  const positional = args.filter((arg) => !arg.startsWith('--'));
  if (positional.length !== 1 || args.includes('--help')) {
    console.log(usage);
    process.exit(args.includes('--help') ? 0 : 1);
  }

  const path = resolve(positional[0]);
  const {metadata, audio} = requireMedia(path);
  const loudness = measureLoudness(path);
  const integrated = number(loudness.input_i);
  const peak = number(loudness.input_tp);
  const duration = metadata.format?.duration ?? audio.duration;
  const errors = [];
  const warnings = [];

  if (!Number.isFinite(integrated)) errors.push('audio is silent or unmeasurable');
  if (Number.isFinite(integrated) && (integrated < -28 || integrated > -8)) {
    errors.push(`integrated loudness ${integrated.toFixed(2)} LUFS is outside the usable -28 to -8 range`);
  } else if (Number.isFinite(integrated) && (integrated < -20 || integrated > -11)) {
    warnings.push(`integrated loudness ${integrated.toFixed(2)} LUFS is outside the preferred -20 to -11 review range`);
  }
  if (Number.isFinite(peak) && peak > -0.5) {
    errors.push(`true peak ${peak.toFixed(2)} dBTP is too close to clipping`);
  }

  console.log(`File: ${path}`);
  console.log(`Duration: ${seconds(duration)}`);
  console.log(`Audio: ${audio.codec_name}, ${audio.sample_rate ?? 'unknown'} Hz, ${audio.channels ?? 'unknown'} channel(s)`);
  console.log(`Integrated loudness: ${db(loudness.input_i, 'LUFS')}`);
  console.log(`True peak: ${db(loudness.input_tp, 'dBTP')}`);
  warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
  if (errors.length) fail(errors.map((error) => `ERROR: ${error}`).join('\n'));
  console.log('Narration check passed.');
};

const [command, ...args] = process.argv.slice(2);
if (!command || command === '--help') {
  console.log(usage);
} else if (command === 'prepare') {
  prepare(args);
} else if (command === 'check') {
  check(args);
} else {
  fail(`Unknown command: ${command}\n\n${usage}`);
}
