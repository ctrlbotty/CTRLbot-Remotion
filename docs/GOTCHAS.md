# Gotchas

Things that have already cost time on this repo, kept so the next video does not
rediscover them. Read before writing a scene; `/video-prep` reads it before decomposing.

These came out of building the First-Run phone and tablet cuts. The later rules found by
gates and rendered frames, for the promos and the loops, are in
[VIDEO_WORKFLOW.md](VIDEO_WORKFLOW.md) under its "Rules that came out of" sections.

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

**Whisper's word times are not cut points.** A word's end runs early at the close of a
phrase and stretches across the pause after it, so a clip cut on them loses its last
syllable: "PC" by 240 ms, "network" its final k, "testing" 280 ms. Cut in the waveform's
silence; `scripts/lib/voice.mjs` does it for the shorts.

**Whisper hides the stumbles.** Given a whole sentence it writes what was meant: "a, a, a
terminal, uh, app" comes out "a terminal app", with "a" stretched across the stumble, and a
filler prompt does not change that. It only writes an "uh" down when the phrase is short
enough to leave it nothing to tidy. That is why ingest runs `heard.py`: an acoustic model
spells every sound, and Whisper hears one phrase at a time.

**A mono voice measures 3 dB quieter than the same voice in a render.** The prepared
narration is mono at -16 LUFS; Remotion writes stereo, both channels carrying it, and the
render measures about -13 LUFS. Same loudness to a listener, different number.
