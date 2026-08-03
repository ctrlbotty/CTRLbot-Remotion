// The card the cut opens and closes on.
//
// Rebuilt from the tricon and the app's own gradient rather than the
// `mc_banner_mblue_169.png` mockup, which is a flat export and cannot animate.
//
// Two rules shape it.
//
// **The lockup is the poster frame.** Play shows frame 0 as a still before anyone
// presses play, so the tricon and the Audiowide line are composed and settled at
// frame 0 and never fade, fly or scale in from nothing. Everything else arrives after.
//
// **Nothing else arrives at the same time as anything else.** The first version set
// eyebrow, lockup and line together at 100% opacity on one centred stack, and centred
// text with no arrival order has no reading path — the eye lands in the middle and
// works outwards. Here the block is asymmetric, left-weighted on the mark, and the
// line streams a word at a time so there is always exactly one thing to look at.
//
// The 34/66 split is the reason it reads as composed rather than as three things that
// happened to be on screen. The mark owns a third and most of it is empty; the type
// owns the rest and is set hard against the same left edge all the way down.

import {AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {background, color, font, space, type} from '../../design/theme';
import {PromoCopy, streamEnd} from './PromoCopy';

/**
 * Frame pixels. The height both columns are locked to, so the card's composition is
 * the same on frame 0 as it is once every line has arrived.
 */
const BLOCK_HEIGHT = 380;

export const MasterControlCard = ({
  frames = 180,
  eyebrow,
  line,
  kickers,
}: {
  frames?: number;
  /** Space Mono, in CTRLbot blue, under the lockup. */
  eyebrow?: string;
  /** Montserrat. Streams a word at a time. Words in *asterisks* take the accent. */
  line: string;
  /** Small mono lines at the foot — the URLs on the closing card. */
  kickers?: string[];
}) => {
  const frame = useCurrentFrame();

  // The whole of the card's continuous motion. A brand card is inert by design and
  // this cut spends a fifth of itself on one, so the bloom travels for the entire
  // beat. Amplitude is deliberately small: `opens-composed` compares frame 0 against
  // the frame 62% in, and a bloom that crosses the frame would fail it.
  const bloomX = interpolate(frame, [0, frames], [74, 59], {
    easing: Easing.bezier(0.4, 0, 0.6, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bloomY = interpolate(frame, [0, frames], [25, 41], {
    easing: Easing.bezier(0.4, 0, 0.6, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const markScale = interpolate(frame, [0, frames], [1, 1.04], {
    easing: Easing.bezier(0.4, 0, 0.6, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Early, because the shortest card this serves is the 30-second cut's closer at 49
  // frames. A line that starts streaming a third of the way in never finishes there.
  const eyebrowAt = Math.round(frames * 0.06);
  // Derived, not chosen: the URLs arrive once the line has finished, in both cuts.
  // Guessing a fraction put them on screen mid-sentence at 30 seconds, which is the
  // everything-at-once problem this card was rebuilt to fix.
  const kickerAt =
    eyebrowAt + streamEnd(frames - eyebrowAt, line.split(/\s+/).filter(Boolean).length) + 6;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color.void,
        backgroundImage: background.promo(bloomX, bloomY),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 140,
        paddingRight: 140,
        gap: 88,
      }}
    >
      <Interactive.Div
        name="Tricon"
        style={{
          flex: '0 0 30%',
          height: BLOCK_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          scale: String(markScale),
        }}
      >
        <Img
          src={staticFile('brand/ctrlbot_tricon_white.svg')}
          style={{height: 372, width: 'auto', display: 'block'}}
        />
      </Interactive.Div>

      {/* Fixed height, and everything below the lockup is positioned rather than
          stacked. In flow, the eyebrow and line arriving would grow this column and
          push the lockup upward — a reflow on the one element that must not move,
          because it is the poster frame. */}
      <div
        style={{
          flex: '1 1 auto',
          position: 'relative',
          height: BLOCK_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Composed at frame 0. Nothing here interpolates. */}
        <Interactive.Div
          name="Lockup"
          style={{
            fontFamily: font.display,
            fontSize: type.display,
            lineHeight: 0.98,
            letterSpacing: 0,
            color: color.text,
            whiteSpace: 'nowrap',
          }}
        >
          MASTER CONTROL
        </Interactive.Div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: BLOCK_HEIGHT / 2 + 76,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: space(3),
          }}
        >
        {/* `span`, not `until`: the line paces itself against the card's length but
            never fades out — on the closing card it is the last thing in the video. */}
        <PromoCopy eyebrow={eyebrow} body={line} at={eyebrowAt} span={frames} />

        {kickers?.length ? (
          <Interactive.Div
            name="Kickers"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              marginTop: space(2),
              fontFamily: font.mono,
              fontSize: type.body,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: color.accent,
              opacity: interpolate(frame, [kickerAt, kickerAt + 18], [0, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              translate: interpolate(
                frame,
                [kickerAt, kickerAt + 24],
                ['0px 12px', '0px 0px'],
                {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                },
              ),
            }}
          >
            {kickers.map((kicker, index) => (
              <span key={kicker} style={{display: 'flex', alignItems: 'center', gap: 22}}>
                {index > 0 ? (
                  <span style={{color: color.textDim}}>·</span>
                ) : null}
                {kicker}
              </span>
            ))}
          </Interactive.Div>
        ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
