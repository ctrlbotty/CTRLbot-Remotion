// Conventions shared by the first-run scenes.

import {PHONE_VIEWPORT} from '../app-ui/PhoneEui';
import {TABLET_VIEWPORT} from '../app-ui/TabletEui';

export type Device = 'phone' | 'tablet';

export const viewportFor = (device: Device) =>
  device === 'phone' ? PHONE_VIEWPORT : TABLET_VIEWPORT;

/**
 * Where a scene's copy sits.
 *
 * Portrait has no spare margin beside a full-bleed UI, so copy overlays as a scrim.
 * Landscape has real width to give, so it takes the card treatment on the right and
 * leaves the interface uncovered.
 */
export const copySideFor = (device: Device): 'bottom' | 'right' =>
  device === 'phone' ? 'bottom' : 'right';

/**
 * Fraction of the content width a "close" shot frames.
 *
 * Landscape can afford a much tighter push because width is not the binding
 * dimension there; portrait would crop the interface at the same value.
 */
export const closeShotWidth = (device: Device) =>
  device === 'phone' ? 0.78 : 0.52;

/** Scene lengths in frames at 30fps. Kept together so the cut is readable at a glance. */
export const SCENE_FRAMES = {
  open: 300,
  ctrlbot: 440,
  device: 620,
  connect: 600,
  buildRoom: 540,
  euiHandoff: 780,
  close: 300,
} as const;

/** Cross-fade length between scenes. */
export const TRANSITION_FRAMES = 20;
