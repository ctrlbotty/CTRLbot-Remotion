// Revision 2: cue-driven proof, scan and server; later beat tasks retain their scenes.
import {useCurrentFrame} from 'remotion';
import {TERM_ADAPTER, TERM_VIEWPORT} from '../../app-ui/term/termData';
import {TermSshScene} from '../../app-ui/term/TermScenes';
import {TermApp, TermScan, type TermTab} from '../../app-ui/term/Terminator';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat, type WalkthroughFormat} from '../WalkthroughShell';
import {TERMINATOR_CAPTION_CORRECTIONS} from './terminatorWalkthroughNarration';
import {TERMINATOR_WALKTHROUGH_EDIT} from './terminatorWalkthroughNarration.generated';
import {TERMINATOR_WALKTHROUGH_FRAMES, WALKTHROUGH_BEATS} from './terminatorWalkthroughData';
import {
  PinBeat, ProofBeat, RawTcpBeat, ScanBeat, SerialBeat, ServerBeat,
} from './TerminatorBeats';

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

export const TERMINATOR_WALKTHROUGH_BEATS: WalkthroughBeat[] = WALKTHROUGH_BEATS.map((beat) => ({
  ...beat,
  render: ({frame, frames, format}) => {
    switch (beat.id) {
      case 'proof': return <ProofBeat frame={frame} frames={frames} format={format} />;
      case 'recap': return <ToolOverview frames={frames} />;
      case 'scan': return <ScanBeat frame={frame} frames={frames} format={format} />;
      case 'server': return <ServerBeat frame={frame} frames={frames} format={format} />;
      case 'pin': return <PinBeat frame={frame} frames={frames} format={format} />;
      case 'raw-tcp': return <RawTcpBeat frame={frame} frames={frames} format={format} />;
      case 'serial': return <SerialBeat frame={frame} frames={frames} format={format} />;
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
