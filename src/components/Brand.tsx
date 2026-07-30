import type {CSSProperties, ReactNode} from 'react';
import {Img, staticFile} from 'remotion';
import {palette, typography} from '../design/theme';

const ctrlbotIcon = staticFile('brand/ctrlbot-icon-white.png');

export const CtrlbotMark = ({
  size = 64,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) => (
  <Img
    src={ctrlbotIcon}
    width={size}
    height={size}
    style={{display: 'block', objectFit: 'contain', ...style}}
  />
);

export const CtrlbotWordmark = ({
  compact = false,
  color = palette.white,
  accent = palette.blue,
  style,
}: {
  compact?: boolean;
  color?: string;
  accent?: string;
  style?: CSSProperties;
}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: compact ? 12 : 18, ...style}}>
    <CtrlbotMark size={compact ? 38 : 66} />
    <div
      style={{
        fontFamily: typography.brand,
        fontSize: compact ? 24 : 48,
        fontWeight: 400,
        letterSpacing: compact ? 0.25 : 0.5,
        lineHeight: 1,
        color,
      }}
    >
      CTRL<span style={{color: accent}}>bot</span>
    </div>
  </div>
);

export const CtrlbotName = ({
  children = 'CTRLbot',
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) => (
  <span style={{fontFamily: typography.brand, ...style}}>{children}</span>
);
