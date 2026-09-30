import {Audio} from '@remotion/media';
import {interpolate, staticFile, useVideoConfig} from 'remotion';

export type NarrationClip = {
  /** Stable label shown in the Remotion Studio timeline. */
  readonly id: string;
  /** Absolute start time in the composition, in seconds. */
  readonly at: number;
  /** Inclusive start time in the source recording, in seconds. */
  readonly sourceStart: number;
  /** Exclusive end time in the source recording, in seconds. */
  readonly sourceEnd: number;
  /** Optional per-clip gain, multiplied by the track volume. */
  readonly volume?: number;
  /** Optional source playback rate. One preserves the recorded voice. */
  readonly playbackRate?: number;
};

type NarrationTrackProps = {
  /** Path relative to public/. */
  readonly src: string;
  readonly clips: readonly NarrationClip[];
  readonly volume?: number;
  /** Short edge fade that prevents clicks at edit points. */
  readonly fadeFrames?: number;
};

const secondsToFrames = (seconds: number, fps: number) =>
  Math.round(seconds * fps);

const validateClips = (
  clips: readonly NarrationClip[],
  compositionDurationInSeconds: number,
  frameDurationInSeconds: number,
) => {
  const ids = new Set<string>();

  for (const clip of clips) {
    const values = [clip.at, clip.sourceStart, clip.sourceEnd];
    if (values.some((value) => !Number.isFinite(value))) {
      throw new Error(`Narration clip "${clip.id}" has a non-finite timestamp.`);
    }
    if (!clip.id.trim()) throw new Error('Every narration clip needs a non-empty id.');
    if (ids.has(clip.id)) throw new Error(`Duplicate narration clip id: "${clip.id}".`);
    if (clip.at < 0 || clip.sourceStart < 0 || clip.sourceEnd <= clip.sourceStart) {
      throw new Error(`Narration clip "${clip.id}" has an invalid time range.`);
    }

    const playbackRate = clip.playbackRate ?? 1;
    if (!Number.isFinite(playbackRate) || playbackRate <= 0) {
      throw new Error(`Narration clip "${clip.id}" needs a positive playbackRate.`);
    }
    if (clip.volume !== undefined && (!Number.isFinite(clip.volume) || clip.volume < 0)) {
      throw new Error(`Narration clip "${clip.id}" needs a non-negative volume.`);
    }

    const end = clip.at + (clip.sourceEnd - clip.sourceStart) / playbackRate;
    if (end > compositionDurationInSeconds + frameDurationInSeconds) {
      throw new Error(
        `Narration clip "${clip.id}" ends at ${end.toFixed(2)}s, after the composition ends at ${compositionDurationInSeconds.toFixed(2)}s.`,
      );
    }
    ids.add(clip.id);
  }
};

/**
 * A non-destructive voice edit made from one source recording.
 *
 * Each clip keeps its original pitch and pace unless a playbackRate is explicitly
 * supplied. The edit list is seconds-based so it can be read directly beside a
 * timestamped transcript, while this component converts it to the composition's fps.
 */
export const NarrationTrack = ({
  src,
  clips,
  volume = 1,
  fadeFrames = 2,
}: NarrationTrackProps) => {
  const {durationInFrames: compositionFrames, fps} = useVideoConfig();
  validateClips(clips, compositionFrames / fps, 1 / fps);

  return (
    <>
      {clips.map((clip) => {
        const playbackRate = clip.playbackRate ?? 1;
        const durationInFrames = Math.max(
          1,
          secondsToFrames(
            (clip.sourceEnd - clip.sourceStart) / playbackRate,
            fps,
          ),
        );
        const edge = Math.min(
          fadeFrames,
          Math.max(0, Math.floor((durationInFrames - 1) / 2)),
        );
        const fadeOutAt = Math.max(edge, durationInFrames - 1 - edge);
        const clipVolume = volume * (clip.volume ?? 1);

        return (
          <Audio
            key={clip.id}
            name={`Narration — ${clip.id}`}
            src={staticFile(src)}
            from={secondsToFrames(clip.at, fps)}
            trimBefore={secondsToFrames(clip.sourceStart, fps)}
            durationInFrames={durationInFrames}
            playbackRate={playbackRate}
            volume={
              edge === 0
                ? clipVolume
                : (frame) =>
                    clipVolume *
                    interpolate(
                      frame,
                      [0, edge, fadeOutAt, durationInFrames - 1],
                      [0, 1, 1, 0],
                      {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      },
                    )
            }
          />
        );
      })}
    </>
  );
};
