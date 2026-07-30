# Media assets

Place render-time media here. Remotion serves this directory at the bundle root.

Suggested structure:

```text
public/
  audio/       narration, music, and sound effects
  captures/    Android screen recordings
  images/      screenshots and approved product artwork
  fonts/       licensed local fonts
```

Use `staticFile('captures/example.mp4')` from a composition. Do not commit private customer names, IP addresses, passwords, SSH keys, or production device credentials in captures.

`captures/manifest.json` records the normalized asset path, source filename, device class, clip source range, and whether audio was retained. Rebuild the curated capture set with `npm run ingest:captures -- "../CTRLbot Mirror"`.

Canonical brand assets live in `brand/` and `fonts/`. The current source-of-truth inputs are `Content/CTRLbot Icon/ic_ctrlbot_whte_trans.png` and `Content/Fonts/Audiowide-Regular.ttf` in the enclosing CTRLbot workspace.
