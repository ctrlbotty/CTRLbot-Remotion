// Scene 6 — the End User Interface, and handing it over.
//
// This scene presents the app's two switching modes in their product order: the
// Many-to-One surface first, then the Many-to-Many matrix. Both live surfaces are
// rebuilt from their Android layout XML and export regions from the same constants
// used to place their controls.

import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Camera, centerOf, frameWidth} from '../camera/Camera';
import {Callout, FocusRing, Spotlight, TapIndicator} from '../camera/Annotations';
import {EUI_POWER_REGIONS, EuiPowerCapture} from '../app-ui/EuiPower';
import {
  EUI_REGIONS,
  PHONE_EUI_MANY_TO_ONE_REGIONS,
  PHONE_VIEWPORT,
  PhoneEui,
  PhoneEuiManyToOne,
  phoneInputScrollFor,
} from '../app-ui/PhoneEui';
import {
  TABLET_EUI_MANY_TO_ONE_REGIONS,
  TABLET_EUI_REGIONS,
  TABLET_VIEWPORT,
  TabletEui,
  TabletEuiManyToOne,
} from '../app-ui/TabletEui';
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, wideShotWidth, type Device} from './shared';

/** Frames at which the UI state changes land. */
const MANY_TO_ONE_SWITCH_FRAME = 190;
const MATRIX_START = 298;

/**
 * The matrix beat, storyboarded from screen captures of the real app on both form
 * factors. Six states, in order, so the whole grammar of many-to-many is shown once:
 *
 *   cold          nothing selected, every output grey and empty
 *   pick a source Input 1 goes blue; the outputs have not changed
 *   route one     one output takes Input 1 and goes blue
 *   pick another  Input 3 goes blue, and that output drops to grey *while keeping its
 *                 Input 1 label* — the route is still live, it just is not the one
 *                 being worked on. That distinction is the whole reason the matrix
 *                 view has two greys, and it cannot be shown with a single route.
 *   press All     the one moment in either switching demo that gets an annotation
 *   All routes    every output takes Input 3 at once
 *
 * Paced so the last state still gets a couple of seconds on a held wide shot: the camera
 * leaves for the volume strip at 556, and "every output at once" is the beat that most
 * needs a moment to land.
 */
const MATRIX_PICK_A = 346;
const MATRIX_ROUTE_ONE = 394;
const MATRIX_PICK_B = 446;
const MATRIX_ALL_TAP = 476;
const MATRIX_ALL_ROUTE = 494;
/** How long the phone's source strip takes to slide a card into view. */
const PHONE_STRIP_SCROLL_FRAMES = 18;
const VOLUME_START = 564;
const VOLUME_LEFT_FRAME = 594;
const VOLUME_RIGHT_FRAME = 634;
const VOLUME_SETTLE_FRAME = 652;
const SPEAKER_MUTE_FRAME = 658;
const POWER_OFF_TAP_FRAME = 700;
const POWERING_OFF_START = 714;
const POWER_OFF_PAGE_START = 779;
const POWER_ON_TAP_FRAME = 819;
const POWERING_ON_START = 844;
const POWER_RETURN_FRAME = 909;
const HOLD_START = 928;
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
  const matrixRegions = isPhone ? EUI_REGIONS : TABLET_EUI_REGIONS;
  const powerRegions = isPhone ? EUI_POWER_REGIONS.phone : EUI_POWER_REGIONS.tablet;
  const manyToOneRegions = isPhone
    ? PHONE_EUI_MANY_TO_ONE_REGIONS
    : TABLET_EUI_MANY_TO_ONE_REGIONS;
  // No source or display region here: Many-to-One is annotation-free and held wide, so
  // nothing in that beat needs a target.
  // Neither switching beat targets a source or an output any more — both hold wide and
  // let the states speak. The only region the matrix still needs is the All control.

  /**
   * Landscape pushes are gentle. The whole point of the landscape EUI is that a room
   * operator can see the sources, the destinations and the audio at once, and 0.52 —
   * right for a phone, where a control is a thumb's width — reduced the source list to
   * two rows and the audio strip to an unreadable fragment. The Spotlight carries the
   * emphasis instead, which is what it is for.
   *
   * Corner controls are the exception: exit, power and speaker mute all sit hard against
   * an edge, so clampToContent slides the frame back inside the content and keeps them in
   * shot however tight the push. Those can take a real zoom.
   */
  const shotWidth = viewport.width * (isPhone ? closeShotWidth(device) : wideShotWidth);
  const cornerShotWidth = viewport.width * (isPhone ? closeShotWidth(device) : 0.42);

  // Many-to-One opens cold — nothing routed, the display grey and empty — and then a
  // source is chosen. No ring, no spotlight, no tap: the card turning blue and the
  // display filling at the same instant *is* the demonstration, and an annotation on top
  // of it only competes with the thing it is pointing at.
  const manyToOneSelectedInput = frame < MANY_TO_ONE_SWITCH_FRAME ? null : 0;

  const matrixSelectedInput =
    frame < MATRIX_PICK_A ? null : frame < MATRIX_PICK_B ? 0 : 2;
  // Phone only. The phone's source strip holds two and a half cards, so selecting the
  // third has to bring it into view; the tablet's column shows all four at once.
  const stripScroll = interpolate(
    frame,
    [MATRIX_PICK_B, MATRIX_PICK_B + PHONE_STRIP_SCROLL_FRAMES],
    [0, phoneInputScrollFor(2, 4)],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const volume = interpolate(
    frame,
    [VOLUME_START, VOLUME_LEFT_FRAME, VOLUME_RIGHT_FRAME, VOLUME_SETTLE_FRAME],
    [0.55, 0.24, 0.76, 0.58],
    {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    },
  );
  const speakerMuted = frame >= SPEAKER_MUTE_FRAME;
  const powerState =
    frame < POWERING_OFF_START || frame >= POWER_RETURN_FRAME
      ? null
      : frame < POWER_OFF_PAGE_START
        ? 'powering-off'
        : frame < POWERING_ON_START
          ? 'off'
          : 'powering-on';

  // Which output gets the first route, matching each form factor's reference captures.
  const routedOutput = isPhone ? 0 : 1;
  const outputs = [0, 1, 2, 3].map((index) => ({
    label: `Output ${index + 1}`,
    source:
      frame >= MATRIX_ALL_ROUTE
        ? 'Input 3'
        : index === routedOutput && frame >= MATRIX_ROUTE_ONE
          ? 'Input 1'
          : null,
  }));
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
          // Many-to-One is held wide for its whole run. Cutting between the source list
          // and the display would show the two states one after the other; holding both
          // in frame shows the source light up and the display fill in the same instant,
          // which is the causal link the beat exists to make.
          {at: 0, region: manyToOneRegions.full},
          {at: 266, region: manyToOneRegions.full},
          // Return wide for the topology change.
          {at: MATRIX_START, region: matrixRegions.full},
          {at: 334, region: matrixRegions.full},
          // Many-to-Many holds wide for its whole beat on both, like Many-to-One: the
          // sources, the grid and the All control all have to be in frame at once or the
          // routing cannot be read.
          {at: 526, region: matrixRegions.full},
          // Room volume and speaker mute.
          {at: 556, region: frameWidth(centerOf(matrixRegions.volumeSlider), shotWidth)},
          {at: 642, region: frameWidth(centerOf(matrixRegions.volumeSlider), shotWidth)},
          {at: 650, region: frameWidth(centerOf(matrixRegions.speakerControl), cornerShotWidth)},
          {at: 674, region: frameWidth(centerOf(matrixRegions.speakerControl), cornerShotWidth)},
          // Power off, wait, power back on, then return to the live interface.
          {at: 682, region: frameWidth(centerOf(matrixRegions.powerControl), cornerShotWidth)},
          {at: 704, region: frameWidth(centerOf(matrixRegions.powerControl), cornerShotWidth)},
          {at: POWERING_OFF_START, region: powerRegions.full},
          {at: POWER_RETURN_FRAME, region: matrixRegions.full},
          // Installer access remains a two-second hold on the upper-left control.
          {at: 928, region: frameWidth(centerOf(matrixRegions.exitControl), cornerShotWidth)},
          {at: 988, region: frameWidth(centerOf(matrixRegions.exitControl), cornerShotWidth)},
          {at: 1000, region: matrixRegions.full},
          {at: 1020, region: matrixRegions.full},
        ]}
      >
        {frame < MATRIX_START ? (
          isPhone ? (
            <PhoneEuiManyToOne
              inputs={inputs}
              selectedInput={manyToOneSelectedInput}
              volume={volume}
              speakerMuted={speakerMuted}
            />
          ) : (
            <TabletEuiManyToOne
              inputs={inputs}
              selectedInput={manyToOneSelectedInput}
              volume={volume}
              speakerMuted={speakerMuted}
            />
          )
        ) : powerState === 'powering-off' ? (
          <Sequence
            from={POWERING_OFF_START}
            durationInFrames={POWER_OFF_PAGE_START - POWERING_OFF_START}
            layout="none"
            name="Powering off progress"
          >
            <EuiPowerCapture
              device={device}
              state="powering-off"
              durationInFrames={POWER_OFF_PAGE_START - POWERING_OFF_START}
            />
          </Sequence>
        ) : powerState === 'off' ? (
          <EuiPowerCapture device={device} state="off" />
        ) : powerState === 'powering-on' ? (
          <Sequence
            from={POWERING_ON_START}
            durationInFrames={POWER_RETURN_FRAME - POWERING_ON_START}
            layout="none"
            name="Powering on progress"
          >
            <EuiPowerCapture
              device={device}
              state="powering-on"
              durationInFrames={POWER_RETURN_FRAME - POWERING_ON_START}
            />
          </Sequence>
        ) : isPhone ? (
          <PhoneEui
            outputs={outputs}
            inputs={inputs}
            selectedInput={matrixSelectedInput}
            volume={volume}
            speakerMuted={speakerMuted}
            inputScroll={stripScroll}
          />
        ) : (
          <TabletEui
            outputs={outputs}
            inputs={inputs}
            selectedInput={matrixSelectedInput}
            volume={volume}
            speakerMuted={speakerMuted}
          />
        )}

        {/* The one annotation in either switching demo.
            Every other state change here explains itself — a card goes blue, an output
            fills — but All routes four outputs from a control nobody saw anyone touch.
            Without this the grid appears to change on its own. The ripple lands, and the
            routing follows it. */}
        <Sequence
          from={MATRIX_ALL_TAP - 10}
          durationInFrames={46}
          layout="none"
          name="Many-to-Many: press All"
        >
          <FocusRing region={matrixRegions.routeAll} appearAt={0} radius={6} name="All ring" />
          <TapIndicator
            x={centerOf(matrixRegions.routeAll).x}
            y={centerOf(matrixRegions.routeAll).y}
            at={10}
            name="All tap"
          />
        </Sequence>

        <Sequence from={556} durationInFrames={104} layout="none" name="Adjust room volume">
          <Spotlight region={matrixRegions.volumeSlider} appearAt={0} radius={0} />
          <FocusRing
            region={matrixRegions.volumeSlider}
            appearAt={8}
            radius={0}
            name="Volume slider ring"
          />
          <TapIndicator
            x={matrixRegions.volumeSlider.x + matrixRegions.volumeSlider.width * volume}
            y={centerOf(matrixRegions.volumeSlider).y}
            at={VOLUME_START - 556}
            name="Drag volume"
          />
        </Sequence>

        <Sequence from={650} durationInFrames={32} layout="none" name="Mute room speaker">
          <Spotlight region={matrixRegions.speakerControl} appearAt={0} radius={4} />
          <FocusRing
            region={matrixRegions.speakerControl}
            appearAt={6}
            radius={4}
            name="Speaker mute ring"
          />
          <TapIndicator
            x={centerOf(matrixRegions.speakerControl).x}
            y={centerOf(matrixRegions.speakerControl).y}
            at={SPEAKER_MUTE_FRAME - 650}
            name="Mute speaker"
          />
        </Sequence>

        <Sequence
          from={682}
          durationInFrames={32}
          layout="none"
          name="Power off the room"
        >
          <Spotlight region={matrixRegions.powerControl} appearAt={0} radius={4} />
          <FocusRing
            region={matrixRegions.powerControl}
            appearAt={5}
            radius={4}
            name="Power off ring"
          />
          <TapIndicator
            x={centerOf(matrixRegions.powerControl).x}
            y={centerOf(matrixRegions.powerControl).y}
            at={POWER_OFF_TAP_FRAME - 682}
            name="Power off"
          />
        </Sequence>

        <Sequence
          from={799}
          durationInFrames={45}
          layout="none"
          name="Power the room back on"
        >
          <Spotlight region={powerRegions.welcomePower} appearAt={0} radius={999} />
          <FocusRing
            region={powerRegions.welcomePower}
            appearAt={5}
            radius={999}
            name="Power on ring"
          />
          <TapIndicator
            x={centerOf(powerRegions.welcomePower).x}
            y={centerOf(powerRegions.welcomePower).y}
            at={POWER_ON_TAP_FRAME - 799}
            name="Power on"
          />
        </Sequence>

        <Sequence
          from={POWER_RETURN_FRAME}
          durationInFrames={91}
          layout="none"
          name="Press and hold to exit"
        >
          <Spotlight region={matrixRegions.exitControl} appearAt={0} radius={4} />
          <Sequence
            from={HOLD_START - POWER_RETURN_FRAME}
            durationInFrames={HOLD_FRAMES}
            layout="none"
          >
            <HoldIndicator
              x={centerOf(matrixRegions.exitControl).x}
              y={centerOf(matrixRegions.exitControl).y}
            />
          </Sequence>
        </Sequence>
      </Camera>

      <Sequence from={12} durationInFrames={108} layout="none" name="Copy: interface">
        <Callout
          eyebrow="End User Interface"
          title="One screen to run the room"
          body="The configuration tools are gone — only what the room needs is left."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={120} durationInFrames={168} layout="none" name="Copy: Many-to-One">
        <Callout
          eyebrow="Many-to-One"
          title="Switch one display"
          body="Several sources, one destination. Tap a source and the display follows."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      {/* Out before the All press, deliberately.
          The copy explains the routing, then gets off the screen so the payoff can use
          the whole of it. On tablet the card sits over the bottom-right output cell, and
          "every output at once" does not land if one of the four is behind a caption;
          on phone it frees the source strip. Clearing the copy was the fix — moving the
          card was not, because the landscape matrix fills all four edges and every side
          covers something the beat needs. */}
      <Sequence from={302} durationInFrames={164} layout="none" name="Copy: Many-to-Many">
        <Callout
          eyebrow="Many-to-Many"
          title="Route across displays"
          body="Select an input, then tap an output — or All to route every display at once."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      {/* Top on both. The audio strip runs the full width of the bottom of the interface
          on either form factor, so this is the one beat where the landscape card has
          nowhere to sit that is not on top of the control being taught. Copy goes
          opposite the subject. */}
      <Sequence from={556} durationInFrames={126} layout="none" name="Copy: volume">
        <Callout
          eyebrow="Room audio"
          title="Volume and mute"
          body="Drag the bar or step it with the arrows, then mute the room from the same strip."
          at={0}
          side="top"
        />
      </Sequence>

      <Sequence
        from={POWER_RETURN_FRAME}
        durationInFrames={91}
        layout="none"
        name="Copy: exit"
      >
        <Callout
          eyebrow="Installer access"
          title="Press and hold to return"
          body="Hold the tools icon for two seconds. A quick tap does nothing — by design."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
