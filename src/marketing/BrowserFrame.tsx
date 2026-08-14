// A browser window drawn around a web surface.
//
// The device surfaces in this project get a bezel because they are hardware; a website
// gets a window, for the same reason — the frame tells the viewer what kind of thing they
// are looking at before the copy has to. Without it a black page with a text box is a
// slide, not a site.
//
// Deliberately generic chrome: no vendor's exact geometry, no logo, no menu glyphs that
// belong to one browser. It has to read as "a browser" instantly and impersonate nothing,
// which is also why the only brand text in it is CTRLbot's own — the address and the tab
// title, both of which are real (`Break Fix Solve IT!` is the site's actual <title>).
//
// The chrome is drawn in frame pixels and never scales. The page inside is rendered at its
// own viewport and scaled once, here — so 16px body copy on the site lands at ~20px in a
// 1080p frame while the window furniture stays pixel-exact at any panel size.

import type {ReactNode} from 'react';
import {WEB_VIEWPORT} from '../app-ui/web/webViewport';
import {chrome as chromeColor, color, radius} from '../design/theme';

/** Window furniture, in frame pixels. */
const CHROME = {
  tabBar: 36,
  addressBar: 44,
  /** The page inset inside the window, so the content has a visible edge. */
  padding: 0,
} as const;

export const BROWSER_CHROME_HEIGHT = CHROME.tabBar + CHROME.addressBar;

/**
 * Total window height for a given window width.
 *
 * The page scales to the window's width, so the height follows from the viewport's aspect
 * and cannot be chosen independently. Exported because `<Stage>` needs the panel's exact
 * size before it can lay anything out, and a second hand-typed number here is precisely
 * the drift `Stage` exists to prevent.
 */
export const browserHeight = (width: number) =>
  BROWSER_CHROME_HEIGHT + (WEB_VIEWPORT.height * width) / WEB_VIEWPORT.width;

const LIGHTS = [chromeColor.close, chromeColor.minimise, chromeColor.zoom];

/** The face the chrome is set in. A browser's own UI, not the page's and not the video's. */
const CHROME_FACE = "'Segoe UI', -apple-system, system-ui, sans-serif";

export const BrowserFrame = ({
  width,
  url = 'https://ctrlbot.ai/',
  title = 'Break Fix Solve IT!',
  /** Tint of the favicon square in the tab. Follows the page's theme. */
  faviconColor = color.text,
  children,
}: {
  width: number;
  url?: string;
  title?: string;
  faviconColor?: string;
  children: ReactNode;
}) => {
  const scale = width / WEB_VIEWPORT.width;
  const pageHeight = WEB_VIEWPORT.height * scale;

  return (
    <div
      style={{
        width,
        height: BROWSER_CHROME_HEIGHT + pageHeight,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: chromeColor.tabBar,
        overflow: 'hidden',
      }}
    >
      {/* Tab strip. */}
      <div
        style={{
          height: CHROME.tabBar,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          gap: 14,
          backgroundColor: chromeColor.tabBar,
        }}
      >
        <div style={{display: 'flex', gap: 8}}>
          {LIGHTS.map((light) => (
            <div
              key={light}
              style={{width: 11, height: 11, borderRadius: radius.pill, backgroundColor: light}}
            />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 26,
            paddingLeft: 10,
            paddingRight: 14,
            borderRadius: 7,
            backgroundColor: chromeColor.tab,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: radius.sm / 2,
              backgroundColor: faviconColor,
            }}
          />
          <div
            style={{
              color: color.textMuted,
              fontFamily: CHROME_FACE,
              fontSize: 12.5,
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </div>
        </div>
      </div>

      {/* Address bar. */}
      <div
        style={{
          height: CHROME.addressBar,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          paddingLeft: 18,
          paddingRight: 18,
          backgroundColor: chromeColor.addressBar,
        }}
      >
        {/* Back, forward, reload — chevrons and an arc, drawn rather than set in a font,
            so no glyph coverage question arrives at render time. */}
        <Chevron direction="left" />
        <Chevron direction="right" dim />
        <Reload />

        <div
          style={{
            flex: 1,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: radius.pill,
            backgroundColor: chromeColor.urlField,
          }}
        >
          <Padlock />
          <div
            style={{
              fontFamily: CHROME_FACE,
              fontSize: 13,
              color: color.text,
              letterSpacing: 0.1,
            }}
          >
            {url}
          </div>
        </div>
      </div>

      {/* The page. Rendered at its own viewport, then scaled as one block — which is what
          keeps every measurement in CtrlbotWeb the site's own number. */}
      <div style={{width, height: pageHeight, overflow: 'hidden'}}>
        <div
          style={{
            width: WEB_VIEWPORT.width,
            height: WEB_VIEWPORT.height,
            transformOrigin: 'top left',
            scale: String(scale),
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const Chevron = ({direction, dim = false}: {direction: 'left' | 'right'; dim?: boolean}) => (
  <svg width={16} height={16} viewBox="0 0 16 16" style={{opacity: dim ? 0.3 : 0.75}}>
    <path
      d={direction === 'left' ? 'M10 3 L5 8 L10 13' : 'M6 3 L11 8 L6 13'}
      fill="none"
      stroke="#ffffff"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Reload = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" style={{opacity: 0.75}}>
    <path
      d="M13 8 A5 5 0 1 1 11.2 4.2"
      fill="none"
      stroke="#ffffff"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <path d="M11.4 1.4 L11.4 4.6 L8.2 4.6" fill="none" stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Padlock = () => (
  <svg width={11} height={13} viewBox="0 0 11 13" style={{opacity: 0.6}}>
    <path
      d="M3 5.5 V3.6 A2.5 2.5 0 0 1 8 3.6 V5.5"
      fill="none"
      stroke="#ffffff"
      strokeWidth={1.3}
      strokeLinecap="round"
    />
    <rect x={1.4} y={5.5} width={8.2} height={6.4} rx={1.4} fill="#ffffff" />
  </svg>
);
