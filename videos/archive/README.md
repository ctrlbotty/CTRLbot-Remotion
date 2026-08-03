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
