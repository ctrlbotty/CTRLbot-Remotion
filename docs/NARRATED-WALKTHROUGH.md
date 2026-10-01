# Narrated walkthrough workflow

This is the default process when Nathan demonstrates an app while explaining it in his
own voice. The walkthrough recording is both the editorial reference and the narration
source. The motion graphic is built around that performance; no synthetic voice is
generated and no second narration session is required.

The AI walkthrough is the working example:

- raw recording: `video input/archive/CTRLbot AI Walkthrough.mp4`;
- transcript: `ingest/ai-walkthrough/transcript.md`;
- prepared voice track: `public/narration/ai-walkthrough/source-normalized.m4a`;
- edit list: `src/marketing/ai-walkthrough/aiWalkthroughNarration.ts`;
- brief: `videos/archive/2026-09-03-ai-walkthrough.md`;
- silent composition: `AI-Walkthrough`;
- narrated composition: `AI-Walkthrough-Narrated`.

## 1. Record the app walkthrough

Save the recording in `video input/`. Its README has the recording tips that make the
edit easy, including how to record so a 30-second short can be lifted from it.

Record the real app and talk through it naturally. The recording does not need to be the
same length as the final motion graphic. A longer explanation is useful because the edit
can select complete thoughts and leave out repetition.

For cleaner edits:

- record in a quiet room with one microphone and no music;
- leave a short pause between topics and after sentences;
- avoid talking over notification sounds or other speakers;
- say product terms the way they should sound in the final video;
- keep the raw recording unchanged. Root-level MP4 files are already ignored by Git.

## 2. Ingest the recording

From the repository root:

```powershell
npm run ingest:recording -- --list
npm run ingest:recording -- <slug> "<file name>.mp4"
```

The slug names the recording, not a cut, because one recording can feed a walkthrough, a
short and a website loop. One command does five things, and reuses any output that already
exists:

1. **Prepares the voice track** with `narration:prepare`: the first audio stream, mono 48 kHz
   AAC, lightly polished (an 80 Hz high-pass and gentle 2:1 compression set from the
   recording's own loudness) and two-pass normalized to -16 LUFS, written to
   `public/narration/<slug>/source-normalized.m4a`. There is no noise reduction: these
   recordings arrive gated, and denoising gated audio only adds artefacts. Timing is
   untouched, so every time in the ingest still matches the recording.
2. **Transcribes it** word by word with local faster-whisper (`medium.en`, voice-activity
   filtered, product vocabulary as a prompt) into `ingest/<slug>/words.json`, with a draft
   `transcript.md` and Remotion `captions.json` beside it. "Control Bot" is written CTRLbot.
3. **Listens for what Whisper leaves out** into `ingest/<slug>/heard.json`. Whisper writes
   what was meant, so "a, a, a terminal, uh, app" comes out "a terminal app". Two passes
   catch the rest: an acoustic model (wav2vec2 via onnxruntime, about 95 MB, downloaded once)
   that spells every sound it hears, repeats included, and Whisper again on one phrase at a
   time, where it writes a lone "uh" down. The narration edit uses both (step 5).
4. **Takes a still at every screen change** into `ingest/<slug>/frames/`, using the full
   ffmpeg on PATH, because the one Remotion bundles cannot do scene detection.
5. **Writes `contact.html`**: each still beside the words spoken while it was on screen. This
   is the fastest way to see a recording's beats.

It runs on the RTX GPU: an 8-minute recording transcribes in about 30 seconds and is
listened to in about three minutes. If CUDA is ever missing it falls back to the CPU, about
seven times slower; the CUDA 12 libraries it needs come from
`pip install nvidia-cublas-cu12 "nvidia-cudnn-cu12==9.*"`, no toolkit.

Use `--dry-run` to see the plan, `--skip=frames` (or `narration`, `transcript`, `heard`) to
leave a step out, and `--force` only when a new recording should replace the old outputs.

## 3. Correct the transcript

`transcript.md` starts as `Status: DRAFT`. Check it against `contact.html` and the recording,
fix misheard product names, numbers and acronyms, then mark it `Status: corrected <date>`.
From then on it is the source of truth, and a re-run of the ingest leaves it alone.

The transcript is not a new voice-over script. It is an index into what Nathan already
said, preserving his delivery and phrasing. Filler and false starts stay in it.


## 4. Fill the brief from the recording

Copy `videos/_TEMPLATE.md`. Set Narration mode to `source-edit` and fill in all narration
paths, starting with the recording's `ingest/<slug>/` folder. Derive the promise and beat order from the recording rather than imposing an
unrelated marketing arc. Every beat still needs visible evidence and must still make
sense with the sound off.

The narrated source changes the editorial input, not the visual quality gates. Continue
to follow `docs/VIDEO_WORKFLOW.md` for surfaces, copy, timing, review, and product claims.

## 5. Build the motion graphic and the voice edit together

Keep narration timing beside the composition in a file named for the video, for example
`src/marketing/<slug>/<slug>Narration.ts`. The edit list is planned with `npm run narration:edit`,
not hand-trimmed `NarrationTrack` clips:

```powershell
npm run narration:edit -- src/marketing/<slug>/<slug>Narration.ts <CLIPS export> <ingest slug> --seconds=<cut length>
```

The clips file stays import-free:

```ts
export const SOURCE = 'narration/<slug>/source-normalized.m4a';

export const CLIPS = [
  {
    id: 'opening',
    at: 0.5,
    start: 3.2,
    end: 10.8,
  },
];
```

All times are seconds. `start` and `end` select words from the original recording, read
straight from `ingest/<slug>/words.json`; `at` places that phrase in the final composition.

Whisper's word times are not safe cut points on their own. A word's end runs early at the
end of a phrase and stretches across a pause, so a clip cut on them loses its last syllable:
"PC" by 240 ms, "network" by its final k. Instead of hand-trimming `NarrationTrack` clips,
`npm run narration:edit` hands the edit list to `scripts/lib/voice.mjs`, which finds the
real quiet around the clip's words, removes fillers, repeats and false starts that `heard.json`
found, applies `TUTORIAL_CAPS` to shorten long pauses, normalizes loudness to -16 LUFS,
and renders one sample-accurate track to `public/narration/<slug>/edit.m4a`. It also writes
`<slug>Narration.generated.ts` containing the planned edit, composition millisecond word timings,
and cues for `cueFrame`.

## 6. Narrated, in two shapes

There is no silent cut. Walkthroughs play through `WalkthroughShell` across card, stage and
chapter layouts over the single audio track from `edit.m4a`. `WalkthroughShell` replaces the
Stage-only / PortraitStage-only pattern:

- **card**: `MasterControlCard` opening or closing lockup. Composed at frame 0, tricon and line.
- **stage**: `Stage` (1920x1080) or `PortraitStage` (1080x1920) with `WalkthroughCopy`; the camera holds, then makes one push to the beat's region (never past 0.94).
- **chapter**: full-frame `Camera` with `fit="expand"`. Consecutive chapter beats share one continuous camera path so moves between them are moves, not cuts. Screen-space `Callout` is placed in an open area beside the subject in landscape and at the top in portrait.
- **Captions**: portrait burns in `NarrationCaptions` from `correctCaptions(edit.words)` on a bottom scrim above the safe line, across all layouts. Landscape captions ship as an .srt (`npm run narration:srt --edit=...`).

A 15-frame crossfade smooths every layout transition while keeping each beat's absolute start.
The cut stays under 2:20, X's limit without Premium; the brief's destination is
`social-walkthrough-vertical`, which enforces it.

```powershell
npm run render -- <slug> out/<slug>.mp4 --codec=h264 --crf=20
npm run render -- <slug>-portrait out/<slug>-portrait.mp4 --codec=h264 --crf=20
npm run narration:srt -- <narration.ts> <CLIPS export> <ingest slug> out/<slug>.srt --edit=<generated.ts>
```

Never pass `--muted`: both renders carry the narration.

## 7. Verify both picture and sound

Run the normal visual gates, then inspect the rendered audio:

```powershell
npm run check
npm run video:lint
npm run video:frames -- <slug> check out/<slug>.mp4
VIDEO_COMPOSITION=<slug>-portrait npm run video:frames -- <slug> check out/<slug>-portrait.mp4
npm run narration:check -- out/<slug>.mp4
npm run narration:check -- out/<slug>-portrait.mp4
```

`narration:check` fails on missing or silent audio, unusable loudness, or a true peak too
close to clipping. It prints codec, sample rate, channel count, duration, integrated
loudness, and true peak for the review record.

Finally, watch the complete narrated render with headphones and speakers. Confirm that:

- every edit starts and ends on a complete word;
- the spoken claim matches the visible beat;
- pauses feel deliberate rather than broken;
- captions do not contradict the recorded phrasing;
- the original recording still exists;
- no private data from the source recording appears in the rebuilt surface.

## For the next walkthrough

Nathan only needs to provide the new narrated app recording and identify the intended
destination or approximate final length. The rest of this workflow can be repeated from
the preparation command onward.
