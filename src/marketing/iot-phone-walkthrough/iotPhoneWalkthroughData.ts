// Beat timings, copy, camera regions and cue frames for the CTRLbot IoT phone walkthrough.
//
// Source: `videos/iot-phone-walkthrough.md` (Roadmap W03, revision 2).
// Migrated to WalkthroughShell: 10080 frames (336s) across landscape and portrait shapes.

import {fullFrame, type Region, type Shot} from '../../camera/Camera';
import {PHONE_VIEWPORT} from '../../app-ui/viewports';
import {cueFrame, type BeatCopy, type WalkthroughBeat} from '../WalkthroughShell';
import {NARRATION_EDIT} from './iotPhoneWalkthroughNarration.generated';
import {PHONE_EUI_MANY_TO_ONE_REGIONS, EUI_REGIONS} from '../../app-ui/PhoneEui';
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

/**
 * 30fps. Beat boundaries in frames. Total: 336s = 10080 frames.
 *
 * Sized to the edited narration (iotPhoneWalkthroughNarration.ts), with Nathan's
 * 2026-10-02 allocation: settings 15.5s (465 frames) and close 5.5s (165 frames).
 */
export const BEATS = {
  open: {from: 0, duration: 150, layout: 'card'},
  proof: {from: 150, duration: 180, layout: 'stage'},
  'first-run': {from: 330, duration: 495, layout: 'chapter'},
  ai: {from: 825, duration: 555, layout: 'chapter'},
  database: {from: 1380, duration: 750, layout: 'chapter'},
  epson: {from: 2130, duration: 450, layout: 'chapter'},
  add: {from: 2580, duration: 285, layout: 'chapter'},
  terminal: {from: 2865, duration: 465, layout: 'chapter'},
  test: {from: 3330, duration: 600, layout: 'chapter'},
  activities: {from: 3930, duration: 630, layout: 'chapter'},
  'switch-audio': {from: 4560, duration: 525, layout: 'chapter'},
  eui: {from: 5085, duration: 765, layout: 'chapter'},
  exit: {from: 5850, duration: 300, layout: 'chapter'},
  discovery: {from: 6150, duration: 585, layout: 'chapter'},
  'matrox-add': {from: 6735, duration: 855, layout: 'chapter'},
  'matrox-test': {from: 7590, duration: 555, layout: 'chapter'},
  'matrox-switch': {from: 8145, duration: 510, layout: 'chapter'},
  m2m: {from: 8655, duration: 795, layout: 'chapter'},
  settings: {from: 9450, duration: 465, layout: 'chapter'},
  close: {from: 9915, duration: 165, layout: 'card'},
} as const;

export type BeatName = keyof typeof BEATS;
export const BEAT_NAMES = Object.keys(BEATS) as BeatName[];
export const IOT_PHONE_WALKTHROUGH_FRAMES = 10080;

/** Copy for each beat from the brief's Revision 2 Copy table. */
export const COPY: Record<BeatName, BeatCopy> = {
  open: {
    headline: 'CTRLbot IoT',
    body: 'Set up and run a whole room from an Android phone.',
  },
  proof: {
    eyebrow: 'End user interface',
    title: 'One tap, and it is there',
  },
  'first-run': {
    eyebrow: 'First run',
    title: 'A short tour to start',
  },
  ai: {
    eyebrow: 'CTRLbot AI',
    title: 'A manual that answers back',
  },
  database: {
    eyebrow: 'Device',
    title: 'Start with a driver',
    body: 'Dozens of manufacturers, hundreds of models and thousands of tested commands, over IP or through an end point to RS-232 and IR.',
  },
  epson: {
    eyebrow: 'Device',
    title: 'Everything about the device',
  },
  add: {
    eyebrow: 'Connect',
    title: 'Add it and connect',
  },
  terminal: {
    eyebrow: 'Connect',
    title: 'Test every command',
  },
  test: {
    eyebrow: 'Connect',
    title: 'Test it as a remote',
  },
  activities: {
    eyebrow: 'Activities',
    title: 'The room builds itself',
  },
  'switch-audio': {
    eyebrow: 'Activities',
    title: 'Switching and audio, done for you',
  },
  eui: {
    eyebrow: 'End user interface',
    title: 'The room, for whoever walks in',
  },
  exit: {
    eyebrow: 'End user interface',
    title: 'Hold to get back to setup',
  },
  discovery: {
    eyebrow: 'Find Devices',
    title: "Find what's on the network",
  },
  'matrox-add': {
    eyebrow: 'Find Devices',
    title: 'Add a whole system at once',
  },
  'matrox-test': {
    eyebrow: 'Connect',
    title: 'Test the whole system',
  },
  'matrox-switch': {
    eyebrow: 'Activities',
    title: 'Encoders and decoders',
  },
  m2m: {
    eyebrow: 'End user interface',
    title: 'Many to many',
  },
  settings: {
    eyebrow: 'Settings',
    title: 'Help is built in',
  },
  close: {
    headline: 'CTRLbot IoT',
    body: 'Set up the room, then hand it over.',
  },
};

/** Absolute composition frames for words in the narration edit. */
export const CUE_FRAMES = {
  app: cueFrame(NARRATION_EDIT, 'welcome', 'app'),
  walkthrough: cueFrame(NARRATION_EDIT, 'first-run-intro', 'walkthrough'),
  x: cueFrame(NARRATION_EDIT, 'first-run-tour', 'X'),
  ai: cueFrame(NARRATION_EDIT, 'ai-intro', 'AI'),
  troubleshooter: cueFrame(NARRATION_EDIT, 'ai-troubleshooter', 'troubleshooter'),
  issues: cueFrame(NARRATION_EDIT, 'ai-help', 'issues'),
  database: cueFrame(NARRATION_EDIT, 'db-intro', 'database'),
  endpoint: cueFrame(NARRATION_EDIT, 'db-endpoints', 'endpoint'),
  epson: cueFrame(NARRATION_EDIT, 'epson-specs', 'Epson'),
  link: cueFrame(NARRATION_EDIT, 'epson-product-page', 'link'),
  plus: cueFrame(NARRATION_EDIT, 'add-ip', 'plus'),
  ip: cueFrame(NARRATION_EDIT, 'add-ip', 'IP'),
  connected: cueFrame(NARRATION_EDIT, 'add-saved', 'connected'),
  termButtons: cueFrame(NARRATION_EDIT, 'term-testing', 'buttons'),
  terminal: cueFrame(NARRATION_EDIT, 'term-testing', 'terminal'),
  message: cueFrame(NARRATION_EDIT, 'term-message', 'message'),
  testButtons: cueFrame(NARRATION_EDIT, 'test-webpage', 'buttons'),
  testSwitcher: cueFrame(NARRATION_EDIT, 'test-webpage', 'switcher'),
  testTerminal: cueFrame(NARRATION_EDIT, 'test-webpage', 'terminal'),
  testWebpage: cueFrame(NARRATION_EDIT, 'test-webpage', 'webpage'),
  activities: cueFrame(NARRATION_EDIT, 'act-intro', 'activities'),
  builds: cueFrame(NARRATION_EDIT, 'act-power-on', 'builds'),
  command: cueFrame(NARRATION_EDIT, 'act-power-on', 'command'),
  switchAudioSwitcher: cueFrame(NARRATION_EDIT, 'switch-audio-setup', 'switcher'),
  audio: cueFrame(NARRATION_EDIT, 'switch-audio-setup', 'audio'),
  turn: cueFrame(NARRATION_EDIT, 'eui-screen', 'turn'),
  sources: cueFrame(NARRATION_EDIT, 'eui-screen', 'sources'),
  euiAudio: cueFrame(NARRATION_EDIT, 'eui-power', 'audio'),
  off: cueFrame(NARRATION_EDIT, 'eui-power', 'off'),
  hold: cueFrame(NARRATION_EDIT, 'exit-hold', 'hold'),
  setupSecond: cueFrame(NARRATION_EDIT, 'exit-hold', 'setup', 2),
  discovery: cueFrame(NARRATION_EDIT, 'discovery-intro', 'discovery'),
  scans: cueFrame(NARRATION_EDIT, 'discovery-scan', 'scans'),
  library: cueFrame(NARRATION_EDIT, 'discovery-scan', 'library'),
  matrox: cueFrame(NARRATION_EDIT, 'matrox-add-intro', 'Matrox'),
  adding: cueFrame(NARRATION_EDIT, 'matrox-add-saving', 'adding'),
  saving: cueFrame(NARRATION_EDIT, 'matrox-add-saving', 'saving'),
  connect: cueFrame(NARRATION_EDIT, 'matrox-test-menu', 'connect'),
  matroxTestMatrox: cueFrame(NARRATION_EDIT, 'matrox-test-switcher', 'Matrox'),
  individual: cueFrame(NARRATION_EDIT, 'matrox-test-single', 'individual'),
  switchActivities: cueFrame(NARRATION_EDIT, 'matrox-switch-menu', 'activities'),
  encoders: cueFrame(NARRATION_EDIT, 'matrox-switch-menu', 'encoders'),
  label: cueFrame(NARRATION_EDIT, 'matrox-switch-labels', 'label'),
  many: cueFrame(NARRATION_EDIT, 'm2m-displays', 'many'),
  source: cueFrame(NARRATION_EDIT, 'm2m-drag', 'source'),
  display: cueFrame(NARRATION_EDIT, 'm2m-drag', 'display'),
  drag: cueFrame(NARRATION_EDIT, 'm2m-drop', 'drag'),
  all: cueFrame(NARRATION_EDIT, 'm2m-all', 'all'),
  settingsSetup: cueFrame(NARRATION_EDIT, 'settings-setup', 'Setup'),
  manual: cueFrame(NARRATION_EDIT, 'settings-support', 'Manual'),
  quick: cueFrame(NARRATION_EDIT, 'settings-support', 'Quick'),
  factory: cueFrame(NARRATION_EDIT, 'settings-support', 'factory'),
};

const phoneFull = fullFrame(PHONE_VIEWPORT);
const euiReg = PHONE_EUI_MANY_TO_ONE_REGIONS;
const m2mReg = EUI_REGIONS;
const firstRunReg = firstRunEducationRegions('phone');
const aiReg = aiRegions('phone');
const catalogReg = catalogRegions('phone');
const productWebReg = productWebRegions('phone');
const connReg = connectionRegions('phone');
const connectTestReg = connectTestRegions('phone');
const presetsReg = activitiesPresetsRegions('phone');
const switchReg = activitiesSwitchRegions('phone');
const audioReg = activitiesAudioRegions('phone');
const discoverReg = discoverDevicesRegions('phone');
const settingsReg = settingsSupportRegions('phone');

export const BEAT_REGIONS: Partial<Record<BeatName, Region>> = {
  proof: euiReg.displayPanel,
  'first-run': firstRunReg.card,
  ai: aiReg.questions,
  database: catalogReg.filters,
  epson: productWebReg.addressBar,
  add: connReg.hostField,
  terminal: connReg.terminal,
  test: connectTestReg.subTabs,
  activities: presetsReg.tabPill,
  'switch-audio': switchReg.switchTab,
  eui: euiReg.displayPanel,
  exit: m2mReg.exitControl,
  discovery: discoverReg.topBar,
  'matrox-add': discoverReg.list,
  'matrox-test': connectTestReg.switcherOutputs,
  'matrox-switch': switchReg.encoderIconAndLabel(0),
  m2m: m2mReg.outputGrid,
  settings: settingsReg.userManual,
};

/**
 * Ensures a camera region is at least `fraction` of the phone viewport's width and height.
 *
 * Why: The shell's `expand` fit turns a small region into a 3–4x zoom.
 */
export const atLeast = (region: Region, fraction = 0.5): Region => {
  const minW = PHONE_VIEWPORT.width * fraction;
  const minH = PHONE_VIEWPORT.height * fraction;
  if (region.width >= minW && region.height >= minH) {
    return region;
  }
  const width = Math.max(region.width, minW);
  const height = Math.max(region.height, minH);
  const cx = region.x + region.width / 2;
  const cy = region.y + region.height / 2;
  const x = Math.max(0, Math.min(PHONE_VIEWPORT.width - width, cx - width / 2));
  const y = Math.max(0, Math.min(PHONE_VIEWPORT.height - height, cy - height / 2));
  return {x, y, width, height};
};

export const BEAT_SHOTS: Partial<Record<BeatName, Shot[]>> = {
  proof: [
    {at: 0, region: phoneFull},
    {at: CUE_FRAMES.app - BEATS.proof.from, region: euiReg.displayPanel},
  ],
  'first-run': [
    {at: 0, region: atLeast(firstRunReg.card)},
    {at: CUE_FRAMES.x - BEATS['first-run'].from, region: phoneFull},
  ],
  ai: [
    {at: 0, region: phoneFull},
    {at: CUE_FRAMES.ai - BEATS.ai.from, region: atLeast(aiReg.questions)},
  ],
  database: [
    {at: 0, region: atLeast(catalogReg.card(0))},
    {at: CUE_FRAMES.endpoint - BEATS.database.from, region: atLeast(catalogReg.filters)},
  ],
  epson: [
    {at: 0, region: phoneFull},
    {at: CUE_FRAMES.link - BEATS.epson.from, region: atLeast(productWebReg.addressBar)},
  ],
  add: [
    {at: 0, region: phoneFull},
    {at: CUE_FRAMES.ip - BEATS.add.from, region: atLeast(connReg.hostField)},
    {at: CUE_FRAMES.connected - BEATS.add.from, region: atLeast(connReg.connectAction)},
  ],
  terminal: [
    {at: 0, region: atLeast(connReg.commandRow(0))},
    {at: CUE_FRAMES.terminal - BEATS.terminal.from, region: atLeast(connReg.terminal)},
  ],
  test: [
    {at: 0, region: atLeast(connectTestReg.subTabs)},
  ],
  activities: [
    {at: 0, region: atLeast(presetsReg.tabPill)},
    {at: CUE_FRAMES.builds - BEATS.activities.from, region: atLeast(presetsReg.presetCard(0))},
    {at: CUE_FRAMES.command - BEATS.activities.from, region: atLeast(presetsReg.commandStep(0))},
  ],
  'switch-audio': [
    {at: 0, region: atLeast(switchReg.switchTab)},
    {at: CUE_FRAMES.audio - BEATS['switch-audio'].from, region: atLeast(audioReg.audioTab)},
  ],
  eui: [
    {at: 0, region: phoneFull},
    {at: CUE_FRAMES.turn - BEATS.eui.from, region: atLeast(m2mReg.powerControl)},
    {at: CUE_FRAMES.sources - BEATS.eui.from, region: atLeast(euiReg.inputStrip)},
    {at: CUE_FRAMES.euiAudio - BEATS.eui.from, region: atLeast(m2mReg.volumeSlider)},
    {at: CUE_FRAMES.off - BEATS.eui.from, region: atLeast(m2mReg.powerControl)},
    {at: CUE_FRAMES.off - BEATS.eui.from + 24, region: phoneFull},
  ],
  exit: [
    {at: 0, region: atLeast(m2mReg.exitControl)},
    {at: CUE_FRAMES.setupSecond - BEATS.exit.from, region: phoneFull},
  ],
  discovery: [
    {at: 0, region: atLeast(discoverReg.topBar)},
    {at: CUE_FRAMES.scans - BEATS.discovery.from, region: atLeast(discoverReg.status)},
    {at: CUE_FRAMES.library - BEATS.discovery.from, region: atLeast(discoverReg.card(0))},
  ],
  'matrox-add': [
    {at: 0, region: discoverReg.list},
    {at: CUE_FRAMES.adding - BEATS['matrox-add'].from, region: atLeast(discoverReg.addButton(0))},
  ],
  'matrox-test': [
    {at: 0, region: atLeast(connectTestReg.topToggle)},
    {at: CUE_FRAMES.matroxTestMatrox - BEATS['matrox-test'].from, region: atLeast(connectTestReg.switcherOutputs)},
    {at: CUE_FRAMES.individual - BEATS['matrox-test'].from, region: atLeast(connectTestReg.switcherOutput(0))},
  ],
  'matrox-switch': [
    {at: 0, region: atLeast(switchReg.tabPill)},
    {at: CUE_FRAMES.encoders - BEATS['matrox-switch'].from, region: atLeast(switchReg.switchTypeSelector)},
    {at: CUE_FRAMES.label - BEATS['matrox-switch'].from, region: atLeast(switchReg.encoderIconAndLabel(0))},
  ],
  m2m: [
    {at: 0, region: atLeast(m2mReg.outputGrid)},
    {at: CUE_FRAMES.source - BEATS.m2m.from, region: atLeast(m2mReg.inputStrip)},
    {at: CUE_FRAMES.all - BEATS.m2m.from, region: atLeast(m2mReg.routeAll)},
  ],
  settings: [
    {at: 0, region: atLeast(settingsReg.setupButton)},
    {at: CUE_FRAMES.manual - BEATS.settings.from, region: atLeast(settingsReg.userManual)},
    {at: CUE_FRAMES.quick - BEATS.settings.from, region: atLeast(settingsReg.quickStart)},
    {at: CUE_FRAMES.factory - BEATS.settings.from, region: atLeast(settingsReg.factoryReset)},
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
              ? 'Set up and run a whole room from an Android phone.'
              : 'Set up the room, then hand it over.',
        },
      }
    : {}),
}));
