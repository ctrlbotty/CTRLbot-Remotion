# Coordination failure and restart rules — 2026-10-02

Nathan requested wrap-up because remaining quota was about 10%. All implementation workers are stopped, the render slot is free, and the coordinator heartbeat is PAUSED. Resume only after Nathan asks.

## What failed

- Delivery was not the controlling priority. Shared narration-verifier defects consumed repeated repair and review cycles while no revised cut was available to watch.
- Several lanes and model contexts created coordination overhead before the first lane had delivered. Large inherited contexts and repeated inspection consumed quota without proportional output.
- The coordinator allowed releases to wait for heartbeat intervals instead of continuing ready tasks in the active run. A heartbeat was treated too much like the execution loop.
- The queue became a chronological log with stale assignment rows. That made actual progress and remaining blockers hard to see.
- A Root.tsx encoding regression during shell migration required recovery. Partial changes from another lane made integration more fragile.

The audio defects and clipped-word checks were real. The mistake was allowing checker development and coordination to dominate the path to a watchable artifact. Required final gates remain; additional investigation needs a concrete defect and a bounded acceptance condition.

## Rules on restart

1. Complete W02 first. Use one implementation worker and independent review only when its output is ready. Do not activate W03–W05 merely because worker slots exist.
2. Start with the eight existing T13 stills and ready source. Reuse its passing check/lint evidence if source is unchanged. Review, commit the three task files plus brief if accepted, then assign T14 and T15 sequentially in fresh, concise contexts.
3. Measure progress by a playable cut and remaining delivery tasks. Make a draft before final feature checks; label its limitations. Finish both final shapes, contact sheets, narration checks and landscape SRT before calling W02 delivered.
4. Do not add checker features or broad regressions without a reproduced defect. Before a repair, state the exact failure, owned paths, acceptance evidence and remaining repair count. Stop after two repair rounds.
5. Reuse passing evidence and ASR caches for unchanged inputs. Do not retranscribe or rerender an unchanged task just to refresh status. Keep the required checks relevant to affected source and final artifacts.
6. Continue ready releases during the active run. Heartbeats recover/checkpoint work; they are not a reason to leave a stopped, ready worker waiting fifteen minutes.
7. Keep one current status block at the top of the queue. Update it after every release. Track stopped workers, file ownership, job IDs and the next exact action; historical entries must not masquerade as active assignments.
8. Preserve unrelated changes, especially pending W05 Root.tsx hunks. Use explicit UTF-8 and inspect the scoped diff before staging. Never stage the entire working tree.
9. If executor UI or quota fails, record it once, confirm the worker stopped, and take over from its checkpoint. Do not spend repeated cycles polling an unavailable executor.
10. At low quota, stop dispatch, checkpoint unverified work, pause the heartbeat and hand off. Do not claim completion or silently restart work.

## Preserved outcome

- W02 draft: `out/terminator-walkthrough-preview.mp4`, 138 seconds, 960x540, narration included. This predates T13 and is not the final revised cut.
- W02 T10 narration and T11/T12 shell migration are independently verified and committed. T13 is implemented, worker check/lint passed, and eight cue stills were rendered; independent visual acceptance is unfinished. T14/T15 and final T16 remain.
- W03 maps are verified. T23 narration is blocked by the settings hold and known edge repairs; the proposed 0.5-second timing transfer still awaits Nathan's answer.
- W04 is not resumed. W05 T2 is verified; T3 partial source is stopped and unverified. Preserve all partial files.

No final W02–W05 completion, publishing or close-out is claimed.
