import type {NarrationClip} from '../../audio/NarrationTrack';

/** Loudness-normalized voice from `video input/CTRLbot-IoT Phone Walkthrough v1.0.9.mp4`. */
export const IOT_PHONE_NARRATION_SOURCE =
  'narration/iot-phone-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one to five per beat. Both
 * shapes play it; the portrait cut burns it in as captions and the landscape cut ships it
 * as an .srt (`npm run narration:srt`), both through src/audio/narrationCaptions.ts.
 *
 * Source times come from `ingest/iot-phone-walkthrough/words.json` (transcript corrected
 * 2026-09-30). `at` places each clip inside its beat following the placement rule: first
 * clip at beat start + 0.25s, subsequent clips at previous clip end + 0.2s.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs transpiles it.
 */
export const IOT_PHONE_NARRATION_CLIPS = [
  // open (0–11s)
  {id: 'welcome', at: 0.25, sourceStart: 1.2, sourceEnd: 10.3},

  // first-run (11–27.5s)
  {id: 'first-run-intro', at: 11.25, sourceStart: 12.7, sourceEnd: 20.6},
  {id: 'first-run-tour', at: 19.35, sourceStart: 21.4, sourceEnd: 28.6},

  // ai (27.5–46s)
  {id: 'ai-intro', at: 27.75, sourceStart: 28.6, sourceEnd: 33.5},
  {id: 'ai-troubleshooter', at: 32.85, sourceStart: 33.9, sourceEnd: 39.1},
  {id: 'ai-help', at: 38.25, sourceStart: 39.3, sourceEnd: 46.6},

  // database (46–71s)
  {id: 'db-intro', at: 46.25, sourceStart: 48.3, sourceEnd: 52.3},
  {id: 'db-extensive', at: 50.45, sourceStart: 53.2, sourceEnd: 55.3},
  {id: 'db-commands', at: 52.75, sourceStart: 57.2, sourceEnd: 61.6},
  {id: 'db-endpoints', at: 57.35, sourceStart: 61.9, sourceEnd: 67.1},
  {id: 'db-sit-network', at: 62.75, sourceStart: 68.8, sourceEnd: 76.8},

  // epson (71–86s)
  {id: 'epson-select', at: 71.25, sourceStart: 78.0, sourceEnd: 80.9},
  {id: 'epson-specs', at: 74.35, sourceStart: 83.1, sourceEnd: 88.6},
  {id: 'epson-product-page', at: 80.05, sourceStart: 88.6, sourceEnd: 94.1},

  // add (86–95.5s)
  {id: 'add-ip', at: 86.25, sourceStart: 101.9, sourceEnd: 107.6},
  {id: 'add-saved', at: 92.15, sourceStart: 112.9, sourceEnd: 115.9},

  // terminal (95.5–111s)
  {id: 'term-testing', at: 95.75, sourceStart: 116.5, sourceEnd: 123.7},
  {id: 'term-message', at: 103.15, sourceStart: 123.7, sourceEnd: 130.9},

  // test (111–131s)
  {id: 'test-saves', at: 111.25, sourceStart: 135.4, sourceEnd: 138.8},
  {id: 'test-remote', at: 114.85, sourceStart: 139.3, sourceEnd: 143.8},
  {id: 'test-webpage', at: 119.55, sourceStart: 144.0, sourceEnd: 154.7},

  // activities (131–151s)
  {id: 'act-intro', at: 131.25, sourceStart: 160.8, sourceEnd: 162.8},
  {id: 'act-setup', at: 133.45, sourceStart: 163.8, sourceEnd: 172.4},
  {id: 'act-power-on', at: 142.25, sourceStart: 173.4, sourceEnd: 181.9},

  // switch-audio (151–168.5s)
  {id: 'switch-audio-setup', at: 151.25, sourceStart: 183.6, sourceEnd: 193.6},
  {id: 'switch-audio-eui', at: 161.45, sourceStart: 193.7, sourceEnd: 200.0},

  // eui (168.5–194s)
  {id: 'eui-control', at: 168.75, sourceStart: 201.5, sourceEnd: 204.6},
  {id: 'eui-screen', at: 172.05, sourceStart: 204.6, sourceEnd: 219.2},
  {id: 'eui-power', at: 186.85, sourceStart: 219.6, sourceEnd: 226.4},

  // exit (194–203s)
  {id: 'exit-hold', at: 194.25, sourceStart: 230.2, sourceEnd: 238.4},

  // discovery (203–221.5s)
  {id: 'discovery-intro', at: 203.25, sourceStart: 242.0, sourceEnd: 247.8},
  {id: 'discovery-scan', at: 209.25, sourceStart: 248.9, sourceEnd: 260.6},

  // matrox-add (221.5–250s)
  {id: 'matrox-add-intro', at: 221.75, sourceStart: 262.2, sourceEnd: 270.9},
  {id: 'matrox-add-saving', at: 230.65, sourceStart: 285.6, sourceEnd: 293.5},
  {id: 'matrox-add-certs', at: 238.75, sourceStart: 293.5, sourceEnd: 304.1},

  // matrox-test (250–268.5s)
  {id: 'matrox-test-menu', at: 250.25, sourceStart: 310.4, sourceEnd: 313.9},
  {id: 'matrox-test-switcher', at: 253.95, sourceStart: 317.4, sourceEnd: 326.6},
  {id: 'matrox-test-single', at: 263.35, sourceStart: 327.2, sourceEnd: 332.0},

  // matrox-switch (268.5–285.5s)
  {id: 'matrox-switch-menu', at: 268.75, sourceStart: 333.3, sourceEnd: 341.6},
  {id: 'matrox-switch-setup', at: 277.25, sourceStart: 342.9, sourceEnd: 346.9},
  {id: 'matrox-switch-labels', at: 281.45, sourceStart: 346.8, sourceEnd: 350.5},

  // m2m (285.5–312s)
  {id: 'm2m-intro', at: 285.75, sourceStart: 351.6, sourceEnd: 353.3},
  {id: 'm2m-displays', at: 287.65, sourceStart: 354.3, sourceEnd: 361.5},
  {id: 'm2m-drag', at: 295.05, sourceStart: 362.1, sourceEnd: 368.1},
  {id: 'm2m-drop', at: 301.25, sourceStart: 372.8, sourceEnd: 376.6},
  {id: 'm2m-all', at: 305.25, sourceStart: 377.8, sourceEnd: 384.3},

  // settings (312–327s)
  {id: 'settings-setup', at: 312.25, sourceStart: 390.8, sourceEnd: 395.0},
  {id: 'settings-support', at: 316.65, sourceStart: 396.2, sourceEnd: 406.1},

  // close (327–333s)
  {id: 'close-thanks', at: 327.25, sourceStart: 409.2, sourceEnd: 410.4},
  {id: 'close-hope', at: 328.65, sourceStart: 411.1, sourceEnd: 412.6},
] as const satisfies readonly NarrationClip[];

/** Spelling corrections for words Whisper misheard in this recording. */
export const IOT_PHONE_CAPTION_CORRECTIONS: Record<string, string> = {
  ControlBot: 'CTRLbot',
  RS: 'RS-232',
  '-232': '',
};
