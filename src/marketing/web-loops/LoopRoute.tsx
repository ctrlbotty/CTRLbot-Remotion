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
  ROUTE_POWER_AT,
  ROUTE_TAPS,
  routeSelection,
  WEB_LOOP,
  type LoopVariant,
} from './webLoopData';

/**
 * Many-to-One: switching what one display is showing.
 *
 * Opens cold. Three taps down the source column, then the power control releases the room
 * and returns the panel to nothing routed. The display panel is the evidence — it takes
 * the new source in the same frame the source row lights, which is the claim this surface
 * exists to make, and from a cold open the first tap makes it in full.
 */
export const LoopRoute: React.FC<{frames?: number; variant?: LoopVariant}> = ({
  frames = WEB_LOOP.frames,
  variant = 'wide',
}) => {
  const t = useCurrentFrame() / frames;

  return (
    <LoopStage contentSize={TABLET_VIEWPORT} region={TABLET_EUI_MANY_TO_ONE_REGIONS.full} variant={variant}>
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

      {/* Closes the cycle. See the note on opening cold in webLoopData. */}
      <LoopTap
        region={TABLET_EUI_MANY_TO_ONE_REGIONS.powerControl}
        at={ROUTE_POWER_AT}
        frames={frames}
        name="Power off"
      />
    </LoopStage>
  );
};
