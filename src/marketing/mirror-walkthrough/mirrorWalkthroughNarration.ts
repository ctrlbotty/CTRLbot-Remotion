import type {NarrationClip} from '../../audio/NarrationTrack';

/** Loudness-normalized voice from `video input/CTRLbot Mirror Tutorial.mp4`. */
export const MIRROR_WALKTHROUGH_NARRATION_SOURCE =
  'narration/mirror-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one or two per beat.
 *
 * Source times come from `ingest/mirror-walkthrough/words.json` (transcript corrected
 * 2026-09-30). Each clip starts ~0.1s before its first word and ends ~0.25s after its last
 * word's end, because Whisper's word ends run early — but never past the next word's
 * start. `at` places each clip inside its beat (walkthroughData.ts: open 0–16s, setup
 * 16–30, debugging 30–43, connect 43–57, frame 57–71, paste 71–85, capture 85–101, apps
 * 101–116, files 116–127, tools 127–136, close 136–148).
 *
 * Left out on purpose (videos/mirror-walkthrough.md): removing preinstalled apps and
 * "garbageware", virtual devices, and "just email me".
 */
export const MIRROR_WALKTHROUGH_NARRATION_CLIPS = [
  // open: "Welcome to CTRLbot … called CTRLbot Mirror, — a way to mirror what is on your
  // Android phone or tablet."
  {id: 'welcome', at: 0.35, sourceStart: 0.33, sourceEnd: 9.0},
  {id: 'mirror-what', at: 9.2, sourceStart: 10.65, sourceEnd: 16.85},

  // setup: install ADB, and what it is for.
  {id: 'install-adb', at: 16.2, sourceStart: 30.4, sourceEnd: 44.0},

  // debugging: USB debugging, then pairing over Wi-Fi with a code.
  {id: 'usb-debugging', at: 30.1, sourceStart: 190.45, sourceEnd: 196.45},
  {id: 'wireless-pair', at: 36.2, sourceStart: 202.62, sourceEnd: 209.35},

  // connect: authorize once, then green, ready, start mirroring.
  {id: 'authorize', at: 43.25, sourceStart: 93.15, sourceEnd: 99.05},
  {id: 'ready', at: 49.35, sourceStart: 99.3, sourceEnd: 106.75},

  // frame: pick a better-fitting frame, then padding and shadow.
  {id: 'pick-frame', at: 57.2, sourceStart: 118.5, sourceEnd: 127.05},
  {id: 'padding', at: 65.6, sourceStart: 130.2, sourceEnd: 135.3},

  // paste: copying and pasting instead of doing it on the panel.
  {id: 'copy-paste', at: 71.25, sourceStart: 224.5, sourceEnd: 237.8},

  // capture: the screenshot button, then video with your voice.
  {id: 'screenshot', at: 85.2, sourceStart: 311.35, sourceEnd: 316.8},
  {id: 'record-video', at: 90.9, sourceStart: 330.25, sourceEnd: 335.35},
  {id: 'record-voice', at: 96.3, sourceStart: 342.8, sourceEnd: 344.8},

  // apps: every app on the device, and removing what you do not want. Ends before
  // "that sometimes you may not even be able to remove".
  {id: 'apps', at: 101.3, sourceStart: 388.7, sourceEnd: 401.67},

  // files: drag and drop into the device.
  {id: 'drag-drop', at: 116.4, sourceStart: 459.85, sourceEnd: 466.9},

  // tools: the shell and the device log. Ends before "virtual devices".
  {id: 'shell-logs', at: 127.3, sourceStart: 473.0, sourceEnd: 479.6},

  // close: back to Setup, then thanks. Ends before "and just email me".
  {id: 'setup-again', at: 136.4, sourceStart: 494.25, sourceEnd: 497.65},
  {id: 'thank-you', at: 140.4, sourceStart: 500.85, sourceEnd: 503.1},
] as const satisfies readonly NarrationClip[];
