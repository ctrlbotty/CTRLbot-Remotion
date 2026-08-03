// Beat 4 — room volume and mute, on the same screen as the routing.
//
// A real camera move: hold wide, push to the audio strip, hold there. The strip runs
// the full width of the bottom of the interface, so pushing to it crops the routing
// grid — which is fine here, because the routing has had three beats of its own and
// this beat is about what else is on the screen.

import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Stage, StageCopy} from '../Stage';
import {FocusRing, Spotlight, TapIndicator} from '../../camera/Annotations';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {centerOf} from '../../camera/Camera';
import {PROMO_INPUTS, SWITCHED_INPUT, allOn, drift} from './promoData';

const DRAG_START = 45;
const DRAG_END = 75;
const STEP_A = 92;
const STEP_B = 108;
const MUTE = 120;


export const PromoAudio = () => {
  const frame = useCurrentFrame();

  return (
    <Stage
      contentSize={TABLET_VIEWPORT}
      shots={[
        {at: 0, region: TABLET_EUI_REGIONS.full},
        {at: 18, region: TABLET_EUI_REGIONS.full},
        {at: 135, region: drift(TABLET_VIEWPORT, TABLET_EUI_REGIONS.full)},
      ]}
      copy={
        <StageCopy
          eyebrow="Audio"
          title="Volume and mute, right there"
          body="Room audio is on the same screen as the routing."
          until={135}
        />
      }
    >
      <TabletEui
        outputs={allOn('Input 3')}
        inputs={PROMO_INPUTS}
        selectedInput={SWITCHED_INPUT}
        volume={interpolate(frame, [DRAG_START, DRAG_END, STEP_A, STEP_B], [0.55, 0.78, 0.7, 0.62], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
        speakerMuted={frame >= MUTE}
      />

      {/* Emphasis comes from the spotlight, not the camera. The panel and the surface
          share a 16:10 aspect, so a full shot fits exactly and any push crops all four
          edges at once — a 0.66 push here cut off the speaker control and both ends of
          the volume bar, which is the entire subject of the beat. ROADMAP.md records
          the same lesson from the tablet cut. Dim the rest instead. */}
      <Sequence from={22} durationInFrames={113} layout="none" name="Room audio">
        <Spotlight region={TABLET_EUI_REGIONS.volumeBar} appearAt={0} radius={0} />
        <FocusRing
          region={TABLET_EUI_REGIONS.volumeSlider}
          appearAt={6}
          radius={0}
          name="Volume ring"
        />
        <TapIndicator
          x={centerOf(TABLET_EUI_REGIONS.speakerControl).x}
          y={centerOf(TABLET_EUI_REGIONS.speakerControl).y}
          at={MUTE - 30}
          name="Mute"
        />
      </Sequence>
    </Stage>
  );
};
