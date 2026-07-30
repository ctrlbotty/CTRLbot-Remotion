// The open and close cards.
//
// These are the only places a headline is set in Audiowide, and they are the reason the
// face earns its keep: one line, large, all caps, with the wordmark above it. Everything
// else in the cut is Montserrat.

import {AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {color, font, type} from '../design/theme';
import type {Device} from './shared';

export const BrandCard = ({
  device,
  eyebrow,
  headline,
  subhead,
  kicker,
}: {
  device: Device;
  /** Small mono line above the headline — what this video is. */
  eyebrow?: string;
  /** Set in Audiowide. Keep it to a few words — it is a headline, not a sentence. */
  headline: string;
  subhead: string;
  /** Small mono line under the rule. */
  kicker?: string;
}) => {
  const frame = useCurrentFrame();
  const isPhone = device === 'phone';

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      {/* A single accent wash, off-centre, so the card is not a flat black rectangle. */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(60% 45% at 68% 32%, rgba(0,143,212,0.16) 0%, rgba(0,0,0,0) 70%)',
        }}
      />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: isPhone ? 96 : 160,
          paddingRight: isPhone ? 96 : 160,
        }}
      >
        <Interactive.Div
          name="Wordmark"
          style={{
            marginBottom: isPhone ? 56 : 48,
            opacity: interpolate(frame, [0, 28], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [0, 36], ['0px 20px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {/* The shipped banner lockup — one white wordmark, no two-tone split. */}
          <Img
            name="CTRLbot banner"
            src={staticFile('brand/cbot_banner_white.png')}
            style={{width: isPhone ? 420 : 480, height: 'auto', display: 'block'}}
          />
        </Interactive.Div>

        {eyebrow ? (
          <Interactive.Div
            name="Eyebrow"
            style={{
              marginBottom: 20,
              fontFamily: font.mono,
              fontWeight: 700,
              fontSize: type.label,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: color.accent,
              opacity: interpolate(frame, [12, 40], [0, 1], {
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
          name="Headline"
          style={{
            fontFamily: font.display,
            fontWeight: 400,
            fontSize: isPhone ? 72 : type.display,
            lineHeight: 0.98,
            letterSpacing: 0,
            textTransform: 'uppercase',
            color: color.text,
            opacity: interpolate(frame, [20, 52], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [20, 60], ['0px 26px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {headline}
        </Interactive.Div>

        <Interactive.Div
          name="Rule"
          style={{
            height: 2,
            marginTop: 36,
            marginBottom: 28,
            backgroundColor: color.accent,
            boxShadow: '0 0 24px rgba(0,143,212,0.6)',
            width: interpolate(frame, [44, 92], ['0%', '38%'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        />

        <Interactive.Div
          name="Subhead"
          style={{
            maxWidth: isPhone ? 820 : 1080,
            fontFamily: font.ui,
            fontWeight: 400,
            fontSize: isPhone ? type.subheading : type.body,
            lineHeight: 1.42,
            color: color.textMuted,
            opacity: interpolate(frame, [56, 92], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [56, 100], ['0px 18px', '0px 0px'], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {subhead}
        </Interactive.Div>

        {kicker ? (
          <Interactive.Div
            name="Kicker"
            style={{
              marginTop: 44,
              fontFamily: font.mono,
              fontWeight: 700,
              fontSize: type.label,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: color.accent,
              opacity: interpolate(frame, [84, 116], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {kicker}
          </Interactive.Div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
