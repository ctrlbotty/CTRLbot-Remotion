# CTRLbot Remotion

Motion graphics and training video for the CTRLbot products: CTRLbot IoT, the native
Android app in [`../../1 - CTRLbot.av/CTRLbot-IoT`](../../1%20-%20CTRLbot.av/CTRLbot-IoT), plus CTRLbot.AI,
CTRLbot.IO and the two Windows utilities, CTRLbot Mirror and CTRLbot Terminator.

[Roadmap](Roadmap.md) · [Release notes](RELEASE-NOTES.md) · [Agent context](AGENTS.md)

The app's design tokens, fonts and iconography are pulled straight out of its Android
resources, and its key screens are rebuilt as live React — so the camera can push into a
single control, change UI state mid-shot, and hold on the result.

## Start here

Requires Node.js 20 LTS or newer.

```bash
npm install
npm run sync:tokens
npm run dev
```

`sync:tokens` reads `../../1 - CTRLbot.av/CTRLbot-IoT/app/src/main/res`. Point at a different checkout with
`npm run sync:tokens -- ../path/to/CTRLbot-IoT`.

## Making a new video

**[docs/VIDEO_WORKFLOW.md](docs/VIDEO_WORKFLOW.md) is the contract.** Do not start a
composition from a prompt. Copy `videos/_TEMPLATE.md`, fill in the audience, the promise
and the beats, then `/video-prep <slug>` decomposes it into atomic tasks and `/video-run`
works through them with a gate between each.

```bash
npm run video:lint                              # source: structure and copy
npm run video:frames -- <slug> validate         # brief arithmetic, no render
npm run video:frames -- <slug> contact          # a still per beat + contact.html
npm run video:frames -- <slug> check out/<slug>.mp4
```

The gates are calibrated against the cuts in `out/` — two approved, one rejected — and
their thresholds are measurements, not preferences. `npm run video:lint:selftest` proves
they still tell those cuts apart.

Two other ways to run the line:

- **Coordinated.** Claude runs Gemini or Codex workers task by task, verifying each in a
  clean worktree: [docs/COORDINATION.md](docs/COORDINATION.md).
- **Review fixes.** Nathan's notes on a nearly finished cut, landscape first, then carried to
  portrait: [docs/REVIEW-FIX-PROMPT.md](docs/REVIEW-FIX-PROMPT.md).

### Narrated walkthroughs

Most videos now start from Nathan demonstrating a product in his own voice. The recording
goes in `video input/`, one command turns it into everything the cut is built from, and
[docs/NARRATED-WALKTHROUGH.md](docs/NARRATED-WALKTHROUGH.md) covers the rest.

```bash
npm run ingest:recording -- --list
npm run ingest:recording -- mirror-walkthrough "CTRLbot Mirror Tutorial.mp4"
```

That writes a polished voice track to `public/narration/<slug>/`, and to `ingest/<slug>/` a
word-timed transcript, captions, a record of every sound including the ums and repeats
Whisper leaves out, and a contact sheet with a still at every screen change beside what was
being said. The recording itself is never touched. The transcript starts as a draft; correct
it against the contact sheet, then build the brief and the voice edit from it. Silent and
narrated compositions render to separate files:

```bash
npm run narration:check -- out/<slug>-narrated.mp4
```

The two recordings in `video input/` today, CTRLbot Mirror and CTRLbot Terminator, are
already ingested.

### Shorts

Every 30-second short is one entry in `src/shorts/shortsData.ts`: the product, a one to
three word title, the one idea, a few beats of footage, a render, a motion graphic or a
still, and the narration cut from an ingested recording. One command does the rest:

```bash
npm run shorts -- list
npm run shorts -- all S02
```

That cuts the beats into `public/shorts/S02/`, cuts the narration into one cleaned track
beside them, writes the brief the gates read, renders `out/shorts/S02.mp4` with its narration
and burned-in captions, and writes a publishing kit (poster, captions file, title,
description, tags) to `out/shorts/S02/`. Vertical for phone footage and general graphics,
landscape for tablet footage.

The narration cut (`scripts/lib/voice.mjs`) finds each line's words in the waveform and cuts
in the silence around them, so no word loses its last syllable; takes out ums, repeated
words and false starts; shortens long pauses; and times the captions from the result. The
build log lists everything it removed.

## Compositions

| Folder in Studio | Compositions | Format |
|---|---|---|
| Shorts | `Short-S02`, `Short-S03`, one per entry in `src/shorts/shortsData.ts` | 1080x1920 or 1920x1080, 30s, narrated with captions |
| First-Run | `First-Run-Phone` (Review 13), `First-Run-Tablet` (Review 08) | 1080x1920 and 1920x1200, 120s, silent and caption-led |
| CTRLbot-AI | `AI-Walkthrough`, `AI-Walkthrough-Narrated` | 1920x1080, 120s |
| Device-Database | `device-database` | 1920x1080, 120s |
| Hub | `hub-30`, `hub-30-square` | THE HUB cell for ctrlbot.io |
| Web-Loops | `Web-Loop-*` | ctrlbot.io panel loops; render with `npm run loop:render` |
| Marketing, Marketing-v3 | `Play-Store-EUI-Promo`, `-30`, `-V3`, `-V3-30` | Play Store previews |
| Marketing-v1 | `V1-Play-Store-Promo` | The first cut through the assembly line; a reference |
| Scenes-Phone, Scenes-Tablet | `Scene-*` | One per First-Run scene, for retiming in isolation |
| Surface-Proofs | `Proof-*` | Stills for checking a live surface against the app |

The first run is seven scenes: open, CTRLbot AI, Device, Connect and test, Build the room,
EUI handoff, close. It is silent and caption-led, because that is how it plays embedded in
docs and on social.

Marketing cuts use `<Stage>`: the surface in a panel down one side, copy in a column beside
it, on the `background.stage` gradient. `<DualStage>` carries two surfaces at once.

## Render & Output Directory

All rendered video outputs (`.mp4`) and still frames (`.png`) are saved in the **`out/`** directory at the root of this project (`./out/`).

### Render commands

Render a video composition:

```bash
npm run render -- First-Run-Phone out/ctrlbot-first-run-phone.mp4 --codec=h264 --crf=20 --muted
```

Render a single still frame:

```bash
npm run still -- Scene-Device out/frame.png --frame=520
```

### Output location (`out/`)

* **Video Exports:** All rendered video files (e.g., `out/first-run-phone-review-13.mp4`) are placed here.
* **Scratch:** One-off debugging stills go in `out/_scratch/`, not the root of `out/`.
* **Stills & Proofs:** Image exports, scene previews, and frame proofs (e.g., `out/marketing-contact/`, `out/promo-proof/`) are organized within `out/`.
* **Git Status:** The `out/` directory and raw video assets are ignored by Git (`.gitignore`).

## How it fits together

```text
video input/              narrated recordings, never modified; archive/ once delivered
ingest/<slug>/            per recording: transcript.md, words.json, captions.json, heard.json, stills
videos/
  _TEMPLATE.md            the brief form: audience, promise, beats, narration
  <slug>.md               one file per cut: brief, tasks, review notes
  archive/                briefs that have been run
scripts/
  video-lint.mjs          structural and copy gates over the source
  video-frames.mjs        brief validation, contact sheet, rendered-frame gates
  ingest-recording.mjs    recording to transcript, captions, voice track and stills
  narration.mjs           voice track preparation and the rendered-audio gate
  shorts.mjs              the shorts production line
  lib/                    transcribe.py and heard.py (the two listening passes), voice.mjs
                          (the narration edit), tsx-scan, brief parser, PNG decoder
src/
  destinations.ts         frame, duration window, safe area and banned phrases per destination
  design/
    tokens.generated.ts   colors, color state lists, dimens, type scale, shapes — from the app
    theme.ts              curated, video-facing decisions built on those tokens
  marketing/
    Stage.tsx             the landscape marketing layout: panel right, copy column left
    DualStage.tsx         two surfaces side by side, phone sized for legibility first
    play-store-promo-v1/  the first cut through the line, kept as a reference
  app-ui/
    viewports.ts          the one definition of how big a surface is
    PhoneEui / TabletEui  the End User Interface, portrait and landscape
    DriverCatalog         Device Drivers, both form factors
    ConnectionPanel       Configure Connection, both form factors
    CtrlbotAi             the in-app FAQ and troubleshooter
    PhoneNavMenu          the setup nav sheet, expanded and collapsed
    TabletNavRail         the shared XML-derived landscape setup rail
    CapturedScreen        a screenshot cropped to its screen and scaled to viewport size
    AppIcon               the app's own icons, tintable
  camera/
    Camera.tsx            a camera over a fixed-size content plane
    Annotations.tsx       Spotlight, FocusRing, TapIndicator, Callout
  scenes/                 one file per scene, plus shared.ts for lengths
  compositions/
    FirstRun.tsx          the cut
```

The important split is between `app-ui/` and `camera/`. An app surface renders at its
natural dp size and knows nothing about video; the camera decides what the frame is
looking at. That separation is what makes a push-in onto one control possible, and it is
why every region is expressed in the same units as the Android layout.

## Design rules

**Three faces, following [ctrlbot.io](../../2%20-%20CTRLbot.io/ctrlbot-io-site/index.html).**
Audiowide for headlines and the `CTRLbot` wordmark only; Montserrat (the app's own face)
for all readable copy; Space Mono for small uppercase eyebrows. Audiowide is a texture —
in motion graphics the text carries the message, not the font.

**Colors come from the app.** `res/values/colors.xml` and `res/color/*.xml` are the
palette. `src/design/theme.ts` maps them to semantic names and adds only the display type
ramp that video needs and a phone UI does not.

**Framing on portrait is width-bound.** In a 1080×1920 frame you cannot zoom far on a
full-width portrait UI without cropping it. Emphasis comes from `<Spotlight>` and
`<FocusRing>`; the camera makes modest, composed moves.

## Agent skills

The official Remotion skills are installed in `.agents/skills` and symlinked into
`.claude/skills`. `remotion-markup` and `remotion-interactivity` shape how code here is
written. Reinstall with `npx skills add remotion-dev/skills` (pinned by `skills-lock.json`).

## Where to pick up

[Roadmap.md](Roadmap.md) has the Q4 plan: thirty videos, two a week, with the release
calendar. [RELEASE-NOTES.md](RELEASE-NOTES.md) has what is already delivered.
[docs/GOTCHAS.md](docs/GOTCHAS.md) has what has already cost time, and
[docs/TABLET-HANDOFF.md](docs/TABLET-HANDOFF.md) has the tablet implementation notes and the
full-cut frame map.

## Product accuracy

Check copy against [`../../1 - CTRLbot.av/CTRLbot-IoT/AGENTS.md`](../../1%20-%20CTRLbot.av/CTRLbot-IoT/AGENTS.md), the Android
resources, and a current build before publishing. EndPoint switching is deferred and
hidden; power presets use discrete Power On and Power Off commands; the EUI exits through
a two-second press-and-hold in the top-left; no credentials or customer identifiers may
appear.

CTRLbot Mirror and CTRLbot Terminator are checked against their own repositories in
`C:\0-Repo\Utilities`. Do not say Terminator can be downloaded until its public release
is verified.

`docs/About_CTRLbot_IoT.md` is synced from the app repo. The July 29 Markdown user manual
is a useful supporting snapshot, but the Android resources and a current build remain the
source of truth.

## Licensing

Remotion is source-available, free for individuals and for-profit organizations up to
three people, plus non-profits and evaluation. Larger for-profit organizations need a
company license. Confirm before commercial production:
[Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
