// Revision 2: one 138-second timeline for both shapes, timed to the edited narration.
import {fullFrame, padRegion, type Region, type Shot} from '../../camera/Camera';
import {TERM_VIEWPORT, termRegions} from '../../app-ui/term/termData';
import {cueFrame, type BeatCopy, type WalkthroughBeat} from '../WalkthroughShell';
import {TERMINATOR_WALKTHROUGH_EDIT} from './terminatorWalkthroughNarration.generated';

export const BEATS = {
  open: {from: 0, duration: 195, layout: 'card'},
  proof: {from: 195, duration: 300, layout: 'stage'},
  scan: {from: 495, duration: 525, layout: 'chapter'},
  server: {from: 1020, duration: 690, layout: 'chapter'},
  pin: {from: 1710, duration: 480, layout: 'chapter'},
  'raw-tcp': {from: 2190, duration: 525, layout: 'chapter'},
  serial: {from: 2715, duration: 495, layout: 'chapter'},
  ssh: {from: 3210, duration: 435, layout: 'chapter'},
  recap: {from: 3645, duration: 390, layout: 'stage'},
  close: {from: 4035, duration: 105, layout: 'card'},
} as const;
export type BeatName = keyof typeof BEATS;
export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];
export const TERMINATOR_WALKTHROUGH_FRAMES = 4140;

export const COPY: Record<BeatName, BeatCopy> = {
  open: {eyebrow: 'For Windows', headline: 'CTRLbot Terminator', body: 'Scan the network, run a test server, and talk to devices from one PC app.'},
  proof: {eyebrow: 'One app', title: 'Every tool in one window', body: 'Scan, TCP server, raw TCP, serial and SSH.'},
  scan: {eyebrow: 'Scan', title: "Find what's on the network"},
  server: {eyebrow: 'TCP server', title: 'Test against a server on your PC'},
  pin: {eyebrow: 'Saved', title: 'Pin a connection'},
  'raw-tcp': {eyebrow: 'Raw TCP (Telnet)', title: 'Talk to a device directly'},
  serial: {eyebrow: 'Serial (COM)', title: 'Open a COM port', body: 'Baud from 9600 to 115200, 7 or 8 data bits, parity and flow control.'},
  ssh: {eyebrow: 'SSH', title: 'Log in over SSH', body: 'Here, a Luxul switch.'},
  recap: {title: 'Scan, serve and connect'},
  close: {headline: 'CTRLbot Terminator', body: 'Scan, serve and connect from one PC app.'},
};

// Absolute composition frames; beat shot times below subtract the beat's start.
export const CUE_FRAMES = {
  terminal: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'terminal-app', 'terminal'),
  host: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'scan-info', 'host'),
  mac: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'scan-info', 'MAC'),
  links: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'scan-links', 'links'),
  ctrlbot: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'server-test', 'CTRLbot'),
  connected: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'server-connected', 'connected'),
  commands: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'server-connected', 'commands'),
  pinFirst: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'pin', 'pin', 1),
  pinSecond: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'pin', 'pin', 2),
  raw: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'raw-tcp', 'raw'),
  telnet: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'raw-tcp', 'Telnet'),
  parameters: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'parameters', 'parameters'),
  help: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'ssh-help', 'help'),
  recapScan: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'recap', 'scan'),
  recapServer: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'recap', 'server'),
  recapTelnet: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'recap', 'Telnet'),
  recapSsh: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'recap', 'SSH'),
  recapSerial: cueFrame(TERMINATOR_WALKTHROUGH_EDIT, 'recap', 'serial'),
};

export const BEAT_REGIONS: Partial<Record<BeatName, Region>> = {
  proof: termRegions.nav,
  scan: termRegions.results,
  server: fullFrame(TERM_VIEWPORT),
  pin: padRegion(termRegions.tabs, 28),
  'raw-tcp': padRegion(termRegions.connectFields, 45),
  serial: padRegion(termRegions.serialParams, 45),
  ssh: termRegions.exchange,
  recap: termRegions.nav,
};

// The proof needs the complete navigation and each pane; overlays supply emphasis.
export const BEAT_SHOTS: Partial<Record<BeatName, Shot[]>> = {
  proof: [{at: 0, region: fullFrame(TERM_VIEWPORT)}, {at: CUE_FRAMES.terminal - BEATS.proof.from, region: fullFrame(TERM_VIEWPORT)}],
  scan: [{at: 0, region: termRegions.results}],
  server: [
    {at: 0, region: fullFrame(TERM_VIEWPORT)},
    {at: CUE_FRAMES.connected - BEATS.server.from, region: padRegion(termRegions.serverClients, 100)},
    {at: CUE_FRAMES.commands - BEATS.server.from, region: termRegions.serverLog},
  ],
  pin: [{at: 0, region: padRegion(termRegions.tabs, 28)}],
  'raw-tcp': [
    {at: 0, region: termRegions.session},
    {at: CUE_FRAMES.raw - BEATS['raw-tcp'].from, region: padRegion(termRegions.connectFields, 45)},
    {at: CUE_FRAMES.telnet - BEATS['raw-tcp'].from, region: termRegions.exchange},
  ],
  serial: [
    {at: 0, region: termRegions.exchange},
    {at: CUE_FRAMES.parameters - BEATS.serial.from, region: padRegion(termRegions.serialParams, 45)},
  ],
  ssh: [{at: 0, region: termRegions.exchange}],
};

export const WALKTHROUGH_BEATS: WalkthroughBeat[] = BEAT_NAMES.map((id) => ({
  id,
  ...BEATS[id],
  copy: COPY[id],
  regions: BEAT_REGIONS[id],
  shots: BEAT_SHOTS[id],
  calloutSide: 'left',
  ...(id === 'open' || id === 'close' ? {
    card: {
      lockup: 'CTRLbot Terminator',
      eyebrow: id === 'open' ? 'For Windows' : undefined,
      line: id === 'open'
        ? 'Scan the network, run a test server, and talk to devices from one PC app.'
        : 'Scan, serve and connect from one PC app.',
    },
  } : {}),
}));
