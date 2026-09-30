// How big the ctrlbot.ai page is, in CSS pixels.
//
// The other surfaces in app-ui/ lay out in Android dp because they are rebuilds of
// Android layouts. This one is a website, so its natural unit is the CSS pixel and its
// natural size is a browser viewport — which is a choice rather than a device spec, the
// way 360x780 is a device spec.
//
// 810x611 is the viewport the page is rendered *at*, not the size it appears on screen.
// `BrowserFrame` scales it up to fill the stage panel (about 1.3x at 1920x1080), which is
// why 16px body copy stays legible in the frame. Picking a narrower viewport and scaling
// it up is how a screen recording of a half-width browser window reads, and it is the
// only way the site's real 650px content column fills a panel without the type dropping
// to 12px in the frame.
//
// Every measurement in CtrlbotWeb is the site's own, straight out of
// `../../0 - CTRLbot.ai/ctrlbot.ai/public/index.html`. Nothing here is scaled by hand — the
// scale lives in one place, on the frame.

export const WEB_VIEWPORT = {width: 810, height: 611} as const;

/**
 * The viewport for a full-bleed 16:10 cell, where there is no browser around the page.
 *
 * 960x600 is exactly half of 1920x1200, so the scale is 2 and every CSS pixel lands on a
 * whole pair of frame pixels — no resampling of the interface at all, which matters more
 * here than in the promo: `loop:render` supersamples at 2x and downsamples with lanczos
 * precisely because a surface being resampled to a slightly different size every frame
 * crawls, and starting from an integer scale is one less reason for it to.
 *
 * It is wider than `WEB_VIEWPORT` in proportion because 16:10 is a wider box than the
 * browser panel's 4:3-ish content area, not because the page is drawn any differently.
 * The site's 650px content column sits in the middle of it either way.
 */
export const WEB_VIEWPORT_WIDE = {width: 960, height: 600} as const;

/** The site's content column: `#container { max-width: 650px }`. */
export const WEB_CONTAINER_WIDTH = 650;

/** `#qai-container` and `#lai-container` are both 500px wide. */
export const WEB_PANEL_WIDTH = 500;
