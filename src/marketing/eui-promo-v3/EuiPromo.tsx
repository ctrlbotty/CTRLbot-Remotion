import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {color} from '../../design/theme';
import {EUI_PROMO_BEATS, type EuiPromoCut} from './euiPromoData';
import {PromoPreload} from '../eui-promo/PromoPreload';

export type EuiPromoProps = {
  cut?: EuiPromoCut;
};

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
      <PromoPreload />

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
