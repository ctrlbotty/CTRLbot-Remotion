// Fidelity harnesses for the live app surfaces.
//
// Each renders one surface at its natural dp size with no camera, no annotations and
// no copy, so a still can be compared directly against a screenshot of the app. This
// is the gate: get the surface right here, before any of it is animated.

import {AbsoluteFill} from 'remotion';
import {PHONE_VIEWPORT, PhoneEui} from '../app-ui/PhoneEui';
import {TABLET_VIEWPORT, TabletEui} from '../app-ui/TabletEui';
import {CATALOG_VIEWPORT, DriverCatalog, type DriverEntry} from '../app-ui/DriverCatalog';
import {CapturedScreen} from '../app-ui/CapturedScreen';
import {CtrlbotAi} from '../app-ui/CtrlbotAi';
import {
  CONNECTION_VIEWPORT,
  ConnectionPanel,
  type DeviceCommand,
  type TerminalLine,
} from '../app-ui/ConnectionPanel';

/** Demo content. Room names are fictional and sources are generic by design. */
const OUTPUTS = [
  {label: 'Output 1', source: 'Input 1'},
  {label: 'Output 2', source: null},
  {label: 'Output 3', source: null},
  {label: 'Output 4', source: 'Input 1'},
];

const INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

export const PhoneEuiProof = () => (
  <AbsoluteFill style={{width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height}}>
    <PhoneEui outputs={OUTPUTS} inputs={INPUTS} selectedInput={0} volume={0.42} />
  </AbsoluteFill>
);

export const TabletEuiProof = () => (
  <AbsoluteFill style={{width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height}}>
    <TabletEui outputs={OUTPUTS} inputs={INPUTS} selectedInput={0} volume={0.42} />
  </AbsoluteFill>
);

/** Real manufacturers and models, matching the bundled catalog the app ships. */
const DRIVERS: DriverEntry[] = [
  {manufacturer: 'ACER', model: 'XL2320P', deviceType: 'projector'},
  {manufacturer: 'AVPRO EDGE', model: 'AC-MX-44', deviceType: 'switcher'},
  {manufacturer: 'BARCO', model: 'F80-4K12', deviceType: 'projector'},
  {manufacturer: 'BENQ', model: 'LU895UST', deviceType: 'projector'},
  {manufacturer: 'BLUSTREAM', model: 'CMX44CS', deviceType: 'switcher'},
  {manufacturer: 'CANON', model: 'WUX7000Z', deviceType: 'projector'},
  {manufacturer: 'CHRISTIE', model: 'FHD551', deviceType: 'display'},
  {manufacturer: 'EPSON', model: 'PowerLite L630U', deviceType: 'projector'},
];

export const TabletCatalogProof = () => (
  <AbsoluteFill
    style={{width: CATALOG_VIEWPORT.tablet.width, height: CATALOG_VIEWPORT.tablet.height}}
  >
    <DriverCatalog device="tablet" drivers={DRIVERS} />
  </AbsoluteFill>
);

export const PhoneCatalogProof = () => (
  <AbsoluteFill
    style={{width: CATALOG_VIEWPORT.phone.width, height: CATALOG_VIEWPORT.phone.height}}
  >
    <DriverCatalog device="phone" drivers={DRIVERS} />
  </AbsoluteFill>
);

/**
 * Private-range address and the real Epson ESC/VP21 command set, per the capture.
 * Deliberately longer than fits: the app's command list scrolls, and the last row
 * clipping at the terminal is what tells the viewer there is more below.
 */
const COMMANDS: DeviceCommand[] = [
  {label: 'Power On', reference: 'PWR ON\\r'},
  {label: 'Power Off', reference: 'PWR OFF\\r'},
  {label: 'Power Toggle', reference: 'KEY 01\\r'},
  {label: 'Volume Up', reference: 'KEY 56\\r'},
  {label: 'Volume Down', reference: 'KEY 57\\r'},
  {label: 'Mute', reference: 'MUTE ON\\r'},
  {label: 'Source HDMI 1', reference: 'SOURCE 30\\r'},
  {label: 'Source HDMI 2', reference: 'SOURCE A0\\r'},
  {label: 'Freeze', reference: 'FREEZE ON\\r'},
  {label: 'Aspect', reference: 'ASPECT 30\\r'},
];

const TERMINAL: TerminalLine[] = [
  {text: 'Connected to 192.168.0.95:3629', kind: 'status'},
];

export const TabletConnectionProof = () => (
  <AbsoluteFill
    style={{width: CONNECTION_VIEWPORT.tablet.width, height: CONNECTION_VIEWPORT.tablet.height}}
  >
    <ConnectionPanel
      device="tablet"
      deviceName="EPSON PowerLite - New"
      host="192.168.0.95"
      port="3629"
      connected
      commands={COMMANDS}
      terminal={TERMINAL}
    />
  </AbsoluteFill>
);

export const PhoneConnectionProof = () => (
  <AbsoluteFill
    style={{width: CONNECTION_VIEWPORT.phone.width, height: CONNECTION_VIEWPORT.phone.height}}
  >
    <ConnectionPanel
      device="phone"
      deviceName="EPSON PowerLite - New"
      host="192.168.0.95"
      port="3629"
      connected
      commands={COMMANDS}
      terminal={TERMINAL}
    />
  </AbsoluteFill>
);

/**
 * CTRLbot AI is the one surface with no layout XML behind it — it is a WebView — so its
 * proof is compared against `captures/tablet/ctrlbot-ai-core.png` rather than against
 * res/. Check the rail carries four destinations and no EUI launcher: at this point in
 * the story no connection has been saved.
 */
export const TabletCtrlbotProof = () => (
  <AbsoluteFill style={{width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height}}>
    <CtrlbotAi device="tablet" promptFocused />
  </AbsoluteFill>
);

export const PhoneCtrlbotProof = () => (
  <AbsoluteFill style={{width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height}}>
    <CtrlbotAi device="phone" promptFocused />
  </AbsoluteFill>
);

export const PhoneCaptureProof = () => (
  <AbsoluteFill style={{width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height}}>
    <CapturedScreen device="phone" src="captures/phone/onboarding.png" />
  </AbsoluteFill>
);

export const TabletCaptureProof = () => (
  <AbsoluteFill style={{width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height}}>
    <CapturedScreen device="tablet" src="captures/tablet/onboarding.png" />
  </AbsoluteFill>
);
