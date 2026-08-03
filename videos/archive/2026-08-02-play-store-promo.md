---
id: Play-Store-Promo
destination: play-store-preview
---

# CTRLbot IoT — Play Store preview

## Watching

An AV installer, integrator or technician browsing the Play Store who has not heard
of CTRLbot. They already know what a control system is, and they assume it means a
dedicated processor, a programmer with a laptop, and a separate touch panel. They do
not know that the Android device in their hand can be the control system itself.

## Promise

> One sentence. If it needs an "and", it is two videos.

A compatible Android tablet is the whole AV control system — no separate control
processor.

## Beats

> The End User Interface is the hero and every beat is on it. Setup is told, never
> shown — see *Anything unusual*.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| promise | This is what the room runs on | `TabletEui` | EUI at rest: four outputs live and labelled, room audio along the bottom, not one setup control anywhere on screen | 3.5 |
| route | Switching a source is one tap | `TabletEui` | Input 3 turns blue and Output 2 fills with Input 3 in the same frame | 4 |
| all | One control routes every display at once | `TabletEui` | All is pressed, and all four outputs take Input 3 together | 3.5 |
| audio | Room volume and mute are on the same screen | `TabletEui` | The volume bar is dragged and the speaker mutes, without leaving the interface | 4.5 |
| power | The whole room powers down from one control | `TabletEui` then `EuiPowerCapture` | Power is pressed on the live EUI and the room moves into its powering-off state | 4.5 |
| both | The same room, on a phone | `TabletEui` + `PhoneEui` | Both live side by side, each routed differently — the phone is plainly not mirroring the tablet | 4 |
| close | The name, once | `BrandCard` | CTRLbot wordmark and ctrlbot.io | 2 |

## Anything unusual

**No setup surface appears anywhere in this cut.** `DriverCatalog` and
`ConnectionPanel` are removed. This is submitted to Google alongside the app, and
those two are the only surfaces that would put a third-party manufacturer name and
model number on screen — cutting them removes that question entirely rather than
managing it. It is also the better promo: the EUI is the part worth showing.

**Tell the setup, do not show it.** The copy may say the room was configured on the
same device, and `promise` should make the absence of setup controls the point — what
the client is handed has nothing on it but the room. No beat demonstrates
configuration.

**`both` needs a two-panel layout that does not exist yet.** `Stage` holds a single
panel. This beat needs a variant carrying a tablet and a phone at once, and it is the
one genuinely new piece of construction in the cut — treat it as its own task, not as
a variation on an existing beat.

*The risk in it is legibility:* at full panel height the tablet is 960px wide and the
phone only about 277px, and phone EUI labels will not read at 1080p that small. If
both cannot be legible together, favour the phone — a phone too small to read proves
nothing, whereas the tablet is already established by five preceding beats and can
afford to be cropped to its routing grid. The contact sheet settles this.

**Routing must differ between the two panels** so "working independently" is visible
rather than asserted. Mirrored surfaces read as one screenshot duplicated.

**Network detail is fictional and private-range.** Nothing that identifies a real
site. This is easy here — no connection surface appears.

**26 seconds, deliberately under the 30s ceiling.** Play only autoplays the first 30,
and shorter is better. There is 4s of headroom: if a beat needs more room, take it
from the headroom rather than from `promise`, which has to land inside the first 10s.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Verification

Every claim above was checked against `../CTRLbot-IoT/app/src/main/res` on 2026-08-02:

| Claim | Evidence in the app |
|---|---|
| EUI is bar + switching + audio only | `layout-land/_end_ui.xml` (90dp bar, exit left, power right), `layout-port/_end_ui.xml` (56dp header) — no setup control in either |
| One tap moves a source | `drawable/source_button_selector.xml` — blue when selected |
| All routes every display | `values/strings.xml:125` `cd_route_all` = "Route to All Displays"; present in `layout/av_switch_nx4.xml`, `av_switch_nxo.xml` **and** `layout-port/` — the phone has it too |
| Room audio in the EUI | `layout/control_volume.xml` and `layout-port/control_volume.xml`; EUI seekbar in both `_end_ui.xml` |
| Whole-room power | power control right in the bar; `dialog_power_off.xml`, `dialog_power_on.xml` |
| Phone runs the same matrix | both surfaces derive from `av_switch_nxo.xml` — the phone is the same topology, not a cut-down one |

**One claim was corrected during verification.** A draft line read "powers down every
device in the room." `AGENTS.md` records that toggle-only devices do not join the
system power presets, so "every device" is false. The copy now says the room's Power
Off preset, which is what actually runs.

## Copy

Drafted, and paced against the measured house rate — the fastest block below is 5.7
w/s, against a 9.5 w/s warning threshold and a 12 w/s ceiling.

| Beat | Eyebrow | Title | Body |
|---|---|---|---|
| promise | End User Interface | The room, on one screen | Configured on this tablet, then handed over. No separate control processor. |
| route | Switching | One tap moves a source | Pick an input; the display follows. |
| all | Route to all | Every display at once | One control sends the same source to the whole room. |
| audio | Audio | Volume and mute, right there | Room audio is on the same screen as the routing. |
| power | Power | The whole room, off | One control runs the room's Power Off preset. |
| both | Phone and tablet | Same room, either device | Each runs the room on its own — not a mirrored screen. |
| close | — | CTRLbot IoT | kicker: ctrlbot.io |

## Shot lists

**Hard cuts, no `TransitionSeries`.** Overlapping transitions would make the
composition shorter than the beats table, and the contact sheet derives its frame
numbers from that table — so every still would be sampled in the wrong place. Plain
`<Sequence from durationInFrames>` keeps frame arithmetic exact by construction, and
a 4s-per-beat promo wants hard cuts anyway.

The panel is aspect-matched to the surface (both 16:10), so a full shot fits exactly
and any push crops all four edges. That is acceptable here — this is a promo, not
training — but keep pushes at 0.94 or wider on any beat where corner chrome matters,
and never push on a beat whose subject is the exit or power control unless the clamp
is working for you.

All regions come from `TABLET_EUI_REGIONS` / `EUI_REGIONS`; none are estimated.

| Beat | Frames | Camera | State |
|---|---|---|---|
| promise | 0–120 | open tight on `outputGrid` at 0.62, hold to 20, pull out to `full` by 100, hold | routed and at rest throughout — the reveal is the shot |
| route | 120–210 | locked on `full` | Input 3 selected at frame 32; Output 2 takes Input 3 in the same frame — hold both in one shot and let the interface do it |
| all | 210–300 | locked on `full` | `FocusRing` + `TapIndicator` on `routeAll` at 18; the four `outputCell` take Input 3 staggered from 40 |
| audio | 300–420 | locked on `full`, `Spotlight` on the audio strip | volume dragged 0.55→0.78 across 45–75; `speakerControl` mutes at 95 |
| power | 420–540 | locked on `full`, `Spotlight` on the power control | tap at 38, then swap to `EuiPowerCapture state="powering-off"` at 50 |
| both | 540–630 | locked, both panels | tablet holds its routing; **the phone reroutes twice on its own, at 30 and 62** — independence demonstrated, not asserted |
| close | 630–690 | locked | wordmark fades up over 0–18 |

`all` is the only beat that gets an annotation. Everywhere else the app's own state
change tells the story, and a ring on top would only compete with it — the same
judgement `EuiHandoff.tsx` already makes.

## Tasks

- [ ] T1: Make `video-lint` walk the scope directories recursively so nested marketing scenes cannot silently escape the gate — files: `scripts/video-lint.mjs`
- [ ] T2: Add `DualStage` — a centred title over a tablet and a phone panel side by side, phone sized for legibility first — files: `src/marketing/DualStage.tsx`
- [ ] T3: Add `PromoPromise` and register `Promo-Promise` at 1920x1080x120 — files: `src/marketing/PromoPromise.tsx`, `src/Root.tsx`
- [ ] T4: Add `PromoRoute` and register `Promo-Route` at 1920x1080x120 — files: `src/marketing/PromoRoute.tsx`, `src/Root.tsx`
- [ ] T5: Add `PromoAll` and register `Promo-All` at 1920x1080x120 — files: `src/marketing/PromoAll.tsx`, `src/Root.tsx`
- [ ] T6: Add `PromoAudio` and register `Promo-Audio` at 1920x1080x120 — files: `src/marketing/PromoAudio.tsx`, `src/Root.tsx`
- [ ] T7: Add `PromoPower` and register `Promo-Power` at 1920x1080x120 — files: `src/marketing/PromoPower.tsx`, `src/Root.tsx`
- [ ] T8: Add `PromoBoth` using `DualStage` and register `Promo-Both` at 1920x1080x120 — files: `src/marketing/PromoBoth.tsx`, `src/Root.tsx`
- [ ] T9: Add `PromoClose` and register `Promo-Close` at 1920x1080x60 — files: `src/marketing/PromoClose.tsx`, `src/Root.tsx`
- [ ] T10: Assemble the seven beats as hard-cut `<Sequence>`s in `PlayStorePromo` and register `Play-Store-Promo` at 1920x1080x780 — files: `src/compositions/PlayStorePromo.tsx`, `src/Root.tsx`

Each beat is registered on its own so it can be rendered and looked at before the cut
exists. T1 first because without it every file T3–T9 adds could sit outside the
linter and nobody would be told.

## Notes for the implementer

**Copy is written. Do not rewrite it.** The table above is paced and checked against
the destination's banned phrases. If a line does not fit the layout, report it rather
than shortening it.

**`DualStage` sizing is a starting point, not a specification:** tablet panel height
560 (→ 896 wide, 0.7x), phone panel height 880 (→ ~406 wide, 1.13x), 72px gap,
centred as a pair, title above. Phone legibility wins if the pair does not fit — the
tablet is established by five preceding beats and can be cropped to its routing grid.

**Watch the inert-fraction gate.** Seven mostly-locked shots is exactly the shape
that trips it, which is why `promise` opens with a pull-out and `audio` and `power`
carry real camera moves. If the render gate reports over 60% inert, the fix is more
motion inside beats, not a shorter cut.

## Review notes

## Contact sheet

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
