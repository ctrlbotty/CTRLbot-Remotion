// Captions for a narration edit: the recording's word timings, moved to where each clip
// plays in the composition.
//
// KEEP THIS FILE IMPORT-FREE apart from `import type`. scripts/narration-srt.mjs
// transpiles it and imports the result to write the .srt uploaded beside a landscape
// render, so the captions burned into the portrait render and the uploaded ones come from
// one mapping and cannot disagree.

import type {CaptionWord} from '../shorts/shortsData';
import type {NarrationClip} from './NarrationTrack';

const capitalise = (text: string) => text.replace(/^(\s*)(\S)/, (_, space: string, first: string) => space + first.toUpperCase());

const correctWord = (text: string, corrections?: Record<string, string>): string | null => {
  if (!corrections) return text;
  const match = text.match(/^(\s*)(.*?)(\W*)$/);
  if (!match) return text;
  const [, lead, core, trail] = match;
  if (Object.prototype.hasOwnProperty.call(corrections, core)) {
    if (corrections[core] === '') return null;
    return lead + corrections[core] + trail;
  }
  return text;
};

/**
 * Applies optional word spelling corrections to an array of CaptionWords.
 * If a correction maps a word to empty string, that word is dropped.
 */
export const correctCaptions = (
  words: readonly CaptionWord[],
  corrections?: Record<string, string>,
): CaptionWord[] => {
  if (!corrections || Object.keys(corrections).length === 0) {
    return [...words];
  }
  const result: CaptionWord[] = [];
  for (const word of words) {
    const text = correctWord(word.text, corrections);
    if (text !== null) {
      result.push({...word, text});
    }
  }
  return result;
};

/**
 * Every word whose midpoint falls inside a clip's source range, shifted to where that clip
 * plays. `words` is an ingest's `captions.json`. Whisper's word times run slightly early,
 * which is harmless in a caption and is why these are never used as cut points.
 *
 * A clip often starts mid-sentence in the recording ("but what we also…"), so its first
 * word is capitalised when the edit puts it after a full stop, or first. After a comma the
 * sentence carries on, as in "…called CTRLbot Mirror, a way to mirror…".
 */
export const captionsFromClips = (
  clips: readonly NarrationClip[],
  words: readonly CaptionWord[],
  corrections?: Record<string, string>,
): CaptionWord[] =>
  [...clips]
    .sort((a, b) => a.at - b.at)
    .flatMap((clip) => {
      const rate = clip.playbackRate ?? 1;
      const place = (sourceMs: number) => (clip.at + (sourceMs / 1000 - clip.sourceStart) / rate) * 1000;
      const clipStartMs = clip.at * 1000;
      const clipEndMs = place(clip.sourceEnd * 1000);
      const clipWords = words.filter((word) => {
        const middle = (word.startMs + word.endMs) / 2000;
        return middle >= clip.sourceStart && middle <= clip.sourceEnd;
      });
      const kept: Array<CaptionWord & {first: boolean}> = [];
      for (const word of clipWords) {
        const text = correctWord(word.text, corrections);
        if (text === null) continue;
        kept.push({
          first: kept.length === 0,
          text,
          startMs: Math.max(clipStartMs, place(word.startMs)),
          endMs: Math.min(clipEndMs, place(word.endMs)),
          timestampMs: word.timestampMs === null ? null : place(word.timestampMs),
          confidence: word.confidence,
        });
      }
      return kept;
    })
    .map(({first, ...word}, index, all) =>
      first && (index === 0 || ENDS_SENTENCE.test(all[index - 1].text.trim()))
        ? {...word, text: capitalise(word.text)}
        : word,
    );

const ENDS_SENTENCE = /[.?!]["')\]]*$/;
const ENDS_CLAUSE = /[.?!,;:]["')\]]*$/;

/** One caption on screen: a few words, shown from the first word's start. */
export type CaptionPage = {startMs: number; words: CaptionWord[]};

/**
 * Captions as pages of at most `maxWords`, broken where the voice and the sentence break.
 *
 * Words are split into phrases at every pause longer than `gapMs` and after every comma or
 * full stop, and each phrase is cut into near-equal pages — so ten words at six a page
 * read 5/5, never 6/4 across the comma, and thirteen read 5/5/3, never 6/6/1. A lone word
 * left between two breaks ("…come in and · record it as video") is not a caption: it
 * joins the phrase it leads into, or, if it closes a clause, the one it finishes.
 */
export const captionPages = (words: readonly CaptionWord[], maxWords: number, gapMs = 350): CaptionPage[] => {
  const runs: CaptionWord[][] = [];
  for (const word of words) {
    const current = runs[runs.length - 1];
    const last = current?.[current.length - 1];
    if (last && word.startMs - last.endMs <= gapMs && !ENDS_CLAUSE.test(last.text.trim())) current.push(word);
    else runs.push([word]);
  }

  const joined: CaptionWord[][] = [];
  for (let index = 0; index < runs.length; index += 1) {
    const run = runs[index];
    const next = runs[index + 1];
    const previous = joined[joined.length - 1];
    if (run.length === 1 && next && !ENDS_CLAUSE.test(run[0].text.trim()) && next[0].startMs - run[0].endMs < 1500) {
      next.unshift(run[0]);
      continue;
    }
    if (run.length === 1 && previous && run[0].startMs - previous[previous.length - 1].endMs < 1500) {
      previous.push(run[0]);
      continue;
    }
    joined.push(run);
  }

  return joined.flatMap((run) => {
    const count = Math.ceil(run.length / maxWords);
    const size = Math.ceil(run.length / count);
    const pages: CaptionPage[] = [];
    for (let start = 0; start < run.length; start += size) {
      const pageWords = run.slice(start, start + size);
      pages.push({startMs: pageWords[0].startMs, words: pageWords});
    }
    return pages;
  });
};
