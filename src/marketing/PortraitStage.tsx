// The portrait walkthrough layout: copy on top, the surface in a panel, captions under it.
//
// <Stage>'s portrait counterpart, for the 1080x1920 cut of a long video — the one posted to
// TikTok, YouTube Shorts, LinkedIn and X. Width binds in portrait, so the panel takes the
// full safe width and its height follows the surface's aspect. The stack is laid out from
// the bottom up: captions end on the feeds' safe line, the panel sits on the captions, and
// the copy gets whatever is left above it. A wider surface therefore gives the copy more
// room, never a caption under the feeds' buttons.
//
// Everything a viewer must read stays inside `social-walkthrough-vertical`'s safe area:
// clear of the bottom strip and the right-hand column the feeds draw over the video. The
// panel is allowed under that column; only text has to stay out of it.

import type {ReactNode} from 'react';
import {AbsoluteFill} from 'remotion';
import {Camera, type Shot} from '../camera/Camera';
import {background, color, radius} from '../design/theme';
import {DitherOverlay} from './DitherOverlay';

/** Frame pixels. The same safe area as `social-short`: top 220, right 140, bottom 380, left 72. */
export const PORTRAIT = {
  textLeft: 72,
  textTop: 220,
  textWidth: 868,
  panelLeft: 36,
  panelWidth: 1008,
  /** Between the copy and the panel, and between the panel and the captions. */
  gap: 24,
  captions: {left: 72, width: 868, height: 124, bottom: 1534, size: 52},
} as const;

/** Where everything lands for a surface of this size. */
export const portraitLayout = (contentSize: {width: number; height: number}) => {
  const captionsTop = PORTRAIT.captions.bottom - PORTRAIT.captions.height;
  let panelHeight = Math.round((PORTRAIT.panelWidth * contentSize.height) / contentSize.width);
  let panelWidth: number = PORTRAIT.panelWidth;
  let panelLeft: number = PORTRAIT.panelLeft;
  let panelTop = captionsTop - PORTRAIT.gap - panelHeight;
  let textHeight = panelTop - PORTRAIT.gap - PORTRAIT.textTop;

  // When the width-bound panel would leave the copy less than 360px, the panel takes
  // the height that leaves exactly 360px and its width follows the aspect, centred.
  if (textHeight < 360) {
    textHeight = 360;
    panelTop = PORTRAIT.textTop + textHeight + PORTRAIT.gap;
    panelHeight = captionsTop - PORTRAIT.gap - panelTop;
    panelWidth = Math.round((panelHeight * contentSize.width) / contentSize.height);
    panelLeft = Math.round((1080 - panelWidth) / 2);
  }

  return {
    text: {left: PORTRAIT.textLeft, top: PORTRAIT.textTop, width: PORTRAIT.textWidth, height: textHeight},
    panel: {left: panelLeft, top: panelTop, width: panelWidth, height: panelHeight},
    captions: {left: PORTRAIT.captions.left, top: captionsTop, width: PORTRAIT.captions.width, height: PORTRAIT.captions.height},
  };
};

export const PortraitStage = ({
  contentSize,
  shots,
  copy,
  captions,
  background: stageBackground = background.stage,
  panelRadius = radius.xl,
  bezel = 0,
  panelScale,
  children,
}: {
  /** Natural size of the surface, in the plane it lays itself out in. */
  contentSize: {width: number; height: number};
  /** Camera path over that surface, in the same coordinates. */
  shots: Shot[];
  /** The copy block, placed in the text box. Usually a `<WalkthroughCopy format="portrait">`. */
  copy?: ReactNode;
  /** Burned-in captions. They position themselves; `portraitLayout().captions` is their box. */
  captions?: ReactNode;
  background?: string;
  panelRadius?: number;
  /** Frame pixels of device edge drawn outside the panel, as `<Stage>`'s. */
  bezel?: number;
  /** Scales the whole device, bezel included, about its centre. */
  panelScale?: number;
  /** The surface itself — a live component from `app-ui/`. */
  children: ReactNode;
}) => {
  const layout = portraitLayout(contentSize);
  return (
    <AbsoluteFill style={{background: stageBackground, overflow: 'hidden'}}>
      <DitherOverlay />
      {copy ? (
        <div style={{position: 'absolute', ...layout.text}}>{copy}</div>
      ) : null}

      {/* A rig, not a design element — plain div, like <Stage>'s panel. The bezel, when
          there is one, is drawn outside the panel so the camera's viewport is unchanged. */}
      <div
        style={{
          position: 'absolute',
          left: layout.panel.left - bezel,
          top: layout.panel.top - bezel,
          width: layout.panel.width + bezel * 2,
          height: layout.panel.height + bezel * 2,
          scale: panelScale !== undefined ? String(panelScale) : undefined,
          borderRadius: bezel > 0 ? radius.xl : undefined,
          backgroundColor: bezel > 0 ? color.bezel : undefined,
          border: bezel > 0 ? `1px solid ${color.lineSoft}` : undefined,
          boxShadow: bezel > 0 ? `0 40px 120px ${color.scrim}` : undefined,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: bezel,
            top: bezel,
            width: layout.panel.width,
            height: layout.panel.height,
            overflow: 'hidden',
            borderRadius: bezel > 0 ? radius.sm : panelRadius,
            boxShadow: bezel > 0 ? undefined : `0 40px 120px ${color.scrim}`,
          }}
        >
          <Camera contentSize={contentSize} shots={shots} viewport={{width: layout.panel.width, height: layout.panel.height}}>
            {children}
          </Camera>
        </div>
      </div>

      {captions}
    </AbsoluteFill>
  );
};
