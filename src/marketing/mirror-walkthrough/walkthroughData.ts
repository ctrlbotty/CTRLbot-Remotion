// Beat timings, copy and data for the CTRLbot Mirror walkthrough.
//
// Source: `videos/mirror-walkthrough.md`, built from Nathan's recording
// `video input/CTRLbot Mirror Tutorial.mp4` (8:29). One set of beats drives both shapes,
// landscape and portrait, so both cuts say the same thing at the same moment.
//
// Every line of copy is checked against Mirror itself: the Setup steps are its own panel's
// titles and hints (`CTRLbot-Mirror/src/renderer/src/components/panels/SetupPanel.tsx`),
// and the rest follows its README.

import type {Region} from '../../camera/Camera';
import {MIRROR_VIEWPORT, mirrorRegions} from '../../app-ui/mirror/mirrorData';
import {connectionRegions, CONNECTION_VIEWPORT} from '../../app-ui/ConnectionPanel';
import type {Step} from '../WalkthroughCopy';
import {cueFrame, type WalkthroughBeat} from '../WalkthroughShell';
import {NARRATION_EDIT} from './mirrorWalkthroughNarration.generated';

/**
 * 30fps. Beat boundaries in frames from the Sec column of the Beats table.
 * Total: 136s = 4080 frames, inside X's 2:20.
 */
export const BEATS = {
  open: {from: 0, duration: 210, layout: 'card' as const},
  proof: {from: 210, duration: 300, layout: 'stage' as const},
  setup: {from: 510, duration: 450, layout: 'chapter' as const},
  debugging: {from: 960, duration: 240, layout: 'chapter' as const},
  connect: {from: 1200, duration: 435, layout: 'chapter' as const},
  frame: {from: 1635, duration: 450, layout: 'chapter' as const},
  paste: {from: 2085, duration: 435, layout: 'chapter' as const},
  capture: {from: 2520, duration: 420, layout: 'chapter' as const},
  apps: {from: 2940, duration: 420, layout: 'chapter' as const},
  files: {from: 3360, duration: 210, layout: 'chapter' as const},
  tools: {from: 3570, duration: 240, layout: 'chapter' as const},
  again: {from: 3810, duration: 135, layout: 'chapter' as const},
  close: {from: 3945, duration: 135, layout: 'card' as const},
} as const;

export type BeatName = keyof typeof BEATS;

export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];

export const MIRROR_WALKTHROUGH_FRAMES = 4080;

/** Mirror's five Setup steps, titled as its Setup panel titles them. */
export const SETUP_STEPS: readonly Step[] = [
  {
    title: 'Install Android platform-tools',
    body: "Open Setup and select Install now. Mirror downloads Google's adb into its own folder.",
  },
  {
    title: 'Start the ADB server',
    body: 'Mirror starts the background process adb uses to talk to devices. Devices then appear on their own.',
  },
  {
    title: 'Turn on USB debugging',
    body: 'On the phone: Settings → About phone → tap Build number seven times. Then Developer options → USB debugging. Plug in with a data cable, not a charge-only one.',
  },
  {
    title: 'Authorise this computer',
    body: 'Unlock the phone. Tick Always allow from this computer, then tap Allow.',
  },
  {
    title: 'Start mirroring',
    body: 'Pick the device in Devices and press Start mirroring.',
  },
];

/** The beats the Setup checklist stays up across, in order. */
export const SETUP_BEATS = ['setup', 'debugging', 'connect'] as const;

/** Spoken cues from the planned narration edit for Mirror walkthrough. */
export const CUE_FRAMES = {
  mirrorWhatMirror: cueFrame(NARRATION_EDIT, 'mirror-what', 'mirror'),
  installAdbInstall: cueFrame(NARRATION_EDIT, 'install-adb', 'install'),
  installAdbManage: cueFrame(NARRATION_EDIT, 'install-adb', 'manage'),
  usbDebugging: cueFrame(NARRATION_EDIT, 'usb-debugging', 'USB'),
  authorize: cueFrame(NARRATION_EDIT, 'authorize', 'authorize'),
  readyReady: cueFrame(NARRATION_EDIT, 'ready', 'ready'),
  readyMirroring: cueFrame(NARRATION_EDIT, 'ready', 'mirroring'),
  pickFramePick: cueFrame(NARRATION_EDIT, 'pick-frame', 'pick'),
  paddingPadding: cueFrame(NARRATION_EDIT, 'padding', 'padding'),
  copyPasteCopying: cueFrame(NARRATION_EDIT, 'copy-paste', 'copying'),
  copyPastePasting: cueFrame(NARRATION_EDIT, 'copy-paste', 'pasting'),
  screenshotScreenshot: cueFrame(NARRATION_EDIT, 'screenshot', 'screenshot'),
  recordVideoRecord: cueFrame(NARRATION_EDIT, 'record-video', 'record'),
  appsApps: cueFrame(NARRATION_EDIT, 'apps', 'apps'),
  appsDelete: cueFrame(NARRATION_EDIT, 'apps', 'delete'),
  filesCopy: cueFrame(NARRATION_EDIT, 'files-copy', 'copy'),
  shellLogsShell: cueFrame(NARRATION_EDIT, 'shell-logs', 'shell'),
  shellLogsLogs: cueFrame(NARRATION_EDIT, 'shell-logs', 'logs'),
  setupAgainSetup: cueFrame(NARRATION_EDIT, 'setup-again', 'setup'),
} as const;

/**
 * Composition frames where the active Setup step changes:
 * - step 1 at setup.from
 * - step 2 at install-adb "manage"
 * - step 3 at debugging.from
 * - step 4 at connect.from and authorize "authorize"
 * - step 5 at ready "mirroring"
 * - all ticked (step 6) once the stage is live
 */
export const SETUP_CHANGES = [
  {from: BEATS.setup.from, step: 1},
  {from: CUE_FRAMES.installAdbManage, step: 2},
  {from: BEATS.debugging.from, step: 3},
  {from: BEATS.connect.from, step: 4},
  {from: CUE_FRAMES.authorize, step: 4},
  {from: CUE_FRAMES.readyMirroring, step: 5},
  {from: CUE_FRAMES.readyMirroring + 8, step: 6},
] as const;

/** The active Setup step at a composition frame, and the frame it became active. */
export const setupStepAt = (frame: number) => {
  let current: (typeof SETUP_CHANGES)[number] = SETUP_CHANGES[0];
  for (const change of SETUP_CHANGES) {
    if (frame >= change.from) current = change;
  }
  return {step: current.step, since: current.from};
};

export type BeatCopyData = {
  eyebrow?: string;
  headline?: string;
  title?: string;
  body: string;
};

/** Copy for every beat verbatim from the Copy table in videos/mirror-walkthrough.md. */
export const COPY: Record<BeatName, BeatCopyData> = {
  open: {
    eyebrow: 'For Windows and Android',
    headline: 'CTRLbot Mirror',
    body: 'Control your Android phone or tablet from your Windows PC.',
  },
  proof: {
    eyebrow: 'Control',
    title: 'Your phone, under your mouse',
    body: 'Click, type and paste on the device from your PC.',
  },
  setup: {
    eyebrow: 'Setup · 1 of 5',
    title: 'Install Android platform-tools',
    body: '',
  },
  debugging: {
    eyebrow: 'Setup · 3 of 5',
    title: 'Turn on USB debugging',
    body: 'On the phone: Settings → About phone → tap Build number seven times, then Developer options → USB debugging. Use a data cable.',
  },
  connect: {
    eyebrow: 'Setup · 4 of 5',
    title: 'Authorise this computer',
    body: '',
  },
  frame: {
    eyebrow: 'Studio',
    title: 'Frame it for the camera',
    body: '',
  },
  paste: {
    eyebrow: 'Control',
    title: 'Paste from Windows',
    body: '',
  },
  capture: {
    eyebrow: 'Capture',
    title: 'Screenshots and recordings',
    body: "Recordings include your PC microphone, never the phone's audio.",
  },
  apps: {
    eyebrow: 'Apps',
    title: 'See and remove apps',
    body: '',
  },
  files: {
    eyebrow: 'Files',
    title: 'Copy files over',
    body: '',
  },
  tools: {
    eyebrow: 'Tools',
    title: 'Shell and logcat',
    body: '',
  },
  again: {
    eyebrow: 'Setup',
    title: 'Back to Setup any time',
    body: '',
  },
  close: {
    headline: 'CTRLbot Mirror',
    body: 'Your phone or tablet, from your PC.',
  },
};

const hostFieldBase = connectionRegions('tablet').hostField;
const screenReg = mirrorRegions.mirroredScreen(
  {width: CONNECTION_VIEWPORT.tablet.width, height: CONNECTION_VIEWPORT.tablet.height},
  'none',
);
export const PASTE_HOST_REGION: Region = {
  x: Math.round(screenReg.x + hostFieldBase.x * screenReg.scale - 20),
  y: Math.round(screenReg.y + hostFieldBase.y * screenReg.scale - 20),
  width: Math.round(hostFieldBase.width * screenReg.scale + 40),
  height: Math.round(hostFieldBase.height * screenReg.scale + 40),
};

/** Regions for each beat from the Shot list and mirrorRegions. */
export const BEAT_REGIONS: Record<string, Region | Region[]> = {
  proof: [mirrorRegions.stage, mirrorRegions.mirroredScreen()],
  setup: mirrorRegions.sidePanel,
  debugging: [mirrorRegions.sidePanel, mirrorRegions.setupStep(3)],
  connect: [mirrorRegions.setupStep(4), mirrorRegions.devicesCard, mirrorRegions.stage],
  frame: [mirrorRegions.studioFrames, mirrorRegions.stage],
  paste: [mirrorRegions.mirroredScreen(), PASTE_HOST_REGION],
  capture: {x: 404, y: 32, width: 1196, height: 908},
  apps: [mirrorRegions.sidePanel, {x: 64, y: 440, width: 340, height: 200}],
  files: [{x: 64, y: 32, width: 600, height: 908}, mirrorRegions.sidePanel],
  tools: [{x: 64, y: 32, width: 340, height: 450}, mirrorRegions.sidePanel],
  again: [mirrorRegions.sidePanel, {x: 0, y: 32, width: 404, height: 908}],
};

/**
 * 13 beats configured for WalkthroughShell.
 */
export const WALKTHROUGH_BEATS: WalkthroughBeat[] = [
  {
    id: 'open',
    from: BEATS.open.from,
    duration: BEATS.open.duration,
    layout: 'card',
    card: {
      lockup: 'CTRLbot Mirror',
      eyebrow: 'For Windows and Android',
      line: 'Control your Android phone or tablet from your Windows PC.',
    },
  },
  {
    id: 'proof',
    from: BEATS.proof.from,
    duration: BEATS.proof.duration,
    layout: 'stage',
    copy: COPY.proof,
    regions: BEAT_REGIONS.proof,
  },
  {
    id: 'setup',
    from: BEATS.setup.from,
    duration: BEATS.setup.duration,
    layout: 'chapter',
    copy: COPY.setup,
    calloutSide: 'right',
    regions: BEAT_REGIONS.setup,
  },
  {
    id: 'debugging',
    from: BEATS.debugging.from,
    duration: BEATS.debugging.duration,
    layout: 'chapter',
    copy: COPY.debugging,
    calloutSide: 'right',
    regions: BEAT_REGIONS.debugging,
  },
  {
    id: 'connect',
    from: BEATS.connect.from,
    duration: BEATS.connect.duration,
    layout: 'chapter',
    copy: COPY.connect,
    calloutSide: 'right',
    regions: BEAT_REGIONS.connect,
  },
  {
    id: 'frame',
    from: BEATS.frame.from,
    duration: BEATS.frame.duration,
    layout: 'chapter',
    copy: COPY.frame,
    calloutSide: 'right',
    regions: BEAT_REGIONS.frame,
  },
  {
    id: 'paste',
    from: BEATS.paste.from,
    duration: BEATS.paste.duration,
    layout: 'chapter',
    copy: COPY.paste,
    calloutSide: 'left',
    regions: BEAT_REGIONS.paste,
  },
  {
    id: 'capture',
    from: BEATS.capture.from,
    duration: BEATS.capture.duration,
    layout: 'chapter',
    copy: COPY.capture,
    calloutSide: 'left',
    regions: BEAT_REGIONS.capture,
  },
  {
    id: 'apps',
    from: BEATS.apps.from,
    duration: BEATS.apps.duration,
    layout: 'chapter',
    copy: COPY.apps,
    calloutSide: 'right',
    regions: BEAT_REGIONS.apps,
  },
  {
    id: 'files',
    from: BEATS.files.from,
    duration: BEATS.files.duration,
    layout: 'chapter',
    copy: COPY.files,
    calloutSide: 'right',
    regions: BEAT_REGIONS.files,
  },
  {
    id: 'tools',
    from: BEATS.tools.from,
    duration: BEATS.tools.duration,
    layout: 'chapter',
    copy: COPY.tools,
    calloutSide: 'right',
    regions: BEAT_REGIONS.tools,
  },
  {
    id: 'again',
    from: BEATS.again.from,
    duration: BEATS.again.duration,
    layout: 'chapter',
    copy: COPY.again,
    calloutSide: 'right',
    regions: BEAT_REGIONS.again,
  },
  {
    id: 'close',
    from: BEATS.close.from,
    duration: BEATS.close.duration,
    layout: 'card',
    card: {
      lockup: 'CTRLbot Mirror',
      line: 'Your phone or tablet, from your PC.',
    },
  },
];
