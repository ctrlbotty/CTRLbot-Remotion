# Roadmap

State as of 2026-07-31. Read [AUTHORING.md](AUTHORING.md) first — it is the how; this is
the what and the why.

---

## Where things stand

**Foundation: done.** Token sync from the app, camera rig, annotation set, live phone and
tablet surfaces, capture cropping, three-face type system, and phone/tablet scene
registrations. `npm run check` passes.

**`First-Run-Phone`: complete at 120s; Review 13 is the current file.** Every line of
copy was reviewed against `CTRLbot-IoT-User-Manual.md` on 2026-07-31 and is now locked —
the full approved script is tabled in [TABLET-HANDOFF.md](TABLET-HANDOFF.md). Preserve
this cut as the editorial reference while building the tablet. Optional phone polish is
deferred, not active work.

**`First-Run-Tablet`: built out and renderable end to end at 1920×1200; Review 08 is
current.** Every scene has landscape surfaces, landscape camera paths and the locked copy.
`CtrlbotAi` and `ConnectionPanel` join `DriverCatalog` in laying out beside the shared
tablet rail, the Device menu beat targets the rail rather than phone coordinates, and the
EUI shot list is authored for landscape.

The frame is **16:10, not 16:9** — Android tablets are 16:10 and the app surface is
1280×800, so 1920×1200 is exactly 1.5× the viewport and a full-frame shot fills the frame
edge to edge. At 1080 it left a black bar down each side.

One thing needs checking rather than deciding: there is **no tablet capture of
Activities → Switching**, so that panel is a live rebuild from the manual's landscape
description. Verify it against a real build before publishing — see the top of
[TABLET-HANDOFF.md](TABLET-HANDOFF.md).

The next-agent brief is [TABLET-HANDOFF.md](TABLET-HANDOFF.md). It records the current
Android sources, scene-by-scene gaps, exact full-cut frame map, and recommended build
order.

---

## Phase 1 — phone cut

Paused by product-owner direction. The current review file is
`out/first-run-phone-review-13.mp4`; `out/` is ignored and reproducible. Do not change the
phone cut while building the tablet unless a shared fix is necessary and the phone full
cut is re-verified.

---

## Phase 2 — tablet cut

Built. `out/first-run-tablet-review-08.mp4`. [TABLET-HANDOFF.md](TABLET-HANDOFF.md) records
what each scene does, the landscape composition rules that fell out of building it, the
missing Switching capture, and the judgement calls left open.

Copy was never on this list. It is locked, shared, and inherited through `device`.

All seven tablet scenes are registered under `Scenes-Tablet`; use them for authoring, but
report fixes only after rendering the corresponding full-cut frame.

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
the top. On landscape this is load-bearing rather than tidy: the EUI's audio strip runs the
full width along the bottom, exactly where the copy card sits, so that beat takes `top` on
both form factors.

**`closeShotWidth('tablet')` is for edges, not for centred content.** At 0.52 the camera is
at ~2.4x and `clampToContent` will not let the frame slide far enough to move a centred
control out from under the copy card — the content plane runs out first. Use
`wideShotWidth` (0.86) on anything the surface centres, and keep 0.52 for controls hard
against an edge, where the clamp works *for* you.

**A card pinned top-to-bottom owns a third of the frame.** The landscape callout used to be
640 wide and full height; it is now 580 and hugs its content. Everything above it is free,
which is where the landscape surfaces put their toolbars and action rows.

**`TransitionSeries` matches children by component identity.** A `<Cut />` helper wrapping
`<TransitionSeries.Transition>` is rejected at render time.

**Annotation `radius` must match the control.** The EUI's display panels are square; a
rounded ring over one disagrees at every corner. Default is `0`.

**Where the app's own state change tells the story, do not annotate it.** Many-to-One
opens cold — nothing routed, display grey — and a source is then selected. The card
turning blue and the display filling happen in the same frame, and a ring or a spotlight
over that only competes with the thing it is pointing at. Hold both in one shot and let
the interface do it. Annotate where the viewer would otherwise not know *where* to look;
not where the screen has already told them.

**Composition listing is not render verification.** `npm run check` can pass while a
device-specific capture path fails later in the cut. Render a settled full-cut frame in
every scene after changing capture mappings or form-factor branches.

**Look at a capture before you map it.** `captures/tablet/switching-preview.png` and
`switching.mp4` are both Connect → Test Device Drivers, not Activities → Switching. The
name got one mapped into the Activities scene, and the tablet cut doubled back to a
Connect screen in the middle of the Activities beat. The filename is not the screen.

**A matched-aspect frame cannot be pushed into without cropping.** 1920x1200 against a
1280x800 surface means a full-frame shot fits exactly — so any zoom past 1.0 crops all
four edges at once. Build Room's 0.9 push took the setup rail off the left, the tab strip
off the top, and the run/copy/delete icons off the right of every preset row. Where a
scene is about chrome at the edges of a screen, lock the camera off and let the
annotations carry the motion.

**The tablet rail consumes real app width.** Current `_setup_main.xml` gives it 200dp;
`frame_setup` starts after the rail. A 1280dp-wide setup surface cannot simply be placed
beside it. Derive the remaining content plane before exporting regions.

**Landscape callouts can still cover the subject.** A right-side card is outside the
camera, but it occupies the viewer's frame. Compose the target to its left and verify the
actual full cut rather than assuming the card margin is empty.

---

## Phase 3 — the video assembly line

Built 2026-08-02. **[VIDEO_WORKFLOW.md](VIDEO_WORKFLOW.md) is now the contract for any
new video**, and it supersedes "start a composition and see how it looks". A brief from
`videos/_TEMPLATE.md`, decomposed into atomic tasks, run with a gate between each.

`npm run video:lint` and `npm run video:frames` make mechanical what
[AUTHORING.md](AUTHORING.md) describes in prose. Their thresholds were measured against
the two approved First-Run cuts and the rejected Master Control promo — see the rules
section of VIDEO_WORKFLOW.md for what each measurement changed.

`V1-Play-Store-Promo` is the first cut produced through it: 26s, 1920×1080, EUI only.
Kept as a reference under `src/marketing/play-store-promo-v1/`; its brief is in
`videos/archive/`.

**The calibration references live in `out/`** — `first-run-phone-review-13.mp4`,
`first-run-tablet-review-08.mp4` and `master-control-promo.mp4`. `out/` is gitignored
and otherwise reproducible, but those three are not: the first two are approved review
files and the third is a composition that is no longer registered. Losing them means
losing the ability to re-verify a threshold. Keep a copy outside the repo.

---

## Not started

- Voiceover variant. The cut is built caption-led; a VO version would need a script and
  retimed scenes sharing the same surfaces.
- Reference capture: turning a narrated screen recording into a starter brief with
  timings, via the ffmpeg already in `node_modules` plus local whisper.cpp.
- Destination profiles beyond `play-store-preview` — the website, social, in-app help.
  The profile system is built; each new one is a few lines in `src/destinations.ts`.
- The current Android setup layouts now include Activities and EUI. `TabletNavRail` is
  derived from them; `PhoneNavMenu` predates that update and should be re-audited against
  `res/layout-port/_setup_main.xml` when phone work resumes.
- The Markdown user manual is a July 29 supporting snapshot and is no longer generated by
  the app repository. Keep product claims anchored to current resources/builds.
