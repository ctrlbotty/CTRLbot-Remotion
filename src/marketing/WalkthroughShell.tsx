// WalkthroughShell: plays a narrated cut's beats across card, stage and chapter layouts.
//
// Replaces the Stage-only / PortraitStage-only pattern. One audio track from the planned edit,
// a 15-frame crossfade wherever the layout changes, and continuous camera paths across
// consecutive chapter beats so moves between them are moves, not cuts.

import type {ReactNode} from 'react';
import {useMemo} from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Camera, fullFrame, padRegion, type Region, type Shot} from '../camera/Camera';
import {Callout} from '../camera/Annotations';
import {MasterControlCard} from './eui-promo/MasterControlCard';
import {Stage, STAGE} from './Stage';
import {PORTRAIT, PortraitStage, portraitLayout} from './PortraitStage';
import {WalkthroughCopy, type CopyFormat, type Step} from './WalkthroughCopy';
import {NarrationCaptions} from './NarrationCaptions';
import {correctCaptions} from '../audio/narrationCaptions';
import type {CaptionWord} from '../shorts/shortsData';
import {background as houseBackground, color} from '../design/theme';
import {DitherOverlay} from './DitherOverlay';

export type WalkthroughFormat = 'landscape' | 'portrait';

export type BeatLayout = 'card' | 'stage' | 'chapter';

export type BeatCopy = {
  eyebrow?: string;
  headline?: string;
  title?: string;
  body?: ReactNode;
  checklist?: {steps: readonly Step[]; active: number; since: number};
};

export type WalkthroughBeat = {
  id: string;
  from: number;
  duration: number;
  layout: BeatLayout;
  card?: {
    lockup?: string;
    eyebrow?: string;
    line: string;
    kickers?: string[];
  };
  copy?: BeatCopy | ReactNode;
  regions?: Region | Region[];
  shots?: Shot[];
  render?: (info: {frame: number; frames: number; format: WalkthroughFormat}) => ReactNode;
  calloutSide?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Stage beats only, landscape. A device bezel, its own background (given the beat's
   * progress 0..1) and a whole-panel zoom from `zoom[0]` to `zoom[1]` across the beat.
   * The zoom scales the device, not the camera inside it, so no corner control is cropped.
   */
  stage?: {bezel?: number; zoom?: [number, number]; background?: (t: number) => string};
};

export type NarrationEdit = {
  src: string;
  seconds: number;
  clips: {id: string; at: number; start: number; end: number; seconds: number; removed?: any}[];
  words: CaptionWord[];
  cues: Record<string, {text: string; ms: number}[]>;
};

export type WalkthroughShellProps = {
  format: WalkthroughFormat;
  contentSize: {width: number; height: number};
  beats: WalkthroughBeat[];
  edit: NarrationEdit;
  corrections?: Record<string, string>;
  preload?: ReactNode;
  background?: string;
};

/**
 * Returns the composition frame at 30fps where `word` starts in `clipId`.
 * Throws if the clip or word is not found.
 */
export const cueFrame = (
  edit: NarrationEdit,
  clipId: string,
  word: string,
  nth = 1,
): number => {
  const clipCues = edit.cues[clipId];
  if (!clipCues) {
    throw new Error(`cueFrame: clip '${clipId}' not found in edit`);
  }
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = norm(word);
  let count = 0;
  for (const cue of clipCues) {
    if (norm(cue.text) === target) {
      count++;
      if (count === nth) {
        return Math.round((cue.ms / 1000) * 30);
      }
    }
  }
  throw new Error(`cueFrame: word '${word}' (occurrence ${nth}) not found in clip '${clipId}'`);
};

type BeatSegment = {
  layout: BeatLayout;
  from: number;
  duration: number;
  beats: WalkthroughBeat[];
};

const groupSegments = (beats: WalkthroughBeat[]): BeatSegment[] => {
  const segments: BeatSegment[] = [];
  for (const beat of beats) {
    const last = segments[segments.length - 1];
    if (last && last.layout === beat.layout) {
      last.beats.push(beat);
      last.duration = beat.from + beat.duration - last.from;
    } else {
      segments.push({
        layout: beat.layout,
        from: beat.from,
        duration: beat.duration,
        beats: [beat],
      });
    }
  }
  return segments;
};

/**
 * Where a held shot drifts to by the time the camera next moves. A chapter of locked holds
 * measured 73% inert in portrait, where the window is letterboxed and a UI state change is
 * a small fraction of the frame; continuous motion is what carries a cut (VIDEO_WORKFLOW.md).
 * The drift pulls back, so whatever the shot names stays whole; a shot already too wide to
 * pull back pushes in instead, since nothing in it is small enough to crop.
 */
const DRIFT = 0.08;
const drift = (region: Region, content: {width: number; height: number}): Region => {
  const grow = 1 + DRIFT;
  const pullBack = region.width * grow <= content.width && region.height * grow <= content.height;
  const k = pullBack ? grow : 1 - DRIFT;
  const width = region.width * k;
  const height = region.height * k;
  const x = Math.max(0, Math.min(region.x + (region.width - width) / 2, content.width - width));
  const y = Math.max(0, Math.min(region.y + (region.height - height) / 2, content.height - height));
  return {x, y, width, height};
};

/**
 * Build camera path across consecutive chapter beats in a segment.
 */
const buildChapterShots = (
  beats: WalkthroughBeat[],
  segmentFrom: number,
  contentSize: {width: number; height: number},
): Shot[] => {
  const shots: Shot[] = [];
  let currentRegion = fullFrame(contentSize);

  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i];
    const beatRelFrom = beat.from - segmentFrom;
    const targetRegion =
      beat.shots && beat.shots.length > 0
        ? beat.shots[0].region
        : beat.regions
          ? Array.isArray(beat.regions)
            ? beat.regions[0]
            : beat.regions
          : fullFrame(contentSize);

    if (i === 0) {
      currentRegion = targetRegion;
      shots.push({at: 0, region: targetRegion});
    } else {
      // Drift on the previous region until 20 frames before the new beat, then move
      const moveStart = Math.max(0, beatRelFrom - 20);
      shots.push({at: moveStart, region: drift(currentRegion, contentSize)});
      shots.push({at: beatRelFrom, region: targetRegion});
      currentRegion = targetRegion;
    }

    // If the beat itself specifies multiple shots or regions
    if (beat.shots && beat.shots.length > 1) {
      for (let s = 1; s < beat.shots.length; s++) {
        const shot = beat.shots[s];
        const moveStart = Math.max(beatRelFrom, beatRelFrom + shot.at - 20);
        shots.push({at: moveStart, region: drift(currentRegion, contentSize)});
        shots.push({at: beatRelFrom + shot.at, region: shot.region});
        currentRegion = shot.region;
      }
    } else if (Array.isArray(beat.regions) && beat.regions.length > 1) {
      for (let r = 1; r < beat.regions.length; r++) {
        const nextReg = beat.regions[r];
        const pushAt = beatRelFrom + Math.round((beat.duration * r) / beat.regions.length);
        shots.push({at: pushAt - 20, region: drift(currentRegion, contentSize)});
        shots.push({at: pushAt, region: nextReg});
        currentRegion = nextReg;
      }
    }
  }

  // The last hold drifts too, through the segment's crossfade out.
  const last = beats[beats.length - 1];
  if (last) {
    shots.push({at: last.from - segmentFrom + last.duration + 15, region: drift(currentRegion, contentSize)});
  }

  // interpolate() needs strictly increasing times: a keyframe landing on an earlier one's
  // frame replaces it.
  return shots.reduce<Shot[]>((out, shot) => {
    while (out.length && out[out.length - 1].at >= shot.at) out.pop();
    out.push(shot);
    return out;
  }, []);
};

const renderCopy = (
  copy: BeatCopy | ReactNode | undefined,
  format: CopyFormat,
  height: number,
  duration: number,
) => {
  if (!copy) return null;
  if (typeof copy === 'object' && ('title' in copy || 'eyebrow' in copy || 'body' in copy || 'checklist' in copy)) {
    const c = copy as BeatCopy;
    return (
      <WalkthroughCopy
        format={format}
        height={height}
        eyebrow={c.eyebrow}
        headline={c.headline}
        title={c.title}
        body={c.body}
        checklist={c.checklist}
        at={0}
        until={duration}
      />
    );
  }
  return copy as ReactNode;
};

const BeatContent = ({
  beat,
  format,
}: {
  beat: WalkthroughBeat;
  format: WalkthroughFormat;
}) => {
  const localFrame = useCurrentFrame();
  if (!beat.render) return null;
  return <>{beat.render({frame: localFrame, frames: beat.duration, format})}</>;
};

export const WalkthroughShell = ({
  format,
  contentSize,
  beats,
  edit,
  corrections,
  preload,
  background: customBackground,
}: WalkthroughShellProps) => {
  const frame = useCurrentFrame();
  const segments = useMemo(() => groupSegments(beats), [beats]);
  const isPortrait = format === 'portrait';

  const words = useMemo(
    () => (corrections ? correctCaptions(edit.words, corrections) : edit.words),
    [edit.words, corrections],
  );

  const stageBg = customBackground ?? houseBackground.stage;

  return (
    <AbsoluteFill style={{backgroundColor: color.void, overflow: 'hidden'}}>
      {preload}
      <Audio src={staticFile(edit.src)} />

      {/* Render layout segments */}
      {segments.map((segment, segIndex) => {
        const nextSeg = segments[segIndex + 1];
        // Extend duration by 15 frames for crossfade to the next layout segment
        const segDuration = nextSeg ? segment.duration + 15 : segment.duration;

        // 15-frame crossfade at layout change
        const fadeIn =
          segIndex > 0
            ? interpolate(frame, [segment.from, segment.from + 15], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1;

        return (
          <Sequence
            key={`${segment.layout}-${segment.from}`}
            from={segment.from}
            durationInFrames={segDuration}
            layout="none"
            name={`${segment.layout} segment`}
          >
            <AbsoluteFill style={{opacity: fadeIn}}>
              {segment.layout === 'card' ? (
                // Card layout
                segment.beats.map((beat, bIndex) => {
                  const isLastBeat = bIndex === segment.beats.length - 1;
                  const beatDur = isLastBeat && nextSeg ? beat.duration + 15 : beat.duration;
                  return (
                    <Sequence
                      key={beat.id}
                      from={beat.from - segment.from}
                      durationInFrames={beatDur}
                      layout="none"
                      name={beat.id}
                    >
                      <MasterControlCard
                        frames={beat.duration}
                        lockup={beat.card?.lockup}
                        eyebrow={
                          beat.card?.eyebrow ??
                          (typeof beat.copy === 'object' && beat.copy && 'eyebrow' in beat.copy
                            ? (beat.copy as BeatCopy).eyebrow
                            : undefined)
                        }
                        line={
                          beat.card?.line ??
                          (typeof beat.copy === 'object' &&
                          beat.copy &&
                          'body' in beat.copy &&
                          typeof (beat.copy as BeatCopy).body === 'string'
                            ? ((beat.copy as BeatCopy).body as string)
                            : '')
                        }
                        kickers={beat.card?.kickers}
                      />
                    </Sequence>
                  );
                })
              ) : segment.layout === 'stage' ? (
                // Stage layout
                segment.beats.map((beat, bIndex) => {
                  const isLastBeat = bIndex === segment.beats.length - 1;
                  const beatDur = isLastBeat && nextSeg ? beat.duration + 15 : beat.duration;
                  const copyHeight = isPortrait
                    ? portraitLayout(contentSize).text.height
                    : STAGE.panelHeight;
                  const copyElement = renderCopy(beat.copy, format, copyHeight, beat.duration);

                  // Single push never past 0.94 in stage
                  let stageShots: Shot[];
                  if (beat.shots && beat.shots.length > 0) {
                    stageShots = beat.shots;
                  } else if (beat.regions) {
                    const reg = Array.isArray(beat.regions) ? beat.regions[0] : beat.regions;
                    // Clamp region so it does not zoom past 0.94
                    const minW = contentSize.width * 0.94;
                    const minH = contentSize.height * 0.94;
                    const targetW = Math.max(reg.width, minW);
                    const targetH = Math.max(reg.height, minH);
                    const cx = reg.x + reg.width / 2;
                    const cy = reg.y + reg.height / 2;
                    let left = cx - targetW / 2;
                    let top = cy - targetH / 2;
                    left = Math.max(0, Math.min(left, contentSize.width - targetW));
                    top = Math.max(0, Math.min(top, contentSize.height - targetH));
                    const clampedReg: Region = {
                      x: left,
                      y: top,
                      width: targetW,
                      height: targetH,
                    };
                    const holdFrames = Math.min(18, Math.round(beat.duration * 0.15));
                    const pushFrames = Math.min(holdFrames + 24, Math.round(beat.duration * 0.45));
                    stageShots = [
                      {at: 0, region: fullFrame(contentSize)},
                      {at: holdFrames, region: fullFrame(contentSize)},
                      {at: pushFrames, region: clampedReg},
                    ];
                  } else {
                    stageShots = [{at: 0, region: fullFrame(contentSize)}];
                  }

                  return (
                    <Sequence
                      key={beat.id}
                      from={beat.from - segment.from}
                      durationInFrames={beatDur}
                      layout="none"
                      name={beat.id}
                    >
                      {isPortrait ? (
                        <PortraitStage
                          contentSize={contentSize}
                          shots={stageShots}
                          copy={copyElement}
                          background={stageBg}
                        >
                          <BeatContent beat={beat} format={format} />
                        </PortraitStage>
                      ) : (
                        <Stage
                          contentSize={contentSize}
                          shots={stageShots}
                          copy={copyElement}
                          background={
                            beat.stage?.background
                              ? beat.stage.background((frame - beat.from) / beat.duration)
                              : stageBg
                          }
                          panelHeight={STAGE.panelHeight}
                          bezel={beat.stage?.bezel}
                          panelScale={
                            beat.stage?.zoom
                              ? interpolate(frame, [beat.from, beat.from + beat.duration], beat.stage.zoom, {
                                  easing: Easing.bezier(0.4, 0, 0.6, 1),
                                  extrapolateLeft: 'clamp',
                                  extrapolateRight: 'clamp',
                                })
                              : undefined
                          }
                        >
                          <BeatContent beat={beat} format={format} />
                        </Stage>
                      )}
                    </Sequence>
                  );
                })
              ) : (
                // Chapter layout: continuous camera path across all consecutive chapter beats
                (() => {
                  const chapterShots = buildChapterShots(
                    segment.beats,
                    segment.from,
                    contentSize,
                  );

                  return (
                    <AbsoluteFill style={{background: stageBg}}>
                      <Camera contentSize={contentSize} shots={chapterShots} fit="expand">
                        {segment.beats.map((beat, bIndex) => {
                          const isLastBeat = bIndex === segment.beats.length - 1;
                          const beatDur = isLastBeat && nextSeg ? beat.duration + 15 : beat.duration;
                          return (
                            <Sequence
                              key={beat.id}
                              from={beat.from - segment.from}
                              durationInFrames={beatDur}
                              layout="none"
                              name={beat.id}
                            >
                              <BeatContent beat={beat} format={format} />
                            </Sequence>
                          );
                        })}
                      </Camera>

                      {/* Screen-space Callouts outside Camera */}
                      {segment.beats.map((beat) => {
                        const copy =
                          typeof beat.copy === 'object' && beat.copy
                            ? (beat.copy as BeatCopy)
                            : undefined;
                        const title = copy?.title ?? copy?.headline;
                        if (!title) return null;

                        return (
                          <Sequence
                            key={`${beat.id}-callout`}
                            from={beat.from - segment.from}
                            durationInFrames={beat.duration}
                            layout="none"
                            name={`${beat.id} callout`}
                          >
                            <Callout
                              eyebrow={copy?.eyebrow}
                              title={title}
                              body={copy?.body}
                              at={0}
                              side={isPortrait ? 'top' : (beat.calloutSide ?? 'left')}
                            />
                          </Sequence>
                        );
                      })}
                    </AbsoluteFill>
                  );
                })()
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Burned-in captions on portrait only */}
      {isPortrait ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 540,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0) 100%)',
              pointerEvents: 'none',
              zIndex: 90,
            }}
          />
          <div style={{position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none'}}>
            <NarrationCaptions
              captions={words}
              box={{
                left: PORTRAIT.captions.left,
                top: PORTRAIT.captions.bottom - PORTRAIT.captions.height,
                width: PORTRAIT.captions.width,
                height: PORTRAIT.captions.height,
              }}
              size={PORTRAIT.captions.size}
            />
          </div>
        </>
      ) : null}
    </AbsoluteFill>
  );
};
