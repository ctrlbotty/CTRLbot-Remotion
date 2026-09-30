# CTRLbot Content Release Notes

**What has been delivered, newest first.** What is left is in [Roadmap.md](Roadmap.md).

A cut is delivered when its render is in `out/` and its brief is archived in
`videos/archive/`. Publishing is a separate step and is not tracked here.

## 2026-09-30: W01 CTRLbot Mirror, and long videos in two shapes

- **W01 CTRLbot Mirror**, 2:13, narrated: `out/mirror-walkthrough.mp4` (1920x1080, YouTube,
  captions in `out/mirror-walkthrough.srt`) and `out/mirror-walkthrough-portrait.mp4`
  (1080x1920, captions burned in, for TikTok, YouTube Shorts, LinkedIn and X). Install,
  Setup's five steps over USB, framing, clipboard control, capture, apps, files, shell and
  logcat, every claim checked against Mirror's source and README. 28% and 25% inert against
  a 60% ceiling; narration -13.4 LUFS on both.
- **Long videos are narrated only, in both shapes, and under 2:20** (X's limit without
  Premium). The shared pieces: `WalkthroughCopy` (Audiowide for the product's name only,
  Montserrat step titles and descriptions, a numbered checklist), `PortraitStage`,
  `NarrationCaptions`, `captionsFromClips` and `npm run narration:srt`, and the
  `social-walkthrough-vertical` destination. `video:frames` takes `VIDEO_COMPOSITION` for the
  second shape. `AGENTS.md` and `docs/NARRATED-WALKTHROUGH.md` describe the format.
- **A push on every beat.** One slow camera drift across a long cut measured 89% inert; each
  beat now opens wide, pushes in on its subject and returns, and every cut lands wide.
- **The review comes after the render.** The line runs every task and both renders with no
  approval stop; Nathan's notes come back as new tasks.

## 2026-09-29: cleaner narration

- **No more clipped words.** Narration used to be cut on Whisper's word times, which end early
  at the close of a phrase: "PC", "network" and "testing" lost 100 to 390 ms. The narration
  edit (`scripts/lib/voice.mjs`) now cuts in the real silence around a line's words, found in
  the waveform, keeps each word's soft onset and decay, and crossfades every join inside a
  pause. It renders one sample-accurate track per short, `public/shorts/<id>/narration.m4a`,
  instead of trimming to whole frames at render time.
- **Ums, repeats and false starts come out.** Whisper hides them, so ingest now also writes
  `ingest/<slug>/heard.json`: an acoustic model's spelling of every sound, and Whisper run one
  phrase at a time, where a lone "uh" gets written down. The edit removes any stretch of voice
  that is only a stumble, including one run straight into the next word.
- **Long pauses shorten**: to 0.5 s after a sentence, 0.3 s after a comma, 0.2 s mid-phrase
  and 0.1 s after "the" or "a". `verbatim: true` on a clip keeps everything.
- **Light voice polish at ingest**: an 80 Hz high-pass and gentle 2:1 compression before the
  -16 LUFS normalization, with timing untouched. No noise reduction, because the recordings
  arrive gated.
- **Captions timed from the edit**, word by word from the acoustic model's letters rather than
  Whisper's stretched times. A caption page now breaks after every sentence, and
  "CTRLbot.AI" no longer splits across two pages.
- **S02 and S03 re-cut.** S02 lost four "uh"s, two "um"s, two runs of "a, a", two extra
  "and"s, a doubled "to", a stray "a" before "host", a false start "P" and an "And" Whisper
  never wrote down: 20.6 s of narration down to 16.3 s. S03 lost "These, these", "the the"
  and its long pauses: 18.6 s down to 15.7 s. Both re-rendered and passing every gate; the
  renders measure -13.4 and -13.0 LUFS.

## 2026-09-29: the short production line, and the first two shorts

- **S02 CTRLbot Terminator and S03 CTRLbot.AI.** 30-second vertical shorts with narration and
  burned-in captions, `out/shorts/S02.mp4` and `out/shorts/S03.mp4`, each with a publishing
  kit. Both pass every gate: 30% and 24% inert against a 60% ceiling, poster frames settled,
  narration at -14 and -13 LUFS.
- **One template for every short.** A short is an entry in `src/shorts/shortsData.ts`: product,
  title, the one idea, beats and a narration edit. `npm run shorts -- all <id>` cuts its media,
  writes the brief the gates read, renders it and writes its kit. Vertical 1080x1920 and
  landscape 1920x1080.
- **Burned-in captions** from the recording's own word timings, moved through the narration
  edit, paged at every pause, with the spoken word in CTRLbot blue.
- **Footage from anything.** A beat can come from an ingested recording, a render, a motion
  graphic or a still. Each is cut, cropped and retimed into `public/shorts/<id>/`, so a render
  never reads a raw recording.
- **Publishing kit** per short: poster frame, SRT captions, title, description and tags.
- **Recording ingest.** `npm run ingest:recording` turns a narrated recording in `video input/`
  into a cleaned voice track, a word-timed transcript, captions and a contact sheet of every
  screen change. Transcription runs on the RTX GPU: an 8-minute recording in about 30
  seconds. The Terminator, Mirror and AI walkthrough recordings are ingested.
- **Shorts destinations.** `social-short` (1080x1920) and `social-short-landscape`
  (1920x1080): 20 to 35 seconds, margins clear of the feeds' own overlays, and the promise on
  screen within three seconds.
- **The source lint now covers `src/shorts/`.** It scanned only scenes, compositions and
  marketing, so a new template directory would have gone unchecked.
- **Consistent with the other CTRLbot repositories.** A root roadmap, these notes and an
  execution profile. Delivered briefs and finished run documents are archived, each
  recording's transcript lives beside its other ingest output, and every path to the IoT and
  AI repositories resolves again, including the token sync default.

## Delivered before September 29

Reconstructed from `out/`, the archived briefs and the commit history.

| Delivered | Cut | Composition | Render |
| --- | --- | --- | --- |
| 2026-09-03 | CTRLbot.AI walkthrough, narrated | `AI-Walkthrough-Narrated` | `out/ai-walkthrough-2min-narrated.mp4` |
| 2026-08-19 | ctrlbot.io panel loops | `Web-Loop-*` | `out/web/` |
| 2026-08-14 | THE HUB website cell | `hub-30`, `hub-30-square` | `out/hub-30/` |
| 2026-08-14 | Device database walkthrough | `device-database` | `out/device-database-2min.mp4` |
| 2026-08-13 | CTRLbot.AI walkthrough, silent | `AI-Walkthrough` | `out/ai-walkthrough-2min.mp4` |
| 2026-08-06 | EUI promo v3, 60 and 30 seconds | `Play-Store-EUI-Promo-V3`, `-V3-30` | `out/playStore_promo3_1min.mp4`, `out/playStore_promo3_30s.mp4` |
| 2026-08-03 | EUI promo v2, 60 and 30 seconds | `Play-Store-EUI-Promo`, `-30` | `out/playStore_promo2/`, `out/playStore_promo2_30/` |
| 2026-08-02 | Play Store preview v1 | `V1-Play-Store-Promo` | `out/play-store-promo/` |
| 2026-07-31 | First-Run tablet, Review 08 | `First-Run-Tablet` | `out/first-run-tablet-review-08.mp4` |
| 2026-07-31 | First-Run phone, Review 13 | `First-Run-Phone` | `out/first-run-phone-review-13.mp4` |

The two First-Run reviews are also calibration references for the gates. `out/` is not in
Git, so keep a copy of both outside the repository.
