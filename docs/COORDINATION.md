# Coordinating agent lanes

How a coordinator runs implementation workers through this repository's video briefs: Claude
Code coordinates, and Gemini (through Antigravity's `agy`) or Codex (through `codex exec`)
implements one task at a time. It is the method that worked on 2026-10-02. The same day's
first attempt drove the agents' desktop windows by screenshots and stalled; its lessons are
in [COORDINATION-ASSESSMENT-2026-10-02.md](COORDINATION-ASSESSMENT-2026-10-02.md). The
restart ran 26 worker tasks in an afternoon and evening: W02 delivered, and W03 and W04
taken from narration to review renders in two lanes.

`docs/VIDEO_WORKFLOW.md` is still the contract for what a task is and when it passes. This
file is only about who does what, and how.

## Roles

- **Coordinator.** Turns a brief task into a worker prompt and dispatches it. When the
  worker stops, checks the scope, then verifies as a non-author in a clean worktree. Commits
  the task's files and the brief, keeps the queue's one status block current, and owns every
  render. It does not approve its own code: a fix the coordinator writes is accepted only on
  an objective gate, and the review note says who wrote it.
- **Worker.** One task, its owned files only. Runs `npm run check` and `npm run video:lint`
  in the foreground. Narration tasks also run `narration:edit` and `narration:verify`.
  Workers never commit, render a cut or start background jobs. Each ends with a fixed report
  block.
- **Nathan.** Reviews renders. Moving seconds between beats and changing his spoken words
  are his decisions, asked as a question with the measured numbers. The question is never
  inferred from elapsed time.

## Dispatch

Write the prompt to a file under `out/coordinator/agy/` (it is the audit trail), then point
the worker at it. Dispatch in the background and act on the completion notification. Do not
poll.

**Gemini through `agy`** (`%LOCALAPPDATA%\agy\bin\agy.exe`; `agy models` lists the models):

```bash
agy -p "Read out/coordinator/agy/<task>-prompt.md and carry out that task exactly. It is your complete brief." \
  --model gemini-3.8-flash-high --dangerously-skip-permissions --output-format json \
  --print-timeout 25m > out/coordinator/agy/<task>-result.json 2> out/coordinator/agy/<task>-stderr.log
```

- The JSON carries `conversation_id`, `status`, `response` and `usage`. **`status: SUCCESS`
  only means the turn ended.** Read the report block and the files.
- `--print-timeout` is the stop-loss. If Gemini backgrounds a command and goes idle, agy
  waits up to the timeout and Gemini resumes when the command ends. When the timeout
  expires, agy kills the job.
- Repair rounds resume the same conversation: `--conversation <id> -p "<exact fix list>"`.
  Its context is cached, so a one-line fix costs little. Resumed conversations report
  cumulative usage.
- Quota exhaustion is a `RESOURCE_EXHAUSTED (code 429)` in the stderr log, with "Resets in
  Nm". No partial edits were left behind. Queue one retry for after the reset (a background
  `sleep`, then the dispatch). Never poll.

**Codex through `codex exec`**: the Codex desktop app's CLI,
`%LOCALAPPDATA%\OpenAI\Codex\bin\<hash>\codex.exe`, not on PATH. A read-only smoke test was
run on 2026-10-05; it has not yet run a task here.

```bash
codex exec -s workspace-write --json -o out/coordinator/codex/<task>-last.txt \
  "Read out/coordinator/agy/<task>-prompt.md and carry out that task exactly." < /dev/null \
  > out/coordinator/codex/<task>.jsonl
```

- The JSONL ends in `turn.completed` with `usage`; `thread.started` carries the id for
  `codex exec resume <id> "<fix list>"`. `-o` writes the final message, which holds the
  report block.
- Codex has no timeout of its own. The caller's background command limit is the stop-loss.
- `< /dev/null` matters: without it Codex waits for stdin.

## The worker prompt

Every prompt that worked had the same parts, in this order:

1. **Role.** One task, coordinator reviews, do not commit.
2. **Task.** The brief's task line, and the files the worker may edit. Everything else is
   read-only, by name, including other workers' files.
3. **Read first.** The brief section, plus one worked example in the repository. "W02's
   migration, commit `9114a3d`" or "`TerminatorBeats.tsx`" saved more rounds than any
   amount of prose.
4. **Evidence.** The Shot list rows as a table: cue word → action → result, and the cue
   constant to use.
5. **Hard rule.**
   - No analysis or measurement scripts, no pixel scanning, never a background command.
   - Estimate from source constants, comment the estimate, and report it.
   - The coordinator renders the stills.

   T14's first run spent 25 minutes measuring pixels and made no edits. After this rule,
   tasks took 2–9 minutes.
6. **Checks.** Foreground only. If an error is in a file it does not own, the worker stops
   and reports it.
7. **Report.** A fixed block: STATUS, FILES, CHECK/LINT, CUES or HOLDS, NOTES. The
   coordinator reads only this and the diff.

## Verify

1. **Scope.** `git status` shows only the owned files. Before dispatch, hash the files the
   worker must not touch, and check them afterwards.
2. **Gates and stills** in a clean worktree at HEAD plus exactly the task's files:

   ```bash
   npm run verify:task -- <composition> --files=<a,b> --frames=<cue+10,...> [--from=<lane checkout>]
   ```

   Use the cue frames from the worker's report, plus 10–15 frames so the action has landed,
   in both shapes. Look at the two tiles against the Shot list rows. The contact sheet's
   default frames miss cue actions.
3. **Verdict** per `VIDEO_WORKFLOW.md`. A problem caused by a file another task owns, such
   as camera data seen while verifying a beat task, becomes a new task, not a FAIL of this
   one.
4. **Commit** the owned files and the brief: `T<n>: …`, with a review note under the brief's
   Review notes.

Final renders are one command, also in a clean worktree, with the deliverables copied back
into `out/`:

```bash
npm run video:feature -- <slug> --narration=<clips .ts> --clips=<EXPORT> --corrections=<EXPORT> [--destinations=a,b]
```

The per-video arguments are in the header of `scripts/feature-gates.mjs`.

## Lanes

- **Lane A** is the main checkout.
- **Lane B** is a worktree on its own branch. Create it with
  `git worktree add -b lane-b ../CTRLbot-Remotion.worktrees/lane-b main`, then give it
  node_modules with a junction:
  `New-Item -ItemType Junction -Path <lane>\node_modules -Target <repo>\node_modules`.
  Reset it to main before each task: `git checkout -f lane-b`,
  `git clean -fd src public videos`, `git reset --hard main`.
- **Integration.** Copy the lane's owned files into the main checkout. For a shared file
  like `src/Root.tsx`, export a patch with `git diff --ignore-cr-at-eol` and apply it with
  `git apply --ignore-whitespace`.
- **Parallel only on disjoint files.** W03 and W04 ran side by side because they own
  separate `src/marketing/` folders. Tasks in one video that write the same beats file run
  one after another.
- **One heavy job at a time.** Renders and transcription run one at a time. Verification
  and final gates use their own worktrees, `CTRLbot-Remotion.worktrees/verify` and
  `…/render`, so the lanes keep working, but two jobs never share one of those worktrees.
- **Remove a worktree's junction before the worktree.** Run
  `cmd /c rmdir <worktree>\node_modules` first, then `git worktree remove --force`.

## What it cost

Measured on 2026-10-02, from the `usage` in each result:

- **Beat tasks:** 4–9 minutes and 0.4–1.3M tokens.
- **Narration re-plans and the voice-helper change:** 1.2–2.7M tokens with their repairs.
- **Repairs:** five tasks needed one repair round; one blank-frame result was traced to
  another task's camera data.
- **Lost time:** one 30-minute quota pause, and the 25-minute T14 stall. Both were bounded
  by the timeout and a single queued retry.

## Stop rules

From the assessment, and still true:

- **Two repair rounds per task.** A new task ID does not reset the count for the same
  bottleneck. After the second round on one bottleneck, hand it to Nathan with timestamps.
  The render-level voice flags on W03 and W04 went to his ears this way.
- **No checker or helper work without a reproduced defect.** T32 opened the shared voice
  helper only after levels measured on the edit showed the clipped words. Its fix was
  opt-in per clip, and W02's audio rebuilt byte-identical.
- **One status block** at the top of `docs/WALKTHROUGH-QUEUE.md`, current after every
  commit. History goes below it.
