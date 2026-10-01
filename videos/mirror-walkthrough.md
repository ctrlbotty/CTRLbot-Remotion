---
id: mirror-walkthrough
destination: social-walkthrough-vertical
---

# CTRLbot Mirror — narrated walkthrough, hybrid format (Roadmap W01, revision 2)

> Revision 1 (built 2026-09-30, delivered as the placeholder W01) is
> `videos/archive/2026-09-30-mirror-walkthrough.md`. This brief rebuilds the same cut on the
> format agreed after the 2026-10-01 review (`out/REVIEW-2026-10-01.md`, "Second review" and
> "Reference cuts"), and builds the shared pieces W02–W04 reuse.

## Watching

An AV integrator or CTRLbot IoT installer who sets up Android tablets and phones at a desk
with a PC beside them. They have never heard of CTRLbot Mirror and assume "screen
mirroring" means a casting app that only shows the picture. They want to know whether it
makes setting up and demonstrating CTRLbot IoT faster than doing it on the glass.

## Promise

Control an Android phone or tablet from your Windows PC, over USB.

## Narration

- Mode: `source-edit`, planned with `npm run narration:edit` (T1): every cut lands in the
  voice's own silence, and the captions come from the same plan. Narrated only.
- Source recording: `video input/CTRLbot Mirror Tutorial.mp4` (8:29)
- Ingest: `ingest/mirror-walkthrough/` — transcript corrected 2026-09-30
- Prepared audio: `public/narration/mirror-walkthrough/source-normalized.m4a`
- Edit list: `src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts`
- Planned edit: `public/narration/mirror-walkthrough/edit.m4a` and
  `src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.generated.ts` (T8; never
  hand-edited)
- Landscape: `mirror-walkthrough`, 1920x1080 → `out/mirror-walkthrough.mp4`, captions as
  `out/mirror-walkthrough.srt` — YouTube
- Portrait: `mirror-walkthrough-portrait`, 1080x1920, captions burned in →
  `out/mirror-walkthrough-portrait.mp4` — TikTok, YouTube Shorts, LinkedIn, X

## Beats

`Layout` is how `WalkthroughShell` (T6) plays the beat:
- **card**: the product card, composed at frame 0 when it opens the cut.
- **stage**: the Mirror window in a panel, with copy beside it.
- **chapter**: full frame, with a spotlight, ring and pointer on the spoken cue, and a step label.

| id | Layout | Claim | Surface | Evidence | Sec |
|----|--------|-------|---------|----------|-----|
| open | card | CTRLbot Mirror puts your phone on your PC | `MasterControlCard` | The tricon and the CTRLbot Mirror lockup are on screen at frame 0; the promise line streams in beneath them | 7 |
| proof | stage | Your phone, under your mouse | `MirrorApp` | The live tablet on Mirror's stage; the pointer clicks a driver's + on the mirrored screen, a ripple lands, and the mirrored app opens Configure Connection | 10 |
| setup | chapter | Mirror installs Android's tools for you | `SetupPanel` | Mirror's Setup panel fills the frame; the pointer clicks Install now, the platform-tools bar fills, step 1 ticks and step 2 goes active | 15 |
| debugging | chapter | Turn on USB debugging on the phone | `SetupPanel` | Step 3, Turn on USB debugging, is lit and ringed while everything else dims; the step label gives the Settings path | 8 |
| connect | chapter | Allow it once, and it is ready | `SetupPanel` + `DevicesPanel` + `MirrorStage` | Step 4 ticks, the device shows Ready, the pointer clicks Start mirroring, and the stage goes from the idle message to the live tablet | 14.5 |
| frame | chapter | Pick a frame that fits the device | `StudioPanel` + `MirrorStage` | The pointer picks another device frame and the frame around the mirrored tablet changes shape; the padding rises and the margin grows | 15 |
| paste | chapter | Paste from Windows into the device | `MirrorStage` + `ConnectionPanel` | Close on the mirrored CTRLbot IoT host field, with no drawn frame around it: the field is ringed, the pointer clicks it, and `192.168.1.169` appears with the caret after it | 14.5 |
| capture | chapter | Screenshots, and video with your voice | `MirrorStage` | The pointer clicks the camera and Screenshot saved lands; it clicks record and the red clock counts up | 14 |
| apps | chapter | See every app and remove what you don't need | `AppsPanel` | The apps list fills the frame; the highlight stops on Kindle and its Uninstall action is ringed | 14 |
| files | chapter | Copy files over | `FilesPanel` | A file is dragged onto the drop area, the area lights, and the file joins the /sdcard list | 7 |
| tools | chapter | A shell and the device log | `ShellPanel` + `LogcatPanel` | A shell command prints its output; then the sidebar moves to Logcat and lines stream in | 8 |
| again | chapter | Setup is there when a device won't connect | `SetupPanel` | Setup with every step ticked; the Setup icon in the rail is ringed | 4.5 |
| close | card | The name, once, at the end | `MasterControlCard` | The CTRLbot Mirror lockup and its outcome line; no URL | 4.5 |

## Anything unusual

- **136 seconds, under 2:20** (X without Premium). `social-walkthrough-vertical` caps it at
  140; the landscape cut is also checked against `social-walkthrough`.
- **The hybrid, in one line per layout.**
  - **card:** `MasterControlCard` with a `lockup`, built for this in T5.
  - **stage:** `Stage` / `PortraitStage` with `WalkthroughCopy`, as in revision 1. It holds,
    then makes one push to the subject on the cue, never past 0.94.
  - **chapter:** full frame. A landscape region shows its surroundings; portrait shows the
    same region as a tall crop. The step label is a `Callout`: a card in landscape, on the
    side away from the subject; the top scrim in portrait. In portrait the captions stay
    burned in at the bottom.
  - **Between chapters:** the camera moves continuously between them, because they share
    the Mirror window. Where the layout changes, a 15-frame fade.
- **Emphasis is spotlight, ring and pointer.** Revision 1 had none. Mirror is driven by a mouse,
  so presses are `PointerClick` (T4), not `TapIndicator`. Everything a shot or annotation
  names comes from `mirrorRegions` (T3), never estimated. Whatever the voice names must be
  whole in frame. A label cut at the frame edge is wrong; context cut at the edge is fine.
- **Events land on the spoken cue.** Each beat's actions are timed with `cueFrame(edit, clip,
  word)` (T6) against the planned edit, so a re-cut voice moves the picture with it. The
  camera settles about 0.3s before the cue, the action lands on it, and the result holds
  until the beat ends.
- **No drawn frame except in `frame`.** The device-frame picker is Mirror's own feature, so
  `frame` shows it. Everywhere else the mirrored screen has `frameStyle="none"`, and `paste`
  crops to the mirrored screen itself.
- **Android's Settings are not rebuilt.** `debugging` carries the path in its step label
  (copy below) over Mirror's own Setup step. Footage of a vendor's Settings is deferred.
- **Claims are Mirror's source and README as of commit `fbd85e3`** (re-checked 2026-10-01:
  the Files drop area copies files; APKs install from the Apps panel). Cut from the
  narration and never written as copy: pairing over Wi-Fi; removing preinstalled apps and
  "garbageware"; "add packages … by dragging" (replaced by the accurate "copy stuff over"
  phrase); virtual devices; "just email me".
- **The only IP on screen is private** (`192.168.1.169`). No serial beyond `mirrorData.ts`,
  no account or network names.
- **`<PromoPreload />` stays.** The mirrored IoT surfaces draw images from CSS.
- **Captions.** The portrait cut burns in the planned edit's words. The landscape cut ships
  `out/mirror-walkthrough.srt` from the same plan. No spelling corrections are needed for
  this recording.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Scope lock

- **User outcome:** W01's two narrated renders, rebuilt on the hybrid format. The voice is
  cut in silence, the captions match it, and every step is full-frame and readable on a
  phone. The shared pieces W02–W04 reuse ship with it.
- **In scope:**
  - **Shared:** `narration:edit` (T1); captions and .srt from a planned edit (T2); the
    `PointerClick` annotation (T4); `MasterControlCard`'s `lockup` and portrait layout (T5);
    `WalkthroughShell` (T6); the contract text (T7).
  - **W01:** Mirror's region map (T3); the edit list (T8); the beat data (T9); both
    compositions (T10); the 13 beats (T11–T14); both renders and the .srt (T15).
- **Out of scope:**
  - Other videos: W02–W04 (their own briefs, after this one), S01, the First-Run cuts.
  - The old track: `NarrationTrack`'s removal (`ai-walkthrough` still plays it), and any
    change to how the shorts cut their voice.
  - Material not yet built: footage, Android Settings screens, conceptual diagrams.
  - Publishing and gate thresholds.
- **Must preserve:**
  - **The shorts:** `npm run shorts -- build S02 S03` leaves `src/shorts/shorts.generated.ts`
    unchanged after T1.
  - **The promos:** the Play Store promos render as before with `MasterControlCard`'s
    defaults (T5).
  - **Other compositions:** `First-Run-*`, W02, W03, W04 and every `Proof-*` still render as
    before until their own revisions.
  - **Source material:** `video input/` and the ingest's JSON are never modified.
  - **Gates:** no gate threshold changed.

## Architecture

```
mirrorWalkthroughNarration.ts ──npm run narration:edit (T1: voice.mjs planClip + renderTrack)──▶
    public/narration/mirror-walkthrough/edit.m4a          one sample-accurate voice track
    mirrorWalkthroughNarration.generated.ts               placed clips, words (ms), per-clip cues
                │
walkthroughData.ts (T9) — beats {id, from, duration, layout}, copy, regions, cue frames
                │
WalkthroughShell (T6) ─┬─ card     → MasterControlCard (lockup, line)                    T5
                       ├─ stage    → Stage / PortraitStage + WalkthroughCopy              existing
                       ├─ chapter  → Camera (full frame) + Spotlight/FocusRing/PointerClick + Callout   T4
                       ├─ <Audio src=edit.m4a/>   (replaces NarrationTrack here)
                       └─ portrait: NarrationCaptions from the edit's words (correctCaptions, T2)
narration:srt (T2) reads the same generated words → out/mirror-walkthrough.srt
```

- **Why a shell.** W02's brief deferred "a shared walkthrough shell … when W03 starts", and
  W03 and W04 copied the composition instead. The hybrid adds layouts, an audio source and
  cue timing that four cuts (five with W05) would otherwise each re-implement. It is one
  file, consumed by W01 first.
- **Why a second script rather than changing the shorts.** `scripts/shorts.mjs` embeds its
  own `buildNarration`. `narration:edit` calls the same `voice.mjs` primitives (`loadVoice`,
  `planClip`, `renderTrack`, `clipTime`, `wav`) with the same placement rule and loudness
  pass, so the shorts' code path is not touched. The one change to `voice.mjs` is an
  optional `caps` argument whose default is today's `CAPS`. Unifying the two is deferred.
- **Tutorial pauses.** `narration:edit` passes
  `TUTORIAL_CAPS = {sentence: 0.8, clause: 0.45, phrase: 0.3, hesitation: 0.15}` (the
  shorts use 0.5 / 0.3 / 0.2 / 0.1). Fillers, repeats and false starts that `heard.json`
  found still come out. These values are a starting point for Nathan's review, not a gate.

## Copy

Executors place these verbatim. Eyebrows render uppercase. Audiowide only on the card lockup.
In chapters the copy is a step label: eyebrow and title, with a body only where the table
gives one. The voice does the explaining.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open (card) | For Windows and Android | lockup **CTRLbot Mirror** | line: Control your Android phone or tablet from your Windows PC. |
| proof (stage) | Control | Your phone, under your mouse | Click, type and paste on the device from your PC. |
| setup | Setup · 1 of 5, then Setup · 2 of 5 | Install Android platform-tools, then Start the ADB server | — |
| debugging | Setup · 3 of 5 | Turn on USB debugging | On the phone: Settings → About phone → tap Build number seven times, then Developer options → USB debugging. Use a data cable. |
| connect | Setup · 4 of 5, then Setup · 5 of 5 | Authorise this computer, then Start mirroring | — |
| frame | Studio | Frame it for the camera | — |
| paste | Control | Paste from Windows | — |
| capture | Capture | Screenshots and recordings | Recordings include your PC microphone, never the phone's audio. |
| apps | Apps | See and remove apps | — |
| files | Files | Copy files over | — |
| tools | Tools | Shell and logcat | — |
| again | Setup | Back to Setup any time | — |
| close (card) | — | lockup **CTRLbot Mirror** | line: Your phone or tablet, from your PC. |

The setup and connect step labels change at the frame Mirror's panel changes step
(`setupStepAt`), so the label and the panel never disagree.

## Narration clips

Source ranges in seconds on the prepared track. Each range only selects words:
`narration:edit` finds the real silence around them. Placement:
- The first clip in a beat starts at the beat's start + 0.25s; `open` starts at 0.35s.
- Each next clip starts 0.3s after the previous one's planned end.
- Each beat keeps at least 1.0s after its last clip for the result to hold.
- `welcome` runs from `open` into `proof` on purpose: the cut to the live product lands
  on "called CTRLbot Mirror".

| beat | id | source | what is said |
|------|----|--------|--------------|
| open → proof | welcome | 0.33–9.0 | Welcome to CTRLbot. This will be a walkthrough of one of our utilities called CTRLbot Mirror, |
| proof | mirror-what | 10.65–16.85 | basically a way to mirror what is on your Android phone or tablet. |
| setup | install-adb | 30.4–44.0 | So I've done the basic installation, but what we also have to do is we have to install ADB … but also manage applications on it |
| debugging | usb-debugging | 190.45–196.45 | make sure that USB debugging mode is on |
| connect | authorize | 93.15–99.05 | asked to authorize that connection |
| connect | ready | 99.3–106.75 | … green and ready … start mirroring |
| frame | pick-frame | 118.5–127.05 | pick one of these other ones … a better fit |
| frame | padding | 130.2–135.3 | … padding and shadow and such |
| paste | copy-paste | 224.5–237.8 | … copying and pasting … cumbersome to do straight from the panel |
| capture | screenshot | 311.35–316.8 | … hit the screenshot button |
| capture | record-video | 330.25–335.35 | … record it as video |
| capture | record-voice | 342.8–344.8 | It's also going to record your voice. |
| apps | apps | 388.7–401.67 | You have access to all the apps … delete, remove stuff in here |
| files | files-copy | 454.3–459.2 | If you wanted to look at your images, you'd be able to copy stuff over right here. |
| tools | shell-logs | 473.0–479.6 | we have also a shell … look at the logs for the device if you want. |
| again | setup-again | 494.25–497.65 | you can come back to this setup if you're ever having problems. |
| close | thank-you | 500.85–503.1 | Thank you for your time |

## Shot list

For each beat, the regions come from `mirrorRegions` (T3), and the cues are
`cueFrame(edit, clip, word)` (T6), counting the first occurrence unless a number is given.
The camera settles about 0.3s before each cue; the action lands on it; the result holds.

| beat | region(s) | cue → action → result |
|------|-----------|-----------------------|
| proof | `stage`, then `mirroredScreen` | mirror-what "mirror" → PointerClick on a driver's + in the mirrored catalog, with Mirror's own ripple → the mirrored app shows Configure Connection |
| setup | `sidePanel`; Spotlight `sidePanel` | install-adb "install" → PointerClick Install now → the bar fills until "manage", then step 1 ticks and step 2 goes active |
| debugging | `setupStep(3)` | usb-debugging "USB" → Spotlight and FocusRing on step 3 |
| connect | `setupStep(4)`, then `devicesCard`, then `stage` | authorize "authorize" → ring step 4, which ticks · ready "ready" → ring the device's Ready badge · ready "mirroring" → PointerClick Start mirroring → the stage goes live; the camera moves to the stage and holds |
| frame | `studioFrames` with `stage` (portrait: `studioFrames`, then `stage`) | pick-frame "pick" → PointerClick another frame → the frame around the tablet changes · padding "padding" → the padding value rises and the margin grows |
| paste | `mirroredScreen`, then the host field from `connectionRegions('tablet')` scaled into it | copy-paste "copying" → ring the host field · copy-paste "pasting" → PointerClick, then `192.168.1.169` and the caret appear |
| capture | `toolbarCapture` with `stage` | screenshot "screenshot" → PointerClick the camera → Screenshot saved · record-video "record" → PointerClick record → the clock counts |
| apps | `sidePanel` | apps "apps" → the list · apps "delete" → the highlight stops on Kindle, its Uninstall ringed |
| files | `sidePanel` with `filesDrop` | files-copy "copy" → a pointer drag onto the drop area → the area lights; the file joins the list by "here" |
| tools | `sidePanel` | shell-logs "shell" → the command prints its output · shell-logs "logs" → the rail moves to Logcat and lines stream |
| again | `sidePanel` with `railItem('setup')` | setup-again "setup" → ring the Setup rail icon over the all-ticked panel |

## Executor instructions

**Paste to the executor:** *Run `videos/mirror-walkthrough.md` in this checkout, following its
"Executor instructions".*

**Executor: Gemini 3.8 Flash, High reasoning.** Work in the current checkout on `main`; no
branch, worktree or PR. Uncommitted edits to `Roadmap.md` and the other
`videos/*-walkthrough.md` briefs are the approved plan: leave them, and never stage them.

**Outcome.** W01's two narrated renders, rebuilt on the hybrid format: card open and close,
full-frame chapters with a spotlight, ring and pointer on the spoken cue, the voice cut in
silence, captions that match it. T1–T7 build the shared pieces W02–W04 reuse (new:
`narration:edit`, `PointerClick`, `WalkthroughShell`, `mirrorRegions`); T8–T15 rebuild W01.

**Read first:**
- `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/AUTHORING.md`, `docs/NARRATED-WALKTHROUGH.md`
  and `.claude/skills/remotion-markup/SKILL.md`.
- This brief.
- Then: `src/scenes/DeviceSetup.tsx`, `src/scenes/EuiHandoff.tsx`,
  `src/marketing/eui-promo/MasterControlCard.tsx` and `buildNarration` in
  `scripts/shorts.mjs`.

**Loop: T1 to T15, in order.**
1. Resume any uncommitted work on the task's files.
2. Implement exactly the task, in its named files, with this brief's copy, clips and cues
   verbatim. Never invent copy, beats or claims.
3. Verify independently, as `.claude/agents/beat-verifier.md` does: the task's own check or
   the per-task check under Tasks, looking at every still.
4. **On PASS:** mark `[x]`, stage only the task's files plus this brief, and commit
   `Tn: <summary>` with the Co-Authored-By line.
5. **FAIL only for** a lint error, a broken check, or a still that plainly is not its
   evidence line. Anything else is a Review note.

There are no approval stops before the renders.

**Acceptance (T15).**
- Both renders exist, are under 60% inert, and pass `narration:check`. `video:lint` reports
  0 errors for both destinations.
- The landscape render's Whisper words match the edit's: nothing missing or extra at a clip
  edge.
- The .srt comes from the edit.
- Regressions: T1 leaves `shorts.generated.ts` unchanged; T5 leaves the promo poster
  unchanged; the `Proof-Mirror-*` stills look as before.

Then stop testing.

**Limits.** Two repair rounds per task, then `[!]` with the evidence under
`## Blocked notes`, and stop. No nested subagents beyond the verifier. Failing lines only,
never a full log or diff. Retries and polls: two at most. A still over two minutes is
blocked. One render at a time. Stop before repeating an earlier turn.

**Finish.** There is no deploy path: the deliverable is the renders in `out/`. Local review
is `npm run dev` and both contact sheets. Report to Nathan:
- **Done:** the commits and gate results.
- **Local:** both renders, the .srt, `out/mirror-walkthrough/contact.html` and
  `out/mirror-walkthrough-portrait/contact.html`.
- **Smoke test:**
  1. Frame 0 of each render is the composed CTRLbot Mirror card.
  2. In `setup`, the pointer clicks Install now as "install" is said.
  3. `192.168.1.169` reads at a glance in `paste`.
  4. Every sentence ends whole, including "…for your time".
  5. The portrait captions match the voice.
- **Known issue:** only if one remains.
- **Approve or send fixes.** Fixes become new tasks. Do not mark the video done or publish.

After approval, close out per `AGENTS.md`: archive this brief as
`videos/archive/<date>-mirror-walkthrough-r2.md` with a README row, add the cut to
`RELEASE-NOTES.md`, and update `Roadmap.md`.

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked
>
> **Execution limits** are in Executor instructions. One task per fresh context.
>
> **Resume, do not redo.** Before implementing a task, check `git status` for its files. If
> they already carry uncommitted changes, verify those first: on PASS, commit and move on.
>
> **Per-task check:**
> - `npm run check` and `npm run video:lint`.
> - For a task that changes a beat: `npm run video:frames -- mirror-walkthrough contact
>   --beat=<beat>`, then the same with `VIDEO_COMPOSITION=mirror-walkthrough-portrait`, and
>   each still held against the beat's evidence line.
> - The shared tasks (T1–T7) name their own check.

### Shared — built once, reused by W02–W04

- [x] T1: Add `npm run narration:edit`, which plans a long cut's edit list with `voice.mjs` into one sample-accurate track and a generated edit file, and give `planClip` an optional `caps` argument — files: scripts/narration-edit.mjs, scripts/lib/voice.mjs, package.json
  - Usage: `npm run narration:edit -- <narration.ts> <CLIPS export> <ingest slug> --seconds=<cut length> [--out-dir=<dir>]`. `--out-dir` writes both outputs to a scratch folder instead.
    - It transpiles the edit list as `narration-srt.mjs` does.
    - It reads `ingest/<slug>/captions.json` and `heard.json`.
    - It plans every clip with `TUTORIAL_CAPS` (see Architecture), using `buildNarration`'s placement rule in `scripts/shorts.mjs`: a clip never starts later than its `at`.
    - It refuses, naming both clips: a clip that runs into the next or past `--seconds`, and two clips whose source ranges overlap.
  - Writes:
    - `public/narration/<slug>/edit.m4a`: rendered with `renderTrack`, loudness-normalized with the shorts' two-pass `loudnorm`, AAC mono 48 kHz.
    - `<narration.ts dir>/<base>.generated.ts`, carrying a do-not-edit header and exporting `NARRATION_EDIT`:
      - `src` (the public path) and `seconds`.
      - `clips`: `[{id, at, start, end, seconds, removed}]`.
      - `words`: `CaptionWord[]` in composition milliseconds, built through `clipTime` as the shorts' captions are.
      - `cues`: `Record<clipId, {text, ms}[]>`.
  - Logs one line per clip, naming what it removed. `voice.mjs`'s default `caps` stays `CAPS`.
  - Verify:
    - Run it on today's W01 list into a scratch copy: pass `--out-dir=out/_t1/`; the output files exist and the log is sane.
    - `npm run shorts -- build S02 S03`, then `git diff --exit-code src/shorts/shorts.generated.ts`.
- [x] T2: Let `narration:srt` read a planned edit, with spelling corrections applied by a new `correctCaptions` in `narrationCaptions.ts` — files: scripts/narration-srt.mjs, src/audio/narrationCaptions.ts
  - New flag `--edit=<generated.ts>`: page the edit's `words` with `captionPages` (eight a page) instead of `captionsFromClips`. `--corrections=<export>` applies through `correctCaptions(words, corrections)`, exported from `narrationCaptions.ts`, which stays import-free.
  - Without `--edit`, output is byte-identical to today. Verify: W02's .srt regenerates identically with its existing command and `git diff --no-index`, and an .srt is written from `out/_t1/`'s generated file.
- [x] T3: Export Mirror's window geometry from `mirrorData.ts` and derive `mirrorRegions` from it, with `Mirror.tsx` laying out from the same constants — files: src/app-ui/mirror/mirrorData.ts, src/app-ui/mirror/Mirror.tsx
  - Constants: title bar 32, rail 64, side panel 340, toolbar 56, stage margin 28. Replace the literals in `Mirror.tsx` with these, values unchanged.
  - Regions in window pixels:
    - `window`, `titleBar`, `rail`, `railItem(panel)`, `sidePanel`.
    - `stage` and `mirroredScreen(mirrored, frameStyle)`, using `MirrorStage`'s own scale maths.
    - `toolbarCapture` (camera and record).
    - `setupStep(n)`, `devicesCard`, `studioFrames` and `filesDrop`.
  - Where a panel lays its rows out by flow, give those rows fixed heights from named constants, so a region can be derived and never measured.
  - Verify: `npm run check`; the five `Proof-Mirror-*` stills look exactly as before.
- [x] T4: Add a desktop `PointerClick` annotation to `Annotations.tsx` and a `Proof-Mirror-Pointer` still that places it with `mirrorRegions` — files: src/camera/Annotations.tsx, src/app-ui/mirror/MirrorProofs.tsx, src/Root.tsx
  - What it draws: an arrow pointer that travels from `from` to `to` (content coordinates) on the house camera-move easing, arrives about 6 frames before `at`, then a press. The press is a slight scale dip and one ring in CTRLbot blue `#008FD4`, from `theme.ts`.
  - It also takes an optional `dragTo` for the files beat.
  - It sits inside `<Camera>` like `TapIndicator`, with interpolations inline and clamped. `TapIndicator` is untouched.
  - Verify: `npm run still -- Proof-Mirror-Pointer out/_t4.png`. The pointer's tip sits on Setup's Install now button; the ring is centred on it.
- [x] T5: Give `MasterControlCard` an optional `lockup` and a portrait layout, with `Proof-Card-Mirror` stills in both shapes — files: src/marketing/eui-promo/MasterControlCard.tsx, src/Root.tsx
  - `lockup` defaults to `MASTER CONTROL`, so every promo renders as before. The text is set as given, never upper-cased, so `CTRLbot Mirror` keeps its camel case.
  - It must fit on one line in landscape. In portrait, the tricon sits above the lockup and the lockup may break onto two lines. Keep the card's rules: the lockup is composed at frame 0, the line streams in, and the bloom is the motion.
  - Register `Proof-Card-Mirror` at 1920x1080 and `Proof-Card-Mirror-Portrait` at 1080x1920, both with the open card's copy.
  - Verify: `npm run still` of both proofs at frame 0 and frame 90. `npm run still -- Play-Store-EUI-Promo-V3 out/_t5-promo.png --frame=0` looks as before.
- [x] T6: Add `WalkthroughShell`, which plays a cut's beats as card, stage or chapter over the planned edit's audio, with burned-in captions in portrait and `cueFrame`, plus a `Proof-Walkthrough-Shell` composition in both shapes — files: src/marketing/WalkthroughShell.tsx, src/app-ui/mirror/MirrorProofs.tsx, src/Root.tsx
  - Props: `format`, `contentSize`, the beats (`{id, from, duration, layout, card?, copy?, regions?, render?, calloutSide?}`), the generated `edit`, optional `corrections`, `preload` and `background`.
  - How each layout renders:
    - **card:** `MasterControlCard`.
    - **stage:** `Stage` (landscape) or `PortraitStage` (portrait) with `WalkthroughCopy`; the camera holds, then makes one push to the beat's region, never past 0.94.
    - **chapter:** a full-frame `Camera` with `fit="expand"`. Consecutive chapter beats share one camera path, so a move between them is a move, not a cut. The Callout is a card in landscape (`calloutSide`) and `side="top"` in portrait.
    - **Captions:** portrait burns in `NarrationCaptions` from `correctCaptions(edit.words)`, on a bottom scrim above the safe line, in every layout.
  - Audio and timing:
    - One `<Audio src={staticFile(edit.src)}>`.
    - A 15-frame fade wherever the layout changes, keeping every beat's absolute start.
    - Export `cueFrame(edit, clipId, word, nth = 1)`. It returns the composition frame where that word starts and throws if the word is not in the clip.
  - Proof: three beats (card, stage and chapter, each on `MirrorApp`) with a Spotlight and a ring on a `mirrorRegions` region. Register the landscape and portrait versions. The proof's `edit` is a small inline object in `MirrorProofs.tsx` over the tracked `source-normalized.m4a`, with a few words for its captions; it never writes T8's files.
  - Verify: stills at the middle of each proof beat in both shapes: the card composed, the stage panel, and the chapter full-frame with the Callout clear of its subject.
- [x] T7: Write the hybrid format and `narration:edit` into the contract, replacing the rules that say every walkthrough lays out in `<Stage>` — files: AGENTS.md, docs/NARRATED-WALKTHROUGH.md, .claude/agents/beat-implementer.md
  - `AGENTS.md`:
    - Rules: walkthroughs play through `WalkthroughShell`, with chapters full-frame and annotated, and `Stage` only for stage beats.
    - Commands: add `narration:edit`.
  - `NARRATED-WALKTHROUGH.md`:
    - §5: the edit list is planned with `narration:edit`, not hand-trimmed `NarrationTrack` clips.
    - §6: the shell replaces Stage/PortraitStage-only.
    - §7: keep the listening checklist.
  - `beat-implementer.md`:
    - "Marketing scenes lay out with `<Stage>`" becomes the per-layout rule.
    - Read `.claude/skills/remotion-markup/SKILL.md` before writing markup.
  - Verify: no other file changes; `npm run check`.

### W01

- [x] T8: Rewrite W01's edit list from the Narration clips table and build it with `narration:edit` — files: src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts, src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.generated.ts, public/narration/mirror-walkthrough/edit.m4a
  - Ranges and ids exactly as the table, and the file stays import-free.
  - Set each `at` by the placement rule: build once, read the planned lengths from the log, set the `at`s, build again. That is two builds at most.
  - If a beat cannot keep its 1.0s hold inside the Beats table's Sec, mark `[!]` with the measured lengths. Never change the table.
  - Verify: the log removes nothing but fillers and repeats. The `.generated.ts` lists 17 clips.
- [x] T9: Rewrite W01's beat data for the shell: beats and layouts from the Beats table, copy from the Copy table, regions and cue frames from the Shot list — files: src/marketing/mirror-walkthrough/walkthroughData.ts
  - Beats are in frames at 30fps, from the Sec column: 4080 frames in total.
  - `setupStepAt` moves to cue frames: step 2 at install-adb "manage", step 4 at authorize "authorize", step 5 at ready "mirroring", all ticked once the stage is live.
  - `beatShots()` and `SUBJECT` are removed.
  - Verify: `npm run check`; `npm run video:frames -- mirror-walkthrough validate`.
- [x] T10: Rebuild both W01 compositions on `WalkthroughShell` at 4080 frames, with every chapter beat rendering its revision-1 state until T11–T14 — files: src/marketing/mirror-walkthrough/MirrorWalkthrough.tsx, src/Root.tsx
  - Pass `MIRROR_WALKTHROUGH_EDIT` from the generated file and keep `<PromoPreload />`. `NarrationTrack` and `captionsFromClips` leave this cut.
  - `proof` and `again` fall back to the open and close renderers.
  - Verify: the per-task check on `--beat=poster`, `open`, `setup` and `close` in both shapes. `opens-composed` holds.
- [x] T11: Build the proof, setup and debugging beats to the Shot list — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [x] T12: Build the connect, frame and paste beats to the Shot list, adding any pressed state a pointer click needs — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/app-ui/mirror/Mirror.tsx
  - Any `Mirror.tsx` addition is an optional prop; defaults unchanged. `paste` passes `frameStyle="none"`, and its host field comes from `connectionRegions('tablet')` scaled into `mirroredScreen`.
- [ ] T13: Build the capture, apps and files beats to the Shot list — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx, src/app-ui/mirror/Mirror.tsx
  - Never highlight a system package. Any `Mirror.tsx` addition is an optional prop.
- [ ] T14: Build the tools and again beats to the Shot list — files: src/marketing/mirror-walkthrough/MirrorBeats.tsx
- [ ] T15: Run the feature gates on both shapes, render both, write the .srt, check the voice, and record the results here — files: videos/mirror-walkthrough.md
  - Gates and renders:
    - `npm run check`.
    - `npm run video:lint -- --destination=social-walkthrough` and `--destination=social-walkthrough-vertical`.
    - `npm run video:frames -- mirror-walkthrough validate`, then `contact` for both shapes.
    - Render both with `--codec=h264 --crf=20`, one at a time, never `--muted`.
    - `video:frames … check` and `narration:check` on both.
    - `npm run narration:srt -- … --edit=src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.generated.ts`.
    - Confirm every file exists.
  - Voice:
    - `python scripts/lib/transcribe.py out/mirror-walkthrough.mp4 out/_t15-heard.json`, then compare its words with the edit's `words`.
    - Differences in spelling only (ControlBot, numerals) are notes. A word missing or extra at a clip edge is `[!]`, naming the clip.
  - Regressions:
    - The five `Proof-Mirror-*` stills look as before.
    - One still each of `terminator-walkthrough`, `iot-phone-walkthrough` and `iot-tablet-walkthrough` at frame 600 still renders.
  - Runs straight after T14 with no approval stop. Does not mark the video done: Nathan reviews both renders and both contact sheets, and his notes come back as new tasks.

## Deferred

- Unify `scripts/shorts.mjs`'s `buildNarration` with `narration:edit`.
- A join check in `narration:check`. For now `narration:edit` refuses overlaps and cuts in
  silence by construction.
- Footage of Android's own Settings for `debugging`.
- Conceptual diagrams. W02's server/client diagram is planned in W02's brief; the rest are
  for W05 or later.
- Whether burned-in captions keep the per-word highlight, which is a third place to look in
  portrait. Nathan's call at review.
- `@remotion/layout-utils` overflow checks, if a step label ever carries a long body again.
- Removing `NarrationTrack` once `ai-walkthrough` moves to `narration:edit`.
- Close-out (archive this brief as `videos/archive/<date>-mirror-walkthrough-r2.md`,
  `RELEASE-NOTES.md`, `Roadmap.md`) after Nathan's review. The recording stays in
  `video input/` until S01 ships.

## Handoff

- **Ready now:** T1.
- **Ready later:**
  - T2 needs T1. T3 is independent, but run it in order.
  - T4 needs T3. T5 is independent. T6 needs T1, T2, T3 and T5.
  - T7 needs T1–T6, since it describes code that exists.
  - T8 needs T1. T9 needs T3, T6 and T8. T10 needs T9.
  - T11–T14 run in order after T10. T15 needs T14.
- **Then:** W02 (`videos/terminator-walkthrough.md`, revision 2) starts after T15 and Nathan's
  review of these renders.
- **Blocked:** nothing.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the contact sheet review.

- T8: Narration edit built with 17 clips, 136.0s total duration. Beat 'again' hold is 0.577s (clip 'setup-again' measured 4.238s from 126.685s to 130.923s inside the 4.5s beat 127.0s–131.5s). All other 12 beats maintain >= 1.5s hold.

## Contact sheet

> `npm run video:frames -- mirror-walkthrough contact` renders one still per beat, and
> with `VIDEO_COMPOSITION=mirror-walkthrough-portrait` the portrait sheet. Mark each
> ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
