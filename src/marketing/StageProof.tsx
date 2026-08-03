// A still of the stage layout with nothing animating, for checking the composition
// itself: panel size and position, copy column width, and how the gradient sits behind
// the surface. The same role `Surface-Proofs` plays for the app-ui rebuilds.
//
// Registered as a Still rather than a Composition — there is no cut here, only a frame
// to look at while tuning `STAGE`.

import {Sequence} from 'remotion';
import {Stage, StageCopy} from './Stage';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../app-ui/TabletEui';

/**
 * A Still renders frame 0, and the copy staggers in over frames 0–32 — so the proof
 * would show an empty column and read as a layout bug that isn't there. AUTHORING.md
 * says to sample about 25 frames after a Sequence starts; a negative `from` is how a
 * Still gets to do that.
 */
const SETTLED = -40;

const inputs = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const StageProof = () => (
  <Sequence from={SETTLED} layout="none" name="Settled">
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[{at: 0, region: TABLET_EUI_REGIONS.full}]}
      copy={
        <StageCopy
          eyebrow="Many-to-Many"
          title="Route across displays"
          body="Select an input, then tap an output — or All to route every display at once."
        />
      }
    >
      <TabletEui
        outputs={[
          {label: 'Output 1', source: 'Input 3'},
          {label: 'Output 2', source: 'Input 3'},
          {label: 'Output 3', source: 'Input 3'},
          {label: 'Output 4', source: 'Input 3'},
        ]}
        inputs={inputs}
        selectedInput={2}
        volume={0.58}
      />
    </Stage>
  </Sequence>
);
