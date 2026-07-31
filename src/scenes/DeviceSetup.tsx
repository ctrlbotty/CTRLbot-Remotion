// Scene 3 — Device, where setup begins.
//
// Deliberately narrow: this is the menu, this is the catalog, this is how you add a
// device. Search and sort are named in the copy, because both controls are on screen for
// the whole scene and a viewer who cannot see how to find their own projector in a
// 124-driver list will stop watching — but neither is demonstrated. The driver detail
// sheet is left out entirely. The integrator needs the shortest path to a device on the
// list, not a tour of the filters.

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
import {tabletNavRegions} from '../app-ui/TabletNavRail';
import {color} from '../design/theme';
import {closeShotWidth, copySideFor, type Device as DeviceKind} from './shared';

// A full-width sheet cannot be pushed into like a small control — 0.78 crops the icons
// off both edges. The menu beat is a gentle emphasis move, not a zoom.
const MENU_SHOT_WIDTH = 0.94;

// The landscape equivalent. The rail is against the left edge, so asking to be centred
// on it lets clampToContent slide the frame back inside the content plane and leave the
// rail hard left — clear of the copy card without any offset arithmetic.
const RAIL_SHOT_WIDTH = 0.72;
const RAIL_SHOT_Y = 150;

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
  const isPhone = device === 'phone';
  const viewport = CATALOG_VIEWPORT[device];
  const r = catalogRegions(device);
  const expanded = frame < COLLAPSE_FRAME;

  // The menu beat, per form factor. The phone opens a sheet over the catalog; the tablet
  // rail is already on screen and permanent, so the camera and the spotlight carry it.
  const menuShot = isPhone
    ? frameWidth(
        {x: r.centreX, y: centerOf(navRegions.expanded).y},
        viewport.width * MENU_SHOT_WIDTH,
      )
    : frameWidth({x: 0, y: RAIL_SHOT_Y}, viewport.width * RAIL_SHOT_WIDTH);
  const menuRegion = isPhone ? navRegions.expanded : tabletNavRegions.full;
  const menuRow = isPhone ? navRegions.row(1) : tabletNavRegions.row('device');

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
          // The menu — the phone sheet while it is still open on Device, or the tablet
          // rail, which never closes.
          {at: 116, region: menuShot},
          {at: 176, region: menuShot},
          // Out to watch the catalog scroll.
          {at: 240, region: r.full},
          {at: 400, region: r.full},
          // In on the card being added — a small control at the right edge, so this
          // one frames on its own centre and lets the clamp keep it in shot.
          {at: 476, region: frameWidth(centerOf(scrolledAdd), viewport.width * closeShotWidth(device))},
          {at: 564, region: frameWidth(centerOf(scrolledAdd), viewport.width * closeShotWidth(device))},
          {at: 600, region: r.full},
        ]}
      >
        <div style={{translate: `0px ${scrollOffset}px`}}>
          <DriverCatalog device={device} drivers={DRIVERS} emphasizeTypes />
        </div>

        {isPhone ? <PhoneNavMenu expanded={expanded} active="device" /> : null}

        <Sequence from={96} durationInFrames={100} layout="none" name="Isolate the menu">
          <Spotlight region={menuRegion} appearAt={0} radius={0} />
          <FocusRing region={menuRow} appearAt={16} radius={0} name="Device row" />
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
          body="Every driver ships inside the app, ready to become a device in your room."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={224} durationInFrames={200} layout="none" name="Copy: browse">
        <Callout
          eyebrow="Browse"
          title="Find your equipment"
          body="Projectors, displays, switchers and end points. Search by manufacturer or model, or sort by type."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>

      <Sequence from={440} durationInFrames={160} layout="none" name="Copy: add">
        <Callout
          eyebrow="Add it"
          title="One tap to add a device"
          body="The + opens Configure Connection, ready to point at your real equipment."
          at={0}
          side={copySideFor(device)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
