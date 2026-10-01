import React from 'react';
import {interpolate, Easing} from 'remotion';
import {
  AppsPanel,
  DevicesPanel,
  FilesPanel,
  LogcatPanel,
  MirrorApp,
  MirrorStage,
  SetupPanel,
  ShellPanel,
  StudioPanel,
  type Mirrored,
} from '../../app-ui/mirror/Mirror';
import {
  MIRROR_CATALOG,
  MIRROR_DEVICE,
  mirrorRegions,
} from '../../app-ui/mirror/mirrorData';
import {
  CATALOG_VIEWPORT,
  catalogRegions,
  DriverCatalog,
} from '../../app-ui/DriverCatalog';
import {
  ConnectionPanel,
  CONNECTION_VIEWPORT,
  type DeviceCommand,
} from '../../app-ui/ConnectionPanel';
import {FocusRing, PointerClick, Spotlight} from '../../camera/Annotations';
import {BEATS, CUE_FRAMES, setupStepAt, type BeatName} from './walkthroughData';

const CONNECTION_COMMANDS: DeviceCommand[] = [
  {label: 'Power On', reference: 'PWR ON\\r'},
  {label: 'Power Off', reference: 'PWR OFF\\r'},
  {label: 'Power Toggle', reference: 'KEY 01\\r'},
  {label: 'Volume Up', reference: 'KEY 56\\r'},
  {label: 'Aspect', reference: 'ASPECT 30\\r'},
];

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

const proofDriverScreen = (
  frame: number,
  cueProof: number,
): Mirrored => {
  if (frame >= cueProof + 10) {
    return {
      width: CONNECTION_VIEWPORT.tablet.width,
      height: CONNECTION_VIEWPORT.tablet.height,
      screen: (
        <ConnectionPanel
          device="tablet"
          deviceName={`${MIRROR_CATALOG[0].manufacturer} ${MIRROR_CATALOG[0].model}`}
          protocol="TCP"
          host=""
          port="3629"
          connected={false}
          commands={CONNECTION_COMMANDS}
          terminal={[]}
        />
      ),
    };
  }

  return {
    width: CATALOG_VIEWPORT.tablet.width,
    height: CATALOG_VIEWPORT.tablet.height,
    screen: (
      <DriverCatalog
        device="tablet"
        drivers={MIRROR_CATALOG}
        selectedIndex={frame >= cueProof ? 0 : undefined}
        listScroll={0}
      />
    ),
  };
};

/**
 * Proof beat (10s = 300 frames): Mirror window with the tablet live on the stage;
 * pointer clicks a driver's + in the mirrored catalog, Mirror's ripple lands,
 * and Configure Connection opens.
 */
export const ProofBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  const cueProof = CUE_FRAMES.mirrorWhatMirror - BEATS.proof.from;
  const screenReg = mirrorRegions.mirroredScreen(
    {width: CATALOG_VIEWPORT.tablet.width, height: CATALOG_VIEWPORT.tablet.height},
    'none',
  );
  const addBtn = catalogRegions('tablet').addButton(0);
  const btnCenterX = addBtn.x + addBtn.width / 2;
  const btnCenterY = addBtn.y + addBtn.height / 2;
  const pointerToX = screenReg.x + btnCenterX * screenReg.scale;
  const pointerToY = screenReg.y + btnCenterY * screenReg.scale;
  const rippleX = btnCenterX / CATALOG_VIEWPORT.tablet.width;
  const rippleY = btnCenterY / CATALOG_VIEWPORT.tablet.height;

  const ripple =
    frame >= cueProof && frame < cueProof + 22
      ? {
          x: rippleX,
          y: rippleY,
          progress: interpolate(frame, [cueProof, cueProof + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }
      : undefined;

  return (
    <>
      <MirrorApp
        panel="devices"
        status={`Mirroring ${MIRROR_DEVICE.name}`}
        hasDevice
        side={<DevicesPanel selected details live />}
        stage={
          <MirrorStage
            mirrored={proofDriverScreen(frame, cueProof)}
            frameStyle="none"
            ripple={ripple}
          />
        }
      />
      <PointerClick
        to={{x: pointerToX, y: pointerToY}}
        at={cueProof}
        fadeOutAt={cueProof + 16}
      />
    </>
  );
};

export const OpenBeat = ProofBeat;

/**
 * Setup beat (15s = 450 frames): Setup panel where the platform-tools bar fills and
 * step 1 ticks to *Android platform-tools installed*, then step 2, the ADB server, is up.
 * Spotlight isolates the side panel; PointerClick presses Install now.
 */
export const SetupBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  const cueInstall = CUE_FRAMES.installAdbInstall - BEATS.setup.from;
  const cueManage = CUE_FRAMES.installAdbManage - BEATS.setup.from;

  const installBtn = mirrorRegions.installButton;
  const installBtnX = installBtn.x + installBtn.width / 2;
  const installBtnY = installBtn.y + installBtn.height / 2;

  const step = setupStepAt(BEATS.setup.from + frame).step;
  const installPressed = frame >= cueInstall && frame < cueInstall + 5;
  const downloaded =
    frame < cueInstall
      ? undefined
      : interpolate(frame, [cueInstall, cueManage], [0, 1.0], {
          easing: Easing.bezier(0.45, 0, 0.55, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <>
      <MirrorApp
        panel="setup"
        status="No device connected"
        hasDevice={false}
        side={
          <SetupPanel
            step={step}
            downloaded={downloaded}
            installPressed={installPressed}
          />
        }
        stage={<MirrorStage idle={IDLE_STAGE} />}
      />
      <Spotlight region={mirrorRegions.sidePanel} />
      <PointerClick
        to={{x: installBtnX, y: installBtnY}}
        at={cueInstall}
        fadeOutAt={cueInstall + 16}
      />
    </>
  );
};

/**
 * Debugging beat (8s = 240 frames): Setup step 3, *Turn on USB debugging*, is active with
 * its Build number and Developer options instructions. Spotlight and FocusRing on step 3.
 */
export const DebuggingBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  const cueUsb = CUE_FRAMES.usbDebugging - BEATS.debugging.from;
  const baseStep3 = mirrorRegions.setupStep(3);
  const step3Reg = {
    ...baseStep3,
    y: 170,
    height: 100,
  };

  return (
    <>
      <MirrorApp
        panel="setup"
        status="No device connected"
        hasDevice={false}
        side={<SetupPanel step={setupStepAt(BEATS.debugging.from + frame).step} />}
        stage={<MirrorStage idle={IDLE_STAGE} />}
      />
      <Spotlight region={step3Reg} appearAt={cueUsb} radius={6} />
      <FocusRing region={step3Reg} appearAt={cueUsb} radius={6} />
    </>
  );
};

/**
 * Connect beat (14s = 420 frames):
 * Step 4 *Authorise this computer* ticks, the Devices card shows *Ready*, Start mirroring
 * is pressed and the stage changes from the idle message to the live tablet. Timed to the
 * narration: "authorize" by 170, "green and ready" as Devices opens at 190, and "start
 * mirroring" as the press lands at 330–365.
 */
export const ConnectBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  if (frame < 190) {
    return (
      <MirrorApp
        panel="setup"
        status="No device connected"
        hasDevice={false}
        side={<SetupPanel step={setupStepAt(BEATS.connect.from + frame).step} />}
        stage={<MirrorStage idle={IDLE_STAGE} />}
      />
    );
  }

  const live = frame >= 365;
  const starting = frame >= 330 && frame < 365;

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
          <MirrorStage mirrored={catalog(frame - 365, 420 - 365)} />
        ) : (
          <MirrorStage idle={IDLE_STAGE} />
        )
      }
    />
  );
};

/**
 * Frame beat (14.5s = 435 frames):
 * Studio panel's Device frame picker: the selection moves to another frame
 * and the frame drawn around the mirrored tablet changes shape, then the
 * padding value rises and the backdrop margin grows.
 */
export const FrameBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  // "let's pick one of these other ones" lands at ~2.5s; "padding and shadow" at ~9s.
  const currentFrame = frame < 80 ? 'rounded' : 'tablet1';
  const padding = Math.round(
    interpolate(frame, [280, 380], [48, 88], {
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



/**
 * Paste beat (14s = 420 frames):
 * The mirrored tablet shows CTRLbot IoT's connection panel; its host field
 * goes from empty to 192.168.1.169 in one frame, caret after it.
 */
export const PasteBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  // Host field empty until "copying and pasting" (~4.7s), then fills in one frame: a paste.
  const isPasted = frame >= 140;
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
 * Capture beat (13.5s = 405 frames):
 * The toolbar camera is pressed and a *Screenshot saved* toast lands;
 * then record is pressed and a red recording clock counts up while the
 * mirrored catalog scrolls.
 */
export const CaptureBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  // 100..250: "hit the screenshot button" (~3.6s), and the Screenshot saved toast lands.
  const toast =
    frame >= 100 && frame < 250
      ? {
          opacity: interpolate(frame, [100, 115, 235, 250], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translateY: interpolate(frame, [100, 115], [16, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }
      : undefined;

  // From 260, "record it as video" (~8.8s): record is pressed and the clock counts up.
  const isRecording = frame >= 260;
  const elapsedSeconds = isRecording ? Math.floor((frame - 260) / 30) : 0;
  const recording = isRecording
    ? `${String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:${String(elapsedSeconds % 60).padStart(2, '0')}`
    : undefined;

  const catalogScroll = interpolate(frame, [0, 405], [0, 180], {
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

/**
 * Apps beat (13.5s = 405 frames):
 * Apps panel lists the tablet's packages; the highlight walks down the list
 * and stops on Kindle, whose row shows its Uninstall action.
 * Never highlights a system package (Calendar: 1, Galaxycontinuity: 4).
 */
export const AppsBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  // Steps through user apps: 0 (Acr2), 2 (Chatgpt), 3 (Docs), 5 (Iot), then stops on
  // 6 (Kindle) just before "delete, remove stuff" (~10.5s).
  const highlight =
    frame < 75 ? 0 : frame < 150 ? 2 : frame < 225 ? 3 : frame < 290 ? 5 : 6;

  return (
    <MirrorApp
      panel="apps"
      status={`Mirroring ${MIRROR_DEVICE.name}`}
      hasDevice
      side={<AppsPanel highlight={highlight} uninstallAction />}
      stage={<MirrorStage mirrored={catalog(frame, frames)} />}
    />
  );
};

/**
 * Files beat (8.5s = 255 frames):
 * Files panel at /sdcard; a file is dragged onto the drop area,
 * the area lights, and the file appears in the list.
 */
export const FilesBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  // "dragging, dropping into this area" runs ~5.3–6.2s.
  const isDragging = frame >= 120 && frame < 175;
  const extraFile =
    frame >= 175 ? {name: 'audio-eui-dummy.xml', size: '12 kB'} : undefined;

  return (
    <MirrorApp
      panel="files"
      status={`Mirroring ${MIRROR_DEVICE.name}`}
      hasDevice
      side={<FilesPanel dragging={isDragging} extraFile={extraFile} />}
      stage={<MirrorStage mirrored={catalog(frame, frames)} />}
    />
  );
};

const SHELL_COMMAND = 'getprop ro.product.model';

/**
 * Tools beat (7.5s = 225 frames):
 * Shell panel runs one command and its output prints; the sidebar moves to
 * Logcat and log lines stream in.
 */
export const ToolsBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const typed = SHELL_COMMAND.slice(
    0,
    Math.round(
      interpolate(frame, [12, 54], [0, SHELL_COMMAND.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    ),
  );
  const side =
    frame < 125 ? (
      <ShellPanel
        command={frame >= 12 ? typed : undefined}
        output={frame >= 66 ? [MIRROR_DEVICE.model.replace('_', '-')] : []}
      />
    ) : (
      <LogcatPanel
        count={Math.round(
          interpolate(frame, [130, 215], [0, 12], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        )}
      />
    );

  return (
    <MirrorApp
      panel={frame < 125 ? 'shell' : 'logcat'}
      status={`Mirroring ${MIRROR_DEVICE.name}`}
      hasDevice
      side={side}
      stage={<MirrorStage mirrored={catalog(frame, frames)} />}
    />
  );
};

/**
 * Close beat (9s = 270 frames):
 * Setup panel with every step ticked beside the live tablet. The copy column
 * carries the CTRLbot Mirror wordmark (MirrorWalkthrough.tsx).
 */
export const CloseBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => (
  <MirrorApp
    panel="setup"
    status={`Mirroring ${MIRROR_DEVICE.name}`}
    hasDevice
    side={<SetupPanel step={6} />}
    stage={<MirrorStage mirrored={catalog(frame, frames)} />}
  />
);

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
  apps: AppsBeat,
  files: FilesBeat,
  tools: ToolsBeat,
  close: CloseBeat,
};
