import React from 'react';
import {Easing, interpolate} from 'remotion';
import {AppIcon} from '../../app-ui/AppIcon';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {TabletEuiManyToOne} from '../../app-ui/TabletEui';
import {FirstRunEducation} from '../../app-ui/FirstRunEducation';
import {AI_QUESTIONS, CtrlbotAi} from '../../app-ui/CtrlbotAi';
import {DriverCatalog, SETUP_BACKGROUND, type DriverEntry} from '../../app-ui/DriverCatalog';
import {
  DriverDetail,
  ModelRow,
  DeviceInfo,
  Accordion,
  ControlInfo,
} from '../../app-ui/DriverDatabase';
import {ProductWebView} from '../../app-ui/ProductWebView';
import {
  ConnectionPanel,
  type DeviceCommand,
  type TerminalLine,
} from '../../app-ui/ConnectionPanel';
import {ConnectTest, type ConnectTestSubTab} from '../../app-ui/ConnectTest';
import {
  ActivitiesPresets,
  DEFAULT_COMMAND_STEPS,
} from '../../app-ui/ActivitiesPresets';
import {ActivitiesSwitch} from '../../app-ui/ActivitiesSwitch';
import {ActivitiesAudio} from '../../app-ui/ActivitiesAudio';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {DiscoverDevices} from '../../app-ui/DiscoverDevices';
import {appColors} from '../../design/tokens.generated';
import {font} from '../../design/theme';
import type {BeatName} from './iotTabletWalkthroughData';

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

/**
 * Open beat (11s = 330 frames):
 * The tablet EUI at rest, sources down the left and the display on the right;
 * the copy shows the CTRLbot IoT headline.
 */
export const OpenBeat: React.FC<{frame: number; frames: number}> = () => (
  <TabletEuiManyToOne
    inputs={[
      {label: 'Input 1'},
      {label: 'Input 2'},
      {label: 'HDMI 1'},
      {label: 'HDMI 2'},
    ]}
    selectedInput={null}
    volume={0.42}
    outputLabel="Display 1"
  />
);

/**
 * First-run beat (13.5s = 405 frames):
 * The first-run walkthrough over the setup screen steps forward, then its ✕ closes it.
 */
export const FirstRunBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const step = frame < 200 ? 1 : 2;
  const cardOpacity =
    frame < 330
      ? 1
      : interpolate(frame, [330, 365], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <FirstRunEducation
      device="tablet"
      step={step}
      cardOpacity={cardOpacity}
    />
  );
};

/**
 * AI beat (20.5s = 615 frames):
 * CTRLbot AI's question list fills; a question is picked and its answer lands.
 */
export const AiBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const visibleQuestions = Math.min(
    AI_QUESTIONS.length,
    Math.max(
      1,
      Math.floor(
        interpolate(frame, [15, 120], [1, 5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      ),
    ),
  );
  const isQuestionPicked = frame >= 180;
  const answerProgress = interpolate(frame, [220, 260], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: TABLET_VIEWPORT.width,
        height: TABLET_VIEWPORT.height,
        backgroundColor: appColors.black,
        overflow: 'hidden',
      }}
    >
      <CtrlbotAi
        device="tablet"
        visibleQuestions={visibleQuestions}
        promptFocused={isQuestionPicked}
      />

      {/* When a question is picked, an answer card lands */}
      {answerProgress > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: 200 + (1080 - 640) / 2,
            top: 410,
            width: 640,
            opacity: answerProgress,
            transform: `translateY(${(1 - answerProgress) * 16}px)`,
            backgroundColor: appColors.gray20,
            borderRadius: 12,
            padding: '20px 24px',
            border: `1px solid ${appColors.blue}`,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: font.ui,
              fontWeight: 600,
              fontSize: 16,
              color: appColors.blue,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <AppIcon name="ic_ctrlbot" size={20} tint={appColors.blue} />
            {AI_QUESTIONS[1]}
          </div>
          <div
            style={{
              fontFamily: font.ui,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.5,
              color: appColors.white,
            }}
          >
            CTRLbot IoT is an Android app for complete room control without an external
            processor. Control displays, switchers, and audio over IP or through endpoints
            to RS-232 and IR devices.
          </div>
        </div>
      ) : null}
    </div>
  );
};

/**
 * Database beat (23s = 690 frames):
 * The catalog scrolls; the category filter opens on Projector, Display, Switchers, End Points.
 */
export const DatabaseBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const listScroll = interpolate(frame, [30, 240], [0, 200], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const menuOpen = frame >= 270 && frame < 580;
  const openMenu = menuOpen
    ? {
        control: 'category' as const,
        items: ['Projector', 'Display', 'Switchers', 'End Points'] as const,
      }
    : undefined;

  return (
    <DriverCatalog
      device="tablet"
      drivers={CATALOG_DRIVERS}
      background={SETUP_BACKGROUND}
      listScroll={listScroll}
      openMenu={openMenu}
    />
  );
};

/**
 * Epson beat (23.5s = 705 frames):
 * Epson PowerLite in the detail pane: device info, specs, setup, support; the manufacturer
 * link is ringed and the app's web view opens loading; back on the pane, control info.
 */
export const EpsonBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const showWebView = frame >= 240 && frame < 450;
  const ringActive = frame >= 140 && frame < 240;
  const showControl = frame >= 450;

  if (showWebView) {
    const progress = interpolate(frame, [240, 450], [15, 80], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return (
      <ProductWebView
        device="tablet"
        title="Manufacturer Home Page"
        host="epson.com"
        progress={progress}
      />
    );
  }

  return (
    <DriverCatalog
      device="tablet"
      drivers={CATALOG_DRIVERS}
      background={SETUP_BACKGROUND}
      selectedIndex={7}
      listScroll={180}
      detail={
        <DriverDetail
          title="EPSON Projectors"
          ringManufacturer={ringActive}
          scroll={showControl ? 120 : 0}
        >
          <ModelRow model="PowerLite" />
          <DeviceInfo>
            The Epson PowerLite Presenter HD is a portable projector with an integrated DVD
            player and speakers, suitable for presentations and video playback.
          </DeviceInfo>
          <Accordion label="Specs" />
          <Accordion label="Setup" />
          <Accordion label="Support" />
          {showControl ? (
            <ControlInfo
              controlType="IP"
              ipType="TCP"
              port="3629"
              keepAlive="Disabled"
              onConnection="Disabled"
              authentication="No"
              show={6}
            />
          ) : null}
        </DriverDetail>
      }
    />
  );
};

/**
 * Add beat (15.5s = 465 frames):
 * + opens Configure Connection, the IP is entered, Connect goes to Disconnect,
 * with no save button pressed.
 */
export const AddBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const fullIp = '192.168.0.134';
  const charsCount = Math.floor(
    interpolate(frame, [30, 110], [0, fullIp.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const host = fullIp.slice(0, charsCount);
  const hostCaret = frame < 120;
  const connected = frame >= 150;

  const terminal: TerminalLine[] = connected
    ? [
        {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
        {text: 'Connection saved', kind: 'status'},
      ]
    : [];

  return (
    <ConnectionPanel
      device="tablet"
      deviceName="EPSON PowerLite - New"
      host={host}
      port="3629"
      connected={connected}
      commands={EPSON_COMMANDS}
      terminal={terminal}
      hostCaret={hostCaret}
      showRoomMenus={connected}
    />
  );
};

/**
 * Terminal beat (6s = 180 frames):
 * Power On and Power Off are sent and land in the terminal.
 */
export const TerminalBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  let highlightedCommand: number | null = null;
  const terminal: TerminalLine[] = [
    {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
  ];

  if (frame < 80) {
    highlightedCommand = 0; // Power On
    terminal.push({text: 'Sent: PWR ON [0D]', kind: 'sent'});
  } else {
    highlightedCommand = 1; // Power Off
    terminal.push({text: 'Sent: PWR ON [0D]', kind: 'sent'});
    terminal.push({text: 'Sent: PWR OFF [0D]', kind: 'sent'});
  }

  return (
    <ConnectionPanel
      device="tablet"
      deviceName="EPSON PowerLite - New"
      host="192.168.0.134"
      port="3629"
      connected
      commands={EPSON_COMMANDS}
      terminal={terminal}
      highlightedCommand={highlightedCommand}
      showRoomMenus
    />
  );
};

/**
 * Test beat (28s = 840 frames):
 * Test Device Drivers: the device list on the right; Switcher routes an input to Out 1,
 * then Terminal, then Web page loading.
 */
export const TestBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  let testTab: ConnectTestSubTab = 'switcher';
  if (frame >= 560) {
    testTab = 'web';
  } else if (frame >= 280) {
    testTab = 'terminal';
  } else {
    testTab = 'switcher';
  }

  const selectedInput = frame >= 140 ? 2 : 1;

  return (
    <ConnectTest
      device="tablet"
      topTab="test"
      testTab={testTab}
      deviceName="EPSON PowerLite - New"
      connected
      selectedInput={selectedInput}
    />
  );
};

/**
 * Activities beat (19s = 570 frames):
 * Presets lists Power On and Power Off; Power On opens with the Epson's
 * power-on command already in it.
 */
export const ActivitiesBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const isEdit = frame >= 210;

  return (
    <ActivitiesPresets
      device="tablet"
      activeTab="presets"
      mode={isEdit ? 'edit' : 'list'}
      editPresetName="Power On"
      editPresetIconColor={appColors.green}
      commandSteps={isEdit ? DEFAULT_COMMAND_STEPS : []}
    />
  );
};

/**
 * Switch-Audio beat (16s = 480 frames):
 * Switch shows the Epson as the switcher; Audio shows its volume
 * up, down and set mapped.
 */
export const SwitchAudioBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const showAudio = frame >= 240;

  if (showAudio) {
    return (
      <ActivitiesAudio
        device="tablet"
        activeTab="audio"
        deviceName="EPSON PowerLite - New"
      />
    );
  }

  return (
    <ActivitiesSwitch
      device="tablet"
      activeTab="switch"
      switchType="many_to_one"
      deviceName="EPSON PowerLite - New"
    />
  );
};

/**
 * EUI beat (24.5s = 735 frames):
 * A source is picked for the display, the volume moves and mutes,
 * then Powering Off and Welcome.
 */
export const EuiBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  if (frame >= 620) {
    // Welcome screen with power button
    return <EuiPowerCapture device="tablet" state="off" />;
  }

  if (frame >= 480) {
    // Powering off state
    return (
      <EuiPowerCapture
        device="tablet"
        state="powering-off"
        durationInFrames={140}
        volume={0.72}
        speakerMuted
      />
    );
  }

  // Active room control: source picked, volume moves, then mutes
  const selectedInput = frame < 120 ? null : 0;
  const volume =
    frame < 220
      ? 0.42
      : interpolate(frame, [220, 340], [0.42, 0.72], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const speakerMuted = frame >= 380;

  return (
    <TabletEuiManyToOne
      inputs={[
        {label: 'Input 1'},
        {label: 'Input 2'},
        {label: 'HDMI 1'},
        {label: 'HDMI 2'},
      ]}
      selectedInput={selectedInput}
      volume={volume}
      speakerMuted={speakerMuted}
      outputLabel="Display 1"
    />
  );
};

/**
 * Exit beat (8s = 240 frames):
 * The setup button is held; "Keep holding to return to Setup" shows;
 * the setup menu returns.
 */
export const ExitBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const returnedToSetup = frame >= 130;

  if (returnedToSetup) {
    return (
      <ActivitiesPresets
        device="tablet"
        activeTab="presets"
        mode="list"
        toast="Switching activity saved to end UI"
      />
    );
  }

  return (
    <TabletEuiManyToOne
      inputs={[
        {label: 'Input 1'},
        {label: 'Input 2'},
        {label: 'HDMI 1'},
        {label: 'HDMI 2'},
      ]}
      selectedInput={0}
      volume={0.72}
      outputLabel="Display 1"
      showExitHint
    />
  );
};

/**
 * Discovery beat (20s = 600 frames):
 * Discover Devices counts up as devices are found; each row shows its driver match or Add driver.
 */
export const DiscoveryBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const foundCount = Math.floor(
    interpolate(frame, [0, 500], [3, 16], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const scanningProgress = interpolate(frame, [0, 600], [10, 85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <DiscoverDevices
      device="tablet"
      foundCount={foundCount}
      stillLooking
      scanningProgress={scanningProgress}
    />
  );
};

export const BEAT_RENDERERS: Partial<
  Record<BeatName, React.FC<{frame: number; frames: number}>>
> = {
  open: OpenBeat,
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
};
