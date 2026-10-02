/** Loudness-normalized voice from `video input/CTRLbot-IoT Phone Walkthrough v1.0.9.mp4`. */
export const IOT_PHONE_NARRATION_SOURCE =
  'narration/iot-phone-walkthrough/source-normalized.m4a';

/**
 * The narrated edit (revision 2): complete phrases from Nathan's recording, one to three per
 * beat. Planned with `npm run narration:edit` over a 336s cut (10080 frames). Both shapes play
 * it; the portrait cut burns it in as captions and the landscape cut ships it as an .srt
 * (`npm run narration:srt`), both through src/audio/narrationCaptions.ts.
 *
 * Source times come from `ingest/iot-phone-walkthrough/words.json` (transcript corrected
 * 2026-09-30). `at` places each clip inside its beat: the first clip at the beat's start +
 * 0.25s, each next one 0.2s after the previous clip's planned end. `welcome` runs from
 * `open` into `proof` on purpose.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs and narration-edit.mjs
 * transpile it.
 */
export const IOT_PHONE_NARRATION_CLIPS = [
  // open (0–5s) → runs into proof (5–11s)
  {id: 'welcome', at: 0.25, sourceStart: 1.2, sourceEnd: 10.3},

  // first-run (11–27.5s)
  {id: 'first-run-intro', at: 11.25, sourceStart: 12.7, sourceEnd: 20.6},
  // Whisper stretches "The" (ai-intro) back to 28.7s, over "You're also,"; the clip ends with "to."
  {id: 'first-run-tour', at: 18.96, sourceStart: 21.4, sourceEnd: 28.6, notAfter: 28.6},

  // ai (27.5–46s)
  {id: 'ai-intro', at: 27.75, sourceStart: 28.6, sourceEnd: 33.5},
  {id: 'ai-troubleshooter', at: 31.05, sourceStart: 33.9, sourceEnd: 39.1},
  {id: 'ai-help', at: 35.38, sourceStart: 39.3, sourceEnd: 46.6},

  // database (46–71s)
  {id: 'db-intro', at: 46.25, sourceStart: 48.3, sourceEnd: 52.3},
  {id: 'db-extensive', at: 50.18, sourceStart: 53.2, sourceEnd: 55.3},
  {id: 'db-commands', at: 52.48, sourceStart: 57.2, sourceEnd: 61.6},
  {id: 'db-endpoints', at: 56.81, sourceStart: 61.9, sourceEnd: 67.1},
  {id: 'db-sit-network', at: 61.81, sourceStart: 68.8, sourceEnd: 76.8},

  // epson (71–86s)
  {id: 'epson-select', at: 71.25, sourceStart: 78, sourceEnd: 80.9},
  {id: 'epson-specs', at: 74.16, sourceStart: 83.1, sourceEnd: 88.6},
  {id: 'epson-product-page', at: 79.54, sourceStart: 88.6, sourceEnd: 94.1},

  // add (86–95.5s)
  {id: 'add-ip', at: 86.39, sourceStart: 101.9, sourceEnd: 107.6},
  {id: 'add-saved', at: 90.87, sourceStart: 112.9, sourceEnd: 115.9},

  // terminal (95.5–111s)
  {id: 'term-testing', at: 95.75, sourceStart: 116.5, sourceEnd: 123.7},
  {id: 'term-message', at: 103.04, sourceStart: 123.7, sourceEnd: 130.9},

  // test (111–131s)
  // Keeps "connection." (ends ~138.85s; next phrase starts 139.38s).
  {id: 'test-saves', at: 111.27, sourceStart: 135.4, sourceEnd: 139.0, notAfter: 139.2},
  {id: 'test-remote', at: 114.9, sourceStart: 139.3, sourceEnd: 143.8},
  {id: 'test-webpage', at: 118.72, sourceStart: 144, sourceEnd: 154.7},

  // activities (131–152s)
  {id: 'act-intro', at: 131.25, sourceStart: 160.8, sourceEnd: 162.8},
  {id: 'act-setup', at: 133.26, sourceStart: 163.8, sourceEnd: 172.4},
  {id: 'act-power-on', at: 140.32, sourceStart: 173.4, sourceEnd: 182.7},

  // switch-audio (152–169.5s)
  // sourceEnd inside the "right?" span: that word is a "Bye" (193.32–193.47) in the audio, not part of the phrase.
  {id: 'switch-audio-setup', at: 152.25, sourceStart: 183.6, sourceEnd: 192.6},
  {id: 'switch-audio-eui', at: 160.03, sourceStart: 193.7, sourceEnd: 200},

  // eui (169.5–195s)
  {id: 'eui-control', at: 169.75, sourceStart: 201.5, sourceEnd: 204.6},
  // Keeps "screen." whole (ends ~219.2s) without leaking into "They" (219.74s).
  {id: 'eui-screen', at: 172.35, sourceStart: 204.6, sourceEnd: 219.3, notAfter: 219.6},
  // notBefore: avoids repeating the tail of "screen." before "They" starts at 219.74s.
  {id: 'eui-power', at: 185.59, sourceStart: 219.6, sourceEnd: 226.4, notBefore: 219.6},

  // exit (195–205s)
  {id: 'exit-hold', at: 195.25, sourceStart: 230.2, sourceEnd: 239.1},

  // discovery (205–224.5s)
  {id: 'discovery-intro', at: 205.25, sourceStart: 242, sourceEnd: 247.8},
  {id: 'discovery-scan', at: 210.66, sourceStart: 248.9, sourceEnd: 261.3},

  // matrox-add (224.5–253s)
  {id: 'matrox-add-intro', at: 224.75, sourceStart: 262.2, sourceEnd: 270.9},
  {id: 'matrox-add-saving', at: 232.12, sourceStart: 285.6, sourceEnd: 304.1},

  // matrox-test (253–271.5s)
  {id: 'matrox-test-menu', at: 253.25, sourceStart: 310.4, sourceEnd: 313.9},
  {id: 'matrox-test-switcher', at: 256.89, sourceStart: 317.4, sourceEnd: 326.6},
  // "If" of "If at any point" ends just before; the captions start at "At".
  {id: 'matrox-test-single', at: 265.89, sourceStart: 327.2, sourceEnd: 332, notBefore: 327.68},

  // matrox-switch (271.5–288.5s)
  {id: 'matrox-switch-menu', at: 271.75, sourceStart: 333.3, sourceEnd: 341.6},
  {id: 'matrox-switch-setup', at: 278.66, sourceStart: 342.9, sourceEnd: 346.85},
  // notAfter: silence 351.88–351.95; stops before "Let's" onset at 351.96s.
  {id: 'matrox-switch-labels', at: 282.51, sourceStart: 346.9, sourceEnd: 351, notAfter: 351.92},

  // m2m (288.5–315s)
  // notBefore: starts in silence ~351.90s so "Let's" is whole here.
  {id: 'm2m-intro', at: 288.75, sourceStart: 351.6, sourceEnd: 353.3, notBefore: 351.9},
  {id: 'm2m-displays', at: 290.55, sourceStart: 354.3, sourceEnd: 361.5},
  // A "You" follows "display." at 368.11s.
  {id: 'm2m-drag', at: 296.64, sourceStart: 362.1, sourceEnd: 368.1, notAfter: 368.14},
  {id: 'm2m-drop', at: 301.65, sourceStart: 372.8, sourceEnd: 376.6},
  {id: 'm2m-all', at: 304.94, sourceStart: 377.8, sourceEnd: 384.3},

  // settings (315–330.5s)
  // "And" before "again" (390.86–390.90). notAfter keeps "button." whole (sounds until ~395.1s).
  {id: 'settings-setup', at: 315.25, sourceStart: 390.8, sourceEnd: 395.3, notBefore: 390.93, notAfter: 395.3},
  // "And then" begins 396.26s.
  {id: 'settings-support', at: 319.65, sourceStart: 396.2, sourceEnd: 406.1, notBefore: 396.2},

  // close (330.5–336s)
  {id: 'close-thanks', at: 330.75, sourceStart: 409.2, sourceEnd: 410.4},
  {id: 'close-hope', at: 332.1, sourceStart: 411.1, sourceEnd: 412.6},
];

/** Spelling corrections for words Whisper misheard in this recording. */
export const IOT_PHONE_CAPTION_CORRECTIONS: Record<string, string> = {
  ControlBot: 'CTRLbot',
  RS: 'RS-232',
  '-232': '',
};
