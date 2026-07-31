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
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, type Device} from './shared';

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
const MENU_OPEN_FRAME = 612;
const ACTIVITIES_TAP_FRAME = 736;
const MENU_SHOT_WIDTH = 0.94;

export const ConnectAndTest = ({device}: {device: Device}) => {
  const frame = useCurrentFrame();
  const viewport = CONNECTION_VIEWPORT[device];
  // Derived from the panel's own layout constants, not measured off a render.
  const r = connectionRegions(device);
  const hostField = r.hostField;
  const connectAction = r.connectAction;
  const powerOnRow = r.commandRow(0);
  const sendButton = r.sendButton(0);
  const terminalBox = r.terminal;
  const activitiesRow = navRegions.row(3, true);
  const menuExpanded = frame >= MENU_OPEN_FRAME;

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
          {at: 0, region: {x: 0, y: 0, width: viewport.width, height: viewport.height}},
          {at: 40, region: {x: 0, y: 0, width: viewport.width, height: viewport.height}},
          // The address row while it fills.
          {at: 112, region: frameWidth({x: viewport.width / 2, y: centerOf(hostField).y}, viewport.width * closeShotWidth(device))},
          {
            at: 192,
            region: frameWidth(
              {x: viewport.width / 2, y: centerOf(hostField).y},
              viewport.width * closeShotWidth(device),
            ),
          },
          // Down to the command being sent.
          {
            at: 300,
            region: frameWidth({x: viewport.width / 2, y: centerOf(powerOnRow).y}, viewport.width * closeShotWidth(device)),
          },
          {
            at: 412,
            region: frameWidth({x: viewport.width / 2, y: centerOf(powerOnRow).y}, viewport.width * closeShotWidth(device)),
          },
          // Then the terminal, to show the device answered.
          {
            at: 500,
            region: frameWidth({x: viewport.width / 2, y: centerOf(terminalBox).y}, viewport.width * closeShotWidth(device)),
          },
          {
            at: 564,
            region: frameWidth({x: viewport.width / 2, y: centerOf(terminalBox).y}, viewport.width * closeShotWidth(device)),
          },
          // Pull out before the setup menu opens, then hold on all six rows.
          {at: 600, region: r.full},
          {
            at: 656,
            region:
              device === 'phone'
                ? frameWidth(
                    {x: viewport.width / 2, y: centerOf(navRegions.roomExpanded).y},
                    viewport.width * MENU_SHOT_WIDTH,
                  )
                : r.full,
          },
          {
            at: 760,
            region:
              device === 'phone'
                ? frameWidth(
                    {x: viewport.width / 2, y: centerOf(navRegions.roomExpanded).y},
                    viewport.width * MENU_SHOT_WIDTH,
                  )
                : r.full,
          },
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
        />

        {device === 'phone' ? (
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

        <Sequence from={488} durationInFrames={112} layout="none" name="Isolate terminal">
          <Spotlight region={terminalBox} appearAt={0} radius={0} />
        </Sequence>

        {device === 'phone' ? (
          <>
            <Sequence from={576} durationInFrames={48} layout="none" name="Open setup menu">
              <TapIndicator
                x={centerOf(navRegions.collapsedHandle).x}
                y={centerOf(navRegions.collapsedHandle).y}
                at={12}
                name="Menu tap"
              />
            </Sequence>

            <Sequence from={624} durationInFrames={156} layout="none" name="Choose Activities">
              <Spotlight region={activitiesRow} appearAt={0} radius={0} />
              <FocusRing
                region={activitiesRow}
                appearAt={12}
                radius={0}
                name="Activities row"
              />
              <TapIndicator
                x={centerOf(activitiesRow).x}
                y={centerOf(activitiesRow).y}
                at={ACTIVITIES_TAP_FRAME - 624}
                name="Activities tap"
              />
            </Sequence>
          </>
        ) : null}
      </Camera>

      <Sequence from={8} durationInFrames={100} layout="none" name="Copy: address">
        <Callout
          eyebrow="Connect"
          title="Enter the address and port"
          body="Pick the protocol, then give the device its address on your network."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={200} durationInFrames={140} layout="none" name="Copy: connect">
        <Callout
          eyebrow="Verify"
          title="Connect before you trust it"
          body="A successful connection saves automatically. The action flips to Disconnect."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={352} durationInFrames={248} layout="none" name="Copy: send">
        <Callout
          eyebrow="Test"
          title="Send a safe command"
          body="Watch the terminal for what went out and what the device sent back."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      {device === 'phone' ? (
        <Sequence from={620} durationInFrames={160} layout="none" name="Copy: open Activities">
          <Callout
            eyebrow="Next"
            title="Open Activities"
            body="With your devices connected, you’re ready to set up the room."
            at={0}
            side="top"
          />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
