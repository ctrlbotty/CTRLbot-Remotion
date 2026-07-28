import {z} from 'zod';

export const chapterKindSchema = z.enum([
  'concept',
  'drivers',
  'connection',
  'presets',
  'switching',
  'eui',
]);

export const overviewSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  accentColor: z.string(),
});

export type OverviewProps = z.infer<typeof overviewSchema>;

export const lessonChapterSchema = z.object({
  kind: chapterKindSchema,
  title: z.string(),
  narration: z.string(),
  bullets: z.array(z.string()).min(1).max(5),
  durationInSeconds: z.number().min(4).max(90),
  callout: z.string().optional(),
});

export const trainingLessonSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  audience: z.string(),
  learningObjectives: z.array(z.string()).min(1).max(6),
  chapters: z.array(lessonChapterSchema).min(1).max(20),
  closing: z.string(),
  accentColor: z.string(),
  showCaptions: z.boolean(),
});

export type TrainingLessonProps = z.infer<typeof trainingLessonSchema>;
export type LessonChapter = z.infer<typeof lessonChapterSchema>;

export const featureShortSchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  feature: z.string(),
  accentColor: z.string(),
});

export type FeatureShortProps = z.infer<typeof featureShortSchema>;
