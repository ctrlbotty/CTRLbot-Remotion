import React from 'react';
import {useCurrentFrame} from 'remotion';
import {FocusRing, Spotlight} from '../../camera/Annotations';
import {centerOf, frameWidth} from '../../camera/Camera';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {Stage, StageCopy} from '../Stage';
import {promoMuted, promoVolume} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

const OUTPUTS = [0, 1, 2, 3].map((i) => ({
  label: `Output ${i + 1}`,
  source: 'Input 3',
}));

export const BeatAudio: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const fullRegion = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const volumeRegion = frameWidth(
    centerOf(TABLET_EUI_REGIONS.volumeSlider),
    TABLET_VIEWPORT.width * 0.86,
  );

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: fullRegion},
        {at: Math.round(frames * 0.12), region: fullRegion},
        {at: Math.round(frames * 0.58), region: volumeRegion},
        {at: frames, region: volumeRegion},
      ]}
      copy={
        <StageCopy
          eyebrow="ROOM AUDIO"
          title="Volume on the same screen"
          body="Drag the bar, mute the room. The routing behind it does not move."
          until={frames}
        />
      }
    >
      <TabletEui
        inputs={INPUTS}
        outputs={OUTPUTS}
        selectedInput={2}
        volume={promoVolume(t)}
        speakerMuted={promoMuted(t)}
      />

      <Spotlight region={TABLET_EUI_REGIONS.volumeSlider} appearAt={0} radius={0} />
      <FocusRing
        region={TABLET_EUI_REGIONS.volumeSlider}
        appearAt={Math.round(frames * 0.12)}
        radius={0}
        name="Volume slider ring"
      />
    </Stage>
  );
};
