import type {NarrationClip} from '../../audio/NarrationTrack';

/**
 * Audio-only, loudness-normalized copy of `CTRLbot AI Walkthrough.mp4`.
 *
 * The original screen recording stays at the repository root. Keeping this derivative
 * in public/ lets Remotion seek it deterministically without duplicating the 121 MB
 * video inside the bundle.
 */
export const AI_WALKTHROUGH_NARRATION_SOURCE =
  'narration/ai-walkthrough/source-normalized.m4a';

/**
 * A two-minute edit of Nathan's original walkthrough narration.
 *
 * Source boundaries come from word-level timestamps generated from the local recording.
 * Timeline positions follow the eleven beats in walkthroughData.ts. The gaps are
 * intentional: they let the interface breathe and keep every cut on a complete thought.
 */
export const AI_WALKTHROUGH_NARRATION_CLIPS = [
  // Open + type: identify the product, then explain the question-first premise.
  {id: 'welcome', at: 0.45, sourceStart: 0.5, sourceEnd: 11.55},
  {id: 'problem-in', at: 11.75, sourceStart: 12.55, sourceEnd: 23.2},

  // Quick questions: explain why each answer improves the next assumption.
  {id: 'better-assumption', at: 22.65, sourceStart: 44.5, sourceEnd: 50.2},

  // Targeted question: the snark exists to deliver useful, honest answers.
  {id: 'snark', at: 28.55, sourceStart: 52.1, sourceEnd: 55.15},
  {id: 'hard-truths', at: 31.85, sourceStart: 66, sourceEnd: 70.2},
  {id: 'integrity', at: 36.3, sourceStart: 77.8, sourceEnd: 83.95},

  // Thinking, sources, and answer.
  {id: 'thinking', at: 43.1, sourceStart: 112, sourceEnd: 117.7},
  {id: 'sources', at: 49.4, sourceStart: 119.6, sourceEnd: 130.9},
  {id: 'answer', at: 62.3, sourceStart: 131.8, sourceEnd: 145.55},

  // Privacy: no account furniture, just the assistant.
  {id: 'no-sign-in', at: 77.3, sourceStart: 177.6, sourceEnd: 180.4},
  {id: 'clean', at: 80.35, sourceStart: 184.2, sourceEnd: 185.95},

  // FAQ: idle prompt, click-through, and the free/no-account answer.
  {id: 'faq-appears', at: 83.1, sourceStart: 186.45, sourceEnd: 194.75},
  {id: 'faq-click', at: 91.4, sourceStart: 194.95, sourceEnd: 198.55},
  {id: 'faq-free', at: 94.95, sourceStart: 202.65, sourceEnd: 206.75},

  // Themes: narration lands inside the matching visual hold.
  {id: 'theme-light', at: 99.45, sourceStart: 231.4, sourceEnd: 232.9},
  {id: 'theme-click', at: 101.55, sourceStart: 233.43, sourceEnd: 234.4},
  {id: 'theme-yellow', at: 103.95, sourceStart: 238.85, sourceEnd: 240.45},
  {id: 'theme-av', at: 106.2, sourceStart: 241.45, sourceEnd: 243.55},
  {id: 'theme-retro', at: 108.2, sourceStart: 244.67, sourceEnd: 247.45},

  // Close: a compact sign-off, with room for the final card to settle.
  {id: 'summary', at: 113.2, sourceStart: 249, sourceEnd: 252.8},
  {id: 'thank-you', at: 118.5, sourceStart: 259.2, sourceEnd: 259.85},
] as const satisfies readonly NarrationClip[];
