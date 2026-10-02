// Revision 2: cue-driven proof, scan and server; later beat tasks retain their scenes.
import {TERM_VIEWPORT} from '../../app-ui/term/termData';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat, type WalkthroughFormat} from '../WalkthroughShell';
import {TERMINATOR_CAPTION_CORRECTIONS} from './terminatorWalkthroughNarration';
import {TERMINATOR_WALKTHROUGH_EDIT} from './terminatorWalkthroughNarration.generated';
import {TERMINATOR_WALKTHROUGH_FRAMES, WALKTHROUGH_BEATS} from './terminatorWalkthroughData';
import {
  PinBeat, ProofBeat, RawTcpBeat, RecapBeat, ScanBeat, SerialBeat, ServerBeat, SshBeat,
} from './TerminatorBeats';

export const terminatorWalkthroughDuration = TERMINATOR_WALKTHROUGH_FRAMES;

export const TERMINATOR_WALKTHROUGH_BEATS: WalkthroughBeat[] = WALKTHROUGH_BEATS.map((beat) => ({
  ...beat,
  render: ({frame, frames, format}) => {
    switch (beat.id) {
      case 'proof': return <ProofBeat frame={frame} frames={frames} format={format} />;
      case 'recap': return <RecapBeat frame={frame} frames={frames} format={format} />;
      case 'scan': return <ScanBeat frame={frame} frames={frames} format={format} />;
      case 'server': return <ServerBeat frame={frame} frames={frames} format={format} />;
      case 'pin': return <PinBeat frame={frame} frames={frames} format={format} />;
      case 'raw-tcp': return <RawTcpBeat frame={frame} frames={frames} format={format} />;
      case 'serial': return <SerialBeat frame={frame} frames={frames} format={format} />;
      case 'ssh': return <SshBeat frame={frame} frames={frames} format={format} />;
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
