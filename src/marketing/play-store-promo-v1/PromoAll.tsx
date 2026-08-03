// Beat 3 — every display at once.
//
// The one beat in this cut that gets an annotation. Every other state change explains
// itself, but All routes four outputs from a control nobody saw anyone touch — without
// the ring and the tap the grid appears to change on its own.
//
// Annotations sit inside <Stage>, alongside the surface, because Stage passes its
// children into the camera: they are expressed in the surface's own dp coordinates and
// travel with it.

import {Sequence, useCurrentFrame} from 'remotion';
import {Stage, StageCopy} from '../Stage';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {centerOf} from '../../camera/Camera';
import {PROMO_INPUTS, SWITCHED_INPUT, allOn, allOnExcept, drift} from './promoData';

const RING = 18;
const TAP = 28;
const ROUTED = 40;
/** Cells land one after another rather than together — four things happening reads
 *  as an action, four things already changed reads as a jump cut. */
const CELL_STAGGER = 4;
const SWITCHED_OUTPUT = 1;


export const PromoAll = () => {
  const frame = useCurrentFrame();

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: TABLET_EUI_REGIONS.full},
        {at: 18, region: TABLET_EUI_REGIONS.full},
        {at: 105, region: drift(TABLET_VIEWPORT, TABLET_EUI_REGIONS.full)},
      ]}
      copy={
        <StageCopy
          eyebrow="Route to all"
          title="Every display at once"
          body="One control sends the same source to the whole room."
          until={105}
        />
      }
    >
      <TabletEui
        outputs={[0, 1, 2, 3].map((cell) => ({
          label: `Output ${cell + 1}`,
          source:
            frame >= ROUTED + cell * CELL_STAGGER
              ? 'Input 3'
              : cell === SWITCHED_OUTPUT
                ? 'Input 3'
                : 'Input 1',
        }))}
        inputs={PROMO_INPUTS}
        selectedInput={SWITCHED_INPUT}
        volume={0.58}
      />

      <Sequence from={RING} durationInFrames={46} layout="none" name="Press All">
        <FocusRing region={TABLET_EUI_REGIONS.routeAll} appearAt={0} radius={6} name="All ring" />
        <TapIndicator
          x={centerOf(TABLET_EUI_REGIONS.routeAll).x}
          y={centerOf(TABLET_EUI_REGIONS.routeAll).y}
          at={TAP - RING}
          name="All tap"
        />
      </Sequence>
    </Stage>
  );
};
