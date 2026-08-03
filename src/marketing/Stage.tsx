// The landscape marketing layout: surface right, copy left, stage gradient under both.
//
// One law, written once. Marketing scenes lay out with this or they do not lay out at
// all. The promo this replaces retyped `left: 236, top: 88, width: 1449, height: 970`
// into ten separate blocks and re-declared the same background gradient in six — which
// is how a frame ends up with a 235px black band down one side that nobody chose.
//
// Why a panel instead of the full frame: the app's tablet surface is 1280x800, which is
// 16:10, and every landscape marketing format is 16:9. A full-bleed shot of a 16:10
// surface in a 16:9 frame either letterboxes or crops all four edges at once. Framing it
// as a panel turns that mismatch from a defect into a composition, and buys the copy a
// column of its own instead of a scrim laid over the product.
//
// The camera still works. It runs inside the panel, over the surface's own dp plane, so
// a push onto one control is exactly as available here as it is in a training cut. That
// is the whole difference between this and a slideshow.

import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, type Shot} from '../camera/Camera';
import {background, color, font, radius, space, type} from '../design/theme';

/**
 * Stage geometry, in frame pixels.
 *
 * `panelHeight` is the one number that sizes the surface, and the panel's width follows
 * from the surface's own aspect — so 16:10 stays 16:10 and a phone stays portrait
 * without a second constant to keep in step. Shrink it and the copy column grows.
 */
export const STAGE = {
  panelHeight: 600,
  panelRight: 72,
  copyLeft: 96,
  copyMaxWidth: 700,
  /** Clearance between the copy column and the panel edge. */
  copyGutter: 64,
} as const;

/**
 * The copy column.
 *
 * Three faces, in their only permitted roles: Space Mono for the eyebrow, Audiowide for
 * the headline, Montserrat for the body. Staggered so the eye lands on the headline
 * first and the body arrives as it finishes reading it.
 *
 * This is a component rather than three divs per scene for the same reason `<Stage>`
 * exists: the duplicated version drifts. Four copies of one eyebrow block is what the
 * previous promo actually contained.
 */
export const StageCopy = ({
  eyebrow,
  title,
  body,
  at = 0,
  until,
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  /** Frame the copy begins arriving on, relative to the enclosing Sequence. */
  at?: number;
  /**
   * Beat length. The copy leaves over the 14 frames before it, which is both better
   * editing and the cheapest honest motion available to this format: an aspect-matched
   * panel cannot be pushed into without cropping, so a cut of held shots has nothing
   * moving in its second half unless the copy does. Omit to leave the copy up.
   */
  until?: number;
}) => {
  const frame = useCurrentFrame();
  // Leaves in reverse order — body, then title, then eyebrow — each over 14 frames but
  // offset, so the block is moving for 22 rather than 14. On a format that cannot pan
  // or push, the copy is the only thing left that can carry the back half of a beat.
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
      name="Stage copy"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: space(2),
      }}
    >
      {eyebrow ? (
        <Interactive.Div
          name="Stage eyebrow"
          style={{
            color: color.accent,
            fontFamily: font.mono,
            fontSize: type.label,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
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

      <Interactive.Div
        name="Stage title"
        style={{
          color: color.text,
          fontFamily: font.display,
          fontSize: type.title,
          lineHeight: 0.98,
          letterSpacing: 0,
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

      {body ? (
        <Interactive.Div
          name="Stage body"
          style={{
            color: color.textMuted,
            fontFamily: font.ui,
            fontSize: type.body,
            fontWeight: 400,
            lineHeight: 1.45,
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
    </Interactive.Div>
  );
};

export type StageProps = {
  /** Natural size of the surface, in the dp plane it lays itself out in. */
  contentSize: {width: number; height: number};
  /** Camera path over that surface, in the same dp coordinates. */
  shots: Shot[];
  /** The copy column. Usually a `<StageCopy>`. */
  copy?: ReactNode;
  /** Frame pixels. Shrink to give the copy more room; the panel width follows. */
  panelHeight?: number;
  /**
   * Panel aspect, width over height. Defaults to the surface's own — which is what a
   * device panel wants, because a tablet is 16:10 and showing it as anything else is
   * showing a tablet nobody makes.
   */
  panelAspect?: number;
  /**
   * Frame pixels of device edge drawn around the camera viewport.
   *
   * A real inset, not a camera trick. Framing wider than the surface and letting the
   * margin read as bezel works, but it couples the bezel to the shot: every push
   * changes how much device is visible, and the bezel cannot be dissolved
   * independently of the screen inside it. As padding it is just a frame, the camera
   * keeps the surface's native aspect, and `bezelOpacity` can take it away.
   */
  bezel?: number;
  /** 0..1. Fades the bezel, its edge and its shadow, leaving the screen behind. */
  bezelOpacity?: number;
  /** Centre the panel instead of pinning it right. For beats with no copy column. */
  centered?: boolean;
  /** Background under the whole stage. Defaults to the house marketing gradient. */
  background?: string;
  /** Passed through to `<Camera>`. See its own docs. */
  fit?: 'expand' | 'crop';
  /** The surface itself — a live component from `app-ui/`. */
  children: ReactNode;
};

export const Stage = ({
  contentSize,
  shots,
  copy,
  panelHeight = STAGE.panelHeight,
  panelAspect,
  bezel = 0,
  bezelOpacity = 1,
  centered = false,
  background: stageBackground = background.stage,
  fit,
  children,
}: StageProps) => {
  const {width: frameWidth, height: frameHeight} = useVideoConfig();

  // Width follows the surface's own aspect unless the caller asks for a window of a
  // different shape, so the panel can never distort what is inside it either way.
  // `panelHeight` sizes the *screen*; the bezel is drawn outside it.
  const screenWidth = (panelAspect ?? contentSize.width / contentSize.height) * panelHeight;
  const panelWidth = screenWidth + bezel * 2;
  const outerHeight = panelHeight + bezel * 2;
  const panelLeft = centered
    ? (frameWidth - panelWidth) / 2
    : frameWidth - STAGE.panelRight - panelWidth;
  const panelTop = (frameHeight - outerHeight) / 2;

  // The copy takes whatever the panel leaves, up to its own maximum — so shrinking the
  // panel widens the column rather than opening a gap in the middle of the frame.
  const copyWidth = Math.min(
    STAGE.copyMaxWidth,
    panelLeft - STAGE.copyGutter - STAGE.copyLeft,
  );

  return (
    <AbsoluteFill style={{background: stageBackground, overflow: 'hidden'}}>
      {copy ? (
        <div
          style={{
            position: 'absolute',
            left: STAGE.copyLeft,
            top: 0,
            bottom: 0,
            width: copyWidth,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {copy}
        </div>
      ) : null}

      {/* A rig, not a design element — plain div, like <Camera> itself. The shadow
          lifts the surface off the glow so the panel edge reads without a border
          drawn in a colour the app does not define.

          The fill matters once `panelAspect` is wider than the surface: whatever the
          camera does not cover shows this, and that margin is what reads as the
          device bezel. Black, because that is what the hardware is. */}
      {/* The bezel. Its own element so it can dissolve while the screen inside stays
          exactly where it is — a device that fades away and leaves the interface. */}
      {bezel > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: panelLeft,
            top: panelTop,
            width: panelWidth,
            height: outerHeight,
            borderRadius: radius.xl,
            backgroundColor: color.void,
            border: `1px solid ${color.lineSoft}`,
            boxShadow: `0 40px 120px ${color.scrim}`,
            opacity: bezelOpacity,
          }}
        />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: panelLeft + bezel,
          top: panelTop + bezel,
          width: screenWidth,
          height: panelHeight,
          overflow: 'hidden',
          borderRadius: bezel > 0 ? radius.sm : radius.xl,
          boxShadow: bezel > 0 ? undefined : `0 40px 120px ${color.scrim}`,
        }}
      >
        <Camera
          contentSize={contentSize}
          shots={shots}
          fit={fit}
          viewport={{width: screenWidth, height: panelHeight}}
        >
          {children}
        </Camera>
      </div>
    </AbsoluteFill>
  );
};
