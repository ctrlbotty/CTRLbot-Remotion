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
 * **The cell's shape is fixed by the site, and the render is cut to match it.** That
 * wall — `.loop-board` in the site's CSS — alternates a 16:10 tile with a 1:1 one and
 * swaps sides each row, so a loop is rendered at whichever shape its row is: this
 * destination's frame for the wide rows, `WEB_LOOP_SQUARE` for the narrow ones. A square
 * tile is not a crop of the wide render; cutting 16:10 to 1:1 loses a third of the width,
 * and the first thing to go is the source column.
 *
 * An earlier version worked the other way round — one 16:9 render in a cell that took its
 * height from the video. That was a response to a real measurement (a `cover` cell on the
 * full-bleed wall ranges from 1.60:1 on a 375px phone to 3.07:1 at 2560px, and no single
 * render survives a 2:1 spread of aspect), but it made the row height a function of the
 * file, which is backwards for a layout. Declaring both shapes is the fix.
 *
 * `safeArea` is an ordinary composition margin here, not a crop budget — with one
 * exception that lives in `WEB_LOOP_SQUARE`: below 900px the wall stacks and every tile
 * shows 16:10, so the square render *is* cropped, 225px off the top and bottom. Its panel
 * heights are set by that, not by how the 1:1 tile looks on its own.
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

/**
 * The 30-second device-database loop in ctrlbot.io's full-bleed Hub media cell.
 *
 * This is longer than the small interaction loops above because it has to show the
 * breadth of the shelf and the manual, connection, and API carried by one driver. The
 * same seam rule still applies: the frame after the last must be the opening frame.
 */
export const WEBSITE_HUB_CELL: Destination = {
  id: 'website-hub-cell',
  frame: {width: 1920, height: 1200, fps: 30},
  duration: {min: 25, target: 30, max: 35},
  audio: 'muted-first',
  safeArea: {top: 72, right: 72, bottom: 72, left: 72},
  firstImpressionSeconds: 10,
  maxInertFraction: 0.6,
  banned: [],
  hosting:
    'Committed to ctrlbot-io-site under assets/loops/ and served from a fixed URL with ' +
    'a four-hour cache and no content hash, so every revision needs a new filename.',
};

/**
 * A product walkthrough posted to YouTube or shared as a social promo.
 *
 * The loosest destination here, because the platform imposes almost nothing: no length
 * ceiling worth encoding, no banned-phrase policy of the kind Play enforces, and the
 * viewer chose to press play rather than being autoplayed at. What it does *not* relax is
 * `maxInertFraction`. That number is a house standard measured against the approved
 * First-Run cut, not a platform rule — a long format is permission to explain more, not
 * permission to hold a still picture for two minutes.
 *
 * `audio: muted-first` is kept for the same reason it is kept everywhere else: social
 * timelines autoplay muted, and this cut carries no voice track.
 *
 * The duration window is wide because this is the shape a walkthrough comes in, and the
 * 30-second website cut derived from it is a different destination, not a shorter one of
 * these.
 */
export const SOCIAL_WALKTHROUGH: Destination = {
  id: 'social-walkthrough',
  frame: {width: 1920, height: 1080, fps: 30},
  duration: {min: 60, target: 120, max: 180},
  audio: 'muted-first',
  safeArea: {top: 72, right: 72, bottom: 96, left: 72},
  firstImpressionSeconds: 10,
  maxInertFraction: 0.6,
  banned: [],
  hosting:
    'YouTube, public or unlisted, and re-uploaded natively to each social platform ' +
    'rather than linked — timelines do not autoplay a link.',
};

export const DESTINATIONS: Record<string, Destination> = {
  [PLAY_STORE_PREVIEW.id]: PLAY_STORE_PREVIEW,
  [PLAY_STORE_PREVIEW_MASTER.id]: PLAY_STORE_PREVIEW_MASTER,
  [WEBSITE_PANEL_LOOP.id]: WEBSITE_PANEL_LOOP,
  [WEBSITE_HUB_CELL.id]: WEBSITE_HUB_CELL,
  [SOCIAL_WALKTHROUGH.id]: SOCIAL_WALKTHROUGH,
};

