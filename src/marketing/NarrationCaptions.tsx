// Burned-in captions for a narrated walkthrough's portrait render.
//
// The same treatment as a short's (src/shorts/Short.tsx): a few words at a time, the word
// being spoken in the accent. Feeds autoplay muted and platform auto-captions misspell
// CTRLbot, so the portrait cut carries its own. The landscape cut does not — YouTube takes
// the .srt from `npm run narration:srt`, and the frame is kept for the step text.

import {createTikTokStyleCaptions} from '@remotion/captions';
import {useMemo} from 'react';
import {Interactive, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {color, font} from '../design/theme';
import {splitAtPauses, type CaptionWord} from '../shorts/shortsData';

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
  const pages = useMemo(
    () =>
      splitAtPauses(captions).flatMap(
        (run) => createTikTokStyleCaptions({captions: run, combineTokensWithinMilliseconds: 1200}).pages,
      ),
    [captions],
  );
  const nowMs = (frame / fps) * 1000;

  return (
    <>
      {pages.map((page, index) => {
        const from = Math.round((page.startMs / 1000) * fps);
        const nextStart = pages[index + 1]?.startMs ?? Infinity;
        const lastWord = page.tokens[page.tokens.length - 1]?.toMs ?? page.startMs + page.durationMs;
        const until = Math.min(nextStart, lastWord + 350);
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
                {page.tokens.map((token, i) => (
                  <span key={i} style={{color: nowMs >= token.fromMs && nowMs < token.toMs ? color.accent : color.text}}>
                    {token.text}
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
