import type {CSSProperties, ReactNode} from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  Series,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {CtrlbotMark, CtrlbotWordmark} from '../components/Brand';
import {palette, seconds, typography} from '../design/theme';
import {captures} from '../media/captures';
import type {
  FirstUseStep,
  FirstUseStepId,
  FirstUseWalkthroughProps,
} from './schemas';

export const FIRST_USE_INTRO_DURATION = seconds(2.5);
export const FIRST_USE_OUTRO_DURATION = seconds(2.5);

export const getFirstUseDuration = (props: FirstUseWalkthroughProps) =>
  FIRST_USE_INTRO_DURATION
  + props.steps.reduce(
    (total, step) => total + seconds(step.durationInSeconds),
    0,
  )
  + FIRST_USE_OUTRO_DURATION;

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

const useSceneOpacity = (durationInFrames: number) => {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );
};

const Backdrop = ({accent}: {accent: string}) => {
  const frame = useCurrentFrame();
  const gridShift = (frame * 0.34) % 72;

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: palette.black}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 72% 34%, rgba(24,42,51,.94) 0%, rgba(9,12,14,.97) 38%, #050708 76%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: -100,
          opacity: 0.12,
          transform: `translateY(${gridShift}px) perspective(850px) rotateX(62deg) scale(1.25)`,
          transformOrigin: 'center 70%',
          backgroundImage:
            'linear-gradient(rgba(147,161,168,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(147,161,168,.2) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 38%, black 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 720,
          height: 720,
          right: -170,
          top: 40,
          borderRadius: '50%',
          background: `${accent}20`,
          filter: 'blur(100px)',
        }}
      />
    </AbsoluteFill>
  );
};

const Title = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div
    style={{
      fontFamily: typography.display,
      fontWeight: 700,
      letterSpacing: -1.6,
      lineHeight: 1.08,
      color: palette.white,
      ...style,
    }}
  >
    {children}
  </div>
);

const StepTag = ({children, accent}: {children: ReactNode; accent: string}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      color: accent,
      fontFamily: typography.bold,
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 2.5,
      textTransform: 'uppercase',
    }}
  >
    <span
      style={{
        width: 34,
        height: 3,
        borderRadius: 99,
        background: accent,
        boxShadow: `0 0 14px ${accent}`,
      }}
    />
    {children}
  </div>
);

const Intro = ({props}: {props: FirstUseWalkthroughProps}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = useSceneOpacity(FIRST_USE_INTRO_DURATION);
  const entrance = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 96},
    durationInFrames: 34,
  });
  const isPhone = props.device === 'phone';

  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop accent={props.accentColor} />
      <AbsoluteFill
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: isPhone ? '100px 70px' : '90px 130px',
        }}
      >
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            textAlign: 'center',
            transform: `translateY(${(1 - entrance) * 36}px) scale(${0.96 + entrance * 0.04})`,
          }}
        >
          <CtrlbotWordmark
            accent={props.accentColor}
            style={{transform: isPhone ? 'scale(1.28)' : 'scale(1.15)'}}
          />
          <StepTag accent={props.accentColor}>
            <span style={{marginTop: isPhone ? 78 : 68}} />
          </StepTag>
          <Title
            style={{
              marginTop: isPhone ? 72 : 60,
              maxWidth: isPhone ? 880 : 1320,
              fontSize: isPhone ? 82 : 86,
            }}
          >
            {props.title}
          </Title>
          <div
            style={{
              marginTop: 28,
              maxWidth: isPhone ? 820 : 1100,
              color: palette.muted,
              fontSize: isPhone ? 30 : 29,
              lineHeight: 1.4,
            }}
          >
            {props.subtitle}
          </div>
          <div
            style={{
              marginTop: 42,
              padding: '13px 20px',
              borderRadius: 12,
              border: `1px solid ${props.accentColor}88`,
              background: `${props.accentColor}18`,
              color: palette.white,
              fontFamily: typography.bold,
              fontWeight: 700,
              fontSize: isPhone ? 18 : 17,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Android {isPhone ? 'phone portrait' : 'tablet landscape'} · v{props.version}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

type CaptureSpec = {
  source: string;
  type: 'image' | 'video';
};

const getCapture = (
  device: FirstUseWalkthroughProps['device'],
  id: Exclude<FirstUseStepId, 'activities'>,
): CaptureSpec => {
  const deviceCaptures = captures[device];
  switch (id) {
    case 'privacy':
      return {source: deviceCaptures.onboarding, type: 'image'};
    case 'drivers':
      return {source: deviceCaptures.drivers, type: 'video'};
    case 'connection':
      return {source: deviceCaptures.connection, type: 'video'};
    case 'eui':
      return {source: deviceCaptures.eui, type: 'video'};
    case 'handoff':
      return {source: deviceCaptures.euiStill, type: 'image'};
  }
};

const Capture = ({
  source,
  type,
  isPhone,
  accent,
}: CaptureSpec & {isPhone: boolean; accent: string}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({
    frame,
    fps,
    config: {damping: 20, stiffness: 92},
    durationInFrames: 32,
  });

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
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 24}px) scale(${0.98 + entrance * 0.02})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: isPhone ? '6% 21%' : '7% 3%',
          borderRadius: isPhone ? 90 : 44,
          background: `${accent}26`,
          filter: 'blur(46px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: isPhone ? 38 : 26,
          background: '#071015',
          border: `1px solid ${accent}66`,
          boxShadow: '0 30px 84px rgba(0,0,0,.48)',
        }}
      >
        {type === 'video' ? (
          <OffthreadVideo
            muted
            src={staticFile(source)}
            style={mediaStyle}
          />
        ) : (
          <Img src={staticFile(source)} style={mediaStyle} />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(145deg, rgba(255,255,255,.045), transparent 18%, transparent 82%, rgba(0,143,212,.055))',
          }}
        />
      </div>
    </div>
  );
};

const ActivityCapture = ({
  device,
  durationInFrames,
  accent,
}: {
  device: FirstUseWalkthroughProps['device'];
  durationInFrames: number;
  accent: string;
}) => {
  const frame = useCurrentFrame();
  const isPhone = device === 'phone';
  const deviceCaptures = captures[device];
  const phases = [
    {label: 'Presets', source: deviceCaptures.presetsStill},
    {label: 'Switching', source: deviceCaptures.switchingStill},
    {label: 'Audio', source: deviceCaptures.audio},
  ];
  const phaseDuration = durationInFrames / phases.length;
  const activeIndex = Math.min(
    phases.length - 1,
    Math.floor(frame / phaseDuration),
  );

  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      {phases.map((phase, index) => {
        const start = index * phaseDuration;
        const end = (index + 1) * phaseDuration;
        const fadeIn = index === 0
          ? 1
          : interpolate(frame, [start - 8, start + 8], [0, 1], clamp);
        const fadeOut = index === phases.length - 1
          ? 1
          : interpolate(frame, [end - 8, end + 8], [1, 0], clamp);
        return (
          <div
            key={phase.label}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: Math.min(fadeIn, fadeOut),
            }}
          >
            <Capture
              source={phase.source}
              type="image"
              isPhone={isPhone}
              accent={accent}
            />
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: isPhone ? 24 : 22,
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: isPhone ? 8 : 10,
          padding: isPhone ? 8 : 9,
          borderRadius: 14,
          background: 'rgba(4,7,8,.9)',
          border: '1px solid rgba(255,255,255,.14)',
          boxShadow: '0 12px 34px rgba(0,0,0,.45)',
        }}
      >
        {phases.map((phase, index) => (
          <div
            key={phase.label}
            style={{
              padding: isPhone ? '9px 12px' : '9px 15px',
              borderRadius: 9,
              background: index === activeIndex ? accent : 'transparent',
              color: index === activeIndex ? palette.white : palette.muted,
              fontFamily: typography.bold,
              fontWeight: 700,
              fontSize: isPhone ? 13 : 14,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {phase.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const Progress = ({
  frame,
  duration,
  accent,
  index,
  total,
  isPhone,
}: {
  frame: number;
  duration: number;
  accent: string;
  index: number;
  total: number;
  isPhone: boolean;
}) => {
  const progress = interpolate(frame, [0, duration], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: isPhone ? 52 : 58,
        right: isPhone ? 52 : 58,
        bottom: isPhone ? 54 : 34,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          color: palette.muted,
          fontFamily: typography.bold,
          fontWeight: 700,
          fontSize: isPhone ? 14 : 13,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
        }}
      >
        <span>{isPhone ? 'Phone portrait' : 'Tablet landscape'} · v1.0</span>
        <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
      <div style={{height: 4, borderRadius: 99, overflow: 'hidden', background: palette.line}}>
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            borderRadius: 99,
            background: accent,
            boxShadow: `0 0 16px ${accent}`,
          }}
        />
      </div>
    </div>
  );
};

const PhoneStep = ({
  step,
  durationInFrames,
  capture,
  accent,
  index,
  total,
  device,
}: {
  step: FirstUseStep;
  durationInFrames: number;
  capture?: CaptureSpec;
  accent: string;
  index: number;
  total: number;
  device: FirstUseWalkthroughProps['device'];
}) => {
  const frame = useCurrentFrame();
  const opacity = useSceneOpacity(durationInFrames);
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop accent={accent} />
      <div style={{position: 'absolute', left: 52, top: 48}}>
        <CtrlbotWordmark compact accent={accent} />
      </div>
      <div style={{position: 'absolute', left: 58, right: 58, top: 142}}>
        <StepTag accent={accent}>{step.eyebrow}</StepTag>
        <Title style={{marginTop: 18, fontSize: 50}}>{step.title}</Title>
        <div
          style={{
            marginTop: 16,
            maxWidth: 930,
            color: palette.muted,
            fontSize: 25,
            lineHeight: 1.4,
          }}
        >
          {step.body}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 184,
          top: 392,
          width: 712,
          height: 1320,
        }}
      >
        {step.id === 'activities' ? (
          <ActivityCapture
            device={device}
            durationInFrames={durationInFrames}
            accent={accent}
          />
        ) : capture ? (
          <Capture {...capture} isPhone accent={accent} />
        ) : null}
      </div>
      <Progress
        frame={frame}
        duration={durationInFrames}
        accent={accent}
        index={index}
        total={total}
        isPhone
      />
    </AbsoluteFill>
  );
};

const TabletStep = ({
  step,
  durationInFrames,
  capture,
  accent,
  index,
  total,
  device,
}: {
  step: FirstUseStep;
  durationInFrames: number;
  capture?: CaptureSpec;
  accent: string;
  index: number;
  total: number;
  device: FirstUseWalkthroughProps['device'];
}) => {
  const frame = useCurrentFrame();
  const opacity = useSceneOpacity(durationInFrames);
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop accent={accent} />
      <div style={{position: 'absolute', left: 58, top: 42}}>
        <CtrlbotWordmark compact accent={accent} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 150,
          width: 1190,
          height: 798,
        }}
      >
        {step.id === 'activities' ? (
          <ActivityCapture
            device={device}
            durationInFrames={durationInFrames}
            accent={accent}
          />
        ) : capture ? (
          <Capture {...capture} isPhone={false} accent={accent} />
        ) : null}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1302,
          right: 68,
          top: 190,
          bottom: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '42px 42px 46px',
          borderRadius: 24,
          background: 'linear-gradient(145deg, rgba(24,32,36,.94), rgba(9,13,15,.94))',
          border: '1px solid rgba(255,255,255,.11)',
          boxShadow: '0 30px 84px rgba(0,0,0,.42)',
        }}
      >
        <StepTag accent={accent}>{step.eyebrow}</StepTag>
        <Title style={{marginTop: 26, fontSize: 54}}>{step.title}</Title>
        <div
          style={{
            marginTop: 24,
            color: palette.muted,
            fontSize: 25,
            lineHeight: 1.48,
          }}
        >
          {step.body}
        </div>
      </div>
      <Progress
        frame={frame}
        duration={durationInFrames}
        accent={accent}
        index={index}
        total={total}
        isPhone={false}
      />
    </AbsoluteFill>
  );
};

const StepScene = ({
  step,
  props,
  index,
}: {
  step: FirstUseStep;
  props: FirstUseWalkthroughProps;
  index: number;
}) => {
  const durationInFrames = seconds(step.durationInSeconds);
  const capture = step.id === 'activities'
    ? undefined
    : getCapture(props.device, step.id);
  const shared = {
    step,
    durationInFrames,
    capture,
    accent: props.accentColor,
    index,
    total: props.steps.length,
    device: props.device,
  };
  return props.device === 'phone'
    ? <PhoneStep {...shared} />
    : <TabletStep {...shared} />;
};

const Outro = ({props}: {props: FirstUseWalkthroughProps}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = useSceneOpacity(FIRST_USE_OUTRO_DURATION);
  const entrance = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 100},
    durationInFrames: 32,
  });
  const isPhone = props.device === 'phone';
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop accent={props.accentColor} />
      <AbsoluteFill style={{display: 'grid', placeItems: 'center', padding: 70}}>
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            textAlign: 'center',
            transform: `translateY(${(1 - entrance) * 32}px)`,
          }}
        >
          <CtrlbotMark size={isPhone ? 128 : 116} />
          <Title style={{marginTop: 42, fontSize: isPhone ? 74 : 78}}>
            {props.closing}
          </Title>
          <div
            style={{
              marginTop: 26,
              maxWidth: isPhone ? 820 : 1100,
              color: palette.muted,
              fontSize: isPhone ? 28 : 27,
              lineHeight: 1.4,
            }}
          >
            Configure and operate a compatible room from the Android device in your hand.
          </div>
          <div
            style={{
              marginTop: 40,
              color: props.accentColor,
              fontFamily: typography.bold,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 1.8,
              textTransform: 'uppercase',
            }}
          >
            The control system is the app.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const FirstUseWalkthrough = (props: FirstUseWalkthroughProps) => (
  <AbsoluteFill style={{background: palette.black}}>
    <Series>
      <Series.Sequence durationInFrames={FIRST_USE_INTRO_DURATION}>
        <Intro props={props} />
      </Series.Sequence>
      {props.steps.map((step, index) => (
        <Series.Sequence
          key={step.id}
          durationInFrames={seconds(step.durationInSeconds)}
        >
          <StepScene step={step} props={props} index={index} />
        </Series.Sequence>
      ))}
      <Series.Sequence durationInFrames={FIRST_USE_OUTRO_DURATION}>
        <Outro props={props} />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
