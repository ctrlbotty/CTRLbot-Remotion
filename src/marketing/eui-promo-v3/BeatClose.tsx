import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {Stage} from '../Stage';
import {MasterControlCard} from '../eui-promo/MasterControlCard';
import {
  CLOSE_CARD_AT,
  CLOSE_POWERING_OFF,
  promoBg,
  PROMO_PANEL,
  euiCentre,
  powerPhase,
  stageWide,
  type BeatProps,
} from './euiPromoData';

const CLOSE_PANEL_HEIGHT = 760;

export const BeatClose: React.FC<BeatProps> = ({frames, cut}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const phase = powerPhase(t, 'close');
  const poweringOffFrames = Math.round(frames * CLOSE_POWERING_OFF);

  const cardFrom = Math.round(frames * (cut === 'play' ? CLOSE_POWERING_OFF : CLOSE_CARD_AT));
  const cardOpacity = interpolate(frame, [cardFrom, cardFrom + 12], [0, 1], {
    easing: Easing.linear,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Stage
        background={promoBg(t)}
        panelHeight={CLOSE_PANEL_HEIGHT}
        bezel={PROMO_PANEL.bezel}
        centered
        contentSize={TABLET_VIEWPORT}
        shots={[
          {at: 0, region: euiCentre(TABLET_VIEWPORT)},
          {at: Math.round(frames * 0.12), region: euiCentre(TABLET_VIEWPORT)},
          {at: cardFrom, region: stageWide(TABLET_VIEWPORT)},
          {at: frames, region: stageWide(TABLET_VIEWPORT)},
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

      <Sequence from={cardFrom} layout="none" name="Closing card">
        <AbsoluteFill style={{opacity: cardOpacity}}>
          <MasterControlCard
            frames={frames - cardFrom}
            eyebrow="End User Interface"
            line="Control that actually works and is *easy to use.*"
            kickers={['ctrlbot.io', 'ctrlbot.ai']}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
