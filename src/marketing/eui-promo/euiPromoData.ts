import React from 'react';
import {Easing, interpolate} from 'remotion';
import {centerOf, frameWidth} from '../../camera/Camera';
import {BeatPromise} from './BeatPromise';

export type EuiPromoBeat = {
  id: string;
  masterFrames: number;
  playFrames: number;
  component: React.ComponentType<{frames: number}>;
};

/** Beat definitions array, populated per beat task. */
export const EUI_PROMO_BEATS: EuiPromoBeat[] = [
  {
    id: 'promise',
    masterFrames: 180,
    playFrames: 90,
    component: BeatPromise,
  },
];

/**
 * Measured camera push ceiling for an aspect-matched panel on landscape.
 */
export const promoDrift = (viewport: {width: number; height: number}) =>
  frameWidth(
    centerOf({x: 0, y: 0, width: viewport.width, height: viewport.height}),
    viewport.width * 0.94,
  );

/** Route selection (Many-to-One): null until t=0.42, then Input 1 (0). */
export const routeSelection = (t: number): number | null => (t < 0.42 ? null : 0);

/** Matrix input selection: null -> Input 1 (0) at 0.26 -> Input 3 (2) at 0.55. */
export const matrixSelection = (t: number): number | null =>
  t < 0.26 ? null : t < 0.55 ? 0 : 2;

/**
 * Matrix output routing map.
 * Output 2 (index 1 on tablet, 0 on phone) takes Input 1 at t=0.40.
 * All four outputs take Input 3 at t=0.78.
 */
export const matrixOutputs = (t: number, isPhone = false) => {
  const routedOutput = isPhone ? 0 : 1;
  return [0, 1, 2, 3].map((index) => ({
    label: `Output ${index + 1}`,
    source:
      t >= 0.78
        ? 'Input 3'
        : index === routedOutput && t >= 0.40
          ? 'Input 1'
          : null,
  }));
};

/** Four-keyframe volume drag interpolation. */
export const promoVolume = (t: number): number =>
  interpolate(t, [0, 0.1, 0.34, 0.62], [0.55, 0.24, 0.76, 0.58], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Speaker muted state: true at t >= 0.72. */
export const promoMuted = (t: number): boolean => t >= 0.72;

/** Power state derivation for wake and close beats. */
export const powerPhase = (t: number, beat: 'wake' | 'close') => {
  if (beat === 'wake') {
    return t < 0.34 ? 'off' : 'powering-on';
  }
  return t < 0.34 ? 'powering-off' : t < 0.52 ? 'off' : 'card';
};
