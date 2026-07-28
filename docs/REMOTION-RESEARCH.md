# Remotion research and architecture decisions

Research checked against current official Remotion documentation and packages on July 28, 2026. The repository is pinned to Remotion `4.0.500` so every Remotion package stays on the same version.

## What Remotion is good at here

Remotion registers React components as renderable compositions with explicit width, height, framerate, and duration. A frame number becomes the deterministic time source, while regular React, CSS, SVG, canvas, media, and data can define what appears on that frame. This is a strong fit for CTRLbot because training graphics repeat the same brand shell, UI surfaces, callouts, and timing patterns with different lesson copy.

Sources: [The fundamentals](https://www.remotion.dev/docs/the-fundamentals), [`<Composition>` API](https://www.remotion.dev/docs/composition).

## Parameterization strategy

Current Remotion supports default props for Studio, input props at render time, Zod schemas for validation and visual editing, and `calculateMetadata()` for changing duration or other metadata from the resolved props. The training lesson uses all four:

- `props/getting-started.json` provides a human- and agent-editable lesson contract;
- `trainingLessonSchema` validates public render inputs;
- Remotion Studio can edit the default props visually;
- `calculateMetadata()` derives the total frame count from chapter durations.

This creates the automation boundary described in the request: a script, transcript, or document can be transformed into validated lesson JSON without rewriting animation code.

Sources: [Parameterized videos](https://www.remotion.dev/docs/parameterized-rendering), [`calculateMetadata()`](https://www.remotion.dev/docs/calculate-metadata).

## Animation strategy

Remotion explicitly recommends deriving animation from `useCurrentFrame()` and warns that browser-timed CSS transitions can flicker during rendering. The repository therefore uses only frame-derived `interpolate()`, `spring()`, and deterministic trigonometric motion. Scene timing is expressed in frames through `<Series.Sequence>`.

Sources: [Animating properties](https://www.remotion.dev/docs/animating-properties), [`<Sequence>` API](https://www.remotion.dev/docs/sequence).

## Media and fonts

The built-in templates use SVG and system font stacks, so the project renders without a network dependency. Approved screen captures, narration, music, and licensed fonts can be placed under `public/` and loaded as static assets. Remotion can wait for loaded fonts, and its media components support audio/video trimming, delay, volume, and playback changes.

Sources: [Using fonts](https://www.remotion.dev/docs/fonts), [Using audio](https://www.remotion.dev/docs/using-audio).

## Rendering path

The immediate workflow is local Studio preview plus CLI rendering. `npm run render:*` produces H.264 MP4 or PNG output. Input props stay outside the bundle command so one compiled visual system can render many lessons. If production volume later justifies it, the same compositions can move to server-side rendering or `@remotion/lambda`; that should be a separate infrastructure phase with license, cloud cost, browser binary, secrets, concurrency, and retry design reviewed explicitly.

Source: [`npx remotion render`](https://www.remotion.dev/docs/cli/render).

## AI-assisted content pipeline

The safe automation target is structured content, not unchecked final publishing:

```text
Product docs / transcript
        ↓
Draft lesson JSON
        ↓
Zod validation + Studio preview
        ↓
Human product review
        ↓
Narration / sanitized capture
        ↓
CLI render + visual QA
        ↓
Publish
```

An AI coding or content agent can draft objectives, chapters, bullet copy, durations, and callouts in the lesson schema. A human should still validate product behavior, security language, capture privacy, pacing, and release-sensitive feature status.

## Licensing note

Remotion’s current license permits free commercial or non-commercial use for individuals, for-profit organizations with up to three employees, non-profits, and evaluation. Other for-profit organizations need a Company License. License terms can change, so confirm them before the production workflow is adopted: [official license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
