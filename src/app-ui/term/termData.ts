// What Terminator shows, transcribed from Nathan's recording rather than written.
//
// Source: `video input/CTRLbot Terminatior Tutorial.mp4`, read frame by frame against its
// transcript in `ingest/terminator-walkthrough/`. The scan rows are the devices his scan
// found at 1:03 and 1:54; the sessions are the ones he runs and narrates: the IoT app
// connecting to Terminator's server at 3:16, a Samsung display on the DeviceLab rack at
// 4:23, and the Luxul switch's CLI over SSH at 8:12. Edit these for another video; keep
// them things the app has actually shown.

export type Rect = {x: number; y: number; width: number; height: number};
export type Region = Rect;

/** CSS pixels the app is laid out at. 16:10, wide enough for the scan table's 980px. */
export const TERM_VIEWPORT = {width: 1280, height: 800} as const;

export type TermTab = 'scan' | 'tcp-server' | 'tcp-client' | 'serial' | 'ssh';
export const TERM_TOOLS: TermTab[] = ['scan', 'tcp-server', 'tcp-client', 'serial', 'ssh'];

/** Sidebar navigation geometry in CSS pixels. */
export const TERM_NAV_WIDTH = 224;
export const TERM_NAV_PADDING = 14;
export const TERM_NAV_HEADER_HEIGHT = 64;
export const TERM_NAV_HEADER_MARGIN_BOTTOM = 21;
export const TERM_NAV_ITEM_HEIGHT = 35;
export const TERM_NAV_ITEM_GAP = 7;

/** Session content pane geometry. */
export const TERM_SESSION_WIDTH = TERM_VIEWPORT.width - TERM_NAV_WIDTH; // 1056
export const TERM_SCREEN_PADDING = 14;
export const TERM_SCREEN_CONTENT_WIDTH = TERM_SESSION_WIDTH - TERM_SCREEN_PADDING * 2; // 1028
export const TERM_SCREEN_CONTENT_X = TERM_NAV_WIDTH + TERM_SCREEN_PADDING; // 238

/** Shared flow-row fixed heights in CSS pixels. */
export const TERM_TABS_HEIGHT = 38.75;
export const TERM_CONTROL_ROW_HEIGHT = 70.5;
export const TERM_SERIAL_CONTROL_ROW_HEIGHT = 67;
export const TERM_CONTROL_ROW_MARGIN_BOTTOM = 14;
export const TERM_SEND_BAR_HEIGHT = 51;
export const TERM_SEND_BAR_MARGIN_TOP = 14;

/** Scan screen layout. */
export const TERM_SCAN_PADDING = 21;
export const TERM_SCAN_RESULTS_X = TERM_NAV_WIDTH + TERM_SCAN_PADDING; // 245
export const TERM_SCAN_RESULTS_Y = 215;
export const TERM_SCAN_RESULTS_WIDTH = TERM_SESSION_WIDTH - TERM_SCAN_PADDING * 2; // 1014
export const TERM_SCAN_RESULTS_HEIGHT = 564;

const regionsObject = {
  nav: {x: 0, y: 0, width: TERM_NAV_WIDTH, height: TERM_VIEWPORT.height},
  navItem: (tool: TermTab): Region => {
    const index = TERM_TOOLS.indexOf(tool);
    const itemIndex = index >= 0 ? index : 0;
    return {
      x: TERM_NAV_PADDING,
      y: TERM_NAV_PADDING + TERM_NAV_HEADER_HEIGHT + TERM_NAV_HEADER_MARGIN_BOTTOM + itemIndex * (TERM_NAV_ITEM_HEIGHT + TERM_NAV_ITEM_GAP),
      width: TERM_NAV_WIDTH - TERM_NAV_PADDING * 2,
      height: TERM_NAV_ITEM_HEIGHT,
    };
  },
  tabs: {x: TERM_NAV_WIDTH, y: 0, width: TERM_SESSION_WIDTH, height: TERM_TABS_HEIGHT},
  session: {x: TERM_NAV_WIDTH, y: 0, width: TERM_SESSION_WIDTH, height: TERM_VIEWPORT.height},
  results: {x: TERM_SCAN_RESULTS_X, y: TERM_SCAN_RESULTS_Y, width: TERM_SCAN_RESULTS_WIDTH, height: TERM_SCAN_RESULTS_HEIGHT},
  serverClients: {x: TERM_SCREEN_CONTENT_X + 196, y: TERM_TABS_HEIGHT + TERM_SCREEN_PADDING + 23, width: 160, height: 38},
  serverLog: {
    x: TERM_SCREEN_CONTENT_X,
    y: TERM_TABS_HEIGHT + TERM_SCREEN_PADDING + TERM_CONTROL_ROW_HEIGHT + TERM_CONTROL_ROW_MARGIN_BOTTOM,
    width: TERM_SCREEN_CONTENT_WIDTH,
    height:
      TERM_VIEWPORT.height -
      (TERM_TABS_HEIGHT + TERM_SCREEN_PADDING + TERM_CONTROL_ROW_HEIGHT + TERM_CONTROL_ROW_MARGIN_BOTTOM) -
      (TERM_SEND_BAR_HEIGHT + TERM_SEND_BAR_MARGIN_TOP + TERM_SCREEN_PADDING),
  },
  connectFields: {x: TERM_SCREEN_CONTENT_X + 10, y: TERM_TABS_HEIGHT + TERM_SCREEN_PADDING + 9, width: 242, height: 50},
  serialParams: {x: TERM_SCREEN_CONTENT_X + 10, y: TERM_TABS_HEIGHT + TERM_SCREEN_PADDING + 9, width: 500, height: 50},
  exchange: {
    x: TERM_SCREEN_CONTENT_X,
    y: TERM_TABS_HEIGHT + TERM_SCREEN_PADDING + TERM_CONTROL_ROW_HEIGHT + TERM_CONTROL_ROW_MARGIN_BOTTOM,
    width: TERM_SCREEN_CONTENT_WIDTH,
    height: TERM_VIEWPORT.height - (TERM_TABS_HEIGHT + TERM_SCREEN_PADDING + TERM_CONTROL_ROW_HEIGHT + TERM_CONTROL_ROW_MARGIN_BOTTOM) - TERM_SCREEN_PADDING,
  },
};

export const termRegions = Object.assign(() => regionsObject, regionsObject);

export type TermDevice = {
  host: string | null;
  device: string | null;
  manufacturer: string | null;
  ip: string;
  mac: string | null;
  web: number[];
};

export const TERM_ADAPTER = {name: 'Wi-Fi 2', ipv4: '192.168.0.74', subnet: '192.168.0.0/24', hosts: 254};

/** Sorted by IP, as the app sorts them. */
export const TERM_DEVICES: TermDevice[] = [
  {host: null, device: 'Archer AX21', manufacturer: 'TP-Link', ip: '192.168.0.1', mac: '30:DE:4B:11:3A:8C', web: [80, 443]},
  {host: null, device: null, manufacturer: 'Luxul', ip: '192.168.0.3', mac: 'A4:13:4E:EF:51:76', web: [80]},
  {host: '343dad624f6e4ad7.local', device: 'Chromecast', manufacturer: 'Google', ip: '192.168.0.16', mac: '8C:0F:58:5F:8F:FA', web: [8443]},
  {host: 'TUF-WORKSTATION-2.local', device: null, manufacturer: 'Intel Corporate', ip: '192.168.0.74', mac: 'D4:AB:61:B6:FC:C9', web: []},
  {host: 'Sonos-38420B1F5CAC.local', device: '192.168.0.82 - Sonos One SL', manufacturer: 'Sonos, Inc.', ip: '192.168.0.82', mac: '38:42:0B:1F:5C:AC', web: []},
  {host: 'NPIC63688.local', device: 'HP LaserJet Professional P1102w', manufacturer: 'Hewlett-Packard', ip: '192.168.0.83', mac: '1C:C1:DE:C6:36:B8', web: [8080]},
  {host: null, device: 'GLOBAL CACHE Most Models', manufacturer: 'Atlona Inc.', ip: '192.168.0.100', mac: 'B8:98:B0:05:94:15', web: [80]},
  {host: null, device: 'convertip-tx-1', manufacturer: 'Atlona Inc.', ip: '192.168.0.101', mac: 'B8:98:B0:05:94:15', web: [80]},
  {host: null, device: 'convertip-tx-2', manufacturer: 'Atlona Inc.', ip: '192.168.0.102', mac: 'B8:98:B0:05:94:15', web: [80]},
  {host: null, device: 'convertip-tx-3', manufacturer: 'Atlona Inc.', ip: '192.168.0.103', mac: 'B8:98:B0:05:94:15', web: [80]},
];

/** Terminator's server, with the IoT app on the tablet connected to it. */
export const TERM_SERVER = {
  port: '23',
  client: '192.168.0.24:50412',
  command: 'hello world',
  received: ['hello world<CR>', 'test command<CR>'],
  sent: ['[System] Server listening on port 23', '[System] Client connected: 192.168.0.24:50412', '[Sent] hello world'],
};

/** A Samsung display on the DeviceLab rack, over its control port. */
export const TERM_RAW_TCP = {
  host: '192.168.0.135',
  port: '1515',
  command: 'power on',
  received: ['display on<CR>'],
  sent: ['[System] Connected to 192.168.0.135:1515', '[Sent] power on'],
};

/** Two USB serial ports wired to each other: COM9 opened at 38400, talking to COM12. */
export const TERM_SERIAL = {
  port: 'COM9',
  baud: '38400',
  dataBits: '8',
  parity: 'none',
  handshake: 'OFF',
  command: 'hello world',
  received: ['goodbye<CR>'],
  sent: ['[System] Opened COM9 at 38400 baud', '[Sent] hello world'],
};

/** The Luxul switch's CLI, over SSH. */
export const TERM_SSH = {
  host: '192.168.0.3:22',
  username: 'admin',
  connecting: '[System] Connecting to admin@192.168.0.3:22...',
  command: 'help',
  output: [
    'firmware     Firmware upgrade/swap',
    'help         Description of the interactive help system',
    'ip           IPv4 commands',
    'ipv6         IPv6 configuration commands',
    'logout       Exit from EXEC mode',
    'more         Display file',
    'no           Negate a command or set its defaults',
    'ping         Send ICMP echo messages',
    'platform     Platform configuration',
    'reload       Reload system.',
    'send         Send a message to other tty lines',
    'show         Show running system information',
  ],
};

/** A projector's control port, queried with PJLink's power command. Synthetic address. */
export const TERM_PROJECTOR = {
  host: '192.168.0.45',
  port: '4352',
  command: '%1POWR ?',
  received: ['%1POWR=1<CR>'],
  sent: ['[System] Connected to 192.168.0.45:4352', '[Sent] %1POWR ?'],
};
