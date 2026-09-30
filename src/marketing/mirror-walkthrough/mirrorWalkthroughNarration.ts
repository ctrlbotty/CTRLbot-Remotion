import type {NarrationClip} from '../../audio/NarrationTrack';

/** Loudness-normalized voice from `video input/CTRLbot Mirror Tutorial.mp4`. */
export const MIRROR_WALKTHROUGH_NARRATION_SOURCE =
  'narration/mirror-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one or two per beat. Both
 * shapes play it; the portrait cut burns it in as captions and the landscape cut ships it
 * as an .srt (`npm run narration:srt`), both through src/audio/narrationCaptions.ts.
 *
 * Source times come from `ingest/mirror-walkthrough/words.json` (transcript corrected
 * 2026-09-30). Each clip starts ~0.1s before its first word and ends ~0.25s after its last
 * word's end, because Whisper's word ends run early — but never past the next word's
 * start. `at` places each clip inside its beat (walkthroughData.ts: open 0–16s, setup
 * 16–30.5, debugging 30.5–38.5, connect 38.5–52.5, frame 52.5–67, paste 67–81, capture
 * 81–94.5, apps 94.5–108, files 108–116.5, tools 116.5–124, close 124–133).
 *
 * Left out on purpose (videos/mirror-walkthrough.md): pairing over Wi-Fi, removing
 * preinstalled apps and "garbageware", virtual devices, and "just email me".
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs transpiles it.
 */
export const MIRROR_WALKTHROUGH_NARRATION_CLIPS = [
  // open: "Welcome to CTRLbot … called CTRLbot Mirror, — a way to mirror what is on your
  // Android phone or tablet."
  {id: 'welcome', at: 0.35, sourceStart: 0.33, sourceEnd: 9.0},
  {id: 'mirror-what', at: 9.25, sourceStart: 10.65, sourceEnd: 16.85},

  // setup: install ADB, and what it is for.
  {id: 'install-adb', at: 16.25, sourceStart: 30.4, sourceEnd: 44.0},

  // debugging: USB debugging. The recording goes on to pair over Wi-Fi; that is cut.
  {id: 'usb-debugging', at: 30.75, sourceStart: 190.45, sourceEnd: 196.45},

  // connect: authorize once, then green, ready, start mirroring.
  {id: 'authorize', at: 38.75, sourceStart: 93.15, sourceEnd: 99.05},
  {id: 'ready', at: 44.85, sourceStart: 99.3, sourceEnd: 106.75},

  // frame: pick a better-fitting frame, then padding and shadow.
  {id: 'pick-frame', at: 52.7, sourceStart: 118.5, sourceEnd: 127.05},
  {id: 'padding', at: 61.45, sourceStart: 130.2, sourceEnd: 135.3},

  // paste: copying and pasting instead of doing it on the panel.
  {id: 'copy-paste', at: 67.25, sourceStart: 224.5, sourceEnd: 237.8},

  // capture: the screenshot button, then video with your voice.
  {id: 'screenshot', at: 81.2, sourceStart: 311.35, sourceEnd: 316.8},
  {id: 'record-video', at: 86.85, sourceStart: 330.25, sourceEnd: 335.35},
  {id: 'record-voice', at: 92.2, sourceStart: 342.8, sourceEnd: 344.8},

  // apps: every app on the device, and removing what you do not want. Ends before
  // "that sometimes you may not even be able to remove".
  {id: 'apps', at: 94.75, sourceStart: 388.7, sourceEnd: 401.67},

  // files: drag and drop into the device.
  {id: 'drag-drop', at: 108.3, sourceStart: 459.85, sourceEnd: 466.9},

  // tools: the shell and the device log. Ends before "virtual devices".
  {id: 'shell-logs', at: 116.7, sourceStart: 473.0, sourceEnd: 479.6},

  // close: back to Setup, then thanks. Ends before "and just email me".
  {id: 'setup-again', at: 124.25, sourceStart: 494.25, sourceEnd: 497.65},
  {id: 'thank-you', at: 128.1, sourceStart: 500.85, sourceEnd: 503.1},
] as const satisfies readonly NarrationClip[];
