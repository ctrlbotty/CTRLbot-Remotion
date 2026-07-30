// A screen capture, cropped to just the screen and presented at viewport size.
//
// The ingested captures have a stylised device frame baked in — a rounded outline on a
// navy field. That was fine when every scene was a screenshot in a box, but it now sits
// next to live surfaces that render full-bleed, and the mismatch is obvious in a cut.
//
// So captures are cropped to their screen bounds and scaled to the same dp viewport the
// live surfaces use. A capture scene and a live scene then share one coordinate space,
// which means the same <Camera> shot list and the same region constants work across both.

import {Img, staticFile} from 'remotion';
import {PHONE_VIEWPORT} from './PhoneEui';
import {TABLET_VIEWPORT} from './TabletEui';

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
