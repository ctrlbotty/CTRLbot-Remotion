// W05's beats: each renders one tablet surface at its natural 1280x800 dp, and changes it on
// the spoken cues in CUE_FRAMES. Frames are beat-local; a cue is its absolute frame minus the
// beat's start. Built on W04's IotTabletBeats.tsx, never imported from it.
import React from 'react';
import {Easing, interpolate, Sequence, staticFile} from 'remotion';
import {Video} from '@remotion/media';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {TabletEui, TABLET_EUI_REGIONS} from '../../app-ui/TabletEui';
import type {EuiInput, EuiOutput} from '../../app-ui/PhoneEui';
import {DriverCatalog, SETUP_BACKGROUND, type DriverEntry} from '../../app-ui/DriverCatalog';
import {END_POINT_DRIVERS, GlobalCacheModelsDetail, PusrDetail} from '../../app-ui/DriverDatabase';
import {ACER_RS232_COMMANDS, Rs232ConnectionPanel} from '../../app-ui/ConnectionPanel';
import {ActivitiesPresets} from '../../app-ui/ActivitiesPresets';
import {DiscoverDevices, type DiscoveredDevice} from '../../app-ui/DiscoverDevices';
import {EuiPowerCapture, EUI_POWER_REGIONS} from '../../app-ui/EuiPower';
import {FocusRing, TapIndicator} from '../../camera/Annotations';
import {centerOf, type Region} from '../../camera/Camera';
import {
  BEATS,
  CUE_FRAMES,
  FIND_DEVICES_LABEL,
  catalogMap,
  discoverMap,
  paneMap,
  presetsMap,
  rs232Map,
  type LatestBeatName,
} from './iotLatestFeaturesData';

type BeatProps = {frame: number; frames: number};
const cue = (absolute: number, beat: LatestBeatName) => absolute - BEATS[beat].from;

// ── shared data, from the recording's stills ─────────────────────────────────────────

/** The catalog as `f_0004` lists it, plus the Luxul switch the Net Switchers filter finds. */
const CATALOG: DriverEntry[] = [
  {manufacturer: 'ACER', model: 'XL2320P', deviceType: 'projector'},
  {manufacturer: 'AVPRO EDGE', model: 'AC-MX-44', deviceType: 'switcher'},
  {manufacturer: 'BARCO', model: 'F80-4K12', deviceType: 'projector'},
  {manufacturer: 'BENQ', model: 'LU895UST', deviceType: 'projector'},
  {manufacturer: 'BLUSTREAM', model: 'CMX44CS', deviceType: 'switcher'},
  {manufacturer: 'CANON', model: 'WUX7000Z', deviceType: 'projector'},
  {manufacturer: 'CASIO', model: 'XJ-F210WN', deviceType: 'projector'},
  {manufacturer: 'CHRISTIE', model: 'FHD551', deviceType: 'display'},
  {manufacturer: 'LUXUL', model: 'AMS-1208P', deviceType: 'netSwitcher'},
];

const Catalog = (props: Partial<React.ComponentProps<typeof DriverCatalog>>) => (
  <DriverCatalog
    device="tablet"
    drivers={CATALOG}
    findDevices={FIND_DEVICES_LABEL}
    background={SETUP_BACKGROUND}
    {...props}
  />
);

/**
 * The sort control's open list (DriverCatalog's DropMenu), estimated from its constants:
 * the control starts at 421 (list x 212 plus a 197dp control and the 12dp gap), the list
 * hangs from y 154 with 6dp of padding, and each 14sp item is about 31dp tall.
 */
const sortItem = (index: number): Region => ({x: 421, y: 160 + index * 31, width: 150, height: 31});
const SORT_CONTROL: Region = {x: 421, y: 104, width: 197, height: 50};

const EUI_INPUTS: EuiInput[] = [{label: 'MAC'}, {label: 'PC'}, {label: 'TABLE HDMI'}, {label: 'WALL HDMI'}];
const EUI_OUTPUT_LABELS = ['DISPLAY 1', 'DISPLAY 2', 'PROJECTOR 1', 'PROJECTOR 2'];
const outputsOf = (sources: (string | null)[]): EuiOutput[] =>
  EUI_OUTPUT_LABELS.map((label, index) => ({label, source: sources[index] ?? null}));

/** A press-and-drag of a source onto an output, over `length` frames from `start`. */
const dragBetween = (frame: number, start: number, length: number, from: Region, to: Region, inputIndex: number) => {
  if (frame < start || frame >= start + length) return null;
  const t = interpolate(frame, [start, start + length], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const a = centerOf(from);
  const b = centerOf(to);
  return {inputIndex, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, opacity: 0.95, scale: 1.05};
};

// ── proof (stage) ────────────────────────────────────────────────────────────────────

/** Proof: a source pressed on welcome "features", dragged onto Display 2, which fills, ringed. */
export const ProofBeat: React.FC<BeatProps> = ({frame}) => {
  const press = Math.max(10, cue(CUE_FRAMES.welcomeFeatures, 'proof'));
  const dragStart = press + 18;
  const dragLength = 30;
  const dropped = frame >= dragStart + dragLength;
  const from = TABLET_EUI_REGIONS.sourceRow(2);
  const to = TABLET_EUI_REGIONS.outputCell(1);
  return (
    <>
      <TabletEui
        inputs={EUI_INPUTS}
        outputs={outputsOf([null, dropped ? 'TABLE HDMI' : null])}
        selectedInput={dropped ? 2 : null}
        volume={0.48}
        pressed={frame >= press && frame < dragStart ? 'input-3' : null}
        drag={dragBetween(frame, dragStart, dragLength, from, to, 2)}
      />
      <TapIndicator x={centerOf(from).x} y={centerOf(from).y} at={press} name="Source press" />
      {dropped ? <FocusRing region={to} appearAt={dragStart + dragLength} radius={0} name="Display 2 ring" /> : null}
    </>
  );
};

// ── avoip, global-cache, pusr ──────────────────────────────────────────

/** AV-over-IP: End Points picked on "endpoints"; Kramer, Matrox and Hall Research ringed on their words. */
export const AvoipBeat: React.FC<BeatProps> = ({frame}) => {
  const endpoints = cue(CUE_FRAMES.avoipEndpoints, 'avoip');
  const kramer = cue(CUE_FRAMES.avoipKramer, 'avoip');
  const matrox = cue(CUE_FRAMES.avoipMatrox, 'avoip');
  const research = cue(CUE_FRAMES.avoipResearch, 'avoip');
  const listed = frame >= endpoints + 8;
  const ring = (index: number, at: number, until: number, name: string) =>
    frame >= at && frame < until ? <FocusRing region={catalogMap.card(index)} appearAt={at} radius={5} name={name} /> : null;
  return (
    <>
      {listed ? (
        <DriverCatalog
          device="tablet"
          drivers={END_POINT_DRIVERS}
          typeFilter="endPoint"
          findDevices={FIND_DEVICES_LABEL}
          background={SETUP_BACKGROUND}
        />
      ) : (
        <Catalog typeFilter="netSwitcher" openMenu={frame >= endpoints - 10 ? {control: 'sort'} : undefined} />
      )}
      <TapIndicator x={centerOf(SORT_CONTROL).x} y={centerOf(SORT_CONTROL).y} at={endpoints - 10} name="Sort tap" />
      <TapIndicator x={centerOf(sortItem(4)).x} y={centerOf(sortItem(4)).y} at={endpoints} name="End Points tap" />
      {ring(3, kramer, matrox, 'Kramer ring')}
      {ring(4, matrox, research, 'Matrox ring')}
      {ring(1, research, 10000, 'Hall Research ring')}
    </>
  );
};

const EndPoints = ({selected, detail}: {selected: number | null; detail?: React.ReactNode}) => (
  <DriverCatalog
    device="tablet"
    drivers={END_POINT_DRIVERS}
    typeFilter="endPoint"
    selectedIndex={selected}
    findDevices={FIND_DEVICES_LABEL}
    background={SETUP_BACKGROUND}
    detail={detail}
  />
);

/** Global Caché: picked on "endpoints", its pane opens; the Model spinner opens on "models". */
export const GlobalCacheBeat: React.FC<BeatProps> = ({frame}) => {
  const pick = cue(CUE_FRAMES.gcEndpoints, 'global-cache');
  const models = cue(CUE_FRAMES.gcModels, 'global-cache');
  const picked = frame >= pick;
  return (
    <>
      <EndPoints
        selected={picked ? 0 : null}
        detail={picked ? <GlobalCacheModelsDetail open={frame >= models} /> : undefined}
      />
      <TapIndicator x={centerOf(catalogMap.card(0)).x} y={centerOf(catalogMap.card(0)).y} at={pick} name="Global Caché tap" />
      <TapIndicator x={centerOf(paneMap.modelField).x} y={centerOf(paneMap.modelField).y} at={models - 6} name="Model tap" />
      {frame >= models ? <FocusRing region={paneMap.modelList} appearAt={models} radius={0} name="Model list ring" /> : null}
    </>
  );
};

/** PUSR: picked on "PUSR", USR-W630 in the pane; its description ringed on "convert". */
export const PusrBeat: React.FC<BeatProps> = ({frame}) => {
  const pick = cue(CUE_FRAMES.pusrName, 'pusr');
  const convert = cue(CUE_FRAMES.pusrConvert, 'pusr');
  const picked = frame >= pick;
  return (
    <>
      <EndPoints
        selected={picked ? 5 : 0}
        detail={picked ? <PusrDetail /> : <GlobalCacheModelsDetail open={false} />}
      />
      <TapIndicator x={centerOf(catalogMap.card(5)).x} y={centerOf(catalogMap.card(5)).y} at={pick} name="PUSR tap" />
      {frame >= convert ? <FocusRing region={paneMap.description} appearAt={convert} radius={4} name="Description ring" /> : null}
    </>
  );
};

// ── discovery, rs232, terminal, webpage ──────────────────────────────────────────────

/** Discover Devices' rows after the scan, from `f_0017`–`f_0020`: private addresses only. */
const discovered = (added: boolean): DiscoveredDevice[] => [
  {id: 'eureka', name: 'Google Eureka Dongle', ip: '192.168.0.16', driverMatch: 'No matching driver', actionType: 'add_direct'},
  {id: 'sonos', name: 'Sonos One SL', ip: '192.168.0.82', driverMatch: 'No matching driver', actionType: 'add_direct'},
  {id: 'hp', name: 'HP ETHERNET MULTI-ENVIRONMENT', ip: '192.168.0.83', hasWebPage: true, driverMatch: 'No matching driver', actionType: 'add_direct'},
  {id: 'hive', name: 'Hall Technologies HT-HIVE-NODE-MINI', ip: '192.168.0.132', hasWebPage: true, driverMatch: 'GLOBAL CACHE End Points', actionType: 'add_driver'},
  {id: 'epson', name: 'EPSON PowerLite', ip: '192.168.0.134', hasWebPage: true, driverMatch: 'EPSON Projectors', actionType: 'add_driver'},
  {id: 'itach', name: 'Global Cache iTachFlexEthernet', ip: '192.168.0.159', hasWebPage: true, driverMatch: 'GLOBAL CACHE End Points', actionType: added ? 'added' : 'add_driver'},
  {id: 'pusr', name: 'Pusr USR_module', ip: '192.168.0.250', driverMatch: 'PUSR End Points', actionType: 'add_driver'},
];
const ITACH_ROW = 5;

/** Discovery: the catalog's corner button ringed on "discovery"; Discover Devices on "corner"; the iTach added on "click". */
export const DiscoveryBeat: React.FC<BeatProps> = ({frame}) => {
  const discovery = cue(CUE_FRAMES.discDiscovery, 'discovery');
  const corner = cue(CUE_FRAMES.discCorner, 'discovery');
  const driver = cue(CUE_FRAMES.discDriver, 'discovery');
  const click = cue(CUE_FRAMES.discClick, 'discovery');
  const button = catalogMap.findDevices;
  if (frame < corner) {
    return (
      <>
        <Catalog />
        <FocusRing region={button} appearAt={discovery} radius={5} name="Find Devices ring" />
        <TapIndicator x={centerOf(button).x} y={centerOf(button).y} at={corner - 6} name="Find Devices tap" />
      </>
    );
  }
  const added = frame >= click;
  const devices = discovered(added);
  return (
    <>
      <DiscoverDevices
        device="tablet"
        foundCount={11}
        stillLooking={false}
        scanningProgress={100}
        devices={devices}
        toast={added ? '1 device added' : undefined}
      />
      {frame >= driver && frame < click ? (
        <FocusRing region={discoverMap.driverMatch(ITACH_ROW, devices[ITACH_ROW])} appearAt={driver} radius={4} name="iTach match ring" />
      ) : null}
      <TapIndicator
        x={centerOf(discoverMap.addButton(ITACH_ROW, 'add_driver')).x}
        y={centerOf(discoverMap.addButton(ITACH_ROW, 'add_driver')).y}
        at={click}
        name="Add Driver tap"
      />
      {added ? (
        <FocusRing region={discoverMap.addButton(ITACH_ROW, devices[ITACH_ROW])} appearAt={click + 4} radius={4} name="Added ring" />
      ) : null}
    </>
  );
};

const ITACH_END_POINT = 'Global Cache iTachFlexEthernet - 192.168.0.159:4999';

/**
 * RS-232: the Acer's Configure Connection on "Acer"; the end point set and ringed on "end";
 * CONNECT tapped on "connect" with its progress; connected, the terminal ringed on
 * "terminal"; the configuration and commands ringed on "commands".
 */
export const Rs232Beat: React.FC<BeatProps> = ({frame}) => {
  const acer = cue(CUE_FRAMES.rsAcer, 'rs232');
  const end = cue(CUE_FRAMES.rsEnd, 'rs232');
  const connect = cue(CUE_FRAMES.rsConnect, 'rs232');
  const terminal = cue(CUE_FRAMES.rsTerminal, 'rs232');
  const commands = cue(CUE_FRAMES.rsCommands, 'rs232');
  const connectedAt = connect + 45;
  const connected = frame >= connectedAt;
  const toast =
    frame >= connect && frame < connectedAt
      ? 'Connecting RS-232 through 192.168.0.159…'
      : frame >= connectedAt && frame < connectedAt + 75
        ? 'RS-232 connected via 192.168.0.159:4999 ✓'
        : undefined;
  const deviceName: Region = {x: rs232Map.endPointButton.x, y: 56, width: rs232Map.content.width - 32, height: 48};
  return (
    <>
      <Rs232ConnectionPanel
        deviceName="ACER XL2320P - New"
        manufacturer="ACER"
        model="ACER Projectors"
        category="Projectors"
        endPoint={frame >= end ? ITACH_END_POINT : ''}
        connected={connected}
        terminal={['Connected to 192.168.0.159:4999 ✓']}
        commands={ACER_RS232_COMMANDS}
        toast={toast}
        showRoomMenus
      />
      {frame >= acer && frame < end ? <FocusRing region={deviceName} appearAt={acer} radius={5} name="Acer ring" /> : null}
      <TapIndicator x={centerOf(rs232Map.endPointButton).x} y={centerOf(rs232Map.endPointButton).y} at={end - 8} name="End point tap" />
      {frame >= end && frame < connect ? (
        <FocusRing region={rs232Map.endPointField} appearAt={end} radius={5} name="End point ring" />
      ) : null}
      <TapIndicator x={centerOf(rs232Map.connectAction).x} y={centerOf(rs232Map.connectAction).y} at={connect} name="Connect tap" />
      {frame >= terminal && frame < commands ? (
        <FocusRing region={rs232Map.terminal} appearAt={terminal} radius={0} name="Terminal ring" />
      ) : null}
      {frame >= commands ? <FocusRing region={rs232Map.commands} appearAt={commands} radius={0} name="Commands ring" /> : null}
    </>
  );
};

/**
 * Footage beats play the recording itself, cut to the screen at 1280x800 by
 * `scripts/walkthrough-footage.mjs` from `footage.json`, synced to the narration's source
 * times. Nathan's review (2026-10-07): the real Test layout, the terminal's own page and the
 * device's real web page are the feature; a rebuild cannot match them.
 */
const Footage = ({beat}: {beat: 'terminal' | 'webpage'}) => (
  <Video
    src={staticFile(`walkthrough/iot-latest-features/${beat}.mp4`)}
    muted
    style={{width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height, display: 'block'}}
  />
);

/** Terminal: the Test tab's side-by-side terminal, then the terminal opened as its own page and a command typed and sent. */
export const TerminalBeat: React.FC<BeatProps> = () => <Footage beat="terminal" />;

/** Web page: the Web page tab tapped and the iTach's own pages, through to Flex Link Cable. */
export const WebpageBeat: React.FC<BeatProps> = () => <Footage beat="webpage" />;

// ── eui, power ──────────────────────────────────────────────────────────────

/** EUI: a drag onto a display on "drag"; a source tapped on "source", then All on "all", and every display takes it. */
export const EuiBeat: React.FC<BeatProps> = ({frame}) => {
  const drag = cue(CUE_FRAMES.euiDrag, 'eui');
  const source = cue(CUE_FRAMES.euiSource, 'eui');
  const all = cue(CUE_FRAMES.euiAll, 'eui');
  const dragLength = 30;
  const from = TABLET_EUI_REGIONS.sourceRow(1);
  const to = TABLET_EUI_REGIONS.outputCell(3);
  const base: (string | null)[] = ['MAC', 'TABLE HDMI', 'TABLE HDMI', null];
  const afterDrag: (string | null)[] = ['MAC', 'TABLE HDMI', 'TABLE HDMI', 'PC'];
  // The tapped source is TABLE HDMI: the bottom row, WALL HDMI, sits under the landscape label.
  const sources = frame >= all ? Array(4).fill('TABLE HDMI') : frame >= drag + dragLength ? afterDrag : base;
  const tapped = TABLET_EUI_REGIONS.sourceRow(2);
  return (
    <>
      <TabletEui
        inputs={EUI_INPUTS}
        outputs={outputsOf(sources)}
        // A drop selects: the dragged source and the display it landed on both go blue.
        selectedInput={frame >= source ? 2 : frame >= drag + dragLength ? 1 : null}
        volume={0.48}
        pressed={
          frame >= drag && frame < drag + 6
            ? 'input-2'
            : frame >= source && frame < source + 8
              ? 'input-3'
              : frame >= all && frame < all + 8
                ? 'all'
                : null
        }
        drag={dragBetween(frame, drag + 6, dragLength - 6, from, to, 1)}
      />
      <TapIndicator x={centerOf(from).x} y={centerOf(from).y} at={drag} name="Drag start" />
      {frame >= drag + dragLength && frame < source ? (
        <FocusRing region={to} appearAt={drag + dragLength} radius={0} name="Dropped display ring" />
      ) : null}
      <TapIndicator x={centerOf(tapped).x} y={centerOf(tapped).y} at={source} name="Source tap" />
      <TapIndicator x={centerOf(TABLET_EUI_REGIONS.routeAll).x} y={centerOf(TABLET_EUI_REGIONS.routeAll).y} at={all} name="All tap" />
      {frame >= all ? <FocusRing region={TABLET_EUI_REGIONS.outputGrid} appearAt={all + 4} radius={0} name="Every display ring" /> : null}
    </>
  );
};

/**
 * Power: power tapped on "safety", Powering Off with the cancel countdown; the ✕ ringed on
 * "X". The power-off runs to completion (the recording does not cancel) and the beat holds
 * on Welcome. Review 2026-10-07 cut the hello-world power-on.
 */
export const PowerBeat: React.FC<BeatProps> = ({frame, frames}) => {
  const safety = cue(CUE_FRAMES.powerSafety, 'power');
  const x = cue(CUE_FRAMES.powerX, 'power');
  const offEnd = x + 75;
  const countdown = interpolate(frame, [safety, offEnd - 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const power = EUI_POWER_REGIONS.tablet;
  if (frame < safety) {
    return (
      <>
        <TabletEui inputs={EUI_INPUTS} outputs={outputsOf(Array(4).fill('TABLE HDMI'))} selectedInput={2} volume={0.48} />
        <TapIndicator x={centerOf(TABLET_EUI_REGIONS.powerControl).x} y={centerOf(TABLET_EUI_REGIONS.powerControl).y} at={safety - 4} name="Power tap" />
      </>
    );
  }
  return (
    <>
      <Sequence from={safety} durationInFrames={offEnd - safety} layout="none">
        <EuiPowerCapture
          device="tablet"
          state="powering-off"
          durationInFrames={offEnd - safety}
          volume={0.48}
          cancel={frame < offEnd - 30 ? countdown : undefined}
          statusMessage={frame < offEnd - 30 ? '' : 'Done'}
        />
      </Sequence>
      <Sequence from={offEnd} durationInFrames={frames + 15 - offEnd} layout="none">
        <EuiPowerCapture device="tablet" state="off" volume={0.48} />
      </Sequence>
      {frame >= x && frame < offEnd - 30 ? <FocusRing region={power.cancel} appearAt={x} radius={28} name="Cancel ring" /> : null}
    </>
  );
};

export const BEAT_RENDERERS: Partial<Record<LatestBeatName, React.FC<BeatProps>>> = {
  proof: ProofBeat,
  avoip: AvoipBeat,
  'global-cache': GlobalCacheBeat,
  pusr: PusrBeat,
  discovery: DiscoveryBeat,
  rs232: Rs232Beat,
  terminal: TerminalBeat,
  webpage: WebpageBeat,
  eui: EuiBeat,
  power: PowerBeat,
};
