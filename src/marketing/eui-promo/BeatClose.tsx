// Power down, back to Welcome, then the card.
//
// The only beat that pulls *out*. Everything before it has been dissolving the device
// away to get at the interface; this one puts the tablet back together and hands the
// room back — the room returning to where the user found it, which is the whole
// gesture the ending is making.
//
// No copy column, so the panel is centred and larger rather than pinned right with an
// empty half-frame beside it.

import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {Stage} from '../Stage';
import {MasterControlCard} from './MasterControlCard';
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

/** Frame pixels. Larger than the copy-column beats, because nothing shares the frame. */
const CLOSE_PANEL_HEIGHT = 760;

export const BeatClose: React.FC<BeatProps> = ({frames, cut}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const phase = powerPhase(t, 'close');
  const poweringOffFrames = Math.round(frames * CLOSE_POWERING_OFF);

  // The 30 skips the Welcome hold. At four seconds it is a third of a second on
  // screen — long enough to register as a flicker and not long enough to read as the
  // room returning to rest, which is the only thing it was there to say.
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
