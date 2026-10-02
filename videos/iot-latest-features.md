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
| net-switches | chapter | Network switches have their own category | `DriverCatalog` | The type filter opens with Net Switchers in it; Net Switchers is picked and the list shows LUXUL AMS-1208P (f_0004–f_0005) | 6 |
| avoip | chapter | Three more AV-over-IP manufacturers | `DriverCatalog` | End Points is picked; Kramer, Matrox and Hall Research rows are ringed one after another (f_0006–f_0007) | 10 |
| global-cache | chapter | Global Caché by exact model | `DriverDetail` | Global Caché End Points in the detail pane; the Model dropdown opens on the Flex, GC-100, Global Connect and iTach models, Most Models above them (f_0008–f_0010) | 12 |
| pusr | chapter | Serial through a PUSR USR-W630 | `DriverDetail` | PUSR End Points in the detail pane, model USR-W630; its description is ringed (f_0011) | 11 |
| discovery | chapter | Find Devices matches and adds them | `DiscoverDevices` | Discover Devices; the Global Cache iTachFlexEthernet and PUSR rows show their matched driver, Add Driver is tapped, "1 device added" (f_0017–f_0020) | 11 |
| rs232 | chapter | Connect an RS-232 device through the end point | `ConnectionPanel` | Configure Connection for the Acer XL2320P with the RS232 End Point set; CONNECT shows its progress, then connected, with the terminal on the left and the commands on the right (f_0022–f_0024) | 16 |
| terminal | chapter | A terminal for every device | `ConnectTest` | Test Device Drivers, Global Cache selected, Terminal tab: GET DEVICES is sent and its reply lands in the terminal, readable (f_0027–f_0028) | 9 |
| webpage | chapter | The device's own web page, in the app | `ConnectTest` + `ProductWebView` | The Web page tab is tapped and the device's page opens inside the app, held under 2s (f_0032) | 6 |
| message | chapter | A message on a preset step | `ActivitiesPresets` | Edit Preset, Power On: a Delay step with `hello world` typed into its message (f_0037–f_0039) | 6 |
| eui | chapter | Tap, drag, or send to All | `TabletEui` | A source tapped then a display; a source dragged onto a display; a source sent to All, and every display takes it (f_0042–f_0045, f_0049) | 16 |
| power | chapter | Change your mind before it powers off | `TabletEui` + `EuiPower` | Power is tapped; Powering Off shows the ✕ in its corner, ringed; then powering on shows `hello world` under the ring (f_0046, recording 406.5s) | 10 |
| close | card | The name, once, at the end | `MasterControlCard` | The CTRLbot IoT lockup and its line; no URL | 4 |

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
  on five existing surfaces (catalog type, model dropdown, RS-232 connection layout, preset
  delay message, power-off cancel and status line); the edit list; the beat data; both
  compositions; 14 beats; renders and .srt.
- **Out of scope:** CEC and line-out (S21, S22); the shorts S17–S24; any new surface file;
  footage; Android Settings; the vendor web page; W01–W04 and their files; `Roadmap.md`;
  publishing; gate thresholds.
- **Must preserve:** every surface's default render and every existing `Proof-*` still;
  `First-Run-*`, the promos, W01–W04 and the shorts; W01's and W04's .srt from
  `narration:srt` unchanged by T2; `video input/` and the ingest's JSON never modified.

## Architecture

Nothing new at the composition level: W05 is a fifth consumer of what W01 built.

```
iotLatestFeaturesNarration.ts ──narration:edit──▶ edit.m4a + …Narration.generated.ts   (T8)
iotLatestFeaturesData.ts — beats, layouts, copy, regions, cue frames                       (T9)
IotLatestFeatures.tsx → WalkthroughShell (card / stage / chapter, captions)                (T10)
IotLatestFeaturesBeats.tsx → existing app-ui surfaces, with the optional states T3–T7 add  (T11–T13)
```

- **Surfaces gain optional props only.** Each state below is absent by default, so every
  existing caller renders as today. Geometry from the named `layout/` XML and
  `tokens.generated.ts`; text and arrangement checked against the named stills.
- **One shared change, T2.** `correctCaptions` corrects word by word, and `all` also occurs
  in "send to all" in this edit, so `all research` → Hall Research cannot be a one-word
  correction. T2 lets a correction key be two words; one-word keys behave as today.

## Copy

Executors place these verbatim. Eyebrows render uppercase. Audiowide only on the card lockup.
Chapters are step labels: eyebrow and title, a body only where given.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open (card) | New in v1.0.9 | lockup **CTRLbot IoT** | line: New devices, new end points, and drag to route. |
| proof (stage) | End user interface | Drag a source onto a display | Press, hold and drop it to route. |
| net-switches | Device | Net Switchers, a new category | — |
| avoip | AV-over-IP | Kramer, Matrox and Hall Research | — |
| global-cache | End points | Global Caché by exact model | iTach, GC-100, Flex or Global Connect, each with its own ports. Most Models is still there. |
| pusr | End points | Serial through a PUSR USR-W630 | — |
| discovery | Find Devices | Matched to a driver, added in one tap | — |
| rs232 | Connect | RS-232 through an end point | — |
| terminal | Connect | A terminal for every device | — |
| webpage | Connect | The device's own web page | — |
| message | Activities | A message on a preset step | The end user sees it while the preset runs. |
| eui | End user interface | Tap, drag, or send to All | — |
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
| net-switches | net-category | 39.55–45.6 | And what we did was we added a new category called network switches. |
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
| message | msg | 340.85–344.85 | you can basically add messages, right? (the repeated "you can" comes out) |
| eui | eui-drag | 372.95–379.6 | Another great feature now is you can drag and drop the sources on there. |
| eui | eui-select | 379.55–388.4 | You still have the option to select source, select output, or you can drag and drop source to output. |
| eui | eui-all | 389.25–393.75 | And of course you can select a source and send to all by hitting that all button. |
| power | power-x | 396.05–403.95 | Also, just a little safety feature. We have a little X in the corner. So if you want to cancel or power off, you're able to do that now. |
| power | power-message | 407.75–409.75 | And there's our hello world message. |
| close | thanks | 411.85–412.95 | thanks for joining me. |

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
| proof | welcome "IoT" → a source pressed · 0.6s later → dragged onto a display, which fills, ringed |
| net-switches | net-category "category" → the type filter opens · "switches" → Net Switchers picked, LUXUL ringed |
| avoip | avoip-more "endpoints" → End Points picked · avoip-brands "Kramer", "Matrox", "Research" → each row ringed on its word |
| global-cache | gc-models "endpoints" → Global Caché selected, the pane opens · "models" → the Model dropdown opens, the list ringed |
| pusr | pusr "PUSR" → PUSR selected, USR-W630 in the pane · "convert" → the description ringed |
| discovery | disc-corner "discovery" → the discovery icon ringed, the list · disc-click "driver" → the Global Cache row's match ringed · "click" → Add Driver tapped, "1 device added" |
| rs232 | rs-acer "Acer" → Configure Connection for the Acer · rs-endpoint "end" → the RS232 End Point field ringed · "connect" → CONNECT tapped, the progress line · rs-terminal "terminal" → connected, the terminal ringed · rs-layout "commands" → the commands column ringed |
| terminal | term-open "terminal" → the Terminal tab · term-send "send" → GET DEVICES tapped, Sent then Received land |
| webpage | web "webpage" (first) → the Web page tab tapped · "directly" → the page opens; leave it by the beat end |
| message | msg "messages" → the Delay step's message ringed as `hello world` types in |
| eui | eui-drag "drag" → a drag onto a display · eui-select "select" (first) → a source tapped · "output" → a display tapped · eui-all "all" (first) → All tapped, every display takes it |
| power | power-x "safety" → power tapped, Powering Off · "X" → the ✕ ringed · power-message "hello" → powering on, `hello world` under the ring |

## Executor instructions

**Executor: Gemini 3.8 Flash, High reasoning.** Codex coordinates the approved W02–W05 run and takes over a worker only when Gemini is unavailable. Run one assigned pending task per fresh context in this checkout. Pending revision: T1–T14; never redo checked tasks.

1. Read `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`, this brief, and the relevant installed Remotion skill before composition code. W01's current source in `src/marketing/mirror-walkthrough/` and `src/marketing/WalkthroughShell.tsx` are the worked example.
2. **Dependencies:** T1 and T2 are ready now. T3–T5 and T7 are independent after shared-file ownership is granted. T6 waits for W03 T21. T8 needs T1, T2 and W02 T17; T9 needs T8, W03 T20 and T3–T7; T10 needs T9; T11–T14 run in order.
3. **Ownership:** obtain the coordinator's assignment before editing. Own only the task's named files. Preserve unrelated changes, including other briefs, `Roadmap.md` and `.claude/settings.local.json`. `src/Root.tsx`, shared surfaces, audio helpers and `package.json` have one writer at a time. Wait for ownership rather than waiting for another whole video. Do not branch, stash, reset or stage unrelated files.
4. Implement the brief's exact copy, clips and cues. Run the named per-task checks. The coordinator assigns an independent `.claude/agents/beat-verifier.md` to run gates and look at the still. Workers do not commit or mark `[x]`; the coordinator does so only after independent PASS, staging exactly the task paths and brief.
5. Two repair rounds, then report evidence and stop the affected task. No nested subagents. Return compact results, never full logs or diffs. Bound retries to two and stop repeated near-verbatim attempts. A still taking over two minutes is blocked. Acquire the coordinator's render slot before a render, contact sheet, GPU transcription or frame check.
6. Final acceptance is this revision's final task: both shapes, destination lint, contact sheets, renders, frame and narration checks, landscape SRT, and the task's regressions. No approval pauses before those deliverables; do not publish or close out until Nathan reviews. Report paths, results and remaining notes, then stop testing.

## Concurrency

The authoritative task dependencies above replace Roadmap-order waits. Codex holds assignments and integration state in `docs/WALKTHROUGH-QUEUE.md`. There may be two implementation workers plus one independent verifier. Different files can overlap; a file and the render/GPU slot each have one owner. The coordinator freezes source during whole-project checks and integrations. Stop and checkpoint on quota exhaustion; resumption starts at the first unverified task.

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked
>
> **Per-task check:** `npm run check` and `npm run video:lint`. A surface task (T3–T7)
> renders its new `Proof-Tablet-<Name>-<State>` still (1280x800, registered beside the
> existing `Proof-*` stills) next to the stills it names, and re-renders that surface's
> existing tablet and phone `Proof-*` stills to show the default did not move. A beat task
> renders `npm run video:frames -- iot-latest-features contact --beat=<beat>` in both shapes
> (portrait: prefix `VIDEO_COMPOSITION=iot-latest-features-portrait`); before T10 registers
> the compositions, a beat task's check is `npm run check` and `npm run video:lint` only.

### Shared

- [ ] T1: Correct `ingest/iot-latest-features/transcript.md` against `ingest/iot-latest-features/contact.html` and mark it `Status: corrected <date>` — files: ingest/iot-latest-features/transcript.md
  - Terms only: "Pooser" → PUSR, "all research" → Hall Research, "Luxel" → Luxul, "Global Cache" → Global Caché, "RS -232" → RS-232, "MGX", "Acer", "advice like this" → "a device like this" if the recording says so. Listen at 114–116s and write what is said ("RS-485" or "RS-45"). Keep filler and false starts; change no timestamp; never edit the JSON.
- [x] T2: Let a caption correction key be two words, so `all research` becomes Hall Research without touching "send to all" — files: src/audio/narrationCaptions.ts
  - One-word keys behave exactly as today. Verify: `npm run check`; `narration:srt` for W01 and W04 writes byte-identical .srt files before and after (to a scratch path, never over `out/`).

### Surface states (optional props, default unchanged)

- [x] T3: Add a `netSwitcher` device type to `DriverCatalog`, listed as Net Switchers in the type filter, with a `Proof-Tablet-Catalog-NetSwitchers` still — files: src/app-ui/DriverCatalog.tsx, src/Root.tsx
  - Stills `f_0004`–`f_0007`: the filter list Manufacturer, Projector, Display, Switchers, End Points, Net Switchers; the End Points list. Icon from the app's drawables via `public/app-assets/`; no new colour.
- [ ] T4: Give `DriverDetail` an open Model dropdown listing a driver's models, with `Proof-Tablet-Detail-Models` and `Proof-Tablet-Detail-Pusr` stills — files: src/app-ui/DriverDatabase.tsx, src/Root.tsx
  - Stills `f_0008`–`f_0011`. Model names exactly as `f_0008`/`f_0009` show them; PUSR's description from the app's driver data, as `f_0011`.
- [ ] T5: Add the RS-232 end-point state to `ConnectionPanel`'s tablet layout: the End Point field, RS-232 Configuration, terminal left and commands right, and a progress line, with a `Proof-Tablet-Connection-Rs232` still — files: src/app-ui/ConnectionPanel.tsx, src/Root.tsx
  - From `layout/driver_connection.xml`; stills `f_0022`–`f_0024`. Export its regions through `connectionRegions('tablet')` the way the existing ones are. Commands are the ones `f_0024` shows.
- [ ] T6: Add an Edit Preset Delay step with a message field to `ActivitiesPresets`' tablet layout, with a `Proof-Tablet-Presets-Delay` still — files: src/app-ui/ActivitiesPresets.tsx, src/Root.tsx
  - Stills `f_0037`–`f_0039`, without the keyboard. The message text is a prop, so it can type in.
- [ ] T7: Add to `EuiPower` the power-off ✕ with its countdown and the status line under the ring, with `Proof-Tablet-Power-Cancel` and `Proof-Tablet-Power-Message` stills — files: src/app-ui/EuiPower.tsx, src/Root.tsx
  - From `layout/dialog_power_off.xml` (`layout_power_cancel`, `power_cancel_progress`, `btn_power_cancel`, `tv_status_message`); stills `f_0046` and the recording at 400.5s and 406.5s. Export the ✕'s region in `EUI_POWER_REGIONS`.

### W05

- [ ] T8: Write W05's edit list from the Narration clips table and build it with `narration:edit` — files: src/marketing/iot-latest-features/iotLatestFeaturesNarration.ts, src/marketing/iot-latest-features/iotLatestFeaturesNarration.generated.ts, public/narration/iot-latest-features/edit.m4a
  - Clip ids as the table; `IOT_LATEST_CAPTION_CORRECTIONS` from *Anything unusual*. Two builds at most to set the `at`s. If the plan runs past 129s, drop in this order and rebuild: `rs-layout`, `disc-corner`, `avoip-more`; still over, or a beat that cannot keep its 1.0s hold, is `[!]` with the measured lengths. Confirm the build log removed the repeated "you can" in `msg`.
  - Then `npm run narration:verify` on `edit.m4a` (W02's T17). Fix each real edge leak with `notBefore` / `notAfter` or a tighter `sourceEnd` (contract: "Clip edges leak"), at most two more builds. Watch for leaks at clips cut out of running speech: `disc-corner`, which opens after the filler run, `rs-endpoint`, `msg` and `thanks`.
- [ ] T9: Write W05's beat data: beats and layouts from the Beats table, copy from the Copy table, regions and cue frames from the Shot list — files: src/marketing/iot-latest-features/iotLatestFeaturesData.ts
  - 3870 frames at 30fps, or the total T8 measured. `DriverCatalog` callers use the app's blue wash.
  - Every Shot-list region change is a `shots` entry with `at` from `cueFrame`, relative to the beat. A `regions` array splits the beat evenly and misses the cue. Add no hold keyframes: the shell drifts.
- [ ] T10: Build both compositions on `WalkthroughShell`, chapters showing their surface at rest until T11–T13, and register them — files: src/marketing/iot-latest-features/IotLatestFeatures.tsx, src/Root.tsx
  - `iot-latest-features` (1920x1080) and `iot-latest-features-portrait` (1080x1920) in the `CTRLbot-IoT-Walkthrough` folder, metadata inline, `<PromoPreload />`, captions corrected with `IOT_LATEST_CAPTION_CORRECTIONS`. Verify: `npm run video:frames -- iot-latest-features validate` and both contact sheets.
- [ ] T11: Build the proof, net-switches, avoip, global-cache and pusr beats to the Shot list — files: src/marketing/iot-latest-features/IotLatestFeaturesBeats.tsx
- [ ] T12: Build the discovery, rs232, terminal and webpage beats to the Shot list, each screen changing on its cue — files: src/marketing/iot-latest-features/IotLatestFeaturesBeats.tsx
- [ ] T13: Build the message, eui and power beats to the Shot list, the power state continuous from power-off through Welcome to power-on — files: src/marketing/iot-latest-features/IotLatestFeaturesBeats.tsx
- [ ] T14: Run the feature gates on both shapes, render both, write the .srt from the edit, check the voice, and record the results here — files: videos/iot-latest-features.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough-vertical` and `--destination=social-walkthrough`; render both (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both (portrait with `VIDEO_COMPOSITION`); `npm run narration:check` on both; `npm run narration:srt -- src/marketing/iot-latest-features/iotLatestFeaturesNarration.ts IOT_LATEST_NARRATION_CLIPS iot-latest-features out/iot-latest-features.srt --edit=src/marketing/iot-latest-features/iotLatestFeaturesNarration.generated.ts --corrections=IOT_LATEST_CAPTION_CORRECTIONS`.
  - The .srt has no `Pooser`, `all research`, `RS -232` or `Cache` without the accent, and no one-word caption. The voice check is `npm run narration:verify` on the landscape render, `[!]` only when it exits 1. In its output, "IoT", "switches", "RS-232", "directly" and "me" are whole; where Whisper misses one, the audio level decides.
  - If `inert-fraction` fails, measure it per beat before changing anything (contract: "The shell drifts"). A portrait still at every Shot-list cue shows the named state. Regression: the `Proof-*` stills T3–T7 re-rendered look as before. Confirm every file exists.

## Deferred

- Display power over CEC and line-out level — not in this recording; S21 and S22 cover them.
- The full-screen terminal (`f_0029`–`f_0031`), Switch and Audio (`f_0026`, `f_0041`), the
  security welcome (`f_0001`) — in the recording, not needed for the promise.
- The S17–S24 shorts from this recording.

## Handoff

- **Pending revision:** T1–T14.
- **Dependencies:** T1 and T2 are ready now. T3–T5 and T7 are independent after shared-file ownership is granted. T6 waits for W03 T21. T8 needs T1, T2 and W02 T17; T9 needs T8, W03 T20 and T3–T7; T10 needs T9; T11–T14 run in order.
- **Dispatch:** one task at a time through Codex; independent verification and scoped commit release its owned files. Final rendering waits for the shared render slot.
- **Blocked:** no known implementation blocker; task dependencies still apply.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

- T3, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES, verified in a clean worktree at HEAD plus the two task files. Check and lint pass. `Proof-Phone-Catalog` and `Proof-Tablet-Catalog` are byte-identical before and after. `Proof-Tablet-Catalog-NetSwitchers` matches `f_0005`: the six-type filter list and a Luxul AMS-1208P Net Switchers card. Notes: the recording's "15 devices found" header button is absent (pre-existing catalog layout, not this task). The End Points list (`f_0007`) is covered by the same `typeFilter`, but no still shows it. The commit also drops two stray CRs that HEAD's `Root.tsx` carried from the W02 encoding repair.

## Contact sheet

> `npm run video:frames -- iot-latest-features contact`, and with
> `VIDEO_COMPOSITION=iot-latest-features-portrait` the portrait sheet. Mark each ✅ / ❌
> against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|

- T2, 2026-10-02: Independent coordinator takeover PASS WITH NOTES. Frozen check/lint pass; independently regenerated W01/W04 scratch SRT hashes equal baseline/result, and focused Hall Research/send to all/punctuation/one-word/timing examples pass. Replacement supports more cases than needed, a note. No existing deliverables overwritten.
