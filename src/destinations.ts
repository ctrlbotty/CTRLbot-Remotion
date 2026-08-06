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

/**
 * A looping motion-graphic panel in a ctrlbot.io media cell.
 *
 * Not a video in the sense the other destinations mean it. That site's layout grammar is
 * a wall of units — media cell beside a text panel, alternating left and right — so the
 * words are HTML and the render carries the surface alone. Which is why there is no
 * banned-phrase list: nothing in the frame is a sentence. Copy rules for ctrlbot.io live
 * in that repo's README and the approved-claims documents it cites, and they govern the
 * paragraph beside the cell, not this file.
 *
 * **The cell is sized by this render, not the other way round.** That is worth stating
 * because the site's other media cells work the opposite way: they are `object-fit:
 * cover`, so the cell's shape wins and the image is cropped to fit it. Measured on the
 * live wall, a cover cell ranges from 1.60:1 on a 375px phone to 3.07:1 on a 2560px
 * desktop — the wall is full-bleed, so cell width tracks viewport width while the text
 * beside it stays about as tall. No single render survives a 2:1 spread of aspect: at
 * 3.07:1 a 16:9 source loses 42% of its height, which cuts through the volume strip.
 *
 * So the loop cells opt out. `.media.loop` puts the video in normal flow instead, and
 * the row takes its height from the video's own 16:9 — nothing is cropped at any
 * viewport width, and there are no letterbox bands either. The cost is that the text
 * beside it must stay short enough to fit that height; overrun and the row grows and the
 * video centres inside it with bands. See that repo's site.css.
 *
 * `safeArea` is therefore an ordinary composition margin here, not a crop budget.
 *
 * The duration window is short because the loop repeats while somebody reads the
 * paragraph next to it. Long enough to show a whole interaction, short enough that the
 * file is small and the viewer sees the start of the cycle rather than the middle.
 *
 * The gate that matters for this destination is `npm run loop:seam`. Frame 0 and the
 * frame after the last one have to be the same picture, and nothing else in this
 * repository can see that.
 */
export const WEBSITE_PANEL_LOOP: Destination = {
  id: 'website-panel-loop',
  // 16:10, matching the app's 1280x800 surface. A 16:9 frame caps how wide an
  // aspect-matched panel can be, and the panel's width is the whole legibility budget:
  // the cell is about 908 CSS pixels on a desktop, so every frame pixel not spent on the
  // interface is a frame pixel not available to make its text crisp.
  frame: {width: 1920, height: 1200, fps: 30},
  duration: {min: 8, target: 10, max: 12},
  audio: 'muted-first',
  safeArea: {top: 72, right: 72, bottom: 72, left: 72},
  // The whole loop. Autoplay in a scrolled-past cell guarantees nothing, so there is no
  // second half to defer anything to.
  firstImpressionSeconds: 10,
  maxInertFraction: 0.6,
  banned: [],
  hosting:
    'Committed to ctrlbot-io-site under assets/ and served by Cloudflare Pages. Assets ' +
    'there sit on a fixed-URL four-hour cache with no content hash, so ship a new ' +
    'filename rather than overwriting one — see that repo\'s README, "Cache busting".',
};

export const DESTINATIONS: Record<string, Destination> = {
  [PLAY_STORE_PREVIEW.id]: PLAY_STORE_PREVIEW,
  [PLAY_STORE_PREVIEW_MASTER.id]: PLAY_STORE_PREVIEW_MASTER,
  [WEBSITE_PANEL_LOOP.id]: WEBSITE_PANEL_LOOP,
};

