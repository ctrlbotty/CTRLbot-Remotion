---
id: play-store-promo
destination: play-store-preview
---

# CTRLbot IoT — Play Store preview

> Copy this file to `videos/<slug>.md` and replace the content. The example below is a
> real, valid brief — leave it in place while you read, then overwrite it.
>
> Only three things are yours to write: **who is watching**, **the one promise**, and
> **the beats**. Voice, reading pace, the truth sources every claim is checked against,
> and the standing CTRLbot prohibitions are constant across every video and live in
> `docs/VIDEO_WORKFLOW.md`, not here.
>
> Then `/video-prep <slug>` writes the task list below the line.

## Watching

An AV integrator or facilities lead browsing the Play Store who has never heard of
CTRLbot. They assume room control means a processor, a programmer and a truck roll.
They do not know that a tablet on its own can be the control system.

## Promise

> One sentence. If it needs an "and", it is two videos.

Turn a phone or tablet into the whole room control system — no processor, no laptop,
no programmer.

## Beats

> Order is cut order. Machine-parsed by column name — keep the header row exact.
>
> **Evidence is the load-bearing column.** It is the specific on-screen state change the
> viewer sees, and it is what the verifier holds the rendered still against. A beat whose
> evidence you cannot write in one concrete sentence is a title card, and title cards are
> what slop is made of.
>
> `surface` is a live component from `src/app-ui/`. A capture path is allowed only with a
> one-line reason in *Anything unusual* for why live is impossible.
>
> Seconds must sum to within the destination's window, and the promise must land inside
> its first-impression window. `npm run video:frames -- <slug> validate` checks both in
> about a second, before anything renders.

| id | Claim | Surface | Evidence | Sec |
|----|-------|---------|----------|-----|
| promise | The room runs from the tablet in your hand | `TabletEui` | EUI at rest, four outputs live, no setup chrome anywhere | 4 |
| route | Switching a source is one tap | `TabletEui` | Input 3 goes blue and Output 2 fills with Input 3 in the same frame | 5 |
| all | One control routes every display at once | `TabletEui` | All is pressed; all four outputs take Input 3 | 4 |
| build | You build it on the device, with your thumbs | `DriverCatalog` | Catalog scrolls, a device is picked, the connection test goes green | 8 |
| handoff | What you hand over is not what you configured with | `TabletEui` | Setup rail is gone; the tools icon is held for two seconds | 5 |
| close | The name, once, at the end | `BrandCard` | CTRLbot wordmark and ctrlbot.io | 4 |

## Anything unusual

> Optional. Overrides, a specific must-show, a panel size, something to avoid.
> Empty is fine — and usually correct.

---
<!-- /video-prep writes below this line. Nothing above it is an agent's to edit. -->

## Tasks

> Machine-parsed — keep exact.
> `- [ ]` pending · `- [x]` verified and committed · `- [!]` blocked

## Review notes

> Appended on PASS WITH NOTES. Not blockers; check these during the contact sheet review.

## Contact sheet

> `npm run video:frames -- <slug> contact` renders one still per beat and tiles them.
> Mark each ✅ / ❌ against its evidence line. Every ❌ becomes a new task above.

| Beat | Reads correctly with the sound off? | Notes |
|------|-------------------------------------|-------|
