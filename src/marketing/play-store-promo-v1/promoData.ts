// The routing state the promo demonstrates, shared so the beats stay continuous.
//
// The cut escalates rather than resetting: the room opens already running on Input 1,
// one display is moved to Input 3, then every display follows. Each beat therefore has
// to start where the previous one ended, and that is only reliable if the states are
// declared once instead of retyped per scene.

import {centerOf, frameWidth, type Region} from '../../camera/Camera';

/**
 * The house camera move for the Stage format.
 *
 * Measured against the two reference cuts, a locked-camera version of this promo showed
 * fewer visible events per second than the slop it replaces — 0.39/s against 0.54/s,
 * where the approved First-Run tablet cut runs 1.66/s. The gap is not content; it is
 * that First-Run keeps a camera moving and this did not. A cut of held shots reads as a
 * slideshow however good each shot is.
 *
 * 0.94 is as far as an aspect-matched panel can be pushed before the corner controls
 * start to go: it trims roughly 38dp horizontally and 24dp vertically, which the 90dp
 * header absorbs. Anything tighter clips the exit and power icons.
 */
export const DRIFT = 0.94;

export const drift = (
  viewport: {width: number; height: number},
  region: Region,
): Region => frameWidth(centerOf(region), viewport.width * DRIFT);

export const PROMO_INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

/** Four outputs, all on the same source. */
export const allOn = (source: string) =>
  [0, 1, 2, 3].map((index) => ({label: `Output ${index + 1}`, source}));

/** Four outputs on `source`, except `index`, which is on `other`. */
export const allOnExcept = (source: string, index: number, other: string) =>
  [0, 1, 2, 3].map((cell) => ({
    label: `Output ${cell + 1}`,
    source: cell === index ? other : source,
  }));

/** Index into PROMO_INPUTS. Input 1 opens the room; Input 3 is what it switches to. */
export const OPENING_INPUT = 0;
export const SWITCHED_INPUT = 2;
