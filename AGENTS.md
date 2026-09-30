# CTRLbot Remotion — Contributor Context

Motion graphics and training video for the CTRLbot products: the Android app in
`../../1 - CTRLbot.av/CTRLbot-IoT` first, then CTRLbot.AI, CTRLbot.IO, CTRLbot Mirror and CTRLbot Terminator.
Open work is in `Roadmap.md`; what is delivered is in `RELEASE-NOTES.md`.

## Commands

```bash
npm install
npm run sync:tokens    # pull design tokens, fonts and icons from the app repo
npm run dev            # Remotion Studio
npm run check          # tsc --noEmit + composition list
npm run video:lint     # the anti-slop gate — run this before reporting done
npm run ingest:recording -- --list                     # recordings in video input/
npm run ingest:recording -- <slug> "<file name>.mp4"   # transcript, voice, stills
npm run shorts -- list                                 # every 30-second short
npm run shorts -- all S05                              # build, brief, render, kit
npm run narration:prepare -- <slug> "C:\path\to\walkthrough.mp4"
npm run narration:check -- out/<slug>-narrated.mp4
npm run loop:render    # the web loops — 2x supersampled, see below. NOT `npm run render`
npm run loop:seam -- out/web/eui-loop-route-v2.mp4    # the loop gate
npm run loop:copy -- <path.json>                      # hand the copy timings to the site
```

Render a scene or a still:

```bash
npm run render -- First-Run-Phone out/first-run-phone.mp4 --codec=h264 --crf=20 --muted
npm run still -- Scene-Device out/frame.png --frame=520
```

## Remotion agent skills

The official skills are installed in `.agents/skills` and symlinked into `.claude/skills`.
**Read the relevant one before writing composition code** — they encode the current API
and the Studio-interactivity rules this project follows:

| Skill | Use for |
|---|---|
| `remotion-markup` | animation, layout, timing, media, fonts — the default |
| `remotion-interactivity` | keeping markup editable in Studio |
| `remotion-docs` | looking up an API instead of guessing |
| `remotion-render` | render invocations and flags |
| `remotion-best-practices` | when unsure which applies |

Update them with `npx skills add remotion-dev/skills`.

## Making a new video

Do not start a composition from a prompt. **[docs/VIDEO_WORKFLOW.md](docs/VIDEO_WORKFLOW.md)
is the contract**: a brief from `videos/_TEMPLATE.md`, decomposed into atomic tasks by
`/video-prep`, run one at a time with a gate between each.

When the input is Nathan's narrated app demonstration, read
`docs/NARRATED-WALKTHROUGH.md` too. The recording in `video input/` is ingested once with
`npm run ingest:recording`, which writes `ingest/<slug>/`: a word-timed transcript, captions
and a contact sheet of every screen change. The recording supplies the spoken performance
and beat order; the motion graphic uses a non-destructive edit of that narration. A long
video is narrated only — there is no silent cut — and is made in two shapes from one set of
beats: landscape 1920x1080 for YouTube (`social-walkthrough`, captions as an .srt) and
portrait 1080x1920 for TikTok, YouTube Shorts, LinkedIn and X
(`social-walkthrough-vertical`, captions burned in, 2:20 at most). Shorts are portrait only.
`videos/archive/2026-09-30-mirror-walkthrough.md` and `src/marketing/mirror-walkthrough/` are the worked
example. A `Status: DRAFT` transcript is corrected against the contact sheet before any beat
is cut from it.

`npm run video:lint` and `npm run video:frames` enforce mechanically what
`docs/AUTHORING.md` describes in prose. Their thresholds are measured against the
approved First-Run cuts and the rejected Master Control promo — never tune one to make
a particular video pass.

`src/compositions/MasterControlPromo.tsx` is kept, unregistered, as the worked failure.
Read it before writing a marketing scene.

## The app is the source of truth

`npm run sync:tokens` reads `../../1 - CTRLbot.av/CTRLbot-IoT/app/src/main/res` and writes:

- `src/design/tokens.generated.ts` — every color, dimen, text style and shape
- `public/fonts/` — Montserrat (UI) and Audiowide (wordmark), the app's own files
- `public/app-assets/` — EUI icons as SVG, cell gradients as PNG

Never hand-edit `tokens.generated.ts`. Never invent a color or a radius — if the app
does not define it, ask whether it belongs on screen at all. Re-run the sync after any
app resource change; the diff is the drift report.

Point at a different checkout with `npm run sync:tokens -- ../path/to/CTRLbot-IoT`.

## Rules

- Drive every animation from `useCurrentFrame()`. No CSS `transition`, no CSS
  `animation`, no timers, no unseeded randomness.
- Write `interpolate()` calls inline in the `style` prop with literal easing and
  output values, and prefer `scale` / `translate` / `rotate` over `transform`.
  Studio can only keyframe values it can read statically.
- Name elements with `Interactive.Div name="..."` so they are selectable in Studio.
  Rigs (`Camera`) and overlays with absurd geometry (`Spotlight`) stay plain.
- Three faces, following ctrlbot.io: **Audiowide** for headlines and the CTRLbot
  wordmark only; **Montserrat** (the app's face) for all readable copy;
  **Space Mono** for small uppercase eyebrows and technical labels. Audiowide is a
  texture — in motion graphics the text delivers the message, not the font, so it
  never carries body copy or a label.
- **The name is `CTRLbot`, always — and a video signs off with a product, not a URL.**
  There are three: **CTRLbot IoT** (the Android app), **CTRLbot.AI** (the web
  assistant) and **CTRLbot.IO** (the website). `CTRLbot` alone is correct at the top
  level; name the specific one when the cut is about it, so an app video closes on
  `CTRLbot IoT`. Lowercase `ctrlbot.ai` and `ctrlbot.io` are **addresses** and nothing
  else — a lowercase domain in the corner of a cut about the app names a different
  product, which is exactly the mistake it looks like. The two companion Windows
  utilities are always named in full: **CTRLbot Mirror** and **CTRLbot Terminator**.
- Keep composition metadata (`width`, `height`, `fps`, `defaultProps`) inline on
  `<Composition>`, with no type assertions.
- Run `npm run check` after changes, and render a still when layout moves.

## Architecture

```text
src/
  destinations.ts frame, duration window, safe area and banned phrases per destination
  design/       tokens.generated.ts (from the app) + theme.ts (curated)
  app-ui/       live React rebuilds of app surfaces, laid out in dp
                — viewports.ts is the one definition of how big a surface is
                web/ is the *other product* — ctrlbot.ai, laid out in CSS px
  camera/       Camera rig, Spotlight, FocusRing, TapIndicator, Callout
  scenes/       one file per scene + shared.ts for scene lengths
  marketing/    Stage and DualStage — the landscape promo layouts
                web-loops/ — the ctrlbot.io panel loops, which are not cuts
  compositions/ FirstRun.tsx — the cut
videos/         one markdown brief per cut; _TEMPLATE.md to start; archive/ once delivered
video input/    narrated recordings, never modified; archive/ once every cut is delivered
ingest/         one folder per recording: transcript.md, words.json, captions.json, heard.json
                (every sound, ums and repeats included), stills
src/shorts/     the 30-second shorts: shortsData.ts (one entry each) and Short.tsx
scripts/        video-lint, video-frames, loop-seam — the gates; loop-render, loop-copy;
                ingest-recording and narration — the recording pipeline;
                lib/voice.mjs — the narration edit the shorts are cut with
```

## Shorts are data

Every 30-second short is one entry in `src/shorts/shortsData.ts`, rendered by one
component, `src/shorts/Short.tsx`: a hook with the one idea settled at frame 0, proof beats
pushed into by the house camera, burned-in captions, and a sign-off naming the product.
A beat's source is an ingested recording, a render in `out/`, a motion graphic or a still;
`npm run shorts -- build` cuts each beat into `public/shorts/<id>/` and writes
`shorts.generated.ts`. Never edit that file, and never play footage straight from
`video input/`.

The build also cuts the narration, into one track per short (`scripts/lib/voice.mjs`).
A clip's range only picks its words; the build cuts in the real silence around them, never
on Whisper's word times, which run early and clip the last syllable. It takes out the ums,
repeats and false starts that `ingest/<slug>/heard.json` found (Whisper hides them), and
shortens pauses to 0.5s after a sentence, 0.3s after a comma, 0.2s mid-phrase and 0.1s
after "the" or "a". Its log names everything it removed. `verbatim: true` on a clip keeps
every sound and pause. The captions are timed from the same edit.

A new short is a new entry, then `npm run shorts -- all <id>`, which builds, writes the
brief the gates read (`videos/short-<id>.md`), renders `out/shorts/<id>.mp4` and writes
its publishing kit. Vertical (`social-short`) for phone footage and general graphics;
landscape (`social-short-landscape`) for tablet footage.

## Web loops are not cuts

> **Full runbook — every command, in order, for both the videos and the copy beside them:**
> `C:\0-Repo\2 - CTRLbot.io\ctrlbot-io-site\docs\MOTION-PIPELINE.md`. It lives in the site
> repo because that is where the result is verified, but the source of truth for both is
> `webLoopData.ts` in this one. Read it before changing a loop.

`src/marketing/web-loops/` renders media cells for ctrlbot.io, not video anyone watches
end to end. They are registered under `Web-Loops`, they carry **no copy** — the site's
layout grammar puts a text panel beside the cell, so the words are HTML — and they obey
one rule nothing else here does: **frame 0 and the frame after the last one must be the
same picture.** A `<video loop>` wraps with no dissolve, so a beat that ends somewhere
new is a jump cut every ten seconds. `npm run loop:seam` is the gate; it is calibrated to
pass those loops and fail `playStore_promo3_30s.mp4`, which is a cut and not a loop.

**Route and Matrix open cold and close on the power control.** Nothing routed at t=0, the
demonstration in between, then the power tap releases the room and returns the panel to
the state it opened on — which is how a cold open and a closed cycle coexist. Do not
"fix" the empty grid at either end, and do not move the closing tap past about 0.88:
`LoopTap` trails 0.09 past its tap, so a later one leaves a focus ring sitting on the
seam. Audio is unchanged and opens warm; a level has no cold state to return to.

Two frames, because the site's wall alternates shapes: `WEB_LOOP` is 1920x1200 and
`WEB_LOOP_SQUARE` is 1200x1200, and the square tile is its own composition rather than a
crop — a 16:10 frame cut to 1:1 loses a third of its width through the source column. Its
panel is sized by a constraint that is not visible in the square: on a phone the wall
stacks and *every* tile shows 16:10, so the square one gets cropped 225px top and bottom.

**Render them with `npm run loop:render`, never `npm run render`.** The push scales the
panel, so the surface is resampled to a slightly different size every frame; at 1x the
interface crawls. That script renders at 2x and downsamples with lanczos, which measured a
31% drop in frame-to-frame change on the square tile — and smaller files, because most of
what was being encoded was the shimmer.

Read the header of `src/marketing/web-loops/webLoopData.ts` before adding one, and
`LoopStage.tsx` before writing the composition — it carries `<PromoPreload />`, without
which frame 0 renders before the app's CSS background images have loaded. In a promo that
is a glitch mid-cut; in a loop it lands on the frame the viewer sees every ten seconds and
the frame the seam is measured against.

The destination is `website-panel-loop` in `destinations.ts`.

Training cuts are full-bleed and `Callout` overlays them. Marketing cuts use `<Stage>`:
the surface in a panel down one side, copy in a column beside it. Because that panel is
aspect-matched to the surface, the camera cannot push past about 0.94 without clipping
the corner controls — `<Spotlight>` carries emphasis instead.

The split that matters: `app-ui/` renders a surface at its natural dp size and knows
nothing about video; `camera/` decides what the frame looks at. That is what makes a
push-in onto a single control possible, and it is why regions are expressed in the
same units as the Android layout.

`src/scenes/EuiHandoff.tsx` is the reference implementation — read it before adding a
scene. `docs/GOTCHAS.md` has what has already cost time; `docs/TABLET-HANDOFF.md` is the
tablet build brief.

## CTRLbot.AI is a second product

`src/app-ui/web/` rebuilds **ctrlbot.ai**, the web assistant — not the Android app. It
breaks two rules the rest of this repo lives by, deliberately:

- **It lays out in CSS pixels, not dp**, because its source is a stylesheet and not an
  Android layout. `webViewport.ts` states the viewport it is rendered at; nothing inside
  is scaled by hand, because `BrowserFrame` scales the whole plane once.
- **It does not use the app's tokens or Montserrat.** Its colours and its face belong to
  a different product, and `webTheme.ts` mirrors them out of that repo's
  `public/index.html` the way `tokens.generated.ts` mirrors the Android resources. The
  video's own copy column stays on the house faces.

The truth sources are `../../0 - CTRLbot.ai/ctrlbot.ai/public/index.html` for the interface
and `docs/about/About_CTRLbot_AI.md` in that repo for every claim — it carries an approved-
claims list, and a promo may not go past it. Write the name `CTRLbot.AI` for the assistant,
`CTRLbot` for the platform, and `ctrlbot.ai` only as the address.

Its surface is a website, so it is framed in `marketing/BrowserFrame.tsx` rather than a
bezel. That component is generic on purpose and impersonates no vendor; its greys come
from `theme.ts`'s `chrome` group, which is app greys doing a second job for the same
reason `bezel` is.

## Framing on portrait

Width is the binding dimension in a 1080x1920 frame. A full-width portrait UI cannot
be zoomed far without cropping the interface, so emphasis comes from `<Spotlight>` and
`<FocusRing>` while the camera makes modest, composed moves. Landscape (tablet) cuts
can lean much harder on the camera. Use `frameWidth(center, width)` to state a shot as
"this much of the interface across", which is the honest control on portrait.

## Product accuracy

Check copy against `../../1 - CTRLbot.av/CTRLbot-IoT/AGENTS.md`, the Android resources, and a current
build before publishing. In particular:

- EndPoint switching is deferred and hidden; do not train users to select it.
- Power presets use discrete Power On and Power Off commands; toggle-only devices do
  not join those system presets.
- The EUI exits through a two-second press-and-hold in the top-left.
- No credentials, customer identifiers, or public addresses in captures or props.

CTRLbot Mirror and CTRLbot Terminator are checked against their own repositories,
`C:\0-Repo\Utilities\CTRLbot-Mirror` and `C:\0-Repo\Utilities\CTRLbot Term`, and against
the public-claims rules in the ctrlbot.io README. Mirror has a public release; do not say
Terminator can be downloaded until its public release is verified.

## Licensing

Remotion is source-available and free for individuals and for-profit organizations up
to three people, plus non-profits and evaluation. Larger for-profit organizations need
a company license. Confirm before commercial production:
<https://github.com/remotion-dev/remotion/blob/main/LICENSE.md>

## Execution profile

Machine-read by `$architect` / `/architect` and `$executable-handoff` / `/executable-handoff`.
Field order is fixed. This block is the execution authority for this repository and does not
apply to any other. It summarizes `docs/VIDEO_WORKFLOW.md`, which remains the detailed
contract for the assembly line.

- **Plan home:** `videos/<slug>.md`, one brief per cut, from `videos/_TEMPLATE.md`. A narrated cut names its recording's folder in `ingest/`
- **Task granularity:** one sentence naming its files, 1 to 3 files, independently renderable. Syntax: `- [ ]` pending, `- [x]` verified and committed, `- [!]` blocked
- **Direction gate:** no. The line runs every task, then renders, without stopping for approval. Nathan reviews once, at the end: the renders in `out/` and the contact sheet at `out/<slug>/contact.html`. His notes come back as new tasks and the line runs again
- **Verifier:** an independent `beat-verifier` per task (`.claude/agents/beat-verifier.md`), tuned lenient, that runs the gates and looks at the rendered still. Two repair rounds, then `[!]` and stop
- **Per-task check:** `npm run check`, `npm run video:lint`, and `npm run video:frames -- <slug> contact --beat=<beat>`, then the still held against that beat's evidence line
- **Feature check:** `npm run video:lint -- --destination=<destination>`, `npm run video:frames -- <slug> contact`, the render, and `npm run video:frames -- <slug> check out/<slug>.mp4`. A long video does each for both shapes (`VIDEO_COMPOSITION=<slug>-portrait` for the portrait one) and adds `npm run narration:check` on both renders and `npm run narration:srt` for the landscape captions
- **Local run:** `npm run dev` for Remotion Studio, and the contact sheet in a browser
- **Deploy path:** none from a run. The deliverable is the render in `out/`. Publishing to YouTube, the social feeds, the Play Store listing or ctrlbot.io is a separate step, and ctrlbot.io loops follow that repository's `docs/MOTION-PIPELINE.md`
- **Close out:** archive the brief as `videos/archive/<date>-<slug>.md` with a row in that README, add the cut to `RELEASE-NOTES.md`, and remove it from `Roadmap.md`. Move a recording to `video input/archive/` once every cut planned from it is delivered
- **Executor:** Gemini 3.8 Flash, High reasoning. It has to be able to look at a rendered still, because the verifier's verdict depends on it
