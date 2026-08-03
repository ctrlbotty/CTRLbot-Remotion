# Plan — the video assembly line



Fill out a template. A high model turns it into atomic tasks. Gemini runs them.
Gates between every task stop slop from reaching the render. Then you iterate.

Not a one-shot machine. The goal is *in the ballpark and never slop*, with a fast
loop for tuning.

---

## 1. Why the promo is slop — from the source, not from taste

The fix has to target the real failure, and the real failure is not bad taste.

`src/compositions/MasterControlPromo.tsx`, 648 lines:

- **It imports nothing from this repo.** Only `remotion`, `@remotion/transitions`,
  and `theme`. Zero from `app-ui/`, `camera/`, `scenes/`. No `<Camera>`, no
  `<Callout>`. Ten `<CanvasImage>` PNGs cross-fading — the live-surface-plus-camera
  architecture this repo exists for is entirely unused.
- **One block, copy-pasted.** Four byte-identical eyebrow divs. Ten image blocks
  sharing the literal `left: 236, top: 88, width: 1449, height: 970`.
- **Six words of taxonomy carry 30 seconds.** *End User Interface, Power On,
  Many-to-One, Many-to-Many, Phone + tablet.* No promise. Nothing a stranger learns.
- **Not composed.** `phone-tablet.png` crops `Input 1` to `UT 1`. `welcome.png`
  leaves a 235px black band. Every surface is a screenshot with its bezel baked in —
  which the app repo's own capture hygiene rule explicitly forbids.
- **126 of 900 frames on a static logo**, in a format where only the first 30s play.

**Root cause: First-Run had gates and the promo had none.** Locked copy, derived
regions, mandatory camera holds, reading-speed timing, an 11-point checklist — all
of it already exists in `docs/AUTHORING.md`. As prose. Prose is advisory.

The work is making it executable.

---

## 2. The landscape look — panel right, copy left

Your call, and it fixes the 16:10-in-16:9 problem properly. This becomes a layout
law written once, not numbers retyped per scene.

```
┌──────────────────────────────────────────────────────┐
│                                    ┌───────────────┐ │
│   MANY-TO-MANY                     │               │ │
│                                    │   TabletEui   │ │
│   Route across                     │   960 × 600   │ │
│   displays                         │   (16:10)     │ │
│                                    │               │ │
│   Select an input, then tap        └───────────────┘ │
│   an output.                                         │
│                                                      │
│   ← blue-black gradient, glow centred behind panel → │
└──────────────────────────────────────────────────────┘
   96        700 max          92           960      72
```

**`src/marketing/Stage.tsx`** — one component, the only way a marketing scene lays
out in landscape:

| | Default | Why |
|---|---|---|
| Panel | right-aligned, 72px margin, vertically centred | the surface is the proof; it sits where the eye lands last |
| Panel size | sized by **height**, not scale — tablet 600 (→ 960×600, 0.75×), phone 840 (→ 388×840) | one number tunes both form factors, and 16:10 stays exactly 16:10 |
| Copy column | left 96, max width 700 | shrink the panel and the copy column grows; both are props |
| Background | `background.stage` | see below |

**Three things this needs first:**

1. **`Camera` takes an optional `viewport` prop.** It currently calls
   `useVideoConfig()` and assumes it owns the full frame
   ([Camera.tsx:144](../src/camera/Camera.tsx:144)) — drop it into a 960×600 panel
   and every offset is computed against 1920×1080. One optional prop, defaulting to
   the current behaviour, so no existing call site changes. **Then the camera still
   works inside the panel** — push into a control, hold, pull out, all within the
   panel box. That is the difference between this and the slop, and it is worth the
   prop.

2. **`background.stage` in `theme.ts`, derived not invented.** `AGENTS.md` says
   never invent a color, and `theme.ts` is the layer allowed to make video-facing
   decisions. So the blue-black is CTRLbot blue at low alpha over the app's black:

   ```ts
   stage: `radial-gradient(120% 90% at 76% 50%,
             rgba(0,143,212,0.22) 0%,
             rgba(0,143,212,0.06) 38%,
             ${color.void} 72%)`
   ```

   The glow sits behind the panel, so the panel is lit rather than pasted on. It
   also kills the flat-black-band failure by construction. **One named export, and a
   lint rule that marketing scenes may not write an ad-hoc gradient** — that is what
   stops the next model reinventing a slightly different one per scene.

3. **`Stage` supersedes `Callout` for marketing.** `Callout` is built for training
   cuts — scrims on portrait, a floating card on landscape. Marketing copy is a
   column in the layout, not an overlay on the product. Training cuts keep `Callout`
   untouched.

---

## 3. The workflow, cut down

No roadmap. No sprints. No status columns. One file per video, one loop.

```
  videos/_TEMPLATE.md
        │  you fill it out          ~10 minutes
        ▼
  videos/<slug>.md                  brief
        │  /video-prep              Opus or Codex Sol, once, thinks hard
        ▼
  videos/<slug>.md                  brief + [ ] T1..Tn appended
        │  Gemini AGY runs the loop
        ▼
  implement → gate → commit → next        repair up to 3× on failure
        │
        ▼
  out/<slug>/contact.png            one sheet — you look at it
        │  mark a beat ❌ → it becomes a new task → loop reruns
        ▼
  render
```

Two roles only:

- **Prep (high model, once).** Reads the brief, the app's Android resources, and
  `AUTHORING.md`. Writes the beat-by-beat task list, the shot lists, and the copy.
  This is where the thinking happens and it is worth the tokens.
- **Run (Gemini, N times).** Each task is one sentence, 1–3 files, independently
  renderable. Fresh context per task. It cannot invent, only build what prep
  specified — and the gate decides whether it did.

**`docs/VIDEO_WORKFLOW.md` is the contract**, in plain markdown, because Gemini
reads that and not `.claude/agents/`. The Claude commands and agents are thin
wrappers that point at it.

---

## 4. The gates

Built on the TypeScript compiler API — `typescript` is already a devDependency, so
no new packages.

**Two severities, because you want iteration not perfection:**
`error` blocks the commit. `warn` prints and moves on.

### error — the slop signatures

| Rule | Fails when |
|---|---|
| `no-static-slideshow` | a beat renders only images/video with no `<Camera>` ancestor |
| `no-duplicate-beats` | ≥2 JSX blocks with matching normalized AST hash, differing only in a string |
| `no-device-bezel` | a `marketing/*.png` used as a full-frame surface where a live `app-ui/` component exists |
| `stage-only-background` | a marketing scene writing its own gradient instead of `background.stage` |
| `theme-colors-only` | a hex literal absent from `theme.ts` |
| `clamped-interpolate` | `interpolate()` missing either `extrapolate*: 'clamp'` |
| `no-spring-camera` | `Easing.spring` reachable from a `<Camera shots>` |
| `duration-matches` | `<Composition durationInFrames>` ≠ computed sum − overlaps |
| `orphan-asset` | a `staticFile()` path not on disk |
| `reading-time` | on-screen frames < `ceil(words / 3.5 × fps) + 20` |
| `banned-phrases` | a destination-banned string — for Play: *download now, install now, try now, #1, best, top rated, award, testimonial*, price patterns |
| `no-deferred-features` | EndPoint switching or another hidden feature mentioned |
| `no-secrets` | credential, customer name, public IP, or real room name patterns |

### warn — craft, where taste is still yours

`camera-holds`, `house-easing`, `audiowide-headlines-only`, `app-terminology`,
`copy-length`, `annotation-radius`.

### Frame gates — `npm run video:frames -- <slug> …`

**Built, and calibrated against all three cuts in `out/`.** Three of the five gates
in the original plan changed shape once measured — see §11.

| Gate | Severity | Fails when |
|---|---|---|
| `validate` | error | brief arithmetic: beats over/under the destination window, a beat with no evidence or no surface, the promise landing after the first-impression window |
| `contact-sheet` | artifact | one still per beat at `start + 25`, tiled into an HTML sheet with each beat's evidence line beside its frame |
| `inert-fraction` | error | more than 60% of sampled intervals show no perceptible change — replaces `dead-air` |
| `content-area` | warn | median content box under 85% of frame — replaces `edge-coverage` |
| `frame-extraction` | error | a sample could not be extracted at all, so the gates did not actually run |

`-- <slug> contact --beat=route` re-renders one beat's still. That is the tuning
loop.

Measured 2026-08-02, sampling at 0.25s:

| | promo (bad) | phone (good) | tablet (good) |
|---|---|---|---|
| inert intervals | **72%** | 40% | 47% |
| longest inert run | 2.75s | — | 4.25s |
| median content area | 0.71 | 0.80 | 0.97 |

### The calibration test — this is the acceptance condition

The linter must **fail `MasterControlPromo.tsx`** on `no-static-slideshow`,
`no-duplicate-beats`, and `no-device-bezel`, and **pass `FirstRun.tsx` and all
seven scenes clean**. One known-bad cut and one known-good cut, both already in the
repo. If it cannot tell them apart it is not built.

---

## 5. The template — minimum you have to write

`videos/_TEMPLATE.md`. Everything constant across videos (voice, reading rate,
truth sources, the standing CTRLbot prohibitions) lives in `VIDEO_WORKFLOW.md`, not
in the form. This is the whole form:

```markdown
---
id: play-store-promo
destination: play-store-preview
---

# CTRLbot IoT — Play Store preview

## Watching

An AV integrator browsing the Play Store who has never heard of CTRLbot.
They assume room control means a processor, a programmer and a truck roll.
They do not know a tablet alone can be the control system.

## Promise

> One sentence. If it needs an "and", it is two videos.

Turn a phone or tablet into the whole room control system — no processor,
no laptop, no programmer.

## Beats

> Order = cut order. Evidence is the exact on-screen state change the viewer
> sees. A beat with no evidence is a title card, and title cards are what slop
> is made of. Seconds must sum to ≤ the destination max — the gate checks it.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| promise | The room runs from the tablet in your hand | `TabletEui` | EUI at rest, four outputs live, no setup chrome | 4 |
| route | Switching a source is one tap | `TabletEui` | Input 3 goes blue, Output 2 fills, same frame | 5 |
| all | One control routes every display at once | `TabletEui` | All pressed, four outputs take Input 3 | 4 |
| build | You build it on the device, with your thumbs | `DriverCatalog` | Catalog scrolls, device picked, test goes green | 8 |
| handoff | What you hand over is not what you configured with | `TabletEui` | Setup rail gone, tools icon held two seconds | 5 |
| close | — | `BrandCard` | Wordmark, ctrlbot.io | 4 |

## Anything unusual

> Optional. Overrides, a specific must-show, a panel size, a thing to avoid.
> Empty is fine.

---
<!-- prep writes below this line -->

## Tasks
## Review notes
## Contact sheet
```

That is it. Audience, promise, beats. Everything else is prep's job.

---

## 6. Files

```
videos/
  _TEMPLATE.md                 the form
  <slug>.md                    brief + tasks + review, one per video
src/
  destinations.ts              all profiles in one file; play-store-preview built
  marketing/Stage.tsx          the landscape layout law
  camera/Camera.tsx            + optional viewport prop
  design/theme.ts              + background.stage
scripts/
  lib/tsx-scan.mjs             TS compiler API wrapper
  video-lint.mjs               the rules
  video-frames.mjs             contact sheet + frame gates
docs/
  VIDEO_WORKFLOW.md            the contract: process, gates, handoff prompt,
                               anti-slop standard with the promo as worked example
.claude/
  commands/video-prep.md       /video-prep <slug>
  commands/video-run.md        /video-run <slug> [Tn]
  agents/beat-implementer.md   builds one beat, nothing more
  agents/beat-verifier.md      renders the still, looks at it, owns PASS/FAIL
```

New npm scripts: `video:lint`, `video:frames`.

**The verifier looks at a picture.** For code, "did it work" is a build. A
composition can typecheck, register, render, and still be garbage — so the verifier
renders the beat's still and checks it against the brief's `evidence:` line. It is
LENIENT, same as your app-repo verifier: FAIL only for an error-severity lint
failure, `npm run check` broken, or a beat that plainly is not what the brief says.
Everything else is a note. Close enough moves on — that is what makes iteration the
loop instead of the exception.

---

## 7. Build order

**A. The landscape look** — testable on its own with a still, before any workflow exists.

- [x] T1: Add an optional `viewport` prop to `Camera`, defaulting to `useVideoConfig()` — files: `src/camera/Camera.tsx`
- [x] T2: Add `background.stage`, CTRLbot blue at low alpha over `color.void` — files: `src/design/theme.ts`
- [x] T3: Add `src/marketing/Stage.tsx` — panel right sized by height, copy column left, stage background — files: `src/marketing/Stage.tsx`, `src/marketing/StageProof.tsx`, `src/Root.tsx`

**B. The gates** — calibrated against the three cuts already in the repo.

- [x] T4: Add `src/destinations.ts` with the `Destination` type and `play-store-preview` — files: `src/destinations.ts`
- [x] T5: Add `scripts/lib/tsx-scan.mjs`, a TS compiler API wrapper for JSX queries — files: `scripts/lib/tsx-scan.mjs`
- [x] T6: Add `scripts/video-lint.mjs` with the structural error rules and a `video:lint` script — files: `scripts/video-lint.mjs`, `package.json`
- [x] T7: Add the copy rules, reading banned phrases from the destination — files: `scripts/video-lint.mjs`
- [x] T8: Add `scripts/video-frames.mjs` — brief validation, contact sheet, `--beat` flag, frame gates — files: `scripts/video-frames.mjs`, `scripts/lib/brief.mjs`, `scripts/lib/png.mjs`, `package.json`

**C. The loop.**

- [x] T9: Add `videos/_TEMPLATE.md` — done early; T8's frame gates needed the brief parser — files: `videos/_TEMPLATE.md`
- [x] T10: Add `docs/VIDEO_WORKFLOW.md` — process, gate reference, Gemini handoff prompt, anti-slop standard citing the promo — files: `docs/VIDEO_WORKFLOW.md`
- [x] T11: Add the two commands and two agents — files: `.claude/commands/{video-prep,video-run}.md`, `.claude/agents/{beat-implementer,beat-verifier}.md`
- [x] T12: Unregister `Master-Control-Promo` from `Root.tsx`, point `AGENTS.md` at the video line, add the linter selftest — files: `src/Root.tsx`, `AGENTS.md`, `scripts/video-lint.mjs`, `package.json`

**D. Reference capture** — optional, and deliberately after the promo ships. See §10.

- [ ] T13: Add `scripts/video-reference.mjs` and the `@remotion/install-whisper-cpp` dependency — extract frames with the bundled ffmpeg, transcribe narration locally, write a starter brief with the beats table pre-filled from the transcript — files: `scripts/video-reference.mjs`, `package.json`

Between C and D: fill `videos/play-store-promo.md`, run it, and find out where the
gates are wrong.

---

## 8. Calls I made

1. **Node ESM, no new dependencies.** The linter runs on the `typescript` already
   installed.
2. **One markdown file per video** — brief, tasks and review in the same file.
3. **The promo gets rebuilt on live surfaces.** `TabletEui` and `PhoneEui` are
   already prop-driven for inputs, outputs, selection, volume and mute. The
   `public/marketing/eui/*.png` screenshots stop being the source.
4. **`MasterControlPromo.tsx` is kept, unregistered** — cited in the workflow doc as
   the worked failure. A named example beats a rule.
5. **One destination built, the rest when we need them.** `ctrlbot.io` gets its
   profile when we build for it.

## 9. Worth knowing

`../CTRLbot-IoT/planning/RELEASE-MEDIA-PLAN.md` records a V1 decision to omit the
listing video. **That decision has since changed — the listing video is wanted.**
That doc is now stale on this point and should be corrected when someone is next in
the app repo.

---

## 11. What measurement changed

Three gates from the original plan did not survive contact with the two cuts they
were supposed to distinguish. Recorded because the reasoning matters more than the
rules.

**`dead-air` would have failed the approved cut.** The plan called for flagging a
run of near-identical frames. Measured, the approved First-Run tablet cut holds for
**4.25s** and the slop promo's longest hold is **2.75s** — the good cut holds
*longer*. That is not an accident: `AUTHORING.md` requires a hold before and after
every camera move, so a still run is the house style. The signal that actually
separates them is what share of the whole cut is inert (72% vs 47%), so the gate
became `inert-fraction`.

**`edge-coverage` is not safe to block on.** Median content area came out 0.71 for
the promo, 0.80 for the approved phone cut, 0.97 for the approved tablet cut. Four
points between the worst good cut and the bad one is not a margin. CTRLbot is a
black-on-black product and this metric cannot tell legitimate black from empty
frame, so it warns and the contact sheet settles it.

**`safe-area` is not built.** It needs to know where text is, which the source knows
and the pixels do not. It belongs in `video-lint.mjs` as a rule over absolute
positioning, not in the frame gates. Not yet written.

**`first-ten` moved earlier and got cheaper.** It is pure brief arithmetic — no
render needed — so it runs in `validate` and fails in about a second.

**The failure exhibit had to leave the default scope.** Keeping
`MasterControlPromo.tsx` in the linted set meant `npm run video:lint` would exit 1
forever, and a gate whose exit code is always 1 is not a gate — nothing can key off
it and people stop reading it. It is excluded from ordinary runs and asserted on by
`npm run video:lint:selftest`, which fails if the rules stop catching it. That
self-test was itself mutation-tested: weakening `no-duplicate-styles` makes it fail
with `MISSED no-duplicate-styles`, and restoring the rule makes it pass.

**ffmpeg is not a general-purpose tool here.** The binary inside
`@remotion/compositor` is built `--disable-filters` with a short whitelist: no
`crop`, `cropdetect`, `freezedetect`, `signalstats`, `tblend` or `tile`. A first
implementation used four of those, and because ffmpeg failed on a missing *encoder*
rather than a missing *filter*, every check silently passed. Pixel analysis now runs
in Node against PNGs decoded with built-in `zlib` (`scripts/lib/png.mjs`), and a
sample that cannot be extracted is a hard error. **A gate that cannot run must fail
loudly; one that quietly passes is worse than none, because it is trusted.**

---

## 10. Reference capture — optional, per video

A narrated screen recording is an **input that fills the template**, never a
replacement for it and never the shipped footage.

**What reaches the model:** frames, and a timestamped transcript. Audio cannot be
heard directly — everything goes through transcription, so anything that matters
has to be said in words. Tone and emphasis are lost.

**What it is worth:**

1. **Product accuracy ground truth.** After the structural gates, the largest
   remaining slop vector is showing a flow the app does not have. The ROADMAP
   already logs this costing time twice — the `switching-preview.png` filename that
   lied about the screen, and spotlights landing on the wrong row. A recording of
   the real flow is unfalsifiable.
2. **Nathan's voice, verbatim.** Copy is the weakest link in an LLM-drafts pipeline.
   Copy derived from narrating it as an installer beats copy drafted from a one-line
   claim, and it is the exact voice `AUTHORING.md` asks for.
3. **Measured timing instead of assumed.** Word-level timestamps replace the assumed
   3.5 words/sec that currently sizes every beat.
4. **The VO variant for free.** ROADMAP lists it as not started; a narrated capture
   is the raw material, already timed.

**Toolchain, confirmed present:** `@remotion/compositor-win32-x64-msvc/ffmpeg.exe`
is already installed, so frame and audio extraction cost nothing new.
`@remotion/install-whisper-cpp` with `tokenLevelTimestamps: true` runs whisper.cpp
locally — one dependency, one model download, nothing leaves the machine. `small.en`
(~500MB) is sufficient for clear single-speaker narration; `medium.en` (~1.5GB) is
not needed.

```bash
npm run video:reference -- captures/eui-walkthrough.mp4 play-store-promo
```

Frames to `videos/<slug>/reference/`, narration to `narration.json`, and a starter
brief whose beats table is pre-filled from the transcript's natural pauses with
seconds taken from the timestamps. Correcting beats is much faster than authoring
them cold — that is the actual saving.

**Where it pays:** a flow just built that the model has never seen; non-obvious
interactions; anything otherwise described in prose.
**Where it does not:** the Play promo. Five beats, a story already known cold, and
surfaces already built and prop-driven. Recording plus retakes is slower than
filling the form.

Capture hygiene is unchanged from `RELEASE-MEDIA-PLAN.md` — fictional room names,
private-range IPs, no credentials, no customer detail.
