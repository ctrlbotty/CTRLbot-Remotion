// Two surfaces at once: the tablet EUI and the phone EUI, side by side.
//
// The one beat in the promo that `Stage` cannot do, because `Stage` holds a single
// panel with a copy column beside it. Here the two panels *are* the message — the same
// room running on both form factors — so the copy goes above them and the pair is
// centred underneath.
//
// Sizing favours the phone deliberately. At a shared panel height the tablet is 960px
// wide and the phone about 277px, and phone EUI labels do not read at 1080p that small
// — which would leave the beat proving nothing. The tablet has been on screen for five
// preceding beats and can afford to be the smaller of the two here; the phone cannot.
// So the phone is set taller than the tablet, against the intuition that the bigger
// device should be bigger.

import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, type Shot} from '../camera/Camera';
import {background, color, font, radius, space, type} from '../design/theme';

export const DUAL_STAGE = {
  /** Frame pixels. The phone is taller than the tablet on purpose — see above. */
  tabletHeight: 470,
  phoneHeight: 750,
  gap: 72,
  titleTop: 56,
  /**
   * Where the panels may start. The copy block above is eyebrow + a line of Audiowide
   * + a line of body, and the first version centred the panels in the whole frame — so
   * the 880px phone reached up to y=148 and printed straight through the headline.
   * Reserving the band outright is what keeps a taller phone from ever doing that
   * again; the pair centres in what is left.
   */
  panelZoneTop: 250,
  panelZoneBottom: 1020,
  /** Frame pixels the pair rises over the beat when `drift` is driven. */
  driftRise: 64,
} as const;

type Panel = {
  contentSize: {width: number; height: number};
  shots: Shot[];
  height: number;
  children: ReactNode;
};

/** Frame pixels of device edge around each screen. See `Stage`'s `bezel`. */
const BEZEL = 18;

const Panel = ({panel, left, top}: {panel: Panel; left: number; top: number}) => {
  const width = (panel.contentSize.width / panel.contentSize.height) * panel.height;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: width + BEZEL * 2,
        height: panel.height + BEZEL * 2,
        padding: BEZEL,
        boxSizing: 'border-box',
        borderRadius: radius.xl,
        backgroundColor: color.void,
        border: `1px solid ${color.lineSoft}`,
        boxShadow: `0 40px 120px ${color.scrim}`,
      }}
    >
      <div style={{width, height: panel.height, overflow: 'hidden', borderRadius: radius.sm}}>
        <Camera
          contentSize={panel.contentSize}
          shots={panel.shots}
          viewport={{width, height: panel.height}}
        >
          {panel.children}
        </Camera>
      </div>
    </div>
  );
};

export const DualStage = ({
  eyebrow,
  title,
  body,
  at = 0,
  until,
  tablet,
  phone,
  copy,
  background: stageBackground = background.stage,
  drift = 0,
}: {
  eyebrow?: string;
  title?: string;
  body?: ReactNode;
  at?: number;
  /** Beat length; the copy leaves over the 14 frames before it. See StageCopy. */
  until?: number;
  tablet: Omit<Panel, 'height'>;
  phone: Omit<Panel, 'height'>;
  /** Replaces the built-in eyebrow/title/body block outright. */
  copy?: ReactNode;
  /** Background under the whole stage. Defaults to the house marketing gradient. */
  background?: string;
  /**
   * 0..1. How far through the pair's slow rise the beat is.
   *
   * This beat has no camera and one state change, which measured 89% inert — the most
   * dead of the seven. Rather than push into panels whose whole point is that they are
   * shown whole, the pair drifts upward across the beat: continuous, subtle, and it
   * leaves both aspect ratios untouched.
   */
  drift?: number;
}) => {
  const frame = useCurrentFrame();
  const {width: frameWidth, height: frameHeight} = useVideoConfig();

  const tabletPanel = {...tablet, height: DUAL_STAGE.tabletHeight};
  const phonePanel = {...phone, height: DUAL_STAGE.phoneHeight};
  const tabletWidth =
    (tablet.contentSize.width / tablet.contentSize.height) * DUAL_STAGE.tabletHeight;
  const phoneWidth =
    (phone.contentSize.width / phone.contentSize.height) * DUAL_STAGE.phoneHeight;

  // Centred as a pair, so the composition does not drift when either panel is retuned.
  const pairWidth = tabletWidth + DUAL_STAGE.gap + phoneWidth;
  const pairLeft = (frameWidth - pairWidth) / 2;
  // Centred in the band below the copy, never in the whole frame.
  const centreY = (DUAL_STAGE.panelZoneTop + Math.min(DUAL_STAGE.panelZoneBottom, frameHeight)) / 2;

  return (
    <AbsoluteFill style={{background: stageBackground, overflow: 'hidden'}}>
      {copy ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: DUAL_STAGE.titleTop,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {copy}
        </div>
      ) : (
      <Interactive.Div
        name="Dual stage copy"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: DUAL_STAGE.titleTop,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: space(1.5),
          textAlign: 'center',
          opacity: until
            ? interpolate(frame, [until - 14, until], [1, 0], {
                easing: Easing.bezier(0.7, 0, 0.84, 0),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1,
        }}
      >
        {eyebrow ? (
          <Interactive.Div
            name="Dual stage eyebrow"
            style={{
              color: color.accent,
              fontFamily: font.mono,
              fontSize: type.label,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: interpolate(frame, [at, at + 14], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {eyebrow}
          </Interactive.Div>
        ) : null}

        <Interactive.Div
          name="Dual stage title"
          style={{
            color: color.text,
            fontFamily: font.display,
            fontSize: type.title,
            lineHeight: 0.98,
            letterSpacing: 0,
            opacity: interpolate(frame, [at + 4, at + 20], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [at + 4, at + 24], ['0px 14px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {title}
        </Interactive.Div>

        {body ? (
          <Interactive.Div
            name="Dual stage body"
            style={{
              color: color.textMuted,
              fontFamily: font.ui,
              fontSize: type.body,
              lineHeight: 1.45,
              opacity: interpolate(frame, [at + 12, at + 28], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {body}
          </Interactive.Div>
        ) : null}
      </Interactive.Div>
      )}

      <Panel
        panel={tabletPanel}
        left={pairLeft}
        top={centreY - DUAL_STAGE.tabletHeight / 2 + DUAL_STAGE.driftRise * (1 - drift)}
      />
      <Panel
        panel={phonePanel}
        left={pairLeft + tabletWidth + DUAL_STAGE.gap}
        top={centreY - DUAL_STAGE.phoneHeight / 2 + DUAL_STAGE.driftRise * (1 - drift)}
      />
    </AbsoluteFill>
  );
};
