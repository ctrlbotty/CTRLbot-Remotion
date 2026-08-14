import React from 'react';
import {PhoneEuiManyToOne, PHONE_VIEWPORT} from '../../app-ui/PhoneEui';
import {TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {color} from '../../design/theme';
import {DualStage} from '../DualStage';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {EUI_INPUTS, loopBg, RESTING_VOLUME} from './webLoopData';

const OUTPUTS = [0, 1, 2, 3].map((index) => ({
  label: `Output ${index + 1}`,
  source: 'Input 1',
}));

/** Phone and tablet together, with all copy kept in the site's adjacent HTML cell. */
export const DevicesStill = () => (
  <>
    <PromoPreload />
    <DualStage
      copy={<></>}
      panelScale={0.78}
      evenPanelSpacing
      bezelColor={color.void}
      background={loopBg(0)}
      tablet={{
        contentSize: TABLET_VIEWPORT,
        shots: [{at: 0, region: {x: 0, y: 0, ...TABLET_VIEWPORT}}],
        children: (
          <TabletEui
            inputs={EUI_INPUTS}
            outputs={OUTPUTS}
            selectedInput={0}
            volume={RESTING_VOLUME}
          />
        ),
      }}
      phone={{
        contentSize: PHONE_VIEWPORT,
        shots: [{at: 0, region: {x: 0, y: 0, ...PHONE_VIEWPORT}}],
        children: (
          <PhoneEuiManyToOne
            inputs={EUI_INPUTS}
            selectedInput={0}
            volume={RESTING_VOLUME}
          />
        ),
      }}
    />
  </>
);
