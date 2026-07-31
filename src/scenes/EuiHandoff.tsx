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
} from '../app-ui/PhoneEui';
import {
  TABLET_EUI_MANY_TO_ONE_REGIONS,
  TABLET_EUI_REGIONS,
  TABLET_VIEWPORT,
  TabletEui,
  TabletEuiManyToOne,
} from '../app-ui/TabletEui';
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, type Device} from './shared';

/** Frames at which the UI state changes land. */
const MANY_TO_ONE_SWITCH_FRAME = 184;
const MATRIX_START = 318;
const MATRIX_SOURCE_FRAME = 468;
const MATRIX_ROUTE_FRAME = 520;
const VOLUME_START = 604;
const VOLUME_LEFT_FRAME = 638;
const VOLUME_RIGHT_FRAME = 684;
const VOLUME_SETTLE_FRAME = 706;
const SPEAKER_MUTE_FRAME = 712;
const POWER_OFF_TAP_FRAME = 758;
const POWERING_OFF_START = 774;
const POWER_OFF_PAGE_START = 839;
const POWER_ON_TAP_FRAME = 879;
const POWERING_ON_START = 904;
const POWER_RETURN_FRAME = 969;
const HOLD_START = 988;
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
  const shotWidth = viewport.width * closeShotWidth(device);

  const manyToOneSource = isPhone
    ? PHONE_EUI_MANY_TO_ONE_REGIONS.inputTile(1)
    : TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(1);
  const manyToOneDisplay = manyToOneRegions.displayPanel;
  const matrixSource = isPhone ? EUI_REGIONS.inputTile(1) : TABLET_EUI_REGIONS.sourceRow(1);
  const matrixOutput = matrixRegions.outputCell(1);

  const manyToOneSelectedInput = frame < MANY_TO_ONE_SWITCH_FRAME ? 0 : 1;
  const matrixSelectedInput = frame < MATRIX_SOURCE_FRAME ? 0 : 1;
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

  const outputs = [
    {label: 'Output 1', source: 'Input 1'},
    {label: 'Output 2', source: frame < MATRIX_ROUTE_FRAME ? null : 'Input 2'},
    {label: 'Output 3', source: null},
    {label: 'Output 4', source: 'Input 1'},
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
          {at: 0, region: manyToOneRegions.full},
          {at: 60, region: manyToOneRegions.full},
          // Many-to-One: choose a source, then show the single display updating.
          {at: 136, region: frameWidth(centerOf(manyToOneSource), shotWidth)},
          {at: 204, region: frameWidth(centerOf(manyToOneSource), shotWidth)},
          {at: 224, region: frameWidth(centerOf(manyToOneDisplay), shotWidth)},
          {at: 286, region: frameWidth(centerOf(manyToOneDisplay), shotWidth)},
          // Return wide for the topology change.
          {at: MATRIX_START, region: matrixRegions.full},
          {at: 354, region: matrixRegions.full},
          // Many-to-Many: choose Input 2, then route it to Output 2.
          {at: 426, region: frameWidth(centerOf(matrixSource), shotWidth)},
          {at: 482, region: frameWidth(centerOf(matrixSource), shotWidth)},
          {at: 498, region: frameWidth(centerOf(matrixOutput), shotWidth)},
          {at: 566, region: frameWidth(centerOf(matrixOutput), shotWidth)},
          // Room volume and speaker mute.
          {at: 596, region: frameWidth(centerOf(matrixRegions.volumeSlider), shotWidth)},
          {at: 688, region: frameWidth(centerOf(matrixRegions.volumeSlider), shotWidth)},
          {at: 704, region: frameWidth(centerOf(matrixRegions.speakerControl), shotWidth)},
          {at: 728, region: frameWidth(centerOf(matrixRegions.speakerControl), shotWidth)},
          // Power off, wait, power back on, then return to the live interface.
          {at: 736, region: frameWidth(centerOf(matrixRegions.powerControl), shotWidth)},
          {at: 768, region: frameWidth(centerOf(matrixRegions.powerControl), shotWidth)},
          {at: POWERING_OFF_START, region: powerRegions.full},
          {at: POWER_RETURN_FRAME, region: matrixRegions.full},
          // Installer access remains a two-second hold on the upper-left control.
          {at: 988, region: frameWidth(centerOf(matrixRegions.exitControl), shotWidth)},
          {at: 1048, region: frameWidth(centerOf(matrixRegions.exitControl), shotWidth)},
          {at: 1060, region: matrixRegions.full},
          {at: 1080, region: matrixRegions.full},
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
        ) : powerState ? (
          <EuiPowerCapture device={device} state={powerState} />
        ) : isPhone ? (
          <PhoneEui
            outputs={outputs}
            inputs={inputs}
            selectedInput={matrixSelectedInput}
            volume={volume}
            speakerMuted={speakerMuted}
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

        <Sequence
          from={128}
          durationInFrames={92}
          layout="none"
          name="Many-to-One: isolate Input 2"
        >
          <Spotlight region={manyToOneSource} appearAt={0} radius={6} />
        </Sequence>

        <Sequence
          from={164}
          durationInFrames={48}
          layout="none"
          name="Many-to-One: tap Input 2"
        >
          <TapIndicator
            x={centerOf(manyToOneSource).x}
            y={centerOf(manyToOneSource).y}
            at={MANY_TO_ONE_SWITCH_FRAME - 164}
          />
        </Sequence>

        <Sequence
          from={220}
          durationInFrames={88}
          layout="none"
          name="Many-to-One: display follows"
        >
          <Spotlight region={manyToOneDisplay} appearAt={0} radius={0} />
          <FocusRing region={manyToOneDisplay} appearAt={12} radius={0} name="Display ring" />
        </Sequence>

        <Sequence
          from={416}
          durationInFrames={82}
          layout="none"
          name="Many-to-Many: isolate Input 2"
        >
          <Spotlight region={matrixSource} appearAt={0} radius={6} />
        </Sequence>

        <Sequence
          from={448}
          durationInFrames={48}
          layout="none"
          name="Many-to-Many: select Input 2"
        >
          <TapIndicator
            x={centerOf(matrixSource).x}
            y={centerOf(matrixSource).y}
            at={MATRIX_SOURCE_FRAME - 448}
          />
        </Sequence>

        <Sequence
          from={494}
          durationInFrames={96}
          layout="none"
          name="Many-to-Many: route Output 2"
        >
          <Spotlight region={matrixOutput} appearAt={0} radius={0} />
          <FocusRing region={matrixOutput} appearAt={26} radius={0} name="Output 2 ring" />
          <TapIndicator
            x={centerOf(matrixOutput).x}
            y={centerOf(matrixOutput).y}
            at={MATRIX_ROUTE_FRAME - 494}
          />
        </Sequence>

        <Sequence from={596} durationInFrames={104} layout="none" name="Adjust room volume">
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
            at={VOLUME_START - 596}
            name="Drag volume"
          />
        </Sequence>

        <Sequence from={704} durationInFrames={32} layout="none" name="Mute room speaker">
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
            at={SPEAKER_MUTE_FRAME - 704}
            name="Mute speaker"
          />
        </Sequence>

        <Sequence
          from={736}
          durationInFrames={38}
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
            at={POWER_OFF_TAP_FRAME - 736}
            name="Power off"
          />
        </Sequence>

        <Sequence
          from={859}
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
            at={POWER_ON_TAP_FRAME - 859}
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
          title="Unified system control."
          body="Simple universal control interface for any end user."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={120} durationInFrames={188} layout="none" name="Copy: Many-to-One">
        <Callout
          eyebrow="Many-to-One"
          title="Switch one display"
          body="Choose from several sources; the selected source becomes the single display's input."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={322} durationInFrames={270} layout="none" name="Copy: Many-to-Many">
        <Callout
          eyebrow="Many-to-Many"
          title="Route across displays"
          body="Select an input, then tap every output that should receive it."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={596} durationInFrames={140} layout="none" name="Copy: volume">
        <Callout
          eyebrow="Room audio"
          title="Simple slider volume control"
          body="Control the room speaker output, including mute."
          at={0}
          side={device === 'phone' ? 'top' : copySideFor(device)}
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
          body="Press and hold the setup button to return to the configuration menus."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
