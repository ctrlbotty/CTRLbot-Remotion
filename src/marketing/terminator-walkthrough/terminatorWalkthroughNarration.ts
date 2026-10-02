import type {NarrationClip} from '../../audio/NarrationTrack';

/** Authoring-only hard edges consumed by scripts/lib/voice.mjs, in source seconds. */
type NarrationEditClip = NarrationClip & {
  readonly notBefore?: number;
  readonly notAfter?: number;
};

/** Loudness-normalized voice from `video input/CTRLbot Terminatior Tutorial.mp4`. */
export const TERMINATOR_WALKTHROUGH_NARRATION_SOURCE =
  'narration/terminator-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one to three per beat. Both
 * shapes play it; the portrait cut burns it in as captions and the landscape cut ships it
 * as an .srt (`npm run narration:srt`), both through src/audio/narrationCaptions.ts.
 *
 * Source times come from `ingest/terminator-walkthrough/words.json` (transcript corrected
 * 2026-09-30). `at` places each clip inside its beat (revision 2, 138s: open 0–6.5s,
 * proof 6.5–16.5, scan 16.5–34, server 34–57, pin 57–73, raw-tcp 73–90.5, serial 90.5–107,
 * ssh 107–121.5, recap 121.5–134.5, close 134.5–138). Planned with `npm run narration:edit`.
 *
 * Left out on purpose (videos/terminator-walkthrough.md): future claims, "50 devices",
 * unreleased device lab, Device Manager passage, SSH password reveal, and fear disclaimer.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs transpiles it.
 */
export const TERMINATOR_WALKTHROUGH_NARRATION_CLIPS = [
  // open → proof: the cut to the live product lands on "called CTRLbot Terminator"
  {id: 'welcome', at: 0.35, sourceStart: 0.2, sourceEnd: 9.4},
  // proof
  // notAfter: "right now" follows "PC" at 19.31s.
  {id: 'terminal-app', at: 9.8, sourceStart: 12.9, sourceEnd: 18.95, notAfter: 19.27},

  // scan (16.5–34): scan info and web links
  {id: 'scan-info', at: 16.75, sourceStart: 85.96, sourceEnd: 93.45},
  {id: 'scan-links', at: 24.5, sourceStart: 93.9, sourceEnd: 102.9},

  // server (34–57): TCP server, IoT test, and client connected
  {id: 'server-intro', at: 34.25, sourceStart: 128.55, sourceEnd: 131.95},
  {id: 'server-test', at: 37.95, sourceStart: 143.2, sourceEnd: 149.3},
  {id: 'server-connected', at: 44.35, sourceStart: 196.75, sourceEnd: 204.95},

  // pin (57–73): pin connections, extended through "various ports that you might need"
  // notAfter: an "Alright" at 242.41s follows the phrase, which ends at 238.96s.
  {id: 'pin', at: 57.25, sourceStart: 223.9, sourceEnd: 239.2, notAfter: 239.1},

  // raw-tcp (73–90.5): other direction, and raw TCP / Telnet
  {id: 'other-direction', at: 73.25, sourceStart: 244.75, sourceEnd: 251.2},
  {id: 'raw-tcp', at: 80.0, sourceStart: 320.5, sourceEnd: 330.45},

  // serial (90.5–107): COM ports, USB/Bluetooth, and parameters
  // notAfter: keeps the tail of "ports" (sound to 337.88s); "Right" follows at 338.0s.
  {id: 'com-ports', at: 90.75, sourceStart: 335.0, sourceEnd: 337.95, notAfter: 337.95},
  // notAfter: keeps "Bluetooth" (ends 345.98s); "on" follows at 346.1s.
  {id: 'usb-bluetooth', at: 94.0, sourceStart: 338.8, sourceEnd: 346.15, notAfter: 346.05},
  {id: 'parameters', at: 101.65, sourceStart: 398.65, sourceEnd: 403.55},

  // ssh (107–121.5): SSH client and help command on Luxul
  {id: 'ssh-intro', at: 107.25, sourceStart: 443.0, sourceEnd: 449.05},
  // notAfter: a "Great." follows "just great" at 492.36s.
  {id: 'ssh-help', at: 113.6, sourceStart: 483.7, sourceEnd: 491.1, notAfter: 491.0},

  // recap (121.5–134.5)
  {id: 'recap', at: 121.75, sourceStart: 498.58, sourceEnd: 511.0},

  // close (134.5–138)
  {id: 'thank-you', at: 134.75, sourceStart: 511.75, sourceEnd: 512.35},
] as const satisfies readonly NarrationEditClip[];

/** Spelling corrections for words Whisper misheard in this recording. */
export const TERMINATOR_CAPTION_CORRECTIONS: Record<string, string> = {
  Luxall: 'Luxul',
  Mac: 'MAC',
  com: 'COM',
};
