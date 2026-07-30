# CTRLbot Remotion

A reusable motion-design and training-video system for the native Android app in `../CTRLbot-IoT`.

The repository ships with six ready-to-preview compositions. The v1.0 first-use pair is the current release deliverable:

| Composition | Format | Purpose |
|---|---:|---|
| `CTRLbot-First-Use-Phone` | 1080×1920, 36.5s | Concise first-use walkthrough using the current phone portrait UI |
| `CTRLbot-First-Use-Tablet` | 1920×1080, 36.5s | Matching first-use walkthrough using the current tablet landscape UI |
| `CTRLbot-Overview` | 1920×1080, ~52s | Capture-backed product story covering drivers, connections, presets, switching, and EUI |
| `CTRLbot-Training-Lesson` | 1920×1080, variable | JSON-driven training lesson with optional phone/tablet capture per chapter |
| `CTRLbot-Feature-Short` | 1080×1920, 12s | Vertical product/social teaser using the current phone EUI |
| `CTRLbot-Thumbnail` | 1920×1080 still | Training-series cover using the current tablet EUI |

Motion graphics are built with React, CSS/SVG, `useCurrentFrame()`, `interpolate()`, and `spring()`. Product surfaces use sanitized v1.0 phone/tablet capture loaded through `staticFile()`; the code does not maintain a parallel mock implementation of the app UI.

## Start here

Requirements: Node.js 18 or newer. Node 20 LTS is recommended.

```powershell
npm install
npm run dev
```

Remotion Studio opens with every composition grouped in the sidebar. Select `CTRLbot-Training-Lesson` and use the Props panel to edit lesson content interactively.

## Validate and render

```powershell
npm run check
npm run render:first-use
npm run render:overview
npm run render:lesson
npm run render:short
npm run render:thumbnail
```

Outputs are written to `out/`. The first-use pair renders to:

- `out/ctrlbot-first-use-phone-v1.0.mp4`
- `out/ctrlbot-first-use-tablet-v1.0.mp4`

Render every registered family with:

```powershell
npm run render:all
```

## Refresh the phone and tablet captures

The checked-in media is a curated, muted subset of the July 29, 2026 walkthrough package. To rebuild it from the sibling capture folder:

```powershell
npm run ingest:captures -- "../CTRLbot Mirror"
```

The ingest script copies selected screenshots, trims short H.264 clips from both walkthroughs, removes their audio, and writes `public/captures/manifest.json`. See [Capture Ingest Review](docs/CAPTURE-INGEST.md) for the observed UI, selection decisions, and publication caveats.

## Create another training lesson

1. Duplicate `props/getting-started.json`.
2. Update the title, objectives, chapter copy, durations, and callouts.
3. Preview the file without changing code:

```powershell
npx remotion studio src/index.ts --props=props/your-lesson.json
```

4. Render it:

```powershell
npx remotion render src/index.ts CTRLbot-Training-Lesson out/your-lesson.mp4 --props=props/your-lesson.json
```

Chapter kinds are `concept`, `drivers`, `connection`, `presets`, `switching`, and `eui`. Each kind selects a matching animated product surface. The total duration is calculated from chapter durations automatically.

See [First-Use Walkthrough](docs/FIRST-USE-WALKTHROUGH.md) for the approved source mapping and storyboard, [Authoring Guide](docs/AUTHORING.md) for the content schema and media workflow, [Capture Ingest Review](docs/CAPTURE-INGEST.md) for this capture set, [Content Roadmap](docs/CONTENT-ROADMAP.md) for the proposed training series, [UI Fidelity and Content Repurposing](docs/UI-FIDELITY-AND-CONTENT-REPURPOSING.md) for the reference-material and multi-channel strategy, and [Remotion Research](docs/REMOTION-RESEARCH.md) for the architecture decisions.

## Repository map

```text
src/
  components/       Canonical CTRLbot branding, capture presentation, scene chrome, icons
  compositions/     First-use variants, overview, lesson, vertical short, thumbnail
  design/           Color, type, timing, and animation tokens
props/               Renderable lesson/product inputs
public/              Optional captures, audio, images, and fonts
scripts/             Batch render entry points
docs/                Research, authoring, and content strategy
```

## Product accuracy

Before publishing a lesson, compare the copy and UI flow with `../CTRLbot-IoT/AGENTS.md`, current Android resources, and a current build of the app. In particular:

- EndPoint switching is currently deferred and hidden; do not train users to select it.
- Power presets use discrete Power On and Power Off commands; toggle-only devices do not join those system presets.
- Credentials must never appear in captures or JSON props.
- The EUI exits through a two-second press-and-hold in the top-left area.

## Licensing

Remotion uses a source-available license with free eligibility for individuals and for-profit organizations up to three people, plus non-profits and evaluation. Larger for-profit organizations need a company license. Confirm the current terms before commercial production: [Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
