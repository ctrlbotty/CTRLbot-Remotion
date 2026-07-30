export const palette = {
  black: '#050708',
  ink: '#090C0E',
  panel: '#111619',
  panelRaised: '#182024',
  line: '#2A353A',
  lineBright: '#41525A',
  white: '#F7FAFC',
  muted: '#93A1A8',
  mutedDark: '#68767D',
  blue: '#008FD4',
  blueBright: '#29B6F6',
  blueDark: '#005B88',
  green: '#4EA72E',
  yellow: '#FFD739',
  red: '#FF5A64',
} as const;

export const typography = {
  body: 'Inter, Avenir Next, Segoe UI, Arial, sans-serif',
  brand: 'Audiowide, Inter, Segoe UI, sans-serif',
  bold: 'Audiowide, Inter, Segoe UI, sans-serif',
  display: 'Audiowide, Inter, Segoe UI, sans-serif',
  mono: 'SFMono-Regular, Consolas, Liberation Mono, monospace',
} as const;

export const video = {
  fps: 30,
  width: 1920,
  height: 1080,
  verticalWidth: 1080,
  verticalHeight: 1920,
} as const;

export const seconds = (value: number) => Math.round(value * video.fps);

export const shadow = {
  panel: '0 34px 90px rgba(0, 0, 0, 0.48)',
  blue: '0 0 44px rgba(0, 143, 212, 0.28)',
} as const;
