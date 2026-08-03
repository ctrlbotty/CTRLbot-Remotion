import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {background, color, font, type} from '../../design/theme';

export type MasterControlCardProps = {
  frames?: number;
  eyebrow?: string;
  line: string;
  kicker?: string;
};

export const MasterControlCard: React.FC<MasterControlCardProps> = ({
  frames = 180,
  eyebrow,
  line,
  kicker,
}) => {
  const frame = useCurrentFrame();

  const gradientX = interpolate(frame, [0, frames], [68, 62], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lockupScale = interpolate(frame, [0, frames], [1.0, 1.03], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color.void,
        backgroundImage: background.promo(gradientX, 32),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 120px',
        color: color.text,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          transform: `scale(${lockupScale})`,
          maxWidth: 1400,
        }}
      >
        {eyebrow && (
          <div
            style={{
              fontFamily: font.mono,
              fontSize: type.caption,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: color.textMuted,
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            marginBottom: 36,
          }}
        >
          <Img
            src={staticFile('brand/ctrlbot_tricon_white.svg')}
            style={{height: 367, width: 'auto'}}
          />
          <div
            style={{
              fontFamily: font.display,
              fontSize: type.display,
              lineHeight: 0.98,
              letterSpacing: 0,
              color: color.text,
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}
          >
            MASTER CONTROL
          </div>
        </div>

        <div
          style={{
            fontFamily: font.ui,
            fontSize: type.subheading,
            lineHeight: 1.3,
            color: color.textMuted,
            maxWidth: 1000,
          }}
        >
          {line}
        </div>

        {kicker && (
          <div
            style={{
              fontFamily: font.mono,
              fontSize: type.body,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: color.accent,
              marginTop: 40,
            }}
          >
            {kicker}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
