# CTRLbot Remotion — Contributor Context

Motion graphics and training video for the native Android app in `../CTRLbot-IoT`.

## Commands

```bash
npm install
npm run sync:tokens    # pull design tokens, fonts and icons from the app repo
npm run dev            # Remotion Studio
npm run check          # tsc --noEmit + composition list
npm run video:lint     # the anti-slop gate — run this before reporting done
```

Render a scene or a still:

```bash
npm run render -- First-Run-Phone out/first-run-phone.mp4 --codec=h264 --crf=20 --muted
npm run still -- Scene-Device out/frame.png --frame=520
```

## Remotion agent skills

The official skills are installed in `.agents/skills` and symlinked into `.claude/skills`.
**Read the relevant one before writing composition code** — they encode the current API
and the Studio-interactivity rules this project follows:

| Skill | Use for |
|---|---|
| `remotion-markup` | animation, layout, timing, media, fonts — the default |
| `remotion-interactivity` | keeping markup editable in Studio |
| `remotion-docs` | looking up an API instead of guessing |
| `remotion-render` | render invocations and flags |
| `remotion-best-practices` | when unsure which applies |

Update them with `npx skills add remotion-dev/skills`.

## Making a new video

Do not start a composition from a prompt. **[docs/VIDEO_WORKFLOW.md](docs/VIDEO_WORKFLOW.md)
is the contract**: a brief from `videos/_TEMPLATE.md`, decomposed into atomic tasks by
`/video-prep`, run one at a time with a gate between each.

`npm run video:lint` and `npm run video:frames` enforce mechanically what
`docs/AUTHORING.md` describes in prose. Their thresholds are measured against the
approved First-Run cuts and the rejected Master Control promo — never tune one to make
a particular video pass.

`src/compositions/MasterControlPromo.tsx` is kept, unregistered, as the worked failure.
Read it before writing a marketing scene.

## The app is the source of truth

`npm run sync:tokens` reads `../CTRLbot-IoT/app/src/main/res` and writes:

- `src/design/tokens.generated.ts` — every color, dimen, text style and shape
- `public/fonts/` — Montserrat (UI) and Audiowide (wordmark), the app's own files
- `public/app-assets/` — EUI icons as SVG, cell gradients as PNG

Never hand-edit `tokens.generated.ts`. Never invent a color or a radius — if the app
does not define it, ask whether it belongs on screen at all. Re-run the sync after any
app resource change; the diff is the drift report.

Point at a different checkout with `npm run sync:tokens -- ../path/to/CTRLbot-IoT`.

## Rules

- Drive every animation from `useCurrentFrame()`. No CSS `transition`, no CSS
  `animation`, no timers, no unseeded randomness.
- Write `interpolate()` calls inline in the `style` prop with literal easing and
  output values, and prefer `scale` / `translate` / `rotate` over `transform`.
  Studio can only keyframe values it can read statically.
- Name elements with `Interactive.Div name="..."` so they are selectable in Studio.
  Rigs (`Camera`) and overlays with absurd geometry (`Spotlight`) stay plain.
- Three faces, following ctrlbot.io: **Audiowide** for headlines and the CTRLbot
  wordmark only; **Montserrat** (the app's face) for all readable copy;
  **Space Mono** for small uppercase eyebrows and technical labels. Audiowide is a
  texture — in motion graphics the text delivers the message, not the font, so it
  never carries body copy or a label. Write the name as `CTRLbot`, always.
- Keep composition metadata (`width`, `height`, `fps`, `defaultProps`) inline on
  `<Composition>`, with no type assertions.
- Run `npm run check` after changes, and render a still when layout moves.

## Architecture

```text
src/
  destinations.ts frame, duration window, safe area and banned phrases per destination
  design/       tokens.generated.ts (from the app) + theme.ts (curated)
  app-ui/       live React rebuilds of app surfaces, laid out in dp
                — viewports.ts is the one definition of how big a surface is
  camera/       Camera rig, Spotlight, FocusRing, TapIndicator, Callout
  scenes/       one file per scene + shared.ts for scene lengths
  marketing/    Stage and DualStage — the landscape promo layouts
  compositions/ FirstRun.tsx — the cut
videos/         one markdown brief per video; _TEMPLATE.md to start
scripts/        video-lint and video-frames — the gates
```

Training cuts are full-bleed and `Callout` overlays them. Marketing cuts use `<Stage>`:
the surface in a panel down one side, copy in a column beside it. Because that panel is
aspect-matched to the surface, the camera cannot push past about 0.94 without clipping
the corner controls — `<Spotlight>` carries emphasis instead.

The split that matters: `app-ui/` renders a surface at its natural dp size and knows
nothing about video; `camera/` decides what the frame looks at. That is what makes a
push-in onto a single control possible, and it is why regions are expressed in the
same units as the Android layout.

`src/scenes/EuiHandoff.tsx` is the reference implementation — read it before adding a
scene. `docs/ROADMAP.md` has project state and gotchas; `docs/TABLET-HANDOFF.md` is the
tablet build brief.

## Framing on portrait

Width is the binding dimension in a 1080x1920 frame. A full-width portrait UI cannot
be zoomed far without cropping the interface, so emphasis comes from `<Spotlight>` and
`<FocusRing>` while the camera makes modest, composed moves. Landscape (tablet) cuts
can lean much harder on the camera. Use `frameWidth(center, width)` to state a shot as
"this much of the interface across", which is the honest control on portrait.

## Product accuracy

Check copy against `../CTRLbot-IoT/AGENTS.md`, the Android resources, and a current
build before publishing. In particular:

- EndPoint switching is deferred and hidden; do not train users to select it.
- Power presets use discrete Power On and Power Off commands; toggle-only devices do
  not join those system presets.
- The EUI exits through a two-second press-and-hold in the top-left.
- No credentials, customer identifiers, or public addresses in captures or props.

## Licensing

Remotion is source-available and free for individuals and for-profit organizations up
to three people, plus non-profits and evaluation. Larger for-profit organizations need
a company license. Confirm before commercial production:
<https://github.com/remotion-dev/remotion/blob/main/LICENSE.md>
