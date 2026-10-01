import React from 'react';
import {Easing, interpolate} from 'remotion';
import {AppIcon} from '../../app-ui/AppIcon';
import {PHONE_VIEWPORT} from '../../app-ui/viewports';
import {PhoneEuiManyToOne} from '../../app-ui/PhoneEui';
import {FirstRunEducation} from '../../app-ui/FirstRunEducation';
import {AI_QUESTIONS, CtrlbotAi} from '../../app-ui/CtrlbotAi';
import {DriverCatalog, type DriverEntry} from '../../app-ui/DriverCatalog';
import {ProductWebView} from '../../app-ui/ProductWebView';
import {
  ConnectionPanel,
  type DeviceCommand,
  type TerminalLine,
} from '../../app-ui/ConnectionPanel';
import {PhoneNavMenu} from '../../app-ui/PhoneNavMenu';
import {appColors, appDimens} from '../../design/tokens.generated';
import {font} from '../../design/theme';
import type {BeatName} from './iotPhoneWalkthroughData';

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
 * Open beat (11s = 330 frames):
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
 * First-run beat (16.5s = 495 frames):
 * The first-run walkthrough card steps forward, then its ✕ closes it,
 * revealing the underlying setup screen.
 */
export const FirstRunBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const step = frame < 220 ? 1 : 2;
  const cardOpacity =
    frame < 400
      ? 1
      : interpolate(frame, [400, 435], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <FirstRunEducation
      device="phone"
      step={step}
      cardOpacity={cardOpacity}
    />
  );
};

/**
 * AI beat (18.5s = 555 frames):
 * CTRLbot AI's question list; one question is picked and its answer lands.
 */
export const AiBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const isQuestionPicked = frame >= 150;
  const answerProgress = interpolate(frame, [190, 230], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <PhoneScreen fontFamily={font.ui}>
      <CtrlbotAi device="phone" promptFocused={isQuestionPicked} />

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

      <PhoneNavMenu expanded active="ctrlbot" />
    </PhoneScreen>
  );
};

/**
 * Database beat (25s = 750 frames):
 * The catalog scrolls; the category filter opens on Projector, Display, Switchers, End Points.
 */
export const DatabaseBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const listScroll = interpolate(frame, [30, 240], [0, 160], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const menuOpen = frame >= 270 && frame < 650;
  const openMenu = menuOpen
    ? {
        control: 'category' as const,
        items: ['Projector', 'Display', 'Switchers', 'End Points'] as const,
      }
    : undefined;

  return (
    <PhoneScreen>
      <DriverCatalog
        device="phone"
        drivers={CATALOG_DRIVERS}
        listScroll={listScroll}
        openMenu={openMenu}
      />
      <PhoneNavMenu expanded={false} active="device" />
    </PhoneScreen>
  );
};

/**
 * Epson beat (15s = 450 frames):
 * Epson PowerLite's page: device info, specs, setup, support; the product-page link
 * is ringed, then the app's web view opens on the manufacturer page loading.
 */
export const EpsonBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const showWebView = frame >= 240;
  const ringActive = frame >= 120 && frame < 240;

  if (showWebView) {
    const progress = interpolate(frame, [240, 450], [15, 75], {
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

  return (
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
                outline: ringActive ? `2px solid ${appColors.blue}` : 'none',
                boxShadow: ringActive ? `0 0 12px ${appColors.blue}` : 'none',
                transition: 'outline 0.2s',
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
};

/**
 * Add beat (9.5s = 285 frames):
 * + is pressed, the IP is entered, Connect goes to Disconnect and the connection
 * shows as saved.
 */
export const AddBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  const fullIp = '192.168.0.134';
  const charsCount = Math.floor(
    interpolate(frame, [20, 80], [0, fullIp.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const host = fullIp.slice(0, charsCount);
  const hostCaret = frame < 90;
  const connected = frame >= 120;

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
    </PhoneScreen>
  );
};

/**
 * Terminal beat (15.5s = 465 frames):
 * Power On and Power Off are sent and each lands in the terminal; a typed command is sent.
 */
export const TerminalBeat: React.FC<{frame: number; frames: number}> = ({frame}) => {
  let highlightedCommand: number | null = null;
  const terminal: TerminalLine[] = [
    {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
  ];

  if (frame < 140) {
    highlightedCommand = 0; // Power On
    terminal.push({text: 'Sent: PWR ON [0D]', kind: 'sent'});
  } else if (frame < 280) {
    highlightedCommand = 1; // Power Off
    terminal.push({text: 'Sent: PWR ON [0D]', kind: 'sent'});
    terminal.push({text: 'Sent: PWR OFF [0D]', kind: 'sent'});
  } else {
    highlightedCommand = null;
    terminal.push({text: 'Sent: PWR ON [0D]', kind: 'sent'});
    terminal.push({text: 'Sent: PWR OFF [0D]', kind: 'sent'});
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
    </PhoneScreen>
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
};
