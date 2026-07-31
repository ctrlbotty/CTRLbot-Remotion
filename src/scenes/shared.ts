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

/**
 * How much of a 1920-wide frame is left clear by the landscape copy card.
 *
 * The card is pinned `right: 72` at `maxWidth: 580`, so it owns everything past this
 * point. Anything the viewer has to read — field text, a label, a question — must land
 * to the left of it.
 */
export const CARD_CLEAR_X = 1920 - 72 - 580;

/**
 * A wide landscape shot: a real push, but wide enough that centred content still clears
 * the copy card.
 *
 * This exists because `closeShotWidth('tablet')` is unusable on any surface that centres
 * its own content. At 0.52 the camera is at ~2.4x, and `clampToContent` will not let the
 * frame slide far enough right to move a centred control out from under the card — the
 * content plane runs out first. Reach for this on centred surfaces (CTRLbot AI, the
 * catalog list) and keep 0.52 for genuinely small controls near an edge, where the clamp
 * works *for* you.
 */
export const wideShotWidth = 0.86;

/**
 * Scene lengths in frames at 30fps. The seven scenes total 3720 frames; subtract the
 * six 20-frame overlaps and both full cuts land at exactly 3600 frames / 2:00.
 */
export const SCENE_FRAMES = {
  open: 210,
  ctrlbot: 420,
  device: 600,
  connect: 740,
  buildRoom: 520,
  euiHandoff: 1020,
  close: 210,
} as const;

/** Cross-fade length between scenes. */
export const TRANSITION_FRAMES = 20;
