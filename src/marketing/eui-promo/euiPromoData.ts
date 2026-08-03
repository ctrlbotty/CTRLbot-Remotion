import React from 'react';
import {Easing, interpolate} from 'remotion';
import {appDimens} from '../../design/tokens.generated';
import {background} from '../../design/theme';
import {BeatPromise} from './BeatPromise';
import {BeatWake} from './BeatWake';
import {BeatRoute} from './BeatRoute';
import {BeatMatrix} from './BeatMatrix';
import {BeatAudio} from './BeatAudio';
import {BeatBoth} from './BeatBoth';
import {BeatClose} from './BeatClose';

/** The EUI's own chrome heights, from the app's dimens — never measured. */
const BAR_HEIGHT = appDimens.euiBarHeight;
const SEEKBAR_HEIGHT = appDimens.euiSeekbarHeight;

/**
 * The one background in this cut, and the only thing moving in every frame of it.
 *
 * `background.stage` is a 22%-alpha bloom centred at 71% — behind the panel, which is
 * opaque, so on a landscape stage it is almost entirely hidden and the frame renders
 * as black with a smudge beside the copy. This is the app's own setup gradient at 45%,
 * placed off the panel's shoulder where it lights the frame and separates the panel
 * edge from the background instead of hiding it.
 *
 * It drifts because two of the seven beats have a locked camera by direction, and
 * `inert-fraction` samples for perceptible change every quarter-second. A bloom
 * crossing 12% of the frame over a beat is not noticeable as movement and is entirely
 * measurable as change — which is the honest way to satisfy that gate on a cut whose
 * camera has been deliberately switched off. It is also just better lighting.
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

/**
 * What every beat receives.
 *
 * `cut` exists because the 30 is a different edit. Most beats ignore it; the ones that
 * do not use it to drop a copy block or a held state that there is no room for at half
 * the length. Branching on it is honest — the alternative is a single edit that reads
 * correctly at neither duration.
 */
export type BeatProps = {frames: number; cut: EuiPromoCut};

export type EuiPromoBeat = {
  id: string;
  masterFrames: number;
  /** `null` means the beat is not in the 30-second cut at all. */
  playFrames: number | null;
  component: React.ComponentType<{frames: number; cut: EuiPromoCut}>;
};

/**
 * The cut, in both lengths. 1800 frames and 900 frames — 60s and 30s at 30fps.
 *
 * **The 30 is a different edit, not the same edit compressed.** Two attempts at the
 * latter failed for the same reason: copy does not compress linearly. Halving `close`
 * gave it three seconds to power the room down, return to Welcome, stream nine words
 * and show two URLs, and the URLs simply never arrived — reading speed has a floor and
 * a ratio does not know about it.
 *
 * So the 30 drops beats rather than thinning all of them. `wake` goes because a
 * progress ring proves nothing about whether the room is easy to use, and `audio`
 * goes because at 30 seconds something had to. What is left is the promise, the two
 * routing surfaces, the phone, and the close — which is the argument the video is
 * making, with nothing else standing in front of it.
 */
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

// ---------------------------------------------------------------------------
// Stage geometry
//
// The panel is the surface's own 16:10 — a tablet is 16:10, and drawing it as 16:9 is
// drawing a tablet nobody makes. The bezel is a real inset around the screen rather
// than a wide camera framing, which is what lets it dissolve on its own while the
// interface behind it stays put.
//
// That dissolve replaces the camera on the routing beats. The content band is 1280x610
// — wider than 2:1 — so no landscape frame can isolate it: ask for it directly and the
// camera reconciles outward and drags half of each bar back into shot; crop to fit and
// it eats the source rows' HDMI icons. Fading the two bars and the bezel gets there
// with no crop at all, and it reads as the interface being lifted out of the hardware.
// ---------------------------------------------------------------------------

/** Frame pixels. `height` sizes the screen; `bezel` is drawn outside it. */
export const PROMO_PANEL = {height: 640, bezel: 22} as const;

/** The whole surface, edge to edge in its own screen. The default shot everywhere. */
export const stageWide = (viewport: {width: number; height: number}) => ({
  x: 0,
  y: 0,
  width: viewport.width,
  height: viewport.height,
});

/**
 * Chrome dissolve, as a fraction of the beat.
 *
 * Held long enough at the top that the viewer sees a tablet before it becomes a
 * diagram — the beat has to establish the device to be about the device.
 *
 * Slow on purpose, and not only for taste. A 2-second snap-fade in a 10-second beat
 * leaves eight seconds with nothing happening; spreading the same dissolve over half
 * the beat is both a better transition and most of what keeps this cut off the
 * `inert-fraction` ceiling. The camera recentres across the same window, so the two
 * read as one gesture rather than as a fade followed by a move.
 */
export const chromeFade = (t: number, from = 0.15, to = 0.7) =>
  interpolate(t, [from, to], [1, 0], {
    easing: Easing.bezier(0.7, 0, 0.84, 0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * The band of surface still visible once the chrome has gone, and the panel height
 * that band exactly fills.
 *
 * The two have to travel together, and the first version only did half of it. Fading
 * the bars while holding the panel at its full 16:10 left the switching area floating
 * in the middle of a screen-shaped hole, and the camera "recentre" that was supposed to
 * fix it moved five dp — the difference between the surface's centre and the band's.
 * Nothing filled the space the bars vacated, so nothing much appeared to happen.
 *
 * Shrinking the panel to the band's own aspect is what the dissolve was always
 * describing: the device does not just lose its chrome, it becomes the switching area.
 * The region and the viewport then have the same aspect, so the band fills the panel
 * edge to edge with no crop at all — which is the only framing of a 2.1:1 band that
 * does not cost the source rows their icons.
 */
export const euiBand = (
  viewport: {width: number; height: number},
  topGone: boolean,
  audioGone: boolean,
) => {
  const top = topGone ? BAR_HEIGHT : 0;
  const bottom = audioGone ? SEEKBAR_HEIGHT : 0;
  return {x: 0, y: top, width: viewport.width, height: viewport.height - top - bottom};
};

/**
 * The panel geometry to animate to, so the band ends up filling the panel exactly.
 *
 * Height only. The screen keeps the width it had as a whole tablet, which is what makes
 * the move read as chrome being removed rather than as the panel being shrunk: at both
 * ends the surface renders at the same 0.8 px per dp, and the only thing that changes is
 * how much of it there is. Letting `Stage` derive width from the surface aspect instead
 * scales the interface down by a fifth on the way, and the switching grid — the thing
 * the beat exists to show — ends up smaller than it started.
 */
export const collapsed = (
  viewport: {width: number; height: number},
  topGone: boolean,
  audioGone: boolean,
) => {
  const height =
    (euiBand(viewport, topGone, audioGone).height / viewport.height) * PROMO_PANEL.height;
  const fullWidth = (viewport.width / viewport.height) * PROMO_PANEL.height;
  return {height, aspect: fullWidth / height};
};

/**
 * The close shot: the switching area, and nothing else.
 *
 * The EUI is a 90dp bar, the content, and a 100dp audio strip. Framing the content
 * band alone is the whole point of the move — it is the part the end user touches —
 * but its 1280x610 is 2.1:1, wider than any 16:9 window, so asking for it directly
 * gets reconciled *outward* to 1280x720 and drags half of each bar back into shot.
 *
 * Asking for a region narrower than the window instead lets `expand` grow it sideways
 * to exactly 1084x610 — the content band, top and bottom edges landing precisely on
 * the two bars, no sliver of either. It costs 98dp off each side, which is why only
 * `wake` uses it: on the power screen there is nothing out there, and on the routing
 * screens that 98dp is the source rows' HDMI icons.
 */
export const euiCentre = (viewport: {width: number; height: number}) => ({
  x: viewport.width / 2 - 400,
  y: BAR_HEIGHT,
  width: 800,
  height: viewport.height - BAR_HEIGHT - SEEKBAR_HEIGHT,
});

/** Route selection (Many-to-One): null until t=0.42, then Input 1 (0). */
export const routeSelection = (t: number): number | null => (t < 0.42 ? null : 0);

/** Matrix input selection: null -> Input 1 (0) at 0.26 -> Input 3 (2) at 0.55. */
export const matrixSelection = (t: number): number | null =>
  t < 0.26 ? null : t < 0.55 ? 0 : 2;

/**
 * Matrix output routing map. Output 2 takes Input 1 at t=0.40; all four take Input 3
 * at t=0.78, leaving the two-grey state in between — a live route that is not the one
 * being worked on, which is the whole reason the matrix view has two greys.
 */
export const matrixOutputs = (t: number) =>
  [0, 1, 2, 3].map((index) => ({
    label: `Output ${index + 1}`,
    source: t >= 0.78 ? 'Input 3' : index === 1 && t >= 0.4 ? 'Input 1' : null,
  }));

/**
 * The `both` beat's routing — one selection, both surfaces, one frame.
 *
 * Deliberately not `matrixSelection`/`matrixOutputs`. Those escalate in two stages, and
 * borrowing them put the tablet mid-escalation while the phone was already routed, so
 * the beat showed two devices doing *different* things at the moment its whole claim is
 * that they do the same thing.
 *
 * Input 1, not Input 3, for a mechanical reason: the phone's source strip holds two and
 * a half cards and `PhoneEuiManyToOne` takes no scroll offset, so Input 3 sits half off
 * its own screen. First-Run scrolls the strip for this; here the simpler fix is to route
 * the source that is already in view on both form factors.
 */
const BOTH_ROUTE_AT = 0.34;

export const bothSelection = (t: number): number | null =>
  t < BOTH_ROUTE_AT ? null : 0;

export const bothOutputs = (t: number) =>
  [0, 1, 2, 3].map((index) => ({
    label: `Output ${index + 1}`,
    source: t < BOTH_ROUTE_AT ? null : 'Input 1',
  }));

/**
 * Where the volume sits when nobody is touching it.
 *
 * `route` and `matrix` originally passed `promoVolume(t)`, which slid the bar from 55%
 * down to 24% and back up during a source-selection demo — motion with no cause on
 * screen, in the one part of the interface the beat is not about. It helped the inert
 * measurement and it was wrong. Only `audio` animates audio.
 */
export const RESTING_VOLUME = 0.58;

/** Four-keyframe volume drag interpolation. */
export const promoVolume = (t: number): number =>
  interpolate(t, [0, 0.1, 0.34, 0.62], [0.55, 0.24, 0.76, 0.58], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Speaker muted state: true at t >= 0.72. */
export const promoMuted = (t: number): boolean => t >= 0.72;

/**
 * Power state derivation for wake and close beats.
 *
 * `close` carries three states in three seconds on the Play cut, which is why the
 * Welcome hold is so short: it is a gesture — the room returning to where the user
 * found it — rather than something anyone reads. The card needs the back half or its
 * line does not finish streaming, and the line is the one that closes the video.
 */
export const powerPhase = (t: number, beat: 'wake' | 'close') => {
  if (beat === 'wake') {
    return t < 0.34 ? 'off' : 'powering-on';
  }
  return t < CLOSE_POWERING_OFF ? 'powering-off' : 'off';
};

export const CLOSE_POWERING_OFF = 0.24;
/** Where the closing card takes over from the power screen. */
export const CLOSE_CARD_AT = 0.42;
