import type {CSSProperties, ReactNode} from 'react';
import {palette} from '../design/theme';

export type IconName =
  | 'activity'
  | 'arrow'
  | 'audio'
  | 'check'
  | 'chevron'
  | 'connection'
  | 'device'
  | 'display'
  | 'edit'
  | 'grid'
  | 'home'
  | 'mic'
  | 'play'
  | 'power'
  | 'preset'
  | 'search'
  | 'settings'
  | 'switching'
  | 'terminal'
  | 'volume';

const paths: Record<IconName, ReactNode> = {
  activity: <path d="M5 19V9m7 10V5m7 14v-7" />,
  arrow: <path d="m5 12 5 5L20 7" />,
  audio: <><path d="M4 10v4h4l5 4V6L8 10H4Z" /><path d="M16 9c1.4 1.7 1.4 4.3 0 6m3-9c3 3.4 3 8.6 0 12" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m8 10 4 4 4-4" />,
  connection: <><path d="M7 8V5m10 3V5M6 8h12v4a6 6 0 0 1-12 0V8Zm6 10v3" /></>,
  device: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></>,
  display: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 22h8m-4-4v4" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
  mic: <><rect x="8" y="3" width="8" height="13" rx="4" /><path d="M5 11a7 7 0 0 0 14 0m-7 7v3m-4 0h8" /></>,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  power: <><path d="M12 2v10" /><path d="M6.3 5.7a8 8 0 1 0 11.4 0" /></>,
  preset: <><path d="M5 3v18M19 3v18" /><path d="M5 7h9l-2-2m2 2-2 2M19 17h-9l2-2m-2 2 2 2" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  switching: <><path d="M4 7h12l-3-3m3 3-3 3M20 17H8l3-3m-3 3 3 3" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3m5 0h5" /></>,
  volume: <><path d="M4 10v4h4l5 4V6L8 10H4Z" /><path d="M17 9.5a4 4 0 0 1 0 5" /></>,
};

export const Icon = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.8,
  style,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{display: 'block', ...style}}
  >
    {paths[name]}
  </svg>
);

export const StatusDot = ({active = true}: {active?: boolean}) => (
  <span
    style={{
      width: 9,
      height: 9,
      borderRadius: 999,
      display: 'inline-block',
      background: active ? palette.green : palette.mutedDark,
      boxShadow: active ? '0 0 12px rgba(78,167,46,.7)' : undefined,
    }}
  />
);
