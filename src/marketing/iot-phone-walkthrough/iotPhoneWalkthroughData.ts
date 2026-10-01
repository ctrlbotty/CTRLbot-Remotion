// Beat timings, copy, camera and subjects for the CTRLbot IoT phone walkthrough.
//
// Source: `videos/iot-phone-walkthrough.md`, built from Nathan's recording
// `video input/CTRLbot-IoT Phone Walkthrough v1.0.9.mp4` (6:58). One set of beats drives both shapes,
// landscape and portrait, so both cuts say the same thing at the same moment.

import type {Shot} from '../../camera/Camera';
import {PHONE_VIEWPORT} from '../../app-ui/viewports';

/**
 * 30fps. Beat boundaries in frames. Total: 333s = 9990 frames.
 *
 * Each beat is sized to the narration it carries (iotPhoneWalkthroughNarration.ts), plus
 * room to read its copy.
 */
export const BEATS = {
  open: {from: 0, duration: 330},
  'first-run': {from: 330, duration: 495},
  ai: {from: 825, duration: 555},
  database: {from: 1380, duration: 750},
  epson: {from: 2130, duration: 450},
  add: {from: 2580, duration: 285},
  terminal: {from: 2865, duration: 465},
  test: {from: 3330, duration: 600},
  activities: {from: 3930, duration: 600},
  'switch-audio': {from: 4530, duration: 525},
  eui: {from: 5055, duration: 765},
  exit: {from: 5820, duration: 270},
  discovery: {from: 6090, duration: 555},
  'matrox-add': {from: 6645, duration: 855},
  'matrox-test': {from: 7500, duration: 555},
  'matrox-switch': {from: 8055, duration: 510},
  m2m: {from: 8565, duration: 795},
  settings: {from: 9360, duration: 450},
  close: {from: 9810, duration: 180},
} as const;

export type BeatName = keyof typeof BEATS;

export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];

export const IOT_PHONE_WALKTHROUGH_FRAMES = 9990;

export type BeatCopy = {eyebrow?: string; headline?: string; title?: string; body: string};

/** Copy for each beat from the brief's Copy table. */
export const COPY: Record<BeatName, BeatCopy> = {
  open: {
    headline: 'CTRLbot IoT',
    body: 'Room control from an Android phone or tablet. No processor, no laptop, no extra software.',
  },
  'first-run': {
    eyebrow: 'First run',
    title: 'A short tour to start',
    body: 'The app opens with a walkthrough of setup. Close it any time, and open it again from Settings.',
  },
  ai: {
    eyebrow: 'CTRLbot AI',
    title: 'A manual that answers back',
    body: 'Ask about setup, control or a problem in the room, and it walks you through it.',
  },
  database: {
    eyebrow: 'Device',
    title: 'Start with a driver',
    body: 'Dozens of manufacturers, hundreds of models and thousands of tested commands, over IP or through an end point to RS-232 and IR.',
  },
  epson: {
    eyebrow: 'Device',
    title: 'Everything about the device',
    body: 'Pick a model to see its information, specs, setup and support, with links to the product and manufacturer pages.',
  },
  add: {
    eyebrow: 'Connect',
    title: 'Add it and connect',
    body: 'Press + to add the device, enter its IP address and connect. The connection saves itself.',
  },
  terminal: {
    eyebrow: 'Connect',
    title: 'Test every command',
    body: 'Send any command and the terminal shows what went out and what came back. Or type your own.',
  },
  test: {
    eyebrow: 'Connect',
    title: 'Test it as a remote',
    body: "Buttons, switcher, terminal and the device's own web page, all from the connection you just made.",
  },
  activities: {
    eyebrow: 'Activities',
    title: 'The room builds itself',
    body: "Activities set what the end user sees. Power On already holds the Epson's power-on command.",
  },
  'switch-audio': {
    eyebrow: 'Activities',
    title: 'Switching and audio, done for you',
    body: 'With no other switcher added, the Epson is the switcher, and audio follows. Customise it, or go straight to the room.',
  },
  eui: {
    eyebrow: 'End user interface',
    title: 'The room, for whoever walks in',
    body: 'Turn it on, pick a source for the screen, set the volume, and power it all off again.',
  },
  exit: {
    eyebrow: 'End user interface',
    title: 'Hold to get back to setup',
    body: 'Press and hold the setup button for two seconds. A tap does nothing, so nobody leaves setup open by accident.',
  },
  discovery: {
    eyebrow: 'Find Devices',
    title: "Find what's on the network",
    body: "Find Devices scans the network and matches each device it finds to a driver in the library.",
  },
  'matrox-add': {
    eyebrow: 'Find Devices',
    title: 'Add a whole system at once',
    body: 'Add Matrox IPMX encoders and decoders and the app connects, verifies and saves each one. It asks if a device needs a certificate approved or a login.',
  },
  'matrox-test': {
    eyebrow: 'Connect',
    title: 'Test the whole system',
    body: 'Select the Matrox system to test it as one switcher, or pick any single encoder or decoder.',
  },
  'matrox-switch': {
    eyebrow: 'Activities',
    title: 'Encoders and decoders',
    body: 'Set the switch type to AV-over-IP encoders and decoders. Change any icon or label here.',
  },
  m2m: {
    eyebrow: 'End user interface',
    title: 'Many to many',
    body: 'Pick a source, then a display. Or drag a source onto a display. All sends one source to every display.',
  },
  settings: {
    eyebrow: 'Settings',
    title: 'Help is built in',
    body: 'The user manual, the quick start and a factory reset, all on the Settings page.',
  },
  close: {
    headline: 'CTRLbot IoT',
    body: 'Set up the room, then hand it over.',
  },
};

export type PhoneSubject = 'top' | 'middle' | 'bottom';

/** Where each beat pushes: top, middle, or bottom third of the phone. */
export const SUBJECT: Record<BeatName, PhoneSubject> = {
  open: 'middle',
  'first-run': 'middle',
  ai: 'middle',
  database: 'top',
  epson: 'top',
  add: 'middle',
  terminal: 'middle',
  test: 'top',
  activities: 'middle',
  'switch-audio': 'middle',
  eui: 'middle',
  exit: 'top',
  discovery: 'top',
  'matrox-add': 'middle',
  'matrox-test': 'middle',
  'matrox-switch': 'top',
  m2m: 'middle',
  settings: 'top',
  close: 'middle',
};

/**
 * The camera: every beat opens on the whole phone, pushes in to its subject by mid-beat,
 * and is back on the whole phone as the beat ends, so every cut lands wide.
 */
export const beatShots = (push = 0.62, viewport = PHONE_VIEWPORT): Shot[] => {
  const wide = 1.04;
  const w = viewport.width * push;
  const h = viewport.height * push;
  const region = (subject: PhoneSubject) => {
    let y = (viewport.height - h) / 2;
    if (subject === 'top') {
      y = 0;
    } else if (subject === 'bottom') {
      y = viewport.height - h;
    }
    return {
      x: (viewport.width - w) / 2,
      y,
      width: w,
      height: h,
    };
  };
  const whole = {
    x: (viewport.width * (1 - wide)) / 2,
    y: (viewport.height * (1 - wide)) / 2,
    width: viewport.width * wide,
    height: viewport.height * wide,
  };
  return BEAT_NAMES.flatMap((name) => {
    const {from, duration} = BEATS[name];
    if (name === 'open') {
      return [
        {at: from, region: whole},
        {at: from + duration - 1, region: whole},
      ];
    }
    return [
      {at: from, region: whole},
      {at: from + Math.round(duration / 2), region: region(SUBJECT[name])},
      {at: from + duration - 1, region: whole},
    ];
  });
};
