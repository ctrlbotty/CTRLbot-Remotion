// The Play Store preview cut — v1, archived 2026-08-02.
//
// Kept whole and still renderable as `V1-Play-Store-Promo`. It is the first cut produced
// through the video assembly line, and the run that taught the workflow most of what it
// knows: the poster-frame gate, the 0.94 push limit on an aspect-matched panel, and the
// measurement showing a locked-camera cut is less active than the slop it replaces.
//
// The brief that produced it is videos/archive/2026-08-02-play-store-promo.md.
// A fresh run writes new files; do not edit these to make the next version.
//
// Final gate results: 26s, 42% inert (ceiling 60%), lint 0 errors, poster composed.
//
// Hard cuts, not TransitionSeries. Overlapping transitions make the composition shorter
// than the sum of its beats, and the contact sheet derives every still's frame number
// from the beats table in videos/play-store-promo.md — so an overlap would sample each
// beat in the wrong place while still reporting success. Plain <Sequence> keeps frame
// arithmetic exact by construction, and a 26-second promo wants hard cuts anyway.
//
// PROMO_BEATS is the single source for both the cut and the registered duration. The
// First-Run cut was shipped once with every scene truncated to half its length because
// the same numbers lived in two places; one definition is worth more than convenience.

import {AbsoluteFill, Sequence} from 'remotion';
import {PromoAll} from './PromoAll';
import {PromoAudio} from './PromoAudio';
import {PromoBoth} from './PromoBoth';
import {PromoClose} from './PromoClose';
import {PromoPower} from './PromoPower';
import {PromoPromise} from './PromoPromise';
import {PromoRoute} from './PromoRoute';
import {color} from '../../design/theme';

/** Beat lengths in frames at 30fps. Must match the beats table in the brief. */
export const PROMO_BEATS = [
  {id: 'promise', frames: 105, component: PromoPromise},
  {id: 'route', frames: 120, component: PromoRoute},
  {id: 'all', frames: 105, component: PromoAll},
  {id: 'audio', frames: 135, component: PromoAudio},
  {id: 'power', frames: 135, component: PromoPower},
  {id: 'both', frames: 120, component: PromoBoth},
  {id: 'close', frames: 60, component: PromoClose},
] as const;

export const promoDuration = () =>
  PROMO_BEATS.reduce((total, beat) => total + beat.frames, 0);

export const PlayStorePromo = () => {
  let from = 0;

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      {PROMO_BEATS.map((beat) => {
        const Beat = beat.component;
        const start = from;
        from += beat.frames;
        return (
          <Sequence key={beat.id} from={start} durationInFrames={beat.frames} name={beat.id}>
            <Beat />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
