// A camera over a fixed-size content plane.
//
// This is what makes the difference between a slideshow and motion graphics: instead
// of shrinking a whole screen into a box, we render the UI at its natural size and
// move a camera over it — pushing into the one control being explained, then pulling
// back out.
//
// This component is a rig, not a design element. It does the transform math, so it
// intentionally does not use `Interactive.*`; the UI *inside* it stays interactive.

import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

/** A rectangle in content coordinates (the same dp space the UI is laid out in). */
export type Region = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** A camera position at a point in time. */
export type Shot = {
  /** Frame, relative to the enclosing Sequence, at which the camera reaches `region`. */
  at: number;
  region: Region;
};

export type CameraProps = {
  /** Natural size of the content plane. */
  contentSize: {width: number; height: number};
  /**
   * Camera path. Must be ordered by `at`. Two shots with the same region hold
   * the camera still between them; a single shot is a locked-off camera.
   */
  shots: Shot[];
  /**
   * How a region whose aspect differs from the frame is reconciled.
   *
   * `expand` (default) grows the region's short axis until it matches the frame,
   * so everything requested stays visible and the surrounding UI fills the rest.
   * `crop` shrinks the long axis instead, framing exactly the requested area and
   * cutting the overflow.
   *
   * Either way the result exactly fills the frame — there are never black bars.
   */
  fit?: 'expand' | 'crop';
  /**
   * The box this camera fills, in pixels. Defaults to the composition frame,
   * which is what a full-bleed training cut wants.
   *
   * Marketing layouts do not give the camera the whole frame: `<Stage>` puts the
   * surface in a panel down one side and the copy in a column beside it, so the
   * camera fills the panel. Without this the aspect reconciliation, the zoom and
   * both offsets are all computed against 1920x1080 while the camera is actually
   * rendering into 960x600 — the shot lands somewhere else entirely and the
   * failure looks like a layout bug rather than a maths one.
   *
   * It must match the size of the element this camera renders into. Nothing can
   * check that, so pass the same constant both places.
   */
  viewport?: {width: number; height: number};
  children: ReactNode;
};

/** The whole content plane — the default wide shot. */
export const fullFrame = (contentSize: {width: number; height: number}): Region => ({
  x: 0,
  y: 0,
  width: contentSize.width,
  height: contentSize.height,
});

/**
 * Grow a region by `amount` on every side, so a push-in leaves breathing room
 * around the control instead of cropping hard to its bounding box.
 */
export const padRegion = (region: Region, amount: number): Region => ({
  x: region.x - amount,
  y: region.y - amount,
  width: region.width + amount * 2,
  height: region.height + amount * 2,
});

/**
 * Frame exactly `width` content-units across, centred on `center`; the camera
 * derives the height from the frame's aspect ratio.
 *
 * This is usually the honest way to specify a shot on a portrait UI. Width is the
 * binding dimension there — the frame is narrow, so how much of the interface is
 * visible is decided by how wide the shot is, and asking for a control's bounding
 * box just gets reconciled back to a width anyway. Half the content width is a 2x
 * push-in, and that reads directly from the call site.
 */
export const frameWidth = (center: {x: number; y: number}, width: number): Region => ({
  x: center.x - width / 2,
  y: center.y,
  width,
  // Deliberately degenerate: frameRegion() grows this to the frame's aspect.
  height: Number.EPSILON,
});

/** The centre point of a region — for handing a control to `frameWidth`. */
export const centerOf = (region: Region) => ({
  x: region.x + region.width / 2,
  y: region.y + region.height / 2,
});

/**
 * Reconcile a requested region with the frame's aspect ratio.
 *
 * A camera frame has a fixed shape; a region is only a request for what must be
 * in view. Without this step a wide region in a tall frame gets scaled by its
 * height and blows far past the intended zoom — which is exactly how a 392x295
 * output grid ended up rendered at 6.5x in a 1080x1920 frame.
 */
const frameRegion = (
  region: Region,
  viewport: {width: number; height: number},
  fit: 'expand' | 'crop',
): Region => {
  const viewportAspect = viewport.width / viewport.height;
  const regionAspect = region.width / region.height;
  const centerX = region.x + region.width / 2;
  const centerY = region.y + region.height / 2;

  // `expand` grows the deficient axis; `crop` shrinks the excess one.
  const widenToFit = fit === 'expand' ? regionAspect < viewportAspect : regionAspect > viewportAspect;

  const width = widenToFit ? region.height * viewportAspect : region.width;
  const height = widenToFit ? region.height : region.width / viewportAspect;

  return {x: centerX - width / 2, y: centerY - height / 2, width, height};
};

/**
 * Keep the frame inside the content plane.
 *
 * Framing a control near an edge pushes the reconciled region past the edge of the
 * UI, and the camera then shows empty background beside the product. Clamping slides
 * the frame back inside instead; an axis where the frame is larger than the content
 * is centred, since there is nothing to slide toward.
 */
const clampToContent = (region: Region, contentSize: {width: number; height: number}): Region => ({
  x:
    region.width >= contentSize.width
      ? (contentSize.width - region.width) / 2
      : Math.min(Math.max(region.x, 0), contentSize.width - region.width),
  y:
    region.height >= contentSize.height
      ? (contentSize.height - region.height) / 2
      : Math.min(Math.max(region.y, 0), contentSize.height - region.height),
  width: region.width,
  height: region.height,
});

export const Camera = ({
  contentSize,
  shots,
  fit = 'expand',
  viewport: viewportProp,
  children,
}: CameraProps) => {
  const frame = useCurrentFrame();
  const {width: frameWidthPx, height: frameHeightPx} = useVideoConfig();
  const viewport = viewportProp ?? {width: frameWidthPx, height: frameHeightPx};

  if (shots.length === 0) {
    throw new Error('<Camera> requires at least one shot.');
  }

  // Reconcile every shot with the frame shape first, then interpolate between the
  // framed results — so the path passes through the compositions actually intended.
  const framed = shots.map((shot) =>
    clampToContent(frameRegion(shot.region, viewport, fit), contentSize),
  );

  const times = shots.map((shot) => shot.at);
  const centersX = framed.map((region) => region.x + region.width / 2);
  const centersY = framed.map((region) => region.y + region.height / 2);
  // Interpolate zoom logarithmically. A linear scale ramp reads as though the
  // camera accelerates into the subject and stalls coming out; log space keeps
  // the perceived rate of zoom constant.
  const logScales = framed.map((region) => Math.log(viewport.width / region.width));

  const single = shots.length === 1;
  const easing = {
    easing: Easing.bezier(0.65, 0, 0.35, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  } as const;

  const centerX = single ? centersX[0] : interpolate(frame, times, centersX, easing);
  const centerY = single ? centersY[0] : interpolate(frame, times, centersY, easing);
  const scale = Math.exp(
    single ? logScales[0] : interpolate(frame, times, logScales, easing),
  );

  // Place the focused center at the viewport center.
  const offsetX = viewport.width / 2 - centerX * scale;
  const offsetY = viewport.height / 2 - centerY * scale;

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: contentSize.width,
          height: contentSize.height,
          transformOrigin: '0 0',
          translate: `${offsetX}px ${offsetY}px`,
          scale: String(scale),
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
