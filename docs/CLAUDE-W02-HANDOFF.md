# Claude handoff — finish W02 from the checkpoint

Nathan requested this Claude takeover handoff. Executor: Claude Code (Sonnet 5.5 Medium requested by Nathan); this document does not configure the host model. Work in the current checkout, `C:\0-Repo\3 - CTRLbot Content\CTRLbot-Remotion`.

Read `docs/COORDINATION-ASSESSMENT-2026-10-02.md`, `AGENTS.md`, the current status in `docs/WALKTHROUGH-QUEUE.md`, and authoritative brief `videos/terminator-walkthrough.md`. The assessment explains the failed run; it adds no extra acceptance gates.

## Outcome and scope

Finish W02 first: two revised narrated shapes, landscape SRT and contact sheets ready for Nathan. No publishing or close-out before his final review. Keep the coordinator heartbeat paused. All prior workers stopped; no heavy jobs remain at handoff.

T10 narration and T11/T12 shell are verified/committed. T13 is ready but unverified: worker check/lint passed; existing stills are `out/coordinator/t13-*.png` at 394/692/1280/1462 in both shapes. Independently inspect them against proof/scan/server evidence; obtain any missing required beat-contact evidence, then commit only accepted T13 files plus brief:

- `src/marketing/terminator-walkthrough/TerminatorBeats.tsx`
- `src/marketing/terminator-walkthrough/TerminatorWalkthrough.tsx`
- `src/marketing/terminator-walkthrough/terminatorWalkthroughData.ts`

Then T14 pin/raw-tcp/serial and T15 ssh/recap, sequentially. If renderer wiring requires the composition file, update each brief task to name that second file before editing. Do not reopen helper/narration work without a reproduced regression.

Preserve unverified W05 `src/Root.tsx`/`src/app-ui/DriverCatalog.tsx` changes and partial W03 narration files. W03 timing transfer awaits Nathan's answer. Do not activate other lanes before W02 delivery.

## Verification and limits

Use one implementation worker and independent `.claude/agents/beat-verifier.md` review when ready; no nested subagents. Per task: `npm run check`, `npm run video:lint`, `npm run video:frames -- terminator-walkthrough contact --beat=<beat>`, and inspect evidence. Reuse passing evidence only for unchanged inputs; no duplicate ASR.

T16: destination lint, full contact sheet, render and frame check for both shapes; portrait uses `VIDEO_COMPOSITION=terminator-walkthrough-portrait`. Run narration checks on both, landscape narration verify and SRT with the brief's caption corrections. Follow brief commands. One render/audio/GPU slot; freeze imported source.

At most two repair rounds per task. Stop/report repeated near-identical turns or attempts without new evidence. Each recovery/poll sequence allows at most two unsuccessful attempts, then checkpoint; no full logs/diffs in coordinator messages. No broad test expansion. At low quota, checkpoint and stop dispatch.

## Finish

Existing `out/terminator-walkthrough-preview.mp4` is an intermediate 138-second draft predating T13. Do not call it final. Provide final output links, gate summary and known notes. Open contact sheets and `npm run dev` for local review. Nathan watches cue actions/captions in both shapes and sends fixes or approves. No deployment; archive/RELEASE-NOTES/Roadmap close-out only after approval.
