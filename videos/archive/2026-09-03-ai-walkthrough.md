---
id: ai-walkthrough
destination: social-walkthrough
---

# CTRLbot.AI — 2-minute walkthrough

> **Written after the fact.** `docs/VIDEO_WORKFLOW.md` is the contract for a video that
> starts from a prompt; this one started from a finished screen recording with narration
> (`CTRLbot AI Walkthrough.mp4`), so the beats were transcribed rather than invented and
> the cut was built in one pass instead of task-by-task with a gate between each. This
> brief exists so the video is documented like the others and so a re-cut has something to
> read. The 30-second website version should go through `/video-prep` normally.
>
> `social-walkthrough` was added to `src/destinations.ts` for it. YouTube imposes almost
> nothing a linter can check, so that entry is mostly a frame size and a duration window —
> but it carries the house `maxInertFraction`, which is the gate this cut actually had to
> be re-paced to pass.

## Watching

Someone who has already been told "it's an AI that asks questions" and does not believe it
is different from the chat box they already have. They are not looking for a troubleshooter;
they are deciding in about ten seconds whether this is another wrapper.

## Promise

It asks the questions a technician would ask before it answers — and keeps nothing.

## Narration

- Mode: `source-edit`
- Source recording: `CTRLbot AI Walkthrough.mp4`
- Timestamped transcript: `docs/AI-WALKTHROUGH-TRANSCRIPT.md`
- Prepared audio: `public/narration/ai-walkthrough/source-normalized.m4a`
- Edit list: `src/marketing/ai-walkthrough/aiWalkthroughNarration.ts`
- Silent composition: `AI-Walkthrough`
- Narrated composition: `AI-Walkthrough-Narrated`
- Narrated output: `out/ai-walkthrough-2min-narrated.mp4`

## Beats

Cut order. Seconds sum to 120 at 30fps. The surface is `CtrlbotWeb` throughout, inside
`BrowserFrame` at `https://ctrlbot.ai/`, with no camera move anywhere in the cut.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| open | It opens as a black page with one box | `CtrlbotWeb` | Logo and an empty pill reading *Spill it*, caret blinking. No nav, no sign-in, no banner anywhere in the window | 6 |
| type | The whole input is one plain sentence | `CtrlbotWeb` | `I broke my phone` types into the pill over 44 frames; nothing else on the page changes | 7 |
| quick | It states an assumption, then narrows with YES/NO | `CtrlbotWeb` | Instant card lands, then five question rows arrive 60 frames apart — the site's own 2s pause — four flipping from a YES/NO pair to a bold answer as the column scrolls up under them | 15 |
| targeted | The answer options explain themselves | `CtrlbotWeb` | Assumption card with a Wikipedia link, then YES / NO / PASS arriving 60 frames apart, each carrying its own description line | 15 |
| thinking | It shows the context it collected | `CtrlbotWeb` | 💭 panel with a yellow left border; six replay lines arrive one at a time and the label turns from *Thinking…* to *Done thinking* | 6 |
| sources | Three genuine sources, none sponsored | `CtrlbotWeb` | Wikipedia, Reddit and a YouTube result with thumbnail and duration arrive 90 frames apart | 13 |
| answer | It tells you the truth, not what you want to hear | `CtrlbotWeb` | Three paragraphs of the real answer arrive 110 frames apart, in voice, under the video link | 15 |
| privacy | Press ✕ and there is nothing left | `CtrlbotWeb` | Page is back to logo and pill, with a different placeholder — no history, no trace of the session | 6 |
| faq | It answers questions about itself, instantly | `CtrlbotWeb` | FAQ answer card lands, then five related questions stack in underneath 60 frames apart | 16 |
| themes | Six looks, one click apart | `CtrlbotWeb` | Hard cut through dark, light, orange, yellow, the AV gradient and the 8-bit terminal, 70 frames each | 14 |
| close | The name and the address, once | `CtrlbotWeb` | Page at rest on the opening state; *Break. Fix. Solve IT.* in the copy column | 7 |

## Anything unusual

- **No camera move in the whole cut**, by request. `<Stage>` still carries the layout with
  a single locked-off shot, so the panel and copy geometry stay the house ones.
- **The background is the house promo bloom**, on the same path the two EUI promos use —
  `background.promo` with the centre easing 72%/26% → 60%/40% across the cut. It opened on
  `<Stage>`'s default `background.stage`, which is the same hue at roughly a third of the
  alpha and read as flat black beside the other cuts.
- **The surface is a website, so it gets a browser and not a bezel.** `BrowserFrame` is
  deliberately generic — no vendor geometry or branding. The only brand text in the chrome
  is CTRLbot's own: the address, and `Break Fix Solve IT!`, which is the site's real
  `<title>`.
- **What is on screen inside the browser is real model output**, transcribed from the
  recording's frames rather than written. Where a block was too long for the 500px column
  it was cut from the end, never reworded. That includes the snark — *"Is your device older
  than your last relationship?"* is a real question from the bank, and *"You'll waste my
  time and your own by guessing"* is the real PASS description.
- The theme order is the one the frames show, not the one the narration says: the speaker
  skips orange when listing them.
- **There is no timer bar**, though the site defines a `--timer-bar-color` and the 15-second
  Q.AI window is real. `#timer-bar` is `display: none !important` in the live stylesheet,
  commented "no visible timer during L.AI" — so drawing one would be inventing a feature.
  That colour's only surviving job is the thinking panel's left border, which is why the
  panel has a yellow edge.
- **The cut was re-paced to pass `video:frames`.** The first assembly measured 87% inert
  against a 60% ceiling: every beat put its content up in the first two seconds and then
  held. The fix was structural, not cosmetic — reveal animations stretched to 34/42 frames
  so their tails overlap, arrivals spread across the whole beat, a linear scroll under the
  column while content lands, and the three beats where the page genuinely does nothing
  (`open`, `privacy`, `close`) cut back to six or seven seconds.
- 16:10 30-second website cut is the next deliverable and is not this file.
