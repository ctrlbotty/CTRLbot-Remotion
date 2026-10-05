// Portrait counterpart of Nathan's approved landscape revision. Reuse its exact
// performance and cues; give the narrow frame its own camera regions.
import {TERM_VIEWPORT, termRegions, type TermTab} from '../../app-ui/term/termData';
import {TermApp} from '../../app-ui/term/Terminator';
import {round} from '../../app-ui/term/termTheme';
import {FocusRing} from '../../camera/Annotations';
import {fullFrame, type Shot} from '../../camera/Camera';
import {cueFrame, WalkthroughShell} from '../WalkthroughShell';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {TERMINATOR_LANDSCAPE_REVIEW_BEATS} from './TerminatorLandscapeReview';
import {BEAT_SHOTS} from './terminatorWalkthroughData';
import {TERMINATOR_CAPTION_CORRECTIONS} from './terminatorWalkthroughNarration';
import {NARRATION_EDIT} from './terminatorLandscapeNarration.generated';
import {toolPane} from './TerminatorBeats';

const edit = {
  ...NARRATION_EDIT,
  src: 'narration/terminator-walkthrough/landscape-edit.m4a',
  // The new overview's long caption needs two lines inside the feed safe area.
  // Only its display whitespace changes; the recorded words and timings stay exact.
  words: NARRATION_EDIT.words.map((word) => word.text.trim() === 'communicate'
    ? {...word, text: '\ncommunicate'} : word),
};
const proof = TERMINATOR_LANDSCAPE_REVIEW_BEATS.find((beat) => beat.id === 'proof')!;
const overview = [
  {tool: 'scan', at: cueFrame(edit, 'overview', 'It', 1)},
  {tool: 'tcp-server', at: cueFrame(edit, 'overview', 'It', 2)},
  {tool: 'tcp-client', at: cueFrame(edit, 'overview', 'It', 3)},
  // First "you" is still in the Raw TCP explanation. The second starts Serial.
  {tool: 'serial', at: cueFrame(edit, 'overview', 'You', 2)},
  {tool: 'ssh', at: cueFrame(edit, 'overview', 'or')},
  {tool: 'scan', at: cueFrame(edit, 'begin-scan', 'So')},
] satisfies {tool: TermTab; at: number}[];

const PortraitOverview = ({frame}: {frame: number}) => {
  const step = overview.filter((item) => item.at <= frame + proof.from).at(-1);
  const tool = step?.tool ?? 'scan';
  return <>
    <TermApp tab={tool} highlight={step ? tool : undefined}>{toolPane(tool)}</TermApp>
    {step && <FocusRing key={`${tool}-${step.at}`} region={termRegions.navItem(tool)} appearAt={step.at - proof.from} radius={round.lg} name={`Portrait overview ${tool}`} />}
  </>;
};
// Half the desktop width: the whole menu remains visible, with enough of the pane
// beside it to show which tool the viewer selected. Rings supply the emphasis.
const navigation = {x: 0, y: 0, width: TERM_VIEWPORT.width / 2, height: TERM_VIEWPORT.height};
const controls = {x: termRegions.session.x, y: 0, width: termRegions.session.width, height: TERM_VIEWPORT.height};

const portraitShots: Partial<Record<string, Shot[]>> = {
  proof: proof.shots!.map((shot, index) => ({
    ...shot,
    region: index === 1 ? navigation : fullFrame(TERM_VIEWPORT),
  })),
  serial: [
    {at: 0, region: navigation},
    {at: 90, region: fullFrame(TERM_VIEWPORT)},
    {at: 150, region: controls},
    {at: 220, region: termRegions.exchange},
    {at: BEAT_SHOTS.serial![1].at, region: controls},
  ],
  ssh: [
    {at: 0, region: fullFrame(TERM_VIEWPORT)},
    {at: 45, region: navigation},
    {at: 180, region: termRegions.exchange},
  ],
};

export const TERMINATOR_PORTRAIT_REVIEW_BEATS = TERMINATOR_LANDSCAPE_REVIEW_BEATS.map((beat) => ({
  ...beat,
  ...(beat.id === 'proof' ? {render: ({frame}: {frame: number}) => <PortraitOverview frame={frame} />} : {}),
  shots: portraitShots[beat.id] ?? beat.shots,
}));

export const TerminatorPortraitReview = () => <WalkthroughShell
  format="portrait" contentSize={TERM_VIEWPORT} beats={TERMINATOR_PORTRAIT_REVIEW_BEATS}
  edit={edit} corrections={TERMINATOR_CAPTION_CORRECTIONS} preload={<PromoPreload />}
/>;
