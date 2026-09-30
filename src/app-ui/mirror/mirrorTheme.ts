// CTRLbot Mirror's colours, type and spacing, transcribed from its own source.
//
// Source: `C:\0-Repo\Utilities\CTRLbot-Mirror\src\renderer\src\styles.css`, whose Tailwind
// v4 `@theme` names every colour the app uses (ink, mist, beam, signal, warn, alert), and
// the stage background in `components/Stage.tsx`. A mirror, not a design decision: change
// the app and then this, never the other way round. Mirror does not set a root font size,
// so one rem is Tailwind's 16px and one spacing step is 4px.

export const ink = {
  950: '#060910',
  900: '#0b0f19',
  850: '#101624',
  800: '#151d2e',
  700: '#1e2739',
  600: '#2b3348',
  500: '#48546b',
} as const;

export const mist = {
  100: '#eef2f8',
  200: '#cdd6e5',
  300: '#9dabc2',
  400: '#6f7f99',
} as const;

export const beam = {
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
} as const;

export const signal = {400: '#4ade80', 500: '#22c55e'} as const;
export const warn = {400: '#fbbf24'} as const;
export const alert = {400: '#f87171', 500: '#ef4444'} as const;

/** Tailwind's `/15`-style opacity modifier, as v4 compiles it. */
export const mix = (colour: string, percent: number) =>
  `color-mix(in oklab, ${colour} ${percent}%, transparent)`;

export const mirrorFont = {
  sans: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
  mono: "'Cascadia Code', 'Consolas', ui-monospace, monospace",
  /** `.brand-wordmark`. */
  brand: "'Audiowide', 'Segoe UI', sans-serif",
} as const;

/** One Tailwind spacing step. `px-5` is `sp(5)`. */
export const sp = (steps: number) => steps * 4;

export const text = {
  xs: {fontSize: 12, lineHeight: '16px'},
  sm: {fontSize: 14, lineHeight: '20px'},
  px11: {fontSize: 11, lineHeight: '16px'},
  px10: {fontSize: 10, lineHeight: '14px'},
} as const;

export const round = {md: 6, lg: 8, xl: 12, xl2: 16} as const;

/** `Stage.tsx` BACKGROUNDS.gradient: CTRLbot blue bloomed over black. */
export const stageBackground =
  'radial-gradient(125% 125% at 50% 50%, rgba(0,143,212,0.52) 0%, rgba(0,143,212,0.18) 55%, rgba(0,0,0,0) 92%), #000000';

/** `compose.ts` FRAME_SPECS.tablet1: the frame Mirror draws around a landscape tablet. */
export const tabletFrame = {
  thickness: 0.055,
  innerBorder: 5,
  outerRadius: 0.012,
  body: '#1f2533',
  rim: '#414d64',
} as const;
