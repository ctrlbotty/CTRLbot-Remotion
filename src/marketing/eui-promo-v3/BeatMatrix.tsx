import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf} from '../../camera/Camera';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {Stage} from '../Stage';
import {PromoCopy} from '../eui-promo/PromoCopy';
import {
  promoBg,
  PROMO_PANEL,
  RESTING_VOLUME,
  matrixOutputs,
  matrixSelection,
  stageWide,
  type BeatProps,
} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const BeatMatrix: React.FC<BeatProps> = ({frames, cut}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const blockTwo = Math.round(frames * (cut === 'play' ? 0.5 : 0.36));
  const blockThree = Math.round(frames * 0.64);

  // Interaction 1: Tap Input 1 (t=0.26)
  const tap1From = Math.round(frames * 0.20);
  const tap1At = Math.round(frames * 0.26);
  const tap1Duration = Math.round(frames * 0.12);
  const input1Region = TABLET_EUI_REGIONS.sourceRow(0);

  // Interaction 2: Tap Output 2 (t=0.40)
  const tap2From = Math.round(frames * 0.34);
  const tap2At = Math.round(frames * 0.40);
  const tap2Duration = Math.round(frames * 0.12);
  const output2Region = TABLET_EUI_REGIONS.outputCell(1);

  // Interaction 3: Tap Input 3 (t=0.55)
  const tap3From = Math.round(frames * 0.49);
  const tap3At = Math.round(frames * 0.55);
  const tap3Duration = Math.round(frames * 0.12);
  const input3Region = TABLET_EUI_REGIONS.sourceRow(2);

  // Interaction 4: Tap All (t=0.735 -> route at 0.78)
  const tap4From = Math.round(frames * 0.68);
  const tap4At = Math.round(frames * 0.735);
  const tap4Duration = Math.round(frames * 0.18);
  const allRegion = TABLET_EUI_REGIONS.routeAll;

  return (
    <Stage
      background={promoBg(t)}
      panelHeight={PROMO_PANEL.height}
      bezel={PROMO_PANEL.bezel}
      bezelOpacity={1}
      contentSize={TABLET_VIEWPORT}
      shots={[{at: 0, region: stageWide(TABLET_VIEWPORT)}]}
      copy={
        <>
          <Sequence durationInFrames={blockTwo} layout="none" name="Copy: select">
            <PromoCopy
              eyebrow="Many-to-Many"
              title="Easy matrix routing"
              body="Simply select a source, then a display."
              until={blockTwo}
            />
          </Sequence>
          {cut === 'play' ? null : (
            <Sequence
              from={blockTwo}
              durationInFrames={blockThree - blockTwo}
              layout="none"
              name="Copy: multiple"
            >
              <PromoCopy
                eyebrow="Many-to-Many"
                title="Or multiple displays"
                body="Every output holds *its own source* until you change it."
                until={blockThree - blockTwo}
              />
            </Sequence>
          )}
          <Sequence
            from={cut === 'play' ? blockTwo : blockThree}
            layout="none"
            name="Copy: all"
          >
            <PromoCopy
              eyebrow="Many-to-Many"
              title="Or all of them at once"
              body="Send to every display by pressing the *All* button."
              until={frames - (cut === 'play' ? blockTwo : blockThree)}
            />
          </Sequence>
        </>
      }
    >
      <TabletEui
        inputs={INPUTS}
        outputs={matrixOutputs(t)}
        selectedInput={matrixSelection(t)}
        volume={RESTING_VOLUME}
      />

      <Sequence
        from={tap1From}
        durationInFrames={tap1Duration}
        layout="none"
        name="Tap Input 1"
      >
        <TapIndicator
          x={centerOf(input1Region).x}
          y={centerOf(input1Region).y}
          at={tap1At - tap1From}
          name="Input 1 tap"
        />
      </Sequence>

      <Sequence
        from={tap2From}
        durationInFrames={tap2Duration}
        layout="none"
        name="Tap Output 2"
      >
        <TapIndicator
          x={centerOf(output2Region).x}
          y={centerOf(output2Region).y}
          at={tap2At - tap2From}
          name="Output 2 tap"
        />
      </Sequence>

      <Sequence
        from={tap3From}
        durationInFrames={tap3Duration}
        layout="none"
        name="Tap Input 3"
      >
        <TapIndicator
          x={centerOf(input3Region).x}
          y={centerOf(input3Region).y}
          at={tap3At - tap3From}
          name="Input 3 tap"
        />
      </Sequence>

      <Sequence
        from={tap4From}
        durationInFrames={tap4Duration}
        layout="none"
        name="Press All"
      >
        <FocusRing
          region={allRegion}
          appearAt={0}
          radius={6}
          name="All ring"
        />
        <TapIndicator
          x={centerOf(allRegion).x}
          y={centerOf(allRegion).y}
          at={tap4At - tap4From}
          name="All tap"
        />
      </Sequence>
    </Stage>
  );
};
