---
id: Play-Store-EUI-Promo-30
destination: play-store-preview
---

# CTRLbot IoT — the End User Interface, 30-second Play cut

> **This is the asset that goes to Google Play.** The 60-second master in
> [playStore_promo2.md](playStore_promo2.md) is the website and social cut and is not
> submitted anywhere.
>
> It has its own brief because it is its own edit. Measuring a 30-second file against
> the 60-second beat table is how `opens-composed` failed on a cut whose poster frame
> was fine — the gate sampled 3.7s in, looking for the opening beat, and found the
> beat after it.

## Watching

The same viewer as the master: an AV integrator, technician or IT admin who has rooms
that cost real money and still do not work, or work and are too complicated for anyone
to touch the panel. Here they are seeing it in a Play listing, muted, with no
guarantee that anything past the first ten seconds plays at all.

## Promise

**Anyone can walk up and run the room.**

Same promise as the master, on the same card, in the first four seconds.

## Beats

> Five, not the master's seven. See *What was cut* below.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| promise | The whole room, on one screen | `MasterControlCard` | Tricon and MASTER CONTROL composed at frame 0; the promise line streams in beneath them | 4 |
| route | Choosing a source is one tap | `TabletEuiManyToOne` | Display 1 sits grey and empty, then Input 1 turns blue and Display 1 fills with INPUT 1 in the same frame, as the bezel and both bars dissolve | 6 |
| matrix | Every source, every display, one screen | `TabletEui` | Four grey outputs; Input 1 lights and Output 2 takes it; Input 3 lights; All is pressed and all four outputs go blue on Input 3 | 11 |
| both | The app runs on a phone too, not only a tablet | `TabletEui` + `PhoneEuiManyToOne` | Tablet and phone side by side, static and native, routing to Input 1 on the same frame | 5 |
| close | It ends where the user found it | `EuiPowerCapture` then `MasterControlCard` | The red ring closes on powering off, then the frame resolves to MASTER CONTROL with ctrlbot.io and ctrlbot.ai | 4 |

Total **30.0s**, with the promise at 0s — inside Play's 10-second first-impression
window and inside its 30-second autoplay ceiling.

## What was cut, and why

Not compressed. Dropped, so that what survives keeps the length it needs.

| Cut | Was | Why |
|---|---|---|
| `wake` | 9s | The room booting is setup. A progress ring proves nothing about whether the room is easy to use, which is the only claim this cut makes. |
| `audio` | 8s | The one real casualty. Volume and mute on the same screen is a genuine benefit and it is not shown here — it stays in the 60. |
| `route`'s second copy block | — | The surface already says "one tap and it is there" by doing it. |
| `matrix`'s middle copy block | — | "Every output holds its own source" is the subtlest of the three claims and the one the grid demonstrates least loudly. |
| The Welcome hold in `close` | ~1.5s | At four seconds it reads as a flicker rather than as the room returning to rest. |

Everything else is the master's construction unchanged: the same beat components, the
same dissolves, the same copy. The pace is faster because the beats are shorter, not
because anything was sped up.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked

- [x] Built as `Play-Store-EUI-Promo-30` from the shared beat list in `src/marketing/eui-promo/euiPromoData.ts`.

## Review notes

## Contact sheet

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
