// Scene 4 — enter an address, connect, send a safe command.
//
// The scene that most needs to be live. Three pieces of state move: the host field
// fills, the action flips to DISCONNECT, and the terminal gains lines in the app's own
// status/sent/received colours. A capture can only ever show the end of that.

import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Camera, centerOf, frameWidth} from '../camera/Camera';
import {Callout, FocusRing, Spotlight, TapIndicator} from '../camera/Annotations';
import {
  CONNECTION_VIEWPORT,
  ConnectionPanel,
  connectionRegions,
  type TerminalLine,
} from '../app-ui/ConnectionPanel';
import {PhoneNavMenu, navRegions} from '../app-ui/PhoneNavMenu';
import {tabletNavRegions} from '../app-ui/TabletNavRail';
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, wideShotWidth, type Device} from './shared';

const COMMANDS = [
  {label: 'Power On', reference: 'PWR ON\\r'},
  {label: 'Power Off', reference: 'PWR OFF\\r'},
  {label: 'Power Toggle', reference: 'KEY 01\\r'},
  {label: 'Volume Up', reference: 'KEY 56\\r'},
  {label: 'Volume Down', reference: 'KEY 57\\r'},
  {label: 'Mute', reference: 'MUTE ON\\r'},
  {label: 'Source HDMI 1', reference: 'SOURCE 30\\r'},
  {label: 'Source HDMI 2', reference: 'SOURCE A0\\r'},
];

const HOST = '192.168.0.95';
const TYPE_START = 52;
const CONNECT_FRAME = 216;
const SEND_FRAME = 392;
const REPLY_FRAME = 432;
const MENU_OPEN_FRAME = 572;
const ACTIVITIES_TAP_FRAME = 696;
const MENU_SHOT_WIDTH = 0.94;

export const ConnectAndTest = ({device}: {device: Device}) => {
  const frame = useCurrentFrame();
  const isPhone = device === 'phone';
  const viewport = CONNECTION_VIEWPORT[device];
  // Derived from the panel's own layout constants, not measured off a render.
  const r = connectionRegions(device);
  const hostField = r.hostField;
  const connectAction = r.connectAction;
  const powerOnRow = r.commandRow(0);
  const sendButton = r.sendButton(0);
  const terminalBox = r.terminal;
  const menuExpanded = frame >= MENU_OPEN_FRAME;

  // The Activities reveal. On phone the sheet has to be opened to see it; on tablet the
  // row simply appears in the rail that has been on screen the whole time, which is the
  // more legible version of the same beat — the viewer watches the menu grow.
  const activitiesRow = isPhone
    ? navRegions.row(3, true)
    : tabletNavRegions.row('activities', true);
  const roomMenusVisible = isPhone ? menuExpanded : frame >= MENU_OPEN_FRAME;

  /**
   * Landscape shots frame on the panel's centre, not the surface's — the setup rail
   * takes the first 200dp and framing on 640 pulls the camera a rail's width off target.
   * They are also wider than the portrait equivalents: these controls run most of the
   * panel's width, and a close shot pushes their right-hand ends under the copy card.
   */
  const shotWidth = viewport.width * (isPhone ? closeShotWidth(device) : wideShotWidth);
  const shotX = isPhone ? viewport.width / 2 : r.centreX;
  const phoneMenuShot = frameWidth(
    {x: viewport.width / 2, y: centerOf(navRegions.roomExpanded).y},
    viewport.width * MENU_SHOT_WIDTH,
  );

  const typedHost = HOST.slice(
    0,
    Math.max(0, Math.min(HOST.length, Math.floor((frame - TYPE_START) / 4))),
  );
  const connected = frame >= CONNECT_FRAME;

  // The terminal builds up the way the app writes it: status on connect, then the
  // sent bytes, then the device's reply.
  const terminal: TerminalLine[] = [];
  if (connected) terminal.push({text: `Connected to ${HOST}:3629`, kind: 'status'});
  if (frame >= SEND_FRAME) terminal.push({text: '> PWR ON', kind: 'sent'});
  if (frame >= REPLY_FRAME) terminal.push({text: '< :', kind: 'received'});

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      <Camera
        contentSize={viewport}
        shots={[
          {at: 0, region: r.full},
          {at: 40, region: r.full},
          // The address row while it fills.
          {at: 112, region: frameWidth({x: shotX, y: centerOf(hostField).y}, shotWidth)},
          {at: 192, region: frameWidth({x: shotX, y: centerOf(hostField).y}, shotWidth)},
          // Down to the command being sent.
          {at: 300, region: frameWidth({x: shotX, y: centerOf(powerOnRow).y}, shotWidth)},
          {at: 412, region: frameWidth({x: shotX, y: centerOf(powerOnRow).y}, shotWidth)},
          // Then the terminal, to show the device answered.
          {at: 500, region: frameWidth({x: shotX, y: centerOf(terminalBox).y}, shotWidth)},
          {at: 544, region: frameWidth({x: shotX, y: centerOf(terminalBox).y}, shotWidth)},
          // Pull out before the menu changes, then hold on it while Activities arrives.
          //
          // The tablet holds the full surface rather than pushing into the rail. The copy
          // promises Activities *and* EUI, and those two sit 640dp apart at opposite ends
          // of an 800dp rail — no shot tight enough to be called a push can hold both, so
          // the spotlight and ring carry the emphasis instead.
          {at: 560, region: r.full},
          {at: 616, region: isPhone ? phoneMenuShot : r.full},
          {at: 720, region: isPhone ? phoneMenuShot : r.full},
        ]}
      >
        <ConnectionPanel
          device={device}
          deviceName="EPSON PowerLite - New"
          host={typedHost}
          port="3629"
          connected={connected}
          commands={COMMANDS}
          terminal={terminal}
          highlightedCommand={frame >= SEND_FRAME && frame < 500 ? 0 : null}
          hostCaret={frame >= TYPE_START && frame < CONNECT_FRAME}
          showRoomMenus={roomMenusVisible}
        />

        {isPhone ? (
          <PhoneNavMenu
            expanded={menuExpanded}
            active={frame < ACTIVITIES_TAP_FRAME ? 'device' : 'activities'}
            showRoomMenus={menuExpanded}
          />
        ) : null}

        <Sequence from={88} durationInFrames={108} layout="none" name="Isolate address">
          <Spotlight region={hostField} appearAt={0} radius={5} />
        </Sequence>

        <Sequence from={196} durationInFrames={80} layout="none" name="Connect">
          <FocusRing region={connectAction} appearAt={0} radius={5} name="Connect ring" />
          <TapIndicator
            x={centerOf(connectAction).x}
            y={centerOf(connectAction).y}
            at={8}
            name="Connect tap"
          />
        </Sequence>

        <Sequence from={344} durationInFrames={112} layout="none" name="Send Power On">
          <Spotlight region={powerOnRow} appearAt={0} radius={0} />
          <TapIndicator x={centerOf(sendButton).x} y={centerOf(sendButton).y} at={40} name="Send tap" />
        </Sequence>

        <Sequence from={488} durationInFrames={72} layout="none" name="Isolate terminal">
          <Spotlight region={terminalBox} appearAt={0} radius={0} />
        </Sequence>

        {isPhone ? (
          <Sequence from={536} durationInFrames={48} layout="none" name="Open setup menu">
            <TapIndicator
              x={centerOf(navRegions.collapsedHandle).x}
              y={centerOf(navRegions.collapsedHandle).y}
              at={12}
              name="Menu tap"
            />
          </Sequence>
        ) : null}

        <Sequence from={584} durationInFrames={156} layout="none" name="Choose Activities">
          <Spotlight region={activitiesRow} appearAt={0} radius={0} />
          <FocusRing region={activitiesRow} appearAt={12} radius={0} name="Activities row" />
          <TapIndicator
            x={centerOf(activitiesRow).x}
            y={centerOf(activitiesRow).y}
            at={ACTIVITIES_TAP_FRAME - 584}
            name="Activities tap"
          />
        </Sequence>
      </Camera>

      <Sequence from={8} durationInFrames={100} layout="none" name="Copy: address">
        <Callout
          eyebrow="Connect"
          title="Enter the address and port"
          body="Pick the protocol, then enter the device’s address and control port."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={200} durationInFrames={140} layout="none" name="Copy: connect">
        <Callout
          eyebrow="Verify"
          title="Connect before you trust it"
          body="A successful connection saves the device automatically — the button flips to Disconnect."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={352} durationInFrames={208} layout="none" name="Copy: send">
        <Callout
          eyebrow="Test"
          title="Send a safe command"
          body="Watch the terminal for what went out and what the device sent back."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={580} durationInFrames={160} layout="none" name="Copy: open Activities">
        <Callout
          eyebrow="Next"
          title="Open Activities"
          body="Your first saved connection unlocks Activities and EUI — for good."
          at={0}
          side={isPhone ? 'top' : copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
