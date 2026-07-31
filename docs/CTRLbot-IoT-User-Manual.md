# CTRLbot IoT User Manual

**Standalone professional AV control for Android phones and tablets**

Version 1.0 · Last updated July 30, 2026

---

## About This Manual

This manual explains how to configure and operate a room with CTRLbot IoT. It is written for AV installers, integrators, system administrators, and anyone responsible for setting up the app. Section 13, *Use the End User Interface*, is written so it can be handed directly to the people who will operate the room.

**About the screenshots.** Every screenshot in this manual is taken on a **10-inch Android tablet in landscape**, because that is the layout most installers commission from and the layout that shows the most of the app at once. The phone build contains the same features and the same controls; only the arrangement differs. Section 5.3 shows the one screen you need to see on a phone to understand how the two layouts map onto each other.

> **Note:** IP addresses, ports, device names, and models shown in the screenshots are examples from a test bench. Use the values assigned to your own equipment.

---

## Contents

1. [What CTRLbot IoT Is](#1-what-ctrlbot-iot-is)
2. [How the Pieces Fit Together](#2-how-the-pieces-fit-together)
3. [Before You Begin](#3-before-you-begin)
4. [First Launch and the Security Model](#4-first-launch-and-the-security-model)
5. [Navigate the App](#5-navigate-the-app)
6. [Use CTRLbot AI](#6-use-ctrlbot-ai)
7. [Find a Device Driver](#7-find-a-device-driver)
8. [Create a Device Connection](#8-create-a-device-connection)
9. [RS-232 and IR Connections](#9-rs-232-and-ir-connections)
10. [Test and Manage Connections](#10-test-and-manage-connections)
11. [Activities: Presets](#11-activities-presets)
12. [Activities: Switching and Audio](#12-activities-switching-and-audio)
13. [Use the End User Interface](#13-use-the-end-user-interface)
14. [Set: Settings, Security, and Reset](#14-set-settings-security-and-reset)
15. [Troubleshooting](#15-troubleshooting)
16. [Reference Tables](#16-reference-tables)
17. [Glossary](#17-glossary)

---

## 1. What CTRLbot IoT Is

CTRLbot IoT is a native Android control system for professional audiovisual equipment. It runs directly on a phone or tablet and communicates with projectors, displays, switchers, matrix routers, and other compatible devices.

**The Android device is the control system.** A typical CTRLbot room does not need:

- A separate control processor
- A server that hosts the control interface
- Proprietary control hardware
- A laptop for routine configuration

CTRLbot builds the room interface from the equipment you add. As connections are created, the app uses the capabilities described in each driver to prepare device controls, power presets, switching, audio controls, and the client-facing End User Interface.

### 1.1 Supported control methods

| Method | Typical use | Important note |
| --- | --- | --- |
| **TCP** | Direct network control | The most common path. Uses the device's IP address and control port. |
| **Telnet** | Legacy network control | Traffic and credentials are unencrypted. CTRLbot warns you before connecting. |
| **SSH** | Secure network control | CTRLbot verifies the host key on first connection and stores it locally. |
| **RS-232** | Serial device control | Carried over the network through a compatible Global Cache endpoint. |
| **IR** | Infrared control | Sent through a compatible network-connected Global Cache IR endpoint. |

`UDP` also appears in the protocol list. It is reserved for a future release; selecting it produces the message *"UDP is not supported yet."* Use **TCP**, **Telnet**, or **SSH**.

Device traffic is sent directly from the Android device to the equipment across your network. It is not relayed through CTRLbot servers.

### 1.2 What this release does not include

So you can plan around it, the current release deliberately does **not** include:

- Camera (PTZ) control in the End User Interface
- Lighting control in the End User Interface
- AV-over-IP encoder/decoder grid switching
- A catalog of standalone DSP drivers
- Creating your own presets beyond the two system power presets (see [Section 11](#11-activities-presets))
- A drawing tool for custom interface graphics — the interface is generated from your configuration

---

## 2. How the Pieces Fit Together

Four terms carry most of the meaning in CTRLbot. Understanding them makes the rest of the app obvious.

| Term | What it is | Where it lives |
| --- | --- | --- |
| **Driver** | A read-only profile describing one family of equipment: its commands, transport defaults, volume range, and switcher layout. Shipped with the app. | **Device** |
| **Connection** | A driver pointed at one real piece of equipment, with an address, port, protocol, and optional credentials. One driver can produce many connections. | **Connect** |
| **Activity** | A room-level behavior built on top of connections: power presets, source switching, and audio mapping. | **Activities** |
| **EUI** | The End User Interface — the full-screen operating view assembled from everything above. | **EUI** button |

The normal setup path follows those four stages in order:

```
   Device  ──▶  Connect  ──▶  Activities  ──▶  EUI
 find the      point it at    review power,     hand the
 driver        the real       switching,        finished room
               equipment      and audio         to the user
```

**Activities** and **EUI** stay unavailable until at least one device connection has been saved. That is intentional — there is nothing for them to describe until a real device exists.

---

## 3. Before You Begin

### 3.1 Information to collect

For every device you intend to control:

- Manufacturer and model
- Control method: TCP, Telnet, SSH, RS-232, or IR
- IP address and control port, for network control
- Username and password, if the device requires authentication
- Command encoding (ASCII or HEX) and line ending (CR, LF, CRLF, or None)
- For RS-232: the Global Cache endpoint, its serial port, and the device's baud rate, stop bits, parity, and flow control
- For IR: the Global Cache IR endpoint and whether it is a single-port or tri-port unit

The driver usually supplies correct defaults for encoding, line ending, port, and serial parameters. Change them only when the equipment in front of you requires something different.

### 3.2 Network checklist

1. The Android phone or tablet is on the control network.
2. The target equipment is powered on and reachable from that network.
3. Network control is enabled on the equipment — many projectors and displays ship with it disabled, or disable it in standby.
4. VLAN routing and firewall rules allow the Android device to reach the equipment on its control port.
5. Any Global Cache endpoints are powered, addressed, and reachable.

> **Tip:** If a device only responds when it is already powered on, note that during commissioning. It changes how you order the steps in the Power On preset.

---

## 4. First Launch and the Security Model

On first launch, CTRLbot explains how it handles your data before you configure anything.

<p align="center">
  <img src="SM-X210_2026-07-29_11-24-24.png" alt="CTRLbot IoT first-run welcome dialog on a tablet" width="900" />
</p>

*The first-run dialog. Note the sidebar behind it: only Device, Connect, and Set are available until the first connection exists.*

Choose one of the three actions:

| Action | What it does |
| --- | --- |
| **Get Started** | Dismisses the dialog and opens the app. |
| **Learn More** | Opens a longer explanation of local control, credential handling, and the protocol warnings. |
| **Privacy & Security** | Opens the privacy and security detail you can also reach later from **Set**. |

### 4.1 How CTRLbot protects connection data

- **Credentials are encrypted at rest** using Android Keystore-backed storage (AES-256). The room database stores only a reference to the credential, never the password itself.
- **SSH host keys** are stored in a local trusted-host repository and checked on every connection.
- **Telnet produces a warning** before it connects, because Telnet carries commands and credentials in plain text. Use SSH where the device supports it.
- **Android backup is disabled** for CTRLbot configuration data, so your room configuration is not copied off the device by the platform backup service.
- **Device-control traffic goes directly** to the addresses you configure.
- The app contains **no analytics, user tracking, or advertising**.

You can review all of this again at any time from **Set** — see [Section 14](#14-set-settings-security-and-reset).

---

## 5. Navigate the App

### 5.1 The main areas

| Area | Purpose |
| --- | --- |
| **CTRLbot** | Opens CTRLbot AI — in-app help, FAQs, and troubleshooting. |
| **Device** | The bundled driver catalog. Browse, search, and add equipment from here. |
| **Connect** | Saved connections and the live device test tools. |
| **Activities** | Presets, Switching, and Audio configuration. |
| **Set** | Settings, privacy and security controls, database tools, and Factory Reset. |
| **EUI** | Enters the full-screen End User Interface. |

**Activities** and **EUI** appear only after the first device connection has been saved.

### 5.2 On a tablet

The areas run down a collapsible sidebar on the left. The chevron on the sidebar's right edge collapses it to an icon rail, giving the working area more room; selecting a menu item expands it again. The **End User Interface** button sits at the bottom of the sidebar.

<p align="center">
  <img src="SM-X210_2026-07-29_11-31-36.png" alt="Tablet layout: expanded left sidebar with Activities selected, showing the Presets tab" width="900" />
</p>

*Tablet layout. The sidebar is expanded, Activities is selected, and the Presets / Switching / Audio tabs fill the working area.*

### 5.3 On a phone

The phone build has the same six destinations and the same features. The difference is where the menu lives: instead of a permanent sidebar, the phone shows a **collapsed icon bar along the bottom of the screen**, and a chevron above it that slides up a **labeled menu panel** over the content.

<p align="center">
  <img src="SM-A102U1_2026-07-30_16-11-39.png" alt="Phone layout: the same Activities Presets screen with the slide-up labeled menu open" width="330" />
</p>

*The same screen on a phone, with the slide-up menu open. Compare it with the tablet figure above: identical destinations, identical Presets content — only the menu presentation and the column count change.*

The rest of this manual uses tablet screenshots. When you are working on a phone, translate as follows:

| On a tablet | On a phone |
| --- | --- |
| Sidebar down the left edge | Icon bar along the bottom; tap the chevron for labels |
| Two- or three-column screens | The same fields stacked vertically, scrolled |
| Driver list and driver detail side by side | Driver detail opens as its own full screen with a back arrow |
| Driver detail's **Manufacturer** link | Shortened to **Web** |
| Sections always expanded | Long sections (Commands, Received/Sent Data) collapse under a chevron |
| Version shown under **Set** | Also printed at the foot of the slide-up menu |

---

## 6. Use CTRLbot AI

Select **CTRLbot** at the top of the menu to open the built-in help system.

<p align="center">
  <img src="SM-X210_2026-07-29_09-16-55.png" alt="CTRLbot AI help screen with suggested questions" width="900" />
</p>

*CTRLbot AI. Tap a suggested question, or type your own into the field.*

Use it to:

- Learn how to add and test a connection
- Troubleshoot a device that is not responding
- Understand a feature such as the End User Interface
- Check terminology used elsewhere in the app

Tap the **✕** above the suggestion list to clear it and start with a blank question.

CTRLbot AI is a help resource and needs internet access. Room configuration begins under **Device**, and local device control never passes through it.

---

## 7. Find a Device Driver

A driver translates CTRLbot actions such as *Power On* or *Input 2* into the exact bytes a particular device expects. The catalog ships inside the app, so you can search it without a data connection.

### 7.1 What is in the catalog

The catalog snapshot generated **July 21, 2026** contains:

| Measure | Count |
| --- | ---: |
| Manufacturers | 73 |
| Driver profiles | 124 |
| Supported model entries | 378 |
| Device commands | 7,561 |

Broken down by equipment type and control library:

| Equipment type | Profiles | | Control library | Profiles |
| --- | ---: | --- | --- | ---: |
| Displays | 63 | | `IP_RS232` (network and serial) | 42 |
| Projectors | 53 | | `IR` (infrared) | 82 |
| Switchers | 7 | | | |
| End Points | 1 | | | |

Counts change as the catalog is revised. Confirm compatibility by testing the real equipment, not by the catalog listing alone.

### 7.2 Browse the catalog

<p align="center">
  <img src="SM-X210_2026-07-29_11-25-37.png" alt="Device Drivers catalog with search field, category selector, and sort selector" width="900" />
</p>

*The driver catalog. Search at the top, control library on the left, sort/filter on the right.*

1. Select **Device**.
2. Type into **Search drivers…** to search by manufacturer or model. The list filters as you type.
3. Use the left dropdown to choose the control library:
   - **IP_RS232** — network-controlled and serial-controlled equipment
   - **IR** — infrared-controlled equipment
4. Use the right dropdown to sort and filter the list. Five options are available: **Manufacturer**, **Projector**, **Display**, **Switchers**, **End Points**.
   - Tapping the **label** cycles to the next option.
   - Tapping the **arrow** opens the full list to pick from.
5. Select a driver row to open its details.

> **Tip:** The two dropdowns are independent. `IR` + `Displays` shows only infrared display drivers; `IP_RS232` + `Manufacturer` shows every network/serial driver in alphabetical order.

### 7.3 Review the driver before you add it

<p align="center">
  <img src="SM-X210_2026-07-29_11-25-56.png" alt="Driver detail panel for Epson Projectors showing model selector, description, and control info" width="900" />
</p>

*Driver detail. The catalog stays on the left; the driver opens on the right.*

The detail panel contains:

| Element | What it tells you |
| --- | --- |
| **Model** dropdown | Which model within this driver family you intend to control. Use it when one driver covers several models. |
| **Manufacturer ↗** | Opens the manufacturer's home page in the in-app browser. |
| **Product Page ↗** | Opens the product page for the selected model. |
| **Description** | A plain-language summary of the equipment the driver covers. |
| **Specs** | Resolution, lamp/laser type, lens, throw distance, input list, mounting. |
| **Setup** | First-use steps, video optimization notes, control-locking notes, and network/PJLink specifics. |
| **Support** | Manufacturer support numbers, support site, power-cycle procedure, factory-reset procedure. |
| **Control Info** | Control Type (IP / RS-232 / IR), IP Type (TCP / Telnet / SSH), Keep Alive, and On Connection behavior. |
| **+** | Creates a connection from this driver. |

**Specs**, **Setup**, and **Support** are collapsed by default. Tap a heading to expand it.

<p align="center">
  <img src="SM-X210_2026-07-29_11-26-50.png" alt="Driver detail with Specs, Setup, and Support sections expanded" width="900" />
</p>

*Specs, Setup, and Support expanded. This is where the driver author records what the equipment needs — read the Setup notes before you go to site.*

### 7.4 Manufacturer and product pages

Both links open inside the app, with a back arrow, a reload button, and an "open externally" button in the header. Your CTRLbot session is not interrupted.

<p align="center">
  <img src="SM-X210_2026-07-29_11-26-12.png" alt="Manufacturer home page opened in the in-app browser" width="440" />
  <img src="SM-X210_2026-07-29_11-26-23.png" alt="Product page opened in the in-app browser" width="440" />
</p>

*Left: **Manufacturer** opens the manufacturer's home page. Right: **Product Page** opens the page for the selected model.*

> These pages are external websites. They follow their own privacy policies and need internet access. Decline optional cookies where you are offered the choice.

### 7.5 Add the driver

Select the **+** button — either on the driver row in the list, or at the top-right of the detail panel. CTRLbot opens **Configure Connection** with a new connection based on that driver.

---

## 8. Create a Device Connection

The connection screen holds everything needed to reach one real piece of equipment.

<p align="center">
  <img src="SM-X210_2026-07-29_11-29-01.png" alt="Configure Connection screen for a new Epson projector connection" width="900" />
</p>

*A new, not-yet-connected connection. Driver Details on the left are read from the driver; Transport Controls on the right are yours to set.*

### 8.1 The screen, top to bottom

| Control | Purpose |
| --- | --- |
| **✕** (top left) | Closes the screen. It also acts as **Save** — see [8.4](#84-how-saving-works). |
| **Device Name/Label** | The name this connection carries everywhere else in the app. Defaults to `<DRIVER> - New`. Tap it to rename. |
| **Model dropdown** | Appears only when the driver covers more than one model. Lists every supported model, with `(default)` marked. |
| **Protocol** | TCP, Telnet, UDP, or SSH. |
| **Host IP Address** | The device's address on the control network. |
| **Port** | Control port. Pre-filled from the driver, or 22 for SSH and 23 for Telnet. |
| **CONNECT IP** | Opens the connection. Changes to **DISCONNECT** once connected. |
| **Connect dropdown** | Switches the connection mode between **IP**, **RS-232**, and **IR** — see [Section 9](#9-rs-232-and-ir-connections). |
| **Driver Details** | Read-only: Manufacturer, Model, Family/Series, Category, Volume Set range and variable, Switcher Config (input count, output count, and the input/output variables used in commands). |
| **Transport Controls** | **Authentication** (No/Yes), **Encoding** (ASCII/HEX), **Line Ending** (CR/LF/CRLF/None). |
| **Commands** | The driver's full command list, each with a **SEND** button. |
| **Received/Sent Data** | The live terminal. |

### 8.2 Fill it in

1. **Pick the model first**, using the dropdown beside the name. This rewrites the command list to that model's commands, so doing it later means re-testing everything. Selecting a model also renames the connection to `<Manufacturer> <Model>` — so rename *after* you choose, not before.
2. Give the connection a name that will make sense to whoever maintains the room next — `Conference Room Projector`, not `EPSON PowerLite - New`.
3. Choose the protocol. If the driver specifies one, it is already selected.
4. Enter the IP address.
5. Confirm the port.
6. Set **Authentication** to **Yes** only if the device requires it, then enter the credentials when prompted.
7. Confirm **Encoding**: **ASCII** for text commands, **HEX** for byte commands.
8. Confirm **Line Ending**: **CR**, **LF**, **CRLF**, or **None**.
9. Select **CONNECT IP**.

> **Security:** Passwords are handled by CTRLbot's secure credential manager and encrypted with Android Keystore. Never put a password into the device name or any other free-text field — those are stored as ordinary text.

### 8.3 Confirm the connection

<p align="center">
  <img src="SM-X210_2026-07-29_11-29-27.png" alt="Connected device showing command list with Send buttons, terminal output, and the Device saved confirmation" width="900" />
</p>

*A successful connection. The button reads DISCONNECT, the terminal shows the green connect line, `Device saved` confirms the automatic save, and the **EUI** button has appeared in the sidebar.*

When the connection succeeds:

- **CONNECT IP** becomes **DISCONNECT**.
- The terminal prints a green `Connected to <ip>:<port>` line.
- CTRLbot saves the device automatically and briefly shows **Device saved**.
- **Activities** and **EUI** become available in the menu — permanently, from the first saved connection onward.

### 8.4 How saving works

A successful connection saves the device on its own. You do not have to hunt for a Save button after a good connect.

For everything else, the **✕** in the top-left corner doubles as the save action:

| What you see | What it means | What tapping it does |
| --- | --- | --- |
| **Red ✕**, no label | Nothing to save, or the host is not a valid IP address | Closes the screen without saving |
| **Green ✕** with a green **Save** label beside it | You have unsaved changes *and* a valid IP address | Saves the connection and returns you to the connections list |

That is the path for saving a connection you cannot currently reach — a device that is powered down, or one you are pre-staging in the office before you go to site. Enter a valid address, and the ✕ turns green.

---

## 9. RS-232 and IR Connections

Serial and infrared devices are reached through a network-connected **Global Cache endpoint**. The endpoint is itself a CTRLbot connection; the serial or IR device then points at it.

Use the dropdown beside the connect button to switch the connection between **IP**, **RS-232**, and **IR**. The screen rearranges to show the settings for the mode you pick.

### 9.1 RS-232

Selecting **RS-232** replaces the IP address row with an endpoint row and reveals the serial configuration.

| Control | Notes |
| --- | --- |
| **+ RS232 End Point** | Picks which saved Global Cache endpoint carries this device, and which of its serial ports. The chosen endpoint's address is displayed beside it. |
| **CONNECT RS-232** | Opens the connection through the endpoint. |
| **Baud Rate** | 300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, or 115200. |
| **Stop Bits** | 1 or 2. |
| **Parity** | None, Odd, or Even. |
| **Flow Control** | None or Hardware. |

The four serial parameters must match the controlled device exactly. The driver supplies its manufacturer's documented defaults; a mismatch usually shows up as no response at all, or as garbled characters in the terminal.

Global Cache Flex endpoints also expose a **control mode** — **Infrared**, **Serial**, **Relay**, or **Sensor**. CTRLbot sends the mode-set command automatically after the endpoint connects, so a Flex port configured for IR switches to serial when you connect an RS-232 device to it.

### 9.2 IR

Selecting **IR** reveals the IR configuration.

| Control | Notes |
| --- | --- |
| **IR endpoint** | Which saved Global Cache IR endpoint emits the commands. |
| **IR Mode** | **Single IR** configures the endpoint's first IR port. **Tri-port** configures all three ports of a three-port unit. Pick the one that matches the hardware you installed. |

CTRLbot sends the port-configuration commands to the endpoint on connect, so a Global Cache port previously set to serial is switched back to IR automatically.

IR is one-way: the device cannot report its state back. Plan around that — a projector controlled by IR cannot confirm that it powered on, and roughly half the IR models in the catalog only expose a power *toggle*, which is why they are excluded from the generated power presets (see [Section 11](#11-activities-presets)).

Place the emitter over the receiver window and confirm each command physically. The terminal will report a successful *send* whether or not the equipment actually received it.

---

## 10. Test and Manage Connections

Test every connection before you build a room on top of it. Open **Connect** to reach two tabs: **Device Driver Connections** and **Test Device Drivers**.

### 10.1 Send commands from the connection screen

With the connection open and connected, the **Commands** list shows every command in the driver, its raw payload, and a **SEND** button.

1. Pick a safe command to start with — *Power On*, *Menu*, or an input selection.
2. Select **SEND**.
3. Watch the equipment perform the action.
4. Read **Received/Sent Data** for the exact bytes sent and anything the device replied.

The terminal is where encoding and line-ending problems become visible. If a command shows as sent but nothing happens, the transport is right and the framing is wrong — check ASCII vs. HEX and the line ending before you change anything else.

### 10.2 Test Device Drivers

The **Test Device Drivers** tab builds a control layout automatically from the driver's category and command set.

<p align="center">
  <img src="SM-X210_2026-07-29_11-30-21.png" alt="Test Device Drivers tab showing a generated projector remote with power, D-pad, and input buttons" width="900" />
</p>

*A generated projector remote. The connection list on the right selects which device the buttons talk to; the green tick shows it is connected.*

Depending on the driver, the test layout can include:

- Discrete **ON** and **OFF**, plus **TOGGLE**
- A direction pad with **OK**, plus **MENU** and **EXIT**
- Source input buttons and video-mute commands
- A volume bar
- **Show Switcher** / **Show All Command Buttons** to change view

Select the correct connection in the right-hand list first — the selected row is shaded. The green tick beside **Remote:** at the top of the list is the live connection indicator. Each row carries two of its own actions: a **tick** to connect and test that device, and a **pencil** to open its settings.

### 10.3 The switcher view

Any device with more than one input — including a projector or display — can be tested as a switcher. Select **Show Switcher**.

<p align="center">
  <img src="SM-X210_2026-07-29_11-30-57.png" alt="Switcher test view with inputs on the left routed to a single output tile" width="900" />
</p>

*The switcher test view. Select an input on the left; the output tile shows what is currently routed to it.*

Select **Show All Command Buttons** to return to the full command grid when you need a command the switcher view does not expose.

### 10.4 Manage saved connections

The **Device Driver Connections** tab lists every connection you have created. Each row carries the device icon, label, model, manufacturer, and address, plus four actions:

| Icon | Action |
| --- | --- |
| ▶ **Test** | Opens this connection in the Test Device Drivers view. |
| ✎ **Edit** | Opens Configure Connection for this device. |
| ⧉ **Copy** | Duplicates the connection — the fastest way to add a second identical display. |
| 🗑 **Delete** | Removes the connection. |

**+ New Connection** starts a connection without going back to the catalog. Before any connection exists, this tab shows a **No Connections Yet** empty state instead.

> **Warning:** Deleting a connection also affects anything built on it — power presets, switching configuration, audio mapping, and the EUI. Review **Activities** after any deletion.

---

## 11. Activities: Presets

Select **Activities** to reach three tabs: **Presets**, **Switching**, and **Audio**. CTRLbot pre-configures all three from the commands your drivers expose. Review what it produced and change only what the room needs.

### 11.1 What Presets contains in this release

The Presets tab holds exactly two presets: **Power On** and **Power Off**. They are system presets, created and maintained by CTRLbot, and they are what the EUI power button runs. Creating additional presets is not part of this release.

You can see them in the tablet figure in [Section 5.2](#52-on-a-tablet). Each row carries four icons, but only two of them are useful in this release:

| Icon | Action | Use it? |
| --- | --- | --- |
| ✎ | Edit the preset's steps | **Yes** — this is the main tool |
| ▶ (green) | Run the preset now, against the live equipment | **Yes** — for testing |
| ⧉ | Copy | No. The copy is created as a *non-system* preset, so it does not appear in the list. |
| 🗑 | Delete | Only as a deliberate reset — see the warning below. |

> **Warning:** Deleting Power On or Power Off is a **reset**, not a removal. CTRLbot re-creates the preset the next time you open the Presets tab and re-adds every eligible device's power command. What does **not** come back is everything you tuned by hand: your delays, your step order, and any command you swapped. Only delete a system preset when you want that work discarded.

**Three things CTRLbot maintains for you automatically** — when a connection is saved, and again each time you open the Presets tab:

- A new connection is added to both power presets, if it qualifies.
- Renaming a connection updates its step labels in both presets to match.
- Deleting a connection removes its steps from both presets.

None of these reorder your existing steps or touch your delays.

> **Watch the step order after adding a device.** A new device's command is appended to the **end** of the sequence — which means it lands *after* any delay you already placed. If your Power On preset reads *Projector On → wait 30 s → Switcher On*, a display added afterwards ends up last, behind the delay. Open the preset and drag it to where it belongs.

### 11.2 Which devices get added, and which do not

CTRLbot adds a device to the power presets only when it can resolve **both** a discrete Power On **and** a discrete Power Off command for it. The matching runs in this order:

1. An exact command key — `POWER_ON` / `POWER_OFF`.
2. A key containing `POWER_ON`/`POW_ON` or `POWER_OFF`/`POW_OFF`, **excluding** CEC commands and toggles.
3. A command in the `POWER` category whose label reads *power on* / *on*, or *power off* / *off* / *standby*, **excluding** toggles.

Three consequences worth knowing:

- **Toggle-only devices are never added.** A toggle cannot guarantee the end state, and a power sequence that might leave the room in the wrong state is worse than no automation. Around 56% of the IR models in the catalog are toggle-only and correctly never appear.
- **CEC power commands are demoted**, never preferred. A device's own native power commands always win.
- A device you expect to see and do not is almost always one of the two cases above. Open the connection's command list and check what power commands the driver actually exposes.

### 11.3 Edit a preset

Select the pencil on **Power On** or **Power Off**.

<p align="center">
  <img src="SM-X210_2026-07-29_11-31-47.png" alt="Edit Preset screen for Power On showing the trigger event and one device command step" width="900" />
</p>

*The Power On preset. Step 0 is the fixed trigger; step 1 sends POWER ON to the projector.*

The screen has three parts:

| Part | Notes |
| --- | --- |
| **Name** | Read-only for the two system presets. |
| **Events** (step 0) | The trigger that binds this preset to the EUI power button — *Power On Button* or *Power Off Button*. It is fixed. **+ EVENTS** is disabled in this release. |
| **Commands** (steps 1, 2, 3 …) | The ordered sequence. Each step is either a **DEVICE** command or a **DELAY**. |

Each command step exposes: a step label, a **DEVICE**/**DELAY** type selector, the target connection, the command, a **SEND** button to fire that one step in isolation, and copy / reorder / delete icons.

> **Tip:** Use the per-step **SEND** to prove one step before you run the whole sequence. It is far quicker than running a preset with a 30-second warm-up delay in it.

### 11.4 Add a delay

Projectors and displays usually need warm-up or cool-down time, and switchers often need a moment after power before they accept routing commands.

1. Select **+ COMMANDS**. A new step is added, defaulting to a device command.

<p align="center">
  <img src="SM-X210_2026-07-29_11-32-40.png" alt="A newly added preset step defaulting to a device command" width="900" />
</p>

*A new step starts as a DEVICE command.*

2. Change the step's type dropdown from **DEVICE** to **DELAY**.
3. Enter the duration in **seconds** and/or **ms**. The two fields combine.

<p align="center">
  <img src="SM-X210_2026-07-29_11-32-53.png" alt="The same step changed to a two-second delay" width="900" />
</p>

*The same step changed to a two-second delay, placed after the Power Off command.*

4. Use the reorder icon to place the delay **after** the command that needs the time.
5. Leave the screen. The preset saves automatically.

**Where delays usually belong:**

| Situation | Typical placement |
| --- | --- |
| Projector warm-up | After Power On, before any input-select command |
| Projector cool-down | After Power Off, before powering the rest of the rack |
| Switcher boot | After the switcher's Power On, before routing |
| Display waking from deep standby | After Power On, before volume or input commands |

Test the finished sequence with the green ▶ while you can see and hear the equipment.

---

## 12. Activities: Switching and Audio

### 12.1 Choose the switching system

Open **Activities → Switching**. The **Switch Type** dropdown offers two systems:

| System | Use when |
| --- | --- |
| **Many to One: AV Switching** | Several sources feed one destination — a projector or display with multiple inputs, or a presentation switcher driving one screen. |
| **Many to Many: Matrix Switching** | Any source can be routed to any destination — a matrix switcher. |

Choose the one that matches the physical wiring. The EUI builds itself from this choice.

### 12.2 Many-to-One

The screen is a single table describing one destination and its sources.

| Field | Purpose |
| --- | --- |
| **Switch Device** / **Add Switcher +** | Selects which connection is the switching device. |
| Device header | Confirms the selected device's name and address. |
| **Output Label** | The room-friendly name for the destination — `Projector`, `Display 1`, `North Screen`. |
| **#** | The physical input number. This does not change. |
| **Enable** | Tick to include this input in the EUI; untick to hide inputs that are not wired. |
| **Icon** | The icon shown on the source button in the EUI. |
| **Label** | The room-friendly source name — `Laptop`, `Mac`, `Apple TV`, `Room PC`. |
| **Command** | The driver command this input sends. Confirm it matches the physical input. |
| **Send** | Fires that input's command at the live device, right from this screen. |

**Recommended order of work:**

1. Select the switching device.
2. Untick every input that is not physically connected. This is the single biggest improvement you can make to the end user's experience.
3. Rename each remaining input to what is actually plugged into it — use **Send** on each row to confirm which physical source it actually selects before you name it.
4. Pick an icon for each.
5. Name the output.

Labels and icons entered here are exactly what the room's users will see.

### 12.3 Many-to-Many (matrix)

The matrix screen shows inputs and outputs side by side, with the command template above them and a test tool below.

| Area | Purpose |
| --- | --- |
| **Matrix Switcher** / **Add Switcher +** | Selects the matrix connection. |
| Template row | Shows the routing syntax the driver uses — the input variable (`%i`), the output variable (`%o`), and the assembled template, for example `%n*%o!\r`. Useful when a route misbehaves and you need to see what CTRLbot is building. |
| **INPUTS** column | Number, enable tick, **icon**, label, and an **IN** button per input. |
| **OUTPUTS** column | Number, enable tick, label, and an **OUT** button per output. Outputs have no icon picker — only inputs are icon-tagged. |
| Command builder | *"Select Input then Output — builds command. Then Send to test."* |

**The command builder is the fastest way to verify a matrix.** Press **IN** on an input, then **OUT** on an output; the built command appears; select **Send**. You are testing the exact command the EUI will send, on the screen where you can immediately correct a wrong label — no need to switch over to **Connect → Test Device Drivers**.

**Recommended order of work:**

1. Select the matrix connection.
2. Enable only the inputs and outputs that are actually wired.
3. Label and icon each one.
4. Use the command builder to send each route and confirm it lands on the right display.
5. Correct any label that does not match the physical wiring — mislabeled ports are the most common matrix commissioning fault.

### 12.4 Audio

The **Audio** tab maps driver commands onto the room's audio controls.

<p align="center">
  <img src="SM-X210_2026-07-29_11-34-31.png" alt="Audio tab showing the audio device selector, volume range override, and control mappings" width="900" />
</p>

*The Audio tab. Volume Up and Volume Down are mapped; Volume Set is unmapped on this driver, so the EUI will show a level bar rather than a draggable slider.*

**Audio Device** selects which connection provides room audio. Eligible devices are inferred from the commands their drivers expose — audio-capable projectors and displays qualify alongside switchers. The line beneath the selector shows the device's live connection state.

**Volume Range Override** — Start, End, and Step — sets the range the EUI slider works across. Change it only when the device's usable range genuinely differs from the driver default: some displays report 0–100 but distort above 60, and some equipment uses 0–30.

**Control Mappings** contains exactly five entries, in this order:

| Mapping | Required? | What it drives in the EUI |
| --- | --- | --- |
| **Volume Up** | Yes | The ▶ volume-increase control |
| **Volume Down** | Yes | The ◀ volume-decrease control |
| **Volume Set** | Yes | Makes the volume bar a draggable slider. Without it the bar is display-only. |
| **Speaker Mute** | Yes | The speaker mute button |
| **Microphone Mute** | Optional | The microphone mute button; hidden entirely when unmapped |

Each row shows the mapped command, a green **Mapped** or red **Unmapped** status, and a **Test** button that fires the command against the live device. Volume Set also displays its effective range, for example `0..100 (step 1)`.

> **Note:** There is no microphone *level* control in this release — microphone support is mute only.

**How the EUI adapts:**

| What is mapped | What the end user gets |
| --- | --- |
| Volume Up and Down only | A level bar with ◀ ▶ arrows. The bar shows the level but cannot be dragged. |
| Volume Set as well | The same bar becomes a draggable slider. |
| Speaker Mute | A speaker button that toggles mute |
| Microphone Mute | A microphone button that toggles mic mute |
| Nothing audio-capable | The audio strip is hidden |

---

## 13. Use the End User Interface

The EUI is the simplified, full-screen room interface. It removes every configuration tool and presents only what is needed to run the room. This section can be given to the people who use the room.

### 13.1 Enter and leave the EUI

**To enter:** select **EUI** (or **END USER INTERFACE**) at the bottom of the menu. It appears once at least one connection has been saved.

**To leave:** press and hold the tools icon in the **top-left corner for about two seconds**. A *"Keep holding to return to Setup"* hint appears while you hold. A quick tap deliberately does nothing — that is what stops a room user from dropping into the configuration screens by accident.

### 13.2 The off state

<p align="center">
  <img src="SM-X210_2026-07-29_11-54-18.png" alt="EUI off state showing Welcome, press power to begin, and a green power button" width="900" />
</p>

*The off state. This is what the room shows between meetings.*

Select the green power button to run the **Power On** preset.

### 13.3 Power sequences

<p align="center">
  <img src="SM-X210_2026-07-29_11-54-26.png" alt="EUI powering on, showing a green progress ring and a Waiting 2s countdown" width="440" />
  <img src="SM-X210_2026-07-29_11-54-11.png" alt="EUI powering off, showing a red progress ring and Done" width="440" />
</p>

*Left: powering on. The ring fills as the sequence runs and the caption counts down each delay. Right: powering off.*

While a sequence runs, CTRLbot shows a progress ring and a caption naming the current step — `Waiting 2s…` during a delay, `Done` when the sequence completes. **Do not press power repeatedly while a sequence is running**; the delays are there because the equipment needs them.

### 13.4 Operate a many-to-one room

<p align="center">
  <img src="SM-X210_2026-07-29_11-53-53.png" alt="Many-to-one End User Interface with Apple TV selected and routed to Display 1" width="900" />
</p>

*A many-to-one room. Apple TV is selected on the left and shown routed to Display 1 on the right.*

1. Select a source in the left-hand list.
2. CTRLbot sends the routing command.
3. The selected source turns blue and appears on the destination tile.
4. Use the audio strip along the bottom to change volume or mute the room.
5. Select the red power icon at the top right to shut the system down.

If a sliver of another source or destination is visible at the edge of a list, scroll to reveal the rest.

### 13.5 Operate a matrix room

A matrix room shows a grid of output tiles, an **All** control, and a scrolling row of input buttons along the bottom.

1. Select an input along the bottom. It highlights blue.
2. Select the output tile that should receive it. The tile updates to show that input.
3. Repeat for each destination.
4. Select **All** to send the selected input to every enabled output at once.

Each output tile displays the source currently routed to it, so the whole room's routing is readable at a glance. Blue highlighting always means "currently selected".

### 13.6 The audio strip

The strip along the bottom of the EUI is present whenever an audio device is configured:

| Control | Behavior |
| --- | --- |
| 🔊 Speaker | Toggles speaker mute. Appears when Speaker Mute is mapped. |
| 🎤 Microphone | Toggles microphone mute. Appears only when Microphone Mute is mapped. |
| ◀ ▶ | Step the volume down and up. |
| Level bar | Draggable when **Volume Set** is mapped; a read-only level indicator otherwise. |

---

## 14. Set: Settings, Security, and Reset

Open **Set** for everything that applies to the app rather than to one device. It is one scrolling page with four groups.

### 14.1 Database management

| Control | What it does |
| --- | --- |
| **Update Database** | Re-imports the bundled driver catalog. |

CTRLbot recognizes a new bundled catalog by the identity stamped in its index and imports it automatically on the next launch. You do not need this button during normal room setup.

> **Warning:** **Update Database** performs a destructive re-import of the driver catalog and runs immediately — there is no confirmation prompt. Use it only when CTRLbot support or a release note tells you to.

### 14.2 Privacy

| Control | What it opens |
| --- | --- |
| **Privacy Policy** | The full policy: which protocols are used, where authentication information is sent, and which protocols encrypt. |
| **Data Handling** | What is stored on the device, how long it is kept, and what leaves the device. |

### 14.3 Security

| Control | What it does |
| --- | --- |
| **Clear All Credentials** | Deletes every stored password and authentication credential. You will re-enter credentials for every device that needs them. Confirmation required; cannot be undone. |
| **Clear SSH Host Keys** | Removes all trusted SSH host keys; you will verify each host again on its next connection. The line beneath shows the current count — `No trusted hosts`, or `3 trusted hosts`. Confirmation required; cannot be undone. |
| **Reset Security Warnings** | Re-enables every warning you previously dismissed with "don't show again", including the Telnet plain-text warning. |
| **Security Best Practices** | A checklist covering passwords, SSH keys, network security, device security, vigilance, and data hygiene. |

Beneath these sits a standing reminder: credentials are encrypted with Android Keystore, and device-control traffic goes directly to the addresses you configure rather than through CTRLbot servers.

### 14.4 About

Shows the product name, the installed version, and the copyright notice. Quote the version here when you contact support.

### 14.5 Factory Reset

Use Factory Reset only when you intend to rebuild the entire configuration from scratch.

> **Warning:** Factory Reset returns CTRLbot to a first-run state.
>
> **Deleted:** your connections, presets, switching setups, saved credentials, SSH host keys, and app settings.
> **Kept:** the bundled driver catalog, reinstalled fresh.
>
> This action cannot be undone.

Before confirming, write down every IP address, port, label, credential, and custom sequence you will need to recreate. There is no configuration export in this release.

---

## 15. Troubleshooting

### Activities or EUI is greyed out

**Cause:** No device connection has been saved yet.

**Fix:** Add a driver, enter valid connection details, and connect successfully. Both options enable permanently after the first saved connection. If the device is unreachable right now, you can still save it — enter a valid IP and tap the green **✕ Save** (see [8.4](#84-how-saving-works)).

### A device will not connect

Work through these in order:

1. The Android device is on the correct network and subnet.
2. The target device is powered on **and** network control is enabled on it. Many devices disable their network control port in standby.
3. The IP address and port are correct.
4. The protocol matches the device: TCP, Telnet, or SSH. (`UDP` is not supported yet.)
5. Authentication is set to **Yes** only when the device requires it, and the credentials are correct.
6. No firewall or VLAN rule is blocking the control port.
7. The right model is selected on the driver.
8. For RS-232 or IR: the Global Cache endpoint itself is reachable and its own connection is working.

### The connection succeeds but commands do nothing

The transport is fine; the framing is probably wrong.

1. Open the connection's terminal.
2. Send one simple command and read the exact bytes in **Received/Sent Data**.
3. Check **Encoding** — ASCII vs. HEX.
4. Check **Line Ending** — CR, LF, CRLF, or None. This is the most common cause.
5. Look for an error string in the device's reply.
6. Try the same function from the driver's full command list, in case the generated remote is using a different command.
7. Confirm the equipment is in a state that accepts commands — many projectors ignore everything except Power On while cooling down.

### An RS-232 device returns nothing, or returns garbage

Nothing at all usually means the wrong serial port on the endpoint, or the wrong endpoint. Garbled characters almost always mean a **baud rate** mismatch. Check baud rate, stop bits, parity, and flow control against the device's manual, and confirm the endpoint's port is in **Serial** mode.

### An IR device does not respond

IR has no return path, so the terminal will report a successful send regardless. Check emitter placement over the receiver window, the correct output port on the endpoint, and the **Single IR** / **Tri-port** mode setting. Confirm the endpoint's port is in **Infrared** mode.

### A device is missing from the Power On or Power Off preset

CTRLbot only adds a device when it resolves **both** a discrete Power On and a discrete Power Off command. Toggle-only drivers are excluded on purpose, and CEC power commands are demoted below a device's native commands. Open the connection's command list to see what the driver actually exposes. See [11.2](#112-which-devices-get-added-and-which-do-not).

### There is no volume slider, only arrows

A draggable slider requires a mapped **Volume Set** command. Devices with only Volume Up and Volume Down get a read-only level bar with ◀ ▶ arrows instead. Open **Activities → Audio** and check whether Volume Set shows **Mapped** or **Unmapped**.

### The microphone button is missing

**Microphone Mute** is the only optional mapping, and the EUI hides its button entirely when it is unmapped. Check **Activities → Audio**. There is no microphone level control in this release.

### A matrix route goes to the wrong display

1. Confirm the selected matrix connection and its model.
2. Check the input and output numbering under **Activities → Switching**.
3. Use the command builder on that same screen — select the input, select the output, and **Send**. Compare what physically happens with what the labels claim.
4. Correct any label that does not match the wiring.

### You cannot leave the EUI

Press and **hold** the tools icon in the top-left corner for about two seconds, until the *"Keep holding to return to Setup"* hint completes. A quick tap is ignored by design.

### Factory Reset is not a troubleshooting step

It removes the entire user configuration and is not a way to fix a misbehaving device. Use it only when you intend to rebuild the room from first-run state.

---

## 16. Reference Tables

### 16.1 Protocols and default ports

| Protocol | Default port | Encrypted | Notes |
| --- | --- | --- | --- |
| TCP | From the driver | No | The most common control path |
| Telnet | 23 | No | Warning shown before connecting |
| SSH | 22 | Yes | Host key verified and stored locally |
| UDP | — | — | Listed but not supported in this release |

### 16.2 Command framing

| Setting | Options |
| --- | --- |
| Encoding | ASCII, HEX |
| Line Ending | CR, LF, CRLF, None |

### 16.3 RS-232 parameters

| Setting | Options |
| --- | --- |
| Baud Rate | 300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200 |
| Stop Bits | 1, 2 |
| Parity | None, Odd, Even |
| Flow Control | None, Hardware |

### 16.4 Global Cache endpoint modes

| Mode | Use |
| --- | --- |
| Infrared | IR emitter output |
| Serial | RS-232 |
| Relay | Contact closure |
| Sensor | Sensor input |

### 16.5 Catalog filters

| Control | Options |
| --- | --- |
| Control library | IP_RS232, IR |
| Sort / filter | Manufacturer, Projector, Display, Switchers, End Points |

---

## 17. Glossary

| Term | Meaning |
| --- | --- |
| **Activity** | A room-level configuration area: Presets, Switching, or Audio. |
| **CEC** | Consumer Electronics Control, carried over HDMI. CTRLbot demotes CEC power commands below a device's native commands when building presets. |
| **Command** | A single device instruction such as Power On, Input 1, or Volume Up. |
| **Connection** | A saved instance of a driver pointed at real equipment, with an address, port, protocol, and optional credentials. |
| **Delay** | A preset step that waits a set time before the next step runs. |
| **Driver** | A read-only profile containing the commands and capabilities for a device or model family. |
| **Endpoint** | A network-connected Global Cache device that carries RS-232 or IR on CTRLbot's behalf. |
| **EUI** | End User Interface — the simplified full-screen room-control view. |
| **Event** | The fixed trigger that binds a system preset to the EUI power button. |
| **IR** | Infrared control, sent through an IR endpoint. One-way: no device feedback. |
| **Line ending** | The terminator appended to each command: CR, LF, CRLF, or None. |
| **Many-to-many** | Matrix routing, where any source can reach any destination. |
| **Many-to-one** | Switching where several sources feed one destination. |
| **Preset** | An ordered sequence of device commands and delays. This release ships two: Power On and Power Off. |
| **RS-232** | Serial device control, carried by CTRLbot through a network endpoint. |
| **Toggle** | A single command that flips a device between states. Excluded from generated power presets because the end state cannot be guaranteed. |
| **Transport** | The communication method a connection uses: TCP, Telnet, or SSH. |

---

CTRLbot IoT is distributed for Android through the Google Play Store.
Copyright © 2025 CTRLbot. All rights reserved.
