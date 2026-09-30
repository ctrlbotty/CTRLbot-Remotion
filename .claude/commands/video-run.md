---
description: Run a video brief's task list through the assembly line
---

Run the assembly line for `videos/$1.md`. If `$2` is given, run only that task
(e.g. `/video-run play-store-promo T3`) and stop.

`docs/VIDEO_WORKFLOW.md` is the contract. Read it, then follow it exactly.

For each pending `- [ ]` task, in order:

1. **Implement** — spawn a fresh `beat-implementer` with the brief path and the task
   ID. One task per context, always.
2. **Verify** — spawn a fresh `beat-verifier`, independent of the implementer, with
   the same inputs. It runs the gates *and looks at the rendered still*.
3. **On PASS or PASS WITH NOTES** — mark `[x]`, append any notes under
   `## Review notes`, stage only the task's authorized files plus the brief, run
   `git diff --cached --check`, commit with a `Tn: ` message, and require a clean
   worktree before continuing.
4. **On FAIL** — hand the verifier's fix list to a fresh implementer. Up to two
   rounds. Still failing after that: mark `[!]`, record the evidence under
   `## Blocked notes`, and stop — later tasks would inherit a broken baseline.

Never `git add -A` or `git add .`. Never stash, reset, or discard to manufacture a
clean tree. A dirty path the task does not own is a hard stop.

When every task is `[x]`:

```bash
npm run video:lint -- --destination=<the brief's destination>
npm run video:frames -- $1 contact
```

Then report: commits made, gate results, Review notes, and the path to
`out/$1/contact.html`.

**Do not mark the video done.** The contact sheet review is Nathan's — each beat
gets judged against its evidence line, and every ❌ becomes a new task appended to
the brief.
