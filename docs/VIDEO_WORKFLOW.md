# Video workflow — the assembly line

This file is the contract. Any agent running a video reads this one, not the Claude
command definitions — those are conveniences that point back here.

Fill out a template. A high model turns it into atomic tasks. A cheap model runs
them. Gates between every task stop slop reaching the render. Then you iterate.

It is not a one-shot machine. The goal is *in the ballpark and never slop*.

When the starting point is Nathan's narrated app demonstration, use the source recording
to fill the same brief instead of inventing the beat order or rewriting his voice. The
complete branch is in [NARRATED-WALKTHROUGH.md](NARRATED-WALKTHROUGH.md): prepare the
recording's audio, index it with a timestamped transcript, build the motion graphic and
voice edit together, and render it narrated in both shapes, landscape and portrait. The
same visual and product-accuracy gates below still apply.

```
  videos/_TEMPLATE.md
        │  Nathan fills it out                       ~10 minutes
        ▼
  videos/<slug>.md                                   brief
        │  /video-prep <slug>                        Opus or Codex Sol, once
        ▼
  videos/<slug>.md                                   brief + [ ] T1..Tn
        │  the line runs                             Gemini AGY, Sonnet, Codex
        ▼
  implement → verify → commit → next                 up to 2 repair rounds
        │
        ▼
  render + out/<slug>/contact.html                   no stop before this
        │
        ▼
  Nathan watches the render                          the one human gate
        │  a ❌ becomes a new task → the loop reruns
```

---

## Roles

**Prep — high model, once per video.** Reads the brief, the Android resources, and
`AUTHORING.md`. Writes the task list, the shot lists, and the copy. This is where
the thinking happens and it is worth the tokens.

**Run — cheap model, once per task.** One task, one sentence, 1–3 files, fresh
context. It builds what prep specified. It does not invent scope, copy, or beats.
The gate decides whether it worked.

---

## The station cycle

Each task goes through one cycle:

1. **Implement** — fresh agent, one task, hard scope limits. Does not commit.
2. **Verify** — a separate set of eyes, tuned LENIENT. Runs the gates *and looks at
   the rendered still*. Three verdicts:
   - **PASS** → commit, `[x]`, next task.
   - **PASS WITH NOTES** → same, plus a line under `## Review notes`. No pause.
   - **FAIL** → repair loop with a concrete fix list, up to **two rounds**. Still
     failing after that: mark `[!]`, record the evidence, stop — later tasks would
     inherit a broken baseline.
3. **Commit** — path-scoped, the task's files plus the brief. Never `git add -A`.

FAIL is reserved for exactly three things:

1. `npm run video:lint` reports an **error** (warnings are never a FAIL).
2. `npm run check` is broken.
3. The beat plainly is not what the brief's `evidence:` column says, or renders blank.

Everything else — style, naming, could-be-cleaner, imperfect-but-working — is at
most a note. **Close enough moves on.** When torn between FAIL and PASS WITH NOTES,
choose PASS WITH NOTES. Iteration is the loop, not the exception.

### Task format

Machine-parsed. Keep it exact.

```
- [ ] T1: One sentence naming what changes — files: src/marketing/<Beat>.tsx
- [x] T2: Verified and committed
- [!] T3: Blocked after two rounds — see Blocked notes
```

Cannot describe a task in one sentence naming its files? It is too big.

---

## The gates

```bash
npm run video:lint                              # source: structure and copy
npm run video:lint -- --destination=play-store-preview
npm run video:lint -- --report                  # copy timing measurements only
npm run video:frames -- <slug> validate         # brief arithmetic, no render, ~1s
npm run video:frames -- <slug> contact          # a still per beat + contact.html
npm run video:frames -- <slug> contact --beat=route   # just one, for tuning
npm run video:frames -- <slug> check out/<slug>.mp4   # the rendered file
```

Two severities everywhere. **`error` blocks and exits non-zero.** **`warn` prints
and moves on** — taste stays with the human.

### Source rules — `video-lint.mjs`

| error | fires when |
|---|---|
| `no-static-slideshow` | ≥3 flat images with no `<Camera>` or `<Stage>` |
| `no-duplicate-styles` | the same static style block appears ≥3 times |
| `no-device-bezel` | a `marketing/eui/*` screenshot used where a live surface exists |
| `clamped-interpolate` | `interpolate()` missing either `extrapolate*: 'clamp'` |
| `theme-colors-only` | a hex the app does not define |
| `no-spring-camera` | `Easing.spring` in a camera path |
| `orphan-asset` | a `staticFile()` path not on disk |
| `reading-time` | copy faster than 12 w/s |
| `banned-phrases` | a destination-forbidden phrase |
| `no-deferred-features` | EndPoint switching mentioned |
| `no-secrets` | a routable IP in copy |

`warn`: `reading-time` over 9.5 w/s, `copy-length` over 40 characters.

### Frame gates — `video-frames.mjs`

| gate | severity | fires when |
|---|---|---|
| `validate` | error | beats outside the destination window, a beat with no evidence or surface, the promise landing after the first-impression window |
| `opens-composed` | error | frame 0 differs from where the opening beat settles — the cut animates through its own poster frame |
| `inert-fraction` | error | over 60% of sampled intervals show no perceptible change |
| `frame-extraction` | error | a sample could not be extracted, so the gates did not run |
| `content-area` | warn | median content box under 85% of frame |

### Thresholds are measured, not chosen

Every number above came from the cuts in `out/`, sampled 2026-08-02:

| | promo (slop) | phone (approved) | tablet (approved) |
|---|---|---|---|
| inert intervals | **72%** | 40% | 47% |
| longest inert run | 2.75s | — | 4.25s |
| median content area | 0.71 | 0.80 | 0.97 |
| fastest copy block | — | 9.3 w/s | 9.3 w/s |

Two of those numbers changed the design:

- **The approved cut holds longer than the slop does** (4.25s vs 2.75s), because
  `AUTHORING.md` requires a hold before and after every camera move. A rule against
  long holds would have failed the signed-off work. Hence a gate on the *total*
  share of inert time, not on run length.
- **A textbook 3.5 words/sec would have failed almost the entire approved cut**,
  whose tightest beat runs at 9.3 w/s. The ceiling sits at 12.

Re-run `npm run video:lint -- --report` and revisit these if the house pace changes.
**Never tune a threshold to make a specific video pass.** Tune it against the two
reference cuts, or the gate stops meaning anything.

### Rules that came out of building the first promo

Every one of these was found by a gate or a rendered frame, not by reasoning. They are
here so the next video does not rediscover them.

**Frame 0 is the poster frame.** An autoplay listing shows it as a still before anyone
presses play, so it is the most-seen frame in the cut. The first promo opened on a 0.62
shot pulling back over 74 frames, and its poster was a cropped grey fragment in a black
field. Open composed. `opens-composed` now blocks it, and the contact sheet renders it
as a beat called `poster`.

**An aspect-matched panel cannot be pushed past about 0.94.** `Stage` sizes its panel
from the surface's own aspect, so a full shot fits exactly and any zoom crops all four
edges at once. 0.94 trims ~38dp horizontally and ~24dp vertically, which the 90dp header
absorbs; tighter clips the exit and power controls. Emphasis past that comes from
`<Spotlight>`, never from the camera.

**A cut of held shots reads as a slideshow, however good each shot is.** A locked-camera
version of this promo measured *fewer* visible events per second than the slop it
replaced — 0.39/s against 0.54/s, where the approved First-Run cut runs 1.66/s. Discrete
UI state changes barely register; what carries a cut is continuous camera movement. The
`drift()` helper in `src/marketing/promoData.ts` is the house move.

**Length trades directly against `inert-fraction`.** Stretching beats without adding
motion took this cut from 54% to 69% inert. More seconds need more movement, not longer
holds. Adding discrete events does not help — only continuous motion does.

**Verify the artifact, not the exit code.** Two gates in a row reported success while
doing nothing: ffmpeg filters that did not exist in the bundled build, and a still
renderer pointed at the library entry instead of the CLI bin, which exited 0 having
written no file. Check that the file appeared.

**Never tune a threshold to make a video pass.** When this cut failed `inert-fraction`,
the tempting move was to decide the gate was biased against the format. Measuring event
density against the reference cuts showed the gate was right and the cut was too static.
Measure before you argue with a gate.

### Rules that came out of the EUI promo

The second cut through this line. Its brief is `videos/archive/2026-08-03-playStore_promo2.md`, its
source is `src/marketing/eui-promo/`, and everything here was found by a rendered
frame or a measurement.

**The house open and close: `MasterControlCard`.** Signed off, and the pattern to
reuse rather than redesign. Tricon left at 30%, Audiowide lockup right at 70%,
everything else hung *below* the lockup in a fixed-height block. Three rules make it
work and all three were failures first:

- *The lockup is composed at frame 0 and nothing else is.* The eyebrow arrives at 6%,
  the line streams from there, the URLs land only once the line has finished. The
  first version set all three at full opacity on one centred stack — centred text with
  no arrival order has no reading path, and the eye lands in the middle and works
  outwards.
- *Everything below the lockup is absolutely positioned.* In normal flow the arriving
  copy grew the column and pushed the lockup up — a reflow on the one element that
  must not move, because it is the poster frame.
- *The card's motion is the bloom, and its amplitude is set by `opens-composed`.* A
  brand card is inert by design and this cut spends a fifth of itself on two of them.
  The bloom travelling ~15% of the frame across a beat measures as change every
  quarter-second and still leaves frame 0 within 8 of where the beat settles. At 28%
  travel it failed the gate at 10.7.

**Dissolve the chrome; do not push a camera at it.** The EUI's switching band is
1280×610 — wider than 2:1 — and no landscape frame can isolate it. `expand` reconciles
outward and drags half of each bar back into shot; `crop` eats the source rows' HDMI
icons. Fading the two bars, fading the bezel, and collapsing the panel onto the band's
own aspect gets there with no crop and no scale change: the interface renders at the
same 0.8 px/dp throughout and only the amount of it changes. `EuiChrome` on the tablet
surfaces is what makes it possible, and its `backplate` flag is why a faded bar fades
to the stage instead of to a black band.

**Fading a bar is not enough on its own — the panel has to move with it.** The first
attempt faded the chrome while holding the panel at full height, and "recentred" the
camera by the five dp between the surface's centre and the band's. Nothing filled the
space the bars vacated, so nothing appeared to happen: 67% inert. Collapsing the panel
in the same window took the same cut to 34%.

**Measure `inert-fraction` per beat before changing anything.** The whole-cut number
says a cut is a slideshow; it does not say which beat is. Attributing the samples to
beats found two at 87% and 89% while the rest sat near 65%, which turned a vague
"add more motion" into two specific fixes. The measurement is twenty lines against
`scripts/lib/png.mjs` and the samples the gate has already written to
`out/<slug>/samples/`.

**Small-area changes barely register; frame-wide ones do.** A bar dissolving is a
tenth of the frame and reads as almost nothing to the gate. A panel resizing, a
camera translating, or a gradient crossing the frame reads as a lot. When a beat is
failing on activity, ask what fraction of the frame is actually changing.

**Copy pacing has a floor, so a 30-second cut is not a 60-second cut halved.** The
closing beat at exactly half its master length had three seconds to power the room
down, return to Welcome, stream nine words and show two URLs — and the URLs never
arrived. Reading speed does not compress. Derive what must follow a streamed line
from the line itself (`streamEnd`), and give the short cut its own beat budget.

**A Spotlight that dims everything but the subject can contradict the copy.** The
audio beat's copy says the routing does not move while you change the volume; the
spotlight greyed out all four routed outputs to say so. The ring alone points without
arguing.

**Remotion waits for `<Img>`, not for CSS.** `<Img>` calls `delayRender` on mount and
`continueRender` on load, so a frame containing one is never photographed early. An
image referenced from `backgroundImage` or `maskImage` has no element to hang that
handle on, and the frame is captured whether or not the browser has fetched it. The
EUI surfaces are almost entirely CSS images — `bg_eui`, the `disp_*` panels, and every
`AppIcon`, which is drawn as a mask so one SVG can be tinted the way `app:tint` recolors
a drawable. The first beat to mount one of them strobed for six frames while they
arrived. `src/marketing/eui-promo/PromoPreload.tsx` is the fix: the same files mounted
as hidden `<Img>` for the whole composition, so frame 0 waits and every CSS reference
after that is served from cache. **Any new marketing composition using `app-ui/`
surfaces needs this**, and it only ever shows up on the *first* such beat — by the
second the browser has cached everything, which is what makes it look like a glitch in
one specific place rather than a systematic problem.

**Diff consecutive frames to tell a glitch from a cut.** A beat boundary and a strobe
both look like "something flashed". They are trivially separable once measured: a cut
is one large change that stays, a strobe is a large change followed by a large change
straight back. Render a window with
`npx remotion render src/index.ts <Comp> out/_seq --sequence --frames=112-150
--image-format=png` and diff neighbours with `gridDifference` from
`scripts/lib/png.mjs`. Note that the bundled ffmpeg is built `--disable-filters` with a
short allowlist — `select` and `fps` are not in it, so extracting a frame range from
the rendered mp4 does not work and the still sequence is the route.

### Adding a rule

A new rule must fail `src/compositions/MasterControlPromo.tsx` or pass
`src/compositions/FirstRun.tsx` for a reason you can state. If it cannot tell those
two apart, it is not a rule yet.

---

## Constants — not in the brief, because they never change

**Voice.** Plain, confident, installer-to-installer. Action-led titles: "Test the
connection," not "Connection testing information." No superlatives. No adjective
doing a verb's job. Say what happens on screen.

**Terminology.** The app's own visible words: Device, Connect, Activities, Presets,
Switching, Audio, End User Interface. Write the product name `CTRLbot`, that exact
camel case, always.

**Type.** Audiowide for headlines and the wordmark only. Montserrat for readable
copy. Space Mono for small uppercase eyebrows. Audiowide is a texture — past a
headline's worth of words it stops reading as language.

**Every claim is checked against**, in this order:

1. `../../1 - CTRLbot.av/CTRLbot-IoT/app/src/main/res` and a current build — the source of truth
2. `../../1 - CTRLbot.av/CTRLbot-IoT/AGENTS.md`
3. `docs/About_CTRLbot_IoT.md`

The July 29 Markdown user manual is a supporting snapshot, not a substitute.

**Standing prohibitions, every video:**

- EndPoint switching is deferred and hidden. Never teach it.
- Power presets use discrete Power On and Power Off commands; toggle-only devices do
  not join those system presets.
- The EUI exits through a two-second press-and-hold in the top-left. A quick tap does
  nothing, by design — show the hold honestly.
- No credentials, customer names, public IPs, host fingerprints, or real room names.
- No screenshot inside a drawn device bezel or mockup. Surfaces render live.

---

## Why this exists

`out/master-control-promo.mp4` is the worked failure. Read
`src/compositions/MasterControlPromo.tsx` before writing a marketing composition.

It imports nothing from this repository — no `app-ui/`, no `camera/`, no `scenes/`.
Ten `<CanvasImage>` PNGs cross-fade while four byte-identical eyebrow blocks and ten
image blocks sharing one position literal take turns. Thirty seconds carry six words
of product taxonomy and no promise. A 1449px image sits in a 1920px frame leaving a
235px black band nobody chose. 126 of 900 frames are a static logo, in a format
where only the first 30 seconds play at all.

None of that happened because the model had bad taste. It happened because
**`First-Run` had gates and the promo had none** — locked copy, derived regions,
mandatory holds, reading-speed timing, a review checklist. All of it was already
written down in `docs/AUTHORING.md`. As prose. Prose is advisory.

This workflow is the same rules with an exit code.

---

## Handing a video to AGY, Gemini, or Codex

Replace `<SLUG>` and paste from the repository root.

```text
Run this CTRLbot-Remotion video autonomously:

videos/<SLUG>.md

Read completely before acting:
- docs/VIDEO_WORKFLOW.md   (this is the contract)
- docs/AUTHORING.md        (how a scene is written)
- AGENTS.md
- the brief above

Run every pending task in order. Fresh context per task. For each one:

1. Implement exactly what the task says. 1-3 files. No scope creep. Do not invent
   copy, beats, or surfaces — the brief already specifies them.
2. Verify independently:
     npm run check
     npm run video:lint
     npm run video:frames -- <SLUG> contact --beat=<the beat this task touched>
   Then LOOK AT the rendered still and hold it against that beat's evidence line in
   the brief. A composition can typecheck, register, render, and still be wrong.
   Confirm the PNG actually exists before trusting a success message.
3. FAIL only for: a video:lint error, a broken npm run check, or a beat that plainly
   is not its evidence line. Warnings and style are notes, never failures.
4. On PASS or PASS WITH NOTES: mark [x], stage only the task's files plus the brief,
   commit with a "Tn: " message, require a clean tree, continue.
5. On FAIL: repair with the concrete fix list, up to two rounds. Then mark [!],
   record why under Blocked notes, and stop.

When every task is [x], run the full gate set and render:
  npm run video:lint -- --destination=<the brief's destination>
  npm run video:frames -- <SLUG> contact
  npm run render -- <composition> out/<SLUG>.mp4 --codec=h264 --crf=20 --muted
  npm run video:frames -- <SLUG> check out/<SLUG>.mp4

Report: commits, gate results, Review notes, and the path to out/<SLUG>/contact.html.
Do not stop for approval between tasks or before the render. Do not mark the video
done — reviewing the render and the contact sheet is Nathan's.
```

---

## Licensing

Remotion is source-available and free for individuals and for-profit organizations
up to three people, plus non-profits and evaluation. Larger for-profit organizations
need a company license. Confirm before commercial production:
<https://github.com/remotion-dev/remotion/blob/main/LICENSE.md>
