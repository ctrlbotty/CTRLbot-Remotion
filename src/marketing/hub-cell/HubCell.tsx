// THE HUB — the device database as a 34-second, full-bleed ctrlbot.io media cell.
//
// This is a loop, not a cut. The site plays it silently beside HTML copy, so it carries
// no Stage, panel, gradient, product label, or copy column. The final beat returns the
// catalog to the same unselected, top-of-list state shown at frame 0.
//
// The cut runs the database end to end: the library, the types, and then one driver's
// manual, connection and API — followed by making the connection and sending commands
// down it. `connect` and `terminal` are the same two screens `DeviceDatabase.tsx` uses at
// `connect` and `test`, on the same data, compressed to five and four and a half seconds.

import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {DriverCatalog, SETUP_BACKGROUND} from '../../app-ui/DriverCatalog';
import {
  Accordion,
  CommandCard,
  CommandsBar,
  ConnectionLog,
  ConnectionSummary,
  ControlInfo,
  DeviceInfo,
  DriverConnection,
  DriverDetail,
  IpTransportRow,
  ModelRow,
  SendRow,
} from '../../app-ui/DriverDatabase';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {Camera, frameWidth, type Shot} from '../../camera/Camera';
import {color} from '../../design/theme';
import {
  EPSON_COMMANDS,
  EPSON_CONNECTION,
  EPSON_DESCRIPTION,
  EPSON_INDEX,
  EPSON_LOG,
  EPSON_PORT,
  EPSON_SETUP,
  HOST,
  IP_DRIVERS,
  LINE_ENDING_OPTIONS,
  SORT_OPTIONS,
} from '../device-database/deviceDatabaseData';
import {BEATS, HUB_FRAMES, type BeatName} from './hubCellData';

export const hubCellDuration = HUB_FRAMES;

/**
 * Per-beat framing in the tablet surface's own dp.
 *
 * The whole-library shots carry their margin as a black band outside the 1280dp plane.
 * Types starts at the rail/list boundary so the list's 12dp inset becomes the margin.
 * The three evidence close-ups use the detail pane from x=630 to x=1280, where its own
 * 30dp padding keeps every label and control off the frame edge.
 *
 * `connect` and `terminal` pull back to 1192 — the whole content area, 88 to 1280 — for
 * the reason `DeviceDatabase.tsx` gives at the same two beats: Configure Connection's
 * transport row is genuinely 1160dp from the protocol dropdown to the connect button, and
 * the connect button is the evidence. Cropping it tighter crops the payoff out.
 */
const FRAMING: Record<BeatName, {x: number; y: number; width: number}> = {
  library: {x: 384, y: 240, width: 768},
  types: {x: 384, y: 240, width: 768},
  manual: {x: 955, y: 280, width: 650},
  connection: {x: 955, y: 280, width: 650},
  api: {x: 955, y: 280, width: 650},
  connect: {x: 684, y: 372, width: 1192},
  terminal: {x: 684, y: 372, width: 1192},
  close: {x: 384, y: 240, width: 768},
};

const BEAT_NAMES = Object.keys(BEATS) as BeatName[];
const CAMERA_SETTLE = 22;

/** Arrive at each beat's framing in 22 frames, then hold it through the beat. */
const SHOTS: Shot[] = BEAT_NAMES.flatMap((name) => {
  const beat = BEATS[name];
  const shot = FRAMING[name];
  const region = frameWidth({x: shot.x, y: shot.y}, shot.width);
  return [
    {at: beat.from === 0 ? 0 : beat.from + CAMERA_SETTLE, region},
    {at: beat.from + beat.duration, region},
  ];
});

const rise = (frame: number, at: number, distance = 14) => ({
  opacity: interpolate(frame, [at, at + 34], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  translate: interpolate(frame, [at, at + 42], [`0px ${distance}px`, '0px 0px'], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
});

const scroll = (local: number, window: number, from: number, to: number) =>
  interpolate(local, [0, window], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const fade = (frame: number, at: number, length = 14) =>
  interpolate(frame, [at, at + length], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** The address, one character at a time — the only thing in the cut that is typed. */
const typed = (local: number, text: string, at: number, over: number) =>
  text.slice(
    0,
    Math.floor(
      interpolate(local, [at, at + over], [0, text.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    ),
  );

const Arrive = ({
  name,
  frame,
  at,
  distance,
  children,
}: {
  name: string;
  frame: number;
  at: number;
  distance?: number;
  children: ReactNode;
}) => (
  <Interactive.Div name={name} style={rise(frame, at, distance)}>
    {children}
  </Interactive.Div>
);

const LibraryBeat = ({frame}: {frame: number}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    // Held, then 100 frames to travel what used to take 55. The manufacturer names are
    // the evidence of this beat and a list moving faster than they can be read proves
    // nothing about how much is in it.
    listScroll={scroll(frame - BEATS.library.from - 60, 100, 0, 134)}
  />
);

const TypesBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.types.from;
  return (
    <DriverCatalog
      device="tablet"
      drivers={IP_DRIVERS}
      background={SETUP_BACKGROUND}
      emphasizeTypes
      listScroll={134}
      openMenu={local >= 24 ? {control: 'sort', items: SORT_OPTIONS} : undefined}
    />
  );
};

const DetailBeat = ({scroll: paneScroll, children}: {scroll: number; children: ReactNode}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    selectedIndex={EPSON_INDEX}
    listScroll={702}
    detail={
      <DriverDetail title="EPSON Projectors" scroll={paneScroll}>
        {children}
      </DriverDetail>
    }
  />
);

const ManualBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.manual.from;
  return (
    // 200 frames of travel, and the four Setup paragraphs 22 apart rather than 14. This
    // beat is nothing but prose — the description and the manufacturer's own setup text —
    // so it is the one that punishes a fast pane hardest.
    <DetailBeat scroll={scroll(local, 200, -8, 146)}>
      <ModelRow model="PowerLite" />
      <Arrive name="Epson description" frame={local} at={0} distance={8}>
        <DeviceInfo>{EPSON_DESCRIPTION}</DeviceInfo>
      </Arrive>
      <Arrive name="Specs heading" frame={local} at={34} distance={8}>
        <Accordion label="Specs" />
      </Arrive>
      <Arrive name="Setup documentation" frame={local} at={52} distance={8}>
        <Accordion label="Setup" open>
          {EPSON_SETUP.map((paragraph, index) => (
            <Interactive.Div
              key={paragraph}
              name={`Setup paragraph ${index + 1}`}
              style={rise(local, 60 + index * 22, 8)}
            >
              {paragraph}
            </Interactive.Div>
          ))}
        </Accordion>
      </Arrive>
      <Arrive name="Support heading" frame={local} at={160} distance={8}>
        <Accordion label="Support" />
      </Arrive>
    </DetailBeat>
  );
};

const ConnectionBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.connection.from;
  return (
    <DetailBeat scroll={scroll(local, 180, -8, 30)}>
      {/* A row every 22 frames rather than every 14, so all six are in by frame 120 with
          75 left to read them. Each row is a label and a value and there is no second
          chance at one that has already been replaced by the next. */}
      <ControlInfo
        controlType="IP"
        ipType="TCP"
        port={EPSON_PORT}
        show={Math.min(6, Math.max(0, Math.floor((local - 10) / 22) + 1))}
      />
    </DetailBeat>
  );
};

const ApiBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.api.from;
  return (
    <DetailBeat scroll={scroll(local, 195, -6, 34)}>
      {/* The menu opens at 100 and stays open for the last 110 frames. Four line endings
          rendered as escape sequences are the slowest thing in the cut to read. */}
      <CommandsBar
        encoding="ASCII"
        lineEnding="CR (\r)"
        menu={local >= 100 ? LINE_ENDING_OPTIONS : undefined}
      />
      {EPSON_COMMANDS.slice(0, 3).map((command, index) => (
        <Interactive.Div
          key={command.key}
          name={`Command — ${command.key}`}
          style={rise(local, 8 + index * 28, 10)}
        >
          <CommandCard command={command} />
        </Interactive.Div>
      ))}
    </DetailBeat>
  );
};

/**
 * Configure Connection, from empty to answering.
 *
 * The 2-minute cut's `connect` beat, at 150 frames instead of 330. The order is the
 * recording's and does not change: the form opens already knowing the protocol, the port,
 * the encoding and the line ending; only the address is typed; the button becomes
 * DISCONNECT; the log says the device is there. Three command rows rather than two,
 * because two leave the bottom third of the panel empty under a one-line log — see the
 * note on `ConnectBeat` in `DeviceDatabase.tsx`, which is where that number was settled.
 */
const ConnectBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.connect.from;
  const connected = local >= 130;
  return (
    <DriverConnection
      name={EPSON_CONNECTION}
      saved={local >= 100}
      scroll={scroll(local, 210, 0, 30)}
      transport={
        // 70 frames to type twelve characters, finishing at 90, and the button does not
        // flip until 130. The address and the CONNECT IP beside it are both readable for
        // a beat and a half before either changes.
        <IpTransportRow
          host={typed(local, HOST, 20, 70)}
          port={EPSON_PORT}
          action={connected ? 'DISCONNECT' : 'CONNECT IP'}
        />
      }
    >
      <ConnectionSummary
        manufacturer="EPSON"
        model="EPSON Projectors"
        category="Projectors"
        transport={[
          {label: 'Authentication:', value: 'No'},
          {label: 'Encoding:', value: 'ASCII'},
          {label: 'Line Ending:', value: 'CR'},
        ]}
      />
      <div style={{marginTop: 16}}>
        {EPSON_COMMANDS.slice(0, 3).map((command, index) => (
          <Arrive
            key={command.key}
            name={`Send row — ${command.key}`}
            frame={local}
            at={8 + index * 22}
            distance={8}
          >
            <SendRow label={command.label} payload={command.payload} />
          </Arrive>
        ))}
      </div>
      <Arrive name="Connection log" frame={local} at={140} distance={10}>
        <ConnectionLog lines={EPSON_LOG.slice(0, 1)} />
      </Arrive>
    </DriverConnection>
  );
};

/**
 * Which row is pressed when, and therefore which line the log gains.
 *
 * The three the recording sends — POWER ON, VOLUME DOWN, MUTE TOGGLE — and their order
 * here has to match `EPSON_LOG`, because the log is what the viewer reads the payload
 * off. Held 16 frames apiece: long enough to read as a button going down, short enough
 * that two are never down at once.
 *
 * 54 frames apart rather than 38, and the last one lands at 146 of 180 — the log's final
 * line gets a full second on screen before the beat ends, which it did not have before.
 */
const SENDS = [
  {row: 0, at: 24},
  {row: 4, at: 78},
  {row: 5, at: 132},
] as const;
const SEND_HELD = 16;

/**
 * The same screen, scrolled to the commands, with three of them sent on camera.
 *
 * `DeviceDatabase.tsx`'s `test` drops the summary and renders the rows alone. That works
 * in a 680px panel and does not work here: the shot is 745dp tall, six rows and a
 * three-line log are about 590, and the difference is a dead band across the bottom
 * fifth of the frame — the same failure its `ConnectBeat` comment describes with two
 * command rows. Keeping the summary and scrolling up through it is also what the screen
 * actually does, since this is `connect`'s screen a few seconds later.
 */
const TerminalBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.terminal.from;
  const landed = SENDS.filter((send) => local >= send.at + 14).length;
  return (
    <DriverConnection
      name={EPSON_CONNECTION}
      saved
      // Settles in the first 60 frames and then holds, rather than drifting for the whole
      // beat: the log has to be on camera before the first SEND lands, not after it.
      scroll={scroll(local, 60, 40, 105)}
      transport={<IpTransportRow host={HOST} port={EPSON_PORT} action="DISCONNECT" />}
    >
      {/* No Volume Set or Switcher Config here, where `connect` has both. Six command
          rows are 324dp against that beat's three, and with the variable blocks as well
          the screen is taller than the shot — which puts the log, the one thing this
          beat is about, below the bottom edge for all of it. */}
      <ConnectionSummary
        manufacturer="EPSON"
        model="EPSON Projectors"
        category="Projectors"
        variables={false}
        transport={[
          {label: 'Authentication:', value: 'No'},
          {label: 'Encoding:', value: 'ASCII'},
          {label: 'Line Ending:', value: 'CR'},
        ]}
      />
      <div style={{marginTop: 14}}>
        {EPSON_COMMANDS.slice(0, 6).map((command, index) => (
          <SendRow
            key={command.key}
            label={command.label}
            payload={command.payload}
            sent={SENDS.some(
              (send) => send.row === index && local >= send.at && local < send.at + SEND_HELD,
            )}
          />
        ))}
      </div>
      <ConnectionLog lines={EPSON_LOG.slice(0, 1 + landed)} />
    </DriverConnection>
  );
};

/**
 * The return, and the reason it exists.
 *
 * The loop wraps here, so the last frame has to be `library`'s frame 0: the list at rest,
 * scrolled to the top, nothing selected. The scroll lands by frame 70 of 120 so nothing
 * is still easing when `loop:seam` compares the two ends, and the 50 frames after it are
 * the still picture the seam is measured on.
 *
 * **It has its own copy block**, unlike the 34-second cut, where it had none and the
 * panel went on saying THE TERMINAL over a picture of the catalog. A block that does not
 * describe what is on screen is worse than a short beat.
 */
const CloseBeat = ({frame}: {frame: number}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    listScroll={scroll(frame - BEATS.close.from, 70, 134, 0)}
  />
);

const SurfaceTrack = () => {
  const frame = useCurrentFrame();
  const beat = (() => {
    if (frame < BEATS.types.from) return <LibraryBeat frame={frame} />;
    if (frame < BEATS.manual.from) return <TypesBeat frame={frame} />;
    if (frame < BEATS.connection.from) return <ManualBeat frame={frame} />;
    if (frame < BEATS.api.from) return <ConnectionBeat frame={frame} />;
    if (frame < BEATS.connect.from) return <ApiBeat frame={frame} />;
    if (frame < BEATS.terminal.from) return <ConnectBeat frame={frame} />;
    if (frame < BEATS.close.from) return <TerminalBeat frame={frame} />;
    return <CloseBeat frame={frame} />;
  })();

  const boundaries = BEAT_NAMES.slice(1).map((name) => BEATS[name].from);
  const nearest = boundaries.filter((boundary) => frame >= boundary).pop();

  return <div style={{opacity: nearest === undefined ? 1 : fade(frame, nearest)}}>{beat}</div>;
};

export const HubCell = () => (
  <AbsoluteFill style={{background: SETUP_BACKGROUND}}>
    <Camera contentSize={TABLET_VIEWPORT} shots={SHOTS}>
      <SurfaceTrack />
    </Camera>
  </AbsoluteFill>
);
