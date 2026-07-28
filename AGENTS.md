# CTRLbot Remotion — Contributor Context

This repository is the programmatic motion-design and training-video companion to `../CTRLbot-IoT`.

## Commands

```bash
npm install
npm run dev
npm run check
npm run render:overview
npm run render:lesson
```

## Rules

- Keep all animation deterministic and driven by `useCurrentFrame()`.
- Do not use CSS transitions, CSS keyframes, timers, or random values without a fixed seed.
- Reuse the components in `src/components` and tokens in `src/design/theme.ts`.
- Keep render props JSON-serializable and validate public compositions with Zod.
- Keep app terminology aligned with `../CTRLbot-IoT/AGENTS.md`, Android resources, and current product behavior.
- Put replaceable render inputs in `props/`; put media imported with `staticFile()` in `public/`.
- Run `npm run check` after changes and render a still or short clip when visual layout changes.

## Composition families

- `CTRLbot-Overview`: polished product overview and design-system reference.
- `CTRLbot-Training-Lesson`: data-driven, variable-duration lesson.
- `CTRLbot-Feature-Short`: vertical social/product teaser.
- `CTRLbot-Thumbnail`: 16:9 cover still.
