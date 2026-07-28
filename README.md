# CTRLbot Remotion

A reusable motion-design and training-video system for the native Android app in `../CTRLbot-IoT`.

The repository ships with four ready-to-preview compositions:

| Composition | Format | Purpose |
|---|---:|---|
| `CTRLbot-Overview` | 1920×1080, ~52s | Product story covering drivers, connections, presets, switching, and EUI |
| `CTRLbot-Training-Lesson` | 1920×1080, variable | JSON-driven training lesson with chapters, learning objectives, callouts, and captions |
| `CTRLbot-Feature-Short` | 1080×1920, 12s | Vertical product/social feature teaser |
| `CTRLbot-Thumbnail` | 1920×1080 still | Training-series cover image |

All UI animation is built with React, CSS/SVG, `useCurrentFrame()`, `interpolate()`, and `spring()`. The mock UI follows the Android app’s dark visual system, `#008FD4` accent, current sidebar, Device Drivers workflow, Activities tabs, and End User Interface.

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
npm run render:overview
npm run render:lesson
npm run render:short
npm run render:thumbnail
```

Outputs are written to `out/`. Render all four with:

```powershell
npm run render:all
```

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

See [Authoring Guide](docs/AUTHORING.md) for the content schema and media workflow, [Content Roadmap](docs/CONTENT-ROADMAP.md) for the proposed training series, and [Remotion Research](docs/REMOTION-RESEARCH.md) for the architecture decisions.

## Repository map

```text
src/
  components/       CTRLbot logo, UI mockups, scene chrome, icons
  compositions/     Overview, lesson, vertical short, thumbnail
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
