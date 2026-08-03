import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {Stage, StageCopy} from '../Stage';
import {powerPhase, promoDrift} from './euiPromoData';

export const BeatWake: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const state = powerPhase(t, 'wake') as 'off' | 'powering-on';
  const poweringOnFrames = Math.round(frames * (1 - 0.34));
  const fullRegion = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const driftRegion = promoDrift(TABLET_VIEWPORT);

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: fullRegion},
        {at: Math.round(frames * 0.12), region: fullRegion},
        {at: Math.round(frames * 0.77), region: driftRegion},
        {at: frames, region: driftRegion},
      ]}
      copy={
        <StageCopy
          eyebrow="POWER"
          title="Start the room"
          body="Welcome, then one press. The system powers on and lands on the controls."
          until={frames}
        />
      }
    >
      {state === 'off' ? (
        <EuiPowerCapture device="tablet" state="off" />
      ) : (
        <EuiPowerCapture
          device="tablet"
          state="powering-on"
          durationInFrames={poweringOnFrames}
        />
      )}
    </Stage>
  );
};
