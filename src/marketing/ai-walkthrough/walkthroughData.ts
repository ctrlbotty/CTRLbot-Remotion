// The 2-minute CTRLbot.AI walkthrough: beat timings, copy, and the session it replays.
//
// Two separate things live here, and the split is the point.
//
// `BEATS` and `COPY` are the video. They are written from
// `docs/AI-WALKTHROUGH-TRANSCRIPT.md` — the speaker's own walkthrough — and checked
// against the approved claims in
// `../0 - CTRLbot.ai/ctrlbot.ai/docs/about/About_CTRLbot_AI.md`. Nothing is claimed here
// that is not on that document's "safe, current claims" list.
//
// `SESSION` is what is on the screen inside the browser, transcribed from the frames of
// the walkthrough recording rather than written. It is real model output, snark and all,
// which is the only reason a promo is allowed to show it: the alternative is inventing
// plausible-looking product output, and a viewer who then types the same prompt gets
// something else. Where a block was trimmed to fit the 500px column it was trimmed from
// the end, never reworded.

/**
 * 30fps. Beat boundaries, in frames. The cut is exactly 120 seconds.
 *
 * The three beats where the page is doing nothing — `open`, `privacy`, `close` — are the
 * short ones on purpose. `npm run video:frames -- ai-walkthrough check` measures how much
 * of the cut shows no perceptible change against a 60% ceiling, and a still page is still
 * however long you leave it up. The beats where something arrives get the time instead.
 */
export const BEATS = {
  open: {from: 0, duration: 180},
  type: {from: 180, duration: 210},
  quick: {from: 390, duration: 450},
  targeted: {from: 840, duration: 450},
  thinking: {from: 1290, duration: 180},
  sources: {from: 1470, duration: 390},
  answer: {from: 1860, duration: 450},
  privacy: {from: 2310, duration: 180},
  faq: {from: 2490, duration: 480},
  themes: {from: 2970, duration: 420},
  close: {from: 3390, duration: 210},
} as const;

export const WALKTHROUGH_FRAMES = BEATS.close.from + BEATS.close.duration;

/**
 * The copy column, one entry per beat.
 *
 * Titles stay under 40 characters — `video-lint`'s `copy-length` rule, and the practical
 * limit of Audiowide at `type.title` in a 635px column. Bodies are sized against the
 * reading-rate gate, which allows about 9.5 words a second and is measured from the
 * enclosing Sequence.
 */
export const COPY = {
  open: {
    eyebrow: 'CTRLBOT.AI',
    title: 'Asks first. Assumes later.',
    body: 'A diagnostic AI, not a chatbot. It opens as a black page with one box — no sign-in, no sidebar, no cookie banner.',
  },
  type: {
    eyebrow: 'STEP ONE',
    title: 'Say what is broken',
    body: 'Type the problem in plain language. That is the entire input — no account, no setup, no prompt engineering.',
  },
  quick: {
    eyebrow: 'STEP TWO',
    title: 'Fast questions',
    body: 'It states its first assumption in about a second, then streams YES/NO questions that narrow the fault. Each one is personalised with the details you gave, and answering costs a click.',
  },
  targeted: {
    eyebrow: 'STEP THREE',
    title: 'Answers you can click',
    body: 'Then one sharper question — where every option explains what choosing it would mean for the diagnosis. YES, NO, or PASS when you genuinely do not know.',
  },
  thinking: {
    eyebrow: 'BEFORE THE ANSWER',
    title: 'It shows its work',
    body: 'A panel replays the session while the answer generates — your prompt, every question, and the answer you gave it. Collected context, not a guess about it.',
  },
  sources: {
    eyebrow: 'STEP FOUR',
    title: 'Three real sources',
    body: 'Wikipedia, Reddit, and a video that actually helps. Genuine links every time, and none of them sponsored — there is no advertising anywhere in the product.',
  },
  answer: {
    eyebrow: 'THE ANSWER',
    title: 'Hard truths',
    body: 'Written like an IT admin who got called in on a Saturday. The attitude is not decoration — it is why you never wonder whether it is telling you what you want to hear.',
  },
  privacy: {
    eyebrow: 'BY DESIGN',
    title: 'Nothing is kept',
    body: 'No login. No account. No history, no ads, no tracking. Press the ✕ and the session is gone — there is nothing to delete, because nothing was saved.',
  },
  faq: {
    eyebrow: 'THE FAQ',
    title: 'Ask about CTRLbot',
    body: 'Sit on the page and the FAQ surfaces on its own. Click a question and the answer arrives instantly from a pre-written bank, with related follow-ups underneath.',
  },
  themes: {
    eyebrow: 'ONE CLICK',
    title: 'Six themes',
    body: 'Click the logo to cycle the theme — light, orange, yellow, an AV gradient, and an 8-bit terminal. It is the only thing your browser remembers.',
  },
  close: {
    eyebrow: 'CTRLBOT.AI',
    title: 'Break. Fix. Solve IT.',
    body: 'Free, no login, nothing saved. Open it and type.',
  },
} as const;

// ── what is on the screen ────────────────────────────────────────────────────────────

export const PROMPT_TEXT = 'I broke my phone';

/** Two of the site's randomised placeholders, both from the recording. */
export const PLACEHOLDER_OPENING = 'Spill it';
export const PLACEHOLDER_RESET = 'Ugh, what do you want now, human?';

/** The instant assumption — up in about a second, before anything else loads. */
export const INSTANT =
  'Your phone is likely experiencing a hardware or software failure — common causes ' +
  'include a dead battery, overheating, or a dropped screen (if cracked). If it is ' +
  'unresponsive, try a hard reset (hold volume + power) or check if it is plugged in ' +
  'properly. If those do not work, it may need a professional repair.';

/**
 * The Q.AI rows, in the order they streamed in, with the answers the speaker clicked.
 *
 * The third one is not a joke someone added to this file — the question bank really does
 * ask it, and it is on screen in the recording at 0:39. It is left in because the snark
 * is the product's trust mechanism, and sanding it off here would misrepresent the thing
 * the video is selling.
 */
export const QUICK_QUESTIONS = [
  {text: 'Is the screen cracked or physically damaged?', answer: 'YES'},
  {text: 'Did you break your phone yourself?', answer: 'NO'},
  {text: 'Is your device older than your last relationship?', answer: 'YES'},
  {text: 'Is your phone too old?', answer: 'NO'},
  {text: 'Are you using iCloud?', answer: undefined},
] as const;

/** L.AI #1 — the long assumption, built from the prompt plus every YES/NO answer. */
export const ASSUMPTION =
  'You are not just asking about a cracked screen — you are asking because your phone is ' +
  'dead, the battery is dead, or it is just not working at all. Congrats on your third ' +
  'phone in three years.';

export const ASSUMPTION_RESOURCE = {
  source: 'Wikipedia · en.wikipedia.org › Electronics › Batteries',
  title: 'Battery degradation',
  date: 'Last updated Mon 28, 2024 —',
  snippet: 'Why your phone will not hold a charge, and what to do about it.',
  tint: '#BFBFBF',
};

export const TARGETED_QUESTION =
  'Is your phone fully dead (no power button response, no light), or is it just ' +
  'unresponsive (screen on but frozen)?';

export const TARGETED_OPTIONS = [
  {kind: 'YES', description: 'Your phone is completely dead — no charge, no power button, no life.'},
  {kind: 'NO', description: 'Your phone is stuck or frozen — screen is on but will not open.'},
  {kind: 'PASS', description: 'You will waste my time and your own by guessing.'},
] as const;

/**
 * The reasoning playback, as the panel replays it.
 *
 * The original query, each question with the answer that was clicked, and the assumption
 * that came out of it — which is what `About_CTRLbot_AI.md` says the panel contains. It
 * is a replay of collected context, so every line here is something already on screen
 * earlier in the cut; nothing is invented for it.
 */
export const THINKING_LINES = [
  'Query: I broke my phone',
  'Screen cracked or physically damaged? — YES',
  'Did you break it yourself? — NO',
  'Older than your last relationship? — YES',
  'Is your phone too old? — NO',
  'Assumption rejected: not completely dead. Stuck or frozen.',
];

/** The three sources under the final answer. */
export const RESOURCES = [
  {
    source: 'Wikipedia · en.wikipedia.org › Technology › Consumer electronics',
    title: 'Smartphone',
    date: 'Oct 12, 2024 —',
    snippet:
      'Covers common failure modes of modern smartphones including physical damage and ' +
      'why cracked screens lead to further issues.',
    tint: '#BFBFBF',
  },
  {
    source: 'Reddit · reddit.com › r › mobilerepair',
    title: 'r/mobilerepair — Device Repair Discussions',
    date: 'Nov 2, 2024 —',
    snippet:
      'Real user reports on cracked phones that died shortly after, and what actually ' +
      'fixed them.',
    tint: '#FF0000',
  },
  {
    source: 'YouTube · JerryRigEverything',
    title: 'Phone Won’t Turn On After Screen Crack? Do This First',
    snippet:
      'Shows exactly what a cracked screen can do to internals, and the quick checks ' +
      'before you waste money.',
    youtube: {views: '892K+ views', age: '11 months ago', duration: '8:14'},
  },
];

/** The answer itself. Paragraph breaks as they appear on the page. */
export const ANSWER = [
  'Great, so it is not dead or frozen. You just smashed the screen on a phone that is ' +
    'not ancient, and it is now your problem.',
  'Cracked glass does not usually kill the whole thing unless you also mangled the ' +
    'digitizer, battery connector, or got debris inside.',
  'First, force restart it properly for your model (hold volume down + power for 10-15 ' +
    'seconds). If it boots, back up everything immediately, because that screen is only ' +
    'getting worse.',
];

// ── the FAQ ──────────────────────────────────────────────────────────────────────────

export const FAQ_QUESTION = 'Do I need to create an account to use CTRLbot.AI?';

export const FAQ_ANSWER =
  'No, you do not need to create an account to use CTRLbot.AI. There is no login, no ' +
  'sign-up, and no email required — just open the page and start using it.';

export const FAQ_RELATED = [
  'Is CTRLbot.AI free to use?',
  'How does CTRLbot.AI protect my privacy?',
  'Can businesses use CTRLbot.AI?',
  'Can I use CTRLbot.AI on my phone or tablet?',
  'Does CTRLbot.AI save my conversations?',
];
