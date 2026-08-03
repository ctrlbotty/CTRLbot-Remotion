import React from 'react';
import {useCurrentFrame} from 'remotion';
import {TABLET_VIEWPORT, TabletEuiManyToOne} from '../../app-ui/TabletEui';
import {Stage, StageCopy} from '../Stage';
import {promoDrift, promoVolume, routeSelection} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const BeatRoute: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const fullRegion = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const driftRegion = promoDrift(TABLET_VIEWPORT);

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: fullRegion},
        {at: Math.round(frames * 0.14), region: fullRegion},
        {at: Math.round(frames * 0.8), region: driftRegion},
        {at: frames, region: driftRegion},
      ]}
      copy={
        <StageCopy
          eyebrow="MANY-TO-ONE"
          title="Choose a source"
          body="Tap it. The display takes it. That is the entire interaction."
          until={frames}
        />
      }
    >
      <TabletEuiManyToOne
        inputs={INPUTS}
        selectedInput={routeSelection(t)}
        volume={promoVolume(t)}
      />
    </Stage>
  );
};
