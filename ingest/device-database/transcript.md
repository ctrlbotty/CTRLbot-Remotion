# CTRLbot device database — transcript

Source: `Device Database Walkthrough.mp4` (6:08, 2040x1440, 60fps, mono AAC).
Transcribed 2026-08-14 with `faster-whisper` `medium.en`, VAD-filtered, then corrected by
hand against the frames.

**Corrections applied.** The speaker says "control bot" throughout; per `AGENTS.md` that is
written **CTRLbot**. The recogniser also heard "endpoint" as one word — the app's own label
is two, **End Point**, and it is written that way here and in the cut. Filler and false
starts are kept: this is the script of record, not a polished read.

**One thing in the recording is not in the cut.** At 5:22 the RS-232 connect fails against
hardware that is not there — the speaker says "that needs a little bit of work" — and at
5:34 he moves on. The failure is honest but it is a demonstration artefact, not a product
behaviour, so the cut ends the RS-232 beat on the populated End Point row instead.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
| 0:01 | Welcome to CTRLbot. |
| 0:03 | This video will go over the CTRLbot device database. |
| 0:10 | And, all right, so let's begin. |
| 0:14 | So, to begin any system for control, you need to add devices. |
| 0:20 | And CTRLbot has an extensive library of devices that's divided up by, initially by manufacturer, but we have a lot of projectors, displays, switchers, and End Points. |
| 0:33 | And you're able to control things by IP or RS — IP, RS-232, or IR, right? |
| 0:42 | In order to control stuff by RS-232 or IR, you'll need to have an End Point. |
| 0:50 | First, let's just look at a standard projector. |
| 0:53 | We have — we'll just take a look at this device driver for Epson. |
| 1:01 | And you can see here, Epson, when you select it, it shows you all this device information, right? |
| 1:07 | And if you want, you can click on the manufacturer website by clicking on this link up here, and the same for the product page. |
| 1:18 | You have a nice little device description underneath this. |
| 1:21 | You can also change the model. |
| 1:24 | Every single driver — not all of them, but a lot of them — will have multiple models, and multiple code sets along with those models, right? |
| 1:34 | Then you have like good information: setup, specifications, and then support. |
| 1:41 | How do you support this device? |
| 1:44 | Underneath that, you'll see we have all the control information, right? |
| 1:48 | And this is what's key for that device connection, so that the system can control the device. |
| 1:54 | You can see here that it's set up for IP, right? |
| 1:58 | And it also has an RS-232 port. And we'll get to that in a second. |
| 2:03 | And go further down, I'll show you the port numbers. |
| 2:06 | I'll show you if there's a volume set, and then it'll give you all the different API commands so you can control. |
| 2:14 | And this is in ASCII. It could be in hex. Some devices want hex. |
| 2:20 | And it'll have this set by default, and you can change the line ending if you want it at any point. |
| 2:31 | So in order to — at this point, we can go in, and we can just add this device. |
| 2:47 | And my pretend projector is at this IP address. We're gonna connect. |
| 2:56 | And you can see when we connect, we'll have a nice little log underneath here. It shows that it's connected. |
| 3:03 | And you can see I'm sending commands to that projector right now, by just testing it right here. You can see us. |
| 3:12 | And if this was a real projector, you would see some feedback coming back, right? |
| 3:17 | So now I can close this, and we have a saved connection. |
| 3:21 | And anytime I can come in and look at that connection and test it out, or we could add it to the activities. |
| 3:29 | But what I wanna show next is what it looks like when you add a device that's controlled by RS-232, right? |
| 3:39 | Well, what you need to do for that is we need to add an End Point. |
| 3:45 | And right now we have the Global Cache End Points, right? |
| 3:49 | And come in here, and I can add this End Point here… |
| 4:14 | …and I'll make my fake connection. |
| 4:20 | And you can see here that by default it's set to serial. |
| 4:24 | So I make this connection, it's adding this End Point to the system as an RS-232 End Point. |
| 4:35 | Now this can be used by other devices. So I could add a different device. |
| 4:41 | Let's just say, you know, a switcher, right? |
| 4:47 | And instead of controlling it with RS-232 — oops, nope. |
| 4:55 | Let's just say a display, all right? |
| 5:01 | And you can see this has control as is the default. |
| 5:06 | And when I hit add, it's gonna populate that End Point that we already added. |
| 5:14 | And you can see it's right here, and I can just hit connect. |
| 5:17 | And now we made that connection to that End Point right there. |
| 5:22 | And now we can control the device through RS-232. |
| 5:34 | *[the connect fails against absent hardware]* That needs a little bit of work. |
| 5:42 | Now we could do the same thing with any of the IR — we would just simply have to add that End Point for IR, and then we'd be able to connect in and use that. |
| 5:57 | Anyway, this was a good — just wanted to go over the library. |
| 6:02 | I think we have gone over enough. Thank you. |

---

## What is on screen, beat by beat

Verified against extracted frames at native resolution, not inferred from the audio. The
whole recording is the **tablet** build; every screen below is `Device` in the setup rail.

| Time | Screen |
| --- | --- |
| 0:00–0:10 | The first-run dialog — *Welcome to CTRLbot IoT*, "Control your IoT devices securely", three assurance lines, `LEARN MORE` / `GET STARTED`. |
| 0:10–0:30 | Device Drivers. Rail (Device / Connect / Set), `Search drivers…`, an `IP_RS232` category split-button and a `Manufacturer` sort split-button, then the list — one card per driver, colour-coded by device type, each with a circular `+`. ACER Projectors XL2320P · AVPRO EDGE Switchers AC-MX-44 · BARCO Projectors F80-4K12 · BENQ Projectors LU895UST · BLUSTREAM Switchers CMX44CS · CANON Projectors WUX7000Z · CASIO Projectors XJ-F210WN · CHRISTIE Displays FHD551. |
| 0:30–0:38 | Sort dropdown open: **Manufacturer / Projector / Display / Switchers / End Points**. |
| 0:38–0:48 | Category dropdown open: **IP_RS232 / IR**. |
| 0:50–1:05 | List scrolls to EPSON Projectors / PowerLite; the card takes the selected blue and the detail pane fills. |
| 1:05–1:33 | Detail pane: title `EPSON Projectors` with a `Manufacturer ↗` link and a `+`; `Model` = PowerLite in a dropdown beside `Product Page ↗`; Device Info → Description (the PowerLite Presenter HD / Pro Cinema 800 paragraph). |
| 1:33–1:44 | `Specs`, `Setup`, `Support` accordions. Setup expands: First Use, Video Optimization, Control (Bloqueo parental / Contraseña protegida), PJLink Port 4352 (UDP), IPv6 supported. |
| 1:44–2:03 | Control Info — Control Type `IP`, IP Type `TCP`, Port `3629`; Keep Alive `Disabled`, On Connection `Disabled`, Authentication Required `No`. |
| 2:03–2:14 | Volume Set — Variable `%v`, Start `0`, End `100`. Switcher Config — Inputs `2`, Outputs `1`, Input Variable `%n`, Output Variable `%o`. Input Values, Output Values. |
| 2:14–2:30 | Commands, with an `ASCII` encoding selector and a `CR (\r)` line-ending selector. POWER ON `PWR ON\r` · POWER OFF `PWR OFF\r` · POWER TOGGLE `KEY 01\r` · VOLUME UP `KEY 56\r` · VOLUME DOWN `KEY 57\r` · MUTE TOGGLE `KEY 15\r` · INPUT 1 `SOURCE 10\r`. Each row carries its key name (`POWER_ON`) and a category tag (POWER / VOLUME / MUTE / INPUT). The line-ending dropdown opens: **CR (\r) / LF (\n) / CRLF (\r\n) / None**. |
| 2:31–2:47 | `+` on the card → **Configure Connection**. Name row `EPSON PowerLite - New`; transport row `TCP` / `Host IP Address` / `3629` / `CONNECT IP`. Driver Details (EPSON · EPSON Projectors · Projectors, plus Volume Set and Switcher Config) beside Transport Controls (Authentication `No`, Encoding `ASCII`, Line Ending `CR`). Commands below. |
| 2:47–2:56 | `192.168.0.95` typed on the tablet's numeric keypad; the red ✕ becomes a green `Save`. |
| 2:56–3:03 | `CONNECT IP` → `DISCONNECT`. Received/Sent Data shows `Connected to 192.168.0.95:3629` in green. |
| 3:03–3:17 | `SEND` pressed on command rows; the log gains `Sent: PWR ON\r` and `Sent: KEY 57\r`. |
| 3:17–3:29 | `Test Device Drivers` tab — TOGGLE / ON / OFF power keys, a D-pad with OK, MENU and EXIT, then INPUT 1 · INPUT 2 · HDMI 1 · HDMI 2 · HDBASET · VIDEO MUTE ON · VIDEO MUTE OFF, `Show Switcher`, and a volume bar. Right rail: `Remote: EPSON PowerLite - New`. |
| 3:29–3:50 | Back to Device Drivers — and the rail now carries **Activities**, which appeared once a connected device existed. List scrolls to GLOBAL CACHE End Points / Most Models. |
| 3:50–4:20 | Configure Connection for `GLOBAL CACHE Most Models - New`, port `4998`. Transport Controls read Control Mode **`Serial`**, IP Type `TCP`, Port `4998`. IP typed. (The recording never opens that control; its list is `gc_control_mode_array` — **Infrared / Serial / Relay / Sensor** — and the cut opens it, because those four modes are what this class of End Point is.) |
| 4:20–4:35 | `Connected to 192.168.0.95:4998`. Commands: GET DEVICE MODE `getdevices\r` · SET MODE SERIAL `set_IR,1:1,SERIAL\r` · SET MODE IR SINGLE `set_IR,1:1,IR\r` · SET MODE IR TRIPORT `set_IR,1:1,IRTRIPORT\r`. |
| 4:35–5:05 | Back to the list; CHRISTIE Displays FHD551 selected. Its Control Info reads Control Type **`RS232`** rather than IP. |
| 5:05–5:22 | Configure Connection for `CHRISTIE FHD551 - New`. Where the IP row was there is now a `+ RS232 End Point` button and the saved End Point already filled in: `GLOBAL CACHE Most Models - New - 192.168.0.95:4999`, with `CONNECT RS-232`. RS-232 Configuration: Baud Rate `115200`, Stop Bits `1`, Parity `None`, Flow Control `None`. |
| 5:22–5:35 | The connect fails — there is no Global Cache on the bench. Error toast. Not in the cut. |
| 5:42–5:57 | Category switched to `IR`; the list becomes the IR library — 3D OPTICS Projectors · 3M Projectors · ACER Displays · ACER Projectors · AOC Displays · APEX DIGITAL Displays · ASUS Displays · AUDIOVOX Displays. |

## Notes for scripting

- **The spine is the transport story**, and the speaker states it twice: IP, RS-232 or IR;
  and RS-232 or IR need an End Point. Everything between the two statements is what a
  driver contains, and everything after is that claim being demonstrated.
- **A driver here is a manual *and* a code set — not one instead of the other.**
  Description, specs, setup, support, multiple models each with their own code set, and
  the control block. That is the thing worth showing: a list of manufacturers is not a
  differentiator, but documentation shipped alongside an editable API with the port and
  the line ending already right is.
- **Nothing in this product detects, identifies or discovers anything**, and no copy may
  imply that it does. The driver states its category, `DriverListAdapter` colours the
  card from it, and the sort control orders on it. "It knows what each one is" was cut
  for exactly this reason — it describes a different product.
- **Two different things are called End Points; this recording is about the first.**
  A Global Cache End Point is a **converter** — IP in, and infrared, serial, a relay
  closure or a sensor out. Its modes are the app's own `gc_control_mode_array`
  (`res/values/arrays.xml`): *Infrared / Serial / Relay / Sensor*. It routes nothing and
  switches nothing. The **other** End Points are **AVoIP** encoder/decoder pairs carrying
  video and control, and that is the deferred, hidden *EndPoint switching* mode. Do not
  let the shared word merge them.
- The port the display connects on (`4999`) is not the port the End Point itself connects
  on (`4998`). That is real Global Cache behaviour: 4998 is the unit's command port,
  4999 is serial port 1. Do not "fix" it.
- `192.168.0.95` is a private address and stays; nothing else in the frames is an
  identifier.
