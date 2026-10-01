// CTRLbot IoT Tablet Walkthrough — narrated, in two shapes from one set of beats.
//
// Built from Nathan's recording (video input/CTRLbot-IoT Tablet Walkthrough v1.0.9.mp4,
// ingest/iot-tablet-walkthrough/transcript.md). The brief is videos/iot-tablet-walkthrough.md.
//
//   iot-tablet-walkthrough           1920x1080, copy left, Tablet in a Stage panel right.
//                                    YouTube. Captions ship as an .srt (npm run narration:srt).
//   iot-tablet-walkthrough-portrait  1080x1920, copy on top, Tablet in a panel, captions under
//                                    it. TikTok, YouTube Shorts, LinkedIn and X.

import {useMemo} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {captionsFromClips} from '../../audio/narrationCaptions';
import {NarrationTrack} from '../../audio/NarrationTrack';
import {background, radius} from '../../design/theme';
import captionWords from '../../../ingest/iot-tablet-walkthrough/captions.json';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {NarrationCaptions} from '../NarrationCaptions';
import {PORTRAIT, PortraitStage, portraitLayout} from '../PortraitStage';
import {STAGE, Stage} from '../Stage';
import {WalkthroughCopy, type CopyFormat} from '../WalkthroughCopy';
import {BEAT_RENDERERS, OpenBeat} from './IotTabletBeats';
import {
  IOT_TABLET_CAPTION_CORRECTIONS,
  IOT_TABLET_NARRATION_CLIPS,
  IOT_TABLET_NARRATION_SOURCE,
} from './iotTabletWalkthroughNarration';
import {
  BEATS,
  BEAT_NAMES,
  COPY,
  IOT_TABLET_WALKTHROUGH_FRAMES,
  beatShots,
  type BeatName,
} from './iotTabletWalkthroughData';

export const iotTabletWalkthroughDuration = IOT_TABLET_WALKTHROUGH_FRAMES;

/** The copy block's height: the Stage panel's in landscape (600px), or text height in portrait. */
const copyHeight = (format: CopyFormat) =>
  format === 'landscape' ? STAGE.panelHeight : portraitLayout(TABLET_VIEWPORT).text.height;

/** Background glow that drifts gently behind the stage over the whole cut. */
const tabletBg = (t: number) =>
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

/** The live Tablet surface, in whichever beat the frame is in. */
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
    <div style={{width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height}}>
      {resolveBeat(currentBeat, frame - beatConfig.from, beatConfig.duration)}
    </div>
  );
};

const Walkthrough = ({format}: {format: CopyFormat}) => {
  const frame = useCurrentFrame();
  const shots = useMemo(() => beatShots(), []);
  const bg = tabletBg(frame / (IOT_TABLET_WALKTHROUGH_FRAMES - 1));
  const captions = useMemo(
    () =>
      captionsFromClips(
        IOT_TABLET_NARRATION_CLIPS,
        captionWords,
        IOT_TABLET_CAPTION_CORRECTIONS,
      ),
    [],
  );

  return (
    <AbsoluteFill>
      <PromoPreload />
      {format === 'landscape' ? (
        <Stage
          contentSize={TABLET_VIEWPORT}
          shots={shots}
          panelHeight={STAGE.panelHeight}
          panelAspect={TABLET_VIEWPORT.width / TABLET_VIEWPORT.height}
          panelRadius={radius.xl}
          background={bg}
          copy={<CopyTrack format="landscape" />}
        >
          <SurfaceTrack />
        </Stage>
      ) : (
        <PortraitStage
          contentSize={TABLET_VIEWPORT}
          shots={shots}
          panelRadius={radius.xl}
          background={bg}
          copy={<CopyTrack format="portrait" />}
          captions={
            <NarrationCaptions
              captions={captions}
              box={portraitLayout(TABLET_VIEWPORT).captions}
              size={PORTRAIT.captions.size}
            />
          }
        >
          <SurfaceTrack />
        </PortraitStage>
      )}
      <NarrationTrack
        src={IOT_TABLET_NARRATION_SOURCE}
        clips={IOT_TABLET_NARRATION_CLIPS}
      />
    </AbsoluteFill>
  );
};

/** 1920x1080, narrated. The YouTube cut. */
export const IotTabletWalkthrough = () => <Walkthrough format="landscape" />;

/** 1080x1920, narrated, captions burned in. The cut for the feeds. */
export const IotTabletWalkthroughPortrait = () => <Walkthrough format="portrait" />;
