import React from 'react';
import {Easing, interpolate, Sequence} from 'remotion';
import {AppIcon} from '../../app-ui/AppIcon';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {
  TabletEui,
  TabletEuiManyToOne,
  TABLET_EUI_MANY_TO_ONE_REGIONS,
  TABLET_EUI_REGIONS,
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
  connectionRegions,
  type DeviceCommand,
  type TerminalLine,
} from '../../app-ui/ConnectionPanel';
import {
  ConnectTest,
  DEFAULT_CONNECT_COMMANDS,
  DEFAULT_CONNECT_TERMINAL,
  DEFAULT_MATROX_INPUTS,
  connectTestRegions,
  type ConnectTestSubTab,
} from '../../app-ui/ConnectTest';
import {
  ActivitiesPresets,
  DEFAULT_COMMAND_STEPS,
  activitiesPresetsRegions,
} from '../../app-ui/ActivitiesPresets';
import {
  ActivitiesSwitch,
  DEFAULT_AVOIP_DECODERS,
  DEFAULT_AVOIP_ENCODERS,
  activitiesSwitchRegions,
} from '../../app-ui/ActivitiesSwitch';
import {ActivitiesAudio, activitiesAudioRegions} from '../../app-ui/ActivitiesAudio';
import {EuiPowerCapture} from '../../app-ui/EuiPower';
import {DiscoverDevices, discoverDevicesRegions} from '../../app-ui/DiscoverDevices';
import {SettingsSupport, settingsSupportRegions} from '../../app-ui/SettingsSupport';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf, type Region} from '../../camera/Camera';
import {tabletNavRegions} from '../../app-ui/TabletNavRail';
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
 * link is ringed and tapped, and the web view's address bar loads for at most 2s;
 * back on the pane, the connection info is ringed.
 * Cues: epson-info "projector" (abs 2208, rel 123) · epson-webpage "manufacturer" (abs 2392, rel 307)
 *       · epson-connection "connection" (abs 2721, rel 636).
 */
export const EpsonBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueProjector = CUE_FRAMES.epsonProjector - BEATS.epson.from;
  const cueWebpage = CUE_FRAMES.epsonWebpage - BEATS.epson.from;
  const cueConnection = CUE_FRAMES.epsonConnection - BEATS.epson.from;

  // Web view loads for under 2s (50 frames = 1.67s at 30fps)
  const WEB_LOAD_FRAMES = 50;
  const showWebView = frame >= cueWebpage && frame < cueWebpage + WEB_LOAD_FRAMES;

  if (showWebView) {
    const progress = interpolate(frame, [cueWebpage, cueWebpage + WEB_LOAD_FRAMES], [15, 80], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
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

  // Card 7 (EPSON PowerLite) position: listScroll = 180
  const card7 = catalogRegions('tablet').card(7);
  const card7VisualY = card7.y - 180;
  const card7CenterX = card7.x + card7.width / 2;
  const card7CenterY = card7VisualY + card7.height / 2;
  const card7Region = {
    x: card7.x,
    y: card7VisualY,
    width: card7.width,
    height: card7.height,
  };

  // Manufacturer link region in detail header: x = 1070, y = 36, width = 130, height = 40
  const mfrLinkRegion = {x: 1070, y: 36, width: 130, height: 40};
  const mfrLinkCenterX = mfrLinkRegion.x + mfrLinkRegion.width / 2;
  const mfrLinkCenterY = mfrLinkRegion.y + mfrLinkRegion.height / 2;
  const ringActive = frame >= cueWebpage - 15 && frame < cueWebpage;

  // Connection info region in detail pane: scrolls into view on epson-connection
  const afterWeb = frame >= cueWebpage + WEB_LOAD_FRAMES;
  const detailScroll = afterWeb
    ? interpolate(frame, [500, 540], [0, 120], {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const controlRegion = {x: 660, y: 280, width: 480, height: 160};

  const isSelected = frame >= cueProjector;

  return (
    <>
      <DriverCatalog
        device="tablet"
        drivers={CATALOG_DRIVERS}
        background={SETUP_BACKGROUND}
        selectedIndex={isSelected ? 7 : null}
        listScroll={180}
        detail={
          isSelected ? (
            <DriverDetail
              title="EPSON Projectors"
              ringManufacturer={ringActive}
              scroll={detailScroll}
            >
              <ModelRow model="PowerLite" />
              <DeviceInfo>
                The Epson PowerLite Presenter HD is a portable projector with an integrated DVD
                player and speakers, suitable for presentations and video playback.
              </DeviceInfo>
              <Accordion label="Specs" />
              <Accordion label="Setup" />
              <Accordion label="Support" />
              {afterWeb ? (
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
          ) : undefined
        }
      />

      {/* Cue 1: Epson card tap & focus */}
      <TapIndicator
        x={card7CenterX}
        y={card7CenterY}
        at={cueProjector}
        name="Epson card tap"
      />
      {frame < cueWebpage ? (
        <FocusRing
          region={card7Region}
          appearAt={cueProjector}
          radius={5}
          name="Epson card ring"
        />
      ) : null}

      {/* Cue 2: Manufacturer link ring & tap */}
      {frame >= cueWebpage - 15 && frame < cueWebpage + 10 ? (
        <>
          <FocusRing
            region={mfrLinkRegion}
            appearAt={cueWebpage - 15}
            radius={4}
            name="Manufacturer link ring"
          />
          <TapIndicator
            x={mfrLinkCenterX}
            y={mfrLinkCenterY}
            at={cueWebpage}
            name="Manufacturer link tap"
          />
        </>
      ) : null}

      {/* Cue 3: Connection info ring */}
      {afterWeb ? (
        <FocusRing
          region={controlRegion}
          appearAt={cueConnection}
          radius={6}
          name="Connection info ring"
        />
      ) : null}
    </>
  );
};

/**
 * Add beat (16s = 480 frames):
 * + is tapped and Configure Connection opens; the IP is entered on "IP";
 * Connect is tapped on "connect" and turns Disconnect; the saved line is ringed.
 * Cues: add-ip "plus" (abs 2823, rel 33) · "IP" (abs 2946, rel 156)
 *       · add-saved "connect" (abs 3028, rel 238) · "save" (abs 3213, rel 423).
 */
export const AddBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cuePlus = CUE_FRAMES.addPlus - BEATS.add.from;
  const cueIp = CUE_FRAMES.addIp - BEATS.add.from;
  const cueConnect = CUE_FRAMES.addConnect - BEATS.add.from;
  const cueSave = CUE_FRAMES.addSave - BEATS.add.from;

  const connRegs = connectionRegions('tablet');

  // Phase 1: Before "plus" cue, show Epson detail pane with + button ringed and tapped
  if (frame < cuePlus) {
    return (
      <>
        <DriverCatalog
          device="tablet"
          drivers={CATALOG_DRIVERS}
          background={SETUP_BACKGROUND}
          selectedIndex={7}
          listScroll={180}
          detail={
            <DriverDetail title="EPSON Projectors" scroll={120}>
              <ModelRow model="PowerLite" />
              <DeviceInfo>
                The Epson PowerLite Presenter HD is a portable projector with an integrated DVD
                player and speakers, suitable for presentations and video playback.
              </DeviceInfo>
              <Accordion label="Specs" />
              <Accordion label="Setup" />
              <Accordion label="Support" />
              <ControlInfo
                controlType="IP"
                ipType="TCP"
                port="3629"
                keepAlive="Disabled"
                onConnection="Disabled"
                authentication="No"
                show={6}
              />
            </DriverDetail>
          }
        />
        <FocusRing
          region={{x: 1206, y: 32, width: 48, height: 48}}
          appearAt={0}
          radius={24}
          name="Add button ring"
        />
        <TapIndicator x={1230} y={56} at={cuePlus} name="Add button tap" />
      </>
    );
  }

  // Phase 2: Configure Connection is open
  const fullIp = '192.168.0.134';
  const charsCount = Math.floor(
    interpolate(frame, [cueIp, cueIp + 40], [0, fullIp.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const host = frame < cueIp ? '' : fullIp.slice(0, charsCount);
  const hostCaret = frame >= cueIp && frame < cueConnect;
  const connected = frame >= cueConnect;

  const terminal: TerminalLine[] = connected
    ? [
        {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
        {text: 'Connection saved', kind: 'status'},
      ]
    : [];

  const hostField = connRegs.hostField;
  const hostCenterX = hostField.x + hostField.width / 2;
  const hostCenterY = hostField.y + hostField.height / 2;

  const connectAction = connRegs.connectAction;
  const connectCenterX = connectAction.x + connectAction.width / 2;
  const connectCenterY = connectAction.y + connectAction.height / 2;

  // Saved line in terminal: Line 1 starts at y = terminal.y + 30
  const savedLineRegion = {
    x: connRegs.terminal.x + 10,
    y: connRegs.terminal.y + 30,
    width: 190,
    height: 24,
  };

  return (
    <>
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

      {/* Host IP field tap & focus on "IP" */}
      <TapIndicator
        x={hostCenterX}
        y={hostCenterY}
        at={cueIp}
        name="Host field tap"
      />
      {frame < cueConnect ? (
        <FocusRing
          region={hostField}
          appearAt={cueIp}
          radius={5}
          name="Host field ring"
        />
      ) : null}

      {/* Connect button tap & focus on "connect" */}
      <TapIndicator
        x={connectCenterX}
        y={connectCenterY}
        at={cueConnect}
        name="Connect tap"
      />
      {frame < cueSave ? (
        <FocusRing
          region={connectAction}
          appearAt={cueConnect}
          radius={5}
          name="Connect ring"
        />
      ) : null}

      {/* Saved connection line ring on "save" */}
      <FocusRing
        region={savedLineRegion}
        appearAt={cueSave}
        radius={4}
        name="Saved connection line ring"
      />
    </>
  );
};

/**
 * Terminal beat (5.5s = 165 frames):
 * Power On and Power Off are tapped on "commands" and land in the terminal, readable.
 * Cue: term-commands "commands" (abs 3363, rel 93).
 */
export const TerminalBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueCommands = CUE_FRAMES.termCommands - BEATS.terminal.from;
  const cuePowerOff = cueCommands + 25; // second command tapped shortly after

  const connRegs = connectionRegions('tablet');
  const send0 = connRegs.sendButton(0);
  const send1 = connRegs.sendButton(1);

  let highlightedCommand: number | null = null;
  if (frame >= cueCommands && frame < cuePowerOff) {
    highlightedCommand = 0; // Power On
  } else if (frame >= cuePowerOff && frame < cuePowerOff + 25) {
    highlightedCommand = 1; // Power Off
  }

  const terminal: TerminalLine[] = [
    {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
  ];
  if (frame >= cueCommands) {
    terminal.push({text: 'Sent: PWR ON [0D]', kind: 'sent'});
  }
  if (frame >= cuePowerOff) {
    terminal.push({text: 'Sent: PWR OFF [0D]', kind: 'sent'});
  }

  const pwrOnLineRegion = {
    x: connRegs.terminal.x + 10,
    y: connRegs.terminal.y + 30,
    width: 220,
    height: 24,
  };
  const pwrOffLineRegion = {
    x: connRegs.terminal.x + 10,
    y: connRegs.terminal.y + 54,
    width: 230,
    height: 24,
  };

  return (
    <>
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

      {/* Tap on Power On send button */}
      <TapIndicator
        x={send0.x + send0.width / 2}
        y={send0.y + send0.height / 2}
        at={cueCommands}
        name="Power On tap"
      />

      {/* Tap on Power Off send button */}
      <TapIndicator
        x={send1.x + send1.width / 2}
        y={send1.y + send1.height / 2}
        at={cuePowerOff}
        name="Power Off tap"
      />

      {/* Ring on arriving terminal lines */}
      <FocusRing
        region={pwrOnLineRegion}
        appearAt={cueCommands}
        radius={4}
        name="Power On line ring"
      />
      {frame >= cuePowerOff ? (
        <FocusRing
          region={pwrOffLineRegion}
          appearAt={cuePowerOff}
          radius={4}
          name="Power Off line ring"
        />
      ) : null}
    </>
  );
};

/**
 * Test beat (28s = 840 frames):
 * The device list is ringed on "listed"; Switcher, Terminal and Web page are each
 * tapped on their word; the Web page is held under two seconds.
 * Cues: test-device "listed" (abs 3698, rel 263) · test-switcher "switcher" (abs 3867, rel 432)
 *       · test-terminal "terminal" (abs 3919, rel 484) · test-webpage "webpage" (abs 4133, rel 698).
 */
export const TestBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueListed = CUE_FRAMES.testListed - BEATS.test.from;
  const cueSwitcher = CUE_FRAMES.testSwitcher - BEATS.test.from;
  const cueTerminal = CUE_FRAMES.testTerminal - BEATS.test.from;
  const cueWebpage = CUE_FRAMES.testWebpage - BEATS.test.from;

  // Web page tab is held for under two seconds (50 frames = 1.67s)
  const WEB_HOLD_FRAMES = 50;
  const webEnd = cueWebpage + WEB_HOLD_FRAMES;

  let testTab: ConnectTestSubTab = 'buttons';
  if (frame >= webEnd) {
    testTab = 'terminal';
  } else if (frame >= cueWebpage) {
    testTab = 'web';
  } else if (frame >= cueTerminal) {
    testTab = 'terminal';
  } else if (frame >= cueSwitcher) {
    testTab = 'switcher';
  } else {
    testTab = 'buttons';
  }

  const selectedInput = frame >= cueSwitcher + 25 ? 2 : 1;

  const testRegs = connectTestRegions('tablet');
  const switcherTab = testRegs.subTab('switcher');
  const terminalTab = testRegs.subTab('terminal');
  const webpageTab = testRegs.subTab('web');

  return (
    <>
      <ConnectTest
        device="tablet"
        topTab="test"
        testTab={testTab}
        deviceName="EPSON PowerLite - New"
        connected
        selectedInput={selectedInput}
        terminalLines={DEFAULT_CONNECT_TERMINAL}
        commands={DEFAULT_CONNECT_COMMANDS}
        webUrl="192.168.0.134"
        webTitle="EPSON Web Control"
      />

      {/* Cue 1: Device list ringed on "listed" */}
      {frame < cueSwitcher ? (
        <FocusRing
          region={testRegs.deviceList}
          appearAt={cueListed}
          radius={6}
          name="Device list ring"
        />
      ) : null}

      {/* Cue 2: Switcher tab tapped & ringed on "switcher" */}
      <TapIndicator
        x={switcherTab.x + switcherTab.width / 2}
        y={switcherTab.y + switcherTab.height / 2}
        at={cueSwitcher}
        name="Switcher tab tap"
      />
      {frame >= cueSwitcher && frame < cueTerminal ? (
        <FocusRing
          region={switcherTab}
          appearAt={cueSwitcher}
          radius={4}
          name="Switcher tab ring"
        />
      ) : null}

      {/* Cue 3: Terminal tab tapped & ringed on "terminal" */}
      <TapIndicator
        x={terminalTab.x + terminalTab.width / 2}
        y={terminalTab.y + terminalTab.height / 2}
        at={cueTerminal}
        name="Terminal tab tap"
      />
      {frame >= cueTerminal && frame < cueWebpage ? (
        <FocusRing
          region={terminalTab}
          appearAt={cueTerminal}
          radius={4}
          name="Terminal tab ring"
        />
      ) : null}

      {/* Cue 4: Web page tab tapped & ringed on "webpage" */}
      <TapIndicator
        x={webpageTab.x + webpageTab.width / 2}
        y={webpageTab.y + webpageTab.height / 2}
        at={cueWebpage}
        name="Web page tab tap"
      />
      {frame >= cueWebpage && frame < webEnd ? (
        <FocusRing
          region={webpageTab}
          appearAt={cueWebpage}
          radius={4}
          name="Web page tab ring"
        />
      ) : null}
    </>
  );
};

/**
 * Activities beat (19s = 570 frames):
 * Presets lists Power On and Power Off; Power On is tapped and its command ringed.
 * Cues: act-next "activities" (abs 4343, rel 68) · act-presets "power" (abs 4718, rel 443).
 */
export const ActivitiesBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueActivities = CUE_FRAMES.actActivities - BEATS.activities.from;
  const cuePower = CUE_FRAMES.actPower - BEATS.activities.from;

  const presetsRegs = activitiesPresetsRegions('tablet');
  const isEdit = frame >= cuePower;

  if (isEdit) {
    const editRegs = activitiesPresetsRegions('tablet', {mode: 'edit'});
    const cmdRegion = editRegs.commandStepCommand(0);
    return (
      <>
        <ActivitiesPresets
          device="tablet"
          activeTab="presets"
          mode="edit"
          editPresetName="Power On"
          editPresetIconColor={appColors.green}
          commandSteps={DEFAULT_COMMAND_STEPS}
        />
        <FocusRing
          region={cmdRegion}
          appearAt={cuePower}
          radius={4}
          name="Power On command ring"
        />
      </>
    );
  }

  const presetsTab = presetsRegs.presetsTab;
  const tabCenter = centerOf(presetsTab);
  const card0 = presetsRegs.presetCard(0);
  const card0Center = centerOf(card0);

  return (
    <>
      <ActivitiesPresets
        device="tablet"
        activeTab="presets"
        mode="list"
      />
      {frame >= cueActivities ? (
        <FocusRing
          region={presetsTab}
          appearAt={cueActivities}
          radius={4}
          name="Presets tab ring"
        />
      ) : null}
      <TapIndicator
        x={tabCenter.x}
        y={tabCenter.y}
        at={cueActivities}
        name="Presets tab tap"
      />
      <TapIndicator
        x={card0Center.x}
        y={card0Center.y}
        at={cuePower}
        name="Power On card tap"
      />
    </>
  );
};

/**
 * Switch-Audio beat (16.5s = 495 frames):
 * The Epson as the switcher, ringed; then Audio's volume up, down and set, ringed.
 * Cues: switch-assign "switcher" (abs 4982, rel 137) · "audio" (abs 5147, rel 302).
 */
export const SwitchAudioBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueSwitcher = CUE_FRAMES.switchSwitcher - BEATS['switch-audio'].from;
  const cueAudio = CUE_FRAMES.switchAudio - BEATS['switch-audio'].from;

  const showAudio = frame >= cueAudio;

  if (showAudio) {
    const audioRegs = activitiesAudioRegions('tablet');
    const card0 = audioRegs.mappingCard(0);
    const card2 = audioRegs.mappingCard(2);
    const audioMappingsRegion = {
      x: card0.x,
      y: card0.y,
      width: card0.width,
      height: card2.y + card2.height - card0.y,
    };
    const audioTab = audioRegs.audioTab;

    return (
      <>
        <ActivitiesAudio
          device="tablet"
          activeTab="audio"
          deviceName="EPSON PowerLite - New"
        />
        <FocusRing
          region={audioMappingsRegion}
          appearAt={cueAudio}
          radius={6}
          name="Audio mappings ring"
        />
        <FocusRing
          region={audioTab}
          appearAt={cueAudio}
          radius={4}
          name="Audio tab ring"
        />
      </>
    );
  }

  const switchRegs = activitiesSwitchRegions('tablet');
  const audioTabCenter = centerOf(switchRegs.audioTab);

  return (
    <>
      <ActivitiesSwitch
        device="tablet"
        activeTab="switch"
        switchType="many_to_one"
        deviceName="EPSON PowerLite - New"
      />
      {frame >= cueSwitcher ? (
        <>
          <FocusRing
            region={switchRegs.switchDeviceSelector}
            appearAt={cueSwitcher}
            radius={4}
            name="Epson switcher selector ring"
          />
          <FocusRing
            region={switchRegs.switchTab}
            appearAt={cueSwitcher}
            radius={4}
            name="Switch tab ring"
          />
        </>
      ) : null}
      <TapIndicator
        x={audioTabCenter.x}
        y={audioTabCenter.y}
        at={cueAudio}
        name="Audio tab tap"
      />
    </>
  );
};

/**
 * EUI beat (25s = 750 frames):
 * The end user gets the room, not the settings:
 * EUI launcher tapped on "interface" -> EUI opens;
 * source picked on "switching"; volume moves on "volume"; muted on "mute";
 * Powering Off on "down", then Welcome.
 * Cues: eui-setup "interface" (abs 5429, rel 89) · eui-technician "switching" (abs 5756, rel 416)
 *       · eui-volume-mute "volume" (abs 5830, rel 490) · "mute" (abs 5901, rel 561)
 *       · eui-power "down" (abs 5962, rel 622).
 */
export const EuiBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueInterface = CUE_FRAMES.euiInterface - BEATS.eui.from;
  const cueSwitching = CUE_FRAMES.euiSwitching - BEATS.eui.from;
  const cueVolume = CUE_FRAMES.euiVolume - BEATS.eui.from;
  const cueMute = CUE_FRAMES.euiMute - BEATS.eui.from;
  const cuePower = CUE_FRAMES.euiPower - BEATS.eui.from;

  // Phase 1: Before EUI opens, show setup screen with EUI launcher ringed and tapped on "interface"
  if (frame < cueInterface) {
    const launcherCenter = centerOf(tabletNavRegions.eui);
    return (
      <>
        <ActivitiesAudio
          device="tablet"
          activeTab="audio"
          deviceName="EPSON PowerLite - New"
        />
        <FocusRing
          region={tabletNavRegions.eui}
          appearAt={0}
          radius={8}
          name="EUI launcher ring"
        />
        <TapIndicator
          x={launcherCenter.x}
          y={launcherCenter.y}
          at={cueInterface}
          name="EUI launcher tap"
        />
      </>
    );
  }

  // Phase 4: Welcome screen with power off (frame >= 685, 65 frames to beat end)
  const POWER_OFF_TRANSITION = cuePower + 63; // 685
  if (frame >= POWER_OFF_TRANSITION) {
    return <EuiPowerCapture device="tablet" state="off" />;
  }

  // Phase 3: Powering off progress dialog (from cuePower to POWER_OFF_TRANSITION)
  if (frame >= cuePower) {
    return (
      <Sequence
        from={cuePower}
        durationInFrames={63}
        layout="none"
        name="Powering off progress"
      >
        <EuiPowerCapture
          device="tablet"
          state="powering-off"
          durationInFrames={63}
          volume={0.72}
          speakerMuted
        />
      </Sequence>
    );
  }

  // Phase 2: Active EUI control (cueInterface <= frame < cuePower)
  const selectedInput = frame < cueSwitching ? null : 0;
  const pressed = frame >= cueSwitching && frame < cueSwitching + 10 ? 'input-1' : null;

  const volume =
    frame < cueVolume
      ? 0.42
      : interpolate(frame, [cueVolume, cueVolume + 40], [0.42, 0.72], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const speakerMuted = frame >= cueMute;

  const row0 = TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(0);
  const row0Center = centerOf(row0);
  const speakerCenter = centerOf(TABLET_EUI_REGIONS.speakerControl);
  const powerBtnCenter = centerOf(TABLET_EUI_MANY_TO_ONE_REGIONS.powerControl);

  return (
    <>
      <TabletEuiManyToOne
        inputs={PROOF_INPUTS}
        selectedInput={selectedInput}
        volume={volume}
        speakerMuted={speakerMuted}
        outputLabel="Display 1"
        pressed={pressed}
      />

      {/* Cue 2: Source picked on "switching" */}
      <TapIndicator
        x={row0Center.x}
        y={row0Center.y}
        at={cueSwitching}
        name="Source tap"
      />
      {frame >= cueSwitching && frame < cueVolume ? (
        <FocusRing
          region={TABLET_EUI_MANY_TO_ONE_REGIONS.displayPanel}
          appearAt={cueSwitching}
          radius={0}
          name="Display panel ring"
        />
      ) : null}

      {/* Cue 3: Volume moves on "volume" */}
      {frame >= cueVolume && frame < cueMute ? (
        <FocusRing
          region={TABLET_EUI_REGIONS.volumeSlider}
          appearAt={cueVolume}
          radius={0}
          name="Volume slider ring"
        />
      ) : null}

      {/* Cue 4: Mute on "mute" */}
      <TapIndicator
        x={speakerCenter.x}
        y={speakerCenter.y}
        at={cueMute}
        name="Speaker mute tap"
      />
      {frame >= cueMute ? (
        <FocusRing
          region={TABLET_EUI_REGIONS.speakerControl}
          appearAt={cueMute}
          radius={4}
          name="Speaker mute ring"
        />
      ) : null}

      {/* Cue 5: Power down tap on "down" */}
      <TapIndicator
        x={powerBtnCenter.x}
        y={powerBtnCenter.y}
        at={cuePower}
        name="Power button tap"
      />
    </>
  );
};

const HOLD_FRAMES = 60; // The app's two-second press-and-hold, at 30fps

const HoldIndicator: React.FC<{
  x: number;
  y: number;
  progress: number;
}> = ({x, y, progress}) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      width={radius * 2 + 12}
      height={radius * 2 + 12}
      style={{
        position: 'absolute',
        left: x - radius - 6,
        top: y - radius - 6,
        pointerEvents: 'none',
      }}
    >
      <circle
        cx={radius + 6}
        cy={radius + 6}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth={4}
      />
      <circle
        cx={radius + 6}
        cy={radius + 6}
        r={radius}
        fill="none"
        stroke={appColors.blue}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${radius + 6} ${radius + 6})`}
      />
    </svg>
  );
};

/**
 * Exit beat (8s = 240 frames):
 * Continuous from EUI: opens on Welcome with power off;
 * a quick tap does nothing; the setup button is held for two seconds on "hold",
 * the hold ring fills, "Keep holding to return to Setup" shows,
 * and setup returns on second "back".
 * Cues: exit-hold "hold" (abs 6193, rel 103) · exit-hold "back" (2nd, abs 6274, rel 184).
 */
export const ExitBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueHold = CUE_FRAMES.exitHold - BEATS.exit.from;
  const cueBack = CUE_FRAMES.exitBack - BEATS.exit.from;

  const returnedToSetup = frame >= cueBack;

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

  const exitControl = TABLET_EUI_MANY_TO_ONE_REGIONS.exitControl;
  const exitCenter = centerOf(exitControl);

  const holdProgress = interpolate(
    frame,
    [cueHold, cueHold + HOLD_FRAMES],
    [0, 1],
    {
      easing: Easing.linear,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const hintOpacity = interpolate(
    frame,
    [cueHold, cueHold + 8],
    [0, 1],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  return (
    <>
      <EuiPowerCapture device="tablet" state="off" />

      {/* Quick tap at frame 40: ignored, does nothing */}
      <TapIndicator
        x={exitCenter.x}
        y={exitCenter.y}
        at={40}
        name="Quick tap (ignored)"
      />

      {/* Press and hold on "hold": 2s ring fills */}
      {frame >= cueHold ? (
        <>
          <HoldIndicator
            x={exitCenter.x}
            y={exitCenter.y}
            progress={holdProgress}
          />
          <div
            style={{
              position: 'absolute',
              left: 90,
              top: 34,
              fontFamily: font.ui,
              fontWeight: 400,
              fontSize: 20,
              color: appColors.white,
              letterSpacing: 0.2,
              opacity: hintOpacity,
              pointerEvents: 'none',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            Keep holding to return to Setup
          </div>
        </>
      ) : null}
    </>
  );
};

/**
 * Discovery beat (20s = 600 frames):
 * Find Devices scans the network:
 * discovery icon ringed and tapped on "discovery"; the count climbs on "scans";
 * driver match ringed on "database".
 * Cues: discovery-scan "discovery" (abs 6473, rel 143) · "scans" (abs 6588, rel 258)
 *       · "database" (abs 6843, rel 513).
 */
export const DiscoveryBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueDiscovery = CUE_FRAMES.discoveryDiscovery - BEATS.discovery.from;
  const cueScans = CUE_FRAMES.discoveryScans - BEATS.discovery.from;
  const cueDatabase = CUE_FRAMES.discoveryDatabase - BEATS.discovery.from;

  const discoverRegs = discoverDevicesRegions('tablet');

  // Discovery feature icon button in top-right of top bar
  const discoveryIconRegion: Region = {
    x: 200 + 1080 - 16 - 44, // 1220
    y: 4,
    width: 44,
    height: 44,
  };
  const iconCenter = centerOf(discoveryIconRegion);

  // Before cueScans, count holds at 3. From cueScans onwards, count climbs to 16.
  const foundCount =
    frame < cueScans
      ? 3
      : Math.floor(
          interpolate(frame, [cueScans, 500], [3, 16], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        );

  const scanningProgress =
    frame < cueScans
      ? 10
      : interpolate(frame, [cueScans, 600], [10, 85], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  const stillLooking = frame >= cueScans;

  return (
    <>
      <DiscoverDevices
        device="tablet"
        foundCount={foundCount}
        stillLooking={stillLooking}
        scanningProgress={scanningProgress}
      />

      {/* Discovery feature icon overlay in topBar corner */}
      <div
        style={{
          position: 'absolute',
          left: discoveryIconRegion.x,
          top: discoveryIconRegion.y,
          width: discoveryIconRegion.width,
          height: discoveryIconRegion.height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          backgroundColor:
            frame >= cueDiscovery && frame < cueDiscovery + 10
              ? appColors.gray25
              : 'transparent',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <circle cx={11} cy={11} r={8} stroke={appColors.white} strokeWidth={2.2} />
          <path
            d="M21 21L16.65 16.65"
            stroke={appColors.white}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Cue 1: Discovery icon ringed and tapped on "discovery" */}
      {frame < cueScans ? (
        <>
          <FocusRing
            region={discoveryIconRegion}
            appearAt={cueDiscovery - 10}
            radius={6}
            name="Discovery icon ring"
          />
          <TapIndicator
            x={iconCenter.x}
            y={iconCenter.y}
            at={cueDiscovery}
            name="Discovery icon tap"
          />
        </>
      ) : null}

      {/* Cue 3: Driver match ringed on "database" */}
      {frame >= cueDatabase ? (
        <FocusRing
          region={discoverRegs.driverMatch(6)}
          appearAt={cueDatabase}
          radius={4}
          name="Driver match ring"
        />
      ) : null}
    </>
  );
};

/**
 * Matrox-Add beat (30.5s = 915 frames):
 * Add a whole AV-over-IP system in one go:
 * Matrox rows ringed on "Matrox"; Add tapped on "add"; Added on "click".
 * Subsequent Matrox rows added in sequence, ending Added.
 * Cues: matrox-endpoints "Matrox" (abs 7008, rel 78) · matrox-add-these "add" (abs 7188, rel 258)
 *       · matrox-add-these "click" (abs 7239, rel 309).
 */
export const MatroxAddBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueEndpoints = CUE_FRAMES.matroxEndpoints - BEATS['matrox-add'].from;
  const cueAdd = CUE_FRAMES.matroxAdd - BEATS['matrox-add'].from;
  const cueClick = CUE_FRAMES.matroxClick - BEATS['matrox-add'].from;

  const discoverRegs = discoverDevicesRegions('tablet');

  // Smooth scroll so Matrox rows (cards 6, 7, 8) sit in the center of the viewport
  const scrollOffset = interpolate(frame, [0, cueEndpoints], [0, 180], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const addedDeviceIds: string[] = [];
  if (frame >= cueClick) {
    addedDeviceIds.push('d7');
  }
  if (frame >= 500) {
    addedDeviceIds.push('d8');
  }
  if (frame >= 700) {
    addedDeviceIds.push('d9');
  }

  // Cards 6, 7, 8 are the Matrox ConvertIP rows
  const card6 = discoverRegs.card(6);
  const card8 = discoverRegs.card(8);
  const matroxRowsRegion: Region = {
    x: card6.x,
    y: card6.y - scrollOffset,
    width: card6.width,
    height: card8.y + card8.height - card6.y,
  };

  const btn6 = discoverRegs.addButton(6, frame >= cueClick ? 'added' : 'add_driver');
  const offsetBtn6: Region = {
    x: btn6.x,
    y: btn6.y - scrollOffset,
    width: btn6.width,
    height: btn6.height,
  };
  const btn6Center = centerOf(offsetBtn6);

  const btn7 = discoverRegs.addButton(7, frame >= 500 ? 'added' : 'add_driver');
  const offsetBtn7: Region = {
    x: btn7.x,
    y: btn7.y - scrollOffset,
    width: btn7.width,
    height: btn7.height,
  };
  const btn7Center = centerOf(offsetBtn7);

  const btn8 = discoverRegs.addButton(8, frame >= 700 ? 'added' : 'add_driver');
  const offsetBtn8: Region = {
    x: btn8.x,
    y: btn8.y - scrollOffset,
    width: btn8.width,
    height: btn8.height,
  };
  const btn8Center = centerOf(offsetBtn8);

  return (
    <>
      <DiscoverDevices
        device="tablet"
        foundCount={16}
        stillLooking={false}
        scanningProgress={100}
        addedDeviceIds={addedDeviceIds}
        initialScrollOffset={scrollOffset}
        toast={frame >= 740 ? 'Device added to connections' : undefined}
      />

      {/* Cue 1: Matrox rows ringed on "Matrox" */}
      {frame >= cueEndpoints && frame < cueAdd ? (
        <FocusRing
          region={matroxRowsRegion}
          appearAt={cueEndpoints}
          radius={6}
          name="Matrox rows ring"
        />
      ) : null}

      {/* Cue 2: Add tapped on "add" */}
      <TapIndicator
        x={btn6Center.x}
        y={btn6Center.y}
        at={cueAdd}
        name="Matrox Add tap"
      />

      {/* Cue 3: Added ring on "click" */}
      {frame >= cueClick && frame < 460 ? (
        <FocusRing
          region={offsetBtn6}
          appearAt={cueClick}
          radius={5}
          name="Matrox Added ring"
        />
      ) : null}

      {/* Subsequent row adds */}
      <TapIndicator
        x={btn7Center.x}
        y={btn7Center.y}
        at={480}
        name="Matrox row 2 Add tap"
      />
      <TapIndicator
        x={btn8Center.x}
        y={btn8Center.y}
        at={680}
        name="Matrox row 3 Add tap"
      />
    </>
  );
};

/**
 * Matrox-Test beat (8s = 240 frames):
 * Test each encoder and decoder:
 * Matrox system with encoders and decoders side by side;
 * decoder tapped on "individual"; decoder takes encoder on "switch".
 * Cues: matrox-test-individual "individual" (abs 7875, rel 30)
 *       · matrox-test-switch "switch" (abs 7995, rel 150).
 */
export const MatroxTestBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueIndividual = CUE_FRAMES.matroxIndividual - BEATS['matrox-test'].from;
  const cueSwitch = CUE_FRAMES.matroxSwitch - BEATS['matrox-test'].from;

  const testRegs = connectTestRegions('tablet');

  const selectedOutput = frame < cueIndividual ? undefined : 0;
  const selectedInput = frame < cueSwitch ? undefined : 0;

  const outputs = [
    {
      name: 'CONVERTIP RX 1',
      ip: '239.100.45.1',
      routed: frame >= cueSwitch ? 'CONVERTIP TX 1' : null,
    },
    {name: 'CONVERTIP RX 2', ip: '239.100.46.1', routed: null},
    {name: 'CONVERTIP RX 3', ip: '239.100.47.1', routed: null},
    {name: 'CONVERTIP RX 4', ip: '239.100.48.1', routed: null},
  ];

  const out1 = testRegs.switcherOutput(1);
  const out1Center = centerOf(out1);
  const inp1 = testRegs.switcherInput(1);
  const inp1Center = centerOf(inp1);

  return (
    <>
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

      {/* Cue 1: Decoder tapped on "individual" */}
      <TapIndicator
        x={out1Center.x}
        y={out1Center.y}
        at={cueIndividual}
        name="Decoder tap"
      />
      {frame >= cueIndividual ? (
        <FocusRing
          region={out1}
          appearAt={cueIndividual}
          radius={6}
          name="Decoder ring"
        />
      ) : null}

      {/* Cue 2: Encoder tapped on "switch" -> decoder takes encoder */}
      <TapIndicator
        x={inp1Center.x}
        y={inp1Center.y}
        at={cueSwitch}
        name="Encoder tap"
      />
      {frame >= cueSwitch ? (
        <FocusRing
          region={inp1}
          appearAt={cueSwitch}
          radius={6}
          name="Encoder ring"
        />
      ) : null}
    </>
  );
};

/**
 * Matrox-Switch beat (23.5s = 705 frames):
 * Encoders and decoders, set up for the room:
 * switch type goes to AVoIP Encoders/Decoders on "encoders";
 * ConvertIP lists fill and are ringed on "convert".
 * Cues: matrox-switch-back "activities" (abs 8127, rel 42)
 *       · matrox-switch-change "encoders" (abs 8281, rel 196)
 *       · matrox-switch-convertip "convert" (abs 8387, rel 302).
 */
export const MatroxSwitchBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueBack = CUE_FRAMES.matroxSwitchBack - BEATS['matrox-switch'].from;
  const cueEncoders = CUE_FRAMES.matroxEncoders - BEATS['matrox-switch'].from;
  const cueConvert = CUE_FRAMES.matroxConvert - BEATS['matrox-switch'].from;

  const isAvoip = frame >= cueEncoders;
  const pickerOpen = frame >= 120 && frame < cueEncoders;

  const switchRegs = activitiesSwitchRegions('tablet');
  const avoipRegs = activitiesSwitchRegions('tablet', {switchType: 'avoip'});

  const switchTabCenter = centerOf(switchRegs.switchTab);
  const arrowCenter = centerOf(switchRegs.switchTypeArrow);
  const avoipOptCenter = centerOf(switchRegs.switchTypeOptionAvoip);

  return (
    <>
      <ActivitiesSwitch
        device="tablet"
        activeTab="switch"
        switchType={isAvoip ? 'avoip' : 'many_to_one'}
        switchTypePickerOpen={pickerOpen}
        deviceName="MATROX ConvertIP (8)"
        encoders={DEFAULT_AVOIP_ENCODERS}
        decoders={DEFAULT_AVOIP_DECODERS}
      />

      {/* Cue 1: Activities / Switch tab tapped on "activities" */}
      <TapIndicator
        x={switchTabCenter.x}
        y={switchTabCenter.y}
        at={cueBack}
        name="Switch tab tap"
      />
      {frame >= cueBack && frame < 120 ? (
        <FocusRing
          region={switchRegs.switchTypeSelector}
          appearAt={cueBack}
          radius={4}
          name="Switch type selector ring"
        />
      ) : null}

      {/* Dropdown open tap at frame 120 */}
      <TapIndicator
        x={arrowCenter.x}
        y={arrowCenter.y}
        at={120}
        name="Switch type dropdown tap"
      />

      {/* Cue 2: AVoIP option tapped on "encoders" -> switch type changes */}
      <TapIndicator
        x={avoipOptCenter.x}
        y={avoipOptCenter.y}
        at={cueEncoders}
        name="AVoIP option tap"
      />

      {/* Cue 3: Encoders and decoders lists ringed on "convert" */}
      {frame >= cueConvert ? (
        <>
          <FocusRing
            region={avoipRegs.encodersList}
            appearAt={cueConvert}
            radius={6}
            name="ConvertIP encoders list ring"
          />
          <FocusRing
            region={avoipRegs.decodersList}
            appearAt={cueConvert}
            radius={6}
            name="ConvertIP decoders list ring"
          />
        </>
      ) : null}
    </>
  );
};

/**
 * M2M beat (24.5s = 735 frames):
 * Many to many, by tap, drag or All:
 * Four displays with sources and displays in one frame:
 * a source tapped then a display; a source dragged onto a display;
 * All tapped, and every display takes it.
 * Cues: m2m-press-click "press" (abs 8978, rel 188) -> source tapped
 *       · m2m-press-click "click" (abs 9008, rel 218) -> display tapped
 *       · m2m-drag-drop "drag" (abs 9069, rel 279) -> drag onto display
 *       · m2m-send-all "all" (abs 9257, rel 467) -> All tapped
 */
export const M2mBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cuePress = CUE_FRAMES.m2mPress - BEATS.m2m.from;
  const cueClick = CUE_FRAMES.m2mClick - BEATS.m2m.from;
  const cueDrag = CUE_FRAMES.m2mDrag - BEATS.m2m.from;
  const cueAll = CUE_FRAMES.m2mAll - BEATS.m2m.from;

  const dragStart = cueDrag;
  const dragDuration = 40;
  const dragEnd = dragStart + dragDuration;

  const srcRow1 = centerOf(TABLET_EUI_REGIONS.sourceRow(1));
  const srcRow2 = centerOf(TABLET_EUI_REGIONS.sourceRow(2));
  const outCell1 = centerOf(TABLET_EUI_REGIONS.outputCell(1));
  const outCell2 = centerOf(TABLET_EUI_REGIONS.outputCell(2));
  const allCenter = centerOf(TABLET_EUI_REGIONS.routeAll);

  let selectedInput: number | null = null;
  let pressed: string | null = null;
  let drag: {inputIndex: number; x: number; y: number; opacity?: number; scale?: number} | null = null;
  let outputs: EuiOutput[] = [
    {label: 'Display 1', source: 'ConvertIP TX 1'},
    {label: 'Display 2', source: null},
    {label: 'Display 3', source: null},
    {label: 'Display 4', source: null},
  ];

  if (frame < cueDrag) {
    if (frame >= cuePress && frame < cueClick) {
      selectedInput = 1; // ConvertIP TX 2 selected
      if (frame < cuePress + 8) {
        pressed = 'input-2';
      }
    } else if (frame >= cueClick) {
      selectedInput = 1;
      if (frame < cueClick + 8) {
        pressed = 'output-2';
      }
      outputs[1] = {label: 'Display 2', source: 'ConvertIP TX 2'};
    }
  } else if (frame < cueAll) {
    selectedInput = null;
    outputs[1] = {label: 'Display 2', source: 'ConvertIP TX 2'};

    // Drag TX 3 onto Display 3
    if (frame >= dragStart && frame < dragEnd) {
      const dragProgress = interpolate(frame, [dragStart, dragEnd], [0, 1], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      drag = {
        inputIndex: 2,
        x: srcRow2.x + (outCell2.x - srcRow2.x) * dragProgress,
        y: srcRow2.y + (outCell2.y - srcRow2.y) * dragProgress,
        opacity: 0.95,
        scale: 1.05,
      };
      if (frame >= dragEnd - 8) {
        pressed = 'output-3';
      }
    } else if (frame >= dragEnd) {
      outputs[2] = {label: 'Display 3', source: 'ConvertIP TX 3'};
    }
  } else {
    // All sends TX 1 to every display
    selectedInput = 0;
    if (frame < cueAll + 8) {
      pressed = 'all';
    }
    outputs = [
      {label: 'Display 1', source: 'ConvertIP TX 1'},
      {label: 'Display 2', source: 'ConvertIP TX 1'},
      {label: 'Display 3', source: 'ConvertIP TX 1'},
      {label: 'Display 4', source: 'ConvertIP TX 1'},
    ];
  }

  const inputs: EuiInput[] = [
    {label: 'ConvertIP TX 1'},
    {label: 'ConvertIP TX 2'},
    {label: 'ConvertIP TX 3'},
    {label: 'ConvertIP TX 4'},
  ];

  return (
    <>
      <TabletEui
        outputs={outputs}
        inputs={inputs}
        selectedInput={selectedInput}
        volume={0.72}
        pressed={pressed}
        drag={drag}
      />

      {/* Cue 1: Source tapped on "press" */}
      <TapIndicator
        x={srcRow1.x}
        y={srcRow1.y}
        at={cuePress}
        name="Source tap"
      />

      {/* Cue 2: Display tapped on "click" -> routed Display 2 ringed */}
      <TapIndicator
        x={outCell1.x}
        y={outCell1.y}
        at={cueClick}
        name="Display tap"
      />
      {frame >= cueClick && frame < cueDrag ? (
        <FocusRing
          region={TABLET_EUI_REGIONS.outputCell(1)}
          appearAt={cueClick}
          radius={0}
          name="Display 2 routed ring"
        />
      ) : null}

      {/* Cue 3: Drag onto Display 3 on "drag" */}
      <TapIndicator
        x={srcRow2.x}
        y={srcRow2.y}
        at={dragStart}
        name="Drag start tap"
      />
      {frame >= dragEnd && frame < cueAll ? (
        <FocusRing
          region={TABLET_EUI_REGIONS.outputCell(2)}
          appearAt={dragEnd}
          radius={0}
          name="Display 3 routed ring"
        />
      ) : null}

      {/* Cue 4: All tapped on "all" -> every display takes it */}
      <TapIndicator
        x={allCenter.x}
        y={allCenter.y}
        at={cueAll}
        name="All tap"
      />
      {frame >= cueAll && frame < cueAll + 45 ? (
        <FocusRing
          region={TABLET_EUI_REGIONS.routeAll}
          appearAt={cueAll}
          radius={6}
          name="All control ring"
        />
      ) : null}
    </>
  );
};

/**
 * Settings beat (21s = 630 frames):
 * Settings → Support: User Manual, Quick Start, Factory Reset and Database Management
 * ringed on their words.
 * Cues: settings-manual "manual" (abs 9675, rel 150) -> User Manual ringed
 *       · settings-quick-start "quick" (abs 9759, rel 234) -> Quick Start ringed
 *       · settings-reset "factory" (abs 9933, rel 408) -> Factory Reset ringed
 *       · settings-reset "database" (abs 10003, rel 478) -> Database Management ringed
 */
export const SettingsBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const cueManual = CUE_FRAMES.settingsManual - BEATS.settings.from;
  const cueQuick = CUE_FRAMES.settingsQuick - BEATS.settings.from;
  const cueFactory = CUE_FRAMES.settingsFactory - BEATS.settings.from;
  const cueDatabase = CUE_FRAMES.settingsDatabase - BEATS.settings.from;

  const settingsRegs = settingsSupportRegions('tablet');

  return (
    <>
      <SettingsSupport
        device="tablet"
        resetButtonState="idle"
      />

      {/* Cue 1: User Manual ringed on "manual" */}
      {frame >= cueManual && frame < cueQuick ? (
        <FocusRing
          region={settingsRegs.userManualCard}
          appearAt={cueManual}
          radius={6}
          name="User Manual ring"
        />
      ) : null}

      {/* Cue 2: Quick Start ringed on "quick" */}
      {frame >= cueQuick && frame < cueFactory ? (
        <FocusRing
          region={settingsRegs.quickStartCard}
          appearAt={cueQuick}
          radius={6}
          name="Quick Start ring"
        />
      ) : null}

      {/* Cue 3: Factory Reset ringed on "factory" */}
      {frame >= cueFactory && frame < cueDatabase ? (
        <FocusRing
          region={settingsRegs.factoryResetCard}
          appearAt={cueFactory}
          radius={6}
          name="Factory Reset ring"
        />
      ) : null}

      {/* Cue 4: Database Management ringed on "database" */}
      {frame >= cueDatabase ? (
        <FocusRing
          region={settingsRegs.databaseManagementCard}
          appearAt={cueDatabase}
          radius={6}
          name="Database Management ring"
        />
      ) : null}
    </>
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
