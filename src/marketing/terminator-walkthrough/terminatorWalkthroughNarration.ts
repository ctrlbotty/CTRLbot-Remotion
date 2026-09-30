import type {NarrationClip} from '../../audio/NarrationTrack';

/** Loudness-normalized voice from `video input/CTRLbot Terminatior Tutorial.mp4`. */
export const TERMINATOR_WALKTHROUGH_NARRATION_SOURCE =
  'narration/terminator-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one to three per beat. Both
 * shapes play it; the portrait cut burns it in as captions and the landscape cut ships it
 * as an .srt (`npm run narration:srt`), both through src/audio/narrationCaptions.ts.
 *
 * Source times come from `ingest/terminator-walkthrough/words.json` (transcript corrected
 * 2026-09-30). `at` places each clip inside its beat (terminatorWalkthroughData.ts: open 0–16.5s,
 * scan 16.5–34, server 34–53, pin 53–63.5, raw-tcp 63.5–81, serial 81–97.5, ssh 97.5–112,
 * close 112–127.5).
 *
 * Left out on purpose (videos/terminator-walkthrough.md): future claims, "50 devices",
 * unreleased device lab, Device Manager passage, SSH password reveal, and fear disclaimer.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs transpiles it.
 */
export const TERMINATOR_WALKTHROUGH_NARRATION_CLIPS = [
  // open (0–16.5): welcome and terminal app
  {id: 'welcome', at: 0.35, sourceStart: 0.2, sourceEnd: 9.4},
  {id: 'terminal-app', at: 9.8, sourceStart: 12.9, sourceEnd: 18.95},

  // scan (16.5–34): scan info and web links
  {id: 'scan-info', at: 16.8, sourceStart: 85.96, sourceEnd: 93.45},
  {id: 'scan-links', at: 24.5, sourceStart: 93.9, sourceEnd: 102.9},

  // server (34–53): TCP server, IoT test, and client connected
  {id: 'server-intro', at: 34.25, sourceStart: 128.55, sourceEnd: 131.95},
  {id: 'server-test', at: 37.9, sourceStart: 143.2, sourceEnd: 149.3},
  {id: 'server-connected', at: 44.3, sourceStart: 196.75, sourceEnd: 204.95},

  // pin (53–63.5): pin connections
  {id: 'pin', at: 53.25, sourceStart: 223.9, sourceEnd: 233.26},

  // raw-tcp (63.5–81): other direction, and raw TCP / Telnet
  {id: 'other-direction', at: 63.75, sourceStart: 244.75, sourceEnd: 251.2},
  {id: 'raw-tcp', at: 70.5, sourceStart: 320.5, sourceEnd: 330.45},

  // serial (81–97.5): COM ports, USB/Bluetooth, and parameters
  {id: 'com-ports', at: 81.25, sourceStart: 335.0, sourceEnd: 337.95},
  {id: 'usb-bluetooth', at: 84.45, sourceStart: 338.8, sourceEnd: 346.15},
  {id: 'parameters', at: 92.1, sourceStart: 398.65, sourceEnd: 403.55},

  // ssh (97.5–112): SSH client and help command on Luxul
  {id: 'ssh-intro', at: 97.75, sourceStart: 443.0, sourceEnd: 449.05},
  {id: 'ssh-help', at: 104.1, sourceStart: 483.7, sourceEnd: 491.1},

  // close (112–127.5): recap and thanks
  {id: 'recap', at: 112.25, sourceStart: 498.58, sourceEnd: 511.0},
  {id: 'thank-you', at: 124.9, sourceStart: 511.75, sourceEnd: 512.35},
] as const satisfies readonly NarrationClip[];

/** Spelling corrections for words Whisper misheard in this recording. */
export const TERMINATOR_CAPTION_CORRECTIONS: Record<string, string> = {
  Luxall: 'Luxul',
  Mac: 'MAC',
  com: 'COM',
};
