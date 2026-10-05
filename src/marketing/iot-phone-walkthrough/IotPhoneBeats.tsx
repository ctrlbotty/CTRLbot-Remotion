import React from 'react';
import {Easing, Sequence, interpolate} from 'remotion';
import {AppIcon} from '../../app-ui/AppIcon';
import {PHONE_VIEWPORT} from '../../app-ui/viewports';
import {
  EUI_REGIONS,
  PHONE_EUI_MANY_TO_ONE_REGIONS,
  PhoneEui,
  PhoneEuiManyToOne,
  type EuiInput,
  type EuiOutput,
} from '../../app-ui/PhoneEui';
import {
  FirstRunEducation,
  firstRunEducationRegions,
} from '../../app-ui/FirstRunEducation';
import {AI_QUESTIONS, CtrlbotAi, aiRegions} from '../../app-ui/CtrlbotAi';
import {
  DriverCatalog,
  SETUP_BACKGROUND,
  catalogRegions,
  type DriverEntry,
} from '../../app-ui/DriverCatalog';
import {ProductWebView} from '../../app-ui/ProductWebView';
import {
  ConnectionPanel,
  connectionRegions,
  type DeviceCommand,
  type TerminalLine,
} from '../../app-ui/ConnectionPanel';
import {
  ConnectTest,
  connectTestRegions,
  DEFAULT_MATROX_DEVICE_LIST,
  DEFAULT_MATROX_INPUTS,
  type ConnectTestSubTab,
} from '../../app-ui/ConnectTest';
import {
  ActivitiesPresets,
  activitiesPresetsRegions,
  DEFAULT_COMMAND_STEPS,
} from '../../app-ui/ActivitiesPresets';
import {
  ActivitiesSwitch,
  activitiesSwitchRegions,
  DEFAULT_AVOIP_DECODERS,
  DEFAULT_AVOIP_ENCODERS,
} from '../../app-ui/ActivitiesSwitch';
import {
  ActivitiesAudio,
  activitiesAudioRegions,
  DEFAULT_AUDIO_MAPPINGS,
} from '../../app-ui/ActivitiesAudio';
import {
  DEFAULT_DISCOVERED_DEVICES,
  DiscoverDevices,
  discoverDevicesRegions,
  type DiscoveredDevice,
} from '../../app-ui/DiscoverDevices';
import {SettingsSupport, settingsSupportRegions} from '../../app-ui/SettingsSupport';
import {EUI_POWER_REGIONS, EuiPowerCapture} from '../../app-ui/EuiPower';
import {PhoneNavMenu} from '../../app-ui/PhoneNavMenu';
import {centerOf, type Region} from '../../camera/Camera';
import {FocusRing, Spotlight, TapIndicator} from '../../camera/Annotations';
import {appColors, appDimens} from '../../design/tokens.generated';
import {font} from '../../design/theme';
import {BEATS, CUE_FRAMES, type BeatName} from './iotPhoneWalkthroughData';

const CATALOG_DRIVERS: DriverEntry[] = [
  {manufacturer: 'ACER', model: 'XL2320P', deviceType: 'projector'},
  {manufacturer: 'AVPRO EDGE', model: 'AC-MX-44', deviceType: 'switcher'},
  {manufacturer: 'BARCO', model: 'F80-4K12', deviceType: 'projector'},
  {manufacturer: 'BENQ', model: 'LU895UST', deviceType: 'projector'},
  {manufacturer: 'BLUSTREAM', model: 'CMX44CS', deviceType: 'switcher'},
  {manufacturer: 'CANON', model: 'WUX7000Z', deviceType: 'projector'},
  {manufacturer: 'CHRISTIE', model: 'FHD551', deviceType: 'display'},
  {manufacturer: 'EPSON', model: 'PowerLite L630U', deviceType: 'projector'},
  {manufacturer: 'MATROX', model: 'ConvertIP DSH', deviceType: 'endPoint'},
];

const EPSON_COMMANDS: DeviceCommand[] = [
  {label: 'POWER ON', reference: 'PWR ON\\r'},
  {label: 'POWER OFF', reference: 'PWR OFF\\r'},
  {label: 'POWER TOGGLE', reference: 'PWR TOGGLE\\r'},
  {label: 'SOURCE HDMI 1', reference: 'SOURCE 30\\r'},
  {label: 'SOURCE HDMI 2', reference: 'SOURCE A0\\r'},
];

/** Standard phone surface frame. */
const PhoneScreen: React.FC<{
  children: React.ReactNode;
  bg?: string;
  fontFamily?: string;
  display?: string;
  flexDirection?: 'column' | 'row';
}> = ({
  children,
  bg = appColors.black,
  fontFamily,
  display,
  flexDirection,
}) => (
  <div
    style={{
      position: 'relative',
      width: PHONE_VIEWPORT.width,
      height: PHONE_VIEWPORT.height,
      backgroundColor: bg,
      overflow: 'hidden',
      fontFamily,
      display,
      flexDirection,
    }}
  >
    {children}
  </div>
);

/**
 * Open beat (5s = 150 frames):
 * The phone EUI at rest, one projector output and its sources.
 */
export const OpenBeat: React.FC<{frame: number; frames: number}> = () => (
  <PhoneEuiManyToOne
    inputs={[
      {label: 'Input 1'},
      {label: 'Input 2'},
      {label: 'HDMI 1'},
      {label: 'HDMI 2'},
    ]}
    selectedInput={null}
    volume={0.42}
    outputLabel="DISPLAY 1"
  />
);

/**
 * Proof beat (6s = 180 frames):
 * The phone EUI; a source is tapped and the display fills with it in the same moment, ringed.
 * Cue: welcome "app".
 */
export const ProofBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const appCue = CUE_FRAMES.app - BEATS.proof.from;
  const isRouted = frame >= appCue;
  const sourceTile = PHONE_EUI_MANY_TO_ONE_REGIONS.inputTile(0);
  const displayPanel = PHONE_EUI_MANY_TO_ONE_REGIONS.displayPanel;

  return (
    <>
      <PhoneEuiManyToOne
        inputs={[
          {label: 'Input 1'},
          {label: 'Input 2'},
          {label: 'HDMI 1'},
          {label: 'HDMI 2'},
        ]}
        selectedInput={isRouted ? 0 : null}
        volume={0.42}
        outputLabel="DISPLAY 1"
      />
      <TapIndicator
        x={centerOf(sourceTile).x}
        y={centerOf(sourceTile).y}
        at={appCue}
        name="Proof source tap"
      />
      <FocusRing
        region={displayPanel}
        appearAt={appCue}
        radius={0}
        name="Proof display ring"
      />
    </>
  );
};

/**
 * First-run beat (16.5s = 495 frames):
 * Full frame: the first-run walkthrough over the setup screen steps forward,
 * then its ✕ is tapped and it closes, revealing the underlying setup screen.
 * Cues: walkthrough "walkthrough", x "X".
 */
export const FirstRunBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const walkthroughCue = CUE_FRAMES.walkthrough - BEATS['first-run'].from;
  const xCue = CUE_FRAMES.x - BEATS['first-run'].from;

  const step = frame < walkthroughCue ? 1 : 2;
  const cardOpacity =
    frame < xCue
      ? 1
      : interpolate(frame, [xCue, xCue + 15], [1, 0], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  const closeBtn = firstRunEducationRegions('phone').closeButton;

  return (
    <>
      <FirstRunEducation
        device="phone"
        step={step}
        cardOpacity={cardOpacity}
        showClose={frame < xCue + 15}
      />
      <TapIndicator
        x={centerOf(closeBtn).x}
        y={centerOf(closeBtn).y}
        at={xCue}
        name="First-run close tap"
      />
    </>
  );
};

/**
 * AI beat (18.5s = 555 frames):
 * The question list fills the frame; a question is tapped and its answer lands, readable.
 * Cues: ai "AI", troubleshooter "troubleshooter", issues "issues".
 */
export const AiBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const aiCue = CUE_FRAMES.ai - BEATS.ai.from;
  const troubleshooterCue = CUE_FRAMES.troubleshooter - BEATS.ai.from;
  const issuesCue = CUE_FRAMES.issues - BEATS.ai.from;

  const isQuestionPicked = frame >= troubleshooterCue;
  const answerProgress = interpolate(frame, [issuesCue, issuesCue + 16], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const question1Region = aiRegions('phone').question(1);

  return (
    <PhoneScreen fontFamily={font.ui}>
      <CtrlbotAi device="phone" promptFocused={isQuestionPicked} />

      <TapIndicator
        x={centerOf(question1Region).x}
        y={centerOf(question1Region).y}
        at={troubleshooterCue}
        name="Question tap"
      />

      {frame < issuesCue + 10 ? (
        <FocusRing
          region={question1Region}
          appearAt={troubleshooterCue}
          radius={6}
          name="Question focus ring"
        />
      ) : null}

      {/* When a question is picked, an answer card lands */}
      {answerProgress > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            top: 360,
            opacity: answerProgress,
            transform: `translateY(${(1 - answerProgress) * 16}px)`,
            backgroundColor: appColors.gray20,
            borderRadius: 12,
            padding: '18px 20px',
            border: `1px solid ${appColors.blue}`,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
            zIndex: 4,
          }}
        >
          <div
            style={{
              fontFamily: font.ui,
              fontWeight: 600,
              fontSize: 14,
              color: appColors.blue,
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <AppIcon name="ic_ctrlbot" size={18} tint={appColors.blue} />
            {AI_QUESTIONS[1]}
          </div>
          <div
            style={{
              fontFamily: font.ui,
              fontWeight: 400,
              fontSize: 13,
              lineHeight: 1.45,
              color: appColors.white,
            }}
          >
            CTRLbot IoT is an Android app for complete room control without an external
            processor. Control displays, switchers, and audio over IP or through endpoints
            to RS-232 and IR devices.
          </div>
        </div>
      ) : null}

      <PhoneNavMenu expanded={frame < aiCue} active="ctrlbot" />
    </PhoneScreen>
  );
};

/**
 * Database beat (25s = 750 frames):
 * The catalog, on the app's blue wash, scrolls; the category filter is tapped
 * and opens on Projector, Display, Switchers, End Points.
 * Cues: database "database", endpoint "endpoint".
 */
export const DatabaseBeat: React.FC<{frame: number; frames: number; review?: boolean}> = ({frame, review}) => {
  const databaseCue = CUE_FRAMES.database - BEATS.database.from;
  const endpointCue = CUE_FRAMES.endpoint - BEATS.database.from;

  const scrollEnd = Math.min(databaseCue + 180, endpointCue - 20);
  const listScroll = interpolate(
    frame,
    [databaseCue, scrollEnd],
    [0, 160],
    {
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const menuOpen = !review && frame >= endpointCue;
  const openMenu = menuOpen
    ? {
        control: 'category' as const,
        items: ['Projector', 'Display', 'Switchers', 'End Points'] as const,
      }
    : undefined;

  // The category filter button is the first row of filters on phone (top: 104, height: 50).
  const categoryFilterRegion = {x: 12, y: 104, width: PHONE_VIEWPORT.width - 24, height: 50};

  return (
    <PhoneScreen>
      <DriverCatalog
        device="phone"
        drivers={CATALOG_DRIVERS}
        listScroll={listScroll}
        openMenu={openMenu}
        background={SETUP_BACKGROUND}
      />

      {!review && <TapIndicator
        x={centerOf(categoryFilterRegion).x}
        y={centerOf(categoryFilterRegion).y}
        at={endpointCue}
        name="Category filter tap"
      />}

      {menuOpen ? (
        <FocusRing
          region={categoryFilterRegion}
          appearAt={endpointCue}
          radius={5}
          name="Category filter ring"
        />
      ) : null}

      <PhoneNavMenu expanded={false} active="device" />
    </PhoneScreen>
  );
};

/**
 * Epson PowerLite driver detail view sheet.
 */
const EpsonDetailView: React.FC = () => (
  <PhoneScreen
    bg={appColors.gray10}
    fontFamily={font.ui}
    display="flex"
    flexDirection="column"
  >
    {/* Top Header */}
    <div
      style={{
        height: appDimens.headerHeight,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        gap: 12,
        backgroundColor: appColors.black,
        flex: '0 0 auto',
      }}
    >
      <AppIcon
        name="ic_arrow_forward_24"
        size={24}
        tint={appColors.white}
        style={{rotate: '180deg'}}
      />
      <span
        style={{
          fontFamily: font.ui,
          fontWeight: 400,
          fontSize: 18,
          color: appColors.white,
          flex: 1,
        }}
      >
        EPSON Projectors
      </span>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 999,
          backgroundColor: appColors.gray,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppIcon name="ic_add_24" size={22} tint={appColors.white} />
      </div>
    </div>

    {/* Detail Content */}
    <div
      style={{
        flex: 1,
        padding: '16px 14px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Model row with Product Page link */}
      <div>
        <div style={{fontSize: 11, color: appColors.white50, marginBottom: 4}}>Model</div>
        <div style={{display: 'flex', gap: 8, height: 42}}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 12,
              paddingRight: 10,
              backgroundColor: appColors.gray20,
              borderRadius: 4,
              color: appColors.white,
              fontSize: 14,
            }}
          >
            PowerLite
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `6px solid ${appColors.white}`,
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              backgroundColor: appColors.gray20,
              borderRadius: 4,
              color: appColors.white,
              fontSize: 13,
            }}
          >
            Product Page
            <svg width="13" height="13" viewBox="0 0 24 24" fill={appColors.white}>
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div>
        <div style={{fontSize: 14, fontWeight: 700, color: appColors.white, marginBottom: 4}}>
          Device Info
        </div>
        <div style={{fontSize: 11, color: appColors.white50, marginBottom: 2}}>
          Description
        </div>
        <div style={{fontSize: 12, lineHeight: 1.4, color: appColors.white75}}>
          The Epson PowerLite Presenter HD is a portable projector with an integrated DVD
          player and speakers, suitable for presentations and video playback. The Epson
          PowerLite Pro Cinema 800 is a home theater projector designed for high-quality
          image projection in a home environment.
        </div>
      </div>

      {/* Accordions */}
      {['Specs', 'Setup', 'Support'].map((section) => (
        <div
          key={section}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            backgroundColor: appColors.gray15,
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            color: appColors.white,
          }}
        >
          {section}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `6px solid ${appColors.white50}`,
            }}
          />
        </div>
      ))}
    </div>

    <PhoneNavMenu expanded={false} active="device" />
  </PhoneScreen>
);

/**
 * Epson beat (15s = 450 frames):
 * Epson PowerLite's page; the product-page link is ringed and tapped;
 * the web view's address bar shows the page loading, held under two seconds.
 * Cues: epson "Epson", link "link".
 */
export const EpsonBeat: React.FC<{frame: number; frames: number; review?: boolean}> = ({frame, frames, review}) => {
  const epsonCue = CUE_FRAMES.epson - BEATS.epson.from;
  const linkCue = CUE_FRAMES.link - BEATS.epson.from;

  if (!review && frame >= linkCue) {
    const progress = interpolate(frame, [linkCue, frames], [15, 65], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return (
      <ProductWebView
        device="phone"
        title="Manufacturer Home Page"
        host="epson.com"
        progress={progress}
      />
    );
  }

  if (frame < epsonCue + 8) {
    const catalogReg = catalogRegions('phone');
    const epsonCard = {
      ...catalogReg.card(7),
      y: catalogReg.card(7).y - 240,
    };
    return (
      <PhoneScreen>
        <DriverCatalog
          device="phone"
          drivers={CATALOG_DRIVERS}
          listScroll={240}
          background={SETUP_BACKGROUND}
        />
        <TapIndicator
          x={centerOf(epsonCard).x}
          y={centerOf(epsonCard).y}
          at={epsonCue}
          name="Epson card tap"
        />
        <PhoneNavMenu expanded={false} active="device" />
      </PhoneScreen>
    );
  }

  const productPageBtn = review
    ? {x: 195, y: 89.2, width: 151, height: 42}
    : {x: 184, y: 87, width: 162, height: 42};
  const ringStart = Math.max(epsonCue + 30, linkCue - 45);

  return (
    <>
      <EpsonDetailView />
      <FocusRing
        region={productPageBtn}
        appearAt={ringStart}
        radius={4}
        name="Product page link ring"
      />
      <TapIndicator
        x={centerOf(productPageBtn).x}
        y={centerOf(productPageBtn).y}
        at={linkCue}
        name="Product page link tap"
      />
    </>
  );
};

/**
 * Add beat (9.5s = 285 frames):
 * + is tapped and Configure Connection opens; the IP field is ringed and filled;
 * Connect turns Disconnect and the saved line lands.
 * Cues: plus "plus", ip "IP", connected "connected".
 */
export const AddBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const plusCue = CUE_FRAMES.plus - BEATS.add.from;
  const ipCue = CUE_FRAMES.ip - BEATS.add.from;
  const connectedCue = CUE_FRAMES.connected - BEATS.add.from;

  // Header circular add button: 38x38 centered in 56dp header, right padding 12 -> x: 310, y: 9
  const addBtn = {x: 310, y: 9, width: 38, height: 38};

  if (frame < plusCue + 8) {
    return (
      <>
        <EpsonDetailView />
        <TapIndicator
          x={centerOf(addBtn).x}
          y={centerOf(addBtn).y}
          at={plusCue}
          name="Add button tap"
        />
      </>
    );
  }

  const connReg = connectionRegions('phone');
  const fullIp = '192.168.0.134';
  const typeDuration = 24;
  const charsCount = Math.floor(
    interpolate(frame, [ipCue, ipCue + typeDuration], [0, fullIp.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const host = frame < ipCue ? '' : fullIp.slice(0, charsCount);
  const hostCaret = frame >= ipCue && frame < connectedCue;
  const connected = frame >= connectedCue;

  const terminal: TerminalLine[] = connected
    ? [
        {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
        {text: 'Connection saved', kind: 'status'},
      ]
    : [];

  return (
    <PhoneScreen>
      <ConnectionPanel
        device="phone"
        deviceName="EPSON PowerLite - New"
        host={host}
        port="3629"
        connected={connected}
        commands={EPSON_COMMANDS}
        terminal={terminal}
        hostCaret={hostCaret}
      />
      <FocusRing
        region={connReg.hostField}
        appearAt={ipCue}
        radius={5}
        name="Host IP field ring"
      />
      <TapIndicator
        x={centerOf(connReg.connectAction).x}
        y={centerOf(connReg.connectAction).y}
        at={connectedCue}
        name="Connect IP tap"
      />
    </PhoneScreen>
  );
};

/**
 * Terminal beat (15.5s = 465 frames):
 * Power On is tapped and lands in the terminal, readable; a typed command is sent.
 * Cues: termButtons "buttons", terminal "terminal", message "message".
 */
export const TerminalBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const termButtonsCue = CUE_FRAMES.termButtons - BEATS.terminal.from;
  const terminalCue = CUE_FRAMES.terminal - BEATS.terminal.from;
  const messageCue = CUE_FRAMES.message - BEATS.terminal.from;

  const connReg = connectionRegions('phone');
  const highlightedCommand =
    frame >= termButtonsCue && frame < termButtonsCue + 24 ? 0 : null;

  const terminal: TerminalLine[] = [
    {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
    {text: 'Connection saved', kind: 'status'},
  ];

  if (frame >= termButtonsCue) {
    terminal.push({text: 'Sent: PWR ON [0D]', kind: 'sent'});
  }
  if (frame >= messageCue) {
    terminal.push({text: 'Sent: hellow [0D]', kind: 'sent'});
  }

  return (
    <PhoneScreen>
      <ConnectionPanel
        device="phone"
        deviceName="EPSON PowerLite - New"
        host="192.168.0.134"
        port="3629"
        connected
        commands={EPSON_COMMANDS}
        terminal={terminal}
        highlightedCommand={highlightedCommand}
      />
      <TapIndicator
        x={centerOf(connReg.sendButton(0)).x}
        y={centerOf(connReg.sendButton(0)).y}
        at={termButtonsCue}
        name="Power On send tap"
      />
      <FocusRing
        region={connReg.terminal}
        appearAt={terminalCue}
        radius={4}
        name="Terminal focus ring"
      />
    </PhoneScreen>
  );
};

/**
 * Test beat (20s = 600 frames):
 * Each tab is tapped on its spoken word: Buttons, Switcher, Terminal, Web page;
 * the Web page tab held under 2s.
 * Cues: testButtons "buttons", testSwitcher "switcher", testTerminal "terminal", testWebpage "webpage".
 */
export const TestBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const testButtonsCue = CUE_FRAMES.testButtons - BEATS.test.from;
  const testSwitcherCue = CUE_FRAMES.testSwitcher - BEATS.test.from;
  const testTerminalCue = CUE_FRAMES.testTerminal - BEATS.test.from;
  const testWebpageCue = CUE_FRAMES.testWebpage - BEATS.test.from;

  let testTab: ConnectTestSubTab = 'buttons';
  if (frame >= testWebpageCue && frame < testWebpageCue + 54) {
    testTab = 'web';
  } else if (frame >= testTerminalCue && frame < testWebpageCue) {
    testTab = 'terminal';
  } else if (frame >= testSwitcherCue && frame < testTerminalCue) {
    testTab = 'switcher';
  } else {
    testTab = 'buttons';
  }

  const connectReg = connectTestRegions('phone');
  const btnTab = connectReg.subTab('buttons');
  const swTab = connectReg.subTab('switcher');
  const termTab = connectReg.subTab('terminal');
  const webTab = connectReg.subTab('web');

  return (
    <>
      <ConnectTest
        device="phone"
        topTab="test"
        testTab={testTab}
        deviceName="EPSON PowerLite - New"
        connected
        statusColor="green"
      />
      <TapIndicator
        x={centerOf(btnTab).x}
        y={centerOf(btnTab).y}
        at={testButtonsCue}
        name="Buttons tab tap"
      />
      <TapIndicator
        x={centerOf(swTab).x}
        y={centerOf(swTab).y}
        at={testSwitcherCue}
        name="Switcher tab tap"
      />
      <TapIndicator
        x={centerOf(termTab).x}
        y={centerOf(termTab).y}
        at={testTerminalCue}
        name="Terminal tab tap"
      />
      <TapIndicator
        x={centerOf(webTab).x}
        y={centerOf(webTab).y}
        at={testWebpageCue}
        name="Web page tab tap"
      />
    </>
  );
};

/**
 * Activities beat (21s = 630 frames):
 * Presets lists Power On and Power Off; Power On is tapped and opens with the Epson's
 * power-on command already in it, ringed.
 * Cues: activities "activities", builds "builds", command "command".
 */
export const ActivitiesBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const activitiesCue = CUE_FRAMES.activities - BEATS.activities.from;
  const buildsCue = CUE_FRAMES.builds - BEATS.activities.from;
  const commandCue = CUE_FRAMES.command - BEATS.activities.from;

  const presetsReg = activitiesPresetsRegions('phone');
  const isEdit = frame >= buildsCue + 8;

  return (
    <>
      <ActivitiesPresets
        device="phone"
        activeTab="presets"
        mode={isEdit ? 'edit' : 'list'}
        editPresetName="Power On"
        editPresetIconColor={appColors.green}
        commandSteps={isEdit ? DEFAULT_COMMAND_STEPS : []}
      />
      {frame < buildsCue + 8 ? (
        <>
          <FocusRing
            region={presetsReg.presetsTab}
            appearAt={activitiesCue}
            radius={4}
            name="Presets tab ring"
          />
          <TapIndicator
            x={centerOf(presetsReg.presetCard(0)).x}
            y={centerOf(presetsReg.presetCard(0)).y}
            at={buildsCue}
            name="Power On preset tap"
          />
        </>
      ) : (
        <FocusRing
          region={presetsReg.commandStep(0)}
          appearAt={commandCue}
          radius={6}
          name="Power On command ring"
        />
      )}
    </>
  );
};

/**
 * Switch-Audio beat (17.5s = 525 frames):
 * Switch shows many-to-one on the Epson, ringed; then Audio's volume up, down and set mapped, ringed.
 * Cues: switchAudioSwitcher "switcher", audio "audio".
 */
export const SwitchAudioBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const switcherCue = CUE_FRAMES.switchAudioSwitcher - BEATS['switch-audio'].from;
  const audioCue = CUE_FRAMES.audio - BEATS['switch-audio'].from;

  const switchReg = activitiesSwitchRegions('phone');
  const audioReg = activitiesAudioRegions('phone');

  if (frame >= audioCue) {
    return (
      <>
        <ActivitiesAudio
          device="phone"
          activeTab="audio"
          deviceName="EPSON PowerLite - New"
          mappings={DEFAULT_AUDIO_MAPPINGS}
        />
        <FocusRing
          region={audioReg.audioTab}
          appearAt={audioCue}
          radius={4}
          name="Audio tab ring"
        />
      </>
    );
  }

  return (
    <>
      <ActivitiesSwitch
        device="phone"
        activeTab="switch"
        switchType="many_to_one"
        deviceName="EPSON PowerLite - New"
      />
      <FocusRing
        region={switchReg.switchTab}
        appearAt={switcherCue}
        radius={4}
        name="Switch tab ring"
      />
    </>
  );
};

/**
 * EUI beat (25.5s = 765 frames):
 * Welcome, power tapped; a source tapped for the screen; the volume moves;
 * it powers off and lands on Welcome, each on its spoken word.
 * Cues: turn "turn", sources "sources", euiAudio "audio", off "off".
 */
export const EuiBeat: React.FC<{frame: number; frames: number; review?: boolean}> = ({frame, review}) => {
  const turnCue = CUE_FRAMES.turn - BEATS.eui.from;
  const sourcesCue = CUE_FRAMES.sources - BEATS.eui.from;
  const euiAudioCue = CUE_FRAMES.euiAudio - BEATS.eui.from;
  const offCue = CUE_FRAMES.off - BEATS.eui.from;

  const poweringOffStart = offCue + 8;
  const poweringOffDuration = 60;
  const welcomeReturn = poweringOffStart + poweringOffDuration;

  // Phase 1: Welcome screen before power on
  if (frame < turnCue + 8) {
    const welcomePower = review
      ? {x: 124, y: 420, width: 112, height: 112}
      : EUI_POWER_REGIONS.phone.welcomePower;
    return (
      <>
        <EuiPowerCapture device="phone" state="off" />
        <FocusRing
          region={welcomePower}
          appearAt={Math.max(0, turnCue - 24)}
          radius={999}
          name="Welcome power ring"
        />
        <TapIndicator
          x={centerOf(welcomePower).x}
          y={centerOf(welcomePower).y}
          at={turnCue}
          name="Power on tap"
        />
      </>
    );
  }

  // Phase 3 & 4: Powering off dialog, then lands back on Welcome screen
  if (frame >= poweringOffStart) {
    if (frame < welcomeReturn) {
      return (
        <Sequence
          from={poweringOffStart}
          durationInFrames={poweringOffDuration}
          layout="none"
          name="Powering off progress"
        >
          <EuiPowerCapture
            device="phone"
            state="powering-off"
            durationInFrames={poweringOffDuration}
            volume={0.72}
          />
        </Sequence>
      );
    }
    return <EuiPowerCapture device="phone" state="off" volume={0.72} />;
  }

  // Phase 2: Active room control
  const isRouted = frame >= sourcesCue;
  const sourceTile = PHONE_EUI_MANY_TO_ONE_REGIONS.inputTile(0);
  const displayPanel = PHONE_EUI_MANY_TO_ONE_REGIONS.displayPanel;
  const volume =
    frame < euiAudioCue
      ? 0.42
      : interpolate(frame, [euiAudioCue, euiAudioCue + 40], [0.42, 0.72], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <>
      <PhoneEuiManyToOne
        inputs={[
          {label: 'Input 1'},
          {label: 'Input 2'},
          {label: 'HDMI 1'},
          {label: 'HDMI 2'},
        ]}
        selectedInput={isRouted ? 0 : null}
        volume={volume}
        outputLabel="DISPLAY 1"
      />

      {frame < euiAudioCue ? (
        <>
          <TapIndicator
            x={centerOf(sourceTile).x}
            y={centerOf(sourceTile).y}
            at={sourcesCue}
            name="Source tap"
          />
          <FocusRing
            region={displayPanel}
            appearAt={sourcesCue}
            radius={0}
            name="Display panel ring"
          />
        </>
      ) : null}

      {frame >= euiAudioCue && frame < offCue ? (
        <>
          <FocusRing
            region={EUI_REGIONS.volumeSlider}
            appearAt={euiAudioCue}
            radius={0}
            name="Volume slider ring"
          />
          <TapIndicator
            x={EUI_REGIONS.volumeSlider.x + EUI_REGIONS.volumeSlider.width * volume}
            y={centerOf(EUI_REGIONS.volumeSlider).y}
            at={euiAudioCue}
            name="Volume drag"
          />
        </>
      ) : null}

      <FocusRing
        region={EUI_REGIONS.powerControl}
        appearAt={Math.max(0, offCue - 15)}
        radius={4}
        name="Power off ring"
      />
      <TapIndicator
        x={centerOf(EUI_REGIONS.powerControl).x}
        y={centerOf(EUI_REGIONS.powerControl).y}
        at={offCue}
        name="Power off tap"
      />
    </>
  );
};

/**
 * Exit beat (10s = 300 frames):
 * On Welcome, the setup button in the top-left is held: a hold ring fills over
 * two seconds, Keep holding shows, and the setup menu returns.
 * Cues: hold "hold", setupSecond "setup" (second).
 */
export const ExitBeat: React.FC<{frame: number; frames: number; exitRegion?: Region}> = ({frame, exitRegion}) => {
  const holdCue = CUE_FRAMES.hold - BEATS.exit.from;
  const setupSecondCue = CUE_FRAMES.setupSecond - BEATS.exit.from;

  const exitControl = exitRegion ?? EUI_REGIONS.exitControl;
  const holdCenter = centerOf(exitControl);
  const HOLD_FRAMES = 60; // 2 seconds press-and-hold at 30fps
  const holdRadius = 26;
  const circumference = 2 * Math.PI * holdRadius;

  if (frame < setupSecondCue) {
    const holdProgress = interpolate(
      frame,
      [holdCue, holdCue + HOLD_FRAMES],
      [0, 1],
      {
        easing: Easing.linear,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );

    return (
      <>
        <EuiPowerCapture device="phone" state="off" volume={0.72} />

        <Spotlight
          region={exitControl}
          appearAt={0}
          radius={4}
          name="Exit control spotlight"
        />

        {frame >= holdCue ? (
          <>
            <svg
              width={holdRadius * 2 + 12}
              height={holdRadius * 2 + 12}
              style={{
                position: 'absolute',
                left: holdCenter.x - holdRadius - 6,
                top: holdCenter.y - holdRadius - 6,
                pointerEvents: 'none',
              }}
            >
              <circle
                cx={holdRadius + 6}
                cy={holdRadius + 6}
                r={holdRadius}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={3}
              />
              <circle
                cx={holdRadius + 6}
                cy={holdRadius + 6}
                r={holdRadius}
                fill="none"
                stroke={appColors.blue}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={circumference}
                transform={`rotate(-90 ${holdRadius + 6} ${holdRadius + 6})`}
                style={{
                  strokeDashoffset: (1 - holdProgress) * circumference,
                }}
              />
            </svg>
            <span
              style={{
                position: 'absolute',
                left: 48,
                top: 18,
                fontFamily: font.display,
                fontSize: 13,
                color: appColors.white,
                letterSpacing: 0.2,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              Keep holding to return to Setup
            </span>
          </>
        ) : null}
      </>
    );
  }

  return (
    <ActivitiesPresets
      device="phone"
      activeTab="presets"
      mode="list"
      showNavMenu={true}
      toast="Switching activity saved to end UI"
    />
  );
};

export const DISCOVERY_DEVICES: DiscoveredDevice[] = [
  {
    id: 'd0',
    name: 'Luxul AMS-1208P',
    ip: '192.168.0.2',
    hasWebPage: true,
    driverMatch: 'LUXUL Net Switchers',
    actionType: 'add_driver',
  },
  ...DEFAULT_DISCOVERED_DEVICES,
];

/**
 * Discovery beat (19.5s = 585 frames):
 * Discover Devices counts up as devices are found; a row's driver match and an Add driver are ringed.
 * Cues: discovery "discovery", scans "scans", library "library".
 */
export const DiscoveryBeat: React.FC<{frame: number; frames: number}> = ({frame, frames}) => {
  const scansCue = CUE_FRAMES.scans - BEATS.discovery.from; // 210
  const libraryCue = CUE_FRAMES.library - BEATS.discovery.from; // 449

  const foundCount = Math.floor(
    interpolate(frame, [scansCue, libraryCue], [3, 16], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const scanningProgress = interpolate(frame, [0, frames], [10, 85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const discoverReg = discoverDevicesRegions('phone');

  return (
    <>
      <DiscoverDevices
        device="phone"
        foundCount={foundCount}
        stillLooking={true}
        scanningProgress={scanningProgress}
        devices={DISCOVERY_DEVICES}
      />
      {frame >= libraryCue && (
        <>
          <FocusRing
            region={discoverReg.driverMatch(0, 'add_driver')}
            appearAt={libraryCue}
            radius={4}
            name="Driver match ring"
          />
          <FocusRing
            region={discoverReg.addButton(0, 'add_driver')}
            appearAt={libraryCue}
            radius={5}
            name="Add driver button ring"
          />
        </>
      )}
    </>
  );
};

export const MATROX_DISCOVERED_DEVICES: DiscoveredDevice[] = [
  {
    id: 'm1',
    name: 'Matrox ConvertIP',
    ip: '192.168.0.101',
    hasWebPage: true,
    driverMatch: 'MATROX End Points',
    actionType: 'add_driver',
  },
  {
    id: 'm2',
    name: 'Matrox ConvertIP',
    ip: '192.168.0.102',
    hasWebPage: true,
    driverMatch: 'MATROX End Points',
    actionType: 'add_driver',
  },
  {
    id: 'm3',
    name: 'Matrox ConvertIP',
    ip: '192.168.0.103',
    hasWebPage: true,
    driverMatch: 'MATROX End Points',
    actionType: 'add_driver',
  },
  {
    id: 'm4',
    name: 'Matrox ConvertIP',
    ip: '192.168.0.104',
    hasWebPage: true,
    driverMatch: 'MATROX End Points',
    actionType: 'add_driver',
  },
  ...DEFAULT_DISCOVERED_DEVICES,
];

/**
 * Matrox-Add beat (28.5s = 855 frames):
 * Matrox ConvertIP rows are added one after another, each ending Added, readable.
 * Cues: matrox "Matrox", adding "adding", saving "saving".
 */
export const MatroxAddBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const matroxCue = CUE_FRAMES.matrox - BEATS['matrox-add'].from; // 96
  const addingCue = CUE_FRAMES.adding - BEATS['matrox-add'].from; // 411
  const savingCue = CUE_FRAMES.saving - BEATS['matrox-add'].from; // 427

  const discoverReg = discoverDevicesRegions('phone');

  const addedDeviceIds: string[] = [];
  if (frame >= savingCue) {
    addedDeviceIds.push('m1');
  }
  if (frame >= 560) {
    addedDeviceIds.push('m2');
  }
  if (frame >= 680) {
    addedDeviceIds.push('m3');
  }
  if (frame >= 780) {
    addedDeviceIds.push('m4');
  }

  const addDriverBtn = discoverReg.addButton(0, 'add_driver');
  const addedBtn = discoverReg.addButton(0, 'added');

  return (
    <>
      <DiscoverDevices
        device="phone"
        foundCount={16}
        stillLooking={false}
        scanningProgress={100}
        devices={MATROX_DISCOVERED_DEVICES}
        addedDeviceIds={addedDeviceIds}
        toast={frame >= savingCue ? 'Device added to connections' : undefined}
      />
      {frame >= matroxCue && frame < addingCue && (
        <FocusRing
          region={discoverReg.card(0)}
          appearAt={matroxCue}
          radius={5}
          name="Matrox row ring"
        />
      )}
      <TapIndicator
        x={centerOf(addDriverBtn).x}
        y={centerOf(addDriverBtn).y}
        at={addingCue}
        name="Add button tap"
      />
      {frame >= savingCue && (
        <FocusRing
          region={addedBtn}
          appearAt={savingCue}
          radius={5}
          name="Added button ring"
        />
      )}
    </>
  );
};

/**
 * Matrox-Test beat (18.5s = 555 frames):
 * The Matrox system: four decoders over four encoders; a decoder is tapped, then an encoder, and it takes it.
 * Cues: connect "connect", matroxTestMatrox "Matrox", individual "individual".
 */
export const MatroxTestBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const connectCue = CUE_FRAMES.connect - BEATS['matrox-test'].from; // 79
  const matroxCue = CUE_FRAMES.matroxTestMatrox - BEATS['matrox-test'].from; // 260
  const individualCue = CUE_FRAMES.individual - BEATS['matrox-test'].from; // 445
  const routeInputCue = individualCue + 30; // 475: encoder tapped to complete routing

  const connectTestReg = connectTestRegions('phone');

  const isDropdownOpen = frame >= connectCue && frame < matroxCue;
  const isMatroxSelected = frame >= matroxCue;

  // Selected output is 1-based in ConnectTest: output 1 corresponds to index 1
  const selectedOutput = frame >= individualCue ? 1 : undefined;
  // Selected input is 1-based in ConnectTest: input 1 corresponds to id 1
  const selectedInput = frame >= routeInputCue ? 1 : undefined;

  const outputs = [
    {
      name: 'CONVERTIP RX 1',
      ip: '239.100.45.1',
      routed: frame >= routeInputCue ? 'CONVERTIP TX 1' : null,
    },
    {name: 'CONVERTIP RX 2', ip: '239.100.46.1', routed: null},
    {name: 'CONVERTIP RX 3', ip: '239.100.47.1', routed: null},
    {name: 'CONVERTIP RX 4', ip: '239.100.48.1', routed: null},
  ];

  return (
    <>
      <ConnectTest
        device="phone"
        topTab="test"
        testTab="switcher"
        deviceName="MATROX ConvertIP (8)"
        multiOutput={isMatroxSelected}
        outputs={outputs}
        inputs={DEFAULT_MATROX_INPUTS}
        selectedOutput={selectedOutput}
        selectedInput={selectedInput}
        connected={true}
        deviceSelectorOpen={isDropdownOpen}
        deviceList={DEFAULT_MATROX_DEVICE_LIST}
      />
      {/* "connect" cue: tap top toggle to open device dropdown */}
      <TapIndicator
        x={centerOf(connectTestReg.topToggle).x}
        y={centerOf(connectTestReg.topToggle).y}
        at={connectCue}
        name="Connect menu tap"
      />
      {/* "Matrox" cue: tap Matrox ConvertIP parent row in dropdown */}
      <TapIndicator
        x={centerOf(connectTestReg.deviceItem(0)).x}
        y={centerOf(connectTestReg.deviceItem(0)).y}
        at={matroxCue}
        name="Select Matrox system tap"
      />
      {/* "individual" cue: tap decoder 1 */}
      {isMatroxSelected && (
        <>
          <TapIndicator
            x={centerOf(connectTestReg.switcherOutput(1)).x}
            y={centerOf(connectTestReg.switcherOutput(1)).y}
            at={individualCue}
            name="Decoder 1 tap"
          />
          {frame >= individualCue && (
            <FocusRing
              region={connectTestReg.switcherOutput(1)}
              appearAt={individualCue}
              radius={4}
              name="Decoder 1 ring"
            />
          )}
          {/* Encoder tapped to route */}
          <TapIndicator
            x={centerOf(connectTestReg.switcherInput(1)).x}
            y={centerOf(connectTestReg.switcherInput(1)).y}
            at={routeInputCue}
            name="Encoder 1 tap"
          />
        </>
      )}
    </>
  );
};

/**
 * Matrox-Switch beat (17s = 510 frames):
 * Switch type goes to AVoIP Encoders/Decoders; the lists fill; the icon and label control is ringed.
 * Cues: switchActivities "activities", encoders "encoders", label "label".
 */
export const MatroxSwitchBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const activitiesCue = CUE_FRAMES.switchActivities - BEATS['matrox-switch'].from; // 41
  const encodersCue = CUE_FRAMES.encoders - BEATS['matrox-switch'].from; // 164
  const labelCue = CUE_FRAMES.label - BEATS['matrox-switch'].from; // 391

  const switchReg = activitiesSwitchRegions('phone');

  const isAvoip = frame >= encodersCue;
  const pickerOpen = frame >= 70 && frame < encodersCue;

  return (
    <>
      <ActivitiesSwitch
        device="phone"
        activeTab="switch"
        switchType={isAvoip ? 'avoip' : 'many_to_one'}
        switchTypePickerOpen={pickerOpen}
        deviceName="MATROX ConvertIP (8)"
        encoders={DEFAULT_AVOIP_ENCODERS}
        decoders={DEFAULT_AVOIP_DECODERS}
      />
      {/* "activities" cue: ring the switch tab */}
      {frame >= activitiesCue && frame < 70 && (
        <FocusRing
          region={switchReg.switchTab}
          appearAt={activitiesCue}
          radius={4}
          name="Switch tab ring"
        />
      )}
      {/* "encoders" cue: tap AVoIP option in dropdown picker */}
      <TapIndicator
        x={centerOf(switchReg.switchTypeOptionAvoip).x}
        y={centerOf(switchReg.switchTypeOptionAvoip).y}
        at={encodersCue}
        name="AVoIP option tap"
      />
      {/* "label" cue: ring encoder icon and label control */}
      {frame >= labelCue && (
        <FocusRing
          region={switchReg.encoderIconAndLabel(0)}
          appearAt={labelCue}
          radius={4}
          name="Encoder 1 icon and label ring"
        />
      )}
    </>
  );
};

const M2M_INPUTS: EuiInput[] = [
  {label: 'ConvertIP TX 1'},
  {label: 'ConvertIP TX 2'},
  {label: 'ConvertIP TX 3'},
  {label: 'ConvertIP TX 4'},
];

/**
 * M2M beat (26.5s = 795 frames):
 * Four displays: a source tapped then a display; a source dragged onto a display;
 * All sends one source to every display.
 * Cues: many "many", source "source", display "display", drag "drag", all "all".
 */
export const M2mBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const manyCue = CUE_FRAMES.many - BEATS.m2m.from; // 150
  const sourceCue = CUE_FRAMES.source - BEATS.m2m.from; // 320
  const displayCue = CUE_FRAMES.display - BEATS.m2m.from; // 371
  const dragCue = CUE_FRAMES.drag - BEATS.m2m.from; // 410
  const allCue = CUE_FRAMES.all - BEATS.m2m.from; // 590

  const dragDuration = 36;
  const dragDropFrame = dragCue + dragDuration;

  // Source selection state
  let selectedInput: number | null = null;
  if (frame >= sourceCue && frame < displayCue + 15) {
    selectedInput = 1; // ConvertIP TX 2 selected
  } else if (frame >= allCue - 25) {
    selectedInput = 0; // ConvertIP TX 1 selected for All
  }

  // Source strip scroll to bring Card 2 (ConvertIP TX 3) in view for the drag
  const inputScroll =
    frame < displayCue + 10
      ? 0
      : frame < dragCue - 10
        ? interpolate(frame, [displayCue + 10, dragCue - 10], [0, 80], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : frame < allCue - 30
          ? 80
          : interpolate(frame, [allCue - 30, allCue - 10], [80, 0], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

  // Drag Card 2 onto Display 3
  let drag: {inputIndex: number; x: number; y: number; opacity?: number; scale?: number} | null = null;
  if (frame >= dragCue && frame < dragDropFrame) {
    const dragProgress = interpolate(frame, [dragCue, dragDropFrame], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const startX = centerOf(EUI_REGIONS.inputTile(2)).x - 80;
    const startY = centerOf(EUI_REGIONS.inputTile(2)).y;
    const target = centerOf(EUI_REGIONS.outputCell(2));
    drag = {
      inputIndex: 2,
      x: startX + (target.x - startX) * dragProgress,
      y: startY + (target.y - startY) * dragProgress,
      opacity: 0.95,
      scale: 1.05,
    };
  }

  // Display outputs state progression
  let outputs: EuiOutput[];
  if (frame >= allCue) {
    outputs = [
      {label: 'Display 1', source: 'ConvertIP TX 1', highlight: 'blue'},
      {label: 'Display 2', source: 'ConvertIP TX 1', highlight: 'blue'},
      {label: 'Display 3', source: 'ConvertIP TX 1', highlight: 'blue'},
      {label: 'Display 4', source: 'ConvertIP TX 1', highlight: 'blue'},
    ];
  } else {
    outputs = [
      {label: 'Display 1', source: 'ConvertIP TX 1', highlight: 'blue'},
      {
        label: 'Display 2',
        source: frame >= displayCue ? 'ConvertIP TX 2' : null,
        highlight: frame >= displayCue ? 'blue' : undefined,
      },
      {
        label: 'Display 3',
        source: frame >= dragDropFrame ? 'ConvertIP TX 3' : null,
        highlight: frame >= dragDropFrame ? 'blue' : undefined,
      },
      {label: 'Display 4', source: null},
    ];
  }

  const dragStartX = centerOf(EUI_REGIONS.inputTile(2)).x - 80;
  const dragStartY = centerOf(EUI_REGIONS.inputTile(2)).y;

  return (
    <>
      <PhoneEui
        outputs={outputs}
        inputs={M2M_INPUTS}
        selectedInput={selectedInput}
        volume={0.72}
        inputScroll={inputScroll}
        drag={drag}
      />

      {/* "many" cue: ring the four displays */}
      {frame >= manyCue && frame < sourceCue && (
        <FocusRing
          region={EUI_REGIONS.outputGrid}
          appearAt={manyCue}
          radius={6}
          name="Four displays grid ring"
        />
      )}

      {/* "source" cue: tap Source 1 (ConvertIP TX 2) */}
      <TapIndicator
        x={centerOf(EUI_REGIONS.inputTile(1)).x}
        y={centerOf(EUI_REGIONS.inputTile(1)).y}
        at={sourceCue}
        name="Source ConvertIP TX 2 tap"
      />
      {frame >= sourceCue && frame < displayCue && (
        <FocusRing
          region={EUI_REGIONS.inputTile(1)}
          appearAt={sourceCue}
          radius={5}
          name="Source ConvertIP TX 2 ring"
        />
      )}

      {/* "display" cue: tap Display 2 to complete routing */}
      <TapIndicator
        x={centerOf(EUI_REGIONS.outputCell(1)).x}
        y={centerOf(EUI_REGIONS.outputCell(1)).y}
        at={displayCue}
        name="Display 2 tap"
      />
      {frame >= displayCue && frame < dragCue && (
        <FocusRing
          region={EUI_REGIONS.outputCell(1)}
          appearAt={displayCue}
          radius={2}
          name="Display 2 ring"
        />
      )}

      {/* "drag" cue: tap at drag start */}
      <TapIndicator
        x={dragStartX}
        y={dragStartY}
        at={dragCue}
        name="Drag start tap"
      />

      {/* Drop result: ring Display 3 */}
      {frame >= dragDropFrame && frame < allCue - 15 && (
        <FocusRing
          region={EUI_REGIONS.outputCell(2)}
          appearAt={dragDropFrame}
          radius={2}
          name="Display 3 drop ring"
        />
      )}

      {/* "all" cue: ring and tap All button */}
      <TapIndicator
        x={centerOf(EUI_REGIONS.routeAll).x}
        y={centerOf(EUI_REGIONS.routeAll).y}
        at={allCue}
        name="All button tap"
      />
      {frame >= allCue - 15 && (
        <FocusRing
          region={EUI_REGIONS.routeAll}
          appearAt={Math.max(0, allCue - 15)}
          radius={6}
          name="All button ring"
        />
      )}
    </>
  );
};

/**
 * Settings beat (15.5s = 465 frames):
 * Settings → Support: User Manual, Quick Start and Factory Reset ringed on their words.
 * Cues: settingsSetup "Setup", manual "Manual", quick "Quick", factory "factory".
 */
export const SettingsBeat: React.FC<{frame: number; frames: number; review?: boolean}> = ({frame, review}) => {
  const setupCue = CUE_FRAMES.settingsSetup - BEATS.settings.from;
  const manualCue = CUE_FRAMES.manual - BEATS.settings.from;
  const quickCue = CUE_FRAMES.quick - BEATS.settings.from;
  const factoryCue = CUE_FRAMES.factory - BEATS.settings.from;

  const settingsReg = settingsSupportRegions('phone');

  return (
    <>
      <SettingsSupport device="phone" />
      <div style={review ? {position: 'absolute', inset: 0, zIndex: 40, pointerEvents: 'none'} : {display: 'contents'}}>
      {/* "Setup" cue: setup button ring and tap */}
      {frame < (review ? quickCue : manualCue) && (
        <>
          <FocusRing
            region={settingsReg.setupButton}
            appearAt={Math.max(0, setupCue - 24)}
            radius={4}
            name="Setup button ring"
          />
          <TapIndicator
            x={centerOf(settingsReg.setupButton).x}
            y={centerOf(settingsReg.setupButton).y}
            at={setupCue}
            name="Setup button tap"
          />
        </>
      )}

      {/* "Manual" cue: User Manual card ringed */}
      {frame >= manualCue && frame < quickCue && (
        <FocusRing
          region={settingsReg.userManual}
          appearAt={manualCue}
          radius={5}
          name="User Manual ring"
        />
      )}

      {/* "Quick" cue: Quick Start card ringed */}
      {frame >= quickCue && frame < factoryCue && (
        <FocusRing
          region={settingsReg.quickStart}
          appearAt={quickCue}
          radius={5}
          name="Quick Start ring"
        />
      )}

      {/* "factory" cue: Factory Reset card ringed */}
      {frame >= factoryCue && (
        <FocusRing
          region={settingsReg.factoryReset}
          appearAt={factoryCue}
          radius={5}
            name="Factory Reset ring"
        />
      )}
      </div>
    </>
  );
};

/**
 * Close beat (6s = 180 frames):
 * The EUI at rest; the copy shows the CTRLbot IoT headline.
 */
export const CloseBeat: React.FC<{frame: number; frames: number}> = () => (
  <PhoneEuiManyToOne
    inputs={[
      {label: 'Input 1'},
      {label: 'Input 2'},
      {label: 'HDMI 1'},
      {label: 'HDMI 2'},
    ]}
    selectedInput={null}
    volume={0.42}
    outputLabel="DISPLAY 1"
  />
);

export const BEAT_RENDERERS: Partial<
  Record<BeatName, React.FC<{frame: number; frames: number}>>
> = {
  open: OpenBeat,
  proof: ProofBeat,
  'first-run': FirstRunBeat,
  ai: AiBeat,
  database: DatabaseBeat,
  epson: EpsonBeat,
  add: AddBeat,
  terminal: TerminalBeat,
  test: TestBeat,
  activities: ActivitiesBeat,
  'switch-audio': SwitchAudioBeat,
  eui: EuiBeat,
  exit: ExitBeat,
  discovery: DiscoveryBeat,
  'matrox-add': MatroxAddBeat,
  'matrox-test': MatroxTestBeat,
  'matrox-switch': MatroxSwitchBeat,
  m2m: M2mBeat,
  settings: SettingsBeat,
  close: CloseBeat,
};
