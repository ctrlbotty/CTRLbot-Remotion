// Scene 3 — Device, where setup begins.
//
// Deliberately narrow: this is the menu, this is the catalog, this is how you add a
// device. Search, sort and the driver detail sheet are all real features, and none of
// them belong in a quick start — the integrator needs the shortest path to a device on
// the list, not a tour of the filters.

import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Camera, centerOf, frameWidth} from '../camera/Camera';
import {Callout, FocusRing, Spotlight, TapIndicator} from '../camera/Annotations';
import {
  CATALOG_VIEWPORT,
  DriverCatalog,
  catalogRegions,
  type DriverEntry,
} from '../app-ui/DriverCatalog';
import {PhoneNavMenu, navRegions} from '../app-ui/PhoneNavMenu';
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, type Device as DeviceKind} from './shared';

// A full-width sheet cannot be pushed into like a small control — 0.78 crops the icons
// off both edges. The menu beat is a gentle emphasis move, not a zoom.
const MENU_SHOT_WIDTH = 0.94;

/** The bundled catalog, in the order the app lists it. */
const DRIVERS: DriverEntry[] = [
  {manufacturer: 'ACER', model: 'XL2320P', deviceType: 'projector'},
  {manufacturer: 'AVPRO EDGE', model: 'AC-MX-44', deviceType: 'switcher'},
  {manufacturer: 'BARCO', model: 'F80-4K12', deviceType: 'projector'},
  {manufacturer: 'BENQ', model: 'LU895UST', deviceType: 'projector'},
  {manufacturer: 'BLUSTREAM', model: 'CMX44CS', deviceType: 'switcher'},
  {manufacturer: 'CANON', model: 'WUX7000Z', deviceType: 'projector'},
  {manufacturer: 'CHRISTIE', model: 'FHD551', deviceType: 'display'},
  {manufacturer: 'EPSON', model: 'PowerLite L630U', deviceType: 'projector'},
  {manufacturer: 'EXTRON', model: 'DXP 1616', deviceType: 'switcher'},
  {manufacturer: 'GLOBAL CACHE', model: 'iTach IP2SL', deviceType: 'endPoint'},
];

const COLLAPSE_FRAME = 192;
const SCROLL_START = 232;
const SCROLL_END = 392;
/** Cards scrolled past, in card pitches. */
const SCROLL_CARDS = 3;

export const DeviceSetup = ({device}: {device: DeviceKind}) => {
  const frame = useCurrentFrame();
  const viewport = CATALOG_VIEWPORT[device];
  const r = catalogRegions(device);
  const expanded = frame < COLLAPSE_FRAME;

  // Pitch between cards, taken from the regions rather than re-derived.
  const cardPitch = r.card(1).y - r.card(0).y;
  const scrollOffset = interpolate(
    frame,
    [SCROLL_START, SCROLL_END],
    [0, -cardPitch * SCROLL_CARDS],
    {
      easing: Easing.bezier(0.65, 0, 0.35, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // The card that ends up under the camera after the scroll settles.
  const targetIndex = SCROLL_CARDS;
  const targetCard = r.card(targetIndex);
  const targetAdd = r.addButton(targetIndex);
  /** Where that card sits on screen once the list has moved. */
  const scrolledCard = {...targetCard, y: targetCard.y + scrollOffset};
  const scrolledAdd = {...targetAdd, y: targetAdd.y + scrollOffset};

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      <Camera
        contentSize={viewport}
        shots={[
          {at: 0, region: r.full},
          {at: 44, region: r.full},
          // The menu, while it is still open on Device.
          {
            at: 116,
            region: frameWidth(
              {x: r.centreX, y: centerOf(navRegions.expanded).y},
              viewport.width * MENU_SHOT_WIDTH,
            ),
          },
          {
            at: 176,
            region: frameWidth(
              {x: r.centreX, y: centerOf(navRegions.expanded).y},
              viewport.width * MENU_SHOT_WIDTH,
            ),
          },
          // Out to watch the catalog scroll.
          {at: 240, region: r.full},
          {at: 400, region: r.full},
          // In on the card being added — a small control at the right edge, so this
          // one frames on its own centre and lets the clamp keep it in shot.
          {at: 476, region: frameWidth(centerOf(scrolledAdd), viewport.width * closeShotWidth(device))},
          {at: 564, region: frameWidth(centerOf(scrolledAdd), viewport.width * closeShotWidth(device))},
          {at: 620, region: r.full},
        ]}
      >
        <div style={{translate: `0px ${scrollOffset}px`}}>
          <DriverCatalog device={device} drivers={DRIVERS} emphasizeTypes />
        </div>

        {device === 'phone' ? <PhoneNavMenu expanded={expanded} active="device" /> : null}

        <Sequence from={96} durationInFrames={100} layout="none" name="Isolate the menu">
          <Spotlight region={navRegions.expanded} appearAt={0} radius={0} />
          <FocusRing region={navRegions.row(1)} appearAt={16} radius={0} name="Device row" />
        </Sequence>

        <Sequence from={448} durationInFrames={144} layout="none" name="Add the device">
          <Spotlight region={scrolledCard} appearAt={0} radius={5} />
          <FocusRing region={scrolledAdd} appearAt={20} radius={20} name="Add ring" />
          <TapIndicator
            x={centerOf(scrolledAdd).x}
            y={centerOf(scrolledAdd).y}
            at={44}
            name="Add tap"
          />
        </Sequence>
      </Camera>

      <Sequence from={8} durationInFrames={92} layout="none" name="Copy: device">
        <Callout
          eyebrow="Device"
          title="Setup starts here"
          body="Every driver the app ships with, ready to become a device in your room."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={224} durationInFrames={200} layout="none" name="Copy: browse">
        <Callout
          eyebrow="Browse"
          title="Find your equipment"
          body="Projectors, displays, switchers and end points, colour-coded by type."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={440} durationInFrames={180} layout="none" name="Copy: add">
        <Callout
          eyebrow="Add it"
          title="One tap to add a device"
          body="Add a device to set up the connection for control."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
