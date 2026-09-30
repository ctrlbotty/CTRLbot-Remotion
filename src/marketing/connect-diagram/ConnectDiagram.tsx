// The connection mark: the CTRLbot icon, and everything a room is made of wired back to
// it. Black and white, 1:1, no copy — a website asset that has to read at a glance in a
// cell somebody scrolls past, which is the whole reason it carries no words. The
// paragraph beside it on ctrlbot.io does that job.
//
// **It is a cycle, and the release at the end is what makes it one.** The first cut was a
// build: it opened on an empty frame and closed on the assembled diagram, which made frame
// 0 and the frame after the last the two most different pictures in it — fine for a video
// played once, a jump cut every fourteen seconds the moment the site wraps it. Adding
// `loop` to the element would not have fixed that, it would have shipped it.
//
// So the diagram is now built, held, and *released*: the connectors withdraw to the
// devices, the devices drop away, and the mark grows back to the size it opened at. The
// same shape the EUI loops use, and for the reason `web-loops/webLoopData.ts` sets out —
// cold, used, released, cold. Both ends of the wrap are the same still hub, so the seam
// costs nothing, and every ramp settles flat before it: the hub reaches 2.4x on frame 420
// and holds to the end, so there is no motion discontinuity at the wrap either, only a
// matching picture. `npm run loop:seam` is the gate for this file now, and it passes.
//
// The icons are the app's own drawables, mounted as `<Img>` rather than through
// `<AppIcon>`. Two reasons, and the second is the one that matters: `AppIcon` draws a
// drawable as a CSS mask, and Remotion cannot hold a frame for an image referenced from
// CSS — see `../eui-promo/PromoPreload.tsx` for what that costs. Here the icons *are* the
// composition rather than furniture inside a surface, so a missing one is not a glitch in
// a corner, it is the frame. `<Img>` puts every one of them back under `delayRender`.
//
// **Render it in two passes, the same way `scripts/loop-render.mjs` renders a loop.** It
// is not in that script because it is not a loop and does not belong in a list that syncs
// to `assets/loops/`, but it needs the supersample for the same reason: seven glyphs are
// being scaled through a pop on every frame, and at 1x their edges crawl. There is no
// `npm run` shortcut, so the commands are here.
//
//   npx remotion render src/index.ts Connect-Diagram out/web/connect-diagram-v1.2x.mp4 \
//     --codec=h264 --crf=16 --x264-preset=veryfast --muted --scale=2
//   ffmpeg -i out/web/connect-diagram-v1.2x.mp4 -vf scale=1200:1200:flags=lanczos \
//     -c:v libx264 -crf 20 -preset slower -pix_fmt yuv420p -an out/web/connect-diagram-v1.mp4
//
// CRF 20 rather than the loops' 23: this frame is hard white on flat black with nothing
// to hide ringing behind, and it is a fifth of their file size at 20 anyway.
//
// The poster is the **first** frame, which is `loop-render.mjs`'s rule and is right here
// for the reason that rule exists: a cycle opens on its resting state, so the still shown
// before playback is the picture playback starts on and there is no jump when it does. It
// was the last frame while this was a build, when the opening frame was one icon on an
// empty tile and a poster for nothing — adding the release moved which end of the file is
// the resting state. `/assets/` on ctrlbot.io has no content hash, so ship a new filename
// rather than overwriting one.

import {AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {color} from '../../design/theme';

/**
 * Everything the room is made of, clockwise from the top.
 *
 * `optical` corrects for how much of its own viewBox each drawable actually draws in.
 * An `<Img>` fits a vector into a square box by its longest side, so a tall glyph (HDMI,
 * mic) arrives at full height while a dense circular one (power) arrives a quarter short
 * of the box on every side and reads small beside it. These are the Material keyline
 * correction and nothing cleverer: long side to a common extent, discs a little under it
 * because a circle of a given width carries more ink than a rectangle of the same.
 */
const DEVICES = [
  {icon: 'ic_power', optical: 1.02},
  {icon: 'ic_display_icon', optical: 1.05},
  {icon: 'ic_projector_filled', optical: 0.95},
  {icon: 'ic_hdmi_icon', optical: 0.86},
  {icon: 'ic_speaker_on', optical: 1.0},
  {icon: 'ic_mic_live', optical: 1.08},
  {icon: 'ic_cam', optical: 0.82},
] as const;

const FRAME = 1200;
const CENTER = FRAME / 2;

/**
 * The ring sets the device box, not taste. Seven of them have to sit on a circle that
 * leaves a readable run of line between the hub and each device and still clears the
 * frame edge: at RING 448 the chord between neighbours is 389, so the gap between two
 * boxes is 184, and the furthest glyph edge lands 69px inside the frame. Raise either
 * number and the bottom pair walks off the tile.
 */
const ICON = 205;
const RING = 448;

/**
 * The hub is a bigger box than a device, and that is how the brief's "same size" is
 * honoured rather than broken. The CTRLbot mark is a small screen sitting on a wide flat
 * base, so it draws in maybe half the ink of a solid glyph like the HDMI connector; at an
 * equal box it measured equal and looked like the smallest thing in the frame, which is
 * the wrong reading for the one element everything else points at. 1.29x is where it sits
 * level with the ring and a shade above it.
 */
const HUB = 265;

/**
 * The radial band the connectors occupy — clear of the hub's base at one end and of the
 * widest device glyph at the other, and identical for all seven so the diagram reads as
 * one structure rather than as seven separate wires.
 *
 * A single inner radius means the gap at the hub is not identical at every angle, because
 * the mark's silhouette is not a circle: a line arriving from the upper diagonals meets
 * only the screen, which is barely half the width of the base beneath it. Uniform beats
 * fitted here — seven lines converging at seven different radii reads as a mistake, and
 * seven of the same length converging on a shape that is genuinely wider at the bottom
 * does not.
 */
const LINE_INNER = 175;
const LINE_OUTER = 325;
const LINE_WEIGHT = 9;

/**
 * The hub opens at 2.4x — 636px in a 1200 frame — holds there, and shrinks onto the
 * ring's centre.
 *
 * The hold is the whole reason this is three keyframes rather than two. Every other
 * easing in this file is `bezier(0.16, 1, 0.3, 1)`, which spends more than half its
 * travel in the first eighth of its duration; on a 34-frame shrink that put the mark at
 * final size by frame 16 and the opening — the one beat that is nothing but the CTRLbot
 * icon — was over before the fade-in finished. A held scale states the size, and a
 * gentler curve off the hold is what makes the shrink read as a move rather than a cut.
 */
const HUB_OPEN_SCALE = 2.4;
const HUB_HOLD = 22;
const HUB_SETTLE = 64;

/**
 * One device per `STAGGER` frames: pop to 1.55 by `POP_PEAK`, settle to 1 by `POP_SETTLE`,
 * connector drawn over the `LINE_DRAW` frames after that.
 *
 * The cut ran 8.4s first and read as hurried, and the fix was not a uniform stretch. What
 * was too fast was the *cadence* — a device every 0.63s, which is quicker than the eye
 * finishes reading the glyph it just landed on. So the stagger took most of the change
 * (19 -> 32 frames) and the pop itself took much less (7 -> 9 to the peak): a pop is
 * supposed to be sudden, and slowing it in proportion would have traded one problem for a
 * sluggish one. The connector draw went 14 -> 20 for the same reason the stagger moved —
 * it is the beat that says *connected*, and it was over before it registered.
 *
 * `STAGGER` is deliberately shorter than a device's full 46-frame cycle. The next icon
 * pops while the previous line is still drawing, which is what keeps seven beats reading
 * as one build rather than seven separate events.
 */
const FIRST_DEVICE = 78;
const STAGGER = 32;
const POP_SCALE = 1.55;
const POP_PEAK = 9;
const POP_SETTLE = 26;
const LINE_DRAW = 20;

/**
 * The release — what turns the build into a cycle.
 *
 * It runs four times faster than the build (a 4-frame stagger against 32) and that is the
 * point rather than a saving. Building is the content: seven devices arriving one at a
 * time is the thing the cell is there to say. Releasing is punctuation, and a reverse of
 * the build at the build's own pace would spend half the loop un-saying it. A room is
 * commissioned slowly and powered down all at once.
 *
 * Order is preserved rather than reversed: power lets go first, camera last, the same
 * order they arrived. Reversing it reads as an undo — a rewind of the animation — where
 * the same order reads as a second pass over the room.
 *
 * Each device trails its own connector by `RELEASE_DEVICE_DELAY`, so the wire withdraws to
 * the device and *then* the device goes, rather than both dissolving together into a
 * general fade. The connector retracts back the way it was drawn, toward the device, which
 * is the honest reverse of a line that arrived pointing at the hub.
 */
const RELEASE_START = 352;
const RELEASE_STAGGER = 4;
const LINE_RETRACT = 12;
const RELEASE_DEVICE_DELAY = 5;
const DEVICE_RELEASE = 14;

/** The mark reclaims the frame while the last devices are still going, and holds from 420. */
const HUB_RETURN = 386;
const HUB_GROW = 34;

/**
 * 14.5s at 30fps.
 *
 * Frame 434 and frame 0 are the same picture — the mark alone at 2.4x, not moving — which
 * is the whole requirement `npm run loop:seam` measures. The 15 frames after the hub
 * settles are not padding: a ramp that is still travelling at the wrap reads as a jump
 * even when the two frames match, so the last motion has to stop before the end.
 */
export const connectDiagramDuration = 435;

/** Clockwise from twelve o'clock, in screen coordinates. */
const ringAngle = (index: number) => (index / DEVICES.length) * Math.PI * 2 - Math.PI / 2;

export const ConnectDiagram = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: color.void}}>
      {/* Connectors first, so a line that reaches under a glyph is covered by it rather
          than drawn across it. Each one is a bar anchored at its device end and grown
          back toward the middle — the brief's "lines drawing to the center", which is a
          different picture from seven lines radiating out of the hub. */}
      {DEVICES.map((device, index) => (
        <Interactive.Div
          key={device.icon}
          name={`Connector ${device.icon}`}
          style={{
            position: 'absolute',
            left: CENTER + Math.cos(ringAngle(index)) * LINE_OUTER,
            top: CENTER + Math.sin(ringAngle(index)) * LINE_OUTER - LINE_WEIGHT / 2,
            height: LINE_WEIGHT,
            backgroundColor: color.text,
            transformOrigin: '0% 50%',
            rotate: `${(ringAngle(index) * 180) / Math.PI + 180}deg`,
            width: interpolate(
              frame,
              [
                FIRST_DEVICE + index * STAGGER + POP_SETTLE,
                FIRST_DEVICE + index * STAGGER + POP_SETTLE + LINE_DRAW,
                RELEASE_START + index * RELEASE_STAGGER,
                RELEASE_START + index * RELEASE_STAGGER + LINE_RETRACT,
              ],
              [0, LINE_OUTER - LINE_INNER, LINE_OUTER - LINE_INNER, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        />
      ))}

      {/* The devices. `brightness(0) invert(1)` is doing one job: the app ships ic_power
          filled red, and a mark that is black and white cannot have one red glyph in it.
          Forcing every drawable to white through the same filter also means a drawable
          re-synced from the app in a new colour cannot quietly change this render. */}
      {DEVICES.map((device, index) => (
        <Img
          key={device.icon}
          name={device.icon}
          src={staticFile(`app-assets/${device.icon}.svg`)}
          style={{
            position: 'absolute',
            left: CENTER + Math.cos(ringAngle(index)) * RING - (ICON * device.optical) / 2,
            top: CENTER + Math.sin(ringAngle(index)) * RING - (ICON * device.optical) / 2,
            width: ICON * device.optical,
            height: ICON * device.optical,
            filter: 'brightness(0) invert(1)',
            opacity: interpolate(
              frame,
              [
                FIRST_DEVICE + index * STAGGER,
                FIRST_DEVICE + index * STAGGER + 4,
                RELEASE_START + index * RELEASE_STAGGER + RELEASE_DEVICE_DELAY,
                RELEASE_START + index * RELEASE_STAGGER + RELEASE_DEVICE_DELAY + DEVICE_RELEASE,
              ],
              [0, 1, 1, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            ),
            scale: interpolate(
              frame,
              [
                FIRST_DEVICE + index * STAGGER,
                FIRST_DEVICE + index * STAGGER + POP_PEAK,
                FIRST_DEVICE + index * STAGGER + POP_SETTLE,
                RELEASE_START + index * RELEASE_STAGGER + RELEASE_DEVICE_DELAY,
                RELEASE_START + index * RELEASE_STAGGER + RELEASE_DEVICE_DELAY + DEVICE_RELEASE,
              ],
              [0.4, POP_SCALE, 1, 1, 0.4],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: 'perceptual-scale',
              },
            ),
          }}
        />
      ))}

      {/* The hub, last in the stack so it sits over the ends of its own connectors.
          It does not fade in. A three-frame ramp was imperceptible in motion and cost
          the one thing frame 0 is good for: a cell on the site that has not been
          scrolled to yet shows its first frame, and an empty black tile is not a poster
          for anything. The mark is simply there, at 2.4x, from the first frame. */}
      <Img
        name="CTRLbot"
        src={staticFile('app-assets/ic_ctrlbot.svg')}
        style={{
          position: 'absolute',
          left: CENTER - HUB / 2,
          top: CENTER - HUB / 2,
          width: HUB,
          height: HUB,
          filter: 'brightness(0) invert(1)',
          scale: interpolate(
            frame,
            [0, HUB_HOLD, HUB_SETTLE, HUB_RETURN, HUB_RETURN + HUB_GROW],
            [HUB_OPEN_SCALE, HUB_OPEN_SCALE, 1, 1, HUB_OPEN_SCALE],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.45, 0, 0.15, 1),
              output: 'perceptual-scale',
            },
          ),
        }}
      />
    </AbsoluteFill>
  );
};
