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
- Planned edit (revision 2): `public/narration/iot-tablet-walkthrough/edit.m4a` and
  `src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.generated.ts`, from
  `npm run narration:edit` (never hand-edited)

## Beats

Revision 2 (2026-10-01): the hybrid format, as W01's revision 2
(`videos/archive/2026-10-02-mirror-walkthrough-r2.md`), with the tablet full frame. Layout: `card`, `stage` or
`chapter`.

| id | Layout | Claim | Surface | Evidence | Sec |
|----|--------|-------|---------|----------|-----|
| open | card | CTRLbot IoT runs the room from a tablet | `MasterControlCard` | The tricon and the CTRLbot IoT lockup are on screen at frame 0; the promise line streams in beneath them | 5 |
| proof | stage | One tap, and it is there | `TabletEui` | The tablet EUI; a source is tapped and the display fills with it in the same moment, ringed | 6 |
| first-run | chapter | A short tour opens the first time | `FirstRunEducation` | The first-run walkthrough over the setup screen steps forward, then its ✕ is tapped and it closes | 13.5 |
| ai | chapter | CTRLbot AI is a living manual | `CtrlbotAi` | The question list; a question is tapped and its answer lands, readable | 22 |
| database | chapter | Everything starts with a driver | `DriverCatalog` | The catalog, on the app's blue wash, scrolls; the sort filter is tapped and opens on Projector, Display, Switchers, End Points | 23 |
| epson | chapter | Every driver carries its device's details | `DriverDetail` + `ProductWebView` | Epson PowerLite in the detail pane; the manufacturer link is ringed and tapped, and the web view's address bar loads for under two seconds; back on the pane, the connection info is ringed | 23.5 |
| add | chapter | Add it, enter the IP, and it saves itself | `ConnectionPanel` | + is tapped and Configure Connection opens; the IP is entered on "IP"; Connect is tapped on "connect" and turns Disconnect; the saved line is ringed | 16 |
| terminal | chapter | Test the commands | `ConnectionPanel` | Power On and Power Off are tapped and land in the terminal, readable | 5.5 |
| test | chapter | Test it as a remote | `ConnectTest` | The device list is ringed on "listed"; Switcher, Terminal and Web page are each tapped on their word; the Web page is held under two seconds | 28 |
| activities | chapter | The room builds itself | `ActivitiesPresets` | Presets lists Power On and Power Off; Power On is tapped and its command ringed | 19 |
| switch-audio | chapter | Switching and audio are already set | `ActivitiesSwitch` + `ActivitiesAudio` | The Epson as the switcher, ringed; then Audio's volume up, down and set, ringed | 16.5 |
| eui | chapter | The end user gets the room, not the settings | `TabletEui` + `EuiPower` | A source is picked for the display, the volume moves, mute turns on, then Powering Off and Welcome, each on its spoken word | 25 |
| exit | chapter | Press and hold to get back to setup | `TabletEui` | On Welcome, the setup button is held: a hold ring fills over two seconds, Keep holding shows, and the setup menu returns | 8 |
| discovery | chapter | Find Devices scans the network | `DiscoverDevices` | The discovery icon is ringed and tapped; the count climbs; a driver match is ringed | 20 |
| matrox-add | chapter | Add a whole AV-over-IP system in one go | `DiscoverDevices` | Matrox ConvertIP rows are added one after another, each ending Added, readable | 30.5 |
| matrox-test | chapter | Test each encoder and decoder | `ConnectTest` | The Matrox system with encoders and decoders side by side; a decoder takes an encoder on "switch" | 8 |
| matrox-switch | chapter | Encoders and decoders, set up for the room | `ActivitiesSwitch` | The switch type goes to AVoIP Encoders/Decoders on "encoders"; the ConvertIP lists fill and are ringed | 23.5 |
| m2m | chapter | Many to many, by tap, drag or All | `TabletEui` | Four displays with sources and displays in one frame: a source tapped then a display; a source dragged onto a display; All tapped, and every display takes it | 24.5 |
| settings | chapter | Help is built in | `SettingsSupport` | Settings → Support: User Manual, Quick Start, Factory Reset and Database Management ringed on their words | 21 |
| close | card | The name, once, at the end | `MasterControlCard` | The CTRLbot IoT lockup and its outcome line; no URL | 5 |

## Anything unusual

- **W03's twin.** `videos/iot-phone-walkthrough.md` is the same story on the phone. W04
  reuses every surface W03 built, adding each one's tablet layout, and follows W03's
  composition pattern (and W01's before it). Never import from another video's folder.
- **Shared files have one owner.** Revision 1's tablet surfaces already exist. Revision 2
  needs W03's T20–T22 maps before T20; other pending W03 tasks do not block this lane.
  The coordinator serializes `src/Root.tsx` changes and integration checks.
- **5:43.5, everything condensed (revision 2)**, as W03: over X's 2:20 and a Short's 3:00 on purpose;
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
- **Revision 2: the tablet is full frame.** Landscape renders it at 1.5 px/dp, as First-Run
  tablet does, pushing to small controls. Portrait shows crops of the region being taught
  (no wider than 720 dp); the subject stays out of the feeds' right 140 px column. The
  push-and-return cycle is retired. Built on W01's revision 2 (`videos/archive/2026-10-02-mirror-walkthrough-r2.md`).

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

**Executor: Gemini 3.8 Flash, High reasoning.** Codex coordinates the approved W02–W05 run and takes over a worker only when Gemini is unavailable. Run one assigned pending task per fresh context in this checkout. Pending revision: T19–T27; never redo checked tasks.

1. Read `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`, this brief, and the relevant installed Remotion skill before composition code. W01's current source in `src/marketing/mirror-walkthrough/` and `src/marketing/WalkthroughShell.tsx` are the worked example.
2. **Dependencies:** T19 needs W02 T17. T20 needs T19 and W03 T20–T22 integrated; T21–T27 run in order. W03 final renders are not a dependency.
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
- [x] T6: Add the tablet layout to `ActivitiesPresets` — files: src/app-ui/ActivitiesPresets.tsx, src/Root.tsx
  - Reference frames: `f_0020.jpg`–`f_0022.jpg`, `f_0030.jpg`.
- [x] T7: Add the tablet layout to `ActivitiesSwitch`: the switch-type picker, many-to-one on one device, and AVoIP encoders and decoders side by side — files: src/app-ui/ActivitiesSwitch.tsx, src/Root.tsx
  - Reference frames: `f_0043.jpg`, `f_0044.jpg`. `ActivitiesSwitching.tsx` is not touched.
- [x] T8: Add the tablet layout to `ActivitiesAudio` — files: src/app-ui/ActivitiesAudio.tsx, src/Root.tsx
  - Reference frames: `f_0023.jpg`, `f_0024.jpg`, `f_0045.jpg`.
- [x] T9: Add the tablet layout to `DiscoverDevices` — files: src/app-ui/DiscoverDevices.tsx, src/Root.tsx
  - From `layout/fragment_discover_devices.xml`. Rows from the recording's stills (`f_0032.jpg`–`f_0040.jpg`), private IPs only.
- [x] T10: Add the tablet layout to `SettingsSupport` — files: src/app-ui/SettingsSupport.tsx, src/Root.tsx
  - From `layout/menu_set.xml`. Reference frames: `f_0053.jpg`, `f_0054.jpg`.
- [x] T11: Add to `TabletEui` the drag of a source onto an output and the "Keep holding to return to Setup" hint — files: src/app-ui/TabletEui.tsx
  - Both optional props on the pattern W03's T13 used for `PhoneEui`; absent means today's render, so `First-Run-Tablet`, both EUI promos and every `TabletEui` proof are unchanged. Reference frames: `f_0047.jpg`–`f_0050.jpg`.

### W04

- [x] T12: Create the beat table, copy and camera — files: src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughData.ts
  - `BEATS` in frames from the Beats table's seconds × 30, in order (total 10200 frames, 340s); `COPY` from the Copy table; `SUBJECT` per beat (`rail`, `list`, `pane`, `content` or `bar` — whichever region of the 1280x800 surface holds the beat's evidence); `beatShots()` from wide (1.04) to a 0.8 push on the subject by mid-beat and back.
- [x] T13: Create the narration edit — files: src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts
  - `IOT_TABLET_NARRATION_SOURCE`, `IOT_TABLET_NARRATION_CLIPS` from the Narration clips table with every end refined against `words.json` word ends and each `at` from the placement rule, and `IOT_TABLET_CAPTION_CORRECTIONS` = `{controlbot: 'CTRLbot', '.ai.': 'AI.', RS: 'RS-232', '-232': '', convert: 'ConvertIP,', 'IP,': ''}`. Confirm `IP,` occurs only at 352.6s inside the clips, or narrow the correction. Only `import type`.
- [x] T14: Build beats `open` to `test` in `IotTabletBeats.tsx`, each a component of `{frame, frames}` in a `BEAT_RENDERERS` map — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [x] T15: Build beats `activities` to `discovery` in `IotTabletBeats.tsx` — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [x] T16: Build beats `matrox-add` to `close` in `IotTabletBeats.tsx` — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [x] T17: Build both compositions and register them — files: src/marketing/iot-tablet-walkthrough/IotTabletWalkthrough.tsx, src/Root.tsx
  - On the pattern of W03's `IotPhoneWalkthrough.tsx`: landscape `<Stage>` at its default panel with the 1280/800 aspect; portrait `<PortraitStage>` with `<NarrationCaptions>` (captions from `captionsFromClips(clips, words, IOT_TABLET_CAPTION_CORRECTIONS)`); `<NarrationTrack>` in both; `<PromoPreload />`; copy through `<WalkthroughCopy>` with `at={-40}` on open. Register `iot-tablet-walkthrough` (1920x1080) and `iot-tablet-walkthrough-portrait` (1080x1920) in W03's `CTRLbot-IoT-Walkthrough` folder, metadata inline.
  - Verify: `npm run video:frames -- iot-tablet-walkthrough validate`; both contact sheets, every still against its evidence line; a half-scale inert check on the portrait under 60%. T14–T16 render their stills only once T17 has registered the composition: until then their check is `npm run check` and `npm run video:lint`.
- [x] T18: Run the feature gates on both shapes, render both, write the .srt, and record the results here — files: videos/iot-tablet-walkthrough.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough`; render `iot-tablet-walkthrough` → `out/iot-tablet-walkthrough.mp4` and `iot-tablet-walkthrough-portrait` → `out/iot-tablet-walkthrough-portrait.mp4` (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both; `npm run narration:check` on both; `npm run narration:srt -- src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts IOT_TABLET_NARRATION_CLIPS iot-tablet-walkthrough out/iot-tablet-walkthrough.srt --corrections=IOT_TABLET_CAPTION_CORRECTIONS`, then confirm the corrections took and no caption is one word. Confirm every file exists.
  - Runs straight after T17 with no approval stop. Does not mark the video done: Nathan reviews both renders, and his notes come back as new tasks.

### Revision 2 · 2026-10-01 — the hybrid format, tablet full frame

From the 2026-10-01 review (`out/REVIEW-2026-10-01.md`).

What the review found in revision 1:
- 24 of 52 clip ends stop while the voice is still sounding. Audible: "a living" at 0:37,
  "right? Y—" at 2:39, "end user in—" at 2:55, "mute i—" at 3:18, "these use I—" at 3:56,
  "user manu— —al" at 5:18 and "right he—" at 5:22. A 70 ms repeat at 1:47.
- Connected before the IP is spoken (1:36).
- The Test tabs run ahead of the voice (2:02–2:16), and the Web view is a blank white panel.
- The room powers off during "volume" and "mute" (3:13–3:18), then comes back on with no
  power-on.
- The portrait tablet sits under the feeds' button column.
- No reuse of the approved First-Run tablet scenes.

**Needs:** `videos/archive/2026-10-02-mirror-walkthrough-r2.md` T1–T7 `[x]`, Nathan's review of W01's revision 2,
W02 T17 before T19, and `videos/iot-phone-walkthrough.md` T20–T22 `[x]` before T20 (the region maps
both cuts share).

**Read before any revision 2 task:** "What W01's revision 2 taught" in
`docs/NARRATED-WALKTHROUGH.md`. It covers clip hard edges, the voice check's false alarms,
the shell's drift, and cue-timed `shots` rather than `regions`.

**Scope.**
- **Outcome:** both W04 renders rebuilt on the shared pieces, with the tablet full frame. The
  approved First-Run tablet framing is reused where the app has not changed. Every Test and
  power-off screen changes on its spoken cue, and every clipped word is fixed.
- **In scope:** the re-planned edit, beat data, both compositions, 20 beats, the renders.
- **Out of scope:** surface changes beyond what a beat strictly needs (as optional props),
  the First-Run cuts, a trimmed cut, footage, diagrams.
- **Must preserve:**
  - Every surface's default render and every `Proof-*` still.
  - `First-Run-*`, W01, W02 and W03.
  - `video input/` and the ingest's JSON.
  - Gate thresholds.

**Copy (revision 2).**
- The cards: `open` is lockup **CTRLbot IoT** with line "Set up and run a whole room from an
  Android tablet." `close` is lockup **CTRLbot IoT** with line "Set up the room, then hand
  it over."
- `proof` (stage): eyebrow "End user interface", title "One tap, and it is there".
- Every chapter keeps the eyebrow and title from the Copy table above, as a step label with
  no body. Only `database` keeps its body.

**Narration (revision 2).** The Narration clips table and the edit list's ids, with these
changes:
- `welcome` runs from `open` into `proof`; the cut lands on "CTRLbot IoT".
- `ai-manual` ends 43.2 (after "manual.").
- `act-presets` ends 187.8, which drops the dangling "You".
- `switch-eui` ends 205.6 (after "interface.").
- `eui-volume-mute` ends 228.75 (after "it,").
- `matrox-ipmx` ends 276.8 (after "IPMX,"; the "universal control protocol" aside stays cut).
- `term-commands` starts 132.45, which ends the overlap.
- `settings-start-over` is 399.43–403.1 ("…start over or you need help"), and
  `settings-manual` is 404.5–408.05 ("Full user manual, it can be found right here.").

Corrections stay `IOT_TABLET_CAPTION_CORRECTIONS`. Placement and holds follow W01's rule.

**Shot list (revision 2).** Regions come from the surfaces' region maps (W03's T20–T22, and
the existing tablet maps). Cues are `cueFrame` words. Where a row names a First-Run scene,
port that scene's tablet shots and annotation choices, retimed to the cues.

Portrait shows the tablet as crops of the region being taught, at least 1.5 px/dp: a region
no wider than 720 dp. Only `m2m` and `proof` show the whole relationship, sources and
displays together. The subject is never in the right 140 px column.

| beat | First-Run source | cue → action → result |
|------|------------------|-----------------------|
| proof | `EuiHandoff` (switch one display) | welcome "app" → a source tapped, the display fills |
| first-run | `CtrlbotIntro` | first-run "walkthrough" → the tour steps · "close" → ✕ tapped, the tour closes |
| ai | `CtrlbotIntro` | ai-intro "AI" → the question list · ai-manual "troubleshoot" → a question tapped · "manual" → the answer lands |
| database | `DeviceSetup` | db-devices "library" → the catalog scrolls · db-sorting "sorting" → the filter opens |
| epson | — | epson-info "projector" → Epson tapped, the detail pane · epson-webpage "manufacturer" → link ringed and tapped, the web view loads for at most 2s · epson-connection "connection" → the connection info ringed |
| add | `DeviceSetup` (+), `ConnectAndTest` (address, connect) | add-ip "plus" → + tapped · "IP" → the address entered · add-saved "connect" → Connect tapped, Disconnect · "save" → the saved line ringed |
| terminal | `ConnectAndTest` (send a safe command) | term-commands "commands" → Power On and Power Off tapped, their lines land |
| test | — | test-device "listed" → the device list ringed · test-switcher "switcher" → the Switcher tab · test-terminal "terminal" → the Terminal tab · test-webpage "webpage" → the Web page tab, held under 2s |
| activities | `BuildRoom` | act-next "activities" → Activities · act-presets "power" → Power On tapped, its command ringed |
| switch-audio | `BuildRoom` | switch-assign "switcher" → Switch ringed · "audio" → Audio ringed |
| eui | `EuiHandoff` | eui-setup "interface" → the EUI opens · eui-technician "switching" → a source picked for the display · eui-volume-mute "volume" → the volume moves · "mute" → muted · eui-power "down" → Powering Off, then Welcome |
| exit | `EuiHandoff` (press and hold) | exit-hold "hold" → the hold ring fills over 2s on Welcome · "back" (second) → setup returns |
| discovery | — | discovery-scan "discovery" → the icon ringed and tapped · "scans" → the count climbs · "database" → a match ringed |
| matrox-add | — | matrox-endpoints "Matrox" → the rows · matrox-add-these "add" → Add tapped · matrox-one-click "click" → Added. No certificate dialog is shown |
| matrox-test | — | matrox-test-individual "individual" → a decoder tapped · matrox-test-switch "switch" → it takes an encoder |
| matrox-switch | `BuildRoom` | matrox-switch-back "activities" → Activities · matrox-switch-change "encoders" → the switch type changes · matrox-switch-convertip "convert" → the lists ringed |
| m2m | `EuiHandoff` (route across displays) | m2m-press-click "press" → a source tapped · "click" → a display tapped · m2m-drag-drop "drag" → a drag onto a display · m2m-send-all "all" → All tapped |
| settings | — | settings-manual "manual" → User Manual ringed · settings-quick-start "quick" → Quick Start ringed · settings-reset "factory" → Factory Reset ringed · "database" → Database Management ringed |

- [x] T19: Re-plan W04's edit with `narration:edit` and the changes above — files: src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts, src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.generated.ts, public/narration/iot-tablet-walkthrough/edit.m4a
  - Nathan, 2026-10-02: `add` 15.5→16s and `terminal` 6→5.5s; `matrox-test` 7→8s and `matrox-add` 31.5→30.5s (total 343.5s unchanged). The first build left `add` with a 0.60s hold and `matrox-test` with 0.48s.
  - Two builds at most to set the `at`s. A beat that cannot keep its 1.0s hold inside its Sec is `[!]` with the measured lengths.
  - Then `npm run narration:verify` on `edit.m4a` (W02's T17). Fix each real edge leak with `notBefore` / `notAfter` or a tighter `sourceEnd` (the contract's "Clip edges leak"), at most two more builds. A leak that remains goes in the Review notes with its clip and level.
- [x] T20: Migrate W04's coupled beat data and both shell compositions at 10305 frames, with the revision 2 copy, layouts, regions and cue frames — files: src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughData.ts, src/marketing/iot-tablet-walkthrough/IotTabletWalkthrough.tsx, src/Root.tsx
  - Coupled with the former T21 (2026-10-02), as W02's T11 was. The worked example is W02's migration, commit `9114a3d`.
  - 10305 frames in total. `DriverCatalog` callers opt into the app's blue wash. `beatShots()` and `SUBJECT` are removed. In `src/Root.tsx`, only W04's two registrations change.
  - Every region change the Shot list ties to a word is a `shots` entry with `at` from `cueFrame`, relative to the beat. Use `regions` arrays only for untimed changes, because they split the beat evenly. Add no hold keyframes: the shell drifts.
  - Chapters show their revision 1 state until T22–T26.
- [x] T21: Merged into T20 (2026-10-02) — files: videos/iot-tablet-walkthrough.md
- [x] T22: Build the proof, first-run, ai and database beats to the Shot list — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [x] T23: Build the epson, add, terminal and test beats to the Shot list, each screen changing on its cue — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [ ] T24: Build the activities, switch-audio, eui and exit beats to the Shot list, the power state continuous from eui into exit — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [ ] T25: Build the discovery, matrox-add, matrox-test and matrox-switch beats to the Shot list — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [ ] T26: Build the m2m and settings beats to the Shot list — files: src/marketing/iot-tablet-walkthrough/IotTabletBeats.tsx
- [ ] T28: Rebalance W04's chapter shots where a region is blown up or the cued result is off camera: `add` frames DISCONNECT at about 4x, and the saved line ringed on "save" is out of shot — files: src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughData.ts
  - Found in T23's review. Re-check every chapter's stills after T26, and fix them together before T27.
- [ ] T27: Run the feature gates on both shapes, render both, write the .srt from the edit, check the voice, and record the results here — files: videos/iot-tablet-walkthrough.md
  - As W01's T15, with `--corrections=IOT_TABLET_CAPTION_CORRECTIONS` and `--destination=social-walkthrough`.
  - The voice check is `npm run narration:verify` on the landscape render. It is `[!]` only when it exits 1; every other difference is a Review note. The words named in the next line are checked in its output, and against the audio level when Whisper misses one.
  - The voice check must hear "manual", "interface", "it", "IPMX" and "here" whole, and "user manual" once in the settings beat.
  - Picture: a portrait still at every Test and EUI cue shows the named tab or state.
  - Regression: `First-Run-Tablet` and the `Proof-*` stills look as before.

## Deferred

- Trimmed cuts for X (2:20) and YouTube Shorts (3:00), from these beats.
- The factory-reset confirmation dialog the recording opens at 6:58 — shown only if a later
  cut needs it.
- The First-Run quick-start cuts, moved to v1.1.

## Handoff

- **Pending revision:** T19–T27.
- **Dependencies:** T19 needs W02 T17. T20 needs T19 and W03 T20–T22 integrated; T21–T27 run in order. W03 final renders are not a dependency.
- **Dispatch:** one task at a time through Codex; independent verification and scoped commit release its owned files. Final rendering waits for the shared render slot.
- **Blocked:** no known implementation blocker; task dependencies still apply.

## Review notes

- T23, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES. Gemini via agy in lane B, 346s. Check and lint pass in a clean worktree. Twelve cue stills, landscape: Epson detail on "projector"; the manufacturer page under 2s on "manufacturer"; Control Info ringed on "connection"; Configure Connection on "plus"; the IP typed on "IP"; Disconnect on "connect"; Power On/Off land in the terminal on "commands"; the device list, Switcher, Terminal and Web page tabs each on their word. Notes (camera data, new T28): DISCONNECT is framed about 4x, and the saved-line ring on "save" is out of shot.

- T22, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES. Gemini via agy in lane B, 309s. Check and lint pass in a clean worktree. Stills at 170/400/470/900/1010/1110/1560/1945, both shapes, match the Shot list: proof "app" taps a source and the display fills; the tour steps on "walkthrough" and ✕ closes it on "close"; the question list arrives on "AI", a question is tapped on "troubleshoot" and the answer lands on "manual"; the catalog scrolls on "library" and the filter opens on "sorting". Notes (T20 camera and callouts, for review): landscape chapters are framed tight (the tour card's top is cut, the answer text touches the left edge), and the callouts cover a list row in landscape.

- T20, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES. Gemini via agy in lane B, with the patch applied to main. In a clean worktree: check, lint and validate pass (20 beats, 343.5s), and the `Root.tsx` diff is limited to W04's two durations. Stills at 0/260/1500/6000/10200, both shapes: poster card, proof stage, database chapter, EUI and close card (CTRLbot IoT, no URL) render. Notes for T22–T26: the landscape proof's EUI panel runs off the stage's right edge, and the landscape database callout covers part of the catalog. Gemini put the `click` cue in matrox-add-these rather than matrox-one-click; check it in T25.

- T19, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES. Gemini via agy in the lane B worktree: 2 placement builds, 2 edge builds, and 1 more placement build after Nathan's timing transfer (add 16s, terminal 5.5s, matrox-add 30.5s, matrox-test 8s). 343.5s; independently measured holds are all at least 1.10s (add). The coordinator's own `narration:verify` passed with 0 edge defects and 19 notes. term-commands and switch-projector leaks are fixed with hard edges. Notes for listening and for W03's T32 (voice.mjs tails): `act-next` ends at -17.5 dB into silence (possible clipped tail); `matrox-ipmx` cuts mid-flow, where the brief removes the aside.

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

- T18, 2026-10-01: `npm run check` OK; `video:lint` 0 errors against `social-walkthrough`
  and general (65 files, 0 errors, 0 warnings); `validate` 19 beats, 340s, no problems.
  Landscape `out/iot-tablet-walkthrough.mp4` (65.1 MB) 38% inert (< 60%), median content area 100%,
  no problems. Portrait `out/iot-tablet-walkthrough-portrait.mp4` (74.1 MB) 33% inert (< 60%),
  median content area 100%, no problems.
- Audio: `npm run narration:check` passed on both renders: 340.00s duration, -13.44 LUFS
  integrated loudness, -1.35 dBTP true peak (target: -14 ± 1 LUFS, < -1 dBTP).
- Captions: `out/iot-tablet-walkthrough.srt` has 161 captions, 895 words from 52 clips;
  verified 0 occurrences of `controlbot`, 0 `RS -232`, 0 `Convert IP`, 0 `.ai.` / `.ai`,
  and 0 one-word captions.
- Framing: Beat `open` holds wide (`content`, 1.04) throughout its 11.0s duration; subsequent
  beats push smoothly to 0.8 on their evidence regions (rail, list, pane, content, bar)
  and back, with all 19 beat still validations passing cleanly.
- Deliverables: Contact sheets at `out/iot-tablet-walkthrough/contact.html` and
  `out/iot-tablet-walkthrough-portrait/contact.html`. Both video renders (`out/iot-tablet-walkthrough.mp4`,
  `out/iot-tablet-walkthrough-portrait.mp4`) and .srt (`out/iot-tablet-walkthrough.srt`) confirmed.

## Contact sheet

> `npm run video:frames -- iot-tablet-walkthrough contact` renders one still per beat, and
> with `VIDEO_COMPOSITION=iot-tablet-walkthrough-portrait` the portrait sheet. Mark each
> ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
