# Handoff: redo the Mirror and Terminator web loops

Written 3 November 2026 for a fresh session. Scope is these two videos only: the `/app/` page around them is finished and must not change except for the filenames it points at.

## What exists now (v1)

| | Mirror | Terminator |
| --- | --- | --- |
| Composition | `Web-Loop-Mirror` | `Web-Loop-Terminator` |
| Source | `src/marketing/web-loops/LoopMirror.tsx` | `src/marketing/web-loops/LoopTerminator.tsx` |
| Frame | 1600x1200 (4:3), 30fps, 360 frames (12s) | 1200x1200 (1:1), 30fps, 360 frames (12s) |
| Timing constants | `MIRROR_*` in `webLoopData.ts` | `TERMINATOR_*` in `webLoopData.ts` |
| Copy | `LOOP_COPY.mirror`, beats at 0 and 0.56 | `LOOP_COPY.terminator`, beats at 0 and 0.5 |
| Render name | `mirror-loop-v1` | `terminator-loop-v1` |
| UI rebuild used | `src/app-ui/mirror/` | `src/app-ui/term/` (adds `TERM_PROJECTOR` in `termData.ts`) |

v1 content:
- **Mirror:** device listed over USB, Start mirroring, the CTRLbot IoT driver list scrolled and a driver clicked from the PC, then Wi-Fi pairing typed and Pair pressed, Stop mirroring, back to rest.
- **Terminator:** Scan tab at rest, Raw TCP (Telnet) selected, connect to `192.168.0.45:4352`, `%1POWR ?` typed with CR and sent, reply `%1POWR=1<CR>` with Verbose CRLF, back to Scan.

Commits: Remotion `da22e4b` (Mirror), `225fa0c` (Terminator); site `951a7bb`, `a3cdc68`. Nothing is pushed.

Known v1 issues worth fixing in the redo:
- Mirror shows Wi-Fi pairing while already mirrored over USB, which is an odd order.
- Mirror's device panel still shows the real tablet's model (`samsung SM-X210`) and Android build string. Serial and addresses are synthetic.
- Mirror's mirrored app fills only part of its stage; the right of the app is empty.

**What Nathan wants changed in the redo: ask him first.** Do not guess the new direction from this list.

## Hard rules (from `AGENTS.md`, "Web loops are not cuts")

- Frame 0 and the frame after the last are the same picture. `npm run loop:seam` is the gate.
- Every animation is driven by `useCurrentFrame()`. No CSS transitions or timers.
- No words burned into the video. The copy is HTML on the site, from `LOOP_COPY`.
- Keep the frame shapes: Mirror 1600x1200, Terminator 1200x1200. They fill the `/app/` slots exactly; a different shape gets cropped.
- Show only what each tool really does. Mirror: check `C:\0-Repo\Utilities\CTRLbot-Mirror\README.md`. Terminator: check `C:\0-Repo\Utilities\CTRLbot Term\README.md` and `src-tauri/src/lib.rs`. Terminator has a public repo but **no public release and no license**, so nothing may imply a download or call it open source.
- Synthetic identities only: `192.168.0.x` or `10.0.0.x` addresses, made-up serials, no real customer or device data.
- Render with `npm run loop:render -- Mirror` / `-- Terminator`, never `npm run render`. The script renders at 2x and downsamples. It now writes `+faststart`.

## Versioning

`/assets/*` on ctrlbot.io is cached for four hours by fixed URL, so a changed video gets a new name. Bump the basename in `scripts/loop-render.mjs` **before** rendering: `mirror-loop-v2`, `terminator-loop-v2`. Keep the v1 files in the site repo. The render script syncs the mp4 and poster into `C:\0-Repo\2 - CTRLbot.io\ctrlbot-io-site\assets\loops\`.

## Copy beats

Retime the `at` fractions in `LOOP_COPY.mirror` / `.terminator` to the new cut. Words lead the action they describe. Each beat window should be at least 5 seconds, so two beats in a 12s loop.

Block spec, from the site's `docs/DESIGN.md`:
- **Headline:** 5 to 12 words, ALL CAPS, `CTRLbot` keeps its casing, **no punctuation**, one clear statement (never `TITLE: PHRASE`).
- **Body:** 3 sentences, sentence case, describes what the tool does, not what the animation does.
- No em dashes.
- Nathan reviews the copy. The v1 copy can be kept where the action is unchanged.

## Gates (all must pass)

1. `npm run check`
2. `npm run video:lint`
3. `npm run loop:render -- <Mirror|Terminator>`
4. `npm run loop:seam -- out/web/<name>.mp4`
5. Under 25 MiB, H.264. Confirm faststart: the `moov` atom comes before `mdat`. A subagent misreported this on v1, so check the bytes yourself.
6. Stills at each beat (`npm run still -- <composition> <path> --frame=<f>`), looked at: nothing demonstrated is clipped, the text in the UI is legible.

At most two repair rounds per failing gate, then stop and report.

## Wiring into the site

1. In Remotion: `npm run loop:copy -- "C:/0-Repo/2 - CTRLbot.io/ctrlbot-io-site/assets/loops/copy.json"`. Never hand-edit `copy.json`.
2. In `C:\0-Repo\2 - CTRLbot.io\ctrlbot-io-site\tools\build.py`, THE TOOLS section of `app_page` (`uid="loop-mirror"` and `uid="loop-terminator"`): change the two `loop(...)` filenames and posters from `-v1` to `-v2`. Nothing else on the page changes.
3. `python tools/build.py`, then `python -m py_compile tools/blocks.py tools/build.py`, `node --check assets/site.js`, `git diff --check`.
4. Preview with the `site` config in `.claude/launch.json` (http://localhost:5500/app/#tools). Check both loops play and the copy switches on each video's clock, at desktop width and at 375px.

Full runbook: `C:\0-Repo\2 - CTRLbot.io\ctrlbot-io-site\docs\MOTION-PIPELINE.md`.

## Repo rules

- Commit straight to `main` in both repos; never branch. Do not push; Nathan pushes.
- `docs/LONG-READ-PITCH.md` (Remotion) and `docs/plans/README.md` (site) are Nathan's uncommitted files. Leave them, and never use `git stash`.
- Bash heredocs on this machine have mangled `"\n"` string literals in Python edits twice. Use the Edit tool for source edits that contain escapes.

## Done means

Both v2 loops pass every gate, `/app/` plays them with retimed copy, both repos are committed, and Nathan has the preview URL and the beat stills to review.
