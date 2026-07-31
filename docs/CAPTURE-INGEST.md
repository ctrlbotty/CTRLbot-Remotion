# Capture ingest review

## Source package

The reviewed source is the sibling `../CTRLbot Mirror` folder captured on July 29, 2026:

- 16 phone screenshots from an SM-A102U1 in portrait;
- 22 tablet screenshots from an SM-X210 in landscape;
- a 12:14 phone walkthrough at 856×1696;
- a 12:57 tablet walkthrough at 1816×1216.

The repository keeps a curated subset rather than the two complete recordings. `scripts/ingest-captures.mjs` copies the useful native screenshots and creates short, muted H.264 excerpts for each core workflow. This keeps render inputs reviewable and avoids adding roughly 370 MB of long-form source video to the repository.

## Product behavior observed

- Primary setup navigation is **Device**, **Connect**, **Activities**, and **Set**.
- Device Drivers supports category and manufacturer filters, model selection, driver details, and an external product page.
- Configure Connection shows the device name, protocol, private address, port, connection state, commands, and received/sent data.
- Activities is divided into **Presets**, **Switching**, and **Audio**.
- Presets use ordered events, device commands, and delays. The capture shows the system Power On and Power Off presets.
- Switching shows both many-to-one and many-to-many configuration/test surfaces. EndPoint is not presented as a selectable workflow.
- The EUI adapts to phone and tablet. It exposes system power, source/output routing, and room volume while hiding setup complexity.
- Power On and Power Off use explicit waiting states; the idle state says “Welcome — press power to begin.”

## Selection and safety decisions

- The Epson external website screenshots were reviewed but not ingested because they are third-party web content rather than CTRLbot UI.
- The visible addresses are RFC 1918 private examples. No passwords, SSH keys, customer names, notifications, or production credentials were found in the selected media.
- Walkthrough audio is removed from the ingested clips. Narration can be added later from an approved transcript and recording.
- Phone and tablet device frames are already present in the source media, so Remotion adds only a presentation card and capture label.
- The full walkthroughs remain in the sibling source folder and can be re-trimmed without degrading the originals.

## Release status

The product owner confirmed that these captures are the correct v1.0 release reference. Treat them as the current visual source of truth and repeat a product review whenever the release UI changes.

## Remotion usage

Use `CapturedScreen` when a scene needs a still capture cropped into the shared app
viewport:

```tsx
<CapturedScreen device="tablet" src="captures/tablet/connection-test.png" />
```

Use Remotion's media components for the curated MP4 excerpts if motion in the capture is
itself the subject. `public/captures/manifest.json` is the inventory of normalized files
and their source ranges. The tablet CTRLbot AI captures are included because that content
is rendered by a WebView and cannot be reconstructed from Android layout XML alone.
