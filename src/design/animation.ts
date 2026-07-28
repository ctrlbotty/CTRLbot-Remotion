import {Easing, interpolate} from 'remotion';

export const fade = (
  frame: number,
  durationInFrames: number,
  enter = 14,
  exit = 14,
) =>
  interpolate(
    frame,
    [0, enter, Math.max(enter, durationInFrames - exit), durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    },
  );

export const rise = (frame: number, delay = 0, distance = 36) =>
  interpolate(frame, [delay, delay + 24], [distance, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const reveal = (frame: number, delay = 0, duration = 18) =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const drift = (frame: number, distance = 16, period = 120) =>
  Math.sin((frame / period) * Math.PI * 2) * distance;

export const pulse = (frame: number, period = 45, minimum = 0.45) => {
  const wave = (Math.sin((frame / period) * Math.PI * 2) + 1) / 2;
  return minimum + wave * (1 - minimum);
};

export const progress = (frame: number, durationInFrames: number) =>
  interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
