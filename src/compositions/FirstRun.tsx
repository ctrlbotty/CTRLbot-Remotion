// The first-run walkthrough, assembled.
//
// Silent and caption-led: understandable with the sound off, because that is how it
// plays embedded in docs and on social. Scene lengths are sized from reading speed,
// not from how long the animation happens to take.
//
// One composition serves both cuts. The scenes take a `device` and pick their own
// surfaces, framing and copy placement from it, so the phone and tablet stay in step —
// a copy change lands in both without being applied twice.

import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {AbsoluteFill} from 'remotion';
import {BrandCard} from '../scenes/BrandCard';
import {BuildRoom} from '../scenes/BuildRoom';
import {ConnectAndTest} from '../scenes/ConnectAndTest';
import {EuiHandoff} from '../scenes/EuiHandoff';
import {CtrlbotIntro} from '../scenes/CtrlbotIntro';
import {DeviceSetup} from '../scenes/DeviceSetup';
import {color} from '../design/theme';
import {SCENE_FRAMES, TRANSITION_FRAMES, type Device} from '../scenes/shared';

/**
 * Transitions overlap the scenes they join, so the cut is shorter than the sum of its
 * parts by one transition per join.
 */
export const firstRunDuration = () => {
  const scenes = Object.values(SCENE_FRAMES).reduce((total, frames) => total + frames, 0);
  const joins = Object.keys(SCENE_FRAMES).length - 1;
  return scenes - joins * TRANSITION_FRAMES;
};

// Transitions are written out in full rather than wrapped in a helper: TransitionSeries
// matches its children by component identity, so a <Cut /> wrapper is rejected at render
// time.
//
// Durations come from SCENE_FRAMES rather than inline literals. Remotion's guidance is to
// inline them so Studio can trim a scene by dragging — but they were duplicated here and
// in firstRunDuration(), one copy was updated and the other was not, and the cut shipped
// with every scene truncated to half its length while the composition still claimed the
// full duration. One source of truth is worth more than drag-to-trim; retime a scene in
// SCENE_FRAMES, or in its own Scene-* composition.
export const FirstRun = ({device}: {device: Device}) => (
  <AbsoluteFill style={{backgroundColor: color.void}}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.open} name="Open">
        <BrandCard
          device={device}
          eyebrow="Quick start"
          headline="Control your first room"
          subhead="No processor, no laptop, no software. So easy. Program it with your thumbs."
          kicker={device === 'phone' ? 'Phone · 2 minutes' : 'Tablet · 2 minutes'}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.ctrlbot} name="CTRLbot">
        <CtrlbotIntro device={device} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.device} name="Device">
        <DeviceSetup device={device} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.connect} name="Connect and test">
        <ConnectAndTest device={device} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.buildRoom} name="Build the room">
        <BuildRoom device={device} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.euiHandoff} name="Hand off the EUI">
        <EuiHandoff device={device} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.close} name="Close">
        <BrandCard
          device={device}
          headline="Your room is ready"
          subhead="Configure it, test it, hand it over — with the setup tucked out of the way."
          kicker="ctrlbot.io"
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
