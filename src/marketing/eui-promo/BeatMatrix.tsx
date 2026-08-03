// Every source to every display — the longest beat, and the one carrying the promise.
//
// Locked off, like `route`, and for a harder reason: the matrix needs the source
// column, the grid and the All control in frame at once or the routing cannot be read
// at all. There is nowhere for a camera to go that does not cost the beat its subject.
//
// The chrome dissolves as it does in `route`, and the copy moves in three blocks
// tracking the three things the surface does — pick one, hold several, send all. One
// static caption over fourteen seconds of escalation would describe the first third
// and then sit there through the rest.

import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf} from '../../camera/Camera';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {Stage} from '../Stage';
import {PromoCopy} from './PromoCopy';
import {
  promoBg,
  PROMO_PANEL,
  RESTING_VOLUME,
  collapsed,
  chromeFade,
  euiBand,
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

  // Faster than `route`'s: this beat opens on the tablet `route` just handed over, so
  // it does not have to establish the device a second time.
  const band = collapsed(TABLET_VIEWPORT, true, true);
  const chrome = chromeFade(t, 0.06, 0.58);

  // Copy block boundaries, tracking the surface: one source picked, a second picked
  // while the first route stays live, then All.
  //
  // The middle block is the one the 30 drops. "Every output holds its own source" is
  // the subtlest of the three claims and the one the grid demonstrates least loudly,
  // so it is the block whose absence costs least — and dropping it lets the other two
  // keep the length they need rather than thinning all three.
  const blockTwo = Math.round(frames * (cut === 'play' ? 0.5 : 0.36));
  const blockThree = Math.round(frames * 0.64);

  const tapFrom = Math.round(frames * 0.68);
  const tapAt = Math.round(frames * 0.735);
  const tapDuration = Math.round(frames * 0.22);

  return (
    <Stage
      background={promoBg(t)}
      panelHeight={interpolate(t, [0.06, 0.58], [PROMO_PANEL.height, band.height], {
        easing: Easing.bezier(0.65, 0, 0.35, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })}
      panelAspect={interpolate(
        t,
        [0.06, 0.58],
        [TABLET_VIEWPORT.width / TABLET_VIEWPORT.height, band.aspect],
        {
          easing: Easing.bezier(0.65, 0, 0.35, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        },
      )}
      bezel={PROMO_PANEL.bezel}
      bezelOpacity={chrome}
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: stageWide(TABLET_VIEWPORT)},
        {at: Math.round(frames * 0.06), region: stageWide(TABLET_VIEWPORT)},
        {at: Math.round(frames * 0.58), region: euiBand(TABLET_VIEWPORT, true, true)},
        {at: frames, region: euiBand(TABLET_VIEWPORT, true, true)},
      ]}
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
        chrome={{top: chrome, audio: chrome, backplate: false}}
      />

      {/* The only annotation in the cut. Every other change here explains itself, but
          All routes four outputs from a control nobody saw anyone touch — without the
          tap the grid appears to change on its own. */}
      <Sequence
        from={tapFrom}
        durationInFrames={tapDuration}
        layout="none"
        name="Press All"
      >
        <FocusRing
          region={TABLET_EUI_REGIONS.routeAll}
          appearAt={0}
          radius={6}
          name="All ring"
        />
        <TapIndicator
          x={centerOf(TABLET_EUI_REGIONS.routeAll).x}
          y={centerOf(TABLET_EUI_REGIONS.routeAll).y}
          at={tapAt - tapFrom}
          name="All tap"
        />
      </Sequence>
    </Stage>
  );
};
