// CTRLbot Terminator, rebuilt live: every screen as a component driven by props.
//
// A mirror of `C:\0-Repo\Utilities\CTRLbot Term\src`, class by class. Each Tailwind class
// in the app becomes the matching value from termTheme.ts, so a `px-4` there is a
// `sp(4)` here and a spacing change in the app is a one-line change in this file. Laid out
// in CSS pixels at `TERM_VIEWPORT`, like the ctrlbot.ai rebuild, and scaled once by
// whatever frames it.
//
// These components hold no time. A scene decides what state the screen is in on a given
// frame (TermScenes.tsx does that for the shorts and walkthroughs) and passes it in, so the
// same screen can be frozen for a proof still, stepped through a scan, or held on a
// result under a camera push.

import type {CSSProperties, ReactNode} from 'react';
import {Img, staticFile} from 'remotion';
import {
  TERM_CONTROL_ROW_HEIGHT,
  TERM_CONTROL_ROW_MARGIN_BOTTOM,
  TERM_NAV_HEADER_HEIGHT,
  TERM_NAV_HEADER_MARGIN_BOTTOM,
  TERM_NAV_ITEM_GAP,
  TERM_NAV_ITEM_HEIGHT,
  TERM_NAV_PADDING,
  TERM_NAV_WIDTH,
  TERM_SCAN_PADDING,
  TERM_SCREEN_PADDING,
  TERM_SEND_BAR_HEIGHT,
  TERM_SEND_BAR_MARGIN_TOP,
  TERM_SERIAL_CONTROL_ROW_HEIGHT,
  TERM_TABS_HEIGHT,
  TERM_VIEWPORT,
  type TermDevice,
  type TermTab,
} from './termData';
import {brand, mix, round, sp, termFont, text, tw} from './termTheme';

export type {TermTab};

const NAV: {id: TermTab; label: string}[] = [
  {id: 'scan', label: 'Scan'},
  {id: 'tcp-server', label: 'TCP Server'},
  {id: 'tcp-client', label: 'Raw TCP (Telnet)'},
  {id: 'serial', label: 'Serial (COM)'},
  {id: 'ssh', label: 'SSH Client'},
];

const border = (colour: string) => `1px solid ${colour}`;

/** `rounded-lg border border-gray-800 bg-gray-900` and friends: the app's card. */
const card = (extra: CSSProperties = {}): CSSProperties => ({
  borderRadius: round.lg,
  border: border(tw.gray800),
  backgroundColor: tw.gray900,
  ...extra,
});

const Label = ({children}: {children: ReactNode}) => (
  <div style={{...text.xs, color: tw.gray400, marginBottom: sp(1)}}>{children}</div>
);

/** `bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded text-sm`. */
const Field = ({value, width, mono, focused}: {value: string; width: number; mono?: boolean; focused?: boolean}) => (
  <div
    style={{
      ...text.sm,
      width,
      boxSizing: 'border-box',
      padding: `${sp(1.5)}px ${sp(3)}px`,
      borderRadius: round.sm,
      border: border(focused ? brand.blue : tw.gray700),
      backgroundColor: tw.gray800,
      color: tw.white,
      fontFamily: mono ? termFont.mono : termFont.ui,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }}
  >
    {value}
  </div>
);

/** A native select, closed: the value and the platform chevron. */
const Select = ({value, width, small}: {value: string; width: number | string; small?: boolean}) => (
  <div
    style={{
      ...(small ? text.xs : text.sm),
      width,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${sp(1.5)}px ${sp(2)}px`,
      borderRadius: round.sm,
      border: border(tw.gray700),
      backgroundColor: tw.gray800,
      color: tw.white,
    }}
  >
    <span style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>{value}</span>
    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
);

/** `px-6 py-1.5 rounded font-semibold text-sm`, blue at rest and red once live. */
const Button = ({label, tone = 'blue', pressed}: {label: string; tone?: 'blue' | 'red' | 'gray'; pressed?: boolean}) => (
  <div
    style={{
      ...text.sm,
      padding: `${sp(1.5)}px ${sp(6)}px`,
      borderRadius: round.sm,
      fontWeight: 600,
      color: pressed ? tw.black : tw.white,
      backgroundColor: pressed ? brand.yellow : tone === 'red' ? tw.red600 : tone === 'gray' ? tw.gray800 : brand.blue,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </div>
);

const Check = ({label, checked}: {label: string; checked: boolean}) => (
  <div style={{...text.xs, display: 'flex', alignItems: 'center', gap: sp(1.5), color: tw.gray300, fontWeight: 400}}>
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: 3,
        boxSizing: 'border-box',
        border: checked ? 'none' : border(tw.gray600),
        backgroundColor: checked ? brand.blue : tw.gray800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked ? (
        <svg viewBox="0 0 24 24" width={10} height={10} fill="none" stroke={tw.white} strokeWidth={4}>
          <path d="M5 12l5 5 9-10" />
        </svg>
      ) : null}
    </div>
    <span>{label}</span>
  </div>
);

const Pin = ({colour, pinned}: {colour: string; pinned?: boolean}) => (
  <svg
    viewBox="0 0 24 24"
    width={14}
    height={14}
    fill={pinned ? colour : 'none'}
    stroke={pinned ? 'none' : colour}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{minWidth: 14, minHeight: 14, transform: pinned ? 'scale(1.1)' : undefined}}
  >
    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
  </svg>
);

/** The per-screen instance tabs: `Server 1 (23)`, `192.168.0.135:1515`, and `+ New`. */
const InstanceTabs = ({label, live, pinned}: {label: string; live: boolean; pinned?: boolean}) => (
  <div
    style={{
      height: TERM_TABS_HEIGHT,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      gap: sp(1.5),
      padding: `${sp(2.5)}px ${sp(4)}px 0`,
      backgroundColor: mix(tw.gray900, 90),
      borderBottom: border(tw.gray800),
      flexShrink: 0,
    }}
  >
    <div
      style={{
        ...text.xs,
        display: 'flex',
        alignItems: 'center',
        gap: sp(2),
        padding: `${sp(1.5)}px ${sp(3.5)}px`,
        borderTopLeftRadius: round.md,
        borderTopRightRadius: round.md,
        backgroundColor: brand.blue,
        border: border(brand.blue),
        borderBottom: 'none',
        color: tw.white,
        fontWeight: 500,
      }}
    >
      <span style={{width: sp(2), height: sp(2), borderRadius: 999, backgroundColor: live ? tw.green400 : tw.gray500}} />
      <span>{label}</span>
      <Pin colour={pinned ? brand.yellow : mix(tw.white, 60)} pinned={pinned} />
      <span style={{fontSize: 11, fontWeight: 700, padding: `0 ${sp(1)}px`, color: mix(tw.white, 80)}}>✕</span>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: sp(1),
        marginLeft: sp(1),
        padding: `${sp(1)}px ${sp(2.5)}px`,
        borderRadius: round.sm,
        border: border(tw.gray700),
        backgroundColor: tw.gray800,
        color: tw.gray300,
        fontSize: text.xs.fontSize,
        fontWeight: 700,
      }}
    >
      <span>+</span>
      <span style={{fontSize: 11}}>New</span>
    </div>
  </div>
);

/** `flex flex-col border border-gray-800 rounded-lg bg-gray-900/60`: a received or sent log. */
const LogPane = ({
  title,
  lines,
  colour,
  toggles,
  grow = 1,
}: {
  title: string;
  lines: string[];
  colour: string;
  toggles?: boolean;
  grow?: number;
}) => (
  <div
    style={{
      flex: grow,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: round.lg,
      border: border(tw.gray800),
      backgroundColor: mix(tw.gray900, 60),
    }}
  >
    <div
      style={{
        ...text.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${sp(1.5)}px ${sp(3)}px`,
        backgroundColor: tw.gray900,
        borderBottom: border(tw.gray800),
        color: tw.gray200,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      <span>{title}</span>
      <div style={{display: 'flex', alignItems: 'center', gap: sp(4)}}>
        {toggles ? (
          <>
            <Check label="HEX" checked={false} />
            <Check label="Verbose CRLF" checked />
          </>
        ) : null}
        <span style={{color: tw.gray400, fontWeight: 400}}>Clear</span>
      </div>
    </div>
    <div style={{...text.sm, flex: 1, padding: sp(3), fontFamily: termFont.mono, color: colour, whiteSpace: 'pre'}}>
      {lines.join('\n')}
    </div>
  </div>
);

/** `mt-4 flex items-center space-x-3 bg-gray-900 p-3 rounded-lg`: type and send. */
const SendBar = ({placeholder, value, lineEnding, disabled}: {placeholder: string; value?: string; lineEnding?: string; disabled?: boolean}) => (
  <div
    style={{
      ...card({padding: sp(3)}),
      height: TERM_SEND_BAR_HEIGHT,
      boxSizing: 'border-box',
      marginTop: TERM_SEND_BAR_MARGIN_TOP,
      display: 'flex',
      alignItems: 'center',
      gap: sp(3),
      flexShrink: 0,
    }}
  >
    <div style={{...text.sm, flex: 1, fontFamily: termFont.mono, color: value ? tw.white : tw.gray500, opacity: disabled ? 0.5 : 1}}>
      {value || placeholder}
    </div>
    {lineEnding ? <Select value={lineEnding} width={96} small /> : null}
    <Check label="HEX" checked={false} />
    <div style={{opacity: disabled ? 0.5 : 1}}>
      <Button label="Send" />
    </div>
  </div>
);

/** The header controls row every connection screen opens with. */
const ControlRow = ({children, height = TERM_CONTROL_ROW_HEIGHT}: {children: ReactNode; height?: number}) => (
  <div
    style={{
      ...card({padding: sp(3)}),
      height,
      boxSizing: 'border-box',
      marginBottom: TERM_CONTROL_ROW_MARGIN_BOTTOM,
      display: 'flex',
      alignItems: 'flex-end',
      gap: sp(4),
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const Screen = ({children}: {children: ReactNode}) => (
  <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: TERM_SCREEN_PADDING, overflow: 'hidden'}}>{children}</div>
);

// ── Shell ───────────────────────────────────────────────────────────────────────────

/** The sidebar's `NetworkStatus` widget: online, and this PC's address. */
const NetworkStatus = ({ip}: {ip: string}) => (
  <div style={{marginTop: 'auto', paddingTop: sp(3), borderTop: border(tw.gray800)}}>
    <div style={{padding: sp(2.5), borderRadius: round.lg, border: border(mix(tw.gray800, 80)), backgroundColor: mix(tw.gray950, 70)}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: sp(1.5)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: sp(1.5)}}>
          <span style={{width: sp(2.5), height: sp(2.5), borderRadius: 999, backgroundColor: tw.emerald500, boxShadow: '0 0 8px rgba(16,185,129,0.8)'}} />
          <span style={{fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: tw.gray400}}>Online</span>
        </div>
        <div style={{display: 'flex', gap: sp(2), color: tw.gray400}}>
          <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
      </div>
      <div style={{padding: `${sp(1.5)}px ${sp(2)}px`, borderRadius: round.sm, border: border(tw.gray800), backgroundColor: mix(tw.gray900, 90), fontFamily: termFont.mono, fontSize: text.xs.fontSize, color: tw.gray200, fontWeight: 500}}>
        {ip}
      </div>
    </div>
  </div>
);

/**
 * The window's contents: sidebar and one screen. `highlight` puts a nav item in the
 * app's hover state (yellow), which is where a pointer is about to click.
 */
export const TermApp = ({tab, ip = '192.168.0.74', highlight, children}: {tab: TermTab; ip?: string; highlight?: TermTab; children: ReactNode}) => (
  <div
    style={{
      width: TERM_VIEWPORT.width,
      height: TERM_VIEWPORT.height,
      display: 'flex',
      backgroundColor: tw.gray950,
      color: tw.white,
      fontFamily: termFont.ui,
      fontSize: 14,
      lineHeight: '20px',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: TERM_NAV_WIDTH,
        flexShrink: 0,
        boxSizing: 'border-box',
        padding: TERM_NAV_PADDING,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tw.gray900,
        borderRight: border(tw.gray800),
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      }}
    >
      <div
        style={{
          height: TERM_NAV_HEADER_HEIGHT,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: sp(3),
          marginBottom: TERM_NAV_HEADER_MARGIN_BOTTOM,
          paddingBottom: sp(4),
          borderBottom: border(tw.gray800),
        }}
      >
        <Img src={staticFile('app-assets/term/ic_ctrlbot_head.svg')} style={{width: sp(8), height: sp(8), flexShrink: 0}} />
        <div style={{...text.lg, fontFamily: termFont.brand, fontWeight: 700, letterSpacing: '0.03em', color: tw.white}}>CTRLbot Terminator</div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: TERM_NAV_ITEM_GAP}}>
        {NAV.map((item) => {
          const active = item.id === tab;
          const hot = !active && item.id === highlight;
          return (
            <div
              key={item.id}
              style={{
                ...text.sm,
                height: TERM_NAV_ITEM_HEIGHT,
                boxSizing: 'border-box',
                padding: `${sp(2.5)}px ${sp(4)}px`,
                borderRadius: round.md,
                fontWeight: active ? 600 : 400,
                color: active ? tw.white : hot ? tw.black : tw.gray300,
                backgroundColor: active ? brand.blue : hot ? brand.yellow : 'transparent',
                boxShadow: active ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <NetworkStatus ip={ip} />
    </div>
    <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', backgroundColor: tw.gray950}}>{children}</div>
  </div>
);

// ── Scan ────────────────────────────────────────────────────────────────────────────

export type TermScanState = {
  status: 'ready' | 'running' | 'complete';
  checked: number;
  devices: TermDevice[];
  /** The Scan network button in its pressed state. */
  pressing?: boolean;
};

const webLabel = (port: number) =>
  port === 80 ? 'HTTP' : port === 443 ? 'HTTPS' : `${port === 8443 ? 'HTTPS' : 'HTTP'} :${port}`;

const Cell = ({children, mono, colour, width}: {children: ReactNode; mono?: boolean; colour?: string; width?: number}) => (
  <div
    style={{
      width,
      flex: width ? 'none' : 1,
      boxSizing: 'border-box',
      padding: `${sp(3)}px ${sp(3)}px`,
      fontFamily: mono ? termFont.mono : termFont.ui,
      fontSize: mono ? text.xs.fontSize : text.sm.fontSize,
      color: colour ?? tw.white,
      overflowWrap: 'anywhere',
    }}
  >
    {children}
  </div>
);

const Dash = () => <span style={{color: tw.gray600}}>—</span>;

// Fixed widths that fill the 1014px content column at TERM_VIEWPORT without the app's
// horizontal scroll, sized so the widest real values (a router's HTTP and HTTPS links,
// a Sonos device name) sit on one line.
const COLUMNS = [
  {label: 'Host Name', width: 186},
  {label: 'Device Name', width: 216},
  {label: 'Manufacturer', width: 136},
  {label: 'IP address', width: 112},
  {label: 'MAC address', width: 146},
  {label: 'Web', width: 204},
];

export const TermScan = ({state, adapter}: {state: TermScanState; adapter: {name: string; ipv4: string; subnet: string; hosts: number}}) => {
  const running = state.status === 'running';
  const label = running ? 'Scanning…' : state.status === 'complete' ? 'Scan complete' : 'Ready to scan';
  const progress = Math.round((state.checked / adapter.hosts) * 100);
  return (
    <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: sp(5), padding: TERM_SCAN_PADDING}}>
      <div>
        <div style={{...text.xl2, fontWeight: 700}}>Scan</div>
        <div style={{...text.sm, marginTop: sp(1), color: tw.gray400}}>Find devices on your local network and open their web interfaces.</div>
      </div>

      <div style={card({padding: sp(4)})}>
        <div style={{...text.xs, marginBottom: sp(2), fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: tw.gray400}}>Network port</div>
        <div style={{display: 'flex', alignItems: 'center', gap: sp(3)}}>
          <div style={{flex: 1, minWidth: 0}}>
            <div
              style={{
                ...text.sm,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: `${sp(2)}px ${sp(3)}px`,
                borderRadius: round.md,
                border: border(tw.gray700),
                backgroundColor: tw.gray950,
                opacity: running ? 0.5 : 1,
              }}
            >
              <span>
                {adapter.name} — {adapter.ipv4}
              </span>
              <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
          <div style={{opacity: running ? 0.4 : 1}}>
            <Button label="Refresh" tone="gray" />
          </div>
          {running ? <Button label="Stop" tone="red" /> : <Button label="Scan network" pressed={state.pressing} />}
        </div>
        <div style={{...text.xs, marginTop: sp(3), color: tw.gray400}}>
          Subnet <span style={{fontFamily: termFont.mono, color: tw.gray200}}>{adapter.subnet}</span> · {adapter.hosts} addresses · Range detected
          automatically
        </div>
      </div>

      <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: round.lg, border: border(tw.gray800), backgroundColor: mix(tw.gray900, 40)}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: sp(4), borderBottom: border(tw.gray800)}}>
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: sp(2)}}>
              <span style={{width: sp(2), height: sp(2), borderRadius: 999, backgroundColor: running ? brand.blue : state.status === 'complete' ? tw.emerald400 : tw.gray500}} />
              <span style={{...text.sm, fontWeight: 600}}>{label}</span>
              <span style={{...text.xs, padding: `${sp(0.5)}px ${sp(2)}px`, borderRadius: round.sm, backgroundColor: tw.gray800, color: tw.gray300}}>
                {state.devices.length} devices
              </span>
            </div>
            <div style={{...text.xs, marginTop: sp(1), color: tw.gray500}}>
              {state.status === 'ready'
                ? 'Select a network port and start a scan.'
                : `${adapter.name} · ${adapter.subnet} · ${state.checked} / ${adapter.hosts} checked`}
            </div>
          </div>
          <div style={{...text.xs, width: sp(52), boxSizing: 'border-box', padding: `${sp(2)}px ${sp(3)}px`, borderRadius: round.md, border: border(tw.gray700), backgroundColor: tw.gray950, color: tw.gray500}}>
            Filter names, vendor, IP…
          </div>
        </div>
        {state.status === 'ready' ? null : (
          <div style={{height: sp(1), flexShrink: 0, backgroundColor: tw.gray800}}>
            <div style={{height: '100%', width: `${progress}%`, backgroundColor: brand.blue}} />
          </div>
        )}
        <div style={{flex: 1, minHeight: 0, overflow: 'hidden'}}>
          <div style={{display: 'flex', backgroundColor: tw.gray900, color: tw.gray400, fontSize: text.xs.fontSize, textTransform: 'uppercase', letterSpacing: '0.025em', fontWeight: 500}}>
            {COLUMNS.map((column) => (
              <div key={column.label} style={{width: column.width, padding: `${sp(3)}px ${sp(3)}px`, boxSizing: 'border-box', whiteSpace: 'nowrap'}}>
                {column.label}
              </div>
            ))}
          </div>
          {state.devices.map((device, index) => (
            <div key={device.ip} style={{display: 'flex', alignItems: 'flex-start', borderTop: index ? border(mix(tw.gray800, 70)) : 'none'}}>
              <Cell width={COLUMNS[0].width}>{device.host ?? <Dash />}</Cell>
              <Cell width={COLUMNS[1].width}>{device.device ?? <Dash />}</Cell>
              <Cell width={COLUMNS[2].width} colour={tw.gray300}>
                {device.manufacturer ?? <Dash />}
              </Cell>
              <Cell width={COLUMNS[3].width} mono colour={tw.cyan300}>
                {device.ip}
              </Cell>
              <Cell width={COLUMNS[4].width} mono colour={tw.gray300}>
                {device.mac ?? '—'}
              </Cell>
              <Cell width={COLUMNS[5].width}>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: sp(2)}}>
                  {device.web.length ? (
                    device.web.map((port) => (
                      <span
                        key={port}
                        style={{
                          fontSize: text.xs.fontSize,
                          fontWeight: 500,
                          padding: `${sp(1)}px ${sp(2)}px`,
                          borderRadius: round.sm,
                          border: border(mix(brand.blue, 40)),
                          backgroundColor: mix(brand.blue, 10),
                          color: tw.cyan300,
                          fontFamily: termFont.ui,
                        }}
                      >
                        {webLabel(port)} ↗
                      </span>
                    ))
                  ) : (
                    <span style={{fontSize: text.xs.fontSize, color: tw.gray500}}>—</span>
                  )}
                </div>
              </Cell>
            </div>
          ))}
          {state.devices.length ? null : (
            <div style={{...text.sm, padding: `${sp(14)}px ${sp(6)}px`, textAlign: 'center', color: tw.gray500}}>
              {running ? 'Looking for devices… Results appear as they are found.' : 'Discovered devices will appear here.'}
            </div>
          )}
        </div>
        <div style={{fontSize: 11, padding: `${sp(2.5)}px ${sp(4)}px`, borderTop: border(tw.gray800), color: tw.gray500}}>
          A dash means the device hasn't supplied a name or vendor. Hover over a value to see its source.
        </div>
      </div>
    </div>
  );
};

// ── Connections ─────────────────────────────────────────────────────────────────────

export const TermTcpServer = ({port, listening, clients, received, sent, input, pressing, pinned}: {
  port: string;
  listening: boolean;
  clients: number;
  received: string[];
  sent: string[];
  input?: string;
  pressing?: boolean;
  pinned?: boolean;
}) => (
  <>
    <InstanceTabs label={`Server 1 (${port})`} live={listening} pinned={pinned} />
    <Screen>
      <ControlRow>
        <div>
          <Label>Port</Label>
          <Field value={port} width={sp(24)} />
        </div>
        <Button label={listening ? 'Stop' : 'Listen'} tone={listening ? 'red' : 'blue'} pressed={pressing} />
        <div style={{...text.sm, display: 'flex', gap: sp(4), color: tw.gray300, paddingBottom: sp(1.5)}}>
          <span>
            Status: {listening ? <span style={{color: tw.green400, fontWeight: 500}}>Listening</span> : <span style={{color: tw.gray500}}>Stopped</span>}
          </span>
          <span>
            Clients: <span style={{color: tw.white, fontWeight: 500}}>{clients}</span>
          </span>
        </div>
      </ControlRow>
      <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: sp(4)}}>
        <LogPane title="Received Data" lines={received} colour={tw.green400} toggles />
        <LogPane title="Sent Data / Logs" lines={sent} colour={tw.blue300} />
      </div>
      <SendBar placeholder="Type a message (use \r or \n for returns)..." value={input} />
    </Screen>
  </>
);

export const TermTcpClient = ({host, port, connected, received, sent, input, pressing}: {
  host: string;
  port: string;
  connected: boolean;
  received: string[];
  sent: string[];
  input?: string;
  pressing?: boolean;
}) => (
  <>
    <InstanceTabs label={`${host}:${port}`} live={connected} />
    <Screen>
      <ControlRow>
        <div>
          <Label>Host / IP</Label>
          <Field value={host} width={sp(40)} />
        </div>
        <div>
          <Label>Port</Label>
          <Field value={port} width={sp(24)} />
        </div>
        <div style={{marginLeft: 'auto'}}>
          <Button label={connected ? 'Disconnect' : 'Connect'} tone={connected ? 'red' : 'blue'} pressed={pressing} />
        </div>
      </ControlRow>
      <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: sp(4)}}>
        <LogPane title="Received Data (Raw TCP)" lines={received} colour={tw.green400} toggles />
        <LogPane title="Sent Data / Logs" lines={sent} colour={tw.blue300} />
      </div>
      <SendBar placeholder="Type a message..." value={input} lineEnding="CR (\r)" disabled={!connected} />
    </Screen>
  </>
);

export const TermSerial = ({port, baud, dataBits, parity, handshake, open, received, sent, input, pressing}: {
  port: string;
  baud: string;
  dataBits: string;
  parity: string;
  handshake: string;
  open: boolean;
  received: string[];
  sent: string[];
  input?: string;
  pressing?: boolean;
}) => (
  <>
    <InstanceTabs label={`${port} (${baud})`} live={open} />
    <Screen>
      <ControlRow height={TERM_SERIAL_CONTROL_ROW_HEIGHT}>
        <div>
          <Label>Port</Label>
          <div style={{display: 'flex', gap: sp(2)}}>
            <Select value={port} width={sp(32)} small />
            <div style={{...text.xs, padding: `${sp(1.5)}px ${sp(2.5)}px`, borderRadius: round.sm, border: border(tw.gray700), backgroundColor: tw.gray800}}>↻</div>
          </div>
        </div>
        <div>
          <Label>Baud Rate</Label>
          <Select value={baud} width={sp(24)} small />
        </div>
        <div>
          <Label>Data Size</Label>
          <Select value={dataBits} width={sp(16)} small />
        </div>
        <div>
          <Label>Parity</Label>
          <Select value={parity} width={sp(20)} small />
        </div>
        <div>
          <Label>Handshake</Label>
          <Select value={handshake} width={sp(24)} small />
        </div>
        <div style={{marginLeft: 'auto'}}>
          <Button label={open ? 'Close' : 'Open'} tone={open ? 'red' : 'blue'} pressed={pressing} />
        </div>
      </ControlRow>
      <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: sp(4)}}>
        <LogPane title="Received Data" lines={received} colour={tw.green400} toggles />
        <LogPane title="Sent Data / Logs" lines={sent} colour={tw.blue300} />
      </div>
      <SendBar placeholder="Type a message..." value={input} lineEnding="CR (\r)" disabled={!open} />
    </Screen>
  </>
);

export const TermSsh = ({host, username, connected, output, input, pressing}: {
  host: string;
  username: string;
  connected: boolean;
  output: string[];
  input?: string;
  pressing?: boolean;
}) => (
  <>
    <InstanceTabs label={`${username}@${host}`} live={connected} />
    <Screen>
      <ControlRow>
        <div>
          <Label>Host:Port</Label>
          <Field value={host} width={sp(48)} />
        </div>
        <div>
          <Label>Username</Label>
          <Field value={username} width={sp(32)} />
        </div>
        <div>
          <Label>Password</Label>
          <Field value="••••••••" width={sp(32)} />
        </div>
        <div style={{marginLeft: 'auto'}}>
          <Button label={connected ? 'Disconnect' : 'Connect'} tone={connected ? 'red' : 'blue'} pressed={pressing} />
        </div>
      </ControlRow>
      <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: round.lg, border: border(tw.gray800), backgroundColor: mix(tw.gray900, 60)}}>
        <div style={{...text.sm, flex: 1, padding: sp(4), fontFamily: termFont.mono, color: tw.green500, whiteSpace: 'pre', overflow: 'hidden'}}>
          {output.join('\n')}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: sp(2), padding: sp(2.5), backgroundColor: tw.gray900, borderTop: border(tw.gray800)}}>
          <span style={{marginLeft: sp(2), fontFamily: termFont.mono, fontWeight: 700, color: tw.green500}}>{'>'}</span>
          <span style={{...text.sm, fontFamily: termFont.mono, color: input ? tw.white : tw.gray500, opacity: connected ? 1 : 0.5}}>
            {input || 'Type command...'}
          </span>
        </div>
      </div>
    </Screen>
  </>
);
