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

## Beats

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| open | Room control from the phone | `PhoneEui` | The phone EUI at rest, one projector output and its sources; the copy shows the CTRLbot IoT headline | 11 |
| first-run | A short tour opens the first time | `FirstRunEducation` | The first-run walkthrough over the setup screen steps forward, then its ✕ closes it | 16.5 |
| ai | CTRLbot AI is a manual that answers | `CtrlbotAi` | CTRLbot AI's question list; one question is picked and its answer lands | 18.5 |
| database | Everything starts with a driver | `DriverCatalog` | The catalog scrolls; the category filter opens on Projector, Display, Switchers, End Points | 25 |
| epson | Every driver carries its device's details | `DriverDetail` | Epson PowerLite's page: device info, specs, setup, support; the product-page link is ringed, then the app's web view opens on the manufacturer page loading | 15 |
| add | Add it, enter the IP, and it saves itself | `ConnectionPanel` | + is pressed, the IP is entered, Connect goes to Disconnect and the connection shows as saved | 9.5 |
| terminal | Test commands and see every byte | `ConnectionPanel` | Power On and Power Off are sent and each lands in the terminal; a typed command is sent | 15.5 |
| test | Test it as a remote | `ConnectTest` | Test Device Drivers: the tab bar walks Buttons (power, D-pad), Switcher (Out 1 over the inputs), Terminal and Web page | 20 |
| activities | The room builds itself | `ActivitiesPresets` | Presets lists Power On and Power Off; Power On opens with the Epson's power-on command already in it | 20 |
| switch-audio | Switching and audio are already set | `ActivitiesSwitch` + `ActivitiesAudio` | Switch shows many-to-one on the Epson; Audio shows the Epson's volume up, down and set mapped | 17.5 |
| eui | The end user gets the room, not the settings | `EuiPower` + `PhoneEui` | Welcome, power pressed; a source is picked for the screen, the volume moves, then Powering Off | 25.5 |
| exit | Press and hold to get back to setup | `PhoneEui` | The setup button is held; "Keep holding to return to Setup" shows; the setup menu returns | 9 |
| discovery | Find Devices scans the network | `DiscoverDevices` | Discover Devices counts up as devices are found; each row shows its driver match or Add driver | 18.5 |
| matrox-add | Add a whole AV-over-IP system in one go | `DiscoverDevices` | Matrox ConvertIP rows are added one after another; each ends Added | 28.5 |
| matrox-test | Test the whole Matrox system as one switcher | `ConnectTest` | The Matrox system is selected: four decoders over four encoders; a decoder takes an encoder | 18.5 |
| matrox-switch | Encoders and decoders, set up for the room | `ActivitiesSwitch` | Switch type goes to AVoIP Encoders/Decoders; the encoder and decoder lists fill | 17 |
| m2m | Many to many, by tap, drag or All | `PhoneEui` | Four displays: a source tapped then a display; a source dragged onto a display; All sends one source to every display | 26.5 |
| settings | Help is built in | `SettingsSupport` | Settings → Support: User Manual, Quick Start, Factory Reset | 15 |
| close | The name, once, at the end | `PhoneEui` | The EUI at rest; the copy shows the CTRLbot IoT headline | 6 |

## Anything unusual

- **Everything, condensed: 5:33.** Every feature the recording covers is kept; only
  repetition is cut. That is over two limits, knowingly: X's 2:20 without Premium, and
  YouTube's 3:00 for a Short. The portrait cut goes to TikTok and LinkedIn and posts to
  YouTube as a regular vertical video. Trimmed cuts for X and Shorts come later, from the
  same beats. T2 raises `social-walkthrough`'s ceiling to 360s so the brief validates.
- **Built like W01 and W02.** `videos/archive/2026-09-30-mirror-walkthrough.md`,
  `src/marketing/mirror-walkthrough/` and `src/marketing/terminator-walkthrough/` are the
  worked examples. Copy their structure; never import from another video's folder.
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
- **The phone is tall, so the camera works harder.** A phone surface is 360x780dp: in
  landscape its panel is 900px tall, in portrait it fits between the copy and the captions
  (T2). Each beat opens on the whole phone and pushes to 0.62 on its subject, then returns.

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

**Paste this to the executor:** *Run `videos/iot-phone-walkthrough.md` in this checkout,
following its "Executor instructions" section.*

**Executor: Gemini 3.8 Flash, High reasoning.** Work in the current checkout on `main`; no
branch, no worktree.

1. **Read first:** `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`,
   `.claude/commands/video-run.md`, and this whole brief. Then the worked examples:
   `videos/archive/2026-09-30-mirror-walkthrough.md`, `videos/terminator-walkthrough.md`,
   `src/marketing/mirror-walkthrough/` and `src/marketing/terminator-walkthrough/`. For a
   surface task, also read one existing surface built the same way —
   `src/app-ui/ConnectionPanel.tsx` or `src/app-ui/DriverCatalog.tsx` — and the app
   layouts the task names.
2. **Run T1 to T19 in order.** For each: resume any uncommitted work first; implement
   exactly the task in its named files, with this brief's copy and clips verbatim; run the
   per-task check and look at every still; on PASS mark `[x]`, stage only the task's files
   plus this brief, and commit `Tn: <summary>` with the repository's Co-Authored-By line
   before reading the next task. FAIL only for a lint error, a broken check, or a still
   that plainly is not its evidence line or its reference frame; anything else is a Review
   note.
3. **No approval stops** between tasks or before the renders.
4. **Acceptance:** T1–T19 `[x]`, one commit each; both renders exist and pass
   `video:frames … check` under 60% and `narration:check`; the .srt has no `ControlBot`, no
   `RS -232` and no one-word captions; `video:lint` 0 errors for both destinations; every
   `Proof-*` still that existed before looks as before; W01's and W02's .srt unchanged.
   Then stop testing.
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

- [ ] T1: Correct `ingest/iot-phone-walkthrough/transcript.md` against `ingest/iot-phone-walkthrough/contact.html` and mark it `Status: corrected 2026-09-30` — files: ingest/iot-phone-walkthrough/transcript.md
  - Product names and terms only: "ControlBot AI" → CTRLbot AI, "RS -232" → RS-232, "Matrox", "IPMX", "Epson PowerLite", and anything else the stills contradict. Keep filler and false starts; change no timestamp; never edit the JSON files.
- [ ] T2: Raise `social-walkthrough`'s ceiling to 360s, and let `PortraitStage` fit a surface too tall for the width — files: src/destinations.ts, src/marketing/PortraitStage.tsx
  - In `SOCIAL_WALKTHROUGH` set `duration.max` to 360 and say why in its comment: a long tutorial is kept whole, and trimmed cuts for X and Shorts come from the same beats.
  - In `portraitLayout`: when the width-bound panel would leave the copy less than 360px, the panel takes the height that leaves exactly 360px and its width follows the aspect, centred. W01 and W02 must not move: their surfaces are wide, so the new branch never runs for them — confirm `mirror-walkthrough-portrait` and `terminator-walkthrough-portrait` stills at frame 300 look as before.
- [ ] T3: Let a caption correction with an empty replacement drop the word — files: src/audio/narrationCaptions.ts
  - `{RS: 'RS-232', '-232': ''}` then reads "RS-232". Verify W01 and W02 unchanged: regenerate both .srt files to `out/_w01.srt` and `out/_w02.srt` and `git diff --no-index` each against the one in `out/` shows nothing.

### New phone surfaces — in `src/app-ui/`, for reuse

- [ ] T4: Build `FirstRunEducation` from `layout/dialog_first_run_education.xml`: the walkthrough card over the setup screen, its step and ✕ as props — files: src/app-ui/FirstRunEducation.tsx, src/Root.tsx
  - Reference frames: `f_0003.jpg`–`f_0007.jpg`.
- [ ] T5: Build `ConnectTest` from `layout/menu_connections.xml`, `driver_connection.xml`, `layout-port/remotes_test.xml` and `layout-port/av_sw_remote_nx1.xml`: the Device Driver Connections / Test Device Drivers tabs, the Buttons, Switcher, Terminal and Web page tab bar, and the Buttons and single-output Switcher tabs — files: src/app-ui/ConnectTest.tsx, src/Root.tsx
  - Terminal tab reuses `ConnectionPanel`'s terminal colours and `TerminalLine`; Web page tab shows the app's web view chrome over an empty page. Reference frames: `f_0021.jpg`–`f_0024.jpg`, `f_0041.jpg`.
- [ ] T6: Add the multi-output Switcher tab to `ConnectTest` from `layout-port/av_sw_remote_nxo.xml`, with the system and single-device selection shown for Matrox — files: src/app-ui/ConnectTest.tsx
  - Outputs and inputs are props (`CONVERTIP RX 1–4` over `CONVERTIP TX 1–4`); a selected output is yellow as in the recording. Reference frames: `f_0042.jpg`–`f_0044.jpg`.
- [ ] T7: Build `ProductWebView` from `layout/fragment_product_web_view.xml` — back, title, address, reload and open — over an empty, loading page — files: src/app-ui/ProductWebView.tsx, src/Root.tsx
  - Reference frames: `f_0013.jpg`, `f_0014.jpg`. Draw no website content.
- [ ] T8: Build `ActivitiesPresets` from `layout/menu_activity.xml`, `preset_list.xml`, `preset_card.xml`, `preset_edit.xml` and `layout-port/preset_command_card.xml`: the Presets / Switch / Audio tabs, the preset list, and a preset opened with its commands — files: src/app-ui/ActivitiesPresets.tsx, src/Root.tsx
  - Reference frames: `f_0025.jpg`–`f_0027.jpg`, `f_0033.jpg`.
- [ ] T9: Build `ActivitiesSwitch` from `layout/switching_type.xml`, `switching_many_to_one.xml`, `layout-port/switching_end_point.xml`, `item_switching_ep_encoder.xml` and `item_switching_ep_decoder.xml`: the switch-type picker, many-to-one on one device, and AVoIP encoders and decoders — files: src/app-ui/ActivitiesSwitch.tsx, src/Root.tsx
  - Reference frames: `f_0046.jpg`–`f_0049.jpg`.
- [ ] T10: Build `ActivitiesAudio` from `layout/audio.xml` and `item_audio_control_mapping.xml`: the audio device, volume range and the volume up, down and set mappings — files: src/app-ui/ActivitiesAudio.tsx, src/Root.tsx
  - Reference frames: `f_0028.jpg`, `f_0029.jpg`.
- [ ] T11: Build `DiscoverDevices` from `layout-port/fragment_discover_devices.xml` and `item_discovered_device.xml`: the found-count header, rows with name, IP, driver match and Add driver, and a row's Added state — files: src/app-ui/DiscoverDevices.tsx, src/Root.tsx
  - Device rows come from the recording's own stills (`f_0035.jpg`–`f_0040.jpg`): private IPs only. Put the row data in a `discoverData.ts` beside it only if the component file passes 400 lines.
- [ ] T12: Build `SettingsSupport` from `layout-port/menu_set.xml`: Support with User Manual, Quick Start, Factory Reset and Database Management — files: src/app-ui/SettingsSupport.tsx, src/Root.tsx
  - Reference frames: `f_0057.jpg`–`f_0059.jpg`.
- [ ] T13: Add to `PhoneEui` the drag of a source onto an output and the "Keep holding to return to Setup" hint — files: src/app-ui/PhoneEui.tsx
  - Both optional props; absent means today's render, so `First-Run-Phone` and every `PhoneEui` proof are unchanged. Hint from `layout-port/_end_ui.xml`; reference frames `f_0054.jpg`, `f_0055.jpg`.

### W03

- [ ] T14: Create the beat table, copy, camera and narration — files: src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughData.ts, src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts
  - `BEATS` in frames from the Beats table's seconds × 30, in order (total 9990 frames, 333s); `COPY` from the Copy table; `SUBJECT` per beat (`top`, `middle` or `bottom` third of the phone, whichever holds the beat's evidence); `beatShots()` from wide (1.04) to a 0.62 push on the subject by mid-beat and back.
  - Narration: `IOT_PHONE_NARRATION_SOURCE`, `IOT_PHONE_NARRATION_CLIPS` from the Narration clips table, with every end refined against `words.json` word ends and each `at` from the placement rule, and `IOT_PHONE_CAPTION_CORRECTIONS` = `{ControlBot: 'CTRLbot', RS: 'RS-232', '-232': ''}`. Only `import type`.
- [ ] T15: Build beats `open` to `terminal` in `IotPhoneBeats.tsx`, each a component of `{frame, frames}` in a `BEAT_RENDERERS` map — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T16: Build beats `test` to `exit` in `IotPhoneBeats.tsx` — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T17: Build beats `discovery` to `close` in `IotPhoneBeats.tsx` — files: src/marketing/iot-phone-walkthrough/IotPhoneBeats.tsx
- [ ] T18: Build both compositions and register them — files: src/marketing/iot-phone-walkthrough/IotPhoneWalkthrough.tsx, src/Root.tsx
  - On the pattern of W01's `MirrorWalkthrough.tsx`: one `Walkthrough({format})`; landscape `<Stage>` with `panelHeight={900}` and the phone's aspect; portrait `<PortraitStage>` with `<NarrationCaptions>` (captions from `captionsFromClips(clips, words, IOT_PHONE_CAPTION_CORRECTIONS)`); `<NarrationTrack>` in both; `<PromoPreload />` (the phone surfaces draw CSS images); copy through `<WalkthroughCopy>` with `at={-40}` on open. Register `iot-phone-walkthrough` (1920x1080) and `iot-phone-walkthrough-portrait` (1080x1920) in a `<Folder name="CTRLbot-IoT-Walkthrough">`, metadata inline.
  - Verify: `npm run video:frames -- iot-phone-walkthrough validate`; both contact sheets, every still against its evidence line; a half-scale inert check on the portrait (`--scale=0.5 --crf=28`, then `video:frames … check` with `VIDEO_COMPOSITION`) under 60%.
  - T15–T17 render their stills only once T18 has registered the composition: until then their check is `npm run check` and `npm run video:lint`, and T18 renders every beat.
- [ ] T19: Run the feature gates on both shapes, render both, write the .srt, and record the results here — files: videos/iot-phone-walkthrough.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough`; render `iot-phone-walkthrough` → `out/iot-phone-walkthrough.mp4` and `iot-phone-walkthrough-portrait` → `out/iot-phone-walkthrough-portrait.mp4` (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both; `npm run narration:check` on both; `npm run narration:srt -- src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts IOT_PHONE_NARRATION_CLIPS iot-phone-walkthrough out/iot-phone-walkthrough.srt --corrections=IOT_PHONE_CAPTION_CORRECTIONS`, then confirm no `ControlBot`, no `RS -232` and no one-word captions. Confirm every file exists.
  - Runs straight after T18 with no approval stop. Does not mark the video done: Nathan reviews both renders, and his notes come back as new tasks.

## Deferred

- Tablet versions of the seven new surfaces — W04 builds them on the same components.
- Trimmed cuts for X (2:20) and YouTube Shorts (3:00), from these beats.
- A shared walkthrough shell: W01, W02 and W03 each carry their own composition; lift the
  common part when W04 starts.
- The First-Run quick-start cuts, moved to v1.1.

## Handoff

- **Ready now:** T1, T2, T3, and T4–T13 in any order after them (each surface is its own
  file; T5 before T6).
- **Ready later:** T14 after T1 and T3; T15–T17 after T4–T14; T18 after T15–T17; T19 last.
- **Blocked:** nothing.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

## Contact sheet

> `npm run video:frames -- iot-phone-walkthrough contact` renders one still per beat, and
> with `VIDEO_COMPOSITION=iot-phone-walkthrough-portrait` the portrait sheet. Mark each
> ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
