import type {NarrationClip} from '../../audio/NarrationTrack';

/** Loudness-normalized voice from `video input/CTRLbot-IoT Tablet Walkthrough v1.0.9.mp4`. */
export const IOT_TABLET_NARRATION_SOURCE =
  'narration/iot-tablet-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one to five per beat. Both
 * shapes play it; the portrait cut burns it in as captions and the landscape cut ships it
 * as an .srt (`npm run narration:srt`), both through src/audio/narrationCaptions.ts.
 *
 * Source times come from `ingest/iot-tablet-walkthrough/words.json` (transcript corrected
 * 2026-09-30). `at` places each clip inside its beat following the placement rule: first
 * clip at beat start + 0.25s, subsequent clips at previous clip end + 0.2s.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs transpiles it.
 */
export const IOT_TABLET_NARRATION_CLIPS = [
  // open (0–11s)
  {id: 'welcome', at: 0.25, sourceStart: 1.36, sourceEnd: 11.28},

  // first-run (11–24.5s)
  {id: 'first-run-tour', at: 11.25, sourceStart: 14.72, sourceEnd: 27.13},

  // ai (24.5–45s)
  {id: 'ai-intro', at: 24.75, sourceStart: 28.09, sourceEnd: 34.0},
  {id: 'ai-manual', at: 30.86, sourceStart: 34.51, sourceEnd: 41.8},
  {id: 'ai-help', at: 38.35, sourceStart: 43.31, sourceEnd: 49.6},

  // database (45–68s)
  {id: 'db-devices', at: 45.25, sourceStart: 53.85, sourceEnd: 64.2},
  {id: 'db-sorting', at: 55.8, sourceStart: 64.45, sourceEnd: 76.4},

  // epson (68–91.5s)
  {id: 'epson-add', at: 68.25, sourceStart: 76.77, sourceEnd: 78.25},
  {id: 'epson-info', at: 69.93, sourceStart: 79.55, sourceEnd: 86.25},
  {id: 'epson-webpage', at: 76.83, sourceStart: 86.29, sourceEnd: 94.85},
  {id: 'epson-connection', at: 85.59, sourceStart: 95.67, sourceEnd: 101.45},

  // add (91.5–107s)
  {id: 'add-ip', at: 91.75, sourceStart: 102.17, sourceEnd: 109.45},
  {id: 'add-saved', at: 99.23, sourceStart: 125.13, sourceEnd: 132.44},

  // terminal (107–113s)
  {id: 'term-commands', at: 107.25, sourceStart: 132.37, sourceEnd: 137.3},

  // test (113–141s)
  {id: 'test-device', at: 113.25, sourceStart: 139.99, sourceEnd: 149.75},
  {id: 'test-remote', at: 123.21, sourceStart: 149.97, sourceEnd: 153.35},
  {id: 'test-switcher', at: 126.79, sourceStart: 153.53, sourceEnd: 156.55},
  {id: 'test-terminal', at: 130.01, sourceStart: 157.43, sourceEnd: 163.65},
  {id: 'test-webpage', at: 136.43, sourceStart: 164.43, sourceEnd: 168.45},

  // activities (141–160s)
  {id: 'act-next', at: 141.25, sourceStart: 169.69, sourceEnd: 176.25},
  {id: 'act-customize', at: 148.01, sourceStart: 176.73, sourceEnd: 184.5},
  {id: 'act-presets', at: 155.98, sourceStart: 184.71, sourceEnd: 188.0},

  // switch-audio (160–176s)
  {id: 'switch-projector', at: 160.25, sourceStart: 187.83, sourceEnd: 191.25},
  {id: 'switch-assign', at: 163.87, sourceStart: 192.59, sourceEnd: 200.8},
  {id: 'switch-eui', at: 172.28, sourceStart: 201.51, sourceEnd: 205.05},

  // eui (176–200.5s)
  {id: 'eui-setup', at: 176.25, sourceStart: 205.63, sourceEnd: 216.95},
  {id: 'eui-technician', at: 187.77, sourceStart: 217.25, sourceEnd: 222.75},
  {id: 'eui-volume-mute', at: 193.47, sourceStart: 223.61, sourceEnd: 228.35},
  {id: 'eui-power', at: 198.41, sourceStart: 229.67, sourceEnd: 231.55},

  // exit (200.5–208.5s)
  {id: 'exit-hold', at: 200.75, sourceStart: 238.56, sourceEnd: 245.45},

  // discovery (208.5–228.5s)
  {id: 'discovery-devices', at: 208.75, sourceStart: 246.44, sourceEnd: 248.9},
  {id: 'discovery-scan', at: 211.41, sourceStart: 249.24, sourceEnd: 266.25},

  // matrox-add (228.5–259s)
  {id: 'matrox-endpoints', at: 228.75, sourceStart: 267.46, sourceEnd: 273.4},
  {id: 'matrox-ipmx', at: 234.89, sourceStart: 274.08, sourceEnd: 275.75},
  {id: 'matrox-add-these', at: 236.76, sourceStart: 281.78, sourceEnd: 286.65},
  {id: 'matrox-one-click', at: 241.83, sourceStart: 287.04, sourceEnd: 303.65},

  // matrox-test (259–266s)
  {id: 'matrox-test-individual', at: 259.25, sourceStart: 328.91, sourceEnd: 330.8},
  {id: 'matrox-test-switch', at: 261.34, sourceStart: 333.53, sourceEnd: 337.65},

  // matrox-switch (266–289.5s)
  {id: 'matrox-switch-back', at: 266.25, sourceStart: 340.09, sourceEnd: 341.95},
  {id: 'matrox-switch-change', at: 268.31, sourceStart: 342.27, sourceEnd: 349.6},
  {id: 'matrox-switch-convertip', at: 275.84, sourceStart: 349.91, sourceEnd: 357.85},
  {id: 'matrox-switch-audio', at: 283.98, sourceStart: 358.53, sourceEnd: 363.95},

  // m2m (289.5–314s)
  {id: 'm2m-different', at: 289.75, sourceStart: 364.85, sourceEnd: 368.45},
  {id: 'm2m-press-click', at: 293.55, sourceStart: 368.99, sourceEnd: 373.45},
  {id: 'm2m-drag-drop', at: 298.21, sourceStart: 373.95, sourceEnd: 379.15},
  {id: 'm2m-send-all', at: 303.61, sourceStart: 379.63, sourceEnd: 382.3},
  {id: 'm2m-anytime', at: 306.48, sourceStart: 382.33, sourceEnd: 389.55},

  // settings (314–335s)
  {id: 'settings-start-over', at: 314.25, sourceStart: 399.43, sourceEnd: 403.95},
  {id: 'settings-manual', at: 318.97, sourceStart: 404.09, sourceEnd: 407.25},
  {id: 'settings-quick-start', at: 322.33, sourceStart: 408.63, sourceEnd: 414.15},
  {id: 'settings-reset', at: 328.05, sourceStart: 414.73, sourceEnd: 421.05},

  // close (335–340s)
  {id: 'close-thanks', at: 335.25, sourceStart: 422.96, sourceEnd: 424.05},
] as const satisfies readonly NarrationClip[];

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
