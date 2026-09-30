// CTRLbot Terminator's colours, type and spacing, transcribed from its own source.
//
// Source: `C:\0-Repo\Utilities\CTRLbot Term\src\App.css` for the brand values and the
// root type, and Tailwind v4's `theme.css` in that repo's node_modules for every stock
// colour its classes name. Tailwind v4 defines those in OKLCH, so they are copied as
// OKLCH rather than approximated in hex. This file is a mirror, not a design decision,
// the same standing `webTheme.ts` has for ctrlbot.ai: if the app changes a value, change
// it here, never the other way round.
//
// Terminator is a third product with its own look. It does not use the Android app's
// tokens or Montserrat, and nothing here should be borrowed by the house copy around it.

/** Tailwind v4 stock colours, as `--color-*` in theme.css. Only the ones Terminator uses. */
export const tw = {
  gray200: 'oklch(92.8% 0.006 264.531)',
  gray300: 'oklch(87.2% 0.01 258.338)',
  gray400: 'oklch(70.7% 0.022 261.325)',
  gray500: 'oklch(55.1% 0.027 264.364)',
  gray600: 'oklch(44.6% 0.03 256.802)',
  gray700: 'oklch(37.3% 0.034 259.733)',
  gray800: 'oklch(27.8% 0.033 256.848)',
  gray900: 'oklch(21% 0.034 264.665)',
  gray950: 'oklch(13% 0.028 261.692)',
  cyan300: 'oklch(86.5% 0.127 207.078)',
  green400: 'oklch(79.2% 0.209 151.711)',
  green500: 'oklch(72.3% 0.219 149.579)',
  emerald400: 'oklch(76.5% 0.177 163.223)',
  emerald500: 'oklch(69.6% 0.17 162.48)',
  blue300: 'oklch(80.9% 0.105 251.813)',
  red600: 'oklch(57.7% 0.245 27.325)',
  rose600: 'oklch(58.6% 0.253 17.585)',
  white: '#ffffff',
  black: '#000000',
} as const;

/** App.css `@theme` and `:root`. */
export const brand = {
  blue: '#008FD4',
  blueHover: '#007bb8',
  yellow: '#FFCC00',
  dark: '#0b0f19',
  text: '#f8fafc',
} as const;

/** Tailwind's `/40`-style opacity modifier, the way v4 compiles it. */
export const mix = (colour: string, percent: number) =>
  `color-mix(in oklab, ${colour} ${percent}%, transparent)`;

export const termFont = {
  /** App.css `:root`. On Windows this resolves to Segoe UI, as it does in the app. */
  ui: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  /** Tailwind v4 `--font-mono`. Consolas on Windows. */
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  /** `.brand-title`, the sidebar wordmark. */
  brand: "'Audiowide', sans-serif",
} as const;

/**
 * Tailwind sizes resolve against `:root { font-size: 14px }`, so one rem is 14px and one
 * spacing step (`p-1`) is 3.5px. Written through these rather than as literals so a class
 * in the source maps to one call here: `px-4` is `sp(4)`, `text-sm` is `text.sm`.
 */
export const REM = 14;
export const sp = (steps: number) => steps * 0.25 * REM;

/** Tailwind v4 text sizes with their line heights, at a 14px rem. */
export const text = {
  xs: {fontSize: 0.75 * REM, lineHeight: `${1 * REM}px`},
  sm: {fontSize: 0.875 * REM, lineHeight: `${1.25 * REM}px`},
  lg: {fontSize: 1.125 * REM, lineHeight: `${1.75 * REM}px`},
  xl2: {fontSize: 1.5 * REM, lineHeight: `${2 * REM}px`},
} as const;

/** Tailwind v4 radii at a 14px rem: `rounded` 0.25rem, `-md` 0.375rem, `-lg` 0.5rem. */
export const round = {
  sm: 0.25 * REM,
  md: 0.375 * REM,
  lg: 0.5 * REM,
} as const;
