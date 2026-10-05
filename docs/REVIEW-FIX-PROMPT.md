# Review-fix prompt

Nathan's review loop for a cut that is nearly done:

1. He reviews the **lead cut** and lists what to fix.
2. An agent fixes it and stops.
3. He approves, or sends another round.
4. The agent then carries the same kinds of fix to the **follow cut**, and stops again.

The prompt below works unchanged in Claude Code, Gemini (Antigravity) and Codex, opened at
the repository root. Copy everything under the line, then fill the fields in angle brackets.

The usual pairing is each walkthrough's landscape render (the "tablet" shape, 1920x1080)
leading and its portrait render (the "phone" shape, 1080x1920) following. The same fields
also pair W04 (tablet walkthrough) as the lead with W03 (phone walkthrough) as the follow.

| Video | Composition (landscape / portrait) | Narration clips file | Clips export · corrections export | Length | Lint destinations |
|---|---|---|---|---|---|
| W02 Terminator | `terminator-walkthrough` / `-portrait` | `src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts` | `TERMINATOR_WALKTHROUGH_NARRATION_CLIPS` · `TERMINATOR_CAPTION_CORRECTIONS` | 138s | `social-walkthrough,social-walkthrough-vertical` |
| W03 IoT phone | `iot-phone-walkthrough` / `-portrait` | `src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts` | `IOT_PHONE_NARRATION_CLIPS` · `IOT_PHONE_CAPTION_CORRECTIONS` | 336s | `social-walkthrough` |
| W04 IoT tablet | `iot-tablet-walkthrough` / `-portrait` | `src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts` | `IOT_TABLET_NARRATION_CLIPS` · `IOT_TABLET_CAPTION_CORRECTIONS` | 343.5s | `social-walkthrough` |

---

You are fixing Nathan's review notes on a CTRLbot walkthrough in this repository. The cut is
about 95% done and every gate passes today. Fix exactly the notes below and nothing else,
then stop where this prompt says to stop. You work alone: implement, check, look at the
result, commit, report.

**Video:** <W02 | W03 | W04> — brief `videos/<slug>.md`
**Lead cut:** <composition id, e.g. iot-tablet-walkthrough (landscape)>
**Follow cut:** <composition id, e.g. iot-tablet-walkthrough-portrait>
**Phase:** <1: fix the lead cut | 2: carry the approved fixes to the follow cut | 3: another round on: …>

**Nathan's notes** (timestamps are from the lead cut's render):

1. <m:ss> — <what is wrong> → <what it should be>
2. <m:ss> — …

## Read first

- `AGENTS.md`: the rules, naming, and "Product accuracy".
- `docs/VIDEO_WORKFLOW.md`: the gates, and every "Rules that came out of" section.
- `docs/NARRATED-WALKTHROUGH.md`, if a note touches the voice, captions or timing.
- The brief, especially its Shot list and Review notes. Many notes were seen and written
  down before.
- The video's source in `src/marketing/<slug>/`:
  - `…Data.ts`: beats, copy, cue frames and camera shots.
  - `…Beats.tsx`: what each beat shows on its cue.
  - `…Walkthrough.tsx`: the wiring.
  - `…Narration.ts`: the voice clips.

## Turn the notes into tasks

1. **Find each note's beat.** The frame is seconds × 30. The beat is the one in `BEATS` with
   `from` ≤ frame < `from + duration`.
2. **Find where its fix lives:**

   | Note is about | Fix it in |
   |---|---|
   | Framing or zoom | `BEAT_SHOTS` in `…Data.ts` |
   | What happens on a cue: a tap, ring, spotlight or state change | `…Beats.tsx` |
   | Copy | `COPY` in `…Data.ts`. Use Nathan's words only; never invent copy. |
   | Timing or the voice | `…Narration.ts`, then rebuild with `narration:edit` and check with `narration:verify` |
   | An app surface in `src/app-ui/` | Stop and ask first. Other videos show the same surface. |

3. **Add a section to the brief:** `### Revision <n> · <date> — Nathan's review`. Give it one
   task per note, or one per file when several notes share a file. Use the machine format,
   continuing the brief's numbering:
   `- [ ] T<n>: <one sentence> — files: <1–3 files>`.

## Phase 1: the lead cut

For each task:

1. Make the fix.
2. Run `npm run check`, and `npm run video:lint` with 0 errors.
3. Render the lead cut at the note's frame and one second later:
   `npm run still -- <lead composition> out/review/<n>-<frame>.png --frame=<frame>`.
4. Look at the still and hold it against the note. Look at the follow cut at the same frame
   too: it must not break, though polishing it waits for phase 2.
5. Commit only the task's files and the brief: `T<n>: <what changed>`.

Two attempts per task at most. After that, mark it `[!]`, write down what you saw, and move
on.

Then render the lead cut and run its gates, one render at a time:

```bash
npm run render -- <lead composition> out/<lead composition>.mp4 --codec=h264 --crf=20
npm run video:frames -- <slug> check out/<lead composition>.mp4
npm run narration:check -- out/<lead composition>.mp4
```

If the narration changed, also run `narration:verify` and `narration:srt`; the commands are
in the brief's final task. For a portrait lead, set `VIDEO_COMPOSITION=<portrait composition>`
for the `video:frames` command: as a prefix in bash, or with
`$env:VIDEO_COMPOSITION='<portrait composition>';` first in PowerShell.

**Stop here.** Report, and wait for Nathan's approval.

## Phase 2: the follow cut

Only after Nathan approves the lead cut.

- Most fixes in `…Beats.tsx` and `…Narration.ts` already apply to the follow cut, because it
  is the same code.
- Check every phase 1 note's frame in the follow cut. Fix what only the follow cut needs.
- Framing is the usual difference. Portrait is bound by its width, so emphasis comes from
  `Spotlight` and `FocusRing`, not from zoom.
- When the follow cut is a different video (W04 leading W03), carry each *kind* of fix into
  that video's own files, and list any note that has no counterpart there.

Render the follow cut and run the same gates on it. Better still, run the whole set for both
shapes with one command:

```bash
npm run video:feature -- <slug> --narration=<clips file> --clips=<EXPORT> --corrections=<EXPORT> --destinations=<from the table>
```

**Stop.** Report, and wait for Nathan's review.

## Rules

- **Fix only the notes.** Anything else you notice goes under SUGGESTIONS, not into the code.
- **Leave the machinery alone.** Never change a gate threshold, `scripts/`, `package.json`,
  `tokens.generated.ts`, the ingest JSON or another video's files.
- **Product accuracy.** Show only UI the app has. Sign off with the product name, never a
  URL. Never say Terminator can be downloaded. Check claims against the recording's stills
  in `ingest/<slug>/frames/`.
- **Look, don't measure.** Read the source constants and look at the still. Never write
  pixel-scanning or measurement scripts. Run commands in the foreground, one render at a
  time.
- **The voice.** `narration:verify` cannot hear a clipped word ending. If Nathan hears one,
  set `wholeEdges: true` on that clip (`docs/NARRATED-WALKTHROUGH.md`), and say so. If a fix
  would move time between beats or cut his words, ask first.
- **No close-out.** No publishing, archiving, `RELEASE-NOTES.md` or `Roadmap.md` until
  Nathan approves the final cut.

## Report

End your reply with exactly this block:

```
PHASE: <1|2|3>   VIDEO: <id>   CUT: <composition>
FIXED: <note → task → commit, one line each>
NOT FIXED: <note → why, and what you saw>
RENDER: <path>   FRAMES: <inert %, content %>   VOICE: <narration:check; verify exit if run>
LOOK AT: <the timestamps Nathan should check first>
SUGGESTIONS: <optional, at most three lines>
```
