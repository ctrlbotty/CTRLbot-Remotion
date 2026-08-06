import React from 'react';
import {useCurrentFrame} from 'remotion';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {LoopStage} from './LoopStage';
import {LoopTap} from './LoopTap';
import {
  EUI_INPUTS,
  loopBg,
  loopPanelHeight,
  MATRIX_POWER_AT,
  MATRIX_TAPS,
  matrixOutputs,
  matrixSelection,
  RESTING_VOLUME,
  WEB_LOOP,
  type LoopVariant,
} from './webLoopData';

/**
 * Many-to-Many: four sources, four displays, one screen.
 *
 * The tap regions are looked up by target rather than listed alongside the timings,
 * because the timings are the loop's business and the coordinates are the surface's.
 * `TABLET_EUI_REGIONS` is generated from the Android layout, so a row that moves in the
 * app moves here without this file being touched.
 */
const REGION_FOR = {
  'input-1': () => TABLET_EUI_REGIONS.sourceRow(0),
  'input-3': () => TABLET_EUI_REGIONS.sourceRow(2),
  'output-2': () => TABLET_EUI_REGIONS.outputCell(1),
  'output-4': () => TABLET_EUI_REGIONS.outputCell(3),
  all: () => TABLET_EUI_REGIONS.routeAll,
} as const;

const LABEL_FOR = {
  'input-1': 'Input 1',
  'input-3': 'Input 3',
  'output-2': 'Output 2',
  'output-4': 'Output 4',
  all: 'All',
} as const;

export const LoopMatrix: React.FC<{frames?: number; variant?: LoopVariant}> = ({
  frames = WEB_LOOP.frames,
  variant = 'wide',
}) => {
  const t = useCurrentFrame() / frames;

  return (
    <LoopStage contentSize={TABLET_VIEWPORT} region={TABLET_EUI_REGIONS.full} variant={variant}>
      <TabletEui
        inputs={EUI_INPUTS}
        outputs={matrixOutputs(t)}
        selectedInput={matrixSelection(t)}
        volume={RESTING_VOLUME}
      />

      {MATRIX_TAPS.map((tap) => (
        <LoopTap
          key={tap.target}
          region={REGION_FOR[tap.target]()}
          at={tap.at}
          frames={frames}
          name={LABEL_FOR[tap.target]}
        />
      ))}

      {/* Closes the cycle. See the note on opening cold in webLoopData. */}
      <LoopTap
        region={TABLET_EUI_REGIONS.powerControl}
        at={MATRIX_POWER_AT}
        frames={frames}
        name="Power off"
      />
    </LoopStage>
  );
};
