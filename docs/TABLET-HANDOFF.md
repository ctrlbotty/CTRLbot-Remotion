# Tablet first-run handoff

State as of 2026-07-31. The phone cut is the editorial reference; the Android app is the
product and geometry reference.

## Verify: Activities → Switching is a rebuild, not a capture

There is no tablet screenshot of that tab. Three files look like one and none of them are:

| File | What it actually shows |
|---|---|
| `captures/tablet/switching-preview.png` | Connect → Test Device Drivers, switcher view |
| `captures/tablet/switching.mp4` | Connect → Test Device Drivers, switcher view |
| `captures/tablet/test-device.png` | Connect → Test Device Drivers |

The phone set is fine — `captures/phone/switching.png` is the real Activities → Switching
tab, which is why the phone cut has always shown all three correctly.

So `app-ui/ActivitiesSwitching.tsx` reconstructs the landscape screen from the manual's
§12.1–12.3 (which describes the tablet layout — inputs and outputs *side by side*, template
above, test tool below) plus the phone capture's control set and content. **It is the only
surface in the project built from a written description rather than from a capture or from
layout XML, and it should be checked against a real build before this cut is published.**

Replacing it is a one-line change: drop a real screenshot in as
`captures/tablet/switching.png` and swap the `tablet` Switching entry in
`scenes/BuildRoom.tsx` from `{surface: ...}` to `{capture: 'switching.png'}`. The scene
takes either.

Check what a capture contains before mapping it. The filename is not the screen.

## Copy is locked — do not re-litigate it

Every line in the cut was reviewed against `CTRLbot-IoT-User-Manual.md` on 2026-07-31 and
signed off. **The tablet inherits it verbatim.** `FirstRun` passes `device` down and the
scenes pick their own framing from it, so a tablet build changes camera paths, surfaces
and copy *placement* — never wording. If a line genuinely does not work in landscape, say
so and get it changed in both cuts; do not fork it.

The full approved script, in cut order:

| Scene | Eyebrow | Title | Body |
|---|---|---|---|
| Open | Quick start | Control your first room | No processor, no laptop, no software. So easy. Program it with your thumbs. |
| CTRLbot | Start here | Four menus to start | CTRLbot for help, Device for drivers, Connect for your equipment, Set for everything else. |
| CTRLbot | CTRLbot AI | The manual, built in | Setup help, FAQs and device troubleshooting — without leaving the app. |
| CTRLbot | Stuck? | Ask it in plain language | Or pick one of the questions it already knows the answer to. |
| Device | Device | Setup starts here | Every driver ships inside the app, ready to become a device in your room. |
| Device | Browse | Find your equipment | Projectors, displays, switchers and end points. Search by manufacturer or model, or sort by type. |
| Device | Add it | One tap to add a device | The + opens Configure Connection, ready to point at your real equipment. |
| Connect | Connect | Enter the address and port | Pick the protocol, then enter the device's address and control port. |
| Connect | Verify | Connect before you trust it | A successful connection saves the device automatically — the button flips to Disconnect. |
| Connect | Test | Send a safe command | Watch the terminal for what went out and what the device sent back. |
| Connect | Next | Open Activities | Your first saved connection unlocks Activities and EUI — for good. |
| Build room | Activities | Build the room | Presets, switching and room audio: auto-generated from your devices, and tweaked by you. |
| Build room | *(footnote)* | — | Test against the real equipment before you hand the room over. |
| EUI | End User Interface | One screen to run the room | The configuration tools are gone — only what the room needs is left. |
| EUI | Many-to-One | Switch one display | Several sources, one destination. Tap a source and the display follows. |
| EUI | Many-to-Many | Route across displays | Select an input, then tap every output that should receive it. |
| EUI | Room audio | Volume and mute | Drag the bar or step it with the arrows, then mute the room from the same strip. |
| EUI | Installer access | Press and hold to return | Hold the tools icon for two seconds. A quick tap does nothing — by design. |
| Close | — | Your room is ready | Configure it, test it, hand it over — with the setup tucked out of the way. |

Two copy lines make promises the camera has to keep, in both cuts:

- **"Search by manufacturer or model, or sort by type"** requires the search field and both
  split controls to be in shot while that callout is up. Neither is demonstrated, so if the
  tablet camera pushes past them the line stops being true.
- **"Hold the tools icon for two seconds"** is timed against `HOLD_FRAMES = 60` at 30fps.
  Retiming that ring makes the copy wrong.

**Open and Close copy is duplicated in three places** — `compositions/FirstRun.tsx` and
both the phone and tablet `BrandCard` registrations in `Root.tsx`. `defaultProps` stays
inline per `AGENTS.md`, so the duplication is deliberate; it also means a copy edit that
touches only `FirstRun.tsx` leaves `Scene-Tablet-Open` silently stale. Change all three.

## Baseline now in the repository

- `First-Run-Tablet` is registered at **1920×1200** — 16:10, 30fps, 3600 frames (120s).
  Android tablets are 16:10 and the app surface is 1280×800, so the frame is exactly 1.5×
  the viewport: a full-frame shot fills edge to edge and every dp maps to a whole 1.5
  pixels. At 1920×1080 the same shot left a black bar down each side.
- All seven tablet scenes are registered under `Scenes-Tablet` for isolated work.
- Full-cut stills have rendered successfully in CTRLbot, Device, Connect, Build Room,
  EUI switching, and EUI power states. This proves the baseline loads; it does not make
  the current output reviewable.
- `Proof-Tablet-EUI`, `Proof-Tablet-Catalog`, `Proof-Tablet-Connection`, and
  `Proof-Tablet-Capture` render at the natural 1280×800 app viewport.
- `TabletNavRail.tsx` is the shared landscape setup rail derived from the current
  `res/layout/_setup_main.xml`. `DriverCatalog` uses it. It exports regions for camera
  and annotation work and can reveal Activities/EUI with `showRoomMenus`.
- The device-specific Build Room capture mapping is fixed: phone uses `switching.png`,
  tablet uses `switching-preview.png`.
- Two tablet CTRLbot AI references are curated under `public/captures/tablet/`:
  `ctrlbot-ai-core.png` and `ctrlbot-ai-room.png`.
- `Callout` takes an optional `footnote` / `footnoteAt`, for a late warning line that has
  to lay out with the copy instead of at its own coordinate. Build Room uses it.

As of 2026-07-31 the tablet cut is built out and renderable end to end
(`out/first-run-tablet-review-08.mp4`). Every scene has landscape surfaces, landscape
camera paths, and the locked copy. See *Scene status* below.

## What the phone cut taught us

1. Read XML before drawing or targeting a control. A screenshot is useful for fidelity,
   but it is not a region map. Layout constants and annotation regions must share one
   definition.
2. Verify the full cut. `npm run check` bundles and lists compositions, but it does not
   load every capture at every frame. A bad device-specific filename survived until a
   full-cut tablet still reached Scene 5.
3. Keep scene duration in `SCENE_FRAMES`. The scene composition and its transition slot
   must never have separate timing values.
4. Put copy outside `Camera`. On tablet the right-side callout is a real card; compose the
   camera subject to the left of it instead of allowing the card to cover the control.
5. Landscape has room for meaningful camera moves, but a tighter zoom is not automatically
   better. Hold before and after every move and keep enough UI context to identify the
   workflow.
6. Menu state is part of the story. Start with CTRLbot / Device / Connect / Set; reveal
   Activities and EUI only after a connection exists.
7. Preserve the phone editorial order in EUI: unified control, Many-to-One first,
   Many-to-Many second, slider volume and mute, power cycle, then the two-second setup
   hold.
8. Captures are appropriate for state/context screens such as power progress. Live
   surfaces are required when the viewer must see a control move or state update.
9. Anything that has to sit with the copy must lay out *with* the copy. A second text
   element positioned at a hand-picked `top` printed straight across the captures' own
   Presets/Switching/Audio tab strip on phone, and would have landed under the card on
   tablet. That is what `Callout`'s `footnote` / `footnoteAt` props are for — use them
   rather than re-deriving a coordinate that only holds for one form factor.

## Android sources for the tablet work

- Setup rail and content frame: `res/layout/_setup_main.xml`
- CTRLbot content host: `res/layout/menu_ctrlbot.xml` (WebView; use the curated captures
  for its visual content)
- Driver catalog: `res/layout/driver_database.xml` and `driver_card.xml`
- Configure Connection: `res/layout/driver_connect_edit.xml`
- EUI chrome: `res/layout-land/_end_ui.xml`
- EUI switching: `res/layout/av_switch_nx1.xml`, `av_switch_nxo.xml`, and
  `item_eui_output_cell.xml`
- Power states: `res/layout/control_power_on.xml`, `dialog_power_off.xml`, and
  `dialog_power_on.xml`

The tablet rail is 200dp wide and `frame_setup` begins after it. Do not place a
1280dp-wide setup surface beside the rail; re-derive its content width from the setup
layout. `DriverCatalog`, `ConnectionPanel` and `CtrlbotAi` all account for it now — each
exports a `content` region and a `centreX` that is the *panel's* centre, not the surface's.
Framing a landscape shot on `viewport.width / 2` pulls the camera a rail's width off
target; use the surface's own `centreX`.

## Scene status

All seven scenes were built out on 2026-07-31 and each beat below was checked against a
rendered `First-Run-Tablet` still, not inferred from the source.

| Scene | State |
|---|---|
| Open | Real tablet card, locked copy |
| CTRLbot | **Rebuilt.** `CtrlbotAi` takes a `device` and renders `TabletNavRail` beside a landscape content plane; `aiRegions` is now a function of device. The scene tells the same story with different mechanics — the phone sheet opens and drops away, the permanent rail is carried by the camera instead |
| Device | Menu beat gated and retargeted to `tabletNavRegions.row('device')`; catalog list and add button already sat left of the card |
| Connect and test | `ConnectionPanel` now lays out inside the rail's content frame (1080dp, not 1280) and reveals Activities/EUI in the rail via `showRoomMenus`. Tablet has its own Activities beat using the locked copy |
| Build the room | **Rebuilt.** Presets → Switching → Audio, left to right, each opening with a ring and a tap on the real tab. Camera is locked off: in a frame whose aspect matches the surface, any push crops all four edges — the old 0.9 push cut the rail off the left, the tab strip off the top and the run/copy/delete icons off the right |
| EUI handoff | Landscape shot list re-authored — gentle pushes, spotlight-led, corner controls excepted. **Many-to-One is the exception: no annotations at all.** It opens cold (nothing routed, display grey) and holds one wide shot while a source is selected, so the card turning blue and the display filling read as one event |
| Close | Real tablet card, locked copy |

### What landscape composition came down to

Three findings, all of which cost a render each and are worth not rediscovering:

1. **`closeShotWidth('tablet')` (0.52) is unusable on centred content.** At ~2.4x the
   camera cannot slide far enough to move a centred control out from under the copy card —
   `clampToContent` pins the frame inside the content plane long before it gets there. Use
   `wideShotWidth` (0.86) on centred surfaces. Keep 0.52 for controls hard against an edge,
   where the clamp works *for* you: framing on `{x: 0}` leaves the rail hard left, and the
   EUI's corner controls take a 0.42 push happily.
2. **The copy card had to give ground.** It was `maxWidth: 640`, pinned `top: 96` to
   `bottom: 96`, with 72px of internal padding — an 888px-tall box holding three lines of
   text, owning a third of the frame for a whole beat. It is now 580 wide, hugging its
   content, with 44px padding. Hugging is what freed the top of the frame, which is where
   the landscape surfaces put their toolbars and action rows.
3. **Copy goes opposite the subject — and on landscape that means it moves.** The EUI's
   audio strip runs the full width along the bottom, which is exactly where a
   bottom-anchored card sits, so that one beat takes `side="top"` on both form factors.

## Full-cut frame map

Transitions overlap by 20 frames. These are the current scene starts in both cuts:

| Scene | Start frame |
|---|---:|
| Open | 0 |
| CTRLbot | 190 |
| Device | 590 |
| Connect and test | 1170 |
| Build the room | 1890 |
| EUI handoff | 2390 |
| Close | 3390 |

Use those offsets only for review stills. Scene-local animation frames remain inside each
scene file.

## Remaining work

The tablet EUI now runs the phone's cold, select, single-route, reselect and All script.
Its first route lands on Output 2 to match the tablet reference, while the phone retains
Output 1. Both cuts hold the matrix wide, annotate the All press, clear the copy before
the four-output payoff, and mention All in the Many-to-Many copy.

1. **Check `ActivitiesSwitching` against a real build** — see the top of this file.
2. **Watch the encoded cut.** Stills prove composition; they do not prove pacing. The
   landscape scenes hold wider than the phone ones, which may read as slower.
3. **The Connect rail is expanded; the capture shows it collapsed.**
   `captures/tablet/connection-test.png` has the rail as a ~70dp icon strip on this
   screen. Expanded was chosen deliberately so the Activities reveal lands on a labelled
   row rather than an extra icon — far more legible in a training video — but a
   `collapsed` variant of `TabletNavRail` would be more faithful if that reveal ever moves
   elsewhere.
4. **Presets and Audio each fill about a quarter of the landscape surface**, so there is a
   lot of black in those panels. Captures with more content in them would help more than
   any camera work. `preset-builder.mp4` (the Edit Preset screen) is a real Activities
   screen and is currently unused — it would make a good fourth beat if the scene ever
   wants one.
5. **`CtrlbotAi`'s tablet constants are measured, not derived** — it is a WebView, so
   there is no XML to derive from. Re-read `ctrlbot-ai-core.png` if that screen is
   redesigned. `Proof-Tablet-CTRLbot` is the harness.

Review frames, each chosen because it is where a beat is decided:
**280** (rail), **420** (CTRLbot AI), **580** (suggestions), **730** (Device menu),
**1080** (add), **1210** (address), **1660** (terminal), **1830** (Activities reveal),
**1970** (Presets), **2320** (Audio), **2520** (Many-to-One), **2900** (matrix route),
**2960** (audio strip), **3140** (power), **3348** (exit hold), **3377** (hold complete).

Useful commands:

```bash
npm run check
npm run still -- Proof-Tablet-EUI out/tablet-eui-proof.png
npm run still -- Proof-Tablet-Catalog out/tablet-catalog-proof.png
npm run still -- Proof-Tablet-Connection out/tablet-connection-proof.png
npm run still -- First-Run-Tablet out/tablet-check.png --frame=2950
npm run render -- First-Run-Tablet out/first-run-tablet-review-08.mp4 --codec=h264 --crf=20 --muted
```
