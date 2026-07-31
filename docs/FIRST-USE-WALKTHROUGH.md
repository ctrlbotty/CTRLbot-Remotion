# CTRLbot IoT v1.0 first-use walkthrough

## Approved sources

This edit is based on the following v1.0 sources, first reviewed July 29 and updated
against Android resources on July 30, 2026:

- `docs/About_CTRLbot_IoT.md` for product positioning, release boundaries, terminology, and approved claims;
- `docs/CTRLbot-IoT-User-Manual.md` as a supporting July 29 setup/reference snapshot;
- the sanitized phone and tablet screenshots and muted walkthrough excerpts listed in `public/captures/manifest.json`.

The Android app remains authoritative. The source walkthroughs show the same workflow in
phone portrait and tablet landscape layouts, with form-factor-specific navigation.

## Editorial goal

- Audience: AV installer or integrator opening CTRLbot IoT for the first time.
- Outcome: understand the shortest safe path from first launch to a usable End User Interface.
- Runtime: 125.33 seconds for the current phone cut; the tablet cut starts from the same scene lengths.
- Delivery: silent, caption-led MP4 that remains understandable without narration.
- Variants: 1080×1920 phone portrait and 1920×1080 tablet landscape.

## Storyboard

| Step | On-screen action | Approved guidance |
|---|---|---|
| Open | Establish the quick start and device-only programming | No software or laptop is required for the room setup shown here. |
| CTRLbot | Show the core menus, then the built-in AI help | CTRLbot AI provides the manual, FAQ, and troubleshooting help; setup begins under Device. |
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

## Status

The editorial content above — approved sources, storyboard, and guardrails — is
current and still governs this material.

The v1.0 compositions that implemented it are **not**, and neither is the six-step
storyboard above. Both were replaced when the project was rebuilt around the camera
architecture.

## What shipped instead

The cut is now seven scenes, in `src/compositions/FirstRun.tsx`:

| # | Scene | Source |
|---|---|---|
| 1 | Open — quick start framing | Brand |
| 2 | CTRLbot — the nav and the in-app FAQ | Live |
| 3 | Device — catalog, scroll, add | Live |
| 4 | Connect and test | Live |
| 5 | Build the room — presets, switching, audio | Captures |
| 6 | EUI handoff — route, volume, press-and-hold exit | Live |
| 7 | Close | Brand |

Two deliberate departures from the storyboard:

**The privacy step is gone.** The privacy notice is shown before this video plays, so
repeating it would spend six seconds telling the viewer something they had just read.
The guardrails above still apply to any copy that touches the subject.

**CTRLbot AI replaces it.** What an integrator needs first is where things live and
where to get help, not a second look at a notice they have already dismissed.

The editorial guardrails, approved sources and product claims in the sections above
remain in force. See [ROADMAP.md](ROADMAP.md) for outstanding work.
