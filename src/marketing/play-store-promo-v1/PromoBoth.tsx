// Beat 6 — the same room, on a phone.
//
// The one shot that puts both form factors on screen together, and the reason the
// claim is worth making: both surfaces derive from the same res/layout*/av_switch_nxo
// topology, so the phone runs the real matrix rather than a cut-down remote.
//
// The phone changes its own route mid-beat while the tablet holds. Two static panels
// showing the same thing read as one screenshot duplicated; a route that moves on one
// screen and not the other demonstrates independence rather than asserting it.

import {useCurrentFrame} from 'remotion';
import {DualStage} from '../DualStage';
import {EUI_REGIONS, PHONE_VIEWPORT, PhoneEui} from '../../app-ui/PhoneEui';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {PROMO_INPUTS, SWITCHED_INPUT, allOn, allOnExcept} from './promoData';

/**
 * The phone works its own routing twice while the tablet holds. Two changes rather than
 * one: a single change can read as a rendering difference between the panels, but a
 * screen that keeps operating on its own is unmistakably a second controller.
 */
const PHONE_REROUTE = 30;
const PHONE_SECOND = 62;
const PHONE_THIRD = 88;
const BEAT = 120;

export const PromoBoth = () => {
  const frame = useCurrentFrame();
  const rerouted = frame >= PHONE_REROUTE;
  const second = frame >= PHONE_SECOND;
  const third = frame >= PHONE_THIRD;

  return (
    <DualStage
      eyebrow="Phone and tablet"
      title="Same room, either device"
      body="Each runs the room on its own — not a mirrored screen."
      until={BEAT}
      tablet={{
        contentSize: TABLET_VIEWPORT,
        shots: [{at: 0, region: TABLET_EUI_REGIONS.full}],
        children: (
          <TabletEui
            outputs={allOn('Input 3')}
            inputs={PROMO_INPUTS}
            selectedInput={SWITCHED_INPUT}
            volume={0.78}
          />
        ),
      }}
      phone={{
        contentSize: PHONE_VIEWPORT,
        shots: [{at: 0, region: EUI_REGIONS.full}],
        children: (
          <PhoneEui
            outputs={
              third
                ? allOn('Input 4')
                : second
                  ? allOnExcept('Input 2', 3, 'Input 4')
                  : rerouted
                  ? allOnExcept('Input 3', 0, 'Input 2')
                  : allOn('Input 3')
            }
            inputs={PROMO_INPUTS}
            selectedInput={third ? 3 : second ? 3 : rerouted ? 1 : SWITCHED_INPUT}
            volume={0.42}
          />
        ),
      }}
    />
  );
};
