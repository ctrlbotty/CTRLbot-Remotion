# W02–W05 coordinated run

Approved by Nathan on 2026-10-02. Codex coordinates; Gemini 3.8 Flash High implements. Codex may resume a checkpoint if Gemini becomes unavailable. Publishing is outside this run.

## Dispatch rules

- At most two implementation workers and one independent verifier. Each worker receives one atomic task and its exact owned paths; no nested agents.
- One writer per file. `src/Root.tsx`, audio helpers, `package.json`, and shared surfaces require explicit ownership. The coordinator alone edits briefs, commits, and integrates.
- Whole-project checks run against a frozen source snapshot. A worker reports implementation ready, then pauses while independent verification runs. Only verified and committed tasks become `[x]`.
- One heavy slot for renders, contact sheets, frame checks, and GPU transcription. Other workers may read and edit disjoint files while it is occupied, but cannot change a render's imported sources.
- Two repair rounds per task. A repeated attempt with no new evidence stops that task. Block one lane, continue independent tasks.
- On quota failure: record the task, owned paths, current changes, checks passed, exact failure and next step here; confirm the original worker has stopped before Codex edits its files. Never rerun checked tasks or discard partial work.
- Review is once the four cuts have both renders, captions and contact sheets. Close out W02–W05 only after Nathan's review. W01 was already approved.

## Dependencies

| Lane | Ready first | Release point | Remaining sequence |
|---|---|---|---|
| W02 | T17; independently T7, T8, T9 | T17 unlocks all narration edits | T10 after T17; T11 after T7, T9 and T10; T12 after T11; T13 after T12 and T8; T14–T16 in order |
| W03 | T20, T21, T22 region maps | Integrated maps unlock W04 T20 and W05 T6 | T23 after W02 T17; T24 after maps and T23; T25–T31 in order |
| W04 | T19 after W02 T17 | T20 after T19 and W03 maps | T21–T27 in order |
| W05 | T1 transcript, T2 captions; T3–T5 and T7 with shared-file ownership | T6 after W03 T21; T8 after T1, T2 and W02 T17 | T9 after T8, W03 T20 and T3–T7; T10 after T9; T11–T14 in order |

## Current assignments

| Owner | Task | Owned files | State |
|---|---|---|---|
| Gemini worker A | W02 T17 | `scripts/narration-verify.mjs`, `package.json` | Dispatched in Antigravity; awaiting implementation result |
| Gemini worker B | W03 T20 | `src/app-ui/ConnectTest.tsx`, `src/app-ui/DiscoverDevices.tsx`, `src/app-ui/ProductWebView.tsx` | Dispatched; pause before proof rendering for independent verification |
| Codex coordinator | Scheduling and W01 approved close-out | Four active briefs, this queue, `Roadmap.md`, archive and `RELEASE-NOTES.md` | Independently reviewed and committed as `e0aafb5` |

## Checkpoints

- 2026-10-02: Baseline has existing plan edits and W05 ingest/narration assets. `.claude/settings.local.json` is unrelated and must remain unstaged. No source changes preceded this run.
- W01 approved baseline: commit `d20993e`; 136 seconds, landscape 25% inert, portrait 29%; both narration checks passed. Keep its recording until S01 is delivered.
- Coordination plans and W01 close-out independently reviewed: PASS. W01 archived verbatim at `videos/archive/2026-10-02-mirror-walkthrough-r2.md`; existing user revision plans are preserved in commit `e0aafb5`.
- Antigravity worker A: `Implement W02 T17 Narration`, conversation `a8a46e96-291c-4c76-b2b3-57ed1789bc47`. Worker B: `IoT Phone Walkthrough Implementation`; assigned W03 T20 only. Both were observed working after dispatch.
