// CTRLbot IoT Phone Walkthrough — narrated, in two shapes from one set of beats.
//
// Built from Nathan's recording (video input/CTRLbot-IoT Phone Walkthrough v1.0.9.mp4,
// ingest/iot-phone-walkthrough/transcript.md). The brief is videos/iot-phone-walkthrough.md.
//
//   iot-phone-walkthrough           1920x1080, copy left, Phone in a Stage panel right.
//                                   YouTube. Captions ship as an .srt (npm run narration:srt).
//   iot-phone-walkthrough-portrait  1080x1920, copy on top, Phone in a panel, captions under
//                                   it. TikTok, YouTube Shorts, LinkedIn and X.

import {useMemo} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {PHONE_VIEWPORT} from '../../app-ui/viewports';
import {captionsFromClips} from '../../audio/narrationCaptions';
import {NarrationTrack} from '../../audio/NarrationTrack';
import {background} from '../../design/theme';
import captionWords from '../../../ingest/iot-phone-walkthrough/captions.json';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {NarrationCaptions} from '../NarrationCaptions';
import {PORTRAIT, PortraitStage, portraitLayout} from '../PortraitStage';
import {Stage} from '../Stage';
import {WalkthroughCopy, type CopyFormat} from '../WalkthroughCopy';
import {BEAT_RENDERERS, OpenBeat} from './IotPhoneBeats';
import {
  IOT_PHONE_CAPTION_CORRECTIONS,
  IOT_PHONE_NARRATION_CLIPS,
  IOT_PHONE_NARRATION_SOURCE,
} from './iotPhoneWalkthroughNarration';
import {
  BEATS,
  BEAT_NAMES,
  COPY,
  IOT_PHONE_WALKTHROUGH_FRAMES,
  beatShots,
  type BeatName,
} from './iotPhoneWalkthroughData';

export const iotPhoneWalkthroughDuration = IOT_PHONE_WALKTHROUGH_FRAMES;

/** The copy block's height: the Stage panel's in landscape (900px), or text height in portrait. */
const copyHeight = (format: CopyFormat) =>
  format === 'landscape' ? 900 : portraitLayout(PHONE_VIEWPORT).text.height;

/** Background glow that drifts gently behind the stage over the whole cut. */
const phoneBg = (t: number) =>
  background.promo(
    interpolate(t, [0, 1], [72, 60], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(t, [0, 1], [48, 54], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

const resolveBeat = (name: BeatName, frame: number, frames: number) => {
  const Component = BEAT_RENDERERS[name] ?? OpenBeat;
  return <Component frame={frame} frames={frames} />;
};

/** The copy, one Sequence per beat. */
const CopyTrack = ({format}: {format: CopyFormat}) => (
  <>
    {BEAT_NAMES.map((name) => {
      const beat = BEATS[name];
      const copy = COPY[name];
      return (
        <Sequence
          key={name}
          from={beat.from}
          durationInFrames={beat.duration}
          layout="none"
          name={`Copy — ${name}`}
        >
          <WalkthroughCopy
            format={format}
            height={copyHeight(format)}
            eyebrow={copy.eyebrow}
            headline={copy.headline}
            title={copy.title}
            body={copy.body}
            at={name === 'open' ? -40 : 4}
            until={beat.duration}
          />
        </Sequence>
      );
    })}
  </>
);

/** The live Phone surface, in whichever beat the frame is in. */
const SurfaceTrack = () => {
  const frame = useCurrentFrame();
  const currentBeat =
    BEAT_NAMES.find(
      (name) =>
        frame >= BEATS[name].from &&
        frame < BEATS[name].from + BEATS[name].duration,
    ) ?? 'open';
  const beatConfig = BEATS[currentBeat];

  return (
    <div style={{width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height}}>
      {resolveBeat(currentBeat, frame - beatConfig.from, beatConfig.duration)}
    </div>
  );
};

const Walkthrough = ({format}: {format: CopyFormat}) => {
  const frame = useCurrentFrame();
  const shots = useMemo(() => beatShots(), []);
  const bg = phoneBg(frame / (IOT_PHONE_WALKTHROUGH_FRAMES - 1));
  const captions = useMemo(
    () =>
      captionsFromClips(
        IOT_PHONE_NARRATION_CLIPS,
        captionWords,
        IOT_PHONE_CAPTION_CORRECTIONS,
      ),
    [],
  );

  return (
    <AbsoluteFill>
      <PromoPreload />
      {format === 'landscape' ? (
        <Stage
          contentSize={PHONE_VIEWPORT}
          shots={shots}
          panelHeight={900}
          panelAspect={PHONE_VIEWPORT.width / PHONE_VIEWPORT.height}
          panelRadius={16}
          background={bg}
          copy={<CopyTrack format="landscape" />}
        >
          <SurfaceTrack />
        </Stage>
      ) : (
        <PortraitStage
          contentSize={PHONE_VIEWPORT}
          shots={shots}
          panelRadius={16}
          background={bg}
          copy={<CopyTrack format="portrait" />}
          captions={
            <NarrationCaptions
              captions={captions}
              box={portraitLayout(PHONE_VIEWPORT).captions}
              size={PORTRAIT.captions.size}
            />
          }
        >
          <SurfaceTrack />
        </PortraitStage>
      )}
      <NarrationTrack
        src={IOT_PHONE_NARRATION_SOURCE}
        clips={IOT_PHONE_NARRATION_CLIPS}
      />
    </AbsoluteFill>
  );
};

/** 1920x1080, narrated. The YouTube cut. */
export const IotPhoneWalkthrough = () => <Walkthrough format="landscape" />;

/** 1080x1920, narrated, captions burned in. The cut for the feeds. */
export const IotPhoneWalkthroughPortrait = () => <Walkthrough format="portrait" />;
