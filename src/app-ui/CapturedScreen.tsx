// A screen capture, cropped to just the screen and presented at viewport size.
//
// The ingested captures have a stylised device frame baked in — a rounded outline on a
// navy field. That was fine when every scene was a screenshot in a box, but it now sits
// next to live surfaces that render full-bleed, and the mismatch is obvious in a cut.
//
// So captures are cropped to their screen bounds and scaled to the same dp viewport the
// live surfaces use. A capture scene and a live scene then share one coordinate space,
// which means the same <Camera> shot list and the same region constants work across both.
//
// ── The six EUI power captures carry a tone lift. Re-capture and you lose it. ──
//
// `eui-welcome.png`, `eui-power-on.png` and `eui-power-off.png`, in BOTH `captures/phone/`
// and `captures/tablet/`, were lifted in place on 2026-08-07. The app draws that content
// field at #1A1A1A against black bars — a step of 26 luminance. It is legible at full size
// and gone once the frame is scaled into a 1200px tile and encoded at CRF 23: the screen
// reads as one flat black rectangle. The lift takes the field to #2E2E2E, a step of 46,
// which survives the encode. Both device sets are lifted so `CAPTURE_FIELD` is one value.
//
// It is a gamma of 0.75 applied per pixel and weighted off by saturation, so pure black
// stays pure black (the bars do not wash out), white stays white, and anything saturated
// is returned untouched. That last part is the point: a global filter would drag CTRLbot
// blue #008FD4 toward cyan. The green power icon and the blue tap ring are unshifted.
//
// The transform is not idempotent — running it twice double-lifts. If you re-take these
// captures from the app, re-apply it before committing, or the app loop goes flat again.

import {Img, staticFile} from 'remotion';
import {PHONE_VIEWPORT} from './PhoneEui';
import {TABLET_VIEWPORT} from './TabletEui';

/**
 * The EUI content field as it stands in the committed captures, after the lift.
 *
 * Anything drawn on top of a capture to mask something baked into it must use this, not
 * `appColors.gray10` — the app's value, which the raw screenshot had. Both device sets
 * carry `#2E2E2E` uniformly, so one constant covers phone and tablet.
 *
 * Change `GAMMA` in `scripts/lift-captures.py` and this moves with it.
 */
export const CAPTURE_FIELD = '#2E2E2E';

/**
 * Screen bounds inside the captured frame, in source pixels.
 * Every capture in a set shares one frame, so one box per device is enough.
 */
const CROP = {
  phone: {source: {width: 1712, height: 3392}, x: 144, y: 149, width: 1426, height: 3098},
  tablet: {source: {width: 3632, height: 2432}, x: 208, y: 205, width: 3216, height: 2022},
} as const;

export const CapturedScreen = ({
  device,
  src,
}: {
  device: 'phone' | 'tablet';
  /** Path under public/, e.g. "captures/phone/onboarding.png". */
  src: string;
}) => {
  const crop = CROP[device];
  const viewport = device === 'phone' ? PHONE_VIEWPORT : TABLET_VIEWPORT;
  const scale = viewport.width / crop.width;

  return (
    <div
      style={{
        position: 'relative',
        width: viewport.width,
        height: viewport.height,
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      <Img
        name="Capture"
        src={staticFile(src)}
        style={{
          position: 'absolute',
          left: -crop.x * scale,
          top: -crop.y * scale,
          width: crop.source.width * scale,
          height: crop.source.height * scale,
          maxWidth: 'none',
        }}
      />
    </div>
  );
};
