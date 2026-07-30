# Roadmap

State as of 2026-07-30. Read [AUTHORING.md](AUTHORING.md) first — it is the how; this is
the what and the why.

---

## Where things stand

**Foundation: done.** Token sync from the app, camera rig, annotation set, five live app
surfaces, capture cropping, three-face type system. `npm run check` passes.

**`First-Run-Phone`: complete at 115s, under review.** Seven scenes, all rendering.

**`First-Run-Tablet`: registered but not built.** It renders — every scene takes a
`device` prop and falls through to something — but nothing has been framed, timed or
reviewed for landscape. Treat the current output as a placeholder, not a draft.

---

## Phase 1 — finish the phone cut

Review feedback is arriving in batches of two or three changes. Work in that grain: make
the changes, render, verify **in the full cut** rather than only the scene, send it.

### Known open items

1. **Scene 5 (Build the room) is the weakest.** Three captures with slow pushes while the
   copy does the explaining — noticeably flatter than the live scenes either side. Options,
   in order of preference: shorten it; rebuild the Switching panel live; leave it as the
   breather between two dense scenes. Not yet decided.

2. **Brand cards may read sparse.** At 300 frames the open and close cards hold a small
   block of type in a 1920-tall frame. The internal animation was doubled so it is not
   static, but the composition itself has not been revisited.

3. **The CTRLbot scene's top copy overlaps the CTRLbot mark.** The scrim carries it, but
   the mark could move down.

4. **`ic_sort` vs the app.** The sort glyph is now the app's own `ic_sort`. The category
   filter has no icon, matching the capture. Worth one more look against a current build.

### Verification that is not optional

Render a still **from the full cut**, not just the scene, before reporting a fix. A scene
composition and its slot in `<TransitionSeries>` are separate durations, and they have
already disagreed once — every scene was truncated to half its length while the
composition still claimed the full runtime, so roughly half the cut never played. Scene
lengths now come from `SCENE_FRAMES` in `scenes/shared.ts` and are used in both places,
but confirm rather than assume.

```bash
npm run still -- First-Run-Phone out/check.png --frame=1200
```

Sample at moments where copy has settled — roughly 25 frames after each `<Sequence from>`.
Sampling mid-stagger shows missing text and reads as a bug that is not there.

---

## Phase 2 — the tablet cut

Everything is device-parameterised already, so this is framing and timing work, not new
architecture. Roughly in this order:

### 2.1 Surfaces

`TabletEui`, `DriverCatalog` and `ConnectionPanel` all have tablet paths and tablet
proofs. Render the three `Proof-Tablet-*` stills and compare against captures before
animating anything.

**`CtrlbotAi` and `PhoneNavMenu` are phone-only.** The tablet uses the left nav rail that
`DriverCatalog` already draws, not a bottom sheet. Two jobs:

- Extract that rail into its own component so `CtrlbotAi` and `ConnectionPanel` can use it.
- Build the tablet CTRLbot AI layout. There is no capture of it yet — ask for one rather
  than inventing it.

`CapturedScreen` has a tablet crop box (`208, 205, 3216, 2022`) that has been verified
against `captures/tablet/onboarding.png` only. Check it against the other tablet captures.

### 2.2 Framing

Landscape is where the camera can actually work. `closeShotWidth('tablet')` is `0.52`
against the phone's `0.78` — width is not the binding dimension there, so real push-ins
are available and `<Spotlight>` can do less.

`copySideFor('tablet')` returns `'right'`, which gives `<Callout>` its card treatment in
the margin beside the UI rather than a scrim over it. That is the main reason the tablet
cut should feel less cramped. It has never been rendered — verify the card does not
collide with the UI at `closeShotWidth` zoom.

### 2.3 Scene-by-scene

Each scene needs its camera path re-authored for landscape. The shot **lists** are
device-agnostic in structure but their values are phone-tuned. Specifically:

| Scene | Tablet work |
|---|---|
| Open / Close | Banner and type sizes already branch on `isPhone`; check line breaks at 1920 wide |
| CTRLbot | Needs the tablet AI surface first (2.1) |
| Device | Nav rail instead of the bottom sheet; the scroll and the `+` still apply |
| Connect and test | `connectionRegions('tablet')` puts CONNECT on the same row as host and port, not its own — the shot list assumes the phone's stacked layout |
| Build the room | Tablet captures exist for all three panels |
| EUI handoff | `TABLET_EUI_REGIONS.sourceRow` replaces `inputTile`; already wired |

### 2.4 Register scene compositions

`Root.tsx` registers `Scene-*` for phone only. Add a `Scenes-Tablet` folder so tablet
scenes can be previewed in isolation too.

---

## Gotchas that have already cost time

**Derive regions, never measure them.** Every surface exports its region map computed from
the same constants its markup lays out from (`catalogRegions`, `connectionRegions`,
`navRegions`, `EUI_REGIONS`). Estimating a region off a screenshot has put a spotlight on
the wrong row twice.

**`flex: 1` sets `flex-basis: 0%`.** In a column container that overrides `height` and
collapses the element to its content. This silently shrank the catalog's filter rows,
which moved the whole list up and put every camera target a full card out.

**One definition of viewport size.** `app-ui/viewports.ts`. When the phone changed from
412×892 to 360×780, three private copies existed and only one followed — the nav sheet
ended up 12dp from where its own region map said it was.

**Full-width targets frame on the viewport centre.** `frameWidth(centerOf(target), …)` on
a near-full-width control pushes the camera sideways until the clamp crops the interface.
Use the target's `y` with the viewport's `x`. Small controls near an edge do the opposite —
frame on their own centre and let the clamp slide the frame back inside.

**Menus are full-width.** `closeShotWidth` crops their icons; menu beats use `0.94`.

**Copy goes opposite the subject.** The nav sheet is at the bottom, so its callouts go to
the top.

**`TransitionSeries` matches children by component identity.** A `<Cut />` helper wrapping
`<TransitionSeries.Transition>` is rejected at render time.

**Annotation `radius` must match the control.** The EUI's display panels are square; a
rounded ring over one disagrees at every corner. Default is `0`.

---

## Not started

- Voiceover variant. The cut is built caption-led; a VO version would need a script and
  retimed scenes sharing the same surfaces.
- Any composition beyond the first run — feature shorts, per-topic training, thumbnails.
- `ingest-captures.mjs` still points at the July 29 walkthrough package. The July 30
  screenshots used by the CTRLbot scene were read directly from `../CTRLbot Mirror` and
  are **not** in `public/captures`. Fold them in before relying on them.
- The app has moved ahead of the layouts in the repo: the four-item nav (CTRLbot / Device /
  Connect / Set) exists in the 07-30 screenshots but `res/layout-port/_setup_main.xml`
  still describes the older seven-item drawer. `CtrlbotAi` and `PhoneNavMenu` were built
  from screenshots; re-derive them from `res/` once the app catches up.
