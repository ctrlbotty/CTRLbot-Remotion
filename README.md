# CTRLbot Remotion

Motion graphics and training video for CTRLbot IoT, the native Android app in
[`../CTRLbot-IoT`](../CTRLbot-IoT).

The app's design tokens, fonts and iconography are pulled straight out of its Android
resources, and its key screens are rebuilt as live React — so the camera can push into a
single control, change UI state mid-shot, and hold on the result.

## Start here

Requires Node.js 20 LTS or newer.

```bash
npm install
npm run sync:tokens
npm run dev
```

`sync:tokens` reads `../CTRLbot-IoT/app/src/main/res`. Point at a different checkout with
`npm run sync:tokens -- ../path/to/CTRLbot-IoT`.

## Compositions

| Composition | Format | Status |
|---|---:|---|
| `First-Run-Phone` | 1080×1920, 120s | Complete; Review 13 is the current cut |
| `First-Run-Tablet` | 1920×1200, 120s | Complete; Review 08 is the current cut |

Both form factors have one `Scene-*` composition per scene for retiming and keyframing
in isolation, plus `Proof-*` stills for checking live surfaces against the app.

The first run is seven scenes: open, CTRLbot AI, Device, Connect and test, Build the
room, EUI handoff, close. It is silent and caption-led — understandable with the sound
off, because that is how it plays embedded in docs and on social.

## Render

```bash
npm run render -- First-Run-Phone out/ctrlbot-first-run-phone.mp4 --codec=h264 --crf=20 --muted
```

```bash
npm run still -- Scene-Device out/frame.png --frame=520
```

Outputs go to `out/`, which is not tracked.

## How it fits together

```text
src/
  design/
    tokens.generated.ts   colors, color state lists, dimens, type scale, shapes — from the app
    theme.ts              curated, video-facing decisions built on those tokens
  app-ui/
    viewports.ts          the one definition of how big a surface is
    PhoneEui / TabletEui  the End User Interface, portrait and landscape
    DriverCatalog         Device Drivers, both form factors
    ConnectionPanel       Configure Connection, both form factors
    CtrlbotAi             the in-app FAQ and troubleshooter
    PhoneNavMenu          the setup nav sheet, expanded and collapsed
    TabletNavRail         the shared XML-derived landscape setup rail
    CapturedScreen        a screenshot cropped to its screen and scaled to viewport size
    AppIcon               the app's own icons, tintable
  camera/
    Camera.tsx            a camera over a fixed-size content plane
    Annotations.tsx       Spotlight, FocusRing, TapIndicator, Callout
  scenes/                 one file per scene, plus shared.ts for lengths
  compositions/
    FirstRun.tsx          the cut
```

The important split is between `app-ui/` and `camera/`. An app surface renders at its
natural dp size and knows nothing about video; the camera decides what the frame is
looking at. That separation is what makes a push-in onto one control possible, and it is
why every region is expressed in the same units as the Android layout.

## Design rules

**Three faces, following [ctrlbot.io](../../2%20-%20CTRLbot.io/ctrlbot-io-site/index.html).**
Audiowide for headlines and the `CTRLbot` wordmark only; Montserrat (the app's own face)
for all readable copy; Space Mono for small uppercase eyebrows. Audiowide is a texture —
in motion graphics the text carries the message, not the font.

**Colors come from the app.** `res/values/colors.xml` and `res/color/*.xml` are the
palette. `src/design/theme.ts` maps them to semantic names and adds only the display type
ramp that video needs and a phone UI does not.

**Framing on portrait is width-bound.** In a 1080×1920 frame you cannot zoom far on a
full-width portrait UI without cropping it. Emphasis comes from `<Spotlight>` and
`<FocusRing>`; the camera makes modest, composed moves.

## Agent skills

The official Remotion skills are installed in `.agents/skills` and symlinked into
`.claude/skills`. `remotion-markup` and `remotion-interactivity` shape how code here is
written. Reinstall with `npx skills add remotion-dev/skills` (pinned by `skills-lock.json`).

## Where to pick up

[docs/ROADMAP.md](docs/ROADMAP.md) tracks project state. The tablet implementation notes
and full-cut frame map are in [docs/TABLET-HANDOFF.md](docs/TABLET-HANDOFF.md).

## Product accuracy

Check copy against [`../CTRLbot-IoT/AGENTS.md`](../CTRLbot-IoT/AGENTS.md), the Android
resources, and a current build before publishing. EndPoint switching is deferred and
hidden; power presets use discrete Power On and Power Off commands; the EUI exits through
a two-second press-and-hold in the top-left; no credentials or customer identifiers may
appear.

`docs/About_CTRLbot_IoT.md` is synced from the app repo. The July 29 Markdown user manual
is a useful supporting snapshot, but the Android resources and a current build remain the
source of truth.

## Licensing

Remotion is source-available, free for individuals and for-profit organizations up to
three people, plus non-profits and evaluation. Larger for-profit organizations need a
company license. Confirm before commercial production:
[Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
