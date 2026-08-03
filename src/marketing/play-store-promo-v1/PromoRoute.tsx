// Beat 2 — one tap moves a source.
//
// Locked wide, and no annotation. The source card turning blue and Output 2 filling
// happen in the same frame, and holding both in one shot is what makes the causal link
// readable. A ring on top would only compete with the thing it is pointing at — the
// same call EuiHandoff.tsx already makes for this exact interaction.

import {useCurrentFrame} from 'remotion';
import {Stage, StageCopy} from '../Stage';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {OPENING_INPUT, PROMO_INPUTS, SWITCHED_INPUT, allOn, allOnExcept, drift} from './promoData';

/** The frame the tap lands and the display follows. */
const SWITCH = 32;
/** Output 2 is the one that changes. */
const SWITCHED_OUTPUT = 1;
/** And again on a second display, so the gesture reads as the way the room works
 *  rather than as a one-off. Two events also keep the beat from going inert while it
 *  waits out its own length. */
const SECOND_SWITCH = 72;
const SECOND_OUTPUT = 3;


export const PromoRoute = () => {
  const frame = useCurrentFrame();
  const switched = frame >= SWITCH;
  const twice = frame >= SECOND_SWITCH;

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: TABLET_EUI_REGIONS.full},
        {at: 18, region: TABLET_EUI_REGIONS.full},
        {at: 120, region: drift(TABLET_VIEWPORT, TABLET_EUI_REGIONS.full)},
      ]}
      copy={
        <StageCopy
          eyebrow="Switching"
          title="One tap moves a source"
          body="Pick an input; the display follows."
          until={120}
        />
      }
    >
      <TabletEui
        outputs={[0, 1, 2, 3].map((cell) => ({
          label: `Output ${cell + 1}`,
          source:
            twice && cell === SECOND_OUTPUT
              ? 'Input 4'
              : switched && cell === SWITCHED_OUTPUT
                ? 'Input 3'
                : 'Input 1',
        }))}
        inputs={PROMO_INPUTS}
        selectedInput={twice ? 3 : switched ? SWITCHED_INPUT : OPENING_INPUT}
        volume={0.58}
      />
    </Stage>
  );
};
