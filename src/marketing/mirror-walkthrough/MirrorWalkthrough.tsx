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
import {MIRROR_VIEWPORT} from '../../app-ui/mirror/mirrorData';
import {round} from '../../app-ui/mirror/mirrorTheme';
import {background} from '../../design/theme';
import {NarrationTrack} from '../../audio/NarrationTrack';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {STAGE, Stage, StageCopy} from '../Stage';
import {
  BEATS,
  BEAT_NAMES,
  COPY,
  beatShots,
  MIRROR_WALKTHROUGH_FRAMES,
  type BeatName,
} from './walkthroughData';
import {
  MIRROR_WALKTHROUGH_NARRATION_CLIPS,
  MIRROR_WALKTHROUGH_NARRATION_SOURCE,
} from './mirrorWalkthroughNarration';

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

import {BEAT_RENDERERS, OpenBeat} from './MirrorBeats';

export {OpenBeat, BEAT_RENDERERS};

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
            // The close signs off on the product: the wordmark as the headline, the
            // brief's line under it in Montserrat. No address.
            title={name === 'close' ? 'CTRLbot Mirror' : copy.title}
            body={name === 'close' ? copy.line : undefined}
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

export const MirrorWalkthrough = ({narration = false}: {narration?: boolean}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <PromoPreload />
      <Stage
        contentSize={MIRROR_VIEWPORT}
        shots={beatShots()}
        panelHeight={STAGE.panelHeight}
        panelAspect={MIRROR_VIEWPORT.width / MIRROR_VIEWPORT.height}
        panelRadius={round.xl}
        background={mirrorBg(frame / (MIRROR_WALKTHROUGH_FRAMES - 1))}
        copy={<CopyTrack />}
      >
        <SurfaceTrack />
      </Stage>
      {narration ? (
        <NarrationTrack
          src={MIRROR_WALKTHROUGH_NARRATION_SOURCE}
          clips={MIRROR_WALKTHROUGH_NARRATION_CLIPS}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/** A separate render target; `mirror-walkthrough` stays silent by default. */
export const MirrorWalkthroughNarrated = () => <MirrorWalkthrough narration />;
