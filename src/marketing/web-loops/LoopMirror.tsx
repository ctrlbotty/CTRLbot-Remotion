// The CTRLbot Mirror panel loop: the Windows app, 4:3, for ctrlbot.io/app/.
//
// No device bezel and no push into a surface: Mirror is a desktop window, so it sits in
// the frame on the stage gradient with a slow breathing scale (a cosine, so both ends are
// the same instant and flat). Every state is a pure function of the cycle fraction.
//
// Cycle: Devices panel at rest -> device selected, details read -> Start mirroring ->
// the CTRLbot IoT app live on the stage, scrolled and tapped from the PC -> Wi-Fi pairing
// fields filled and Pair pressed -> Stop mirroring -> back to rest. Only behaviour the
// Mirror README lists. The serial and addresses are synthetic.

import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CATALOG_VIEWPORT, DriverCatalog} from '../../app-ui/DriverCatalog';
import {DevicesPanel, MirrorApp, MirrorStage, type Mirrored} from '../../app-ui/mirror/Mirror';
import {MIRROR_CATALOG, MIRROR_DEVICE, MIRROR_VIEWPORT, mirrorRegions} from '../../app-ui/mirror/mirrorData';
import {ink} from '../../app-ui/mirror/mirrorTheme';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {
  loopBg,
  MIRROR_DETAILS_AT,
  MIRROR_LIVE_AT,
  MIRROR_PAIR_AT,
  MIRROR_PAIR_TYPE_AT,
  MIRROR_REST_AT,
  MIRROR_SCROLL_AT,
  MIRROR_SELECT_AT,
  MIRROR_START_AT,
  MIRROR_STOP_AT,
  MIRROR_TAP_AT,
  wave,
} from './webLoopData';

/** Synthetic identity: not a real serial, and an address from a private documentation-style range. */
const SERIAL = 'MIRRORDEMO01';
const PAIR_ADDRESS = '192.168.0.42:37021';
const PAIR_CODE = '482916';
const LIVE_STATUS = `Mirroring ${MIRROR_DEVICE.name}`;

const ease = Easing.bezier(0.45, 0, 0.55, 1);

/** Pointer waypoints in window pixels: [t, x, y]. Hidden at both ends of the cycle. */
const POINTER: [number, number, number][] = [
  [0.03, 760, 520],
  [0.065, 240, 130],
  [0.17, 240, 130],
  [MIRROR_START_AT - 0.005, 190, 372],
  [0.3, 900, 300],
  [MIRROR_SCROLL_AT + 0.07, 905, 300],
  [MIRROR_TAP_AT - 0.04, 811, 321],
  [MIRROR_TAP_AT, 811, 321],
  [0.56, 234, 520],
  [MIRROR_PAIR_TYPE_AT - 0.005, 234, 550],
  [MIRROR_PAIR_TYPE_AT + 0.1, 234, 550],
  [MIRROR_PAIR_TYPE_AT + 0.14, 234, 617],
  [MIRROR_PAIR_AT - 0.01, 234, 651],
  [0.82, 234, 651],
  [MIRROR_STOP_AT - 0.005, 190, 372],
  [0.9, 190, 372],
  [MIRROR_REST_AT, 600, 600],
];

const pointer = (t: number) => ({
  x: interpolate(t, POINTER.map((p) => p[0]), POINTER.map((p) => p[1]), {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  y: interpolate(t, POINTER.map((p) => p[0]), POINTER.map((p) => p[2]), {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  opacity: interpolate(t, [0.02, 0.04, 0.9, MIRROR_REST_AT], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

const press = (t: number, at: number) => t >= at - 0.012 && t < at + 0.02;

export const LoopMirror = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const t = frame / durationInFrames;

  const selected = t >= MIRROR_SELECT_AT && t < MIRROR_REST_AT - 0.02;
  const details = t >= MIRROR_DETAILS_AT && t < MIRROR_REST_AT - 0.04;
  const starting = press(t, MIRROR_START_AT) && t < MIRROR_LIVE_AT;
  const live = t >= MIRROR_LIVE_AT && t < MIRROR_STOP_AT + 0.015;

  const scroll = interpolate(t, [MIRROR_SCROLL_AT, MIRROR_SCROLL_AT + 0.1], [0, 120], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tapped = t >= MIRROR_TAP_AT + 0.01;
  const mirrored: Mirrored = {
    width: CATALOG_VIEWPORT.tablet.width,
    height: CATALOG_VIEWPORT.tablet.height,
    screen: <DriverCatalog device="tablet" drivers={MIRROR_CATALOG} selectedIndex={tapped ? 2 : null} listScroll={scroll} />,
  };

  const addressLen = Math.floor(
    interpolate(t, [MIRROR_PAIR_TYPE_AT, MIRROR_PAIR_TYPE_AT + 0.09], [0, PAIR_ADDRESS.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );
  const codeLen = Math.floor(
    interpolate(t, [MIRROR_PAIR_TYPE_AT + 0.11, MIRROR_PAIR_TYPE_AT + 0.16], [0, PAIR_CODE.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );
  const pairing = t >= MIRROR_PAIR_TYPE_AT && t < MIRROR_PAIR_AT + 0.03;

  const tap = interpolate(t, [MIRROR_TAP_AT, MIRROR_TAP_AT + 0.06], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ptr = pointer(t);

  // 0.9 -> 0.96 and back; cosine, so t=0 and t=1 are the same flat frame.
  const scale = 0.9 + 0.06 * wave(t);
  const windowScale = scale * (width / MIRROR_VIEWPORT.width);

  return (
    <div style={{position: 'absolute', inset: 0, background: loopBg(t), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <PromoPreload />
      <div
        style={{
          width: MIRROR_VIEWPORT.width,
          height: MIRROR_VIEWPORT.height,
          flexShrink: 0,
          scale: String(windowScale),
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        <MirrorApp
          panel="devices"
          status={live ? LIVE_STATUS : '1 device ready'}
          hasDevice
          side={
            <DevicesPanel
              selected={selected}
              details={details}
              live={live}
              starting={starting}
              serial={SERIAL}
              addressPlaceholder="192.168.0.42:37021"
              pairingAddress={pairing ? PAIR_ADDRESS.slice(0, addressLen) : undefined}
              pairingCode={pairing ? PAIR_CODE.slice(0, codeLen) : undefined}
              pairPressed={press(t, MIRROR_PAIR_AT)}
            />
          }
          stage={
            <MirrorStage
              mirrored={live ? mirrored : undefined}
              ripple={live ? {x: 0.32, y: 0.29, progress: tap} : undefined}
              idle={{
                title: `${SERIAL} is ready`,
                detail: 'Start mirroring to see the screen here, control it with your mouse and keyboard, and capture stills or video.',
                action: 'Start mirroring',
              }}
            />
          }
        />
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          style={{position: 'absolute', left: ptr.x, top: ptr.y, opacity: ptr.opacity, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.6))'}}
        >
          <path d="M5 3l14 8-6.2 1.6L9.6 19z" fill="#ffffff" stroke={ink[950]} strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};
