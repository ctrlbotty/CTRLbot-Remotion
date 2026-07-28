import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  interpolate,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {AppShell, type AppScreen} from '../components/AppShell';
import {CtrlbotMark, CtrlbotWordmark} from '../components/Brand';
import {Icon, type IconName} from '../components/Icons';
import {BulletList, Callout, GlassCard, GridBackdrop, SceneFrame, TitleBlock} from '../components/Scene';
import {drift, pulse, reveal} from '../design/animation';
import {palette, seconds, typography} from '../design/theme';
import type {OverviewProps} from './schemas';

export const OVERVIEW_SCENES = {
  intro: seconds(5),
  map: seconds(6),
  drivers: seconds(7),
  connection: seconds(7),
  presets: seconds(7),
  switching: seconds(7),
  eui: seconds(8),
  outro: seconds(5),
} as const;

export const OVERVIEW_DURATION = Object.values(OVERVIEW_SCENES).reduce((sum, duration) => sum + duration, 0);

const IntroScene = ({duration, title, subtitle, accent}: {duration: number; title: string; subtitle: string; accent: string}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const mark = spring({frame, fps, config: {damping: 16, stiffness: 90}, durationInFrames: 45});
  const orbit = frame * 0.32;

  return (
    <SceneFrame durationInFrames={duration} accent={accent} showChrome={false}>
      <div style={{position: 'absolute', left: '50%', top: 180, transform: 'translateX(-50%)'}}>
        <div style={{position: 'relative', width: 260, height: 260, display: 'grid', placeItems: 'center', transform: `scale(${0.72 + mark * 0.28})`}}>
          {[0, 1, 2].map((ring) => (
            <div key={ring} style={{position: 'absolute', inset: 12 + ring * 28, borderRadius: '50%', border: `1px solid ${accent}${ring === 0 ? 'AA' : '55'}`, transform: `rotate(${orbit * (ring % 2 === 0 ? 1 : -1)}deg)`, borderTopColor: 'transparent', borderBottomColor: ring === 1 ? accent : 'transparent'}} />
          ))}
          <div style={{width: 126, height: 126, borderRadius: 34, display: 'grid', placeItems: 'center', background: 'rgba(8,12,14,.92)', border: `1px solid ${accent}88`, boxShadow: `0 0 70px ${accent}55`}}>
            <CtrlbotMark size={84} accent={accent} />
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', top: 475, left: 0, right: 0, display: 'grid', placeItems: 'center'}}>
        <TitleBlock eyebrow="AV & IoT control, simplified" title={title} subtitle={subtitle} accent={accent} align="center" maxWidth={1050} titleSize={84} delay={10} />
      </div>
      <div style={{position: 'absolute', bottom: 66, left: 0, right: 0, textAlign: 'center', color: palette.muted, fontFamily: typography.mono, fontSize: 15, letterSpacing: 2.6, opacity: reveal(frame, 42, 24)}}>
        DRIVERS · CONNECTIONS · AUTOMATION · CLIENT CONTROL
      </div>
    </SceneFrame>
  );
};

const flowNodes: {label: string; detail: string; icon: IconName}[] = [
  {label: 'Driver', detail: 'Device knowledge', icon: 'device'},
  {label: 'Connection', detail: 'Live control path', icon: 'connection'},
  {label: 'Activity', detail: 'Repeatable workflow', icon: 'preset'},
  {label: 'EUI', detail: 'Client-ready control', icon: 'home'},
];

const SystemMapScene = ({duration, accent}: {duration: number; accent: string}) => {
  const frame = useCurrentFrame();
  const packet = interpolate(frame, [28, duration - 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneFrame durationInFrames={duration} accent={accent} label="How CTRLbot works" index={1} total={6}>
      <div style={{position: 'absolute', top: 160, left: 80, right: 80}}>
        <TitleBlock eyebrow="A system, not a pile of screens" title="Build once. Control the whole room." subtitle="CTRLbot turns device-specific commands into a clear path from installer setup to everyday operation." accent={accent} maxWidth={1050} titleSize={65} />
      </div>
      <div style={{position: 'absolute', left: 105, right: 105, top: 535, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 48}}>
        <div style={{position: 'absolute', left: '10%', right: '10%', top: 70, height: 3, background: palette.line}}>
          <div style={{width: `${packet * 100}%`, height: '100%', background: accent, boxShadow: `0 0 14px ${accent}`}} />
          <div style={{position: 'absolute', left: `calc(${packet * 100}% - 8px)`, top: -7, width: 17, height: 17, borderRadius: 99, background: palette.white, border: `4px solid ${accent}`, boxShadow: `0 0 22px ${accent}`}} />
        </div>
        {flowNodes.map((node, index) => {
          const opacity = reveal(frame, 8 + index * 9, 16);
          return (
            <GlassCard key={node.label} accent={index <= packet * 4 ? accent : undefined} style={{height: 200, padding: 24, position: 'relative', opacity, transform: `translateY(${(1 - opacity) * 28}px)`}}>
              <div style={{width: 58, height: 58, borderRadius: 16, display: 'grid', placeItems: 'center', color: accent, background: `${accent}21`, border: `1px solid ${accent}66`}}>
                <Icon name={node.icon} size={29} color={accent} />
              </div>
              <div style={{fontSize: 22, color: palette.white, fontWeight: 800, marginTop: 22}}>{node.label}</div>
              <div style={{fontSize: 14, color: palette.muted, marginTop: 7}}>{node.detail}</div>
            </GlassCard>
          );
        })}
      </div>
    </SceneFrame>
  );
};

const featureCopy: Record<AppScreen, {eyebrow: string; title: ReactNode; subtitle: string; bullets: string[]; callout: string}> = {
  drivers: {
    eyebrow: 'Device intelligence',
    title: <>Start with the <span style={{color: palette.blue}}>right driver.</span></>,
    subtitle: 'Search the bundled device catalog and inspect the exact command profile before you create a connection.',
    bullets: ['IP, RS-232, and IR profiles', 'Model-aware command sets', 'Projector, display, switcher, and audio support'],
    callout: 'Driver → reusable device knowledge',
  },
  connection: {
    eyebrow: 'Secure configuration',
    title: <>Connect. Test. <span style={{color: palette.blue}}>Know.</span></>,
    subtitle: 'Configure the live control path and verify the device response before the room is handed over.',
    bullets: ['TCP, Telnet, SSH, serial bridging, and IR', 'Room-friendly device labels', 'Credentials referenced through secure storage'],
    callout: 'Validate the response before saving',
  },
  presets: {
    eyebrow: 'Workflow automation',
    title: <>Turn steps into a <span style={{color: palette.blue}}>single action.</span></>,
    subtitle: 'Build ordered command and delay sequences that run reliably across multiple devices.',
    bullets: ['System power workflows', 'Cross-device command sequences', 'Known-state, discrete power behavior'],
    callout: 'Presentation Mode · 4 coordinated steps',
  },
  switching: {
    eyebrow: 'Signal routing',
    title: <>See every <span style={{color: palette.blue}}>route.</span></>,
    subtitle: 'Configure simple source selection or a full many-to-many matrix with clear input and output labels.',
    bullets: ['Many-to-one source routing', 'Many-to-many matrix control', 'Custom input and output names'],
    callout: 'Laptop is routed across the room',
  },
  eui: {
    eyebrow: 'Client handoff',
    title: <>Powerful underneath. <span style={{color: palette.blue}}>Simple on top.</span></>,
    subtitle: 'The End User Interface hides installer complexity behind a focused, kiosk-style control surface.',
    bullets: ['System power and presets', 'Visual source-to-display routing', 'Room volume and microphone mute'],
    callout: 'Press and hold to return to Setup',
  },
};

const AppFeatureScene = ({duration, screen, accent, index}: {duration: number; screen: AppScreen; accent: string; index: number}) => {
  const copy = featureCopy[screen];
  return (
    <SceneFrame durationInFrames={duration} accent={accent} index={index} total={6}>
      <div style={{position: 'absolute', left: 78, top: 230, width: 510}}>
        <TitleBlock eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} accent={accent} maxWidth={500} titleSize={58} />
        <div style={{marginTop: 35}}><BulletList items={copy.bullets} accent={accent} delay={16} /></div>
        <div style={{marginTop: 28, display: 'inline-flex'}}><Callout accent={accent} delay={34}>{copy.callout}</Callout></div>
      </div>
      <AppShell screen={screen} accent={accent} scale={screen === 'eui' ? 0.78 : 0.76} style={{position: 'absolute', right: screen === 'eui' ? 15 : -118, top: screen === 'eui' ? 180 : 170, transformOrigin: 'top right'}} />
    </SceneFrame>
  );
};

const OutroScene = ({duration, accent}: {duration: number; accent: string}) => {
  const frame = useCurrentFrame();
  const orbit = drift(frame, 12, 100);
  return (
    <SceneFrame durationInFrames={duration} accent={accent} showChrome={false}>
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center'}}>
        <div style={{display: 'grid', justifyItems: 'center', transform: `translateY(${orbit}px)`}}>
          <CtrlbotWordmark accent={accent} />
          <div style={{marginTop: 46, textAlign: 'center'}}>
            <div style={{fontFamily: typography.display, fontSize: 70, color: palette.white, fontWeight: 900, letterSpacing: -3}}>Control the room.</div>
            <div style={{fontFamily: typography.display, fontSize: 70, color: accent, fontWeight: 900, letterSpacing: -3, marginTop: 4}}>Not the complexity.</div>
          </div>
          <div style={{marginTop: 42, color: palette.muted, fontSize: 22}}>Training-ready motion graphics built from the product itself.</div>
          <div style={{marginTop: 36, padding: '15px 24px', borderRadius: 12, border: `1px solid ${accent}99`, background: `${accent}20`, color: palette.white, fontFamily: typography.mono, fontSize: 16, letterSpacing: 1.3}}>CTRLbot IoT · Configure → Automate → Operate</div>
        </div>
      </div>
    </SceneFrame>
  );
};

export const ProductOverview = ({title, subtitle, accentColor}: OverviewProps) => (
  <AbsoluteFill style={{background: palette.black}}>
    <GridBackdrop accent={accentColor} />
    <Series>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.intro}><IntroScene duration={OVERVIEW_SCENES.intro} title={title} subtitle={subtitle} accent={accentColor} /></Series.Sequence>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.map}><SystemMapScene duration={OVERVIEW_SCENES.map} accent={accentColor} /></Series.Sequence>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.drivers}><AppFeatureScene duration={OVERVIEW_SCENES.drivers} screen="drivers" accent={accentColor} index={2} /></Series.Sequence>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.connection}><AppFeatureScene duration={OVERVIEW_SCENES.connection} screen="connection" accent={accentColor} index={3} /></Series.Sequence>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.presets}><AppFeatureScene duration={OVERVIEW_SCENES.presets} screen="presets" accent={accentColor} index={4} /></Series.Sequence>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.switching}><AppFeatureScene duration={OVERVIEW_SCENES.switching} screen="switching" accent={accentColor} index={5} /></Series.Sequence>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.eui}><AppFeatureScene duration={OVERVIEW_SCENES.eui} screen="eui" accent={accentColor} index={6} /></Series.Sequence>
      <Series.Sequence durationInFrames={OVERVIEW_SCENES.outro}><OutroScene duration={OVERVIEW_SCENES.outro} accent={accentColor} /></Series.Sequence>
    </Series>
  </AbsoluteFill>
);
