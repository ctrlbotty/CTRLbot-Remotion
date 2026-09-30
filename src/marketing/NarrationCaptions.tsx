// Burned-in captions for a narrated walkthrough's portrait render.
//
// The same look as a short's (src/shorts/Short.tsx): a few words at a time, the word
// being spoken in the accent. Feeds autoplay muted and platform auto-captions misspell
// CTRLbot, so the portrait cut carries its own. The landscape cut does not — YouTube takes
// the .srt from `npm run narration:srt`, and the frame is kept for the step text.
//
// Paged by `captionPages`, not by time: a walkthrough's narration keeps its natural pauses,
// and time-based paging left single words ("and") flashing up between them.

import {useMemo} from 'react';
import {Interactive, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {captionPages} from '../audio/narrationCaptions';
import {color, font} from '../design/theme';
import type {CaptionWord} from '../shorts/shortsData';

/** Two lines at 52px across the 868px safe width. */
const WORDS_PER_PAGE = 6;

export const NarrationCaptions = ({
  captions,
  box,
  size,
}: {
  /** Composition-timed words, from `captionsFromClips`. */
  captions: CaptionWord[];
  box: {left: number; top: number; width: number; height: number};
  size: number;
}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const pages = useMemo(() => captionPages(captions, WORDS_PER_PAGE), [captions]);
  const nowMs = (frame / fps) * 1000;

  return (
    <>
      {pages.map((page, index) => {
        const from = Math.round((page.startMs / 1000) * fps);
        const nextStart = pages[index + 1]?.startMs ?? Infinity;
        const until = Math.min(nextStart, page.words[page.words.length - 1].endMs + 350);
        const duration = Math.max(1, Math.round((until / 1000) * fps) - from);
        return (
          <Sequence key={index} from={from} durationInFrames={duration} layout="none" name={`Caption ${index + 1}`}>
            <Interactive.Div
              name="Captions"
              style={{
                position: 'absolute',
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: font.ui,
                fontWeight: 800,
                fontSize: size,
                lineHeight: 1.15,
                color: color.text,
                whiteSpace: 'pre-wrap',
              }}
            >
              <div>
                {page.words.map((word, i) => (
                  <span key={i} style={{color: nowMs >= word.startMs && nowMs < word.endMs ? color.accent : color.text}}>
                    {i === 0 ? word.text.trimStart() : word.text}
                  </span>
                ))}
              </div>
            </Interactive.Div>
          </Sequence>
        );
      })}
    </>
  );
};
