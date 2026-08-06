import type {ReactNode} from 'react';
import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {Region} from '../../camera/Camera';
import {Stage} from '../Stage';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {loopBg, loopPanelHeight, WEB_LOOP, type LoopVariant} from './webLoopData';

/**
 * The stage every web loop stands on: centred panel, drifting glow, the push, and the
 * asset preload — as one component, because all four have to be there and the loop that
 * forgets one does not look broken until it is on the website.
 *
 * `<PromoPreload />` is the reason this exists rather than each loop calling `<Stage>`
 * itself, which is what they did first. Read its header: the EUI surfaces are built out
 * of CSS background images, Remotion's renderer cannot hold a frame for those the way it
 * does for `<Img>`, and so the first frames render with the backdrop and the display
 * panels simply missing.
 *
 * In a promo that is a glitch in one beat somewhere in the middle. **In a loop it lands
 * on frame 0** — which the viewer then sees every ten seconds, forever, and which is
 * also the frame the seam is measured against. Measured on the matrix loop before this
 * was added: frame 1 mean luminance 12.4, frame 2 40.1, frame 3 12.4, against 36.5 for
 * the rest of the loop. `npm run loop:seam` reported it as a failing wrap, correctly,
 * and it was not the wrap at all — it was the open.
 */
export const LoopStage = ({
  contentSize,
  region,
  variant = 'wide',
  children,
}: {
  /** Natural size of the surface, in its own dp plane. */
  contentSize: {width: number; height: number};
  /** The wide shot, in the same coordinates. Usually the surface's `full` region. */
  region: Region;
  /** Frame shape. `square` is the 1:1 tile — see WEB_LOOP_SQUARE. */
  variant?: LoopVariant;
  children: ReactNode;
}) => {
  const t = useCurrentFrame() / WEB_LOOP.frames;

  return (
    <>
      <PromoPreload />
      <Stage
        centered
        background={loopBg(t)}
        panelHeight={loopPanelHeight(t, variant)}
        bezel={WEB_LOOP.bezel}
        bezelOpacity={1}
        contentSize={contentSize}
        shots={[{at: 0, region}]}
      >
        {children}
      </Stage>
    </>
  );
};
