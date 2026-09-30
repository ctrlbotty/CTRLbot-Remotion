---
id: mirror-walkthrough
destination: social-walkthrough-vertical
---

# CTRLbot Mirror — narrated walkthrough (Roadmap W01)

## Watching

An AV integrator or CTRLbot IoT installer who sets up Android tablets and phones at a desk
with a PC beside them. They have never heard of CTRLbot Mirror and assume "screen
mirroring" means a casting app that only shows the picture. They want to know whether it
makes setting up and demonstrating CTRLbot IoT faster than doing it on the glass.

## Promise

Control an Android phone or tablet from your Windows PC, over USB.

## Narration

- Mode: `source-edit`. Narrated only: there is no silent cut.
- Source recording: `video input/CTRLbot Mirror Tutorial.mp4` (8:29)
- Ingest: `ingest/mirror-walkthrough/` — transcript corrected 2026-09-30 (T1)
- Prepared audio: `public/narration/mirror-walkthrough/source-normalized.m4a`
- Edit list: `src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts`
- Landscape: `mirror-walkthrough`, 1920x1080 → `out/mirror-walkthrough.mp4`, captions as
  `out/mirror-walkthrough.srt` — YouTube
- Portrait: `mirror-walkthrough-portrait`, 1080x1920, captions burned in →
  `out/mirror-walkthrough-portrait.mp4` — TikTok, YouTube Shorts, LinkedIn, X

## Beats

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| open | Your Android phone or tablet, controlled from your PC | `MirrorApp` | Mirror window with the tablet live on the stage: CTRLbot IoT's driver catalog scrolls inside the drawn tablet frame, Devices panel shows the tablet mirroring; the copy shows the CTRLbot Mirror headline and what it does | 16 |
| setup | Mirror installs Android's own tools for you | `MirrorApp` | Setup panel: the platform-tools bar fills and step 1 ticks to *Android platform-tools installed*, then step 2 is up; the copy's checklist is on the same step, with its description | 14.5 |
| debugging | Turn on USB debugging on the phone | `MirrorApp` | Setup step 3 *Turn on USB debugging* is active with its Build number and Developer options instructions; the checklist's step 3 says the same, plus the data-cable tip | 8 |
| connect | Allow it once, and it is ready | `MirrorApp` | Step 4 *Authorise this computer* ticks, the Devices card shows *Ready*, Start mirroring is pressed and the stage changes from the idle message to the live tablet; the checklist ticks steps 4 and 5 | 14 |
| frame | Pick a frame that fits the device | `MirrorApp` | Studio panel's Device frame picker: the selection moves to another frame and the frame drawn around the mirrored tablet changes shape, then the padding value rises and the backdrop margin grows | 14.5 |
| paste | Click, type and paste from your PC | `MirrorApp` + `ConnectionPanel` | The mirrored tablet shows CTRLbot IoT's connection panel; its host field goes from empty to `192.168.1.169` in one frame, caret after it | 14 |
| capture | Screenshots, and video with your voice | `MirrorApp` | The toolbar camera is pressed and a *Screenshot saved* toast lands; then record is pressed and a red recording clock counts up while the mirrored catalog scrolls | 13.5 |
| apps | See every app on the device and uninstall what you do not need | `MirrorApp` | Apps panel lists the tablet's packages; the highlight walks down the list and stops on `Kindle`, whose row shows its Uninstall action | 13.5 |
| files | Move files between the PC and the device | `MirrorApp` | Files panel at `/sdcard`; a file is dragged onto the drop area, the area lights, and the file appears in the list | 8.5 |
| tools | A shell and the device log, built in | `MirrorApp` | Shell panel runs one command and its output prints; the sidebar moves to Logcat and log lines stream in | 7.5 |
| close | The name, once, at the end | `MirrorApp` | Setup panel with every step ticked beside the live tablet; the copy shows the CTRLbot Mirror headline | 9 |

## Anything unusual

- **Two shapes, narrated, no silent cut.** Landscape for YouTube, portrait for TikTok,
  YouTube Shorts, LinkedIn and X, both from one set of beats, copy and narration. The
  portrait cut burns its captions in; the landscape cut keeps its frame for the step text
  and ships `out/mirror-walkthrough.srt` for YouTube. Both captions come from
  `src/audio/narrationCaptions.ts`, so they cannot disagree.
- **133 seconds, under 2:20.** X refuses anything longer without Premium, and the portrait
  cut is the one X gets. `social-walkthrough-vertical`, this brief's destination, caps the
  cut at 140; the landscape cut is checked against `social-walkthrough` as well.
- **Audiowide is the product's name only**, at the open and the close. Step titles are
  Montserrat SemiBold, descriptions Montserrat, eyebrows Space Mono (`WalkthroughCopy`).
  Portrait body text is 40px and landscape 30px, about 15pt once scaled to a screen.
- **Setup is a numbered checklist, Mirror's own five steps**, titled as its Setup panel
  titles them and described from that panel's hints. It stays up across `setup`,
  `debugging` and `connect` and ticks with the panel on the stage (`setupStepAt`).
- **No Wi-Fi.** Pairing over Wi-Fi is cut from the narration and the copy; the promise is
  USB only. Mirror's Devices panel still shows its own Wi-Fi section, because that is the
  real app, but nothing points at it.
- **Every surface is the live Mirror rebuild in `src/app-ui/mirror/`**, a class-by-class
  copy of `C:\0-Repo\Utilities\CTRLbot-Mirror\src\renderer\src` in CSS pixels at
  `MIRROR_VIEWPORT` (1600x940). What the stage mirrors is the IoT app's own `app-ui/`
  surfaces, so the cut shows CTRLbot IoT being set up through Mirror.
- **Android's own Settings screens are not rebuilt.** The recording spends 2:16–3:30 in
  Samsung's Settings; the cut carries that step through Mirror's Setup panel, which names
  the same path. Rebuilding a vendor's system UI is out of scope.
- **Claims are Mirror's README and source as of commit `fbd85e3`, not the narration.**
  Two spoken claims go further than the code and are cut out of the narration and never
  written as copy:
  - *removing apps "you may not even be able to remove", Galaxy Continuity,
    "garbageware"* (6:42–7:30). `apps.ts` runs `pm uninstall <package>` without
    `--user 0`, which does not remove a preinstalled system app.
  - *"add packages … by dragging, dropping"* is heard in the `files` clip, but the copy
    says files: the drop area copies files; APKs install from the Apps panel button.
- **The spoken sign-off "just email me" is cut.** The video signs off on `CTRLbot Mirror`,
  no address.
- **Virtual devices are named in the recording (7:59) but not shown.** Mirror has no
  rebuilt Virtual panel; the `tools` clip ends before that phrase. Deferred.
- **The only IP on screen is private** (`192.168.1.169`, the "169" spoken at 4:28). No
  serial beyond what `mirrorData.ts` already carries, no account or network names.
- **Camera: a push on every beat, wide at every cut** (`beatShots()`): each beat opens on
  the whole window, pushes to 0.88 on its subject by mid-beat and returns. One slow drift
  measured 89% inert; this measured 30%. Both shapes use the same shots.
- **`<PromoPreload />` is required.** The mirrored IoT surfaces draw their images from CSS;
  without it the first beat to mount one strobes.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Scope lock

Revised 2026-09-30 (Revision 1, below). T1–T16 built the first version: silent and
narrated landscape cuts.

- **User outcome:** two narrated renders of one walkthrough — landscape
  `mirror-walkthrough` for YouTube and portrait `mirror-walkthrough-portrait` for the feeds
  — that show a viewer how to install, connect and use CTRLbot Mirror to control an Android
  device from a Windows PC over USB, with step text that reads on a phone.
- **In scope:** the copy and checklist, the portrait layout and burned-in captions, the
  landscape .srt, the retime to 133s, cutting Wi-Fi pairing, both renders through every gate.
- **Out of scope:** a silent cut, S01, W02 (on hold until this format is approved),
  publishing, the rest of the publishing kit (poster, titles, tags), the roadmap (Nathan is
  editing it), and the docs that still describe a silent cut.
- **Must preserve:** every `mirror/*` shorts surface and `Proof-Mirror-*` still;
  `MirrorScenes.tsx`, `Stage`/`StageCopy` and every other composition untouched;
  `video input/` and the ingest's JSON never modified; no gate threshold changed.

## Copy

Executors place these verbatim. Eyebrows render uppercase. Audiowide only where marked.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open | — | **CTRLbot Mirror** (Audiowide) | Control your Android phone or tablet from your Windows PC, with your mouse, keyboard and clipboard. |
| setup, debugging, connect | Setup · step *n* of 5 | the checklist below | the active step's description |
| frame | Studio | Frame it for the camera | Pick a device frame, then set the backdrop, padding and shadow. Screenshots and recordings keep the framing. |
| paste | Control | Click, type and paste | Your mouse taps and scrolls, your keyboard types, and Ctrl+V pastes from Windows. Here, a projector address goes straight into CTRLbot IoT. |
| capture | Capture | Screenshots and recordings | Screenshots save at 1×, 2× or 3×. Recordings include your PC microphone, never the phone's audio. Both go to Pictures\CTRLbot Mirror. |
| apps | Apps | Manage the apps | See every app on the device, install an APK, or uninstall the ones you don't need. |
| files | Files | Move files | Browse the device's storage. Drag files from Windows onto the drop area to copy them over, or use Save to PC to bring one back. |
| tools | Tools | Shell and logcat | Run a shell command on the device, or stream its log and filter it by priority. |
| close | — | **CTRLbot Mirror** (Audiowide) | Setup is one click away whenever a device won't connect. |

The Setup checklist — Mirror's own step titles (`SetupPanel.tsx`), descriptions from its
hints and README:

| step | title | description | active |
|------|-------|-------------|--------|
| 1 | Install Android platform-tools | Open Setup and select Install now. Mirror downloads Google's adb into its own folder. | setup 0–8s |
| 2 | Start the ADB server | Mirror starts the background process adb uses to talk to devices. Devices then appear on their own. | setup 8s–end |
| 3 | Turn on USB debugging | On the phone: Settings → About phone → tap Build number seven times. Then Developer options → USB debugging. Plug in with a data cable, not a charge-only one. | debugging |
| 4 | Authorise this computer | Unlock the phone. Tick Always allow from this computer, then tap Allow. | connect 0–5.7s |
| 5 | Start mirroring | Pick the device in Devices and press Start mirroring. | connect 5.7–12.2s, then all ticked |

## Narration clips

Seconds on the prepared track, refined against the corrected word times. `at` is where the
clip plays in the 133-second cut. Every clip starts and ends on a complete word.

| beat | clips (at: source) | what is said |
|------|--------------------|--------------|
| open | 0.35: 0.33–9.0, 9.25: 10.65–16.85 | Welcome to CTRLbot … called CTRLbot Mirror, a way to mirror what is on your Android phone or tablet |
| setup | 16.25: 30.4–44.0 | we have to install ADB … connect to your device … manage applications on it |
| debugging | 30.75: 190.45–196.45 | make sure that USB debugging mode is on |
| connect | 38.75: 93.15–99.05, 44.85: 99.3–106.75 | asked to authorize that connection … green and ready … start mirroring |
| frame | 52.7: 118.5–127.05, 61.45: 130.2–135.3 | pick one of these other ones … a better fit … padding and shadow and such |
| paste | 67.25: 224.5–237.8 | copying and pasting … cumbersome to do straight from the panel |
| capture | 81.2: 311.35–316.8, 86.85: 330.25–335.35, 92.2: 342.8–344.8 | hit the screenshot button … record it as video … record your voice |
| apps | 94.75: 388.7–401.67 | access to all the apps … delete, remove stuff in here |
| files | 108.3: 459.85–466.9 | add packages and files … dragging, dropping into this area |
| tools | 116.7: 473.0–479.6 | we have also a shell … look at the logs for the device |
| close | 124.25: 494.25–497.65, 128.1: 500.85–503.1 | come back to this setup if you're ever having problems. Thank you for your time |

## Concurrency with W02

W02 is on hold until this format is approved; when it resumes, this still applies.
W02 (`videos/terminator-walkthrough.md`) may run in this checkout at the same time. The
only shared file is `src/Root.tsx` (T5, T15 here; one task there): before editing it,
`git diff --quiet src/Root.tsx` must succeed, else wait for the other commit (two checks
at most) and report blocked. Never touch `src/app-ui/term/`, `src/marketing/terminator-walkthrough/`,
`ingest/terminator-walkthrough/` or W02's brief. W02's uncommitted paths are expected, and
a check failing only in them is a Review note, not a repair. Full renders run one at a time.

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked
>
> **Execution limits.** One task per fresh context. Two repair rounds, then `[!]` with the
> evidence and stop. No nested subagents: the implementer and the `beat-verifier` are the
> only agents. Never paste a full build log or full diff into the coordinator — the failing
> lines only. Every retry or poll has a fixed maximum of two. Stop if a worker repeats a
> prior turn nearly verbatim.
>
> **Per-task check:** `npm run check`, `npm run video:lint`, and
> `npm run video:frames -- mirror-walkthrough contact --beat=<beat>`, then the still held
> against that beat's evidence line. Surface tasks (T2–T4) instead render the named proof
> still and a `Proof-Mirror-*` still to show the default is unchanged.

- [x] T1: Correct `ingest/mirror-walkthrough/transcript.md` against `ingest/mirror-walkthrough/contact.html` and mark it `Status: corrected 2026-09-30` — files: ingest/mirror-walkthrough/transcript.md
  - Fix misheard product names, acronyms and numbers only: "galaxy continuity" at 6:47.5 → Galaxy Continuity; confirm ADB, IoT, Epson and "169" against the stills. "CTRLbot" is already applied throughout. Keep filler and false starts. Never edit `words.json`, `captions.json` or `heard.json`.
  - Done when the status line reads corrected and every line in the Narration clips table still says what the table says.
- [x] T2: Add Mirror's Studio "Device frame" picker to `StudioPanel` and a `frameStyle` prop to `MirrorStage`, transcribed from Mirror's `StudioPanel.tsx` `FRAMES` and `compose.ts` `FRAME_SPECS` — files: src/app-ui/mirror/Mirror.tsx, src/app-ui/mirror/mirrorTheme.ts
  - `frameStyle` defaults to the current `tabletFrame`; `StudioPanel` takes an optional `frame` and `padding` so the beat can move them. Only frames and colours the Mirror source defines.
  - Verify: `npm run still -- Proof-Mirror-Studio out/_t2-studio.png` shows the picker; `Proof-Mirror-Devices` renders as before.
- [x] T3: Add the *Screenshot saved* toast from Mirror's `Toasts.tsx` and `StageToolbar.tsx` as an optional `toast` prop on `MirrorApp` — files: src/app-ui/mirror/Mirror.tsx
  - Title *Screenshot saved*, detail a `Pictures\CTRLbot Mirror\…png` path with no user name in it. Absent by default.
  - Verify: `npm run check`; a scratch `npm run still` of a Proof still is unchanged.
- [x] T4: Add a `LogcatPanel` rebuilt from Mirror's `LogcatPanel.tsx`, its lines transcribed from the recording's frames near 7:58 into `mirrorData.ts` — files: src/app-ui/mirror/Mirror.tsx, src/app-ui/mirror/mirrorData.ts
  - `MirrorPanel` gains `'logcat'` so the sidebar can mark it active. Lines take a count so the beat can stream them. No serials, accounts or addresses beyond what `mirrorData.ts` already holds.
  - Verify: `npm run check`; existing Proof stills unchanged.
- [x] T5: Create the beat table and copy in `walkthroughData.ts`, the `mirror-walkthrough` composition in `MirrorWalkthrough.tsx` (Stage, drift, PromoPreload, copy column, open beat), and register it in `Root.tsx` — files: src/marketing/mirror-walkthrough/walkthroughData.ts, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx, src/Root.tsx
  - Beat ids and seconds exactly as the Beats table; copy exactly as the Copy table. Follow `AiWalkthrough.tsx` for Stage geometry and data shape. 1920x1080, 30fps, metadata inline on `<Composition>`.
  - Every beat not yet built renders the open beat's live-mirroring state, so the contact sheet renders all eleven from here on. Beats resolve through a lookup that T6 introduces.
  - Verify: `npm run video:frames -- mirror-walkthrough validate`, then the per-task check on `--beat=open` and `--beat=poster`; `opens-composed` must hold.
- [x] T6: Build the `setup` and `debugging` beats in a new `MirrorBeats.tsx` and resolve beats through it from `MirrorWalkthrough.tsx`, adding filled values and a pressed Pair to the pairing fields in `Mirror.tsx` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx, src/app-ui/mirror/Mirror.tsx
  - Pairing values are private placeholders (`192.168.1.42:37021`, a six-digit code); defaults leave `DevicesPanel` as it is.
  - Verify: per-task check on `--beat=setup` and `--beat=debugging`.
- [x] T7: Build the `connect` beat in `MirrorBeats.tsx` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [x] T8: Build the `frame` beat in `MirrorBeats.tsx` on T2's picker and `frameStyle` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [x] T9: Build the `paste` beat in `MirrorBeats.tsx`, mirroring the tablet `ConnectionPanel` with its host field filling in one frame — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
  - Host `192.168.1.169`. Use `connectionRegions('tablet')` for any ring; do not estimate regions.
- [x] T10: Build the `capture` beat in `MirrorBeats.tsx` on T3's toast and the stage's existing recording clock — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [x] T11: Build the `apps` beat in `MirrorBeats.tsx`, the highlight stopping on `Kindle` with its Uninstall action visible — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/app-ui/mirror/Mirror.tsx
  - If `AppsPanel` cannot show a row's Uninstall action, add it from Mirror's `AppsPanel.tsx` behind an optional prop. Never highlight a system package.
- [x] T12: Build the `files` beat in `MirrorBeats.tsx`, the dropped file joining the `/sdcard` list — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/app-ui/mirror/Mirror.tsx
  - `FilesPanel` gains an optional extra file for after the drop; defaults unchanged.
- [x] T13: Build the `tools` beat in `MirrorBeats.tsx`: one shell command and its output, then T4's Logcat panel streaming — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
  - Command `getprop ro.product.model`, output from `MIRROR_DEVICE`. No other device data.
- [x] T14: Build the `close` beat in `MirrorBeats.tsx` and its CTRLbot Mirror wordmark in the copy column of `MirrorWalkthrough.tsx` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx
  - Audiowide wordmark `CTRLbot Mirror`, then the line from the Copy table. No URL, no email.
- [x] T15: Write the narration edit list from the Narration clips table and register the `mirror-walkthrough-narrated` composition — files: src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx, src/Root.tsx
  - Needs T1. `NarrationTrack` with `playbackRate` 1; each `at` inside its beat; each boundary checked against corrected word times and the waveform. The silent composition stays silent.
  - Verify: `npm run check`; render `out/mirror-walkthrough-narrated.mp4` without `--muted`; `npm run narration:check -- out/mirror-walkthrough-narrated.mp4`.
- [x] T16: Run the feature gates and both renders, and record results in this brief — files: videos/mirror-walkthrough.md
  - `npm run video:lint -- --destination=social-walkthrough`; `npm run video:frames -- mirror-walkthrough contact`; `npm run render -- mirror-walkthrough out/mirror-walkthrough.mp4 --codec=h264 --crf=20 --muted`; `npm run video:frames -- mirror-walkthrough check out/mirror-walkthrough.mp4`; the same check on the narrated file; `npm run narration:check -- out/mirror-walkthrough-narrated.mp4`. Confirm each output file exists.
  - Regression: `npm run still` of `Proof-Mirror-Setup`, `-Devices`, `-Studio`, `-Apps`, `-Files` match their pre-T2 renders.
  - Runs straight after T15 with no approval stop. Does not mark the video done: Nathan reviews both renders and `out/mirror-walkthrough/contact.html`, and his notes come back as new tasks.

### Revision 1 · 2026-09-30 — narrated only, both shapes, readable copy

Nathan's review of the T16 renders: drop the silent cut, keep Audiowide to headlines, more
description on every step (especially Setup), make a portrait cut for the feeds as well as
the landscape one, and drop Wi-Fi pairing. The shared pieces are built for W02–W05 too.

- [x] R1: Add the shared walkthrough pieces — the step copy and checklist, the portrait layout, burned-in captions and the clip-to-caption mapping — files: src/marketing/WalkthroughCopy.tsx, src/marketing/PortraitStage.tsx, src/marketing/NarrationCaptions.tsx, src/audio/narrationCaptions.ts
- [x] R2: Add the `social-walkthrough-vertical` destination, `narration:srt`, and `video:frames` output per composition — files: src/destinations.ts, scripts/narration-srt.mjs, scripts/video-frames.mjs, package.json
- [x] R3: Rebuild W01 on them: retime to 133s, the Copy and checklist above, USB only, both compositions registered and the silent one gone — files: src/marketing/mirror-walkthrough/walkthroughData.ts, mirrorWalkthroughNarration.ts, MirrorBeats.tsx, MirrorWalkthrough.tsx, src/Root.tsx
- [ ] R4: Run the gates on both shapes, render both, write the .srt, and record the results here — files: videos/mirror-walkthrough.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough` and `--destination=social-walkthrough-vertical`; `npm run video:frames -- mirror-walkthrough validate`; `contact` for landscape and, with `VIDEO_COMPOSITION=mirror-walkthrough-portrait`, for portrait; render both; `video:frames … check` and `narration:check` on both; `npm run narration:srt -- src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts MIRROR_WALKTHROUGH_NARRATION_CLIPS mirror-walkthrough out/mirror-walkthrough.srt`.

## Deferred

- Promote the walkthrough's new beats into `src/shorts/surfaces.tsx` for S01 — S01's brief
  decides whether it needs them.
- A rebuilt Virtual devices panel, and the Android Settings path, if a later cut needs them.
- CTRLbot IoT's Find Devices scan surface — W03 and S13 need it; this cut shows the paste
  without it.
- Close-out (archive the brief, `RELEASE-NOTES.md`, `Roadmap.md`) after Nathan's review of
  both renders. The recording stays in `video input/` until S01 ships.
- The docs still describe a silent cut beside the narrated one (`AGENTS.md` "Making a new
  video", `docs/NARRATED-WALKTHROUGH.md` §6), and W02's brief is written for it. Update
  them once this format is approved.
- The rest of a publishing kit for long videos: poster, title, description, tags.

## Handoff

- T1–T16 are done. Revision 1 runs R1 to R4 in order, then the renders go to Nathan.
- **Blocked:** nothing.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the contact sheet review.

- T4/T13: the Logcat lines are written, not transcribed. The recording never opens Logcat
  (7:53 shows the Shell panel, 8:05 Devices). Tags are real CTRLbot IoT classes
  (`MainActivity`, `ControlUiViewModel`, `DriverAdapter`, `DeviceRepository`,
  `DriverDatabase`) and "23 device drivers" matches the recording's "23 devices found"; the
  messages themselves are plausible, not captured.
- Framing fix (after T14): `drift()` now pulls back from 1.0 to 1.05 instead of pushing
  to 0.94. The push had cropped Mirror's title bar, icon sidebar and toolbar by the close;
  every beat still now shows the whole window.
- T15: 18 clips. A Whisper pass over the rendered narration reads every phrase complete,
  from "Welcome to CTRLbot" to "Thank you for your time"; `narration:check` -13.4 LUFS,
  -1.4 dBTP. Two joins to listen for: "…record it as video. But it's also going to record
  your voice" and "…you pair over wireless" (both as spoken).
- T16, first render: 89% inert on both cuts (every beat 80–95%), a FAIL against 0.6. The
  single slow drift barely moves. Fixed with `beatShots()` in `walkthroughData.ts`: each
  beat opens on the whole window (1.04), pushes to 0.88 on its subject (panel, stage, or
  toolbar for capture) by mid-beat, and is back to 1.04 at its end, so every cut lands
  wide. Measured 22% at a 0.8 push, 33% at 0.88; 0.88 kept.
- T16, final: `npm run check` OK; `video:lint --destination=social-walkthrough` 0 errors;
  `out/mirror-walkthrough.mp4` 30% inert, `out/mirror-walkthrough-narrated.mp4` 29%
  inert, both "no problems"; `narration:check` passed, -13.4 LUFS, -1.4 dBTP.
- T16 regression: no pre-T2 baseline was saved, so the five `Proof-Mirror-*` stills were
  checked by eye, not diffed. Setup, Devices, Apps and Files match their defaults; Studio
  now carries T2's Device frame picker, by design. The picker's default highlight is
  *Rounded* while the stage draws the tablet frame: a pre-existing default, not touched.
- T13/T14 were built and committed together: both live in `MirrorBeats.tsx`.
- T14: the close's wordmark is `StageCopy`'s Audiowide title, and the brief's line is its
  Montserrat body.

## Contact sheet

> `npm run video:frames -- mirror-walkthrough contact` renders one still per beat and tiles
> them. Mark each ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
