import React from 'react';
import {Easing, interpolate} from 'remotion';
import {AppIcon} from '../../app-ui/AppIcon';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {
  TabletEui,
  TabletEuiManyToOne,
  TABLET_EUI_MANY_TO_ONE_REGIONS,
} from '../../app-ui/TabletEui';
import type {EuiInput, EuiOutput} from '../../app-ui/PhoneEui';
import {FirstRunEducation, firstRunEducationRegions} from '../../app-ui/FirstRunEducation';
import {AI_QUESTIONS, CtrlbotAi, aiRegions} from '../../app-ui/CtrlbotAi';
import {
  DriverCatalog,
  SETUP_BACKGROUND,
  type DriverEntry,
  catalogRegions,
} from '../../app-ui/DriverCatalog';
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
import {
  ConnectTest,
  DEFAULT_MATROX_INPUTS,
  type ConnectTestSubTab,
} from '../../app-ui/ConnectTest';
import {
  ActivitiesPresets,
  DEFAULT_COMMAND_STEPS,
} from '../../app-ui/ActivitiesPresets';
import {
  ActivitiesSwitch,
  DEFAULT_AVOIP_DECODERS,
  DEFAULT_AVOIP_ENCODERS,
} from '../../app-ui/ActivitiesSwitch';
import {ActivitiesAudio} from '../../app-ui/ActivitiesAudio';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {DiscoverDevices} from '../../app-ui/DiscoverDevices';
import {SettingsSupport} from '../../app-ui/SettingsSupport';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {appColors} from '../../design/tokens.generated';
import {font} from '../../design/theme';
import {BEATS, CUE_FRAMES, type BeatName} from './iotTabletWalkthroughData';

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

const PROOF_INPUTS: EuiInput[] = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'HDMI 1'},
  {label: 'HDMI 2'},
];

/**
 * Proof beat (6s = 180 frames):
 * The tablet EUI; a source is tapped and the display fills with it in the same moment, ringed.
 * Cue: welcome "app" (abs frame 149; "app" sounds across cut into proof; tap lands at beat frame 8 / abs 158).
 */
export const ProofBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueApp = Math.max(8, CUE_FRAMES.welcomeApp - BEATS.proof.from + 9);
  const row0 = TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(0);
  const tapX = row0.x + row0.width / 2;
  const tapY = row0.y + row0.height / 2;

  const selectedInput = frame < cueApp ? null : 0;
  const pressed = frame >= cueApp && frame < cueApp + 10 ? 'input-1' : null;

  return (
    <>
      <TabletEuiManyToOne
        inputs={PROOF_INPUTS}
        selectedInput={selectedInput}
        volume={0.42}
        outputLabel="Display 1"
        pressed={pressed}
      />
      <TapIndicator x={tapX} y={tapY} at={cueApp} name="Source tap" />
      <FocusRing
        region={TABLET_EUI_MANY_TO_ONE_REGIONS.displayPanel}
        appearAt={cueApp}
        radius={0}
        name="Display panel ring"
      />
    </>
  );
};

/**
 * Open beat (11s = 330 frames):
 * The tablet EUI at rest, sources down the left and the display on the right;
 * the copy shows the CTRLbot IoT headline.
 */
export const OpenBeat: React.FC<{frame: number; frames: number}> = () => (
  <TabletEuiManyToOne
    inputs={PROOF_INPUTS}
    selectedInput={null}
    volume={0.42}
    outputLabel="Display 1"
  />
);

/**
 * First-run beat (13.5s = 405 frames):
 * The first-run walkthrough over the setup screen steps forward, then its ✕ closes it.
 * Cues: first-run "walkthrough" (tour steps forward) · "close" (✕ tapped, tour closes).
 */
export const FirstRunBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueTour = CUE_FRAMES.firstRunTour - BEATS['first-run'].from;
  const cueClose = CUE_FRAMES.firstRunClose - BEATS['first-run'].from;

  const regions = firstRunEducationRegions('tablet');
  const closeReg = regions.closeButton;
  const closeX = closeReg.x + closeReg.width / 2;
  const closeY = closeReg.y + closeReg.height / 2;

  const nextBtn = regions.nextButton;
  const nextX = nextBtn.x + nextBtn.width / 2;
  const nextY = nextBtn.y + nextBtn.height / 2;

  const step = frame < cueTour ? 1 : 2;
  const cardOpacity =
    frame < cueClose
      ? 1
      : interpolate(frame, [cueClose, cueClose + 15], [1, 0], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <>
      <FirstRunEducation
        device="tablet"
        step={step}
        cardOpacity={cardOpacity}
        showClose={cardOpacity > 0}
      />
      <TapIndicator x={nextX} y={nextY} at={cueTour} name="Tour step tap" />
      <TapIndicator x={closeX} y={closeY} at={cueClose} name="Close ✕ tap" />
    </>
  );
};

/**
 * AI beat (22s = 660 frames):
 * CTRLbot AI is a living manual: the question list reveals on "AI"; a question is tapped
 * on "troubleshoot", and its answer lands readable on "manual".
 * Cues: ai-intro "AI" · ai-manual "troubleshoot" · "manual".
 */
export const AiBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueIntro = CUE_FRAMES.aiIntro - BEATS.ai.from;
  const cueTroubleshoot = CUE_FRAMES.aiTroubleshoot - BEATS.ai.from;
  const cueManual = CUE_FRAMES.aiManual - BEATS.ai.from;

  const visibleQuestions =
    frame < cueIntro
      ? 1
      : Math.min(
          AI_QUESTIONS.length,
          1 + Math.floor((frame - cueIntro) / 10),
        );

  const isQuestionPicked = frame >= cueTroubleshoot;

  const q1 = aiRegions('tablet').question(1);
  const q1CenterX = q1.x + q1.width / 2;
  const q1CenterY = q1.y + q1.height / 2;

  const answerProgress = interpolate(frame, [cueManual, cueManual + 15], [0, 1], {
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

      <TapIndicator
        x={q1CenterX}
        y={q1CenterY}
        at={cueTroubleshoot}
        name="Question 1 tap"
      />
      {frame < cueManual + 10 ? (
        <FocusRing
          region={q1}
          appearAt={cueTroubleshoot - 10}
          radius={6}
          name="Question 1 ring"
        />
      ) : null}

      {/* When manual lands, answer card lands and stays readable */}
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
 * The catalog on the app's blue wash scrolls on "library"; the sort filter is tapped
 * and opens on "sorting" showing Projector, Display, Switchers, End Points.
 * Cues: db-devices "library" · db-sorting "sorting".
 */
export const DatabaseBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueLibrary = CUE_FRAMES.dbLibrary - BEATS.database.from;
  const cueSorting = CUE_FRAMES.dbSorting - BEATS.database.from;

  const listScroll = interpolate(
    frame,
    [cueLibrary, cueLibrary + 140],
    [0, 200],
    {
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // The sort filter button inside catalogRegions('tablet').filters:
  // filters.x = 212, filters.y = 104, filters.width = 406. Two flex:1 buttons with 12px gap.
  // Sort button starts at x = 212 + 197 + 12 = 421, y = 104, width = 197, height = 50.
  const sortButtonRegion = {
    x: 421,
    y: 104,
    width: 197,
    height: 50,
  };
  const sortCenterX = sortButtonRegion.x + sortButtonRegion.width / 2;
  const sortCenterY = sortButtonRegion.y + sortButtonRegion.height / 2;

  const openMenu =
    frame >= cueSorting
      ? {
          control: 'sort' as const,
          items: ['Projector', 'Display', 'Switchers', 'End Points'] as const,
        }
      : undefined;

  return (
    <>
      <DriverCatalog
        device="tablet"
        drivers={CATALOG_DRIVERS}
        background={SETUP_BACKGROUND}
        listScroll={listScroll}
        openMenu={openMenu}
      />
      <TapIndicator
        x={sortCenterX}
        y={sortCenterY}
        at={cueSorting}
        name="Sort filter tap"
      />
      <FocusRing
        region={sortButtonRegion}
        appearAt={cueSorting}
        radius={5}
        name="Sort filter ring"
      />
    </>
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

/**
 * Matrox-Add beat (30.5s = 915 frames):
 * Matrox ConvertIP rows are added one after another; each ends Added.
 */
export const MatroxAddBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const addedDeviceIds: string[] = [];
  if (frame >= 260) {
    addedDeviceIds.push('d7');
  }
  if (frame >= 500) {
    addedDeviceIds.push('d8');
  }
  if (frame >= 740) {
    addedDeviceIds.push('d9');
  }

  const scrollOffset = interpolate(frame, [0, 320], [0, 180], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <DiscoverDevices
      device="tablet"
      foundCount={16}
      stillLooking={false}
      scanningProgress={100}
      addedDeviceIds={addedDeviceIds}
      initialScrollOffset={scrollOffset}
      toast={frame >= 780 ? 'Device added to connections' : undefined}
    />
  );
};

/**
 * Matrox-Test beat (7s = 210 frames):
 * The Matrox system in the switcher: encoders on the left, four decoders;
 * one decoder takes an encoder.
 */
export const MatroxTestBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const selectedOutput = frame < 60 ? undefined : 0;
  const selectedInput = frame < 100 ? undefined : 0;
  const outputs = [
    {name: 'CONVERTIP RX 1', ip: '239.100.45.1', routed: frame >= 100 ? 'CONVERTIP TX 1' : null},
    {name: 'CONVERTIP RX 2', ip: '239.100.46.1', routed: null},
    {name: 'CONVERTIP RX 3', ip: '239.100.47.1', routed: null},
    {name: 'CONVERTIP RX 4', ip: '239.100.48.1', routed: null},
  ];

  return (
    <ConnectTest
      device="tablet"
      topTab="test"
      testTab="switcher"
      deviceName="MATROX ConvertIP (8)"
      multiOutput
      outputs={outputs}
      inputs={DEFAULT_MATROX_INPUTS}
      selectedOutput={selectedOutput}
      selectedInput={selectedInput}
      connected
    />
  );
};

/**
 * Matrox-Switch beat (23.5s = 705 frames):
 * Switch type goes to AVoIP Encoders/Decoders; the ConvertIP encoder and decoder lists fill.
 */
export const MatroxSwitchBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const isAvoip = frame >= 200;
  const pickerOpen = frame >= 70 && frame < 200;

  return (
    <ActivitiesSwitch
      device="tablet"
      activeTab="switch"
      switchType={isAvoip ? 'avoip' : 'many_to_one'}
      switchTypePickerOpen={pickerOpen}
      deviceName="MATROX ConvertIP (8)"
      encoders={DEFAULT_AVOIP_ENCODERS}
      decoders={DEFAULT_AVOIP_DECODERS}
    />
  );
};

/**
 * M2M beat (24.5s = 735 frames):
 * Four displays: a source tapped then a display; a source dragged onto a display;
 * All sends one source to every display.
 */
export const M2mBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  let selectedInput: number | null = null;
  let drag: {inputIndex: number; x: number; y: number; opacity?: number; scale?: number} | null = null;
  let outputs: EuiOutput[] = [
    {label: 'Display 1', source: 'ConvertIP TX 1'},
    {label: 'Display 2', source: null},
    {label: 'Display 3', source: null},
    {label: 'Display 4', source: null},
  ];

  if (frame < 240) {
    if (frame >= 70 && frame < 150) {
      selectedInput = 1; // ConvertIP TX 2 selected
    } else if (frame >= 150) {
      selectedInput = 1;
      outputs[1] = {label: 'Display 2', source: 'ConvertIP TX 2', highlight: 'blue'};
    }
  } else if (frame < 490) {
    selectedInput = null;
    outputs[1] = {label: 'Display 2', source: 'ConvertIP TX 2'};

    // Drag TX 3 onto Display 3
    if (frame >= 280 && frame < 410) {
      const dragProgress = interpolate(frame, [280, 400], [0, 1], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const startX = 200;
      const startY = 380;
      const targetX = 670;
      const targetY = 480;
      drag = {
        inputIndex: 2,
        x: startX + (targetX - startX) * dragProgress,
        y: startY + (targetY - startY) * dragProgress,
        opacity: 0.92,
        scale: 1.05,
      };
    } else if (frame >= 410) {
      outputs[2] = {label: 'Display 3', source: 'ConvertIP TX 3', highlight: 'yellow'};
    }
  } else {
    // All sends TX 1 to every display
    selectedInput = 0;
    outputs = [
      {label: 'Display 1', source: 'ConvertIP TX 1', highlight: 'blue'},
      {label: 'Display 2', source: 'ConvertIP TX 1', highlight: 'blue'},
      {label: 'Display 3', source: 'ConvertIP TX 1', highlight: 'blue'},
      {label: 'Display 4', source: 'ConvertIP TX 1', highlight: 'blue'},
    ];
  }

  const inputs: EuiInput[] = [
    {label: 'ConvertIP TX 1'},
    {label: 'ConvertIP TX 2'},
    {label: 'ConvertIP TX 3'},
    {label: 'ConvertIP TX 4'},
  ];

  return (
    <TabletEui
      outputs={outputs}
      inputs={inputs}
      selectedInput={selectedInput}
      volume={0.72}
      drag={drag}
    />
  );
};

/**
 * Settings beat (21s = 630 frames):
 * Settings → Support: User Manual, Quick Start, Factory Reset and Database Management.
 */
export const SettingsBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const resetButtonState =
    frame >= 300 && frame < 450
      ? 'pressed'
      : frame >= 450
        ? 'restored'
        : 'idle';

  return (
    <SettingsSupport
      device="tablet"
      resetButtonState={resetButtonState}
      showDocumentationHighlight={frame < 300}
    />
  );
};

/**
 * Close beat (5s = 150 frames):
 * The EUI at rest; the copy shows the CTRLbot IoT headline.
 */
export const CloseBeat: React.FC<{frame: number; frames: number}> = () => (
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

export const BEAT_RENDERERS: Record<
  BeatName,
  React.FC<{frame: number; frames: number}>
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
  'matrox-add': MatroxAddBeat,
  'matrox-test': MatroxTestBeat,
  'matrox-switch': MatroxSwitchBeat,
  m2m: M2mBeat,
  settings: SettingsBeat,
  close: CloseBeat,
};
