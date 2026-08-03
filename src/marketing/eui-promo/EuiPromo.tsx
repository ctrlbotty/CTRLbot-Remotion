import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {color} from '../../design/theme';
import {EUI_PROMO_BEATS} from './euiPromoData';

export type EuiPromoProps = {
  cut?: 'master' | 'play';
};

export const euiPromoDuration = (cut: 'master' | 'play' = 'master'): number => {
  return EUI_PROMO_BEATS.reduce(
    (acc, beat) => acc + (cut === 'master' ? beat.masterFrames : beat.playFrames),
    0,
  );
};

export const EuiPromo: React.FC<EuiPromoProps> = ({cut = 'master'}) => {
  let accumulatedFrom = 0;

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      {EUI_PROMO_BEATS.map((beat) => {
        const durationInFrames = cut === 'master' ? beat.masterFrames : beat.playFrames;
        const from = accumulatedFrom;
        accumulatedFrom += durationInFrames;

        const Component = beat.component;

        return (
          <Sequence
            key={beat.id}
            from={from}
            durationInFrames={durationInFrames}
            layout="none"
            name={`Beat: ${beat.id}`}
          >
            <Component frames={durationInFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
