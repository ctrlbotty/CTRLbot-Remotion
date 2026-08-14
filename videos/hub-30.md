---
id: hub-30
destination: website-hub-cell
---

# THE HUB — 30-second cell for ctrlbot.io

> Derived from `videos/device-database.md`, the way `playStore_promo3_30.md` derives from
> `playStore_promo3.md`. Nothing new is claimed and nothing new is drawn: every state on
> screen already exists in `src/marketing/device-database/deviceDatabaseData.ts` and the
> two surfaces in `src/app-ui/`. What changes is the frame, the length, and the subject.
>
> **`npm run video:frames -- hub-30 validate` fails on a fresh checkout**, with
> `unknown destination "website-hub-cell"`. That is expected: nothing is built yet, and
> T1 is the task that creates the destination. The repository's own gates —
> `npm run check`, `npm run video:lint`, `npm run video:lint -- --selftest` — are all
> green, and this brief is the only file referring to something that does not exist.

## Watching

Someone on ctrlbot.io who has scrolled to **THE HUB** and is looking at one media cell
beside one paragraph. They are not being sold an app. They want to know what is actually
in the shelf.

## Promise

The device database is a resource in its own right: manufacturer after manufacturer,
every kind of device, and each driver carrying its manual, its connection and its API.

> **Scope, narrowed deliberately.** This is about the database *as a resource*. It is not
> about CTRLbot IoT or how you use it — no adding a device, no connecting, no testing, no
> End Points, no activities. And it says nothing about what the Hub will become: no
> community, no contribution, no sign-in, no "coming soon". The 2-minute cut covers the
> app; this covers the shelf.

## Beats

Cut order. Seconds sum to 30 at 30fps. The surface is the **tablet** build throughout,
**full bleed** — no stage, no panel, no gradient, no shadow. One camera position per beat,
held for the whole of it.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| library | Manufacturer after manufacturer | `DriverCatalog` | The list scrolls alphabetically through ACER, AVPRO EDGE, BARCO, BENQ, BLUSTREAM, CANON, CASIO, CHRISTIE — each card colour-coded by device type, each with its own `+` | 6 |
| types | Every kind of device | `DriverCatalog` | Sort dropdown opens on *Manufacturer / Projector / Display / Switchers / End Points*, over cards whose colours already separate the types | 5 |
| manual | Each driver is a manual | `DriverDetail` | EPSON PowerLite selected; description, then *Setup* expands under Specs and Support and its four paragraphs arrive, ending on PJLink port 4352 | 6 |
| connection | …and a connection | `DriverDetail` | Control Info fills in: Control Type IP, IP Type TCP, Port 3629, Keep Alive, On Connection, Authentication Required | 5 |
| api | …and an API | `DriverDetail` | Command rows arrive with their key names and payloads — `POWER_ON` / `PWR ON\r` — and the line-ending selector opens on *CR (\r) / LF (\n) / CRLF (\r\n) / None* | 5 |
| close | Back to the shelf | `DriverCatalog` | The list, at rest, scrolled to the top with nothing selected — pixel-identical to frame 0 | 3 |

## Anything unusual

- **This is a loop, not a cut.** The site's media cells are `<video autoplay muted loop
  playsinline>`, so frame 0 and the frame after the last one must be the same picture or
  the wrap is a jump cut every thirty seconds beside a paragraph somebody is reading.
  `npm run loop:seam` is the gate. `close` therefore returns the list to exactly the
  state `library` opens on — same scroll, no selection, same category — which costs three
  seconds and is the only structural difference from the 2-minute cut.
- **Full bleed, and that is the brief's whole visual instruction.** No `<Stage>`, no
  panel, no `background.promo`, no drop shadow. `src/marketing/web-loops/LoopAi.tsx` is
  the precedent and its header says why: a media cell already has the site's own border,
  and anything drawn inside it is a second frame within the first. The composition is
  `<AbsoluteFill>` + `<Camera>` and nothing else.
- **1920x1200, because the surface is 1280x800.** The tablet viewport is exactly 16:10, so
  a full-frame shot is exactly 1.5x with no resampling — every dp lands on a whole pair of
  pixels. The site's `.home-board .unit>.media` is `aspect-ratio:16/10` with
  `object-fit:cover`, so a 16:10 render is shown whole and uncropped. See the note at the
  top of `webLoopData.ts`, which reaches the same conclusion for the loops.
- **The frame carries no copy.** The site's layout grammar puts a text panel beside the
  cell, so the words are HTML — the same rule `WEBSITE_PANEL_LOOP` states. There is no
  copy column, no eyebrow, no title, and `StageCopy` is not imported.
- **Margins come from inside the surface, or from black behind it.** The two full-screen
  beats frame ~1372dp across a 1280dp plane so a black band surrounds the surface — the
  nav rail's background fills to the screen edge and cannot provide one. The detail beats
  frame inside the surface and take their margin from `DriverDetail`'s own padding. Both
  mechanisms already exist in `DeviceDatabase.tsx`; neither is new work.
- **Nothing on screen is invented.** Driver names, model numbers, the Epson description
  and setup text, the ports, the command payloads and the four line endings are all
  transcribed from `Device Database Walkthrough.mp4` and already live in
  `deviceDatabaseData.ts`. If a beat needs something that is not in that file, the beat is
  wrong, not the file.
- **`End Point` appears once, as a device category in the sort list, and nowhere else.**
  The transport story and the Global Cache converter are the 2-minute cut's subject and
  are out of scope here. Do not add them back to fill time.
- **The site's Hub paragraph has to change too, and `index.html` is generated.** It
  currently reads "The hub is being built… Access will open behind sign in when the shelf
  is ready", which is exactly the future-facing framing this cut drops. Edit it in
  `tools/build.py` and re-run `python tools/build.py`; never hand-edit `index.html`.

---
<!-- Task list below. `- [ ]` pending · `- [x]` verified · `- [!]` blocked -->

## Tasks

> One task, one gate, one commit. Do not start the next until the current one is `- [x]`.
> The orchestration contract is `docs/HUB-30-ORCHESTRATION.md`.

- [ ] **T1 · destination** — Add `WEBSITE_HUB_CELL` to `src/destinations.ts`: id
  `website-hub-cell`, frame 1920x1200 @30, duration `{min: 25, target: 30, max: 35}`,
  `audio: 'muted-first'`, safeArea 72 all round, `firstImpressionSeconds: 10`,
  `maxInertFraction: 0.6`, `banned: []`, and a `hosting` line naming the site's
  `assets/loops/` path and its four-hour fixed-URL cache. Register it in `DESTINATIONS`.
  Keep the file import-free — the linter transpiles and imports it directly.
  **Gate:** `npm run video:frames -- hub-30 validate` reports the brief's 30s inside the
  window and names no unknown destination.

- [ ] **T2 · data** — Create `src/marketing/hub-cell/hubCellData.ts`. Beat table only:
  `BEATS` (library 0/180, types 180/150, manual 330/180, connection 510/150, api 660/150,
  close 810/90), `HUB_FRAMES = 900`. Re-export nothing that already exists — import
  `IP_DRIVERS`, `EPSON_INDEX`, `EPSON_DESCRIPTION`, `EPSON_SETUP`, `EPSON_COMMANDS`,
  `EPSON_PORT`, `SORT_OPTIONS`, `LINE_ENDING_OPTIONS` from `../device-database/
  deviceDatabaseData`. **No `COPY` object** — this cut has none.
  **Gate:** `npm run check` passes and nothing in the file duplicates a value that already
  exists in `deviceDatabaseData.ts`.

- [ ] **T3 · composition** — Create `src/marketing/hub-cell/HubCell.tsx`. `<AbsoluteFill
  style={{backgroundColor: color.void}}>` wrapping `<Camera contentSize={TABLET_VIEWPORT}
  shots={SHOTS} viewport={{width: 1920, height: 1200}}>`. Reuse the two-shots-per-beat
  path from `DeviceDatabase.tsx` (arrive at `from + 22`, hold to `from + duration`), the
  `rise` / `scroll` / `fade` helpers, and the `SurfaceTrack` frame-switch pattern. No
  `<Stage>`, no `StageCopy`, no `background.promo`, no address element.
  **Gate:** `npm run check` lists `hub-30` at 1920x1200, 900 frames; `npm run video:lint`
  is 0 errors.

- [ ] **T4 · register** — Add a `Hub` folder to `src/Root.tsx` with `<Composition
  id="hub-30" component={HubCell} durationInFrames={hubCellDuration} fps={30} width={1920}
  height={1200} />`, with a comment saying what it is and that it must loop.
  **Gate:** `npm run check` shows it; no other composition's metadata changed.

- [ ] **T5 · framing and margin** — Set `FRAMING` per beat. `library` and `close` at
  width 1372 centred on the plane (black band all round). `types` from x=200 (the rail /
  list boundary, so the list column's 12dp is the margin). `manual`, `connection` and
  `api` on the detail pane, 630→1280, taking their margin from `DriverDetail`'s padding.
  **Gate:** `npm run video:frames -- hub-30 contact` and read every still — each beat's
  evidence line is visible, and no control, label or log line touches a frame edge.

- [ ] **T6 · the seam** — Two parts. First, make `close` end on `library`'s frame 0
  exactly: same `listScroll`, `selectedIndex={null}`, same category, no menu open, and no
  easing still in motion at the last frame. Second, add
  `{id: 'hub-30', name: 'hub-30-v1', width: 1920, height: 1200}` to the `LOOPS` array in
  `scripts/loop-render.mjs` — read the comment above it: the version lives in that array
  and is bumped *before* rendering, because the site serves `assets/loops/` from a
  fixed-URL cache with no content hash. `loop:render` supersamples at 2x, downsamples
  with lanczos, and syncs the result plus a poster into the site repo on its own.
  **Gate:** `npm run loop:render -- hub-30` then `npm run loop:seam --
  out/web/hub-30-v1.mp4` passes. Do **not** use `npm run render` — at 1x the interface
  crawls, which is the whole reason `loop:render` exists.

- [ ] **T7 · render gates** — Full gate pass on the rendered file.
  **Gate:** `npm run video:lint` 0 errors · `npm run video:frames -- hub-30 check
  out/web/hub-30-v1.mp4` under the 60% inert ceiling with median content area 100% ·
  duration exactly 30.000s · 1920x1200.

- [ ] **T8 · site copy** — In `C:\0-Repo\2 - CTRLbot.io\ctrlbot-io-site\tools\build.py`,
  rewrite the `home_block("THE HUB", …)` call: keep the title, replace the thought line
  and the paragraph so both describe the database as it is today — manufacturers, device
  types, and a driver that is manual, connection and API. Remove "is being built",
  "Access will open behind sign in", "when the shelf is ready" and the `SEE WHAT'S
  COMING →` link. Do not mention community or contribution.
  **Gate:** `python tools/build.py` regenerates `index.html`; `git diff index.html` shows
  only the Hub block changed.

- [ ] **T9 · site embed** — In the same unit in `tools/build.py`, swap the static
  `/assets/device-driver-library.png` figure for a `<video>` matching the existing loop
  cells: `src="/assets/loops/hub-30-v1.mp4"`, its poster, `autoplay muted loop playsinline
  preload="none"`, and an `aria-label` describing what is on screen. T6's `loop:render`
  already synced both files into `assets/loops/` — confirm they are there rather than
  copying them again, and never overwrite an existing name.
  **Gate:** `python tools/build.py`, then load the page and confirm the cell plays,
  loops without a visible jump, and is not letterboxed inside its 16:10 frame.
