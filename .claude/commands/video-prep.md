---
description: Turn a filled video brief into atomic tasks, shot lists and copy
---

Prep the video brief `videos/$1.md` for the assembly line.

This is the one step that runs on a high model, once per video. Everything
downstream is mechanical. Think here.

## Read completely first

- `docs/VIDEO_WORKFLOW.md` — the contract, the gates, and the standing constants
- `docs/AUTHORING.md` — how a scene is written
- `src/scenes/EuiHandoff.tsx` — the worked example
- `docs/ROADMAP.md` — the gotchas that have already cost time
- `videos/$1.md` — the brief
- `src/destinations.ts` — the destination's frame, window and banned phrases

Verify every claim in the beats table against the Android resources in
`../CTRLbot-IoT/app/src/main/res` before writing a word of copy. A claim the build
does not support is the most expensive thing to find late.

## Then

1. **Validate the brief.** `npm run video:frames -- $1 validate`. Fix arithmetic
   problems with Nathan before decomposing — a beats table that overruns the
   destination window will not survive the render gate either.

2. **Write the copy**, into the tasks that place it. Voice, terminology and
   prohibitions are in `VIDEO_WORKFLOW.md`; do not restate them, follow them.
   Check the pace with `npm run video:lint -- --report` once it exists on screen.

3. **Write the shot lists.** Camera holds before and after every move. Regions
   derived from the surface's own exported region map, never estimated. Annotations
   only where the interface does not explain itself — where the app's own state
   change tells the story, a ring on top only competes with it.

4. **Decompose into atomic tasks**, appended under `## Tasks` in the brief, below
   the prep line. Rules:
   - one sentence each, naming its files
   - 1–3 files
   - independently renderable — a task must produce something you can look at
   - dependency-ordered
   - usually one beat per task, plus a task to register the composition

   If a task cannot be described in one sentence naming its files, it is too big.

5. **Do not implement anything.** Prep writes the plan. The line builds it.

Report the task list and anything in the brief that needs Nathan's decision.
