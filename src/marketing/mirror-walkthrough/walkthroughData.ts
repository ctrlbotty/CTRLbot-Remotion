// Beat timings, copy and data for the CTRLbot Mirror walkthrough.
//
// Source: `videos/mirror-walkthrough.md`, transcribed from Nathan's recording
// `video input/CTRLbot Mirror Tutorial.mp4` (8:29).

import type {Shot} from '../../camera/Camera';
import {fullFrame} from '../../camera/Camera';
import {MIRROR_VIEWPORT} from '../../app-ui/mirror/mirrorData';

/**
 * 30fps. Beat boundaries in frames. Total duration: 148s = 4440 frames.
 *
 * Each beat is sized to the narration it carries.
 */
export const BEATS = {
  open: {from: 0, duration: 480},
  setup: {from: 480, duration: 420},
  debugging: {from: 900, duration: 390},
  connect: {from: 1290, duration: 420},
  frame: {from: 1710, duration: 420},
  paste: {from: 2130, duration: 420},
  capture: {from: 2550, duration: 480},
  apps: {from: 3030, duration: 450},
  files: {from: 3480, duration: 330},
  tools: {from: 3810, duration: 270},
  close: {from: 4080, duration: 360},
} as const;

export type BeatName = keyof typeof BEATS;

export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];

export const MIRROR_WALKTHROUGH_FRAMES = 4440;

/**
 * The copy column: one eyebrow and one line per beat, exactly matching the brief.
 */
export const COPY: Record<BeatName, {eyebrow: string; title: string; line: string}> = {
  open: {
    eyebrow: 'CTRLBOT MIRROR',
    title: 'Your Android screen, on your PC.',
    line: 'Your Android screen, on your PC.',
  },
  setup: {
    eyebrow: 'SETUP',
    title: "It installs Android's tools for you.",
    line: "It installs Android's tools for you.",
  },
  debugging: {
    eyebrow: 'USB OR WI-FI',
    title: 'Turn on USB debugging, or pair with a code.',
    line: 'Turn on USB debugging, or pair with a code.',
  },
  connect: {
    eyebrow: 'CONNECT',
    title: "Allow it once. Then it's ready.",
    line: "Allow it once. Then it's ready.",
  },
  frame: {
    eyebrow: 'STUDIO',
    title: 'Pick a frame that fits the device.',
    line: 'Pick a frame that fits the device.',
  },
  paste: {
    eyebrow: 'CONTROL',
    title: 'Paste from your PC into the app.',
    line: 'Paste from your PC into the app.',
  },
  capture: {
    eyebrow: 'CAPTURE',
    title: 'Screenshots, and video with your voice.',
    line: 'Screenshots, and video with your voice.',
  },
  apps: {
    eyebrow: 'APPS',
    title: "See every app. Uninstall what you don't need.",
    line: "See every app. Uninstall what you don't need.",
  },
  files: {
    eyebrow: 'FILES',
    title: 'Drop files onto the device.',
    line: 'Drop files onto the device.',
  },
  tools: {
    eyebrow: 'TOOLS',
    title: 'A shell and the device log, built in.',
    line: 'A shell and the device log, built in.',
  },
  close: {
    eyebrow: '',
    title: 'Back to Setup whenever you need it.',
    line: 'Back to Setup whenever you need it.',
  },
};

/**
 * Continuous gentle camera drift over the mirror viewport.
 * Starts at full frame (1.0) and drifts smoothly to target (0.94) at duration.
 * Keeps inert-fraction under 0.6 while keeping opens-composed holding.
 */
export const drift = (
  viewport: {width: number; height: number} = MIRROR_VIEWPORT,
  duration: number = MIRROR_WALKTHROUGH_FRAMES,
  target = 0.94,
): Shot[] => [
  {at: 0, region: fullFrame(viewport)},
  {
    at: duration,
    region: {
      x: (viewport.width * (1 - target)) / 2,
      y: (viewport.height * (1 - target)) / 2,
      width: viewport.width * target,
      height: viewport.height * target,
    },
  },
];
