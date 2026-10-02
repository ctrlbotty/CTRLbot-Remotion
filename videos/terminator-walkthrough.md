---
id: terminator-walkthrough
destination: social-walkthrough-vertical
---

# CTRLbot Terminator — narrated walkthrough (Roadmap W02)

## Watching

An AV integrator or CTRLbot IoT installer who commissions devices from a laptop and still
juggles PuTTY, a serial tool and a network scanner. They have never heard of CTRLbot
Terminator and the name makes them expect something unrelated. They want to know whether
one app replaces the three they already have.

## Promise

Scan the network, run a test server, and talk to devices over TCP, serial and SSH from one PC app.

## Narration

- Mode: `source-edit`. Narrated only: there is no silent cut.
- Source recording: `video input/CTRLbot Terminatior Tutorial.mp4` (8:39; the file name's
  spelling is the file's, not the product's)
- Ingest: `ingest/terminator-walkthrough/` — `transcript.md` is `Status: DRAFT` until T1
- Prepared audio: `public/narration/terminator-walkthrough/source-normalized.m4a`
- Edit list: `src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts`
- Landscape: `terminator-walkthrough`, 1920x1080 → `out/terminator-walkthrough.mp4`, captions
  as `out/terminator-walkthrough.srt` — YouTube
- Portrait: `terminator-walkthrough-portrait`, 1080x1920, captions burned in →
  `out/terminator-walkthrough-portrait.mp4` — TikTok, YouTube Shorts, LinkedIn, X
- Planned edit (revision 2): `public/narration/terminator-walkthrough/edit.m4a` and
  `src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.generated.ts`, from
  `npm run narration:edit` (never hand-edited)

## Beats

Revision 2 (2026-10-01): the hybrid format, as W01's revision 2
(`videos/archive/2026-10-02-mirror-walkthrough-r2.md`). Layout: `card`, `stage` or `chapter`.

| id | Layout | Claim | Surface | Evidence | Sec |
|----|--------|-------|---------|----------|-----|
| open | card | CTRLbot Terminator: the tools you test devices with, in one PC app | `MasterControlCard` | The tricon and the CTRLbot Terminator lockup are on screen at frame 0; the promise line streams in beneath them | 6.5 |
| proof | stage | Every tool in one window | `TermApp` | The nav steps through Scan, TCP Server, Raw TCP, Serial and SSH, each tool's pane appearing in turn | 10 |
| scan | chapter | A scan names every device, its maker and its MAC | `TermScan` | Scan is pressed and rows fill at a readable size; the MAC column is ringed on "MAC" and a web link on "links" | 17.5 |
| server | chapter | Run a server on your PC and test CTRLbot IoT against it | `ServerDiagram` + `TermTcpServer` | A diagram shows the PC as the server and CTRLbot IoT as the client, a command going over and a reply coming back; then the real server: a client connects from `192.168.0.24`, `hello world` arrives and a reply is sent | 23 |
| pin | chapter | Pin a connection and it is there next time | `TermTcpServer` | The tab strip is close: the pin is ringed, the pointer clicks it, and it turns pinned while the session stays live | 16 |
| raw-tcp | chapter | Send commands straight to a device's control port | `TermTcpClient` | Raw TCP connects to `192.168.0.135:1515`, `power on` is typed and sent, and the reply lands, command and reply readable in one crop | 17.5 |
| serial | chapter | Open a COM port and talk over serial | `TermSerial` | COM9 opens at 38400 8-N-1 with the parameters ringed, `hello world` is sent and a reply arrives | 16.5 |
| ssh | chapter | Log in to a device's command line over SSH | `TermSsh` | SSH connects to `admin@192.168.0.3:22`, `help` is typed and the switch's command list scrolls in | 14.5 |
| recap | stage | Scan, serve and connect | `TermApp` | The nav lights each tool as the voice names it | 13 |
| close | card | The name, once, at the end | `MasterControlCard` | The CTRLbot Terminator lockup and its line; no URL and no download | 3.5 |

## Anything unusual

- **Revision 2 is built on W01's revision 2** (`videos/archive/2026-10-02-mirror-walkthrough-r2.md`):
  `WalkthroughShell`, `narration:edit`, `PointerClick` and `MasterControlCard`'s `lockup`.
  Use them as they are; do not import from another video's folder. The revision 1 notes
  below still hold where they do not mention the camera or `NarrationTrack`.
- **138 seconds, under 2:20.** X refuses anything over 2:20 without Premium.
- **Every surface is the live Terminator rebuild in `src/app-ui/term/`**, a class-by-class
  copy of `C:\0-Repo\Utilities\CTRLbot Term\src` at `TERM_VIEWPORT` (1280x800). Five beats
  play the existing `TermScenes.tsx` scenes unchanged, each inside a `<Sequence>` so the
  scene counts its own frames; S02 is cut from the same scenes.
- **Terminator's download is not verified.** Nothing in copy or the close says it can be
  downloaded, installed or bought. No URL.
- **Cut from the narration, never written as copy:** "right now" and "later feature sets"
  (future claims); "50 devices" (the rebuilt scan shows ten); "my not released yet server
  device lab" (an unreleased product — `raw-tcp` still shows the reply the recording shows,
  with no copy about where it came from); the Windows Device Manager passage; the SSH
  credentials and password reveal; "It's not as scary as it sounds."
- **The captions need three spellings fixed**, because Whisper's words are what they burn
  in and the ingest's JSON is never edited: `Luxall` → `Luxul` (488.4s), `Mac` → `MAC`
  (92.3s), `com` → `COM` (510.1s). CTRLbot is already right in `captions.json` (T3).
- **Network data is the recording's own private range** (`192.168.0.x`), shipped in S02.
  No password, no public address.
- **Camera (revision 2): chapters are full frame on `termRegions`, with actions on the
  spoken cue**, as W01's Shot list. `beatShots()` and its push-and-return cycle are retired.
  Command and reply always share one readable crop.
- **No `<PromoPreload />`.** Terminator draws no CSS images; its one image is an `<Img>`.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Scope lock

- **User outcome:** two narrated renders of one walkthrough — landscape
  `terminator-walkthrough` for YouTube and portrait `terminator-walkthrough-portrait` for
  the feeds — showing what CTRLbot Terminator does: scan, test server, raw TCP, serial and
  SSH, from one PC app, with step text that reads on a phone.
- **In scope:** the transcript correction, a pinned state on the rebuild's tab, caption
  spelling corrections, the eight beats in both shapes, the narration edit, the .srt, both
  renders through every gate.
- **Out of scope:** S02 (done), any change to `TermScenes.tsx` or `termData.ts`, the IoT or
  Mirror side of the server demonstration, Device Manager, any download claim, publishing,
  the rest of a publishing kit, archiving the recording.
- **Must preserve:** S02 and the five `Proof-Term-*` stills render unchanged; every
  `terminator/*` entry in `src/shorts/surfaces.tsx`; W01's files and its .srt output
  (byte-identical after T3); `video input/` and the ingest's JSON never modified; no gate
  threshold changed.

## Copy

Executors place these verbatim, as `WalkthroughCopy` props. Eyebrows render uppercase.
Audiowide only where marked.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open | — | **CTRLbot Terminator** (Audiowide) | Scan the network, run a test server, and talk to devices over TCP, serial and SSH, from one PC app. |
| scan | Scan | Find what's on the network | Pick a network adapter and scan its subnet. Every device shows its host name, device name, manufacturer, IP and MAC, with links to any web page it serves. |
| server | TCP server | Test against a server on your PC | Start a TCP server on any port. Point CTRLbot IoT at it, and every command it sends shows up here. You can answer back. |
| pin | Saved | Pin a connection | Pinned tabs come back the next time you open Terminator. |
| raw-tcp | Raw TCP (Telnet) | Talk to a device directly | Connect to a device's control port and send commands as text or hex. Verbose CRLF shows every line ending it sends back. |
| serial | Serial (COM) | Open a COM port | Any COM port on the PC, USB adapters included. Baud from 9600 to 115200, 7 or 8 data bits, parity and flow control. |
| ssh | SSH | Log in over SSH | Open a device's command line from the same app. Here, a Luxul switch. |
| close | — | **CTRLbot Terminator** (Audiowide) | Scan, serve and connect from one PC app. |

Every claim is in Terminator's README (`C:\0-Repo\Utilities\CTRLbot Term\README.md`) or its
source: scan links for ports 80, 443, 8080 and 8443; TCP server on any port; HEX and Verbose
CRLF on raw TCP; baud 9600–115200, 7/8 data bits, None/Even/Odd parity, OFF/RTS-CTS/Xon-Xoff;
pinned tabs saved by `savePinnedTabs` in `src/storage.tsx`.

## Narration clips

Seconds on the prepared track, cut on the word times in `words.json`: ~0.1s before the first
word, ~0.25s after the last, never past the next word's start. `at` is where the clip plays
in the 127.5-second cut; every clip ends inside its beat.

| beat (start–end) | id | at | source | what is said |
|------------------|----|----|--------|--------------|
| open (0–16.5) | welcome | 0.35 | 0.2–9.4 | Welcome to CTRLbot. This will be a short walkthrough of our latest utility called CTRLbot Terminator. |
| | terminal-app | 9.8 | 12.9–18.95 | It's basically a terminal app for PC |
| scan (16.5–34) | scan-info | 16.8 | 85.96–93.45 | You can get the host name, device name, manufacturer, as well as MAC address. |
| | scan-links | 24.5 | 93.9–102.9 | And if you scroll over, you can see that there's even links that you can go to directly to the website |
| server (34–53) | server-intro | 34.25 | 128.55–131.95 | Now let's take a look at our TCP server, |
| | server-test | 37.9 | 143.2–149.3 | so that you can test, say, our CTRLbot IoT app from it. |
| | server-connected | 44.3 | 196.75–204.95 | And now you can see that I'm actually connected to it … they show up over here, |
| pin (53–63.5) | pin | 53.25 | 223.9–233.26 | Up here, you'll notice there's a little pin … available for the next time |
| raw-tcp (63.5–81) | other-direction | 63.75 | 244.75–251.2 | Now we're going to go the other direction … devices that are on the network. |
| | raw-tcp | 70.5 | 320.5–330.45 | And this is a raw TCP connection. So it's good for Telnet or any real port, TCP port. |
| serial (81–97.5) | com-ports | 81.25 | 335.0–337.95 | Next, I'd like to show our COM ports, |
| | usb-bluetooth | 84.45 | 338.8–346.15 | And so this is a PC and you can connect a serial via USB or Bluetooth. |
| | parameters | 92.1 | 398.65–403.55 | And we fully support all the parameters for most serial communication. |
| ssh (97.5–112) | ssh-intro | 97.75 | 443.0–449.05 | Finally, I'd like to show that we have an SSH client as well. |
| | ssh-help | 104.1 | 483.7–491.1 | Let's just see, I'll type in help. Oh yes, we are connected to Luxul … just great. |
| close (112–127.5) | recap | 112.25 | 498.58–511.0 | we went over how to scan, how to create a TCP server … the serial COM ports. |
| | thank-you | 124.9 | 511.75–512.35 | Thank you. |

## Executor instructions

**Executor: Gemini 3.8 Flash, High reasoning.** Codex coordinates the approved W02–W05 run and takes over a worker only when Gemini is unavailable. Run one assigned pending task per fresh context in this checkout. Pending revision: T9, T10–T16; never redo checked tasks.

1. Read `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`, this brief, and the relevant installed Remotion skill before composition code. W01's current source in `src/marketing/mirror-walkthrough/` and `src/marketing/WalkthroughShell.tsx` are the worked example.
2. **Dependencies:** T17 runs first to unlock narration in every lane; T7–T9 are independent. T10 needs T17; T11 needs T7, T9 and T10; T12 follows T11; T13 needs T12 and T8; T14–T16 run in order.
3. **Ownership:** obtain the coordinator's assignment before editing. Own only the task's named files. Preserve unrelated changes, including other briefs, `Roadmap.md` and `.claude/settings.local.json`. `src/Root.tsx`, shared surfaces, audio helpers and `package.json` have one writer at a time. Wait for ownership rather than waiting for another whole video. Do not branch, stash, reset or stage unrelated files.
4. Implement the brief's exact copy, clips and cues. Run the named per-task checks. The coordinator assigns an independent `.claude/agents/beat-verifier.md` to run gates and look at the still. Workers do not commit or mark `[x]`; the coordinator does so only after independent PASS, staging exactly the task paths and brief.
5. Two repair rounds, then report evidence and stop the affected task. No nested subagents. Return compact results, never full logs or diffs. Bound retries to two and stop repeated near-verbatim attempts. A still taking over two minutes is blocked. Acquire the coordinator's render slot before a render, contact sheet, GPU transcription or frame check.
6. Final acceptance is this revision's final task: both shapes, destination lint, contact sheets, renders, frame and narration checks, landscape SRT, and the task's regressions. No approval pauses before those deliverables; do not publish or close out until Nathan reviews. Report paths, results and remaining notes, then stop testing.

## Concurrency

The authoritative task dependencies above replace Roadmap-order waits. Codex holds assignments and integration state in `docs/WALKTHROUGH-QUEUE.md`. There may be two implementation workers plus one independent verifier. Different files can overlap; a file and the render/GPU slot each have one owner. The coordinator freezes source during whole-project checks and integrations. Stop and checkpoint on quota exhaustion; resumption starts at the first unverified task.

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked
>
> **Execution limits.** One task per fresh context. Two repair rounds, then `[!]` with the
> evidence and stop. No nested subagents: the implementer and the `beat-verifier` are the
> only agents. Never paste a full build log or full diff into the coordinator — the failing
> lines only. Every retry or poll has a fixed maximum of two. Stop if a worker repeats a
> prior turn nearly verbatim.
>
> **Resume, do not redo.** Before implementing a task, check `git status` for its files. If
> they already carry uncommitted changes, verify those first: on PASS, commit and move on.
>
> **Commit as soon as a task passes**, before reading or planning the next one.
>
> **Per-task check:** `npm run check`, `npm run video:lint`, and
> `npm run video:frames -- terminator-walkthrough contact --beat=<beat>` (portrait: prefix
> `VIDEO_COMPOSITION=terminator-walkthrough-portrait`), then the still held against that
> beat's evidence line. A still renders in about six seconds; one that takes over two
> minutes is stopped and reported blocked.

- [x] T1: Correct `ingest/terminator-walkthrough/transcript.md` against `ingest/terminator-walkthrough/contact.html` and mark it `Status: corrected 2026-09-30` — files: ingest/terminator-walkthrough/transcript.md
  - Product names and terms only: "ControlBot IoT" → CTRLbot IoT, "ControlBot mirror" → CTRLbot Mirror, "Luxel"/"Luxall" → Luxul, "Mac address" → MAC address, "USB.com" → USB COM, "open up to 12" → COM12, and anything else the stills contradict. Keep filler and false starts; change no timestamp; never edit the JSON files.
- [x] T2: Add an optional `pinned` state to the instance tab's pin in `Terminator.tsx`, styled from `PinIcon` and the tab markup in Terminator's `src/storage.tsx` and `src/TcpServer.tsx`, and thread it through `TermTcpServer` — files: src/app-ui/term/Terminator.tsx
  - Absent means today's outline, so S02 and `Proof-Term-Server` are unchanged. Verify: `npm run check`; `npm run still -- Proof-Term-Server out/_t2-server.png` looks as before.
- [x] T3: Add optional caption spelling corrections to `captionsFromClips`, and a `--corrections=<export>` flag to `narration:srt` — files: src/audio/narrationCaptions.ts, scripts/narration-srt.mjs
  - `corrections?: Record<string, string>` replaces whole words, keeping the word's leading space and trailing punctuation ("Luxall," → "Luxul,"). Keep the file import-free.
  - Must preserve W01: with no corrections the output is identical. Verify: `npm run narration:srt -- src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts MIRROR_WALKTHROUGH_NARRATION_CLIPS mirror-walkthrough out/_w01-check.srt`, then `git diff --no-index out/mirror-walkthrough.srt out/_w01-check.srt` shows nothing.
- [x] T4: Create the beat table, copy, camera and narration for W02 — files: src/marketing/terminator-walkthrough/terminatorWalkthroughData.ts, src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts
  - `terminatorWalkthroughData.ts` on the pattern of W01's `walkthroughData.ts`: `BEATS` in frames (open 0/495, scan 495/525, server 1020/570, pin 1590/315, raw-tcp 1905/525, serial 2430/495, ssh 2925/435, close 3360/465; total 3825), `COPY` from the Copy table, `SUBJECT` per beat (`nav` for open and close, `tabs` for pin, `session` for the rest) and `beatShots()` pushing to 0.88 on those regions — `session` anchored right, `nav` left, `tabs` top-right.
  - `terminatorWalkthroughNarration.ts` on the pattern of W01's: `TERMINATOR_WALKTHROUGH_NARRATION_SOURCE`, `TERMINATOR_WALKTHROUGH_NARRATION_CLIPS` exactly as the Narration clips table, and `TERMINATOR_CAPTION_CORRECTIONS` = `{Luxall: 'Luxul', Mac: 'MAC', com: 'COM'}`. Only `import type` in this file.
  - Verify: `npm run check` (nothing renders it yet).
- [x] T5: Build the eight beats and both compositions, and register them — files: src/marketing/terminator-walkthrough/TerminatorWalkthrough.tsx, src/Root.tsx
  - On the pattern of W01's `MirrorWalkthrough.tsx`: one `Walkthrough({format})`, landscape in `<Stage>` (`panelAspect` 1280/800) and portrait in `<PortraitStage>` with `<NarrationCaptions>` (captions from `captionsFromClips(clips, words, TERMINATOR_CAPTION_CORRECTIONS)`), `<NarrationTrack>` in both, copy through `<WalkthroughCopy>` with `at={-40}` on open. Export `TerminatorWalkthrough` and `TerminatorWalkthroughPortrait`.
  - Each beat renders inside `<Sequence from={beat.from} durationInFrames={beat.duration} layout="none">` in the camera: scan, server, raw-tcp, serial and ssh play `TermScanScene`, `TermServerScene`, `TermRawTcpScene`, `TermSerialScene`, `TermSshScene` with `frames` = the beat's length. `open` and `close` render `TermApp` with `highlight` stepping through the five tabs across the beat. `pin` renders `TermTcpServer` live (listening, one client, the server's received and sent lines) with T2's `pinned` turning on at 40% of the beat.
  - Register `terminator-walkthrough` (1920x1080) and `terminator-walkthrough-portrait` (1080x1920) in a `<Folder name="CTRLbot-Terminator">` after `CTRLbot-Mirror`, metadata inline.
  - Verify: `npm run video:frames -- terminator-walkthrough validate`; contact sheets for both shapes, every still held against its evidence line with the window's four edges in shot at the start and end of each beat; then a half-scale inert check: `npx remotion render src/index.ts terminator-walkthrough-portrait out/_proto.mp4 --scale=0.5 --crf=28` and `VIDEO_COMPOSITION=terminator-walkthrough-portrait npm run video:frames -- terminator-walkthrough check out/_proto.mp4` must be under 60%.
- [x] T6: Run the feature gates on both shapes, render both, write the .srt, and record the results here — files: videos/terminator-walkthrough.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough` and `--destination=social-walkthrough-vertical`; render `terminator-walkthrough` → `out/terminator-walkthrough.mp4` and `terminator-walkthrough-portrait` → `out/terminator-walkthrough-portrait.mp4` (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both (portrait with `VIDEO_COMPOSITION`); `npm run narration:check` on both; `npm run narration:srt -- src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts TERMINATOR_WALKTHROUGH_NARRATION_CLIPS terminator-walkthrough out/terminator-walkthrough.srt --corrections=TERMINATOR_CAPTION_CORRECTIONS`, then confirm the .srt has no `Luxall`, no lowercase `com ports` and no one-word captions. Confirm every file exists.
  - Regression: the five `Proof-Term-*` stills look as before T2.
  - Runs straight after T5 with no approval stop. Does not mark the video done: Nathan reviews both renders, and his notes come back as new tasks.

### Revision 2 · 2026-10-01 — the hybrid format

From the 2026-10-01 review (`out/REVIEW-2026-10-01.md`).

What the review found in revision 1:
- Seven of 17 clip edges stop while the voice is still sounding.
- The server lesson shows no client.
- Network rows and terminal text are too small to read.
- No spotlight, ring or pointer anywhere.

**Needs:** `videos/archive/2026-10-02-mirror-walkthrough-r2.md` T1–T7 `[x]` (the shared pieces), and Nathan's
review of W01's T15 renders. Both met 2026-10-01: W01 is done and approved.

**Read before any revision 2 task:** "What W01's revision 2 taught" in
`docs/NARRATED-WALKTHROUGH.md`. It covers clip hard edges, the voice check's false alarms,
the shell's drift, and cue-timed `shots` rather than `regions`.

**Scope.**
- **Outcome:** both W02 renders rebuilt on the shared pieces. The server chapter shows both
  sides, and every command and reply is readable.
- **In scope:** Terminator's region map, cue props on `TermScenes`, the server diagram, the
  re-planned edit, beat data, both compositions, the beats, the renders.
- **Out of scope:**
  - Anything S02 would notice: `TermScenes` defaults must keep it identical.
  - A download claim or URL.
  - Footage of the IoT side.
- **Must preserve:**
  - S02 and the five `Proof-Term-*` stills.
  - W01.
  - `video input/` and the ingest's JSON.
  - Gate thresholds.

**Copy (revision 2).** These replace the Copy table above. In chapters the copy is a step
label.

| beat | eyebrow | title | body |
|------|---------|-------|------|
| open (card) | For Windows | lockup **CTRLbot Terminator** | line: Scan the network, run a test server, and talk to devices from one PC app. |
| proof (stage) | One app | Every tool in one window | Scan, TCP server, raw TCP, serial and SSH. |
| scan | Scan | Find what's on the network | — |
| server | TCP server | Test against a server on your PC | — |
| pin | Saved | Pin a connection | — |
| raw-tcp | Raw TCP (Telnet) | Talk to a device directly | — |
| serial | Serial (COM) | Open a COM port | Baud from 9600 to 115200, 7 or 8 data bits, parity and flow control. |
| ssh | SSH | Log in over SSH | Here, a Luxul switch. |
| recap (stage) | — | Scan, serve and connect | — |
| close (card) | — | lockup **CTRLbot Terminator** | line: Scan, serve and connect from one PC app. |

The diagram uses Space Mono labels only:
- PC side: `Your PC · CTRLbot Terminator · TCP server :23`.
- Tablet side: `CTRLbot IoT · client`.
- Arrows: `← hello world` from the client to the server, then `reply →` back to the client
  (corrected 2026-10-02, T20: the app sends the command; the server receives it).

**Narration (revision 2).** The clips in the Narration clips table, with these changes:
- `pin` becomes 223.9–239.2: "…available for the next time, so that you can have various
  ports that you might need to connect to."
- `welcome` runs from `open` into `proof`; the cut lands on "called CTRLbot Terminator".
- `recap` is its own beat.

Placement and holds follow W01's rule. Corrections stay `TERMINATOR_CAPTION_CORRECTIONS`.

**Shot list (revision 2).** The regions come from `termRegions` (T7), and the cues are
`cueFrame` words.

| beat | region(s) | cue → action → result |
|------|-----------|-----------------------|
| proof | `nav`, then `session` | terminal-app "terminal" → the nav steps through the five tools |
| scan | `results` (host, device, manufacturer, IP, MAC columns) | scan-info "host" → rows fill · scan-info "MAC" → ring the MAC column · scan-links "links" → ring a web link |
| server | diagram, then `serverClients` and `serverLog` | server-test "CTRLbot" → the diagram's arrows run · server-connected "connected" → ring the client row · server-connected "commands" → ring the arriving line |
| pin | `tabs` | pin "pin" (first) → ring the pin · pin "pin" (second) → PointerClick → it turns pinned |
| raw-tcp | `connectFields`, then `exchange` | raw-tcp "raw" → ring host and port · the command and its reply land inside one crop |
| serial | `serialParams`, then `exchange` | parameters "parameters" → ring baud, bits, parity and flow |
| ssh | `exchange` | ssh-help "help" → the command and its output |
| recap | `nav` | recap "scan", "server", "Telnet", "SSH", "serial" → Scan, TCP Server, Raw TCP, SSH and Serial each light on their word |

- [x] T7: Export Terminator's window geometry and derive `termRegions` from it, with `Terminator.tsx` laying out from the same constants — files: src/app-ui/term/termData.ts, src/app-ui/term/Terminator.tsx
  - Regions in window pixels: `nav`, `navItem(tool)`, `tabs`, `session`, `results`, `serverClients`, `serverLog`, `connectFields`, `serialParams` and `exchange`. Rows laid out by flow get fixed heights from named constants.
  - Verify: `npm run check`; the five `Proof-Term-*` stills look exactly as before.
- [x] T8: Give the five `TermScenes` optional event frames, defaulting to today's timing — files: src/app-ui/term/TermScenes.tsx
  - Events per scene:
    - Scan: start.
    - Server: client connect, message arrive, reply.
    - Raw TCP: connect, send, reply.
    - Serial: open, send, reply.
    - SSH: connect, type, output.
  - Unset props reproduce today's frames exactly.
  - Verify: stills of S02 at three frames and the `Proof-Term-*` stills look as before.
- [x] T9: Add the server/client `ServerDiagram` for the server chapter, and a `Proof-Term-ServerDiagram` still — files: src/marketing/terminator-walkthrough/ServerDiagram.tsx, src/Root.tsx
  - Draw it on a 1280x800 plane so the shell's camera can frame it like a surface: the PC on the left, the tablet on the right, the labels from the copy above.
  - The arrows animate on a `progress` prop; colours only from `theme.ts`. No drawn window chrome: it is a diagram, not product UI.
  - Verify: the proof still at progress 0.5 and 1.
- [x] T17: Add `npm run narration:verify`, which transcribes a narration edit's track or a render and lists, clip by clip, where the heard words differ from the planned edit's, with the audio level at each difference — files: scripts/narration-verify.mjs, package.json
  - Runs before T10 (out of numeric order: it was added after W01's T15).
  - Usage: `npm run narration:verify -- <generated.ts> <edit.m4a | render.mp4>`. Transcribe with `scripts/lib/transcribe.py`. Compare each clip's edit words (`startMs` inside the clip's `at` to `at + seconds`) with the heard words in the same window ±0.3s, normalized to lowercase letters and digits.
  - For each differing clip, print both word lists. For a missing or extra word at the first or last position, also print the RMS level in dB over that word's span (`ffmpeg -af astats`).
  - Exit 1 only when an extra edge word measures above -50 dB, or a missing edge word's span measures below -50 dB. All else exits 0.
  - Boundary ambiguity (measured during implementation): a reported extra word can straddle a silent clip gap and the expected speech onset. Keep the full-word RMS report and threshold. Before blocking that case only, measure its outside-clip portion and transcribe the isolated clip once: classify it as an ASR timing note only when the outside portion is at or below -50 dB and the isolated transcript starts/ends with the planned edge words without the alleged extra. Audible outside speech, an unconfirmed edge, or an entirely inside/outside extra retains the defect. No word-specific exceptions; no recursive retries. W01's isolated shell clip in `out/coordinator/w01-shell-isolated.json` supplies the measured regression; include an audible-gap counterexample so a real leak still fails.
  - Verify: run it on `public/narration/mirror-walkthrough/edit.m4a` and on `out/mirror-walkthrough.mp4`. Both exit 0, and the output names the differences recorded in W01's T15 Review note.
- [x] T18: Repair narration verification for exact PCM RMS in short windows and adjudicate outside speech only within the actual adjacent-clip gap — files: scripts/narration-verify.mjs
  - Preserve full-word RMS, -50dB threshold and isolated planned-edge confirmation. Short silent/speech spans must not widen; missing/undecodable media and incomplete spans fail. Real audible-gap counterexamples still fail. Independent cached W03 edge review and existing selftests required before release.
- [x] T19: Handle zero-duration ASR timestamps without invalid RMS calls, using bounded edge confirmation and measured audio evidence — files: scripts/narration-verify.mjs
  - Reuse unchanged cached W02 T10 transcript; preserve positive-span RMS errors and nonzero audible-leak negatives. No broad retranscription or unrelated regressions.
- [x] T10: Re-plan W02's edit with `narration:edit`, `pin` extended — files: src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts, src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.generated.ts, public/narration/terminator-walkthrough/edit.m4a
  - Two builds at most to set the `at`s. A beat that cannot keep its 1.0s hold inside its Sec is `[!]` with the measured lengths.
  - Then `npm run narration:verify` on `edit.m4a`. Fix each real edge leak with `notBefore` / `notAfter` or a tighter `sourceEnd` (the contract's "Clip edges leak"), at most two more builds. A leak that remains goes in the Review notes with its clip and level.
- [x] T11: Migrate W02's coupled beat data and both shell compositions at 4140 frames, with revision 2 copy, regions and cue frames — files: src/marketing/terminator-walkthrough/terminatorWalkthroughData.ts, src/marketing/terminator-walkthrough/TerminatorWalkthrough.tsx, src/Root.tsx
  - 4140 frames in total. `beatShots()` and `SUBJECT` are removed. Verify: `npm run check`; `validate`.
  - Every region change the Shot list ties to a word is a `shots` entry with `at` from `cueFrame`, relative to the beat. Use `regions` arrays only for untimed changes, because they split the beat evenly. Add no hold keyframes: the shell drifts.
- [x] T12: Verify T11's coupled shell migration in both shapes, chapters showing today's scenes until T13–T15 — files: videos/terminator-walkthrough.md
  - Verify: the per-task check on `poster`, `open`, `scan` and `close`, in both shapes.
- [x] T13: Build the proof, scan and server beats to the Shot list with readable stage framing — files: src/marketing/terminator-walkthrough/TerminatorBeats.tsx, src/marketing/terminator-walkthrough/TerminatorWalkthrough.tsx, src/marketing/terminator-walkthrough/terminatorWalkthroughData.ts
- [x] T14: Build the pin, raw-tcp and serial beats to the Shot list — files: src/marketing/terminator-walkthrough/TerminatorBeats.tsx, src/marketing/terminator-walkthrough/TerminatorWalkthrough.tsx
  - Also from T13's review: pad the server's arriving-line `FocusRing` so it no longer sits on the first glyph of `hello world<CR>`.
  - The composition file only wires the beats into its render switch, as T13 did.
- [x] T15: Build the ssh and recap beats to the Shot list — files: src/marketing/terminator-walkthrough/TerminatorBeats.tsx, src/marketing/terminator-walkthrough/TerminatorWalkthrough.tsx
- [x] T20: Reverse `ServerDiagram`'s arrows so `hello world` travels from the CTRLbot IoT client to the PC's server and `reply` returns to the client, and break the PC label after `CTRLbot Terminator` — files: src/marketing/terminator-walkthrough/ServerDiagram.tsx
  - Found in T13's review. The narration says "I can send commands over to it, and they show up over here", and the server's Received Data shows `hello world`; the diagram drew the command from the PC to the tablet. Labels unchanged otherwise.
  - Verify: `Proof-Term-ServerDiagram` at progress 0.5 and 1, and the server beat at frame 1280 in both shapes.
- [x] T21: Give the proof and recap stage beats a push to 0.94 and back, anchored top-left so the navigation stays whole — files: src/marketing/terminator-walkthrough/terminatorWalkthroughData.ts
  - Found by T16: portrait measured 61% inert (ceiling 60%). Per beat, proof was 83% and recap 87%, because only the nav highlight changed. Measured on sampled frames: proof 59%, recap 75%.
- [x] T16: Run the feature gates on both shapes, render both, write the .srt from the edit, check the voice, and record the results here — files: videos/terminator-walkthrough.md
  - As W01's T15, with `--corrections=TERMINATOR_CAPTION_CORRECTIONS`. The .srt has no `Luxall` and no lowercase `com ports`.
  - The voice check is `npm run narration:verify` on the landscape render. It is `[!]` only when it exits 1; every other difference is a Review note (the contract's "Whisper's voice check over-reports").
  - Portrait `content-area` warns for Terminator's window. That is expected, not a defect. If `inert-fraction` fails, measure it per beat before changing anything.
  - Regression: S02 and the `Proof-Term-*` stills look as before.

## Deferred

- The IoT-side split of the server demonstration, if a later cut wants the round trip.
- A download line, once Terminator's public release is verified.

- Close-out (archive the brief, `RELEASE-NOTES.md`, `Roadmap.md`) after Nathan's review. The
  recording moves to `video input/archive/` then: S02 and W02 are its only cuts.

## Handoff

- **Pending revision:** T10–T16.
- **Dependencies:** T17 runs first to unlock narration in every lane; T7–T9 are independent. T10 needs T17; T11 needs T7, T9 and T10; T12 follows T11; T13 needs T12 and T8; T14–T16 run in order.
- **Dispatch:** one task at a time through Codex; independent verification and scoped commit release its owned files. Final rendering waits for the shared render slot.
- **Blocked:** no known implementation blocker; task dependencies still apply.

## Review notes

- T8, 2026-10-02: Independent Claude PASS WITH NOTES. Default scene comparisons at two lengths across sampled frames match original; five proofs SHA256-identical. Supplied transition frames and typing offsets visually checked. Note for T13: press onset remains 0.08 of scene except Scan, so late connect/open can hold press and very early events omit it; avoid unsuitable cue ordering. Evidence: out/coordinator/t8-review.txt.

- T7, 2026-10-02: Independent coordinator takeover PASS after two repairs and Gemini verifier quota failure. Frozen check/lint pass; all five final PNGs SHA256-identical to original baselines and visually inspected. Nav region now y141–176; shared tabs38.75/control70.5 preserve natural flow. Broad exchange/log regions are a note. Evidence: out/coordinator/t7-final/ and takeover-check/lint.log.

- T17, 2026-10-02: Independent final PASS WITH NOTES after two repairs. Frozen check/lint, selftest and real PCM fixtures pass. W01 edit/render exit 0 with seven ASR notes; isolated transcription confirms the silent boundary overlap without changing full-span RMS or thresholds. Leak, missing-edge and missing-media fixtures still fail. Evidence: out/coordinator/t17-final-*.log.

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

- T6, 2026-09-30: `npm run check` passed (code 0).
- T6, 2026-09-30: `video:lint` passed with 0 errors, 0 warnings against both `social-walkthrough` and `social-walkthrough-vertical`.
- T6, 2026-09-30: `video:frames -- terminator-walkthrough validate` passed (8 beats, 127.5s, no problems).
- T6, 2026-09-30: Landscape render `out/terminator-walkthrough.mp4` (23.2 MB) completed with `--codec=h264 --crf=20`. `video:frames check` measured 43% inert (threshold < 60%), median content area 100%, no problems. `narration:check` passed (duration 127.50s, integrated loudness -13.51 LUFS, true peak -1.38 dBTP).
- T6, 2026-09-30: Portrait render `out/terminator-walkthrough-portrait.mp4` (26.2 MB) completed with `--codec=h264 --crf=20`. `video:frames check` measured 43% inert (threshold < 60%), median content area 100%, no problems. `narration:check` passed (duration 127.50s, integrated loudness -13.51 LUFS, true peak -1.38 dBTP).
- T6, 2026-09-30: `out/terminator-walkthrough.srt` generated (49 captions, 273 words from 17 clips). Verified: no `Luxall` (corrected to `Luxul`), no lowercase `com ports` (corrected to `COM ports`), no one-word captions (minimum caption length 2 words).
- T6, 2026-09-30: W01 baseline regression verified: `out/mirror-walkthrough.srt` produced identical byte output when checked after T3 changes.
- T6, 2026-09-30: Regression verified on all five proof stills (`Proof-Term-Scan`, `Proof-Term-Server`, `Proof-Term-RawTcp`, `Proof-Term-Serial`, `Proof-Term-Ssh`): each still renders identically to pre-T2 defaults.
- T6, 2026-09-30: Contact sheets verified at `out/terminator-walkthrough/contact.html` and `out/terminator-walkthrough-portrait/contact.html`.

## Contact sheet

> `npm run video:frames -- terminator-walkthrough contact` renders one still per beat, and
> with `VIDEO_COMPOSITION=terminator-walkthrough-portrait` the portrait sheet. Mark each
> ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
| open | ✅ | Title bar, icon sidebar, tabs, 5-tab cycling highlight |
| scan | ✅ | Hostnames, IP addresses, MAC addresses, web links |
| server | ✅ | Port 23 listening, 1 client, received/sent command logs |
| pin | ✅ | Active tab pin toggling at 40% of beat |
| raw-tcp | ✅ | Connected to 192.168.0.135:1515, command log |
| serial | ✅ | Connected to COM9 (38400 baud), command log |
| ssh | ✅ | Connected to admin@192.168.0.3:22 (Luxul router), command log |
| close | ✅ | CTRLbot Terminator wordmark and feature sign-off |

- T9, 2026-10-02: Independent Claude verifier PASS WITH NOTES; frozen check/lint pass, progress0.5 and1 stills opened and inspected. Correct PC/server and tablet/client labels and arrow directions; existing registrations preserved. Small label size remains a note for later shell framing. Evidence: out/coordinator/t9-review.txt and t9-review/.

- T18, 2026-10-02: Independent round1 PASS WITH NOTES. Exact short AAC windows match full decoded PCM; incomplete EOF spans throw; replacement invalidates bounded cache. Selftest/check/lint pass, audible-gap and unconfirmed-edge negatives still fail. Affected cached W01 shell boundary remains ASR timing NOTE; stale full transcript was not reused for acceptance. Evidence: out/coordinator/t18-round1-review.txt.

- T19/T10, 2026-10-02: Independent T19 PASS and T10 PASS WITH NOTES. Original cached edit transcription and saved isolated evidence:0edge defects/7ASRnotes. Independent actual138s duration, all holds>=1.064s and required complete tails confirmed; no audio edge rebuild needed. Zero timestamp only noted with measured silentgap/expectededge speech/isolated confirmation; audible/unconfirmed negatives fail. Evidence: out/coordinator/t19-review.txt and t10-review.txt.

- T11/T12, 2026-10-02: Independent coordinator non-author PASS WITH NOTES. Check/lint/validate pass; ten stills at0/90/350/900/4080 across bothshapes inspected, cards/copy/captions/chapter frame visible,138s sharededit. One Root encoding preservation repair completed; baseline differs only in W02import/durations. Proofnav is cropped by current stage shot and remains a concrete T13 framing correction; cue actions still intentionally pendingT13–15. Evidence out/coordinator/w02-shell-*.png. Partial W05Root hunks excluded from staging.

- T16, 2026-10-02: Coordinator run at `af4ec9e` in a clean worktree. Results:
  - `check`, both destination lints (0/0) and `validate` (10 beats, 138s) pass. Contact sheets for both shapes are in `out/terminator-walkthrough{,-portrait}/contact.html`.
  - Renders: `out/terminator-walkthrough.mp4` (29.9 MB) and `out/terminator-walkthrough-portrait.mp4` (24.7 MB), h264 crf 20, with narration.
  - Frames: landscape 40% inert, content 98%. Portrait 56% inert, content 68% (`content-area` warning, expected for a desktop window).
  - The first run measured portrait at 61%. Per beat, proof was 83% and recap 87%, which led to T21.
  - `narration:check` passes on both: 138.05s, -16.18 LUFS, -4.43 dBTP. `narration:verify` on the landscape render passes with 0 edge defects and 6 notes: ASR spellings such as Luxel, ControlBot and CCP, plus one confirmed timing artifact.
  - `out/terminator-walkthrough.srt`: 58 captions and 287 words, with no `Luxall` and no lowercase `com ports`. Two one-word captions remain (`Next,`, `Finally,`), which is a note.
  - All five `Proof-Term-*` stills are byte-identical to their baselines. `TermScenes` is unchanged since T8, so S02 is unaffected.
  - The revision 1 renders are kept as `out/terminator-walkthrough{,-portrait}-r1.mp4`. Logs are in `out/coordinator/t16/`.

- T15, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES. Gemini via agy, 258s. Check and lint pass in a clean worktree. Stills at 3470/3520/3700/3775/3890/3955, both shapes: `help` is typed on its cue and its output follows inside the exchange crop, and the recap lights Scan, TCP Server, SSH and Serial with their pane in step with the captions. Notes: the recap stage panel is small in landscape; the Telnet and SSH cues are about a second apart.

- T20, 2026-10-02: Claude coordinator (non-author) PASS. Gemini via agy, 94s. Check and lint pass in a clean worktree. `Proof-Term-ServerDiagram` and the server beat at 1150 and 1280 show `← hello world` drawn from the client to the PC, then `reply →` back, with the PC label on two lines.

- T14, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES after one repair. Gemini via agy. Check and lint pass in a clean worktree at HEAD plus the two task files. Stills at 1775/1905/2440/2655/3035/3112, both shapes: raw-tcp rings host and port on "raw", and its command and reply land in the exchange crop; serial opens and exchanges, then rings baud, bits, parity and flow on "parameters"; the arriving-line ring is padded. Repair 1: the pin ring sat on the close ✕ because the label width was over-estimated; it now lands on the pin, which turns yellow on the click. Notes: the pin is small in the tabs shot, especially in portrait, where the whole window is letterboxed. Gemini's first run made no edits (25 minutes measuring pixels).

- T13, 2026-10-02: Claude coordinator (non-author) PASS WITH NOTES. `npm run check` and `video:lint` pass (0 errors, 0 warnings) on the unchanged worker source. The eight cue stills at 394/692/1280/1462 in both shapes (`out/coordinator/t13-*.png`) were inspected in place of default contact frames: the proof nav steps with the whole window in shot; scan rows fill with the MAC column ringed; the diagram runs; the client row, then the arriving line, are ringed. Notes: the arriving-line ring covers the first glyph (carried into T14); the diagram's arrows run the wrong way (new T20).

- Wrap-up at Nathan's request, 2026-10-02: T13 worker STOP READY; check/lint passed and eight cue stills rendered at394/692/1280/1462 in both shapes. Independent visual acceptance remains unfinished; T13 stays unchecked/uncommitted. All workers stopped and heartbeat paused. Preview predates T13. Resume from these stills, not from a new build or transcription. See docs/COORDINATOR-RETROSPECTIVE-2026-10-02.md.
