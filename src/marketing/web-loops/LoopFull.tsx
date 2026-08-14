import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {FocusRing} from '../../camera/Annotations';
import {padRegion} from '../../camera/Camera';
import {EUI_POWER_REGIONS, EuiPowerCapture} from '../../app-ui/EuiPower';
import {
  TABLET_EUI_MANY_TO_ONE_REGIONS,
  TABLET_EUI_REGIONS,
  TABLET_VIEWPORT,
  TabletEui,
  TabletEuiManyToOne,
} from '../../app-ui/TabletEui';
import {LoopStage} from './LoopStage';
import {LoopTap} from './LoopTap';
import {
  APP_POWER_OFF_TAP_AT,
  APP_ROUTE_INPUT_AT,
  APP_WELCOME_TAP_AT,
  AUDIO_MUTE_AT,
  AUDIO_OUTPUTS,
  AUDIO_UNMUTE_AT,
  EUI_INPUTS,
  MATRIX_LOOP_FRAMES,
  MATRIX_POWER_AT,
  MATRIX_TAPS,
  RESTING_VOLUME,
  ROUTE_POWER_AT,
  ROUTE_TAPS,
  WEB_LOOP,
  appPressed,
  appSelection,
  audioMuted,
  audioPressed,
  audioVolume,
  matrixOutputs,
  matrixPressed,
  matrixSelection,
  routePressed,
  routeSelection,
} from './webLoopData';

const APP_HEAD_AT = 0.62;
const APP_HEAD_FRAMES = Math.round(WEB_LOOP.frames * APP_HEAD_AT);
const APP_TAIL_FRAMES = WEB_LOOP.frames - APP_HEAD_FRAMES;

const ROUTE_START = APP_HEAD_FRAMES;
const MATRIX_START = ROUTE_START + WEB_LOOP.frames;
const AUDIO_START = MATRIX_START + MATRIX_LOOP_FRAMES;
const APP_TAIL_START = AUDIO_START + WEB_LOOP.frames;

const APP_STANDBY_FRAMES = 48;
const APP_POWER_ON_FRAMES = 72;
const APP_SWITCHER_START = APP_STANDBY_FRAMES + APP_POWER_ON_FRAMES;
const APP_POWER_OFF_START = Math.round(WEB_LOOP.frames * 0.72);
const APP_STANDBY_RETURN = Math.round(WEB_LOOP.frames * 0.92);

const MATRIX_REGION_FOR = {
  'input-1': () => TABLET_EUI_REGIONS.sourceRow(0),
  'input-3': () => TABLET_EUI_REGIONS.sourceRow(2),
  'output-2': () => TABLET_EUI_REGIONS.outputCell(1),
  'output-4': () => TABLET_EUI_REGIONS.outputCell(3),
  all: () => TABLET_EUI_REGIONS.routeAll,
} as const;

const MATRIX_LABEL_FOR = {
  'input-1': 'Input 1',
  'input-3': 'Input 3',
  'output-2': 'Output 2',
  'output-4': 'Output 4',
  all: 'All',
} as const;

const AppOpening = () => {
  const frame = useCurrentFrame();
  const t = frame / WEB_LOOP.frames;

  return (
    <>
      <Sequence
        from={0}
        durationInFrames={APP_STANDBY_FRAMES}
        layout="none"
        name="Full: Standby"
      >
        <EuiPowerCapture device="tablet" state="off" volume={RESTING_VOLUME} />
      </Sequence>
      <Sequence
        from={APP_STANDBY_FRAMES}
        durationInFrames={APP_POWER_ON_FRAMES}
        layout="none"
        name="Full: Powering on"
      >
        <EuiPowerCapture
          device="tablet"
          state="powering-on"
          durationInFrames={APP_POWER_ON_FRAMES}
          volume={RESTING_VOLUME}
        />
      </Sequence>
      <Sequence
        from={APP_SWITCHER_START}
        durationInFrames={APP_HEAD_FRAMES - APP_SWITCHER_START}
        layout="none"
        name="Full: App switcher"
      >
        <TabletEuiManyToOne
          inputs={EUI_INPUTS}
          selectedInput={appSelection(t)}
          pressed={appPressed(t)}
          volume={RESTING_VOLUME}
        />
      </Sequence>

      <LoopTap
        region={EUI_POWER_REGIONS.tablet.welcomePower}
        at={APP_WELCOME_TAP_AT}
        frames={WEB_LOOP.frames}
        ring={false}
        name="Power on"
      />
      <LoopTap
        region={TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(0)}
        at={APP_ROUTE_INPUT_AT}
        frames={WEB_LOOP.frames}
        name="Input 1"
      />
    </>
  );
};

const RouteSegment = () => {
  const t = useCurrentFrame() / WEB_LOOP.frames;

  return (
    <>
      <TabletEuiManyToOne
        inputs={EUI_INPUTS}
        selectedInput={routeSelection(t)}
        pressed={routePressed(t)}
        volume={RESTING_VOLUME}
      />
      {ROUTE_TAPS.map((tap) => (
        <LoopTap
          key={tap.input}
          region={TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(tap.input)}
          at={tap.at}
          frames={WEB_LOOP.frames}
          name={EUI_INPUTS[tap.input].label}
        />
      ))}
      <LoopTap
        region={TABLET_EUI_MANY_TO_ONE_REGIONS.powerControl}
        at={ROUTE_POWER_AT}
        frames={WEB_LOOP.frames}
        ring={false}
        name="Power off"
      />
    </>
  );
};

const MatrixSegment = () => {
  const t = useCurrentFrame() / MATRIX_LOOP_FRAMES;

  return (
    <>
      <TabletEui
        inputs={EUI_INPUTS}
        outputs={matrixOutputs(t)}
        selectedInput={matrixSelection(t)}
        pressed={matrixPressed(t)}
        volume={RESTING_VOLUME}
      />
      {MATRIX_TAPS.map((tap) => (
        <LoopTap
          key={tap.target}
          region={MATRIX_REGION_FOR[tap.target]()}
          at={tap.at}
          frames={MATRIX_LOOP_FRAMES}
          name={MATRIX_LABEL_FOR[tap.target]}
        />
      ))}
      <LoopTap
        region={TABLET_EUI_REGIONS.powerControl}
        at={MATRIX_POWER_AT}
        frames={MATRIX_LOOP_FRAMES}
        ring={false}
        name="Power off"
      />
    </>
  );
};

const AudioSegment = () => {
  const t = useCurrentFrame() / WEB_LOOP.frames;

  return (
    <>
      <TabletEui
        inputs={EUI_INPUTS}
        outputs={AUDIO_OUTPUTS}
        selectedInput={2}
        volume={audioVolume(t)}
        speakerMuted={audioMuted(t)}
        pressed={audioPressed(t)}
      />
      <Sequence
        from={Math.round(WEB_LOOP.frames * 0.06)}
        durationInFrames={Math.round(WEB_LOOP.frames * 0.5)}
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
        frames={WEB_LOOP.frames}
        name="Mute"
      />
      <LoopTap
        region={TABLET_EUI_REGIONS.speakerControl}
        at={AUDIO_UNMUTE_AT}
        frames={WEB_LOOP.frames}
        name="Unmute"
      />
    </>
  );
};

const AppShutdown = () => {
  const frame = useCurrentFrame();
  const appFrame = APP_HEAD_FRAMES + frame;
  const t = appFrame / WEB_LOOP.frames;
  const switcherFrames = APP_POWER_OFF_START - APP_HEAD_FRAMES;
  const powerOffFrames = APP_STANDBY_RETURN - APP_POWER_OFF_START;

  return (
    <>
      <Sequence
        from={0}
        durationInFrames={switcherFrames}
        layout="none"
        name="Full: Shutdown switcher"
      >
        <TabletEuiManyToOne
          inputs={EUI_INPUTS}
          selectedInput={appSelection(t)}
          pressed={appPressed(t)}
          volume={RESTING_VOLUME}
        />
      </Sequence>
      <Sequence
        from={switcherFrames}
        durationInFrames={powerOffFrames}
        layout="none"
        name="Full: Powering off"
      >
        <EuiPowerCapture
          device="tablet"
          state="powering-off"
          durationInFrames={powerOffFrames}
          volume={RESTING_VOLUME}
        />
      </Sequence>
      <Sequence
        from={switcherFrames + powerOffFrames}
        durationInFrames={APP_TAIL_FRAMES - switcherFrames - powerOffFrames}
        layout="none"
        name="Full: Standby return"
      >
        <EuiPowerCapture device="tablet" state="off" volume={RESTING_VOLUME} />
      </Sequence>

      <LoopTap
        region={TABLET_EUI_MANY_TO_ONE_REGIONS.powerControl}
        at={APP_POWER_OFF_TAP_AT - APP_HEAD_AT}
        frames={WEB_LOOP.frames}
        ring={false}
        name="Power off"
      />
    </>
  );
};

/**
 * THE APP in one 16:10 website cell.
 *
 * The app loop is split around its shutdown: power on opens the story and power off
 * closes it after route, matrix, and audio. That ordering is what returns the final
 * frame to the standby state at frame 0, so the 43-second composition remains a loop.
 * The four source timelines are remapped rather than copied; `/app/` keeps rendering
 * its original four compositions independently.
 */
export const LoopFull = () => (
  <LoopStage contentSize={TABLET_VIEWPORT} region={TABLET_EUI_REGIONS.full} variant="wide">
    <Sequence from={0} durationInFrames={APP_HEAD_FRAMES} layout="none" name="Power on">
      <AppOpening />
    </Sequence>
    <Sequence
      from={ROUTE_START}
      durationInFrames={WEB_LOOP.frames}
      layout="none"
      name="Many to one"
    >
      <RouteSegment />
    </Sequence>
    <Sequence
      from={MATRIX_START}
      durationInFrames={MATRIX_LOOP_FRAMES}
      layout="none"
      name="Many to many"
    >
      <MatrixSegment />
    </Sequence>
    <Sequence
      from={AUDIO_START}
      durationInFrames={WEB_LOOP.frames}
      layout="none"
      name="Audio"
    >
      <AudioSegment />
    </Sequence>
    <Sequence
      from={APP_TAIL_START}
      durationInFrames={APP_TAIL_FRAMES}
      layout="none"
      name="Power off"
    >
      <AppShutdown />
    </Sequence>
  </LoopStage>
);
