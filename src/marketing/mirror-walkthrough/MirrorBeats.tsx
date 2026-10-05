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
  type Rect,
} from '../../app-ui/mirror/mirrorData';
import {
  CATALOG_VIEWPORT,
  catalogRegions,
  DriverCatalog,
} from '../../app-ui/DriverCatalog';
import {
  ConnectionPanel,
  CONNECTION_VIEWPORT,
  connectionRegions,
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
 * Connect beat (14.5s = 435 frames):
 * Step 4 *Authorise this computer* ticks, the Devices card shows *Ready*,
 * the pointer clicks Start mirroring, and the stage goes from idle to live tablet.
 */
export const ConnectBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const cueAuthorize = CUE_FRAMES.authorize - BEATS.connect.from;
  const cueReady = CUE_FRAMES.readyReady - BEATS.connect.from;
  const cueMirroring = CUE_FRAMES.readyMirroring - BEATS.connect.from;

  const showDevices = frame >= cueReady - 20;
  const live = frame >= cueMirroring + 8;
  const starting = frame >= cueMirroring && frame < cueMirroring + 8;

  const baseStep4 = mirrorRegions.setupStep(4);
  const step4Reg = {
    ...baseStep4,
    y: 212,
    height: 60,
  };

  const startBtn = mirrorRegions.startMirroringButton;
  const startBtnX = startBtn.x + startBtn.width / 2;
  const startBtnY = startBtn.y + startBtn.height / 2;

  if (!showDevices) {
    const step = frame >= cueAuthorize + 10 ? 5 : 4;
    return (
      <>
        <MirrorApp
          panel="setup"
          status="No device connected"
          hasDevice={false}
          side={<SetupPanel step={step} />}
          stage={<MirrorStage idle={IDLE_STAGE} frameStyle="none" />}
        />
        <FocusRing region={step4Reg} appearAt={cueAuthorize} radius={6} />
      </>
    );
  }

  return (
    <>
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
            <MirrorStage
              mirrored={catalog(frame - (cueMirroring + 8), frames - (cueMirroring + 8))}
              frameStyle="none"
            />
          ) : (
            <MirrorStage idle={IDLE_STAGE} frameStyle="none" />
          )
        }
      />
      <FocusRing region={mirrorRegions.devicesReadyBadge} appearAt={cueReady} radius={4} />
      <PointerClick
        to={{x: startBtnX, y: startBtnY}}
        at={cueMirroring}
        fadeOutAt={cueMirroring + 16}
      />
    </>
  );
};

/**
 * Frame beat (15s = 450 frames):
 * Studio panel's Device frame picker: the pointer clicks another frame
 * and the frame drawn around the mirrored tablet changes shape;
 * then padding rises and the backdrop margin grows.
 */
export const FrameBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const cuePick = CUE_FRAMES.pickFramePick - BEATS.frame.from;
  const cuePadding = CUE_FRAMES.paddingPadding - BEATS.frame.from;

  const currentFrame = frame < cuePick ? 'rounded' : 'tablet1';
  const pressedFrame =
    frame >= cuePick && frame < cuePick + 4 ? 'tablet1' : undefined;

  const padding = Math.round(
    interpolate(frame, [cuePadding, cuePadding + 70], [48, 88], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const stageMargin = Math.round(
    interpolate(padding, [48, 88], [28, 56], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  const frameBtn = mirrorRegions.studioFrameButton(3);
  const frameBtnX = frameBtn.x + frameBtn.width / 2;
  const frameBtnY = frameBtn.y + frameBtn.height / 2;

  return (
    <>
      <MirrorApp
        panel="studio"
        status={`Mirroring ${MIRROR_DEVICE.name}`}
        hasDevice
        side={
          <StudioPanel
            frame={currentFrame}
            padding={padding}
            pressedFrame={pressedFrame}
          />
        }
        stage={
          <MirrorStage
            mirrored={catalog(frame, frames)}
            frameStyle={currentFrame}
            stageMargin={stageMargin}
          />
        }
      />
      <PointerClick
        to={{x: frameBtnX, y: frameBtnY}}
        at={cuePick}
        fadeOutAt={cuePick + 16}
      />
    </>
  );
};

/**
 * Paste beat (14.5s = 435 frames):
 * The mirrored tablet shows CTRLbot IoT's connection panel with no drawn frame;
 * the host field is ringed, pointer clicks it, and 192.168.1.169 appears with caret.
 */
export const PasteBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
}) => {
  const cueCopying = CUE_FRAMES.copyPasteCopying - BEATS.paste.from;
  const cuePasting = CUE_FRAMES.copyPastePasting - BEATS.paste.from;

  const isPasted = frame >= cuePasting;
  const host = isPasted ? '192.168.1.169' : '';

  const screenReg = mirrorRegions.mirroredScreen(
    {width: CONNECTION_VIEWPORT.tablet.width, height: CONNECTION_VIEWPORT.tablet.height},
    'none',
  );
  const hostLocal = connectionRegions('tablet').hostField;
  const hostFieldRegion = {
    x: screenReg.x + hostLocal.x * screenReg.scale,
    y: screenReg.y + hostLocal.y * screenReg.scale,
    width: hostLocal.width * screenReg.scale,
    height: hostLocal.height * screenReg.scale,
  };

  const pointerToX = hostFieldRegion.x + 36;
  const pointerToY = hostFieldRegion.y + hostFieldRegion.height / 2;

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
        hostCaret={isPasted}
      />
    ),
  };

  return (
    <>
      <MirrorApp
        panel="devices"
        status={`Mirroring ${MIRROR_DEVICE.name}`}
        hasDevice
        side={<DevicesPanel selected details live />}
        stage={<MirrorStage mirrored={connectionScreen} frameStyle="none" />}
      />
      <FocusRing region={hostFieldRegion} appearAt={cueCopying} radius={4} />
      <PointerClick
        to={{x: pointerToX, y: pointerToY}}
        at={cuePasting}
        fadeOutAt={cuePasting + 16}
      />
    </>
  );
};

/**
 * Capture beat (14s = 420 frames):
 * The toolbar camera is pressed and a *Screenshot saved* toast lands;
 * then record is pressed and a red recording clock counts up while the
 * mirrored catalog scrolls.
 */
export const CaptureBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const cueScreenshot = CUE_FRAMES.screenshotScreenshot - BEATS.capture.from;
  const cueRecord = CUE_FRAMES.recordVideoRecord - BEATS.capture.from;

  const cameraPressed = frame >= cueScreenshot && frame < cueScreenshot + 4;
  const recordPressed = frame >= cueRecord && frame < cueRecord + 4;

  const toast =
    frame >= cueScreenshot
      ? {
          opacity: interpolate(frame, [cueScreenshot, cueScreenshot + 10, 380, 400], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translateY: interpolate(frame, [cueScreenshot, cueScreenshot + 10], [16, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }
      : undefined;

  const isRecording = frame >= cueRecord;
  const elapsedSeconds = isRecording ? Math.floor((frame - cueRecord) / 30) : 0;
  const recording = isRecording
    ? `${String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:${String(elapsedSeconds % 60).padStart(2, '0')}`
    : undefined;

  const catalogScroll = interpolate(frame, [0, frames], [0, 180], {
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

  const cameraBtn = mirrorRegions.toolbarCamera;
  const cameraX = cameraBtn.x + cameraBtn.width / 2;
  const cameraY = cameraBtn.y + cameraBtn.height / 2;

  const recordBtn = mirrorRegions.toolbarRecord;
  const recordX = recordBtn.x + recordBtn.width / 2;
  const recordY = recordBtn.y + recordBtn.height / 2;

  return (
    <>
      <MirrorApp
        panel="devices"
        status={`Mirroring ${MIRROR_DEVICE.name}`}
        hasDevice
        side={<DevicesPanel selected details live />}
        stage={
          <MirrorStage
            mirrored={mirrored}
            recording={recording}
            cameraPressed={cameraPressed}
            recordPressed={recordPressed}
            frameStyle="none"
          />
        }
        toast={toast}
      />
      {frame < cueRecord - 20 ? (
        <PointerClick
          to={{x: cameraX, y: cameraY}}
          at={cueScreenshot}
          fadeOutAt={cueScreenshot + 16}
          name="PointerCamera"
        />
      ) : (
        <PointerClick
          from={{x: cameraX, y: cameraY}}
          to={{x: recordX, y: recordY}}
          at={cueRecord}
          fadeOutAt={cueRecord + 16}
          name="PointerRecord"
        />
      )}
    </>
  );
};

/**
 * Apps beat (14s = 420 frames):
 * Apps panel lists the tablet's packages; the highlight walks down the list
 * and stops on Kindle, whose row shows its Uninstall action ringed.
 * Never highlights a system package (1: Calendar, 4: Galaxycontinuity).
 */
export const AppsBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const cueApps = CUE_FRAMES.appsApps - BEATS.apps.from;
  const cueDelete = CUE_FRAMES.appsDelete - BEATS.apps.from;

  // Steps through user apps: 0 (Acr2), 2 (Chatgpt), 3 (Docs), 5 (Iot), then stops on
  // 6 (Kindle) before "delete, remove stuff". Never highlights 1 or 4.
  const highlight =
    frame < cueApps
      ? 0
      : frame < cueApps + 45
        ? 2
        : frame < cueApps + 95
          ? 3
          : frame < cueApps + 145
            ? 5
            : 6;

  // Uninstall icon on Kindle row (index 6)
  const uninstallRegion: Rect = {
    x: 354,
    y: 505,
    width: 26,
    height: 26,
  };

  return (
    <>
      <MirrorApp
        panel="apps"
        status={`Mirroring ${MIRROR_DEVICE.name}`}
        hasDevice
        side={<AppsPanel highlight={highlight} uninstallAction />}
        stage={<MirrorStage mirrored={catalog(frame, frames)} frameStyle="none" />}
      />
      <FocusRing region={uninstallRegion} appearAt={cueDelete} radius={4} />
    </>
  );
};

/**
 * Files beat (7s = 210 frames):
 * Files panel at /sdcard; a file is dragged onto the drop area,
 * the area lights, and the file joins the list by "here".
 */
export const FilesBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const cueCopy = CUE_FRAMES.filesCopy - BEATS.files.from;

  const dropArea = mirrorRegions.filesDrop;
  const dropX = dropArea.x + dropArea.width / 2;
  const dropY = dropArea.y + dropArea.height / 2;

  // File drag starts on stage at cueCopy (80) and lands on the drop area by ~122.
  const dragStart = {x: 560, y: 220};
  const dragTarget = {x: dropX, y: dropY};

  // The drop area lights up as the file is dragged into it and released
  const isDragging = frame >= cueCopy + 16 && frame < cueCopy + 65;

  // The file joins the list by "here" (~125)
  const extraFile =
    frame >= cueCopy + 45
      ? {name: 'audio-eui-dummy.xml', size: '12 kB'}
      : undefined;

  return (
    <>
      <MirrorApp
        panel="files"
        status={`Mirroring ${MIRROR_DEVICE.name}`}
        hasDevice
        side={<FilesPanel dragging={isDragging} extraFile={extraFile} />}
        stage={<MirrorStage mirrored={catalog(frame, frames)} frameStyle="none" />}
      />
      <PointerClick
        from={{x: dragStart.x + 80, y: dragStart.y + 60}}
        to={dragStart}
        at={cueCopy}
        dragTo={dragTarget}
        dragDuration={36}
        fadeOutAt={cueCopy + 62}
      />
    </>
  );
};

const SHELL_COMMAND = 'getprop ro.product.model';

/**
 * Tools beat (8s = 240 frames):
 * Shell panel runs one command and its output prints; the sidebar moves to
 * Logcat and log lines stream in.
 */
export const ToolsBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const cueShell = CUE_FRAMES.shellLogsShell - BEATS.tools.from; // 40
  const cueLogs = CUE_FRAMES.shellLogsLogs - BEATS.tools.from; // 117

  const typed = SHELL_COMMAND.slice(
    0,
    Math.round(
      interpolate(frame, [8, 34], [0, SHELL_COMMAND.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    ),
  );

  const linesCount = Math.round(
    interpolate(frame, [cueLogs, cueLogs + 80], [1, 12], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  const side =
    frame < cueLogs ? (
      <ShellPanel
        command={frame >= 8 ? typed : undefined}
        output={frame >= cueShell ? [MIRROR_DEVICE.model.replace('_', '-')] : []}
      />
    ) : (
      <LogcatPanel count={linesCount} />
    );

  return (
    <MirrorApp
      panel={frame < cueLogs ? 'shell' : 'logcat'}
      status={`Mirroring ${MIRROR_DEVICE.name}`}
      hasDevice
      side={side}
      stage={<MirrorStage mirrored={catalog(frame, frames)} frameStyle="none" />}
    />
  );
};

/**
 * Again beat (4.5s = 135 frames):
 * Setup panel with every step ticked beside the live tablet;
 * the Setup icon in the rail is ringed.
 */
export const AgainBeat: React.FC<{frame: number; frames: number}> = ({
  frame,
  frames,
}) => {
  const cueSetup = CUE_FRAMES.setupAgainSetup - BEATS.again.from; // 46
  const setupRailRegion = mirrorRegions.railItem('setup');

  return (
    <>
      <MirrorApp
        panel="setup"
        status={`Mirroring ${MIRROR_DEVICE.name}`}
        hasDevice
        side={<SetupPanel step={6} />}
        stage={<MirrorStage mirrored={catalog(frame, frames)} frameStyle="none" />}
      />
      <FocusRing region={setupRailRegion} appearAt={cueSetup} radius={8} />
    </>
  );
};

/**
 * Close beat (4.5s = 135 frames):
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
    stage={<MirrorStage mirrored={catalog(frame, frames)} frameStyle="none" />}
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
  again: AgainBeat,
  close: CloseBeat,
};
