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

export const captureAssetSchema = z.object({
  source: z.string(),
  type: z.enum(['image', 'video']),
  device: z.enum(['phone', 'tablet']),
  label: z.string().optional(),
});

export const lessonChapterSchema = z.object({
  kind: chapterKindSchema,
  title: z.string(),
  narration: z.string(),
  bullets: z.array(z.string()).min(1).max(5),
  durationInSeconds: z.number().min(4).max(90),
  callout: z.string().optional(),
  capture: captureAssetSchema.optional(),
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

export const firstUseStepIdSchema = z.enum([
  'privacy',
  'drivers',
  'connection',
  'activities',
  'eui',
  'handoff',
]);

export const firstUseStepSchema = z.object({
  id: firstUseStepIdSchema,
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
  durationInSeconds: z.number().min(2).max(12),
});

export const firstUseWalkthroughSchema = z.object({
  device: z.enum(['phone', 'tablet']),
  title: z.string(),
  subtitle: z.string(),
  version: z.string(),
  accentColor: z.string(),
  steps: z.array(firstUseStepSchema).length(6),
  closing: z.string(),
});

export type FirstUseStepId = z.infer<typeof firstUseStepIdSchema>;
export type FirstUseStep = z.infer<typeof firstUseStepSchema>;
export type FirstUseWalkthroughProps = z.infer<typeof firstUseWalkthroughSchema>;
