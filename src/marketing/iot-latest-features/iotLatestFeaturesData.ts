// W05 revision 2: one 136-second timeline (4080 frames) for both shapes, timed to the edited
// narration. Beat lengths are T8's measured clips plus their leads, gaps and 1.0s holds.
import {fullFrame, type Region, type Shot} from '../../camera/Camera';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {catalogRegions} from '../../app-ui/DriverCatalog';
import {endPointPaneRegions} from '../../app-ui/DriverDatabase';
import {rs232ConnectionRegions} from '../../app-ui/ConnectionPanel';
import {connectTestRegions} from '../../app-ui/ConnectTest';
import {activitiesPresetsRegions} from '../../app-ui/ActivitiesPresets';
import {discoverDevicesRegions} from '../../app-ui/DiscoverDevices';
import {TABLET_EUI_REGIONS} from '../../app-ui/TabletEui';
import {cueFrame, type BeatCopy, type WalkthroughBeat} from '../WalkthroughShell';
import {NARRATION_EDIT} from './iotLatestFeaturesNarration.generated';

export const BEATS = {
  open: {from: 0, duration: 150, layout: 'card'},
  proof: {from: 150, duration: 210, layout: 'stage'},
  'net-switches': {from: 360, duration: 210, layout: 'chapter'},
  avoip: {from: 570, duration: 360, layout: 'chapter'},
  'global-cache': {from: 930, duration: 390, layout: 'chapter'},
  pusr: {from: 1320, duration: 435, layout: 'chapter'},
  discovery: {from: 1755, duration: 255, layout: 'chapter'},
  rs232: {from: 2010, duration: 585, layout: 'chapter'},
  terminal: {from: 2595, duration: 255, layout: 'chapter'},
  webpage: {from: 2850, duration: 255, layout: 'chapter'},
  message: {from: 3105, duration: 165, layout: 'chapter'},
  eui: {from: 3270, duration: 345, layout: 'chapter'},
  power: {from: 3615, duration: 345, layout: 'chapter'},
  close: {from: 3960, duration: 120, layout: 'card'},
} as const;

export type LatestBeatName = keyof typeof BEATS;
export const BEAT_NAMES = Object.keys(BEATS) as LatestBeatName[];
export const IOT_LATEST_FEATURES_FRAMES = 4080;

export const COPY: Record<LatestBeatName, BeatCopy> = {
  open: {eyebrow: 'New in v1.0.9', headline: 'CTRLbot IoT', body: 'New devices, new end points, and drag to route.'},
  proof: {eyebrow: 'End user interface', title: 'Drag a source onto a display', body: 'Press, hold and drop it to route.'},
  'net-switches': {eyebrow: 'Device', title: 'Net Switchers, a new category'},
  avoip: {eyebrow: 'AV-over-IP', title: 'Kramer, Matrox and Hall Research'},
  'global-cache': {
    eyebrow: 'End points',
    title: 'Global Caché by exact model',
    body: 'iTach, GC-100, Flex or Global Connect, each with its own ports. Most Models is still there.',
  },
  pusr: {eyebrow: 'End points', title: 'Serial through a PUSR USR-W630'},
  discovery: {eyebrow: 'Find Devices', title: 'Matched to a driver, added in one tap'},
  rs232: {eyebrow: 'Connect', title: 'RS-232 through an end point'},
  terminal: {eyebrow: 'Connect', title: 'A terminal for every device'},
  webpage: {eyebrow: 'Connect', title: "The device's own web page"},
  message: {eyebrow: 'Activities', title: 'A message on a preset step', body: 'The end user sees it while the preset runs.'},
  eui: {eyebrow: 'End user interface', title: 'Drag to a display, or send to All'},
  power: {eyebrow: 'End user interface', title: 'Change your mind before it powers off', body: 'Tap ✕ and nothing is sent.'},
  close: {headline: 'CTRLbot IoT', body: 'All of it in v1.0.9.'},
};

// Absolute composition frames; beat shot times subtract the beat's start.
export const CUE_FRAMES = {
  welcomeFeatures: cueFrame(NARRATION_EDIT, 'welcome', 'features'),
  netCategory: cueFrame(NARRATION_EDIT, 'net-category', 'category'),
  netSwitches: cueFrame(NARRATION_EDIT, 'net-category', 'switches'),
  avoipEndpoints: cueFrame(NARRATION_EDIT, 'avoip-more', 'endpoints'),
  avoipKramer: cueFrame(NARRATION_EDIT, 'avoip-brands', 'Kramer'),
  avoipMatrox: cueFrame(NARRATION_EDIT, 'avoip-brands', 'Matrox'),
  avoipResearch: cueFrame(NARRATION_EDIT, 'avoip-brands', 'research'),
  gcEndpoints: cueFrame(NARRATION_EDIT, 'gc-models', 'endpoints'),
  gcModels: cueFrame(NARRATION_EDIT, 'gc-models', 'models'),
  pusrName: cueFrame(NARRATION_EDIT, 'pusr', 'Pooser'),
  pusrConvert: cueFrame(NARRATION_EDIT, 'pusr', 'convert'),
  discDiscovery: cueFrame(NARRATION_EDIT, 'disc-corner', 'discovery'),
  discCorner: cueFrame(NARRATION_EDIT, 'disc-corner', 'corner'),
  discDriver: cueFrame(NARRATION_EDIT, 'disc-click', 'driver'),
  discClick: cueFrame(NARRATION_EDIT, 'disc-click', 'click'),
  rsAcer: cueFrame(NARRATION_EDIT, 'rs-acer', 'Acer'),
  rsEnd: cueFrame(NARRATION_EDIT, 'rs-endpoint', 'end'),
  rsConnect: cueFrame(NARRATION_EDIT, 'rs-endpoint', 'connect'),
  rsTerminal: cueFrame(NARRATION_EDIT, 'rs-terminal', 'terminal'),
  rsCommands: cueFrame(NARRATION_EDIT, 'rs-layout', 'commands'),
  termOpen: cueFrame(NARRATION_EDIT, 'term-open', 'terminal'),
  termSend: cueFrame(NARRATION_EDIT, 'term-send', 'send'),
  webWebpage: cueFrame(NARRATION_EDIT, 'web', 'webpage'),
  webDirectly: cueFrame(NARRATION_EDIT, 'web', 'directly'),
  msgMessages: cueFrame(NARRATION_EDIT, 'msg', 'messages'),
  euiDrag: cueFrame(NARRATION_EDIT, 'eui-drag', 'drag'),
  euiSource: cueFrame(NARRATION_EDIT, 'eui-all', 'source'),
  euiAll: cueFrame(NARRATION_EDIT, 'eui-all', 'all'),
  powerSafety: cueFrame(NARRATION_EDIT, 'power-x', 'safety'),
  powerX: cueFrame(NARRATION_EDIT, 'power-x', 'X'),
  powerHello: cueFrame(NARRATION_EDIT, 'power-message', 'hello'),
};

/** Every catalog beat shows the v1.0.9 header, so it does not jump between beats. */
export const FIND_DEVICES_LABEL = '15 devices found';
const catalogMap = catalogRegions('tablet', {findDevices: FIND_DEVICES_LABEL});
const paneMap = endPointPaneRegions();
const rs232Map = rs232ConnectionRegions();
const testMap = connectTestRegions('tablet', {testTab: 'terminal'});
const presetsMap = activitiesPresetsRegions('tablet', {mode: 'edit', commandStepsCount: 2});
const discoverMap = discoverDevicesRegions('tablet');

/**
 * Grows a region about its own centre until it is at least `fraction` of the tablet
 * surface's width AND height (1280x800 dp), then clamps it inside the surface.
 * Copied from W04's data, not imported: a video never imports another video's folder.
 * Why: the shell's `expand` fit turns a small region into a 3–4x zoom.
 */
export const atLeast = (region: Region, fraction = 0.5): Region => {
  const minW = TABLET_VIEWPORT.width * fraction;
  const minH = TABLET_VIEWPORT.height * fraction;
  if (region.width >= minW && region.height >= minH) {
    return region;
  }
  const width = Math.max(region.width, minW);
  const height = Math.max(region.height, minH);
  const cx = region.x + region.width / 2;
  const cy = region.y + region.height / 2;
  const x = Math.max(0, Math.min(TABLET_VIEWPORT.width - width, cx - width / 2));
  const y = Math.max(0, Math.min(TABLET_VIEWPORT.height - height, cy - height / 2));
  return {x, y, width, height};
};

export const unionRegion = (a: Region, b: Region): Region => {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  };
};

/** The catalog's list column, header to foot. */
export const LIST_COLUMN: Region = {x: 200, y: 0, width: 430, height: TABLET_VIEWPORT.height};
const full = fullFrame(TABLET_VIEWPORT);

// Stage framing stays wider than 94% of the window; emphasis is supplied by beat overlays.
const STAGE_PUSH = {x: 0, y: 0, width: TABLET_VIEWPORT.width * 0.94, height: TABLET_VIEWPORT.height * 0.94};

const at = (cue: number, beat: LatestBeatName) => cue - BEATS[beat].from;

export const BEAT_SHOTS: Partial<Record<LatestBeatName, Shot[]>> = {
  proof: [
    {at: 0, region: full},
    {at: BEATS.proof.duration / 2, region: STAGE_PUSH},
    {at: BEATS.proof.duration, region: full},
  ],
  'net-switches': [
    {at: 0, region: full},
    {at: at(CUE_FRAMES.netCategory, 'net-switches'), region: atLeast(LIST_COLUMN)},
  ],
  avoip: [{at: 0, region: atLeast(LIST_COLUMN)}],
  'global-cache': [
    {at: 0, region: full},
    {at: at(CUE_FRAMES.gcModels, 'global-cache'), region: atLeast(unionRegion(paneMap.modelField, paneMap.modelList))},
  ],
  pusr: [
    {at: 0, region: full},
    {at: at(CUE_FRAMES.pusrConvert, 'pusr'), region: atLeast(paneMap.description)},
  ],
  discovery: [
    {at: 0, region: full},
    {at: at(CUE_FRAMES.discCorner, 'discovery'), region: discoverMap.list},
  ],
  rs232: [
    {at: 0, region: rs232Map.content},
    {at: at(CUE_FRAMES.rsEnd, 'rs232'), region: atLeast(unionRegion(rs232Map.endPointField, rs232Map.connectAction))},
    {at: at(CUE_FRAMES.rsTerminal, 'rs232'), region: atLeast(rs232Map.terminal)},
    {at: at(CUE_FRAMES.rsCommands, 'rs232'), region: atLeast(unionRegion(rs232Map.config, rs232Map.commands))},
  ],
  terminal: [
    {at: 0, region: testMap.content},
    {at: at(CUE_FRAMES.termSend, 'terminal'), region: atLeast(testMap.terminal)},
  ],
  webpage: [{at: 0, region: testMap.content}],
  message: [
    {at: 0, region: presetsMap.content ?? full},
    {at: at(CUE_FRAMES.msgMessages, 'message'), region: atLeast(presetsMap.delayMessage(1))},
  ],
  eui: [{at: 0, region: TABLET_EUI_REGIONS.full}],
  power: [{at: 0, region: full}],
};

/** Landscape step labels go where the cued subject is not: right of the catalog's list. */
const CALLOUT_SIDE: Partial<Record<LatestBeatName, 'left' | 'right'>> = {
  'net-switches': 'right',
  avoip: 'right',
  'global-cache': 'left',
  pusr: 'left',
  discovery: 'left',
};

export const WALKTHROUGH_BEATS: WalkthroughBeat[] = BEAT_NAMES.map((id) => ({
  id,
  ...BEATS[id],
  copy: COPY[id],
  shots: BEAT_SHOTS[id],
  calloutSide: CALLOUT_SIDE[id] ?? 'left',
  ...(id === 'open' || id === 'close'
    ? {
        card: {
          lockup: 'CTRLbot IoT',
          eyebrow: id === 'open' ? 'New in v1.0.9' : undefined,
          line: id === 'open' ? 'New devices, new end points, and drag to route.' : 'All of it in v1.0.9.',
        },
      }
    : {}),
}));

export {catalogMap, paneMap, rs232Map, testMap, presetsMap, discoverMap};
