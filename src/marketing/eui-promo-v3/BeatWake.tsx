import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {Stage} from '../Stage';
import {PromoCopy} from '../eui-promo/PromoCopy';
import {
  promoBg,
  PROMO_PANEL,
  euiCentre,
  powerPhase,
  stageWide,
  type BeatProps,
} from './euiPromoData';

export const BeatWake: React.FC<BeatProps> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const state = powerPhase(t, 'wake') as 'off' | 'powering-on';
  const poweringOnFrames = Math.round(frames * (1 - 0.34));

  return (
    <Stage
      background={promoBg(t)}
      panelHeight={PROMO_PANEL.height}
      bezel={PROMO_PANEL.bezel}
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: stageWide(TABLET_VIEWPORT)},
        {at: Math.round(frames * 0.14), region: stageWide(TABLET_VIEWPORT)},
        {at: Math.round(frames * 0.72), region: euiCentre(TABLET_VIEWPORT)},
        {at: frames, region: euiCentre(TABLET_VIEWPORT)},
      ]}
      copy={
        <PromoCopy
          eyebrow="Power"
          title="It begins with one button."
          body="A simple power press starts the room and powers on *all the connected devices.*"
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
