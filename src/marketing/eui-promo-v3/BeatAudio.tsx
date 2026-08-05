import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf} from '../../camera/Camera';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {Stage} from '../Stage';
import {PromoCopy} from '../eui-promo/PromoCopy';
import {
  promoBg,
  PROMO_PANEL,
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
  const muteBlock = Math.round(frames * 0.5);

  const muteTapFrom = Math.round(frames * 0.65);
  const muteTapAt = Math.round(frames * 0.72);
  const muteTapDuration = Math.round(frames * 0.18);
  const speakerRegion = TABLET_EUI_REGIONS.speakerControl;

  return (
    <Stage
      background={promoBg(t)}
      panelHeight={PROMO_PANEL.height}
      bezel={PROMO_PANEL.bezel}
      bezelOpacity={1}
      contentSize={TABLET_VIEWPORT}
      shots={[{at: 0, region: stageWide(TABLET_VIEWPORT)}]}
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
      />

      <FocusRing
        region={TABLET_EUI_REGIONS.volumeSlider}
        appearAt={Math.round(frames * 0.2)}
        radius={0}
        name="Volume slider ring"
      />

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
          name="Speaker ring"
        />
        <TapIndicator
          x={centerOf(speakerRegion).x}
          y={centerOf(speakerRegion).y}
          at={muteTapAt - muteTapFrom}
          name="Speaker tap"
        />
      </Sequence>
    </Stage>
  );
};
