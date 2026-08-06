import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf} from '../../camera/Camera';
import {
  TABLET_EUI_MANY_TO_ONE_REGIONS,
  TABLET_VIEWPORT,
  TabletEuiManyToOne,
} from '../../app-ui/TabletEui';
import {Stage} from '../Stage';
import {PromoCopy} from '../eui-promo/PromoCopy';
import {
  promoBg,
  PROMO_PANEL,
  promoPanelScale,
  RESTING_VOLUME,
  routeSelection,
  stageWide,
  type BeatProps,
} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const BeatRoute: React.FC<BeatProps> = ({frames, cut}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;
  const selected = routeSelection(t);
  const secondBlock = Math.round(frames * 0.46);

  const tapFrom = Math.round(frames * 0.36);
  const tapAt = Math.round(frames * 0.42);
  const tapDuration = Math.round(frames * 0.22);
  const input1Region = TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(0);

  return (
    <Stage
      background={promoBg(t)}
      panelHeight={PROMO_PANEL.height}
      bezel={PROMO_PANEL.bezel}
      bezelOpacity={1}
      panelScale={promoPanelScale(frame, frames)}
      contentSize={TABLET_VIEWPORT}
      shots={[{at: 0, region: stageWide(TABLET_VIEWPORT)}]}
      copy={
        <>
          <Sequence durationInFrames={secondBlock} layout="none" name="Copy: choose">
            <PromoCopy
              eyebrow="Many-to-One"
              title="Choose a source"
              body="Intuitive. Simple routing of content to a display."
              until={secondBlock}
            />
          </Sequence>
          <Sequence from={secondBlock} layout="none" name="Copy: routed">
            <PromoCopy
              eyebrow="Many-to-One"
              title="One tap, and it is there"
              body="The source lights up and the display takes it *in the same moment.*"
              until={frames - secondBlock}
            />
          </Sequence>
        </>
      }
    >
      <TabletEuiManyToOne
        inputs={INPUTS}
        selectedInput={selected}
        volume={RESTING_VOLUME}
      />

      <Sequence
        from={tapFrom}
        durationInFrames={tapDuration}
        layout="none"
        name="Tap Input 1"
      >
        <FocusRing
          region={input1Region}
          appearAt={0}
          radius={6}
          name="Input 1 ring"
        />
        <TapIndicator
          x={centerOf(input1Region).x}
          y={centerOf(input1Region).y}
          at={tapAt - tapFrom}
          name="Input 1 tap"
        />
      </Sequence>
    </Stage>
  );
};
