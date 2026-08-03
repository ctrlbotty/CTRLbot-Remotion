// Where a video is going, expressed as constraints a machine can check.
//
// The promo that preceded this file complied with Google's preview rules by luck: no
// call to action appeared in it because nobody wrote one, not because anything stopped
// them. A destination is the difference between those two states.
//
// Compositions import from here for frame size and safe area; `scripts/video-lint.mjs`
// reads the same objects for the banned phrases and the timing thresholds, so a rule
// and the code it governs can never disagree.
//
// KEEP THIS FILE IMPORT-FREE. The linter transpiles it and imports the result directly,
// which is what lets one definition serve both a .tsx composition and a .mjs script
// without a build step or a duplicated JSON mirror. An import here breaks that.

export type Destination = {
  id: string;
  /** Frame geometry the composition must be registered at. */
  frame: {width: number; height: number; fps: number};
  /** Seconds. `max` is a hard ceiling the render gate enforces. */
  duration: {min: number; target: number; max: number};
  /** `muted-first` means the cut has to work with no sound at all. */
  audio: 'muted-first' | 'sound-on';
  /** Frame pixels. Essential text may not land inside this margin. */
  safeArea: {top: number; right: number; bottom: number; left: number};
  /**
   * How long the viewer is assumed to give it. The promise has to be fully on screen
   * before this, because on an autoplay surface nothing after it is guaranteed to play.
   */
  firstImpressionSeconds: number;
  /**
   * How much of the cut may show no perceptible change, 0..1.
   *
   * Not a limit on how long one shot may hold — AUTHORING.md requires a hold before and
   * after every camera move, and measurement confirmed the approved First-Run cut holds
   * *longer* than the promo it replaced. What separates them is the total. See the
   * calibration note in scripts/video-frames.mjs.
   */
  maxInertFraction: number;
  /**
   * Phrases the destination's own policy forbids.
   *
   * Reading speed is deliberately not here. It is a house standard calibrated against
   * the approved First-Run cut in video-lint.mjs, and a Play rule has no business
   * governing the pace of a training scene that will never go to Play.
   */
  banned: {pattern: RegExp; why: string}[];
  /** Publishing constraints that no linter can check. Printed by the render gate. */
  hosting: string;
};

/**
 * Google Play store listing preview video.
 *
 * Confirmed against Google's preview-asset guidance on 2026-08-02:
 * https://support.google.com/googleplay/android-developer/answer/9866151
 *
 * Landscape and portrait are both accepted. Only the first 30 seconds autoplay, and
 * they autoplay muted — so 30s is treated as the ceiling rather than the recommendation,
 * and `audio: muted-first` is not a stylistic choice.
 */
export const PLAY_STORE_PREVIEW: Destination = {
  id: 'play-store-preview',
  frame: {width: 1920, height: 1080, fps: 30},
  duration: {min: 15, target: 30, max: 30},
  audio: 'muted-first',
  safeArea: {top: 72, right: 72, bottom: 96, left: 72},
  firstImpressionSeconds: 10,
  maxInertFraction: 0.6,
  banned: [
    {pattern: /\b(download|install|play|try|get it|buy)\s+(now|today)\b/i, why: 'Play forbids calls to action in a preview video'},
    {pattern: /\b#1\b|\bnumber one\b/i, why: 'Play forbids ranking claims'},
    {pattern: /\b(best|top[- ]rated|award[- ]winning|highest[- ]rated)\b/i, why: 'Play forbids ranking and accolade claims'},
    {pattern: /\b(testimonial|reviewers? say|customers? say)\b/i, why: 'Play forbids user testimonials'},
    {pattern: /\$\d|\b\d+\s*(usd|dollars?)\b|\bfree\s+(trial|download)\b/i, why: 'Play forbids price and promotional information'},
    {pattern: /\bgoogle play\b|\bplay store\b/i, why: 'Play forbids Play branding inside the asset'},
  ],
  hosting:
    'YouTube, public or unlisted (never private), ads disabled, plain video URL — ' +
    'not a playlist or channel, and no extra parameters such as a timecode.',
};

/**
 * Master cut (60s) for Google Play store preview video, from which the 30s Play cut is derived.
 */
export const PLAY_STORE_PREVIEW_MASTER: Destination = {
  ...PLAY_STORE_PREVIEW,
  id: 'play-store-preview-master',
  duration: {min: 45, target: 60, max: 60},
};

export const DESTINATIONS: Record<string, Destination> = {
  [PLAY_STORE_PREVIEW.id]: PLAY_STORE_PREVIEW,
  [PLAY_STORE_PREVIEW_MASTER.id]: PLAY_STORE_PREVIEW_MASTER,
};

