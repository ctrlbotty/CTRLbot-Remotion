import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf} from '../../camera/Camera';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {Stage, StageCopy} from '../Stage';
import {matrixOutputs, matrixSelection, promoDrift, promoVolume} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const BeatMatrix: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const fullRegion = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const driftRegion = promoDrift(TABLET_VIEWPORT);

  const seqFrom = Math.round(frames * 0.68);
  const allTapAt = Math.round(frames * 0.72);
  const seqDuration = Math.round(frames * 0.22);

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: fullRegion},
        {at: Math.round(frames * 0.1), region: fullRegion},
        {at: Math.round(frames * 0.62), region: driftRegion},
        {at: frames, region: driftRegion},
      ]}
      copy={
        <StageCopy
          eyebrow="MANY-TO-MANY"
          title="Route every display"
          body="Pick an input, tap an output. Or press All and every display follows at once."
          until={frames}
        />
      }
    >
      <TabletEui
        inputs={INPUTS}
        outputs={matrixOutputs(t, false)}
        selectedInput={matrixSelection(t)}
        volume={promoVolume(t)}
      />

      <Sequence
        from={seqFrom}
        durationInFrames={seqDuration}
        layout="none"
        name="Press All"
      >
        <FocusRing
          region={TABLET_EUI_REGIONS.routeAll}
          appearAt={0}
          radius={6}
          name="All ring"
        />
        <TapIndicator
          x={centerOf(TABLET_EUI_REGIONS.routeAll).x}
          y={centerOf(TABLET_EUI_REGIONS.routeAll).y}
          at={allTapAt - seqFrom}
          name="All tap"
        />
      </Sequence>
    </Stage>
  );
};
