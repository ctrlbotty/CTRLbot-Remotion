// The CTRLbot.AI panel loop — 30s, 16:10, full bleed.
//
// The odd one out in this folder. Every other loop here shows the Android app on a device
// panel over a blue gradient; this one shows a *website*, and a website in a media cell is
// the page itself, edge to edge. No bezel, no browser chrome, no stage gradient — the
// site's own cell border is the frame, and anything drawn inside it would be a second
// frame within the first.
//
// It obeys the folder's one law all the same: **frame 0 and the frame after the last are
// the same picture.** That was free here, because the cycle is the product's. A session
// opens on an empty page, runs, and the ✕ clears everything back to the state it opened
// on — which is not an interaction invented to close a loop, it is the reset the About
// document describes and the thing the last copy beat is about. Cold, used, released,
// cold, exactly as the EUI loops do it.
//
// Two details the seam actually turns on:
//
//   - **The page returns to the same placeholder.** The live site randomises it on reset,
//     and a different string at t=1 is a jump cut on the wrap. This is the one place the
//     loop is deliberately less random than the product.
//   - **The caret's blink period divides the loop.** 36 frames into 900 goes 25 times
//     exactly, and the phase is offset so both ends of the wrap land on a lit caret. A
//     blink that does not divide the cycle puts a step on the seam forever.

import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  AnswerText,
  CtrlbotWeb,
  InstantCard,
  LaiOption,
  LaiQuestion,
  QaiRow,
  ResourceLink,
} from '../../app-ui/web/CtrlbotWeb';
import {WEB_VIEWPORT_WIDE} from '../../app-ui/web/webViewport';
import {WEB_THEMES} from '../../app-ui/web/webTheme';
import {
  ANSWER,
  INSTANT,
  PLACEHOLDER_OPENING,
  PROMPT_TEXT,
  QUICK_QUESTIONS,
  RESOURCES,
  TARGETED_OPTIONS,
  TARGETED_QUESTION,
} from '../ai-walkthrough/walkthroughData';

/** 30s at 30fps. */
export const AI_LOOP_FRAMES = 900;

/**
 * Phase boundaries, in frames.
 *
 * Named rather than inlined because the copy beats in `LOOP_COPY.ai` are a fraction of
 * the same clock and have to agree with them. `quick` opens at frame 120 (0.133) with the
 * instant assumption, but its beat — QUICK QUESTIONS — is written at 0.18, which is frame
 * 162: the frame the first question row actually lands on. The words arrive with the
 * thing they name rather than with the phase that contains it.
 *
 * Verified against the built page rather than assumed: at 0.50 the panel reads CLICKABLE
 * ANSWERS over the three answer buttons, at 0.64 THREE SOURCES over the links, and at
 * 0.88 NOTHING KEPT over the page clearing.
 */
const PHASE = {
  type: 70,
  quick: 120,
  targeted: 320,
  sources: 540,
  answer: 660,
  clear: 740,
  blank: 800,
} as const;

/**
 * Where the page sits, per phase, so the stack is centred in the cell.
 *
 * The browser cut scrolls the page and lets the logo go off the top, because there it is
 * a window with a viewport and scrolling is what windows do. A media cell is a
 * composition: it is looked at as a picture, in a wall of other pictures, so the content
 * is centred in the frame at every phase and the mark stays on screen throughout.
 *
 * Each number is `(600 - (195 + content)) / 2` — 195 being logo, gap, pill and the
 * response column's own top margin. They differ because the phases are different heights,
 * and the travel between them reads as the page settling as a response lands.
 */
const TOP = {
  blank: 215,
  quick: 28,
  targeted: 58,
  sources: 42,
  answer: 99,
} as const;

const ease = (frame: number, from: number, to: number, a: number, b: number) =>
  interpolate(frame, [from, to], [a, b], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** A block arriving. Slower than a UI would do it — see the note in AiWalkthrough. */
const rise = (frame: number, at: number) => ({
  opacity: ease(frame, at, at + 26, 0, 1),
  translate: `0px ${ease(frame, at, at + 32, 12, 0)}px`,
});

export const LoopAi = () => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  // 2 at 1920 — `WEB_VIEWPORT_WIDE` is exactly half the frame, so the page lands on whole
  // pixels. Derived rather than written as `2` so the composition can be registered at
  // another width without the page quietly staying its own size in the corner, which is
  // precisely what it did the first time this was rendered.
  const scale = width / WEB_VIEWPORT_WIDE.width;

  // Phase 1-2 — the page, and the sentence going into it.
  const typed = Math.floor(
    ease(frame, PHASE.type, PHASE.type + 50, 0, PROMPT_TEXT.length),
  );
  const hasPrompt = frame >= PHASE.type && frame < PHASE.clear + 30;

  // One continuous path through every phase's resting position, opening and closing on
  // the same number — which is most of what makes the wrap free.
  const top = interpolate(
    frame,
    [
      0,
      PHASE.quick,
      PHASE.quick + 60,
      PHASE.targeted,
      PHASE.targeted + 40,
      PHASE.sources,
      PHASE.sources + 30,
      PHASE.answer,
      PHASE.answer + 30,
      PHASE.clear,
      PHASE.clear + 46,
      AI_LOOP_FRAMES,
    ],
    [
      TOP.blank,
      TOP.blank,
      TOP.quick,
      TOP.quick,
      TOP.targeted,
      TOP.targeted,
      TOP.sources,
      TOP.sources,
      TOP.answer,
      TOP.answer,
      TOP.blank,
      TOP.blank,
    ],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  // Everything the session produced leaves together when the ✕ is pressed. One fade for
  // the whole column, because that is what clearing a session looks like — not five
  // blocks dismissing themselves in sequence.
  const sessionOut = ease(frame, PHASE.clear, PHASE.clear + 34, 1, 0);

  // 36 divides 900 exactly, and the +1 offset puts both ends of the wrap on a lit caret.
  const caret = (frame + 1) % 36 < 18;

  const column = (() => {
    if (frame < PHASE.quick) return null;

    if (frame < PHASE.targeted) {
      const local = frame - PHASE.quick;
      return (
        <>
          <div style={rise(local, 0)}>
            <InstantCard>{INSTANT}</InstantCard>
          </div>
          {QUICK_QUESTIONS.slice(0, 4).map((question, index) => {
            const at = 40 + index * 38;
            return (
              <div key={question.text} style={rise(local, at)}>
                <QaiRow
                  text={question.text}
                  answer={local >= at + 26 ? question.answer : undefined}
                />
              </div>
            );
          })}
        </>
      );
    }

    if (frame < PHASE.sources) {
      const local = frame - PHASE.targeted;
      // The question and its three answers, and not the second assumption above them.
      // The beat this phase carries is `CLICKABLE ANSWERS / EVERY OPTION EXPLAINS WHAT IT
      // MEANS`, which is about the buttons; the assumption is what the previous phase's
      // instant card already showed. Keeping both would push the third button off a 600px
      // page, and PASS is the one of the three a viewer has not already guessed.
      return (
        <>
          <div style={rise(local, 0)}>
            <LaiQuestion>{TARGETED_QUESTION}</LaiQuestion>
          </div>
          {TARGETED_OPTIONS.map((option, index) => (
            <div key={option.kind} style={rise(local, 40 + index * 34)}>
              <LaiOption kind={option.kind} description={option.description} />
            </div>
          ))}
        </>
      );
    }

    if (frame < PHASE.answer) {
      const local = frame - PHASE.sources;
      return (
        <>
          {RESOURCES.map((resource, index) => (
            <div key={resource.title} style={rise(local, index * 32)}>
              <ResourceLink resource={resource} />
            </div>
          ))}
        </>
      );
    }

    const local = frame - PHASE.answer;
    return (
      <>
        <div style={rise(local, 0)}>
          <ResourceLink resource={RESOURCES[2]} />
        </div>
        <AnswerText>
          {ANSWER.slice(0, 2).map((paragraph, index) => (
            <div key={paragraph} style={rise(local, 26 + index * 40)}>
              {paragraph}
            </div>
          ))}
        </AnswerText>
      </>
    );
  })();

  // Held past `clear` so the column can fade rather than vanish, and dropped entirely for
  // the closing hold so the last frames are the opening page and nothing else.
  const showColumn = frame >= PHASE.quick && frame < PHASE.blank;

  return (
    <AbsoluteFill style={{backgroundColor: WEB_THEMES.dark.background}}>
      <div style={{transformOrigin: 'top left', scale: String(scale)}}>
        <CtrlbotWeb
          viewport={WEB_VIEWPORT_WIDE}
          prompt={hasPrompt ? PROMPT_TEXT.slice(0, typed) : ''}
          placeholder={PLACEHOLDER_OPENING}
          top={top}
          caret={caret}
          showReset={frame >= PHASE.quick && frame < PHASE.clear + 20}
        >
          {showColumn ? (
            <div style={{opacity: frame >= PHASE.clear ? sessionOut : 1}}>{column}</div>
          ) : null}
        </CtrlbotWeb>
      </div>
    </AbsoluteFill>
  );
};

/** Exported for the composition registration, so the length is stated once. */
export const aiLoopDuration = AI_LOOP_FRAMES;
