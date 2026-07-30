// The house motion language.
//
// Remotion Studio can only keyframe an `interpolate()` call when its easing and
// output values are written inline as literals. So this file deliberately does NOT
// export easing objects for use inside style props — copy the literal from the
// table below instead, and Studio stays editable.
//
// What this file does export is timing that lives outside style props: frame math
// and scene-structure durations.

import {canvas} from './theme';

/** Seconds to frames at the project fps. */
export const sec = (seconds: number) => Math.round(seconds * canvas.fps);

/**
 * House curves — copy these literals inline into `interpolate()`.
 *
 *   Entrance / settle      Easing.bezier(0.16, 1, 0.3, 1)      expo-out, confident
 *   Exit                   Easing.bezier(0.7, 0, 0.84, 0)      expo-in, gets out of the way
 *   Camera move            Easing.bezier(0.65, 0, 0.35, 1)     symmetric, no snap at either end
 *   Emphasis / pop         Easing.spring({damping: 200})       for scale on a single element
 *   Cross-fade / hold      Easing.linear                       between two steady states
 *
 * A camera move must never use a spring. Springs overshoot, and an overshooting
 * camera on a UI screenshot reads as a wobble rather than a deliberate push-in.
 */
export const CURVES = {
  entrance: 'Easing.bezier(0.16, 1, 0.3, 1)',
  exit: 'Easing.bezier(0.7, 0, 0.84, 0)',
  camera: 'Easing.bezier(0.65, 0, 0.35, 1)',
  emphasis: 'Easing.spring({damping: 200})',
  linear: 'Easing.linear',
} as const;

/**
 * Scene pacing is set explicitly, per scene, as named frame constants at the top of the
 * file (SWITCH_FRAME, SCROLL_START, and so on) and as the shot list's "at" values. There
 * is no shared beat vocabulary, because every scene's rhythm is driven by what the UI is
 * doing rather than by a house tempo. Scene *lengths* live in scenes/shared.ts.
 */
