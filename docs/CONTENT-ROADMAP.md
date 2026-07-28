# CTRLbot training content roadmap

The first content set should teach the current V1 workflow in the same order an integrator encounters it. Short product pieces can be derived from the same modules.

## Foundation series

| # | Working title | Audience outcome | Target length | Primary visual |
|---:|---|---|---:|---|
| 00 | CTRLbot in 60 seconds | Understand the Driver → Connection → Activity → EUI model | 0:52 | `CTRLbot-Overview` |
| 01 | Build your first CTRLbot system | Complete the full happy path | 0:49 | `getting-started.json` |
| 02 | Find the right device driver | Search, filter, verify model and commands | 2–3 min | Driver catalog + real capture |
| 03 | Create and test a connection | Configure protocol, address, port, and auth safely | 3–4 min | Connection form + terminal |
| 04 | Use device remotes | Select a saved device and send common controls | 2–3 min | Remotes + display/projector controls |
| 05 | Build reliable presets | Order commands and delays; test known-state power | 4–5 min | Preset builder |
| 06 | Configure many-to-one switching | Map sources to a single destination | 3–4 min | Switching setup |
| 07 | Configure a matrix switcher | Label and route many-to-many inputs and outputs | 4–5 min | Matrix animation + capture |
| 08 | Configure room audio | Choose the control device, map volume/mute, test | 3–4 min | Audio Setup |
| 09 | Hand off the End User Interface | Operate the room and safely return to Setup | 3–4 min | EUI |
| 10 | Connection security and troubleshooting | Understand Telnet warning, SSH trust, and safe credentials | 4–6 min | Terminal + decision graphics |

## Release-sensitive exclusions

Keep these out of the V1 foundation series until their app behavior is released and verified:

- EndPoint encoder/decoder mode: code and tables remain, but the selector is currently hidden and the feature is deferred.
- Standalone DSP-specific training: standalone DSP drivers are deferred; current Audio guidance should focus on supported display/projector volume commands and DSP-capable switchers.
- Discovery workflows: the sidebar entry is currently hidden.

## Reusable cut-downs

Each long lesson should also yield:

- a 10–20 second vertical feature short;
- a silent looping UI moment for the website;
- a 16:9 thumbnail;
- a three-step support clip with captions;
- an internal release-note animation when the workflow changes.

## Script template

Use this structure for every lesson:

1. **Outcome (5–10s):** “By the end, you’ll be able to…”
2. **Context (10–20s):** where the task sits in the CTRLbot system.
3. **Demonstration:** one chapter per app surface.
4. **Verification:** show the response or final state that proves success.
5. **Safety note:** only when relevant—credentials, Telnet, power state, destructive database actions.
6. **Recap (10–20s):** repeat the learner outcome and point to the next lesson.

## Production priority

1. Record accurate demo data and Android captures for lessons 02–05.
2. Record one approved narrator voice and normalize an audio preset.
3. Render lesson 01 as the visual and editorial pilot.
4. Review terminology against the current app build.
5. Publish lessons 00–05, then build switching/audio/EUI modules from learner feedback.
