// Beat timings, copy and data for the CTRLbot Mirror walkthrough.
//
// Source: `videos/mirror-walkthrough.md`, transcribed from Nathan's recording
// `video input/CTRLbot Mirror Tutorial.mp4` (8:29).

import type {Shot} from '../../camera/Camera';
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
 * every beat show the whole window.
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
