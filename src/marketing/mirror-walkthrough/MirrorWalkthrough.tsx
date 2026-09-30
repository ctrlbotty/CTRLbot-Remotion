// CTRLbot Mirror walkthrough — narrated, in two shapes from one set of beats.
//
// Built from Nathan's recording (video input/CTRLbot Mirror Tutorial.mp4,
// ingest/mirror-walkthrough/transcript.md). The brief is videos/mirror-walkthrough.md.
//
//   mirror-walkthrough           1920x1080, copy left, Mirror in a Stage panel right.
//                                YouTube. Captions ship as an .srt (npm run narration:srt).
//   mirror-walkthrough-portrait  1080x1920, copy on top, Mirror in a panel, captions under
//                                it. TikTok, YouTube Shorts, LinkedIn and X.
//
// There is no silent cut. The feeds autoplay muted, so the step text carries the video on
// its own, and the portrait cut burns its captions in as well.

import {useMemo} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {MIRROR_VIEWPORT} from '../../app-ui/mirror/mirrorData';
import {round} from '../../app-ui/mirror/mirrorTheme';
import {captionsFromClips} from '../../audio/narrationCaptions';
import {NarrationTrack} from '../../audio/NarrationTrack';
import {background} from '../../design/theme';
import captionWords from '../../../ingest/mirror-walkthrough/captions.json';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {NarrationCaptions} from '../NarrationCaptions';
import {PORTRAIT, PortraitStage, portraitLayout} from '../PortraitStage';
import {STAGE, Stage} from '../Stage';
import {WalkthroughCopy, type CopyFormat} from '../WalkthroughCopy';
import {BEAT_RENDERERS, OpenBeat} from './MirrorBeats';
import {
  MIRROR_WALKTHROUGH_NARRATION_CLIPS,
  MIRROR_WALKTHROUGH_NARRATION_SOURCE,
} from './mirrorWalkthroughNarration';
import {
  BEATS,
  BEAT_NAMES,
  COPY,
  MIRROR_WALKTHROUGH_FRAMES,
  SETUP_BEATS,
  SETUP_STEPS,
  beatShots,
  setupStepAt,
  type BeatName,
} from './walkthroughData';

export const mirrorWalkthroughDuration = MIRROR_WALKTHROUGH_FRAMES;

/** The copy block's height: the Stage panel's in landscape, so its top edge meets the panel's. */
const copyHeight = (format: CopyFormat) =>
  format === 'landscape' ? STAGE.panelHeight : portraitLayout(MIRROR_VIEWPORT).text.height;

/** Background glow that drifts gently behind the stage over the whole cut. */
const mirrorBg = (t: number) =>
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

const isSetupBeat = (name: BeatName): name is (typeof SETUP_BEATS)[number] =>
  (SETUP_BEATS as readonly BeatName[]).includes(name);

/** Setup's checklist, up across all three Setup beats and ticking with the panel. */
const SetupCopy = ({format, until}: {format: CopyFormat; until: number}) => {
  const frame = useCurrentFrame();
  const {step, since} = setupStepAt(BEATS.setup.from + frame);
  return (
    <WalkthroughCopy
      format={format}
      height={copyHeight(format)}
      eyebrow={`Setup · step ${Math.min(step, SETUP_STEPS.length)} of ${SETUP_STEPS.length}`}
      checklist={{steps: SETUP_STEPS, active: step, since: since - BEATS.setup.from}}
      at={4}
      until={until}
    />
  );
};

/** The copy, one Sequence per beat — and one across the three Setup beats. */
const CopyTrack = ({format}: {format: CopyFormat}) => {
  const setupFrom = BEATS[SETUP_BEATS[0]].from;
  const last = BEATS[SETUP_BEATS[SETUP_BEATS.length - 1]];
  const setupFrames = last.from + last.duration - setupFrom;
  return (
    <>
      {BEAT_NAMES.map((name) => {
        if (isSetupBeat(name)) return null;
        const beat = BEATS[name];
        const copy = COPY[name];
        return (
          <Sequence key={name} from={beat.from} durationInFrames={beat.duration} layout="none" name={`Copy — ${name}`}>
            <WalkthroughCopy
              format={format}
              height={copyHeight(format)}
              eyebrow={copy.eyebrow}
              headline={copy.headline}
              title={copy.title}
              body={copy.body}
              // The open is the poster frame: composed at frame 0, not arriving into it.
              at={name === 'open' ? -40 : 4}
              until={beat.duration}
            />
          </Sequence>
        );
      })}
      <Sequence from={setupFrom} durationInFrames={setupFrames} layout="none" name="Copy — setup checklist">
        <SetupCopy format={format} until={setupFrames} />
      </Sequence>
    </>
  );
};

/** The live Mirror window, in whichever beat the frame is in. */
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
    <div style={{width: MIRROR_VIEWPORT.width, height: MIRROR_VIEWPORT.height}}>
      {resolveBeat(currentBeat, frame - beatConfig.from, beatConfig.duration)}
    </div>
  );
};

const Walkthrough = ({format}: {format: CopyFormat}) => {
  const frame = useCurrentFrame();
  const shots = useMemo(() => beatShots(), []);
  const bg = mirrorBg(frame / (MIRROR_WALKTHROUGH_FRAMES - 1));
  const captions = useMemo(
    () => captionsFromClips(MIRROR_WALKTHROUGH_NARRATION_CLIPS, captionWords),
    [],
  );

  return (
    <AbsoluteFill>
      <PromoPreload />
      {format === 'landscape' ? (
        <Stage
          contentSize={MIRROR_VIEWPORT}
          shots={shots}
          panelHeight={STAGE.panelHeight}
          panelAspect={MIRROR_VIEWPORT.width / MIRROR_VIEWPORT.height}
          panelRadius={round.xl}
          background={bg}
          copy={<CopyTrack format="landscape" />}
        >
          <SurfaceTrack />
        </Stage>
      ) : (
        <PortraitStage
          contentSize={MIRROR_VIEWPORT}
          shots={shots}
          panelRadius={round.xl}
          background={bg}
          copy={<CopyTrack format="portrait" />}
          captions={
            <NarrationCaptions
              captions={captions}
              box={portraitLayout(MIRROR_VIEWPORT).captions}
              size={PORTRAIT.captions.size}
            />
          }
        >
          <SurfaceTrack />
        </PortraitStage>
      )}
      <NarrationTrack
        src={MIRROR_WALKTHROUGH_NARRATION_SOURCE}
        clips={MIRROR_WALKTHROUGH_NARRATION_CLIPS}
      />
    </AbsoluteFill>
  );
};

/** 1920x1080, narrated. The YouTube cut. */
export const MirrorWalkthrough = () => <Walkthrough format="landscape" />;

/** 1080x1920, narrated, captions burned in. The cut for the feeds. */
export const MirrorWalkthroughPortrait = () => <Walkthrough format="portrait" />;
