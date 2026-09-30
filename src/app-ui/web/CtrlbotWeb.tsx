// The ctrlbot.ai page, rebuilt live.
//
// Same method as `CtrlbotAi.tsx` — that one rebuilds the WebView *inside* the Android app,
// this one rebuilds the site as a browser loads it. They are separate surfaces because
// they are separate products: the in-app view leads with the FAQ against a nav rail, the
// web page opens on a blank prompt with nothing beside it.
//
// Every number below is the site's own, read out of
// `../../0 - CTRLbot.ai/ctrlbot.ai/public/index.html`. `rem` values are resolved at the
// browser default of 16px and left as the arithmetic that produced them, so a change to
// the stylesheet can be checked against this file line for line. Nothing is scaled here —
// `BrowserFrame` scales the whole plane once.
//
// These blocks are presentational and hold no time. Every reveal, type-on and highlight is
// driven by the composition from `useCurrentFrame()`, which is the project rule and also
// what makes the surface reusable across the 2-minute cut and the 30-second one.

import type {CSSProperties, ReactNode} from 'react';
import {Img, staticFile} from 'remotion';
import {WEB_CONTAINER_WIDTH, WEB_PANEL_WIDTH, WEB_VIEWPORT} from './webViewport';
import {WEB_THEMES, type WebThemeName, webFace} from './webTheme';

/** `.qai-question .yes-btn` / `.no-btn` — the quick-question pair. */
const QAI_YES = '#00c853';
const QAI_NO = '#d50000';

/** `.lai-options` — the targeted question. Lighter, because the labels sit on them. */
const LAI_YES = '#00c853';
const LAI_NO = '#ff5252';
const LAI_PASS = '#ffd600';

/**
 * One character of the DOS theme's monospace face, in pixels.
 *
 * The site positions the `C:\>` sigil and the block cursor in `ch` units, which only line
 * up because the face is monospace. Courier New advances 0.6em and the pill is set at
 * 16px, so a `ch` is 9.6px — stated once here rather than resolved separately at each of
 * the three places the stylesheet uses it.
 */
const CH = 9.6;

/** The text caret. 1.5px at 16px type is what a browser draws. */
const Caret = ({color, trailing = false}: {color: string; trailing?: boolean}) => (
  <span
    style={{
      display: 'inline-block',
      width: 1.5,
      height: 17,
      // A real browser draws the caret and the placeholder both at x=0 and lets them
      // overlap. At video scale that reads as a rendering fault rather than a caret, so
      // the ghost text is pushed off it by its own width.
      marginRight: trailing ? 0.5 : 0,
      marginLeft: trailing ? 0 : 1,
      verticalAlign: 'text-bottom',
      backgroundColor: color,
    }}
  />
);

export type WebSurfaceProps = {
  theme?: WebThemeName;
  /** Text in the pill. Empty string shows `placeholder` instead. */
  prompt?: string;
  placeholder?: string;
  /**
   * Distance from the top of the viewport to the logo.
   *
   * The site says `margin-top: 25vh`, which is 153px in this viewport. That is right for
   * a blank page and wrong the moment a session fills the column — the real page scrolls,
   * and so does this one. Pass a smaller number, or a negative one, to scroll the flow up.
   */
  top?: number;
  /** The ✕ that clears the session. Present from the first response onward. */
  showReset?: boolean;
  /**
   * Draw the text caret, on this frame, in the pill.
   *
   * The site focuses the textarea on load, so a caret is what the page actually looks
   * like sitting there — and on a beat where nothing else moves it is the only thing on
   * screen that does. The blink is the caller's to time; this is a per-frame boolean, not
   * a CSS animation, because a CSS one would run off the wall clock and render
   * differently on every frame of the same composition.
   */
  caret?: boolean;
  /**
   * How big the page is, in CSS pixels.
   *
   * Defaults to the browser-panel viewport. The 16:10 site cell passes
   * `WEB_VIEWPORT_WIDE` because it is full-bleed with no chrome around it — a different
   * window size, which is the honest thing to vary, rather than the same window stretched.
   */
  viewport?: {width: number; height: number};
  /** Everything below the pill — Q.AI rows, the L.AI card, the answer, the FAQ. */
  children?: ReactNode;
  style?: CSSProperties;
};

/**
 * The page shell: background, logo, prompt pill, and the column everything else stacks in.
 */
export const CtrlbotWeb = ({
  theme = 'dark',
  prompt = '',
  placeholder = 'Spill it',
  top = 153,
  showReset = false,
  caret = false,
  viewport = WEB_VIEWPORT,
  children,
  style,
}: WebSurfaceProps) => {
  const t = WEB_THEMES[theme];
  const face = webFace(t);

  return (
    <div
      style={{
        position: 'relative',
        width: viewport.width,
        height: viewport.height,
        overflow: 'hidden',
        backgroundColor: t.background,
        backgroundImage: t.wash,
        color: t.text,
        fontFamily: face,
        textShadow: t.glow ? `0 0 6px ${t.glow}` : undefined,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          translate: '-50% 0',
          top,
          width: WEB_CONTAINER_WIDTH,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // #container { gap: 1.75rem }
          gap: 28,
        }}
      >
        {/* #icon { width: 100px; height: 100px } — the site's own files, copied by hand
            into public/ai because they are not part of the app token sync.

            DOS mode loads a different file rather than tinting this one: the site does
            the same, because the phosphor green is baked into `ic_ctrlbot_8bit.svg`'s
            fill and no CSS filter turns white into one specific hue. */}
        <Img
          src={staticFile(t.mono ? 'ai/ic_ctrlbot_8bit.svg' : 'ai/ic_ctrlbot.svg')}
          style={{
            width: 100,
            height: 100,
            filter: t.iconFilter,
            // The mark is a solid shape, so the theme's glow has to come from a drop
            // shadow — `text-shadow` on the page does nothing to an <img>.
            ...(t.glow ? {filter: `drop-shadow(0 0 6px ${t.glow})`} : null),
          }}
        />

        {/* #prompt — a pill on every theme but DOS, which squares it into a command line. */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
            // padding: 8px 16px, or `10px 14px 10px calc(14px + 6ch)` in DOS mode.
            // 1ch is 9.6px — Courier New advances 0.6em, and the pill is set at 16px —
            // so the inset is 14 + 57.6, which clears the sigil and the block cursor.
            padding: t.mono ? `10px 14px 10px ${14 + 6 * CH}px` : '8px 16px',
            borderRadius: t.mono ? 0 : 24,
            border: t.mono ? `2px solid ${t.promptText}` : 'none',
            backgroundColor: t.promptBg,
            boxShadow: t.mono
              ? `0 0 8px ${t.glow}, inset 0 0 8px rgba(51, 255, 51, 0.12)`
              : undefined,
            color: prompt ? t.promptText : t.promptPlaceholder,
            fontFamily: face,
            fontSize: 16,
            lineHeight: 1.2,
            fontStyle: prompt || t.mono ? 'normal' : 'italic',
            textShadow: t.glow ? `0 0 6px ${t.glow}` : undefined,
          }}
        >
          {/* body.dos-mode #prompt-wrap::before — the C:\> sigil and block cursor. */}
          {t.mono ? (
            <>
              <span style={{position: 'absolute', left: 16, top: 12}}>{'C:\\>'}</span>
              <span
                style={{
                  position: 'absolute',
                  left: 16 + 4 * CH,
                  top: 12,
                  width: CH,
                  height: 19.2,
                  backgroundColor: t.promptText,
                  boxShadow: `0 0 6px ${t.glow}`,
                }}
              />
            </>
          ) : null}
          {/* The caret sits at the insertion point, which is *after* typed text but
              *before* the placeholder — an empty focused input has its caret at position
              zero with the ghost text behind it. DOS mode draws its own block cursor
              above and skips this one. */}
          {caret && !t.mono && !prompt ? <Caret color={t.promptText} trailing /> : null}
          <span>{prompt || placeholder}</span>
          {caret && !t.mono && prompt ? <Caret color={t.promptText} /> : null}
        </div>
      </div>

      {/* The reset, centred over the response column. Its offset leaves the glyph's own
          20px box clear of the column below — the two are laid out against the same
          `top`, so without the gap the ✕ lands on the first line of the response. */}
      {showReset ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            translate: '-50% 0',
            top: top + 100 + 28 + 35 + 3,
            width: WEB_PANEL_WIDTH + 60,
            textAlign: 'center',
            fontSize: 20,
            lineHeight: 1,
            opacity: 0.85,
            color: t.text,
          }}
        >
          ✕
        </div>
      ) : null}

      {/* The response column. Everything the session produces stacks here, 500px wide,
          which is `#qai-container` and `#lai-container` both. */}
      {children ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            translate: '-50% 0',
            // 25vh + icon + gap + pill, then the container's own 2rem.
            top: top + 100 + 28 + 35 + 32,
            width: WEB_PANEL_WIDTH,
          }}
        >
          {children}
        </div>
      ) : null}

      {/* body.dos-mode::after — CRT scanlines, over everything. */}
      {t.mono ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px,' +
              ' rgba(0,0,0,0.32) 3px, rgba(0,0,0,0.32) 4px)',
          }}
        />
      ) : null}
    </div>
  );
};

/**
 * `.instant-response` — the first assumption, and the shape the FAQ answer reuses.
 *
 * The left border is `--progress-bar-color`, which is the text colour on every theme, so
 * it is drawn from `theme.text` rather than a second token that would only ever agree.
 */
export const InstantCard = ({
  theme = 'dark',
  children,
  style,
}: {
  theme?: WebThemeName;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        // padding: 1rem 1.2rem
        padding: '16px 19.2px',
        marginBottom: 16,
        background: t.qaiBg,
        borderLeft: `3px solid ${t.text}`,
        borderRadius: t.radius,
        fontSize: 15.2,
        lineHeight: 1.5,
        color: t.text,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** `.qai-question` — one quick question with its YES/NO pair. */
export const QaiRow = ({
  theme = 'dark',
  text,
  answer,
  style,
}: {
  theme?: WebThemeName;
  text: string;
  /** Once answered the buttons are replaced by the choice, in bold, after the text. */
  answer?: 'YES' | 'NO';
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  const button = (label: string, background: string, dim: boolean) => (
    <div
      style={{
        // padding: 0.35rem 0.7rem
        padding: '5.6px 11.2px',
        borderRadius: t.radius ? 4 : 0,
        background,
        color: '#ffffff',
        fontSize: 13.6,
        fontWeight: 600,
        lineHeight: 1.2,
        opacity: dim ? 0.5 : 1,
      }}
    >
      {label}
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // padding: 0.6rem 0.8rem
        padding: '9.6px 12.8px',
        marginBottom: 8,
        background: t.qaiBg,
        borderRadius: t.radius,
        ...style,
      }}
    >
      <div style={{flex: 1, fontSize: 15.2, lineHeight: 1.3, color: t.text}}>
        {text}
        {answer ? (
          <span style={{marginLeft: 8, fontWeight: 700}}>{answer}</span>
        ) : null}
      </div>
      {answer ? null : (
        <div style={{display: 'flex', gap: 6.4, marginLeft: 8}}>
          {button('YES', QAI_YES, false)}
          {button('NO', QAI_NO, false)}
        </div>
      )}
    </div>
  );
};

/** `.lai-assumption` — the long assumption, with its one resource link inside it. */
export const LaiAssumption = ({
  theme = 'dark',
  children,
  style,
}: {
  theme?: WebThemeName;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        opacity: 0.85,
        fontSize: 15.2,
        lineHeight: 1.5,
        marginBottom: 16,
        // padding: 0.8rem
        padding: 12.8,
        background: t.laiBg,
        borderRadius: t.radius,
        color: t.text,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** `.lai-question` — the one sharper question. */
export const LaiQuestion = ({
  theme = 'dark',
  children,
  style,
}: {
  theme?: WebThemeName;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        fontWeight: 700,
        fontSize: 16.8,
        lineHeight: 1.35,
        marginBottom: 16,
        color: t.text,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * `.lai-options button` — an answer that explains itself.
 *
 * This is the control the product's positioning rests on ("answers you can click"), so it
 * keeps its own component rather than being three styled divs in the composition.
 */
export const LaiOption = ({
  theme = 'dark',
  kind,
  description,
  style,
}: {
  theme?: WebThemeName;
  kind: 'YES' | 'NO' | 'PASS';
  description: string;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  const background = kind === 'YES' ? LAI_YES : kind === 'NO' ? LAI_NO : LAI_PASS;
  return (
    <div
      style={{
        // padding: 0.8rem 1rem
        padding: '12.8px 16px',
        marginBottom: 9.6,
        borderRadius: t.radius,
        background,
        color: '#000000',
        textAlign: 'left',
        textShadow: 'none',
        ...style,
      }}
    >
      <div style={{fontWeight: 700, fontSize: 16, lineHeight: 1.2}}>{kind}</div>
      <div style={{fontSize: 13.6, lineHeight: 1.35, marginTop: 3, opacity: 0.85}}>
        {description}
      </div>
    </div>
  );
};

export type Resource = {
  /** `.resource-link-source` — "Wikipedia · en.wikipedia.org › Electronics › Batteries". */
  source: string;
  title: string;
  date?: string;
  snippet: string;
  /** Draws the YouTube thumbnail block instead of a favicon square. */
  youtube?: {views: string; age: string; duration: string};
  /** Favicon stand-in. The real page loads the site's icon; a square reads the same. */
  tint?: string;
};

/** `.resource-link-item` — one of the three sources under an answer. */
export const ResourceLink = ({
  theme = 'dark',
  resource,
  style,
}: {
  theme?: WebThemeName;
  resource: Resource;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        // gap: 0.6rem
        gap: 9.6,
        marginBottom: 19.2,
        ...style,
      }}
    >
      {resource.youtube ? (
        <div
          style={{
            position: 'relative',
            width: 80,
            height: 45,
            flexShrink: 0,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #3a3a3a 0%, #1e1e1e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* .resource-yt-play-icon */}
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderLeft: '12px solid rgba(255,255,255,0.9)',
              marginLeft: 3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 3,
              bottom: 3,
              background: 'rgba(0,0,0,0.55)',
              color: '#fff',
              fontSize: 9,
              padding: '1px 4px',
              borderRadius: 3,
              textShadow: 'none',
            }}
          >
            {resource.youtube.duration}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: 16,
            height: 16,
            marginTop: 3.2,
            flexShrink: 0,
            borderRadius: 3,
            background: resource.tint ?? '#5a5a5a',
          }}
        />
      )}

      <div style={{display: 'flex', flexDirection: 'column', gap: 2.4, minWidth: 0}}>
        <div style={{fontSize: 12.8, opacity: 0.6, color: t.text}}>{resource.source}</div>
        <div style={{fontWeight: 600, color: t.link, fontSize: 16, lineHeight: 1.25}}>
          {resource.title}
        </div>
        {resource.youtube ? (
          <div style={{fontSize: 12.8, opacity: 0.65, color: t.text}}>
            {resource.youtube.views} · {resource.youtube.age}
          </div>
        ) : resource.date ? (
          <div style={{fontSize: 12.8, opacity: 0.6, color: t.text}}>{resource.date}</div>
        ) : null}
        <div style={{fontSize: 14.4, lineHeight: 1.4, marginTop: 1.6, color: t.text}}>
          {resource.snippet}
        </div>
      </div>
    </div>
  );
};

/** The final answer body. Plain flowed text under the links, in the site's body size. */
export const AnswerText = ({
  theme = 'dark',
  children,
  style,
}: {
  theme?: WebThemeName;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        fontSize: 15.2,
        lineHeight: 1.6,
        color: t.text,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * `#thinking-container` — the reasoning playback.
 *
 * A collapsible panel that replays the session while the final answer generates: the
 * original query, each question and the answer given, and the assumption that came out of
 * it. It is a playback of collected context, not live model reasoning, which is why the
 * lines are given to it rather than generated — and why the label reads *Done thinking*
 * once it has stopped.
 */
export const ThinkingCard = ({
  theme = 'dark',
  label,
  children,
  style,
}: {
  theme?: WebThemeName;
  label: string;
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        padding: 16,
        borderRadius: t.radius ? 8 : 0,
        background: t.qaiBg,
        borderLeft: `3px solid ${t.timerBar}`,
        color: t.text,
        ...style,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
        <span style={{fontSize: 16, lineHeight: 1}}>💭</span>
        <span style={{fontSize: 14.4, fontWeight: 500, opacity: 0.8}}>{label}</span>
        <span style={{marginLeft: 'auto', fontSize: 12.8, opacity: 0.6}}>▶</span>
      </div>
      <div
        style={{
          fontSize: 13.6,
          lineHeight: 1.5,
          opacity: 0.7,
          fontStyle: t.mono ? 'normal' : 'italic',
          whiteSpace: 'pre-wrap',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** `.faq-question` — one row of the auto-surfacing panel. */
export const FaqRow = ({
  theme = 'dark',
  text,
  style,
}: {
  theme?: WebThemeName;
  text: string;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        padding: '9.6px 12.8px',
        marginBottom: 8,
        background: t.qaiBg,
        borderRadius: t.radius,
        fontSize: 15.2,
        lineHeight: 1.3,
        color: t.text,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/** `#faq-answer-area` — the pre-written answer, served with no model call behind it. */
export const FaqAnswer = ({
  theme = 'dark',
  question,
  children,
  style,
}: {
  theme?: WebThemeName;
  question: string;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const t = WEB_THEMES[theme];
  return (
    <div
      style={{
        // padding: 0.8rem 1rem
        padding: '12.8px 16px',
        marginBottom: 16,
        background: t.qaiBg,
        borderLeft: `3px solid ${t.text}`,
        borderRadius: t.radius,
        fontSize: 15.2,
        lineHeight: 1.6,
        color: t.text,
        ...style,
      }}
    >
      <div style={{fontWeight: 700, marginBottom: 8, fontSize: 14.4, opacity: 0.7}}>
        {question}
      </div>
      {children}
    </div>
  );
};
