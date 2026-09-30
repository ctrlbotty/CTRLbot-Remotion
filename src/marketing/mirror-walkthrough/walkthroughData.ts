// Beat timings, copy and data for the CTRLbot Mirror walkthrough.
//
// Source: `videos/archive/2026-09-30-mirror-walkthrough.md`, built from Nathan's recording
// `video input/CTRLbot Mirror Tutorial.mp4` (8:29). One set of beats drives both shapes,
// landscape and portrait, so both cuts say the same thing at the same moment.
//
// Every line of copy is checked against Mirror itself: the Setup steps are its own panel's
// titles and hints (`CTRLbot-Mirror/src/renderer/src/components/panels/SetupPanel.tsx`),
// and the rest follows its README.

import type {Shot} from '../../camera/Camera';
import {MIRROR_VIEWPORT} from '../../app-ui/mirror/mirrorData';
import type {Step} from '../WalkthroughCopy';

/**
 * 30fps. Beat boundaries in frames. Total: 133s = 3990 frames, inside X's 2:20.
 *
 * Each beat is sized to the narration it carries (mirrorWalkthroughNarration.ts), plus
 * room to read its copy.
 */
export const BEATS = {
  open: {from: 0, duration: 480},
  setup: {from: 480, duration: 435},
  debugging: {from: 915, duration: 240},
  connect: {from: 1155, duration: 420},
  frame: {from: 1575, duration: 435},
  paste: {from: 2010, duration: 420},
  capture: {from: 2430, duration: 405},
  apps: {from: 2835, duration: 405},
  files: {from: 3240, duration: 255},
  tools: {from: 3495, duration: 225},
  close: {from: 3720, duration: 270},
} as const;

export type BeatName = keyof typeof BEATS;

export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];

export const MIRROR_WALKTHROUGH_FRAMES = 3990;

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

/**
 * Composition frames where the active Setup step changes. The copy's checklist and the
 * Setup panel on the stage both read this, so they tick at the same frame. Step 6 means
 * every step is done.
 */
const SETUP_CHANGES = [
  {from: BEATS.setup.from, step: 1},
  {from: BEATS.setup.from + 240, step: 2},
  {from: BEATS.debugging.from, step: 3},
  {from: BEATS.connect.from, step: 4},
  {from: BEATS.connect.from + 170, step: 5},
  {from: BEATS.connect.from + 365, step: 6},
] as const;

/** The active Setup step at a composition frame, and the frame it became active. */
export const setupStepAt = (frame: number) => {
  let current: (typeof SETUP_CHANGES)[number] = SETUP_CHANGES[0];
  for (const change of SETUP_CHANGES) if (frame >= change.from) current = change;
  return {step: current.step, since: current.from};
};

/** Copy for every beat but the three the Setup checklist covers. */
export const COPY: Record<Exclude<BeatName, (typeof SETUP_BEATS)[number]>, {eyebrow?: string; headline?: string; title?: string; body: string}> = {
  open: {
    headline: 'CTRLbot Mirror',
    body: 'Control your Android phone or tablet from your Windows PC, with your mouse, keyboard and clipboard.',
  },
  frame: {
    eyebrow: 'Studio',
    title: 'Frame it for the camera',
    body: 'Pick a device frame, then set the backdrop, padding and shadow. Screenshots and recordings keep the framing.',
  },
  paste: {
    eyebrow: 'Control',
    title: 'Click, type and paste',
    body: 'Your mouse taps and scrolls, your keyboard types, and Ctrl+V pastes from Windows. Here, a projector address goes straight into CTRLbot IoT.',
  },
  capture: {
    eyebrow: 'Capture',
    title: 'Screenshots and recordings',
    body: "Screenshots save at 1×, 2× or 3×. Recordings include your PC microphone, never the phone's audio. Both go to Pictures\\CTRLbot Mirror.",
  },
  apps: {
    eyebrow: 'Apps',
    title: 'Manage the apps',
    body: "See every app on the device, install an APK, or uninstall the ones you don't need.",
  },
  files: {
    eyebrow: 'Files',
    title: 'Move files',
    body: "Browse the device's storage. Drag files from Windows onto the drop area to copy them over, or use Save to PC to bring one back.",
  },
  tools: {
    eyebrow: 'Tools',
    title: 'Shell and logcat',
    body: 'Run a shell command on the device, or stream its log and filter it by priority.',
  },
  close: {
    headline: 'CTRLbot Mirror',
    body: "Setup is one click away whenever a device won't connect.",
  },
};

/** Where each beat pushes: the panel side (sidebar, panel, and the stage's left) or the stage. */
const SUBJECT: Record<BeatName, 'panel' | 'stage' | 'toolbar'> = {
  open: 'stage',
  setup: 'panel',
  debugging: 'panel',
  connect: 'panel',
  frame: 'panel',
  paste: 'stage',
  capture: 'toolbar',
  apps: 'panel',
  files: 'panel',
  tools: 'panel',
  close: 'panel',
};

/**
 * The camera: every beat opens on the whole window, pushes in to its subject by mid-beat,
 * and is back on the whole window as the beat ends, so every cut lands wide.
 *
 * A single slow drift across the cut measured 89% inert against the 60% ceiling — every
 * beat between 80% and 95%, because Mirror's state changes are small in a 1021px panel.
 * What reads as change is frame-wide motion, so each beat carries its own push. The
 * push crops the window's far edges while it is in; the wide shots at both ends of
 * every beat show the whole window. The portrait panel is the same shape, so both
 * formats use the same shots.
 */
export const beatShots = (push = 0.88, viewport = MIRROR_VIEWPORT): Shot[] => {
  const wide = 1.04;
  const w = viewport.width * push;
  const h = viewport.height * push;
  const region = (subject: 'panel' | 'stage' | 'toolbar') => ({
    x: subject === 'panel' ? 0 : viewport.width - w,
    y: subject === 'panel' ? 0 : subject === 'toolbar' ? viewport.height - h : (viewport.height - h) / 2,
    width: w,
    height: h,
  });
  const whole = {
    x: (viewport.width * (1 - wide)) / 2,
    y: (viewport.height * (1 - wide)) / 2,
    width: viewport.width * wide,
    height: viewport.height * wide,
  };
  return BEAT_NAMES.flatMap((name) => {
    const {from, duration} = BEATS[name];
    return [
      {at: from, region: whole},
      {at: from + Math.round(duration / 2), region: region(SUBJECT[name])},
      {at: from + duration - 1, region: whole},
    ];
  });
};
