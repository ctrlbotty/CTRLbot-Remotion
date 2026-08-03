// The copy block for the EUI promo, which animates instead of appearing.
//
// `StageCopy` staggers three blocks and then holds. That is right for a training cut
// where the camera is doing the moving, and wrong here: this cut locks its camera on
// the two longest beats by direction, so for most of `route` and `matrix` the copy is
// the only thing on screen that can move at all. Held text on a held shot is the
// slideshow the whole workflow exists to prevent.
//
// So the body streams a word at a time. It is continuous rather than discrete — the
// measurement behind `inert-fraction` is that discrete UI events barely register and
// only continuous movement carries a cut — and it reads as writing rather than as a
// caption being switched on.
//
// A word wrapped in *asterisks* is set in CTRLbot blue. That is the highlight from the
// approved First-Run callouts, where the accent marks the one word the beat is about.
//
// Every easing is written out at its call site rather than shared from a constant.
// AUTHORING.md requires it: Studio can only keyframe values it can read statically.

import {Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {color, font, space, type} from '../../design/theme';

/** The house stagger between words, when there is room for it. */
const WORD_STAGGER = 2.4;
/** How long a single word takes to arrive. */
const WORD_TRAVEL = 14;
/** Frames after the block starts before the first word moves. */
const BODY_DELAY = 16;
/** The last word must have landed by this fraction of the block's span. */
const STREAM_DONE_BY = 0.62;

/**
 * How fast the words come.
 *
 * A fixed stagger works at 60 seconds and breaks at 30: the closing card gets 49
 * frames there, and nine words at 2.4 frames apart are still arriving when the video
 * ends. So the rate is derived from the room available rather than chosen — the line
 * always lands by `STREAM_DONE_BY`, whichever cut is rendering.
 */
const staggerFor = (span: number, wordCount: number) =>
  Math.min(
    WORD_STAGGER,
    Math.max(
      0.8,
      (span * STREAM_DONE_BY - BODY_DELAY - WORD_TRAVEL) / Math.max(1, wordCount - 1),
    ),
  );

/** The frame a streamed line has finished on. For anything that must follow it. */
export const streamEnd = (span: number, wordCount: number) =>
  BODY_DELAY + (wordCount - 1) * staggerFor(span, wordCount) + WORD_TRAVEL;

/**
 * One word of a streaming line.
 *
 * Rendered as an inline-block so it can be translated without breaking the line box,
 * with the trailing space outside it — a space inside a transformed inline-block
 * collapses and the line closes up as it animates.
 */
const Word = ({
  text,
  at,
  accent,
  leaving,
}: {
  text: string;
  at: number;
  accent: boolean;
  leaving: number;
}) => {
  const frame = useCurrentFrame();

  return (
    <>
      <span
        style={{
          display: 'inline-block',
          color: accent ? color.accent : 'inherit',
          opacity:
            interpolate(frame, [at, at + WORD_TRAVEL], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }) * leaving,
          translate: interpolate(
            frame,
            [at, at + WORD_TRAVEL + 4],
            ['0px 12px', '0px 0px'],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            },
          ),
        }}
      >
        {text}
      </span>{' '}
    </>
  );
};

export const PromoCopy = ({
  eyebrow,
  title,
  body,
  at = 0,
  until,
  span,
  align = 'left',
}: {
  eyebrow?: string;
  /** Audiowide. A headline, not a sentence. */
  title?: string;
  /** Montserrat. Words in *asterisks* are set in CTRLbot blue. */
  body?: string;
  /** Frame this block begins arriving on, relative to the enclosing Sequence. */
  at?: number;
  /** Frame it has fully left by. Omit to leave it up. */
  until?: number;
  /**
   * Frames the block has to play in, for pacing only. Defaults to `until`. Pass it
   * explicitly where the block must pace itself but must not fade out — the closing
   * card, whose last line is the last thing in the video.
   */
  span?: number;
  align?: 'left' | 'center';
}) => {
  const frame = useCurrentFrame();

  // Leaves faster than it arrives, and as one block: a streamed exit reads as the
  // line being un-typed, which is a different and much stranger gesture.
  const leaving = until
    ? interpolate(frame, [until - 16, until - 4], [1, 0], {
        easing: Easing.bezier(0.7, 0, 0.84, 0),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  // `*several words*` is one accent run, not two accented words with plain text
  // between them — so the flag carries across the words inside the markers.
  const words: {text: string; accent: boolean}[] = [];
  let inAccent = false;
  for (const raw of (body ?? '').split(/\s+/).filter(Boolean)) {
    const accent: boolean = inAccent || raw.startsWith('*');
    words.push({text: raw.replace(/\*/g, ''), accent});
    inAccent = accent && !(raw.endsWith('*') && raw.length > 1);
  }

  const stagger = staggerFor((span ?? until ?? 90) - at, words.length);

  return (
    <Interactive.Div
      name="Promo copy"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: space(2.5),
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
      }}
    >
      {eyebrow ? (
        <Interactive.Div
          name="Promo eyebrow"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: color.accent,
            fontFamily: font.mono,
            fontSize: type.label,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity:
              interpolate(frame, [at, at + 12], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * leaving,
          }}
        >
          {/* The rule draws rather than fades — the one gesture carried over from the
              approved walkthrough callouts, where it is what makes the eyebrow read as
              a label on something rather than a floating line of small type. */}
          <span
            style={{
              height: 2,
              borderRadius: 999,
              backgroundColor: color.accent,
              width: interpolate(frame, [at, at + 22], [0, 34], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
          {eyebrow}
        </Interactive.Div>
      ) : null}

      {title ? (
        <Interactive.Div
          name="Promo title"
          style={{
            color: color.text,
            fontFamily: font.display,
            fontSize: type.title,
            lineHeight: 1.04,
            letterSpacing: 0,
            opacity:
              interpolate(frame, [at + 5, at + 22], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * leaving,
            translate: interpolate(
              frame,
              [at + 5, at + 28],
              ['0px 18px', '0px 0px'],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            ),
          }}
        >
          {title}
        </Interactive.Div>
      ) : null}

      {words.length ? (
        <Interactive.Div
          name="Promo body"
          style={{
            color: color.textMuted,
            fontFamily: font.ui,
            fontSize: type.subheading,
            fontWeight: 400,
            lineHeight: 1.42,
          }}
        >
          {words.map((word, index) => (
            <Word
              key={`${word.text}-${index}`}
              text={word.text}
              accent={word.accent}
              at={at + BODY_DELAY + index * stagger}
              leaving={leaving}
            />
          ))}
        </Interactive.Div>
      ) : null}
    </Interactive.Div>
  );
};
