// Beat 7 — the name, once.
//
// Not BrandCard. That card is laid out for the First-Run frames — 1080x1920 portrait and
// 1920x1200 — and at 16:9 it strands the wordmark in the upper-left quadrant with a dead
// third down the right. Prep specified it, and the brief's evidence line is what actually
// matters: the wordmark and ctrlbot.io. A centred lockup on the same stage background the
// other six beats stand on delivers that and closes the cut on the format it was cut for.
//
// No call to action. Play forbids "Download now" and everything like it in a preview.

import {AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {background, color, font, space, type} from '../../design/theme';

export const PromoClose = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: background.stage,
        alignItems: 'center',
        justifyContent: 'center',
        gap: space(4),
      }}
    >
      <Img
        src={staticFile('brand/cbot_banner_white.png')}
        style={{
          width: 620,
          opacity: interpolate(frame, [0, 16], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 40], [0.97, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <Interactive.Div
        name="Close kicker"
        style={{
          color: color.accent,
          fontFamily: font.mono,
          fontSize: type.label,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [10, 26], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        ctrlbot.io
      </Interactive.Div>
    </AbsoluteFill>
  );
};
