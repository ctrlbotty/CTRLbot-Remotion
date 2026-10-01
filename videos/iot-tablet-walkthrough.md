---
id: iot-tablet-walkthrough
destination: social-walkthrough
---

# CTRLbot IoT on the tablet — narrated walkthrough (Roadmap W04)

## Watching

The same viewer as W03, with a tablet on the wall or the lectern: an AV integrator,
facilities lead or installer deciding whether CTRLbot IoT can run the room. They want the
whole path on a tablet — driver, connection, testing, the room building itself, the
hand-over — and what v1.0.9 added: Find Devices and AV-over-IP switching.

## Promise

Set up and run a whole room from an Android tablet: no processor, no laptop, no extra software.

## Narration

- Mode: `source-edit`. Narrated only: there is no silent cut.
- Source recording: `video input/CTRLbot-IoT Walkthough v1.09.mp4` (7:07, 60fps tablet capture)
- Ingest: `ingest/iot-tablet-walkthrough/` — `transcript.md` is `Status: DRAFT` until T1
- Prepared audio: `public/narration/iot-tablet-walkthrough/source-normalized.m4a`
- Edit list: `src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts`
- Landscape: `iot-tablet-walkthrough`, 1920x1080 → `out/iot-tablet-walkthrough.mp4`,
  captions as `out/iot-tablet-walkthrough.srt` — YouTube
- Portrait: `iot-tablet-walkthrough-portrait`, 1080x1920, captions burned in →
  `out/iot-tablet-walkthrough-portrait.mp4` — TikTok, LinkedIn, YouTube

## Beats

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| open | Room control from the tablet | `TabletEui` | The tablet EUI at rest, sources down the left and the display on the right; the copy shows the CTRLbot IoT headline | 11 |
| first-run | A short tour opens the first time | `FirstRunEducation` | The first-run walkthrough over the setup screen steps forward, then its ✕ closes it | 13.5 |
| ai | CTRLbot AI is a living manual | `CtrlbotAi` | CTRLbot AI's question list fills; a question is picked and its answer lands | 20.5 |
| database | Everything starts with a driver | `DriverCatalog` | The catalog scrolls; the category filter opens on Projector, Display, Switchers, End Points | 23 |
| epson | Every driver carries its device's details | `DriverDetail` | Epson PowerLite in the detail pane: device info, specs, setup, support; the manufacturer link is ringed and the app's web view opens loading; back on the pane, control info | 23.5 |
| add | Add it, enter the IP, and it saves itself | `ConnectionPanel` | + opens Configure Connection, the IP is entered, Connect goes to Disconnect, with no save button pressed | 15.5 |
| terminal | Test the commands | `ConnectionPanel` | Power On and Power Off are sent and land in the terminal | 6 |
| test | Test it as a remote | `ConnectTest` | Test Device Drivers: the device list on the right; Switcher routes an input to Out 1, then Terminal, then Web page loading | 28 |
| activities | The room builds itself | `ActivitiesPresets` | Presets lists Power On and Power Off; Power On opens with the Epson's power-on command already in it | 19 |
| switch-audio | Switching and audio are already set | `ActivitiesSwitch` + `ActivitiesAudio` | Switch shows the Epson as the switcher; Audio shows its volume up, down and set mapped | 16 |
| eui | The end user gets the room, not the settings | `TabletEui` + `EuiPower` | A source is picked for the display, the volume moves and mutes, then Powering Off and Welcome | 24.5 |
| exit | Press and hold to get back to setup | `TabletEui` | The setup button is held; "Keep holding to return to Setup" shows; the setup menu returns | 8 |
| discovery | Find Devices scans the network | `DiscoverDevices` | Discover Devices counts up as devices are found; each row shows its driver match or Add driver | 20 |
| matrox-add | Add a whole AV-over-IP system in one go | `DiscoverDevices` | Matrox ConvertIP rows are added one after another; each ends Added | 30.5 |
| matrox-test | Test each encoder and decoder | `ConnectTest` | The Matrox system in the switcher: encoders on the left, four decoders; one decoder takes an encoder | 7 |
| matrox-switch | Encoders and decoders, set up for the room | `ActivitiesSwitch` | Switch type goes to AVoIP Encoders/Decoders; the ConvertIP encoder and decoder lists fill | 23.5 |
| m2m | Many to many, by tap, drag or All | `TabletEui` | Four displays: a source tapped then a display; a source dragged onto a display; All sends one source to every display | 24.5 |
| settings | Help is built in | `SettingsSupport` | Settings → Support: User Manual, Quick Start, Factory Reset and Database Management | 21 |
| close | The name, once, at the end | `TabletEui` | The EUI at rest; the copy shows the CTRLbot IoT headline | 5 |

## Anything unusual

- **W03's twin.** `videos/iot-phone-walkthrough.md` is the same story on the phone. W04
  reuses every surface W03 built, adding each one's tablet layout, and follows W03's
  composition pattern (and W01's before it). Never import from another video's folder.
- **Start only after W03 is finished.** T2–T11 extend files W03 creates, and both touch
  `src/Root.tsx`. If `videos/iot-phone-walkthrough.md` still has a `- [ ]` task, stop and
  report blocked.
- **5:40, everything condensed**, as W03: over X's 2:20 and a Short's 3:00 on purpose;
  `social-walkthrough` allows 360s since W03's T2. Trimmed cuts come later.
- **Tablet layouts are their own.** Most screens have a `layout/` (tablet) and a
  `layout-port/` (phone) version in `../../1 - CTRLbot.av/CTRLbot-IoT/app/src/main/res/`;
  the tablet adds `TabletNavRail` down the left and, on Device, the detail pane beside the
  list. Each surface's `device: 'tablet'` branch comes from the tablet layout and is
  checked against the recording's stills in `ingest/iot-tablet-walkthrough/frames/`.
  Existing tablet surfaces (`TabletEui`, `DriverCatalog`/`DriverDetail`,
  `ConnectionPanel`, `CtrlbotAi`, `EuiPower`, `TabletNavRail`) are used as they are.
  `ActivitiesSwitching.tsx` (the approved First-Run tablet matrix) is not touched; W04 uses
  W03's `ActivitiesSwitch`.
- **No footage.** As on the phone, the recording's web pages are blank white while loading;
  the app's web view is rebuilt over an empty page.
- **Claims are the manual's and the app's, not the narration's.** "and Chromebook" is cut:
  nothing in the manual or the About document claims ChromeOS. The IPMX "universal control
  protocol" aside is cut. The copy says what W03's says where the story is the same.
- **The recording stumbles more than W03's** (Connect, 312–329s). Clips are chosen around
  the stumbles; nothing that needs a filler removed is kept.
- **Captions need fixes**, applied at render time: `controlbot` + `.ai.` → `CTRLbot AI.`;
  `RS` + `-232` → `RS-232`; `convert` + `IP,` → `ConvertIP,`.
- **A 1280x800 surface lays out like Terminator's**: the landscape `<Stage>` at its default
  panel, the portrait panel 1008x630. Each beat opens wide (1.04) and pushes to 0.8 on its
  subject, then returns.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Scope lock

- **User outcome:** two narrated renders — landscape `iot-tablet-walkthrough` for YouTube
  and portrait `iot-tablet-walkthrough-portrait` for the feeds — showing everything the
  tablet recording shows about CTRLbot IoT, with step text that reads on a phone.
- **In scope:** the transcript correction; the tablet layout of each surface W03 built;
  the tablet EUI's drag and hold hint; nineteen beats in both shapes; the narration edit;
  the .srt.
- **Out of scope:** changes to any surface's phone layout, `ActivitiesSwitching.tsx`, the
  First-Run cuts (v1.1), footage, publishing, trimmed cuts, the roadmap.
- **Must preserve:** every surface's phone render and every `Proof-*` still as they were
  after W03; `First-Run-Tablet`, W01, W02, W03 and every other composition unchanged;
  `video input/` and the ingest's JSON never modified; no gate threshold changed.

## Copy

Executors place these verbatim as `WalkthroughCopy` props. Eyebrows render uppercase.
Audiowide only where marked.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open | — | **CTRLbot IoT** (Audiowide) | Room control from an Android phone or tablet. No processor, no laptop, no extra software. |
| first-run | First run | A short tour to start | The app opens with a walkthrough of setup. Close it any time, and open it again from Settings → Quick Start. |
| ai | CTRLbot AI | A living manual | Ask anything about the app or how to set it up, and it answers, or helps you troubleshoot. |
| database | Device | Start with a driver | Dozens of manufacturers, hundreds of models and thousands of tested commands. RS-232 and IR go through an end point. Sort by type to find yours. |
| epson | Device | Everything about the device | Pick a model to see its information and everything the connection needs, with links to the manufacturer and product pages. |
| add | Connect | Add it and connect | Press + to add the device, enter its IP address and connect. The connection saves itself: there is no save button. |
| terminal | Connect | Test the commands | Send any command and watch it land in the terminal. |
| test | Connect | Test it as a remote | Every device you add is listed here. Test it as a switcher, talk to it in the terminal, or open its own web page. |
| activities | Activities | The room builds itself | Activities form themselves from your devices. Customise them any way you want. |
| switch-audio | Activities | Power, switching and audio | The projector's power presets are already made, the Epson is the switcher, and its audio is mapped for the end user. |
| eui | End user interface | Locked down for the end user | Open the end user interface to hand the room over, and test it as the technician: switch, change the volume, mute, power down. |
| exit | End user interface | Hold to get back to setup | Press and hold the setup button for two seconds. A tap does nothing, so nobody leaves setup open by accident. |
| discovery | Find Devices | Find what's on the network | Find Devices scans the whole network and matches what it finds to drivers in the database. |
| matrox-add | Find Devices | Add a whole system at once | Matrox ConvertIP encoders and decoders use IPMX. One click adds each, and a login or certificate to approve pops up for you. |
| matrox-test | Connect | Test each encoder and decoder | Open the system to reach any single encoder or decoder, or switch and test it here. |
| matrox-switch | Activities | Encoders and decoders | Set the switcher to encoders and decoders. Audio and power stay on the display. |
| m2m | End user interface | Many to many | One press on a source, one on a display. Or press, hold and drag it over. All sends one source everywhere. |
| settings | Settings | Help is built in | The full user manual, the quick start, a factory reset and a database update, all on the Settings page. |
| close | — | **CTRLbot IoT** (Audiowide) | Set up the room, then hand it over. |

## Narration clips

Source ranges in seconds on the prepared track, from `words.json`: each starts ~0.1s before
its first word; **T13 refines every end** to ~0.25s after the last word's `end`, never past
the next word's start. Placement is W03's rule: in each beat the first clip plays at the
beat's start + 0.25s, and each next clip at the previous clip's end + 0.2s.

| beat | clips (source ranges) | what is said |
|------|-----------------------|--------------|
| open | 1.4–11.3 | Welcome to CTRLbot … the CTRLbot IoT app that's available for Android, for phone, tablet, |
| first-run | 14.7–27.1 | When you first open up the app, you'll have a nice little walkthrough … click on the quick start. |
| ai | 28.1–33.5, 34.5–41.9, 43.3–49.6 | The first thing you'll see … our CTRLbot AI. And this is going to help you … a living manual. So anything … you can just put in right here. |
| database | 53.9–64.0, 64.4–76.0 | It all begins with adding devices … IP, RS-232 and IR as well. In order to use RS-232 or IR … our sorting right here. |
| epson | 76.8–78.2, 79.6–86.2, 86.3–94.8, 95.7–101.4 | Let's just add a projector. And you can see when I click … great information. If I want, I can go to the manufacturer webpage … product page as well. And down here … to make the connection. |
| add | 102.2–109.3, 125.1–132.4 | Just hitting plus … the IP address of our projector. Pressing connect … you don't have to actually hit a save button. |
| terminal | 132.4–137.0 | And if you want, you can test some of these commands right here. |
| test | 140.0–149.7, 150.0–153.3, 153.5–156.5, 157.4–163.6, 164.4–168.4 | If you need to test the actual device … listed right here. And then you can go through and test it out. And here's what it looked like as a switcher. And here's a terminal … these commands. Also, if the device has a webpage … right here. |
| activities | 169.7–176.3, 176.7–184.4, 184.7–188.0 | The next step … activities. And these activities form themselves … customize this any way you want. And so you have your power presets, right? |
| switch-audio | 187.8–191.0, 192.6–200.7, 201.5–205.0 | You can see how our projector already turned on and off, · you can assign a switcher … assign the audio levels. And these are all … for the end user interface. |
| eui | 205.6–216.6, 217.2–222.6, 223.6–228.4, 229.7–231.5 | And once you have all this set up … test it as the technician. And you can see my TV, my projector is switching, and I can change the volume, I can mute it, and I can power the system down. |
| exit | 238.6–245.3 | Anytime I need to go back … press and hold the little setup button … right back here. |
| discovery | 246.4–248.6, 249.2–266.1 | Let's go ahead and add some more devices. You see up in the corner … the device driver database. |
| matrox-add | 267.5–273.5, 274.1–275.8, 281.8–286.6, 287.0–303.4 | And so we have a few of Matrox endpoints, right? And these use IPMX, · So let's just add these. And one click, all you need. If there's setup information … change those values. |
| matrox-test | 328.9–330.6, 333.5–337.5 | click on each individual · encoder or decoder, or you can switch and test right here. |
| matrox-switch | 340.1–341.9, 342.3–349.4, 349.9–357.7, 358.5–363.9 | let's go back over to activities. So now we'll want to change the switcher over to encoders and decoders. And you can see here our ConvertIP … ready to go. And we'll leave the audio … set up for the display. |
| m2m | 364.8–368.3, 369.0–373.4, 374.0–379.1, 379.6–382.2, 382.3–389.5 | Now, when we come in here, we have a very different interface, right? … one press, and then you can click over here. We also have a drag and drop feature … drag it over. And of course, we have our send to all. At any time … where it needs to go. |
| settings | 399.4–403.9, 404.1–407.3, 408.6–414.1, 414.7–421.0 | At any time, if you need to start over or you need help with the user manual, · So full user manual … right here. And the quick start … play that right here. And if you need to do a factory reset or update the database … right here. |
| close | 423.0–423.9 | Thank you for your time. |

Cut on purpose: "and Chromebook" (11.4s), the stumbles around 312–329s ("the way that we,
we organize these is, is interesting"), the IPMX "universal control protocol" aside
(276–281s), and the doubled "you can you can" (192s).

## Executor instructions

**Paste this to the executor:** *Run `videos/iot-tablet-walkthrough.md` in this checkout,
following its "Executor instructions" section.*

**Executor: Gemini 3.8 Flash, High reasoning.** Work in the current checkout on `main`; no
branch, no worktree.

0. **Gate:** if `videos/iot-phone-walkthrough.md` has any `- [ ]` task left, stop and report
   that W04 waits on W03.
1. **Read first:** `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`,
   `.claude/commands/video-run.md`, and this whole brief. Then the worked example it
   mirrors: `videos/iot-phone-walkthrough.md` and `src/marketing/iot-phone-walkthrough/`,
   and, for a surface task, the surface file it extends.
2. **Run T1 to T18 in order.** For each: resume any uncommitted work first; implement
   exactly the task in its named files, with this brief's copy and clips verbatim; run the
   per-task check and look at every still; on PASS mark `[x]`, stage only the task's files
   plus this brief, and commit `Tn: <summary>` with the repository's Co-Authored-By line
   before reading the next task. FAIL only for a lint error, a broken check, or a still
   that plainly is not its evidence line or its reference frame; anything else is a Review
   note.
3. **No approval stops** between tasks or before the renders.
4. **Acceptance:** T1–T18 `[x]`, one commit each; both renders exist and pass
   `video:frames … check` under 60% and `narration:check`; the .srt has no `controlbot`,
   no `.ai.`, no `RS -232`, no `convert IP` and no one-word captions; `video:lint` 0 errors;
   every phone surface and every `Proof-*` still that existed before looks as before; W01,
   W02 and W03's .srt unchanged. Then stop testing.
5. **Limits:** two repair rounds per task, then `[!]` with the evidence under
   `## Blocked notes` and stop. No nested subagents. Never paste a full build log or diff —
   the failing lines only. Any retry or poll at most twice. A still over two minutes is
   blocked. Renders run one at a time. Stop if you are about to repeat an earlier turn.
6. **Report:** commits, gate results, Review notes, and the paths to both renders, the
   .srt and both contact sheets. Do not mark the video done and do not publish.

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked
>
> **Resume, do not redo.** Before a task, check `git status` for its files; verify
> uncommitted work first and commit it on PASS.
>
> **Commit as soon as a task passes**, before reading or planning the next one.
>
> **Per-task check:** `npm run check` and `npm run video:lint`. A surface task (T2–T11)
> renders its new `Proof-Tablet-<Name>` still (1280x800, registered in `src/Root.tsx` beside
> the existing `Proof-*` stills) beside the reference frames it names, **and** re-renders
> the surface's `Proof-Phone-<Name>` still to show the phone layout did not move. A beat
> task renders `npm run video:frames -- iot-tablet-walkthrough contact --beat=<beat>`
> (portrait: prefix `VIDEO_COMPOSITION=iot-tablet-walkthrough-portrait`). A still renders in
> seconds; one over two minutes is blocked.
>
> **A tablet layout is built the house way:** geometry from the named `layout/` XML and
> `tokens.generated.ts`, `TabletNavRail` where the app shows it, state through props, the
> phone branch untouched.

### Shared

- [x] T1: Correct `ingest/iot-tablet-walkthrough/transcript.md` against `ingest/iot-tablet-walkthrough/contact.html` and mark it `Status: corrected 2026-09-30` — files: ingest/iot-tablet-walkthrough/transcript.md
  - Terms only: "controlbot .ai" → CTRLbot AI, "RS -232" → RS-232, "convert IP" → ConvertIP, "Matrox", "IPMX", "Epson PowerLite", and anything else the stills contradict. Keep filler and false starts; change no timestamp; never edit the JSON files.

### Tablet layouts of W03's surfaces

- [x] T2: Add the tablet layout to `FirstRunEducation` — files: src/app-ui/FirstRunEducation.tsx, src/Root.tsx
  - Reference frames: `f_0001.jpg`–`f_0004.jpg` (the dialog centred over the setup screen and nav rail).
- [x] T3: Add the tablet layout to `ConnectTest`: the tabs, the device list on the right, and the Buttons, single-output Switcher, Terminal and Web page tabs — files: src/app-ui/ConnectTest.tsx, src/Root.tsx
  - From `layout/menu_connections.xml`, `driver_connection.xml`, `remotes_test.xml`, `av_sw_remote_nx1.xml`. Reference frames: `f_0016.jpg`–`f_0018.jpg`.
- [x] T4: Add the tablet layout to `ConnectTest`'s multi-output Switcher for Matrox — files: src/app-ui/ConnectTest.tsx
  - From `layout/av_sw_remote_nxo.xml` (or `av_sw_remote_nx4.xml` where the app uses it for four outputs). Reference frame: `f_0041.jpg`.
- [x] T5: Add the tablet layout to `ProductWebView`, over the nav rail — files: src/app-ui/ProductWebView.tsx, src/Root.tsx
  - Reference frames: `f_0012.jpg`, `f_0018.jpg`. Draw no website content.
- [ ] T6: Add the tablet layout to `ActivitiesPresets` — files: src/app-ui/ActivitiesPresets.tsx, src/Root.tsx
  - Reference frames: `f_0020.jpg`–`f_0022.jpg`, `f_0030.jpg`.
- [ ] T7: Add the tablet layout to `ActivitiesSwitch`: the switch-type picker, many-to-one on one device, and AVoIP encoders and decoders side by side — files: src/app-ui/ActivitiesSwitch.tsx, src/Root.tsx
  - Reference frames: `f_0043.jpg`, `f_0044.jpg`. `ActivitiesSwitching.tsx` is not touched.
- [ ] T8: Add the tablet layout to `ActivitiesAudio` — files: src/app-ui/ActivitiesAudio.tsx, src/Root.tsx
  - Reference frames: `f_0023.jpg`, `f_0024.jpg`, `f_0045.jpg`.
- [ ] T9: Add the tablet layout to `DiscoverDevices` — files: src/app-ui/DiscoverDevices.tsx, src/Root.tsx
  - From `layout/fragment_discover_devices.xml`. Rows from the recording's stills (`f_0032.jpg`–`f_0040.jpg`), private IPs only.
- [ ] T10: Add the tablet layout to `SettingsSupport` — files: src/app-ui/SettingsSupport.tsx, src/Root.tsx
  - From `layout/menu_set.xml`. Reference frames: `f_0053.jpg`, `f_0054.jpg`.
- [ ] T11: Add to `TabletEui` the drag of a source onto an output and the "Keep holding to return to Setup" hint — files: src/app-ui/TabletEui.tsx
  - Both optional props on the pattern W03's T13 used for `PhoneEui`; absent means today's render, so `First-Run-Tablet`, both EUI promos and every `TabletEui` proof are unchanged. Reference frames: `f_0047.jpg`–`f_0050.jpg`.

### W04

- [ ] T12: Create the beat table, copy and camera — files: src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughData.ts
  - `BEATS` in frames from the Beats table's seconds × 30, in order (total 10200 frames, 340s); `COPY` from the Copy table; `SUBJECT` per beat (`rail`, `list`, `pane`, `content` or `bar` — whichever region of the 1280x800 surface holds the beat's evidence); `beatShots()` from wide (1.04) to a 0.8 push on the subject by mid-beat and back.
- [ ] T13: Create the narration edit — files: src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts
  - `IOT_TABLET_NARRATION_SOURCE`, `IOT_TABLET_NARRATION_CLIPS` from the Narration clips table with every end refined against `words.json` word ends and each `at` from the placement rule, and `IOT_TABLET_CAPTION_CORRECTIONS` = `{controlbot: 'CTRLbot', '.ai.': 'AI.', RS: 'RS-232', '-232': '', convert: 'ConvertIP,', 'IP,': ''}`. Confirm `IP,` occurs only at 352.6s inside the clips, or narrow the correction. Only `import type`.
- [ ] T14: Build beats `open` to `test` in `IotTabletBeats.tsx`, each a component of `{frame, frames}` in a `BEAT_RENDERERS` map — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [ ] T15: Build beats `activities` to `discovery` in `IotTabletBeats.tsx` — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [ ] T16: Build beats `matrox-add` to `close` in `IotTabletBeats.tsx` — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [ ] T17: Build both compositions and register them — files: src/marketing/iot-tablet-walkthrough/IotTabletWalkthrough.tsx, src/Root.tsx
  - On the pattern of W03's `IotPhoneWalkthrough.tsx`: landscape `<Stage>` at its default panel with the 1280/800 aspect; portrait `<PortraitStage>` with `<NarrationCaptions>` (captions from `captionsFromClips(clips, words, IOT_TABLET_CAPTION_CORRECTIONS)`); `<NarrationTrack>` in both; `<PromoPreload />`; copy through `<WalkthroughCopy>` with `at={-40}` on open. Register `iot-tablet-walkthrough` (1920x1080) and `iot-tablet-walkthrough-portrait` (1080x1920) in W03's `CTRLbot-IoT-Walkthrough` folder, metadata inline.
  - Verify: `npm run video:frames -- iot-tablet-walkthrough validate`; both contact sheets, every still against its evidence line; a half-scale inert check on the portrait under 60%. T14–T16 render their stills only once T17 has registered the composition: until then their check is `npm run check` and `npm run video:lint`.
- [ ] T18: Run the feature gates on both shapes, render both, write the .srt, and record the results here — files: videos/iot-tablet-walkthrough.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough`; render `iot-tablet-walkthrough` → `out/iot-tablet-walkthrough.mp4` and `iot-tablet-walkthrough-portrait` → `out/iot-tablet-walkthrough-portrait.mp4` (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both; `npm run narration:check` on both; `npm run narration:srt -- src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts IOT_TABLET_NARRATION_CLIPS iot-tablet-walkthrough out/iot-tablet-walkthrough.srt --corrections=IOT_TABLET_CAPTION_CORRECTIONS`, then confirm the corrections took and no caption is one word. Confirm every file exists.
  - Runs straight after T17 with no approval stop. Does not mark the video done: Nathan reviews both renders, and his notes come back as new tasks.

## Deferred

- Trimmed cuts for X (2:20) and YouTube Shorts (3:00), from these beats.
- A shared walkthrough shell for W01–W04's compositions.
- The factory-reset confirmation dialog the recording opens at 6:58 — shown only if a later
  cut needs it.
- The First-Run quick-start cuts, moved to v1.1.

## Handoff

- **Ready after W03 is finished:** T1, then T2–T11 (T3 before T4), T12 and T13.
- **Ready later:** T14–T16 after T2–T13; T17 after T14–T16; T18 last.
- **Blocked:** until `videos/iot-phone-walkthrough.md` has no `- [ ]` task.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

## Contact sheet

> `npm run video:frames -- iot-tablet-walkthrough contact` renders one still per beat, and
> with `VIDEO_COMPOSITION=iot-tablet-walkthrough-portrait` the portrait sheet. Mark each
> ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
