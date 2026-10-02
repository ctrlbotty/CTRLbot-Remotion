---
id: iot-phone-walkthrough
destination: social-walkthrough
---

# CTRLbot IoT on the phone — narrated walkthrough (Roadmap W03)

## Watching

An AV integrator, facilities lead or installer who has just installed CTRLbot IoT, or is
deciding whether to. They want to see the whole path on a phone: find a driver, connect,
test, let the room build itself, hand it over, and what v1.0.9 added — Find Devices and
AV-over-IP switching.

## Promise

Set up and run a whole room from an Android phone: no processor, no laptop, no extra software.

## Narration

- Mode: `source-edit`. Narrated only: there is no silent cut.
- Source recording: `video input/CTRLbot-IoT Phone Walkthrough v1.0.9.mp4` (6:58, 30fps)
- Ingest: `ingest/iot-phone-walkthrough/` — `transcript.md` is `Status: DRAFT` until T1
- Prepared audio: `public/narration/iot-phone-walkthrough/source-normalized.m4a`
- Edit list: `src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts`
- Landscape: `iot-phone-walkthrough`, 1920x1080 → `out/iot-phone-walkthrough.mp4`, captions
  as `out/iot-phone-walkthrough.srt` — YouTube
- Portrait: `iot-phone-walkthrough-portrait`, 1080x1920, captions burned in →
  `out/iot-phone-walkthrough-portrait.mp4` — TikTok, LinkedIn, YouTube
- Planned edit (revision 2): `public/narration/iot-phone-walkthrough/edit.m4a` and
  `src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.generated.ts`, from
  `npm run narration:edit` (never hand-edited)

## Beats

Revision 2 (2026-10-01): the hybrid format, as W01's revision 2
(`videos/archive/2026-10-02-mirror-walkthrough-r2.md`), with the phone full frame. Layout: `card`, `stage` or
`chapter`.

| id | Layout | Claim | Surface | Evidence | Sec |
|----|--------|-------|---------|----------|-----|
| open | card | CTRLbot IoT runs the room from a phone | `MasterControlCard` | The tricon and the CTRLbot IoT lockup are on screen at frame 0; the promise line streams in beneath them | 5 |
| proof | stage | One tap, and the display takes it | `PhoneEui` | The phone EUI; a source is tapped and the display fills with it in the same moment, ringed | 6 |
| first-run | chapter | A short tour opens the first time | `FirstRunEducation` | Full frame: the first-run walkthrough over the setup screen steps forward, then its ✕ is tapped and it closes | 16.5 |
| ai | chapter | CTRLbot AI is a manual that answers | `CtrlbotAi` | The question list fills the frame; a question is tapped and its answer lands, readable | 18.5 |
| database | chapter | Everything starts with a driver | `DriverCatalog` | The catalog, on the app's blue wash, scrolls; the category filter is tapped and opens on Projector, Display, Switchers, End Points | 25 |
| epson | chapter | Every driver carries its device's details | `DriverDetail` + `ProductWebView` | Epson PowerLite's page; the product-page link is ringed and tapped; the web view's address bar shows the page loading, held under two seconds | 15 |
| add | chapter | Add it, enter the IP, and it saves itself | `ConnectionPanel` | + is tapped and Configure Connection opens; the IP field is ringed and filled; Connect turns Disconnect and the saved line lands | 9.5 |
| terminal | chapter | Test commands and see every byte | `ConnectionPanel` | Power On is tapped and lands in the terminal, readable; a typed command is sent | 15.5 |
| test | chapter | Test it as a remote | `ConnectTest` | Each tab is tapped on its spoken word: Buttons, Switcher, Terminal, Web page | 20 |
| activities | chapter | The room builds itself | `ActivitiesPresets` | Presets lists Power On and Power Off; Power On is tapped and opens with the Epson's power-on command already in it, ringed | 21 |
| switch-audio | chapter | Switching and audio are already set | `ActivitiesSwitch` + `ActivitiesAudio` | Switch shows many-to-one on the Epson, ringed; then Audio's volume up, down and set mapped, ringed | 17.5 |
| eui | chapter | The end user gets the room, not the settings | `EuiPower` + `PhoneEui` | Welcome, power tapped; a source tapped for the screen; the volume moves; it powers off and lands on Welcome, each on its spoken word | 25.5 |
| exit | chapter | Press and hold to get back to setup | `PhoneEui` | On Welcome, the setup button in the top-left is held: a hold ring fills over two seconds, Keep holding shows, and the setup menu returns | 10 |
| discovery | chapter | Find Devices scans the network | `DiscoverDevices` | Discover Devices counts up as devices are found; a row's driver match and an Add driver are ringed | 19.5 |
| matrox-add | chapter | Add a whole AV-over-IP system in one go | `DiscoverDevices` | Matrox ConvertIP rows are added one after another, each ending Added, readable | 28.5 |
| matrox-test | chapter | Test the whole Matrox system as one switcher | `ConnectTest` | The Matrox system: four decoders over four encoders; a decoder is tapped, then an encoder, and it takes it | 18.5 |
| matrox-switch | chapter | Encoders and decoders, set up for the room | `ActivitiesSwitch` | Switch type goes to AVoIP Encoders/Decoders; the lists fill; the icon and label control is ringed | 17 |
| m2m | chapter | Many to many, by tap, drag or All | `PhoneEui` | Four displays: a source tapped then a display; a source dragged onto a display; All tapped, and every display takes one source | 26.5 |
| settings | chapter | Help is built in | `SettingsSupport` | Settings → Support: User Manual, Quick Start and Factory Reset ringed on their words | 15 |
| close | card | The name, once, at the end | `MasterControlCard` | The CTRLbot IoT lockup and its outcome line; no URL | 6 |

## Anything unusual

- **Everything, condensed: 5:36 (revision 2).** Every feature the recording covers is kept; only
  repetition is cut. That is over two limits, knowingly: X's 2:20 without Premium, and
  YouTube's 3:00 for a Short. The portrait cut goes to TikTok and LinkedIn and posts to
  YouTube as a regular vertical video. Trimmed cuts for X and Shorts come later, from the
  same beats. T2 raises `social-walkthrough`'s ceiling to 360s so the brief validates.
- **Revision 2 is built on W01's revision 2** (`videos/archive/2026-10-02-mirror-walkthrough-r2.md`):
  `WalkthroughShell`, `narration:edit` and `MasterControlCard`'s `lockup`. Presses are
  `TapIndicator` (this is touch). Never import from another video's folder.
- **Every screen is live React, and the new ones are built for reuse.** Seven screens have
  no rebuild yet; T4–T11 build them from the app's own layouts, in
  `../../1 - CTRLbot.av/CTRLbot-IoT/app/src/main/res/layout(-port)/`, checked against the
  recording's stills in `ingest/iot-phone-walkthrough/frames/`. They go in `src/app-ui/`,
  not in the video's folder, because W04, W05 and the IoT shorts use them next. Each takes
  `device: 'phone'` so the tablet can be added later without changing its callers.
- **No footage.** The recording never shows a third-party page: the manufacturer page is
  still blank when the take moves on, and the Web page tab is never opened. The web view is
  rebuilt as the app's own chrome over an empty, loading page.
- **Claims are the manual's and the app's, not the narration's.** The narration says
  "hundreds of manufacturers"; the user manual says *dozens of manufacturers, hundreds of
  models, thousands of tested commands*. That phrase is cut from the narration and the copy
  says what the manual says. The "universal control protocol that we just added" aside is
  cut. Matrox ConvertIP is IPMX (`CTRLbot-IoT/CLAUDE.md`, AV-over-IP closed at Matrox/IPMX,
  Hall Versa and Kramer).
- **The EUI exits through a two-second press-and-hold** in the top-left. Show the hold.
- **Captions need fixes**, applied at render time: `ControlBot` → `CTRLbot`; `RS` + `-232`
  read as one word, `RS-232` (T3 lets an empty replacement drop a word).
- **Private data:** the recording's IPs are private (`192.168.0.x`); the discovered device
  names are generic products. No account, password or certificate is shown.
- **Revision 2: the phone is full frame.**
  - **Portrait:** it renders at 3 px/dp, as First-Run phone does, with the step label in the
    top scrim and the captions at the bottom.
  - **Landscape:** it fills the frame height and pushes to the region being taught, with the
    step label beside it.
  - **Regions** always contain whole labels. The push-and-return cycle is retired.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Scope lock

- **User outcome:** two narrated renders — landscape `iot-phone-walkthrough` for YouTube and
  portrait `iot-phone-walkthrough-portrait` for the feeds — that show everything the
  recording shows about CTRLbot IoT on a phone, with step text that reads on a phone.
- **In scope:** the transcript correction; seven new phone surfaces in `src/app-ui/`; two
  additions to `PhoneEui`; the portrait layout for a tall surface; the destination
  ceiling; caption word drops; nineteen beats in both shapes; the narration edit; the .srt.
- **Out of scope:** tablet versions of the new surfaces (W04), the First-Run cuts (v1.1),
  footage, publishing, a trimmed X or Shorts cut, the roadmap.
- **Must preserve:** every existing surface and `Proof-*` still renders as before with its
  default props; `First-Run-Phone`, `First-Run-Tablet`, W01, W02 and every other composition
  unchanged (W01's and W02's .srt byte-identical after T3); `video input/` and the ingest's
  JSON never modified; no gate threshold changed.

## Copy

Executors place these verbatim as `WalkthroughCopy` props. Eyebrows render uppercase.
Audiowide only where marked.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open | — | **CTRLbot IoT** (Audiowide) | Room control from an Android phone or tablet. No processor, no laptop, no extra software. |
| first-run | First run | A short tour to start | The app opens with a walkthrough of setup. Close it any time, and open it again from Settings. |
| ai | CTRLbot AI | A manual that answers back | Ask about setup, control or a problem in the room, and it walks you through it. |
| database | Device | Start with a driver | Dozens of manufacturers, hundreds of models and thousands of tested commands, over IP or through an end point to RS-232 and IR. |
| epson | Device | Everything about the device | Pick a model to see its information, specs, setup and support, with links to the product and manufacturer pages. |
| add | Connect | Add it and connect | Press + to add the device, enter its IP address and connect. The connection saves itself. |
| terminal | Connect | Test every command | Send any command and the terminal shows what went out and what came back. Or type your own. |
| test | Connect | Test it as a remote | Buttons, switcher, terminal and the device's own web page, all from the connection you just made. |
| activities | Activities | The room builds itself | Activities set what the end user sees. Power On already holds the Epson's power-on command. |
| switch-audio | Activities | Switching and audio, done for you | With no other switcher added, the Epson is the switcher, and audio follows. Customise it, or go straight to the room. |
| eui | End user interface | The room, for whoever walks in | Turn it on, pick a source for the screen, set the volume, and power it all off again. |
| exit | End user interface | Hold to get back to setup | Press and hold the setup button for two seconds. A tap does nothing, so nobody leaves setup open by accident. |
| discovery | Find Devices | Find what's on the network | Find Devices scans the network and matches each device it finds to a driver in the library. |
| matrox-add | Find Devices | Add a whole system at once | Add Matrox IPMX encoders and decoders and the app connects, verifies and saves each one. It asks if a device needs a certificate approved or a login. |
| matrox-test | Connect | Test the whole system | Select the Matrox system to test it as one switcher, or pick any single encoder or decoder. |
| matrox-switch | Activities | Encoders and decoders | Set the switch type to AV-over-IP encoders and decoders. Change any icon or label here. |
| m2m | End user interface | Many to many | Pick a source, then a display. Or drag a source onto a display. All sends one source to every display. |
| settings | Settings | Help is built in | The user manual, the quick start and a factory reset, all on the Settings page. |
| close | — | **CTRLbot IoT** (Audiowide) | Set up the room, then hand it over. |

## Narration clips

Source ranges in seconds on the prepared track, from `words.json`: each starts ~0.1s before
its first word; **T13 refines every end** to ~0.25s after the last word's `end`, never past
the next word's start (Whisper's ends run early — W01 and W02 did the same). Placement is a
rule, not a table: in each beat the first clip plays at the beat's start + 0.25s, and each
next clip at the previous clip's end + 0.2s. Every beat's seconds leave room for its clips.

| beat | clips (source ranges) | what is said |
|------|-----------------------|--------------|
| open | 1.2–10.3 | Welcome to CTRLbot … CTRLbot IoT, the Android app available for phone and tablets. |
| first-run | 12.7–20.6, 21.4–28.6 | When you first open up the app … set it up for control. You can X out of this anytime … if you need to. |
| ai | 28.6–33.5, 33.9–39.1, 39.3–46.6 | The first thing you see is our CTRLbot AI. This is a walking, talking manual and troubleshooter. It'll help you with setting up control and any issues … |
| database | 48.3–52.3, 53.2–55.3, 57.2–61.6, 61.9–67.1, 68.8–76.8 | It really begins with our device driver database. We have an extensive database · thousands of commands, control devices through IP, or with an endpoint … RS-232 or IR. Endpoints sit on the network … serial or infrared. |
| epson | 78.0–80.9, 83.1–88.6, 88.6–94.1 | Let's start by just adding a simple projector. When I select Epson … specs, setup, support. If you want to look at the product page … click on this link |
| add | 101.9–107.6, 112.9–115.9 | Simply press the plus button … enter in the IP address. Once I'm connected, it automatically saves this connection. |
| terminal | 116.5–123.7, 123.7–130.9 | I can do some testing here … the terminal shows that right there. If I needed to send something directly … put in a message. |
| test | 135.4–138.8, 139.3–143.8, 144.0–154.7 | Xing out of this saves that connection. And then you can come in and do more testing … the device webpage if it has one. |
| activities | 160.8–162.8, 163.8–172.4, 173.4–181.9 | Next, let's go to activities. Activities are where you set up … And this builds itself … the Epson power light power on command. |
| switch-audio | 183.6–193.6, 193.7–200.0 | And the same with switcher … and the same for audio, right? If you need to do any customization … straight to the end user interface. |
| eui | 201.5–204.6, 204.6–219.2, 219.6–226.4 | This is where you control the room. The person that walks in … Epson projector screen. They can manipulate the audio … power the room off or on. |
| exit | 230.2–238.4 | If you need to make changes just press and hold the setup button … back to these setup menus. |
| discovery | 242.0–247.8, 248.9–260.6 | I'd like to show you a new feature it's called device discovery. Basically it goes out and scans the network … device driver library. |
| matrox-add | 262.2–270.9, 285.6–293.5, 293.5–304.1 | So let's go ahead and add some endpoints from Matrox. These are IPMX encoders and decoders, · what's happening behind the scenes … saving it, right? And if you needed to approve any certs … prompt you for those things. |
| matrox-test | 310.4–313.9, 317.4–326.6, 327.2–332.0 | Now that we've added them, we can come into the connect menu … select the whole Matrox … the whole switcher here. At any point … select them right here. |
| matrox-switch | 333.3–341.6, 342.9–346.9, 346.8–350.5 | Again, we can come into activities … encoders and decoders. And here we are … all set up. If I wanted to change the icon or the label, I would do that right here. |
| m2m | 351.6–353.3, 354.3–361.5, 362.1–368.1, 372.8–376.6, 377.8–384.3 | Let's go to the end user interface. Oh, you can see now … many to many. And I can change these … selecting a display. I can also drag and drop these in like that. Also, if you select a source … all the displays. |
| settings | 390.8–395.0, 396.2–406.1 | If I want to make any changes, I'll just press the Setup button. And then if I wanted to … from the Settings page. |
| close | 409.2–410.4, 411.1–412.6 | Thank you for your time. I hope this was informative. |

Cut on purpose: "with hundreds of manufacturers" (53–57s), the IPMX "universal control
protocol" aside (271–278s), the first "drag and drop, oops" (369–372s), and "you can
always come back in here and edit the connections" (155–159s).

## Executor instructions

**Executor: Gemini 3.8 Flash, High reasoning.** Codex coordinates the approved W02–W05 run and takes over a worker only when Gemini is unavailable. Run one assigned pending task per fresh context in this checkout. Pending revision: T23–T31; never redo checked tasks.

1. Read `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`, this brief, and the relevant installed Remotion skill before composition code. W01's current source in `src/marketing/mirror-walkthrough/` and `src/marketing/WalkthroughShell.tsx` are the worked example.
2. **Dependencies:** T20–T22 are independent and ready now. T23 needs W02 T17. T24 needs T20–T23; T25–T31 run in order.
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
> **Per-task check:** `npm run check` and `npm run video:lint`. A surface task (T4–T12)
> also renders its proof still — `npm run still -- Proof-Phone-<Name> out/_<name>.png` —
> and holds it beside the reference frame the task names. A beat task renders
> `npm run video:frames -- iot-phone-walkthrough contact --beat=<beat>` for each of its
> beats (portrait: prefix `VIDEO_COMPOSITION=iot-phone-walkthrough-portrait`) and holds each
> against its evidence line. A still renders in seconds; one over two minutes is blocked.
>
> **A surface is built the house way:** geometry from the named layout XML and
> `tokens.generated.ts` (never a hex the app does not define), fonts as the app uses them,
> `device: 'phone'` accepted, state entirely through props, no time inside it. Register its
> proof as a `<Still id="Proof-Phone-<Name>">` at 360x780 in `src/Root.tsx`, beside the
> existing `Proof-*` stills.

### Shared

- [x] T1: Correct `ingest/iot-phone-walkthrough/transcript.md` against `ingest/iot-phone-walkthrough/contact.html` and mark it `Status: corrected 2026-09-30` — files: ingest/iot-phone-walkthrough/transcript.md
  - Product names and terms only: "ControlBot AI" → CTRLbot AI, "RS -232" → RS-232, "Matrox", "IPMX", "Epson PowerLite", and anything else the stills contradict. Keep filler and false starts; change no timestamp; never edit the JSON files.
- [x] T2: Raise `social-walkthrough`'s ceiling to 360s, and let `PortraitStage` fit a surface too tall for the width — files: src/destinations.ts, src/marketing/PortraitStage.tsx
  - In `SOCIAL_WALKTHROUGH` set `duration.max` to 360 and say why in its comment: a long tutorial is kept whole, and trimmed cuts for X and Shorts come from the same beats.
  - In `portraitLayout`: when the width-bound panel would leave the copy less than 360px, the panel takes the height that leaves exactly 360px and its width follows the aspect, centred. W01 and W02 must not move: their surfaces are wide, so the new branch never runs for them — confirm `mirror-walkthrough-portrait` and `terminator-walkthrough-portrait` stills at frame 300 look as before.
- [x] T3: Let a caption correction with an empty replacement drop the word — files: src/audio/narrationCaptions.ts
  - `{RS: 'RS-232', '-232': ''}` then reads "RS-232". Verify W01 and W02 unchanged: regenerate both .srt files to `out/_w01.srt` and `out/_w02.srt` and `git diff --no-index` each against the one in `out/` shows nothing.

### New phone surfaces — in `src/app-ui/`, for reuse

- [x] T4: Build `FirstRunEducation` from `layout/dialog_first_run_education.xml`: the walkthrough card over the setup screen, its step and ✕ as props — files: src/app-ui/FirstRunEducation.tsx, src/Root.tsx
  - Reference frames: `f_0003.jpg`–`f_0007.jpg`.
- [x] T5: Build `ConnectTest` from `layout/menu_connections.xml`, `driver_connection.xml`, `layout-port/remotes_test.xml` and `layout-port/av_sw_remote_nx1.xml`: the Device Driver Connections / Test Device Drivers tabs, the Buttons, Switcher, Terminal and Web page tab bar, and the Buttons and single-output Switcher tabs — files: src/app-ui/ConnectTest.tsx, src/Root.tsx
  - Terminal tab reuses `ConnectionPanel`'s terminal colours and `TerminalLine`; Web page tab shows the app's web view chrome over an empty page. Reference frames: `f_0021.jpg`–`f_0024.jpg`, `f_0041.jpg`.
- [x] T6: Add the multi-output Switcher tab to `ConnectTest` from `layout-port/av_sw_remote_nxo.xml`, with the system and single-device selection shown for Matrox — files: src/app-ui/ConnectTest.tsx
  - Outputs and inputs are props (`CONVERTIP RX 1–4` over `CONVERTIP TX 1–4`); a selected output is yellow as in the recording. Reference frames: `f_0042.jpg`–`f_0044.jpg`.
- [x] T7: Build `ProductWebView` from `layout/fragment_product_web_view.xml` — back, title, address, reload and open — over an empty, loading page — files: src/app-ui/ProductWebView.tsx, src/Root.tsx
  - Reference frames: `f_0013.jpg`, `f_0014.jpg`. Draw no website content.
- [x] T8: Build `ActivitiesPresets` from `layout/menu_activity.xml`, `preset_list.xml`, `preset_card.xml`, `preset_edit.xml` and `layout-port/preset_command_card.xml`: the Presets / Switch / Audio tabs, the preset list, and a preset opened with its commands — files: src/app-ui/ActivitiesPresets.tsx, src/Root.tsx
  - Reference frames: `f_0025.jpg`–`f_0027.jpg`, `f_0033.jpg`.
- [x] T9: Build `ActivitiesSwitch` from `layout/switching_type.xml`, `switching_many_to_one.xml`, `layout-port/switching_end_point.xml`, `item_switching_ep_encoder.xml` and `item_switching_ep_decoder.xml`: the switch-type picker, many-to-one on one device, and AVoIP encoders and decoders — files: src/app-ui/ActivitiesSwitch.tsx, src/Root.tsx
  - Reference frames: `f_0046.jpg`–`f_0049.jpg`.
- [x] T10: Build `ActivitiesAudio` from `layout/audio.xml` and `item_audio_control_mapping.xml`: the audio device, volume range and the volume up, down and set mappings — files: src/app-ui/ActivitiesAudio.tsx, src/Root.tsx
  - Reference frames: `f_0028.jpg`, `f_0029.jpg`.
- [x] T11: Build `DiscoverDevices` from `layout-port/fragment_discover_devices.xml` and `item_discovered_device.xml`: the found-count header, rows with name, IP, driver match and Add driver, and a row's Added state — files: src/app-ui/DiscoverDevices.tsx, src/Root.tsx
  - Device rows come from the recording's own stills (`f_0035.jpg`–`f_0040.jpg`): private IPs only. Put the row data in a `discoverData.ts` beside it only if the component file passes 400 lines.
- [x] T12: Build `SettingsSupport` from `layout-port/menu_set.xml`: Support with User Manual, Quick Start, Factory Reset and Database Management — files: src/app-ui/SettingsSupport.tsx, src/Root.tsx
  - Reference frames: `f_0057.jpg`–`f_0059.jpg`.
- [x] T13: Add to `PhoneEui` the drag of a source onto an output and the "Keep holding to return to Setup" hint — files: src/app-ui/PhoneEui.tsx
  - Both optional props; absent means today's render, so `First-Run-Phone` and every `PhoneEui` proof are unchanged. Hint from `layout-port/_end_ui.xml`; reference frames `f_0054.jpg`, `f_0055.jpg`.

### W03

- [x] T14: Create the beat table, copy, camera and narration — files: src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughData.ts, src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts
  - `BEATS` in frames from the Beats table's seconds × 30, in order (total 9990 frames, 333s); `COPY` from the Copy table; `SUBJECT` per beat (`top`, `middle` or `bottom` third of the phone, whichever holds the beat's evidence); `beatShots()` from wide (1.04) to a 0.62 push on the subject by mid-beat and back.
  - Narration: `IOT_PHONE_NARRATION_SOURCE`, `IOT_PHONE_NARRATION_CLIPS` from the Narration clips table, with every end refined against `words.json` word ends and each `at` from the placement rule, and `IOT_PHONE_CAPTION_CORRECTIONS` = `{ControlBot: 'CTRLbot', RS: 'RS-232', '-232': ''}`. Only `import type`.
- [x] T15: Build beats `open` to `terminal` in `IotPhoneBeats.tsx`, each a component of `{frame, frames}` in a `BEAT_RENDERERS` map — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [x] T16: Build beats `test` to `exit` in `IotPhoneBeats.tsx` — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [x] T17: Build beats `discovery` to `close` in `IotPhoneBeats.tsx` — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [x] T18: Build both compositions and register them — files: src/marketing/iot-phone-walkthrough/IotPhoneWalkthrough.tsx, src/Root.tsx
  - On the pattern of W01's `MirrorWalkthrough.tsx`: one `Walkthrough({format})`; landscape `<Stage>` with `panelHeight={900}` and the phone's aspect; portrait `<PortraitStage>` with `<NarrationCaptions>` (captions from `captionsFromClips(clips, words, IOT_PHONE_CAPTION_CORRECTIONS)`); `<NarrationTrack>` in both; `<PromoPreload />` (the phone surfaces draw CSS images); copy through `<WalkthroughCopy>` with `at={-40}` on open. Register `iot-phone-walkthrough` (1920x1080) and `iot-phone-walkthrough-portrait` (1080x1920) in a `<Folder name="CTRLbot-IoT-Walkthrough">`, metadata inline.
  - Verify: `npm run video:frames -- iot-phone-walkthrough validate`; both contact sheets, every still against its evidence line; a half-scale inert check on the portrait (`--scale=0.5 --crf=28`, then `video:frames … check` with `VIDEO_COMPOSITION`) under 60%.
  - T15–T17 render their stills only once T18 has registered the composition: until then their check is `npm run check` and `npm run video:lint`, and T18 renders every beat.
- [x] T19: Run the feature gates on both shapes, render both, write the .srt, and record the results here — files: videos/iot-phone-walkthrough.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough`; render `iot-phone-walkthrough` → `out/iot-phone-walkthrough.mp4` and `iot-phone-walkthrough-portrait` → `out/iot-phone-walkthrough-portrait.mp4` (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both; `npm run narration:check` on both; `npm run narration:srt -- src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts IOT_PHONE_NARRATION_CLIPS iot-phone-walkthrough out/iot-phone-walkthrough.srt --corrections=IOT_PHONE_CAPTION_CORRECTIONS`, then confirm no `ControlBot`, no `RS -232` and no one-word captions. Confirm every file exists.
  - Runs straight after T18 with no approval stop. Does not mark the video done: Nathan reviews both renders, and his notes come back as new tasks.

### Revision 2 · 2026-10-01 — the hybrid format, phone full frame

From the 2026-10-01 review (`out/REVIEW-2026-10-01.md`).

What the review found in revision 1:
- 29 of 50 clip ends stop while the voice is still sounding. "comm—" at 2:30, "these
  setup—" at 3:21 and "device driver—" at 3:40 are audible.
- A repeated fragment at 4:41.
- The caption drops an audible "here" at 4:44.
- The phone is about 33% of portrait frame width.
- Copy runs under the phone at 1:16, 2:39, 3:48 and 4:02.
- Pushes cut off the start of labels ("VER ON").
- The power state comes back on without a power-on.
- No reuse of the approved First-Run scenes the roadmap asks for.

**Needs:** `videos/archive/2026-10-02-mirror-walkthrough-r2.md` T1–T7 `[x]`, Nathan's review of W01's revision 2,
and W02 T17 before T23; region-map tasks can start now.

**Read before any revision 2 task:** "What W01's revision 2 taught" in
`docs/NARRATED-WALKTHROUGH.md`. It covers clip hard edges, the voice check's false alarms,
the shell's drift, and cue-timed `shots` rather than `regions`.

**Scope.**
- **Outcome:** both W03 renders rebuilt on the shared pieces, with the phone full frame. The
  approved First-Run phone framing and annotations are reused wherever the app has not
  changed, and every clipped word is fixed.
- **In scope:** region maps for the eight surfaces W03 built (for both device layouts, so
  W04 reuses them), the re-planned edit, beat data, both compositions, 20 beats, the renders.
- **Out of scope:**
  - The First-Run cuts themselves.
  - A trimmed cut for X or Shorts.
  - Footage, and diagrams (deferred).
- **Must preserve:**
  - Every surface's default render and every `Proof-*` still.
  - `First-Run-*`, W01, W02 and W04 (until its own revision).
  - `video input/` and the ingest's JSON.
  - Gate thresholds.

**Copy (revision 2).**
- The cards: `open` is lockup **CTRLbot IoT** with line "Set up and run a whole room from an
  Android phone." `close` is lockup **CTRLbot IoT** with line "Set up the room, then hand it
  over."
- `proof` (stage): eyebrow "End user interface", title "One tap, and it is there".
- Every chapter keeps the eyebrow and title from the Copy table above, as a step label with
  no body. Only `database` keeps its body, because it states the manual's numbers the voice
  no longer says.

**Narration (revision 2).** The Narration clips table, with these changes:
- `welcome` runs from `open` into `proof`; the cut lands on "CTRLbot IoT".
- `act-power-on` ends 182.7 (after "command.").
- `exit-hold` ends 239.1 (after "menus.").
- `discovery-scan` ends 261.3 (after "library.").
- The two matrox-add clips 285.6–293.5 and 293.5–304.1 become one, 285.6–304.1.
- `matrox-switch-setup` ends 346.85 (after "up."), and `matrox-switch-labels` is
  346.9–351.0, ending after "here."

Corrections stay `IOT_PHONE_CAPTION_CORRECTIONS`. Placement and holds follow W01's rule.

**Shot list (revision 2).**
- **Regions:** from the surfaces' region maps (T20–T22 add the missing ones).
- **Cues:** `cueFrame` words.
- **First-Run reuse:** where a row names a First-Run scene, port that scene's shots and its
  Spotlight, FocusRing and TapIndicator choices, retimed to the cues.

| beat | First-Run source | cue → action → result |
|------|------------------|-----------------------|
| proof | `EuiHandoff` (switch one display) | welcome "app" → a source tapped, the display fills |
| first-run | `CtrlbotIntro` (four menus) | first-run "walkthrough" → the tour steps · "X" → ✕ tapped, the tour closes |
| ai | `CtrlbotIntro` (manual, plain language) | ai "AI" → the question list · "troubleshooter" → a question tapped · "issues" → the answer lands |
| database | `DeviceSetup` (setup starts here, find your equipment) | database "database" → the catalog scrolls · "endpoint" → the filter opens |
| epson | — | epson "Epson" → Epson tapped, detail · "link" → link ringed and tapped, the web view loads for at most 2s |
| add | `DeviceSetup` (+), `ConnectAndTest` (address, connect) | add "plus" → + tapped · "IP" → field ringed and filled · "connected" → Disconnect, saved |
| terminal | `ConnectAndTest` (send a safe command) | terminal "buttons" → Power On tapped, the line lands · "terminal" → terminal ringed · "message" → a typed command sent |
| test | — | test "buttons", "switcher", "terminal", "webpage" → each tab tapped on its word; the Web page tab held under 2s |
| activities | `BuildRoom` (open Activities, build the room) | activities "activities" → Activities · "builds" → Presets · "command" → the Power On command ringed |
| switch-audio | `BuildRoom` | switch-audio "switcher" → Switch ringed · "audio" → Audio ringed |
| eui | `EuiHandoff` (one screen, switch one display) | eui "turn" → power tapped · "sources" → a source tapped for the screen · "audio" → the volume moves · "off" → Powering Off, then Welcome |
| exit | `EuiHandoff` (press and hold to return) | exit-hold "hold" → the hold ring fills over 2s on Welcome · "setup" (second) → the setup menu returns |
| discovery | — | discovery-intro "discovery" → Discover Devices · discovery-scan "scans" → the count climbs · "library" → a driver match ringed |
| matrox-add | — | "Matrox" → the rows · "adding" → Add tapped · "saving" → Added. No certificate dialog is shown: the recording never shows one |
| matrox-test | — | "connect" → the Connect menu · "Matrox" (second) → the whole system selected · "individual" → one decoder tapped |
| matrox-switch | `BuildRoom` (switching) | "activities" → Activities · "encoders" → the switch type changes, the lists fill · "label" → the icon and label control ringed |
| m2m | `EuiHandoff` (route across displays) | "many" → four displays · "source" then "display" → tapped in turn · "drag" → a drag onto a display · "all" → All tapped |
| settings | — | settings "Setup" → the setup button · "Manual" → User Manual ringed · "Quick" → Quick Start ringed · "factory" → Factory Reset ringed |

- [x] T20: Add region maps for `ConnectTest`, `DiscoverDevices` and `ProductWebView`, phone and tablet, derived from each surface's own layout constants — files: src/app-ui/ConnectTest.tsx, src/app-ui/DiscoverDevices.tsx, src/app-ui/ProductWebView.tsx
  - Follow `connectionRegions(device)`. Every region the Shot list names for these surfaces: tabs, the device list, switcher outputs and inputs, terminal lines, discovered rows and their Add, the address bar.
  - Verify: `npm run check`; their `Proof-*` stills look as before.
- [x] T21: Add region maps for `ActivitiesPresets`, `ActivitiesSwitch` and `ActivitiesAudio`, phone and tablet — files: src/app-ui/ActivitiesPresets.tsx, src/app-ui/ActivitiesSwitch.tsx, src/app-ui/ActivitiesAudio.tsx
- [x] T22: Add region maps for `FirstRunEducation` and `SettingsSupport`, phone and tablet — files: src/app-ui/FirstRunEducation.tsx, src/app-ui/SettingsSupport.tsx
- [ ] T23: Re-plan W03's edit with `narration:edit` and the changes above — files: src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts, src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.generated.ts, public/narration/iot-phone-walkthrough/edit.m4a
  - Two builds at most to set the `at`s. A beat that cannot keep its 1.0s hold inside its Sec is `[!]` with the measured lengths.
  - Then `npm run narration:verify` on `edit.m4a` (W02's T17). Fix each real edge leak with `notBefore` / `notAfter` or a tighter `sourceEnd` (the contract's "Clip edges leak"), at most two more builds. A leak that remains goes in the Review notes with its clip and level.
- [ ] T24: Rewrite W03's beat data for the shell: beats and layouts, the revision 2 copy, regions and cue frames — files: src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughData.ts
  - 10080 frames in total. `DriverCatalog` callers opt into the app's blue wash (Roadmap, Deferred). `beatShots()` is removed.
  - Every region change the Shot list ties to a word is a `shots` entry with `at` from `cueFrame`, relative to the beat. Use `regions` arrays only for untimed changes, because they split the beat evenly. Add no hold keyframes: the shell drifts.
- [ ] T25: Rebuild both W03 compositions on `WalkthroughShell` at 10080 frames, chapters showing their revision 1 state until T26–T30 — files: src/marketing/iot-phone-walkthrough/IotPhoneWalkthrough.tsx, src/Root.tsx
- [ ] T26: Build the proof, first-run, ai and database beats to the Shot list — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T27: Build the epson, add, terminal and test beats to the Shot list — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T28: Build the activities, switch-audio, eui and exit beats to the Shot list, the power state continuous from eui into exit — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T29: Build the discovery, matrox-add, matrox-test and matrox-switch beats to the Shot list — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T30: Build the m2m and settings beats to the Shot list — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T31: Run the feature gates on both shapes, render both, write the .srt from the edit, check the voice, and record the results here — files: videos/iot-phone-walkthrough.md
  - As W01's T15, with `--corrections=IOT_PHONE_CAPTION_CORRECTIONS` and `--destination=social-walkthrough`.
  - The voice check is `npm run narration:verify` on the landscape render. It is `[!]` only when it exits 1; every other difference is a Review note. The words named in the next line are checked in its output, and against the audio level when Whisper misses one.
  - The voice check must hear "command", "menus", "library" and "here" whole, and no repeated fragment at 4:41.
  - Regression: `First-Run-Phone` and the `Proof-*` stills of T20–T22's surfaces look as before.

## Deferred

- Tablet versions of the seven new surfaces — W04 builds them on the same components.
- Trimmed cuts for X (2:20) and YouTube Shorts (3:00), from these beats.
- The First-Run quick-start cuts, moved to v1.1.

## Handoff

- **Pending revision:** T23–T31.
- **Dependencies:** T20–T22 are independent and ready now. T23 needs W02 T17. T24 needs T20–T23; T25–T31 run in order.
- **Dispatch:** one task at a time through Codex; independent verification and scoped commit release its owned files. Final rendering waits for the shared render slot.
- **Blocked:** no known implementation blocker; task dependencies still apply.

## Review notes

- T22, 2026-10-02: Independent Claude verifier PASS WITH NOTES after first repair. Frozen check/lint pass, four defaults SHA256-identical; phone/tablet tour steps/offset, Settings scroll/restored and tablet reset-dialog targets visually aligned. Notes: tablet documentation highlight width is slightly narrow; phone dialog/toast/snackbar not exercised. Evidence: out/coordinator/t22-round1-review.txt and t22-round1/.

- T21, 2026-10-02: Independent PASS WITH NOTES after one repair. Frozen check/lint pass; six default proofs SHA256-identical. Audio targets align in both shapes and mixed four-row states; encoder icon/label aligns. Secondary preset offset 2–3px remains a lenient note. Evidence: out/coordinator/t21-round1/ and t7-t21-round1-review.txt.

- T20, 2026-10-02: Independent final PASS WITH NOTES after two repairs. Frozen check/lint pass; six default proof PNGs are SHA256-identical to baseline. Four terminal/switcher variants visually checked; maps follow line count/bottom alignment and full-width single-tab state. Discovery labels use broad containers. Evidence: out/coordinator/t20-final/.

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

- T19, 2026-09-30: `npm run check` OK; `video:lint` 0 errors against `social-walkthrough`
  and general (63 files, 0 errors, 0 warnings); `validate` 19 beats, 333s, no problems.
  Landscape `out/iot-phone-walkthrough.mp4` (62.5 MB) 26% inert (< 60%), median content area 100%,
  no problems. Portrait `out/iot-phone-walkthrough-portrait.mp4` (61.3 MB) 29% inert (< 60%),
  median content area 100%, no problems.
- Audio: `npm run narration:check` passed on both renders: 333.00s duration, -13.52 LUFS
  integrated loudness, -1.32 dBTP true peak (target: -14 ± 1 LUFS, < -1 dBTP).
- Captions: `out/iot-phone-walkthrough.srt` has 137 captions, 805 words from 50 clips;
  verified 0 occurrences of `ControlBot`, 0 `RS -232`, and 0 one-word captions.
- Framing: Beat `open` holds wide (`whole`, 1.04) throughout its 13.6s duration so frame 0
  matches where `open` settles (drift 0.0 vs limit 8), satisfying `OPENS_COMPOSED` and
  presenting the phone EUI truly at rest per its evidence line; subsequent beats push to 0.62
  on their subjects.
- Deliverables: Contact sheets at `out/iot-phone-walkthrough/contact.html` and
  `out/iot-phone-walkthrough-portrait/contact.html`. Both video renders and .srt confirmed.
  Pre-existing W01 and W02 .srt files unchanged.

## Contact sheet

> `npm run video:frames -- iot-phone-walkthrough contact` renders one still per beat, and
> with `VIDEO_COMPOSITION=iot-phone-walkthrough-portrait` the portrait sheet. Mark each
> ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
