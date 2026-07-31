// Annotations that anchor to the UI.
//
// FocusRing and TapIndicator live *inside* <Camera>, in content coordinates, so they
// travel and scale with the control they point at. Callout lives *outside* the camera,
// in screen space, so its text stays at a fixed legible size no matter the zoom.

import type {CSSProperties, ReactNode} from 'react';
import {Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import type {Region} from './Camera';
import {color, font, radius, type} from '../design/theme';

/**
 * A ring drawn around a UI element, in content coordinates.
 * Place inside <Camera>. `appearAt` is relative to the enclosing Sequence.
 *
 * `radius` must match the control being framed. The EUI's display panels are
 * square-cornered, and a rounded ring over a square panel reads as sloppy — the
 * two edges disagree at every corner. Hence the default of 0; pass the app's
 * radius (5–6dp) for the source cards, 8 for anything on the 8dp shape.
 */
export const FocusRing = ({
  region,
  appearAt = 0,
  radius = 0,
  name = 'Focus ring',
}: {
  region: Region;
  appearAt?: number;
  radius?: number;
  name?: string;
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: 'absolute',
        left: region.x,
        top: region.y,
        width: region.width,
        height: region.height,
        borderRadius: radius,
        border: '2px solid #008FD4',
        boxShadow: '0 0 0 4px rgba(0, 143, 212, 0.16), 0 0 32px rgba(0, 143, 212, 0.4)',
        pointerEvents: 'none',
        opacity: interpolate(frame, [appearAt, appearAt + 8], [0, 1], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        scale: interpolate(frame, [appearAt, appearAt + 12], [1.06, 1], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: 'perceptual-scale',
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}
    />
  );
};

/**
 * Dim everything except `region`.
 *
 * On a portrait UI in a portrait frame there is very little room to zoom — width is
 * the binding dimension, so a dramatic push-in would have to crop the interface.
 * Spotlight carries the emphasis instead: the camera stays composed and the dim
 * isolates the control. Place inside <Camera>, in content coordinates.
 *
 * The huge spread on box-shadow is what fills the rest of the plane; it is the
 * standard way to punch a hole in an overlay without a mask.
 */
export const Spotlight = ({
  region,
  appearAt = 0,
  intensity = 0.72,
  radius = 0,
  name = 'Spotlight',
}: {
  region: Region;
  appearAt?: number;
  /** 0..1 dim applied outside the region. */
  intensity?: number;
  /** Match the framed control. Square by default — the EUI's panels are square. */
  radius?: number;
  name?: string;
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        left: region.x,
        top: region.y,
        width: region.width,
        height: region.height,
        borderRadius: radius,
        pointerEvents: 'none',
        boxShadow: `0 0 0 9999px rgba(0, 0, 0, ${intensity})`,
        opacity: interpolate(frame, [appearAt, appearAt + 12], [0, 1], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}
      // Not Interactive: the 9999px shadow makes the Studio bounding box useless.
      data-name={name}
    />
  );
};

/**
 * A tap ripple at a point in content coordinates. Two staggered rings read as a
 * press rather than a pulse. Place inside <Camera>.
 */
export const TapIndicator = ({
  x,
  y,
  at = 0,
  name = 'Tap',
}: {
  x: number;
  y: number;
  at?: number;
  name?: string;
}) => {
  const frame = useCurrentFrame();

  return (
    <>
      <Interactive.Div
        name={`${name} ripple`}
        style={{
          position: 'absolute',
          left: x - 44,
          top: y - 44,
          width: 88,
          height: 88,
          borderRadius: 999,
          border: '2px solid #008FD4',
          pointerEvents: 'none',
          opacity: interpolate(frame, [at, at + 4, at + 22], [0, 0.9, 0], {
            easing: Easing.linear,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [at, at + 22], [0.35, 1.15], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <Interactive.Div
        name={`${name} dot`}
        style={{
          position: 'absolute',
          left: x - 14,
          top: y - 14,
          width: 28,
          height: 28,
          borderRadius: 999,
          backgroundColor: 'rgba(0, 143, 212, 0.64)',
          pointerEvents: 'none',
          opacity: interpolate(frame, [at, at + 3, at + 16], [0, 1, 0], {
            easing: Easing.linear,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [at, at + 16], [0.6, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </>
  );
};

/**
 * A screen-space caption. Place *outside* <Camera> so it stays legible while the
 * camera moves.
 *
 * A full-bleed UI leaves no empty margin to put copy in, so `top` and `bottom` use
 * a gradient scrim rather than a floating card: the interface stays visible through
 * it and the result reads as a designed third instead of a box dropped on the
 * product. `left` and `right` keep the card treatment, for landscape cuts where
 * there is real space beside the UI.
 */
export const Callout = ({
  eyebrow,
  title,
  body,
  at = 0,
  side = 'bottom',
  name = 'Callout',
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  at?: number;
  side?: 'bottom' | 'top' | 'left' | 'right';
  name?: string;
}) => {
  const frame = useCurrentFrame();

  // SCRIM_FADE is how far the gradient reaches before it becomes opaque; EDGE_PAD is
  // the safe margin between the copy and the frame edge. Every side sets its own
  // padding outright — layering a shared padding under a per-side override is how the
  // top scrim previously lost its fade and printed against the very top of the frame.
  const SCRIM_FADE = 260;
  const EDGE_PAD = 110;

  const layout: CSSProperties =
    side === 'bottom'
      ? {
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: SCRIM_FADE,
          paddingBottom: EDGE_PAD,
          justifyContent: 'flex-end',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.94) 52%, rgba(0,0,0,0) 100%)',
        }
      : side === 'top'
        ? {
            left: 0,
            right: 0,
            top: 0,
            paddingTop: EDGE_PAD,
            paddingBottom: SCRIM_FADE,
            justifyContent: 'flex-start',
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.94) 52%, rgba(0,0,0,0) 100%)',
          }
        : {
            [side]: 72,
            top: 96,
            bottom: 96,
            maxWidth: 640,
            paddingTop: 40,
            paddingBottom: 40,
            justifyContent: 'flex-end',
            borderRadius: radius.lg,
            backgroundColor: 'rgba(26, 26, 26, 0.97)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.55)',
          };

  return (
    <Interactive.Div
      name={name}
      style={{
        position: 'absolute',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        paddingLeft: 72,
        paddingRight: 72,
        ...layout,
        opacity: interpolate(frame, [at, at + 10], [0, 1], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}
    >
      {eyebrow ? (
        <Interactive.Div
          name="Eyebrow"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: font.mono,
            fontWeight: 700,
            fontSize: type.body,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: color.accent,
            opacity: interpolate(frame, [at + 2, at + 14], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [at + 2, at + 16], ['0px 14px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span style={{width: 28, height: 2, borderRadius: 999, backgroundColor: color.accent}} />
          {eyebrow}
        </Interactive.Div>
      ) : null}
      <Interactive.Div
        name="Title"
        style={{
          fontFamily: font.ui,
          fontWeight: 700,
          fontSize: type.heading,
          lineHeight: 1.14,
          letterSpacing: -0.8,
          color: color.text,
          opacity: interpolate(frame, [at + 5, at + 17], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [at + 5, at + 19], ['0px 18px', '0px 0px'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {title}
      </Interactive.Div>
      {body ? (
        <Interactive.Div
          name="Body"
          style={{
            fontFamily: font.ui,
            fontWeight: 400,
            fontSize: type.body,
            lineHeight: 1.45,
            color: color.textMuted,
            opacity: interpolate(frame, [at + 9, at + 21], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [at + 9, at + 23], ['0px 18px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {body}
        </Interactive.Div>
      ) : null}
    </Interactive.Div>
  );
};
