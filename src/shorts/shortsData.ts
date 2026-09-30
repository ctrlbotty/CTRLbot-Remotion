// Every 30-second short, as data. One entry is one short; `<Short>` renders any of them.
//
// A short is a hook, a few proof beats and a sign-off. The hook is the one idea, on
// screen and settled at frame 0 over the first beat's opening frame, because that frame
// is the thumbnail and the feed decides in three seconds. The beats are footage from a
// narrated recording, a render, a motion graphic or a still, each pushed into slowly by
// the house camera. The sign-off names the product, never a URL.
//
// Media is never played straight from a recording. `npm run shorts -- build <id>` cuts
// each beat out of its source into public/shorts/<id>/, cuts the narration clips below into
// one cleaned track beside them with its word-timed captions, and writes
// shorts.generated.ts. Change an entry, rebuild it.
//
// KEEP THIS FILE IMPORT-FREE. scripts/shorts.mjs transpiles it and imports the result,
// exactly as the gates do with destinations.ts, so the data and the script that
// materializes it can never disagree.

export type Product =
  | 'CTRLbot'
  | 'CTRLbot IoT'
  | 'CTRLbot.AI'
  | 'CTRLbot.IO'
  | 'CTRLbot Mirror'
  | 'CTRLbot Terminator';

/** vertical: 1080x1920 `social-short`. landscape: 1920x1080 `social-short-landscape`. */
export type ShortFormat = 'vertical' | 'landscape';

/** A rectangle in the source's own pixels. */
export type Rect = {x: number; y: number; width: number; height: number};

export type ShortSource =
  /** A live screen from src/shorts/surfaces.tsx, such as `terminator/scan`. The default. */
  | {surface: string}
  /** A recording ingested into ingest/<slug>/; its ingest.json names the file. */
  | {recording: string}
  /** Any other local video or image, relative to the repository root. */
  | {file: string};

export type ShortBeat = {
  id: string;
  /** Seconds on screen. */
  seconds: number;
  source: ShortSource;
  /** Seconds into a video source where the beat starts. */
  from?: number;
  /** Source seconds per screen second. 2 shows twelve seconds of footage in six. */
  speed?: number;
  /** Cut the source to this before anything else, in source pixels. */
  crop?: Rect;
  /**
   * Where the camera ends up, in the cropped media's pixels. Defaults to a gentle push
   * to the centre. The camera starts on the whole picture and arrives here as the beat ends.
   */
  focus?: Rect;
  /** Replaces the idea line while this beat is up. Words in *asterisks* take the accent. */
  line?: string;
  /** What the viewer sees happen. The brief's evidence column, checked on the contact sheet. */
  evidence: string;
};

/**
 * A line of the narration. The range picks the words: every word Whisper heard inside it,
 * from ingest/<slug>/captions.json. The build (scripts/lib/voice.mjs) then finds where
 * those words really start and end in the waveform, cuts in the quiet around them, takes
 * out the fillers, repeats and false starts between them, and shortens long pauses. So
 * the range only has to land inside the first and last word, not on their edges.
 */
export type ShortNarrationClip = {
  id: string;
  /** Seconds into the short where `sourceStart` plays. The clip may begin a little earlier, to catch its first word's onset. */
  at: number;
  /** Seconds into the recording's narration track. */
  sourceStart: number;
  sourceEnd: number;
  /** Keep every sound between the first word and the last, and every pause at its length. */
  verbatim?: boolean;
};

export type ShortSpec = {
  /** The roadmap ID. The composition is `Short-<id>`. */
  id: string;
  product: Product;
  format: ShortFormat;
  /** Audiowide. One to three words. */
  title: string;
  /** The one idea, one sentence. Words in *asterisks* take the accent. */
  idea: string;
  /** Under the product name on the closing card. */
  signoff: string;
  beats: ShortBeat[];
  /** Cut from one ingested recording. Omit for a short with no voice. */
  narration?: {recording: string; clips: ShortNarrationClip[]};
  publish: {title: string; description: string; tags: string[]};
};

/** The hook: the idea on screen over the first beat's opening frame. */
export const HOOK_SECONDS = 2.5;
/** The closing card. */
export const SIGNOFF_SECONDS = 3.5;

export const SHORTS: ShortSpec[] = [
  {
    id: 'S02',
    product: 'CTRLbot Terminator',
    format: 'vertical',
    title: 'SCAN. SERVE. CONNECT.',
    idea: 'A *terminal* for every device on your network.',
    signoff: 'Test any device from your PC.',
    beats: [
      {
        id: 'scan',
        seconds: 6,
        source: {recording: 'terminator-walkthrough'},
        from: 63,
        speed: 2,
        evidence: 'Scan runs and the device table fills with host names, manufacturers and addresses',
      },
      {
        id: 'server',
        seconds: 6,
        source: {recording: 'terminator-walkthrough'},
        from: 121,
        speed: 1.5,
        evidence: 'TCP Server tab with its port set, ready to listen for a device',
      },
      {
        id: 'terminal',
        seconds: 6,
        source: {recording: 'terminator-walkthrough'},
        from: 326,
        evidence: 'Raw TCP session connected to a device, commands sent and its replies received',
      },
      {
        id: 'ssh',
        seconds: 6,
        source: {recording: 'terminator-walkthrough'},
        from: 458,
        speed: 2,
        evidence: 'SSH Client tab with a host and user filled in, connecting',
      },
    ],
    narration: {
      recording: 'terminator-walkthrough',
      clips: [
        {id: 'intro', at: 0.35, sourceStart: 12.9, sourceEnd: 18.97},
        {id: 'scan', at: 4.9, sourceStart: 23.78, sourceEnd: 25.19},
        {id: 'server', at: 8.75, sourceStart: 25.87, sourceEnd: 29.45},
        {id: 'connect', at: 14.75, sourceStart: 30.3, sourceEnd: 35.85},
        {id: 'ssh', at: 20.9, sourceStart: 48.9, sourceEnd: 52.9},
      ],
    },
    publish: {
      title: 'CTRLbot Terminator: scan, serve, connect',
      description:
        'CTRLbot Terminator is a PC app for testing connected devices. Scan your network, ' +
        'run a test server, and talk to devices over TCP, Telnet, serial and SSH.',
      tags: ['CTRLbot', 'CTRLbot Terminator', 'AV', 'IoT', 'network scan', 'terminal', 'SSH', 'serial'],
    },
  },
  {
    id: 'S03',
    product: 'CTRLbot.AI',
    format: 'vertical',
    title: 'ASKS FIRST',
    idea: 'It asks the questions a *technician* would, before it answers.',
    signoff: 'Break. Fix. Solve IT.',
    beats: [
      {
        id: 'type',
        seconds: 5,
        source: {file: 'out/ai-walkthrough-2min.mp4'},
        from: 5.5,
        crop: {x: 828, y: 115, width: 1020, height: 850},
        evidence: 'I broke my phone types into the one box on an empty black page',
      },
      {
        id: 'questions',
        seconds: 7,
        source: {file: 'out/ai-walkthrough-2min.mp4'},
        from: 14,
        crop: {x: 828, y: 115, width: 1020, height: 850},
        evidence: 'An assumption lands, then YES/NO questions arrive and get answered',
      },
      {
        id: 'sources',
        seconds: 6,
        source: {file: 'out/ai-walkthrough-2min.mp4'},
        from: 50,
        crop: {x: 828, y: 115, width: 1020, height: 850},
        evidence: 'Wikipedia, Reddit and YouTube sources arrive one after another',
      },
      {
        id: 'themes',
        seconds: 6,
        source: {file: 'out/ai-walkthrough-2min.mp4'},
        from: 104.3,
        speed: 1.45,
        crop: {x: 828, y: 115, width: 1020, height: 850},
        evidence: 'The page cuts through its themes, ending on the retro terminal look',
      },
    ],
    narration: {
      recording: 'ai-walkthrough',
      clips: [
        {id: 'welcome', at: 0.3, sourceStart: 0.55, sourceEnd: 9.0},
        {id: 'better', at: 7.9, sourceStart: 44.5, sourceEnd: 49.3},
        {id: 'links', at: 14.9, sourceStart: 119.95, sourceEnd: 122.3},
        {id: 'retro', at: 23.24, sourceStart: 244.65, sourceEnd: 247.45},
      ],
    },
    publish: {
      title: 'CTRLbot.AI asks before it answers',
      description:
        'CTRLbot.AI is a free troubleshooting assistant. It asks the questions a technician ' +
        'would, then answers with real sources. No login, no account.',
      tags: ['CTRLbot', 'CTRLbot.AI', 'AI', 'troubleshooting', 'tech support'],
    },
  },
];

// Everything below is arithmetic on the data, shared by <Short> and scripts/shorts.mjs.

export const compositionId = (short: ShortSpec) => `Short-${short.id}`;

export const destinationId = (short: ShortSpec) =>
  short.format === 'vertical' ? 'social-short' : 'social-short-landscape';

export const frameSize = (short: ShortSpec) =>
  short.format === 'vertical' ? {width: 1080, height: 1920} : {width: 1920, height: 1080};

export const shortSeconds = (short: ShortSpec) =>
  HOOK_SECONDS + short.beats.reduce((sum, beat) => sum + beat.seconds, 0) + SIGNOFF_SECONDS;

/** Seconds into the short where each beat starts. */
export const beatStarts = (short: ShortSpec) => {
  let at = HOOK_SECONDS;
  return short.beats.map((beat) => {
    const start = at;
    at += beat.seconds;
    return start;
  });
};

const IMAGE = /\.(png|jpe?g|webp)$/i;

export const isImageBeat = (beat: ShortBeat) => 'file' in beat.source && IMAGE.test(beat.source.file);

/** A live screen, rendered rather than cut from anything, so it has no media to build. */
export const isSurfaceBeat = (beat: ShortBeat) => 'surface' in beat.source;

/** Where the build puts a beat's media, relative to public/. */
export const mediaPath = (short: ShortSpec, beat: ShortBeat) =>
  `shorts/${short.id}/${beat.id}.${isImageBeat(beat) ? 'png' : 'mp4'}`;

/** A video beat's first frame, which the hook holds before the footage starts. */
export const posterPath = (short: ShortSpec, beat: ShortBeat) =>
  isImageBeat(beat) ? mediaPath(short, beat) : `shorts/${short.id}/${beat.id}-poster.jpg`;

/** A recording's prepared voice track, relative to public/: what the narration is cut from. */
export const narrationPath = (recording: string) =>
  `narration/${recording}/source-normalized.m4a`;

/** A short's narration, cut and placed on its timeline by the build, relative to public/. */
export const narrationEditPath = (short: ShortSpec) => `shorts/${short.id}/narration.m4a`;

/** Remotion's Caption shape, as written by npm run ingest:recording. */
export type CaptionWord = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

/**
 * Captions split wherever the voice stops for longer than `gapMs`, and after a sentence.
 *
 * Remotion's createTikTokStyleCaptions packs words into pages by time from the page's
 * start and never breaks on a pause, so a phrase's last words and the first word of the
 * next one, seconds later, share a page. Page each run separately. The narration build
 * shortens every pause inside a line to 0.3s or less, so a longer one is between lines.
 */
export const splitAtPauses = (words: CaptionWord[], gapMs = 350): CaptionWord[][] => {
  const runs: CaptionWord[][] = [];
  for (const word of words) {
    const current = runs[runs.length - 1];
    const last = current?.[current.length - 1];
    if (last && word.startMs - last.endMs <= gapMs && !/[.?!]["')\]]*$/.test(last.text.trim())) current.push(word);
    else runs.push([word]);
  }
  return runs;
};

const words = (text: string) => text.replace(/\*/g, '').split(/\s+/).filter(Boolean).length;

/**
 * What would make a short wrong before anything renders. Empty when it is sound.
 * `npm run shorts -- build` refuses a short with problems, and so does `npm run check`.
 */
export const shortProblems = (short: ShortSpec): string[] => {
  const problems: string[] = [];
  const seconds = shortSeconds(short);
  if (!/^[A-Z]\d{2}$/.test(short.id)) problems.push(`id ${short.id} is not a roadmap ID like S02`);
  if (seconds < 20 || seconds > 35) problems.push(`runs ${seconds}s; a short is 20 to 35`);
  if (words(short.title) > 3) problems.push(`title "${short.title}" is over three words`);
  if (words(short.idea) > 14) problems.push('idea is over fourteen words; it has to read in the hook');
  if (!short.beats.length) problems.push('no beats');
  const ids = new Set<string>();
  for (const beat of short.beats) {
    if (ids.has(beat.id)) problems.push(`duplicate beat id ${beat.id}`);
    ids.add(beat.id);
    if (!(beat.seconds > 0)) problems.push(`beat ${beat.id} has no duration`);
    if (!beat.evidence) problems.push(`beat ${beat.id} has no evidence`);
    if (!isImageBeat(beat) && !isSurfaceBeat(beat) && beat.from === undefined) {
      problems.push(`beat ${beat.id} has no from`);
    }
    if (beat.line && words(beat.line) > 14) problems.push(`beat ${beat.id} line is over fourteen words`);
  }
  const clipIds = new Set<string>();
  for (const clip of short.narration?.clips ?? []) {
    if (clipIds.has(clip.id)) problems.push(`duplicate narration clip ${clip.id}`);
    clipIds.add(clip.id);
    if (!(clip.sourceEnd > clip.sourceStart)) problems.push(`narration ${clip.id} ends before it starts`);
    if (clip.at + clip.sourceEnd - clip.sourceStart > seconds) {
      problems.push(`narration ${clip.id} runs past the end of the short`);
    }
  }
  return problems;
};
