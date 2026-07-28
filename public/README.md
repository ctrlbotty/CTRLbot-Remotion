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
