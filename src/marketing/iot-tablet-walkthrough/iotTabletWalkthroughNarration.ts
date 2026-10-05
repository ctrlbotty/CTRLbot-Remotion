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
 * (revision 3, 330s total: first-run cut, close silent): first clip at beat start + 0.25s (open at 0.35s), subsequent
 * clips 0.3s after previous clip's planned end.
 *
 * Planned with `npm run narration:edit`.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs transpiles it.
 */
export const IOT_TABLET_NARRATION_CLIPS = [
  // open (0–5s) → proof (5–11s): welcome runs from open into proof, cut lands on "CTRLbot IoT"
  {id: 'welcome', at: 0.35, sourceStart: 1.36, sourceEnd: 11.28},

  // ai (11–33s)
  {id: 'ai-intro', at: 11.25, sourceStart: 28.09, sourceEnd: 34.0},
  {id: 'ai-manual', at: 16.688, sourceStart: 34.51, sourceEnd: 43.2},
  {id: 'ai-help', at: 24.244, sourceStart: 43.31, sourceEnd: 49.6},

  // database (33–56s)
  {id: 'db-devices', at: 33.25, sourceStart: 53.85, sourceEnd: 64.2},
  {id: 'db-sorting', at: 42.603, sourceStart: 64.45, sourceEnd: 76.4},

  // epson (56–79.5s)
  {id: 'epson-add', at: 56.25, sourceStart: 76.77, sourceEnd: 78.25},
  {id: 'epson-info', at: 58.05, sourceStart: 79.55, sourceEnd: 86.25},
  {id: 'epson-webpage', at: 64.86, sourceStart: 86.29, sourceEnd: 94.85},
  {id: 'epson-connection', at: 72.564, sourceStart: 95.67, sourceEnd: 101.45},

  // add (79.5–95.5s)
  {id: 'add-ip', at: 79.83, sourceStart: 102.17, sourceEnd: 109.45},
  {id: 'add-saved', at: 86.951, sourceStart: 125.13, sourceEnd: 132.44},

  // terminal (95.5–101s)
  // notAfter: phrase ends 136.99s ("here."); "If you need to" follows at 140.43s.
  {id: 'term-commands', at: 95.75, sourceStart: 132.45, sourceEnd: 137.3, notAfter: 137.3},

  // test (101–129s)
  {id: 'test-device', at: 101.25, sourceStart: 139.99, sourceEnd: 149.75},
  {id: 'test-remote', at: 110.993, sourceStart: 149.97, sourceEnd: 153.35},
  {id: 'test-switcher', at: 113.861, sourceStart: 153.53, sourceEnd: 156.6, notAfter: 156.75, wholeEdges: true},
  {id: 'test-terminal', at: 116.722, sourceStart: 157.43, sourceEnd: 163.65},
  {id: 'test-webpage', at: 123.105, sourceStart: 164.43, sourceEnd: 168.45},

  // activities (129–148s)
  {id: 'act-next', at: 129.25, sourceStart: 169.69, sourceEnd: 176.25},
  {id: 'act-customize', at: 136.186, sourceStart: 176.73, sourceEnd: 184.5},
  {id: 'act-presets', at: 142.762, sourceStart: 184.71, sourceEnd: 187.8},

  // switch-audio (148–164.5s)
  // notBefore: "Alright" ("right?") ends 187.80s; phrase starts 187.98s ("And you can see").
  {id: 'switch-projector', at: 148.25, sourceStart: 187.83, sourceEnd: 191.25, notBefore: 187.85},
  {id: 'switch-assign', at: 151.72, sourceStart: 192.59, sourceEnd: 200.8},
  {id: 'switch-eui', at: 159.504, sourceStart: 201.51, sourceEnd: 205.6},

  // eui (164.5–189.5s)
  {id: 'eui-setup', at: 164.75, sourceStart: 205.63, sourceEnd: 216.95},
  {id: 'eui-technician', at: 175.608, sourceStart: 217.25, sourceEnd: 222.75},
  {id: 'eui-volume-mute', at: 179.65, sourceStart: 223.61, sourceEnd: 228.75},
  {id: 'eui-power', at: 184.106, sourceStart: 229.67, sourceEnd: 231.55},

  // exit (189.5–197.5s)
  {id: 'exit-hold', at: 189.75, sourceStart: 238.56, sourceEnd: 245.45},

  // discovery (197.5–217.5s)
  {id: 'discovery-devices', at: 197.75, sourceStart: 246.44, sourceEnd: 248.9},
  {id: 'discovery-scan', at: 200.33, sourceStart: 249.24, sourceEnd: 266.25},

  // matrox-add (217.5–248s)
  {id: 'matrox-endpoints', at: 217.79, sourceStart: 267.46, sourceEnd: 273.4},
  {id: 'matrox-ipmx', at: 222.844, sourceStart: 274.08, sourceEnd: 276.8},
  {id: 'matrox-add-these', at: 225.359, sourceStart: 281.78, sourceEnd: 286.65},
  {id: 'matrox-one-click', at: 229.202, sourceStart: 287.04, sourceEnd: 303.65},

  // matrox-test (248–256s)
  {id: 'matrox-test-individual', at: 248.25, sourceStart: 328.91, sourceEnd: 330.8},
  {id: 'matrox-test-switch', at: 250.535, sourceStart: 333.53, sourceEnd: 337.65},

  // matrox-switch (256–279.5s)
  {id: 'matrox-switch-back', at: 256.25, sourceStart: 340.09, sourceEnd: 341.95},
  {id: 'matrox-switch-change', at: 258.42, sourceStart: 342.27, sourceEnd: 349.6},
  {id: 'matrox-switch-convertip', at: 264.281, sourceStart: 349.91, sourceEnd: 357.85},
  {id: 'matrox-switch-audio', at: 271.602, sourceStart: 358.53, sourceEnd: 363.95},

  // m2m (279.5–304s)
  {id: 'm2m-different', at: 279.75, sourceStart: 364.85, sourceEnd: 368.45},
  {id: 'm2m-press-click', at: 283.6, sourceStart: 368.99, sourceEnd: 373.45},
  {id: 'm2m-drag-drop', at: 288.058, sourceStart: 373.95, sourceEnd: 379.15},
  {id: 'm2m-send-all', at: 293.001, sourceStart: 379.63, sourceEnd: 382.3, wholeEdges: true},
  {id: 'm2m-anytime', at: 295.719, sourceStart: 382.33, sourceEnd: 389.55},

  // settings (304–325s)
  {id: 'settings-start-over', at: 304.25, sourceStart: 399.43, sourceEnd: 403.1},
  {id: 'settings-manual', at: 308.175, sourceStart: 404.5, sourceEnd: 408.05},
  {id: 'settings-quick-start', at: 311.16, sourceStart: 408.63, sourceEnd: 414.15},
  {id: 'settings-reset', at: 316.519, sourceStart: 414.73, sourceEnd: 421.05},

  // close (325–330s): silent — Nathan cut "Thank you for your time" (review 2026-10-05)
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
