# CTRLbot IoT v1.0 first-use walkthrough

## Approved sources

This edit is based on the following v1.0 sources, reviewed July 29, 2026:

- `docs/About_CTRLbot_IoT.md` for product positioning, release boundaries, terminology, and approved claims;
- `docs/CTRLbot-IoT-User-Manual.md` for the canonical setup sequence and operator guidance;
- `docs/CTRLbot-IoT-User-Manual.pdf` for the illustrated phone/tablet layouts;
- the sanitized phone and tablet screenshots and muted walkthrough excerpts listed in `public/captures/manifest.json`.

The Markdown manual and the 20-page illustrated PDF agree on the first-use path. The source walkthroughs show the same controls in phone portrait and tablet landscape layouts.

## Editorial goal

- Audience: AV installer or integrator opening CTRLbot IoT for the first time.
- Outcome: understand the shortest safe path from first launch to a usable End User Interface.
- Runtime: 36.5 seconds.
- Delivery: silent, caption-led MP4 that remains understandable without narration.
- Variants: 1080×1920 phone portrait and 1920×1080 tablet landscape.

## Storyboard

| Step | On-screen action | Approved guidance |
|---|---|---|
| First launch | Review the privacy notice and select **Get Started** | Configuration is local to the Android device; credentials are encrypted locally. |
| Device | Browse or search the bundled driver catalog and select a driver | Review the model before selecting **+** to create a connection. |
| Connect | Enter the address and port, connect, and send a safe command | Successful connection changes save automatically; verify the real equipment and terminal response. |
| Activities | Review Presets, Switching, and Audio | Test generated mappings and sequences before handoff. |
| End User Interface | Enter the simplified room-control surface | Available power, routing, and audio controls depend on configured devices and commands. |
| Installer access | Show the upper-left setup control | Press and hold for two seconds; a quick tap intentionally does nothing. |

## Guardrails applied

- The product name is always written **CTRLbot IoT**; **CTRLbot** display text uses Audiowide.
- The canonical white icon is loaded from `public/brand/ctrlbot-icon-white.png` without reconstruction or recoloring.
- Bold overlay text uses Audiowide; regular explanatory copy uses the body font stack.
- The edit does not present camera, lighting, endpoint-grid switching, or dedicated DSP drivers as v1.0 features.
- It does not claim that all traffic is local, all equipment is supported, or no external hardware is ever required.
- No passwords, customer identifiers, public IP addresses, host fingerprints, or production credentials appear.
- Captured walkthrough audio remains removed; no unapproved narration or music is introduced.

## Render inputs and outputs

Shared copy and timing live in `props/first-use.json`. Device-specific media is selected from `src/media/captures.ts` by `CTRLbot-First-Use-Phone` and `CTRLbot-First-Use-Tablet`.

```powershell
npm run render:first-use:phone
npm run render:first-use:tablet
# or both
npm run render:first-use
```

Expected files:

- `out/ctrlbot-first-use-phone-v1.0.mp4`
- `out/ctrlbot-first-use-tablet-v1.0.mp4`
