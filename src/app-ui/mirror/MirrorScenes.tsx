// CTRLbot Mirror, in motion: one scene per thing Nathan demonstrates.
//
// Each scene plays its demonstration across the length it is given, and frame 0 is the
// window at rest. The mirrored tablet is the IoT app's live driver catalog, scrolling and
// taking a tap, so the stage is never a still picture of a screen.
//
// Registered by name in src/shorts/surfaces.tsx: `mirror/setup`, `mirror/devices`,
// `mirror/mirroring`, `mirror/studio`, `mirror/apps`, `mirror/files`.

import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {CATALOG_VIEWPORT, DriverCatalog} from '../DriverCatalog';
import {AppsPanel, DevicesPanel, FilesPanel, MirrorApp, MirrorStage, SetupPanel, StudioPanel, type Mirrored} from './Mirror';
import {MIRROR_CATALOG, MIRROR_DEVICE} from './mirrorData';

export type MirrorSceneProps = {frames: number};

const MIRRORING = `Mirroring ${MIRROR_DEVICE.name}`;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** The IoT app on the tablet, scrolling its catalog and, from `selectAt`, one driver picked. */
const catalog = (frame: number, frames: number, selectAt = Infinity): Mirrored => ({
  width: CATALOG_VIEWPORT.tablet.width,
  height: CATALOG_VIEWPORT.tablet.height,
  screen: (
    <DriverCatalog
      device="tablet"
      drivers={MIRROR_CATALOG}
      selectedIndex={frame >= selectAt ? 2 : null}
      listScroll={interpolate(frame, [0, frames], [0, 120], {easing: Easing.bezier(0.45, 0, 0.55, 1), ...clamp})}
    />
  ),
});

const recordingClock = (frame: number, from: number) => {
  const seconds = Math.max(0, Math.floor((frame - from) / 30));
  return `00:${String(seconds).padStart(2, '0')}`;
};

/** Setup's steps completing one by one, platform-tools downloading first. */
export const MirrorSetupScene = ({frames}: MirrorSceneProps) => {
  const frame = useCurrentFrame();
  const downloaded = interpolate(frame, [0, frames * 0.3], [0.1, 1], clamp);
  const step = frame < frames * 0.32 ? 1 : frame < frames * 0.45 ? 2 : frame < frames * 0.62 ? 3 : frame < frames * 0.8 ? 4 : 5;
  return (
    <MirrorApp
      panel="setup"
      status={step >= 5 ? '1 device ready' : 'No device connected'}
      hasDevice={step >= 5}
      side={<SetupPanel step={step} downloaded={downloaded} />}
      stage={<MirrorStage idle={{title: 'No device selected', detail: 'Plug a phone in over USB with USB debugging turned on, then pick it from the Devices panel.'}} />}
    />
  );
};

/** Pick the tablet, its details load, press Start mirroring, and the stage goes live. */
export const MirrorDevicesScene = ({frames}: MirrorSceneProps) => {
  const frame = useCurrentFrame();
  const selected = frame >= frames * 0.12;
  const details = frame >= frames * 0.24;
  const starting = frame >= frames * 0.4 && frame < frames * 0.48;
  const live = frame >= frames * 0.48;
  return (
    <MirrorApp
      panel="devices"
      status={live ? MIRRORING : '1 device ready'}
      hasDevice
      side={<DevicesPanel selected={selected} details={details} live={live} starting={starting} />}
      stage={
        <MirrorStage
          mirrored={live ? catalog(frame - frames * 0.48, frames * 0.52) : undefined}
          idle={{
            title: `${MIRROR_DEVICE.serial} is ready`,
            detail: 'Start mirroring to see the screen here, control it with your mouse and keyboard, and capture stills or video.',
            action: 'Start mirroring',
          }}
        />
      }
    />
  );
};

/** Live: the mirrored app scrolls, a driver is tapped, and a recording is running. */
export const MirrorMirroringScene = ({frames}: MirrorSceneProps) => {
  const frame = useCurrentFrame();
  const tapAt = frames * 0.45;
  return (
    <MirrorApp
      panel="devices"
      status={MIRRORING}
      hasDevice
      side={<DevicesPanel selected details live />}
      stage={
        <MirrorStage
          mirrored={catalog(frame, frames, tapAt + 6)}
          ripple={{x: 0.32, y: 0.47, progress: interpolate(frame, [tapAt, tapAt + 18.6], [0, 1], clamp)}}
          recording={frame >= frames * 0.15 ? recordingClock(frame, frames * 0.15) : undefined}
        />
      }
    />
  );
};

/** Studio's capture and stream settings, beside the live mirror. */
export const MirrorStudioScene = ({frames}: MirrorSceneProps) => {
  const frame = useCurrentFrame();
  return <MirrorApp panel="studio" status={MIRRORING} hasDevice side={<StudioPanel />} stage={<MirrorStage mirrored={catalog(frame, frames)} />} />;
};

/** The tablet's apps, the pointer moving down the list toward the preinstalled ones. */
export const MirrorAppsScene = ({frames}: MirrorSceneProps) => {
  const frame = useCurrentFrame();
  const highlight = Math.min(7, Math.floor(interpolate(frame, [frames * 0.1, frames * 0.9], [0, 8], clamp)));
  return <MirrorApp panel="apps" status={MIRRORING} hasDevice side={<AppsPanel highlight={highlight} />} stage={<MirrorStage mirrored={catalog(frame, frames)} />} />;
};

/** /sdcard, and a file dragged onto the drop target to copy it to the tablet. */
export const MirrorFilesScene = ({frames}: MirrorSceneProps) => {
  const frame = useCurrentFrame();
  const dragging = frame >= frames * 0.35 && frame < frames * 0.7;
  return <MirrorApp panel="files" status={MIRRORING} hasDevice side={<FilesPanel dragging={dragging} />} stage={<MirrorStage mirrored={catalog(frame, frames)} />} />;
};
