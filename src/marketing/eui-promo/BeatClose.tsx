import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {Stage} from '../Stage';
import {MasterControlCard} from './MasterControlCard';
import {powerPhase, promoDrift} from './euiPromoData';

export const BeatClose: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const phase = powerPhase(t, 'close');
  const poweringOffFrames = Math.round(frames * 0.34);

  const cardStartFrame = Math.round(frames * 0.52);
  const cardOpacity = interpolate(frame, [cardStartFrame, cardStartFrame + 10], [0, 1], {
    easing: Easing.linear,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fullRegion = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const driftRegion = promoDrift(TABLET_VIEWPORT);

  return (
    <AbsoluteFill>
      {cardOpacity < 1 && (
        <Stage
          contentSize={TABLET_VIEWPORT}
          shots={[
            {at: 0, region: fullRegion},
            {at: Math.round(frames * 0.34), region: driftRegion},
          ]}
        >
          {phase === 'powering-off' ? (
            <EuiPowerCapture
              device="tablet"
              state="powering-off"
              durationInFrames={poweringOffFrames}
            />
          ) : (
            <EuiPowerCapture device="tablet" state="off" />
          )}
        </Stage>
      )}

      {cardOpacity > 0 && (
        <div style={{position: 'absolute', inset: 0, opacity: cardOpacity}}>
          <MasterControlCard
            frames={frames}
            line="Control that actually works and is easy to use."
            kicker="ctrlbot.io"
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
