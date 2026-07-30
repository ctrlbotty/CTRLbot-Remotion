// Scene 6 — the End User Interface, and handing it over.
//
// The reference scene for this project. It proves the whole stack end to end: a live EUI
// at natural size, a camera that moves to the control being explained, UI state that
// changes mid-shot, annotations that track the UI, and copy that stays legible.
//
// Emphasis is split deliberately. The camera makes modest, composed moves — on a portrait
// UI in a portrait frame there is no room for a dramatic zoom without cropping the
// interface — and <Spotlight> carries the isolation. Landscape leans harder on the camera
// via closeShotWidth().
//
// Anything built after this should follow the same shape: state derived from frame,
// camera path declared as a shot list, copy in screen space.

import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Camera, centerOf, frameWidth} from '../camera/Camera';
import {Callout, FocusRing, Spotlight, TapIndicator} from '../camera/Annotations';
import {EUI_REGIONS, PHONE_VIEWPORT, PhoneEui} from '../app-ui/PhoneEui';
import {TABLET_EUI_REGIONS, TABLET_VIEWPORT, TabletEui} from '../app-ui/TabletEui';
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, type Device} from './shared';

/** Frames at which state changes land. Camera and UI both key off these. */
const SWITCH_FRAME = 184;
const VOLUME_START = 392;
const VOLUME_END = 488;
const HOLD_START = 572;
const HOLD_FRAMES = 60; // the app's two-second press-and-hold, at 30fps

/**
 * The press-and-hold exit. A ring that fills over exactly the hold duration is the
 * only honest way to show this — a tap ripple would imply a quick tap works, and the
 * app deliberately ignores one.
 */
const HoldIndicator = ({x, y}: {x: number; y: number}) => {
  const frame = useCurrentFrame();
  const radius = 34;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width={radius * 2 + 12}
      height={radius * 2 + 12}
      style={{position: 'absolute', left: x - radius - 6, top: y - radius - 6}}
    >
      <circle
        cx={radius + 6}
        cy={radius + 6}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={4}
      />
      <circle
        cx={radius + 6}
        cy={radius + 6}
        r={radius}
        fill="none"
        stroke="#008FD4"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circumference}
        transform={`rotate(-90 ${radius + 6} ${radius + 6})`}
        style={{
          strokeDashoffset: interpolate(frame, [0, HOLD_FRAMES], [circumference, 0], {
            easing: Easing.linear,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </svg>
  );
};

export const EuiHandoff = ({device}: {device: Device}) => {
  const frame = useCurrentFrame();
  const isPhone = device === 'phone';
  const viewport = isPhone ? PHONE_VIEWPORT : TABLET_VIEWPORT;
  const regions = isPhone ? EUI_REGIONS : TABLET_EUI_REGIONS;
  const shotWidth = viewport.width * closeShotWidth(device);

  const tappedCard = isPhone ? EUI_REGIONS.inputTile(1) : TABLET_EUI_REGIONS.sourceRow(1);
  const changedOutput = regions.outputCell(0);

  const selectedInput = frame < SWITCH_FRAME ? 0 : 1;
  const routedSource = frame < SWITCH_FRAME ? 'Input 1' : 'Input 2';
  const volume = interpolate(frame, [VOLUME_START, VOLUME_END], [0.42, 0.68], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const outputs = [
    {label: 'Output 1', source: routedSource},
    {label: 'Output 2', source: null},
    {label: 'Output 3', source: null},
    {label: 'Output 4', source: routedSource},
  ];
  const inputs = [
    {label: 'Input 1'},
    {label: 'Input 2'},
    {label: 'Input 3'},
    {label: 'Input 4'},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      <Camera
        contentSize={viewport}
        shots={[
          {at: 0, region: regions.full},
          {at: 60, region: regions.full},
          // The source being selected.
          {at: 156, region: frameWidth(centerOf(tappedCard), shotWidth)},
          {at: 208, region: frameWidth(centerOf(tappedCard), shotWidth)},
          // The output that follows it.
          {at: 292, region: frameWidth(centerOf(changedOutput), shotWidth)},
          {at: 364, region: frameWidth(centerOf(changedOutput), shotWidth)},
          // Room volume.
          {at: 444, region: frameWidth(centerOf(regions.volumeBar), shotWidth)},
          {at: 516, region: frameWidth(centerOf(regions.volumeBar), shotWidth)},
          // The way back to setup.
          {at: 600, region: frameWidth(centerOf(regions.exitControl), shotWidth)},
          {at: 704, region: frameWidth(centerOf(regions.exitControl), shotWidth)},
          {at: 780, region: regions.full},
        ]}
      >
        {isPhone ? (
          <PhoneEui
            outputs={outputs}
            inputs={inputs}
            selectedInput={selectedInput}
            volume={volume}
          />
        ) : (
          <TabletEui
            outputs={outputs}
            inputs={inputs}
            selectedInput={selectedInput}
            volume={volume}
          />
        )}

        <Sequence from={136} durationInFrames={96} layout="none" name="Isolate the source">
          <Spotlight region={tappedCard} appearAt={0} radius={6} />
        </Sequence>

        <Sequence from={156} durationInFrames={60} layout="none" name="Tap Input 2">
          <TapIndicator x={centerOf(tappedCard).x} y={centerOf(tappedCard).y} at={0} />
        </Sequence>

        <Sequence from={272} durationInFrames={108} layout="none" name="Isolate the output">
          <Spotlight region={changedOutput} appearAt={0} radius={0} />
          <FocusRing region={changedOutput} appearAt={12} radius={0} name="Output ring" />
        </Sequence>

        <Sequence from={404} durationInFrames={116} layout="none" name="Isolate volume">
          <Spotlight region={regions.volumeBar} appearAt={0} radius={0} />
        </Sequence>

        <Sequence from={552} durationInFrames={160} layout="none" name="Press and hold to exit">
          <Spotlight region={regions.exitControl} appearAt={0} radius={4} />
          <Sequence from={HOLD_START - 552} durationInFrames={HOLD_FRAMES} layout="none">
            <HoldIndicator
              x={centerOf(regions.exitControl).x}
              y={centerOf(regions.exitControl).y}
            />
          </Sequence>
        </Sequence>
      </Camera>

      <Sequence from={12} durationInFrames={124} layout="none" name="Copy: interface">
        <Callout
          eyebrow="End User Interface"
          title="One screen for the room"
          body="Every configured display and source, with no setup controls in the way."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={144} durationInFrames={132} layout="none" name="Copy: route">
        <Callout
          eyebrow="Route a source"
          title="Tap the input"
          body="Input 2 goes to every display currently showing Input 1."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={280} durationInFrames={116} layout="none" name="Copy: result">
        <Callout
          eyebrow="Confirm"
          title="The displays follow"
          body="Each output label updates to the source now showing on it."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={400} durationInFrames={144} layout="none" name="Copy: volume">
        <Callout
          eyebrow="Room audio"
          title="Volume stays on the bar"
          body="Available controls depend on the devices and commands you configured."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={556} durationInFrames={224} layout="none" name="Copy: exit">
        <Callout
          eyebrow="Installer access"
          title="Press and hold to return"
          body="Two seconds on the upper-left control. A quick tap intentionally does nothing."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
