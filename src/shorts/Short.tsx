// The 30-second short. One component renders every entry in shortsData.ts.
//
// Three parts, always in this order:
//
//   hook      the one idea, settled at frame 0 over the first beat's opening frame. That
//             frame is the thumbnail and the feed decides in three seconds, so nothing
//             in it animates in; only the bloom behind it moves.
//   beats     footage, a render, a motion graphic or a still, each in a panel sized to
//             its own aspect, with the house camera pushing in across the whole beat.
//             Discrete UI changes barely register as motion; the push always does.
//   sign-off  the product's name, never a URL.
//
// Narration plays as one track the build cut from the recording's prepared voice, with
// the fillers and long pauses taken out (scripts/lib/voice.mjs), and its words are burned
// in as captions, because most of these will be watched with the sound off.

import {createTikTokStyleCaptions} from '@remotion/captions';
import {Audio, Video} from '@remotion/media';
import {useMemo, type ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  Freeze,
  Img,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Camera, fullFrame, type Region} from '../camera/Camera';
import {background, color, font, radius} from '../design/theme';
import {DitherOverlay} from '../marketing/DitherOverlay';
import {SHORT_CAPTIONS, SHORT_MEDIA, SHORT_NARRATION} from './shorts.generated';
import {SURFACES} from './surfaces';
import {
  HOOK_SECONDS,
  SHORTS,
  SIGNOFF_SECONDS,
  beatStarts,
  isImageBeat,
  isSurfaceBeat,
  mediaPath,
  posterPath,
  shortProblems,
  shortSeconds,
  splitAtPauses,
  type ShortBeat,
  type ShortFormat,
  type ShortSpec,
} from './shortsData';

type Box = {left: number; top: number; width: number; height: number};

/**
 * Frame pixels, per format. Everything a viewer must read stays inside the destination's
 * safe area: vertical keeps clear of the feeds' bottom strip and right-hand buttons.
 */
const LAYOUT: Record<
  ShortFormat,
  {
    text: {left: number; top: number; width: number; height: number};
    eyebrow: number;
    title: number;
    idea: number;
    box: Box;
    captions: Box & {size: number};
    mark: number;
    wordmark: number;
    signoff: number;
  }
> = {
  vertical: {
    text: {left: 72, top: 220, width: 868, height: 380},
    eyebrow: 30,
    title: 80,
    idea: 42,
    // The panel may run under the right-hand buttons; only text has to stay clear of them.
    box: {left: 36, top: 610, width: 1008, height: 800},
    captions: {left: 72, top: 1430, width: 868, height: 110, size: 52},
    mark: 260,
    wordmark: 96,
    signoff: 44,
  },
  landscape: {
    text: {left: 96, top: 96, width: 560, height: 888},
    eyebrow: 22,
    title: 72,
    idea: 34,
    box: {left: 720, top: 96, width: 1128, height: 760},
    captions: {left: 720, top: 880, width: 1128, height: 104, size: 42},
    mark: 300,
    wordmark: 96,
    signoff: 36,
  },
};

export const shortById = (id: string): ShortSpec => {
  const short = SHORTS.find((entry) => entry.id === id);
  if (!short) throw new Error(`No short ${id} in src/shorts/shortsData.ts`);
  return short;
};

/** Throws with what to do when a short is unsound or its media has not been built. */
export const assertShortReady = (short: ShortSpec) => {
  const problems = shortProblems(short);
  for (const beat of short.beats) {
    if (isSurfaceBeat(beat) && !SURFACES[(beat.source as {surface: string}).surface]) {
      problems.push(`beat ${beat.id} names no registered surface; see src/shorts/surfaces.tsx`);
    }
  }
  const missing = short.beats.filter((beat) => !isSurfaceBeat(beat) && !SHORT_MEDIA[`${short.id}/${beat.id}`]);
  if (missing.length) {
    problems.push(
      `media not built for ${missing.map((beat) => beat.id).join(', ')}: ` +
        `run npm run shorts -- build ${short.id}`,
    );
  }
  if (short.narration && !SHORT_NARRATION[short.id]) {
    problems.push(`narration not built: run npm run shorts -- build ${short.id}`);
  }
  if (problems.length) throw new Error(`Short ${short.id}: ${problems.join('; ')}`);
};

const surfaceOf = (beat: ShortBeat) =>
  isSurfaceBeat(beat) ? SURFACES[(beat.source as {surface: string}).surface] : undefined;

const mediaSize = (short: ShortSpec, beat: ShortBeat) =>
  surfaceOf(beat)?.size ?? SHORT_MEDIA[`${short.id}/${beat.id}`];

/** The largest rectangle of the media's aspect that fits the box, centred in it. */
const fitIn = (box: Box, size: {width: number; height: number}): Box => {
  const scale = Math.min(box.width / size.width, box.height / size.height);
  const width = Math.round(size.width * scale);
  const height = Math.round(size.height * scale);
  return {
    left: box.left + Math.round((box.width - width) / 2),
    top: box.top + Math.round((box.height - height) / 2),
    width,
    height,
  };
};

/**
 * Where the camera ends a beat: the beat's own focus, or a push to the centre.
 *
 * 0.94 is the house limit for a panel matched to its surface's aspect: tighter and the
 * controls along every edge go first, which on footage of an app is its navigation.
 */
const endShot = (beat: ShortBeat, size: {width: number; height: number}): Region =>
  beat.focus ?? surfaceOf(beat)?.focus ?? {
    x: size.width * 0.03,
    y: size.height * 0.03,
    width: size.width * 0.94,
    height: size.height * 0.94,
  };

/** Words in *asterisks* take the accent. */
const accented = (text: string) =>
  text.split(/(\*[^*]+\*)/).filter(Boolean).map((part, index) =>
    part.startsWith('*') ? (
      <span key={index} style={{color: color.accent}}>
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );

/** A line that arrives a word at a time. Frames are relative to the enclosing Sequence. */
const StreamLine = ({text, size, at = 0, align}: {text: string; size: number; at?: number; align: 'left' | 'center'}) => {
  const frame = useCurrentFrame();
  const parts = text.split(/\s+/).filter(Boolean);
  return (
    <div style={{fontFamily: font.ui, fontWeight: 700, fontSize: size, lineHeight: 1.2, color: color.text, textAlign: align}}>
      {parts.map((word, index) => {
        const start = at + index * 2.4;
        const accent = word.startsWith('*');
        return (
          <span key={index}>
            <span
              style={{
                display: 'inline-block',
                color: accent ? color.accent : 'inherit',
                opacity: interpolate(frame, [start, start + 14], [0, 1], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                translate: interpolate(frame, [start, start + 18], ['0px 12px', '0px 0px'], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              {word.replace(/\*/g, '')}
            </span>{' '}
          </span>
        );
      })}
    </div>
  );
};

/** The rounded frame a beat's media sits in. */
const Panel = ({rect, children}: {rect: Box; children: ReactNode}) => (
  <Interactive.Div
    name="Media"
    style={{
      position: 'absolute',
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: radius.lg,
      overflow: 'hidden',
      border: `2px solid ${color.line}`,
      backgroundColor: color.void,
    }}
  >
    {children}
  </Interactive.Div>
);

const BeatMedia = ({short, beat, frames, poster}: {short: ShortSpec; beat: ShortBeat; frames: number; poster?: boolean}) => {
  const size = mediaSize(short, beat);
  const rect = fitIn(LAYOUT[short.format].box, size);
  const still = poster || isImageBeat(beat);
  const surface = surfaceOf(beat);
  return (
    <Panel rect={rect}>
      <Camera
        contentSize={size}
        viewport={{width: rect.width, height: rect.height}}
        shots={poster ? [{at: 0, region: fullFrame(size)}] : [{at: 0, region: fullFrame(size)}, {at: frames, region: endShot(beat, size)}]}
      >
        {surface ? (
          poster ? (
            <Freeze frame={0}>
              <surface.Scene frames={frames} />
            </Freeze>
          ) : (
            <surface.Scene frames={frames} />
          )
        ) : still ? (
          <Img src={staticFile(poster ? posterPath(short, beat) : mediaPath(short, beat))} style={{width: size.width, height: size.height, display: 'block'}} />
        ) : (
          <Video src={staticFile(mediaPath(short, beat))} muted style={{width: size.width, height: size.height}} />
        )}
      </Camera>
    </Panel>
  );
};

/** The narration, burned in a few words at a time with the spoken word in the accent. */
const Captions = ({short}: {short: ShortSpec}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const layout = LAYOUT[short.format].captions;
  const words = SHORT_CAPTIONS[short.id];
  const pages = useMemo(
    () =>
      words?.length
        ? splitAtPauses(words).flatMap((run) => createTikTokStyleCaptions({captions: run, combineTokensWithinMilliseconds: 1200}).pages)
        : [],
    [words],
  );
  const nowMs = (frame / fps) * 1000;

  return (
    <>
      {pages.map((page, index) => {
        const from = Math.round((page.startMs / 1000) * fps);
        const nextStart = pages[index + 1]?.startMs ?? Infinity;
        const lastWord = page.tokens[page.tokens.length - 1]?.toMs ?? page.startMs + page.durationMs;
        const until = Math.min(nextStart, lastWord + 350);
        const duration = Math.max(1, Math.round((until / 1000) * fps) - from);
        return (
          <Sequence key={index} from={from} durationInFrames={duration} layout="none" name={`Caption ${index + 1}`}>
            <Interactive.Div
              name="Captions"
              style={{
                position: 'absolute',
                left: layout.left,
                top: layout.top,
                width: layout.width,
                height: layout.height,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: font.ui,
                fontWeight: 800,
                fontSize: layout.size,
                lineHeight: 1.15,
                color: color.text,
                whiteSpace: 'pre-wrap',
              }}
            >
              <div>
                {page.tokens.map((token, i) => (
                  <span key={i} style={{color: nowMs >= token.fromMs && nowMs < token.toMs ? color.accent : color.text}}>
                    {token.text}
                  </span>
                ))}
              </div>
            </Interactive.Div>
          </Sequence>
        );
      })}
    </>
  );
};

const Signoff = ({short, frames}: {short: ShortSpec; frames: number}) => {
  const frame = useCurrentFrame();
  const layout = LAYOUT[short.format];
  const vertical = short.format === 'vertical';
  const available = vertical ? 868 : 1100;
  const wordmark = Math.min(layout.wordmark, Math.floor(available / (short.product.length * 0.66)));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color.void,
        backgroundImage: background.promo(
          interpolate(frame, [0, frames], [64, 52], {easing: Easing.bezier(0.4, 0, 0.6, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          interpolate(frame, [0, frames], [30, 42], {easing: Easing.bezier(0.4, 0, 0.6, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        ),
        opacity: interpolate(frame, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vertical ? 56 : 88,
        padding: vertical ? '0 106px' : '0 140px',
      }}
    >
      <DitherOverlay />
      <Interactive.Div
        name="Tricon"
        style={{
          scale: String(interpolate(frame, [0, frames], [1, 1.05], {easing: Easing.bezier(0.4, 0, 0.6, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})),
        }}
      >
        <Img src={staticFile('brand/ctrlbot_tricon_white.svg')} style={{height: layout.mark, width: 'auto', display: 'block'}} />
      </Interactive.Div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: vertical ? 'center' : 'flex-start', gap: 28}}>
        <Interactive.Div
          name="Wordmark"
          style={{fontFamily: font.display, fontSize: wordmark, lineHeight: 1, color: color.text, whiteSpace: 'nowrap'}}
        >
          {short.product}
        </Interactive.Div>
        <StreamLine text={short.signoff} size={layout.signoff} at={10} align={vertical ? 'center' : 'left'} />
      </div>
    </AbsoluteFill>
  );
};

/** `spec` renders an entry that is not in SHORTS, such as the template preview. */
export const Short = ({id, spec}: {id: string; spec?: ShortSpec}) => {
  const short = spec ?? shortById(id);
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const layout = LAYOUT[short.format];
  const total = Math.round(shortSeconds(short) * fps);
  const hookFrames = Math.round(HOOK_SECONDS * fps);
  const signoffFrames = Math.round(SIGNOFF_SECONDS * fps);
  const starts = beatStarts(short).map((seconds) => Math.round(seconds * fps));
  const activeLine = short.beats.findIndex(
    (beat, index) => beat.line && frame >= starts[index] && frame < starts[index] + Math.round(beat.seconds * fps),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color.void,
        backgroundImage: background.promo(
          interpolate(frame, [0, total], [30, 62], {easing: Easing.bezier(0.4, 0, 0.6, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          interpolate(frame, [0, total], [22, 38], {easing: Easing.bezier(0.4, 0, 0.6, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        ),
      }}
    >
      <DitherOverlay />

      {/* Composed at frame 0 and held: the poster frame. */}
      <Interactive.Div
        name="Headline"
        style={{
          position: 'absolute',
          left: layout.text.left,
          top: layout.text.top,
          width: layout.text.width,
          height: layout.text.height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: short.format === 'vertical' ? 'flex-start' : 'center',
          gap: 18,
        }}
      >
        <div style={{fontFamily: font.mono, fontSize: layout.eyebrow, fontWeight: 700, letterSpacing: '0.08em', color: color.accent}}>
          {short.product}
        </div>
        <div style={{fontFamily: font.display, fontSize: layout.title, lineHeight: 1.02, color: color.text}}>{short.title}</div>
        <div style={{position: 'relative'}}>
          <div
            style={{
              fontFamily: font.ui,
              fontWeight: 700,
              fontSize: layout.idea,
              lineHeight: 1.2,
              color: color.text,
              opacity: activeLine === -1 ? 1 : 0,
            }}
          >
            {accented(short.idea)}
          </div>
          {short.beats.map((beat, index) =>
            beat.line ? (
              <Sequence key={beat.id} from={starts[index]} durationInFrames={Math.round(beat.seconds * fps)} layout="none">
                <div style={{position: 'absolute', inset: 0}}>
                  <StreamLine text={beat.line} size={layout.idea} align="left" />
                </div>
              </Sequence>
            ) : null,
          )}
        </div>
      </Interactive.Div>

      <Sequence durationInFrames={hookFrames} layout="none" name="Hook">
        <BeatMedia short={short} beat={short.beats[0]} frames={hookFrames} poster />
      </Sequence>

      {short.beats.map((beat, index) => {
        const frames = Math.round(beat.seconds * fps);
        return (
          <Sequence key={beat.id} from={starts[index]} durationInFrames={frames} layout="none" name={beat.id}>
            <BeatMedia short={short} beat={beat} frames={frames} />
          </Sequence>
        );
      })}

      <Captions short={short} />

      <Sequence from={total - signoffFrames} durationInFrames={signoffFrames} name="Sign-off">
        <Signoff short={short} frames={signoffFrames} />
      </Sequence>

      {short.narration && SHORT_NARRATION[short.id] ? <Audio src={staticFile(SHORT_NARRATION[short.id])} name="Narration" /> : null}
    </AbsoluteFill>
  );
};
