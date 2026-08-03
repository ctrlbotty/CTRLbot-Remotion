// The app runs on a phone too, not only a tablet.
//
// The one beat that is not `<Stage>`: two panels are the message, so the copy goes
// above them and the pair centres underneath. Both keep their bezels and their native
// aspects — a tablet and a phone, not two rectangles.
//
// No camera on either. What carries the beat is that both surfaces route at the same
// instant: they start cold, the same source is chosen on each, and both displays fill
// together. Two devices doing the same thing simultaneously is the claim, and it can
// only be made by showing it happen rather than by showing two finished screens.

import React from 'react';
import {useCurrentFrame} from 'remotion';
import {PhoneEuiManyToOne, PHONE_VIEWPORT} from '../../app-ui/PhoneEui';
import {TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {DualStage} from '../DualStage';
import {PromoCopy} from './PromoCopy';
import {promoBg, RESTING_VOLUME, bothOutputs, bothSelection} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const BeatBoth: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  // Both surfaces read the same clock and the same threshold, so the tablet's grid and
  // the phone's display fill on the identical frame. See `bothSelection`.
  const selected = bothSelection(t);
  const outputs = bothOutputs(t);

  const fullTablet = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const fullPhone = {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height};

  return (
    <DualStage
      background={promoBg(t)}
      until={frames}
      copy={
        <PromoCopy
          align="center"
          eyebrow="Tablet or phone"
          title="Same room, either device"
          body="A wall tablet, or *the phone in a pocket.*"
          until={frames}
        />
      }
      tablet={{
        contentSize: TABLET_VIEWPORT,
        shots: [{at: 0, region: fullTablet}],
        children: (
          <TabletEui
            inputs={INPUTS}
            outputs={outputs}
            selectedInput={selected}
            volume={RESTING_VOLUME}
          />
        ),
      }}
      phone={{
        contentSize: PHONE_VIEWPORT,
        shots: [{at: 0, region: fullPhone}],
        children: (
          <PhoneEuiManyToOne
            inputs={INPUTS}
            selectedInput={selected}
            volume={RESTING_VOLUME}
          />
        ),
      }}
    />
  );
};
