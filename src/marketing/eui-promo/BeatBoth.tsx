import React from 'react';
import {PhoneEuiManyToOne, PHONE_VIEWPORT} from '../../app-ui/PhoneEui';
import {TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {centerOf, frameWidth} from '../../camera/Camera';
import {DualStage} from '../DualStage';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

const TABLET_OUTPUTS = [0, 1, 2, 3].map((i) => ({
  label: `Output ${i + 1}`,
  source: 'Input 3',
}));

export const BeatBoth: React.FC<{frames: number}> = ({frames}) => {
  const fullTablet = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const driftTablet = frameWidth(centerOf(fullTablet), TABLET_VIEWPORT.width * 0.94);

  const fullPhone = {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height};
  const driftPhone = frameWidth(centerOf(fullPhone), PHONE_VIEWPORT.width * 0.94);

  return (
    <DualStage
      eyebrow="TABLET OR PHONE"
      title="Same room, either device"
      body="The interface is built for both — a wall tablet or the phone in a pocket."
      until={frames}
      tablet={{
        contentSize: TABLET_VIEWPORT,
        shots: [
          {at: 0, region: fullTablet},
          {at: frames, region: driftTablet},
        ],
        children: (
          <TabletEui
            inputs={INPUTS}
            outputs={TABLET_OUTPUTS}
            selectedInput={2}
            volume={0.58}
            speakerMuted={true}
          />
        ),
      }}
      phone={{
        contentSize: PHONE_VIEWPORT,
        shots: [
          {at: 0, region: fullPhone},
          {at: frames, region: driftPhone},
        ],
        children: (
          <PhoneEuiManyToOne
            inputs={INPUTS}
            selectedInput={0}
            volume={0.58}
          />
        ),
      }}
    />
  );
};
