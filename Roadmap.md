# CTRLbot Content Roadmap

Updated October 7, 2026. **Upcoming work only.** What is already delivered is in
[RELEASE-NOTES.md](RELEASE-NOTES.md). How a video gets made is in [README.md](README.md).

Thirty motion-graphic videos: six narrated walkthroughs and twenty-four 30-second shorts.
**Make as many as possible now, in a short production sprint, then release them on
Tuesdays and Thursdays from a fixed queue.** Every video starts from a narrated recording of
the real product, or for a short, a narrated slogan over a motion graphic or an image.

IDs are stable. The queue at the bottom sets the release order.

## Production sprint: now through October 9

Everything that can be made now gets made now. What cannot waits on one thing, named below.

| Can be made | Videos | Waiting on |
| --- | --- | --- |
| **Done** | S02 CTRLbot Terminator, S03 CTRLbot.AI | Nothing. Rendered, first in the queue |
| **In review, about 95%** | W02, W03, W04 | Nathan's notes, one cut at a time. The landscape render is fixed first, then the same fixes are carried to portrait (`docs/REVIEW-FIX-PROMPT.md`). Renders are in `out/`, captions and contact sheets in `out/<slug>/`; status in `docs/WALKTHROUGH-QUEUE.md` |
| **Now** | S01 CTRLbot Mirror | Nothing. The recording is in and ingested |
| **Now, if short slogans are recorded** | Any short made from a slogan over a motion graphic or image | One narrated slogan per short, in `video input/` |
| **This week, once recorded** | IoT shorts S05 to S24 | CTRLbot IoT recordings made through CTRLbot Mirror; W05 is already ingested |
| **Later** | W06 CTRLbot.IO tour, S04 CTRLbot.IO | ctrlbot.io R01 to R03 going live |

## Walkthroughs

Narrated only, in two shapes: 1920x1080 for YouTube (captions as an .srt) and 1080x1920 for
the feeds (captions burned in).

**The format, from the October 1 review.** Each walkthrough is a hybrid of the Play Store
promo and the in-app First-Run videos:

- **From the promo:** a promise card composed at frame 0, one benefit proved by one visible
  change, and a product sign-off with no URL.
- **From First-Run:** each step full-frame, with a spotlight, ring and tap (or pointer
  click) on the spoken cue, and a short step label instead of paragraphs.

The voice is cut in silence by the shorts' voice edit, and the captions come from that same
edit.

| ID | Video | What the viewer gets | Done when |
| --- | --- | --- | --- |
| W02 | CTRLbot Terminator | Scan the network, run a test server, and talk to devices over TCP, Telnet, serial and SSH from one PC app. | Rebuilt on W01's format. The server chapter shows both sides, the PC server and the CTRLbot IoT client. Readable command and reply. Both cuts pass every gate, and nothing says Terminator can be downloaded until its public release is verified. |
| W03 | CTRLbot IoT on the phone | Set up and run a whole room from a phone: driver, connection, test, Activities, the hand-over, Find Devices and AV-over-IP. | Rebuilt on W01's format with the phone full-frame, reusing the approved First-Run phone framing and annotations wherever the app has not changed. The clipped words and the repeated fragment fixed, the hold shown honestly, both cuts pass every gate. The portrait cut is over the Shorts and X limits and goes to TikTok and LinkedIn. |
| W04 | CTRLbot IoT on the tablet | The same room on a tablet, where sources and displays fit side by side. | Rebuilt on W01's format, reusing the approved First-Run tablet framing where the app has not changed. Every Test and power-off screen changes on its spoken cue, the clipped words fixed, portrait crops clear the feeds' button column, both cuts pass every gate. |
| W06 | CTRLbot.IO website tour | The updated ctrlbot.io: the Mirror and Terminator demonstrations, more detail behind every block, and the complete THE APP page. | Recorded against the live site after ctrlbot.io R01 to R03 ship, and every claim matches the page as published. |

The in-app First-Run videos (phone Review 13, tablet Review 08) stay as they are. Updating
them is separate from W03 and W04.

## Shorts

Thirty seconds, one idea, brief narration, captions burned in. **Vertical 1080x1920** for
anything shown on a phone or as a general graphic; **landscape 1920x1080** for tablet shorts.
A short can be footage of the product, or a narrated slogan over a motion graphic or an image.

**Done when, for every short:** it passes every gate in its format, its one idea is on
screen within three seconds, it reads with the sound off, and its narration is a complete
thought.

| ID | Product | Format | The one idea | Source |
| --- | --- | --- | --- | --- |
| S01 | CTRLbot Mirror | Vertical | Your phone's screen, on your PC, under your mouse. | W01's recording |
| S02 | CTRLbot Terminator | Vertical | A terminal for every device on your network. | **Done** |
| S03 | CTRLbot.AI | Vertical | It asks the questions a technician would, before it answers. | **Done** |
| S04 | CTRLbot.IO | Vertical | One place for the app, the AI and the device library. | W06's recording |

### CTRLbot IoT: twenty shorts, one feature each

A proposed list drawn from what the app has shipped. Swap any of them freely. Each is
recorded through CTRLbot Mirror; the format follows the device it is recorded on.

| ID | Feature | The one idea |
| --- | --- | --- |
| S05 | Switching | Tap a source and the display takes it. |
| S06 | All | One tap sends a source to every display. |
| S07 | Audio | Change the volume without touching the picture. |
| S08 | Power presets | The whole room on or off with one preset. |
| S09 | Connection test | Know it connects before it joins the room. |
| S10 | Driver catalog | Find your device and add it. |
| S11 | CTRLbot AI in the app | Help without leaving setup. |
| S12 | The handoff | The client gets a room, not a settings screen. |
| S13 | Find Devices | Scan the network and add what it finds. |
| S14 | Web page | Open a device's own configuration page inside the app. |
| S15 | Terminal | See every byte a connection sends and receives. |
| S16 | Presets and shortcuts | Save a room the way you like it and put it on the EUI. |
| S17 | Drag to route | Press and hold a source, drop it on a display. |
| S18 | Power-off countdown | Change your mind and nothing is sent. |
| S19 | AV-over-IP | Route an encoder to a decoder and the sound follows. |
| S20 | Three AV-over-IP families | Matrox, Hall Research Versa and Kramer, found and switched the same way. |
| S21 | Display power over CEC | Turn the display behind a decoder on and off, and save it in a preset. |
| S22 | Line-out level | Set a decoder's analog audio level from Audio. |
| S23 | Serial through a PUSR W630 | Control an RS-232 device over the network. |
| S24 | Global Caché by model | Pick the exact iTach, GC-100, Flex or Global Connect you have. |

## Release queue

Releases go out on Tuesdays and Thursdays, one video each, in this order. Walkthroughs are
in bold. If the next video in line is not finished by its release day, the next finished
one goes instead and the unfinished one keeps its place.

| # | Video |
| --- | --- |
| 1 | S03 CTRLbot.AI |
| 2 | S02 CTRLbot Terminator |
| 3 | **W02 CTRLbot Terminator** |
| 4 | S01 CTRLbot Mirror |
| 5 | **W01 CTRLbot Mirror** |
| 6 | S05 Switching |
| 7 | S13 Find Devices |
| 8 | S06 All |
| 9 | **W03 CTRLbot IoT on the phone** |
| 10 | S14 Web page |
| 11 | S15 Terminal |
| 12 | S07 Audio |
| 13 | **W04 CTRLbot IoT on the tablet** |
| 14 | S08 Power presets |
| 15 | S17 Drag to route |
| 16 | S09 Connection test |
| 17 | **W05 CTRLbot IoT: latest features** |
| 18 | S18 Power-off countdown |
| 19 | S19 AV-over-IP |
| 20 | S10 Driver catalog |
| 21 | S20 Three AV-over-IP families |
| 22 | S11 CTRLbot AI in the app |
| 23 | S21 Display power over CEC |
| 24 | S16 Presets and shortcuts |
| 25 | S22 Line-out level |
| 26 | S12 The handoff |
| 27 | **W06 CTRLbot.IO website tour** |
| 28 | S04 CTRLbot.IO |
| 29 | S23 Serial through a PUSR W630 |
| 30 | S24 Global Caché by model |

Each finished video has a publishing kit in `out/shorts/<id>/` or beside its render: the
poster frame, a captions file, and the title, description and tags to paste.

## Choices to make when we reach them

- **Where each video goes and who uploads it.** YouTube, Shorts, Reels, TikTok, LinkedIn,
  the Play Store listing, ctrlbot.io. This queue schedules releases, not uploads.
- **Terminator's download.** Verify its public release before any video says it can be
  downloaded.
- **A cloned voice** for short narration stays future work
  ([docs/VOICE-CLONE.md](docs/VOICE-CLONE.md)). Nothing in this queue needs it.

## Deferred

- **The Driver catalog background.** The approved First-Run cuts use grey; the app now uses a
  blue wash. W03 and W04's rebuilt catalog beats opt into the blue (`SETUP_BACKGROUND`);
  confirm it during their review. The First-Run cuts stay grey until they are updated.
- **The rejected promo render is gone.** `out/master-control-promo.mp4`, one of the three
  files the gates were calibrated against, is no longer on disk. The recorded measurements
  still stand. If a gate ever needs recalibrating, register
  `src/compositions/MasterControlPromo.tsx` temporarily and render it again, then keep a
  copy outside the repository.
