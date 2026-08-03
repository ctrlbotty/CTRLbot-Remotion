// Beat 1 — this is what the room runs on.
//
// Opens tight on the routing grid and pulls back to reveal the whole interface. The
// reveal is the shot: there is no state change here, because the point is what is
// *absent* — not one setup control anywhere on the screen the client is handed.

import {Stage, StageCopy} from '../Stage';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {OPENING_INPUT, PROMO_INPUTS, allOn, drift} from './promoData';


export const PromoPromise = () => (
  <Stage
    contentSize={TABLET_VIEWPORT}
    shots={[
      // Locked, and it has to be.
      //
      // This opened on a 0.62 shot of the output grid and pulled back to reveal the
      // interface, which is a good idea on a full-bleed cut and a bad one here. The
      // panel is aspect-matched to the surface, so 0.62 crops the source column, the
      // header and the audio strip — and frame 0 of the first beat is the frame Play
      // shows as a still before anyone presses play. The poster frame was a grey
      // fragment floating in black.
      //
      // Frame 0 of beat 1 is the most valuable frame in the cut. It is composed, not
      // animated into.
      {at: 0, region: TABLET_EUI_REGIONS.full},
      {at: 18, region: TABLET_EUI_REGIONS.full},
      {at: 105, region: drift(TABLET_VIEWPORT, TABLET_EUI_REGIONS.full)},
    ]}
    copy={
      <StageCopy
        eyebrow="End User Interface"
        title="The room, on one screen"
        until={105}
        body="Configured on this tablet, then handed over. No separate control processor."
      />
    }
  >
    <TabletEui
      outputs={allOn('Input 1')}
      inputs={PROMO_INPUTS}
      selectedInput={OPENING_INPUT}
      volume={0.58}
    />
  </Stage>
);
