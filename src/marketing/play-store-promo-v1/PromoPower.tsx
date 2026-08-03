// Beat 5 — the whole room, off.
//
// Locked off, with a spotlight. The panel and the surface share a 16:10 aspect, so a
// full shot fits exactly and any push crops all four edges — a 0.42 push onto the
// power control left the "Room is Powering Off" screen sliced in half when the surface
// swapped underneath it. The corner-control exception that makes a tight push safe in
// the First-Run cut does not survive the swap to a second, differently-composed surface
// mid-beat. Dim the rest instead and let both screens play whole.
//
// The copy says Power Off *preset* rather than "every device". Toggle-only devices do
// not join the system power presets — see AGENTS.md — so "powers down every device"
// would be false.

import {Sequence, useCurrentFrame} from 'remotion';
import {Stage, StageCopy} from '../Stage';
import {FocusRing, Spotlight, TapIndicator} from '../../camera/Annotations';
import {EUI_POWER_REGIONS, EuiPowerCapture} from '../../app-ui/EuiPower';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {centerOf} from '../../camera/Camera';
import {PROMO_INPUTS, SWITCHED_INPUT, allOn} from './promoData';

const RING = 20;
const TAP = 38;
const POWERING = 42;
const BEAT = 135;

export const PromoPower = () => {
  const frame = useCurrentFrame();
  const poweringOff = frame >= POWERING;

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: TABLET_EUI_REGIONS.full},
        {at: BEAT, region: TABLET_EUI_REGIONS.full},
      ]}
      copy={
        <StageCopy
          eyebrow="Power"
          title="The whole room, off"
          body="One control runs the room's Power Off preset."
          until={135}
        />
      }
    >
      {poweringOff ? (
        <Sequence
          from={POWERING}
          durationInFrames={BEAT - POWERING}
          layout="none"
          name="Powering off"
        >
          <EuiPowerCapture
            device="tablet"
            state="powering-off"
            durationInFrames={BEAT - POWERING}
          />
        </Sequence>
      ) : (
        <TabletEui
          outputs={allOn('Input 3')}
          inputs={PROMO_INPUTS}
          selectedInput={SWITCHED_INPUT}
          volume={0.78}
          speakerMuted
        />
      )}

      {poweringOff ? null : (
        <Sequence from={RING} durationInFrames={POWERING - RING} layout="none" name="Press power">
          <Spotlight region={TABLET_EUI_REGIONS.powerControl} appearAt={0} radius={4} />
          <FocusRing
            region={TABLET_EUI_REGIONS.powerControl}
            appearAt={6}
            radius={4}
            name="Power ring"
          />
          <TapIndicator
            x={centerOf(TABLET_EUI_REGIONS.powerControl).x}
            y={centerOf(TABLET_EUI_REGIONS.powerControl).y}
            at={TAP - RING}
            name="Power tap"
          />
        </Sequence>
      )}
    </Stage>
  );
};
