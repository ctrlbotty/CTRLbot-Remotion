// Revision 2 shell migration. Cue-driven chapter actions are the following beat tasks.
import {useCurrentFrame} from 'remotion';
import {TERM_ADAPTER, TERM_SERVER, TERM_VIEWPORT} from '../../app-ui/term/termData';
import {
  TermScanScene, TermServerScene, TermRawTcpScene, TermSerialScene, TermSshScene,
} from '../../app-ui/term/TermScenes';
import {TermApp, TermScan, TermTcpServer, type TermTab} from '../../app-ui/term/Terminator';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat, type WalkthroughFormat} from '../WalkthroughShell';
import {TERMINATOR_CAPTION_CORRECTIONS} from './terminatorWalkthroughNarration';
import {TERMINATOR_WALKTHROUGH_EDIT} from './terminatorWalkthroughNarration.generated';
import {TERMINATOR_WALKTHROUGH_FRAMES, WALKTHROUGH_BEATS} from './terminatorWalkthroughData';

export const terminatorWalkthroughDuration = TERMINATOR_WALKTHROUGH_FRAMES;
const NAV_TABS: TermTab[] = ['scan', 'tcp-server', 'tcp-client', 'serial', 'ssh'];
const SCAN_AT_REST = {status: 'ready' as const, checked: 0, devices: []};

// Existing navigation placeholder remains until the cue-driven proof/recap tasks.
const ToolOverview = ({frames}: {frames: number}) => {
  const frame = useCurrentFrame();
  const step = Math.min(NAV_TABS.length - 1, Math.floor((frame / frames) * NAV_TABS.length));
  return (
    <TermApp tab="scan" highlight={NAV_TABS[step]}>
      <TermScan adapter={TERM_ADAPTER} state={SCAN_AT_REST} />
    </TermApp>
  );
};

const PinBeat = ({frames}: {frames: number}) => {
  const frame = useCurrentFrame();
  return (
    <TermApp tab="tcp-server">
      <TermTcpServer port={TERM_SERVER.port} listening clients={1}
        received={TERM_SERVER.received} sent={TERM_SERVER.sent} pinned={frame >= frames * 0.4} />
    </TermApp>
  );
};

export const TERMINATOR_WALKTHROUGH_BEATS: WalkthroughBeat[] = WALKTHROUGH_BEATS.map((beat) => ({
  ...beat,
  render: ({frames}) => {
    switch (beat.id) {
      case 'proof':
      case 'recap': return <ToolOverview frames={frames} />;
      case 'scan': return <TermScanScene frames={frames} />;
      case 'server': return <TermServerScene frames={frames} />;
      case 'pin': return <PinBeat frames={frames} />;
      case 'raw-tcp': return <TermRawTcpScene frames={frames} />;
      case 'serial': return <TermSerialScene frames={frames} />;
      case 'ssh': return <TermSshScene frames={frames} />;
      default: return null;
    }
  },
}));

const Walkthrough = ({format}: {format: WalkthroughFormat}) => (
  <WalkthroughShell format={format} contentSize={TERM_VIEWPORT}
    beats={TERMINATOR_WALKTHROUGH_BEATS} edit={TERMINATOR_WALKTHROUGH_EDIT}
    corrections={TERMINATOR_CAPTION_CORRECTIONS} preload={<PromoPreload />} />
);
export const TerminatorWalkthrough = () => <Walkthrough format="landscape" />;
export const TerminatorWalkthroughPortrait = () => <Walkthrough format="portrait" />;
