// Terminator's screens, in motion: one scene per thing Nathan demonstrates.
//
// Each scene takes the length it has been given and plays its demonstration across it,
// so the same scene works as a six-second short beat or a twenty-second walkthrough beat.
// Timings are fractions of that length, and the order of events is the recording's:
// press, connect, type, send, reply. Frame 0 is always the screen at rest, which is what a
// short's hook holds as its poster.
//
// Registered by name in src/shorts/surfaces.tsx, so a short or a brief asks for
// `terminator/scan` rather than importing anything.

import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {TermApp, TermScan, TermSerial, TermSsh, TermTcpClient, TermTcpServer} from './Terminator';
import {TERM_ADAPTER, TERM_DEVICES, TERM_RAW_TCP, TERM_SERIAL, TERM_SERVER, TERM_SSH} from './termData';

export type TermSceneProps = {frames: number};

// Optional event frames, in scene frames. Unset, an event keeps its fraction of `frames`,
// so a scene without them plays exactly as it always has. The typing that leads to an event
// moves with it.
export type TermScanSceneProps = TermSceneProps & {startFrame?: number};
export type TermServerSceneProps = TermSceneProps & {connectFrame?: number; messageFrame?: number; replyFrame?: number};
export type TermRawTcpSceneProps = TermSceneProps & {connectFrame?: number; sendFrame?: number; replyFrame?: number};
export type TermSerialSceneProps = TermSceneProps & {openFrame?: number; sendFrame?: number; replyFrame?: number};
export type TermSshSceneProps = TermSceneProps & {connectFrame?: number; typeFrame?: number; outputFrame?: number};

/** An event's frame: the override if given, else its default fraction of the scene. */
const eventAt = (override: number | undefined, fraction: number, frames: number) => override ?? frames * fraction;

/** A frame that follows an event: the default fraction, or the override moved by `delta` of the scene. */
const followAt = (override: number | undefined, fraction: number, delta: number, frames: number) =>
  override === undefined ? frames * fraction : override + delta * frames;

/** How much of `text` has been typed at `frame`, typing across [from, to]. */
const typed = (text: string, frame: number, from: number, to: number) =>
  text.slice(
    0,
    Math.round(
      interpolate(frame, [from, to], [0, text.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    ),
  );

/** The lines of a log that have arrived by `frame`, each at its own fraction of the scene. */
const arrived = (lines: string[], at: number[], frame: number) => lines.filter((_, index) => frame >= at[index]);

/** Press, scan, and the table filling top to bottom as devices answer. */
export const TermScanScene = ({frames, startFrame}: TermScanSceneProps) => {
  const frame = useCurrentFrame();
  const press = followAt(startFrame, 0.08, -0.06, frames);
  const start = eventAt(startFrame, 0.14, frames);
  const done = frames * 0.86;
  const status = frame < start ? 'ready' : frame < done ? 'running' : 'complete';
  const checked = Math.round(
    interpolate(frame, [start, done], [0, TERM_ADAPTER.hosts], {
      easing: Easing.bezier(0.3, 0, 0.7, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const devices = TERM_DEVICES.filter(
    (_, index) => frame >= start + ((index + 1) / (TERM_DEVICES.length + 1)) * (done - start),
  );
  return (
    <TermApp tab="scan">
      <TermScan adapter={TERM_ADAPTER} state={{status, checked, devices, pressing: frame >= press && frame < start}} />
    </TermApp>
  );
};

/** Listen, the IoT app connects, a command comes in, one goes back, another comes in. */
export const TermServerScene = ({frames, connectFrame, messageFrame, replyFrame}: TermServerSceneProps) => {
  const frame = useCurrentFrame();
  const connect = eventAt(connectFrame, 0.3, frames);
  const message = eventAt(messageFrame, 0.45, frames);
  const reply = eventAt(replyFrame, 0.72, frames);
  const typeFrom = followAt(replyFrame, 0.55, -0.17, frames);
  const typeTo = followAt(replyFrame, 0.68, -0.04, frames);
  const secondMessage = followAt(replyFrame, 0.86, 0.14, frames);
  const listening = frame >= frames * 0.13;
  const sentBy = [frames * 0.13, connect, reply];
  return (
    <TermApp tab="tcp-server">
      <TermTcpServer
        port={TERM_SERVER.port}
        listening={listening}
        clients={frame >= connect ? 1 : 0}
        received={arrived(TERM_SERVER.received, [message, secondMessage], frame)}
        sent={arrived(TERM_SERVER.sent, sentBy, frame)}
        input={frame < reply ? typed(TERM_SERVER.command, frame, typeFrom, typeTo) : ''}
        pressing={frame >= frames * 0.08 && !listening}
      />
    </TermApp>
  );
};

/** Connect to the Samsung display, send power on, and it answers display on. */
export const TermRawTcpScene = ({frames, connectFrame, sendFrame, replyFrame}: TermRawTcpSceneProps) => {
  const frame = useCurrentFrame();
  const connect = eventAt(connectFrame, 0.13, frames);
  const send = eventAt(sendFrame, 0.48, frames);
  const reply = eventAt(replyFrame, 0.68, frames);
  const typeFrom = followAt(sendFrame, 0.25, -0.23, frames);
  const typeTo = followAt(sendFrame, 0.44, -0.04, frames);
  const connected = frame >= connect;
  return (
    <TermApp tab="tcp-client">
      <TermTcpClient
        host={TERM_RAW_TCP.host}
        port={TERM_RAW_TCP.port}
        connected={connected}
        received={arrived(TERM_RAW_TCP.received, [reply], frame)}
        sent={arrived(TERM_RAW_TCP.sent, [connect, send], frame)}
        input={frame < send ? typed(TERM_RAW_TCP.command, frame, typeFrom, typeTo) : ''}
        pressing={frame >= frames * 0.08 && !connected}
      />
    </TermApp>
  );
};

/** Open COM9, send hello world to the port wired to it, and goodbye comes back. */
export const TermSerialScene = ({frames, openFrame, sendFrame, replyFrame}: TermSerialSceneProps) => {
  const frame = useCurrentFrame();
  const openAt = eventAt(openFrame, 0.13, frames);
  const send = eventAt(sendFrame, 0.48, frames);
  const reply = eventAt(replyFrame, 0.68, frames);
  const typeFrom = followAt(sendFrame, 0.25, -0.23, frames);
  const typeTo = followAt(sendFrame, 0.44, -0.04, frames);
  const open = frame >= openAt;
  return (
    <TermApp tab="serial">
      <TermSerial
        port={TERM_SERIAL.port}
        baud={TERM_SERIAL.baud}
        dataBits={TERM_SERIAL.dataBits}
        parity={TERM_SERIAL.parity}
        handshake={TERM_SERIAL.handshake}
        open={open}
        received={arrived(TERM_SERIAL.received, [reply], frame)}
        sent={arrived(TERM_SERIAL.sent, [openAt, send], frame)}
        input={frame < send ? typed(TERM_SERIAL.command, frame, typeFrom, typeTo) : ''}
        pressing={frame >= frames * 0.08 && !open}
      />
    </TermApp>
  );
};

/** Connect to the Luxul switch, type help, and its command list scrolls in. */
export const TermSshScene = ({frames, connectFrame, typeFrame, outputFrame}: TermSshSceneProps) => {
  const frame = useCurrentFrame();
  const connect = eventAt(connectFrame, 0.24, frames);
  const connectingAt = followAt(connectFrame, 0.13, -0.11, frames);
  const typeFrom = eventAt(typeFrame, 0.32, frames);
  const typeTo = followAt(typeFrame, 0.42, 0.1, frames);
  const connecting = frame >= connectingAt;
  const connected = frame >= connect;
  const streamFrom = eventAt(outputFrame, 0.48, frames);
  const streamTo = followAt(outputFrame, 0.9, 0.42, frames);
  const shown = TERM_SSH.output.filter(
    (_, index) => frame >= streamFrom + (index / TERM_SSH.output.length) * (streamTo - streamFrom),
  );
  return (
    <TermApp tab="ssh">
      <TermSsh
        host={TERM_SSH.host}
        username={TERM_SSH.username}
        connected={connected}
        output={[...(connecting ? [TERM_SSH.connecting] : []), ...shown]}
        input={frame < streamFrom ? typed(TERM_SSH.command, frame, typeFrom, typeTo) : ''}
        pressing={frame >= frames * 0.08 && !connecting}
      />
    </TermApp>
  );
};
