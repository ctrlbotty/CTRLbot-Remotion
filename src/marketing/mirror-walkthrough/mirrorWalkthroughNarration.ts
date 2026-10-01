/** Loudness-normalized voice from `video input/CTRLbot Mirror Tutorial.mp4`. */
export const MIRROR_WALKTHROUGH_NARRATION_SOURCE =
  'narration/mirror-walkthrough/source-normalized.m4a';

/**
 * The narrated edit: complete phrases from Nathan's recording, one or two per beat.
 * Planned with `npm run narration:edit`.
 *
 * Source ranges in seconds on the prepared track from the Narration clips table in
 * `videos/mirror-walkthrough.md`.
 *
 * KEEP THIS FILE free of runtime imports: scripts/narration-srt.mjs and narration-edit.mjs
 * transpile it.
 */
export const MIRROR_WALKTHROUGH_NARRATION_CLIPS = [
  // open → proof: "Welcome to CTRLbot. This will be a walkthrough of one of our utilities called CTRLbot Mirror,"
  {id: 'welcome', at: 0.35, sourceStart: 0.33, sourceEnd: 9.0},

  // proof: "basically a way to mirror what is on your Android phone or tablet."
  {id: 'mirror-what', at: 8.95, sourceStart: 10.65, sourceEnd: 16.85},

  // setup: "So I've done the basic installation, but what we also have to do is we have to install ADB … but also manage applications on it"
  {id: 'install-adb', at: 17.25, sourceStart: 30.4, sourceEnd: 44.0},

  // debugging: "make sure that USB debugging mode is on"
  {id: 'usb-debugging', at: 32.25, sourceStart: 190.45, sourceEnd: 196.45},

  // connect: "asked to authorize that connection"
  {id: 'authorize', at: 40.25, sourceStart: 93.15, sourceEnd: 99.05},
  // connect: "… green and ready … start mirroring"
  {id: 'ready', at: 46.17, sourceStart: 99.3, sourceEnd: 106.75},

  // frame: "pick one of these other ones … a better fit"
  {id: 'pick-frame', at: 54.75, sourceStart: 118.5, sourceEnd: 127.05},
  // frame: "… padding and shadow and such"
  {id: 'padding', at: 61.76, sourceStart: 130.2, sourceEnd: 135.3},

  // paste: "… copying and pasting … cumbersome to do straight from the panel"
  {id: 'copy-paste', at: 69.75, sourceStart: 224.5, sourceEnd: 237.8},

  // capture: "… hit the screenshot button"
  {id: 'screenshot', at: 84.25, sourceStart: 311.35, sourceEnd: 316.8},
  // capture: "… record it as video"
  {id: 'record-video', at: 88.70, sourceStart: 330.25, sourceEnd: 335.35},
  // capture: "It's also going to record your voice."
  {id: 'record-voice', at: 93.10, sourceStart: 342.8, sourceEnd: 344.8},

  // apps: "You have access to all the apps … delete, remove stuff in here"
  {id: 'apps', at: 98.25, sourceStart: 388.7, sourceEnd: 401.67},

  // files: "If you wanted to look at your images, you'd be able to copy stuff over right here."
  // notBefore: Whisper stretches "If" back over "…file system, right?".
  {id: 'files-copy', at: 112.25, sourceStart: 454.3, sourceEnd: 459.2, notBefore: 454.45},

  // tools: "we have also a shell … look at the logs for the device if you want."
  {id: 'shell-logs', at: 119.25, sourceStart: 473.0, sourceEnd: 479.6},

  // again: "you can come back to this setup if you're ever having problems."
  // notBefore: "So, a little" is a false start run into "you can"; the clip starts after it.
  // notAfter: a "Bye" follows "problems." at 497.87s.
  {id: 'setup-again', at: 127.25, sourceStart: 494.25, sourceEnd: 497.65, notBefore: 494.65, notAfter: 497.75},

  // close: "Thank you for your time"
  {id: 'thank-you', at: 131.75, sourceStart: 500.85, sourceEnd: 503.0},
];
