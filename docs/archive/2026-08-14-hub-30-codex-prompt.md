# Codex prompt — HUB-30

Paste everything below the line into Codex. It is self-contained.

---

Build the 30-second **THE HUB** media cell for ctrlbot.io, end to end, across two
repositories.

## Repositories

| | Path |
| --- | --- |
| Remotion (the video) | `C:\0-Repo\3 - CTRLbot Content\CTRLbot-Remotion` |
| Site (where it lands) | `C:\0-Repo\2 - CTRLbot.io\ctrlbot-io-site` |

## Read these first, in this order, in full

1. `videos/hub-30.md` — **the specification.** Watching, promise, scope, the six beats
   with their evidence, the constraints, and the nine tasks.
2. `docs/HUB-30-ORCHESTRATION.md` — **the contract.** The loop, the standing gates, what
   ends a run.
3. `AGENTS.md` — house rules: animation driven by `useCurrentFrame()`, inline clamped
   `interpolate()`, `Interactive.Div name=` on selectable elements, the three faces, the
   product-naming rule, and the fact that the app repo is the source of truth.
4. `src/marketing/device-database/DeviceDatabase.tsx` and `deviceDatabaseData.ts` — the
   2-minute cut this derives from. Every state, string and payload you need already
   exists here.
5. `src/marketing/web-loops/LoopAi.tsx` — the precedent for a full-bleed 16:10 cell with
   no panel and no gradient. Its header explains the seam law; that law applies here.
6. `docs/DEVICE-DATABASE-TRANSCRIPT.md` — the walkthrough this is all transcribed from.
   The authority on what is true.

## What you are making

A **900-frame, 1920x1200, 30fps** Remotion composition registered as `hub-30`, rendered
to `out/web/hub-30-v1.mp4`, then shipped into the site's Hub unit — plus a rewrite of
the paragraph beside it.

It is a **loop**, not a cut. The site's media cells are `<video autoplay muted loop
playsinline>`, so frame 0 and the frame after the last must be the same picture.

It is **full bleed**: no `<Stage>`, no device panel, no `background.promo`, no drop
shadow, no copy column. `<AbsoluteFill>` + `<Camera>` and nothing else. The tablet
surface is 1280x800, exactly 16:10, so a full-frame shot is exactly 1.5x with no
resampling. The site's cell is `aspect-ratio:16/10` with `object-fit:cover`, so a 16:10
render is shown whole.

## Scope — the part that is easy to get wrong

This is about the **device database as a resource**: manufacturer after manufacturer,
every kind of device, and each driver carrying its manual, its connection and its API.

It is **not** about CTRLbot IoT or how you use it. No adding a device, no connecting, no
typing an address, no testing, no connection log, no Global Cache, no End Point story, no
activities. `End Point` appears once, as a category in the sort list, and nowhere else.

It says **nothing about the future**. No community, no contribution, no sign-in, no
"coming soon". That applies to the video and to the site paragraph in T8 — which
currently says "The hub is being built… Access will open behind sign in when the shelf is
ready", and must stop saying it.

## How to work

Follow `docs/HUB-30-ORCHESTRATION.md` exactly. In short:

- Nine tasks, in order, from the Tasks list at the bottom of `videos/hub-30.md`.
- One task, one gate, one commit. Commit message: `hub-30: <task id> — <what changed>`.
- After each task run the standing gates: `npm run check`, `npm run video:lint`,
  `npm run video:lint -- --selftest`, `npm run video:frames -- hub-30 validate`.
- **Render the still and open it.** `npm run video:frames -- hub-30 contact --beat=<id>`.
  Hold it against that beat's Evidence column word for word before marking the task done.
- Mark the task `- [x]` in `videos/hub-30.md` only after it genuinely passes.

## Hard rules

- **Never weaken a gate.** `video-lint.mjs` says it in its own header: *do not weaken a
  rule to unblock a video; fix the video.* Its thresholds were calibrated against an
  approved cut and a deliberately-failing one. If a rule looks wrong, stop and say so.
- **Never invent anything on screen.** Driver names, model numbers, the Epson description
  and setup text, ports, command payloads and the four line endings are transcribed from
  the recording and live in `deviceDatabaseData.ts`. If a beat needs a fact that is not
  in that file, the beat is wrong — stop and ask.
- **Never use a colour the app does not define.** Everything comes from
  `src/design/theme.ts` or `tokens.generated.ts`. `theme-colors-only` will catch a hex
  literal; it will not catch a hand-written `rgba()`, so derive those from a token.
- **Never hand-edit a generated file.** In the site repo: `index.html` and every other
  built page (sources are `tools/build.py` / `tools/blocks.py`), `assets/loops/copy.json`,
  and anything under `assets/loops/*.mp4`.
- **Never overwrite a shipped asset filename.** `assets/loops/` is on a fixed-URL
  four-hour cache with no content hash. The version lives in the `LOOPS` array in
  `scripts/loop-render.mjs` and is bumped *before* rendering. Ship `hub-30-v1.mp4`; a
  change means `-v2`.
- **Touch only these paths.** `src/destinations.ts`, `src/Root.tsx`, a new
  `src/marketing/hub-cell/`, `scripts/loop-render.mjs` (one `LOOPS` entry),
  `videos/hub-30.md`, and in the site repo `tools/build.py`. Do not modify
  `src/marketing/device-database/`, `src/scenes/`, `src/compositions/`, or any other
  composition's metadata.
- **Write the name `CTRLbot`.** Three products: **CTRLbot IoT** (the Android app),
  **CTRLbot.AI** (the web assistant), **CTRLbot.IO** (the website). Lowercase
  `ctrlbot.io` is an address and nothing else.

## Commands

```bash
npm run check                                        # tsc + composition list
npm run video:lint                                   # anti-slop gate
npm run video:lint -- --selftest                     # prove the gate still gates
npm run video:frames -- hub-30 validate              # brief arithmetic, no render
npm run video:frames -- hub-30 contact               # one still per beat
npm run video:frames -- hub-30 contact --beat=api    # just one, while tuning
npm run loop:render -- hub-30                        # 2x supersampled — NOT `npm run render`
                                                     # needs an entry in scripts/loop-render.mjs LOOPS
                                                     # writes out/web/hub-30-v1.mp4 and syncs to the site
npm run loop:seam -- out/web/hub-30-v1.mp4           # the wrap gate
npm run video:frames -- hub-30 check out/web/hub-30-v1.mp4
```

In the site repo: `python tools/build.py`.

## Done when

- All nine tasks `- [x]` in `videos/hub-30.md`.
- `out/web/hub-30-v1.mp4` is 1920x1200, 900 frames, exactly 30.000s.
- Every standing gate green, including `loop:seam`.
- The contact sheet reviewed beat by beat against the Evidence column.
- `assets/loops/hub-30-v1.mp4` and its poster in the site repo under new filenames.
- `index.html` regenerated by `build.py`, with only the Hub block changed.

If you hit something the brief does not cover, stop and ask rather than deciding. The
2-minute cut this derives from went through four rounds of corrections, and every one of
them was an invented claim or an unasked-for scope expansion.
