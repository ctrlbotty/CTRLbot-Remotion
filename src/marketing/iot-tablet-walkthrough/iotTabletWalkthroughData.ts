// Beat timings, copy, camera and subjects for the CTRLbot IoT tablet walkthrough.
//
// Source: `videos/iot-tablet-walkthrough.md`, built from Nathan's recording
// `video input/CTRLbot-IoT Tablet Walkthrough v1.0.9.mp4` (7:08). One set of beats drives both shapes,
// landscape and portrait, so both cuts say the same thing at the same moment.

import type {Shot} from '../../camera/Camera';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';

/**
 * 30fps. Beat boundaries in frames. Total: 340s = 10200 frames.
 *
 * Sized from the Beats table in `videos/iot-tablet-walkthrough.md`.
 */
export const BEATS = {
  open: {from: 0, duration: 330},
  'first-run': {from: 330, duration: 405},
  ai: {from: 735, duration: 615},
  database: {from: 1350, duration: 690},
  epson: {from: 2040, duration: 705},
  add: {from: 2745, duration: 465},
  terminal: {from: 3210, duration: 180},
  test: {from: 3390, duration: 840},
  activities: {from: 4230, duration: 570},
  'switch-audio': {from: 4800, duration: 480},
  eui: {from: 5280, duration: 735},
  exit: {from: 6015, duration: 240},
  discovery: {from: 6255, duration: 600},
  'matrox-add': {from: 6855, duration: 915},
  'matrox-test': {from: 7770, duration: 210},
  'matrox-switch': {from: 7980, duration: 705},
  m2m: {from: 8685, duration: 735},
  settings: {from: 9420, duration: 630},
  close: {from: 10050, duration: 150},
} as const;

export type BeatName = keyof typeof BEATS;

export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];

export const IOT_TABLET_WALKTHROUGH_FRAMES = 10200;

export type BeatCopy = {eyebrow?: string; headline?: string; title?: string; body: string};

/** Copy for each beat verbatim from the brief's Copy table. */
export const COPY: Record<BeatName, BeatCopy> = {
  open: {
    headline: 'CTRLbot IoT',
    body: 'Room control from an Android phone or tablet. No processor, no laptop, no extra software.',
  },
  'first-run': {
    eyebrow: 'First run',
    title: 'A short tour to start',
    body: 'The app opens with a walkthrough of setup. Close it any time, and open it again from Settings → Quick Start.',
  },
  ai: {
    eyebrow: 'CTRLbot AI',
    title: 'A living manual',
    body: 'Ask anything about the app or how to set it up, and it answers, or helps you troubleshoot.',
  },
  database: {
    eyebrow: 'Device',
    title: 'Start with a driver',
    body: 'Dozens of manufacturers, hundreds of models and thousands of tested commands. RS-232 and IR go through an end point. Sort by type to find yours.',
  },
  epson: {
    eyebrow: 'Device',
    title: 'Everything about the device',
    body: 'Pick a model to see its information and everything the connection needs, with links to the manufacturer and product pages.',
  },
  add: {
    eyebrow: 'Connect',
    title: 'Add it and connect',
    body: 'Press + to add the device, enter its IP address and connect. The connection saves itself: there is no save button.',
  },
  terminal: {
    eyebrow: 'Connect',
    title: 'Test the commands',
    body: 'Send any command and watch it land in the terminal.',
  },
  test: {
    eyebrow: 'Connect',
    title: 'Test it as a remote',
    body: 'Every device you add is listed here. Test it as a switcher, talk to it in the terminal, or open its own web page.',
  },
  activities: {
    eyebrow: 'Activities',
    title: 'The room builds itself',
    body: 'Activities form themselves from your devices. Customise them any way you want.',
  },
  'switch-audio': {
    eyebrow: 'Activities',
    title: 'Power, switching and audio',
    body: "The projector's power presets are already made, the Epson is the switcher, and its audio is mapped for the end user.",
  },
  eui: {
    eyebrow: 'End user interface',
    title: 'Locked down for the end user',
    body: 'Open the end user interface to hand the room over, and test it as the technician: switch, change the volume, mute, power down.',
  },
  exit: {
    eyebrow: 'End user interface',
    title: 'Hold to get back to setup',
    body: 'Press and hold the setup button for two seconds. A tap does nothing, so nobody leaves setup open by accident.',
  },
  discovery: {
    eyebrow: 'Find Devices',
    title: "Find what's on the network",
    body: 'Find Devices scans the whole network and matches what it finds to drivers in the database.',
  },
  'matrox-add': {
    eyebrow: 'Find Devices',
    title: 'Add a whole system at once',
    body: 'Matrox ConvertIP encoders and decoders use IPMX. One click adds each, and a login or certificate to approve pops up for you.',
  },
  'matrox-test': {
    eyebrow: 'Connect',
    title: 'Test each encoder and decoder',
    body: 'Open the system to reach any single encoder or decoder, or switch and test it here.',
  },
  'matrox-switch': {
    eyebrow: 'Activities',
    title: 'Encoders and decoders',
    body: 'Set the switcher to encoders and decoders. Audio and power stay on the display.',
  },
  m2m: {
    eyebrow: 'End user interface',
    title: 'Many to many',
    body: 'One press on a source, one on a display. Or press, hold and drag it over. All sends one source everywhere.',
  },
  settings: {
    eyebrow: 'Settings',
    title: 'Help is built in',
    body: 'The full user manual, the quick start, a factory reset and a database update, all on the Settings page.',
  },
  close: {
    headline: 'CTRLbot IoT',
    body: 'Set up the room, then hand it over.',
  },
};

export type TabletSubject = 'rail' | 'list' | 'pane' | 'content' | 'bar';

/** Where each beat pushes on the 1280x800 surface: rail, list, pane, content, or bar. */
export const SUBJECT: Record<BeatName, TabletSubject> = {
  open: 'content',
  'first-run': 'content',
  ai: 'content',
  database: 'list',
  epson: 'pane',
  add: 'pane',
  terminal: 'pane',
  test: 'pane',
  activities: 'content',
  'switch-audio': 'content',
  eui: 'content',
  exit: 'bar',
  discovery: 'content',
  'matrox-add': 'content',
  'matrox-test': 'pane',
  'matrox-switch': 'content',
  m2m: 'content',
  settings: 'content',
  close: 'content',
};

/**
 * The camera: every beat opens on the whole surface (1.04 wide), pushes in to 0.8
 * on its subject by mid-beat, and returns wide as the beat ends.
 */
export const beatShots = (push = 0.8, viewport = TABLET_VIEWPORT): Shot[] => {
  const wide = 1.04;
  const w = viewport.width * push;
  const h = viewport.height * push;
  const region = (subject: TabletSubject) => {
    let x = (viewport.width - w) / 2;
    let y = (viewport.height - h) / 2;
    if (subject === 'rail') {
      x = 0;
    } else if (subject === 'list') {
      x = 100;
    } else if (subject === 'pane') {
      x = viewport.width - w;
    } else if (subject === 'bar') {
      x = 0;
      y = 0;
    }
    return {
      x,
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
