// The ctrlbot.io panel loops.
//
// Three ten-second media cells for the site's unit wall, and one rule the promo cuts do
// not have to keep: **frame 0 and the frame after the last one must be the same
// picture.** A `<video loop>` wraps with no dissolve and no gap, so anything still
// somewhere new at t=1 — an output holding a source it did not open on, a raised volume
// bar, a gradient that drifted one way and stopped — reads as a jump cut every ten
// seconds, forever, next to a paragraph somebody is trying to read.
//
// That is what shapes these timelines, and it is the whole difference between this
// folder and `../eui-promo-v3`. A promo beat is an arc: it opens cold, demonstrates, and
// lands somewhere it did not start, which is right for a cut watched once. A loop is a
// cycle. It ends on the state it opened with and the demonstration happens in between.
//
// Two consequences worth stating, because both look like mistakes:
//
//   - **These loops open warm.** The promo's route beat starts with nothing selected,
//     because a cold panel makes the first tap land. Here that cold state would have to
//     be returned to at t=1, and "the user un-selects everything and walks away" is not
//     a thing that happens in a room. So the loops open already routed and change what
//     is routed, which is both cyclical and the truer picture of a panel in use.
//   - **Every ramp ends flat.** Value matching alone is not enough at the seam: if the
//     volume bar is still climbing at t=1 and static at t=0, the picture matches and the
//     motion does not. Easings on the closing segment of each cycle settle to zero.

import {Easing, interpolate} from 'remotion';
import {background} from '../../design/theme';

/**
 * Geometry and length, shared by all three.
 *
 * **The frame is 16:10, and that is a legibility decision rather than a taste one.** The
 * app surface is 1280x800, so in a 16:9 frame an aspect-matched panel can only ever be
 * as wide as the frame's *height* allows — the first cut of these loops carried a 1120px
 * screen inside 1920, spending 42% of the frame on gradient either side of it. Matching
 * the frame to the surface lets the same panel be 1376px wide at its widest and 1728px
 * at its closest, which is 23% to 54% more pixels across the interface before a single
 * encoder setting changes. Text in the panel was soft because it was small, not because
 * it was compressed.
 *
 * `ROADMAP.md` reaches the same conclusion for the tablet training cut, and for the same
 * reason. 1920x1200 is exactly 1.5x the viewport.
 */
export const WEB_LOOP = {
  /** 10s at 30fps. `WEBSITE_PANEL_LOOP.duration.target`. */
  frames: 300,
  /** 16:10, matching the surface. See above. */
  width: 1920,
  height: 1200,
  /** Panel screen height at the two ends of the push. */
  panelWide: 860,
  panelClose: 1080,
  bezel: 22,
} as const;

/**
 * The push, as panel height in frame pixels.
 *
 * The whole panel scales — device, bezel and screen together — rather than a camera
 * moving inside a fixed panel. Both were available and this is the one the loop wants:
 * a camera push crops the surface, and at this size the first thing it crops is the
 * power control and the exit wrench in the two top corners, which are the controls a
 * viewer is most likely to be looking for. Scaling the panel keeps every pixel of the
 * interface on screen and still reads as moving closer to it.
 *
 * It comes back out. The obvious shape — push in, cut back to wide, repeat — puts the
 * single biggest jump in the loop exactly on the seam, which is the one place a
 * `<video loop>` cannot hide it. So the move eases back to the opening framing instead.
 *
 * And it **finishes early, at 0.97, not at 1.0.** Landing the pull-back exactly on the
 * final frame is not the same as having landed: on an ease-out the last frame is still
 * a fraction of a pixel from home, and a fraction of a pixel of panel scale moves every
 * edge in the interface at once. Measured on the route loop, which carries the largest
 * smooth gradient of the three, that alone was a seam of 3.91 against a median step of
 * 0.22 — under the gate's ceiling but eighteen times an ordinary frame, and the biggest
 * single change in the quiet part of the loop. Holding still for the last nine frames
 * costs nothing and makes the wrap exact.
 */
export const loopPanelHeight = (t: number): number =>
  interpolate(t, [0, 0.72, 0.86, 0.97], [WEB_LOOP.panelWide, WEB_LOOP.panelClose, WEB_LOOP.panelClose, WEB_LOOP.panelWide], {
    // Ease in AND out — not the house `bezier(0.16, 1, 0.3, 1)`, which every other
    // easing in this repo uses. That one is an ease-*out*: it leaves at full speed and
    // settles slowly, which is right for a thing entering a shot and wrong for the
    // first frame of a loop. It made the push start at its fastest exactly where the
    // video wraps, so the panel sat still and then lurched, ten seconds apart, forever.
    // Measured on the matrix loop, the first two frames differed fifty times more than
    // an ordinary mid-loop pair. Both ends need zero velocity here because both ends
    // are the same instant.
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * A 0 → 1 → 0 traverse over one cycle, flat at both ends.
 *
 * Cosine rather than a ping-ponged `interpolate` because the seam needs matching
 * velocity, not just a matching value, and cos is the cheapest curve whose derivative is
 * zero at both ends. Used for anything that has to leave and come back.
 */
export const wave = (t: number) => 0.5 - 0.5 * Math.cos(2 * Math.PI * t);

/**
 * The stage glow, drifting out and back.
 *
 * Same two endpoints the promo drifts between, traversed as a cycle instead of a ramp.
 * The movement is what keeps a held panel from reading as a still — at this size it is
 * the only thing moving for seconds at a time — and it is why the loops do not need a
 * camera move they cannot afford. An aspect-matched panel cannot be pushed into.
 */
export const loopBg = (t: number) => background.promo(72 - 12 * wave(t), 26 + 14 * wave(t));

/**
 * The copy beside each loop — which is not rendered into the video.
 *
 * It lives here anyway, and that is the point. On ctrlbot.io the words are HTML in the
 * text cell next to the media cell, so they stay selectable, indexed, responsive and
 * theme-aware; but the moment they change *at* has to agree with what the panel is
 * doing, and a timing copied by hand into another repository is a timing that drifts the
 * first time a beat is retimed here.
 *
 * `npm run loop:copy` writes this out as JSON for the site to consume, so there is one
 * definition and the site reads it rather than restating it. Same reason `destinations.ts`
 * is import-free and shared with the linter.
 *
 * `at` is a fraction of the loop, on the same 0..1 clock as every state function above.
 * Words in *asterisks* are set in CTRLbot blue, exactly as `PromoCopy` does it — that
 * marker is the shared convention between the promo and the site, not a per-file idea.
 */
export type LoopBeat = {
  /** 0..1 within the loop. The fraction the block starts arriving on. */
  at: number;
  eyebrow: string;
  /** Audiowide. A headline, not a sentence. */
  title: string;
  /** Words in *asterisks* are CTRLbot blue. */
  body: string;
};

export const LOOP_COPY: Record<string, LoopBeat[]> = {
  route: [
    {
      at: 0,
      eyebrow: 'Many-to-One',
      title: 'Choose a source',
      body: 'Pick a source and the display takes it *in the same moment.*',
    },
    {
      at: 0.5,
      eyebrow: 'Many-to-One',
      title: 'One tap, every time',
      body: 'No menu, and no mode to be in first. The label is the one *set during configuration.*',
    },
  ],
  matrix: [
    {
      at: 0,
      eyebrow: 'Many-to-Many',
      title: 'Select, then send',
      body: 'Choosing a source does not move it. Pick the source, *then the screens that get it.*',
    },
    {
      at: 0.58,
      eyebrow: 'Many-to-Many',
      title: 'Or all of them',
      body: 'Every output holds its own source until you change it — or All sends one *everywhere at once.*',
    },
  ],
  audio: [
    {
      at: 0,
      eyebrow: 'Room audio',
      title: 'Control the speakers in the room',
      body: 'Easily adjust the volume by *sliding the bar.*',
    },
    {
      at: 0.6,
      eyebrow: 'Room audio',
      title: 'And mute',
      body: 'One press toggles the room on and off, with the routing behind it *completely untouched.*',
    },
  ],
};

/** The four sources, as every EUI surface in this repo labels them. */
export const EUI_INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

/** Volume the routing loops sit at, so the audio strip is never at an odd value. */
export const RESTING_VOLUME = 0.58;

// ── route: Many-to-One ───────────────────────────────────────────────────────────────
//
// Input 1 → 2 → 3 → back to 1. Three taps, evenly spaced, and the third one is what
// closes the cycle: it lands on the source the loop opened with, so the last third of
// the loop and the first third are the same picture.

export const ROUTE_TAPS = [
  {at: 0.22, input: 1},
  {at: 0.55, input: 2},
  {at: 0.88, input: 0},
] as const;

/** Index into `EUI_INPUTS`. Never null — see the note on opening warm. */
export const routeSelection = (t: number): number =>
  t >= 0.88 ? 0 : t >= 0.55 ? 2 : t >= 0.22 ? 1 : 0;

// ── matrix: Many-to-Many ─────────────────────────────────────────────────────────────
//
// The one thing about this surface that is not obvious from a screenshot: selecting a
// source does not route it. You select, then you choose which outputs take it. So the
// loop selects Input 3, gives it to two of the four outputs one at a time — which is
// what shows the other two holding Input 1 on their own — then selects Input 1 and
// presses All, which puts every output back where the loop opened.

export const MATRIX_TAPS = [
  {at: 0.14, target: 'input-3'},
  {at: 0.3, target: 'output-2'},
  {at: 0.46, target: 'output-4'},
  {at: 0.66, target: 'input-1'},
  {at: 0.8, target: 'all'},
] as const;

/** Input 3 (index 2) while the outputs are being assigned; Input 1 (0) either side. */
export const matrixSelection = (t: number): number => (t >= 0.14 && t < 0.66 ? 2 : 0);

/** Output 2 takes Input 3 at 0.30 and Output 4 at 0.46; All returns every one at 0.80. */
export const matrixOutputs = (t: number) =>
  [0, 1, 2, 3].map((index) => ({
    label: `Output ${index + 1}`,
    source:
      t < 0.8 && ((index === 1 && t >= 0.3) || (index === 3 && t >= 0.46))
        ? 'Input 3'
        : 'Input 1',
  }));

// ── audio ────────────────────────────────────────────────────────────────────────────
//
// Up, down, muted, back. The routing underneath never changes, which is the point of the
// beat this is derived from: room volume is on the same screen as the switching, not
// behind a second remote.

export const AUDIO_MUTE_AT = 0.62;
export const AUDIO_UNMUTE_AT = 0.8;

/** The level the room was at when it was muted, and the level it comes back to. */
const AUDIO_BEFORE_MUTE = 0.34;

/**
 * 0..1. Slide up, slide down, mute to silence, unmute back to where it was.
 *
 * **Mute takes the gauge to zero and unmute restores the previous level**, which is the
 * app's behaviour and not a dramatisation of it: `RemoteViewModel` keeps a
 * `lastVolumeBeforeMute` per device for exactly this, and `getLastVolumeBeforeMute` is
 * what the level comes back from. Showing the bar hold its position through a mute would
 * be the invention.
 *
 * The drop and the recovery are fast — four frames either side of the tap — because a
 * mute is a state change, not a fade. Everything else is a slide.
 *
 * Opens and closes at `RESTING_VOLUME` with the closing ramp settling flat, so the loop
 * wraps on a still frame. See the header of this file.
 */
export const audioVolume = (t: number): number =>
  interpolate(
    t,
    [0, 0.1, 0.32, 0.42, 0.55, AUDIO_MUTE_AT, 0.655, AUDIO_UNMUTE_AT, 0.835, 0.97, 1],
    [
      RESTING_VOLUME,
      RESTING_VOLUME,
      0.86,
      0.86,
      AUDIO_BEFORE_MUTE,
      AUDIO_BEFORE_MUTE,
      0, //                      muted: the gauge goes to silence
      0, //                      and stays there until the second tap
      AUDIO_BEFORE_MUTE, //      unmuted: straight back to where it was
      RESTING_VOLUME,
      RESTING_VOLUME,
    ],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

export const audioMuted = (t: number): boolean => t >= AUDIO_MUTE_AT && t < AUDIO_UNMUTE_AT;

/** Outputs the audio loop holds behind the volume strip. Static, deliberately. */
export const AUDIO_OUTPUTS = [0, 1, 2, 3].map((index) => ({
  label: `Output ${index + 1}`,
  source: 'Input 3',
}));
