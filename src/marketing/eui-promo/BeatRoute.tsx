// Choosing a source.
//
// No camera at all. Input 1 turning blue and Display 1 filling happen in the same
// frame, and that simultaneity *is* the demonstration — a camera moving through it
// splits attention at the moment there is only one thing to see. Same reason there is
// no annotation: the screen has already said where to look.
//
// What moves instead is the hardware. The beat opens on a tablet, then the bezel, the
// top bar and the audio strip dissolve together and leave the switching area alone on
// the stage. It is the transition the whole cut is about — the device disappearing and
// the interface being what is left.

import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {TABLET_VIEWPORT, TabletEuiManyToOne} from '../../app-ui/TabletEui';
import {Stage} from '../Stage';
import {PromoCopy} from './PromoCopy';
import {
  promoBg,
  PROMO_PANEL,
  RESTING_VOLUME,
  collapsed,
  chromeFade,
  euiBand,
  routeSelection,
  stageWide,
} from './euiPromoData';

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const BeatRoute: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  const band = collapsed(TABLET_VIEWPORT, true, true);
  const chrome = chromeFade(t);
  const secondBlock = Math.round(frames * 0.46);

  return (
    <Stage
      background={promoBg(t)}
      // Travels with the dissolve: the panel collapses onto the switching band as the
      // chrome that used to occupy the rest of it fades. See `euiBand`.
      panelHeight={interpolate(t, [0.15, 0.7], [PROMO_PANEL.height, band.height], {
        easing: Easing.bezier(0.65, 0, 0.35, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })}
      panelAspect={interpolate(
        t,
        [0.15, 0.7],
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
        {at: Math.round(frames * 0.15), region: stageWide(TABLET_VIEWPORT)},
        {at: Math.round(frames * 0.7), region: euiBand(TABLET_VIEWPORT, true, true)},
        {at: frames, region: euiBand(TABLET_VIEWPORT, true, true)},
      ]}
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
        selectedInput={routeSelection(t)}
        volume={RESTING_VOLUME}
        chrome={{top: chrome, audio: chrome, backplate: false}}
      />
    </Stage>
  );
};
