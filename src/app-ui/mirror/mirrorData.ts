// What Mirror shows, transcribed from Nathan's recording rather than written.
//
// Source: `video input/CTRLbot Mirror Tutorial.mp4`, read frame by frame against its
// transcript in `ingest/mirror-walkthrough/`: the Galaxy Tab on USB, its details card,
// the Studio settings he walks through at 6:12, the app list at 6:32 and /sdcard at 7:42.
// Edit these for another video; keep them things the app has actually shown.

import type {DriverEntry} from '../DriverCatalog';
import {FRAME_SPECS, tabletFrame, type FrameSpec, type FrameStyle} from './mirrorTheme';

export type MirrorPanel = 'setup' | 'devices' | 'studio' | 'apps' | 'files' | 'shell' | 'logcat' | 'settings';

/** CSS pixels the window is laid out at: sidebar 64, panel 340, and the stage. */
export const MIRROR_VIEWPORT = {width: 1600, height: 940} as const;

export const TITLE_BAR_HEIGHT = 32;
export const RAIL_WIDTH = 64;
export const SIDE_PANEL_WIDTH = 340;
export const TOOLBAR_HEIGHT = 56;
export const STAGE_MARGIN = 28;

export const PANEL_HEADER_HEIGHT = 74;
export const PANEL_PADDING_X = 20;

export const SETUP_STEP_DONE_HEIGHT = 44;
export const SETUP_STEP_ACTIVE_HEIGHT = 100;
export const SETUP_STEP_TODO_HEIGHT = 44;

export const DEVICES_ROW_HEIGHT = 76;
export const DEVICES_CARD_HEIGHT = 200;

export const STUDIO_FRAMES_HEIGHT = 62;
export const FILES_DROP_HEIGHT = 58;

export type Rect = {x: number; y: number; width: number; height: number};

export const getMirroredScreenRegion = (
  mirrored: {width: number; height: number} = {width: 1280, height: 800},
  frameStyle: FrameStyle | FrameSpec = tabletFrame,
): Rect & {scale: number} => {
  const stageWidth = MIRROR_VIEWPORT.width - RAIL_WIDTH - SIDE_PANEL_WIDTH;
  const stageHeight = MIRROR_VIEWPORT.height - TITLE_BAR_HEIGHT - TOOLBAR_HEIGHT;
  const spec: FrameSpec | null =
    typeof frameStyle === 'string'
      ? frameStyle === 'none'
        ? null
        : FRAME_SPECS[frameStyle]
      : frameStyle;

  if (!spec) {
    const outerWidth = mirrored.width;
    const outerHeight = mirrored.height;
    const scale = Math.min((stageWidth - STAGE_MARGIN * 2) / outerWidth, (stageHeight - STAGE_MARGIN * 2) / outerHeight);
    const frameX = RAIL_WIDTH + SIDE_PANEL_WIDTH + (stageWidth - outerWidth * scale) / 2;
    const frameY = TITLE_BAR_HEIGHT + (stageHeight - outerHeight * scale) / 2;
    return {
      x: frameX,
      y: frameY,
      width: mirrored.width * scale,
      height: mirrored.height * scale,
      scale,
    };
  }

  const shortEdge = Math.min(mirrored.width, mirrored.height);
  const innerBorder = spec.innerBorder ?? 0;
  const thickness = Math.round(shortEdge * spec.thickness) + innerBorder;
  const outerWidth = mirrored.width + thickness * 2;
  const outerHeight = mirrored.height + thickness * 2;
  const scale = Math.min((stageWidth - STAGE_MARGIN * 2) / outerWidth, (stageHeight - STAGE_MARGIN * 2) / outerHeight);
  const frameX = RAIL_WIDTH + SIDE_PANEL_WIDTH + (stageWidth - outerWidth * scale) / 2;
  const frameY = TITLE_BAR_HEIGHT + (stageHeight - outerHeight * scale) / 2;
  return {
    x: frameX + thickness * scale,
    y: frameY + thickness * scale,
    width: mirrored.width * scale,
    height: mirrored.height * scale,
    scale,
  };
};

const railItem = (panel: MirrorPanel | 'virtual'): Rect => {
  const x = (RAIL_WIDTH - 44) / 2;
  const width = 44;
  const height = 44;
  const navOrder = ['devices', 'studio', 'apps', 'files', 'shell', 'logcat', 'virtual'];
  const index = navOrder.indexOf(panel);
  if (index !== -1) {
    return {x, y: TITLE_BAR_HEIGHT + 12 + index * 48, width, height};
  }
  if (panel === 'setup') {
    return {x, y: MIRROR_VIEWPORT.height - 12 - 44 - 4 - 44, width, height};
  }
  if (panel === 'settings') {
    return {x, y: MIRROR_VIEWPORT.height - 12 - 44, width, height};
  }
  return {x, y: TITLE_BAR_HEIGHT + 12, width, height};
};

const setupStep = (n: number): Rect => {
  const x = RAIL_WIDTH + PANEL_PADDING_X;
  const width = SIDE_PANEL_WIDTH - PANEL_PADDING_X * 2;
  const baseY = TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT;
  switch (n) {
    case 1:
      return {x, y: baseY, width, height: 110};
    case 2:
      return {x, y: baseY + SETUP_STEP_DONE_HEIGHT, width, height: SETUP_STEP_DONE_HEIGHT};
    case 3:
      return {x, y: baseY + SETUP_STEP_DONE_HEIGHT * 2, width, height: 96};
    case 4:
      return {x, y: baseY + SETUP_STEP_DONE_HEIGHT * 2 + 96, width, height: 64};
    case 5:
      return {x, y: baseY + SETUP_STEP_DONE_HEIGHT * 2 + 96 + 64, width, height: 80};
    default:
      return {x, y: baseY, width, height: SETUP_STEP_DONE_HEIGHT};
  }
};

const regionsObject = {
  window: {x: 0, y: 0, width: MIRROR_VIEWPORT.width, height: MIRROR_VIEWPORT.height},
  titleBar: {x: 0, y: 0, width: MIRROR_VIEWPORT.width, height: TITLE_BAR_HEIGHT},
  rail: {x: 0, y: TITLE_BAR_HEIGHT, width: RAIL_WIDTH, height: MIRROR_VIEWPORT.height - TITLE_BAR_HEIGHT},
  railItem,
  sidePanel: {x: RAIL_WIDTH, y: TITLE_BAR_HEIGHT, width: SIDE_PANEL_WIDTH, height: MIRROR_VIEWPORT.height - TITLE_BAR_HEIGHT},
  stage: {x: RAIL_WIDTH + SIDE_PANEL_WIDTH, y: TITLE_BAR_HEIGHT, width: MIRROR_VIEWPORT.width - RAIL_WIDTH - SIDE_PANEL_WIDTH, height: MIRROR_VIEWPORT.height - TITLE_BAR_HEIGHT - TOOLBAR_HEIGHT},
  mirroredScreen: getMirroredScreenRegion,
  toolbarCapture: {x: 1420, y: MIRROR_VIEWPORT.height - TOOLBAR_HEIGHT + 10, width: 78, height: 36},
  toolbarCamera: {x: 1420, y: MIRROR_VIEWPORT.height - TOOLBAR_HEIGHT + 10, width: 36, height: 36},
  toolbarRecord: {x: 1458, y: MIRROR_VIEWPORT.height - TOOLBAR_HEIGHT + 10, width: 36, height: 36},
  setupStep,
  installButton: {x: RAIL_WIDTH + PANEL_PADDING_X + 36, y: TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT + 78, width: 84, height: 32},
  devicesCard: {x: RAIL_WIDTH + PANEL_PADDING_X, y: TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT, width: SIDE_PANEL_WIDTH - PANEL_PADDING_X * 2, height: 288},
  devicesReadyBadge: {x: RAIL_WIDTH + PANEL_PADDING_X + 56, y: TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT + 48, width: 50, height: 20},
  startMirroringButton: {x: RAIL_WIDTH + PANEL_PADDING_X + 16, y: TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT + 88 + 152, width: 164, height: 32},
  studioFrames: {x: RAIL_WIDTH + PANEL_PADDING_X, y: TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT + 20, width: SIDE_PANEL_WIDTH - PANEL_PADDING_X * 2, height: STUDIO_FRAMES_HEIGHT},
  studioFrameButton: (index: number) => ({x: RAIL_WIDTH + PANEL_PADDING_X + index * 59.2, y: TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT + 20, width: 55.2, height: STUDIO_FRAMES_HEIGHT}),
  filesDrop: {x: RAIL_WIDTH + PANEL_PADDING_X, y: TITLE_BAR_HEIGHT + PANEL_HEADER_HEIGHT, width: SIDE_PANEL_WIDTH - PANEL_PADDING_X * 2, height: FILES_DROP_HEIGHT},
};

export const mirrorRegions = Object.assign(
  (mirrored?: {width: number; height: number}, frameStyle?: FrameStyle | FrameSpec) => ({
    ...regionsObject,
    mirroredScreen: getMirroredScreenRegion(mirrored, frameStyle),
  }),
  regionsObject,
);

export const MIRROR_DEVICE = {
  model: 'SM_X210',
  serial: 'R9TWB0EJMYM',
  name: 'samsung SM-X210',
  android: 'Android 16 · API 36 · arm64-v8a',
  screen: '1200×1920 @ 240dpi',
  battery: '99%',
  build: 'BP2A.250605.031.A3.X210XXSCEZGC',
  transport: 'USB',
} as const;

/** The toolbar's live readout while mirroring. */
export const MIRROR_STREAM = {size: '1600×1000', codec: 'H264', fps: 60} as const;

export const MIRROR_STUDIO = {
  frameInCaptures: true,
  padding: 64,
  screenshotScale: '2× — crisp for slides',
  recordingFormat: 'MP4 (H.264)',
  recordingBitrate: 12,
  resolutionCap: 1600,
  bitrate: 8,
  frameRate: 60,
  codec: 'H.264 — most compatible',
  showTouches: false,
  keepAwake: true,
} as const;

export const MIRROR_APPS = [
  {label: 'Acr2', id: 'com.sonos.acr2'},
  {label: 'Calendar', id: 'com.samsung.android.calendar'},
  {label: 'Chatgpt', id: 'com.openai.chatgpt'},
  {label: 'Docs', id: 'com.google.android.apps.docs'},
  {label: 'Galaxycontinuity', id: 'com.samsung.android.galaxycontinuity'},
  {label: 'Iot', id: 'io.ctrlbot.iot'},
  {label: 'Kindle', id: 'com.amazon.kindle'},
  {label: 'Music', id: 'com.spotify.music'},
] as const;

export const MIRROR_FILES = {
  path: '/sdcard',
  folders: ['Alarms', 'Android', 'Audiobooks', 'DCIM', 'Documents', 'Download', 'Movies', 'Music', 'Pictures', 'Recordings'],
  files: [
    {name: 'a.png', size: '99 kB'},
    {name: 'after_cancel.png', size: '164 kB'},
    {name: 'audio-dummy.xml', size: '32 kB'},
  ],
} as const;

/** The catalog the mirrored tablet is showing: the app's own bundled drivers. */
export const MIRROR_CATALOG: DriverEntry[] = [
  {manufacturer: 'ACER', model: 'XL2320P', deviceType: 'projector'},
  {manufacturer: 'AVPRO EDGE', model: 'AC-MX-44', deviceType: 'switcher'},
  {manufacturer: 'BARCO', model: 'F80-4K12', deviceType: 'projector'},
  {manufacturer: 'BENQ', model: 'LU895UST', deviceType: 'projector'},
  {manufacturer: 'BLUSTREAM', model: 'CMX44CS', deviceType: 'switcher'},
  {manufacturer: 'CANON', model: 'WUX7000Z', deviceType: 'projector'},
  {manufacturer: 'CASIO', model: 'XJ-F210WN', deviceType: 'projector'},
  {manufacturer: 'CHRISTIE', model: 'FHD551', deviceType: 'display'},
];

export type LogPriority = 'V' | 'D' | 'I' | 'W' | 'E' | 'F';

export interface MirrorLogLine {
  id: number;
  priority: LogPriority;
  tag: string;
  message: string;
}

/** Logcat lines for the device when running CTRLbot IoT and Mirror. */
export const MIRROR_LOGCAT: MirrorLogLine[] = [
  {id: 1, priority: 'I', tag: 'ActivityManager', message: 'Start proc 12480:io.ctrlbot.iot/u0a214 for activity io.ctrlbot/.activities.MainActivity'},
  {id: 2, priority: 'D', tag: 'CompatibilityChangeReporter', message: 'Compat change id reported: 171979766; UID 10214; state: ENABLED'},
  {id: 3, priority: 'I', tag: 'CTRLbot', message: 'Application created, initializing driver database'},
  {id: 4, priority: 'D', tag: 'DriverDatabase', message: 'Loaded 23 device drivers from bundled assets'},
  {id: 5, priority: 'I', tag: 'MainActivity', message: 'Display viewport: 1200x1920 @ 240dpi, orientation: landscape'},
  {id: 6, priority: 'D', tag: 'DriverAdapter', message: 'Driver list updated with 23 items'},
  {id: 7, priority: 'I', tag: 'scrcpy', message: 'Encoder: c2.android.avc.encoder (H.264 / AVC)'},
  {id: 8, priority: 'D', tag: 'scrcpy', message: 'Stream initialized at 1600x1000 @ 60fps, bitrate 8 Mbps'},
  {id: 9, priority: 'I', tag: 'AdbService', message: 'USB debugging active on transport USB'},
  {id: 10, priority: 'D', tag: 'InputManager', message: 'Pointer device registered: virtual-touchscreen'},
  {id: 11, priority: 'I', tag: 'ControlUiViewModel', message: 'Active profile: default, room ready'},
  {id: 12, priority: 'D', tag: 'DeviceRepository', message: 'Preset store synced, 0 pending writes'},
];
