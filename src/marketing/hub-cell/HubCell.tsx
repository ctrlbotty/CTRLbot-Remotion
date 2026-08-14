// THE HUB — the device database as a 30-second, full-bleed ctrlbot.io media cell.
//
// This is a loop, not a cut. The site plays it silently beside HTML copy, so it carries
// no Stage, panel, gradient, product label, or copy column. The final beat returns the
// catalog to the same unselected, top-of-list state shown at frame 0.

import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {DriverCatalog, SETUP_BACKGROUND} from '../../app-ui/DriverCatalog';
import {
  Accordion,
  CommandCard,
  CommandsBar,
  ControlInfo,
  DeviceInfo,
  DriverDetail,
  ModelRow,
} from '../../app-ui/DriverDatabase';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {Camera, frameWidth, type Shot} from '../../camera/Camera';
import {color} from '../../design/theme';
import {
  EPSON_COMMANDS,
  EPSON_DESCRIPTION,
  EPSON_INDEX,
  EPSON_PORT,
  EPSON_SETUP,
  IP_DRIVERS,
  LINE_ENDING_OPTIONS,
  SORT_OPTIONS,
} from '../device-database/deviceDatabaseData';
import {BEATS, HUB_FRAMES, type BeatName} from './hubCellData';

export const hubCellDuration = HUB_FRAMES;

/** Provisional full-surface framing; the framing task supplies the final per-beat path. */
const FRAMING: Record<BeatName, {x: number; y: number; width: number}> = {
  library: {x: 640, y: 400, width: 1280},
  types: {x: 640, y: 400, width: 1280},
  manual: {x: 640, y: 400, width: 1280},
  connection: {x: 640, y: 400, width: 1280},
  api: {x: 640, y: 400, width: 1280},
  close: {x: 640, y: 400, width: 1280},
};

const BEAT_NAMES = Object.keys(BEATS) as BeatName[];
const CAMERA_SETTLE = 22;

/** Arrive at each beat's framing in 22 frames, then hold it through the beat. */
const SHOTS: Shot[] = BEAT_NAMES.flatMap((name) => {
  const beat = BEATS[name];
  const shot = FRAMING[name];
  const region = frameWidth({x: shot.x, y: shot.y}, shot.width);
  return [
    {at: beat.from === 0 ? 0 : beat.from + CAMERA_SETTLE, region},
    {at: beat.from + beat.duration, region},
  ];
});

const rise = (frame: number, at: number, distance = 14) => ({
  opacity: interpolate(frame, [at, at + 34], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  translate: interpolate(frame, [at, at + 42], [`0px ${distance}px`, '0px 0px'], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
});

const scroll = (local: number, window: number, from: number, to: number) =>
  interpolate(local, [0, window], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const fade = (frame: number, at: number, length = 14) =>
  interpolate(frame, [at, at + length], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Arrive = ({
  name,
  frame,
  at,
  distance,
  children,
}: {
  name: string;
  frame: number;
  at: number;
  distance?: number;
  children: ReactNode;
}) => (
  <Interactive.Div name={name} style={rise(frame, at, distance)}>
    {children}
  </Interactive.Div>
);

const LibraryBeat = ({frame}: {frame: number}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    listScroll={scroll(frame - BEATS.library.from, 160, 0, 156)}
  />
);

const TypesBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.types.from;
  return (
    <DriverCatalog
      device="tablet"
      drivers={IP_DRIVERS}
      background={SETUP_BACKGROUND}
      emphasizeTypes
      listScroll={156}
      openMenu={local >= 18 ? {control: 'sort', items: SORT_OPTIONS} : undefined}
    />
  );
};

const DetailBeat = ({scroll: paneScroll, children}: {scroll: number; children: ReactNode}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    selectedIndex={EPSON_INDEX}
    listScroll={702}
    detail={
      <DriverDetail title="EPSON Projectors" scroll={paneScroll}>
        {children}
      </DriverDetail>
    }
  />
);

const ManualBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.manual.from;
  return (
    <DetailBeat scroll={scroll(local, 150, -8, 146)}>
      <ModelRow model="PowerLite" />
      <Arrive name="Epson description" frame={local} at={0} distance={8}>
        <DeviceInfo>{EPSON_DESCRIPTION}</DeviceInfo>
      </Arrive>
      <Arrive name="Specs heading" frame={local} at={28} distance={8}>
        <Accordion label="Specs" />
      </Arrive>
      <Arrive name="Setup documentation" frame={local} at={42} distance={8}>
        <Accordion label="Setup" open>
          {EPSON_SETUP.map((paragraph, index) => (
            <Interactive.Div
              key={paragraph}
              name={`Setup paragraph ${index + 1}`}
              style={rise(local, 48 + index * 14, 8)}
            >
              {paragraph}
            </Interactive.Div>
          ))}
        </Accordion>
      </Arrive>
      <Arrive name="Support heading" frame={local} at={96} distance={8}>
        <Accordion label="Support" />
      </Arrive>
    </DetailBeat>
  );
};

const ConnectionBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.connection.from;
  return (
    <DetailBeat scroll={scroll(local, 120, -8, 30)}>
      <ControlInfo
        controlType="IP"
        ipType="TCP"
        port={EPSON_PORT}
        show={Math.min(6, Math.max(0, Math.floor((local - 6) / 14) + 1))}
      />
    </DetailBeat>
  );
};

const ApiBeat = ({frame}: {frame: number}) => {
  const local = frame - BEATS.api.from;
  return (
    <DetailBeat scroll={scroll(local, 120, -6, 34)}>
      <CommandsBar
        encoding="ASCII"
        lineEnding="CR (\r)"
        menu={local >= 72 ? LINE_ENDING_OPTIONS : undefined}
      />
      {EPSON_COMMANDS.slice(0, 3).map((command, index) => (
        <Interactive.Div
          key={command.key}
          name={`Command — ${command.key}`}
          style={rise(local, 6 + index * 18, 10)}
        >
          <CommandCard command={command} />
        </Interactive.Div>
      ))}
    </DetailBeat>
  );
};

const CloseBeat = ({frame}: {frame: number}) => (
  <DriverCatalog
    device="tablet"
    drivers={IP_DRIVERS}
    background={SETUP_BACKGROUND}
    listScroll={scroll(frame - BEATS.close.from, 72, 156, 0)}
  />
);

const SurfaceTrack = () => {
  const frame = useCurrentFrame();
  const beat = (() => {
    if (frame < BEATS.types.from) return <LibraryBeat frame={frame} />;
    if (frame < BEATS.manual.from) return <TypesBeat frame={frame} />;
    if (frame < BEATS.connection.from) return <ManualBeat frame={frame} />;
    if (frame < BEATS.api.from) return <ConnectionBeat frame={frame} />;
    if (frame < BEATS.close.from) return <ApiBeat frame={frame} />;
    return <CloseBeat frame={frame} />;
  })();

  const boundaries = BEAT_NAMES.slice(1).map((name) => BEATS[name].from);
  const nearest = boundaries.filter((boundary) => frame >= boundary).pop();

  return <div style={{opacity: nearest === undefined ? 1 : fade(frame, nearest)}}>{beat}</div>;
};

export const HubCell = () => (
  <AbsoluteFill style={{backgroundColor: color.void}}>
    <Camera
      contentSize={TABLET_VIEWPORT}
      shots={SHOTS}
      viewport={{width: 1920, height: 1200}}
    >
      <SurfaceTrack />
    </Camera>
  </AbsoluteFill>
);
