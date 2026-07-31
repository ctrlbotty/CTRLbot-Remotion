// Scene 5 — Activities: Presets, Switching, Audio.
//
// The scene exists to do one thing: show the three tabs under Activities, show each one
// being selected, and show what each one looks like. Nothing else belongs here. An
// earlier pass leaned on a capture called `switching-preview.png` on tablet — which turns
// out to be Connect > Test Device Drivers, not Activities > Switching — and the cut
// doubled back to a Connect screen in the middle of the Activities beat. Check what a
// capture actually contains before mapping it; the filename is not the screen.
//
// Captures rather than live rebuilds. This scene establishes that Activities exists and
// what lives under it; it teaches no individual control, so there is nothing for a live
// surface to animate that a ring on the tab and a slow push cannot carry.

import type {ReactNode} from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Camera, centerOf} from '../camera/Camera';
import {Callout, FocusRing, TapIndicator} from '../camera/Annotations';
import {ActivitiesSwitching, activityTabRegion} from '../app-ui/ActivitiesSwitching';
import {CapturedScreen} from '../app-ui/CapturedScreen';
import {color} from '../design/theme';
import {SCENE_FRAMES, copySideFor, viewportFor, type Device} from './shared';

/**
 * One panel per Activities tab, always left to right in the app's own tab order.
 *
 * A panel is either a capture or a live surface. Tablet's Switching entry is live because
 * there is no tablet screenshot of that tab — see ActivitiesSwitching.tsx. Swap it for
 * `{capture: 'switching.png'}` the moment one exists; nothing else changes.
 */
type Panel =
  | {tab: string; tabIndex: number; capture: string; surface?: never}
  | {tab: string; tabIndex: number; capture?: never; surface: () => ReactNode};

const PANELS: Record<Device, Panel[]> = {
  phone: [
    {tab: 'Presets', tabIndex: 0, capture: 'presets.png'},
    {tab: 'Switching', tabIndex: 1, capture: 'switching.png'},
    {tab: 'Audio', tabIndex: 2, capture: 'audio.png'},
  ],
  tablet: [
    {tab: 'Presets', tabIndex: 0, capture: 'presets.png'},
    {tab: 'Switching', tabIndex: 1, surface: () => <ActivitiesSwitching />},
    {tab: 'Audio', tabIndex: 2, capture: 'audio.png'},
  ],
};

/** How long the tab stays ringed before the panel is left to be read. */
const SELECT_FRAMES = 54;

/**
 * One tab selected, then its panel.
 *
 * The camera is locked off, and it has to be. This scene is about the tab strip and the
 * setup menu beside it, and in a frame whose aspect matches the surface's — which is what
 * 1920x1200 against 1280x800 is — *any* push crops all four edges at once. The previous
 * 0.9 push cut the rail off the left, the tab strip off the top, and the run/copy/delete
 * icons off the right of every preset row. The tab ring and the tap carry the motion
 * instead; there is nothing else on these screens that moving the camera would reveal.
 */
const Panel = ({device, panel}: {device: Device; panel: Panel}) => {
  const viewport = viewportFor(device);
  const tab = activityTabRegion(device, panel.tabIndex);

  return (
    <Camera
      contentSize={viewport}
      shots={[{at: 0, region: {x: 0, y: 0, width: viewport.width, height: viewport.height}}]}
    >
      {panel.capture === undefined ? (
        panel.surface()
      ) : (
        <CapturedScreen device={device} src={`captures/${device}/${panel.capture}`} />
      )}

      <Sequence from={0} durationInFrames={SELECT_FRAMES} layout="none" name="Select the tab">
        <FocusRing region={tab} appearAt={0} radius={4} name="Tab ring" />
        <TapIndicator x={centerOf(tab).x} y={centerOf(tab).y} at={10} name="Tab tap" />
      </Sequence>
    </Camera>
  );
};

export const BuildRoom = ({device}: {device: Device}) => {
  const panels = PANELS[device];
  // Split the scene evenly however many panels this form factor has, so the two cuts
  // stay the same length while showing a different number of tabs.
  const panelFrames = Math.floor(SCENE_FRAMES.buildRoom / panels.length);

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      {panels.map((panel, index) => (
        <Sequence
          key={panel.tab}
          from={index * panelFrames}
          durationInFrames={
            index === panels.length - 1
              ? SCENE_FRAMES.buildRoom - index * panelFrames
              : panelFrames
          }
          name={panel.tab}
        >
          <Panel device={device} panel={panel} />
        </Sequence>
      ))}

      {/* No tab strip drawn here. The captures already carry the app's own
          Presets / Switching / Audio tabs, and overlaying a second set on top of them
          reads as a rendering fault rather than a wayfinding aid — which is why the
          selection is a ring on the real tab instead. */}

      {/* The caution rides the same callout as a footnote, appearing late so the beat
          lands on testing rather than on the tour. It used to be positioned on its own
          at a fixed `top` and printed across the captures' Presets/Switching/Audio tab
          strip. */}
      <Sequence from={16} durationInFrames={504} layout="none" name="Copy: activities">
        <Callout
          eyebrow="Activities"
          title="Build the room"
          body="Presets, switching and room audio: auto-generated from your devices, and tweaked by you."
          footnote="Test against the real equipment before you hand the room over."
          footnoteAt={364}
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
