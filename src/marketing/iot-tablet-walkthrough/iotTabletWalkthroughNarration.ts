import type {NarrationClip} from '../../audio/NarrationTrack';

/** Authoring-only hard edges consumed by scripts/lib/voice.mjs, in source seconds. */
type NarrationEditClip = NarrationClip & {
  readonly notBefore?: number;
  readonly notAfter?: number;
  readonly wholeEdges?: boolean;
};

/** Loudness-normalized voice from `video input/CTRLbot-IoT Walkthough v1.09.mp4`. */
export const IOT_TABLET_NARRATION_SOURCE =
  'narration/iot-tablet-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one to five per beat. Both
 * shapes play it; the portrait cut burns it in as captions and the landscape cut ships it
 * as an .srt (`npm run narration:srt`), both through src/audio/narrationCaptions.ts.
 *
 * Source times come from `ingest/iot-tablet-walkthrough/words.json` (transcript corrected
 * 2026-09-30). `at` places each clip inside its beat following W01's placement rule
 * (revision 2, 343.5s total): first clip at beat start + 0.25s (open at 0.35s), subsequent
 * clips 0.3s after previous clip's planned end.
 *
 * Planned with `npm run narration:edit`.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs transpiles it.
 */
export const IOT_TABLET_NARRATION_CLIPS = [
  // open (0–5s) → proof (5–11s): welcome runs from open into proof, cut lands on "CTRLbot IoT"
  {id: 'welcome', at: 0.35, sourceStart: 1.36, sourceEnd: 11.28},

  // first-run (11–24.5s)
  {id: 'first-run-tour', at: 11.25, sourceStart: 14.72, sourceEnd: 27.13},

  // ai (24.5–46.5s)
  {id: 'ai-intro', at: 24.75, sourceStart: 28.09, sourceEnd: 34.0},
  {id: 'ai-manual', at: 30.188, sourceStart: 34.51, sourceEnd: 43.2},
  {id: 'ai-help', at: 37.744, sourceStart: 43.31, sourceEnd: 49.6},

  // database (46.5–69.5s)
  {id: 'db-devices', at: 46.75, sourceStart: 53.85, sourceEnd: 64.2},
  {id: 'db-sorting', at: 56.103, sourceStart: 64.45, sourceEnd: 76.4},

  // epson (69.5–93s)
  {id: 'epson-add', at: 69.75, sourceStart: 76.77, sourceEnd: 78.25},
  {id: 'epson-info', at: 71.55, sourceStart: 79.55, sourceEnd: 86.25},
  {id: 'epson-webpage', at: 78.36, sourceStart: 86.29, sourceEnd: 94.85},
  {id: 'epson-connection', at: 86.064, sourceStart: 95.67, sourceEnd: 101.45},

  // add (93–109s)
  {id: 'add-ip', at: 93.33, sourceStart: 102.17, sourceEnd: 109.45},
  {id: 'add-saved', at: 100.451, sourceStart: 125.13, sourceEnd: 132.44},

  // terminal (109–114.5s)
  // notAfter: phrase ends 136.99s ("here."); "If you need to" follows at 140.43s.
  {id: 'term-commands', at: 109.25, sourceStart: 132.45, sourceEnd: 137.3, notAfter: 137.3},

  // test (114.5–142.5s)
  {id: 'test-device', at: 114.75, sourceStart: 139.99, sourceEnd: 149.75},
  {id: 'test-remote', at: 124.493, sourceStart: 149.97, sourceEnd: 153.35},
  {id: 'test-switcher', at: 127.361, sourceStart: 153.53, sourceEnd: 156.6, notAfter: 156.75, wholeEdges: true},
  {id: 'test-terminal', at: 130.222, sourceStart: 157.43, sourceEnd: 163.65},
  {id: 'test-webpage', at: 136.605, sourceStart: 164.43, sourceEnd: 168.45},

  // activities (142.5–161.5s)
  {id: 'act-next', at: 142.75, sourceStart: 169.69, sourceEnd: 176.25},
  {id: 'act-customize', at: 149.686, sourceStart: 176.73, sourceEnd: 184.5},
  {id: 'act-presets', at: 156.262, sourceStart: 184.71, sourceEnd: 187.8},

  // switch-audio (161.5–178s)
  // notBefore: "Alright" ("right?") ends 187.80s; phrase starts 187.98s ("And you can see").
  {id: 'switch-projector', at: 161.75, sourceStart: 187.83, sourceEnd: 191.25, notBefore: 187.85},
  {id: 'switch-assign', at: 165.22, sourceStart: 192.59, sourceEnd: 200.8},
  {id: 'switch-eui', at: 173.004, sourceStart: 201.51, sourceEnd: 205.6},

  // eui (178–203s)
  {id: 'eui-setup', at: 178.25, sourceStart: 205.63, sourceEnd: 216.95},
  {id: 'eui-technician', at: 189.108, sourceStart: 217.25, sourceEnd: 222.75},
  {id: 'eui-volume-mute', at: 193.15, sourceStart: 223.61, sourceEnd: 228.75},
  {id: 'eui-power', at: 197.606, sourceStart: 229.67, sourceEnd: 231.55},

  // exit (203–211s)
  {id: 'exit-hold', at: 203.25, sourceStart: 238.56, sourceEnd: 245.45},

  // discovery (211–231s)
  {id: 'discovery-devices', at: 211.25, sourceStart: 246.44, sourceEnd: 248.9},
  {id: 'discovery-scan', at: 213.83, sourceStart: 249.24, sourceEnd: 266.25},

  // matrox-add (231–261.5s)
  {id: 'matrox-endpoints', at: 231.29, sourceStart: 267.46, sourceEnd: 273.4},
  {id: 'matrox-ipmx', at: 236.344, sourceStart: 274.08, sourceEnd: 276.8},
  {id: 'matrox-add-these', at: 238.859, sourceStart: 281.78, sourceEnd: 286.65},
  {id: 'matrox-one-click', at: 242.702, sourceStart: 287.04, sourceEnd: 303.65},

  // matrox-test (261.5–269.5s)
  {id: 'matrox-test-individual', at: 261.75, sourceStart: 328.91, sourceEnd: 330.8},
  {id: 'matrox-test-switch', at: 264.035, sourceStart: 333.53, sourceEnd: 337.65},

  // matrox-switch (269.5–293s)
  {id: 'matrox-switch-back', at: 269.75, sourceStart: 340.09, sourceEnd: 341.95},
  {id: 'matrox-switch-change', at: 271.92, sourceStart: 342.27, sourceEnd: 349.6},
  {id: 'matrox-switch-convertip', at: 277.781, sourceStart: 349.91, sourceEnd: 357.85},
  {id: 'matrox-switch-audio', at: 285.102, sourceStart: 358.53, sourceEnd: 363.95},

  // m2m (293–317.5s)
  {id: 'm2m-different', at: 293.25, sourceStart: 364.85, sourceEnd: 368.45},
  {id: 'm2m-press-click', at: 297.1, sourceStart: 368.99, sourceEnd: 373.45},
  {id: 'm2m-drag-drop', at: 301.558, sourceStart: 373.95, sourceEnd: 379.15},
  {id: 'm2m-send-all', at: 306.501, sourceStart: 379.63, sourceEnd: 382.3, wholeEdges: true},
  {id: 'm2m-anytime', at: 309.219, sourceStart: 382.33, sourceEnd: 389.55},

  // settings (317.5–338.5s)
  {id: 'settings-start-over', at: 317.75, sourceStart: 399.43, sourceEnd: 403.1},
  {id: 'settings-manual', at: 321.675, sourceStart: 404.5, sourceEnd: 408.05},
  {id: 'settings-quick-start', at: 324.66, sourceStart: 408.63, sourceEnd: 414.15},
  {id: 'settings-reset', at: 330.019, sourceStart: 414.73, sourceEnd: 421.05},

  // close (338.5–343.5s)
  {id: 'close-thanks', at: 338.75, sourceStart: 422.96, sourceEnd: 424.05},
] as const satisfies readonly NarrationEditClip[];

/** Spelling corrections for words Whisper misheard in this recording. */
export const IOT_TABLET_CAPTION_CORRECTIONS: Record<string, string> = {
  controlbot: 'CTRLbot',
  '.ai.': 'AI.',
  '.ai': 'AI',
  RS: 'RS-232',
  '-232': '',
  convert: 'ConvertIP,',
  'IP,': '',
};
