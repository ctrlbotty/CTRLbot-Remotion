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

/** How much of `text` has been typed at `frame`, typing across [from, to]. */
const typed = (text: string, frame: number, from: number, to: number) =>
  text.slice(
    0,
    Math.round(
      interpolate(frame, [from, to], [0, text.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    ),
  );

/** The lines of a log that have arrived by `frame`, each at its own fraction of the scene. */
const arrived = (lines: string[], at: number[], frame: number, frames: number) =>
  lines.filter((_, index) => frame >= at[index] * frames);

/** Press, scan, and the table filling top to bottom as devices answer. */
export const TermScanScene = ({frames}: TermSceneProps) => {
  const frame = useCurrentFrame();
  const press = frames * 0.08;
  const start = frames * 0.14;
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
export const TermServerScene = ({frames}: TermSceneProps) => {
  const frame = useCurrentFrame();
  const listening = frame >= frames * 0.13;
  const sentBy = [0.13, 0.3, 0.72];
  return (
    <TermApp tab="tcp-server">
      <TermTcpServer
        port={TERM_SERVER.port}
        listening={listening}
        clients={frame >= frames * 0.3 ? 1 : 0}
        received={arrived(TERM_SERVER.received, [0.45, 0.86], frame, frames)}
        sent={arrived(TERM_SERVER.sent, sentBy, frame, frames)}
        input={frame < frames * 0.72 ? typed(TERM_SERVER.command, frame, frames * 0.55, frames * 0.68) : ''}
        pressing={frame >= frames * 0.08 && !listening}
      />
    </TermApp>
  );
};

/** Connect to the Samsung display, send power on, and it answers display on. */
export const TermRawTcpScene = ({frames}: TermSceneProps) => {
  const frame = useCurrentFrame();
  const connected = frame >= frames * 0.13;
  return (
    <TermApp tab="tcp-client">
      <TermTcpClient
        host={TERM_RAW_TCP.host}
        port={TERM_RAW_TCP.port}
        connected={connected}
        received={arrived(TERM_RAW_TCP.received, [0.68], frame, frames)}
        sent={arrived(TERM_RAW_TCP.sent, [0.13, 0.48], frame, frames)}
        input={frame < frames * 0.48 ? typed(TERM_RAW_TCP.command, frame, frames * 0.25, frames * 0.44) : ''}
        pressing={frame >= frames * 0.08 && !connected}
      />
    </TermApp>
  );
};

/** Open COM9, send hello world to the port wired to it, and goodbye comes back. */
export const TermSerialScene = ({frames}: TermSceneProps) => {
  const frame = useCurrentFrame();
  const open = frame >= frames * 0.13;
  return (
    <TermApp tab="serial">
      <TermSerial
        port={TERM_SERIAL.port}
        baud={TERM_SERIAL.baud}
        dataBits={TERM_SERIAL.dataBits}
        parity={TERM_SERIAL.parity}
        handshake={TERM_SERIAL.handshake}
        open={open}
        received={arrived(TERM_SERIAL.received, [0.68], frame, frames)}
        sent={arrived(TERM_SERIAL.sent, [0.13, 0.48], frame, frames)}
        input={frame < frames * 0.48 ? typed(TERM_SERIAL.command, frame, frames * 0.25, frames * 0.44) : ''}
        pressing={frame >= frames * 0.08 && !open}
      />
    </TermApp>
  );
};

/** Connect to the Luxul switch, type help, and its command list scrolls in. */
export const TermSshScene = ({frames}: TermSceneProps) => {
  const frame = useCurrentFrame();
  const connecting = frame >= frames * 0.13;
  const connected = frame >= frames * 0.24;
  const streamFrom = frames * 0.48;
  const streamTo = frames * 0.9;
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
        input={frame < streamFrom ? typed(TERM_SSH.command, frame, frames * 0.32, frames * 0.42) : ''}
        pressing={frame >= frames * 0.08 && !connecting}
      />
    </TermApp>
  );
};
