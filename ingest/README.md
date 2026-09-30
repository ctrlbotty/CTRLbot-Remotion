# Ingest

One folder per narrated recording, written by `npm run ingest:recording`. The folder is named
for the recording, not for a cut: one recording can feed a walkthrough, a short and a website
loop, and each of their briefs in `videos/` points back here.

```text
ingest/<slug>/
  transcript.md    the timestamped index. DRAFT until corrected by hand, then the script of record
  words.json       every word and when it was said, the times a narration edit list is cut from
  captions.json    the same words as Remotion Caption[], for burned-in captions
  heard.json       every sound, spelled by an acoustic model, and the ums and false starts
                   Whisper heard one phrase at a time: what the narration edit cuts out
  ingest.json      which recording, when, with what model and settings
  frames/          a still at every screen change          (not in Git, regenerable)
  frames.json      the time of each still                   (not in Git)
  contact.html     each still beside what was said while it was up   (not in Git)
```

The polished voice track is not here. Remotion can only play what is under `public/`, so it
is `public/narration/<slug>/source-normalized.m4a`.

`heard.json` exists because Whisper tidies speech up: "a, a, a terminal, uh, app" comes out
"a terminal app". Its `said` list is the recording phrase by phrase as actually spoken, which
is the quickest way to see where the stumbles are.

## Correcting a transcript

Open `contact.html`, read `transcript.md` beside it, and fix what the model misheard: product
and model names, numbers, acronyms. "Control Bot" is already written CTRLbot. Keep the filler
and false starts; the transcript is an index into what was said, not a script to be read.
Then change the status line to `Status: corrected <date>`.

A corrected transcript is never overwritten by a re-run unless `--force` is given. Neither is
anything else here, so re-running to add a missing step is safe.

## Older transcripts

`ai-walkthrough/` and `device-database/` hold transcripts made by hand before this command
existed, so they have no `words.json`. Run the command on their recordings in
`video input/archive/` to add the word timings and captions; the corrected transcripts and
the prepared audio are kept.
