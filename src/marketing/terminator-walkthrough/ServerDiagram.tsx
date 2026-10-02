// The server chapter's diagram: CTRLbot Terminator on the PC is the TCP server, CTRLbot IoT
// on the tablet is the client. The client sends a command, the server replies.
//
// Laid out on a 1280x800 plane so the walkthrough shell's camera frames it like a surface.
// It is a diagram, not product UI: no window chrome, and no claim beyond the two labels.
// `progress` 0 -> 0.5 draws the command arrow (client -> server), 0.5 -> 1 draws the reply (server -> client).

import {AbsoluteFill, Easing, Interactive, interpolate} from 'remotion';
import {color, font} from '../../design/theme';

export type ServerDiagramProps = {progress: number};

const NODE_TOP = 250;
const NODE_HEIGHT = 300;
const NODE_WIDTH = 400;
const PC_LEFT = 80;
const TABLET_LEFT = 800;
const ARROW_LEFT = PC_LEFT + NODE_WIDTH + 24;
const ARROW_WIDTH = TABLET_LEFT - ARROW_LEFT - 24;
const SEND_Y = 355;
const REPLY_Y = 445;

const nodeStyle = {
  position: 'absolute',
  top: NODE_TOP,
  width: NODE_WIDTH,
  height: NODE_HEIGHT,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 32,
  textAlign: 'center',
  borderRadius: 16,
  backgroundColor: color.card,
  fontFamily: font.mono,
  fontSize: 15,
  lineHeight: 1.6,
  color: color.text,
} as const;

export const ServerDiagram: React.FC<ServerDiagramProps> = ({progress}) => {
  return (
    <AbsoluteFill style={{backgroundColor: color.base}}>
      <Interactive.Div
        name="Server node"
        style={{
          ...nodeStyle,
          left: PC_LEFT,
          border: `2px solid ${color.accent}`,
          opacity: interpolate(progress, [0, 0.08], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <div>Your PC · CTRLbot Terminator</div>
        <div>TCP server :23</div>
      </Interactive.Div>

      <Interactive.Div
        name="Client node"
        style={{
          ...nodeStyle,
          left: TABLET_LEFT,
          border: `2px solid ${color.line}`,
          opacity: interpolate(progress, [0, 0.08], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        CTRLbot IoT · client
      </Interactive.Div>

      <Interactive.Div
        name="Command arrow"
        style={{position: 'absolute', left: ARROW_LEFT, top: SEND_Y, width: ARROW_WIDTH, height: 0}}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: -1,
            width: ARROW_WIDTH,
            height: 2,
            backgroundColor: color.accent,
            transformOrigin: 'right center',
            scale: `${interpolate(progress, [0.08, 0.4], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} 1`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -2,
            top: -8,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: `14px solid ${color.accent}`,
            opacity: interpolate(progress, [0.36, 0.42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: -36,
            width: ARROW_WIDTH,
            textAlign: 'center',
            fontFamily: font.mono,
            fontSize: 15,
            color: color.text,
            opacity: interpolate(progress, [0.2, 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            translate: `0 ${interpolate(progress, [0.2, 0.4], [6, 0], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`,
          }}
        >
          ← hello world
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Reply arrow"
        style={{position: 'absolute', left: ARROW_LEFT, top: REPLY_Y, width: ARROW_WIDTH, height: 0}}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: -1,
            width: ARROW_WIDTH,
            height: 2,
            backgroundColor: color.success,
            transformOrigin: 'left center',
            scale: `${interpolate(progress, [0.5, 0.9], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} 1`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -2,
            top: -8,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: `14px solid ${color.success}`,
            opacity: interpolate(progress, [0.86, 0.92], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 14,
            width: ARROW_WIDTH,
            textAlign: 'center',
            fontFamily: font.mono,
            fontSize: 15,
            color: color.text,
            opacity: interpolate(progress, [0.7, 0.9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            translate: `0 ${interpolate(progress, [0.7, 0.9], [-6, 0], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`,
          }}
        >
          reply →
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
