// Thirty-second Play Store / YouTube marketing cut.
//
// The real End User Interface is the hero: welcome, power, Many-to-One,
// Many-to-Many, and a short phone/tablet compatibility beat. The supplied
// Master Control artwork is used only as the brand bookend.

import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {color, font} from '../design/theme';

const MasterCard = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: color.void, overflow: 'hidden'}}>
      <CanvasImage
        name="Master Control artwork"
        src={staticFile('brand/master_control_169.png')}
        width={1920}
        height={1080}
        style={{
          width: 1920,
          height: 1080,
          opacity: interpolate(frame, [0, 12], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 54], [1.025, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const Welcome = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 54%, ${color.base} 0%, ${color.void} 72%)`,
        overflow: 'hidden',
      }}
    >
      <Interactive.Div
        name="Welcome eyebrow"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 30,
          color: color.textMuted,
          fontFamily: font.mono,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [4, 18], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        End User Interface
      </Interactive.Div>
      <CanvasImage
        name="Tablet Welcome"
        src={staticFile('marketing/eui/welcome-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [0, 16], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 72], [0.985, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const PowerOn = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 54%, ${color.base} 0%, ${color.void} 72%)`,
        overflow: 'hidden',
      }}
    >
      <Interactive.Div
        name="Power eyebrow"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 30,
          color: color.textMuted,
          fontFamily: font.mono,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [4, 18], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Power On
      </Interactive.Div>
      <CanvasImage
        name="Tablet Power On"
        src={staticFile('marketing/eui/powering-on-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [0, 14], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 72], [0.985, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const ManyToOne = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 54%, ${color.base} 0%, ${color.void} 72%)`,
        overflow: 'hidden',
      }}
    >
      <Interactive.Div
        name="Many-to-One eyebrow"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 30,
          color: color.textMuted,
          fontFamily: font.mono,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [4, 18], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Many-to-One
      </Interactive.Div>
      <CanvasImage
        name="Many-to-One ready"
        src={staticFile('marketing/eui/many-to-one-cold-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [0, 14], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 180], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
      <CanvasImage
        name="Many-to-One Input 1"
        src={staticFile('marketing/eui/many-to-one-input1-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [54, 62], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 180], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
      <CanvasImage
        name="Many-to-One HDMI 1"
        src={staticFile('marketing/eui/many-to-one-hdmi1-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [132, 140], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 180], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const ManyToMany = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 54%, ${color.base} 0%, ${color.void} 72%)`,
        overflow: 'hidden',
      }}
    >
      <Interactive.Div
        name="Many-to-Many eyebrow"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 30,
          color: color.textMuted,
          fontFamily: font.mono,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [4, 18], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Many-to-Many
      </Interactive.Div>
      <CanvasImage
        name="Many-to-Many ready"
        src={staticFile('marketing/eui/many-to-many-cold-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [0, 14], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 246], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
      <CanvasImage
        name="Many-to-Many Input 1 selected"
        src={staticFile('marketing/eui/many-to-many-input1-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [44, 52], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 246], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
      <CanvasImage
        name="Many-to-Many Output 2 routed"
        src={staticFile('marketing/eui/many-to-many-output2-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [94, 102], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 246], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
      <CanvasImage
        name="Many-to-Many Input 3 selected"
        src={staticFile('marketing/eui/many-to-many-input3-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [158, 166], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 246], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
      <CanvasImage
        name="Many-to-Many all outputs"
        src={staticFile('marketing/eui/many-to-many-all-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 236,
          top: 88,
          width: 1449,
          height: 970,
          opacity: interpolate(frame, [214, 222], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 246], [0.992, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const PhoneAndTablet = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 52% 58%, ${color.base} 0%, ${color.void} 74%)`,
        overflow: 'hidden',
      }}
    >
      <Interactive.Div
        name="Compatibility eyebrow"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 36,
          color: color.accent,
          fontFamily: font.mono,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [4, 18], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        End User Interface
      </Interactive.Div>
      <Interactive.Div
        name="Compatibility title"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 70,
          color: color.text,
          fontFamily: font.display,
          fontSize: 52,
          textAlign: 'center',
          opacity: interpolate(frame, [8, 24], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [8, 24], ['0px 12px', '0px 0px'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Phone + tablet
      </Interactive.Div>
      <Interactive.Div
        name="Phone label"
        style={{
          position: 'absolute',
          left: 96,
          top: 210,
          width: 400,
          color: color.textDim,
          fontFamily: font.mono,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [16, 30], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Phone
      </Interactive.Div>
      <Interactive.Div
        name="Tablet label"
        style={{
          position: 'absolute',
          left: 620,
          top: 210,
          width: 1195,
          color: color.textDim,
          fontFamily: font.mono,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [16, 30], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Tablet
      </Interactive.Div>
      <CanvasImage
        name="Phone EUI"
        src={staticFile('marketing/eui/many-to-many-all-phone.png')}
        width={1810}
        height={3490}
        style={{
          position: 'absolute',
          left: 88,
          top: 244,
          width: 415,
          height: 800,
          opacity: interpolate(frame, [10, 26], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [10, 34], ['-24px 0px', '0px 0px'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <CanvasImage
        name="Tablet EUI"
        src={staticFile('marketing/eui/many-to-many-all-tablet.png')}
        width={3632}
        height={2432}
        style={{
          position: 'absolute',
          left: 620,
          top: 244,
          width: 1195,
          height: 800,
          opacity: interpolate(frame, [14, 30], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [14, 38], ['24px 0px', '0px 0px'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

export const MasterControlPromo = () => (
  <AbsoluteFill style={{backgroundColor: color.void}}>
    <TransitionSeries name="Master Control promo">
      <TransitionSeries.Sequence durationInFrames={54} name="Master Control open">
        <MasterCard />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 12})}
      />

      <TransitionSeries.Sequence durationInFrames={108} name="Welcome">
        <Welcome />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 12})}
      />

      <TransitionSeries.Sequence durationInFrames={102} name="Power on">
        <PowerOn />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 12})}
      />

      <TransitionSeries.Sequence durationInFrames={216} name="Many-to-One">
        <ManyToOne />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 12})}
      />

      <TransitionSeries.Sequence durationInFrames={288} name="Many-to-Many">
        <ManyToMany />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 12})}
      />

      <TransitionSeries.Sequence durationInFrames={132} name="Phone and tablet support">
        <PhoneAndTablet />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 12})}
      />

      <TransitionSeries.Sequence durationInFrames={72} name="Master Control close">
        <MasterCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
