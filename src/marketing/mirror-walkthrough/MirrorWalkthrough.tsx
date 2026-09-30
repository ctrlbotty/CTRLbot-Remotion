// CTRLbot Mirror walkthrough — 1920x1080 landscape walkthrough cut.
//
// Built from Nathan's recording (video input/CTRLbot Mirror Tutorial.mp4,
// ingest/mirror-walkthrough/transcript.md).
//
// 1920x1080, copy left, Mirror desktop app in a Stage panel right.

import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import {CATALOG_VIEWPORT, DriverCatalog} from '../../app-ui/DriverCatalog';
import {
  DevicesPanel,
  MirrorApp,
  MirrorStage,
  type Mirrored,
} from '../../app-ui/mirror/Mirror';
import {
  MIRROR_CATALOG,
  MIRROR_DEVICE,
  MIRROR_VIEWPORT,
} from '../../app-ui/mirror/mirrorData';
import {round} from '../../app-ui/mirror/mirrorTheme';
import {background} from '../../design/theme';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {STAGE, Stage, StageCopy} from '../Stage';
import {
  BEATS,
  BEAT_NAMES,
  COPY,
  drift,
  MIRROR_WALKTHROUGH_FRAMES,
  type BeatName,
} from './walkthroughData';

export const mirrorWalkthroughDuration = MIRROR_WALKTHROUGH_FRAMES;

/** Background glow that drifts gently behind the stage over the 148 seconds. */
const mirrorBg = (t: number) =>
  background.promo(
    interpolate(t, [0, 1], [72, 60], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(t, [0, 1], [48, 54], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

/** The IoT driver catalog scrolling inside the tablet frame. */
const catalog = (frame: number, frames: number): Mirrored => ({
  width: CATALOG_VIEWPORT.tablet.width,
  height: CATALOG_VIEWPORT.tablet.height,
  screen: (
    <DriverCatalog
      device="tablet"
      drivers={MIRROR_CATALOG}
      listScroll={interpolate(frame, [0, frames], [0, 120], {
        easing: Easing.bezier(0.45, 0, 0.55, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })}
    />
  ),
});

/**
 * Open beat: Mirror window with the tablet live on the stage,
 * Devices panel showing the tablet mirroring, catalog scrolling.
 */
export const OpenBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => (
  <MirrorApp
    panel="devices"
    status={`Mirroring ${MIRROR_DEVICE.name}`}
    hasDevice
    side={<DevicesPanel selected details live />}
    stage={<MirrorStage mirrored={catalog(frame, frames)} />}
  />
);

/**
 * Beat registry. Every beat not yet built renders OpenBeat's live-mirroring state,
 * so the contact sheet can render all eleven from T5 onward. T6 introduces
 * specialized beat components.
 */
export const BEAT_RENDERERS: Partial<
  Record<BeatName, React.FC<{frame: number; frames: number}>>
> = {
  open: OpenBeat,
};

export const resolveBeat = (name: BeatName, frame: number, frames: number) => {
  const Component = BEAT_RENDERERS[name] ?? OpenBeat;
  return <Component frame={frame} frames={frames} />;
};

/** Copy column with one Sequence per beat. */
const CopyTrack = () => (
  <>
    {BEAT_NAMES.map((name) => {
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
            eyebrow={copy.eyebrow || undefined}
            title={copy.title}
            at={name === 'open' ? -40 : 4}
            until={beat.duration}
          />
        </Sequence>
      );
    })}
  </>
);

/**
 * Surface track: resolves the active beat based on composition frame
 * and renders inside the Stage panel.
 */
const SurfaceTrack = () => {
  const frame = useCurrentFrame();
  const currentBeat =
    BEAT_NAMES.find(
      (name) =>
        frame >= BEATS[name].from &&
        frame < BEATS[name].from + BEATS[name].duration,
    ) ?? 'open';

  const beatConfig = BEATS[currentBeat];
  const localFrame = frame - beatConfig.from;

  return (
    <div style={{width: MIRROR_VIEWPORT.width, height: MIRROR_VIEWPORT.height}}>
      {resolveBeat(currentBeat, localFrame, beatConfig.duration)}
    </div>
  );
};

export const MirrorWalkthrough = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <PromoPreload />
      <Stage
        contentSize={MIRROR_VIEWPORT}
        shots={drift(MIRROR_VIEWPORT, MIRROR_WALKTHROUGH_FRAMES)}
        panelHeight={STAGE.panelHeight}
        panelAspect={MIRROR_VIEWPORT.width / MIRROR_VIEWPORT.height}
        panelRadius={round.xl}
        background={mirrorBg(frame / (MIRROR_WALKTHROUGH_FRAMES - 1))}
        copy={<CopyTrack />}
      >
        <SurfaceTrack />
      </Stage>
    </AbsoluteFill>
  );
};
