---
id: Play-Store-EUI-Promo-V3
destination: play-store-preview-master
---

# CTRLbot IoT — the End User Interface (v3)

> The 60-second master — the website and social cut with anti-banding gradient and fixed tablet framing from Muntner ("Choose a source") onward.

## Watching

An AV integrator, technician or IT admin who already owns this problem. They have
rooms that cost real money and still do not work, or work and are so complicated that
nobody in the room will touch the panel.

## Promise

**Anyone can walk up and run the room.**

**Control that actually works and is easy to use.** closes the cut, on the same card.

## Beats

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| promise | The whole room, on one screen | `MasterControlCard` | Tricon and MASTER CONTROL already composed at frame 0; the promise line lands beneath them by 2s while the blue bloom drifts across the frame | 6 |
| wake | The room starts from the panel on the wall | `EuiPowerCapture` | Welcome / press power to begin, then the green ring closes around Please Wait While System is Powering On | 9 |
| route | Choosing a source is one tap | `TabletEuiManyToOne` | Display 1 sits grey and empty, then Input 1 turns blue and Display 1 fills with INPUT 1 in the same frame | 10 |
| matrix | Every source, every display, one screen | `TabletEui` | Four grey outputs; Input 1 lights and Output 2 takes it; Input 3 lights and Output 2 follows; All is pressed and all four outputs go blue on Input 3 | 14 |
| audio | Room volume is on that same screen, not a second remote | `TabletEui` | The yellow fill runs up the volume bar, then the speaker icon flips to muted — with the routing behind it untouched | 8 |
| both | The app runs on a phone too, not only a tablet | `TabletEui` + `PhoneEuiManyToOne` | Tablet matrix and portrait phone EUI live side by side, both routed and both legible — the phone is plainly a real interface, not a shrunken tablet | 7 |
| close | It ends where the user found it | `EuiPowerCapture` then `MasterControlCard` | The red ring closes on powering off, the panel lands back on Welcome, and the frame resolves to MASTER CONTROL | 6 |

Totals **60.0s**, with the promise at 0s.
