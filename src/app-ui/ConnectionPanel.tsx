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

import type {CSSProperties, ReactNode} from 'react';
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

// ── RS-232 through an end point (tablet, v1.0.9) ─────────────────────────────────────
//
// driver_connect_edit.xml's `ll_endpoint_section` replaces the protocol/host/port row when a
// driver is RS-232: `btn_add_endpoint`, the end point it goes through (`tv_endpoint_ip`) and
// `split_connect_rs232`. Below, `ll_bottom_split` holds two equal columns. The left shows the
// driver's details and transport controls until a connection opens, then the terminal; the
// right holds the RS-232 configuration (`ll_ep_config`) above the commands. Checked against
// the W05 recording's stills f_0022 (before), f_0023 (connecting) and f_0024 (connected).

const EP_BUTTON_W = 150;
const EP_CONNECT_W = 200;
const SPLIT_TOP = TOP_BAR_H + ROW_H + GAP + ROW_H + 12;
const RS_LABEL_H = 34;
const RS_ROW_H = 40;
const RS_ROW_GAP = 8;
const RS_CMD_H = 52;
const RS_CMD_GAP = 4;
const RS_INPUT_H = 48;

const rs232Layout = () => {
  const l = layoutFor('tablet');
  const left = l.contentX + PAD;
  const columnW = (l.inner - PAD) / 2;
  const right = left + columnW + PAD;
  const configTop = SPLIT_TOP + RS_LABEL_H;
  const configBottom = configTop + 4 * (RS_ROW_H + RS_ROW_GAP);
  const commandsTop = configBottom + RS_LABEL_H;
  return {l, left, right, columnW, configTop, configBottom, commandsTop};
};

/** Regions of `Rs232ConnectionPanel`, from the same constants its markup lays out from. */
export const rs232ConnectionRegions = () => {
  const {l, left, right, columnW, configTop, configBottom, commandsTop} = rs232Layout();
  const bottom = l.viewport.height - PAD;
  return {
    content: {x: l.contentX, y: 0, width: l.inner + PAD * 2, height: l.viewport.height},
    endPointButton: {x: left, y: l.connY, width: EP_BUTTON_W, height: ROW_H},
    endPointField: {
      x: left + EP_BUTTON_W + GAP,
      y: l.connY,
      width: l.inner - EP_BUTTON_W - EP_CONNECT_W - GAP * 2,
      height: ROW_H,
    },
    connectAction: {x: left + l.inner - EP_CONNECT_W, y: l.connY, width: EP_CONNECT_W, height: ROW_H},
    /** The left column: details before a connection, the terminal after. */
    terminal: {x: left, y: SPLIT_TOP, width: columnW, height: bottom - SPLIT_TOP},
    config: {x: right, y: SPLIT_TOP, width: columnW, height: configBottom - SPLIT_TOP},
    commands: {x: right, y: configBottom, width: columnW, height: bottom - configBottom},
    commandRow: (index: number) => ({
      x: right,
      y: commandsTop + index * (RS_CMD_H + RS_CMD_GAP),
      width: columnW,
      height: RS_CMD_H,
    }),
    /** The status toast, centred over the panel near its foot. */
    toast: {x: l.contentX + (l.inner + PAD * 2) / 2 - 220, y: bottom - 60, width: 440, height: 40},
    configTop,
  };
};

const RS_FACE = 'Montserrat, sans-serif';
const RS_MONO = '"Space Mono", monospace';

const Segments = ({options, selected}: {options: string[]; selected: number}) => (
  <div style={{display: 'flex', height: 30}}>
    {options.map((option, index) => (
      <div
        key={option}
        style={{
          minWidth: 52,
          paddingLeft: 12,
          paddingRight: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: index === selected ? appColors.blue : appColors.gray20,
          fontFamily: RS_FACE,
          fontSize: 12,
          color: appColors.white,
        }}
      >
        {option}
      </div>
    ))}
  </div>
);

const ConfigRow = ({label, children}: {label: string; children: ReactNode}) => (
  <div style={{height: RS_ROW_H, display: 'flex', alignItems: 'center', marginBottom: RS_ROW_GAP}}>
    <span style={{flex: 1, fontFamily: RS_FACE, fontSize: 13, color: appColors.white}}>{label}</span>
    {children}
  </div>
);

const Detail = ({label, value}: {label: string; value: string}) => (
  <div style={{marginBottom: 10}}>
    <div style={{fontFamily: RS_FACE, fontSize: 11, color: appColors.white50}}>{label}</div>
    <div style={{fontFamily: RS_FACE, fontSize: 13, color: appColors.white}}>{value}</div>
  </div>
);

const ColumnHeading = ({children, bold = true}: {children: string; bold?: boolean}) => (
  <div
    style={{
      height: RS_LABEL_H,
      display: 'flex',
      alignItems: 'center',
      fontFamily: RS_FACE,
      fontWeight: bold ? 700 : 400,
      fontSize: bold ? 14 : 16,
      color: appColors.white,
    }}
  >
    {children}
  </div>
);

const RS_FIELD: CSSProperties = {
  height: ROW_H,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 5,
  backgroundColor: FIELD_BG,
  fontFamily: RS_FACE,
  fontSize: 13,
  color: appColors.white,
};

const SmallValue = ({value, width}: {value: string; width: number}) => (
  <div style={{...RS_FIELD, height: 30, width, justifyContent: 'center'}}>{value}</div>
);

export const Rs232ConnectionPanel = ({
  deviceName,
  manufacturer,
  model,
  category,
  endPoint = '',
  connected = false,
  commands,
  terminal = [],
  toast,
  showRoomMenus = false,
}: {
  deviceName: string;
  manufacturer: string;
  model: string;
  category: string;
  /** The end point the device goes through, e.g. "Global Cache iTachFlexEthernet - 192.168.0.159:4999". */
  endPoint?: string;
  /** Swaps the details for the terminal, and CONNECT RS-232 for DISCONNECT. */
  connected?: boolean;
  commands: DeviceCommand[];
  /** Terminal text once connected; the app prints its status line in grey (f_0023). */
  terminal?: string[];
  /** "Connecting RS-232 through …" while it opens, then "RS-232 connected via …". */
  toast?: string;
  showRoomMenus?: boolean;
}) => {
  const {l, columnW} = rs232Layout();
  const regions = rs232ConnectionRegions();
  const viewport = l.viewport;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: viewport.width,
        height: viewport.height,
        overflow: 'hidden',
        backgroundColor: appColors.black,
      }}
    >
      <TabletNavRail active="connect" showRoomMenus={showRoomMenus} />
      <div style={{flex: 1, minWidth: 0, paddingLeft: PAD, paddingRight: PAD}}>
        <div style={{position: 'relative', height: TOP_BAR_H, display: 'flex', alignItems: 'center'}}>
          <AppIcon name="ic_close" size={34} tint={appColors.priRed} />
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: RS_FACE,
              fontSize: 18,
              color: appColors.white,
            }}
          >
            Configure Connection
          </span>
        </div>
        <div style={{...RS_FIELD, justifyContent: 'center', fontSize: 16}}>{deviceName}</div>
        <div style={{display: 'flex', gap: GAP, marginTop: GAP}}>
          <div style={{...RS_FIELD, width: EP_BUTTON_W, justifyContent: 'center'}}>+ RS232 End Point</div>
          <div style={{...RS_FIELD, flex: 1, paddingLeft: 14}}>{endPoint}</div>
          <div style={{...RS_FIELD, width: EP_CONNECT_W, justifyContent: 'center'}}>
            {connected ? 'DISCONNECT' : 'CONNECT RS-232'}
          </div>
        </div>

        <div style={{display: 'flex', gap: PAD, marginTop: 12, height: viewport.height - SPLIT_TOP - PAD}}>
          <div style={{width: columnW, display: 'flex', flexDirection: 'column'}}>
            {connected ? (
              <>
                <ColumnHeading bold={false}>Terminal</ColumnHeading>
                <div
                  style={{
                    flex: 1,
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    backgroundColor: appColors.gray10,
                  }}
                >
                  {terminal.map((line, index) => (
                    <span key={index} style={{fontFamily: RS_MONO, fontSize: 13, color: appColors.white75}}>
                      {line}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    height: RS_INPUT_H,
                    marginTop: GAP,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 14,
                    backgroundColor: FIELD_BG,
                    fontFamily: RS_FACE,
                    fontSize: 14,
                    color: appColors.gray600,
                  }}
                >
                  Command
                </div>
              </>
            ) : (
              <div style={{display: 'flex', gap: PAD}}>
                <div style={{flex: 1}}>
                  <ColumnHeading>Driver Details</ColumnHeading>
                  <Detail label="Manufacturer" value={manufacturer} />
                  <Detail label="Model" value={model} />
                  <Detail label="Category" value={category} />
                </div>
                <div style={{flex: 1}}>
                  <ColumnHeading>Transport Controls</ColumnHeading>
                  <ConfigRow label="Authentication:">
                    <SmallValue value="No" width={74} />
                  </ConfigRow>
                  <ConfigRow label="Encoding:">
                    <SmallValue value="ASCII" width={74} />
                  </ConfigRow>
                  <ConfigRow label="Line Ending:">
                    <SmallValue value="CR" width={74} />
                  </ConfigRow>
                </div>
              </div>
            )}
          </div>

          <div style={{width: columnW}}>
            <ColumnHeading>RS-232 Configuration</ColumnHeading>
            <ConfigRow label="Baud Rate:">
              <SmallValue value="9600" width={90} />
            </ConfigRow>
            <ConfigRow label="Stop Bits:">
              <Segments options={['1', '2']} selected={0} />
            </ConfigRow>
            <ConfigRow label="Parity:">
              <Segments options={['None', 'Odd', 'Even']} selected={0} />
            </ConfigRow>
            <ConfigRow label="Flow Control:">
              <Segments options={['None', 'Hardware']} selected={0} />
            </ConfigRow>
            <ColumnHeading bold={false}>Commands</ColumnHeading>
            {connected
              ? commands.map((command) => (
                  <div
                    key={command.label}
                    style={{
                      height: RS_CMD_H,
                      marginBottom: RS_CMD_GAP,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 12,
                      paddingRight: 6,
                      backgroundColor: ROW_BG,
                    }}
                  >
                    <span style={{flex: 1, fontFamily: RS_FACE, fontSize: 13, color: appColors.white}}>
                      {command.label}
                    </span>
                    <span style={{marginRight: 10, fontFamily: RS_MONO, fontSize: 12, color: appColors.gray75}}>
                      {command.reference}
                    </span>
                    <div
                      style={{
                        width: 64,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        backgroundColor: appColors.gray25,
                        fontFamily: RS_FACE,
                        fontSize: 12,
                        color: appColors.white,
                      }}
                    >
                      SEND
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>

      {toast ? (
        <div
          style={{
            position: 'absolute',
            left: regions.toast.x,
            top: regions.toast.y,
            width: regions.toast.width,
            height: regions.toast.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '9px 22px',
              borderRadius: 22,
              backgroundColor: appColors.gray20,
              border: `1px solid ${appColors.gray25}`,
              fontFamily: RS_FACE,
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              color: appColors.white75,
            }}
          >
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
};

/** The Acer XL2320P's commands as f_0023, f_0024 and f_0041 show them. */
export const ACER_RS232_COMMANDS: DeviceCommand[] = [
  {label: 'POWER ON', reference: '* 0 IR 001\\r'},
  {label: 'POWER OFF', reference: '* 0 IR 002\\r'},
  {label: 'VOLUME UP', reference: '* 0 IR 023\\r'},
  {label: 'VOLUME DOWN', reference: '* 0 IR 024\\r'},
];

export const TabletRs232Proof = () => (
  <Rs232ConnectionPanel
    deviceName="ACER XL2320P - New"
    manufacturer="ACER"
    model="ACER Projectors"
    category="Projectors"
    endPoint="Global Cache iTachFlexEthernet - 192.168.0.159:4999"
    connected
    terminal={['Connected to 192.168.0.159:4999 ✓']}
    commands={ACER_RS232_COMMANDS}
    toast="RS-232 connected via 192.168.0.159:4999 ✓"
    showRoomMenus
  />
);
