# Improving UI fidelity and repurposing CTRLbot video content

## Short answer

The Android source code is necessary, but it is not sufficient by itself for pixel-accurate training videos.

The strongest production input is a combination of:

1. the current source and resources;
2. screenshots of important runtime states;
3. clean screen recordings of complete workflows;
4. safe, realistic demo data;
5. a short product-truth document explaining what is current, deferred, or intentionally hidden;
6. brand, narration, and publishing requirements.

The ideal final videos should use a **hybrid approach**:

- real application captures for exact tap-by-tap instruction;
- code-built CTRLbot UI for diagrams, transitions, zooms, highlights, and conceptual explanations;
- reusable Remotion overlays for captions, pointers, warnings, steps, and calls to action.

That will be much more accurate than trying to reconstruct every application screen entirely from XML or screenshots, while still preserving the flexibility that makes Remotion valuable.

---

## 1. What should be provided to improve UI and functional accuracy?

### What the source code already gives us

The existing access to `../CTRLbot-IoT` is valuable. It provides:

- layout XML and dimension resources;
- current colors, typography, images, vectors, and icons;
- visible labels and content descriptions;
- fragment and activity structure;
- actual navigation rules;
- runtime logic such as connection testing, presets, switching, audio, and the EUI exit gesture;
- implementation details that screenshots cannot reveal, such as hidden or deferred features.

This is why the first Remotion version already uses the correct dark palette, CTRLbot blue, current navigation terminology, Activities tabs, secure-credential messaging, and current EUI behavior.

### What source files do not reliably show

XML and Kotlin do not give a complete visual record of the running product. They may not reveal:

- the exact runtime data shown in lists and fields;
- final layout at a particular screen density or device size;
- keyboard, system-bar, dialog, loading, success, and error states;
- programmatically created views;
- scrolling behavior and timing;
- animations and gesture feedback;
- which workflow is considered the preferred product path;
- whether a technically present feature is ready to teach;
- visual differences between phone, tablet, portrait, and landscape.

For exact training content, the running app is the visual ground truth. The source explains *why* it behaves that way.

## Recommended inputs, in priority order

| Priority | Input | Why it matters |
|---|---|---|
| Essential | Current build identifier or commit | Prevents training against an outdated UI |
| Essential | Clean screen recordings of the target workflows | Captures exact layout, transitions, timing, scrolling, and state changes |
| Essential | Screenshots of key states | Provides pixel-accurate visual references for reconstruction and QA |
| Essential | A workflow/acceptance document | Defines the correct path and the successful end state |
| High | Sanitized demo project and device data | Makes captures realistic and repeatable without exposing customer information |
| High | Approved brand package | Supplies production logo files, licensed fonts, colors, and any motion/audio identity |
| High | Audience, outcome, and desired length | Determines pacing, terminology, and how much technical detail belongs in the lesson |
| High | Narration or an approved script | Lets animation timing follow the spoken explanation instead of arbitrary scene lengths |
| Helpful | Reference videos you like | Establishes preferred pacing, energy, transitions, camera moves, and caption treatment |
| Helpful | Common support questions | Turns training production toward real user friction instead of generic feature tours |
| Helpful | Publishing destinations | Determines aspect ratio, safe zones, captions, CTA, codec, and duration variants |

## The most useful screenshot set

For each workflow, provide screenshots of:

- the starting screen;
- every menu or tab involved;
- the empty state;
- a realistic populated state;
- the selected or pressed state;
- important dialogs;
- loading or connection-in-progress state;
- success state;
- common error state;
- the final state that proves the task worked.

If CTRLbot supports substantially different device layouts, provide references for:

- tablet landscape;
- tablet portrait, if supported;
- phone portrait;
- display/projector remote;
- switcher remote;
- audio controls;
- EUI.

PNG is preferred for UI reference images. Preserve the native screenshot dimensions; do not resize or annotate the only copy.

## The most useful screen recordings

Record one task per clip. For example:

1. search for an Epson driver;
2. inspect the supported commands;
3. create a projector connection;
4. test the connection;
5. save it;
6. open its remote;
7. create and execute a preset;
8. configure switching;
9. enter and operate the EUI;
10. press and hold to return to Setup.

Capture recommendations:

- use the exact app build the lesson will document;
- record at the device’s native resolution;
- use a constant 30fps or 60fps recording;
- leave two seconds of clean footage before and after the action;
- turn off notifications and unrelated system overlays;
- use a dedicated fictional demo environment;
- make one clean recording without permanent arrows or annotations—Remotion can add those later;
- optionally provide a second recording with visible touches if gesture location is ambiguous;
- do not record real passwords, tokens, SSH keys, host fingerprints, customer names, public IP addresses, or production device information.

Screen recordings should show a natural operator pace. Animation timing can be tightened later without losing the original interaction.

## Safe demo data

A small repeatable demo project would make the content dramatically better. A useful fixture might include:

- `Boardroom Projector` — private demo IP, TCP;
- `Main Display` — private demo IP, TCP;
- `Matrix Switcher` — private demo IP, SSH or TCP;
- `Room Audio` — supported audio device;
- sources named `Presentation Laptop`, `Teams Room PC`, `Wireless Share`, and `Digital Signage`;
- outputs named `Main Display`, `Confidence Monitor`, `Lobby Display`, and `Projector`;
- presets named `System Power On`, `System Power Off`, and `Presentation Mode`.

Use RFC 1918 private addresses such as `192.168.10.x` and non-sensitive example credentials that are never stored in the repository.

## Product-truth document

For each lesson, supply a small table like this:

| Field | Example |
|---|---|
| App version/build | `0.xx / commit abc123` |
| Audience | AV integrator installing a boardroom |
| Learner outcome | Create and verify a projector connection |
| Canonical start | Device Drivers screen |
| Successful finish | Saved connection reports a valid device response |
| Common failure | Wrong port or unreachable private IP |
| Required warning | Telnet is plaintext; credentials must not appear in capture |
| Deferred behavior | EndPoint switching is not selectable in this release |
| Reviewer | Product owner or engineer responsible for this workflow |

This prevents an agent from confusing “code that exists” with “behavior that should be shown to users.”

## Brand and editorial inputs

The following would improve production polish:

- vector CTRLbot and corporate logos, preferably SVG;
- the licensed Audiowide/Roboto font files or approved web/video substitutes;
- brand color and logo-clear-space rules;
- an approved intro/outro line;
- caption capitalization and punctuation preferences;
- narrator voice, tone, pronunciation notes, and pace;
- approved music and sound-effect libraries;
- examples of marketing language that should or should not be used;
- final CTA and destination URL.

Do not provide a font or audio track unless it is licensed for rendered marketing and training video use.

## Suggested reference-package structure

Another agent will work much more reliably if the reference material is organized like this:

```text
reference/
  build-info.md
  product-truth.md
  workflows/
    01-driver-to-connection.md
    02-build-a-preset.md
    03-eui-handoff.md
  screenshots/
    tablet-landscape/
    phone-portrait/
    states-and-dialogs/
  recordings/
    clean/
    touches-visible/
  demo-data/
    README.md
  brand/
    logos/
    fonts/
    brand-guide.pdf
  editorial/
    voice-and-tone.md
    pronunciations.md
    reference-videos.md
```

Large or sensitive media can remain outside Git and be copied into `public/` only when needed for rendering.

## Recommended production review loop

1. **Intake:** confirm build, workflow, audience, output formats, and security constraints.
2. **Storyboard:** approve narration, chapter order, and which moments use real capture versus code graphics.
3. **Animatic:** render a low-resolution timing pass with temporary audio.
4. **Product review:** verify UI, labels, functionality, warnings, and final state.
5. **Visual review:** verify typography, motion, captions, safe areas, and brand consistency.
6. **Final render:** create the platform variants and caption/transcript assets.
7. **Archive:** save the exact props, build identifier, transcript, and capture sources used.

Two short review passes are usually faster than trying to make a long first render perfect without product feedback.

---

## 2. How can this be repurposed for a website, LinkedIn, and other social networks?

The right model is to treat each lesson as a **master content package**, not as a single finished video.

```text
One approved topic and script
          ↓
Structured content JSON + reusable captures
          ↓
16:9 lesson · website loop · 4:5 feed post · 9:16 short · stills
```

The current repository already demonstrates two ends of this system:

- `CTRLbot-Training-Lesson` and `CTRLbot-Overview` for 16:9;
- `CTRLbot-Feature-Short` for 9:16;
- `CTRLbot-Thumbnail` for still imagery.

The next improvement should be a shared content schema that lets those formats read from the same approved message and media references.

## Recommended composition families

| Composition | House format | Typical use |
|---|---:|---|
| `CTRLbot-Website-Hero` | 16:9 or responsive crop, 6–12s | Muted looping brand/product moment |
| `CTRLbot-Feature-Demo` | 16:9, 15–45s | Product-page feature explanation |
| `CTRLbot-Training-Lesson` | 16:9, 2–6 min | Full task-oriented education |
| `CTRLbot-Help-Clip` | 16:9, 10–30s | Embedded support or documentation answer |
| `CTRLbot-Social-4x5` | 1080×1350, 15–60s | LinkedIn and mobile feed post |
| `CTRLbot-Social-Square` | 1080×1080, 15–60s | Flexible feed asset |
| `CTRLbot-Social-Vertical` | 1080×1920, 10–60s | LinkedIn vertical, Shorts, Reels, TikTok |
| `CTRLbot-Release-Note` | 16:9, 4:5, and 9:16 | New feature or workflow announcement |
| `CTRLbot-OG-Image` | 1200×630 still | Website/social link preview |
| `CTRLbot-Carousel-Slides` | 1080×1350 still sequence | LinkedIn document/carousel content |

These are production recommendations, not platform upload limits. Platform requirements change; verify them before a publishing batch.

### Current platform notes

- LinkedIn currently accepts a wide range of aspect ratios, 10–60fps, and up to 15 minutes for ordinary uploaded video. LinkedIn explicitly recommends leaving the video edges free of important text and logos because its interface can overlap them. See [LinkedIn video requirements and safe-zone guidance](https://www.linkedin.com/help/linkedin/answer/a548372/).
- LinkedIn also has a full-screen vertical viewing experience, so a dedicated 9:16 version is now worthwhile instead of relying only on 16:9. See [LinkedIn full-screen vertical video](https://www.linkedin.com/help/linkedin/answer/a6828545).
- YouTube’s standard desktop presentation is 16:9, with 1920×1080 listed for 1080p. See [YouTube aspect ratios and resolutions](https://support.google.com/youtube/answer/6375112).
- YouTube currently classifies square or vertical uploads up to three minutes as Shorts for standard channels. See [YouTube Shorts eligibility](https://support.google.com/youtube/answer/15424877?hl=en-GB).
- TikTok’s official advertising guidance commonly recommends 9:16 vertical video at a minimum of 720×1280; a 1080×1920 house master therefore works well for cross-platform vertical delivery. See [TikTok video specifications](https://ads.tiktok.com/help/article/global-app-bundle-video-ad-specifications?lang=en).

## How to atomize one training lesson

Suppose the master lesson is **Build a reliable Presentation Mode preset**.

It can produce:

1. **Full training video:** a 3–5 minute step-by-step lesson.
2. **Website feature demo:** a 25-second problem → workflow → result explanation.
3. **LinkedIn 4:5 post:** “Four devices. One button.” with burned-in captions.
4. **Vertical short:** a 15-second command-sequence animation with a strong first-frame hook.
5. **Support clip:** a 20-second explanation of why discrete Power On/Off commands matter.
6. **Release-note clip:** show the updated preset UI and one benefit.
7. **Carousel:** five stills covering the four steps and final result.
8. **Open Graph image:** a branded `Presentation Mode` thumbnail.
9. **Animated website loop:** the sequence builder populates, then the EUI preset fires.
10. **Email asset:** a still thumbnail with a play button linking to the hosted video.

The screenshots, screen recordings, lesson JSON, and narration do not need to be recreated for each format. Remotion changes the layout and edit around the same source material.

## Content themes beyond training

### Product education

- “What is a CTRLbot driver?”
- protocol explainers: TCP, Telnet, SSH, RS-232, and IR;
- many-to-one versus many-to-many switching;
- how system presets reach a known power state;
- installer setup versus End User Interface.

### Marketing and thought leadership

- “The hidden cost of five separate AV control apps”;
- “Why room control should be device-agnostic”;
- “Configuration for the integrator; simplicity for the operator”;
- before/after workflow comparisons;
- common AV room failure patterns and how to prevent them;
- architecture visuals showing Driver → Connection → Activity → EUI.

### Product updates

- feature release animations;
- driver-catalog updates;
- UI changes and migration notices;
- short changelog summaries;
- “what changed and why” engineering explainers.

### Sales enablement

- silent booth or event loops;
- product overview for discovery calls;
- customer-specific demo reels using fictional or approved data;
- vertical clips for sales-team social posts;
- feature comparison animations.

Customer-specific material should only be created with explicit permission and a reviewed privacy scope.

## Format-specific editorial treatment

### Website

- Lead with product motion rather than a long title sequence.
- Keep hero loops short, silent, and seamless.
- Export MP4 and WebM plus a poster image.
- Do not make essential information depend on autoplay audio.
- Provide controls for longer or instructional videos.
- Provide captions and a transcript for meaningful spoken content.
- Respect reduced-motion preferences by falling back to a still or lower-motion version.

Example integration:

```html
<video autoplay muted loop playsinline poster="/media/ctrlbot-hero.jpg">
  <source src="/media/ctrlbot-hero.webm" type="video/webm" />
  <source src="/media/ctrlbot-hero.mp4" type="video/mp4" />
</video>
```

### LinkedIn

- Put the promise or problem in the first one to two seconds.
- Assume sound may be off; burn in concise captions.
- Prefer a 4:5 feed master for screen area and a separate 9:16 vertical version.
- Keep important text and logos inside a conservative internal safe area.
- End with one clear CTA: read, watch, comment, visit, or request a demo.
- Pair the video with post copy that adds insight instead of restating every caption.

### Vertical social

- Recompose the UI; do not merely crop a 16:9 video.
- Use fewer UI elements at a larger size.
- Keep titles and captions away from platform controls at the top and bottom.
- Use a strong visual change in the first second.
- Let one clip communicate one idea.
- Keep a clean master without platform watermarks so it can be reused.

### Long-form video and webinars

- Use the motion system for chapter cards, lower thirds, diagrams, and recap slides.
- Use real application capture for the core demonstration.
- Render a matching thumbnail and chapter stills from the same props.
- Preserve the transcript for captions, articles, and searchable support content.

## Proposed shared content schema

A reusable content item could look like this:

```json
{
  "id": "presentation-mode-preset",
  "audience": "AV integrators",
  "hook": "Four devices. One button.",
  "problem": "Room startup requires several separate controls.",
  "feature": "Ordered cross-device presets",
  "proof": "Projector, switcher, and audio reach a known state.",
  "cta": "Build your first CTRLbot system",
  "lessonProps": "props/presentation-mode.json",
  "captures": [
    "captures/preset-builder.mp4",
    "captures/eui-run-preset.mp4"
  ],
  "variants": ["lesson", "website", "linkedin-4x5", "vertical", "thumbnail"]
}
```

The render script can then create every approved variant from one content record.

## Recommended next repository additions

1. Add a `reference/` intake structure using the layout shown above.
2. Add real-capture components supporting crop, zoom, device frames, blur/redaction, cursor, and tap indicators.
3. Add 4:5, square, website-loop, help-clip, release-note, and Open Graph compositions.
4. Add a shared content schema and a render matrix.
5. Add subtitle export, not only burned-in captions.
6. Add audio mixing for narration, music, and sound effects.
7. Add automated checks for safe zones, missing media, and text overflow.
8. Add a render manifest recording source build, props, output filename, duration, and review status.

---

## 3. The smallest useful handoff for the next fidelity pass

If time is limited, provide only these items first:

- the exact CTRLbot build or commit to document;
- one clean landscape-tablet recording of the complete Driver → Connection → Preset → EUI workflow;
- 10–20 native-resolution screenshots covering the major screens and dialogs;
- a fictional demo dataset;
- the approved audience, lesson outcome, target length, and CTA;
- any fonts and logos that are licensed for video use;
- one person who can approve product accuracy.

With that package, an agent can replace approximate mockups with accurate capture-driven scenes, reproduce key UI states, write a reliable storyboard, and create several publishable format variants from the same content.
