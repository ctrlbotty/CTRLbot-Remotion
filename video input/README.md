# Video input

Narrated screen recordings of the real products, exactly as recorded. Nothing here is ever
edited or re-encoded; the video files are not in Git.

Once every cut planned from a recording is delivered, move it to `archive/`.

## After recording

```powershell
npm run ingest:recording -- --list
npm run ingest:recording -- <slug> "<file name>.mp4"
```

The slug names the recording and its folder in `ingest/`, for example `mirror-walkthrough`.
See [../docs/NARRATED-WALKTHROUGH.md](../docs/NARRATED-WALKTHROUGH.md) for what comes next.

## Recording so the edit is easy

- One microphone in a quiet room, no music, notifications off.
- **Record the product at 30fps or more.** Shorts play the footage itself. PowerPoint's
  screen recorder saves 10fps, which is why the Mirror and Terminator recordings are
  choppy on scrolls. CTRLbot Mirror's own recorder at 60fps is right for anything on
  Android: point its recording folder (Settings, Capture, Change) at this folder, raise the
  resolution cap to the device's own resolution for tablets, and 12 to 16 Mbps keeps text
  crisp. For Windows apps, any recorder set to 30fps or 60fps.
- Pause between topics. A clean gap is where a cut goes.
- **If you stumble, stop for a beat and say the whole phrase again.** The edit takes out
  ums, repeats and false starts on its own, cleanly when there is a breath either side of
  them. One said straight into the next word ("an SSH, a host") usually still comes out,
  but a pause makes it certain.
- **For shorts, explain each feature in one complete passage of 15 to 25 seconds** that makes
  sense on its own: what it is, the one thing it does, and a sign-off. A short is lifted from
  one such passage; a feature explained across three half-sentences cannot be.
- **A short can be one slogan.** Record it as its own file, a sentence or two, and pair it in
  `src/shorts/shortsData.ts` with a motion graphic or an image.
- Say product names the way they should sound: "Control Bot" for CTRLbot.
