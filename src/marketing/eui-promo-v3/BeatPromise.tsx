import React from 'react';
import {MasterControlCard} from '../eui-promo/MasterControlCard';
import type {BeatProps} from './euiPromoData';

export const BeatPromise: React.FC<BeatProps> = ({frames}) => (
  <MasterControlCard
    frames={frames}
    eyebrow="End User Interface"
    line="Anyone can walk up and *run the room.*"
  />
);
