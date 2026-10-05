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
 * Landscape revision 3: Nathan's original overview followed by the existing chapters.
 * 166 seconds: open 0–6.5, overview 6.5–44.5, scan 44.5–62, server 62–85,
 * pin 85–101, raw TCP 101–118.5, serial 118.5–135, SSH 135–149.5,
 * recap 149.5–162.5, close 162.5–166. Source ranges are unchanged after the introduction.
 * The portrait retains terminatorWalkthroughNarration.ts until the lead cut is approved.
 * Keep runtime imports out: narration:edit and narration:srt transpile this module.
 */
export const TERMINATOR_LANDSCAPE_NARRATION_CLIPS = [
  // open → proof: the cut to the live product lands on "called CTRLbot Terminator"
  {id: 'welcome', at: 0.35, sourceStart: 0.2, sourceEnd: 9.4},
  // proof
  // notAfter: "right now" follows "PC" at 19.31s.
  {id: 'terminal-app', at: 9.8, sourceStart: 12.9, sourceEnd: 18.95, notAfter: 19.27},

  // Landscape review: restore the five-tool overview and the spoken transition.
  {id: 'overview', at: 16.25, sourceStart: 23.8, sourceEnd: 54.3, notBefore: 23.8, notAfter: 54.6},
  {id: 'begin-scan', at: 40, sourceStart: 55.27, sourceEnd: 58.25, notBefore: 55.1, notAfter: 58.55},

  // scan (44.5–62): scan info and web links
  {id: 'scan-info', at: 44.75, sourceStart: 85.96, sourceEnd: 93.45},
  {id: 'scan-links', at: 52.5, sourceStart: 93.9, sourceEnd: 102.9},

  // server (62–85): TCP server, IoT test, and client connected
  {id: 'server-intro', at: 62.25, sourceStart: 128.55, sourceEnd: 131.95},
  {id: 'server-test', at: 65.95, sourceStart: 143.2, sourceEnd: 149.3},
  {id: 'server-connected', at: 72.35, sourceStart: 196.75, sourceEnd: 204.95},

  // pin (85–101): pin connections, extended through "various ports that you might need"
  // notAfter: an "Alright" at 242.41s follows the phrase, which ends at 238.96s.
  {id: 'pin', at: 85.25, sourceStart: 223.9, sourceEnd: 239.2, notAfter: 239.1},

  // raw-tcp (101–118.5): other direction, and raw TCP / Telnet
  {id: 'other-direction', at: 101.25, sourceStart: 244.75, sourceEnd: 251.2},
  {id: 'raw-tcp', at: 108, sourceStart: 320.5, sourceEnd: 330.45},

  // serial (118.5–135): COM ports, USB/Bluetooth, and parameters
  // notAfter: keeps the tail of "ports" (sound to 337.88s); "Right" follows at 338.0s.
  {id: 'com-ports', at: 118.75, sourceStart: 335.0, sourceEnd: 337.95, notAfter: 337.95},
  // notAfter: keeps "Bluetooth" (ends 345.98s); "on" follows at 346.1s.
  {id: 'usb-bluetooth', at: 122, sourceStart: 338.8, sourceEnd: 346.15, notAfter: 346.05},
  {id: 'parameters', at: 129.65, sourceStart: 398.65, sourceEnd: 403.55},

  // ssh (135–149.5): SSH client and help command on Luxul
  {id: 'ssh-intro', at: 135.25, sourceStart: 443.0, sourceEnd: 449.05},
  // notAfter: a "Great." follows "just great" at 492.36s.
  {id: 'ssh-help', at: 141.6, sourceStart: 483.7, sourceEnd: 491.1, notAfter: 491.0},

  // recap (149.5–162.5)
  {id: 'recap', at: 149.75, sourceStart: 498.58, sourceEnd: 511.0},

  // close (162.5–166)
  {id: 'thank-you', at: 162.75, sourceStart: 511.75, sourceEnd: 512.35},
] as const satisfies readonly NarrationEditClip[];

/** Spelling corrections for words Whisper misheard in this recording. */
export const TERMINATOR_CAPTION_CORRECTIONS: Record<string, string> = {
  Luxall: 'Luxul',
  Mac: 'MAC',
  com: 'COM',
};
