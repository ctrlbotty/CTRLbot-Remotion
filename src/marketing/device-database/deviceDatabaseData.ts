// The 2-minute device-database walkthrough: beat timings, copy, and the driver data it
// puts on screen.
//
// Same split as `ai-walkthrough/walkthroughData.ts`, and for the same reason.
//
// `BEATS` and `COPY` are the video. They are written from
// `ingest/device-database/transcript.md` — the speaker's own walkthrough — and checked
// against `../../1 - CTRLbot.av/CTRLbot-IoT/AGENTS.md` and the Android resources.
//
// Everything below the divider is what is *on* the screen, transcribed from the
// recording's frames rather than written. Driver names, model numbers, command payloads,
// ports, the Epson setup text and the Global Cache End Point row are all real. A promo
// that invents plausible-looking product output is a promo whose viewer types the same
// thing and gets something else; where a block was too long for the panel it was cut
// from the end, never reworded.

/**
 * 30fps. Beat boundaries, in frames. The cut is exactly 120 seconds.
 *
 * The two beats where the interface is only sitting there — `transports` and `close` —
 * are the short ones, the same way `ai-walkthrough` shortens `open` and `privacy`.
 * `npm run video:frames -- device-database check` measures how much of the cut shows no
 * perceptible change against a 60% ceiling, and a still list is still however long you
 * leave it up. The beats where something arrives get the time instead.
 */
export const BEATS = {
  library: {from: 0, duration: 300},
  types: {from: 300, duration: 270},
  transports: {from: 570, duration: 240},
  driver: {from: 810, duration: 330},
  docs: {from: 1140, duration: 270},
  control: {from: 1410, duration: 300},
  commands: {from: 1710, duration: 330},
  connect: {from: 2040, duration: 330},
  test: {from: 2370, duration: 330},
  endpoint: {from: 2700, duration: 360},
  rs232: {from: 3060, duration: 330},
  close: {from: 3390, duration: 210},
} as const;

export type BeatName = keyof typeof BEATS;

export const DATABASE_FRAMES = BEATS.close.from + BEATS.close.duration;

/**
 * The copy column, one entry per beat.
 *
 * **Every line here comes from `ingest/device-database/transcript.md`.** This is a
 * walkthrough of the driver library, not a positioning piece: what a driver carries —
 * documentation, links to the manufacturer and product pages, and the API codes used to
 * connect to and control the device — and what it takes to add one. If the speaker did
 * not say it and the screen does not show it, it does not go in the column.
 *
 * That rule exists because the first pass broke it and got the product wrong. It opened
 * on "CTRLbot opens on the library rather than an empty project", which is false — the
 * app opens on the quick start and then CTRLbot.AI — and it is not a claim anyone made.
 * A cut of invented framing over real footage is worse than no cut, because the frames
 * lend it credibility the words have not earned.
 *
 * Titles stay under 40 characters — `video-lint`'s `copy-length` rule — and under about
 * 15 per line, which is where Audiowide at `type.title` wraps in a 600px column. Bodies
 * are sized against the reading-rate gate, which allows about 9.5 words a second.
 *
 * **`End Point` is two words throughout**, because that is what the app's own sort
 * dropdown and its `+ RS232 End Point` button say. It is also not the deferred feature:
 * `video-lint`'s `no-deferred-features` rule is about **EndPoint switching**, the hidden
 * AV-over-IP encoder/decoder mode in `SwitchingFragment`. A Global Cache End Point is a
 * shipping device driver and one of the transports `../../1 - CTRLbot.av/CTRLbot-IoT/AGENTS.md` lists on
 * its first page. See the brief.
 */
export const COPY = {
  // 0:14 "to begin any system for control, you need to add devices" and 0:20 "CTRLbot
  // has an extensive library of devices that's divided up by, initially by manufacturer".
  library: {
    eyebrow: 'THE DEVICE DATABASE',
    title: 'Start by adding devices',
    body: 'To begin any system for control, you need to add devices. CTRLbot IoT ships with an extensive library of them, listed to begin with by manufacturer.',
  },
  // 0:20 "but we have a lot of projectors, displays, switchers, and End Points" — four
  // categories the driver states and the sort control orders on. Nothing detects them.
  types: {
    eyebrow: 'FOUR DEVICE TYPES',
    title: 'Sort it by category',
    body: 'The list is divided by manufacturer to begin with. There are a lot of projectors, displays, switchers and End Points, and the sort control will group them instead.',
  },
  // 0:33 "you're able to control things by IP, RS-232, or IR" and 0:42 "In order to
  // control stuff by RS-232 or IR, you'll need to have an End Point."
  transports: {
    eyebrow: 'THREE WAYS TO CONTROL',
    title: 'IP, RS-232 or IR',
    body: 'You can control things by IP, by RS-232 or by IR. To control anything by RS-232 or IR you need an End Point, which is a device you add the same way as any other.',
  },
  // 1:01 "when you select it, it shows you all this device information", 1:07 the two
  // links, 1:18 the description, 1:24 "multiple models, and multiple code sets along
  // with those models".
  driver: {
    eyebrow: 'ONE DRIVER',
    title: 'A manual and a code set',
    body: 'Select a device and it shows you all its information: a link to the manufacturer website, a link to the product page, and a description. Change the model, too — a lot of drivers carry several, each with its own code set.',
  },
  // 1:34 "then you have like good information: setup, specifications, and then support.
  // How do you support this device?" The second sentence is the Epson Setup text on
  // screen, transcribed from the frames rather than written.
  docs: {
    eyebrow: 'IN THE DRIVER',
    title: 'Setup, specs and support',
    body: 'Specifications, setup and support come with the driver. First-use steps, how to lock the panel, and which port the manufacturer put its control protocol on.',
  },
  // 1:44 "underneath that, you'll see we have all the control information", 1:48 "this
  // is what's key for that device connection, so that the system can control the
  // device", 1:54 "it's set up for IP", 1:58 "it also has an RS-232 port".
  control: {
    eyebrow: 'CONTROL INFO',
    title: 'The key to the connection',
    body: 'The control information is what the connection is made from, so that the system can control the device. This one is set up for IP, and it also has an RS-232 port.',
  },
  // 2:03 "I'll show you the port numbers", 2:06 "if there's a volume set, and then it'll
  // give you all the different API commands so you can control", 2:14 "this is in ASCII.
  // It could be in hex", 2:20 "you can change the line ending if you want it at any point".
  commands: {
    eyebrow: 'API COMMANDS',
    title: 'Every command it takes',
    body: 'Port numbers, the volume set, and then all the API commands you control it with. ASCII here — some devices want hex — and the line ending is set by default and yours to change at any point.',
  },
  // 2:31 "we can just add this device", 2:47 "my pretend projector is at this IP address.
  // We're gonna connect", 2:56 "we'll have a nice little log underneath here. It shows
  // that it's connected."
  connect: {
    eyebrow: 'ADD THE DEVICE',
    title: 'Give it an address',
    body: 'Add the device, put in the IP address it is at, and connect. A log underneath shows that it connected.',
  },
  // 3:03 "I'm sending commands to that projector right now, by just testing it right
  // here", 3:12 "if this was a real projector, you would see some feedback coming back",
  // 3:17 "I can close this, and we have a saved connection", 3:21 "anytime I can come in
  // and look at that connection and test it out, or we could add it to the activities".
  test: {
    eyebrow: 'TEST IT',
    title: 'Send commands from here',
    body: 'Send commands to the device from the same screen. A real one would send feedback back. Close it and the connection is saved — come back and test it again, or add it to an activity.',
  },
  // 3:29 "what it looks like when you add a device that's controlled by RS-232", 3:39
  // "we need to add an End Point", 3:45 "we have the Global Cache End Points", 4:20 "by
  // default it's set to serial", 4:24 "it's adding this End Point to the system as an
  // RS-232 End Point".
  endpoint: {
    eyebrow: 'FOR RS-232 AND IR',
    // Not "Add an End Point first", which wraps to leave "first" alone on line two.
    title: 'First, add an End Point',
    body: 'A device controlled by RS-232 needs an End Point. Global Cache is the one here, and by default it is set to serial — so making this connection adds it to the system as an RS-232 End Point.',
  },
  // 4:35 "now this can be used by other devices", 5:01 "this has control as is the
  // default", 5:06 "when I hit add, it's gonna populate that End Point that we already
  // added", 5:22 "now we can control the device through RS-232", 5:42 "we could do the
  // same thing with any of the IR".
  rs232: {
    eyebrow: 'EVERY DEVICE AFTER',
    title: 'The End Point is filled in',
    body: 'Add a display that is controlled by RS-232 and the End Point you already added is populated for you. Hit connect, and the device is controlled through RS-232. IR works the same way.',
  },
  // 5:57 "just wanted to go over the library". The body is the walkthrough's own subject,
  // in the order the cut showed it.
  close: {
    eyebrow: 'THE DEVICE DATABASE',
    title: 'That is the library',
    body: 'Documentation, links to the device pages, and the API codes for connection and control.',
  },
} as const;

// ── what is on the screen ────────────────────────────────────────────────────────────

import type {DriverEntry} from '../../app-ui/DriverCatalog';
import type {Command} from '../../app-ui/DriverDatabase';

/**
 * The `IP_RS232` library, in the order it lists under Manufacturer sort.
 *
 * Twenty rows because the cut scrolls twice through it and stops on the thirteenth. The
 * card renders `manufacturer` followed by the device type's own plural, so `ACER` plus
 * `projector` reads *ACER Projectors* — which is why no entry here says "Projectors".
 */
export const IP_DRIVERS: DriverEntry[] = [
  {manufacturer: 'ACER', model: 'XL2320P', deviceType: 'projector'},
  {manufacturer: 'AVPRO EDGE', model: 'AC-MX-44', deviceType: 'switcher'},
  {manufacturer: 'BARCO', model: 'F80-4K12', deviceType: 'projector'},
  {manufacturer: 'BENQ', model: 'LU895UST', deviceType: 'projector'},
  {manufacturer: 'BLUSTREAM', model: 'CMX44CS', deviceType: 'switcher'},
  {manufacturer: 'CANON', model: 'WUX7000Z', deviceType: 'projector'},
  {manufacturer: 'CASIO', model: 'XJ-F210WN', deviceType: 'projector'},
  {manufacturer: 'CHRISTIE', model: 'FHD551', deviceType: 'display'},
  {manufacturer: 'CHRISTIE', model: '4K860-iS', deviceType: 'projector'},
  {manufacturer: 'CLEVERTOUCH', model: 'All Range', deviceType: 'display'},
  {manufacturer: 'DIGITAL PROJECTION', model: 'E-Vision Laser 10K', deviceType: 'projector'},
  {manufacturer: 'EIKI', model: 'PRO V1700', deviceType: 'projector'},
  {manufacturer: 'EPSON', model: 'PowerLite', deviceType: 'projector'},
  {manufacturer: 'EXTRON', model: 'DXP 42', deviceType: 'switcher'},
  {manufacturer: 'GEFEN', model: 'GTB-HD4K2K-444-BLK', deviceType: 'switcher'},
  {manufacturer: 'GLOBAL CACHE', model: 'Most Models', deviceType: 'endPoint'},
  {manufacturer: 'HITACHI', model: 'CP-WU5500', deviceType: 'projector'},
  {manufacturer: 'INFOCUS', model: 'IN119BB', deviceType: 'projector'},
  {manufacturer: 'JVC', model: 'LX-WX50', deviceType: 'projector'},
  {manufacturer: 'KEY DIGITAL', model: 'KD-MS4x4G-2', deviceType: 'switcher'},
];

/** Index of EPSON PowerLite — the driver the middle of the cut is about. */
export const EPSON_INDEX = 12;
/** Index of GLOBAL CACHE Most Models. */
export const GLOBAL_CACHE_INDEX = 15;
/** Index of CHRISTIE FHD551 — the RS-232 display at the end. */
export const CHRISTIE_INDEX = 7;

/** The `IR` library, which is a different set of drivers behind the same three controls. */
export const IR_DRIVERS: DriverEntry[] = [
  {manufacturer: '3D OPTICS', model: '3D Optics Projector', deviceType: 'projector'},
  {manufacturer: '3M', model: '3M Projector v1', deviceType: 'projector'},
  {manufacturer: 'ACER', model: 'ACER TV', deviceType: 'display'},
  {manufacturer: 'ACER', model: 'Acer Projector v1', deviceType: 'projector'},
  {manufacturer: 'AOC', model: 'AOC TV v1', deviceType: 'display'},
  {manufacturer: 'APEX DIGITAL', model: 'Apex Digital TV v1', deviceType: 'display'},
  {manufacturer: 'ASUS', model: 'Asus TV', deviceType: 'display'},
  {manufacturer: 'AUDIOVOX', model: 'Audiovox TV v1', deviceType: 'display'},
  {manufacturer: 'BENQ', model: 'BenQ Projector v1', deviceType: 'projector'},
  {manufacturer: 'CANON', model: 'Canon Projector v1', deviceType: 'projector'},
];

/** The two split controls' lists, exactly as they drop. */
export const SORT_OPTIONS = ['Manufacturer', 'Projector', 'Display', 'Switchers', 'End Points'] as const;
export const CATEGORY_OPTIONS = ['IP_RS232', 'IR'] as const;
export const LINE_ENDING_OPTIONS = ['CR (\\r)', 'LF (\\n)', 'CRLF (\\r\\n)', 'None'] as const;

/**
 * `res/values/arrays.xml` → `gc_control_mode_array`, commented "Global Cache endpoint
 * control modes".
 *
 * These four are what an End Point of this kind actually does: IP goes in, and infrared,
 * serial, a relay closure or a sensor reading comes out. None of them is switching. The
 * recording only opens this list far enough to show `Serial` selected, so the cut opens
 * it properly — the claim is the product's own array, not a sentence about it.
 */
export const GC_CONTROL_MODES = ['Infrared', 'Serial', 'Relay', 'Sensor'] as const;

// ── the Epson driver ─────────────────────────────────────────────────────────────────

export const EPSON_DESCRIPTION =
  'The Epson PowerLite Presenter HD is a portable projector with an integrated DVD ' +
  'player and speakers, suitable for presentations and video playback. The Epson ' +
  'PowerLite Pro Cinema 800 is a home theater projector designed for high-quality ' +
  'image projection in a home environment.';

/** The Setup accordion, one string per paragraph as the pane breaks them. */
export const EPSON_SETUP = [
  'First Use: Install batteries, connect power, power on, open lens cover.',
  'Video Optimization: Adjust zoom and focus rings. Use remote or Signal menu for ' +
    'keystone correction. Select aspect ratio and color mode via remote buttons.',
  'Control: Lock power button via "Bloqueo parental" in Option menu. Set projector ' +
    'password in "Contraseña protegida" menu.',
  'PJLink: Port 4352 (UDP). IPv6 supported. Set password and notifications in Network ' +
    'Configuration menu.',
];

/**
 * The Epson command set.
 *
 * `PWR ON\r` is what goes down the wire, and `POWER_ON` is the name an activity calls it
 * by — the two are separate on screen because they are separate in the driver, which is
 * the entire reason a room preset can be written without knowing either.
 */
export const EPSON_COMMANDS: Command[] = [
  {label: 'POWER ON', key: 'POWER_ON', tag: 'POWER', payload: 'PWR ON\\r'},
  {label: 'POWER OFF', key: 'POWER_OFF', tag: 'POWER', payload: 'PWR OFF\\r'},
  {label: 'POWER TOGGLE', key: 'POWER_TOGGLE', tag: 'POWER', payload: 'KEY 01\\r'},
  {label: 'VOLUME UP', key: 'VOLUME_UP', tag: 'VOLUME', payload: 'KEY 56\\r'},
  {label: 'VOLUME DOWN', key: 'VOLUME_DOWN', tag: 'VOLUME', payload: 'KEY 57\\r'},
  {label: 'MUTE TOGGLE', key: 'MUTE_TOGGLE', tag: 'MUTE', payload: 'KEY 15\\r'},
  {label: 'INPUT 1', key: 'INPUT_1', tag: 'INPUT', payload: 'SOURCE 10\\r'},
];

/** The Global Cache command set — four mode changes and a query. */
export const GLOBAL_CACHE_COMMANDS: Command[] = [
  {label: 'GET DEVICE MODE', key: 'GET_DEVICE_MODE', tag: 'QUERY', payload: 'getdevices\\r'},
  {label: 'SET MODE SERIAL', key: 'SET_MODE_SERIAL', tag: 'MODE', payload: 'set_IR,1:1,SERIAL\\r'},
  {label: 'SET MODE IR SINGLE', key: 'SET_MODE_IR_SINGLE', tag: 'MODE', payload: 'set_IR,1:1,IR\\r'},
  {label: 'SET MODE IR TRIPORT', key: 'SET_MODE_IR_TRIPORT', tag: 'MODE', payload: 'set_IR,1:1,IRTRIPORT\\r'},
];

export const CHRISTIE_DESCRIPTION =
  'The Christie FHD551 is a commercial flat-panel display designed for tiled video ' +
  'walls and other professional AV installations. It is intended for digital signage ' +
  'and presentation use.';

// ── the connections ──────────────────────────────────────────────────────────────────

/**
 * The host the speaker connects to, and the ports behind it.
 *
 * `192.168.0.95` is private, so `video-lint`'s `no-secrets` rule leaves it alone and
 * nothing has to be invented in its place. The two Global Cache ports are not a typo:
 * 4998 is the unit's own command port and 4999 is its first serial port, which is why
 * the display behind it connects on a different number than the End Point did.
 */
export const HOST = '192.168.0.95';
export const EPSON_PORT = '3629';
export const GLOBAL_CACHE_PORT = '4998';
export const GLOBAL_CACHE_SERIAL_PORT = '4999';

export const EPSON_CONNECTION = 'EPSON PowerLite - New';
export const GLOBAL_CACHE_CONNECTION = 'GLOBAL CACHE Most Models - New';
export const CHRISTIE_CONNECTION = 'CHRISTIE FHD551 - New';

/** What the saved End Point looks like once it is filling the next device's transport row. */
export const SAVED_END_POINT = `${GLOBAL_CACHE_CONNECTION} - ${HOST}:${GLOBAL_CACHE_SERIAL_PORT}`;

/** The log, line by line, in the order the recording fills it in. */
export const EPSON_LOG = [
  `Connected to ${HOST}:${EPSON_PORT}`,
  'Sent: PWR ON\\r',
  'Sent: KEY 57\\r',
  'Sent: KEY 15\\r',
];

export const GLOBAL_CACHE_LOG = [`Connected to ${HOST}:${GLOBAL_CACHE_PORT}`];
