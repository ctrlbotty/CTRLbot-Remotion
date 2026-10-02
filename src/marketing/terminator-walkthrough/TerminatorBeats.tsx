import type {ReactNode} from 'react';
import {interpolate} from 'remotion';
import {
  TERM_ADAPTER, TERM_RAW_TCP, TERM_SERIAL, TERM_SERVER, TERM_SSH, TERM_TOOLS,
  termRegions,
} from '../../app-ui/term/termData';
import {round, sp, text} from '../../app-ui/term/termTheme';
import {TermScanScene, TermServerScene} from '../../app-ui/term/TermScenes';
import {TermApp, TermScan, TermSerial, TermSsh, TermTcpClient, TermTcpServer, type TermTab} from '../../app-ui/term/Terminator';
import {FocusRing, Spotlight} from '../../camera/Annotations';
import type {WalkthroughFormat} from '../WalkthroughShell';
import {ServerDiagram} from './ServerDiagram';
import {BEATS, CUE_FRAMES} from './terminatorWalkthroughData';

type BeatProps = {frame: number; frames: number; format: WalkthroughFormat};

// Each navigation selection displays its own real pane, with the source session fields.
const toolPane = (tool: TermTab): ReactNode => {
  switch (tool) {
    case 'scan': return <TermScan adapter={TERM_ADAPTER} state={{status: 'ready', checked: 0, devices: []}} />;
    case 'tcp-server': return <TermTcpServer port={TERM_SERVER.port} listening={false} clients={0} received={[]} sent={[]} />;
    case 'tcp-client': return <TermTcpClient host={TERM_RAW_TCP.host} port={TERM_RAW_TCP.port} connected={false} received={[]} sent={[]} />;
    case 'serial': return <TermSerial port={TERM_SERIAL.port} baud={TERM_SERIAL.baud} dataBits={TERM_SERIAL.dataBits} parity={TERM_SERIAL.parity} handshake={TERM_SERIAL.handshake} open={false} received={[]} sent={[]} />;
    case 'ssh': return <TermSsh host={TERM_SSH.host} username={TERM_SSH.username} connected={false} output={[]} />;
  }
};

export const ProofBeat = ({frame, frames}: BeatProps) => {
  const terminal = CUE_FRAMES.terminal - BEATS.proof.from;
  // The overview begins on "terminal" and completes all five selections before the scan.
  const stepFrames = (frames - terminal) / TERM_TOOLS.length;
  const step = Math.min(TERM_TOOLS.length - 1, Math.max(0, Math.floor((frame - terminal) / stepFrames)));
  const tool = TERM_TOOLS[step];
  return (
    <>
      <TermApp tab={tool} highlight={frame >= terminal ? tool : undefined}>{toolPane(tool)}</TermApp>
      <FocusRing key={tool} region={termRegions.navItem(tool)} appearAt={terminal + step * stepFrames} radius={round.lg} name={`Proof ${tool}`} />
    </>
  );
};

// Column widths are the COLUMNS layout in Terminator.tsx; rows use its Tailwind spacing.
const macColumn = {
  x: termRegions.results.x + 186 + 216 + 136 + 112,
  y: termRegions.results.y,
  width: 146,
  height: termRegions.results.height,
};
const firstWebLink = {
  x: macColumn.x + macColumn.width + sp(3) + 1,
  // Results header: p-4 + two lines/margin; progress; column heading; first cell p-3.
  y: termRegions.results.y + 1 + sp(4) * 2 + 17.5 + sp(1) + 14 + 1 + sp(1) + sp(3) * 2 + 14 + sp(3),
  width: sp(2) * 2 + 4 * text.xs.fontSize * 0.6 + text.xs.fontSize * 1.2,
  height: 14 + sp(1) * 2 + 2,
};

export const ScanBeat = ({frame, frames}: BeatProps) => {
  const host = CUE_FRAMES.host - BEATS.scan.from;
  const mac = CUE_FRAMES.mac - BEATS.scan.from;
  const links = CUE_FRAMES.links - BEATS.scan.from;
  return (
    <>
      <TermScanScene frames={frames} startFrame={host} />
      <Spotlight region={termRegions.results} appearAt={host} intensity={0.25} />
      {frame < links ? <FocusRing region={macColumn} appearAt={mac} name="Scan MAC column" />
        : <FocusRing region={firstWebLink} appearAt={links} radius={round.sm} name="Scan web link" />}
    </>
  );
};

const arrivingLine = {
  x: termRegions.serverLog.x + 1 + sp(3),
  y: termRegions.serverLog.y + 1 + sp(1.5) * 2 + 14 + 1 + sp(3),
  width: TERM_SERVER.received[0].length * text.sm.fontSize * 0.6,
  height: 17.5,
};

export const ServerBeat = ({frame, frames}: BeatProps) => {
  const ctrlbot = CUE_FRAMES.ctrlbot - BEATS.server.from;
  const connected = CUE_FRAMES.connected - BEATS.server.from;
  const commands = CUE_FRAMES.commands - BEATS.server.from;
  // Change surface as the shell starts its 20-frame move into the real client controls.
  if (frame < connected - 20) {
    return <ServerDiagram progress={interpolate(frame, [ctrlbot, connected - 21], [0.08, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />;
  }
  return (
    <>
      <TermServerScene frames={frames} connectFrame={connected} messageFrame={commands} replyFrame={commands + 90} />
      {frame < commands ? (
        <>
          <Spotlight region={termRegions.serverClients} appearAt={connected} intensity={0.25} />
          <FocusRing region={termRegions.serverClients} appearAt={connected} name="Connected server client" />
        </>
      ) : (
        <>
          <Spotlight region={termRegions.serverLog} appearAt={commands} intensity={0.25} />
          <FocusRing region={arrivingLine} appearAt={commands} name="Arriving server command" />
        </>
      )}
    </>
  );
};
