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
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf} from '../../camera/Camera';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {Stage} from '../Stage';
import {PromoCopy} from './PromoCopy';
import {
  AUDIO_MUTE_AT,
  AUDIO_UNMUTE_AT,
  promoBg,
  PROMO_PANEL,
  collapsed,
  chromeFade,
  euiBand,
  promoMuted,
  promoVolume,
  stageWide,
  type BeatProps,
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

export const BeatAudio: React.FC<BeatProps> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const band = collapsed(TABLET_VIEWPORT, true, false);
  const chrome = chromeFade(t, 0.08, 0.5);
  const muteBlock = Math.round(frames * 0.5);

  const muteTapFrom = Math.round(frames * 0.52);
  const muteTapAt = Math.round(frames * AUDIO_MUTE_AT);
  const muteTapDuration = Math.round(frames * 0.16);

  const unmuteTapFrom = Math.round(frames * 0.74);
  const unmuteTapAt = Math.round(frames * AUDIO_UNMUTE_AT);
  const unmuteTapDuration = Math.round(frames * 0.16);

  const speakerRegion = TABLET_EUI_REGIONS.speakerControl;

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

      {/* Highlight the volume block at the bottom instead of the volume bar itself */}
      <Sequence
        from={Math.round(frames * 0.05)}
        durationInFrames={Math.round(frames * 0.44)}
        layout="none"
        name="Volume block ring"
      >
        <FocusRing
          region={TABLET_EUI_REGIONS.volumeBar}
          appearAt={0}
          radius={0}
          name="Volume block ring"
        />
      </Sequence>

      {/* Mute interaction */}
      <Sequence
        from={muteTapFrom}
        durationInFrames={muteTapDuration}
        layout="none"
        name="Tap Speaker Mute"
      >
        <FocusRing
          region={speakerRegion}
          appearAt={0}
          radius={6}
          name="Speaker mute ring"
        />
        <TapIndicator
          x={centerOf(speakerRegion).x}
          y={centerOf(speakerRegion).y}
          at={muteTapAt - muteTapFrom}
          name="Speaker mute tap"
        />
      </Sequence>

      {/* Unmute interaction */}
      <Sequence
        from={unmuteTapFrom}
        durationInFrames={unmuteTapDuration}
        layout="none"
        name="Tap Speaker Unmute"
      >
        <FocusRing
          region={speakerRegion}
          appearAt={0}
          radius={6}
          name="Speaker unmute ring"
        />
        <TapIndicator
          x={centerOf(speakerRegion).x}
          y={centerOf(speakerRegion).y}
          at={unmuteTapAt - unmuteTapFrom}
          name="Speaker unmute tap"
        />
      </Sequence>
    </Stage>
  );
};
