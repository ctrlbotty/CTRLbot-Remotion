# Archived briefs

A brief lands here once its video has been built and reviewed. The file is kept exactly
as it was run — brief, task list, and the notes prep and the line wrote into it — because
it is the record of *why* a cut is the way it is, and the next brief for the same
destination usually starts by disagreeing with it.

**Never feed an archived brief to the assembly line.** Its tasks are all `[x]`, its beat
timings match a composition that already exists, and running it would rebuild work that
is finished. Copy `../_TEMPLATE.md` instead.

| Brief | Produced | Outcome |
|---|---|---|
| `2026-08-02-play-store-promo.md` | `V1-Play-Store-Promo` — `src/marketing/play-store-promo-v1/` | 26s, 1920×1080, EUI only. 42% inert against a 60% ceiling; lint clean; poster frame composed. |
| `2026-08-03-playStore_promo2.md` | `Play-Store-EUI-Promo`, `src/marketing/eui-promo/` | 60s EUI promo; all 12 tasks verified. Its beat-state screenshots, once `videos/play store promo/`, are `2026-08-03-playStore_promo2-reference/` beside it. |
| `2026-08-03-playStore_promo2_30.md` | `Play-Store-EUI-Promo-30` | The 30s cut of the promo above. |
| `2026-08-06-playStore_promo3.md` | `Play-Store-EUI-Promo-V3`, `src/marketing/eui-promo-v3/` | 60s, `out/playStore_promo3_1min.mp4`. |
| `2026-08-06-playStore_promo3_30.md` | `Play-Store-EUI-Promo-V3-30` | 30s, `out/playStore_promo3_30s.mp4`, the file `loop:seam` is calibrated to fail. |
| `2026-08-14-device-database.md` | `device-database`, `src/marketing/device-database/` | 2 minutes from a narrated recording, `out/device-database-2min.mp4`. Transcript: `ingest/device-database/transcript.md`. |
| `2026-08-14-hub-30.md` | `hub-30`, `hub-30-square`, `src/marketing/hub-cell/` | THE HUB cell for ctrlbot.io, T1 to T9 committed. Its run documents are in `docs/archive/`. |
| `2026-09-03-ai-walkthrough.md` | `AI-Walkthrough`, `AI-Walkthrough-Narrated`, `src/marketing/ai-walkthrough/` | The first narrated walkthrough, silent and narrated. Transcript: `ingest/ai-walkthrough/transcript.md`. |
| `2026-09-30-mirror-walkthrough.md` | `mirror-walkthrough`, `mirror-walkthrough-portrait`, `src/marketing/mirror-walkthrough/` | W01 CTRLbot Mirror, 2:13, narrated in both shapes: `out/mirror-walkthrough.mp4` + `.srt` and `out/mirror-walkthrough-portrait.mp4`. The worked example of a long video. Transcript: `ingest/mirror-walkthrough/transcript.md`. |

Paths inside an archived brief are left as they were when it ran. Where a file has moved
since, this table says where to.

## What the first run taught

Recorded because the reasoning is worth more than the result, and all of it is now
enforced by a gate. The full version is in
[../../docs/VIDEO_WORKFLOW.md](../../docs/VIDEO_WORKFLOW.md).

- **Frame 0 is the poster frame.** The first attempt opened mid-camera-move and its
  poster was a cropped fragment in a black field. `opens-composed` now blocks that.
- **A cut of held shots reads as a slideshow.** Measured, a locked-camera version had
  fewer visible events per second than the rejected Master Control promo. Continuous
  camera movement is what carries a cut; discrete UI state changes barely register.
- **Length trades against motion.** Stretching beats without adding movement took the
  cut from 54% to 69% inert.
- **Don't argue with a gate before measuring.** The instinct when `inert-fraction`
  failed was that the threshold was wrong for the format. The measurement said the
  threshold was right and the cut was too static.
