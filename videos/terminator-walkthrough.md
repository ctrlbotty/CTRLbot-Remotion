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

## Beats

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| open | One PC app for the tools you test devices with | `TermApp` | Terminator at rest on Scan; the nav highlight walks down Scan, TCP Server, Raw TCP (Telnet), Serial (COM) and SSH Client one at a time; the copy shows the CTRLbot Terminator headline and what it does | 16.5 |
| scan | A scan names every device, its maker and its MAC | `TermScan` | Scan is pressed, the host counter climbs, and rows fill top to bottom with host name, device, manufacturer, IP, MAC and web-page links | 17.5 |
| server | Run a server on your PC and test CTRLbot IoT against it | `TermTcpServer` | Server starts listening on port 23, a client connects from `192.168.0.24`, `hello world` arrives and a reply is sent | 19 |
| pin | Pin a connection and it is there next time | `TermTcpServer` | The server tab's pin goes from outline to pinned while the session stays live | 10.5 |
| raw-tcp | Send commands straight to a device's control port | `TermTcpClient` | Raw TCP connects to `192.168.0.135:1515`, `power on` is typed and sent, and a reply lands in the received column | 17.5 |
| serial | Open a COM port and talk over serial | `TermSerial` | COM9 opens at 38400 8-N-1, `hello world` is sent and a reply arrives from the port wired to it | 16.5 |
| ssh | Log in to a device's command line over SSH | `TermSsh` | SSH connects to `admin@192.168.0.3:22`, `help` is typed and the switch's command list scrolls in | 14.5 |
| close | The name, once, at the end | `TermApp` | The nav highlight walks the five tools once more; the copy shows the CTRLbot Terminator headline | 15.5 |

## Anything unusual

- **Built exactly like W01.** `videos/archive/2026-09-30-mirror-walkthrough.md` and
  `src/marketing/mirror-walkthrough/` are the worked example: two shapes from one set of
  beats, `WalkthroughCopy`, `PortraitStage`, `NarrationCaptions`, `captionsFromClips`,
  `beatShots`, `narration:srt`. Copy their structure; do not import from another video's
  folder, and do not change the shared pieces beyond T3.
- **127.5 seconds, under 2:20.** The recording's phrases total 138s; the clips below keep
  115s of them. X refuses anything over 2:20 without Premium.
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
- **Camera: `beatShots()`, a push on every beat, wide at every cut.** Measured on W01: one
  slow drift across the cut was 89% inert; a per-beat push to 0.88 was 25–28%. Here `open`
  and `close` push toward the nav column, `pin` toward the tab strip, the rest toward the
  session. The portrait panel is 1008x630, the same shape, so both formats share the shots.
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

**Paste this to the executor:** *Run `videos/terminator-walkthrough.md` in this checkout,
following its "Executor instructions" section.*

**Executor: Gemini 3.8 Flash, High reasoning.** Work in the current checkout on `main`; no
branch, no worktree.

1. **Read first:** `AGENTS.md`, `docs/VIDEO_WORKFLOW.md`, `docs/NARRATED-WALKTHROUGH.md`,
   `.claude/commands/video-run.md`, and this whole brief. Then the worked example, W01:
   `videos/archive/2026-09-30-mirror-walkthrough.md` and
   `src/marketing/mirror-walkthrough/` (`walkthroughData.ts`,
   `mirrorWalkthroughNarration.ts`, `MirrorWalkthrough.tsx`). Copy its structure; never
   import from its folder.
2. **Run T1 to T6 in order.** For each: resume any uncommitted work first; implement exactly
   the task in its named files, with this brief's copy, clips and corrections verbatim;
   run the per-task check and look at every still; on PASS mark `[x]`, stage only the
   task's files plus this brief, and commit `Tn: <summary>` with the repository's
   Co-Authored-By line before reading the next task. FAIL only for a lint error, a broken
   check, or a still that plainly is not its evidence line; anything else is a Review note.
3. **No approval stops** between tasks or before the renders.
4. **Acceptance:** T1–T6 `[x]`, one commit each; `out/terminator-walkthrough.mp4` and
   `out/terminator-walkthrough-portrait.mp4` pass `video:frames … check` under 60% and
   `narration:check`; `out/terminator-walkthrough.srt` has no `Luxall`, no lowercase
   `com ports` and no one-word captions; `video:lint` 0 errors for both destinations;
   W01's .srt unchanged after T3; the `Proof-Term-*` stills look as before. Then stop
   testing.
5. **Limits:** two repair rounds per task, then `[!]` with the evidence under
   `## Blocked notes` and stop. No nested subagents. Never paste a full build log or diff —
   the failing lines only. Any retry or poll at most twice. A still over two minutes is
   blocked. Renders run one at a time. Stop if you are about to repeat an earlier turn.
6. **Report:** commits, gate results, Review notes, and the paths to both renders, the
   .srt and both contact sheets. Do not mark the video done and do not publish.

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
- [ ] T6: Run the feature gates on both shapes, render both, write the .srt, and record the results here — files: videos/terminator-walkthrough.md
  - `npm run check`; `npm run video:lint -- --destination=social-walkthrough` and `--destination=social-walkthrough-vertical`; render `terminator-walkthrough` → `out/terminator-walkthrough.mp4` and `terminator-walkthrough-portrait` → `out/terminator-walkthrough-portrait.mp4` (`--codec=h264 --crf=20`, never `--muted`), one at a time; `video:frames … check` on both (portrait with `VIDEO_COMPOSITION`); `npm run narration:check` on both; `npm run narration:srt -- src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts TERMINATOR_WALKTHROUGH_NARRATION_CLIPS terminator-walkthrough out/terminator-walkthrough.srt --corrections=TERMINATOR_CAPTION_CORRECTIONS`, then confirm the .srt has no `Luxall`, no lowercase `com ports` and no one-word captions. Confirm every file exists.
  - Regression: the five `Proof-Term-*` stills look as before T2.
  - Runs straight after T5 with no approval stop. Does not mark the video done: Nathan reviews both renders, and his notes come back as new tasks.

## Deferred

- The IoT-side split of the server demonstration, if a later cut wants the round trip.
- A download line, once Terminator's public release is verified.
- A shared walkthrough shell. W01 and W02 each carry their own composition; when W03
  starts, lift the common part out of both rather than copying it a third time.
- Close-out (archive the brief, `RELEASE-NOTES.md`, `Roadmap.md`) after Nathan's review. The
  recording moves to `video input/archive/` then: S02 and W02 are its only cuts.

## Handoff

- **Ready now:** T1, T2, T3 — independent files.
- **Ready later:** T4 after T3; T5 after T2 and T4; T6 last.
- **Blocked:** nothing.

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the review.

## Contact sheet

> `npm run video:frames -- terminator-walkthrough contact` renders one still per beat, and
> with `VIDEO_COMPOSITION=terminator-walkthrough-portrait` the portrait sheet. Mark each
> ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
