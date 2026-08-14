---
id: device-database
destination: social-walkthrough
---

# CTRLbot — the device database, in two minutes

> **Written after the fact**, on the precedent `videos/ai-walkthrough.md` set.
> `docs/VIDEO_WORKFLOW.md` is the contract for a video that starts from a prompt; this one
> started from a finished screen recording with narration (`Device Database Walkthrough.mp4`,
> 6:08), so the beats were transcribed rather than invented and the cut was built in one
> pass. `docs/DEVICE-DATABASE-TRANSCRIPT.md` is the script of record. The 30-second website
> cut is the next deliverable and is not this file.

## Watching

An AV integrator who has seen a "device library" before — usually a manufacturer list with
a code set behind each name — and wants to know what is in this one.

## Promise

Every driver carries its own documentation, its manufacturer and product links, and the
API codes used to connect to and control the device.

> **This is a walkthrough, not a positioning piece.** The whole video is what the speaker
> does in the recording: look through the library, open a driver, read what is in it, add
> the device, connect it, test it, then do the same for a serial device through an End
> Point. Every line in the copy column traces to a timestamp in
> `docs/DEVICE-DATABASE-TRANSCRIPT.md`, and `deviceDatabaseData.ts` cites the timestamp
> above each one.
>
> **Two things the app does not do, which earlier drafts claimed.** It does not open on
> the device library — it opens on the quick start, then CTRLbot.AI; the user adds devices
> to create the project. And nothing here detects, identifies or discovers a device: the
> driver states its category, `DriverListAdapter` colours the card from it, and the sort
> control orders on it.

## Beats

Cut order. Seconds sum to 120 at 30fps. The surface is the **tablet** build throughout,
in a `<Stage>` panel with the copy column on the left. One camera position per beat, held
for the whole of it — see *Anything unusual* for why this cut moves the camera where
`ai-walkthrough` does not.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| library | Any system starts by adding devices | `DriverCatalog` | Device Drivers list scrolls under a locked header; eight manufacturer cards, each colour-coded by device type, each with its own `+` | 10 |
| types | Four categories, and the list sorts by them | `DriverCatalog` | Sort dropdown opens on *Manufacturer / Projector / Display / Switchers / End Points*; the card colours widen as it lands | 9 |
| transports | You control by IP, RS-232 or IR | `DriverCatalog` | Category dropdown opens on *IP_RS232 / IR*; the list behind it stays put | 8 |
| driver | A driver is a manual and a code set | `DriverDetail` | EPSON card takes the selected blue and the detail pane fills — manufacturer link, Model *PowerLite* with its dropdown, Product Page, description | 11 |
| docs | Setup, specs and support come with the driver | `DriverDetail` | *Setup* expands under Specs and Support; four paragraphs arrive, ending on PJLink port 4352 | 9 |
| control | Control info is what the connection is made from | `DriverDetail` | Control Info fills in: Control Type IP, IP Type TCP, Port 3629, Keep Alive, On Connection, Authentication Required | 10 |
| commands | The API commands, and the line ending | `DriverDetail` | Five command rows arrive with their key names and payloads; the line-ending selector opens on *CR (\r) / LF (\n) / CRLF (\r\n) / None* | 11 |
| connect | Add the device and give it an address | `DriverConnection` | Configure Connection opens on the driver's own defaults; `192.168.0.95` types into the host field and CONNECT IP becomes DISCONNECT as the log turns green | 11 |
| test | Send commands and save the connection | `DriverConnection` | SEND is pressed on three command rows; `Sent:` lines stack under `Connected to 192.168.0.95:3629` | 11 |
| endpoint | RS-232 and IR need an End Point first | `DriverConnection` | Global Cache connection opens with Control Mode reading *Serial*, and that control drops open on *Infrared / Serial / Relay / Sensor*; it connects on 4998 and its mode commands arrive | 12 |
| rs232 | The next device gets that End Point filled in | `DriverConnection` | CHRISTIE FHD551's connection has no IP row — it has the End Point, filled in, reading `GLOBAL CACHE Most Models - New - 192.168.0.95:4999`, over an RS-232 block at 115200/1/None/None | 11 |
| close | What the library is | `DriverCatalog` | List at rest under the IR category — a second library behind the same three controls | 7 |

## Anything unusual

- **There are two different things called End Points, and this video is about the one
  that ships.**
  - A **Global Cache End Point** — what the cut shows — is a **converter**: IP goes in,
    and infrared, serial, a relay closure or a sensor reading comes out. It routes
    nothing and switches nothing. Its four modes are the app's own
    `gc_control_mode_array` in `res/values/arrays.xml`, commented "Global Cache endpoint
    control modes", and the `endpoint` beat opens that list rather than asserting it.
  - The **other** End Points are **AVoIP** — encoder/decoder pairs carrying video and
    control over the network. That is the **EndPoint switching** mode
    (`SwitchingEndPointFragment`, `switching_end_point_*` tables), which is deferred and
    hidden from the mode selector. Nothing in this cut touches it.
  `video-lint`'s `no-deferred-features` rule bans the string `endpoint` in copy and is
  right to. The copy here uses the app's own two-word label — what the sort dropdown and
  the `+ RS232 End Point` button actually say — so the rule was not touched and does not
  need to be.
- **What moves inside a beat is the interface, not the camera**: rows arriving, the list
  scrolling under them, a dropdown opening, a log filling in. `<Stage>` carries the layout,
  so the panel and copy geometry stay the house ones.
- **The background is the house promo bloom**, on the same path both EUI promos and the
  AI walkthrough use — `background.promo` with the centre easing 72%/26% → 60%/40% across
  the cut.
- **The surface is a live rebuild, not the recording.** `DriverCatalog` already existed;
  `DriverDetail` and `DriverConnection` were built for this cut from
  `res/layout/driver_detail.xml` and `driver_connection.xml`, with every colour from
  `tokens.generated.ts`. A capture cannot scroll, open a dropdown, or fill a log.
- **What is on the screen is transcribed from the recording's frames, not written.**
  Command payloads (`PWR ON\r`, `KEY 56\r`, `set_IR,1:1,SERIAL\r`), the Epson description
  and setup text, the ports, and the Global Cache End Point row are all real. Where a
  block was too long for the panel it was cut from the end, never reworded.
- **The recording's failed RS-232 connect is not in the cut.** At 5:22 the connect fails
  because there is no Global Cache on the bench. The `rs232` beat ends on the populated
  End Point row instead — the thing being claimed — rather than on a timeout against
  hardware that was never there.
- **4999 against 4998 is not a typo.** The End Point connects on the unit's command port;
  the display behind it is reached on serial port 1. Both are in the frames.
- **The camera moves in this cut**, which is the one place it departs from
  `ai-walkthrough`. That cut's locked-off camera was a request for that video; here the
  things being claimed are 13sp — a port number, a payload, a line ending — and a 1280dp
  tablet in a 1088px panel renders at 0.85x. The detail beats frame about 660dp across,
  which is ~1.65x and the same effective scale `BrowserFrame` gives ctrlbot.ai's 16px
  body copy. One shot per beat, reached 22 frames in and then held, so the camera is
  still for the whole of every beat and moves only across a boundary — inside the same
  14-frame dissolve that swaps the interface.
- **The panel is 1088x680 with square corners**, wider than the AI walkthrough's, and the
  64px comes out of the copy column. Configure Connection's transport row is genuinely
  1160dp from the protocol dropdown to the connect button, every part of it is what that
  beat is about, and it is the widest thing in the cut — so it sets the panel.
  `panelRadius={0}` was added to `<Stage>` for this: no bezel is drawn and the camera
  spends the cut inside the surface, and a rounded corner is a claim about hardware. On a
  shot that is a crop of the screen there is no hardware corner in view, so the radius
  rounds off interface instead and reads as a mask laid over the picture. The default is
  unchanged, so the promos and the AI walkthrough keep their device treatment.
- **The cut opens on the whole surface and works inward.** `library` and `close` frame
  1280x800 exactly — which is the panel — so every tighter shot between them is read as
  part of something already seen. The panel's 16:10 never changes; `frameWidth` states
  each shot as a width and the camera derives the height from the panel, so a beat can
  only ever be a 16:10 window onto the same plane.
- **The empty detail pane no longer draws a bordered black box.** It never should have:
  `driver_detail_container` in `driver_database.xml` is a bare FrameLayout with no
  background, and the recording shows the setup wash through it. At First-Run sizes the
  invented box read as a dark area; framed on the whole screen it was a void down 45% of
  the frame, in this cut's poster frame. `Proof-Tablet-Catalog` and `Scene-Tablet-Device`
  were re-rendered after the change and are unaffected — neither leans on it.
- **Five of the seven Epson commands are shown, not all seven.** Seven is 770dp of cards
  under a 64dp bar, which does not fit the pane; making it fit means scrolling the bar
  off, and the bar carries the line-ending control the beat exists for. All seven are in
  `deviceDatabaseData.ts`.
- **`DriverCatalog` still renders on `gray_10`, not the app's real setup gradient.** The
  app's setup screens use `bg_setup_gradient.xml` — black under a blue radial wash — and
  the surface has been on a flat grey since it was built. `SETUP_BACKGROUND` was added
  and this cut passes it, but the default was left alone: it is baked into the approved
  First-Run cuts, and restyling those is its own change, not a side effect of this one.
- **The list column is 430dp wide here; `driver_database.xml` splits at 45%**, which on a
  1280dp tablet is 486. Same reasoning — the existing number is in the approved cuts, so
  it was not touched for this one.

## Review notes

> Not blockers; check these during the contact-sheet review.

- **The reading gate did not measure this cut's copy, and it did not measure
  `ai-walkthrough`'s either.** `video-lint` finds a copy block's pace by walking up to the
  nearest `<Sequence>` and reading `durationInFrames` with `attrNumber`, which only reads
  a static number. Both cuts generate one Sequence per beat with
  `durationInFrames={beat.duration}`, so every block is skipped silently — `--report`
  lists none of them. Measured by hand, this cut's copy runs 3.4–5.0 words a second
  against a 9.5 w/s warn line and a 9.3 w/s house maximum, and every title is under 40
  characters. The hole in the gate is real, and it is not this video's to fix.
- **The connection beats cannot zoom past about 0.94x.** Configure Connection's transport
  row runs the full 1160dp from the protocol dropdown to the connect button, and on
  `connect` that button *is* the evidence, so a tighter shot cuts off the thing the beat
  is about. Where those beats looked thin it was composition, not magnification, and the
  fix was to fill the frame: `connect` carries three command rows and lands its
  connection by frame 148 so the payoff is up before the sample point; `endpoint`'s mode
  commands arrive from frame 100, because a row at zero opacity still takes its height
  and a late one reads as a band of empty panel; `rs232` turns Volume Set and Switcher
  Config back on, which the recording shows on that screen at 5:12 and which fills the
  bottom quarter. `ConnectionSummary`'s top margin went 20 → 32 to match the gap the
  recording has under the transport row.
- The `docs` and `control` beats still leave the bottom of the pane empty. That is the
  app's own empty space on those screens — the recording has it too — but if it reads as
  a layout fault rather than as a pane with nothing more in it, the fix is a tighter
  `FRAMING` entry, not invented content.
- **On the two full-frame beats the panel's right side is close in value to the stage
  background behind it**, because the app's setup wash and the house promo bloom are the
  same blue. The panel edge still reads — square corners and `<Stage>`'s drop shadow —
  but it is subtle. If it wants more separation the honest fix is on `<Stage>` (a
  surrounding shadow rather than a downward one), which would touch every marketing cut,
  so it is left as a call for the review rather than made quietly here.

## Contact sheet

> `npm run video:frames -- device-database contact` renders one still per beat and tiles
> them. Mark each ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
| poster | | |
| library | | |
| types | | |
| transports | | |
| driver | | |
| docs | | |
| control | | |
| commands | | |
| connect | | |
| test | | |
| endpoint | | |
| rs232 | | |
| close | | |
