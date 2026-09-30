# Create a voice clone

Status: future work. The current production workflow uses Nathan's real narration from
each app walkthrough. Nothing in this repository currently creates synthetic speech or
uploads a voice sample.

## What would be required

1. Choose a provider and confirm that this account can create a custom voice. Provider
   access, pricing, retention, and deletion controls must be reviewed at implementation
   time.
2. Record the provider's required consent phrase in Nathan's voice. Keep this identity
   asset outside `public/` and outside Git.
3. Record a clean voice sample with no music, room echo, noise reduction artifacts, or
   other speakers. Use a consistent microphone position and delivery. Keep the master
   sample outside the repository as well.
4. Upload the consent and sample once, then store only the returned voice ID in local
   configuration. Store the API key in an environment variable or secret manager—never
   in source, a Markdown brief, Remotion props, or a rendered asset.
5. Add a pre-render generation command. It should accept a reviewed script, call the
   provider before Remotion starts, and write deterministic audio assets under
   `public/narration/<slug>/generated/`.
6. Save a manifest beside the generated audio containing the script checksum, provider,
   model, voice ID, settings, file duration, and generation date. If the script and
   settings have not changed, reuse the cached asset instead of making another API call.
7. Feed the generated files into the existing `NarrationTrack` layer. Do not call a
   speech API during a Remotion preview or render; network output would make frame renders
   slow and non-reproducible.
8. Review a short comparison before using the voice in production. Check pronunciation,
   cadence, emotional fit, edit points, loudness, and whether it is unmistakably Nathan.

## OpenAI implementation path

Checked against official OpenAI documentation on 2026-09-03:

- [Create voice consent](https://developers.openai.com/api/reference/resources/audio/subresources/voice_consents/methods/create)
  uploads a consent recording with a language tag and name. The recording is limited to
  10 MiB and must use one of the documented audio types.
- [Create voice](https://developers.openai.com/api/reference/resources/audio/subresources/voices/methods/create)
  creates the custom voice from an audio sample and the returned consent ID. The sample
  is also limited to 10 MiB.
- [Create speech](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create)
  accepts a custom voice object such as `{ "id": "voice_1234" }`, text of up to 4096
  characters per request, and common audio output formats.

Before building against this path, make a small authenticated access test. The public
API reference documents the endpoints, but actual custom-voice availability should be
confirmed for the selected OpenAI account and project.

## Proposed repository shape

```text
scripts/
  voice-generate.mjs              future provider call and cache
voice-scripts/
  <slug>.md                       reviewed words only
public/narration/<slug>/generated/
  01-opening.wav                  generated before render
  02-explanation.wav
  manifest.json
src/marketing/<slug>/
  <slug>Narration.ts              timeline placement
```

The consent recording, clone sample, API key, and any provider export do not belong in
that tree. Keep them in encrypted storage or a private folder outside this checkout.

## Script and pronunciation preparation

Generate one beat or paragraph at a time rather than a whole video in one request. Short
assets are easier to regenerate, retime, and replace without changing approved sections.
Create and review a pronunciation list before the first production run, especially for:

- `CTRLbot` and each product name (`CTRLbot IoT`, `CTRLbot.AI`, `CTRLbot.IO`);
- `IPMX`, `AVoIP`, `EUI`, `RS-232`, and `IoT`;
- manufacturer and product model names;
- URLs, acronyms, numbers, and command strings.

The written script becomes the source of truth in a cloned workflow. That is the main
difference from the current workflow, where the source recording and Nathan's original
performance are the truth.

## Definition of done

- Nathan's consent is recorded and stored privately.
- The provider can delete or revoke the voice and its source recordings.
- Secrets are absent from Git and rendered output.
- A reviewed script generates the same cached files on repeat runs.
- A short pronunciation test is approved before a full video is generated.
- Generated narration passes `npm run narration:check` after rendering.
- Every published use is clearly authorized by Nathan and limited to his own voice.
