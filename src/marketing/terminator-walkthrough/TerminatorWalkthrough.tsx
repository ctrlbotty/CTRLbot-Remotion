// CTRLbot Terminator walkthrough — narrated, in two shapes from one set of beats.
//
// Built from Nathan's recording (video input/CTRLbot Terminatior Tutorial.mp4,
// ingest/terminator-walkthrough/transcript.md). The brief is videos/terminator-walkthrough.md.
//
//   terminator-walkthrough           1920x1080, copy left, Terminator in a Stage panel right.
//                                    YouTube. Captions ship as an .srt (npm run narration:srt).
//   terminator-walkthrough-portrait  1080x1920, copy on top, Terminator in a panel, captions under
//                                    it. TikTok, YouTube Shorts, LinkedIn and X.
//
// There is no silent cut. The feeds autoplay muted, so the step text carries the video on
// its own, and the portrait cut burns its captions in as well.

import {useMemo} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {TERM_ADAPTER, TERM_SERVER, TERM_VIEWPORT} from '../../app-ui/term/termData';
import {
  TermScanScene,
  TermServerScene,
  TermRawTcpScene,
  TermSerialScene,
  TermSshScene,
} from '../../app-ui/term/TermScenes';
import {TermApp, TermScan, TermTcpServer, type TermTab} from '../../app-ui/term/Terminator';
import {captionsFromClips} from '../../audio/narrationCaptions';
import {NarrationTrack} from '../../audio/NarrationTrack';
import {background, radius} from '../../design/theme';
import captionWords from '../../../ingest/terminator-walkthrough/captions.json';
import {NarrationCaptions} from '../NarrationCaptions';
import {PORTRAIT, PortraitStage, portraitLayout} from '../PortraitStage';
import {STAGE, Stage} from '../Stage';
import {WalkthroughCopy, type CopyFormat} from '../WalkthroughCopy';
import {
  BEATS,
  BEAT_NAMES,
  COPY,
  TERMINATOR_WALKTHROUGH_FRAMES,
  beatShots,
} from './terminatorWalkthroughData';
import {
  TERMINATOR_CAPTION_CORRECTIONS,
  TERMINATOR_WALKTHROUGH_NARRATION_CLIPS,
  TERMINATOR_WALKTHROUGH_NARRATION_SOURCE,
} from './terminatorWalkthroughNarration';

export const terminatorWalkthroughDuration = TERMINATOR_WALKTHROUGH_FRAMES;

const NAV_TABS: TermTab[] = ['scan', 'tcp-server', 'tcp-client', 'serial', 'ssh'];
const SCAN_AT_REST = {status: 'ready' as const, checked: 0, devices: []};

/** The open beat: at rest on Scan, nav highlight walks through the five tabs. */
const OpenBeat = ({frames}: {frames: number}) => {
  const frame = useCurrentFrame();
  const step = Math.min(NAV_TABS.length - 1, Math.floor((frame / frames) * NAV_TABS.length));
  return (
    <TermApp tab="scan" highlight={NAV_TABS[step]}>
      <TermScan adapter={TERM_ADAPTER} state={SCAN_AT_REST} />
    </TermApp>
  );
};

/** The close beat: nav highlight walks through the five tabs once more. */
const CloseBeat = ({frames}: {frames: number}) => {
  const frame = useCurrentFrame();
  const step = Math.min(NAV_TABS.length - 1, Math.floor((frame / frames) * NAV_TABS.length));
  return (
    <TermApp tab="scan" highlight={NAV_TABS[step]}>
      <TermScan adapter={TERM_ADAPTER} state={SCAN_AT_REST} />
    </TermApp>
  );
};

/** The pin beat: live server session, pin turns on at 40% of the beat. */
const PinBeat = ({frames}: {frames: number}) => {
  const frame = useCurrentFrame();
  return (
    <TermApp tab="tcp-server">
      <TermTcpServer
        port={TERM_SERVER.port}
        listening
        clients={1}
        received={TERM_SERVER.received}
        sent={TERM_SERVER.sent}
        pinned={frame >= frames * 0.4}
      />
    </TermApp>
  );
};

/** The copy block's height: the Stage panel's in landscape, so its top edge meets the panel's. */
const copyHeight = (format: CopyFormat) =>
  format === 'landscape' ? STAGE.panelHeight : portraitLayout(TERM_VIEWPORT).text.height;

/** Background glow that drifts gently behind the stage over the whole cut. */
const termBg = (t: number) =>
  background.promo(
    interpolate(t, [0, 1], [72, 60], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(t, [0, 1], [48, 54], {
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

/** The copy, one Sequence per beat. */
const CopyTrack = ({format}: {format: CopyFormat}) => (
  <>
    {BEAT_NAMES.map((name) => {
      const beat = BEATS[name];
      const copy = COPY[name];
      return (
        <Sequence key={name} from={beat.from} durationInFrames={beat.duration} layout="none" name={`Copy — ${name}`}>
          <WalkthroughCopy
            format={format}
            height={copyHeight(format)}
            eyebrow={copy.eyebrow}
            headline={copy.headline}
            title={copy.title}
            body={copy.body}
            // The open is the poster frame: composed at frame 0, not arriving into it.
            at={name === 'open' ? -40 : 4}
            until={beat.duration}
          />
        </Sequence>
      );
    })}
  </>
);

/** The live Terminator window, in whichever beat the frame is in. */
const SurfaceTrack = () => (
  <div style={{width: TERM_VIEWPORT.width, height: TERM_VIEWPORT.height}}>
    <Sequence from={BEATS.open.from} durationInFrames={BEATS.open.duration} layout="none" name="Beat — open">
      <OpenBeat frames={BEATS.open.duration} />
    </Sequence>
    <Sequence from={BEATS.scan.from} durationInFrames={BEATS.scan.duration} layout="none" name="Beat — scan">
      <TermScanScene frames={BEATS.scan.duration} />
    </Sequence>
    <Sequence from={BEATS.server.from} durationInFrames={BEATS.server.duration} layout="none" name="Beat — server">
      <TermServerScene frames={BEATS.server.duration} />
    </Sequence>
    <Sequence from={BEATS.pin.from} durationInFrames={BEATS.pin.duration} layout="none" name="Beat — pin">
      <PinBeat frames={BEATS.pin.duration} />
    </Sequence>
    <Sequence from={BEATS['raw-tcp'].from} durationInFrames={BEATS['raw-tcp'].duration} layout="none" name="Beat — raw-tcp">
      <TermRawTcpScene frames={BEATS['raw-tcp'].duration} />
    </Sequence>
    <Sequence from={BEATS.serial.from} durationInFrames={BEATS.serial.duration} layout="none" name="Beat — serial">
      <TermSerialScene frames={BEATS.serial.duration} />
    </Sequence>
    <Sequence from={BEATS.ssh.from} durationInFrames={BEATS.ssh.duration} layout="none" name="Beat — ssh">
      <TermSshScene frames={BEATS.ssh.duration} />
    </Sequence>
    <Sequence from={BEATS.close.from} durationInFrames={BEATS.close.duration} layout="none" name="Beat — close">
      <CloseBeat frames={BEATS.close.duration} />
    </Sequence>
  </div>
);

const Walkthrough = ({format}: {format: CopyFormat}) => {
  const frame = useCurrentFrame();
  const shots = useMemo(() => beatShots(), []);
  const bg = termBg(frame / (TERMINATOR_WALKTHROUGH_FRAMES - 1));
  const captions = useMemo(
    () =>
      captionsFromClips(
        TERMINATOR_WALKTHROUGH_NARRATION_CLIPS,
        captionWords,
        TERMINATOR_CAPTION_CORRECTIONS,
      ),
    [],
  );

  return (
    <AbsoluteFill>
      {format === 'landscape' ? (
        <Stage
          contentSize={TERM_VIEWPORT}
          shots={shots}
          panelHeight={STAGE.panelHeight}
          panelAspect={TERM_VIEWPORT.width / TERM_VIEWPORT.height}
          panelRadius={radius.xl}
          background={bg}
          copy={<CopyTrack format="landscape" />}
        >
          <SurfaceTrack />
        </Stage>
      ) : (
        <PortraitStage
          contentSize={TERM_VIEWPORT}
          shots={shots}
          panelRadius={radius.xl}
          background={bg}
          copy={<CopyTrack format="portrait" />}
          captions={
            <NarrationCaptions
              captions={captions}
              box={portraitLayout(TERM_VIEWPORT).captions}
              size={PORTRAIT.captions.size}
            />
          }
        >
          <SurfaceTrack />
        </PortraitStage>
      )}
      <NarrationTrack
        src={TERMINATOR_WALKTHROUGH_NARRATION_SOURCE}
        clips={TERMINATOR_WALKTHROUGH_NARRATION_CLIPS}
      />
    </AbsoluteFill>
  );
};

/** 1920x1080, narrated. The YouTube cut. */
export const TerminatorWalkthrough = () => <Walkthrough format="landscape" />;

/** 1080x1920, narrated, captions burned in. The cut for the feeds. */
export const TerminatorWalkthroughPortrait = () => <Walkthrough format="portrait" />;
