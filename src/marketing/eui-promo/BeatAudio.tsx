// Room audio.
//
// The routing state is exactly where `matrix` left it — all four outputs on Input 3.
// The cut escalates and never resets; a beat that quietly re-cold-starts the grid
// throws away the continuity the previous two bought.
//
// It reassembles the device first, though. `matrix` ends with the bezel and both bars
// gone, and this beat is about a control that lives in one of those bars — so it opens
// on the whole tablet again and then dissolves everything *except* the audio strip.
// The remaining content is off-centre by the 90dp the top bar used to occupy, so the
// camera recentres on it once the fade is done. That recentring is the tail of the
// dissolve, not a separate move.

import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {FocusRing} from '../../camera/Annotations';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {Stage} from '../Stage';
import {PromoCopy} from './PromoCopy';
import {
  promoBg,
  PROMO_PANEL,
  collapsed,
  chromeFade,
  euiBand,
  promoMuted,
  promoVolume,
  stageWide,
} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

const OUTPUTS = [0, 1, 2, 3].map((index) => ({
  label: `Output ${index + 1}`,
  source: 'Input 3',
}));

export const BeatAudio: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const band = collapsed(TABLET_VIEWPORT, true, false);
  const chrome = chromeFade(t, 0.08, 0.5);
  const muteBlock = Math.round(frames * 0.5);

  return (
    <Stage
      background={promoBg(t)}
      panelHeight={interpolate(t, [0.08, 0.5], [PROMO_PANEL.height, band.height], {
        easing: Easing.bezier(0.65, 0, 0.35, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })}
      panelAspect={interpolate(
        t,
        [0.08, 0.5],
        [TABLET_VIEWPORT.width / TABLET_VIEWPORT.height, band.aspect],
        {
          easing: Easing.bezier(0.65, 0, 0.35, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        },
      )}
      bezel={PROMO_PANEL.bezel}
      bezelOpacity={chrome}
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: stageWide(TABLET_VIEWPORT)},
        {at: Math.round(frames * 0.08), region: stageWide(TABLET_VIEWPORT)},
        {at: Math.round(frames * 0.5), region: euiBand(TABLET_VIEWPORT, true, false)},
        {at: frames, region: euiBand(TABLET_VIEWPORT, true, false)},
      ]}
      copy={
        <>
          <Sequence durationInFrames={muteBlock} layout="none" name="Copy: volume">
            <PromoCopy
              eyebrow="Room audio"
              title="Control the speakers in the room"
              body="Easily adjust the volume by *sliding the bar.*"
              until={muteBlock}
            />
          </Sequence>
          <Sequence from={muteBlock} layout="none" name="Copy: mute">
            <PromoCopy
              eyebrow="Room audio"
              title="Mute the room"
              body="One press toggles the audio *on and off.*"
              until={frames - muteBlock}
            />
          </Sequence>
        </>
      }
    >
      <TabletEui
        inputs={INPUTS}
        outputs={OUTPUTS}
        selectedInput={2}
        volume={promoVolume(t)}
        speakerMuted={promoMuted(t)}
        chrome={{top: chrome, audio: 1, backplate: false}}
      />

      {/* Ring only, no Spotlight. A dim over everything but the audio strip greys out
          the four routed outputs, and those are the thing the previous beat just
          established. The ring says where to look without undoing that. */}
      <FocusRing
        region={TABLET_EUI_REGIONS.volumeSlider}
        appearAt={Math.round(frames * 0.34)}
        radius={0}
        name="Volume slider ring"
      />
    </Stage>
  );
};
