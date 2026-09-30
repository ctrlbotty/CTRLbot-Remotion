---
id: mirror-walkthrough
destination: social-walkthrough
---

# CTRLbot Mirror — narrated walkthrough (Roadmap W01)

## Watching

An AV integrator or CTRLbot IoT installer who sets up Android tablets and phones at a desk
with a PC beside them. They have never heard of CTRLbot Mirror and assume "screen
mirroring" means a casting app that only shows the picture. They want to know whether it
makes setting up and demonstrating CTRLbot IoT faster than doing it on the glass.

## Promise

Control an Android phone or tablet from your Windows PC, over USB or Wi-Fi.

## Narration

- Mode: `source-edit`
- Source recording: `video input/CTRLbot Mirror Tutorial.mp4` (8:29)
- Ingest: `ingest/mirror-walkthrough/` — `transcript.md` is `Status: DRAFT` until T1
- Prepared audio: `public/narration/mirror-walkthrough/source-normalized.m4a`
- Edit list: `src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts`
- Narrated composition: `mirror-walkthrough-narrated`
- Narrated output: `out/mirror-walkthrough-narrated.mp4`

## Beats

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| open | Your Android screen, on your PC, under your mouse | `MirrorApp` | Mirror window with the tablet live on the stage: CTRLbot IoT's driver catalog scrolls inside the drawn tablet frame, Devices panel shows the tablet mirroring | 16 |
| setup | Mirror installs Android's own tools for you | `MirrorApp` | Setup panel: the platform-tools bar fills, step 1 ticks to *Android platform-tools installed*, then step 2 ticks to *ADB server running* | 14 |
| debugging | USB debugging, or pair over Wi-Fi with a code | `MirrorApp` | Setup step 3 *Turn on USB debugging* is active with its Build number instructions, then the Devices panel's pairing address and pairing code fields fill and Pair is pressed | 13 |
| connect | Allow it once, and it is ready | `MirrorApp` | Step 4 *Authorise this computer* ticks, the Devices card shows *Ready*, Start mirroring is pressed and the stage changes from the idle message to the live tablet | 14 |
| frame | Pick a frame that fits the device | `MirrorApp` | Studio panel's Device frame picker: the selection moves to another frame and the frame drawn around the mirrored tablet changes shape, then the padding value rises and the backdrop margin grows | 14 |
| paste | Paste from your PC straight into the app | `MirrorApp` + `ConnectionPanel` | The mirrored tablet shows CTRLbot IoT's connection panel; its host field goes from empty to `192.168.1.169` in one frame, caret after it | 14 |
| capture | Screenshots, and video with your voice | `MirrorApp` | The toolbar camera is pressed and a *Screenshot saved* toast lands; then record is pressed and a red recording clock counts up while the mirrored catalog scrolls | 16 |
| apps | See every app on the device and uninstall what you do not need | `MirrorApp` | Apps panel lists the tablet's packages; the highlight walks down the list and stops on `Kindle`, whose row shows its Uninstall action | 15 |
| files | Drop files onto the device | `MirrorApp` | Files panel at `/sdcard`; a file is dragged onto the drop area, the area lights, and the file appears in the list | 11 |
| tools | A shell and the device log, built in | `MirrorApp` | Shell panel runs one command and its output prints; the sidebar moves to Logcat and log lines stream in | 9 |
| close | The name, once, at the end | `MirrorApp` | Setup panel with every step ticked beside the live tablet; the copy column shows the CTRLbot Mirror wordmark | 12 |

## Anything unusual

- **The cut runs about 148 seconds, not 120.** Each beat is sized to the narration it
  carries (the clip table under Tasks); the recorded phrases do not fit two minutes without
  dropping a Roadmap claim. `social-walkthrough` allows 60 to 180.
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
- **Camera: `<Stage>` with the house `drift()`, never past 0.94.** The panel is
  aspect-matched to 1600x940, so emphasis comes from `<Spotlight>`/`<FocusRing>`, and the
  continuous drift is what keeps `inert-fraction` under 0.6 across long narrated holds.
- **`<PromoPreload />` is required.** The mirrored IoT surfaces draw their images from CSS;
  without it the first beat to mount one strobes.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Scope lock

- **User outcome:** two renders — the silent, caption-led `mirror-walkthrough` and the
  narrated `mirror-walkthrough-narrated` — that show a viewer how to install, connect and
  use CTRLbot Mirror to control an Android device from a Windows PC, and why that makes
  setting up and demonstrating CTRLbot IoT easier.
- **In scope:** the transcript correction; the three Mirror surface states the beats need
  and the rebuild lacks (device-frame picker, screenshot toast, Logcat panel); the eleven
  beats; the narration edit; both renders through every gate.
- **Out of scope:** S01 (its own short, its own brief), promoting these beats into
  `src/shorts/surfaces.tsx`, a Virtual devices panel, Android Settings screens, CTRLbot IoT's
  Find Devices scan surface, burned-in captions on the walkthrough, publishing, the
  publishing kit, and archiving the recording (S01 is still cut from it).
- **Must preserve:** every existing `mirror/*` shorts surface and the five
  `Proof-Mirror-*` stills render unchanged with default props; `MirrorScenes.tsx` is not
  edited; `AI-Walkthrough` and every other registered composition are untouched;
  `video input/` and `ingest/mirror-walkthrough/words.json` are never modified; no gate
  threshold is changed to make this cut pass.

## Copy

The silent cut's copy column, one eyebrow and one line per beat. House faces: Space Mono
eyebrow, Montserrat line, Audiowide only for the closing wordmark. Executors place these
verbatim.

| beat | eyebrow | line |
|------|---------|------|
| open | CTRLBOT MIRROR | Your Android screen, on your PC. |
| setup | SETUP | It installs Android's tools for you. |
| debugging | USB OR WI-FI | Turn on USB debugging, or pair with a code. |
| connect | CONNECT | Allow it once. Then it's ready. |
| frame | STUDIO | Pick a frame that fits the device. |
| paste | CONTROL | Paste from your PC into the app. |
| capture | CAPTURE | Screenshots, and video with your voice. |
| apps | APPS | See every app. Uninstall what you don't need. |
| files | FILES | Drop files onto the device. |
| tools | TOOLS | A shell and the device log, built in. |
| close | — | `CTRLbot Mirror` wordmark, then *Back to Setup whenever you need it.* |

## Narration clips

Source ranges in seconds on the prepared track, from `words.json` segment times. T15
refines each boundary against the corrected word times and the waveform (Whisper's ends run
early); every clip must still start and end on a complete word and sit inside its beat.

| beat | source range | what is said |
|------|--------------|--------------|
| open | 0.4–8.8, 9.7–16.6 | Welcome … CTRLbot Mirror … mirror what is on your Android phone or tablet |
| setup | 30.5–44.0 | we have to install ADB … connect to your device … manage applications on it |
| debugging | 190.5–196.5, 202.7–209.1 | make sure USB debugging mode is on … pair over wirelessly … through a code … same network |
| connect | 93.1–98.8, 99.3–106.9 | asked to authorize that connection … green and ready … start mirroring |
| frame | 118.5–126.9, 130.3–135.1 | pick one of these other ones … a better fit … padding and shadow and such |
| paste | 224.6–237.6 | copying and pasting … cumbersome to do straight from the panel |
| capture | 311.4–318.1, 330.5–344.0 | hit the screenshot button … record it as video … record your voice |
| apps | 388.8–402.7 | access to all the apps … delete, remove stuff in here (cut before "that sometimes") |
| files | 456.5–466.7 | copy stuff over right here … dragging, dropping into this area |
| tools | 472.0–479.6 | we have also a shell … look at the logs for the device |
| close | 494.0–502.1 | come back to this setup if you're ever having problems. Thank you for your time |

## Concurrency with W02

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
- [ ] T3: Add the *Screenshot saved* toast from Mirror's `Toasts.tsx` and `StageToolbar.tsx` as an optional `toast` prop on `MirrorApp` — files: src/app-ui/mirror/Mirror.tsx
  - Title *Screenshot saved*, detail a `Pictures\CTRLbot Mirror\…png` path with no user name in it. Absent by default.
  - Verify: `npm run check`; a scratch `npm run still` of a Proof still is unchanged.
- [ ] T4: Add a `LogcatPanel` rebuilt from Mirror's `LogcatPanel.tsx`, its lines transcribed from the recording's frames near 7:58 into `mirrorData.ts` — files: src/app-ui/mirror/Mirror.tsx, src/app-ui/mirror/mirrorData.ts
  - `MirrorPanel` gains `'logcat'` so the sidebar can mark it active. Lines take a count so the beat can stream them. No serials, accounts or addresses beyond what `mirrorData.ts` already holds.
  - Verify: `npm run check`; existing Proof stills unchanged.
- [ ] T5: Create the beat table and copy in `walkthroughData.ts`, the `mirror-walkthrough` composition in `MirrorWalkthrough.tsx` (Stage, drift, PromoPreload, copy column, open beat), and register it in `Root.tsx` — files: src/marketing/mirror-walkthrough/walkthroughData.ts, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx, src/Root.tsx
  - Beat ids and seconds exactly as the Beats table; copy exactly as the Copy table. Follow `AiWalkthrough.tsx` for Stage geometry and data shape. 1920x1080, 30fps, metadata inline on `<Composition>`.
  - Every beat not yet built renders the open beat's live-mirroring state, so the contact sheet renders all eleven from here on. Beats resolve through a lookup that T6 introduces.
  - Verify: `npm run video:frames -- mirror-walkthrough validate`, then the per-task check on `--beat=open` and `--beat=poster`; `opens-composed` must hold.
- [ ] T6: Build the `setup` and `debugging` beats in a new `MirrorBeats.tsx` and resolve beats through it from `MirrorWalkthrough.tsx`, adding filled values and a pressed Pair to the pairing fields in `Mirror.tsx` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx, src/app-ui/mirror/Mirror.tsx
  - Pairing values are private placeholders (`192.168.1.42:37021`, a six-digit code); defaults leave `DevicesPanel` as it is.
  - Verify: per-task check on `--beat=setup` and `--beat=debugging`.
- [ ] T7: Build the `connect` beat in `MirrorBeats.tsx` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [ ] T8: Build the `frame` beat in `MirrorBeats.tsx` on T2's picker and `frameStyle` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [ ] T9: Build the `paste` beat in `MirrorBeats.tsx`, mirroring the tablet `ConnectionPanel` with its host field filling in one frame — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
  - Host `192.168.1.169`. Use `connectionRegions('tablet')` for any ring; do not estimate regions.
- [ ] T10: Build the `capture` beat in `MirrorBeats.tsx` on T3's toast and the stage's existing recording clock — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [ ] T11: Build the `apps` beat in `MirrorBeats.tsx`, the highlight stopping on `Kindle` with its Uninstall action visible — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/app-ui/mirror/Mirror.tsx
  - If `AppsPanel` cannot show a row's Uninstall action, add it from Mirror's `AppsPanel.tsx` behind an optional prop. Never highlight a system package.
- [ ] T12: Build the `files` beat in `MirrorBeats.tsx`, the dropped file joining the `/sdcard` list — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/app-ui/mirror/Mirror.tsx
  - `FilesPanel` gains an optional extra file for after the drop; defaults unchanged.
- [ ] T13: Build the `tools` beat in `MirrorBeats.tsx`: one shell command and its output, then T4's Logcat panel streaming — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
  - Command `getprop ro.product.model`, output from `MIRROR_DEVICE`. No other device data.
- [ ] T14: Build the `close` beat in `MirrorBeats.tsx` and its CTRLbot Mirror wordmark in the copy column of `MirrorWalkthrough.tsx` — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx
  - Audiowide wordmark `CTRLbot Mirror`, then the line from the Copy table. No URL, no email.
- [ ] T15: Write the narration edit list from the Narration clips table and register the `mirror-walkthrough-narrated` composition — files: src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts, src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx, src/Root.tsx
  - Needs T1. `NarrationTrack` with `playbackRate` 1; each `at` inside its beat; each boundary checked against corrected word times and the waveform. The silent composition stays silent.
  - Verify: `npm run check`; render `out/mirror-walkthrough-narrated.mp4` without `--muted`; `npm run narration:check -- out/mirror-walkthrough-narrated.mp4`.
- [ ] T16: Run the feature gates and both renders, and record results in this brief — files: videos/mirror-walkthrough.md
  - `npm run video:lint -- --destination=social-walkthrough`; `npm run video:frames -- mirror-walkthrough contact`; `npm run render -- mirror-walkthrough out/mirror-walkthrough.mp4 --codec=h264 --crf=20 --muted`; `npm run video:frames -- mirror-walkthrough check out/mirror-walkthrough.mp4`; the same check on the narrated file; `npm run narration:check -- out/mirror-walkthrough-narrated.mp4`. Confirm each output file exists.
  - Regression: `npm run still` of `Proof-Mirror-Setup`, `-Devices`, `-Studio`, `-Apps`, `-Files` match their pre-T2 renders.
  - Runs straight after T15 with no approval stop. Does not mark the video done: Nathan reviews both renders and `out/mirror-walkthrough/contact.html`, and his notes come back as new tasks.

## Deferred

- Promote the walkthrough's new beats into `src/shorts/surfaces.tsx` for S01 — S01's brief
  decides whether it needs them.
- A rebuilt Virtual devices panel, and the Android Settings path, if a later cut needs them.
- CTRLbot IoT's Find Devices scan surface — W03 and S13 need it; this cut shows the paste
  without it.
- Close-out (archive the brief, `RELEASE-NOTES.md`, `Roadmap.md`) after Nathan's contact
  sheet and render review. The recording stays in `video input/` until S01 ships.

## Handoff

- **Ready now:** T1, T2, T5 (no dependencies). T2 → T3 → T4 run in that order because
  they share `Mirror.tsx`.
- **Ready later:** T6 after T4 and T5; T7 after T6; T8 after T2 and T6; T9 after T6; T10
  after T3 and T6; T11 and T12 after T6; T13 after T4 and T6; T14 after T6; T15 after T1
  and T14; T16 last.
- **Blocked:** nothing.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the contact sheet review.

## Contact sheet

> `npm run video:frames -- mirror-walkthrough contact` renders one still per beat and tiles
> them. Mark each ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
