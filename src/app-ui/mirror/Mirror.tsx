// CTRLbot Mirror, rebuilt live: the window, its panels and the mirroring stage.
//
// A mirror of `C:\0-Repo\Utilities\CTRLbot-Mirror\src\renderer\src`, class by class, laid
// out in CSS pixels at `MIRROR_VIEWPORT`. The icons are the app's own: lucide-react, pinned
// to the version Mirror ships.
//
// What the stage mirrors is not a recording of a tablet. It is the CTRLbot IoT app's own
// live surfaces from app-ui/, set inside the frame Mirror draws, so a video can drive the
// mirrored app through a state change exactly as it drives the app anywhere else.
//
// These components hold no time. MirrorScenes.tsx decides the state for each frame.

import {
  BatteryCharging,
  Bell,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  Circle,
  Eraser,
  Expand,
  File,
  Folder,
  FolderOpen,
  FolderTree,
  Home,
  LayoutGrid,
  Lock,
  Minus,
  MonitorSmartphone,
  Pause,
  Play,
  RefreshCw,
  RotateCw,
  ScrollText,
  Settings,
  Smartphone,
  Square,
  SquareStop,
  TerminalSquare,
  Trash2,
  Upload,
  Usb,
  Volume1,
  Volume2,
  Wifi,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';
import {Img, staticFile} from 'remotion';
import {MIRROR_APPS, MIRROR_DEVICE, MIRROR_FILES, MIRROR_LOGCAT, MIRROR_STREAM, MIRROR_STUDIO, MIRROR_VIEWPORT, type LogPriority, type MirrorLogLine} from './mirrorData';
import {alert, beam, FRAME_SPECS, ink, mirrorFont, mist, mix, round, signal, sp, stageBackground, tabletFrame, text, warn, type FrameSpec, type FrameStyle} from './mirrorTheme';

export type MirrorPanel = 'setup' | 'devices' | 'studio' | 'apps' | 'files' | 'shell' | 'logcat' | 'settings';

const border = (colour: string) => `1px solid ${colour}`;

// ── Primitives: ui.tsx ──────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

const BUTTON: Record<ButtonVariant, CSSProperties> = {
  primary: {backgroundColor: beam[500], color: ink[950], fontWeight: 600},
  secondary: {backgroundColor: ink[700], color: mist[100]},
  ghost: {backgroundColor: 'transparent', color: mist[300]},
  danger: {backgroundColor: mix(alert[500], 15), color: alert[400]},
};

export const Button = ({
  label,
  variant = 'secondary',
  icon,
  wide,
  pressed,
}: {
  label: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  wide?: boolean;
  pressed?: boolean;
}) => (
  <div
    style={{
      ...text.xs,
      ...BUTTON[variant],
      ...(pressed ? {backgroundColor: variant === 'primary' ? beam[600] : ink[800]} : {}),
      height: 32,
      padding: `0 ${sp(3)}px`,
      gap: 6,
      borderRadius: round.lg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      flex: wide ? 1 : 'none',
      boxSizing: 'border-box',
    }}
  >
    {icon}
    {label}
  </div>
);

const IconButton = ({icon: Icon, size = 16, active, tone}: {icon: LucideIcon; size?: number; active?: boolean; tone?: 'danger'}) => (
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: round.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: active ? beam[300] : tone === 'danger' ? alert[400] : mist[300],
      backgroundColor: active ? mix(beam[500], 20) : 'transparent',
    }}
  >
    <Icon size={size} />
  </div>
);

const Badge = ({tone = 'neutral', children}: {tone?: 'neutral' | 'good' | 'warn' | 'info'; children: ReactNode}) => {
  const tones = {
    neutral: {backgroundColor: ink[700], color: mist[300]},
    good: {backgroundColor: mix(signal[500], 15), color: signal[400]},
    warn: {backgroundColor: mix(warn[400], 15), color: warn[400]},
    info: {backgroundColor: mix(beam[500], 15), color: beam[300]},
  } as const;
  return (
    <span
      style={{
        ...tones[tone],
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 6px',
        borderRadius: round.md,
        fontSize: 10,
        lineHeight: '14px',
        fontWeight: 600,
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );
};

const Card = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div style={{borderRadius: round.xl2, border: border(ink[700]), backgroundColor: mix(ink[850], 70), padding: sp(4), ...style}}>{children}</div>
);

const SectionLabel = ({children}: {children: ReactNode}) => (
  <div style={{...text.px11, marginBottom: sp(2), fontWeight: 600, letterSpacing: '0.14em', color: mist[400], textTransform: 'uppercase'}}>
    {children}
  </div>
);

const Field = ({label, hint, children}: {label: string; hint?: string; children: ReactNode}) => (
  <div>
    <div style={{...text.xs, marginBottom: 6, fontWeight: 500, color: mist[300]}}>{label}</div>
    {children}
    {hint ? <div style={{...text.px11, marginTop: 4, color: mist[400]}}>{hint}</div> : null}
  </div>
);

const Input = ({value, placeholder, mono}: {value?: string; placeholder?: string; mono?: boolean}) => (
  <div
    style={{
      ...text.sm,
      height: 36,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${sp(3)}px`,
      borderRadius: round.lg,
      border: border(ink[700]),
      backgroundColor: ink[900],
      color: value ? mist[100] : mist[400],
      fontFamily: mono ? mirrorFont.mono : mirrorFont.sans,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      flex: 1,
    }}
  >
    {value || placeholder}
  </div>
);

const Select = ({value}: {value: string}) => (
  <div
    style={{
      ...text.sm,
      height: 36,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${sp(2.5)}px`,
      borderRadius: round.lg,
      border: border(ink[700]),
      backgroundColor: ink[900],
      color: mist[100],
    }}
  >
    <span>{value}</span>
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
);

const Toggle = ({checked}: {checked: boolean}) => (
  <div style={{width: 36, height: 20, borderRadius: 999, backgroundColor: checked ? beam[500] : ink[600], position: 'relative', flexShrink: 0}}>
    <div style={{position: 'absolute', top: 2, left: checked ? 18 : 2, width: 16, height: 16, borderRadius: 999, backgroundColor: '#ffffff'}} />
  </div>
);

const Slider = ({fraction, readout}: {fraction: number; readout: string}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: sp(3)}}>
    <div style={{flex: 1, height: 4, borderRadius: 999, backgroundColor: ink[600], position: 'relative'}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fraction * 100}%`, borderRadius: 999, backgroundColor: beam[500]}} />
      <div style={{position: 'absolute', top: -6, left: `calc(${fraction * 100}% - 8px)`, width: 16, height: 16, borderRadius: 999, backgroundColor: beam[500]}} />
    </div>
    <span style={{...text.px11, width: 56, textAlign: 'right', fontFamily: mirrorFont.mono, color: mist[300]}}>{readout}</span>
  </div>
);

const Row = ({label, hint, children}: {label: string; hint?: string; children: ReactNode}) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: sp(4), padding: `${sp(2)}px 0`}}>
    <div>
      <div style={{...text.xs, fontWeight: 500, color: mist[200]}}>{label}</div>
      {hint ? <div style={{...text.px11, marginTop: 2, color: mist[400]}}>{hint}</div> : null}
    </div>
    {children}
  </div>
);

/** `ui.tsx` Panel: title, subtitle, actions, and a scrolling body. */
const Panel = ({title, subtitle, actions, children}: {title: string; subtitle?: string; actions?: ReactNode; children: ReactNode}) => (
  <div style={{display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0}}>
    <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: sp(3), padding: `${sp(5)}px ${sp(5)}px ${sp(4)}px`}}>
      <div>
        <div style={{...text.sm, fontWeight: 600, letterSpacing: '0.025em', color: mist[100]}}>{title}</div>
        {subtitle ? <div style={{...text.xs, marginTop: 2, color: mist[400]}}>{subtitle}</div> : null}
      </div>
      {actions ? <div style={{display: 'flex', gap: 6}}>{actions}</div> : null}
    </div>
    <div style={{flex: 1, minHeight: 0, overflow: 'hidden', padding: `0 ${sp(5)}px ${sp(5)}px`}}>{children}</div>
  </div>
);

// ── Chrome ─────────────────────────────────────────────────────────────────────────

const NAV: {id: MirrorPanel | 'virtual'; icon: LucideIcon; device?: boolean}[] = [
  {id: 'devices', icon: Smartphone},
  {id: 'studio', icon: Camera, device: true},
  {id: 'apps', icon: LayoutGrid, device: true},
  {id: 'files', icon: FolderTree, device: true},
  {id: 'shell', icon: TerminalSquare, device: true},
  {id: 'logcat', icon: ScrollText, device: true},
  {id: 'virtual', icon: MonitorSmartphone},
];

const NavButton = ({icon: Icon, active, disabled}: {icon: LucideIcon; active: boolean; disabled: boolean}) => (
  <div
    style={{
      position: 'relative',
      width: 44,
      height: 44,
      borderRadius: round.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: active ? mix(beam[500], 15) : 'transparent',
      color: active ? beam[300] : disabled ? ink[600] : mist[400],
    }}
  >
    {active ? <span style={{position: 'absolute', left: -8, top: 12, width: 4, height: 20, borderRadius: '0 999px 999px 0', backgroundColor: beam[400]}} /> : null}
    <Icon size={19} strokeWidth={1.75} />
  </div>
);

const TitleBar = ({status}: {status: string}) => (
  <div style={{height: 32, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: sp(3), borderBottom: border(ink[800]), backgroundColor: mix(ink[950], 80)}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 11}}>
      <span style={{display: 'flex', alignItems: 'center', gap: sp(2)}}>
        <Img src={staticFile('app-assets/mirror/icon.png')} style={{width: 16, height: 16}} />
        <span style={{fontFamily: mirrorFont.brand, fontSize: 12, letterSpacing: '0.025em', color: mist[100]}}>CTRLbot Mirror</span>
      </span>
      <span style={{color: ink[600]}}>|</span>
      <span style={{display: 'flex', alignItems: 'center', gap: 6, color: mist[400]}}>
        {status.startsWith('Mirroring') ? <span style={{width: 6, height: 6, borderRadius: 999, backgroundColor: signal[500]}} /> : null}
        {status}
      </span>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: sp(2)}}>
      {status.startsWith('Mirroring') ? <Badge tone="good">Live</Badge> : null}
      <div style={{display: 'flex', color: mist[300]}}>
        {[Minus, Square, X].map((Icon, index) => (
          <div key={index} style={{width: 44, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icon size={index === 1 ? 11 : 13} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Sidebar = ({panel, hasDevice}: {panel: MirrorPanel; hasDevice: boolean}) => (
  <div style={{width: 64, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: `${sp(3)}px 0`, borderRight: border(ink[800]), backgroundColor: mix(ink[950], 60)}}>
    {NAV.map((item) => (
      <NavButton key={item.id} icon={item.icon} active={panel === item.id} disabled={Boolean(item.device && !hasDevice)} />
    ))}
    <div style={{flex: 1}} />
    <span style={{width: 6, height: 6, borderRadius: 999, backgroundColor: signal[500], marginBottom: 4}} />
    <NavButton icon={Wrench} active={panel === 'setup'} disabled={false} />
    <NavButton icon={Settings} active={panel === 'settings'} disabled={false} />
  </div>
);

export const DEFAULT_SCREENSHOT_PATH = 'Pictures\\CTRLbot Mirror\\samsung-SM-X210_2026-09-30_14-32-07.png';

export type MirrorToast = {
  title?: string;
  detail?: string;
  opacity?: number;
  translateY?: number;
};

/**
 * Toast notification matching Mirror's `Toasts.tsx` and `StageToolbar.tsx`.
 * Used for the *Screenshot saved* notification.
 */
export const MirrorToastNotification = ({
  toast,
}: {
  toast: boolean | MirrorToast;
}) => {
  const data = typeof toast === 'object' ? toast : {};
  const title = data.title ?? 'Screenshot saved';
  const detail = data.detail !== undefined ? data.detail : DEFAULT_SCREENSHOT_PATH;

  return (
    <div
      style={{
        position: 'absolute',
        right: sp(5),
        bottom: sp(5),
        zIndex: 50,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: sp(2),
        pointerEvents: 'none',
      }}
    >
      <div
        role="status"
        style={{
          display: 'flex',
          gap: sp(3),
          borderRadius: round.xl,
          border: border(mix(signal[500], 40)),
          backgroundColor: mix(ink[850], 95),
          padding: sp(3),
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: data.opacity ?? 1,
          transform: data.translateY !== undefined ? `translateY(${data.translateY}px)` : undefined,
        }}
      >
        <CheckCircle2 size={16} color={signal[400]} style={{marginTop: 2, flexShrink: 0}} />
        <div style={{minWidth: 0, flex: 1}}>
          <p style={{...text.xs, fontWeight: 600, color: mist[100], margin: 0}}>{title}</p>
          {detail ? (
            <p
              style={{
                marginTop: 4,
                ...text.px11,
                lineHeight: '15px',
                wordBreak: 'break-all',
                color: mist[400],
                margin: '4px 0 0 0',
              }}
            >
              {detail}
            </p>
          ) : null}
        </div>
        <div
          style={{
            height: 'fit-content',
            flexShrink: 0,
            borderRadius: round.md,
            padding: 2,
            color: mist[400],
            display: 'flex',
          }}
        >
          <X size={13} />
        </div>
      </div>
    </div>
  );
};

/**
 * The window: title bar, rail, panel and stage. `status` is the title bar's middle text:
 * `No device connected`, `1 device ready`, or `Mirroring samsung SM-X210`.
 */
export const MirrorApp = ({
  panel,
  status,
  hasDevice,
  side,
  stage,
  toast,
}: {
  panel: MirrorPanel;
  status: string;
  hasDevice: boolean;
  side: ReactNode;
  stage: ReactNode;
  toast?: boolean | MirrorToast;
}) => (
  <div
    style={{
      position: 'relative',
      width: MIRROR_VIEWPORT.width,
      height: MIRROR_VIEWPORT.height,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: ink[900],
      color: mist[200],
      fontFamily: mirrorFont.sans,
    }}
  >
    <TitleBar status={status} />
    <div style={{flex: 1, minHeight: 0, display: 'flex'}}>
      <Sidebar panel={panel} hasDevice={hasDevice} />
      <div style={{width: 340, flexShrink: 0, borderRight: border(ink[800]), backgroundColor: ink[900]}}>{side}</div>
      {stage}
    </div>
    {toast ? <MirrorToastNotification toast={toast} /> : null}
  </div>
);

// ── Stage ──────────────────────────────────────────────────────────────────────────

const STAGE_MARGIN = 28;
const TOOLBAR = 56;

/** The mirrored screen's natural size, and what it shows. */
export type Mirrored = {width: number; height: number; screen: ReactNode};

/**
 * `Stage.tsx`: the backdrop, the device frame Mirror draws, the mirrored screen inside it,
 * and the toolbar. With no `mirrored` it shows the idle message, as the app does.
 */
export const MirrorStage = ({
  mirrored,
  idle,
  ripple,
  recording,
  frameStyle = tabletFrame,
}: {
  mirrored?: Mirrored;
  idle?: {title: string; detail: string; action?: string};
  /** A tap ripple on the mirrored screen, as a fraction of its width and height, 0..1 through. */
  ripple?: {x: number; y: number; progress: number};
  recording?: string;
  frameStyle?: FrameStyle | FrameSpec;
}) => {
  const stageWidth = MIRROR_VIEWPORT.width - 64 - 340;
  const stageHeight = MIRROR_VIEWPORT.height - 32 - TOOLBAR;
  let frame: ReactNode = null;
  if (mirrored) {
    const spec: FrameSpec | null =
      typeof frameStyle === 'string'
        ? frameStyle === 'none'
          ? null
          : FRAME_SPECS[frameStyle]
        : frameStyle;

    if (!spec) {
      const outerWidth = mirrored.width;
      const outerHeight = mirrored.height;
      const scale = Math.min((stageWidth - STAGE_MARGIN * 2) / outerWidth, (stageHeight - STAGE_MARGIN * 2) / outerHeight);
      frame = (
        <div style={{position: 'relative', width: outerWidth * scale, height: outerHeight * scale}}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: mirrored.width * scale,
              height: mirrored.height * scale,
              overflow: 'hidden',
            }}
          >
            <div style={{width: mirrored.width, height: mirrored.height, scale: String(scale), transformOrigin: '0 0'}}>{mirrored.screen}</div>
            {ripple && ripple.progress > 0 && ripple.progress < 1 ? (
              <span
                style={{
                  position: 'absolute',
                  left: `${ripple.x * 100}%`,
                  top: `${ripple.y * 100}%`,
                  width: 64,
                  height: 64,
                  marginLeft: -32,
                  marginTop: -32,
                  borderRadius: 999,
                  border: `2px solid ${beam[300]}`,
                  backgroundColor: mix(beam[400], 25),
                  scale: String(0.35 + 1.25 * ripple.progress),
                  opacity: 0.55 * (1 - ripple.progress),
                }}
              />
            ) : null}
          </div>
        </div>
      );
    } else {
      const shortEdge = Math.min(mirrored.width, mirrored.height);
      const innerBorder = spec.innerBorder ?? 0;
      const thickness = Math.round(shortEdge * spec.thickness) + innerBorder;
      const outerWidth = mirrored.width + thickness * 2;
      const outerHeight = mirrored.height + thickness * 2;
      const scale = Math.min((stageWidth - STAGE_MARGIN * 2) / outerWidth, (stageHeight - STAGE_MARGIN * 2) / outerHeight);
      const screenRadius = shortEdge * spec.radius;
      const outerRadius = spec.outerRadius !== undefined ? shortEdge * spec.outerRadius : screenRadius + thickness;
      frame = (
        <div style={{position: 'relative', width: outerWidth * scale, height: outerHeight * scale}}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: spec.body,
              border: `${Math.max(1, Math.min(2, thickness * 0.16) * scale)}px solid ${spec.rim}`,
              borderRadius: outerRadius * scale,
              boxShadow: `0 ${Math.min(thickness, 8) * scale * 2}px ${Math.min(thickness, 8) * scale * 6}px rgba(0,0,0,0.55)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: thickness * scale,
              top: thickness * scale,
              width: mirrored.width * scale,
              height: mirrored.height * scale,
              overflow: 'hidden',
              borderRadius: screenRadius * scale,
              boxShadow: innerBorder > 0 ? `0 0 0 ${innerBorder * scale}px #000000` : undefined,
            }}
          >
            <div style={{width: mirrored.width, height: mirrored.height, scale: String(scale), transformOrigin: '0 0'}}>{mirrored.screen}</div>
            {ripple && ripple.progress > 0 && ripple.progress < 1 ? (
              <span
                style={{
                  position: 'absolute',
                  left: `${ripple.x * 100}%`,
                  top: `${ripple.y * 100}%`,
                  width: 64,
                  height: 64,
                  marginLeft: -32,
                  marginTop: -32,
                  borderRadius: 999,
                  border: `2px solid ${beam[300]}`,
                  backgroundColor: mix(beam[400], 25),
                  scale: String(0.35 + 1.25 * ripple.progress),
                  opacity: 0.55 * (1 - ripple.progress),
                }}
              />
            ) : null}
          </div>
        </div>
      );
    }
  }

  return (
    <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', backgroundColor: ink[900]}}>
      <div style={{flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: stageBackground}}>
        {frame ??
          (idle ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: sp(3), textAlign: 'center', padding: `${sp(14)}px ${sp(6)}px`}}>
              <div style={{color: mist[400]}}>
                <MonitorSmartphone size={28} />
              </div>
              <div style={{...text.sm, fontWeight: 500, color: mist[200]}}>{idle.title}</div>
              <div style={{...text.xs, maxWidth: 320, lineHeight: '20px', color: mist[400]}}>{idle.detail}</div>
              {idle.action ? <Button label={idle.action} variant="primary" icon={<Play size={14} />} /> : null}
            </div>
          ) : null)}
      </div>
      <StageToolbar live={Boolean(mirrored)} recording={recording} />
    </div>
  );
};

const StageToolbar = ({live, recording}: {live: boolean; recording?: string}) => (
  <div style={{height: TOOLBAR, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, padding: `0 ${sp(3)}px`, borderTop: border(ink[800]), backgroundColor: mix(ink[950], 70)}}>
    <div style={{display: 'flex', gap: 2, opacity: live ? 1 : 0.55}}>
      <IconButton icon={ChevronLeft} size={18} />
      <IconButton icon={Home} size={17} />
      <IconButton icon={Square} size={14} />
      <span style={{margin: '0 6px', width: 1, height: 20, alignSelf: 'center', backgroundColor: ink[700]}} />
      <IconButton icon={Bell} />
      <IconButton icon={RotateCw} />
      <IconButton icon={Volume1} />
      <IconButton icon={Volume2} />
      <IconButton icon={Lock} size={15} />
    </div>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sp(2), fontSize: 11, color: mist[400]}}>
      {live ? (
        <>
          <span style={{fontFamily: mirrorFont.mono}}>{MIRROR_STREAM.size}</span>
          <span style={{color: ink[600]}}>·</span>
          <span>{MIRROR_STREAM.codec}</span>
          <span style={{color: ink[600]}}>·</span>
          <span style={{fontFamily: mirrorFont.mono}}>{MIRROR_STREAM.fps} fps</span>
        </>
      ) : (
        <span>Not mirroring</span>
      )}
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 2}}>
      {recording ? (
        <span style={{marginRight: 4, display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: round.lg, backgroundColor: mix(alert[500], 15), color: alert[400], fontSize: 11, fontWeight: 600}}>
          <span style={{width: 6, height: 6, borderRadius: 999, backgroundColor: alert[500]}} />
          <span style={{fontFamily: mirrorFont.mono}}>{recording}</span>
        </span>
      ) : null}
      <IconButton icon={Camera} size={17} />
      <IconButton icon={recording ? SquareStop : Circle} size={16} tone={recording ? 'danger' : undefined} />
      <IconButton icon={Expand} />
      <span style={{margin: '0 6px', width: 1, height: 20, backgroundColor: ink[700]}} />
      <IconButton icon={SquareStop} tone="danger" />
    </div>
  </div>
);

// ── Panels ─────────────────────────────────────────────────────────────────────────

type StepState = 'done' | 'active' | 'todo';

const Step = ({index, state, title, children, last}: {index: number; state: StepState; title: string; children?: ReactNode; last?: boolean}) => (
  <div style={{display: 'flex', gap: sp(3)}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <span
        style={{
          width: 24,
          height: 24,
          flexShrink: 0,
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 600,
          backgroundColor: state === 'done' ? mix(signal[500], 20) : state === 'active' ? beam[500] : ink[700],
          color: state === 'done' ? signal[400] : state === 'active' ? ink[950] : mist[400],
        }}
      >
        {state === 'done' ? <Check size={13} /> : index}
      </span>
      {last ? null : <span style={{marginTop: 4, width: 1, flex: 1, backgroundColor: ink[700]}} />}
    </div>
    <div style={{flex: 1, paddingBottom: sp(5)}}>
      <div style={{...text.xs, fontWeight: 600, color: state === 'done' ? mist[300] : mist[100]}}>{title}</div>
      {children ? <div style={{...text.px11, marginTop: 6, color: mist[400], lineHeight: '16px'}}>{children}</div> : null}
    </div>
  </div>
);

/** Setup's five steps. `step` is the one in progress, 1..5; earlier ones are done. */
export const SetupPanel = ({step, downloaded}: {step: number; downloaded?: number}) => {
  const state = (index: number): StepState => (index < step ? 'done' : index === step ? 'active' : 'todo');
  return (
    <Panel title="Setup" subtitle="Get a device talking to this PC">
      <Step index={1} state={state(1)} title={step > 1 ? 'Android platform-tools installed' : 'Install Android platform-tools'}>
        {step === 1 ? (
          <>
            CTRLbot Mirror needs Google's adb.exe. It downloads the official bundle from dl.google.com into this app's own folder.
            <div style={{marginTop: 8, height: 4, borderRadius: 999, backgroundColor: ink[700]}}>
              <div style={{height: '100%', width: `${(downloaded ?? 0) * 100}%`, borderRadius: 999, backgroundColor: beam[500]}} />
            </div>
            <div style={{marginTop: 4, fontFamily: mirrorFont.mono, fontSize: 10}}>{((downloaded ?? 0) * 7.7).toFixed(1)} MB / 7.7 MB</div>
          </>
        ) : null}
      </Step>
      <Step index={2} state={state(2)} title={step > 2 ? 'ADB server running' : 'Start the ADB server'}>
        {step === 2 ? 'The server is the background process adb uses to talk to devices.' : null}
      </Step>
      <Step index={3} state={state(3)} title="Turn on USB debugging">
        {step <= 3 ? (
          <>
            Settings → About phone → tap <b style={{color: mist[200]}}>Build number</b> seven times. Go back → System →{' '}
            <b style={{color: mist[200]}}>Developer options</b>. Turn on <b style={{color: mist[200]}}>USB debugging</b>.
          </>
        ) : null}
      </Step>
      <Step index={4} state={state(4)} title="Authorise this computer">
        {step === 4 ? 'Unlock the device and tap Allow on the "Allow USB debugging?" prompt.' : step > 4 ? 'Authorised. You are ready to mirror.' : null}
      </Step>
      <Step index={5} state={state(5)} title="Start mirroring" last>
        Pick the device in the Devices panel and press Start mirroring.
        <div style={{marginTop: 8}}>
          <Button label="Go to Devices" />
        </div>
      </Step>
    </Panel>
  );
};

/** Devices: the tablet on USB, its details once selected, and Wi-Fi pairing. */
export const DevicesPanel = ({
  selected,
  details,
  live,
  starting,
  pairingAddress,
  pairingCode,
  pairPressed,
}: {
  selected: boolean;
  details: boolean;
  live: boolean;
  starting?: boolean;
  pairingAddress?: string;
  pairingCode?: string;
  pairPressed?: boolean;
}) => (
  <Panel title="Devices" subtitle="1 connected" actions={<IconButton icon={RefreshCw} size={15} />}>
    <div
      style={{
        borderRadius: round.xl,
        border: border(selected ? mix(beam[500], 60) : ink[700]),
        backgroundColor: selected ? mix(beam[500], 10) : mix(ink[850], 60),
        padding: sp(3),
        display: 'flex',
        gap: sp(3),
      }}
    >
      <span style={{marginTop: 2, width: 32, height: 32, borderRadius: round.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: mix(signal[500], 15), color: signal[400]}}>
        <Usb size={16} />
      </span>
      <div>
        <div style={{...text.sm, fontWeight: 500, color: mist[100]}}>{MIRROR_DEVICE.model}</div>
        <div style={{...text.px11, marginTop: 2, fontFamily: mirrorFont.mono, color: mist[400]}}>{MIRROR_DEVICE.serial}</div>
        <div style={{marginTop: sp(2), display: 'flex', gap: 6}}>
          <Badge tone="good">Ready</Badge>
          <Badge>{MIRROR_DEVICE.transport}</Badge>
        </div>
      </div>
    </div>

    {selected ? (
      <Card style={{marginTop: sp(3)}}>
        {details ? (
          <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <div style={{...text.sm, fontWeight: 600, color: mist[100]}}>{MIRROR_DEVICE.name}</div>
                <div style={{...text.px11, marginTop: 2, color: mist[400]}}>{MIRROR_DEVICE.android}</div>
              </div>
              <IconButton icon={RefreshCw} size={14} />
            </div>
            <div style={{marginTop: sp(3), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${sp(2)}px ${sp(3)}px`, fontSize: 11}}>
              <div>
                <div style={{color: mist[400]}}>Screen</div>
                <div style={{fontFamily: mirrorFont.mono, color: mist[200]}}>{MIRROR_DEVICE.screen}</div>
              </div>
              <div>
                <div style={{color: mist[400]}}>Battery</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 4, fontFamily: mirrorFont.mono, color: mist[200]}}>
                  {MIRROR_DEVICE.battery}
                  <BatteryCharging size={11} color={signal[400]} />
                </div>
              </div>
              <div style={{gridColumn: 'span 2'}}>
                <div style={{color: mist[400]}}>Build</div>
                <div style={{fontFamily: mirrorFont.mono, color: mist[200]}}>{MIRROR_DEVICE.build}</div>
              </div>
            </div>
            <div style={{marginTop: sp(4), display: 'flex', gap: sp(2)}}>
              {live ? (
                <Button label="Stop mirroring" variant="danger" wide />
              ) : (
                <Button label={starting ? 'Starting…' : 'Start mirroring'} variant="primary" icon={<Play size={14} />} wide pressed={starting} />
              )}
              <Button label="Go wireless" icon={<Wifi size={14} />} />
            </div>
          </>
        ) : (
          <div style={{...text.xs, color: mist[400]}}>Reading device information…</div>
        )}
      </Card>
    ) : null}

    <div style={{marginTop: sp(5)}}>
      <SectionLabel>Pair over Wi-Fi</SectionLabel>
      <div style={{...text.px11, marginBottom: sp(2), color: mist[400], lineHeight: '18px'}}>
        On the device: Developer options → Wireless debugging → Pair device with pairing code. Copy the address and code shown there.
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: sp(2)}}>
        <Field label="Pairing address">
          <Input value={pairingAddress} placeholder="192.168.1.42:37021" mono />
        </Field>
        <Field label="Pairing code">
          <Input value={pairingCode} placeholder="123456" mono />
        </Field>
        <Button label="Pair" wide pressed={pairPressed} />
      </div>
    </div>
  </Panel>
);

export interface FrameButton {
  id: FrameStyle;
  label: string;
  width: number;
  height: number;
  radius: number;
  borderWidth: number;
  borderStyle: 'dashed' | 'solid';
}

export const FRAMES: FrameButton[] = [
  {id: 'none', label: 'None', width: 16, height: 28, radius: 2, borderWidth: 1, borderStyle: 'dashed'},
  {id: 'flat', label: 'Flat', width: 16, height: 28, radius: 6, borderWidth: 1, borderStyle: 'solid'},
  {id: 'rounded', label: 'Rounded', width: 16, height: 28, radius: 12, borderWidth: 2, borderStyle: 'solid'},
  {id: 'tablet1', label: 'Tablet 1', width: 28, height: 20, radius: 3, borderWidth: 4, borderStyle: 'solid'},
  {id: 'tablet2', label: 'Tablet 2', width: 28, height: 20, radius: 5, borderWidth: 4, borderStyle: 'solid'},
];

/** Studio: capture and stream quality, the settings Nathan walks through. */
export const StudioPanel = ({
  frame = 'rounded',
  padding = MIRROR_STUDIO.padding,
}: {
  frame?: FrameStyle;
  padding?: number;
} = {}) => (
  <Panel title="Studio" subtitle="How captures look">
    <SectionLabel>Device frame</SectionLabel>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6}}>
      {FRAMES.map((item) => {
        const selected = item.id === frame;
        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              borderRadius: round.lg,
              border: border(selected ? mix(beam[500], 60) : ink[700]),
              backgroundColor: selected ? mix(beam[500], 10) : 'transparent',
              padding: sp(2),
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                width: item.width,
                height: item.height,
                borderRadius: item.radius,
                border: `${item.borderWidth}px ${item.borderStyle} ${ink[500]}`,
                backgroundColor: ink[700],
                boxSizing: 'border-box',
              }}
            />
            <span style={{fontSize: 9, lineHeight: '12px', color: mist[400]}}>{item.label}</span>
          </div>
        );
      })}
    </div>
    <Card style={{marginTop: sp(4)}}>
      <Row label="Frame in captures" hint="Off exports the raw screen at native resolution">
        <Toggle checked={MIRROR_STUDIO.frameInCaptures} />
      </Row>
      <Field label={`Padding — ${padding}px`}>
        <Slider fraction={padding / 160} readout={`${padding}px`} />
      </Field>
    </Card>
    <div style={{marginTop: sp(4)}}>
      <SectionLabel>Capture</SectionLabel>
      <Card style={{display: 'flex', flexDirection: 'column', gap: sp(3)}}>
        <Field label="Screenshot scale">
          <Select value={MIRROR_STUDIO.screenshotScale} />
        </Field>
        <Field label="Recording format">
          <Select value={MIRROR_STUDIO.recordingFormat} />
        </Field>
        <Field label={`Recording bitrate — ${MIRROR_STUDIO.recordingBitrate} Mbps`}>
          <Slider fraction={(MIRROR_STUDIO.recordingBitrate - 2) / 38} readout={`${MIRROR_STUDIO.recordingBitrate}M`} />
        </Field>
        <div style={{display: 'flex', gap: sp(2)}}>
          <Button label="Open folder" variant="ghost" icon={<FolderOpen size={13} />} wide />
          <Button label="Change" variant="ghost" wide />
        </div>
      </Card>
    </div>
    <div style={{marginTop: sp(4)}}>
      <SectionLabel>Stream quality</SectionLabel>
      <Card style={{display: 'flex', flexDirection: 'column', gap: sp(3)}}>
        <Field label={`Resolution cap — ${MIRROR_STUDIO.resolutionCap}px`}>
          <Slider fraction={MIRROR_STUDIO.resolutionCap / 2560} readout={`${MIRROR_STUDIO.resolutionCap}`} />
        </Field>
        <Field label={`Bitrate — ${MIRROR_STUDIO.bitrate} Mbps`}>
          <Slider fraction={(MIRROR_STUDIO.bitrate - 1) / 31} readout={`${MIRROR_STUDIO.bitrate}M`} />
        </Field>
        <Field label={`Frame rate — ${MIRROR_STUDIO.frameRate} fps`}>
          <Slider fraction={(MIRROR_STUDIO.frameRate - 15) / 105} readout={`${MIRROR_STUDIO.frameRate}`} />
        </Field>
        <Field label="Video codec" hint="H.265 and AV1 need device and GPU support on both ends.">
          <Select value={MIRROR_STUDIO.codec} />
        </Field>
      </Card>
    </div>
  </Panel>
);

/** Apps: the tablet's packages, the list Nathan cleans the preinstalled ones from. */
export const AppsPanel = ({
  highlight,
  uninstallAction,
}: {
  highlight?: number;
  uninstallAction?: boolean;
}) => (
  <Panel title="Apps" subtitle="28 packages" actions={<IconButton icon={RefreshCw} size={15} />}>
    <Input placeholder="Filter packages…" />
    <Row label="Include system apps">
      <Toggle checked={false} />
    </Row>
    <div style={{marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4}}>
      {MIRROR_APPS.map((app, index) => (
        <div
          key={app.id}
          style={{
            padding: `${sp(2)}px ${sp(2)}px`,
            borderRadius: round.lg,
            border: border(index === highlight ? ink[700] : 'transparent'),
            backgroundColor: index === highlight ? ink[850] : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{...text.xs, fontWeight: 500, color: mist[100]}}>{app.label}</div>
            <div style={{fontSize: 10, lineHeight: '14px', fontFamily: mirrorFont.mono, color: mist[400]}}>{app.id}</div>
          </div>
          {index === highlight ? (
            <div style={{display: 'flex', alignItems: 'center', gap: 2, color: mist[300]}}>
              <Play size={14} />
              {uninstallAction ? (
                <span style={{color: alert[400], display: 'flex', alignItems: 'center', marginLeft: 8}} title="Uninstall">
                  <Trash2 size={14} />
                </span>
              ) : (
                <span style={{fontSize: 10, fontWeight: 700, color: alert[400], marginLeft: 8}}>✕</span>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  </Panel>
);

/** Files: /sdcard, with the drop target for copying from the PC. */
export const FilesPanel = ({
  dragging,
  extraFile,
}: {
  dragging?: boolean;
  extraFile?: {name: string; size: string};
}) => {
  const files = extraFile
    ? [...MIRROR_FILES.files, extraFile]
    : MIRROR_FILES.files;

  return (
    <Panel title="Files" subtitle={MIRROR_FILES.path} actions={<IconButton icon={RefreshCw} size={15} />}>
      <div
        style={{
          ...text.px11,
          textAlign: 'center',
          padding: sp(3),
          borderRadius: round.xl,
          border: `1px dashed ${dragging ? beam[400] : ink[600]}`,
          backgroundColor: dragging ? mix(beam[500], 10) : 'transparent',
          color: dragging ? beam[300] : mist[400],
        }}
      >
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 4}}>
          <Upload size={14} />
        </div>
        Drop files here to copy them to <span style={{fontFamily: mirrorFont.mono}}>{MIRROR_FILES.path}</span>
      </div>
      <div style={{marginTop: sp(2), display: 'flex', flexDirection: 'column', gap: 2}}>
        {MIRROR_FILES.folders.map((name) => (
          <div key={name} style={{display: 'flex', alignItems: 'center', gap: sp(2), padding: `6px ${sp(2)}px`}}>
            <Folder size={14} color={beam[400]} />
            <span style={{...text.xs, color: mist[200]}}>{name}</span>
          </div>
        ))}
        {files.map((file) => (
          <div key={file.name} style={{display: 'flex', alignItems: 'center', gap: sp(2), padding: `6px ${sp(2)}px`}}>
            <File size={14} color={mist[400]} />
            <span>
              <span style={{...text.xs, display: 'block', color: mist[200]}}>{file.name}</span>
              <span style={{display: 'block', fontFamily: mirrorFont.mono, fontSize: 10, color: mist[400]}}>{file.size}</span>
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
};

/** Shell: one command on the device and its output. */
export const ShellPanel = ({command, output}: {command?: string; output: string[]}) => (
  <Panel title="Shell" subtitle={`adb -s ${MIRROR_DEVICE.serial} shell`}>
    <div
      style={{
        minHeight: 128,
        marginBottom: sp(3),
        padding: sp(3),
        borderRadius: round.xl,
        border: border(ink[700]),
        backgroundColor: ink[950],
        fontFamily: mirrorFont.mono,
        fontSize: 11,
        lineHeight: '18px',
      }}
    >
      {command ? (
        <>
          <div style={{color: beam[300]}}>
            <span style={{color: mist[400]}}>$ </span>
            {command}
          </div>
          <div style={{whiteSpace: 'pre', color: mist[200]}}>{output.join('\n')}</div>
        </>
      ) : (
        <div style={{color: mist[400]}}>Runs a single command on the device and prints the combined output.</div>
      )}
    </div>
    <Input placeholder="Type a shell command" mono />
  </Panel>
);

const PRIORITY_ORDER: LogPriority[] = ['V', 'D', 'I', 'W', 'E', 'F'];

const PRIORITY_COLOR: Record<LogPriority, string> = {
  V: mist[400],
  D: beam[300],
  I: mist[200],
  W: warn[400],
  E: alert[400],
  F: alert[400],
};

const PRIORITY_LABEL: Record<LogPriority, string> = {
  V: 'Verbose+',
  D: 'Debug+',
  I: 'Info+',
  W: 'Warn+',
  E: 'Error+',
  F: 'Fatal',
};

/**
 * Logcat: streaming device logs with priority filter and follow-tail toggle.
 * Rebuilt from Mirror's `LogcatPanel.tsx`.
 * `count` limits the number of visible lines so the beat can stream them.
 */
export const LogcatPanel = ({
  lines = MIRROR_LOGCAT,
  count,
  streaming = true,
  filter = '',
  minPriority = 'I',
  follow = true,
}: {
  lines?: MirrorLogLine[];
  count?: number;
  streaming?: boolean;
  filter?: string;
  minPriority?: LogPriority;
  follow?: boolean;
} = {}) => {
  const threshold = PRIORITY_ORDER.indexOf(minPriority);
  const needle = filter.trim().toLowerCase();

  const allFiltered = lines.filter((line) => {
    if (PRIORITY_ORDER.indexOf(line.priority) < threshold) return false;
    if (!needle) return true;
    return line.tag.toLowerCase().includes(needle) || line.message.toLowerCase().includes(needle);
  });

  const displayLines = count !== undefined ? allFiltered.slice(0, count) : allFiltered;

  return (
    <Panel
      title="Logcat"
      subtitle={streaming ? `${displayLines.length} lines buffered` : 'Stopped'}
      actions={
        <>
          <IconButton icon={streaming ? Pause : Play} active={streaming} size={15} />
          <IconButton icon={Eraser} size={15} />
        </>
      }
    >
      <div style={{display: 'flex', gap: sp(2), marginBottom: sp(2)}}>
        <div style={{flex: 1}}>
          <Input placeholder="Filter by tag or message…" value={filter} />
        </div>
        <div style={{width: 104, flexShrink: 0}}>
          <Select value={PRIORITY_LABEL[minPriority] ?? 'Info+'} />
        </div>
      </div>

      <Row label="Follow tail">
        <Toggle checked={follow} />
      </Row>

      <div
        style={{
          marginTop: sp(2),
          height: 220,
          overflow: 'hidden',
          borderRadius: round.xl,
          border: border(ink[700]),
          backgroundColor: ink[950],
          padding: sp(2),
          fontFamily: mirrorFont.mono,
          fontSize: 10.5,
          lineHeight: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {displayLines.length === 0 ? (
          <p style={{padding: sp(3), textAlign: 'center', color: mist[400], margin: 0, ...text.xs}}>
            {streaming ? 'Waiting for output…' : 'Press play to start streaming logcat.'}
          </p>
        ) : (
          displayLines.map((line) => (
            <div key={line.id} style={{display: 'flex', gap: 6, minWidth: 0}}>
              <span
                style={{
                  width: 12,
                  flexShrink: 0,
                  textAlign: 'center',
                  color: PRIORITY_COLOR[line.priority],
                  fontWeight: line.priority === 'F' ? 600 : undefined,
                }}
              >
                {line.priority}
              </span>
              <span
                style={{
                  width: 110,
                  flexShrink: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#a78bfa',
                }}
                title={line.tag}
              >
                {line.tag}
              </span>
              <span
                style={{
                  minWidth: 0,
                  flex: 1,
                  wordBreak: 'break-all',
                  color: PRIORITY_COLOR[line.priority],
                }}
              >
                {line.message}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{marginTop: sp(3), display: 'flex'}}>
        <Button label="Clear the device's log buffer" variant="ghost" wide />
      </div>
    </Panel>
  );
};
