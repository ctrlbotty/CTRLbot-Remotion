# Authoring a scene

The workflow is: decide what the viewer must see, write the shot list, then let the
copy follow the camera. `src/scenes/EuiHandoff.tsx` is the worked example — read it
before adding anything.

## 1. Pick the surface

If the scene explains a control the viewer will operate, use a live rebuild from
`src/app-ui/`. Live surfaces can be zoomed into, isolated, and changed mid-shot.

If the scene only needs to establish context — a screen going by, a workflow being
skimmed — a capture from `public/captures/` is cheaper and perfectly faithful. Use
`<Video>` or `<CanvasImage>`; don't build a component for it.

Building a new live surface means reading the app's layout XML, not a screenshot.
`PhoneEui.tsx` lists the exact files its geometry came from — do the same. Screenshots
lie about spacing, and a rebuild that is 6dp off reads as wrong without the viewer
knowing why.

## 2. Name the regions

A live surface exports a regions map in its own dp coordinate space:

```tsx
export const EUI_REGIONS = {
  full: {x: 0, y: 0, width: 360, height: 780},
  outputCell: (index: number) => ({ /* derived from the layout constants */ }),
};
```

Derive regions from the same constants that lay the UI out. Then a layout change moves
the camera targets with it, instead of leaving the camera pointing at where a control
used to be.

## 3. Write the shot list

```tsx
<Camera
  contentSize={PHONE_VIEWPORT}
  shots={[
    {at: 0, region: EUI_REGIONS.full},
    {at: 26, region: EUI_REGIONS.full},
    {at: 64, region: frameWidth(centerOf(TAPPED_CARD), PHONE_VIEWPORT.width * 0.78)},
  ]}
>
```

Two shots with the same region hold the camera still between them. Always hold before
and after a move, or the camera never rests and the viewer never reads anything.

`frameWidth(center, width)` states a shot as "this much of the interface across". On
portrait that is the honest control, because width decides how much is visible. `0.78`
of the content width is a gentle 1.3x; `0.5` is 2x and will crop a full-width row.

The camera clamps to the content plane, so you cannot accidentally frame past the edge
of the UI into empty background.

## 4. Carry emphasis with annotations, not zoom

In a 1080×1920 frame, a full-width portrait UI cannot be zoomed far without cropping
the interface. So:

- `<Spotlight region>` dims everything else. This is the workhorse.
- `<FocusRing region>` outlines the control.
- `<TapIndicator x y>` shows the press.

All three go *inside* `<Camera>`, in content coordinates, so they travel with the UI.

**Match the annotation's `radius` to the control.** The EUI's display panels are
square-cornered, so a rounded ring over one disagrees with the panel edge at every
corner and reads as sloppy. Default is `0`; pass `6` for the source cards, `8` for
anything on the app's 8dp shape.

**`emphasizeTypes` on `<DriverCatalog>`** widens the gaps between the device-type card
colours. The shipped greys sit within 6 points of each other (`#2D2D2D` / `#2F2F2F` /
`#333333`) — fine on a panel at arm's length, but they collapse into h264 banding at
viewing distance. Turn it on only for a scene that is specifically teaching device
types; leave it off everywhere else so the surface stays exact.

## 5. Put copy outside the camera

`<Callout>` goes outside `<Camera>` so the zoom never changes its type size. On
portrait, `side="bottom"` and `side="top"` render a gradient scrim — the interface stays
visible through it and it reads as a designed third rather than a box dropped on the
product. `side="left"` / `"right"` use a card, for landscape cuts with real space beside
the UI.

Pacing is explicit: named frame constants at the top of each scene, and the shot
list's `at` values. Scene *lengths* live in `scenes/shared.ts` and are the single
source for both the cut and the registered composition. A line on screen for less time
than it takes to read is wasted — the current cut runs about 2.6s per copy beat.

## 6. Register and check

Each scene is its own `<Composition>` in `src/Root.tsx`, metadata inline:

```tsx
<Composition
  id="Scene-EUI-Handoff"
  component={EuiHandoff}
  durationInFrames={780}
  fps={30}
  width={1080}
  height={1920}
/>
```

Then:

```bash
npm run check
npm run still -- First-Run-Phone out/frame.png --frame=1200
```

Render stills at moments where copy has finished staggering in — roughly 25 frames
after each `<Sequence from>`. Sampling mid-stagger shows missing text and reads as a
bug that isn't there.

## House motion

Copy these easing literals inline. Studio can only keyframe values it can read
statically, so do not import them from a constant.

| Purpose | Curve |
|---|---|
| Entrance, settle | `Easing.bezier(0.16, 1, 0.3, 1)` |
| Exit | `Easing.bezier(0.7, 0, 0.84, 0)` |
| Camera move | `Easing.bezier(0.65, 0, 0.35, 1)` |
| Emphasis pop | `Easing.spring({damping: 200})` |
| Cross-fade | `Easing.linear` |

Never spring a camera move. Springs overshoot, and an overshooting camera on a UI reads
as a wobble rather than a deliberate push-in.

Training content should feel confident, not bouncy.

## Type and color

Three faces, following [ctrlbot.io](../../2%20-%20CTRLbot.io/ctrlbot-io-site/index.html):

| Face | Use | Sizes |
|---|---|---|
| **Audiowide** | Scene headlines, the `CTRLbot` wordmark | `type.display` / `type.title` only |
| **Montserrat** | All readable copy — titles, body, UI text | `type.heading` and below |
| **Space Mono** | Small uppercase eyebrows, technical labels | `type.label`, `.12em`, uppercase |

The site sets its `.display` class on `h2`/`h3` and drops to Space Mono at 11px for
every nav item and eyebrow. Keep that restraint. Audiowide is a texture: past a
headline's worth of words it stops reading as language, and in motion graphics the
text is delivering the message, not the font.

Audiowide is set at weight 400, `line-height: 0.98`, `letter-spacing: 0` — its caps are
tall, and the default line-height leaves a hole under every headline. Space Mono labels
are weight 700 at `.12em`, uppercase.

Write the product name as **CTRLbot**, that exact camel case, always in Audiowide. The
lockup is `public/brand/cbot_banner_white.png` — one white wordmark, no two-tone split.
Do not redraw or recolor it. `public/app-assets/ic_ctrlbot.svg` is the mark on its own,
via `<AppIcon name="ic_ctrlbot">`.

Colors come from `src/design/theme.ts`, which is built on tokens generated from the
app's `res/values/colors.xml` and `res/color/*.xml`. CTRLbot blue is `#008FD4`; success
green is `#4EA72E`. If the app doesn't define a color, question whether it belongs on
screen.

Keep essential text at least 72px from the frame edge — that is what `<Callout>`'s edge
padding is set to.

## Copy standards

- Use the app's visible terminology: **Device**, **Connect**, **Activities**,
  **Presets**, **Switching**, **Audio**, **End User Interface**.
- Write action-led titles: "Test the connection," not "Connection testing information."
- Keep a callout title under roughly 40 characters and the body to two lines.
- Never put real credentials, customer names, public IPs, host fingerprints, or
  proprietary device details in copy or captures.

Check claims against `docs/CTRLbot-IoT-User-Manual.md` and `docs/About_CTRLbot_IoT.md`
— both synced from the app repo by `npm run sync:tokens`. Product guardrails are in
[FIRST-USE-WALKTHROUGH.md](FIRST-USE-WALKTHROUGH.md).

## Adding captures

When replacing or adding screen recordings:

- record a clean emulator or dedicated demo device;
- use only fictional room names and private-range demo IPs;
- crop system notifications and unrelated personal UI;
- preserve a device-native master;
- place the sanitized file under `public/captures/` and load it with `staticFile()`.

## Review checklist

- [ ] Task matches the current Android build.
- [ ] No deferred or hidden feature is taught as available.
- [ ] No secrets or customer-identifying data appear.
- [ ] Copy is legible for long enough to read.
- [ ] Commands and safety guidance are technically correct.
- [ ] Every scene demonstrates or explains one action.
- [ ] Audiowide appears only on headlines and the wordmark.
- [ ] Annotation corner radii match the controls they frame.
- [ ] The camera holds still before and after each move.
- [ ] `npm run check` passes.
- [ ] Full render has been watched end to end.
