// The cut. Two of them, from one beat list.
//
// Hard cuts, never TransitionSeries: an overlapping transition makes the composition
// shorter than the sum of its beats, and every contact-sheet frame number is derived
// from the brief's beat table — so an overlap would sample each beat in the wrong
// place while still reporting success.
//
// The 30 is `master` minus two beats, not `master` at double speed. See EUI_PROMO_BEATS.

import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {color} from '../../design/theme';
import {EUI_PROMO_BEATS, type EuiPromoCut} from './euiPromoData';

export type EuiPromoProps = {
  cut?: EuiPromoCut;
};

/** The beats a cut actually contains, with the length each one runs at. */
export const beatsFor = (cut: EuiPromoCut) =>
  EUI_PROMO_BEATS.flatMap((beat) => {
    const frames = cut === 'master' ? beat.masterFrames : beat.playFrames;
    return frames === null ? [] : [{...beat, frames}];
  });

export const euiPromoDuration = (cut: EuiPromoCut = 'master'): number =>
  beatsFor(cut).reduce((total, beat) => total + beat.frames, 0);

export const EuiPromo: React.FC<EuiPromoProps> = ({cut = 'master'}) => {
  let from = 0;

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      {beatsFor(cut).map((beat) => {
        const start = from;
        from += beat.frames;
        const Component = beat.component;

        return (
          <Sequence
            key={beat.id}
            from={start}
            durationInFrames={beat.frames}
            layout="none"
            name={`Beat: ${beat.id}`}
          >
            <Component frames={beat.frames} cut={cut} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
