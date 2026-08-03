import React from 'react';
import {MasterControlCard} from './MasterControlCard';

export const BeatPromise: React.FC<{frames: number}> = ({frames}) => (
  <MasterControlCard
    frames={frames}
    eyebrow="End User Interface"
    line="Anyone can walk up and *run the room.*"
  />
);
