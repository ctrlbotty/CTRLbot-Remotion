// A walkthrough's copy: what each step is and how to do it, in faces that read on a phone.
//
// Not <StageCopy>. That is the promo column — an Audiowide line per beat, which suits a
// six-word claim and not an instruction. Here Audiowide is only the product's name, at the
// open and the close. The step title is Montserrat SemiBold, its description Montserrat,
// and the eyebrow Space Mono, per AGENTS.md: the text delivers the message, not the font.
//
// Sized per format. Portrait is read on a phone at arm's length, so its body is 40px where
// landscape's is 30px — about 15pt either way once the frame is scaled to a screen.

import type {ReactNode} from 'react';
import {Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {color, font, type} from '../design/theme';

export type CopyFormat = 'landscape' | 'portrait';

const SIZE = {
  landscape: {eyebrow: 20, title: 48, body: 30, item: 30, detail: 27, badge: 40, gap: 18, itemGap: 10},
  portrait: {eyebrow: 30, title: 64, body: 40, item: 36, detail: 34, badge: 48, gap: 22, itemGap: 14},
} as const;

/** The widest a text block may be, per format: the Stage copy column, or the portrait safe width. */
export const COPY_WIDTH = {landscape: 667, portrait: 868} as const;

/** The product name at the largest Audiowide size that fits the column on one line. */
const headlineSize = (text: string, format: CopyFormat) =>
  Math.min(type.display, Math.floor(COPY_WIDTH[format] / (text.length * 0.66)));

export type Step = {title: string; body: string};

const Check = ({size}: {size: number}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color.success} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/**
 * A numbered checklist that ticks off as the steps complete. The active step shows its
 * description; `since` is the frame it became active, so its description fades in then.
 */
const Checklist = ({format, steps, active, since}: {format: CopyFormat; steps: readonly Step[]; active: number; since: number}) => {
  const frame = useCurrentFrame();
  const size = SIZE[format];
  return (
    <Interactive.Div name="Checklist" style={{display: 'flex', flexDirection: 'column', gap: size.itemGap}}>
      {steps.map((step, index) => {
        const number = index + 1;
        const state = number < active ? 'done' : number === active ? 'active' : 'todo';
        return (
          <div key={step.title}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <span
                style={{
                  width: size.badge,
                  height: size.badge,
                  flexShrink: 0,
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  border: `2px solid ${state === 'done' ? color.success : state === 'active' ? color.accent : color.line}`,
                  backgroundColor: state === 'active' ? color.accent : 'transparent',
                  fontFamily: font.mono,
                  fontSize: size.badge * 0.5,
                  fontWeight: 700,
                  color: state === 'todo' ? color.textDim : color.text,
                }}
              >
                {state === 'done' ? <Check size={size.badge * 0.62} /> : number}
              </span>
              <span
                style={{
                  fontFamily: font.ui,
                  fontWeight: state === 'active' ? 700 : 500,
                  fontSize: size.item,
                  lineHeight: 1.2,
                  color: state === 'active' ? color.text : state === 'done' ? color.textMuted : color.textDim,
                }}
              >
                {step.title}
              </span>
            </div>
            {state === 'active' ? (
              <div
                style={{
                  marginLeft: size.badge + 16,
                  marginTop: 8,
                  fontFamily: font.ui,
                  fontWeight: 400,
                  fontSize: size.detail,
                  lineHeight: 1.38,
                  color: color.textMuted,
                  opacity: interpolate(frame, [since, since + 16], [0, 1], {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  translate: interpolate(frame, [since, since + 20], ['0px 10px', '0px 0px'], {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              >
                {step.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </Interactive.Div>
  );
};

export const WalkthroughCopy = ({
  format,
  eyebrow,
  headline,
  title,
  body,
  checklist,
  at = 0,
  until,
  height,
}: {
  format: CopyFormat;
  /** Space Mono, uppercase: where in the walkthrough this is. */
  eyebrow?: string;
  /** Audiowide. The product's name, at the open and the close only. */
  headline?: string;
  /** Montserrat SemiBold: the step. */
  title?: string;
  /** Montserrat: how to do it. */
  body?: ReactNode;
  checklist?: {steps: readonly Step[]; active: number; since: number};
  /** Frame the copy begins arriving on, relative to the enclosing Sequence. */
  at?: number;
  /** Beat length. The copy leaves over the frames just before it. Omit to leave it up. */
  until?: number;
  /** A fixed height, so the block keeps its top edge as its content changes length. */
  height: number;
}) => {
  const frame = useCurrentFrame();
  const size = SIZE[format];
  const leave = (offset: number) =>
    until
      ? interpolate(frame, [until - 26 + offset, until - 12 + offset], [1, 0], {
          easing: Easing.bezier(0.7, 0, 0.84, 0),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;

  return (
    <Interactive.Div
      name="Walkthrough copy"
      style={{height, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: size.gap}}
    >
      {eyebrow ? (
        <Interactive.Div
          name="Eyebrow"
          style={{
            fontFamily: font.mono,
            fontSize: size.eyebrow,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: color.accent,
            opacity:
              interpolate(frame, [at, at + 14], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * leave(12),
          }}
        >
          {eyebrow}
        </Interactive.Div>
      ) : null}

      {headline ? (
        <Interactive.Div
          name="Headline"
          style={{
            fontFamily: font.display,
            fontSize: headlineSize(headline, format),
            lineHeight: 1,
            whiteSpace: 'nowrap',
            color: color.text,
            opacity:
              interpolate(frame, [at + 4, at + 20], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * leave(6),
            translate: interpolate(frame, [at + 4, at + 24], ['0px 14px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {headline}
        </Interactive.Div>
      ) : null}

      {title ? (
        <Interactive.Div
          name="Step title"
          style={{
            fontFamily: font.ui,
            fontWeight: 600,
            fontSize: size.title,
            lineHeight: 1.12,
            color: color.text,
            opacity:
              interpolate(frame, [at + 4, at + 20], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * leave(6),
            translate: interpolate(frame, [at + 4, at + 24], ['0px 14px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {title}
        </Interactive.Div>
      ) : null}

      {body ? (
        <Interactive.Div
          name="Step body"
          style={{
            fontFamily: font.ui,
            fontWeight: 400,
            fontSize: size.body,
            lineHeight: 1.4,
            color: color.textMuted,
            opacity:
              interpolate(frame, [at + 12, at + 28], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * leave(0),
            translate: interpolate(frame, [at + 12, at + 32], ['0px 10px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {body}
        </Interactive.Div>
      ) : null}

      {checklist ? (
        <div
          style={{
            opacity:
              interpolate(frame, [at + 8, at + 24], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * leave(0),
          }}
        >
          <Checklist format={format} {...checklist} />
        </div>
      ) : null}
    </Interactive.Div>
  );
};
