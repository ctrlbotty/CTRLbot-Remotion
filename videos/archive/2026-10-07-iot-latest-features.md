---
id: iot-latest-features
destination: social-walkthrough-vertical
---

# CTRLbot IoT: latest features — narrated walkthrough (Roadmap W05)

## Watching

An AV integrator or installer who already uses CTRLbot IoT, or has seen W03 or W04, on a
tablet. They want to know what v1.0.9 changed, in about two minutes: which devices and end
points are new, what is new in Connect, and what the end user now sees.

## Promise

What v1.0.9 adds to CTRLbot IoT on the tablet, shown on the tablet.

## Narration

- Mode: `source-edit`, planned with `npm run narration:edit`. Narrated only: there is no silent cut.
- Source recording: `video input/W05 Feture walkthroug.mp4` (6:59, 1698x1218, 30fps; the
  tablet recorded through CTRLbot Mirror)
- Ingest: `ingest/iot-latest-features/` — `transcript.md` is `Status: DRAFT` until T1
- Prepared audio: `public/narration/iot-latest-features/source-normalized.m4a`
- Edit list: `src/marketing/iot-latest-features/iotLatestFeaturesNarration.ts`
- Planned edit: `public/narration/iot-latest-features/edit.m4a` and
  `src/marketing/iot-latest-features/iotLatestFeaturesNarration.generated.ts` (T8; never
  hand-edited)
- Landscape: `iot-latest-features`, 1920x1080 → `out/iot-latest-features.mp4`, captions as
  `out/iot-latest-features.srt` — YouTube
- Portrait: `iot-latest-features-portrait`, 1080x1920, captions burned in →
  `out/iot-latest-features-portrait.mp4` — TikTok, YouTube Shorts, LinkedIn, X

## Beats

The hybrid format, as W01's revision 2 (`videos/archive/2026-10-02-mirror-walkthrough-r2.md`) and W04's revision 2
(`videos/iot-tablet-walkthrough.md`), with the tablet full frame. Layout: `card`, `stage` or
`chapter`. Stills are `ingest/iot-latest-features/frames/f_00NN.jpg`.

| id | Layout | Claim | Surface | Evidence | Sec |
|----|--------|-------|---------|----------|-----|
| open | card | What is new in CTRLbot IoT | `MasterControlCard` | The tricon and the CTRLbot IoT lockup are on screen at frame 0; the line streams in beneath them | 5 |
| proof | stage | Drag a source onto a display | `TabletEui` | The tablet EUI; a source is pressed, dragged and dropped on a display, which fills with it, ringed | 7 |
| avoip | chapter | Three more AV-over-IP manufacturers | `DriverCatalog` | End Points is picked; Kramer, Matrox and Hall Research rows are ringed one after another (f_0006–f_0007) | 12 |
| global-cache | chapter | Global Caché by exact model | `DriverDetail` | Global Caché End Points in the detail pane; the Model dropdown opens on the Flex, GC-100, Global Connect and iTach models, Most Models above them (f_0008–f_0010) | 13 |
| pusr | chapter | Serial through a PUSR USR-W630 | `DriverDetail` | PUSR End Points in the detail pane, model USR-W630; its description is ringed (f_0011) | 14.5 |
| discovery | chapter | Find Devices matches and adds them | `DiscoverDevices` | The catalog's 15 devices found button is ringed in its corner, then Discover Devices: the Global Cache iTachFlexEthernet row shows its matched driver, Add Driver is tapped, "1 device added" (f_0012, f_0017–f_0020) | 8.5 |
| rs232 | chapter | Connect an RS-232 device through the end point | `ConnectionPanel` | Configure Connection for the Acer XL2320P with the RS232 End Point set; CONNECT shows its progress, then connected, with the terminal on the left and the commands on the right (f_0022–f_0024) | 19.5 |
| terminal | chapter | A terminal for every device | recording (footage) | The recording: Test Device Drivers with the terminal beside the commands, then the terminal opened as its own page and getdevices typed and sent (277.3–292.6s, the second piece at 1.55x) | 8.5 |
| webpage | chapter | The device's own web page, in the app | recording (footage) | The recording: the Web page tab tapped, the iTach's own configuration page, then Flex Link Cable (304.1–309.1s and 312.6–316.1s) | 8.5 |
| eui | chapter | Drag to a display, or send to All | `TabletEui` | A source dragged onto a display; a source tapped, then All, and every display takes it (f_0042–f_0045, f_0049) | 11.5 |
| power | chapter | Change your mind before it powers off | `TabletEui` + `EuiPower` | Power is tapped; Powering Off shows the ✕ in its corner, ringed; the power-off completes and the beat holds on Welcome (f_0046) | 9 |
| close | card | The name, once, at the end | `MasterControlCard` | The CTRLbot IoT lockup and its line; no URL; no narration | 4 |

## Anything unusual

- **129 seconds, under 2:20.** `social-walkthrough-vertical` caps it at 140; the landscape
  cut is also checked against `social-walkthrough`.
- **The recording, not the Roadmap row, sets the features.** The Roadmap lists display power
  over CEC and line-out level for W05; the recording shows neither, so neither is in this
  cut (they stay S21 and S22). It adds what the Roadmap row did not list: the Net Switchers
  category, the RS-232 Configure Connection layout, the Test terminal and the device web page.
- **The message shows on power on, not power off.** The narration says it pops up "when you
  hit that power off button"; the recording shows `hello world` under the Powering On ring
  (406.5s), because the step is in the Power On preset. That phrase is cut; the picture and
  the copy follow the app.
- **The ✕ is shown, not pressed.** In the recording the power-off runs to completion. The
  copy states what the release notes say cancelling does; the picture does not fake it.
- **Claims are v1.0.9's release notes** (`../../1 - CTRLbot.av/CTRLbot-IoT/RELEASE\_NOTES.md`)
  and the app. Cut from the narration and never written as copy: the IPMX "universal
  protocol" aside (as W04), "a lot more switches coming up", "their complete line",
  "connect the tablet straight to the device", RS-485 (heard as "RS-45"; unverified in the
  voice), and "Isn't that wonderful?".
- **Captions need fixes**: `Pooser` → PUSR, `RS` + `-232` → RS-232 (as W04), `Cache` →
  Caché, `all research` → Hall Research (T2), `thanks` → Thanks.
- **Rows and addresses.** Discovery rows come from the stills: private `192.168.0.x`
  addresses only. Household device names in the recording (a router, a speaker, a printer,
  a dongle) may appear as unmatched rows; nothing that names a person.
- **The web page is not rebuilt.** As W04: the in-app web view with its address bar over an
  empty page, held under 2s. No vendor page content.
- **Shared files have one owner.** The coordinator serializes `src/Root.tsx`, caption
  helpers and shared surfaces; tasks on disjoint files may overlap W02–W04. T6 waits
  for W03 T21's region map to be integrated.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Scope lock

- **User outcome:** W05's two narrated renders — landscape for YouTube with an .srt,
  portrait with burned-in captions — showing what v1.0.9 adds, each feature proved by one
  visible change on the tablet on its spoken cue, under 2:20.
- **In scope:** the transcript correction; a two-word caption correction; optional states
  on five existing surfaces (catalog type and its Discover header, model dropdown, RS-232
  connection layout, preset delay message, power-off cancel and status line); the edit
  list; the beat data; both compositions; 14 beats; renders and .srt. Revision 2 adds
  re-pointing the ingest at the renamed recording (T15), the catalog's Discover header
  (T17) and bringing the lane into main (T16).
- **Out of scope:** CEC and line-out (S21, S22); the shorts S17–S24; any new surface file;
  footage; Android Settings; the vendor web page; W01–W04 and their files; `Roadmap.md`;
  publishing; gate thresholds; re-transcribing the recording.
- **Must preserve:** every surface's default render and every existing `Proof-*` still;
  `First-Run-*`, the promos, W01–W04 and the shorts; W01's and W04's .srt from
  `narration:srt` unchanged by T2; `video input/` never modified; the ingest's
  `words.json`, `captions.json`, `heard.json` and corrected `transcript.md` never modified
  (T15 rewrites only `ingest.json`'s source record); Codex's uncommitted work in the main
  checkout.

## Architecture

Nothing new at the composition level: W05 is a fifth consumer of what W01 built.

```
iotLatestFeaturesNarration.ts ──narration:edit──▶ edit.m4a + …Narration.generated.ts   (T8)
iotLatestFeaturesData.ts — beats, layouts, copy, regions, cue frames                       (T9)
IotLatestFeatures.tsx → WalkthroughShell (card / stage / chapter, captions)                (T10)
IotLatestFeaturesBeats.tsx → existing app-ui surfaces, with the optional states T3–T7, T17 add  (T10–T13)
```

- **Surfaces gain optional props only.** Each state below is absent by default, so every
  existing caller renders as today. Geometry from the named `layout/` XML and
  `tokens.generated.ts`; text and arrangement checked against the named stills.
- **One shared change, T2.** `correctCaptions` corrects word by word, and `all` also occurs
  in "send to all" in this edit, so `all research` → Hall Research cannot be a one-word
  correction. T2 lets a correction key be two words; one-word keys behave as today.
- **Revision 2 runs in a worktree lane.** Codex is working in the main checkout with
  uncommitted `src/Root.tsx` edits, so W05 commits to branch `w05` in
  `../CTRLbot-Remotion.worktrees/w05` and reaches main only at T16 (see Concurrency).

## Copy

Executors place these verbatim. Eyebrows render uppercase. Audiowide only on the card lockup.
Chapters are step labels: eyebrow and title, a body only where given.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open (card) | New in v1.0.9 | lockup **CTRLbot IoT** | line: New devices, new end points, and drag to route. |
| proof (stage) | End user interface | Drag a source onto a display | Press, hold and drop it to route. |
| avoip | AV-over-IP | Kramer, Matrox and Hall Research | — |
| global-cache | End points | Global Caché by exact model | iTach, GC-100, Flex or Global Connect, each with its own ports. Most Models is still there. |
| pusr | End points | Serial through a PUSR USR-W630 | — |
| discovery | Find Devices | Matched to a driver, added in one tap | — |
| rs232 | Connect | RS-232 through an end point | — |
| terminal | Connect | A terminal for every device | — |
| webpage | Connect | The device's own web page | — |
| eui | End user interface | Drag to a display, or send to All | — |
| power | End user interface | Change your mind before it powers off | Tap ✕ and nothing is sent. |
| close (card) | — | lockup **CTRLbot IoT** | line: All of it in v1.0.9. |

## Narration clips

Source ranges in seconds on the prepared track, from `words.json`. A range only selects
words: `narration:edit` finds the silence around them. Placement is W01's rule: a beat's
first clip at its start + 0.25s (`open` at 0.35s), each next clip 0.3s after the previous
one's planned end, and at least 1.0s held after a beat's last clip. `welcome` runs from
`open` into `proof`; the cut to the tablet lands on "CTRLbot IoT".

| beat | id | source | what is said |
|------|----|--------|--------------|
| open → proof | welcome | 0.85–14.2 | Welcome to CTRLbot. This will be a short walkthrough of the latest features and benefits of the CTRLbot IoT app |
| avoip | avoip-more | 57.15–61.25 | And on that note, we added a lot more AV over IP endpoints. |
| avoip | avoip-brands | 71.75–79.5 | We also added Kramer, Matrox, and Hall Research endpoints for AV over IP. |
| global-cache | gc-models | 80.35–94.8 | As far as endpoints for RS-232, IP to RS-232, or IP to IR, we've added additional models for Global Caché. |
| pusr | pusr | 97.55–113.95 | We also added a PUSR, which is an industrial-type wireless or wired Ethernet portal and allows you to convert IP to RS-232 |
| discovery | disc-corner | 141.85–144.2 | device discovery up here in the corner, right? |
| discovery | disc-click | 164.25–169.85 | it'll allow you to add that driver just with one click |
| rs232 | rs-acer | 207.05–211.1 | I'm gonna also just add an Acer projector, RS-232. |
| rs232 | rs-endpoint | 219.25–223.9 | end point right in here and we can connect to it directly. |
| rs232 | rs-terminal | 227.35–230.8 | this whole terminal is new right here. |
| rs232 | rs-layout | 230.8–238.75 | also the layout, the way that we have the commands and the configuration on the right. |
| terminal | term-open | 277.55–280.65 | you can open up the terminal now directly, right? |
| terminal | term-send | 283.95–288.5 | If I wanted to send a command directly, I can do that from right here as well. |
| webpage | web | 304.25–311.45 | And additionally, if the device has a webpage, right, then you'll be able to access that webpage directly, |
| eui | eui-drag | 372.95–379.6 | Another great feature now is you can drag and drop the sources on there. |
| eui | eui-all | 389.25–393.75 | And of course you can select a source and send to all by hitting that all button. |
| power | power-x | 396.05–403.95 | Also, just a little safety feature. We have a little X in the corner. So if you want to cancel or power off, you're able to do that now. |

Cut on purpose: the database-size claim and "Luxel … coming up" (22–56s), the IPMX aside
(61.8–71.3s), "complete line" (95–97s), RS-485 and "connect the tablet straight to the
device" (114–126s), the filler run (126.9–141.8s), "when you hit that power off button"
(351–355s), fonts and icons (355–369s), "Isn't that wonderful?".

## Shot list

Regions come from the surfaces' region maps; cues are `cueFrame(edit, clip, word)`, first
occurrence unless numbered. The camera settles about 0.3s before a cue, the action lands on
it, the result holds. Presses are `TapIndicator` (a finger on the tablet, not a pointer).
Portrait shows crops of the region being taught, no wider than 720 dp; only `proof`, `eui`
and `power` show the whole EUI. The subject is never in the right 140 px column.

| beat | cue → action → result |
|------|-----------------------|
| proof | welcome "features" → a source pressed · 0.6s later → dragged onto a display, which fills, ringed |
| avoip | avoip-more "endpoints" → End Points picked · avoip-brands "Kramer", "Matrox", "Research" → each row ringed on its word |
| global-cache | gc-models "endpoints" → Global Caché selected, the pane opens · "models" → the Model dropdown opens, the list ringed |
| pusr | pusr "PUSR" → PUSR selected, USR-W630 in the pane · "convert" → the description ringed |
| discovery | disc-corner "discovery" → the catalog's "15 devices found" button ringed · "corner" → Discover Devices, the list · disc-click "driver" → the Global Cache row's match ringed · "click" → Add Driver tapped, "1 device added" |
| rs232 | rs-acer "Acer" → Configure Connection for the Acer · rs-endpoint "end" → the RS232 End Point field ringed · "connect" → CONNECT tapped, the progress line · rs-terminal "terminal" → connected, the terminal ringed · rs-layout "commands" → the commands column ringed |
| terminal | term-open "terminal" → the Terminal tab · term-send "send" → GET DEVICES tapped, Sent then Received land |
| webpage | web "webpage" (first) → the Web page tab tapped · "directly" → the page opens; leave it by the beat end |
| eui | eui-drag "drag" → a drag onto a display · eui-all "source" → a source tapped · "all" (first) → All tapped, every display takes it |
| power | power-x "safety" → power tapped, Powering Off · "X" → the ✕ ringed · power-message "hello" → powering on, `hello world` under the ring |

## Executor instructions

**Revision 2 (2026-10-05): Claude implements and verifies in its desktop Code session, at
Nathan's request, with no handoff.** This is a scoped override of the profile's Gemini/agy
executor for W05 only; the AGENTS default stands. Nathan reviews this plan before T15.
Pending: T4–T17, in the run order under *Revision 2*; never redo a checked task.

1. Read `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`, this brief,
   and the installed `remotion-markup` and `remotion-interactivity` skills before
   composition code. The worked example is W04, `src/marketing/iot-tablet-walkthrough/`
   (the tablet full frame), with `src/marketing/WalkthroughShell.tsx`. Never import from
   another video's folder.
2. Work only in the lane (Concurrency). In the main checkout, touch only T15's file, this
   brief and the queue's W05 status line at the start, and T16's integration at the end.
3. Implement the brief's exact copy, clips and cues. Regions come from the surfaces' region
   maps and source constants; an unavoidable estimate is commented and looked at on a still.
   No measurement scripts, no pixel scanning, no background commands.
4. Per task: `npm run check`; `npm run video:lint` with 0 errors; the task's stills at its
   cue frames plus 10–15, in both shapes once T10 has registered them, held against the
   evidence line. A surface task compares its surface's existing `Proof-*` stills by hash,
   before and after. Then the non-author check, then commit on `w05`: the task's files and
   this brief, `T<n>: …`, with a review note.
5. Non-author check: `beat-verifier` (`.claude/agents/beat-verifier.md`) per task, returning
   only its verdict and notes, if Nathan approves its use. Without it, acceptance rests on
   the objective gates and the review note says "author-verified (Claude)", as
   `docs/COORDINATION.md` requires for coordinator-written work.
6. Limits: two repair rounds per task, then `[!]` with the evidence, and independent tasks
   continue. A new task ID does not reset the count for the same bottleneck. No nested
   subagents. No full log or diff in any report. Every retry or wait stops after two
   attempts. Stop when a turn repeats an earlier one nearly verbatim. A still over two
   minutes is blocked.
7. One heavy job at a time on the machine: before a render, contact sheet, narration build
   or verify, or frame check, confirm no other render is running (Codex shares the machine).
   After two checks, ask Nathan.
8. Final acceptance is T14, on both shapes. Then stop: Nathan reviews the renders, and T16
   waits for his go. No publishing, no close-out.

## Concurrency

**Update 2026-10-05: Codex finished and Nathan committed its work, so revision 2 runs in the
main checkout. The lane below is not used, and T16 reduces to the final regression check.
Nathan said "Implement W05" without answering the two questions, so the recommended cut
list applies and tasks are author-verified (Claude) on objective gates.**

Codex is finishing W01–W03 review fixes in the main checkout, with uncommitted edits that
include `src/Root.tsx`. Revision 2 therefore runs in a worktree lane (COORDINATION.md,
*Lanes*): branch `w05` in `../CTRLbot-Remotion.worktrees/w05`, made from main once this plan
and T15 are committed, with node_modules as a junction. Every W05 commit lands on `w05`.

- Nothing W05 writes reaches the main checkout until T16. The lane's working tree holds only
  its HEAD plus the task's files, so its checks are the clean-worktree checks
  `verify:task` would run. The shared `verify` and `render` worktrees are left to Codex.
- The final renders run in the lane; the deliverables are copied into the main checkout's
  `out/`.
- Reference stills stay in the main checkout's `ingest/iot-latest-features/frames/`
  (ignored, so not in the lane); read them there.
- Before T16, check main's log for commits to the files W05 changed: `DriverCatalog`,
  `DriverDatabase`, `ConnectionPanel`, `ActivitiesPresets`, `EuiPower` and `src/Root.tsx`.
- On quota exhaustion, checkpoint the first unverified task here and stop.

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked
>
> **Per-task check:** `npm run check` and `npm run video:lint`. A surface task (T3–T7, T17)
> renders its new `Proof-Tablet-<Name>-<State>` still (1280x800, registered beside the
> existing `Proof-*` stills) next to the stills it names, and re-renders that surface's
> existing tablet and phone `Proof-*` stills to show the default did not move. A beat task
> renders `npm run video:frames -- iot-latest-features contact --beat=<beat>` in both shapes
> (portrait: prefix `VIDEO_COMPOSITION=iot-latest-features-portrait`); before T10 registers
> the compositions, a beat task's check is `npm run check` and `npm run video:lint` only.

### Shared

- [x] T1: Correct `ingest/iot-latest-features/transcript.md` against `ingest/iot-latest-features/contact.html` and mark it `Status: corrected <date>` — files: ingest/iot-latest-features/transcript.md
  - Terms only: "Pooser" → PUSR, "all research" → Hall Research, "Luxel" → Luxul, "Global Cache" → Global Caché, "RS -232" → RS-232, "MGX", "Acer", "advice like this" → "a device like this" if the recording says so. Listen at 114–116s and write what is said ("RS-485" or "RS-45"). Keep filler and false starts; change no timestamp; never edit the JSON.
- [x] T2: Let a caption correction key be two words, so `all research` becomes Hall Research without touching "send to all" — files: src/audio/narrationCaptions.ts
  - One-word keys behave exactly as today. Verify: `npm run check`; `narration:srt` for W01 and W04 writes byte-identical .srt files before and after (to a scratch path, never over `out/`).
- [x] T15: Re-point the ingest at the renamed recording, `video input/W05 Feature walkthroug.mp4`, reusing every transcription output — files: ingest/iot-latest-features/ingest.json
  - Runs in the main checkout, because the recording is only there: `npm run ingest:recording -- iot-latest-features "W05 Feature walkthroug.mp4"`, no `--force`. The file is byte-identical to the one ingested on 2026-10-01 (95,370,153 bytes, same mtime); only its name changed ("Feture" to "Feature"), which is why `--list` reports it "not ingested" and `shorts.mjs` cannot find it.
  - Every step must print `reuse`. Nothing is transcribed and the GPU is not used. It also rewrites the untracked `contact.html`.
  - Verify: `--list` shows the recording with a corrected transcript. `git diff --stat` shows only `ingest.json`. `words.json`, `captions.json`, `heard.json` and `transcript.md` are unchanged. Commit it in main with this plan, staging exactly these two paths.

### Surface states (optional props, default unchanged)

- [x] T3: Add a `netSwitcher` device type to `DriverCatalog`, listed as Net Switchers in the type filter, with a `Proof-Tablet-Catalog-NetSwitchers` still — files: src/app-ui/DriverCatalog.tsx, src/Root.tsx
  - Stills `f_0004`–`f_0007`: the filter list Manufacturer, Projector, Display, Switchers, End Points, Net Switchers; the End Points list. Icon from the app's drawables via `public/app-assets/`; no new colour.
- [x] T4: Give `DriverDetail` an open Model dropdown listing a driver's models, with `Proof-Tablet-Detail-Models` and `Proof-Tablet-Detail-Pusr` stills — files: src/app-ui/DriverDatabase.tsx, src/Root.tsx
  - Stills `f_0008`–`f_0011`. Model names exactly as `f_0008`/`f_0009` show them; PUSR's description from the app's driver data, as `f_0011`.
  - Rev 2: runs after T17. The open list's region is exported relative to the detail pane, whose origin T17's header moves. The proof stills render inside the catalog with T17's header, as `f_0008` and `f_0011` do. Names and order are checked against `assets/data/drivers/IP_RS232/GLOBAL_CACHE/` and `PUSR/PUSR_End_Points.json` in the app.
- [x] T5: Add the RS-232 end-point state to `ConnectionPanel`'s tablet layout: the End Point field, RS-232 Configuration, terminal left and commands right, and a progress line, with a `Proof-Tablet-Connection-Rs232` still — files: src/app-ui/ConnectionPanel.tsx, src/Root.tsx
  - From `layout/driver_connection.xml`; stills `f_0022`–`f_0024`. Export its regions through `connectionRegions('tablet')` the way the existing ones are. Commands are the ones `f_0024` shows.
- [x] T6: Add an Edit Preset Delay step with a message field to `ActivitiesPresets`' tablet layout, with a `Proof-Tablet-Presets-Delay` still — files: src/app-ui/ActivitiesPresets.tsx, src/Root.tsx
  - Stills `f_0037`–`f_0039`, without the keyboard. The message text is a prop, so it can type in.
- [x] T7: Add to `EuiPower` the power-off ✕ with its countdown and the status line under the ring, with `Proof-Tablet-Power-Cancel` and `Proof-Tablet-Power-Message` stills — files: src/app-ui/EuiPower.tsx, src/Root.tsx
  - From `layout/dialog_power_off.xml` (`layout_power_cancel`, `power_cancel_progress`, `btn_power_cancel`, `tv_status_message`); stills `f_0046` and the recording at 400.5s and 406.5s. Export the ✕'s region in `EUI_POWER_REGIONS`.
  - Rev 2, checked 2026-10-05: at 400.5s Powering Off has a red ring with "Done" under it and no ✕; at 406.5s Powering On has a green ring with "hello world" under it. `dialog_power_on.xml` has its own `tv_status_message`. The ✕ icon is the app's `ic_close` (`public/app-assets/ic_close.svg`) unless the layout names another drawable.
- [x] T17: Add the catalog's full-width header, with its Discover button showing "15 devices found", to `DriverCatalog`'s tablet layout, with a `Proof-Tablet-Catalog-FindDevices` still — files: src/app-ui/DriverCatalog.tsx, src/Root.tsx
  - Why: `disc-corner` says "device discovery up here in the corner", and the recording points at `btn_find_devices`, the button at the right end of the catalog's header (141–143s, `f_0004`, `f_0012`). T3's review found it missing.
  - From `layout/driver_database.xml`: title, search field and `btn_find_devices` in one row across the whole content area. The button has a 13sp label, a search icon, `gray_20` fill and 5dp corners. The label is `discovery_find_devices` ("Discover", `f_0003`) or `discovery_found` ("15 devices found"). The icon is the app's `ic_search` (`public/app-assets/ic_search.svg`); the layout's own icon is Android's system `ic_menu_search`, which the sync does not carry.
  - Opt-in prop; without it the catalog renders exactly as today. With it, the detail pane starts below the header row, as `f_0008` shows. `catalogRegions('tablet', …)` exports the button and the pane's origin.
  - Runs before T4. Regression: `Proof-Tablet-Catalog`, `Proof-Phone-Catalog` and `Proof-Tablet-Catalog-NetSwitchers` are hash-identical.

### W05

- [x] T8: Write W05's edit list from the Narration clips table and build it with `narration:edit` — files: src/marketing/iot-latest-features/iotLatestFeaturesNarration.ts, src/marketing/iot-latest-features/iotLatestFeaturesNarration.generated.ts, public/narration/iot-latest-features/edit.m4a
  - Clip ids as the table; `IOT_LATEST_CAPTION_CORRECTIONS` from *Anything unusual*, plus `industrial` → `industrial-type` and `-type` → `` (Whisper splits "industrial -type", as it splits "RS -232"). Confirm the build log removed the repeated "you can" in `msg`.
  - Rev 2 replaces the 129s budget and its drop order. Build with the clip set Nathan approves (Revision 2), at most two builds to set the `at`s. Each beat's Sec is then lead + clips + 0.3s gaps + 1.0s hold, rounded up to 0.5s; T9 writes those into the Beats table. If the total is over 140s, drop `term-open` and rebuild once. Still over, or any other shortfall, is `[!]` with the measured lengths, for Nathan.
  - Then `npm run narration:verify` on `edit.m4a` (W02's T17). Fix each real edge leak with `notBefore` / `notAfter` or a tighter `sourceEnd` (contract: "Clip edges leak"), at most two more builds. Then measure each clip's last 30–80 ms in `edit.m4a`: louder than about -35 dB into silence is a clipped word, fixed with `wholeEdges: true` (W03 T32).
  - Known tight edges, from `words.json` and `heard.json`:
    - `welcome`: heard.json hears a stray "You" at 0.84–1.14s, so start after it.
    - `disc-corner`: "this" ends at 141.87s, where "device" starts. Start on "device", or on "this" whole.
    - `disc-click`: "then" is stretched across 163.35–164.35s. Include it whole or exclude it.
    - `pusr`: "-232" ends at 113.99s, exactly where "or" starts, so `notAfter` sits on that boundary. Listen to its middle, 101–109s, for "Alright" and "Uh oh" that the filler pass may keep.
    - `power-message`: "feature." ends at 407.72s and "And" starts at 407.78s.
    - Also `rs-endpoint`, `msg` and `thanks`, all cut out of running speech.
- [x] T9: Write W05's beat data: beats and layouts from the Beats table, copy from the Copy table, regions and cue frames from the Shot list — files: src/marketing/iot-latest-features/iotLatestFeaturesData.ts, videos/iot-latest-features.md
  - The total T8 measured, at 30fps. `DriverCatalog` callers use the app's blue wash and T17's header, in every catalog beat, so the header does not jump between beats.
  - Every Shot-list region change is a `shots` entry with `at` from `cueFrame`, relative to the beat. A `regions` array splits the beat evenly and misses the cue. Add no hold keyframes: the shell drifts.
  - Rev 2: write T8's measured Sec into the Beats table above, and apply the approved deltas (Revision 2) to the Beats evidence, Copy, Narration clips and Shot list tables. `npm run video:frames -- iot-latest-features validate` reads the Beats table.
  - Rev 2: chapter shots go through a local `atLeast(region, 0.5)`, as W04's data does; copy it, do not import it. Set `calloutSide` per beat so the landscape step label never covers the cued subject: `right` where the subject is the catalog list.
- [x] T10: Build both compositions on `WalkthroughShell`, each chapter showing its surface at rest until T11–T13, and register them — files: src/marketing/iot-latest-features/IotLatestFeatures.tsx, src/marketing/iot-latest-features/IotLatestFeaturesBeats.tsx, src/Root.tsx
  - `iot-latest-features` (1920x1080) and `iot-latest-features-portrait` (1080x1920) in the `CTRLbot-IoT-Walkthrough` folder, metadata inline, `<PromoPreload />`, captions corrected with `IOT_LATEST_CAPTION_CORRECTIONS`. Verify: `npm run video:frames -- iot-latest-features validate` and both contact sheets.
  - Rev 2: the beats file starts here, with an at-rest renderer per beat in a `BEAT_RENDERERS` map, as W04's `IotTabletBeats.tsx` is shaped. That keeps the composition renderable before T11, and T11–T13 replace the renderers in place. `src/Root.tsx` gains only W05's two registrations.
- [x] T11: Build the proof, net-switches, avoip, global-cache and pusr beats to the Shot list — files: src/marketing/iot-latest-features/IotLatestFeaturesBeats.tsx
- [x] T12: Build the discovery, rs232, terminal and webpage beats to the Shot list, each screen changing on its cue — files: src/marketing/iot-latest-features/IotLatestFeaturesBeats.tsx
  - Rev 2: discovery opens on the catalog with T17's button ringed on "discovery", then Discover Devices.
- [x] T13: Build the message, eui and power beats to the Shot list, the power state continuous from power-off through Welcome to power-on — files: src/marketing/iot-latest-features/IotLatestFeaturesBeats.tsx
  - Rev 2, for T11–T13: rings come from region maps, never from text-width estimates (W03 T34). The eui and power beats keep sources, All and displays in one frame (W03 revision 3). In portrait, every cued subject is clear of the top step label, the bottom caption scrim (540px) and the right 140px column (W03 revision 4).
- [x] T14: Run the feature gates on both shapes, render both, write the .srt from the edit, check the voice, and record the results here — files: videos/iot-latest-features.md
  - Rev 2: run these steps in the lane (the shared `render` worktree that `video:feature` uses may be Codex's), then copy the renders, the .srt and both contact sheets into the main checkout's `out/`. The destination lints follow Nathan's length decision: both destinations at 2:20 or under; `social-walkthrough` only if he keeps every clip.
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough-vertical` and `--destination=social-walkthrough`; render both (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both (portrait with `VIDEO_COMPOSITION`); `npm run narration:check` on both; `npm run narration:srt -- src/marketing/iot-latest-features/iotLatestFeaturesNarration.ts IOT_LATEST_NARRATION_CLIPS iot-latest-features out/iot-latest-features.srt --edit=src/marketing/iot-latest-features/iotLatestFeaturesNarration.generated.ts --corrections=IOT_LATEST_CAPTION_CORRECTIONS`.
  - The .srt has no `Pooser`, `all research`, `RS -232` or `Cache` without the accent, and no one-word caption. The voice check is `npm run narration:verify` on the landscape render, `[!]` only when it exits 1. In its output, "IoT", "switches", "RS-232", "directly" and "me" are whole; where Whisper misses one, the audio level decides.
  - If `inert-fraction` fails, measure it per beat before changing anything (contract: "The shell drifts"). A portrait still at every Shot-list cue shows the named state. Regression: the `Proof-*` stills T3–T7 re-rendered look as before. Confirm every file exists.
- [x] T16: Bring the `w05` lane into main after Nathan's go, resolving only W05's hunks in `src/Root.tsx` — files: src/Root.tsx, videos/iot-latest-features.md
  - Moot, 2026-10-05: Codex finished before execution, so revision 2 ran in main and there was no lane to bring in. The regression this task carried was done per surface task instead (hash-identical defaults, plus W03, W04 and promo frames).
  - Preconditions: T14 is done; main's `src/Root.tsx` has no uncommitted changes, meaning Codex's are committed; Nathan says go.
  - Rebase `w05` onto main, then fast-forward main. For `src/Root.tsx`, compare with `git diff --ignore-cr-at-eol`, write UTF-8 with the file's existing line endings, and inspect the scoped diff before staging (GOTCHAS: stray CRs).
  - Verify in main: `npm run check`; `npm run video:lint` with 0 errors; W04's and W03's compositions still listed; the `Proof-*` stills for `DriverCatalog`, `DriverDatabase`, `ConnectionPanel`, `ActivitiesPresets` and `EuiPower` hash-identical to main before the merge. Then update the W05 line of the status block in `docs/WALKTHROUGH-QUEUE.md`, and remove the lane: its junction first, then the worktree.

### Revision 2 · 2026-10-05 — re-plan before execution

Planned with `/architect` on 2026-10-05, for Claude to execute after Nathan reviews it.

**What changed since revision 1 (2026-10-02):**
- W03 and W04 are in their last review fixes, and W05's dependencies (W02 T17, W03 T20
  and T21) are all committed. Claude executes; Codex is still at work in the main checkout.
- The recording was renamed after it was ingested (T15).
- The Sec column cannot hold the clips the brief chose. The estimate is below.
- The catalog's Discover button, which the narration points at, is missing (T17).

**Nathan decides before T8: the length.** The estimate uses `heard.json`'s phrase times with
fillers removed and `TUTORIAL_CAPS` applied: a beat needs a 0.25s lead, its clips, 0.3s gaps
and a 1.0s hold. Allow about ±5s; T8 measures the real lengths. (A second estimate from
`words.json`'s word spans gave about 159s for every clip.)

| Beat | Brief Sec | Every clip needs | Recommended Sec |
|---|---|---|---|
| open + proof | 5 + 7 | 13.7 | 5 + 9 |
| avoip | 10 | 13.1 | 9, without `avoip-more` |
| global-cache | 12 | 15.2 | 15.5 |
| pusr | 11 | 17.0 | 17 |
| discovery | 11 | 9.5 | 9.5 |
| rs232 | 16 | 20.1 | 13, without `rs-layout` |
| terminal | 9 | 8.8 | 9 |
| webpage | 6 | 8.5 | 8.5 |
| eui | 16 | 19.8 | 12.5, without `eui-select` |
| power | 10 | 10.9 | 11 |
| close | 4 | 2.1 | 4 |
| **Total** | **129** | **about 151 (155 rounded)** | **135.5** |

- **Recommended: drop `rs-layout`, `avoip-more` and `eui-select`, to about 2:16.** That is
  under X's 2:20, so both shapes reach every feed.
  - `rs-layout` is an aside about layout.
  - `avoip-more` is said again by `avoip-brands`.
  - `eui-select` is the old tap-tap way of routing, and repeats "drag and drop".
  - If T8 still measures over 140s, `term-open` goes next (−3.5s).
- **The brief's own drop order** (`rs-layout`, `disc-corner`, `avoip-more`) comes to about
  140.5s, which is still over. It also cuts the one line naming the feature Nathan calls the
  biggest: "device discovery up here in the corner".
- **The alternative is to keep every clip, about 2:35.** Both shapes then use the
  `social-walkthrough` destination. The portrait still fits TikTok, Shorts (3:00) and
  LinkedIn, but not X.

**Measured (T8) supersedes the table:** every clip but `eui-select` fits, 136s. `avoip-more` and
`rs-layout` stay, so their deltas below do not apply.

**Deltas under the recommendation.** T8 and T9 write them into the tables above; T11–T13 build
them.
- Narration clips: remove `avoip-more`, `rs-layout` and `eui-select`.
- Copy: `eui` becomes "Drag to a display, or send to All".
- Beats evidence:
  - discovery: "The catalog's 15 devices found button is ringed in its corner, then Discover
    Devices; …".
  - eui: "A source dragged onto a display; a source sent to All, and every display takes it".
- Shot list:
  - proof: the press moves to welcome "features", because the stage is 9s and "IoT" would
    leave 7s of rest first.
  - avoip: avoip-brands "added" → End Points picked; then "Kramer", "Matrox" and "Research"
    each ring their row.
  - discovery: disc-corner "discovery" → T17's button ringed; "corner" → Discover Devices
    opens; then disc-click as written.
  - rs232: rs-terminal "terminal" → connected, the terminal ringed, the commands column in
    shot.
  - eui: eui-drag "drag" → a drag onto a display; eui-all "source" → a source tapped; "all"
    (first) → All tapped, and every display takes it.

**Product accuracy, checked 2026-10-05:**
- **Version.** v1.0.9 (2026-09-25) carries every claim. The app's `versionName` is already
  1.0.10, but its notes are unreleased fixes, so "New in v1.0.9" stands. The notes moved to
  `CTRLbot-IoT/RELEASE/_NOTES.md`.
- **RS-485.** The open question is moot: `pusr` ends on "RS-232", before it. CTRLbot drives
  the W630 as RS-232 only (v1.0.10's notes). The driver description in the pane names the
  device's RS-485 port; no copy or caption claims it.
- **The message shows on power on.** At 406.5s, "hello world" sits under the green ring.
  Power-off ends on "Done".
- **The Discover button.** It is `btn_find_devices` at the right end of a full-width header
  (`layout/driver_database.xml`), with the detail pane below that header. W03's and W04's
  catalogs predate it (Deferred).

**Carried from Nathan's W02–W04 reviews:**
- Rings follow geometry.
- Portrait subjects stay clear of the step label and the caption scrim.
- EUI beats show sources, All and displays together.
- No first-run or security welcome.
- The close keeps "thanks for joining me". W02 and W03 kept theirs and W04's was cut; making
  it silent is a one-line change.

**Run order.** T15 runs in main, and is committed with this plan and the queue's W05 status
line. Then the `w05` lane is made, and the tasks run in this order:

T8 (first if the heavy slot is free, otherwise after T7) → T17 → T4 → T5 → T6 → T7 → T9 →
T10 → T11 → T12 → T13 → T14

Then the run stops for Nathan's review. T16 follows on his go.

## Deferred

- Display power over CEC and line-out level — not in this recording; S21 and S22 cover them.
- The full-screen terminal (`f_0029`–`f_0031`), Switch and Audio (`f_0026`, `f_0041`), the
  security welcome (`f_0001`) — in the recording, not needed for the promise.
- The S17–S24 shorts from this recording.
- The clips revision 2 drops (`rs-layout`, `avoip-more`, `eui-select`), if Nathan takes the
  recommendation. They remain in `words.json` for a longer cut.
- W03's and W04's catalog beats show the header from before the Discover button. Adopting
  T17's header there is a separate change, for their own review.

## Handoff

- **No handoff:** Claude executes revision 2 in this session once Nathan approves the plan.
- **Ready on approval:**
  - T15, in the main checkout.
  - After the lane is made: T17, T5, T6 and T7, then T4 after T17.
  - T8, once Nathan has made the length decision, which is part of this approval.
- **Ready later:**
  - T9 after T8, T17 and T4–T7.
  - T10 after T9.
  - T11, T12 and T13 in order.
  - T14 after T13.
  - T16 after T14, once main's `src/Root.tsx` is clean, on Nathan's go.
- **Needs Nathan:**
  - The length decision (Revision 2).
  - Whether `beat-verifier` runs per task (Executor instructions, item 5).
- **Blocked:** nothing else; W02 T17 and W03 T20 and T21 are committed.

## Review notes

- T14, 2026-10-05: `npm run video:feature` in a clean worktree at `d26ae5b`, every step passing. Check; lint against `social-walkthrough` and `social-walkthrough-vertical`; `validate` (14 beats, 136s); both contact sheets; both renders; frame checks: landscape 15% inert with median content area 97%, portrait 28% inert with 75%. `narration:check` on both: 136.04s, -16.11 LUFS, -4.42 dBTP. `narration:verify` on the render: PASS, 0 edge defects, 6 notes. `out/iot-latest-features.srt` has 55 captions and 283 words from 21 clips, with PUSR, Hall Research, Global Caché, RS-232 and industrial-type corrected. Deliverables: `out/iot-latest-features.mp4`, `out/iot-latest-features-portrait.mp4`, the .srt, and `out/iot-latest-features{,-portrait}/contact.html`. Logs are in `out/coordinator/feature-iot-latest-features/`. These are review candidates for Nathan, not approved.

- T10–T13, 2026-10-05: author-verified (Claude) on objective gates, built and checked together because T11–T13 all write `IotLatestFeaturesBeats.tsx` (as W02's T11/T12 were coupled). Check, lint and `validate` pass; `src/Root.tsx` gains only the two registrations (4080 frames, in `CTRLbot-IoT-Walkthrough`). Cue stills were rendered with `verify:task` at every Shot-list cue plus 8–40 frames, in both shapes, three rounds; the last round matches every evidence line. Fixes made while looking: portrait shots are now crops no wider than 720 dp (`PORTRAIT_SHOTS`), because whole-surface frames were unreadable at phone width; the landscape step label moved right on net-switches, avoip, pusr and webpage, and to the top on terminal, wherever it covered the cued subject; the RS-232 beat pulls back to the whole panel on "connect" so its progress toast is in shot; the eui beat taps TABLE HDMI, because the bottom row sits under the label. Notes for review: in portrait the RS-232 toasts sit under the caption scrim; the Test terminal sends the app's "GET DEVICE MODE" (the recording's truncated "GET DE…"), not "GET DEVICES"; the discovery list shows seven of the recording's rows with private addresses.

- T9, 2026-10-05: author-verified (Claude) on objective gates. Check, lint and `validate` pass (14 beats, 136s). 4080 frames; all 31 cue words resolve (proof "features" at frame 187, power "hello" at 3885). Every Shot-list region change is a `shots` entry at its cue; small regions go through a local `atLeast`. The catalog beats use T17's header throughout, and net-switches and avoip put the landscape step label on the right, clear of the list. The Beats table now carries the measured Sec, and the discovery and eui evidence, the eui copy, the clip table and the proof, discovery and eui shot rows follow revision 2.

- T7, 2026-10-05: author-verified (Claude) on objective gates. Check and lint pass. W04 frame 5560, W03 portrait frame 5900 and EUI promo frames 60, 1700 and 1760 are byte-identical before and after. `Proof-Tablet-Power-Cancel` matches `f_0046`: Powering Off with the 56dp countdown ring and ✕ in the top-right corner, and no status line. `Proof-Tablet-Power-Message` matches the recording at 406.5s: Powering On with "hello world" under the ring. Two findings: the power captures have the app's "Done" baked in under the ring, so a given `statusMessage` (including '') masks it with the capture's field colour first; and the synced tokens predate `power_cancel_*`, so those four dimens are repeated from `values/dimens.xml` with a comment rather than re-running `sync:tokens`, which would move other drifted tokens. `EUI_POWER_REGIONS.tablet.cancel` and `.statusMessage` are exported.

- T6, 2026-10-05: author-verified (Claude) on objective gates. Check and lint pass. `Proof-Phone-ActivitiesPresets`, `Proof-Tablet-ActivitiesPresets`, W04 frame 4350 and W03 portrait frame 3700 are byte-identical before and after. `Proof-Tablet-Presets-Delay` matches `f_0039` without the keyboard: Edit Preset, Power On, the Acer POWER ON step, then a Delay step reading DELAY, 1 seconds, 0 ms, hello world. A step's `delay` prop carries the message, so it can type in, with an optional caret. `activitiesPresetsRegions('tablet').delayMessage(i)` is exported. Note: `f_0038` also shows a "1 Power On Button" event under + EVENTS; the surface has no event card, so it is left out.

- T5, 2026-10-05: author-verified (Claude) on objective gates. Check and lint pass. `Proof-Tablet-Connection` and `Proof-Phone-Connection` and W04 frame 2700 are byte-identical before and after. The state is its own component, `Rs232ConnectionPanel`, beside `ConnectionPanel` in the same file, because `driver_connect_edit.xml` swaps the whole lower half for an RS-232 driver. Its regions come from `rs232ConnectionRegions()` rather than `connectionRegions('tablet')`: the end point button, field and CONNECT RS-232/DISCONNECT action; the left column (details before connecting, the terminal after); the configuration; the commands and each row; the toast. `Proof-Tablet-Connection-Rs232` matches `f_0024`. Simplified from `f_0022`: the Driver Details column omits Volume Set and Switcher Config.

- T4, 2026-10-05: author-verified (Claude) on objective gates. Check and lint pass. No `Proof-*` still used `DriverDatabase`, so the regression was W04 frames 1800 and 2200 and `device-database` frame 900, all byte-identical before and after. `Proof-Tablet-Detail-Models` matches `f_0008`: the End Points list with Global Caché selected, its pane without a Manufacturer link, Most Models across the pane and the open spinner from Flex IR 3 Emitter to iTach IP2CC, in the app's order. `Proof-Tablet-Detail-Pusr` matches `f_0011`: USR-W630, Product Page, the driver's description, the accordions and Control Info IP/UDP. `driverDetailRegions()` estimates the caption and heading heights at Montserrat's 1.219 line height (commented). Parts exported for W05's beats: `END_POINT_DRIVERS`, `GlobalCacheModelsDetail`, `PusrDetail` (with `ringDescription`) and `endPointPaneRegions()`.

- T17, 2026-10-05: author-verified (Claude) on objective gates. Check and lint pass. `Proof-Tablet-Catalog`, `Proof-Phone-Catalog` and `Proof-Tablet-Catalog-NetSwitchers` are byte-identical before and after. `Proof-Tablet-Catalog-FindDevices` matches `f_0004`: Device Drivers, the search field across the screen and "15 devices found" with the app's `ic_search` at the right end, the list below. The button's width is estimated from its label (0.58 of 13sp per character), and markup and region share that number. `catalogRegions('tablet', {findDevices})` exports `findDevices` and `detailPane`, which starts at y=68 under the header.

- T8, 2026-10-05: author-verified (Claude) on objective gates. Measured clips came in far shorter than the plan's estimate (fillers removed): all 22 clips need about 143s, so only `eui-select` is dropped and `avoip-more` and `rs-layout` stay. 136s: open 5, proof 7, net-switches 7, avoip 12, global-cache 13, pusr 14.5, discovery 8.5, rs232 19.5, terminal 8.5, webpage 8.5, message 5.5, eui 11.5, power 11.5, close 4. Every beat holds at least 1.04s (avoip). `narration:verify` on `edit.m4a`: PASS, 0 edge defects, 8 notes. Fixed edges: `disc-click` lacked its cue word "click" and leaked a doubled "then"; `net-category`, `term-open` and `term-send` ran into the next words; `msg` now starts after the "you ca-" false start; Whisper's unheard "right?" is out of `term-open`. `power-x` is `verbatim`, because the filler pass removed its "X". Tails louder than -35 dB were checked against the source: gc-models, disc-corner, rs-terminal and thanks fall to about -54 dB straight after (natural ends); `net-category` ends at -11 dB because "switches." runs straight into "We only" — listen at 0:17.5. More than two edge builds were used, each for a distinct defect.

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

- T1, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES. Gemini via agy, 244s. Terms corrected: Luxul, Hall Research, Global Caché (×4), PUSR, and "a device like this". No timestamps or JSON changed. 114–116s: `heard.json` letters spell "ars forty forty five", which does not settle RS-485 against RS-45, so the line is marked unconfirmed for Nathan.

- T3, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES, verified in a clean worktree at HEAD plus the two task files. Check and lint pass. `Proof-Phone-Catalog` and `Proof-Tablet-Catalog` are byte-identical before and after. `Proof-Tablet-Catalog-NetSwitchers` matches `f_0005`: the six-type filter list and a Luxul AMS-1208P Net Switchers card. Notes: the recording's "15 devices found" header button is absent (pre-existing catalog layout, not this task). The End Points list (`f_0007`) is covered by the same `typeFilter`, but no still shows it. The commit also drops two stray CRs that HEAD's `Root.tsx` carried from the W02 encoding repair.

## Contact sheet

> `npm run video:frames -- iot-latest-features contact`, and with
> `VIDEO_COMPOSITION=iot-latest-features-portrait` the portrait sheet. Mark each ✅ / ❌
> against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|

- T2, 2026-10-02: Independent coordinator takeover PASS WITH NOTES. Frozen check/lint pass; independently regenerated W01/W04 scratch SRT hashes equal baseline/result, and focused Hall Research/send to all/punctuation/one-word/timing examples pass. Replacement supports more cases than needed, a note. No existing deliverables overwritten.

## Review 2026-10-07 (Nathan, landscape first)

- [x] R1: proof beat zooms the whole bezelled tablet on the card's promo glow, instead of a camera push that cropped it (`5c68c11`).
- [x] R2: discovery holds the whole catalog; landscape chapter drifts anchor top-left so a push keeps the header.
- [x] R3: terminal and web page beats play the recording (`scripts/walkthrough-footage.mjs`, `footage.json`) (`a3b7156`).
- [x] R4: cut net-switches, the preset message beat, the hello-world power-on and "thanks for joining me"; the close card is silent. 136s to 121s (3630 frames).
- [x] R5: a drop selects: the dragged source and its display go blue (EUI and proof beats).
- [x] R6: portrait: the proof beat's bezel, glow and whole-device zoom; footage crops from the rail; top-left drift; the RS-232 connect shot at 1080 dp so its toasts clear the captions.
- [ ] Open question: move RS-232, discovery and message-free beats to footage too (see the "prefer recording footage" rule).

## Delivered 2026-10-07 (approved by Nathan)

`npm run video:feature` at `2684d42`, clean `render` worktree: check, lint, validate (12 beats, 121s), both contact sheets, both renders, both frame checks and both narration checks pass. Landscape 15% inert, median content area 97%; portrait 26% inert, 75%. 121.05s, -16.08 LUFS, -4.42 dBTP. The .srt has 50 captions (`out/iot-latest-features/iot-latest-features.srt`).

narration:verify on the render reports one edge, "A." after gc-models at 35.1s. Adjudicated as recognition, not a leak: it is the second syllable of "Caché" (heard.json hears the source as "for global cash, eh?"), the clip ends at 95.21s, and the next speech starts at 95.47s. The edit-level verify passes with 0 edge defects.

Deliverables: `out/iot-latest-features.mp4`, `out/iot-latest-features-portrait.mp4`, captions and contact sheets in `out/iot-latest-features/` and `out/iot-latest-features-portrait/`. The recording stays in `video input/` for the IoT shorts.
