// What Mirror shows, transcribed from Nathan's recording rather than written.
//
// Source: `video input/CTRLbot Mirror Tutorial.mp4`, read frame by frame against its
// transcript in `ingest/mirror-walkthrough/`: the Galaxy Tab on USB, its details card,
// the Studio settings he walks through at 6:12, the app list at 6:32 and /sdcard at 7:42.
// Edit these for another video; keep them things the app has actually shown.

import type {DriverEntry} from '../DriverCatalog';

/** CSS pixels the window is laid out at: sidebar 64, panel 340, and the stage. */
export const MIRROR_VIEWPORT = {width: 1600, height: 940} as const;

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
