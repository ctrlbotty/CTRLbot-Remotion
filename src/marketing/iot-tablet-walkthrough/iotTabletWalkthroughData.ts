// Revision 2: one 343.5-second timeline (10305 frames) for both shapes, timed to the edited narration.
import {fullFrame, padRegion, type Region, type Shot} from '../../camera/Camera';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {firstRunEducationRegions} from '../../app-ui/FirstRunEducation';
import {aiRegions} from '../../app-ui/CtrlbotAi';
import {catalogRegions} from '../../app-ui/DriverCatalog';
import {productWebRegions} from '../../app-ui/ProductWebView';
import {connectionRegions} from '../../app-ui/ConnectionPanel';
import {connectTestRegions} from '../../app-ui/ConnectTest';
import {activitiesPresetsRegions} from '../../app-ui/ActivitiesPresets';
import {activitiesSwitchRegions} from '../../app-ui/ActivitiesSwitch';
import {activitiesAudioRegions} from '../../app-ui/ActivitiesAudio';
import {discoverDevicesRegions} from '../../app-ui/DiscoverDevices';
import {settingsSupportRegions} from '../../app-ui/SettingsSupport';
import {TABLET_EUI_MANY_TO_ONE_REGIONS, TABLET_EUI_REGIONS} from '../../app-ui/TabletEui';
import {cueFrame, type BeatCopy, type WalkthroughBeat} from '../WalkthroughShell';
import {NARRATION_EDIT} from './iotTabletWalkthroughNarration.generated';

export const BEATS = {
  open: {from: 0, duration: 150, layout: 'card'},
  proof: {from: 150, duration: 180, layout: 'stage'},
  'first-run': {from: 330, duration: 405, layout: 'chapter'},
  ai: {from: 735, duration: 660, layout: 'chapter'},
  database: {from: 1395, duration: 690, layout: 'chapter'},
  epson: {from: 2085, duration: 705, layout: 'chapter'},
  add: {from: 2790, duration: 480, layout: 'chapter'},
  terminal: {from: 3270, duration: 165, layout: 'chapter'},
  test: {from: 3435, duration: 840, layout: 'chapter'},
  activities: {from: 4275, duration: 570, layout: 'chapter'},
  'switch-audio': {from: 4845, duration: 495, layout: 'chapter'},
  eui: {from: 5340, duration: 750, layout: 'chapter'},
  exit: {from: 6090, duration: 240, layout: 'chapter'},
  discovery: {from: 6330, duration: 600, layout: 'chapter'},
  'matrox-add': {from: 6930, duration: 915, layout: 'chapter'},
  'matrox-test': {from: 7845, duration: 240, layout: 'chapter'},
  'matrox-switch': {from: 8085, duration: 705, layout: 'chapter'},
  m2m: {from: 8790, duration: 735, layout: 'chapter'},
  settings: {from: 9525, duration: 630, layout: 'chapter'},
  close: {from: 10155, duration: 150, layout: 'card'},
} as const;

export type TabletBeatName = keyof typeof BEATS;
export type BeatName = Exclude<TabletBeatName, 'proof'>;
export const BEAT_NAMES = Object.keys(BEATS) as TabletBeatName[];
export const IOT_TABLET_WALKTHROUGH_FRAMES = 10305;

export const COPY: Record<TabletBeatName, BeatCopy> = {
  open: {headline: 'CTRLbot IoT', body: 'Set up and run a whole room from an Android tablet.'},
  proof: {eyebrow: 'End user interface', title: 'One tap, and it is there'},
  'first-run': {eyebrow: 'First run', title: 'A short tour to start'},
  ai: {eyebrow: 'CTRLbot AI', title: 'A living manual'},
  database: {
    eyebrow: 'Device',
    title: 'Start with a driver',
    body: 'Dozens of manufacturers, hundreds of models and thousands of tested commands. RS-232 and IR go through an end point. Sort by type to find yours.',
  },
  epson: {eyebrow: 'Device', title: 'Everything about the device'},
  add: {eyebrow: 'Connect', title: 'Add it and connect'},
  terminal: {eyebrow: 'Connect', title: 'Test the commands'},
  test: {eyebrow: 'Connect', title: 'Test it as a remote'},
  activities: {eyebrow: 'Activities', title: 'The room builds itself'},
  'switch-audio': {eyebrow: 'Activities', title: 'Power, switching and audio'},
  eui: {eyebrow: 'End user interface', title: 'Locked down for the end user'},
  exit: {eyebrow: 'End user interface', title: 'Hold to get back to setup'},
  discovery: {eyebrow: 'Find Devices', title: "Find what's on the network"},
  'matrox-add': {eyebrow: 'Find Devices', title: 'Add a whole system at once'},
  'matrox-test': {eyebrow: 'Connect', title: 'Test each encoder and decoder'},
  'matrox-switch': {eyebrow: 'Activities', title: 'Encoders and decoders'},
  m2m: {eyebrow: 'End user interface', title: 'Many to many'},
  settings: {eyebrow: 'Settings', title: 'Help is built in'},
  close: {headline: 'CTRLbot IoT', body: 'Set up the room, then hand it over.'},
};

// Absolute composition frames; beat shot times below subtract the beat's start.
export const CUE_FRAMES = {
  welcomeApp: cueFrame(NARRATION_EDIT, 'welcome', 'app'),
  firstRunTour: cueFrame(NARRATION_EDIT, 'first-run-tour', 'walkthrough'),
  firstRunClose: cueFrame(NARRATION_EDIT, 'first-run-tour', 'close'),
  aiIntro: cueFrame(NARRATION_EDIT, 'ai-intro', 'AI'),
  aiTroubleshoot: cueFrame(NARRATION_EDIT, 'ai-manual', 'troubleshoot'),
  aiManual: cueFrame(NARRATION_EDIT, 'ai-manual', 'manual'),
  dbLibrary: cueFrame(NARRATION_EDIT, 'db-devices', 'library'),
  dbSorting: cueFrame(NARRATION_EDIT, 'db-sorting', 'sorting'),
  epsonProjector: cueFrame(NARRATION_EDIT, 'epson-info', 'projector'),
  epsonWebpage: cueFrame(NARRATION_EDIT, 'epson-webpage', 'manufacturer'),
  epsonConnection: cueFrame(NARRATION_EDIT, 'epson-connection', 'connection'),
  addPlus: cueFrame(NARRATION_EDIT, 'add-ip', 'plus'),
  addIp: cueFrame(NARRATION_EDIT, 'add-ip', 'IP'),
  addConnect: cueFrame(NARRATION_EDIT, 'add-saved', 'connect'),
  addSave: cueFrame(NARRATION_EDIT, 'add-saved', 'save'),
  termCommands: cueFrame(NARRATION_EDIT, 'term-commands', 'commands'),
  testListed: cueFrame(NARRATION_EDIT, 'test-device', 'listed'),
  testSwitcher: cueFrame(NARRATION_EDIT, 'test-switcher', 'switcher'),
  testTerminal: cueFrame(NARRATION_EDIT, 'test-terminal', 'terminal'),
  testWebpage: cueFrame(NARRATION_EDIT, 'test-webpage', 'webpage'),
  actActivities: cueFrame(NARRATION_EDIT, 'act-next', 'activities'),
  actPower: cueFrame(NARRATION_EDIT, 'act-presets', 'power'),
  switchSwitcher: cueFrame(NARRATION_EDIT, 'switch-assign', 'switcher'),
  switchAudio: cueFrame(NARRATION_EDIT, 'switch-assign', 'audio'),
  euiInterface: cueFrame(NARRATION_EDIT, 'eui-setup', 'interface'),
  euiSwitching: cueFrame(NARRATION_EDIT, 'eui-technician', 'switching'),
  euiVolume: cueFrame(NARRATION_EDIT, 'eui-volume-mute', 'volume'),
  euiMute: cueFrame(NARRATION_EDIT, 'eui-volume-mute', 'mute'),
  euiPower: cueFrame(NARRATION_EDIT, 'eui-power', 'down'),
  exitHold: cueFrame(NARRATION_EDIT, 'exit-hold', 'hold'),
  exitBack: cueFrame(NARRATION_EDIT, 'exit-hold', 'back', 2),
  discoveryDiscovery: cueFrame(NARRATION_EDIT, 'discovery-scan', 'discovery'),
  discoveryScans: cueFrame(NARRATION_EDIT, 'discovery-scan', 'scans'),
  discoveryDatabase: cueFrame(NARRATION_EDIT, 'discovery-scan', 'database'),
  matroxEndpoints: cueFrame(NARRATION_EDIT, 'matrox-endpoints', 'Matrox'),
  matroxAdd: cueFrame(NARRATION_EDIT, 'matrox-add-these', 'add'),
  // Shot list specifies matrox-one-click "click", but "click" is at the tail of matrox-add-these ("And one click, all you need").
  matroxClick: cueFrame(NARRATION_EDIT, 'matrox-add-these', 'click'),
  matroxIndividual: cueFrame(NARRATION_EDIT, 'matrox-test-individual', 'individual'),
  matroxSwitch: cueFrame(NARRATION_EDIT, 'matrox-test-switch', 'switch'),
  matroxSwitchBack: cueFrame(NARRATION_EDIT, 'matrox-switch-back', 'activities'),
  matroxEncoders: cueFrame(NARRATION_EDIT, 'matrox-switch-change', 'encoders'),
  matroxConvert: cueFrame(NARRATION_EDIT, 'matrox-switch-convertip', 'convert'),
  m2mPress: cueFrame(NARRATION_EDIT, 'm2m-press-click', 'press'),
  m2mClick: cueFrame(NARRATION_EDIT, 'm2m-press-click', 'click'),
  m2mDrag: cueFrame(NARRATION_EDIT, 'm2m-drag-drop', 'drag'),
  m2mAll: cueFrame(NARRATION_EDIT, 'm2m-send-all', 'all'),
  settingsManual: cueFrame(NARRATION_EDIT, 'settings-manual', 'manual'),
  settingsQuick: cueFrame(NARRATION_EDIT, 'settings-quick-start', 'quick'),
  settingsFactory: cueFrame(NARRATION_EDIT, 'settings-reset', 'factory'),
  settingsDatabase: cueFrame(NARRATION_EDIT, 'settings-reset', 'database'),
};

const firstRunRegionsMap = firstRunEducationRegions('tablet');
const aiRegionsMap = aiRegions('tablet');
const catalogRegionsMap = catalogRegions('tablet');
const webRegionsMap = productWebRegions('tablet');
const connectionRegionsMap = connectionRegions('tablet');
const testRegionsMap = connectTestRegions('tablet');
const presetsRegionsMap = activitiesPresetsRegions('tablet');
const switchRegionsMap = activitiesSwitchRegions('tablet');
const avoipRegionsMap = activitiesSwitchRegions('tablet', {switchType: 'avoip'});
const audioRegionsMap = activitiesAudioRegions('tablet');
const discoverRegionsMap = discoverDevicesRegions('tablet');
const settingsRegionsMap = settingsSupportRegions('tablet');

export const BEAT_REGIONS: Partial<Record<TabletBeatName, Region>> = {
  proof: TABLET_EUI_MANY_TO_ONE_REGIONS.full,
  'first-run': firstRunRegionsMap.card,
  ai: aiRegionsMap.questions,
  database: catalogRegionsMap.full,
  epson: fullFrame(TABLET_VIEWPORT),
  add: connectionRegionsMap.content,
  terminal: connectionRegionsMap.terminal,
  test: testRegionsMap.deviceList,
  activities: presetsRegionsMap.content,
  'switch-audio': switchRegionsMap.content,
  eui: TABLET_EUI_MANY_TO_ONE_REGIONS.full,
  exit: padRegion(TABLET_EUI_MANY_TO_ONE_REGIONS.exitControl, 20),
  discovery: discoverRegionsMap.list,
  'matrox-add': discoverRegionsMap.list,
  'matrox-test': testRegionsMap.content,
  'matrox-switch': avoipRegionsMap.content,
  m2m: TABLET_EUI_REGIONS.full,
  settings: settingsRegionsMap.content,
};

// Stage framing stays wider than 94% of the window; emphasis is supplied by beat overlays.
const STAGE_PUSH = {x: 0, y: 0, width: TABLET_VIEWPORT.width * 0.94, height: TABLET_VIEWPORT.height * 0.94};

/**
 * Grows a region about its own centre until it is at least `fraction` of the
 * tablet surface's width AND height (1280x800 dp), then clamps it inside the
 * surface. A region already bigger is returned unchanged.
 *
 * Why: The shell's `expand` fit turns a small region into a 3–4x zoom.
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

const unionRegion = (a: Region, b: Region): Region => {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  };
};

// Saved connection line region from IotTabletBeats.tsx
const savedLineRegion: Region = {
  x: connectionRegionsMap.terminal.x + 10,
  y: connectionRegionsMap.terminal.y + 30,
  width: 190,
  height: 24,
};

export const BEAT_SHOTS: Partial<Record<TabletBeatName, Shot[]>> = {
  proof: [
    {at: 0, region: fullFrame(TABLET_VIEWPORT)},
    {at: BEATS.proof.duration / 2, region: STAGE_PUSH},
    {at: BEATS.proof.duration, region: fullFrame(TABLET_VIEWPORT)},
  ],
  'first-run': [{at: 0, region: atLeast(firstRunRegionsMap.card)}],
  ai: [
    {at: 0, region: aiRegionsMap.content},
    {at: CUE_FRAMES.aiIntro - BEATS.ai.from, region: atLeast(aiRegionsMap.questions)},
  ],
  database: [
    {at: 0, region: catalogRegionsMap.full},
    {at: CUE_FRAMES.dbSorting - BEATS.database.from, region: atLeast(catalogRegionsMap.filters)},
  ],
  epson: [
    {at: 0, region: fullFrame(TABLET_VIEWPORT)},
    {at: CUE_FRAMES.epsonWebpage - BEATS.epson.from, region: atLeast(webRegionsMap.appBar)},
    {at: CUE_FRAMES.epsonConnection - BEATS.epson.from, region: fullFrame(TABLET_VIEWPORT)},
  ],
  add: [
    {at: 0, region: connectionRegionsMap.content},
    {at: CUE_FRAMES.addIp - BEATS.add.from, region: atLeast(connectionRegionsMap.hostField)},
    {at: CUE_FRAMES.addConnect - BEATS.add.from, region: atLeast(connectionRegionsMap.connectAction)},
    {
      at: CUE_FRAMES.addSave - BEATS.add.from,
      region: atLeast(unionRegion(savedLineRegion, connectionRegionsMap.connectAction)),
    },
  ],
  terminal: [{at: 0, region: atLeast(connectionRegionsMap.terminal)}],
  test: [
    {at: 0, region: atLeast(testRegionsMap.deviceList)},
    {at: CUE_FRAMES.testSwitcher - BEATS.test.from, region: testRegionsMap.content},
    {at: CUE_FRAMES.testTerminal - BEATS.test.from, region: atLeast(testRegionsMap.terminal)},
    {at: CUE_FRAMES.testWebpage - BEATS.test.from, region: testRegionsMap.content},
  ],
  activities: [
    {at: 0, region: presetsRegionsMap.content},
    {at: CUE_FRAMES.actPower - BEATS.activities.from, region: atLeast(presetsRegionsMap.presetCard(0))},
  ],
  'switch-audio': [
    {at: 0, region: switchRegionsMap.content},
    {at: CUE_FRAMES.switchAudio - BEATS['switch-audio'].from, region: audioRegionsMap.content},
  ],
  eui: [
    {at: 0, region: TABLET_EUI_MANY_TO_ONE_REGIONS.full},
    {at: CUE_FRAMES.euiVolume - BEATS.eui.from, region: atLeast(TABLET_EUI_MANY_TO_ONE_REGIONS.volumeBar)},
    {at: CUE_FRAMES.euiPower - BEATS.eui.from, region: fullFrame(TABLET_VIEWPORT)},
  ],
  exit: [
    {at: 0, region: atLeast(TABLET_EUI_MANY_TO_ONE_REGIONS.exitControl)},
    {at: CUE_FRAMES.exitBack - BEATS.exit.from, region: fullFrame(TABLET_VIEWPORT)},
  ],
  discovery: [
    {at: 0, region: atLeast(discoverRegionsMap.topBar)},
    {at: CUE_FRAMES.discoveryScans - BEATS.discovery.from, region: discoverRegionsMap.list},
  ],
  'matrox-add': [{at: 0, region: discoverRegionsMap.list}],
  'matrox-test': [{at: 0, region: testRegionsMap.content}],
  'matrox-switch': [
    {at: 0, region: atLeast(switchRegionsMap.switchTypeSelector)},
    {at: CUE_FRAMES.matroxEncoders - BEATS['matrox-switch'].from, region: avoipRegionsMap.content},
  ],
  m2m: [{at: 0, region: TABLET_EUI_REGIONS.full}],
  settings: [
    {at: 0, region: atLeast(settingsRegionsMap.userManual)},
    {at: CUE_FRAMES.settingsQuick - BEATS.settings.from, region: atLeast(settingsRegionsMap.quickStart)},
    {at: CUE_FRAMES.settingsFactory - BEATS.settings.from, region: atLeast(settingsRegionsMap.factoryReset)},
    {at: CUE_FRAMES.settingsDatabase - BEATS.settings.from, region: atLeast(settingsRegionsMap.databaseManagement)},
  ],
};

export const WALKTHROUGH_BEATS: WalkthroughBeat[] = BEAT_NAMES.map((id) => ({
  id,
  ...BEATS[id],
  copy: COPY[id],
  regions: BEAT_REGIONS[id],
  shots: BEAT_SHOTS[id],
  calloutSide: 'left',
  ...(id === 'open' || id === 'close'
    ? {
        card: {
          lockup: 'CTRLbot IoT',
          line:
            id === 'open'
              ? 'Set up and run a whole room from an Android tablet.'
              : 'Set up the room, then hand it over.',
        },
      }
    : {}),
}));
