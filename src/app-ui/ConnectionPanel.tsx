// The Configure Connection surface, rebuilt as live React.
//
// Geometry from res/layout/driver_connect_edit.xml:
//   48dp close button, centred title, device-name row with dropdown,
//   60dp connection row (protocol split | host | port | connect split),
//   "Commands" list, then "Received/Sent Data" over a gray_10 terminal.
//
// The terminal colours are NOT in res/. ConnectionEditFragment.kt:1719-1721 passes
// them as literals, so they cannot come from the token sync and are repeated here
// with that reference — if they change in the app, this is the line to update.

import {AppIcon} from './AppIcon';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
import {VIEWPORT as CONNECTION_VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';

export {VIEWPORT as CONNECTION_VIEWPORT} from './viewports';

/** ConnectionEditFragment.kt:1719-1721 — hardcoded, not resources. */
export const TERMINAL_COLORS = {
  status: '#00FF00',
  sent: '#008000',
  received: '#0000FF',
} as const;

export type TerminalLine = {
  text: string;
  kind: keyof typeof TERMINAL_COLORS;
};

export type DeviceCommand = {
  label: string;
  /** The raw string sent on the wire, e.g. "PWR ON\\r". */
  reference: string;
};

const FIELD_BG = appColors.gray20; // #383838 — bg_text_input_filled
const ROW_BG = appColors.gray15; //   #313131

// Layout rhythm. Every one of these is used by both the markup and CONNECTION_REGIONS
// below, so a region can never drift from the control it points at. Estimating these
// by eye is exactly how the first pass ended up spotlighting the wrong row.
const PAD = 16;
const TOP_BAR_H = 56;
const ROW_H = 48;
const GAP = 6;
const LABEL_BLOCK_H = 34; // SectionLabel: 12 margin-top + ~16 line + 6 margin-bottom
const CMD_H = 60;
const CMD_GAP = 2;

const layoutFor = (device: 'phone' | 'tablet') => {
  const viewport = CONNECTION_VIEWPORT[device];
  const isTablet = device === 'tablet';

  // Landscape puts this screen inside the setup rail's content frame — see
  // captures/tablet/connection-test.png, where the rail is beside it rather than behind
  // it. The panel is therefore 1080dp wide on a 1280dp surface, not 1280.
  const railW = isTablet ? TABLET_NAV_WIDTH : 0;
  const contentX = railW;

  const protocolW = isTablet ? 150 : 112;
  const portW = isTablet ? 100 : 74;
  const connectW = isTablet ? 200 : 0; // phone drops the action to its own row
  const inner = viewport.width - railW - PAD * 2;

  const nameY = TOP_BAR_H;
  const connY = nameY + ROW_H + GAP;
  const actionY = isTablet ? connY : connY + ROW_H + GAP;
  const commandsY = (isTablet ? connY : actionY) + ROW_H + LABEL_BLOCK_H;
  const terminalH = isTablet ? 110 : 130;
  const terminalY = viewport.height - PAD - terminalH;

  const hostX = contentX + PAD + protocolW + GAP;
  const hostW =
    inner - protocolW - portW - (isTablet ? connectW + GAP * 3 : GAP * 2);

  return {
    viewport,
    railW,
    contentX,
    inner,
    protocolW,
    portW,
    connectW,
    nameY,
    connY,
    actionY,
    commandsY,
    terminalY,
    terminalH,
    hostX,
    hostW,
  };
};

/**
 * Named regions in the panel's own coordinate space, for <Camera> and annotations.
 * Derived from layoutFor(), which is the same source the markup lays out from.
 */
export const connectionRegions = (device: 'phone' | 'tablet') => {
  const l = layoutFor(device);

  return {
    full: {x: 0, y: 0, width: l.viewport.width, height: l.viewport.height},
    /** The panel itself, excluding the setup rail beside it. */
    content: {x: l.contentX, y: 0, width: l.inner + PAD * 2, height: l.viewport.height},
    /** Horizontal centre of the panel — not of the surface. */
    centreX: l.contentX + (l.inner + PAD * 2) / 2,
    deviceName: {x: l.contentX + PAD, y: l.nameY, width: l.inner - 50, height: ROW_H},
    hostField: {x: l.hostX, y: l.connY, width: l.hostW, height: ROW_H},
    portField: {
      x: l.viewport.width - PAD - l.portW - (device === 'tablet' ? l.connectW + GAP : 0),
      y: l.connY,
      width: l.portW,
      height: ROW_H,
    },
    connectAction:
      device === 'tablet'
        ? {
            x: l.viewport.width - PAD - l.connectW,
            y: l.connY,
            width: l.connectW,
            height: ROW_H,
          }
        : {x: PAD, y: l.actionY, width: l.inner, height: ROW_H},
    commandRow: (index: number) => ({
      x: l.contentX + PAD,
      y: l.commandsY + index * (CMD_H + CMD_GAP),
      width: l.inner,
      height: CMD_H,
    }),
    /** The SEND button inside a command row. */
    sendButton: (index: number) => ({
      x: l.viewport.width - PAD - 8 - 90,
      y: l.commandsY + index * (CMD_H + CMD_GAP) + (CMD_H - 46) / 2,
      width: 90,
      height: 46,
    }),
    terminal: {x: l.contentX + PAD, y: l.terminalY, width: l.inner, height: l.terminalH},
  };
};

/** Protocol / connect controls use the same split shape as the catalog's filters. */
const SplitButton = ({
  label,
  width,
  flex,
  scale,
}: {
  label: string;
  width?: number;
  flex?: number;
  scale: number;
}) => (
  <div style={{display: 'flex', width, flex, height: 48 * scale}}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12 * scale,
        paddingRight: 12 * scale,
        borderTopLeftRadius: 5 * scale,
        borderBottomLeftRadius: 5 * scale,
        backgroundColor: FIELD_BG,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 14 * scale,
        whiteSpace: 'nowrap',
        color: appColors.white,
      }}
    >
      {label}
    </div>
    <div
      style={{
        width: 38 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5 * scale,
        borderBottomRightRadius: 5 * scale,
        borderLeft: `1px solid ${appColors.gray25}`,
        backgroundColor: FIELD_BG,
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${6 * scale}px solid transparent`,
          borderRight: `${6 * scale}px solid transparent`,
          borderTop: `${7 * scale}px solid ${appColors.white}`,
        }}
      />
    </div>
  </div>
);

const Field = ({
  value,
  placeholder,
  width,
  flex,
  scale,
  caretVisible = false,
}: {
  value: string;
  placeholder?: string;
  width?: number;
  flex?: number;
  scale: number;
  /** Draws the text cursor, for scenes that animate typing. */
  caretVisible?: boolean;
}) => (
  <div
    style={{
      width,
      flex,
      height: 48 * scale,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      paddingLeft: 14 * scale,
      paddingRight: 14 * scale,
      borderRadius: 5 * scale,
      backgroundColor: FIELD_BG,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      fontSize: 15 * scale,
      color: value ? appColors.white : appColors.gray600,
    }}
  >
    {value || placeholder}
    {caretVisible ? (
      <span
        style={{
          width: 2,
          height: 22 * scale,
          backgroundColor: appColors.blue,
        }}
      />
    ) : null}
  </div>
);

const CommandRow = ({
  command,
  highlighted,
  scale,
}: {
  command: DeviceCommand;
  highlighted: boolean;
  scale: number;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: CMD_H * scale,
      marginBottom: CMD_GAP,
      paddingLeft: 16 * scale,
      paddingRight: 8 * scale,
      backgroundColor: highlighted ? appColors.gray20 : ROW_BG,
    }}
  >
    <span
      style={{
        flex: 1,
        minWidth: 0,
        paddingRight: 10 * scale,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 16 * scale,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: appColors.white,
      }}
    >
      {command.label}
    </span>
    <span
      style={{
        flex: '0 0 auto',
        marginRight: 10 * scale,
        fontFamily: '"Space Mono", monospace',
        fontWeight: 400,
        fontSize: 14 * scale,
        whiteSpace: 'nowrap',
        color: appColors.gray75,
      }}
    >
      {command.reference}
    </span>
    <div
      style={{
        width: 90 * scale,
        height: 46 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4 * scale,
        backgroundColor: appColors.gray25,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 14 * scale,
        color: appColors.white,
      }}
    >
      SEND
    </div>
  </div>
);

const SectionLabel = ({children, scale}: {children: string; scale: number}) => (
  <div
    style={{
      marginTop: 12 * scale,
      marginBottom: 6 * scale,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      fontSize: 16 * scale,
      color: appColors.white,
    }}
  >
    {children}
  </div>
);

export const ConnectionPanel = ({
  device,
  deviceName,
  protocol = 'TCP',
  host,
  port,
  connected,
  commands,
  terminal,
  highlightedCommand = null,
  hostCaret = false,
  showRoomMenus = false,
}: {
  device: 'phone' | 'tablet';
  deviceName: string;
  protocol?: string;
  host: string;
  port: string;
  /** Flips the action button between CONNECT IP and DISCONNECT. */
  connected: boolean;
  commands: DeviceCommand[];
  terminal: TerminalLine[];
  /** Index into `commands`, for the scene that sends one. */
  highlightedCommand?: number | null;
  hostCaret?: boolean;
  /** Tablet only — reveals Activities and EUI in the rail once a connection is saved. */
  showRoomMenus?: boolean;
}) => {
  const isTablet = device === 'tablet';
  const scale = 1;
  const l = layoutFor(device);
  const viewport = l.viewport;

  return (
    <div
      style={{
        display: 'flex',
        width: viewport.width,
        height: viewport.height,
        overflow: 'hidden',
        backgroundColor: appColors.black,
      }}
    >
      {isTablet ? <TabletNavRail active="connect" showRoomMenus={showRoomMenus} /> : null}

      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: viewport.height,
          overflow: 'hidden',
          paddingLeft: PAD,
          paddingRight: PAD,
        }}
      >
        {/* Top bar — close left, centred title */}
        <div
          style={{
            position: 'relative',
            height: TOP_BAR_H,
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AppIcon name="ic_close" size={34} tint={appColors.priRed} />
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: 18,
              color: appColors.white,
            }}
          >
            Configure Connection
          </span>
        </div>

        {/* Device name */}
        <div style={{display: 'flex', gap: GAP, flex: '0 0 auto'}}>
          <div
            style={{
              flex: 1,
              height: ROW_H,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              backgroundColor: FIELD_BG,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: 16,
              color: appColors.white,
            }}
          >
            {deviceName}
          </div>
          <SplitButton label="" width={44} scale={scale} />
        </div>

        {/* Protocol | host | port, then the connect action.
            360dp cannot hold all four side by side, so the phone drops the action to
            its own row — the same thing the app's portrait layout does. */}
        <div style={{display: 'flex', gap: GAP, marginTop: GAP, flex: '0 0 auto'}}>
          <SplitButton label={protocol} width={l.protocolW} scale={scale} />
          <Field
            value={host}
            placeholder="Host IP Address"
            flex={1}
            scale={scale}
            caretVisible={hostCaret}
          />
          <Field value={port} placeholder="Port" width={l.portW} scale={scale} />
          {isTablet ? (
            <SplitButton
              label={connected ? 'DISCONNECT' : 'CONNECT IP'}
              width={l.connectW}
              scale={scale}
            />
          ) : null}
        </div>
        {isTablet ? null : (
          <div style={{display: 'flex', marginTop: GAP, flex: '0 0 auto'}}>
            <SplitButton label={connected ? 'DISCONNECT' : 'CONNECT IP'} flex={1} scale={scale} />
          </div>
        )}

        <SectionLabel scale={scale}>Commands</SectionLabel>

        <div style={{flex: 1, overflow: 'hidden'}}>
          {commands.map((command, index) => (
            <CommandRow
              key={command.label}
              command={command}
              highlighted={index === highlightedCommand}
              scale={scale}
            />
          ))}
        </div>

        <SectionLabel scale={scale}>Received/Sent Data</SectionLabel>

        <div
          style={{
            height: l.terminalH,
            flex: '0 0 auto',
            marginBottom: PAD,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            backgroundColor: appColors.gray10,
          }}
        >
          {terminal.map((line, index) => (
            <span
              key={`${line.kind}-${index}`}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontWeight: 400,
                fontSize: 14,
                color: TERMINAL_COLORS[line.kind],
              }}
            >
              {line.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
