import React from 'react';
import {Easing, interpolate} from 'remotion';
import {background} from '../../design/theme';
import {BeatPromise} from './BeatPromise';
import {BeatWake} from './BeatWake';
import {BeatRoute} from './BeatRoute';
import {BeatMatrix} from './BeatMatrix';
import {BeatAudio} from './BeatAudio';
import {BeatBoth} from './BeatBoth';
import {BeatClose} from './BeatClose';

/**
 * Background glow with anti-banding drift.
 */
export const promoBg = (t: number) =>
  background.promo(
    interpolate(t, [0, 1], [72, 60], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(t, [0, 1], [26, 40], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

export type EuiPromoCut = 'master' | 'play';

export type BeatProps = {frames: number; cut: EuiPromoCut};

export type EuiPromoBeat = {
  id: string;
  masterFrames: number;
  playFrames: number | null;
  component: React.ComponentType<{frames: number; cut: EuiPromoCut}>;
};

export const EUI_PROMO_BEATS: EuiPromoBeat[] = [
  {
    id: 'promise',
    masterFrames: 180,
    playFrames: 120,
    component: BeatPromise,
  },
  {
    id: 'wake',
    masterFrames: 270,
    playFrames: null,
    component: BeatWake,
  },
  {
    id: 'route',
    masterFrames: 300,
    playFrames: 180,
    component: BeatRoute,
  },
  {
    id: 'matrix',
    masterFrames: 420,
    playFrames: 330,
    component: BeatMatrix,
  },
  {
    id: 'audio',
    masterFrames: 240,
    playFrames: null,
    component: BeatAudio,
  },
  {
    id: 'both',
    masterFrames: 210,
    playFrames: 150,
    component: BeatBoth,
  },
  {
    id: 'close',
    masterFrames: 180,
    playFrames: 120,
    component: BeatClose,
  },
];

/** Frame pixels. `height` sizes the screen; `bezel` is drawn outside it. */
export const PROMO_PANEL = {height: 640, bezel: 22} as const;

/** The whole surface, edge to edge in its own screen. */
export const stageWide = (viewport: {width: number; height: number}) => ({
  x: 0,
  y: 0,
  width: viewport.width,
  height: viewport.height,
});

/** Close shot for wake/close power screens. */
export const euiCentre = (viewport: {width: number; height: number}) => ({
  x: viewport.width / 2 - 400,
  y: 90,
  width: 800,
  height: viewport.height - 90 - 100,
});

/** Route selection (Many-to-One): null until t=0.42, then Input 1 (0). */
export const routeSelection = (t: number): number | null => (t < 0.42 ? null : 0);

/** Matrix input selection: null -> Input 1 (0) at 0.26 -> Input 3 (2) at 0.55. */
export const matrixSelection = (t: number): number | null =>
  t < 0.26 ? null : t < 0.55 ? 0 : 2;

/**
 * Matrix output routing map. Output 2 takes Input 1 at t=0.40; all four take Input 3
 * at t=0.78.
 */
export const matrixOutputs = (t: number) =>
  [0, 1, 2, 3].map((index) => ({
    label: `Output ${index + 1}`,
    source: t >= 0.78 ? 'Input 3' : index === 1 && t >= 0.4 ? 'Input 1' : null,
  }));

export const bothSelection = (t: number): number | null =>
  t < 0.32 ? null : t < 0.65 ? 0 : 1;

export const bothOutputs = (t: number) =>
  [0, 1, 2, 3].map((index) => ({
    label: `Output ${index + 1}`,
    source: t < 0.32 ? null : t < 0.65 ? 'Input 1' : 'Input 2',
  }));

export const RESTING_VOLUME = 0.58;
export const AUDIO_MUTE_AT = 0.58;
export const AUDIO_UNMUTE_AT = 0.80;

export const promoMuted = (t: number): boolean => t >= AUDIO_MUTE_AT && t < AUDIO_UNMUTE_AT;

export const promoVolume = (t: number): number => {
  if (t < AUDIO_MUTE_AT) {
    return interpolate(
      t,
      [0, 0.12, 0.32, 0.48],
      [0.55, 0.20, 0.95, RESTING_VOLUME],
      {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );
  }
  if (t < AUDIO_UNMUTE_AT) {
    return interpolate(
      t,
      [AUDIO_MUTE_AT, AUDIO_MUTE_AT + 0.05],
      [RESTING_VOLUME, 0],
      {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );
  }
  return interpolate(
    t,
    [AUDIO_UNMUTE_AT, AUDIO_UNMUTE_AT + 0.07, 1],
    [0, RESTING_VOLUME, RESTING_VOLUME],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
};

export const powerPhase = (t: number, beat: 'wake' | 'close') => {
  if (beat === 'wake') {
    return t < 0.34 ? 'off' : 'powering-on';
  }
  return t < CLOSE_POWERING_OFF ? 'powering-off' : 'off';
};

export const CLOSE_POWERING_OFF = 0.24;
export const CLOSE_CARD_AT = 0.42;
