# Tablet first-run handoff

State as of 2026-07-30. The phone cut is the editorial reference; the Android app is the
product and geometry reference.

## Baseline now in the repository

- `First-Run-Tablet` is registered at 1920×1080, 30fps, 3760 frames (125.33s).
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

Do not send the current tablet composition for review. Its copy, camera paths, and some
surfaces still inherit phone decisions.

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

The current tablet rail is 200dp wide and `frame_setup` begins after it. Do not place a
1280dp-wide setup surface beside the rail; re-derive its content width from the setup
layout. `DriverCatalog` already accounts for the rail. `ConnectionPanel` does not yet.

## Scene status and next action

| Scene | Current state | Next action |
|---|---|---|
| Open | Real tablet card, phone-approved copy | Check 1920-wide line breaks and balance |
| CTRLbot | Incorrect phone surface/menu in a tablet frame | Build a tablet surface from the curated WebView captures plus `TabletNavRail` |
| Device | Live tablet catalog and current shared rail | Recompose camera targets and right-side copy; verify add-button regions after the 200dp rail change |
| Connect and test | Live landscape panel, but no setup rail and phone-derived camera timing | Fit it inside the XML content frame, add the shared rail, then retarget host/connect/send/terminal and the Activities reveal |
| Build the room | Three tablet captures now load | Check the crop on Presets and Audio; compose each panel so the right-side card does not hide the taught control |
| EUI handoff | Live Many-to-One/Many-to-Many plus correct tablet power captures | Re-author the landscape shot list; keep callouts clear of selected source/output/audio controls |
| Close | Real tablet card, phone-approved copy | Match the opening card's landscape balance |

## Full-cut frame map

Transitions overlap by 20 frames. These are the current scene starts in both cuts:

| Scene | Start frame |
|---|---:|
| Open | 0 |
| CTRLbot | 190 |
| Device | 610 |
| Connect and test | 1210 |
| Build the room | 1970 |
| EUI handoff | 2490 |
| Close | 3550 |

Use those offsets only for review stills. Scene-local animation frames remain inside each
scene file.

## Recommended build order

1. Run `npm run sync:tokens` and render all four tablet proofs.
2. Build the tablet CTRLbot surface and a reusable setup-content shell around
   `TabletNavRail`.
3. Finish Device and Connect while the rail/content geometry is fresh.
4. Check all three Build Room captures in the full cut.
5. Reframe EUI last; it already has the most complete landscape surfaces and provides the
   best reference for camera/card composition.
6. Render settled full-cut frames after every two or three changes, then render and watch
   the complete `First-Run-Tablet` before reporting completion.

Useful commands:

```bash
npm run check
npm run still -- Proof-Tablet-EUI out/tablet-eui-proof.png
npm run still -- Proof-Tablet-Catalog out/tablet-catalog-proof.png
npm run still -- Proof-Tablet-Connection out/tablet-connection-proof.png
npm run still -- First-Run-Tablet out/tablet-check.png --frame=2950
npm run render -- First-Run-Tablet out/first-run-tablet-review-01.mp4 --codec=h264 --crf=20 --muted
```
