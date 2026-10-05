import type {ReactNode} from 'react';
import {interpolate} from 'remotion';
import {
  TERM_ADAPTER, TERM_NAV_WIDTH, TERM_RAW_TCP, TERM_SERIAL, TERM_SERVER, TERM_SSH, TERM_TOOLS,
  termRegions,
} from '../../app-ui/term/termData';
import {round, sp, text} from '../../app-ui/term/termTheme';
import {
  TermRawTcpScene, TermScanScene, TermSerialScene, TermServerScene, TermSshScene,
} from '../../app-ui/term/TermScenes';
import {TermApp, TermScan, TermSerial, TermSsh, TermTcpClient, TermTcpServer, type TermTab} from '../../app-ui/term/Terminator';
import {FocusRing, PointerClick, Spotlight} from '../../camera/Annotations';
import {padRegion} from '../../camera/Camera';
import type {WalkthroughFormat} from '../WalkthroughShell';
import {ServerDiagram} from './ServerDiagram';
import {BEATS, CUE_FRAMES} from './terminatorWalkthroughData';

type BeatProps = {frame: number; frames: number; format: WalkthroughFormat};

// Each navigation selection displays its own real pane, with the source session fields.
export const toolPane = (tool: TermTab): ReactNode => {
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
        : <FocusRing region={{...firstWebLink, y: firstWebLink.y + 7, height: firstWebLink.height + 7}} appearAt={links} radius={round.sm} name="Scan web link" />}
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
          <FocusRing region={padRegion(arrivingLine, 4)} appearAt={commands} radius={round.sm} name="Arriving server command" />
        </>
      )}
    </>
  );
};

// Pin icon region in InstanceTabs from markup constants, calibrated against the rendered still:
// x: nav width + tabs padding-left (sp(4)) + tab border (1) + tab padding-left (sp(3.5))
//    + live dot (sp(2)) + dot gap (sp(2)) + label width ('Server 1 (23)' length * font * 0.45)
//    + pin gap (sp(2)).
// y: vertically centred in tabs bar (~17 to 31).
// Padded by 6px to give a comfortable ring around the 14x14 icon.
const pinIconRaw = {
  x: TERM_NAV_WIDTH + sp(4) + 1 + sp(3.5) + sp(2) + sp(2) + 'Server 1 (23)'.length * text.xs.fontSize * 0.45 + sp(2),
  y: 17,
  width: 14,
  height: 14,
};
const pinIcon = padRegion(pinIconRaw, 6);

export const PinBeat = ({frame}: BeatProps) => {
  const pinFirst = CUE_FRAMES.pinFirst - BEATS.pin.from;
  const pinSecond = CUE_FRAMES.pinSecond - BEATS.pin.from;
  const pinned = frame >= pinSecond;
  return (
    <>
      <TermApp tab="tcp-server">
        <TermTcpServer
          port={TERM_SERVER.port}
          listening
          clients={1}
          received={TERM_SERVER.received}
          sent={TERM_SERVER.sent}
          pinned={pinned}
        />
      </TermApp>
      <FocusRing region={pinIcon} appearAt={pinFirst} radius={round.sm} name="Pin tab focus ring" />
      <PointerClick
        to={{x: pinIcon.x + pinIcon.width / 2, y: pinIcon.y + pinIcon.height / 2}}
        at={pinSecond}
        fadeOutAt={pinSecond + 16}
        name="Pin tab pointer"
      />
    </>
  );
};

export const RawTcpBeat = ({frame, frames}: BeatProps) => {
  const raw = CUE_FRAMES.raw - BEATS['raw-tcp'].from;
  const telnet = CUE_FRAMES.telnet - BEATS['raw-tcp'].from;
  return (
    <>
      <TermRawTcpScene
        frames={frames}
        connectFrame={70}
        sendFrame={390}
        replyFrame={450}
      />
      {frame < telnet && (
        <FocusRing
          region={termRegions.connectFields}
          appearAt={raw}
          radius={round.md}
          name="Raw TCP connect fields"
        />
      )}
    </>
  );
};

export const SerialBeat = ({frame, frames}: BeatProps) => {
  const parameters = CUE_FRAMES.parameters - BEATS.serial.from;
  return (
    <>
      <TermSerialScene
        frames={frames}
        openFrame={65}
        sendFrame={220}
        replyFrame={310}
      />
      {frame < 130 && <FocusRing region={termRegions.navItem('serial')} appearAt={8} radius={round.lg} name="Serial menu" />}
      <FocusRing
        region={termRegions.serialParams}
        appearAt={parameters}
        radius={round.md}
        name="Serial parameters"
      />
    </>
  );
};

export const SshBeat = ({frame, frames}: BeatProps) => {
  const help = CUE_FRAMES.help - BEATS.ssh.from;
  // Connect early in the beat (frame 95) so the button press starts at frames * 0.08 (~35)
  // and finishes before typing starts on "help" (frame 244). Output follows typing (+45 frames).
  return (
    <>
      <TermSshScene
        frames={frames}
        connectFrame={95}
        typeFrame={help}
        outputFrame={help + 45}
      />
      {frame < 175 && <FocusRing region={termRegions.navItem('ssh')} appearAt={8} radius={round.lg} name="SSH menu" />}
    </>
  );
};

export const RecapBeat = ({frame}: BeatProps) => {
  const scan = CUE_FRAMES.recapScan - BEATS.recap.from;
  const server = CUE_FRAMES.recapServer - BEATS.recap.from;
  const telnet = CUE_FRAMES.recapTelnet - BEATS.recap.from;
  const ssh = CUE_FRAMES.recapSsh - BEATS.recap.from;
  const serial = CUE_FRAMES.recapSerial - BEATS.recap.from;

  let tool: TermTab = 'scan';
  let appearAt = scan;
  if (frame >= serial) {
    tool = 'serial';
    appearAt = serial;
  } else if (frame >= ssh) {
    tool = 'ssh';
    appearAt = ssh;
  } else if (frame >= telnet) {
    tool = 'tcp-client';
    appearAt = telnet;
  } else if (frame >= server) {
    tool = 'tcp-server';
    appearAt = server;
  }

  return (
    <>
      <TermApp tab={tool} highlight={frame >= scan ? tool : undefined}>
        {toolPane(tool)}
      </TermApp>
      <FocusRing
        key={tool}
        region={termRegions.navItem(tool)}
        appearAt={appearAt}
        radius={round.lg}
        name={`Recap ${tool}`}
      />
    </>
  );
};
