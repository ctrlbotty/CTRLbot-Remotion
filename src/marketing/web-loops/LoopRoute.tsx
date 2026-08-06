import React from 'react';
import {useCurrentFrame} from 'remotion';
import {
  TABLET_EUI_MANY_TO_ONE_REGIONS,
  TABLET_VIEWPORT,
  TabletEuiManyToOne,
} from '../../app-ui/TabletEui';
import {LoopStage} from './LoopStage';
import {LoopTap} from './LoopTap';
import {
  EUI_INPUTS,
  loopBg,
  loopPanelHeight,
  RESTING_VOLUME,
  ROUTE_TAPS,
  routeSelection,
  WEB_LOOP,
} from './webLoopData';

/**
 * Many-to-One: switching what one display is showing.
 *
 * Three taps down the source column, the third landing back on the source the loop
 * opened with. The display panel is the evidence — it takes the new source in the same
 * frame the source row lights, which is the claim this surface exists to make.
 */
export const LoopRoute: React.FC<{frames?: number}> = ({frames = WEB_LOOP.frames}) => {
  const t = useCurrentFrame() / frames;

  return (
    <LoopStage contentSize={TABLET_VIEWPORT} region={TABLET_EUI_MANY_TO_ONE_REGIONS.full}>
      <TabletEuiManyToOne
        inputs={EUI_INPUTS}
        selectedInput={routeSelection(t)}
        volume={RESTING_VOLUME}
      />

      {ROUTE_TAPS.map((tap) => (
        <LoopTap
          key={tap.input}
          region={TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(tap.input)}
          at={tap.at}
          frames={frames}
          name={EUI_INPUTS[tap.input].label}
        />
      ))}
    </LoopStage>
  );
};
