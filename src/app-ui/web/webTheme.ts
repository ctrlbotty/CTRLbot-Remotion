// The six ctrlbot.ai colour themes, transcribed from the site's own custom properties.
//
// Source: `../0 - CTRLbot.ai/ctrlbot.ai/public/index.html`, the `body.*-mode` blocks.
// These are the site's values verbatim — this file is a mirror, not a design decision, and
// the same rule that governs `tokens.generated.ts` applies: if the site changes a theme,
// change it here, never the other way round.
//
// Clicking the logo cycles them in this order, which is what the walkthrough demonstrates
// and the order the video plays back.

export const WEB_THEME_ORDER = [
  'dark',
  'light',
  'orange',
  'yellow',
  'av',
  'dos',
] as const;

export type WebThemeName = (typeof WEB_THEME_ORDER)[number];

export type WebTheme = {
  background: string;
  /** A wash painted over the background. Only `av` has one. */
  wash?: string;
  text: string;
  /** `--qai-bg` — the quick-question row. */
  qaiBg: string;
  /** `--lai-bg` — the assumption card. */
  laiBg: string;
  /** The prompt pill inverts against the page: white on dark, black on light. */
  promptBg: string;
  promptText: string;
  promptPlaceholder: string;
  /** Link and resource-title colour. Flat black on the light themes. */
  link: string;
  /**
   * `--timer-bar-color`. Despite the name it draws no timer — `#timer-bar` is
   * `display: none !important` on the live site, commented "no visible timer during
   * L.AI". Its one remaining job is the left border of the thinking panel.
   */
  timerBar: string;
  /** The site tints the icon black on the light themes with `filter: brightness(0)`. */
  iconFilter?: string;
  /** DOS mode swaps the whole page to a monospace phosphor terminal. */
  mono?: boolean;
  glow?: string;
  /** Radius of every card and button. DOS mode squares them off. */
  radius: number;
};

const DARK_BASE = {
  background: '#000000',
  text: '#ffffff',
  qaiBg: 'rgba(255, 255, 255, 0.05)',
  laiBg: 'rgba(100, 149, 237, 0.1)',
  promptBg: '#ffffff',
  promptText: '#000000',
  promptPlaceholder: 'rgba(0, 0, 0, 0.5)',
  link: '#4fc3f7',
  timerBar: '#ffd600',
  radius: 6,
} as const;

/** Light, orange and yellow share an inverted prompt and a blacked-out icon. */
const lightFamily = (background: string) => ({
  background,
  text: '#000000',
  qaiBg: background === '#ffffff' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.08)',
  laiBg: background === '#ffffff' ? 'rgba(100, 149, 237, 0.08)' : 'rgba(0, 0, 0, 0.06)',
  promptBg: '#000000',
  promptText: '#ffffff',
  promptPlaceholder: 'rgba(255, 255, 255, 0.5)',
  link: '#0b4f6c',
  timerBar: background === '#ffffff' ? '#f57c00' : '#000000',
  iconFilter: 'brightness(0)',
  radius: 6,
});

const DOS_FG = '#33ff33';
const DOS_GLOW = 'rgba(51, 255, 51, 0.45)';

export const WEB_THEMES: Record<WebThemeName, WebTheme> = {
  dark: DARK_BASE,
  light: lightFamily('#ffffff'),
  orange: lightFamily('#F37A21'),
  yellow: lightFamily('#E1E31B'),
  av: {
    ...DARK_BASE,
    // ctrlbot_blue_subtle, the same wash the CTRLbot IoT setup screens stand on.
    wash:
      'radial-gradient(ellipse 100% 100% at 68% 32%, ' +
      'rgba(0, 143, 212, 0.45) 0%, rgba(0, 143, 212, 0) 90%)',
  },
  dos: {
    background: '#000000',
    text: DOS_FG,
    qaiBg: 'rgba(51, 255, 51, 0.06)',
    laiBg: 'rgba(51, 255, 51, 0.06)',
    promptBg: 'transparent',
    promptText: DOS_FG,
    promptPlaceholder: 'rgba(51, 255, 51, 0.5)',
    link: DOS_FG,
    timerBar: DOS_FG,
    mono: true,
    glow: DOS_GLOW,
    radius: 0,
  },
};

/**
 * The site's own body face. Deliberately not Montserrat.
 *
 * Everywhere else in this project readable copy is Montserrat, because that is the face
 * the Android app ships. This surface is a rebuild of a *website* whose prompt sets
 * `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif` and whose body is
 * plain `sans-serif` — so matching the app's face here would make the rebuild wrong on
 * purpose. The video's own copy column stays on the house faces.
 */
export const WEB_FONT = "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif";

export const WEB_MONO = "'Courier New', Consolas, 'Lucida Console', monospace";

export const webFace = (theme: WebTheme) => (theme.mono ? WEB_MONO : WEB_FONT);
