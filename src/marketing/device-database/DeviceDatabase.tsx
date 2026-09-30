// CTRLbot — the device database, in two minutes. 1920x1080, copy left, tablet right.
//
// Built from the speaker's own recording (ingest/device-database/transcript.md), which is
// why the order is his: the library, what a driver contains, connecting one, and only
// then the End Point that gets a serial device onto the network. He states the transport
// claim at 0:33 and demonstrates it at 3:39, and everything between is the driver.
//
// **This cut moves the camera, where `ai-walkthrough` does not** — that was a request for
// that video, not a house rule, and this surface needs it. A 1280dp tablet in a 1088px
// panel renders at 0.85x, and the things this cut is about are 13sp: a port number, a
// command payload, a line ending. The detail beats frame 660dp across, which puts them at
// 1.65x — comparable to the scale `BrowserFrame` gives ctrlbot.ai's 16px body copy, and
// the reason that cut is legible.
//
// The path is one shot per beat, reached 22 frames in and then held until the next beat
// starts. So the camera is still for the whole of every beat and moves only across the
// boundary, under the same 14-frame dissolve that swaps the interface — which is one
// transition rather than two.
//
// The surface is a live rebuild (`app-ui/DriverCatalog` + `app-ui/DriverDatabase`), not
// the recording, for the reason `video-lint` enforces elsewhere: a capture cannot scroll
// a list, open a dropdown, fill a connection log, or have a saved End Point appear in the
// next device's transport row — which is the last third of this cut.

import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import {frameWidth, type Shot} from '../../camera/Camera';
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
  EndPointTransportRow,
  IpTransportRow,
  ModelRow,
  Rs232Config,
  SendRow,
  VariableBlock,
} from '../../app-ui/DriverDatabase';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {background, color, font, type} from '../../design/theme';
import {Stage, StageCopy} from '../Stage';
import {
  BEATS,
  CATEGORY_OPTIONS,
  CHRISTIE_CONNECTION,
  COPY,
  DATABASE_FRAMES,
  EPSON_COMMANDS,
  EPSON_CONNECTION,
  EPSON_DESCRIPTION,
  EPSON_INDEX,
  EPSON_LOG,
  EPSON_PORT,
  EPSON_SETUP,
  GC_CONTROL_MODES,
  GLOBAL_CACHE_COMMANDS,
  GLOBAL_CACHE_CONNECTION,
  GLOBAL_CACHE_LOG,
  GLOBAL_CACHE_PORT,
  HOST,
  IP_DRIVERS,
  IR_DRIVERS,
  LINE_ENDING_OPTIONS,
  SAVED_END_POINT,
  SORT_OPTIONS,
  type BeatName,
} from './deviceDatabaseData';

/**
 * Panel height in frame pixels. Everything else follows: the panel is aspect-matched to
 * the 1280x800 surface, so 680 makes it 1088 wide and leaves 600px of copy.
 *
 * Wider than the AI walkthrough's panel, and the 64px comes out of the copy column,
 * because this surface has one shot the other did not: Configure Connection's transport
 * row is genuinely 1160dp from the protocol dropdown to the connect button, and every
 * part of it is what that beat is about. Framed whole it is the widest thing in the cut,
 * so it sets the panel — at 1088 it renders at 0.94x, near enough 1:1 with the app on a
 * real tablet. The detail beats frame a third of that and are unaffected.
 */
const PANEL_HEIGHT = 680;
const PANEL_WIDTH = (TABLET_VIEWPORT.width / TABLET_VIEWPORT.height) * PANEL_HEIGHT;
const PANEL = {width: PANEL_WIDTH, height: PANEL_HEIGHT};

export const deviceDatabaseDuration = DATABASE_FRAMES;

/**
 * Where the camera sits for each beat, as "this much of the interface across".
 *
 * Width is the honest control here for the same reason it is on portrait: the panel is
 * aspect-matched to the surface, so asking for a control's bounding box just gets
 * reconciled back to a width. Read these as magnifications — 1088 ÷ width. The three
 * detail beats are 1.65x; the connection screen sits at 0.94x because its transport row
 * is genuinely 1160dp wide and cropping it would cut off the button the beat is about.
 */
const FRAMING: Record<BeatName, {x: number; y: number; width: number}> = {
  // The whole surface and then some: 1372 across a 1280 plane, so the shot carries a
  // 46dp margin the surface itself cannot provide — the nav rail's background fills to
  // the screen edge, correctly, and a whole-screen shot has nowhere to breathe. The
  // band is `panelBackground`, black, which is what the rail already is. The cut opens
  // on the entire screen and works inward from there, so every tighter shot is read as
  // part of something already seen rather than as an unplaceable crop; `close` returns.
  library: {x: 640, y: 400, width: 1372},
  // Both start at 200 — the rail/list boundary — for the same reason `driver` does. Off
  // the rail there is no margin to be had on that side: its background fills to the
  // screen edge, which is right on a tablet in the hand and reads as jammed in a panel.
  // Starting at the boundary hands the shot the list column's own 12dp instead.
  types: {x: 600, y: 250, width: 800},
  transports: {x: 590, y: 240, width: 780},
  // Wider than the three beats after it, because its claim is "the driver opens *beside
  // the list*" and half a blue card with no name on it proves nothing. 240 to 1280 puts
  // a whole selected card and the whole pane in shot; the detail beats then drop the
  // list entirely and take the magnification.
  // Left edge on 200 — the boundary between the nav rail and the list column — rather
  // than part-way through a card. The list column's own 12dp padding then becomes the
  // shot's left margin, and the pane's 30dp its right one.
  driver: {x: 740, y: 330, width: 1080},
  // 630 to 1280 — the list column's right edge to the surface's. The pane's own 30dp
  // margins sit inside that, so the shot has a margin on both sides instead of landing
  // on the text.
  docs: {x: 955, y: 270, width: 650},
  control: {x: 955, y: 280, width: 650},
  commands: {x: 955, y: 245, width: 650},
  // 88 to 1280 — the whole content area, not the content column. Framing the column
  // exactly put the camera's edge on the protocol dropdown and the connect button; this
  // includes the screen's 44dp padding on each side, so those buttons sit inside a
  // margin rather than against a cut. y is set so it clamps to 0..745 without the
  // camera's own clamp having to do it.
  connect: {x: 684, y: 372, width: 1192},
  test: {x: 684, y: 372, width: 1192},
  endpoint: {x: 684, y: 372, width: 1192},
  rs232: {x: 684, y: 372, width: 1192},
  close: {x: 640, y: 400, width: 1372},
};

const BEAT_NAMES = Object.keys(BEATS) as BeatName[];

/** Frames the camera takes to arrive at a beat's shot. The dissolve is 14, and inside it. */
const CAMERA_SETTLE = 22;

/**
 * Two entries per beat: arrive, then hold until the next one starts.
 *
 * Written this way rather than one shot per beat because one shot per beat makes the
 * camera drift continuously for two minutes — every frame between two entries is an
 * interpolation. AUTHORING.md wants a hold before and after every move, and this is what
 * that looks like when the moves are on the cuts.
 */
const SHOTS: Shot[] = BEAT_NAMES.flatMap((name) => {
  const beat = BEATS[name];
  const shot = FRAMING[name];
  const region = frameWidth({x: shot.x, y: shot.y}, shot.width);
  return [
    {at: beat.from === 0 ? 0 : beat.from + CAMERA_SETTLE, region},
    {at: beat.from + beat.duration, region},
  ];
});

/**
 * A block arriving: fades up and settles.
 *
 * One easing, one duration, everywhere in the surface — so seven command cards landing in
 * sequence read as one mechanism rather than seven separately-tuned animations. Same
 * curve as `StageCopy`, so the two halves of the frame move alike, and the same 34/42
 * frames `ai-walkthrough` settled on: deliberately slower than a UI would use, so the
 * tails overlap and the pane is doing something almost continuously.
 */
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

/**
 * A scroll position over a beat, in the surface's own dp.
 *
 * Linear on purpose, where everything else here is eased. An eased scroll is stationary
 * at both ends, which is exactly the shape that reads as inert; a list being dragged, or
 * a pane following content as it arrives, moves at one rate and then stops.
 */
const scroll = (local: number, window: number, from: number, to: number) =>
  interpolate(local, [0, window], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * The house marketing background: CTRLbot blue bloomed behind the panel, drifting.
 *
 * Same treatment and the same path as both EUI promos and the AI walkthrough —
 * `background.promo` with the bloom centre easing from 72%/26% to 60%/40% across the cut.
 *
 * The drift is not decoration. A 50%-alpha radial gradient over 1920px crosses far fewer
 * than 256 steps, so a static one bands into visible rings; moving the centre a few
 * percent puts every pixel on a different stop each frame and the rings dissolve.
 */
const databaseBg = (t: number) =>
  background.promo(
    interpolate(t, [0, 1], [72, 60], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(t, [0, 1], [26, 40], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

/** Cross-fade at a beat boundary, where the surface swaps out from under the camera. */
const fade = (frame: number, at: number, length = 14) =>
  interpolate(frame, [at, at + length], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** How much of a string has been typed by `local`, at a steady rate. */
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

// ── the copy column ──────────────────────────────────────────────────────────────────

/**
 * One `<Sequence>` per beat, each holding one `<StageCopy>`.
 *
 * The Sequence is not just grouping: `video-lint` measures reading time by walking up
 * from a copy block to the nearest enclosing Sequence and reading its duration, so a
 * block written outside one is a block whose pace nothing checks.
 */
const CopyTrack = () => (
  <>
    {BEAT_NAMES.map((name) => {
      const beat = BEATS[name];
      const copy = COPY[name];
      return (
        <Sequence
          key={name}
          from={beat.from}
          durationInFrames={beat.duration}
          layout="none"
          name={`Copy — ${name}`}
        >
          <StageCopy
            eyebrow={copy.eyebrow}
            title={copy.title}
            body={copy.body}
            // The opening beat starts its entrance before the cut does, so it is already
            // settled on frame 0. `video-frames` compares frame 0 against where the first
            // beat comes to rest and fails a cut that animates through its own poster
            // frame — and a social timeline shows frame 0 as a still for far longer than
            // the 40 frames this gives up.
            at={name === 'library' ? -40 : 4}
            until={beat.duration}
          />
        </Sequence>
      );
    })}
  </>
);

// ── the surface ──────────────────────────────────────────────────────────────────────

/** A pane block that arrives at `at`, relative to the beat. */
const Arrive = ({
  frame,
  at,
  children,
}: {
  frame: number;
  at: number;
  children: ReactNode;
}) => <div style={rise(frame, at)}>{children}</div>;

/** The library, scrolling under a header that does not move. */
const LibraryBeat = ({frame}: {frame: number}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    listScroll={scroll(frame - BEATS.library.from, 280, 0, 156)}
  />
);

/**
 * The sort control's list, open and then dismissed.
 *
 * It closes rather than holding for the whole beat because a list that drops and stays
 * down is one event in nine seconds, and because the beat's other half — the card
 * colours doing the same job the menu just described — is only visible once it is out of
 * the way.
 */
const TypesBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.types.from;
  return (
    <DriverCatalog
      device="tablet"
      drivers={IP_DRIVERS}
      background={SETUP_BACKGROUND}
      emphasizeTypes
      listScroll={local < 170 ? 156 : scroll(local - 170, 100, 156, 246)}
      openMenu={local >= 30 && local < 170 ? {control: 'sort', items: SORT_OPTIONS} : undefined}
    />
  );
};

/** The category control — the same gesture, on the filter that decides the transport. */
const TransportsBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.transports.from;
  return (
    <DriverCatalog
      device="tablet"
      drivers={IP_DRIVERS}
      background={SETUP_BACKGROUND}
      emphasizeTypes
      listScroll={local < 180 ? 246 : scroll(local - 180, 60, 246, 300)}
      openMenu={
        local >= 34 && local < 180 ? {control: 'category', items: CATEGORY_OPTIONS} : undefined
      }
    />
  );
};

/**
 * The four beats that live in the detail pane, sharing one frame.
 *
 * The pane is a long document and each beat is one part of it, so each renders only its
 * own blocks starting at the top rather than scrolling a full document to an offset
 * somebody typed. The alternative was tried and is exactly as fragile as it sounds: add
 * a paragraph anywhere above and four hand-measured scroll positions are silently wrong,
 * with the failure showing up as an empty pane in a render two minutes later.
 *
 * `scroll` is therefore small everywhere below — it is motion under arriving content,
 * not navigation.
 */
const DetailBeat = ({scroll: paneScroll, children}: {scroll: number; children: ReactNode}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    selectedIndex={EPSON_INDEX}
    // Nine rows up, which puts EPSON fourth of the eight on screen — near enough where
    // the recording has it, and inside the `driver` beat's frame. A selected card that
    // lands below the shot is a beat whose evidence is off camera, which is how the
    // first cut of this went out.
    listScroll={702}
    detail={
      <DriverDetail title="EPSON Projectors" scroll={paneScroll}>
        {children}
      </DriverDetail>
    }
  />
);

/** The driver opening: the model and its code sets, then what the device is. */
const DriverBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.driver.from;
  return (
    <DetailBeat scroll={scroll(local, 300, -8, 22)}>
      <Arrive frame={local} at={6}>
        <ModelRow model="PowerLite" />
      </Arrive>
      <Arrive frame={local} at={84}>
        <DeviceInfo>{EPSON_DESCRIPTION}</DeviceInfo>
      </Arrive>
      <Arrive frame={local} at={196}>
        <Accordion label="Specs" />
      </Arrive>
    </DetailBeat>
  );
};

/** Setup, open, with its four paragraphs arriving under it. */
const DocsBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.docs.from;
  return (
    <DetailBeat scroll={scroll(local, 250, -8, 26)}>
      <Accordion label="Specs" />
      <Accordion label="Setup" open>
        {EPSON_SETUP.map((paragraph, index) => (
          <div key={paragraph} style={rise(local, 10 + index * 44, 8)}>
            {paragraph}
          </div>
        ))}
      </Accordion>
      <div style={rise(local, 150, 8)}>
        <Accordion label="Support" />
      </div>
    </DetailBeat>
  );
};

/** Control Info, filling in one setting at a time. */
const ControlBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.control.from;
  return (
    <DetailBeat scroll={scroll(local, 280, -8, 30)}>
      <ControlInfo
        controlType="IP"
        ipType="TCP"
        port={EPSON_PORT}
        // Six settings over about six seconds, so each one is read rather than
        // arriving as a block the eye takes in as texture.
        show={Math.min(6, Math.max(0, Math.floor((local - 8) / 30) + 1))}
      />
      <div style={rise(local, 138, 10)}>
        <VariableBlock
          heading="Volume Set"
          fields={[
            {label: 'Variable', value: '%v'},
            {label: 'Start', value: '0'},
            {label: 'End', value: '100'},
          ]}
        />
      </div>
      <div style={rise(local, 172, 10)}>
        <VariableBlock
          heading="Switcher Config"
          fields={[
            {label: 'Inputs', value: '2'},
            {label: 'Outputs', value: '1'},
            {label: 'Input Variable', value: '%n'},
            {label: 'Output Variable', value: '%o'},
          ]}
        />
      </div>
    </DetailBeat>
  );
};

/**
 * The command list, arriving, and then the line ending getting its own menu.
 *
 * Five of the seven commands, not all seven. Seven is 770dp of cards under a 64dp bar,
 * which does not fit the pane — and making it fit means scrolling the bar off, which is
 * the one control this beat is about. The set is on screen either way; what the viewer
 * has to see is that it is a list and that the line ending is a control beside it.
 */
const CommandsBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.commands.from;
  return (
    <DetailBeat scroll={scroll(local, 300, -6, 34)}>
      <CommandsBar
        encoding="ASCII"
        lineEnding="CR (\r)"
        menu={local >= 190 ? LINE_ENDING_OPTIONS : undefined}
      />
      {EPSON_COMMANDS.slice(0, 5).map((command, index) => (
        <div key={command.key} style={rise(local, 6 + index * 30, 10)}>
          <CommandCard command={command} />
        </div>
      ))}
    </DetailBeat>
  );
};

/**
 * Configure Connection, from empty to answering.
 *
 * The order is the recording's: the form opens already knowing the protocol, the port,
 * the encoding and the line ending; the address is typed; the button changes; the log
 * says the device is there. The ✕ becomes a green Save at the moment there is something
 * worth saving, which is the app's own behaviour and the only chrome that changes.
 *
 * **Everything happens in the first half of the beat, and three command rows are on
 * screen rather than two.** Both are composition, not pacing. This shot cannot zoom —
 * the transport row runs the full 1160dp from the protocol dropdown to the connect
 * button, and the connect button is the evidence — so the only way to make the frame
 * work harder is to fill it. Two rows left the bottom third of the panel empty under a
 * one-line log. Four filled it and pushed the log's green line off the bottom edge,
 * which costs the beat its payoff to gain composition. Three is the number that fits.
 * Landing the connection by frame 148 puts that payoff before the still at 62% rather
 * than after it.
 */
const ConnectBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.connect.from;
  const connected = local >= 140;
  return (
    <DriverConnection
      name={EPSON_CONNECTION}
      saved={local >= 100}
      // Small, and starting at zero: with the rows and the log in, the body is close to
      // filling its own area, and a larger scroll clips the summary's heading off the
      // top before it lifts the log clear of the bottom.
      scroll={scroll(local, 300, 0, 30)}
      transport={
        <IpTransportRow
          host={typed(local, HOST, 30, 64)}
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
      {/* The command rows the connected screen puts between the summary and the log.
          They are here to be true to that layout rather than to be used — the beat that
          presses one is the next. */}
      <div style={{marginTop: 16}}>
        {EPSON_COMMANDS.slice(0, 3).map((command, index) => (
          <div key={command.key} style={rise(local, 10 + index * 22, 8)}>
            <SendRow label={command.label} payload={command.payload} />
          </div>
        ))}
      </div>
      <div style={rise(local, 148, 10)}>
        <ConnectionLog lines={EPSON_LOG.slice(0, 1)} />
      </div>
    </DriverConnection>
  );
};

/**
 * Which row is pressed when, and therefore which line the log gains.
 *
 * The three are the ones the recording sends — POWER ON, VOLUME DOWN, MUTE TOGGLE — and
 * their order here has to match `EPSON_LOG`, because the log is what the viewer reads
 * the payload off. Held 12 frames apiece: long enough to read as a button going down,
 * short enough that two are never down at once.
 */
const SENDS = [
  {row: 0, at: 66},
  {row: 4, at: 148},
  {row: 5, at: 230},
] as const;
const SEND_HELD = 12;

/** The same screen, scrolled to the commands, with three of them sent on camera. */
const TestBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.test.from;
  const landed = SENDS.filter((send) => local >= send.at + 10).length;
  return (
    <DriverConnection
      name={EPSON_CONNECTION}
      saved
      scroll={scroll(local, 300, 0, 62)}
      transport={<IpTransportRow host={HOST} port={EPSON_PORT} action="DISCONNECT" />}
    >
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
 * The End Point.
 *
 * Same screen, same gesture, different device — which is the claim. The one thing to
 * read here is Control Mode, which says `Serial` before anything is connected: this box
 * is on the network so that something without a network port does not have to be.
 */
const EndPointBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.endpoint.from;
  const connected = local >= 150;
  return (
    <DriverConnection
      name={GLOBAL_CACHE_CONNECTION}
      saved={local >= 96}
      // Barely any: the body of this screen fits, and the one line that must stay on
      // camera — Control Mode reading Serial — is the first thing a scroll clips.
      scroll={scroll(local, 330, -6, 22)}
      transport={
        <IpTransportRow
          host={typed(local, HOST, 30, 60)}
          port={GLOBAL_CACHE_PORT}
          action={connected ? 'DISCONNECT' : 'CONNECT IP'}
        />
      }
    >
      <ConnectionSummary
        manufacturer="GLOBAL CACHE"
        model="GLOBAL CACHE End Points"
        category="End Points"
        variables={false}
        transport={[
          // Opened, because the four modes in that list *are* the claim: IP in;
          // infrared, serial, a relay closure or a sensor out. Nothing routed.
          {
            label: 'Control Mode:',
            value: 'Serial',
            menu: local >= 96 && local < 300 ? GC_CONTROL_MODES : undefined,
          },
          {label: 'IP Type:', value: 'TCP', field: false},
          {label: 'Port:', value: GLOBAL_CACHE_PORT, field: false},
        ]}
      />
      {/* Arriving from 100 rather than 176. A row that has not faded up yet still takes
          its height, so late arrivals do not read as "not there" — they read as a band
          of empty panel above the log, which is what the first cut of this beat had at
          the frame the contact sheet samples. */}
      <div style={{marginTop: 18}}>
        {GLOBAL_CACHE_COMMANDS.map((command, index) => (
          <div key={command.key} style={rise(local, 100 + index * 28, 10)}>
            <SendRow label={command.label} payload={command.payload} />
          </div>
        ))}
      </div>
      <div style={rise(local, 158, 10)}>
        <ConnectionLog lines={GLOBAL_CACHE_LOG} />
      </div>
    </DriverConnection>
  );
};

/**
 * The payoff: the next serial device's connection has no address field at all.
 *
 * The End Point row arrives populated rather than being typed, because nobody types it —
 * the app fills it from what was saved a beat ago, and that is the whole difference
 * between this screen and the one before it.
 */
const Rs232Beat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.rs232.from;
  return (
    <DriverConnection
      name={CHRISTIE_CONNECTION}
      saved={local >= 120}
      scroll={scroll(local, 300, -6, 18)}
      transport={<EndPointTransportRow endPoint={local >= 54 ? SAVED_END_POINT : ''} />}
    >
      <div style={rise(local, 96, 10)}>
        <Rs232Config />
      </div>
      {/* Volume Set and Switcher Config are on: the recording shows them under Category
          on this screen at 5:12, and without them the RS-232 beat leaves the bottom
          quarter of the panel empty. */}
      <ConnectionSummary
        manufacturer="CHRISTIE"
        model="CHRISTIE Displays"
        category="Displays"
        transport={[
          {label: 'Authentication:', value: 'No'},
          {label: 'Encoding:', value: 'ASCII'},
          {label: 'Line Ending:', value: 'CR'},
        ]}
      />
    </DriverConnection>
  );
};

/** Where it is left: the same three controls, over a different library. */
const CloseBeat = ({frame}: {frame: number}) => (
  <DriverCatalog
    device="tablet"
    drivers={IR_DRIVERS}
    background={SETUP_BACKGROUND}
    category="IR"
    listScroll={scroll(frame - BEATS.close.from, 200, 0, 72)}
  />
);

/**
 * The surface track. One beat visible at a time, cross-faded at the boundary.
 *
 * Written as a frame switch rather than nested `<Sequence>`s because six of the twelve
 * beats are the same screen in different states, and a Sequence per beat would unmount
 * and remount the whole surface between them — which on the four detail beats would
 * blink the driver list and the pane's title, the two things that must not move.
 */
const SurfaceTrack = () => {
  const frame = useCurrentFrame();

  const beat = (() => {
    if (frame < BEATS.types.from) return <LibraryBeat frame={frame} />;
    if (frame < BEATS.transports.from) return <TypesBeat frame={frame} />;
    if (frame < BEATS.driver.from) return <TransportsBeat frame={frame} />;
    if (frame < BEATS.docs.from) return <DriverBeat frame={frame} />;
    if (frame < BEATS.control.from) return <DocsBeat frame={frame} />;
    if (frame < BEATS.commands.from) return <ControlBeat frame={frame} />;
    if (frame < BEATS.connect.from) return <CommandsBeat frame={frame} />;
    if (frame < BEATS.test.from) return <ConnectBeat frame={frame} />;
    if (frame < BEATS.endpoint.from) return <TestBeat frame={frame} />;
    if (frame < BEATS.rs232.from) return <EndPointBeat frame={frame} />;
    if (frame < BEATS.close.from) return <Rs232Beat frame={frame} />;
    return <CloseBeat frame={frame} />;
  })();

  // The surface swaps at every beat boundary; a 14-frame dip stops that reading as a
  // glitch, and it is the same 14 frames the camera is moving in.
  //
  // Before the first boundary there is nothing to dip from, and dipping anyway would open
  // the cut on a black panel — the poster frame `video-frames` checks. So the opening
  // beat is the one that is simply up.
  const boundaries = BEAT_NAMES.slice(1).map((name) => BEATS[name].from);
  const nearest = boundaries.filter((boundary) => frame >= boundary).pop();

  return (
    <div style={{opacity: nearest === undefined ? 1 : fade(frame, nearest)}}>{beat}</div>
  );
};

export const DeviceDatabase = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Stage
        contentSize={TABLET_VIEWPORT}
        shots={SHOTS}
        panelHeight={PANEL_HEIGHT}
        // Square, because no bezel is drawn and the camera spends the cut inside the
        // surface. A rounded corner claims hardware; on a shot that is a crop of the
        // screen there is no hardware corner in view, so the radius rounds off interface
        // instead and reads as a mask over the picture.
        panelRadius={0}
        // Behind the surface, for the two whole-screen shots that frame wider than it.
        panelBackground={color.void}
        background={databaseBg(frame / (DATABASE_FRAMES - 1))}
        copy={<CopyTrack />}
      >
        <SurfaceTrack />
      </Stage>

      {/* The product, held under the copy column for the whole cut — the same place and
          weight the AI walkthrough gives its own name.

          `CTRLbot IoT`, not `ctrlbot.io`. This cut is about the app, and the address is
          the website: a different one of the three products, set in lowercase because it
          is a domain. Signing an app video with a URL names the wrong thing. */}
      <Interactive.Div
        name="Product name"
        style={{
          position: 'absolute',
          left: 96,
          bottom: 72,
          fontFamily: font.display,
          fontSize: type.caption,
          letterSpacing: '0.04em',
          color: color.textDim,
        }}
      >
        CTRLbot IoT
      </Interactive.Div>
    </AbsoluteFill>
  );
};
