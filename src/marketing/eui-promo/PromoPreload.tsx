// Why the interface strobed for the first six frames of Many-to-One.
//
// Remotion's renderer waits for `<Img>`: it calls delayRender on mount and
// continueRender on load, so a frame containing one is never photographed before the
// pixels are there. It cannot do that for an image referenced from CSS, because there
// is no element to hang the handle on — the browser fetches it whenever it gets to it
// and the frame is captured regardless.
//
// The EUI surfaces are built almost entirely out of CSS images. `bg_eui.png` is the
// backdrop behind the whole switching area, the display panels are `disp_*` bitmaps,
// and `AppIcon` draws every icon as a background or a mask so a single SVG can be
// tinted the way `app:tint` recolors a drawable. None of it is an `<Img>`.
//
// So the first frames of the first beat that mounts one of those surfaces render with
// the backdrop and the panels missing, then they pop in over the next few frames —
// measured at frames 122, 123, 124 and 126 of the 30-second cut, each a luminance
// change two thirds the size of an actual beat cut, alternating with frames that
// showed nothing. It only ever hit the first such beat because by the second the
// browser had everything cached, which is exactly why it looked like a glitch in one
// specific place rather than a systematic problem.
//
// Mounting the same files as real `<Img>` elements for the length of the composition
// puts them back under delayRender: frame 0 waits for all of them, and every CSS
// reference afterwards is served from cache. Hidden, not zero-sized — a display:none
// or zero-dimension image is not guaranteed to be fetched at all.

import {AbsoluteFill, Img, staticFile} from 'remotion';

/**
 * Every asset these beats reach for through CSS rather than through `<Img>`.
 *
 * Kept as an explicit list because it has to be: nothing can derive it, and an asset
 * added to a surface without being added here fails in the one way this file exists to
 * prevent — a few bad frames, in the render only, at whichever beat happens to be first.
 */
const CSS_ASSETS = [
  // Surface backdrops and display panels.
  'app-assets/bg_eui.png',
  'app-assets/disp_m_grey.png',
  'app-assets/disp_m_blue.png',
  'app-assets/disp_lg_grey.png',
  'app-assets/disp_lg_blue.png',
  // AppIcon draws these as a background or a mask, never as an element.
  'app-assets/ic_settings2.svg',
  'app-assets/ic_power.svg',
  'app-assets/ic_hdmi_icon.svg',
  'app-assets/ic_hdmi_icon_sm.svg',
  'app-assets/ic_route5.svg',
  'app-assets/ic_speaker_on.svg',
  'app-assets/ic_speaker_off.svg',
  'app-assets/ic_vol_left.svg',
  'app-assets/ic_vol_right.svg',
  'app-assets/nav_right.svg',
];

export const PromoPreload = () => (
  <AbsoluteFill
    style={{opacity: 0, pointerEvents: 'none', overflow: 'hidden'}}
    aria-hidden
  >
    {CSS_ASSETS.map((asset) => (
      <Img key={asset} src={staticFile(asset)} style={{width: 4, height: 4}} />
    ))}
  </AbsoluteFill>
);
