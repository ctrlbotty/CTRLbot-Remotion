// Video-facing design decisions, derived from the app's real tokens.
//
// tokens.generated.ts is the raw mirror of the Android resources. This file is the
// curated layer: it picks which app tokens carry meaning on screen, and adds the
// things a 1080p video needs that a 13sp phone UI does not (a display type ramp).
// Compositions import from here — not from tokens.generated.
//
// Surface sizes live in app-ui/viewports.ts, deliberately not here.

import {appColors, appDimens} from './tokens.generated';

/**
 * Semantic palette. Left column is the app token it comes from, so a drift in
 * the app shows up here rather than being silently re-invented.
 */
export const color = {
  // Surfaces — the app's real card greys, darkest to lightest.
  void: appColors.black, //            #000000  window background
  base: appColors.gray10, //           #1A1A1A  page
  surface: appColors.gray15, //        #313131  raised panel
  card: appColors.switcherCardBg, //   #2D2D2D  switcher card
  cardAlt: appColors.displayCardBg, // #2F2F2F  display card
  cardHigh: appColors.gray20, //       #383838  endpoint card / hover
  dialog: appColors.firstRunDialogBackground, // #292929

  // Lines and dividers.
  line: appColors.gray25, //           #404040
  lineSoft: appColors.white25,

  // Text.
  text: appColors.white,
  textMuted: appColors.white75,
  textDim: appColors.white50,
  textFaint: appColors.gray75, //      #BFBFBF

  // Brand and state — these are the app's actual signal colors.
  accent: appColors.blue, //           #008FD4  CTRLbot blue
  success: appColors.green, //         #4EA72E  connected / on
  warning: appColors.priYellow,
  danger: appColors.priRed,

  // Scrims.
  scrim: appColors.black75,
  scrimSoft: appColors.black50,
} as const;

/**
 * Type — three faces, following ctrlbot.io.
 *
 *   display   Audiowide. Headlines and the CTRLbot wordmark. Nothing else.
 *   ui        Montserrat. All readable copy. The app's own face
 *             (res/font/mont_font_family.xml), which keeps the video's copy
 *             consistent with the interface it is showing.
 *   mono      Space Mono. Small uppercase eyebrows and technical labels.
 *
 * The site sets its `.display` class on `h2`/`h3` only, and drops to Space Mono
 * at 11px for every nav item, eyebrow and terminal line. That restraint is the
 * point: Audiowide is a texture, and past a headline's worth of words it stops
 * reading as language. In motion graphics where the text carries the message,
 * it belongs on the headline and nowhere else.
 */
export const font = {
  display: 'Audiowide, Montserrat, sans-serif',
  ui: 'Montserrat, Segoe UI, system-ui, sans-serif',
  mono: '"Space Mono", SFMono-Regular, Consolas, monospace',
} as const;

/**
 * Video type ramp at 1080p. The app ships an 18/15/13/12sp ramp built for a
 * hand-held panel; video is read at distance, so this is a parallel ramp tuned
 * for the frame rather than a naive scale-up of sp values.
 *
 * `display` and `title` are the only sizes Audiowide may be set at. Everything
 * from `heading` down is Montserrat.
 */
export const type = {
  display: 96,
  title: 62,
  heading: 44,
  subheading: 32,
  body: 26,
  caption: 20,
  label: 16,
} as const;

/**
 * An app color at an opacity the app itself does not define.
 *
 * The app ships its own alpha tokens — `white75`, `black50` — which cover every
 * surface a phone UI needs. Video needs the brand blue at alphas nothing on a phone
 * ever asks for: a stage glow is 6% to 22% blue, and no such token exists or should.
 * Deriving it here keeps the rule intact. The hue is still the app's; only the
 * opacity is a video decision, which is exactly what this file is for.
 */
const alpha = (hex: string, amount: number) => {
  const value = parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${amount})`;
};

/**
 * Backgrounds a scene may stand on. One entry per treatment, deliberately.
 *
 * The alternative is every scene writing its own gradient, and the promo this
 * replaced is what that looks like: six scenes, six hand-typed
 * `radial-gradient(circle at 50% 54%, …)` strings, drifting.
 *
 * `stage` is the landscape marketing background — CTRLbot blue bloomed behind the
 * panel and falling to the app's black by the frame edge. The glow is centred on the
 * panel rather than the frame, so the surface reads as lit instead of pasted on, and
 * a frame is never flat black in the corner opposite the copy.
 */
export const background = {
  stage: `radial-gradient(120% 90% at 71% 50%, ${alpha(appColors.blue, 0.22)} 0%, ${alpha(appColors.blue, 0.06)} 38%, ${appColors.black} 72%)`,
  promo: (x = 68, y = 32) =>
    `radial-gradient(100% 100% at ${x}% ${y}%, ${alpha(appColors.blue, 0.45)} 0%, ${alpha(appColors.blue, 0)} 90%)`,
} as const;

/** Geometry, anchored to the app's 8dp corner radius. */
export const radius = {
  sm: appDimens.cornerRadiusDim / 2, // 4
  md: appDimens.cornerRadiusDim, //     8
  lg: appDimens.cornerRadiusDim * 2, // 16
  xl: appDimens.cornerRadiusDim * 3, // 24
  pill: 999,
} as const;

/** 8pt spacing scale. */
export const space = (steps: number) => steps * 8;

/**
 * Canvas presets. Phone is portrait, tablet is landscape — matching the app.
 *
 * Landscape is 16:10, not 16:9. Android tablets are 16:10 and the app's own surface is
 * 1280x800, so 1920x1200 is exactly 1.5x the viewport: a full-frame shot fills the frame
 * edge to edge with no letterboxing, and every dp in the layout maps to a whole 1.5
 * pixels. At 1080 the same shot left a black bar down each side.
 */
export const canvas = {
  fps: 30,
  landscape: {width: 1920, height: 1200},
  portrait: {width: 1080, height: 1920},
} as const;

