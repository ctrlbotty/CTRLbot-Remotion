// Scene 2 — CTRLbot AI, and where everything lives.
//
// This is the first thing the integrator sees after the splash, so it answers the two
// questions they actually have: what are my choices, and where do I go for help. The
// menu opens on CTRLbot, then drops away to reveal the FAQ underneath.
//
// It replaces the old privacy scene. The privacy notice is shown before this plays, so
// repeating it here would spend six seconds telling the viewer something they just read.

import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Camera, centerOf, frameWidth} from '../camera/Camera';
import {Callout, Spotlight} from '../camera/Annotations';
import {CtrlbotAi, aiRegions} from '../app-ui/CtrlbotAi';
import {PHONE_VIEWPORT} from '../app-ui/PhoneEui';
import {PhoneNavMenu, navRegions} from '../app-ui/PhoneNavMenu';
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, type Device} from './shared';

// A full-width sheet cannot be pushed into like a small control — 0.78 crops the icons
// off both edges. The menu beat is a gentle emphasis move, not a zoom.
const MENU_SHOT_WIDTH = 0.94;

/** The menu drops away here, revealing the suggestions behind it. */
const COLLAPSE_FRAME = 236;

export const CtrlbotIntro = ({device}: {device: Device}) => {
  const frame = useCurrentFrame();
  const viewport = PHONE_VIEWPORT;
  const expanded = frame < COLLAPSE_FRAME;

  // Suggestions reveal as the sheet clears them, rather than all at once.
  const visibleQuestions = expanded
    ? 2
    : Math.min(5, 2 + Math.floor((frame - COLLAPSE_FRAME) / 8));

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      <Camera
        contentSize={viewport}
        shots={[
          {at: 0, region: aiRegions.full},
          {at: 48, region: aiRegions.full},
          // Down to the menu while it is open, so the four choices are readable.
          {
            at: 124,
            region: frameWidth(
              {x: viewport.width / 2, y: centerOf(navRegions.expanded).y},
              viewport.width * MENU_SHOT_WIDTH,
            ),
          },
          {
            at: 208,
            region: frameWidth(
              {x: viewport.width / 2, y: centerOf(navRegions.expanded).y},
              viewport.width * MENU_SHOT_WIDTH,
            ),
          },
          // Back out as the sheet drops, to take in the whole FAQ.
          {at: 300, region: aiRegions.full},
          {at: 420, region: aiRegions.full},
        ]}
      >
        <CtrlbotAi promptFocused={!expanded} visibleQuestions={visibleQuestions} />
        <PhoneNavMenu expanded={expanded} active="ctrlbot" />

        <Sequence from={108} durationInFrames={116} layout="none" name="Isolate the menu">
          <Spotlight region={navRegions.expanded} appearAt={0} radius={0} />
        </Sequence>

        <Sequence from={316} durationInFrames={124} layout="none" name="Isolate the prompt">
          <Spotlight region={aiRegions.prompt} appearAt={0} radius={26} />
        </Sequence>
      </Camera>

      <Sequence from={12} durationInFrames={96} layout="none" name="Copy: where things live">
        <Callout
          eyebrow="Start here"
          title="Four places to work"
          body="CTRLbot for help, Device for drivers, Connect for connections, Set for everything else."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={112} durationInFrames={192} layout="none" name="Copy: ctrlbot ai">
        <Callout
          eyebrow="CTRLbot AI"
          title="The manual, built in"
          body="The full manual, an FAQ, and a troubleshooter for the room — without leaving the app."
          at={0}
          side={device === 'phone' ? 'top' : copySideFor(device)}
        />
      </Sequence>

      <Sequence from={312} durationInFrames={128} layout="none" name="Copy: ask">
        <Callout
          eyebrow="Stuck?"
          title="Ask it in plain language"
          body="Or pick one of the questions it already knows the answer to."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
