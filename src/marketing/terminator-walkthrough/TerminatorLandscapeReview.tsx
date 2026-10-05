// Nathan's landscape review, October 5. Portrait keeps the approved 138s timeline
// until he reviews this longer introduction. Chapter actions keep their local clocks.
import {TERM_VIEWPORT, termRegions, type TermTab} from '../../app-ui/term/termData';
import {TermApp} from '../../app-ui/term/Terminator';
import {round} from '../../app-ui/term/termTheme';
import {FocusRing} from '../../camera/Annotations';
import {fullFrame, type Shot} from '../../camera/Camera';
import {cueFrame, WalkthroughShell, type WalkthroughBeat} from '../WalkthroughShell';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {TERMINATOR_WALKTHROUGH_BEATS} from './TerminatorWalkthrough';
import {BEATS, BEAT_SHOTS} from './terminatorWalkthroughData';
import {TERMINATOR_CAPTION_CORRECTIONS} from './terminatorWalkthroughNarration';
import {NARRATION_EDIT} from './terminatorLandscapeNarration.generated';
import {toolPane} from './TerminatorBeats';

const edit = {...NARRATION_EDIT, src: 'narration/terminator-walkthrough/landscape-edit.m4a'};
const extraFrames = 840;
const overview = [
  {tool: 'scan', at: cueFrame(edit, 'overview', 'It', 1)},
  {tool: 'tcp-server', at: cueFrame(edit, 'overview', 'It', 2)},
  {tool: 'tcp-client', at: cueFrame(edit, 'overview', 'It', 3)},
  {tool: 'serial', at: cueFrame(edit, 'overview', 'You')},
  {tool: 'ssh', at: cueFrame(edit, 'overview', 'or')},
  {tool: 'scan', at: cueFrame(edit, 'begin-scan', 'So')},
] satisfies {tool: TermTab; at: number}[];

const Overview = ({frame}: {frame: number}) => {
  const absolute = frame + BEATS.proof.from;
  const step = overview.filter((item) => item.at <= absolute).at(-1);
  const tool = step?.tool ?? 'scan';
  return <>
    <TermApp tab={tool} highlight={step ? tool : undefined}>{toolPane(tool)}</TermApp>
    {step && <FocusRing key={`${tool}-${step.at}`} region={termRegions.navItem(tool)} appearAt={step.at - BEATS.proof.from} radius={round.lg} name={`Overview ${tool}`} />}
  </>;
};

// Enough of the adjacent pane remains to orient the viewer, while the sidebar is readable.
const navigation = {x: 0, y: 40, width: 800, height: 450};
const serialControls = {x: termRegions.session.x, y: 0, width: termRegions.session.width, height: termRegions.session.width * 9 / 16};
const shots: Partial<Record<string, Shot[]>> = {
  proof: [
    {at: 0, region: fullFrame(TERM_VIEWPORT)},
    {at: overview[0].at - BEATS.proof.from, region: navigation},
    {at: overview[5].at - BEATS.proof.from, region: fullFrame(TERM_VIEWPORT)},
  ],
  serial: [
    {at: 0, region: navigation},
    {at: 90, region: fullFrame(TERM_VIEWPORT)},
    {at: 150, region: serialControls},
    {at: 220, region: termRegions.exchange},
    {at: BEAT_SHOTS.serial![1].at, region: serialControls},
  ],
  ssh: [
    {at: 0, region: fullFrame(TERM_VIEWPORT)},
    {at: 45, region: navigation},
    {at: 180, region: termRegions.exchange},
  ],
};

export const TERMINATOR_LANDSCAPE_REVIEW_BEATS: WalkthroughBeat[] = TERMINATOR_WALKTHROUGH_BEATS.map((beat) => ({
  ...beat,
  from: beat.from >= BEATS.scan.from ? beat.from + extraFrames : beat.from,
  duration: beat.id === 'proof' ? beat.duration + extraFrames : beat.duration,
  ...(beat.id === 'proof' ? {layout: 'chapter', render: ({frame}) => <Overview frame={frame} />} : {}),
  shots: shots[beat.id] ?? beat.shots,
  calloutSide: beat.id === 'proof' || beat.id === 'serial' || beat.id === 'ssh' ? 'right' : beat.calloutSide,
}));

export const TerminatorLandscapeReview = () => <WalkthroughShell
  format="landscape" contentSize={TERM_VIEWPORT} beats={TERMINATOR_LANDSCAPE_REVIEW_BEATS}
  edit={edit} corrections={TERMINATOR_CAPTION_CORRECTIONS} preload={<PromoPreload />}
/>;
