import React from 'react';
import {interpolate, Easing} from 'remotion';
import {
  DevicesPanel,
  MirrorApp,
  MirrorStage,
  SetupPanel,
  StudioPanel,
  type Mirrored,
} from '../../app-ui/mirror/Mirror';
import {MIRROR_CATALOG, MIRROR_DEVICE} from '../../app-ui/mirror/mirrorData';
import {CATALOG_VIEWPORT, DriverCatalog} from '../../app-ui/DriverCatalog';
import {
  ConnectionPanel,
  CONNECTION_VIEWPORT,
  type DeviceCommand,
} from '../../app-ui/ConnectionPanel';
import type {BeatName} from './walkthroughData';

const catalog = (frame: number, frames: number): Mirrored => ({
  width: CATALOG_VIEWPORT.tablet.width,
  height: CATALOG_VIEWPORT.tablet.height,
  screen: (
    <DriverCatalog
      device="tablet"
      drivers={MIRROR_CATALOG}
      listScroll={interpolate(frame, [0, frames], [0, 120], {
        easing: Easing.bezier(0.45, 0, 0.55, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })}
    />
  ),
});

const IDLE_STAGE = {
  title: 'No device selected',
  detail: 'Plug a phone in over USB with USB debugging turned on, then pick it from the Devices panel.',
};

/**
 * Open beat (16s): Mirror window with the tablet live on the stage,
 * Devices panel showing the tablet mirroring, catalog scrolling.
 */
export const OpenBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => (
  <MirrorApp
    panel="devices"
    status={`Mirroring ${MIRROR_DEVICE.name}`}
    hasDevice
    side={<DevicesPanel selected details live />}
    stage={<MirrorStage mirrored={catalog(frame, frames)} />}
  />
);

/**
 * Setup beat (14s): Setup panel where the platform-tools bar fills,
 * step 1 ticks to Android platform-tools installed, then step 2 ticks
 * to ADB server running.
 */
export const SetupBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  // Step 1 downloading: 0..120 (0s..4s)
  // Step 2 starting ADB: 120..220 (4s..7.33s)
  // Step 3 active (ADB server running marked done): 220..420 (7.33s..14s)
  const downloaded = interpolate(frame, [0, 120], [0.15, 1.0], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const step = frame < 120 ? 1 : frame < 220 ? 2 : 3;

  return (
    <MirrorApp
      panel="setup"
      status="No device connected"
      hasDevice={false}
      side={<SetupPanel step={step} downloaded={downloaded} />}
      stage={<MirrorStage idle={IDLE_STAGE} />}
    />
  );
};

/**
 * Debugging beat (13s): Setup step 3 "Turn on USB debugging" is active with its
 * Build number instructions, then the Devices panel's pairing address and pairing
 * code fields fill and Pair is pressed.
 */
export const DebuggingBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  // 0..120 (0s..4s): Setup panel step 3 active with build instructions
  // 120..390 (4s..13s): Devices panel with Wi-Fi pairing fields filling & Pair pressed
  const isSetup = frame < 120;

  if (isSetup) {
    return (
      <MirrorApp
        panel="setup"
        status="No device connected"
        hasDevice={false}
        side={<SetupPanel step={3} />}
        stage={<MirrorStage idle={IDLE_STAGE} />}
      />
    );
  }

  const FULL_ADDR = '192.168.1.42:37021';
  const FULL_CODE = '123456';

  const addrChars = Math.round(
    interpolate(frame, [150, 185], [0, FULL_ADDR.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const pairingAddress = frame >= 150 ? FULL_ADDR.slice(0, addrChars) : undefined;

  const codeChars = Math.round(
    interpolate(frame, [190, 215], [0, FULL_CODE.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const pairingCode = frame >= 190 ? FULL_CODE.slice(0, codeChars) : undefined;

  const pairPressed = frame >= 225;

  return (
    <MirrorApp
      panel="devices"
      status="No device connected"
      hasDevice={false}
      side={
        <DevicesPanel
          selected={false}
          details={false}
          live={false}
          pairingAddress={pairingAddress}
          pairingCode={pairingCode}
          pairPressed={pairPressed}
        />
      }
      stage={<MirrorStage idle={IDLE_STAGE} />}
    />
  );
};

/**
 * Connect beat (14s = 420 frames):
 * Step 4 "Authorise this computer" ticks, the Devices card shows "Ready",
 * Start mirroring is pressed and the stage changes from the idle message to the live tablet.
 */
export const ConnectBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  // 0..80 (0s..2.67s): Setup panel where step 4 ticks to authorised
  // 80..180 (2.67s..6s): Devices panel showing Ready and device details, Start mirroring clicked
  // 180..420 (6s..14s): Live mirroring begins; stage transitions to live tablet
  if (frame < 80) {
    const step = frame < 40 ? 4 : 5;
    return (
      <MirrorApp
        panel="setup"
        status="No device connected"
        hasDevice={false}
        side={<SetupPanel step={step} />}
        stage={<MirrorStage idle={IDLE_STAGE} />}
      />
    );
  }

  const live = frame >= 180;
  const starting = frame >= 140 && frame < 180;

  return (
    <MirrorApp
      panel="devices"
      status={live ? `Mirroring ${MIRROR_DEVICE.name}` : '1 device ready'}
      hasDevice
      side={
        <DevicesPanel
          selected
          details
          live={live}
          starting={starting}
        />
      }
      stage={
        live ? (
          <MirrorStage mirrored={catalog(frame - 180, 420 - 180)} />
        ) : (
          <MirrorStage idle={IDLE_STAGE} />
        )
      }
    />
  );
};

/**
 * Frame beat (14s = 420 frames):
 * Studio panel's Device frame picker: the selection moves to another frame
 * and the frame drawn around the mirrored tablet changes shape, then the
 * padding value rises and the backdrop margin grows.
 */
export const FrameBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const currentFrame = frame < 120 ? 'rounded' : 'tablet1';
  const padding = Math.round(
    interpolate(frame, [180, 270], [48, 88], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <MirrorApp
      panel="studio"
      status={`Mirroring ${MIRROR_DEVICE.name}`}
      hasDevice
      side={<StudioPanel frame={currentFrame} padding={padding} />}
      stage={
        <MirrorStage
          mirrored={catalog(frame, frames)}
          frameStyle={currentFrame}
        />
      }
    />
  );
};

const CONNECTION_COMMANDS: DeviceCommand[] = [
  {label: 'Power On', reference: 'PWR ON\\r'},
  {label: 'Power Off', reference: 'PWR OFF\\r'},
  {label: 'Power Toggle', reference: 'KEY 01\\r'},
  {label: 'Volume Up', reference: 'KEY 56\\r'},
  {label: 'Aspect', reference: 'ASPECT 30\\r'},
];

/**
 * Paste beat (14s = 420 frames):
 * The mirrored tablet shows CTRLbot IoT's connection panel; its host field
 * goes from empty to 192.168.1.169 in one frame, caret after it.
 */
export const PasteBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  // Host field empty for first 4 seconds (120 frames), then fills in one frame (paste!)
  const isPasted = frame >= 120;
  const host = isPasted ? '192.168.1.169' : '';

  const connectionScreen: Mirrored = {
    width: CONNECTION_VIEWPORT.tablet.width,
    height: CONNECTION_VIEWPORT.tablet.height,
    screen: (
      <ConnectionPanel
        device="tablet"
        deviceName="EPSON PowerLite - New"
        protocol="TCP"
        host={host}
        port="3629"
        connected={false}
        commands={CONNECTION_COMMANDS}
        terminal={[]}
        hostCaret
      />
    ),
  };

  return (
    <MirrorApp
      panel="devices"
      status={`Mirroring ${MIRROR_DEVICE.name}`}
      hasDevice
      side={<DevicesPanel selected details live />}
      stage={<MirrorStage mirrored={connectionScreen} />}
    />
  );
};

/**
 * Capture beat (16s = 480 frames):
 * The toolbar camera is pressed and a *Screenshot saved* toast lands;
 * then record is pressed and a red recording clock counts up while the
 * mirrored catalog scrolls.
 */
export const CaptureBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  // 30..210: Screenshot saved toast lands and displays
  const toast =
    frame >= 30 && frame < 210
      ? {
          opacity: interpolate(frame, [30, 45, 195, 210], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translateY: interpolate(frame, [30, 45], [16, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }
      : undefined;

  // 180..480: Record is pressed, red recording clock counts up
  const isRecording = frame >= 180;
  const elapsedSeconds = isRecording ? Math.floor((frame - 180) / 30) : 0;
  const recording = isRecording
    ? `${String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:${String(elapsedSeconds % 60).padStart(2, '0')}`
    : undefined;

  const catalogScroll = interpolate(frame, [0, 480], [0, 180], {
    easing: Easing.bezier(0.4, 0, 0.6, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mirrored: Mirrored = {
    width: CATALOG_VIEWPORT.tablet.width,
    height: CATALOG_VIEWPORT.tablet.height,
    screen: (
      <DriverCatalog
        device="tablet"
        drivers={MIRROR_CATALOG}
        listScroll={catalogScroll}
      />
    ),
  };

  return (
    <MirrorApp
      panel="devices"
      status={`Mirroring ${MIRROR_DEVICE.name}`}
      hasDevice
      side={<DevicesPanel selected details live />}
      stage={<MirrorStage mirrored={mirrored} recording={recording} />}
      toast={toast}
    />
  );
};

export const BEAT_RENDERERS: Partial<
  Record<BeatName, React.FC<{frame: number; frames: number}>>
> = {
  open: OpenBeat,
  setup: SetupBeat,
  debugging: DebuggingBeat,
  connect: ConnectBeat,
  frame: FrameBeat,
  paste: PasteBeat,
  capture: CaptureBeat,
};
