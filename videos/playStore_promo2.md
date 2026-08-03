---
id: Play-Store-EUI-Promo
destination: play-store-preview-master
---

# CTRLbot IoT — the End User Interface

> The 60-second master. The 30-second Play cut is derived from it — same seven beats,
> each compressed, not truncated. See *Resources* for how that is enforced.

## Watching

An AV integrator, technician or IT admin who already owns this problem. They have
rooms that cost real money and still do not work, or work and are so complicated that
nobody in the room will touch the panel. They have been quoted a processor, a
programmer and a proprietary toolchain for a space that needed a tablet on the wall.

They are not shopping for a control system. They are looking at whether the thing on
screen is something they could hand a client without a training session.

**This video is only about the interface the end user touches.** Not setup, not the
absent processor, not the missing programmer, not the price of any of it. Those are
their own videos. Every one of them is a *how we got here* argument, and this cut is
the *here*.

## Promise

**Anyone can walk up and run the room.**

That is the promise, and it opens the cut on `MasterControlCard`. It is one sentence
with no "and", it is verb-led, and beats `route`, `matrix` and `audio` prove it — a
viewer who watches those has watched the promise happen.

**Control that actually works and is easy to use.** closes the cut, on the same card.
It is a summary rather than a promise — it has an "and", and it asserts rather than
shows — which is exactly right at the end, where the preceding 54 seconds are the
evidence for it. Both lines are set in Montserrat under the Audiowide lockup; neither
is short enough to set in Audiowide without it stopping to read as language.


## Beats

> Order is cut order. Machine-parsed by column name — keep the header row exact.
> `Sec` is the 60-second master. `Sec30` is the derived Play cut and is documentation
> only; the parser ignores it.

| id | Claim | Surface | Evidence | Sec | Sec30 |
|----|-------|---------|----------|-----|-------|
| promise | The whole room, on one screen | `MasterControlCard` | Tricon and MASTER CONTROL already composed at frame 0; the promise line lands beneath them by 2s while the blue bloom drifts across the frame | 6 | 3 |
| wake | The room starts from the panel on the wall | `EuiPowerCapture` | Welcome / press power to begin, then the green ring closes around Please Wait While System is Powering On | 7 | 3.5 |
| route | Choosing a source is one tap | `TabletEuiManyToOne` | Display 1 sits grey and empty, then Input 1 turns blue and Display 1 fills with INPUT 1 in the same frame | 10 | 5 |
| matrix | Every source, every display, one screen | `TabletEui` | Four grey outputs; Input 1 lights and Output 2 takes it; Input 3 lights and Output 2 follows; All is pressed and all four outputs go blue on Input 3 | 14 | 7 |
| audio | Room volume is on that same screen, not a second remote | `TabletEui` | The yellow fill runs up the volume bar, then the speaker icon flips to muted — with the routing behind it untouched | 8 | 4 |
| both | The app runs on a phone too, not only a tablet | `TabletEui` + `PhoneEuiManyToOne` | Tablet matrix and portrait phone EUI live side by side, both routed and both legible — the phone is plainly a real interface, not a shrunken tablet | 9 | 4.5 |
| close | It ends where the user found it | `EuiPowerCapture` then `MasterControlCard` | The red ring closes on powering off, the panel lands back on Welcome, and the frame resolves to MASTER CONTROL | 6 | 3 |

Totals: **60.0s** master, **30.0s** cut. The promise starts at 0s in both, inside the
10-second first-impression window.

## Resources

### Everything in this cut is a live surface. The screenshots are reference, not assets.

`videos/play store promo/` is the state reference — what each beat should look like
when it is right. It is not the source. Every state in it is already built as live
React in `src/app-ui/`, which matters for three reasons: the `no-device-bezel` lint
error fires on `marketing/eui/*` where a live surface exists, the standing prohibition
in `VIDEO_WORKFLOW.md` forbids a screenshot inside a drawn bezel, and — the real
reason — a camera cannot move over a PNG, and `inert-fraction` is what killed v1.

| Beat | Reference PNG | Live surface |
|---|---|---|
| `promise` | `mc_banner_mblue_169.png` (mockup) | **new** `MasterControlCard` — rebuild from `tricon/` + the gradient |
| `wake` | `Welcom Power Off Page.png`, `System is Powering On.png` | `EuiPowerCapture` device=tablet, state `off` → `powering-on` |
| `route` | `many-to-one-unselected.png` → `many-to-one-source-to display1.png` | `TabletEuiManyToOne` |
| `matrix` | `manyTomany-cold/-input1/-output2/-input3/-all.png` | `TabletEui` |
| `audio` | — | `TabletEui`, `volume` and `speakerMuted` props |
| `both` | `phone-many-to-one-cold.png`, `phone-many-to-one-sent.png` | `TabletEui` + `PhoneEuiManyToOne` in `DualStage` |
| `close` | `SM-X210_2026-07-31_10-15-00.png` | `EuiPowerCapture` state `powering-off` → `off` |

`EuiPowerCapture` is the one sanctioned capture in the repo and stays that way — it
carries no editable control, only context, and its progress ring is already drawn live
on top. Its reason is recorded in `src/app-ui/EuiPower.tsx`.

### About the bezel

You like seeing the bezel. `Stage` already gives you one: a rounded panel with a
120px drop shadow standing off the gradient, which reads as a device edge without
being a drawn mockup — and unlike a bezel PNG, the camera can push inside it. Both
approved cuts use exactly this. If it does not read as hardware on the contact sheet,
that is a `Stage` radius change, not a return to screenshots.

### Layout

Copy left, tablet right — this is `Stage` as built, no new layout needed. `both` is the
one exception and uses `DualStage`, which puts the copy above a centred pair.

Tablet only everywhere except `both`.

### The gradient

One background across all seven beats, from the app itself:

```css
background-color: #000000;
background-image: radial-gradient(100% 100% at 68% 32%,
  rgba(0, 143, 212, 0.45) 0%, rgba(0, 0, 0, 0) 90%);
```

Add it as a new entry in `src/design/theme.ts` beside `background.stage` and derive
the alpha through the existing `alpha()` helper — a raw `rgba()` literal trips
`theme-colors-only`. Do **not** edit `background.stage` itself; v1 and both First-Run
cuts stand on it.

### 60 into 30

`play-store-preview` caps at 30s, so a 60s brief fails `validate` on arithmetic before
it renders a frame. Add a sibling destination `play-store-preview-master` in
`src/destinations.ts` — same frame, safe area, banned list and inert ceiling, with
`duration: {min: 45, target: 60, max: 60}` and `firstImpressionSeconds: 10` kept as-is
so the promise is forced to the front, which is what makes the 30 derivable at all.

The 30 is a **recut, not a truncation**: the same seven beats at the `Sec30` lengths,
registered as a second composition off one shared beat list. Beat components take
their length from the composition, never from a literal.

### Standing constraints this cut has to respect

- **Frame 0 is the poster frame.** `promise` opens composed — tricon and wordmark
  already placed, motion carried by the bloom and the copy arriving, never by a
  logo flying in. `opens-composed` blocks the alternative.
- **A brand card is inert by default and this cut opens and closes on one.** 12 of
  60 seconds sit on `MasterControlCard`. It needs continuous motion in both — a
  drifting gradient centre, not a fade-and-hold. This is the single likeliest
  `inert-fraction` failure in the video.
- **No setup surface anywhere.** No `DriverCatalog`, no `ConnectionPanel`. That is
  the next video, and keeping them out also keeps third-party manufacturer names off
  screen in an asset submitted alongside the app.
- **No competitor named.** The market pain is the reason this video exists; it is not
  content in it. No Crestron, no Extron, no comparison, no price.
- **Inputs are Input 1–4 throughout.** The many-to-one reference shows HDMI 1 / HDMI 2
  further down its list; use the same four labels in both routing beats so the escalation
  from one display to four reads as one continuous room.
- Muted-first. No credentials, customer names, public IPs, or real room names.

### Reuse from the First-Run tablet cut

`src/scenes/EuiHandoff.tsx` — the EUI scene behind `out/first-run-tablet-review-08.mp4` —
already contains, working and reviewed, the state machine for every routing beat here:
Many-to-One cold → routed, the six-state matrix escalation, the four-keyframe volume
drag, the mute flip, and the power off → welcome → power on cycle. Beat `matrix`'s
state order in particular was storyboarded off real captures and is documented in
that file; do not re-derive it.

**Port the derivations, do not import the scene.** `EuiHandoff` is a 1020-frame
composition whose states are pinned to absolute frame constants (`MATRIX_PICK_A = 346`).
This cut needs the same states expressed against *normalized beat progress*, because
one beat component has to render correctly at both 14s and 7s. Lifting them into
`euiPromoData.ts` as functions of `t` (0..1) is the whole of task T3, and it is what
makes the 30-second cut a recut rather than a second build.

The same file is also the worked example `AUTHORING.md` points at, so the shot-list
grammar — hold, move, hold — comes from it too.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked
>
> Prep notes below each task are the specification. Copy is written here and is not the
> implementer's to change. Shot fractions are of the beat, not of the cut.

### The one architectural rule

**No beat component may contain an absolute frame number for a state change.** Every
state derives from `t = frame / frames`, where `frames` is a prop. This is what lets
one beat list render at 60s and at 30s from the same components, and it is the
difference between a recut and a second build. Copy stagger is the sole exception —
`StageCopy`'s 0→32-frame entrance stays absolute, because reading speed does not scale.

**Copy is budgeted against `Sec30`, not `Sec`.** The 30-second cut is the real
deliverable; if a line reads at 60 and races at 30, it is too long.

### Frame budget

| beat | master | 30-cut |
|---|---|---|
| promise | 180 | 90 |
| wake | 210 | 105 |
| route | 300 | 150 |
| matrix | 420 | 210 |
| audio | 240 | 120 |
| both | 270 | 135 |
| close | 180 | 90 |
| **total** | **1800 · 60s** | **900 · 30s** |

---

- [x] T1: Add a `play-store-preview-master` destination so a 60s brief validates — files: src/destinations.ts

  Copy `PLAY_STORE_PREVIEW` to a sibling `PLAY_STORE_PREVIEW_MASTER`, id
  `play-store-preview-master`, and register it in `DESTINATIONS`. Change exactly one
  field: `duration: {min: 45, target: 60, max: 60}`. Frame, safe area, `audio`,
  `firstImpressionSeconds: 10`, `maxInertFraction`, `banned` and `hosting` are
  identical — the 30-second cut this master feeds is a real Play asset and must inherit
  every rule that governs one. Comment it as the master a Play cut is derived from, not
  as a second Play destination.

  Gate: `npm run video:frames -- playStore_promo2 validate` reports 0 problems.

- [x] T2: Add the promo background to the theme and put the tricon on disk — files: src/design/theme.ts, public/brand/ctrlbot_tricon_white.svg

  Copy `videos/play store promo/tricon/ctrlbot_tricon_white.svg` to `public/brand/`
  unchanged. Add a `promo` entry beside `background.stage`:

  ```ts
  promo: (x = 68, y = 32) =>
    `radial-gradient(100% 100% at ${x}% ${y}%, ${alpha(appColors.blue, 0.45)} 0%, ${alpha(appColors.blue, 0)} 90%)`,
  ```

  A function, not a string, and unlike its sibling — because `MasterControlCard` drifts
  the centre to stay out of `inert-fraction`, and a second hand-written gradient in the
  card is exactly the drift this file exists to prevent. Go through `alpha()`; a literal
  `rgba()` trips `theme-colors-only`. **Do not touch `background.stage`** — v1 and both
  First-Run cuts stand on it.

  Gate: `npm run check`, and the SVG resolves under `staticFile('brand/…')`.

- [x] T3: Port the EUI state machine out of EuiHandoff as functions of normalized beat progress — files: src/marketing/eui-promo/euiPromoData.ts

  The spine. `src/scenes/EuiHandoff.tsx` already has all of this working and reviewed;
  what it does not have is independence from its own 1020-frame timeline. Lift each
  derivation into a pure function of `t` (0..1):

  | export | from EuiHandoff | at t = |
  |---|---|---|
  | `routeSelection(t)` | `manyToOneSelectedInput` | `null` until 0.42, then `0` |
  | `matrixSelection(t)` | `matrixSelectedInput` | `null` → `0` at 0.26 → `2` at 0.55 |
  | `matrixOutputs(t)` | the `outputs` map | Output 2 takes Input 1 at 0.40; all four take Input 3 at 0.78 |
  | `promoVolume(t)` | the four-keyframe `interpolate` | 0.55 → 0.24 → 0.76 → 0.58 across 0.10 / 0.34 / 0.62 |
  | `promoMuted(t)` | `speakerMuted` | `t >= 0.72` |
  | `powerPhase(t)` | `powerState` | per beat, see T6 and T11 |

  Also export `EUI_PROMO_BEATS` — `{id, masterFrames, playFrames, component}` — seeded
  with `promise` only and grown one entry per beat task, plus `promoDrift(viewport)`
  returning `frameWidth(centerOf(full), viewport.width * 0.94)`. 0.94 is the measured
  ceiling on an aspect-matched panel; the note in
  `src/marketing/play-store-promo-v1/promoData.ts` explains why, and it has not changed.

  The matrix fractions above reproduce the six-state escalation storyboarded off real
  captures — cold, pick, route one, pick another, All, all four. Its middle state, where
  the routed output drops to grey *while keeping its Input 1 label*, is the whole reason
  the matrix view has two greys. Preserve it.

  Gate: `npm run check`. Not renderable on its own — the only task in the list that is not.

- [x] T4: Build the Master Control card from the tricon and the promo gradient — files: src/marketing/eui-promo/MasterControlCard.tsx, src/Root.tsx

  Rebuilt, not the `mc_banner_mblue_169.png` mockup. Tricon left at about 34% of frame
  height, `MASTER CONTROL` right in Audiowide `type.display`, on `background.promo()`.
  Props: `frames`, `line` (the Montserrat sentence under the lockup), optional `kicker`.

  **It must be fully composed at frame 0** — tricon, wordmark, eyebrow and line all
  present and settled. Nothing fades in, nothing flies in. `opens-composed` compares
  frame 0 against the frame 62% into the beat and blocks anything else, and a Play
  listing shows frame 0 as a still before anyone presses play.

  Motion, which the card still needs because 12 of 60 seconds sit on it: drift the
  gradient centre from 68%→62% X and scale the lockup 1.00→1.03 across the beat, both
  continuous, both `Easing.bezier(0.16, 1, 0.3, 1)`, both clamped. If `opens-composed`
  trips in T12, **reduce the amplitude, do not remove the motion** — and if no amplitude
  satisfies both gates, shorten `promise` and give the seconds to `route`, since
  `inert-fraction` is measured across the whole cut.

  Register `<Still id="Proof-Master-Control" …>` in Root so it can be looked at now.

  Gate: `npm run still -- Proof-Master-Control out/proof-mc.png`, then open it.

- [x] T5: Build the promise beat and register both cuts — files: src/marketing/eui-promo/BeatPromise.tsx, src/marketing/eui-promo/EuiPromo.tsx, src/Root.tsx

  `EuiPromo` takes `cut: 'master' | 'play'`, maps `EUI_PROMO_BEATS` to hard `<Sequence>`
  cuts — never `TransitionSeries`, which makes the composition shorter than the sum of
  its beats and silently desynchronises every contact-sheet frame number — and passes
  each beat its own `frames`. Register `Play-Store-EUI-Promo` at 1800 frames and
  `Play-Store-EUI-Promo-30` at 900, both 1920×1080 at 30fps, duration summed from the
  beat list and never typed as a literal.

  `BeatPromise` is `MasterControlCard` with:

  - eyebrow — `END USER INTERFACE`
  - lockup — `MASTER CONTROL`
  - line — `Anyone can walk up and run the room.`

  Gate: `npm run video:frames -- playStore_promo2 contact --beat=promise`, and the
  still is the settled card, not a fragment of one.

- [x] T6: Build the wake beat — the room starting from the panel — files: src/marketing/eui-promo/BeatWake.tsx, src/marketing/eui-promo/euiPromoData.ts

  `<Stage>` holding `EuiPowerCapture device="tablet"`, `state="off"` until t=0.34 then
  `state="powering-on"` for the rest, its `durationInFrames` being the powering-on span
  so the green ring closes just before the beat ends. `EuiPowerCapture` is the one
  sanctioned capture in the repo — context only, no editable control, its live progress
  ring drawn on top — and its reason is recorded in `src/app-ui/EuiPower.tsx`.

  Shot list: hold `full` to 0.12, continuous push to `promoDrift` by 0.77, hold out.
  `Easing.bezier(0.65, 0, 0.35, 1)`. Never spring a camera.

  Copy, left column, `until={frames}`:

  - eyebrow — `POWER`
  - title — `Start the room`
  - body — `Welcome, then one press. The system powers on and lands on the controls.`

  Verified: `welcome_to_room_1234` = "Welcome", `press_power_to_begin` = "press power
  to begin", and `layout/dialog_power_on.xml:15` = "Please Wait While System is
  Powering On". Do not paraphrase any of the three on screen.

  Gate: `contact --beat=wake` shows the powering-on state with the ring part-closed.

- [x] T7: Build the route beat — one tap moves a display — files: src/marketing/eui-promo/BeatRoute.tsx, src/marketing/eui-promo/euiPromoData.ts

  `<Stage>` holding `TabletEuiManyToOne`, `selectedInput={routeSelection(t)}`,
  `volume={promoVolume(t)}`. Inputs are `Input 1`–`Input 4`.

  **Held wide for the whole beat**, then drifted — not cut between the source list and
  the display. Input 1 turning blue and Display 1 filling happen in the same frame, and
  that simultaneity is the entire demonstration; showing them in sequence destroys it.
  For the same reason **no annotation** — a ring over a control that has already
  announced itself only competes with it.

  Shot list: hold `full` to 0.14, push to `promoDrift` by 0.80, hold out.

  Copy:

  - eyebrow — `MANY-TO-ONE`
  - title — `Choose a source`
  - body — `Tap it. The display takes it. That is the entire interaction.`

  Gate: `contact --beat=route` shows Input 1 blue and Display 1 carrying INPUT 1.

- [x] T8: Build the matrix beat — every source to every display — files: src/marketing/eui-promo/BeatMatrix.tsx, src/marketing/eui-promo/euiPromoData.ts

  `<Stage>` holding `TabletEui` driven by `matrixSelection(t)` and `matrixOutputs(t)`.
  The longest beat in the cut and the one carrying the promise.

  One annotation, and only one: a `<FocusRing radius={6}>` plus `<TapIndicator>` on
  `TABLET_EUI_REGIONS.routeAll`, landing about 6% of the beat before the All route at
  t=0.78. Every other change here explains itself, but All routes four outputs from a
  control nobody saw anyone touch, and without the tap the grid appears to change on
  its own. Regions come from the exported map, never estimated.

  Shot list: hold `full` to 0.10, push to `promoDrift` by 0.62, hold `promoDrift` through
  the All payoff. The last state needs a still moment to land.

  Copy:

  - eyebrow — `MANY-TO-MANY`
  - title — `Route every display`
  - body — `Pick an input, tap an output. Or press All and every display follows at once.`

  `All` and its `ic_route5` glyph are verified at `layout/av_switch_nxo.xml:36,46`.

  Gate: `contact --beat=matrix` shows all four outputs blue on Input 3.

- [x] T9: Build the audio beat — volume and mute on the same screen — files: src/marketing/eui-promo/BeatAudio.tsx, src/marketing/eui-promo/euiPromoData.ts

  `<Stage>` holding `TabletEui` with the routing left exactly where `matrix` ended —
  all four outputs on Input 3, Input 3 still selected — and `volume={promoVolume(t)}`,
  `speakerMuted={promoMuted(t)}`. The cut escalates and never resets; a beat that
  quietly re-cold-starts the grid throws away the continuity the previous two bought.

  Shot list: hold `full` to 0.12, push onto the volume strip —
  `frameWidth(centerOf(TABLET_EUI_REGIONS.volumeSlider), TABLET_VIEWPORT.width * 0.86)`
  — by 0.58, hold. Use `wideShotWidth`, not `closeShotWidth('tablet')`: at 0.52 the
  clamp runs out of content plane before a centred control clears the frame.

  `<Spotlight>` and `<FocusRing radius={0}>` on the slider — square, because the strip
  is — then the mute at t=0.72.

  Copy, `side` is irrelevant here since `Stage` owns the left column:

  - eyebrow — `ROOM AUDIO`
  - title — `Volume on the same screen`
  - body — `Drag the bar, mute the room. The routing behind it does not move.`

  Gate: `contact --beat=audio` shows the speaker muted with four outputs still on Input 3.

- [x] T10: Build the both beat — the phone is a real interface too — files: src/marketing/eui-promo/BeatBoth.tsx, src/marketing/eui-promo/euiPromoData.ts

  `<DualStage>`, the one beat that is not `<Stage>`: two panels are the message, so the
  copy goes above them and the pair centres underneath. `TabletEui` on the left in its
  `matrix`/`audio` end state, `PhoneEuiManyToOne` on the right, routed.

  `DUAL_STAGE` already sets the phone *taller* than the tablet (750 against 470) against
  the intuition that the bigger device should be bigger — because at a shared height the
  phone is ~277px wide and its labels do not read at 1080p, which would leave the beat
  proving the opposite of its claim. Keep that. The tablet has had four beats already and
  can afford to be the smaller one here.

  Each panel gets its own gentle drift; a locked pair is the most inert shot in the cut.

  Copy:

  - eyebrow — `TABLET OR PHONE`
  - title — `Same room, either device`
  - body — `The interface is built for both — a wall tablet or the phone in a pocket.`

  Gate: `contact --beat=both`, and **read the phone's labels in the still**. If they do
  not resolve, raise `DUAL_STAGE.phoneHeight` before anything else — an illegible phone
  is this beat failing, not a detail.

- [ ] T11: Build the close beat — power down, then the card — files: src/marketing/eui-promo/BeatClose.tsx, src/marketing/eui-promo/euiPromoData.ts

  Three states in 6s (3s at 30): `EuiPowerCapture state="powering-off"` with the red
  ring closing to t=0.34, `state="off"` on Welcome to t=0.52, then `MasterControlCard`
  for the rest. Cross-fade the card in over 10 frames, `Easing.linear`; hard-cut the two
  power states.

  The card carries:

  - lockup — `MASTER CONTROL`
  - line — `Control that actually works and is easy to use.`
  - kicker — `ctrlbot.io`

  The kicker is the house close and matches v1. It is a URL, not a call to action, so
  it clears Play's rule — but if Nathan wants the last frame to be the lockup alone,
  drop it; nothing else depends on it.

  Gate: `contact --beat=close` shows the card, not a power screen.

- [ ] T12: Run the full gate set and render both cuts — files: videos/playStore_promo2.md

  ```bash
  npm run video:lint -- --destination=play-store-preview-master
  npm run video:frames -- playStore_promo2 contact
  npm run render -- Play-Store-EUI-Promo out/playStore_promo2.mp4 --codec=h264 --crf=20 --muted
  npm run render -- Play-Store-EUI-Promo-30 out/playStore_promo2-30.mp4 --codec=h264 --crf=20 --muted
  npm run video:frames -- playStore_promo2 check out/playStore_promo2.mp4
  ```

  `inert-fraction` is the expected failure and `promise`/`close` are where it comes
  from — 12 of 60 seconds on a brand card. The fix order is: raise the card drift
  amplitude as far as `opens-composed` allows, then raise the per-beat camera drift,
  then shorten the two cards. **Never edit the threshold.** It was calibrated against
  the two approved First-Run cuts, and tuning it to pass this video is the one move
  that makes every gate in the repository stop meaning anything.

  Confirm each render actually wrote a file. Two gates in this repo have reported
  success while doing nothing.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the contact sheet review.

## Contact sheet

> `npm run video:frames -- <slug> contact` renders one still per beat and tiles them.
> Mark each ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
