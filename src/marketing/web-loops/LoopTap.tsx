import React from 'react';
import {Sequence} from 'remotion';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf, type Region} from '../../camera/Camera';

/**
 * One tap on a region, placed in the loop's own normalised time.
 *
 * The promo beats compute `from`, `at` and `durationInFrames` by hand at every call site
 * — five of them in `BeatMatrix`, each a rounded multiple of `frames` — which is fine in
 * a cut being tuned interaction by interaction. In a loop a tap is only ever "here, at
 * this fraction of the cycle", so the three derived numbers are three chances for a lead
 * or a trail to drift out of step with the state change it is supposed to explain.
 *
 * `LEAD` and `TRAIL` are that timing, stated once. The ring arrives before the tap
 * because a ring appearing and a state changing in the same frame reads as the ring
 * causing nothing; the trail holds it long enough that the eye can go back to it after
 * the surface has changed underneath.
 */

/** Cycle fraction the ring precedes the tap by. 18 frames at the standard length. */
const LEAD = 0.06;
/** Cycle fraction the ring holds after it. 27 frames. */
const TRAIL = 0.09;

export const LoopTap = ({
  region,
  at,
  frames,
  ring = true,
  name,
}: {
  region: Region;
  /** 0..1 within the loop. The frame the surface changes state on. */
  at: number;
  /** Loop length, so the fraction can be resolved. */
  frames: number;
  /**
   * Defaults on. In a promo the ring is emphasis and using it everywhere would flatten
   * it, but a media cell renders at about half these pixels and the ring is the part of
   * an interaction that survives being scaled down — the ripple alone does not read.
   */
  ring?: boolean;
  name: string;
}) => {
  const from = Math.round(frames * (at - LEAD));
  const duration = Math.round(frames * (LEAD + TRAIL));
  const centre = centerOf(region);

  return (
    <Sequence from={from} durationInFrames={duration} layout="none" name={`Tap: ${name}`}>
      {ring ? (
        <FocusRing region={region} appearAt={0} radius={6} name={`${name} ring`} />
      ) : null}
      <TapIndicator
        x={centre.x}
        y={centre.y}
        at={Math.round(frames * LEAD)}
        name={`${name} tap`}
      />
    </Sequence>
  );
};
