import type {NarrationClip} from '../../audio/NarrationTrack';

/** Authoring-only hard edges consumed by scripts/lib/voice.mjs, in source seconds. */
type NarrationEditClip = NarrationClip & {
  readonly notBefore?: number;
  readonly notAfter?: number;
  readonly wholeEdges?: boolean;
  readonly verbatim?: boolean;
};

/** Loudness-normalized voice from `video input/W05 Feature walkthroug.mp4`. */
export const IOT_LATEST_NARRATION_SOURCE = 'narration/iot-latest-features/source-normalized.m4a';

/**
 * W05's narrated edit: complete phrases from Nathan's recording, one to three per beat. Both
 * shapes play it; portrait burns it in as captions, landscape ships it as an .srt.
 *
 * Source times come from `ingest/iot-latest-features/words.json` (transcript corrected
 * 2026-10-02). Revision 2 drops only `eui-select` (the old tap-tap routing), which keeps the cut at 136s,
 * under X's 2:20. `power-x` is verbatim: the filler pass took its "X" for a stumble.
 * `at` follows W01's rule: a beat's first clip at its start + 0.25s (open at 0.35s), each next
 * clip 0.3s after the previous one's planned end, and at least 1.0s held after a beat's last.
 *
 * Planned with `npm run narration:edit`. KEEP THIS FILE free of runtime imports:
 * scripts/narration-srt.mjs transpiles it.
 */
export const IOT_LATEST_NARRATION_CLIPS = [
  // Beats (s): open 0–5, proof 5–12, avoip 12–24, global-cache 24–37, pusr 37–51.5,
  // discovery 51.5–60, rs232 60–79.5, terminal 79.5–88, webpage 88–96.5, eui 96.5–108,
  // power 108–117, close 117–121 (no narration). Review 2026-10-07 cut net-switches, the
  // preset message, the hello-world line and "thanks for joining me".
  // open → proof: heard.json hears a stray "You" at 0.84–1.14s, before "Welcome".
  {id: 'welcome', at: 0.35, sourceStart: 1.25, sourceEnd: 14.2, notBefore: 1.2},
  // avoip
  {id: 'avoip-more', at: 12.25, sourceStart: 57.15, sourceEnd: 61.25},
  {id: 'avoip-brands', at: 16.63, sourceStart: 71.75, sourceEnd: 79.5},
  // global-cache
  {id: 'gc-models', at: 24.25, sourceStart: 80.35, sourceEnd: 94.8, wholeEdges: true},
  // pusr: "-232" ends at 113.99s, exactly where "or" starts.
  {id: 'pusr', at: 37.25, sourceStart: 97.55, sourceEnd: 113.95, notAfter: 114.0},
  // discovery
  {id: 'disc-corner', at: 51.75, sourceStart: 141.6, sourceEnd: 144.2, wholeEdges: true},
  // disc-click: "then then" at 164.15–164.65s is a stumble, so it starts on "it'll"; "click"
  // ends at 170.09s, and "and see" follows at 170.35s.
  {id: 'disc-click', at: 54.68, sourceStart: 164.76, sourceEnd: 170.1, notBefore: 164.76, notAfter: 170.25},
  // rs232
  {id: 'rs-acer', at: 60.25, sourceStart: 207.05, sourceEnd: 211.1},
  {id: 'rs-endpoint', at: 65.28, sourceStart: 219.25, sourceEnd: 223.9},
  {id: 'rs-terminal', at: 69.35, sourceStart: 227.35, sourceEnd: 230.8, wholeEdges: true},
  {id: 'rs-layout', at: 72.77, sourceStart: 230.8, sourceEnd: 238.75},
  // terminal
  // term-open: starts after the tail of "or" (277.6s), which leaked at 277.56s.
  // "directly." ends at 280.18s. Whisper's "right?" (280.48s) is not heard, so the clip ends
  // before it; "and I can send" follows at 280.46s.
  {id: 'term-open', at: 79.75, sourceStart: 277.64, sourceEnd: 280.3, notBefore: 277.64, notAfter: 280.35},
  // term-send: "well." ends at 288.51s; "Yeah" starts at 288.66s.
  {id: 'term-send', at: 82.47, sourceStart: 283.95, sourceEnd: 288.5, notAfter: 288.58},
  // webpage
  {id: 'web', at: 88.25, sourceStart: 304.25, sourceEnd: 311.45},
  // eui
  {id: 'eui-drag', at: 96.75, sourceStart: 372.95, sourceEnd: 379.6},
  {id: 'eui-all', at: 102.76, sourceStart: 389.25, sourceEnd: 393.75},
  // power
  {id: 'power-x', at: 108.25, sourceStart: 396.05, sourceEnd: 403.95, verbatim: true},
  // wholeEdges where the first build ended a clip louder than -35 dB into silence (W03 T32).
] as const satisfies readonly NarrationEditClip[];

/** Spelling corrections for words Whisper misheard in this recording. */
export const IOT_LATEST_CAPTION_CORRECTIONS: Record<string, string> = {
  Pooser: 'PUSR',
  'all research': 'Hall Research',
  RS: 'RS-232',
  '-232': '',
  Cache: 'Caché',
  industrial: 'industrial-type',
  '-type': '',
  thanks: 'Thanks',
};
