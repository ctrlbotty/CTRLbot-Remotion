import React from 'react';
import {interpolate, Easing} from 'remotion';
import {
  DevicesPanel,
  MirrorApp,
  MirrorStage,
  SetupPanel,
  type Mirrored,
} from '../../app-ui/mirror/Mirror';
import {MIRROR_CATALOG, MIRROR_DEVICE} from '../../app-ui/mirror/mirrorData';
import {CATALOG_VIEWPORT, DriverCatalog} from '../../app-ui/DriverCatalog';
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

export const BEAT_RENDERERS: Partial<
  Record<BeatName, React.FC<{frame: number; frames: number}>>
> = {
  open: OpenBeat,
  setup: SetupBeat,
  debugging: DebuggingBeat,
};
