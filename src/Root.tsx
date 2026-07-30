import {Composition, Folder, Still, type CalculateMetadataFunction} from 'remotion';
import featureShortDefaultsJson from '../props/feature-short.json';
import firstUseDefaultsJson from '../props/first-use.json';
import lessonDefaultsJson from '../props/getting-started.json';
import {FeatureShort, FEATURE_SHORT_DURATION} from './compositions/FeatureShort';
import {
  FirstUseWalkthrough,
  getFirstUseDuration,
} from './compositions/FirstUseWalkthrough';
import {ProductOverview, OVERVIEW_DURATION} from './compositions/Overview';
import {
  featureShortSchema,
  firstUseWalkthroughSchema,
  overviewSchema,
  trainingLessonSchema,
  type FeatureShortProps,
  type FirstUseWalkthroughProps,
  type OverviewProps,
  type TrainingLessonProps,
} from './compositions/schemas';
import {getLessonDuration, TrainingLesson} from './compositions/TrainingLesson';
import {Thumbnail} from './compositions/Thumbnail';
import {palette, video} from './design/theme';

const overviewDefaults: OverviewProps = {
  title: 'Control the room. Not the complexity.',
  subtitle: 'Configure AV and IoT devices, automate room workflows, and hand off a focused control experience.',
  accentColor: palette.blue,
};

const lessonDefaults = lessonDefaultsJson as TrainingLessonProps;
const featureShortDefaults = featureShortDefaultsJson as FeatureShortProps;
const firstUseDefaults = firstUseDefaultsJson as Omit<FirstUseWalkthroughProps, 'device'>;

const calculateLessonMetadata: CalculateMetadataFunction<TrainingLessonProps> = ({props}) => ({
  durationInFrames: getLessonDuration(props),
});

const calculateFirstUseMetadata: CalculateMetadataFunction<FirstUseWalkthroughProps> = ({props}) => ({
  durationInFrames: getFirstUseDuration(props),
});

export const RemotionRoot = () => (
  <>
    <Folder name="CTRLbot-First-Use">
      <Composition
        id="CTRLbot-First-Use-Phone"
        component={FirstUseWalkthrough}
        schema={firstUseWalkthroughSchema}
        defaultProps={{...firstUseDefaults, device: 'phone'}}
        calculateMetadata={calculateFirstUseMetadata}
        durationInFrames={getFirstUseDuration({...firstUseDefaults, device: 'phone'})}
        fps={video.fps}
        width={video.verticalWidth}
        height={video.verticalHeight}
      />
      <Composition
        id="CTRLbot-First-Use-Tablet"
        component={FirstUseWalkthrough}
        schema={firstUseWalkthroughSchema}
        defaultProps={{...firstUseDefaults, device: 'tablet'}}
        calculateMetadata={calculateFirstUseMetadata}
        durationInFrames={getFirstUseDuration({...firstUseDefaults, device: 'tablet'})}
        fps={video.fps}
        width={video.width}
        height={video.height}
      />
    </Folder>
    <Folder name="CTRLbot-Videos">
      <Composition
        id="CTRLbot-Overview"
        component={ProductOverview}
        schema={overviewSchema}
        defaultProps={overviewDefaults}
        durationInFrames={OVERVIEW_DURATION}
        fps={video.fps}
        width={video.width}
        height={video.height}
      />
      <Composition
        id="CTRLbot-Training-Lesson"
        component={TrainingLesson}
        schema={trainingLessonSchema}
        defaultProps={lessonDefaults}
        calculateMetadata={calculateLessonMetadata}
        durationInFrames={getLessonDuration(lessonDefaults)}
        fps={video.fps}
        width={video.width}
        height={video.height}
      />
    </Folder>
    <Folder name="CTRLbot-Social">
      <Composition
        id="CTRLbot-Feature-Short"
        component={FeatureShort}
        schema={featureShortSchema}
        defaultProps={featureShortDefaults}
        durationInFrames={FEATURE_SHORT_DURATION}
        fps={video.fps}
        width={video.verticalWidth}
        height={video.verticalHeight}
      />
    </Folder>
    <Folder name="CTRLbot-Stills">
      <Still
        id="CTRLbot-Thumbnail"
        component={Thumbnail}
        width={video.width}
        height={video.height}
      />
    </Folder>
  </>
);
