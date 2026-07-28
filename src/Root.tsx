import {Composition, Folder, Still, type CalculateMetadataFunction} from 'remotion';
import featureShortDefaultsJson from '../props/feature-short.json';
import lessonDefaultsJson from '../props/getting-started.json';
import {FeatureShort, FEATURE_SHORT_DURATION} from './compositions/FeatureShort';
import {ProductOverview, OVERVIEW_DURATION} from './compositions/Overview';
import {
  featureShortSchema,
  overviewSchema,
  trainingLessonSchema,
  type FeatureShortProps,
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

const calculateLessonMetadata: CalculateMetadataFunction<TrainingLessonProps> = ({props}) => ({
  durationInFrames: getLessonDuration(props),
});

export const RemotionRoot = () => (
  <>
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
