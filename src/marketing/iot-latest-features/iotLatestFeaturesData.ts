// W05 revision 3 (review 2026-10-07): one 121-second timeline (3630 frames) for both shapes, timed to the edited
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
import {background} from '../../design/theme';

export const BEATS = {
  open: {from: 0, duration: 150, layout: 'card'},
  proof: {from: 150, duration: 210, layout: 'stage'},
  avoip: {from: 360, duration: 360, layout: 'chapter'},
  'global-cache': {from: 720, duration: 390, layout: 'chapter'},
  pusr: {from: 1110, duration: 435, layout: 'chapter'},
  discovery: {from: 1545, duration: 255, layout: 'chapter'},
  rs232: {from: 1800, duration: 585, layout: 'chapter'},
  terminal: {from: 2385, duration: 255, layout: 'chapter'},
  webpage: {from: 2640, duration: 255, layout: 'chapter'},
  eui: {from: 2895, duration: 345, layout: 'chapter'},
  power: {from: 3240, duration: 270, layout: 'chapter'},
  close: {from: 3510, duration: 120, layout: 'card'},
} as const;

export type LatestBeatName = keyof typeof BEATS;
export const BEAT_NAMES = Object.keys(BEATS) as LatestBeatName[];
export const IOT_LATEST_FEATURES_FRAMES = 3630;

export const COPY: Record<LatestBeatName, BeatCopy> = {
  open: {eyebrow: 'New in v1.0.9', headline: 'CTRLbot IoT', body: 'New devices, new end points, and drag to route.'},
  proof: {eyebrow: 'End user interface', title: 'Drag a source onto a display', body: 'Press, hold and drop it to route.'},
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
  eui: {eyebrow: 'End user interface', title: 'Drag to a display, or send to All'},
  power: {eyebrow: 'End user interface', title: 'Change your mind before it powers off', body: 'Tap ✕ and nothing is sent.'},
  close: {headline: 'CTRLbot IoT', body: 'All of it in v1.0.9.'},
};

// Absolute composition frames; beat shot times subtract the beat's start.
export const CUE_FRAMES = {
  welcomeFeatures: cueFrame(NARRATION_EDIT, 'welcome', 'features'),
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
  euiDrag: cueFrame(NARRATION_EDIT, 'eui-drag', 'drag'),
  euiSource: cueFrame(NARRATION_EDIT, 'eui-all', 'source'),
  euiAll: cueFrame(NARRATION_EDIT, 'eui-all', 'all'),
  powerSafety: cueFrame(NARRATION_EDIT, 'power-x', 'safety'),
  powerX: cueFrame(NARRATION_EDIT, 'power-x', 'X'),
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

/**
 * The proof beat's device: bezelled so the EUI's black bars read against the frame, on the
 * card's promo glow (picking up where the open card's bloom ends, 59%/41%) so the
 * background carries through the crossfade, and zoomed as a whole rather than cropped.
 */
const PROOF_STAGE: Record<'landscape' | 'portrait', NonNullable<WalkthroughBeat['stage']>> = {
  landscape: {bezel: 22, zoom: [0.92, 1.03], background: (t) => background.promo(59 + t * 9, 41 + t * 8)},
  // Portrait's panel spans the frame, so it zooms up to 1.0; the card's portrait bloom ends at 42%/48%.
  portrait: {bezel: 18, zoom: [0.9, 1.0], background: (t) => background.promo(42 + t * 8, 48 + t * 6)},
};

const at = (cue: number, beat: LatestBeatName) => cue - BEATS[beat].from;

export const BEAT_SHOTS: Partial<Record<LatestBeatName, Shot[]>> = {
  // The whole tablet zooms (see PROOF_STAGE); the camera inside it holds the full surface.
  proof: [{at: 0, region: full}],
  avoip: [{at: 0, region: atLeast(LIST_COLUMN)}],
  'global-cache': [
    {at: 0, region: full},
    {at: at(CUE_FRAMES.gcModels, 'global-cache'), region: atLeast(unionRegion(paneMap.modelField, paneMap.modelList))},
  ],
  pusr: [
    {at: 0, region: full},
    {at: at(CUE_FRAMES.pusrConvert, 'pusr'), region: atLeast(paneMap.description)},
  ],
  // Held whole: a push into the list cropped the header, and the corner button is the subject.
  discovery: [{at: 0, region: full}],
  rs232: [
    {at: 0, region: rs232Map.content},
    {at: at(CUE_FRAMES.rsEnd, 'rs232'), region: atLeast(unionRegion(rs232Map.endPointField, rs232Map.connectAction))},
    // The whole panel while it connects, so the progress toast at its foot is in shot.
    {at: at(CUE_FRAMES.rsConnect, 'rs232'), region: rs232Map.content},
    {at: at(CUE_FRAMES.rsTerminal, 'rs232'), region: atLeast(rs232Map.terminal)},
    {at: at(CUE_FRAMES.rsCommands, 'rs232'), region: atLeast(unionRegion(rs232Map.config, rs232Map.commands))},
  ],
  // Footage beats: the whole screen, which the recording already composes.
  terminal: [{at: 0, region: full}],
  webpage: [{at: 0, region: full}],
  eui: [{at: 0, region: TABLET_EUI_REGIONS.full}],
  power: [{at: 0, region: full}],
};

/**
 * Portrait is bound by its width, so a shot there is a crop of the region being taught, no
 * wider than 720 dp (W04's rule); only the EUI beats show the whole surface. These replace
 * the landscape shots beat by beat; a beat not listed uses its landscape shots.
 */
const crop = (x: number, y = 0, height: number = TABLET_VIEWPORT.height): Region => ({x, y, width: 720, height});
const LIST_CROP = crop(200);
const PANE_CROP = crop(560);

export const PORTRAIT_SHOTS: Partial<Record<LatestBeatName, Shot[]>> = {
  'global-cache': [
    {at: 0, region: LIST_CROP},
    {at: at(CUE_FRAMES.gcEndpoints, 'global-cache') + 20, region: PANE_CROP},
    {at: at(CUE_FRAMES.gcModels, 'global-cache'), region: atLeast(unionRegion(paneMap.modelField, paneMap.modelList))},
  ],
  pusr: [
    {at: 0, region: LIST_CROP},
    {at: at(CUE_FRAMES.pusrName, 'pusr') + 20, region: PANE_CROP},
    {at: at(CUE_FRAMES.pusrConvert, 'pusr'), region: atLeast(paneMap.description)},
  ],
  discovery: [
    {at: 0, region: PANE_CROP},
    {at: at(CUE_FRAMES.discCorner, 'discovery'), region: crop(200)},
    {at: at(CUE_FRAMES.discDriver, 'discovery'), region: crop(560)},
  ],
  rs232: [
    {at: 0, region: crop(200)},
    {at: at(CUE_FRAMES.rsEnd, 'rs232'), region: crop(544)},
    // 1080 dp wide while it connects: the surface sits at about 1.0x, so the toasts at its
    // foot land above the caption band instead of under it.
    {at: at(CUE_FRAMES.rsConnect, 'rs232'), region: {x: 200, y: 0, width: 1080, height: TABLET_VIEWPORT.height}},
    {at: at(CUE_FRAMES.rsTerminal, 'rs232'), region: crop(200)},
    {at: at(CUE_FRAMES.rsCommands, 'rs232'), region: crop(560)},
  ],
  // Footage: the terminal pane, then the terminal's own page, both start at the nav rail.
  terminal: [{at: 0, region: crop(70)}],
  // Footage: the web view runs from the rail to about 890 dp; its page is centred in it.
  webpage: [{at: 0, region: crop(76)}],
};

/** Landscape step labels go where the cued subject is not. */
const CALLOUT_SIDE: Partial<Record<LatestBeatName, 'left' | 'right' | 'top'>> = {
  avoip: 'right',
  // The selected PUSR card is the list's last row, under a left label.
  pusr: 'right',
  // Footage: the terminal's lines are at the top, the keyboard at the foot; the right is empty.
  terminal: 'right',
  // The web view's address bar is at its top, so the label goes bottom right.
  webpage: 'right',
};

export const walkthroughBeats = (format: 'landscape' | 'portrait'): WalkthroughBeat[] =>
  BEAT_NAMES.map((id) => ({
    id,
    ...BEATS[id],
    copy: COPY[id],
    shots: (format === 'portrait' ? PORTRAIT_SHOTS[id] : undefined) ?? BEAT_SHOTS[id],
    calloutSide: CALLOUT_SIDE[id] ?? 'left',
    ...(id === 'proof' ? {stage: PROOF_STAGE[format]} : {}),
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
