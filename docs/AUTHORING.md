# Authoring CTRLbot training videos

## Recommended workflow

1. **Choose one observable outcome.** A lesson should end with the learner able to perform a task, such as “create and test a projector connection.”
2. **Write the narration first.** Keep each chapter focused on one app surface. At a natural training pace, plan roughly 125–150 spoken words per minute.
3. **Turn the script into structured props.** Copy `props/getting-started.json`; each chapter becomes one visual block.
4. **Preview in Remotion Studio.** Edit text in the Props panel or reload the JSON file. Check safe margins and caption length.
5. **Use current product capture.** Put sanitized captures in `public/captures/`. Conceptual explanation can use diagrams, but any visible app surface should come from a reviewed build rather than a parallel mock UI.
6. **Record narration.** Put approved audio in `public/audio/`. Keep a clean master WAV and render-delivery AAC/MP3 as separate assets.
7. **Render and review.** Verify the full video, not only a few frames. Check text, timing, audio sync, product behavior, and the final frame.

## First-use walkthrough props

The v1.0 phone and tablet walkthroughs share `props/first-use.json`. The copy and scene durations are common; the composition selects the matching device capture automatically.

```json
{
  "title": "First-use walkthrough",
  "subtitle": "From first launch to a room-ready End User Interface.",
  "version": "1.0",
  "accentColor": "#008FD4",
  "steps": [
    {
      "id": "privacy",
      "eyebrow": "First launch",
      "title": "Review privacy",
      "body": "Select Get Started...",
      "durationInSeconds": 3.5
    }
  ],
  "closing": "Your room is ready."
}
```

The required step IDs are `privacy`, `drivers`, `connection`, `activities`, `eui`, and `handoff`. Keep this order unless the product manual changes. The registered phone and tablet defaults inject the `device` prop.

## Lesson props

```json
{
  "title": "Lesson title",
  "subtitle": "One-sentence promise",
  "audience": "AV integrators",
  "learningObjectives": ["Outcome one", "Outcome two"],
  "chapters": [
    {
      "kind": "connection",
      "title": "Configure the connection",
      "narration": "Caption and voiceover script for this chapter.",
      "bullets": ["Step one", "Step two", "Step three"],
      "durationInSeconds": 8,
      "callout": "Important detail",
      "capture": {
        "source": "captures/tablet/connection-test.mp4",
        "type": "video",
        "device": "tablet",
        "label": "Current tablet UI"
      }
    }
  ],
  "closing": "The room is ready",
  "accentColor": "#008FD4",
  "showCaptions": true
}
```

Supported `kind` values:

| Kind | Animated product surface |
|---|---|
| `concept` | Device Drivers overview surface |
| `drivers` | Searchable driver catalog and command detail |
| `connection` | Connection form and live test terminal |
| `presets` | Preset list and ordered sequence builder |
| `switching` | Many-to-many routing matrix |
| `eui` | Full-screen client End User Interface |

`durationInSeconds` must be 4–90 seconds. The composition’s total frame count is recalculated by `calculateMetadata()`.

`capture` is optional. When omitted, the chapter uses the reviewed v1.0 tablet still for its chapter kind. When present, `source` is relative to `public/`, `type` is `image` or `video`, and `device` is `phone` or `tablet`. Keep video clips longer than the chapter that uses them.

## Copy standards

- Use the app’s visible terminology: **Device**, **Connect**, **Activities**, **Presets**, **Switching**, **Audio**, and **End User Interface**.
- Write action-led titles: “Test the connection,” not “Connection testing information.”
- Keep on-screen bullets under roughly 55 characters when possible.
- Captions may be longer but should usually fit in two lines.
- Never put real credentials, customer names, public IPs, SSH fingerprints, or proprietary device details in props or captures.

## Visual standards

- 16:9 training: 1920×1080 at 30fps.
- Vertical features: 1080×1920 at 30fps.
- CTRLbot blue: `#008FD4`; success green: `#4EA72E`; alert red: `#FF5A64`.
- Always write **CTRLbot** with this exact casing and render the name in Audiowide.
- Use Audiowide for all bold display and UI text; use the body stack only for regular-weight supporting copy.
- Use the canonical icon in `public/brand/ctrlbot-icon-white.png`; do not redraw or recolor it.
- Keep essential text at least 68px from 16:9 edges.
- Animate with frame-derived values only. Do not add CSS transitions, keyframes, or timers.
- Use restrained springs for entrances; training content should feel confident rather than bouncy.

## Adding captures and voiceover

The current compositions use the reviewed media under `public/captures/`. When replacing or adding screen recordings:

- record a clean Android emulator or dedicated demo device;
- use only fictional room names and private-range demo IPs;
- crop system notifications and unrelated personal UI;
- preserve a 16:9 or device-native master;
- place the sanitized file under `public/captures/` and load it with Remotion’s `staticFile()` helper;
- use `OffthreadVideo` for deterministic frame extraction during rendering.

For narration, keep a transcript in the lesson JSON even when audio is present. That keeps captions, review copy, and future localization in one structured source.

## Review checklist

- [ ] Task matches the current Android build.
- [ ] No deferred or hidden feature is taught as available.
- [ ] No secrets or customer-identifying data appear.
- [ ] Captions match narration and remain legible.
- [ ] Commands and safety guidance are technically correct.
- [ ] Intro states the outcome within the first 10 seconds.
- [ ] Every chapter demonstrates or explains one action.
- [ ] Closing reinforces what the learner can now do.
- [ ] `npm run check` passes.
- [ ] Full render has been watched end to end.
