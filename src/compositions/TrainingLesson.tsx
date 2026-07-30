import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
} from 'remotion';
import {CtrlbotMark, CtrlbotName, CtrlbotWordmark} from '../components/Brand';
import {Icon, type IconName} from '../components/Icons';
import {ProductCapture, type CaptureAsset} from '../components/ProductCapture';
import {BulletList, Callout, CaptionBand, GlassCard, SceneFrame, TitleBlock} from '../components/Scene';
import {reveal} from '../design/animation';
import {palette, seconds, typography} from '../design/theme';
import {captures} from '../media/captures';
import type {LessonChapter, TrainingLessonProps} from './schemas';

export const LESSON_INTRO_DURATION = seconds(5);
export const LESSON_OBJECTIVES_DURATION = seconds(6);
export const LESSON_RECAP_DURATION = seconds(6);

export const getLessonDuration = (props: TrainingLessonProps) =>
  LESSON_INTRO_DURATION
  + LESSON_OBJECTIVES_DURATION
  + props.chapters.reduce((total, chapter) => total + seconds(chapter.durationInSeconds), 0)
  + LESSON_RECAP_DURATION;

const Intro = ({props}: {props: TrainingLessonProps}) => (
  <SceneFrame durationInFrames={LESSON_INTRO_DURATION} accent={props.accentColor} showChrome={false}>
    <div style={{position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '110px 140px'}}>
      <div>
        <CtrlbotWordmark accent={props.accentColor} />
        <div style={{marginTop: 70}}>
          <TitleBlock eyebrow={`Training for ${props.audience}`} title={props.title} subtitle={props.subtitle} accent={props.accentColor} maxWidth={800} titleSize={76} delay={8} />
        </div>
      </div>
      <div style={{display: 'grid', placeItems: 'center'}}>
        <div style={{width: 410, height: 410, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `radial-gradient(circle, ${props.accentColor}4A 0%, ${props.accentColor}15 42%, transparent 70%)`}}>
          <div style={{width: 230, height: 230, borderRadius: 60, display: 'grid', placeItems: 'center', border: `1px solid ${props.accentColor}88`, background: 'rgba(5,8,9,.86)', boxShadow: `0 0 100px ${props.accentColor}45`}}>
            <CtrlbotMark size={150} />
          </div>
        </div>
      </div>
    </div>
  </SceneFrame>
);

const Objectives = ({props}: {props: TrainingLessonProps}) => {
  const frame = useCurrentFrame();
  const icons: IconName[] = ['device', 'connection', 'preset', 'home', 'switching', 'check'];
  return (
    <SceneFrame durationInFrames={LESSON_OBJECTIVES_DURATION} accent={props.accentColor} label="Learning objectives">
      <div style={{position: 'absolute', top: 160, left: 100, right: 100}}>
        <TitleBlock eyebrow="In this lesson" title="What you’ll be able to do" subtitle="Follow the product workflow from installer configuration to a client-ready control surface." accent={props.accentColor} titleSize={64} maxWidth={1100} />
      </div>
      <div style={{position: 'absolute', left: 100, right: 100, top: 500, display: 'grid', gridTemplateColumns: `repeat(${Math.min(4, props.learningObjectives.length)}, 1fr)`, gap: 18}}>
        {props.learningObjectives.map((objective, index) => {
          const opacity = reveal(frame, 12 + index * 8, 18);
          return (
            <GlassCard key={objective} accent={props.accentColor} style={{height: 230, padding: 25, opacity, transform: `translateY(${(1 - opacity) * 28}px)`}}>
              <div style={{width: 52, height: 52, borderRadius: 15, display: 'grid', placeItems: 'center', background: `${props.accentColor}22`, border: `1px solid ${props.accentColor}66`}}>
                <Icon name={icons[index]} size={27} color={props.accentColor} />
              </div>
              <div style={{fontFamily: typography.mono, fontSize: 12, color: props.accentColor, letterSpacing: 1.4, marginTop: 22}}>OBJECTIVE {String(index + 1).padStart(2, '0')}</div>
              <div style={{fontFamily: typography.bold, fontSize: 20, lineHeight: 1.35, color: palette.white, fontWeight: 730, marginTop: 11}}>{objective}</div>
            </GlassCard>
          );
        })}
      </div>
    </SceneFrame>
  );
};

const fallbackCapture: Record<LessonChapter['kind'], CaptureAsset> = {
  concept: {source: captures.tablet.driversStill, type: 'image', device: 'tablet', label: 'Current tablet UI'},
  drivers: {source: captures.tablet.driversStill, type: 'image', device: 'tablet', label: 'Current tablet UI'},
  connection: {source: captures.tablet.connectionStill, type: 'image', device: 'tablet', label: 'Current tablet UI'},
  presets: {source: captures.tablet.presetsStill, type: 'image', device: 'tablet', label: 'Current tablet UI'},
  switching: {source: captures.tablet.switchingStill, type: 'image', device: 'tablet', label: 'Current tablet UI'},
  eui: {source: captures.tablet.euiStill, type: 'image', device: 'tablet', label: 'Current tablet EUI'},
};

const Chapter = ({
  chapter,
  durationInFrames,
  props,
  index,
}: {
  chapter: LessonChapter;
  durationInFrames: number;
  props: TrainingLessonProps;
  index: number;
}) => (
  <SceneFrame durationInFrames={durationInFrames} accent={props.accentColor} label={props.title} index={index + 1} total={props.chapters.length}>
    <div style={{position: 'absolute', left: 75, top: 220, width: 510}}>
      <TitleBlock eyebrow={`Chapter ${String(index + 1).padStart(2, '0')}`} title={chapter.title} accent={props.accentColor} maxWidth={500} titleSize={56} />
      <div style={{marginTop: 36}}><BulletList items={chapter.bullets} accent={props.accentColor} delay={14} /></div>
      {chapter.callout ? <div style={{display: 'inline-flex', marginTop: 30}}><Callout accent={props.accentColor} delay={34}>{chapter.callout}</Callout></div> : null}
    </div>
    <ProductCapture
      capture={chapter.capture ?? fallbackCapture[chapter.kind]}
      accent={props.accentColor}
      style={{position: 'absolute', right: 52, top: 184, width: 1160, height: 770}}
    />
    {props.showCaptions ? <CaptionBand accent={props.accentColor}>{chapter.narration}</CaptionBand> : null}
  </SceneFrame>
);

const Recap = ({props}: {props: TrainingLessonProps}) => {
  const frame = useCurrentFrame();
  const recap = props.chapters.slice(0, 5);
  return (
    <SceneFrame durationInFrames={LESSON_RECAP_DURATION} accent={props.accentColor} showChrome={false}>
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 90}}>
        <div style={{width: 1380}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <TitleBlock eyebrow="Lesson complete" title={props.closing} subtitle={<>Use this same content model to create the next <CtrlbotName /> training module.</>} accent={props.accentColor} maxWidth={970} titleSize={67} />
            <CtrlbotMark size={120} />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: `repeat(${recap.length},1fr)`, gap: 13, marginTop: 65}}>
            {recap.map((chapter, index) => {
              const opacity = reveal(frame, 10 + index * 7, 16);
              return (
                <div key={chapter.title} style={{minHeight: 150, borderRadius: 15, padding: 18, background: palette.panel, border: `1px solid ${palette.line}`, opacity, transform: `translateY(${(1 - opacity) * 20}px)`}}>
                  <div style={{fontFamily: typography.mono, color: props.accentColor, fontSize: 12}}>0{index + 1}</div>
                  <div style={{color: palette.white, fontFamily: typography.bold, fontSize: 17, fontWeight: 720, lineHeight: 1.32, marginTop: 16}}>{chapter.title.replace(/^\d+\.\s*/, '')}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

export const TrainingLesson = (props: TrainingLessonProps) => (
  <AbsoluteFill style={{background: palette.black}}>
    <Series>
      <Series.Sequence durationInFrames={LESSON_INTRO_DURATION}><Intro props={props} /></Series.Sequence>
      <Series.Sequence durationInFrames={LESSON_OBJECTIVES_DURATION}><Objectives props={props} /></Series.Sequence>
      {props.chapters.map((chapter, index) => {
        const durationInFrames = seconds(chapter.durationInSeconds);
        return (
          <Series.Sequence key={`${chapter.kind}-${index}`} durationInFrames={durationInFrames}>
            <Chapter chapter={chapter} durationInFrames={durationInFrames} props={props} index={index} />
          </Series.Sequence>
        );
      })}
      <Series.Sequence durationInFrames={LESSON_RECAP_DURATION}><Recap props={props} /></Series.Sequence>
    </Series>
  </AbsoluteFill>
);
