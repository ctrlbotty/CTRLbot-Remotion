# About CTRLbot IoT

> Product and messaging source of truth for websites, CTRLbot AI answers, training material, presentations, app-store copy, and social content.
>
> Product snapshot verified against CTRLbot IoT 1.0 and the bundled driver catalog generated July 21, 2026. Document reviewed July 29, 2026.
>
> This document describes current, user-facing capabilities. Roadmap items and internal implementation notes are clearly labeled so they are not presented as shipping features.

---

## Product at a glance

| Item | Approved description |
| --- | --- |
| Product name | CTRLbot IoT |
| Category | Standalone professional AV control system for Android |
| Primary audience | AV installers, integrators, technicians, and system developers |
| End users | People operating meeting rooms, classrooms, presentation spaces, and other compatible AV systems |
| Platform | Android phones and tablets; available through the Google Play Store |
| Core promise | Configure, test, automate, and operate compatible AV equipment from the Android device in your hand |
| Key difference | The Android app performs the control work directly; the core room-control system does not require a separate CTRLbot server or control processor |
| Application ID | `io.ctrlbot.iot` |
| Current public version | 1.0 |

## Core positioning

### Primary positioning statement

CTRLbot IoT turns a compatible Android phone or tablet into a standalone professional AV control system. Installers can connect to equipment, test commands, create room activities, and deliver a ready-to-use control interface without programming a separate control processor.

### Core idea

**The control system is the app.**

The same Android device is used to configure the room and operate it. As equipment is added, CTRLbot uses the capabilities in each device driver to build the controls needed for that system. Setup and interface creation become one connected workflow.

### Short description

CTRLbot IoT is a standalone Android app for configuring and controlling professional AV systems. It connects directly to compatible projectors, displays, switchers, matrix routers, and network control endpoints.

### Expanded description

CTRLbot IoT gives AV professionals a faster path from connected equipment to an operating room. Browse the bundled driver catalog, create a connection, verify commands in real time, review the automatically prepared power, switching, and audio configuration, and hand the system over through a simplified End User Interface. The core control path runs from the Android device directly to the configured equipment, without a separate CTRLbot control processor or server.

## The problem CTRLbot IoT addresses

Traditional professional AV control systems often separate programming, processing, and operation across several components. A programmer may need a laptop and specialized software to configure a dedicated processor, which then serves an interface to a touch panel or tablet.

CTRLbot IoT combines those responsibilities on an Android phone or tablet:

- The installer selects device drivers and enters connection information in the app.
- The app communicates directly with compatible equipment.
- Live testing confirms connectivity and commands before room-level automation is used.
- Presets, switching, audio mappings, and the end-user interface are created from the configured equipment and its available commands.
- Changes are saved automatically during normal setup.

This approach is designed to reduce setup time, system complexity, and the amount of specialized control hardware required for an appropriate room.

## Who it is for

### Primary users

- AV integrators who want to configure and commission a room from a phone or tablet
- Installers who need to connect to and test equipment while standing in the room
- AV technicians who need a practical interface for troubleshooting device control
- System developers who want a driver-based control platform without a separate CTRLbot processor

### End users

Once setup is complete, the End User Interface is intended for anyone who needs to operate the room. It removes configuration tools and presents only the controls supported by the configured system.

### Best-fit environments

CTRLbot IoT is well suited to compatible meeting rooms, classrooms, huddle spaces, demonstration systems, test benches, and other AV systems where a generated interface is preferable to a fully custom graphics project.

## Messaging pillars

### 1. Standalone Android control

The core control system runs on the Android device. Direct-IP installations do not need a separate CTRLbot processor or a server that hosts the user interface.

### 2. Configure where the equipment is

The installer can browse drivers, enter connection details, and test live commands from the phone or tablet being used in the room. A laptop is not required for normal CTRLbot configuration.

### 3. Driver-driven setup

Drivers contain the control language and capability information for supported equipment. CTRLbot uses that information to generate device controls and prepare room-level functions.

### 4. Test before handoff

The built-in terminal shows sent data and device responses. Installers can verify a connection and its commands before relying on presets or the end-user interface.

### 5. Local-first privacy

Room configuration is stored on the Android device, credentials are encrypted locally, and device-control traffic goes directly to the addresses configured by the user. CTRLbot IoT does not add analytics, user tracking, or advertising.

## How the app works

The normal setup path has four stages:

1. **Device** — find a driver and add the equipment.
2. **Connect** — enter connection information and test the real device.
3. **Activities** — review and adjust power presets, switching, and audio mappings.
4. **EUI** — operate the completed room from the End User Interface.

**Activities** and **EUI** become available after the first device connection is created.

### Device: find the correct driver

The **Device** area contains the bundled driver catalog. Users can:

- Search by manufacturer or model
- Switch between `IP_RS232` and `IR` driver categories
- Filter the catalog by equipment type
- Review supported models and control defaults
- Read driver descriptions, specifications, setup notes, and support information when supplied
- Open manufacturer and product links when supplied
- Add a new connection from the selected driver

A driver is a translation layer between CTRLbot and a piece of equipment. It contains the commands, transport defaults, and capability information needed to control supported models.

### Connect: configure and verify the equipment

The **Connect** area is used to create, test, and manage saved device connections. Depending on the driver and equipment, settings can include:

- Device name or room label
- Device model
- IP address and port
- TCP, Telnet, or SSH transport
- Authentication credentials
- ASCII or hexadecimal command encoding
- Command line endings such as CR, LF, or CRLF
- RS-232 endpoint and serial settings
- IR endpoint, mode, and output settings

The live terminal lets the installer send driver commands and see sent and received data. Saved connections can also be searched, copied, edited, or deleted.

### Activities: prepare room-level behavior

#### Presets

Presets are ordered sequences that can run commands and delays across multiple devices. CTRLbot creates system **Power On** and **Power Off** presets automatically. Compatible devices and commands are added to those presets as connections are configured. Installers can review, reorder, add, remove, and test steps.

Power automation is intentionally deterministic. A device is added to the generated power presets only when CTRLbot can resolve both a discrete Power On command and a discrete Power Off command. A toggle-only device is not inserted because a toggle cannot guarantee the final power state.

#### Switching

The current release supports two room-switching configurations:

- **Many-to-One** — multiple source inputs route to one display or destination.
- **Many-to-Many** — a matrix routes multiple inputs to multiple outputs.

Installers can enable or disable routes and replace technical input/output names with room-friendly labels and icons, such as **Laptop**, **Mac**, or **Projector**.

#### Audio

CTRLbot can select a compatible audio-capable device and map the commands that device exposes. Available controls may include:

- Volume Up
- Volume Down
- Volume Set, including a configured range
- Speaker mute
- Microphone mute

The interface shows only controls that can be supported by the selected device and its driver commands. In the current release, eligible devices include audio-capable projectors and displays as well as compatible switchers. Dedicated standalone DSP driver support is not a current-release marketing claim.

### EUI: operate the room

The **End User Interface**, or **EUI**, is a full-screen room-control view. It removes the setup navigation and uses the completed room configuration to present appropriate controls.

Depending on the equipment and mappings, the EUI can provide:

- System Power On and Power Off sequences
- Many-to-One source selection
- Many-to-Many matrix routing
- Volume Up and Volume Down
- Direct volume adjustment when Volume Set is available
- Speaker mute and microphone mute when mapped

To return from the EUI to setup, press and hold the CTRLbot area in the upper-left corner for two seconds. A normal tap does not exit the EUI.

## Driver catalog

The driver library is bundled with the app so the catalog can be searched without downloading each driver individually. The current catalog snapshot contains:

| Catalog measure | Current count |
| --- | ---: |
| Manufacturers | 73 |
| Driver profiles | 124 |
| Supported model entries | 378 |
| Device commands | 7,561 |

Current bundled categories are projectors, displays, switchers, and a limited endpoint profile. Counts change as the catalog is revised, so dated numbers should be used in published material.

Driver profiles are JSON assets divided into two major control categories:

- `IP_RS232` for direct network and RS-232-controlled equipment
- `IR` for infrared-controlled equipment

The app imports the bundled catalog into its local database. A new verified catalog snapshot is recognized by the identity in `index.json` and imported when required.

> **Internal catalog note:** **Set → Update Database** performs a destructive re-import and is intended for controlled catalog testing. Do not promote it as the normal customer update workflow without reviewing the release behavior first.

## Supported control methods

| Method | How CTRLbot uses it | Qualification |
| --- | --- | --- |
| Raw TCP | Sends commands directly to the device's network address and port | The device must expose a compatible TCP control interface. |
| Telnet | Controls compatible legacy network devices | Telnet is unencrypted; CTRLbot warns the user before connecting. |
| SSH | Connects to devices that support SSH control | CTRLbot verifies and stores SSH host keys locally. |
| RS-232 | Sends serial control through a compatible Global Cache network endpoint | Requires the endpoint and correct serial settings. |
| IR | Sends infrared commands through a compatible Global Cache IR endpoint | Requires the endpoint, emitter placement, and correct IR output configuration. |

For direct network control, commands travel from the Android device to the equipment over the reachable network. CTRLbot does not relay that device-control traffic through its own servers.

## CTRLbot AI

Selecting the CTRLbot header opens `https://ctrlbot.ai/` inside a secured in-app WebView. The app identifies this session as CTRLbot IoT so the site can present app-aware FAQs and AV-focused assistance.

CTRLbot AI can help users:

- Understand the setup workflow
- Find explanations of app features
- Work through common connection problems
- Troubleshoot device-control behavior
- Learn the terminology used by CTRLbot IoT

CTRLbot AI is a web-based help resource and requires internet access. Room setup begins in **Device**, and local device control does not pass through CTRLbot AI.

## Privacy and security

CTRLbot IoT is designed around local configuration and direct device communication:

- Device configurations are stored locally on the Android device.
- Credentials are encrypted at rest using Android Keystore-backed secure storage and are referenced from the room database rather than stored there as plain text.
- The in-memory credential cache expires after 15 minutes.
- Android backup is disabled for CTRLbot configuration data.
- SSH host keys are stored locally and verified on connection.
- Telnet displays a warning because credentials and commands can travel in plain text.
- The app does not include analytics, user tracking, or advertising.
- Users can clear credentials and SSH host keys or perform a Factory Reset from **Set**.

Device-control traffic goes directly to addresses configured by the user. Optional web content—including CTRLbot AI, manufacturer pages, and product pages—connects to external websites and is governed by those sites' privacy policies.

> **Internal permissions note:** The current Android manifest declares Internet and Wi-Fi-state permissions as well as Bluetooth and location-related permissions. Public content must not say that Internet and Wi-Fi state are the only declared permissions. Confirm the customer-facing purpose and runtime behavior of the Bluetooth/location permissions before publishing a detailed permission explanation.

## Product boundaries

Clear boundaries make the product promise more credible:

- CTRLbot controls equipment for which a compatible driver and control path are available.
- The Android device must be able to reach the controlled equipment or network endpoint.
- A driver may support several related models, but compatibility should be confirmed during live testing.
- Available controls depend on the commands exposed by the driver and equipment.
- RS-232 and IR installations require compatible network endpoints; “no hardware required” is therefore too broad as a universal claim.
- The core room-control path does not require the internet, but CTRLbot AI and external manufacturer/product pages do.
- CTRLbot does not include a graphics builder. The interface is generated from the system configuration instead of being designed screen by screen.
- Customization focuses on equipment, mappings, labels, icons, sequences, and settings—not unrestricted interface design.
- The app is Android-only in the current release.

### Not current-release features

Do not present the following as available today:

- Camera control in the EUI
- Lighting control in the EUI
- User-selectable AV-over-IP encoder/decoder grid switching
- A dedicated catalog of standalone DSP drivers

Camera and lighting panel types exist as placeholders, and endpoint switching code remains in the project, but those workflows are not complete current-release features.

## Approved claims and claim guardrails

### Safe, current claims

- “The control system is the app.”
- “Standalone professional AV control for Android.”
- “Configure and operate a compatible room from an Android phone or tablet.”
- “No separate CTRLbot control processor or server is required for the core control system.”
- “Connect to and test compatible equipment in real time.”
- “Generate room controls from device drivers and configuration.”
- “Device-control traffic goes directly to the addresses you configure.”
- “No analytics, user tracking, or advertising in the app.”

### Claims that require qualification

- **No additional hardware** — true for compatible direct-IP control, but RS-232 and IR require network endpoints.
- **Automatic setup** — CTRLbot prepares controls and mappings, but the installer must verify equipment, routes, commands, labels, timing, and network behavior.
- **Works offline** — local device control can work without public internet access, but the Android device still needs network access to the equipment and web features require internet access.
- **Supports a manufacturer or model** — confirm it against the current catalog snapshot and test the real equipment.
- **Fast setup** — describe the product as designed to reduce setup time; avoid promising a universal number of minutes.

### Claims to avoid unless independently substantiated

- “The first app of its kind”
- “Works with every AV device”
- “No hardware is ever required”
- “Everything configures itself”
- “All app traffic stays local”
- “Camera and lighting control are included”
- “Full AV-over-IP endpoint routing is included”
- “Only Internet and Wi-Fi permissions are declared”

## Reusable content blocks

### Headline options

- The control system is the app.
- Professional AV control, built for Android.
- Configure the room from the device in your hand.
- From device connection to room control in one app.

### Supporting line options

- Connect, test, automate, and operate compatible AV equipment without a separate CTRLbot control processor.
- Build a working room interface from the equipment and commands already in the system.
- Give installers live control during setup and give users a simplified interface at handoff.

### Approximately 25 words

CTRLbot IoT turns an Android phone or tablet into a standalone system for configuring, testing, automating, and controlling compatible professional AV equipment.

### Approximately 50 words

CTRLbot IoT is a standalone professional AV control system for Android. Installers can select device drivers, create and test live connections, configure presets, switching, and audio, then hand the room over through a simplified End User Interface—without a separate CTRLbot server or control processor.

### Approximately 100 words

CTRLbot IoT turns a compatible Android phone or tablet into the control system for a professional AV room. Installers browse a bundled driver catalog, connect directly to equipment, test commands in real time, and review automatically prepared power, switching, and audio functions. The same configuration produces a simplified full-screen End User Interface for everyday operation. CTRLbot supports TCP, Telnet, SSH, and RS-232 or IR through compatible Global Cache endpoints. Configuration stays on the Android device, credentials are encrypted locally, and device-control traffic goes directly to the addresses the user configures.

### Feature bullets for a website or app listing

- Standalone Android-based professional AV control
- Bundled, searchable device-driver catalog
- Direct TCP, Telnet, and SSH device connections
- RS-232 and IR control through compatible Global Cache endpoints
- Live command testing with sent and received terminal data
- Automatic saving during normal setup
- Multi-device presets with commands and delays
- Many-to-One and Many-to-Many switching configuration
- Driver-based volume and mute controls
- Full-screen End User Interface for room operation
- Local encrypted credential storage
- In-app CTRLbot AI help and troubleshooting

### Slide-deck story

1. **The challenge** — traditional room control can require separate programming software, processing hardware, and a client interface.
2. **The idea** — with CTRLbot IoT, the control system is the Android app.
3. **The workflow** — Device, Connect, Activities, EUI.
4. **The result** — the installer configures and tests the system from the room, then hands over a simplified operating interface.
5. **The architecture** — direct device communication, local configuration, encrypted credentials, and no separate CTRLbot processor.
6. **The boundary** — compatible equipment and drivers are required; RS-232 and IR use network endpoints; the interface is generated rather than freely drawn.

### Social-content seeds

**Standalone control**

The control system is the app. CTRLbot IoT lets AV professionals configure, test, and operate compatible room equipment directly from an Android phone or tablet—without a separate CTRLbot control processor.

**Commissioning workflow**

Choose a driver. Enter the connection. Send a live command. See the response. CTRLbot IoT keeps commissioning close to the equipment and turns the same setup into the room's operating interface.

**Generated interface**

CTRLbot IoT does not begin with a blank graphics page. It builds controls from the devices, commands, routes, and audio mappings in the system, so setup and interface creation happen together.

**Privacy**

CTRLbot IoT stores room configuration on the Android device, encrypts credentials locally, and sends device-control traffic directly to the addresses the installer configures. No app analytics. No user tracking. No advertising.

## CTRLbot AI knowledge-base answers

### What is CTRLbot IoT?

CTRLbot IoT is a standalone Android app for configuring and controlling compatible professional AV equipment. It combines driver selection, connection setup, live testing, room activities, and the end-user interface on one phone or tablet.

### Does CTRLbot IoT require a separate control processor?

No separate CTRLbot control processor or server is required for the core room-control system. The Android device runs the app and sends commands directly to compatible equipment. RS-232 and IR installations still require compatible network endpoints.

### Do I need a laptop to configure CTRLbot IoT?

No laptop is required for normal setup. Drivers, connections, testing, activities, and the End User Interface are configured from the Android phone or tablet.

### What equipment can CTRLbot IoT control?

The current bundled catalog focuses on projectors, displays, switchers, matrix-routing equipment, and a limited network endpoint profile. A compatible driver and a supported control path are required.

### Which control protocols are supported?

CTRLbot supports raw TCP, Telnet, and SSH. It also supports RS-232 serial and IR control through compatible Global Cache network endpoints.

### What is a driver?

A driver contains the commands and control settings CTRLbot needs to communicate with one or more equipment models. It translates app actions such as Power On or Input Select into the native command format expected by the device.

### What is a connection?

A connection is a configured instance of a driver. It identifies the real equipment being controlled and stores details such as its name, address, port, protocol, model, endpoint, and secure credential reference.

### Does CTRLbot save changes automatically?

Yes. Normal configuration changes are saved automatically. Installers should still test the actual equipment and review room activities before handoff.

### What are Activities?

Activities are room-level functions built on top of device connections. The current Activities area contains Presets, Switching, and Audio configuration.

### Why is a device missing from the Power On or Power Off preset?

CTRLbot adds a device to its generated system power presets only when it can identify both a discrete Power On command and a discrete Power Off command. Toggle-only power control is excluded because it cannot guarantee the final state.

### What switching systems are supported?

The current release supports Many-to-One switching for several sources feeding one destination and Many-to-Many switching for matrix routing between multiple inputs and outputs.

### Why do some audio controls not appear?

CTRLbot shows only the audio actions supported by the selected device and mapped driver commands. For example, a direct volume slider requires a usable Volume Set command and range.

### What is the EUI?

The End User Interface is the simplified, full-screen room-control view. It can present system power, source routing, matrix routing, volume, and mute controls based on the completed configuration.

### How do I leave the EUI?

Press and hold the CTRLbot area in the upper-left corner for two seconds. A normal tap is intentionally ignored.

### Does local room control require internet access?

Direct control of reachable local equipment does not require the traffic to pass through the public internet or CTRLbot servers. The Android device must still be connected to the equipment network. CTRLbot AI and external web pages require internet access.

### Where is configuration data stored?

Room configuration is stored locally on the Android device. Credentials use Android Keystore-backed encrypted storage and are not stored as plain text in the room database.

### Does CTRLbot collect analytics or track users?

The current app does not include analytics, user tracking, or advertising. External websites opened by the user follow their own privacy policies.

### Is Telnet secure?

No. Telnet sends traffic in plain text. CTRLbot displays a warning before opening a Telnet connection. Use SSH when the controlled device supports it.

### How large is the driver library?

The catalog snapshot generated July 21, 2026 contains 73 manufacturers, 124 driver profiles, 378 model entries, and 7,561 commands. These counts change as the catalog is updated.

## Terminology and style guide

- Write the product name as **CTRLbot IoT**.
- Write the assistant name as **CTRLbot AI**; use `ctrlbot.ai` only for the website address.
- Use **professional AV** or **pro AV**, not “consumer remote-control app.”
- Spell **Android** with a capital A.
- Use **End User Interface (EUI)** on first mention, then **EUI**.
- Use **driver** for the reusable equipment profile.
- Use **connection** or **device connection** for the installed instance that points to real equipment.
- Use **Device**, **Connect**, **Activities**, and **Set** when referring to the app navigation labels.
- Use **Many-to-One** and **Many-to-Many** for the current switching modes.
- Write **RS-232**, **AV-over-IP**, **Power On**, and **Power Off**.
- Prefer **configure** or **set up** over **program** for general audiences. “Program the room” is acceptable in integrator-focused content.
- Avoid alternating among “CTRLbot,” “ControlBot,” and “CTRL bot.” Use **CTRLbot** consistently.

## Internal technical reference

These facts are useful for technical content but are usually unnecessary in marketing copy:

- Native Android app written in Kotlin
- Application ID: `io.ctrlbot.iot`
- Kotlin namespace: `io.ctrlbot`
- Version name: 1.0
- Minimum Android API: 24
- Compile and target API: 35
- Java 17 toolchain
- Fragment-based, View-system user interface with phone and tablet layouts
- MVVM application structure with Room/SQLite local persistence
- Room database schema version: 32
- Driver catalog stored as bundled JSON and imported locally
- Android backup disabled with explicit data-extraction and backup rules
- Current driver index identity: `2026-07-21T13:23:26.920502Z`

## Maintenance checklist

Review this document when any of the following changes:

- Public app version or Google Play availability
- Driver catalog identity or published catalog counts
- Supported transport or endpoint types
- Activities available in the setup interface
- EUI panels or supported controls
- Privacy, analytics, backup, or permission behavior
- Credential or SSH host-key handling
- Roadmap features move into the shipping product
- Product naming, positioning, or approved comparative claims
