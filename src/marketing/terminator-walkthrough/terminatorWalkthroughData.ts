// Beat timings, copy, camera and subjects for the CTRLbot Terminator walkthrough.
//
// Source: `videos/terminator-walkthrough.md`, built from Nathan's recording
// `video input/CTRLbot Terminatior Tutorial.mp4` (8:39). One set of beats drives both shapes,
// landscape and portrait, so both cuts say the same thing at the same moment.
//
// Every line of copy is checked against Terminator itself and its README.

import type {Shot} from '../../camera/Camera';
import {TERM_VIEWPORT} from '../../app-ui/term/termData';

/**
 * 30fps. Beat boundaries in frames. Total: 127.5s = 3825 frames, inside X's 2:20.
 *
 * Each beat is sized to the narration it carries (terminatorWalkthroughNarration.ts), plus
 * room to read its copy.
 */
export const BEATS = {
  open: {from: 0, duration: 495},
  scan: {from: 495, duration: 525},
  server: {from: 1020, duration: 570},
  pin: {from: 1590, duration: 315},
  'raw-tcp': {from: 1905, duration: 525},
  serial: {from: 2430, duration: 495},
  ssh: {from: 2925, duration: 435},
  close: {from: 3360, duration: 465},
} as const;

export type BeatName = keyof typeof BEATS;

export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];

export const TERMINATOR_WALKTHROUGH_FRAMES = 3825;

export type BeatCopy = {eyebrow?: string; headline?: string; title?: string; body: string};

/** Copy for each beat from the brief's Copy table. */
export const COPY: Record<BeatName, BeatCopy> = {
  open: {
    headline: 'CTRLbot Terminator',
    body: 'Scan the network, run a test server, and talk to devices over TCP, serial and SSH, from one PC app.',
  },
  scan: {
    eyebrow: 'Scan',
    title: "Find what's on the network",
    body: "Pick a network adapter and scan its subnet. Every device shows its host name, device name, manufacturer, IP and MAC, with links to any web page it serves.",
  },
  server: {
    eyebrow: 'TCP server',
    title: 'Test against a server on your PC',
    body: 'Start a TCP server on any port. Point CTRLbot IoT at it, and every command it sends shows up here. You can answer back.',
  },
  pin: {
    eyebrow: 'Saved',
    title: 'Pin a connection',
    body: 'Pinned tabs come back the next time you open Terminator.',
  },
  'raw-tcp': {
    eyebrow: 'Raw TCP (Telnet)',
    title: 'Talk to a device directly',
    body: "Connect to a device's control port and send commands as text or hex. Verbose CRLF shows every line ending it sends back.",
  },
  serial: {
    eyebrow: 'Serial (COM)',
    title: 'Open a COM port',
    body: 'Any COM port on the PC, USB adapters included. Baud from 9600 to 115200, 7 or 8 data bits, parity and flow control.',
  },
  ssh: {
    eyebrow: 'SSH',
    title: 'Log in over SSH',
    body: "Open a device's command line from the same app. Here, a Luxul switch.",
  },
  close: {
    headline: 'CTRLbot Terminator',
    body: 'Scan, serve and connect from one PC app.',
  },
};

export type TermSubject = 'nav' | 'tabs' | 'session';

/** Where each beat pushes: nav (left), tabs (top-right), or session (right). */
const SUBJECT: Record<BeatName, TermSubject> = {
  open: 'nav',
  scan: 'session',
  server: 'session',
  pin: 'tabs',
  'raw-tcp': 'session',
  serial: 'session',
  ssh: 'session',
  close: 'nav',
};

/**
 * The camera: every beat opens on the whole window, pushes in to its subject by mid-beat,
 * and is back on the whole window as the beat ends, so every cut lands wide.
 *
 * `open` and `close` push toward the nav column (left), `pin` toward the tab strip (top-right),
 * and the rest toward the session (right).
 */
export const beatShots = (push = 0.88, viewport = TERM_VIEWPORT): Shot[] => {
  const wide = 1.04;
  const w = viewport.width * push;
  const h = viewport.height * push;
  const region = (subject: TermSubject) => ({
    x: subject === 'nav' ? 0 : viewport.width - w,
    y: subject === 'tabs' ? 0 : (viewport.height - h) / 2,
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
