# CTRLbot IoT User Manual

Standalone professional AV control for Android phones and tablets

Last updated: July 29, 2026

## About This Manual

This manual explains how to configure and operate a room with CTRLbot IoT. It is written for AV installers, integrators, system administrators, and anyone responsible for setting up the app. The End User Interface section can also be given directly to room users.

The screenshots show both tablet and phone layouts. The controls are the same, although a phone may use icons or vertically stacked fields where a tablet shows a sidebar and multiple columns.

> **Note:** IP addresses, ports, device names, and models shown in the screenshots are examples. Use the values assigned to your equipment.

## Contents

1. [What CTRLbot IoT Is](#1-what-ctrlbot-iot-is)
2. [Before You Begin](#2-before-you-begin)
3. [First Launch and Privacy](#3-first-launch-and-privacy)
4. [Navigate the App](#4-navigate-the-app)
5. [Use CTRLbot AI](#5-use-ctrlbot-ai)
6. [Find a Device Driver](#6-find-a-device-driver)
7. [Create a Device Connection](#7-create-a-device-connection)
8. [Test and Manage Connections](#8-test-and-manage-connections)
9. [Configure Activities](#9-configure-activities)
10. [Use the End User Interface](#10-use-the-end-user-interface)
11. [Settings, Privacy, and Security](#11-settings-privacy-and-security)
12. [Troubleshooting](#12-troubleshooting)
13. [Glossary](#13-glossary)

## 1. What CTRLbot IoT Is

CTRLbot IoT is a native Android control system for professional audiovisual equipment. It runs directly on a phone or tablet and communicates with projectors, displays, switchers, matrix routers, and other compatible devices.

The Android device is the control system. A typical CTRLbot room does not need:

- A separate control processor
- A server that hosts the control interface
- Proprietary control hardware
- A laptop for routine programming

CTRLbot builds the room interface from the equipment you add. As connections are created, the app can build device controls, power presets, switching, audio controls, and the client-facing End User Interface automatically.

### Supported control methods

| Method | Typical use | Important note |
| --- | --- | --- |
| TCP | Direct network control | Use the device's IP address and control port. |
| Telnet | Legacy network control | Traffic and credentials are unencrypted; CTRLbot displays a warning. |
| SSH | Secure network control | CTRLbot verifies and stores SSH host keys locally. |
| RS-232 | Serial device control | Routed over the network through a compatible Global Cache endpoint. |
| IR | Infrared control | Requires a compatible network-connected IR blaster. |

Device traffic is sent directly from the Android device to the equipment over the local network.

## 2. Before You Begin

Collect the following information for every controlled device:

- Manufacturer and model
- Control method: TCP, Telnet, SSH, RS-232, or IR
- IP address and port, when using network control
- Username and password, when authentication is required
- Required command encoding and line ending
- For RS-232: serial settings and the Global Cache endpoint
- For IR: the IR blaster and output port

Also confirm that:

1. The Android phone or tablet is connected to the control network.
2. The target equipment is powered and reachable from that network.
3. Network control is enabled on the equipment.
4. Any required VLAN routing or firewall rules allow the Android device to reach the equipment.

### Normal setup workflow

Most rooms follow the same four-stage workflow:

1. **Device** — find the correct driver and create a connection.
2. **Connect** — verify live commands and device behavior.
3. **Activities** — review the generated presets, switching, and audio mappings.
4. **EUI** — operate the completed room from the end-user dashboard.

Because CTRLbot saves successful configuration changes automatically, programming the system and building its interface happen together.

## 3. First Launch and Privacy

On first launch, CTRLbot explains its local-control and security model.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-24-24.png" alt="CTRLbot IoT first-run privacy dialog on a tablet" width="900" />
</p>

Choose one of the following:

- **Get Started** — continue into the app.
- **Learn More** — open additional first-run information.
- **Privacy & Security** — review data handling, credentials, host keys, and security controls.

CTRLbot protects connection data in several ways:

- Credentials are encrypted locally and are not stored as plain text in the room database.
- SSH host keys are kept in a secure local repository.
- Telnet produces a warning because its traffic is not encrypted.
- Android backup is disabled for CTRLbot configuration data.
- Device-control traffic normally remains on the local network.

You can reopen **Privacy & Security** later from **Set**.

## 4. Navigate the App

On a tablet, the main areas appear in the left sidebar. On a phone, the same areas appear as icons along the bottom of the screen.

| Area | Purpose |
| --- | --- |
| **CTRLbot** | Opens CTRLbot AI help and troubleshooting. |
| **Device** | Browses the bundled driver catalog and adds equipment. |
| **Connect** | Manages saved connections and tests live device controls. |
| **Activities** | Configures Presets, Switching, and Audio. |
| **Set** | Opens settings, security controls, database tools, and Factory Reset. |
| **EUI / End User Interface** | Enters the full-screen room-control interface. |

**Activities** and **EUI** remain unavailable until at least one device connection has been created.

## 5. Use CTRLbot AI

Select the CTRLbot logo to open the built-in help system.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_09-16-55.png" alt="CTRLbot AI help and frequently asked questions" width="900" />
</p>

CTRLbot AI provides app-aware and AV-specific help. Use the suggested questions or enter your own question to:

- Learn how to add and test a connection
- Troubleshoot a device that is not responding
- Understand a feature such as the End User Interface
- Review common setup questions

CTRLbot AI is a help resource. Room programming begins under **Device**.

## 6. Find a Device Driver

A driver translates CTRLbot actions into the native commands understood by a particular device. The bundled catalog covers many manufacturers and equipment types.

### 6.1 Browse the catalog

1. Select **Device**.
2. Use **Search drivers** to search by manufacturer or model.
3. Choose the driver category:
   - **IP_RS232** for network and serial-controlled equipment.
   - **IR** for infrared-controlled equipment.
4. Use the sort/filter dropdown to narrow the list by manufacturer or equipment type.
5. Select a driver row to view its details.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-25-37.png" alt="CTRLbot device driver catalog" width="900" />
</p>

Driver types may include projectors, displays, switchers, matrix routers, audio-capable equipment, cameras, and AV-over-IP equipment. The available setup workflows depend on the current app release and the commands provided by the selected driver.

### 6.2 Review the driver

Before creating a connection, confirm the selected model and review the driver information.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-26-42.png" alt="Epson driver description, specifications, setup, and support information" width="900" />
</p>

The details panel can include:

- Supported models
- Product description
- Specifications
- Setup notes
- Manufacturer support information
- Control type and transport defaults
- Volume and switching capabilities
- Manufacturer and product-page links

Expand **Specs**, **Setup**, and **Support** as needed. Use the model dropdown when one driver supports several related models.

### 6.3 Add the driver

Select the **+** button in the driver list or details panel. CTRLbot opens **Configure Connection** and creates a new connection from that driver template.

## 7. Create a Device Connection

The connection screen contains the network or endpoint settings used to reach the equipment.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-29-01.png" alt="Configure Connection screen for an Epson projector" width="900" />
</p>

### 7.1 Enter the connection settings

1. Give the connection a useful **Device Name/Label**, such as `Conference Room Projector`.
2. Confirm the correct driver model.
3. Choose the transport, such as **TCP**, **Telnet**, or **SSH**.
4. Enter the device's IP address.
5. Confirm the control port.
6. Configure authentication when the device requires it.
7. Confirm the command encoding:
   - **ASCII** for text commands.
   - **HEX** for hexadecimal byte commands.
8. Confirm the line ending, such as **CR**, **LF**, or **CRLF**.
9. Select the connection action, such as **Connect IP**.

For RS-232, select the Global Cache endpoint and serial port required by the target device. For IR, select the IR endpoint and output configuration.

> **Security:** Passwords are saved through CTRLbot's secure credential manager. Do not place passwords in the device name, notes, or other plain-text fields.

### 7.2 Confirm the connection

When the connection succeeds:

- The connection action changes to **Disconnect**.
- The terminal displays a green connected message.
- CTRLbot saves the device automatically.
- **Activities** and **EUI** become available after the first saved connection.

There is no separate Save button. Leaving the screen preserves successful connection changes automatically.

## 8. Test and Manage Connections

Test every connection before configuring the room around it.

### 8.1 Send commands from the connection screen

After connecting, expand the driver's command list.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-29-27.png" alt="Connected device with command Send buttons and terminal output" width="900" />
</p>

1. Find a safe command, such as Power On, Menu, or an input selection.
2. Select **Send**.
3. Verify that the equipment performs the action.
4. Review **Received/Sent Data** for the transmitted command and any device response.

Use the terminal to confirm the address, port, protocol, encoding, and line ending before building presets or switching.

### 8.2 Use Test Device Drivers

Open **Connect**, then switch to **Test Device Drivers**. CTRLbot creates a control layout based on the driver category.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-30-21.png" alt="Test Device Drivers remote for an Epson projector" width="900" />
</p>

Depending on the driver, the test screen can include:

- Discrete Power On and Power Off
- Power Toggle
- Direction pad, Menu, OK, and Exit
- Source-input buttons
- Switcher routing
- Volume and mute controls
- A button to expose the full command set

Select the correct connection in the remote list before testing. The green status indicator shows that the selected connection is active.

### 8.3 Manage saved connections

Use **Device Driver Connections** to:

- Search for a saved connection
- Edit its address, port, protocol, or label
- Copy a connection when adding similar equipment
- Delete a connection that is no longer used

Deleting a connection can also affect presets, switching, audio, and the EUI. Review the room configuration afterward.

## 9. Configure Activities

Select **Activities** to open three configuration areas:

- **Presets** — ordered system actions
- **Switching** — source-to-destination routing
- **Audio** — volume and mute mappings

CTRLbot preconfigures these areas from compatible driver commands. Review the generated configuration and change only what the room requires.

### 9.1 Presets

CTRLbot creates **Power On** and **Power Off** system presets when a device provides both discrete commands. A toggle-only device is not automatically included because a toggle cannot guarantee the final power state.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-31-36.png" alt="Power On and Power Off presets" width="900" />
</p>

Each preset can contain:

- Device commands
- Delays
- Timed events
- Actions for several devices

Use the pencil to edit a preset and the green play button to test it.

#### Add a delay

Projectors and displays often need warm-up or cool-down time.

1. Edit the Power On or Power Off preset.
2. Select **+ Commands**.
3. Change the new step type to **Delay**.
4. Enter the delay in seconds and/or milliseconds.
5. Place the delay after the command that requires time to complete.
6. Exit the editor; the preset saves automatically.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-32-53.png" alt="Power Off preset with a two-second delay" width="900" />
</p>

Use the copy, reorder, and delete controls to maintain the sequence. Test the preset while you can see and hear the controlled equipment.

### 9.2 Many-to-one switching

Use **Many to One: AV Switching** when several sources feed one destination, such as a projector or display.

1. Open **Activities → Switching**.
2. Select **Many to One: AV Switching**.
3. Choose the display, projector, or presentation switcher.
4. Disable inputs that are not used.
5. Rename the remaining inputs with room-friendly labels such as **Laptop**, **Mac**, or **Apple TV**.
6. Choose an appropriate icon for each source.
7. Rename the output, such as **Projector** or **Display 1**.

These labels and icons are used in the EUI.

### 9.3 Many-to-many matrix switching

Use **Many to Many: Matrix Switching** when any source may be routed to one or more destinations.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-A102U1_2026-07-29_14-05-23.png" alt="Many-to-many matrix switching configuration on a phone" width="360" />
</p>

1. Select **Many to Many: Matrix Switching**.
2. Choose the matrix-switcher connection.
3. Enable only the inputs and outputs used in the room.
4. Rename each input and output.
5. Assign recognizable icons.
6. Test routes from **Connect → Test Device Drivers**.

For a direct matrix test, select an input and then an output. Select an input and **All** to route that source to every enabled output.

### 9.4 Audio

The **Audio** tab maps compatible driver commands to room audio controls.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-34-31.png" alt="Audio command mappings for a projector" width="900" />
</p>

1. Choose the audio device.
2. Review the detected volume range.
3. Confirm the mappings for Volume Up, Volume Down, Volume Set, speaker mute, and microphone controls.
4. Use **Test** beside each mapped command.
5. Adjust the range override only when the device's usable range differs from the driver default.

The EUI adapts to the commands available:

- **Volume Up/Down only** — shows relative volume controls.
- **Volume Set** — adds a continuous slider.
- **Speaker Mute** — adds a speaker-mute control.
- **Microphone commands** — add microphone level or mute controls.

An **Unmapped** label means the selected driver does not provide a compatible command or no mapping has been chosen.

## 10. Use the End User Interface

The EUI is the simplified, full-screen room interface. It removes the programming sidebar and presents only the controls needed to operate the system.

### 10.1 Enter the EUI

Select **EUI** or **End User Interface** at the bottom of the navigation area. The button appears after at least one device connection has been saved.

### 10.2 Operate a many-to-one room

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-53-53.png" alt="Many-to-one End User Interface with Apple TV routed to Display 1" width="900" />
</p>

1. Select a source on the left.
2. CTRLbot sends the required routing command.
3. The active source and destination turn blue.
4. Use the bottom audio controls to change volume or mute the room.
5. Select the red power icon to shut down the system.

If a thin portion of another source or destination is visible at the edge, scroll to reveal additional items.

### 10.3 Operate a matrix room

<p align="center">
  <img src="../../CTRLbot Mirror/SM-A102U1_2026-07-29_14-07-58.png" alt="Matrix End User Interface with outputs, inputs, and All control" width="360" />
</p>

1. Select an input along the bottom.
2. Select the output that should receive that source.
3. Repeat for each destination.
4. Select **All** to route the selected source to every output.

Each output displays its currently selected source. Blue highlighting shows the active selection.

### 10.4 Power the room on and off

Selecting the EUI power control runs the corresponding system preset. CTRLbot displays progress while commands and delays execute.

<p align="center">
  <img src="../../CTRLbot Mirror/SM-X210_2026-07-29_11-54-11.png" alt="System Power Off sequence in progress" width="900" />
</p>

When shutdown is complete, the off-state page displays **Welcome — press power to begin**. Select the green power button to run the Power On preset. Do not repeatedly press power while a sequence is running.

### 10.5 Return to setup

Press and hold the setup control in the upper-left corner for approximately two seconds. A quick tap intentionally does nothing, which prevents an end user from leaving the room interface accidentally.

## 11. Settings, Privacy, and Security

Open **Set** to manage app-level configuration.

### Privacy & Security

Use **Privacy & Security** to review local data handling and manage security-related information. Depending on the current configuration, you can review or clear stored credentials and trusted SSH host keys.

### Driver catalog updates

Verified driver catalog updates are imported when a new bundled catalog snapshot ships with the app. Manual database-update tools are not needed during routine room setup. Use them only when specifically directed by CTRLbot support or release instructions, and review any warning shown before proceeding.

### Factory Reset

Use Factory Reset only when you intend to start the entire CTRLbot configuration over.

> **Warning:** Factory Reset deletes user-created connections, presets, switching setups, saved credentials, trusted host keys, and app settings. The bundled driver catalog is reinstalled. This action cannot be undone.

Before confirming, record any IP addresses, ports, labels, credentials, and custom sequences you will need to recreate.

## 12. Troubleshooting

### Activities or EUI is unavailable

**Cause:** No device connection has been saved.

**Resolution:** Add a driver, enter valid connection details, and connect successfully. The navigation options enable automatically after the first saved device.

### A device will not connect

Check the following in order:

1. The Android device is on the correct network.
2. The target device is powered and network control is enabled.
3. The IP address and port are correct.
4. The selected transport matches the device: TCP, Telnet, or SSH.
5. Authentication is enabled only when required, with the correct credentials.
6. A firewall or VLAN is not blocking the connection.
7. The correct driver model is selected.

### The connection succeeds, but commands do not work

1. Open the connection terminal.
2. Send a simple command directly.
3. Confirm ASCII versus HEX encoding.
4. Confirm the required CR, LF, or CRLF line ending.
5. Review the terminal for a device response or error.
6. Try the driver's full command list.
7. Confirm that the equipment is in a state where it accepts control commands.

### A device is missing from the Power On or Power Off preset

CTRLbot adds a device only when both discrete Power On and Power Off commands resolve. A toggle-only driver is intentionally excluded because the final state would be uncertain.

### There is no volume slider

A continuous slider requires a mapped Volume Set command. Devices with only Volume Up and Volume Down receive relative controls instead. Open **Activities → Audio** and review the mappings.

### A matrix route goes to the wrong output

1. Confirm the selected matrix driver and model.
2. Review the input and output numbering under **Activities → Switching**.
3. Test the input/output pair under **Connect → Test Device Drivers**.
4. Correct any label override that does not match the physical wiring.

### You cannot leave the EUI

Press and hold the upper-left setup control for approximately two seconds. Do not use a quick tap.

### Use Factory Reset as a last resort

Factory Reset is not a routine troubleshooting step. It removes the complete user configuration. Use it only when you intend to rebuild the room from first-run state.

## 13. Glossary

| Term | Meaning |
| --- | --- |
| **Activity** | A configuration area for Presets, Switching, or Audio. |
| **Command** | A device-specific instruction such as Power On, Input 1, or Volume Up. |
| **Connection** | A saved instance of a driver with an address, port, protocol, and optional credentials. |
| **Driver** | A profile containing the commands and capabilities for a device or model family. |
| **EUI** | End User Interface; the simplified full-screen room-control dashboard. |
| **IR** | Infrared control sent through an IR blaster. |
| **Many-to-many** | Matrix routing in which sources can be sent to several destinations. |
| **Many-to-one** | Switching in which several sources feed one display or projector. |
| **Preset** | An ordered sequence of commands, delays, and events. |
| **RS-232** | Serial device control, routed by CTRLbot through a network endpoint. |
| **Transport** | The communication method used by a connection, such as TCP, Telnet, or SSH. |

---

CTRLbot IoT is distributed for Android through the Google Play Store. Copyright © 2025 CTRLbot. All rights reserved.
