import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {FocusRing} from '../../camera/Annotations';
import {padRegion} from '../../camera/Camera';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../../app-ui/TabletEui';
import {LoopStage} from './LoopStage';
import {LoopTap} from './LoopTap';
import {
  AUDIO_MUTE_AT,
  AUDIO_OUTPUTS,
  AUDIO_UNMUTE_AT,
  audioMuted,
  audioVolume,
  EUI_INPUTS,
  loopBg,
  loopPanelHeight,
  WEB_LOOP,
  type LoopVariant,
} from './webLoopData';

/**
 * Room audio, on the same screen as the switching.
 *
 * The routing behind the strip never moves, and that is the beat: nothing here is a
 * second screen or a second remote. Two taps on the speaker — mute, then unmute — so the
 * icon ends the cycle in the state it began, and the volume ramp is the motion in
 * between.
 *
 * The volume slider carries a standing ring rather than a tap, because the gesture it
 * describes is a drag. A ripple would claim the bar was pressed at one point.
 */
export const LoopAudio: React.FC<{frames?: number; variant?: LoopVariant}> = ({
  frames = WEB_LOOP.frames,
  variant = 'wide',
}) => {
  const t = useCurrentFrame() / frames;

  return (
    <LoopStage contentSize={TABLET_VIEWPORT} region={TABLET_EUI_REGIONS.full} variant={variant}>
      <TabletEui
        inputs={EUI_INPUTS}
        outputs={AUDIO_OUTPUTS}
        selectedInput={2}
        volume={audioVolume(t)}
        speakerMuted={audioMuted(t)}
      />

      {/* The whole audio block, not the slider inside it.
          A ring drawn around the track sits directly on the gauge it is pointing at —
          two thin horizontal lines a few pixels above and below a thin horizontal bar,
          competing with the one element the beat exists to show. Framing the block puts
          the emphasis around the controls instead of across them, and the gauge reads.

          Held across the ramp only, and ended before the mute ring arrives so the two
          are never lit at once. It has to be gone by t=1 as well as absent at t=0 —
          `FocusRing` fades in but not out, so a ring still on screen at the last frame
          would pop off at the seam every time the element wrapped. Ending it here puts
          that hard-out in the middle of the cycle, where it reads as the ring being
          done rather than as the video restarting. */}
      <Sequence
        from={Math.round(frames * 0.06)}
        durationInFrames={Math.round(frames * 0.5)}
        layout="none"
        name="Audio block ring"
      >
        <FocusRing
          region={padRegion(TABLET_EUI_REGIONS.volumeBar, -10)}
          appearAt={0}
          radius={6}
          name="Audio block ring"
        />
      </Sequence>

      <LoopTap
        region={TABLET_EUI_REGIONS.speakerControl}
        at={AUDIO_MUTE_AT}
        frames={frames}
        name="Mute"
      />
      <LoopTap
        region={TABLET_EUI_REGIONS.speakerControl}
        at={AUDIO_UNMUTE_AT}
        frames={frames}
        name="Unmute"
      />
    </LoopStage>
  );
};
