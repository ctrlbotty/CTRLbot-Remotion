// Nathan's landscape review, 2026-10-05. Source-time spans preserve the approved
// narration edit and cue timing; portrait remains on the original cut until approval.
import {Interactive, Sequence} from 'remotion';
import {PHONE_VIEWPORT} from '../../app-ui/viewports';
import {fullFrame, padRegion} from '../../camera/Camera';
import {color} from '../../design/theme';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat} from '../WalkthroughShell';
import {BEAT_RENDERERS, DatabaseBeat, EpsonBeat, EuiBeat, SettingsBeat, OpenBeat} from './IotPhoneBeats';
import {WALKTHROUGH_BEATS, BEATS, CUE_FRAMES, type BeatName} from './iotPhoneWalkthroughData';
import {NARRATION_EDIT} from './iotPhoneWalkthroughNarration.generated';
import {IOT_PHONE_CAPTION_CORRECTIONS} from './iotPhoneWalkthroughNarration';

// Remove 11–27.5s and the silence after the complete Product Page sentence
// (ends at 84.45s). Keep 150ms of its tail, then cut directly to Add.
export const LANDSCAPE_REVIEW_SPANS = [
  {from: 0, start: 0, end: 330},
  {from: 330, start: 825, end: 2538},
  {from: 2043, start: 2580, end: 10080},
] as const;
export const LANDSCAPE_REVIEW_FRAMES = 9543;

const wholePhone = padRegion(fullFrame(PHONE_VIEWPORT), 40);
const reviewBeats: WalkthroughBeat[] = WALKTHROUGH_BEATS
  .filter((beat) => beat.id !== 'first-run')
  .map((beat) => ({
    ...beat,
    ...(beat.id === 'proof' ? {layout: 'chapter' as const, shots: [{at: 0, region: wholePhone}]} : {}),
    ...(beat.id === 'database' ? {shots: [{at: 0, region: wholePhone}]} : {}),
    ...(beat.id === 'epson' ? {shots: [{at: 0, region: wholePhone}]} : {}),
    ...(beat.id === 'eui' ? {shots: [{at: 0, region: wholePhone}]} : {}),
    ...(beat.id === 'm2m' ? {shots: [{at: 0, region: wholePhone}]} : {}),
    ...(beat.id === 'settings' ? {
      shots: [
        {at: 0, region: wholePhone},
        {at: CUE_FRAMES.quick - BEATS.settings.from, region: wholePhone},
        {at: CUE_FRAMES.factory - BEATS.settings.from, region: wholePhone},
      ],
    } : {}),
    render: ({frame, frames}) => {
      if (beat.id === 'open' || beat.id === 'close') return null;
      const Component = beat.id === 'database' ? DatabaseBeat
        : beat.id === 'epson' ? EpsonBeat
        : beat.id === 'eui' ? EuiBeat
        : beat.id === 'settings' ? SettingsBeat
        : BEAT_RENDERERS[beat.id as BeatName] ?? OpenBeat;
      return (
        <Interactive.Div name="Phone with dark grey bezel" style={{
          position: 'relative', width: 360, height: 780,
          boxShadow: `0 0 0 10px ${color.bezel}`,
        }}>
          <Component frame={frame} frames={frames} review />
        </Interactive.Div>
      );
    },
  }));

export const IotPhoneLandscapeReview = () => (
  <>
    {LANDSCAPE_REVIEW_SPANS.map((span) => (
      <Sequence key={span.start} from={span.from} durationInFrames={span.end - span.start} name={`Review source ${span.start}–${span.end}`}>
        <Sequence from={-span.start} name="Original narration and cue clock">
          <WalkthroughShell format="landscape" contentSize={PHONE_VIEWPORT}
            beats={reviewBeats} edit={NARRATION_EDIT}
            corrections={IOT_PHONE_CAPTION_CORRECTIONS} preload={<PromoPreload />} />
        </Sequence>
      </Sequence>
    ))}
  </>
);
