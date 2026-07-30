import type {CSSProperties} from 'react';
import {
  Img,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {palette, shadow, typography} from '../design/theme';

export type CaptureAsset = {
  source: string;
  type: 'image' | 'video';
  device: 'phone' | 'tablet';
  label?: string;
};

export const ProductCapture = ({
  capture,
  accent = palette.blue,
  animate = true,
  style,
}: {
  capture: CaptureAsset;
  accent?: string;
  animate?: boolean;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = animate
    ? spring({frame, fps, config: {damping: 18, stiffness: 92}, durationInFrames: 38})
    : 1;
  const isPhone = capture.device === 'phone';

  const mediaStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'contain',
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        minWidth: 0,
        minHeight: 0,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 24}px) scale(${0.975 + entrance * 0.025})`,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: isPhone ? '4% 23%' : '7% 4%',
          borderRadius: isPhone ? 90 : 42,
          background: `${accent}26`,
          filter: 'blur(44px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: isPhone ? 42 : 28,
          background: '#071015',
          border: `1px solid ${accent}70`,
          boxShadow: `${shadow.panel}, 0 0 48px ${accent}22`,
        }}
      >
        {capture.type === 'video' ? (
          <OffthreadVideo
            muted
            src={staticFile(capture.source)}
            style={mediaStyle}
          />
        ) : (
          <Img src={staticFile(capture.source)} style={mediaStyle} />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(145deg, rgba(255,255,255,.05), transparent 20%, transparent 78%, rgba(0,143,212,.06))',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: isPhone ? 20 : 28,
          bottom: isPhone ? 18 : 24,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '9px 12px',
          borderRadius: 10,
          background: 'rgba(3,6,8,.88)',
          border: '1px solid rgba(255,255,255,.16)',
          color: palette.white,
          fontFamily: typography.mono,
          fontSize: isPhone ? 11 : 13,
          letterSpacing: 1.1,
          textTransform: 'uppercase',
        }}
      >
        <span style={{width: 8, height: 8, borderRadius: 99, background: capture.type === 'video' ? '#FF5A64' : accent, boxShadow: `0 0 12px ${capture.type === 'video' ? '#FF5A64' : accent}`}} />
        {capture.label ?? `${capture.device} ${capture.type === 'video' ? 'capture' : 'screen'}`}
      </div>
    </div>
  );
};
