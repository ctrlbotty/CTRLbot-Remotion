// Portrait review: keep the whole phone between the heading and burned-in captions.
// The surrounding plane gives the shell's modest drift room without cropping controls.
import {Interactive, Sequence} from 'remotion';
import {fullFrame} from '../../camera/Camera';
import {color, font} from '../../design/theme';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat} from '../WalkthroughShell';
import {BEAT_RENDERERS, DatabaseBeat, EpsonBeat, EuiBeat, ExitBeat, SettingsBeat, OpenBeat} from './IotPhoneBeats';
import {LANDSCAPE_REVIEW_SPANS} from './IotPhoneLandscapeReview';
import {WALKTHROUGH_BEATS, COPY, type BeatName} from './iotPhoneWalkthroughData';
import {NARRATION_EDIT} from './iotPhoneWalkthroughNarration.generated';
import {IOT_PHONE_CAPTION_CORRECTIONS} from './iotPhoneWalkthroughNarration';

const portraitPlane = {width: 798.75, height: 1420};
const portraitBeats: WalkthroughBeat[] = WALKTHROUGH_BEATS
  .filter((beat) => beat.id !== 'first-run')
  .map((beat) => ({
    ...beat,
    ...(beat.layout !== 'card' ? {
      layout: 'chapter' as const,
      copy: undefined,
      regions: undefined,
      shots: [{at: 0, region: fullFrame(portraitPlane)}],
    } : {}),
    render: ({frame, frames}) => {
      if (beat.id === 'open' || beat.id === 'close') return null;
      const Component = beat.id === 'database' ? DatabaseBeat
        : beat.id === 'epson' ? EpsonBeat
        : beat.id === 'eui' ? EuiBeat
        : beat.id === 'settings' ? SettingsBeat
        : BEAT_RENDERERS[beat.id as BeatName] ?? OpenBeat;
      return (
        <Interactive.Div name="Portrait phone with dark grey bezel" style={{
          position: 'absolute', left: 219.375, top: 220,
          width: 360, height: 780, overflow: 'hidden', boxShadow: `0 0 0 10px ${color.bezel}`,
        }}>
          {beat.id === 'exit'
            ? <ExitBeat frame={frame} frames={frames} exitRegion={{x: 6, y: 36, width: 36, height: 36}} />
            : <Component frame={frame} frames={frames} review />}
        </Interactive.Div>
      );
    },
  }));

export const IotPhonePortraitReview = () => (
  <>
    {LANDSCAPE_REVIEW_SPANS.map((span) => (
      <Sequence key={span.start} from={span.from} durationInFrames={span.end - span.start}
        name={`Portrait review source ${span.start}–${span.end}`}>
        <Sequence from={-span.start} name="Original narration and cue clock">
          <WalkthroughShell format="portrait" contentSize={portraitPlane}
            beats={portraitBeats} edit={NARRATION_EDIT}
            corrections={IOT_PHONE_CAPTION_CORRECTIONS} preload={<PromoPreload />} />
          {portraitBeats.filter((beat) => beat.layout === 'chapter').map((beat) => (
            <Sequence key={beat.id} from={beat.from} durationInFrames={beat.duration}
              layout="none" name={`${beat.id} portrait heading`}>
              <Interactive.Div name="Portrait chapter heading" style={{
                position: 'absolute', left: 72, top: 110, width: 868,
                color: color.text, fontFamily: font.ui,
              }}>
                <div style={{fontFamily: font.mono, fontSize: 26, color: color.accent,
                  textTransform: 'uppercase', marginBottom: 16}}>
                  {COPY[beat.id as BeatName].eyebrow}
                </div>
                <div style={{fontSize: 44, lineHeight: 1.15, fontWeight: 800}}>
                  {COPY[beat.id as BeatName].title}
                </div>
              </Interactive.Div>
            </Sequence>
          ))}
        </Sequence>
      </Sequence>
    ))}
  </>
);
