// CTRLbot.AI — the 2-minute walkthrough. 1920x1080, copy left, browser right.
//
// Built from the speaker's own recording (docs/AI-WALKTHROUGH-TRANSCRIPT.md), which is
// why the order of beats is his and not a marketing arc: prompt, quick questions, the
// targeted question, the reasoning playback, sources, answer, then the three things he
// calls out at the end — the empty page, the FAQ, and the themes.
//
// **No camera move anywhere in this cut, by request.** `<Stage>` still carries the
// layout, with a single locked-off shot over the whole plane, so the panel geometry and
// the copy column are the house ones rather than a second set of numbers.
//
// What moves instead is the page. Blocks arrive spread across each beat rather than
// bunched at its head, and the column scrolls under them as they land — which is both
// what the real page does as a response streams in, and what keeps this off the wrong
// side of `video-frames`' inert-fraction gate. A locked camera over a still page is a
// slideshow no matter how good the copy beside it is.
//
// The surface is a live rebuild (`app-ui/web/`), not a screen recording, for the reason
// `video-lint` enforces elsewhere: a capture cannot change state, and this cut needs the
// same page to type, answer five questions, scroll, and cycle six themes.

import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import {fullFrame} from '../../camera/Camera';
import {
  AnswerText,
  CtrlbotWeb,
  FaqAnswer,
  FaqRow,
  InstantCard,
  LaiAssumption,
  LaiOption,
  LaiQuestion,
  QaiRow,
  ResourceLink,
  ThinkingCard,
} from '../../app-ui/web/CtrlbotWeb';
import {WEB_THEME_ORDER, type WebThemeName} from '../../app-ui/web/webTheme';
import {background, color, font, type} from '../../design/theme';
import {BrowserFrame, browserHeight} from '../BrowserFrame';
import {Stage, StageCopy} from '../Stage';
import {
  ANSWER,
  ASSUMPTION,
  ASSUMPTION_RESOURCE,
  BEATS,
  COPY,
  FAQ_ANSWER,
  FAQ_QUESTION,
  FAQ_RELATED,
  INSTANT,
  PLACEHOLDER_OPENING,
  PLACEHOLDER_RESET,
  PROMPT_TEXT,
  QUICK_QUESTIONS,
  RESOURCES,
  TARGETED_OPTIONS,
  TARGETED_QUESTION,
  THINKING_LINES,
  WALKTHROUGH_FRAMES,
} from './walkthroughData';

/**
 * Window width in frame pixels. Everything else follows: the page scale, the panel
 * height, and therefore how wide a copy column is left over.
 *
 * 1020 leaves 668px of copy, which is `STAGE.copyMaxWidth` minus the gutter — the widest
 * the column can be before the panel starts losing legibility, and the point where both
 * halves of the frame are working as hard as they can.
 */
const BROWSER_WIDTH = 1020;
const PANEL_HEIGHT = browserHeight(BROWSER_WIDTH);
const PANEL = {width: BROWSER_WIDTH, height: PANEL_HEIGHT};

export const aiWalkthroughDuration = WALKTHROUGH_FRAMES;

/**
 * A block arriving: fades up and settles.
 *
 * One easing, one duration, everywhere in the surface — so five question rows landing in
 * sequence read as one mechanism rather than five separately-tuned animations. Same curve
 * as `StageCopy`, so the two halves of the frame move alike.
 *
 * Deliberately slow: 34 frames to fade and 42 to settle, against the 12/18 a UI would
 * use. At UI speed each arrival is over inside a fifth of a second and the beat spends
 * the rest of its length holding a picture. Stretched, and spaced so the tails overlap,
 * the column is doing something almost continuously without any single block looking
 * sluggish.
 */
const rise = (frame: number, at: number, distance = 16) => ({
  opacity: interpolate(frame, [at, at + 34], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  translate: interpolate(frame, [at, at + 42], [`0px ${distance}px`, '0px 0px'], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
});

/**
 * The response column's scroll position over a beat, in the page's own CSS pixels.
 *
 * Linear on purpose, where everything else here is eased. An eased scroll is stationary
 * at both ends, which is exactly the shape that reads as inert; a page auto-scrolling to
 * follow streaming content moves at one rate and then stops.
 */
const scroll = (local: number, window: number, from: number, to: number) =>
  interpolate(local, [0, window], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * The prompt's caret, on or off for this frame.
 *
 * 32 frames — the site blinks its DOS cursor at 1.06s, and a browser's own caret is close
 * enough to the same. It is here rather than in the surface because a CSS `animation`
 * would run off the wall clock, and two renders of the same frame have to be the same
 * picture.
 */
const blink = (frame: number) => frame % 32 < 16;

/**
 * The house marketing background: CTRLbot blue bloomed behind the panel, drifting.
 *
 * Same treatment and the same path as `promoBg` in both EUI promos — `background.promo`
 * with the bloom centre easing from 72%/26% to 60%/40% across the cut. `<Stage>`'s default
 * is `background.stage`, which is the same hue at a third of the alpha; beside the promos
 * this cut read as flat black, which is what "make it match the rest" meant.
 *
 * The drift is not decoration. A 50%-alpha radial gradient over 1920px crosses far fewer
 * than 256 steps, so a static one bands into visible rings; moving the centre a few
 * percent puts every pixel on a different stop each frame and the rings dissolve.
 * `background.promo` also builds its stops on a cosine falloff for the same reason, and
 * `<Stage>` lays `<DitherOverlay>` over the top — three defences against one artefact,
 * all of which this cut was previously getting only the third of.
 *
 * It is a per-video path rather than a shared token because that is what the two promos
 * already treat it as: how the bloom travels is this cut's timing, and this cut is twice
 * the length of theirs, so the same endpoints are crossed at half the rate.
 */
const walkthroughBg = (t: number) =>
  background.promo(
    interpolate(t, [0, 1], [72, 60], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(t, [0, 1], [26, 40], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

/** Cross-fade between two page states, used where a beat replaces the whole column. */
const fade = (frame: number, at: number, length = 14) =>
  interpolate(frame, [at, at + length], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// ── the copy column ──────────────────────────────────────────────────────────────────

/**
 * One `<Sequence>` per beat, each holding one `<StageCopy>`.
 *
 * The Sequence is not just grouping: `video-lint` measures reading time by walking up
 * from a copy block to the nearest enclosing Sequence and reading its duration, so a
 * block written outside one is a block whose pace nothing checks.
 */
const CopyTrack = () => (
  <>
    {(Object.keys(BEATS) as (keyof typeof BEATS)[]).map((name) => {
      const beat = BEATS[name];
      const copy = COPY[name];
      return (
        <Sequence
          key={name}
          from={beat.from}
          durationInFrames={beat.duration}
          layout="none"
          name={`Copy — ${name}`}
        >
          <StageCopy
            eyebrow={copy.eyebrow}
            title={copy.title}
            body={copy.body}
            // The opening beat starts its entrance before the cut does, so it is already
            // settled on frame 0. `video-frames` compares frame 0 against where the first
            // beat comes to rest and fails a cut that animates through its own poster
            // frame — and a social timeline shows frame 0 as a still for far longer than
            // the 40 frames this gives up.
            at={name === 'open' ? -40 : 4}
            until={beat.duration}
          />
        </Sequence>
      );
    })}
  </>
);

// ── the page ─────────────────────────────────────────────────────────────────────────

/** A page block that arrives at `at`, relative to the beat. */
const Arrive = ({
  frame,
  at,
  children,
}: {
  frame: number;
  at: number;
  children: ReactNode;
}) => <div style={rise(frame, at)}>{children}</div>;

/**
 * The blank page, and the beat where it is typed into.
 *
 * `top` is the site's `margin-top: 25vh` — the opening position, and the only beat that
 * uses it. Everything after this scrolls.
 */
const OpenBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.type.from;
  // 16 characters over 44 frames, then it sits. Deliberately not a per-character spring:
  // this is a person typing, and the site does nothing to the text while they do.
  const typed = Math.floor(
    interpolate(local, [0, 44], [0, PROMPT_TEXT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const showTyped = frame >= BEATS.type.from;
  // Solid while the keys are actually going in — a caret only blinks when idle — then
  // back to blinking once the sentence is down.
  const typing = showTyped && local < 44;

  return (
    <CtrlbotWeb
      prompt={showTyped ? PROMPT_TEXT.slice(0, typed) : ''}
      placeholder={PLACEHOLDER_OPENING}
      top={153}
      caret={typing || blink(frame)}
    />
  );
};

/** The instant assumption, then five quick questions arriving in sequence. */
const QuickBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.quick.from;
  return (
    <CtrlbotWeb prompt={PROMPT_TEXT} top={scroll(local, 370, 90, 6)} showReset>
      <Arrive frame={local} at={4}>
        <InstantCard>{INSTANT}</InstantCard>
      </Arrive>
      {QUICK_QUESTIONS.map((question, index) => {
        // 60 frames apart — the site's own QAI_QUESTION_PAUSE_MS is 2000, which is exactly
        // this. The one timing here that is the video's rather than the product's is how
        // long after a question its answer lands.
        const at = 70 + index * 60;
        return (
          <Arrive key={question.text} frame={local} at={at}>
            <QaiRow
              text={question.text}
              answer={local >= at + 34 ? question.answer : undefined}
            />
          </Arrive>
        );
      })}
    </CtrlbotWeb>
  );
};

/** L.AI #1 — the assumption, one link, and the question whose buttons explain themselves. */
const TargetedBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.targeted.from;
  return (
    <CtrlbotWeb prompt={PROMPT_TEXT} top={scroll(local, 370, -20, -128)} showReset>
      <Arrive frame={local} at={4}>
        <LaiAssumption>
          {ASSUMPTION}
          <div style={{marginTop: 12.8}}>
            <ResourceLink resource={ASSUMPTION_RESOURCE} />
          </div>
        </LaiAssumption>
      </Arrive>
      <Arrive frame={local} at={120}>
        <LaiQuestion>{TARGETED_QUESTION}</LaiQuestion>
      </Arrive>
      {TARGETED_OPTIONS.map((option, index) => (
        <Arrive key={option.kind} frame={local} at={180 + index * 60}>
          <LaiOption kind={option.kind} description={option.description} />
        </Arrive>
      ))}
    </CtrlbotWeb>
  );
};

/** The reasoning playback, replaying the session while the answer generates. */
const ThinkingBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.thinking.from;
  const lastLine = 16 + (THINKING_LINES.length - 1) * 22;
  return (
    <CtrlbotWeb prompt={PROMPT_TEXT} top={scroll(local, 150, 80, 44)} showReset>
      <ThinkingCard label={local >= lastLine + 34 ? 'Done thinking' : 'Thinking…'}>
        {THINKING_LINES.map((line, index) => (
          <div key={line} style={rise(local, 16 + index * 22, 8)}>
            {line}
          </div>
        ))}
      </ThinkingCard>
    </CtrlbotWeb>
  );
};

/** The three sources, arriving the way the stream delivers them. */
const SourcesBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.sources.from;
  return (
    <CtrlbotWeb prompt={PROMPT_TEXT} top={scroll(local, 310, 60, 4)} showReset>
      {RESOURCES.map((resource, index) => (
        <Arrive key={resource.title} frame={local} at={10 + index * 90}>
          <ResourceLink resource={resource} />
        </Arrive>
      ))}
    </CtrlbotWeb>
  );
};

/**
 * The answer, with the last source still above it — the page has not moved, the text has.
 *
 * Scrolled far enough to put the logo fully out of frame rather than halfway: a mark cut
 * through its middle reads as a rendering fault, where no mark at all reads as a page
 * someone has scrolled down. The prompt pill stays, so the question is still on screen
 * beside its answer.
 */
const AnswerBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.answer.from;
  return (
    <CtrlbotWeb prompt={PROMPT_TEXT} top={scroll(local, 370, -62, -118)} showReset>
      <ResourceLink resource={RESOURCES[2]} />
      <AnswerText>
        {ANSWER.map((paragraph, index) => (
          <div key={paragraph} style={rise(local, 10 + index * 110)}>
            {paragraph}
          </div>
        ))}
      </AnswerText>
    </CtrlbotWeb>
  );
};

/** Back to nothing. The ✕ has been pressed and the placeholder is a fresh one. */
const PrivacyBeat = ({frame}: {frame: number}) => (
  <CtrlbotWeb prompt="" placeholder={PLACEHOLDER_RESET} top={153} caret={blink(frame)} />
);

/** The FAQ, surfacing on its own after the idle timeout. */
const FaqBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.faq.from;
  return (
    <CtrlbotWeb
      prompt=""
      placeholder={PLACEHOLDER_RESET}
      top={scroll(local, 400, 70, 16)}
      showReset
    >
      <Arrive frame={local} at={6}>
        <FaqAnswer question={FAQ_QUESTION}>{FAQ_ANSWER}</FaqAnswer>
      </Arrive>
      {FAQ_RELATED.map((question, index) => (
        <Arrive key={question} frame={local} at={100 + index * 60}>
          <FaqRow text={question} />
        </Arrive>
      ))}
    </CtrlbotWeb>
  );
};

/**
 * Six themes, one click apart.
 *
 * A hard cut per theme rather than a cross-fade, because that is what the product does —
 * clicking the logo swaps a class, and dissolving between two of them would invent a
 * transition the site does not have.
 */
const ThemesBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.themes.from;
  // An even share of the beat each, so no theme gets a glimpse and none outstays the
  // others — 70 frames apiece, which is about the pace of somebody clicking through them.
  const hold = BEATS.themes.duration / WEB_THEME_ORDER.length;
  const step = Math.min(WEB_THEME_ORDER.length - 1, Math.floor(local / hold));
  const theme: WebThemeName = WEB_THEME_ORDER[step];
  // DOS draws its own block cursor and ignores this one, which is why that theme's shot
  // is the only one here with a solid cursor rather than a blinking caret.
  return (
    <CtrlbotWeb
      theme={theme}
      prompt=""
      placeholder={PLACEHOLDER_RESET}
      top={153}
      caret={blink(frame)}
    />
  );
};

/** Where the page is left: open, empty, waiting. */
const CloseBeat = ({frame}: {frame: number}) => (
  <CtrlbotWeb prompt="" placeholder={PLACEHOLDER_OPENING} top={153} caret={blink(frame)} />
);

/**
 * The page track. One beat visible at a time, cross-faded at the boundary.
 *
 * Written as a frame switch rather than nested `<Sequence>`s because the surface is a
 * single continuous page — a Sequence per beat would unmount and remount the browser,
 * and the one thing this cut must never do is blink the window furniture.
 */
const SurfaceTrack = () => {
  const frame = useCurrentFrame();

  const beat = (() => {
    if (frame < BEATS.quick.from) return <OpenBeat frame={frame} />;
    if (frame < BEATS.targeted.from) return <QuickBeat frame={frame} />;
    if (frame < BEATS.thinking.from) return <TargetedBeat frame={frame} />;
    if (frame < BEATS.sources.from) return <ThinkingBeat frame={frame} />;
    if (frame < BEATS.answer.from) return <SourcesBeat frame={frame} />;
    if (frame < BEATS.privacy.from) return <AnswerBeat frame={frame} />;
    if (frame < BEATS.faq.from) return <PrivacyBeat frame={frame} />;
    if (frame < BEATS.themes.from) return <FaqBeat frame={frame} />;
    if (frame < BEATS.close.from) return <ThemesBeat frame={frame} />;
    return <CloseBeat frame={frame} />;
  })();

  // The page column swaps at every beat boundary; a 14-frame dip stops that reading as a
  // glitch. The window itself never changes, which is the whole reason the switch is here
  // and not in a Sequence.
  //
  // Before the first boundary there is nothing to dip from, and dipping anyway would open
  // the cut on a black panel — the poster frame `video-frames` checks. So the opening
  // beat is the one that is simply up.
  const boundaries = [
    BEATS.quick.from,
    BEATS.targeted.from,
    BEATS.thinking.from,
    BEATS.sources.from,
    BEATS.answer.from,
    BEATS.privacy.from,
    BEATS.faq.from,
    BEATS.themes.from,
    BEATS.close.from,
  ];
  const nearest = boundaries.filter((boundary) => frame >= boundary).pop();

  return (
    <div style={{opacity: nearest === undefined ? 1 : fade(frame, nearest)}}>{beat}</div>
  );
};

export const AiWalkthrough = () => {
  const frame = useCurrentFrame();

  return (
  <AbsoluteFill>
    <Stage
      contentSize={PANEL}
      shots={[{at: 0, region: fullFrame(PANEL)}]}
      panelHeight={PANEL_HEIGHT}
      background={walkthroughBg(frame / (WALKTHROUGH_FRAMES - 1))}
      copy={<CopyTrack />}
    >
      <BrowserFrame width={BROWSER_WIDTH}>
        <SurfaceTrack />
      </BrowserFrame>
    </Stage>

    {/* The address, held under the copy column for the whole cut. A promo that shows a
        browser has already told the viewer where this is; the wordmark's job here is to
        make it readable at a glance rather than at address-bar size. */}
    <Interactive.Div
      name="Address"
      style={{
        position: 'absolute',
        left: 96,
        bottom: 72,
        fontFamily: font.display,
        fontSize: type.caption,
        letterSpacing: '0.04em',
        color: color.textDim,
      }}
    >
      ctrlbot.ai
    </Interactive.Div>
  </AbsoluteFill>
  );
};
