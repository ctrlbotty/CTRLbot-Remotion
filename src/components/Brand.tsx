import type {CSSProperties} from 'react';
import {palette, typography} from '../design/theme';

export const CtrlbotMark = ({
  size = 64,
  color = palette.white,
  accent = palette.blue,
  style,
}: {
  size?: number;
  color?: string;
  accent?: string;
  style?: CSSProperties;
}) => (
  <svg
    viewBox="0 0 152 151.131"
    width={size}
    height={size}
    style={{display: 'block', ...style}}
  >
    <path fill={accent} d="M107.634 129.034c.241-1.598.366-3.234.366-4.9 0-17.95-14.547-32.499-32.496-32.499S43 106.184 43 124.134c0 1.547.108 3.068.317 4.558L75.5 142.235l32.134-13.201Z" />
    <path fill={color} d="M55.719 151.043H0v-34.148l68.177 28.884Zm96.281-34.438v34.526H70.5Z" />
    <path fill={color} d="m1.021 110.565 25.438 10.614 11.115-8.488-1.801-13.874-12.746-5.319 1.393 6.965 5.799 2.594.889 6.943-5.545 4.252-19.209-7.973Zm21.689-17.002.473 7.047-4.979 4.006.74 5.7-6.46-2.775-.742-5.601Zm126.864 17.002-25.439 10.614-11.114-8.488 1.8-13.874 12.746-5.319-1.393 6.965-5.798 2.594-.89 6.943 5.545 4.252 19.209-7.973Zm-21.689-17.002-.473 7.047 4.979 4.006-.741 5.7 6.46-2.775.744-5.601Z" />
    <path fill={color} fillRule="evenodd" d="M110.374 0H40.499C37.78 0 35.56 1.876 35.56 4.188v71.398c0 2.315 2.22 4.182 4.939 4.182h69.875c2.756 0 4.955-1.867 4.955-4.182V4.188c0-2.312-2.199-4.188-4.955-4.188ZM75.491 75.889a7.938 7.938 0 1 0 0-15.877 7.938 7.938 0 0 0 0 15.877Zm31.878-23.371c0 1.95-2.081 3.528-4.682 3.528H48.289c-2.597 0-4.684-1.578-4.684-3.528V11.533c0-1.941 2.087-3.517 4.684-3.517h54.398c2.601 0 4.682 1.576 4.682 3.517v40.985Z" />
    <circle cx="59" cy="31" r="7" fill={accent} />
    <circle cx="92" cy="31" r="7" fill={accent} />
  </svg>
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
    <CtrlbotMark size={compact ? 38 : 66} color={color} accent={accent} />
    <div
      style={{
        fontFamily: typography.display,
        fontSize: compact ? 24 : 48,
        fontWeight: 900,
        letterSpacing: compact ? 0.5 : 1,
        lineHeight: 1,
        color,
      }}
    >
      CTRL<span style={{color: accent}}>bot</span>
    </div>
  </div>
);
