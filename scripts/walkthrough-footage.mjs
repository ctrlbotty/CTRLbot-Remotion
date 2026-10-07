// Cuts a narrated walkthrough's footage beats out of the ingested recording.
//
//   node scripts/walkthrough-footage.mjs src/marketing/<slug>/footage.json
//
// The spec names the recording, the screen's rectangle inside it (the recording frames the
// tablet in a bezel on a backdrop; a beat wants only the screen, at the surface's own dp
// size, so the walkthrough camera can move over it like any rebuilt surface) and, per beat,
// the pieces of the recording it plays in order. A piece is {from, frames, speed?}: `frames`
// at 30fps of output, taken from `from` seconds of the recording at `speed`. Pieces are
// joined with hard cuts into public/walkthrough/<slug>/<beat>.mp4, muted — the voice is the
// narration edit. Footage is never played straight from video input/.
import {existsSync, mkdirSync, readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {join, resolve} from 'node:path';

const ffmpeg = process.env.FFMPEG_FULL || 'ffmpeg';
const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const specPath = process.argv[2];
if (!specPath) fail('Usage: node scripts/walkthrough-footage.mjs <footage.json>');
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const source = resolve(spec.source);
if (!existsSync(source)) fail(`No recording at ${source}`);
const outDir = join('public', 'walkthrough', spec.slug);
mkdirSync(outDir, {recursive: true});

const {x, y, width, height} = spec.screen;
const {width: outW, height: outH} = spec.size;

for (const [beat, pieces] of Object.entries(spec.beats)) {
  const inputs = [];
  const chains = [];
  pieces.forEach((piece, i) => {
    const speed = piece.speed ?? 1;
    const seconds = piece.frames / 30;
    inputs.push('-ss', String(piece.from), '-t', String(seconds * speed + 0.5), '-i', source);
    chains.push(
      `[${i}:v]crop=${width}:${height}:${x}:${y},scale=${outW}:${outH}:flags=lanczos,` +
        `setpts=(PTS-STARTPTS)/${speed},fps=30,trim=end_frame=${piece.frames},setpts=PTS-STARTPTS,setsar=1[v${i}]`,
    );
  });
  const joined = pieces.map((_, i) => `[v${i}]`).join('');
  const filter = `${chains.join(';')};${joined}concat=n=${pieces.length}:v=1:a=0,format=yuv420p[out]`;
  const out = join(outDir, `${beat}.mp4`);
  const result = spawnSync(
    ffmpeg,
    [
      '-hide_banner', '-loglevel', 'error', '-y',
      ...inputs,
      '-filter_complex', filter,
      '-map', '[out]', '-an',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-g', '30',
      '-movflags', '+faststart',
      out,
    ],
    {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024},
  );
  if (result.status !== 0 || !existsSync(out)) fail(`Could not cut ${beat}:\n${result.stderr}`);
  const frames = pieces.reduce((sum, piece) => sum + piece.frames, 0);
  console.log(`${out}  ${frames} frames  (${pieces.map((p) => `${p.from}s×${p.speed ?? 1}`).join(' | ')})`);
}
