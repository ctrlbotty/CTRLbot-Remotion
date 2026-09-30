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
  // 4:3, because that is the shape of the cell. The site fits these with
  // `object-fit:cover`, so a frame wider than the cell is not letterboxed, it is cut —
  // and the hub's widest shot is its connect row, which loses the connect button off one
  // edge and the control labels off the other. Render the shape the cell is.
  frame: {width: 1600, height: 1200, fps: 30},
  // Widened from 25/30/35 on 2026-08-14, and this is a spec change rather than a gate
  // being weakened to let a cut through. The cell is read, not watched: the site puts a
  // paragraph beside it and swaps the words on the beat, so the loop's length is set by
  // how long the copy takes to read, not by an attention budget. At 30s the blocks were
  // turning over faster than the panel could be read.
  duration: {min: 25, target: 45, max: 55},
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
 * The landscape cut of a long video: YouTube as a regular video, and ctrlbot.io.
 *
 * The loosest destination here, because the platform imposes almost nothing: no length
 * ceiling worth encoding, no banned-phrase policy of the kind Play enforces, and the
 * viewer chose to press play rather than being autoplayed at. What it does *not* relax is
 * `maxInertFraction`. That number is a house standard measured against the approved
 * First-Run cut, not a platform rule — a long format is permission to explain more, not
 * permission to hold a still picture for two minutes.
 *
 * Long videos are narrated, and every one is made in both shapes from one set of beats:
 * this one, and `SOCIAL_WALKTHROUGH_VERTICAL` for the feeds. There is no silent cut. This
 * shape keeps its frame for the step text and ships its captions as an .srt
 * (`npm run narration:srt`), which YouTube shows on request and spells as written.
 * `audio: muted-first` still holds: the step text has to carry the video on its own.
 *
 * The duration window is wide because this is the shape a walkthrough comes in, and the
 * 30-second website cut derived from it is a different destination, not a shorter one of
 * these. A long video also posted in portrait is held to the vertical ceiling, because
 * the two share their beats.
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
    'YouTube, as a regular video, with the .srt from npm run narration:srt uploaded as ' +
    'its captions. The feeds get the portrait cut, not this one.',
};

/**
 * The portrait cut of a long video: TikTok, YouTube Shorts, LinkedIn and X, one file for all
 * four, uploaded natively to each.
 *
 * 1080x1920 at 30fps, which every one of them takes as-is. The safe area is `SOCIAL_SHORT`'s,
 * the conservative union of the four feeds' overlays; it also keeps what matters inside the
 * middle 4:5 of the frame, so a feed that previews a tall video cropped loses nothing.
 *
 * The ceiling is 140 seconds because X caps uploads at 2:20 for accounts without Premium,
 * and this is the file X gets. YouTube files anything vertical at three minutes or less as
 * a Short, so this cut is also that channel's Short, with the landscape cut as its
 * related video.
 *
 * Captions are burned in: the feeds autoplay muted and their auto-captions misspell CTRLbot.
 * `firstImpressionSeconds` is the feeds' three, as for a short: the product's name and what
 * it does are composed at frame 0.
 */
export const SOCIAL_WALKTHROUGH_VERTICAL: Destination = {
  id: 'social-walkthrough-vertical',
  frame: {width: 1080, height: 1920, fps: 30},
  duration: {min: 60, target: 120, max: 140},
  audio: 'muted-first',
  safeArea: {top: 220, right: 140, bottom: 380, left: 72},
  firstImpressionSeconds: 3,
  maxInertFraction: 0.6,
  banned: [],
  hosting:
    'Uploaded natively to TikTok, YouTube (as a Short), LinkedIn and X. Captions are burned ' +
    'in. X refuses anything over 2:20 without Premium.',
};

/**
 * A 30-second vertical short: YouTube Shorts, Instagram Reels, TikTok, LinkedIn.
 *
 * Vertical because that is the frame those feeds fill; a 16:9 short plays letterboxed in
 * a third of the phone. The phone surfaces are native here, and landscape footage of a
 * PC app or a website sits in a panel under the headline. Tablet shorts use
 * `SOCIAL_SHORT_LANDSCAPE` instead.
 *
 * `safeArea` keeps essential text clear of the feeds' own overlays: the caption, handle
 * and audio strip along the bottom and the like/comment/share column down the right.
 * The values are the conservative union across the four platforms as of 2026-09; check
 * one real upload per platform before trusting them.
 *
 * `firstImpressionSeconds` is 3, not 10, and it is a policy rather than a measurement: a
 * feed decides whether to keep a viewer before a Play listing has finished loading. The
 * promise has to be on screen by then, which the validate gate enforces. Revisit it
 * against the first shorts' retention numbers, not against taste.
 *
 * `audio: muted-first` holds even with narration. LinkedIn and Facebook autoplay muted,
 * and plenty of people watch the others with the sound off, so the narration is burned in
 * as captions and the cut must still read with none of it.
 */
export const SOCIAL_SHORT: Destination = {
  id: 'social-short',
  frame: {width: 1080, height: 1920, fps: 30},
  duration: {min: 20, target: 30, max: 35},
  audio: 'muted-first',
  safeArea: {top: 220, right: 140, bottom: 380, left: 72},
  firstImpressionSeconds: 3,
  maxInertFraction: 0.6,
  banned: [],
  hosting:
    'Uploaded natively to each platform, never linked. Burn the captions in: platform ' +
    'auto-captions are not guaranteed and misspell CTRLbot.',
};

/**
 * The same 30-second short, landscape: tablet, Mirror and Terminator shorts, where the
 * surface itself is landscape and turning it on its side would waste the frame.
 *
 * 16:9 rather than the tablet's 16:10, because every feed and player that takes a
 * landscape upload letterboxes anything else. The tablet surface sits in a panel beside
 * the copy, as it does in every landscape marketing cut, so the aspect difference is a
 * composition rather than a crop. Everything else is `SOCIAL_SHORT`'s policy.
 */
export const SOCIAL_SHORT_LANDSCAPE: Destination = {
  ...SOCIAL_SHORT,
  id: 'social-short-landscape',
  frame: {width: 1920, height: 1080, fps: 30},
  safeArea: {top: 72, right: 72, bottom: 96, left: 72},
};

export const DESTINATIONS: Record<string, Destination> = {
  [PLAY_STORE_PREVIEW.id]: PLAY_STORE_PREVIEW,
  [PLAY_STORE_PREVIEW_MASTER.id]: PLAY_STORE_PREVIEW_MASTER,
  [WEBSITE_PANEL_LOOP.id]: WEBSITE_PANEL_LOOP,
  [WEBSITE_HUB_CELL.id]: WEBSITE_HUB_CELL,
  [SOCIAL_WALKTHROUGH.id]: SOCIAL_WALKTHROUGH,
  [SOCIAL_WALKTHROUGH_VERTICAL.id]: SOCIAL_WALKTHROUGH_VERTICAL,
  [SOCIAL_SHORT.id]: SOCIAL_SHORT,
  [SOCIAL_SHORT_LANDSCAPE.id]: SOCIAL_SHORT_LANDSCAPE,
};

