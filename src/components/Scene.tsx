import type {CSSProperties, ReactNode} from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {fade, pulse, reveal, rise} from '../design/animation';
import {palette, shadow, typography} from '../design/theme';
import {CtrlbotWordmark} from './Brand';
import {Icon, type IconName} from './Icons';

export const GridBackdrop = ({
  accent = palette.blue,
  intensity = 1,
}: {
  accent?: string;
  intensity?: number;
}) => {
  const frame = useCurrentFrame();
  const shift = (frame * 0.42) % 72;

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: palette.black}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 72% 43%, rgba(29,41,47,.96) 0%, rgba(9,12,14,.96) 36%, #050708 74%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: -120,
          opacity: 0.16 * intensity,
          transform: `translateY(${shift}px) perspective(800px) rotateX(62deg) scale(1.25)`,
          transformOrigin: 'center 70%',
          backgroundImage:
            'linear-gradient(rgba(147,161,168,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(147,161,168,.22) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 38%, black 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 820,
          height: 820,
          right: -160,
          top: 40,
          borderRadius: '50%',
          opacity: (0.3 + pulse(frame, 140, 0.55) * 0.14) * intensity,
          background: `radial-gradient(circle, ${accent}66 0%, ${accent}18 32%, transparent 68%)`,
          filter: 'blur(22px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.75,
        }}
      />
    </AbsoluteFill>
  );
};

export const SceneFrame = ({
  children,
  durationInFrames,
  accent = palette.blue,
  label,
  index,
  total,
  showChrome = true,
  style,
}: {
  children: ReactNode;
  durationInFrames: number;
  accent?: string;
  label?: string;
  index?: number;
  total?: number;
  showChrome?: boolean;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const opacity = fade(frame, durationInFrames, 16, 16);
  const sceneProgress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity, ...style}}>
      <GridBackdrop accent={accent} />
      {showChrome ? (
        <>
          <div
            style={{
              position: 'absolute',
              top: 50,
              left: 68,
              right: 68,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 5,
            }}
          >
            <CtrlbotWordmark compact accent={accent} />
            <div
              style={{
                color: palette.muted,
              fontFamily: typography.brand,
                fontSize: 16,
                letterSpacing: 2.4,
                textTransform: 'uppercase',
              }}
            >
              {label ?? 'CTRLbot IoT • Training'}
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 68,
              right: 68,
              bottom: 42,
              height: 3,
              borderRadius: 99,
              background: palette.line,
              overflow: 'hidden',
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: `${sceneProgress * 100}%`,
                height: '100%',
                background: accent,
                boxShadow: `0 0 14px ${accent}`,
              }}
            />
          </div>
          {index !== undefined && total !== undefined ? (
            <div
              style={{
                position: 'absolute',
                right: 68,
                bottom: 56,
                color: palette.muted,
                fontFamily: typography.mono,
                fontSize: 15,
                letterSpacing: 1.5,
                zIndex: 5,
              }}
            >
              {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          ) : null}
        </>
      ) : null}
      <AbsoluteFill style={{zIndex: 2}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export const TitleBlock = ({
  eyebrow,
  title,
  subtitle,
  accent = palette.blue,
  align = 'left',
  maxWidth = 820,
  delay = 0,
  titleSize = 76,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  accent?: string;
  align?: 'left' | 'center';
  maxWidth?: number;
  delay?: number;
  titleSize?: number;
}) => {
  const frame = useCurrentFrame();
  const titleSpring = spring({
    frame: frame - delay,
    fps: useVideoConfig().fps,
    config: {damping: 18, stiffness: 110, mass: 0.8},
    durationInFrames: 34,
  });
  const opacity = reveal(frame, delay, 20);

  return (
    <div
      style={{
        maxWidth,
        textAlign: align,
        opacity,
        transform: `translateY(${rise(frame, delay, 42)}px) scale(${0.975 + titleSpring * 0.025})`,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            alignItems: 'center',
            gap: 12,
            color: accent,
            fontFamily: typography.bold,
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 3.4,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          <span style={{width: 36, height: 3, borderRadius: 9, background: accent}} />
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          color: palette.white,
          fontFamily: typography.display,
          fontSize: titleSize,
          fontWeight: 900,
          letterSpacing: -3.2,
          lineHeight: 1.04,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            color: palette.muted,
            fontSize: 25,
            lineHeight: 1.46,
            marginTop: 26,
            maxWidth: align === 'center' ? maxWidth : Math.min(maxWidth, 720),
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

export const BulletList = ({
  items,
  accent = palette.blue,
  delay = 8,
}: {
  items: string[];
  accent?: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{display: 'grid', gap: 18}}>
      {items.map((item, index) => {
        const itemDelay = delay + index * 7;
        const opacity = reveal(frame, itemDelay, 15);
        return (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              color: palette.white,
              fontSize: 23,
              lineHeight: 1.3,
              opacity,
              transform: `translateX(${interpolate(opacity, [0, 1], [22, 0])}px)`,
            }}
          >
            <span
              style={{
                width: 29,
                height: 29,
                borderRadius: 9,
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
                background: `${accent}22`,
                border: `1px solid ${accent}88`,
              }}
            >
              <Icon name="check" size={17} color={accent} strokeWidth={2.4} />
            </span>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export const Callout = ({
  children,
  icon = 'arrow',
  accent = palette.blue,
  delay = 0,
}: {
  children: ReactNode;
  icon?: IconName;
  accent?: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, delay, 14);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        color: palette.white,
        fontFamily: typography.bold,
        fontSize: 18,
        fontWeight: 650,
        lineHeight: 1.35,
        padding: '15px 18px',
        borderRadius: 14,
        background: 'rgba(10,15,18,.88)',
        border: `1px solid ${accent}88`,
        boxShadow: shadow.blue,
        opacity,
        transform: `translateY(${(1 - opacity) * 16}px)`,
      }}
    >
      <Icon name={icon} size={20} color={accent} />
      {children}
    </div>
  );
};

export const CaptionBand = ({
  children,
  accent = palette.blue,
}: {
  children: ReactNode;
  accent?: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      bottom: 88,
      transform: 'translateX(-50%)',
      width: 1180,
      display: 'flex',
      alignItems: 'stretch',
      borderRadius: 16,
      overflow: 'hidden',
      background: 'rgba(4,7,8,.92)',
      boxShadow: '0 18px 54px rgba(0,0,0,.38)',
      border: '1px solid rgba(255,255,255,.12)',
      zIndex: 20,
    }}
  >
    <div style={{width: 6, background: accent}} />
    <div
      style={{
        flex: 1,
        padding: '17px 24px 18px',
        color: palette.white,
        fontSize: 21,
        lineHeight: 1.38,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  </div>
);

export const GlassCard = ({
  children,
  style,
  accent,
}: {
  children: ReactNode;
  style?: CSSProperties;
  accent?: string;
}) => (
  <div
    style={{
      borderRadius: 24,
      background: 'linear-gradient(145deg, rgba(27,35,39,.94), rgba(11,15,17,.95))',
      border: `1px solid ${accent ? `${accent}66` : 'rgba(255,255,255,.11)'}`,
      boxShadow: shadow.panel,
      ...style,
    }}
  >
    {children}
  </div>
);
