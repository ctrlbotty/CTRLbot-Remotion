import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf} from '../../camera/Camera';
import {
  PHONE_EUI_MANY_TO_ONE_REGIONS,
  PhoneEuiManyToOne,
  PHONE_VIEWPORT,
} from '../../app-ui/PhoneEui';
import {
  TABLET_EUI_REGIONS,
  TABLET_VIEWPORT,
  TabletEui,
} from '../../app-ui/TabletEui';
import {DualStage} from '../DualStage';
import {PromoCopy} from '../eui-promo/PromoCopy';
import {
  promoBg,
  promoPanelScale,
  RESTING_VOLUME,
  bothOutputs,
  bothSelection,
  type BeatProps,
} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const BeatBoth: React.FC<BeatProps> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const selected = bothSelection(t);
  const outputs = bothOutputs(t);

  const fullTablet = {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height};
  const fullPhone = {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height};

  // Interaction 1: Tap Input 1 on both at t=0.32
  const tap1From = Math.round(frames * 0.24);
  const tap1At = Math.round(frames * 0.32);
  const tap1Duration = Math.round(frames * 0.16);

  // Interaction 2: Tap Input 2 on both at t=0.65
  const tap2From = Math.round(frames * 0.58);
  const tap2At = Math.round(frames * 0.65);
  const tap2Duration = Math.round(frames * 0.16);

  const tabletInput1 = TABLET_EUI_REGIONS.sourceRow(0);
  const tabletInput2 = TABLET_EUI_REGIONS.sourceRow(1);
  const phoneInput1 = PHONE_EUI_MANY_TO_ONE_REGIONS.inputTile(0);
  const phoneInput2 = PHONE_EUI_MANY_TO_ONE_REGIONS.inputTile(1);

  return (
    <DualStage
      background={promoBg(t)}
      until={frames}
      panelScale={promoPanelScale(frame, frames)}
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
          <>
            <TabletEui
              inputs={INPUTS}
              outputs={outputs}
              selectedInput={selected}
              volume={RESTING_VOLUME}
            />
            <Sequence
              from={tap1From}
              durationInFrames={tap1Duration}
              layout="none"
              name="Tablet Tap 1"
            >
              <TapIndicator
                x={centerOf(tabletInput1).x}
                y={centerOf(tabletInput1).y}
                at={tap1At - tap1From}
                name="Tablet Input 1"
              />
            </Sequence>
            <Sequence
              from={tap2From}
              durationInFrames={tap2Duration}
              layout="none"
              name="Tablet Tap 2"
            >
              <TapIndicator
                x={centerOf(tabletInput2).x}
                y={centerOf(tabletInput2).y}
                at={tap2At - tap2From}
                name="Tablet Input 2"
              />
            </Sequence>
          </>
        ),
      }}
      phone={{
        contentSize: PHONE_VIEWPORT,
        shots: [{at: 0, region: fullPhone}],
        children: (
          <>
            <PhoneEuiManyToOne
              inputs={INPUTS}
              selectedInput={selected}
              volume={RESTING_VOLUME}
            />
            <Sequence
              from={tap1From}
              durationInFrames={tap1Duration}
              layout="none"
              name="Phone Tap 1"
            >
              <TapIndicator
                x={centerOf(phoneInput1).x}
                y={centerOf(phoneInput1).y}
                at={tap1At - tap1From}
                name="Phone Input 1"
              />
            </Sequence>
            <Sequence
              from={tap2From}
              durationInFrames={tap2Duration}
              layout="none"
              name="Phone Tap 2"
            >
              <TapIndicator
                x={centerOf(phoneInput2).x}
                y={centerOf(phoneInput2).y}
                at={tap2At - tap2From}
                name="Phone Input 2"
              />
            </Sequence>
          </>
        ),
      }}
    />
  );
};
