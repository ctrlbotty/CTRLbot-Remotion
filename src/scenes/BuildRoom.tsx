// Scene 5 — Presets, Switching, Audio.
//
// Three captures rather than three live rebuilds. This scene establishes that Activities
// exists and what lives under it; it does not teach any one control, so there is nothing
// for a live surface to animate that a camera move over a screenshot cannot carry.
//
// Each panel gets its own beat with a slow push, so a still frame still has motion
// under it. The captures carry the app's own tab strip, so this scene adds none.

import {AbsoluteFill, Easing, Interactive, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Camera} from '../camera/Camera';
import {Callout} from '../camera/Annotations';
import {CapturedScreen} from '../app-ui/CapturedScreen';
import {color, font, type} from '../design/theme';
import {copySideFor, viewportFor, type Device} from './shared';

const PANELS = [
  {tab: 'Presets', capture: 'presets.png'},
  {tab: 'Switching', capture: 'switching.png'},
  {tab: 'Audio', capture: 'audio.png'},
] as const;

const PANEL_FRAMES = 180;

/** One capture with a slow push, so a still frame still has motion under it. */
const Panel = ({device, capture}: {device: Device; capture: string}) => {
  const viewport = viewportFor(device);

  return (
    <Camera
      contentSize={viewport}
      shots={[
        {at: 0, region: {x: 0, y: 0, width: viewport.width, height: viewport.height}},
        {
          at: PANEL_FRAMES,
          region: {
            x: viewport.width * 0.05,
            y: viewport.height * 0.05,
            width: viewport.width * 0.9,
            height: viewport.height * 0.9,
          },
        },
      ]}
    >
      <CapturedScreen device={device} src={`captures/${device}/${capture}`} />
    </Camera>
  );
};

export const BuildRoom = ({device}: {device: Device}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      {PANELS.map((panel, index) => (
        <Sequence
          key={panel.tab}
          from={index * PANEL_FRAMES}
          durationInFrames={PANEL_FRAMES}
          name={panel.tab}
        >
          <Panel device={device} capture={panel.capture} />
        </Sequence>
      ))}

      {/* No tab strip here. The captures already contain the app's own
          Presets / Switching / Audio tabs, and overlaying a second set on top of them
          reads as a rendering fault rather than a wayfinding aid. */}

      <Sequence from={16} durationInFrames={524} layout="none" name="Copy: activities">
        <Callout
          eyebrow="Activities"
          title="Build the room"
          body="Power presets, source switching, and room audio — generated from the devices you configured."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      {/* A late line, so the beat lands on testing rather than on the tour. */}
      <Sequence from={400} durationInFrames={140} layout="none" name="Copy: test first">
        <Interactive.Div
          name="Caution"
          style={{
            position: 'absolute',
            left: 96,
            right: 96,
            top: 150,
            textAlign: 'center',
            fontFamily: font.ui,
            fontWeight: 700,
            fontSize: type.caption,
            color: color.warning,
            opacity: interpolate(frame, [400, 432], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          Test against the real equipment before handoff.
        </Interactive.Div>
      </Sequence>
    </AbsoluteFill>
  );
};
