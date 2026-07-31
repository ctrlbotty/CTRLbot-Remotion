// Scene 2 — CTRLbot AI, and where everything lives.
//
// This is the first thing the integrator sees after the splash, so it answers the two
// questions they actually have: what are my choices, and where do I go for help.
//
// It replaces the old privacy scene. The privacy notice is shown before this plays, so
// repeating it here would spend six seconds telling the viewer something they just read.
//
// The two form factors tell the same story with different mechanics, because the app's
// navigation is genuinely different rather than merely rearranged:
//
//   phone   the menu is a sheet. It opens over the content, holds while the four
//           destinations are read, then drops away and reveals the FAQ behind it.
//   tablet  the rail is permanent. Nothing can drop away, so the camera does the work —
//           in on the rail for the four destinations, across to the mark and prompt, then
//           down the suggestion list.
//
// Copy and its timings are identical in both. Only the camera and the surface change.

import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Camera, centerOf, frameWidth} from '../camera/Camera';
import {Callout, Spotlight} from '../camera/Annotations';
import {CtrlbotAi, aiRegions} from '../app-ui/CtrlbotAi';
import {PhoneNavMenu, navRegions} from '../app-ui/PhoneNavMenu';
import {tabletNavRegions} from '../app-ui/TabletNavRail';
import {TABLET_VIEWPORT} from '../app-ui/viewports';
import {color} from '../design/theme';
import {copySideFor, viewportFor, wideShotWidth, type Device} from './shared';

// Keep more context than the other menu beats: this callout sits at the top, and the
// tighter 0.94 framing lifted the CTRLbot mark directly underneath its copy. The
// spotlight still carries the emphasis while every menu row remains readable.
const MENU_SHOT_WIDTH = 1.06;

/** The phone menu drops away here, revealing the suggestions behind it. */
const COLLAPSE_FRAME = 236;

/**
 * The tablet has no sheet to clear, so its suggestions populate as the camera pulls back
 * off the prompt. Same effect — the list arrives rather than having been there all along —
 * motivated by the move instead of by the menu. Timed so the first chips land inside the
 * prompt shot and the rest fill in as the wider content shot arrives; revealing earlier
 * put the whole thing below the framed area, where nobody would have seen it.
 */
const TABLET_REVEAL_FRAME = 296;

/**
 * When the menu spotlight runs. It has to bracket the camera's hold on the menu — light
 * something the camera has already moved away from and the frame just goes dark.
 */
const MENU_BEAT = {
  phone: {from: 108, duration: 116},
  tablet: {from: 72, duration: 96},
} as const;

/**
 * The two landscape shot widths, in content units.
 *
 * `CONTENT_SHOT` is asked for with its centre off the right edge of the surface, so the
 * clamp pins the frame's right edge to the content's — which pushes the centred mark,
 * prompt and suggestion list as far left in the frame as the surface allows. That is the
 * whole trick for getting centred content out from under the copy card.
 */
const RAIL_SHOT = TABLET_VIEWPORT.width * 0.72;
const CONTENT_SHOT = TABLET_VIEWPORT.width * wideShotWidth;

export const CtrlbotIntro = ({device}: {device: Device}) => {
  const frame = useCurrentFrame();
  const isPhone = device === 'phone';
  const viewport = viewportFor(device);
  const r = aiRegions(device);
  const expanded = frame < COLLAPSE_FRAME;

  // Suggestions reveal one at a time rather than all at once. Two are already behind the
  // phone's sheet when it lifts; the tablet starts from none.
  const revealFrom = isPhone ? COLLAPSE_FRAME : TABLET_REVEAL_FRAME;
  const initialQuestions = isPhone ? 2 : 0;
  const visibleQuestions =
    frame < revealFrom
      ? initialQuestions
      : Math.min(5, initialQuestions + Math.floor((frame - revealFrom) / 8));

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      <Camera
        contentSize={viewport}
        shots={
          isPhone
            ? [
                {at: 0, region: r.full},
                {at: 48, region: r.full},
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
                {at: 300, region: r.full},
                {at: 420, region: r.full},
              ]
            : [
                {at: 0, region: r.full},
                {at: 36, region: r.full},
                // In on the rail. The rail is against the left edge, so this is the one
                // beat in the scene where the clamp helps: ask to be centred on it and
                // the frame slides back inside the content, leaving the rail hard left
                // and well clear of the card.
                {at: 84, region: frameWidth({x: 0, y: 150}, RAIL_SHOT)},
                {at: 156, region: frameWidth({x: 0, y: 150}, RAIL_SHOT)},
                // Across to the mark and the prompt, which is what CTRLbot AI *is*.
                // Wide rather than close: the pill is 520dp of centred content, and no
                // tighter shot exists that keeps its text out from under the card.
                {at: 216, region: frameWidth({x: viewport.width, y: 300}, CONTENT_SHOT)},
                {at: 296, region: frameWidth({x: viewport.width, y: 300}, CONTENT_SHOT)},
                // Down to the list as it fills. Same width, so this is a tilt rather than
                // a zoom — the suggestions are the only thing that changed.
                {
                  at: 336,
                  region: frameWidth({x: viewport.width, y: centerOf(r.questions).y}, CONTENT_SHOT),
                },
                {
                  at: 420,
                  region: frameWidth({x: viewport.width, y: centerOf(r.questions).y}, CONTENT_SHOT),
                },
              ]
        }
      >
        {/* The tablet pill is white throughout — there is never a sheet over it, which
            is what the grey state means. */}
        <CtrlbotAi
          device={device}
          promptFocused={isPhone ? !expanded : true}
          visibleQuestions={visibleQuestions}
        />
        {isPhone ? <PhoneNavMenu expanded={expanded} active="ctrlbot" /> : null}

        <Sequence
          from={MENU_BEAT[device].from}
          durationInFrames={MENU_BEAT[device].duration}
          layout="none"
          name="Isolate the menu"
        >
          <Spotlight
            region={isPhone ? navRegions.expanded : tabletNavRegions.full}
            appearAt={0}
            radius={0}
          />
        </Sequence>

        <Sequence from={316} durationInFrames={104} layout="none" name="Isolate the prompt">
          <Spotlight region={r.prompt} appearAt={0} radius={26} />
        </Sequence>
      </Camera>

      <Sequence from={12} durationInFrames={96} layout="none" name="Copy: where things live">
        <Callout
          eyebrow="Start here"
          title="Four menus to start"
          body="CTRLbot for help, Device for drivers, Connect for your equipment, Set for everything else."
          at={0}
          side={isPhone ? 'top' : copySideFor(device)}
        />
      </Sequence>

      <Sequence from={112} durationInFrames={192} layout="none" name="Copy: ctrlbot ai">
        <Callout
          eyebrow="CTRLbot AI"
          title="The manual, built in"
          body="Setup help, FAQs and device troubleshooting — without leaving the app."
          at={0}
          side={isPhone ? 'top' : copySideFor(device)}
        />
      </Sequence>

      <Sequence from={312} durationInFrames={108} layout="none" name="Copy: ask">
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
