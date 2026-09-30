// Captions for a narration edit: the recording's word timings, moved to where each clip
// plays in the composition.
//
// KEEP THIS FILE IMPORT-FREE apart from `import type`. scripts/narration-srt.mjs
// transpiles it and imports the result to write the .srt uploaded beside a landscape
// render, so the captions burned into the portrait render and the uploaded ones come from
// one mapping and cannot disagree.

import type {CaptionWord} from '../shorts/shortsData';
import type {NarrationClip} from './NarrationTrack';

/** A clip often starts mid-sentence in the recording ("but what we also…"). */
const capitalise = (text: string) => text.replace(/^(\s*)(\S)/, (_, space: string, first: string) => space + first.toUpperCase());

/**
 * Every word whose midpoint falls inside a clip's source range, shifted to where that clip
 * plays. `words` is an ingest's `captions.json`. Whisper's word times run slightly early,
 * which is harmless in a caption and is why these are never used as cut points.
 */
export const captionsFromClips = (
  clips: readonly NarrationClip[],
  words: readonly CaptionWord[],
): CaptionWord[] =>
  clips
    .flatMap((clip) => {
      const rate = clip.playbackRate ?? 1;
      const place = (sourceMs: number) => (clip.at + (sourceMs / 1000 - clip.sourceStart) / rate) * 1000;
      const clipStartMs = clip.at * 1000;
      const clipEndMs = place(clip.sourceEnd * 1000);
      return words
        .filter((word) => {
          const middle = (word.startMs + word.endMs) / 2000;
          return middle >= clip.sourceStart && middle <= clip.sourceEnd;
        })
        .map((word, index) => ({
          text: index === 0 ? capitalise(word.text) : word.text,
          startMs: Math.max(clipStartMs, place(word.startMs)),
          endMs: Math.min(clipEndMs, place(word.endMs)),
          timestampMs: word.timestampMs === null ? null : place(word.timestampMs),
          confidence: word.confidence,
        }));
    })
    .sort((a, b) => a.startMs - b.startMs);
