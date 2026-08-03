import React from 'react';
import {MasterControlCard} from './MasterControlCard';

export const BeatPromise: React.FC<{frames: number}> = ({frames}) => {
  return (
    <MasterControlCard
      frames={frames}
      eyebrow="END USER INTERFACE"
      line="Anyone can walk up and run the room."
    />
  );
};
