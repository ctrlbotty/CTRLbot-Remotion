// The CTRLbot Terminator panel loop: the Windows app in a 1:1 frame, for ctrlbot.io/app/.
//
// No bezel and no push: Terminator is a desktop window, so it sits on the stage gradient
// with a slow breathing scale (a cosine, so both ends are the same instant and flat).
// Every state is a pure function of the cycle fraction.
//
// Cycle: Scan tab at rest -> Raw TCP (Telnet) selected -> Connect -> a projector power
// query typed with the CR line ending and sent -> the reply in the Received log, shown
// with Verbose CRLF -> Scan selected again. Only behaviour the Terminator README lists;
// the address is synthetic.

import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ink} from '../../app-ui/mirror/mirrorTheme';
import {TermApp, TermScan, TermTcpClient} from '../../app-ui/term/Terminator';
import {TERM_ADAPTER, TERM_PROJECTOR, TERM_VIEWPORT} from '../../app-ui/term/termData';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {
  loopBg,
  TERMINATOR_BACK_AT,
  TERMINATOR_CONNECT_AT,
  TERMINATOR_REPLY_AT,
  TERMINATOR_REST_AT,
  TERMINATOR_SELECT_AT,
  TERMINATOR_SEND_AT,
  TERMINATOR_TYPE_FROM,
  TERMINATOR_TYPE_TO,
  wave,
} from './webLoopData';

const ease = Easing.bezier(0.45, 0, 0.55, 1);

/** Pointer waypoints in window pixels: [t, x, y]. Hidden at both ends of the cycle. */
const POINTER: [number, number, number][] = [
  [0.03, 900, 560],
  [TERMINATOR_SELECT_AT - 0.035, 100, 195],
  [TERMINATOR_SELECT_AT, 100, 195],
  [TERMINATOR_CONNECT_AT - 0.05, 1205, 85],
  [TERMINATOR_CONNECT_AT, 1205, 85],
  [TERMINATOR_TYPE_FROM, 700, 640],
  [TERMINATOR_SEND_AT - 0.05, 1225, 762],
  [TERMINATOR_SEND_AT, 1225, 762],
  [TERMINATOR_REPLY_AT + 0.08, 1000, 420],
  [TERMINATOR_BACK_AT - 0.04, 100, 108],
  [TERMINATOR_BACK_AT, 100, 108],
  [TERMINATOR_REST_AT, 500, 400],
];

const pointer = (t: number) => ({
  x: interpolate(t, POINTER.map((p) => p[0]), POINTER.map((p) => p[1]), {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  y: interpolate(t, POINTER.map((p) => p[0]), POINTER.map((p) => p[2]), {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  opacity: interpolate(t, [0.02, 0.04, TERMINATOR_BACK_AT + 0.03, TERMINATOR_REST_AT], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

export const LoopTerminator = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const t = frame / durationInFrames;

  const onClient = t >= TERMINATOR_SELECT_AT && t < TERMINATOR_BACK_AT;
  const hover = t >= TERMINATOR_SELECT_AT - 0.03 && t < TERMINATOR_SELECT_AT;
  const connected = t >= TERMINATOR_CONNECT_AT;
  const sent = t >= TERMINATOR_SEND_AT;
  const typed = Math.floor(
    interpolate(t, [TERMINATOR_TYPE_FROM, TERMINATOR_TYPE_TO], [0, TERM_PROJECTOR.command.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );
  const ptr = pointer(t);

  // 0.9 -> 0.94 and back; cosine, so t=0 and t=1 are the same flat frame.
  const scale = 0.9 + 0.04 * wave(t);
  const windowScale = scale * (width / TERM_VIEWPORT.width);

  return (
    <div style={{position: 'absolute', inset: 0, background: loopBg(t), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <PromoPreload />
      <div
        style={{
          width: TERM_VIEWPORT.width,
          height: TERM_VIEWPORT.height,
          flexShrink: 0,
          scale: String(windowScale),
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {onClient ? (
          <TermApp tab="tcp-client">
            <TermTcpClient
              host={TERM_PROJECTOR.host}
              port={TERM_PROJECTOR.port}
              connected={connected}
              received={t >= TERMINATOR_REPLY_AT ? TERM_PROJECTOR.received : []}
              sent={[
                ...(connected ? [TERM_PROJECTOR.sent[0]] : []),
                ...(sent ? [TERM_PROJECTOR.sent[1]] : []),
              ]}
              input={sent ? '' : TERM_PROJECTOR.command.slice(0, typed)}
              pressing={t >= TERMINATOR_CONNECT_AT - 0.012 && t < TERMINATOR_CONNECT_AT}
            />
          </TermApp>
        ) : (
          <TermApp tab="scan" highlight={hover ? 'tcp-client' : undefined}>
            <TermScan adapter={TERM_ADAPTER} state={{status: 'ready', checked: 0, devices: []}} />
          </TermApp>
        )}
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
