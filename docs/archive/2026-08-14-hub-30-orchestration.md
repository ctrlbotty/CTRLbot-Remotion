# HUB-30 — orchestration contract

How `videos/hub-30.md`'s task list gets executed. This is the loop, the gates, and the
things that end a run. It exists as a document rather than as a skill invocation because
the agent running it may not have this repository's skills — everything needed is here.

**The brief is the specification.** `videos/hub-30.md` says what the video is. This file
says only how to get there. If the two disagree, the brief wins and this file is wrong.

---

## The loop

One task, one gate, one commit. Nine tasks, run in order.

```
read videos/hub-30.md in full          ← every time, not once at the start
  │
  ▼
pick the first `- [ ]` task in the Tasks list
  │
  ▼
IMPLEMENT ─────► run the task's own Gate line
  │                     │
  │                fail │
  │                     ▼
  │              fix and re-run  ── 3 failures on the same task ──► mark `- [!]`, stop,
  │                     │                                           report why
  │              pass   │
  ▼                     ▼
VERIFY ───────► run the standing gates (below)
  │                     │
  │                fail ┘  (back to IMPLEMENT)
  │              pass
  ▼
mark the task `- [x]` in videos/hub-30.md
commit: "hub-30: <task id> — <what changed>"
  │
  ▼
next task, or stop when none are left
```

**Re-read the brief at the top of every task.** The scope note and the *Anything unusual*
list are what stop this cut drifting into the 2-minute one, and they are easy to forget
six tasks in.

## The standing gates

Run after every task, not just the ones whose Gate line names them.

| Gate | Command | Passing |
| --- | --- | --- |
| Types + registry | `npm run check` | exit 0, `hub-30` listed at 1920x1200 / 900 frames |
| Anti-slop | `npm run video:lint` | **0 errors.** Warnings are read, not silenced |
| Gate self-test | `npm run video:lint -- --selftest` | PASS — proves the rules still separate the two reference cuts |
| Brief arithmetic | `npm run video:frames -- hub-30 validate` | no problems |

From T6 onward, add:

| Gate | Command | Passing |
| --- | --- | --- |
| Seam | `npm run loop:seam -- out/web/hub-30-v1.mp4` | pass — frame 0 and the wrap are the same picture |
| Dead air | `npm run video:frames -- hub-30 check out/web/hub-30-v1.mp4` | under the 60% inert ceiling, median content area 100% |

## Verification, and who does it

The agent that writes a task must not be the only one that says it passed. For each task:

1. **Implement** — the smallest change that satisfies the task. Nothing else in the same
   commit.
2. **Look at the pixels.** `npm run video:frames -- hub-30 contact --beat=<id>` renders
   one still. Open it. A gate that exits 0 over a black frame is a gate that exits 0.
3. **Hold the still against the beat's Evidence column**, word for word. If the evidence
   says a dropdown opens on four named items, count four named items.
4. Only then mark `- [x]`.

`.claude/agents/beat-implementer.md` and `beat-verifier.md` describe the two halves of
this split if you have them available. If not, do both yourself and do the second one
honestly.

## What ends a run

Stop and report. Do not work around any of these.

- **Three failed attempts at one gate.** Mark the task `- [!]` with what was tried.
- **A gate that would have to be weakened to pass.** `video-lint.mjs` says it in its own
  header: *do not weaken a rule to unblock a video; fix the video.* Thresholds in
  `video-lint.mjs`, `video-frames.mjs` and `loop-seam.mjs` were calibrated against cuts
  that are already approved, and one of them exists specifically to fail. If a rule looks
  wrong, say so and stop — do not edit it.
- **A beat that needs a fact not already in `deviceDatabaseData.ts`.** That file is
  transcribed from the recording. Something missing from it is something the walkthrough
  did not show, and inventing it is the failure mode this whole pipeline exists to
  prevent. Stop and ask.
- **Any change to `src/marketing/device-database/`, `src/compositions/`,
  `src/scenes/`, or another composition's metadata.** T1–T9 touch
  `src/destinations.ts`, `src/Root.tsx`, a new `src/marketing/hub-cell/` directory, one
  entry in `scripts/loop-render.mjs`, and `tools/build.py` in the site repo. Nothing
  else.
- **A generated file edited by hand.** In the site repo that means `index.html`, every
  other built page, `assets/loops/copy.json`, and anything under `assets/loops/*.mp4`.
  Sources are `tools/build.py`, `tools/blocks.py`, and a render.

## The three things most likely to go wrong

Written down because each one has already happened once on the 2-minute cut.

1. **Scope creep back into the app.** The 2-minute cut's material is right there and it
   is tempting to fill 30 seconds with the End Point story or the connection log. The
   brief's scope note is the answer: this is the shelf, not the app. One `End Point`
   appears, as a category in the sort list.
2. **A claim nobody made.** The first pass of the 2-minute cut opened on "CTRLbot opens
   on the library rather than an empty project", which is false — the app opens on the
   quick start, then CTRLbot.AI. This cut carries no copy at all, so the risk moves to
   the site paragraph in T8. Write what the database *is*, present tense, and nothing
   about what it will become.
3. **A margin measured in a comment instead of on a still.** T5 is a looking task. The
   only way to know whether a control touches the frame edge is to open the still.

## Definition of done

- All nine tasks `- [x]`.
- `out/web/hub-30-v1.mp4` — 1920x1200, 900 frames, exactly 30.000s, h264.
- Every standing gate green, including the seam.
- `assets/loops/hub-30-v1.mp4` and its poster in the site repo, under a **new** filename.
- `index.html` regenerated by `build.py`, with only the Hub block changed.
- The contact sheet reviewed against the brief's Evidence column, one beat at a time.
