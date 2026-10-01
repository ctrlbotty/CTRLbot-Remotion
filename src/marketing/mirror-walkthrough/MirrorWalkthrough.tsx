// CTRLbot Mirror walkthrough — narrated, in two shapes from one set of beats.
//
// Built from Nathan's recording (video input/CTRLbot Mirror Tutorial.mp4,
// ingest/mirror-walkthrough/transcript.md). The brief is videos/mirror-walkthrough.md.
//
//   mirror-walkthrough           1920x1080, YouTube. Captions ship as an .srt.
//   mirror-walkthrough-portrait  1080x1920, captions burned in. The cut for the feeds.

import React from 'react';
import {MIRROR_VIEWPORT} from '../../app-ui/mirror/mirrorData';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughFormat} from '../WalkthroughShell';
import {
  AgainBeat,
  AppsBeat,
  CaptureBeat,
  CloseBeat,
  ConnectBeat,
  DebuggingBeat,
  FilesBeat,
  FrameBeat,
  OpenBeat,
  PasteBeat,
  SetupBeat,
  ToolsBeat,
} from './MirrorBeats';
import {MIRROR_WALKTHROUGH_EDIT} from './mirrorWalkthroughNarration.generated';
import {
  BEATS,
  BEAT_REGIONS,
  COPY,
  MIRROR_WALKTHROUGH_FRAMES,
} from './walkthroughData';

export const mirrorWalkthroughDuration = MIRROR_WALKTHROUGH_FRAMES;

export const MIRROR_WALKTHROUGH_BEATS = [
  {
    id: 'open',
    from: BEATS.open.from,
    duration: BEATS.open.duration,
    layout: 'card' as const,
    card: {
      lockup: 'CTRLbot Mirror',
      eyebrow: 'For Windows and Android',
      line: 'Control your Android phone or tablet from your Windows PC.',
    },
  },
  {
    id: 'proof',
    from: BEATS.proof.from,
    duration: BEATS.proof.duration,
    layout: 'stage' as const,
    copy: COPY.proof,
    regions: BEAT_REGIONS.proof,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <OpenBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'setup',
    from: BEATS.setup.from,
    duration: BEATS.setup.duration,
    layout: 'chapter' as const,
    copy: COPY.setup,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.setup,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <SetupBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'debugging',
    from: BEATS.debugging.from,
    duration: BEATS.debugging.duration,
    layout: 'chapter' as const,
    copy: COPY.debugging,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.debugging,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <DebuggingBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'connect',
    from: BEATS.connect.from,
    duration: BEATS.connect.duration,
    layout: 'chapter' as const,
    copy: COPY.connect,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.connect,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <ConnectBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'frame',
    from: BEATS.frame.from,
    duration: BEATS.frame.duration,
    layout: 'chapter' as const,
    copy: COPY.frame,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.frame,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <FrameBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'paste',
    from: BEATS.paste.from,
    duration: BEATS.paste.duration,
    layout: 'chapter' as const,
    copy: COPY.paste,
    calloutSide: 'left' as const,
    regions: BEAT_REGIONS.paste,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <PasteBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'capture',
    from: BEATS.capture.from,
    duration: BEATS.capture.duration,
    layout: 'chapter' as const,
    copy: COPY.capture,
    calloutSide: 'left' as const,
    regions: BEAT_REGIONS.capture,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <CaptureBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'apps',
    from: BEATS.apps.from,
    duration: BEATS.apps.duration,
    layout: 'chapter' as const,
    copy: COPY.apps,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.apps,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <AppsBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'files',
    from: BEATS.files.from,
    duration: BEATS.files.duration,
    layout: 'chapter' as const,
    copy: COPY.files,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.files,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <FilesBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'tools',
    from: BEATS.tools.from,
    duration: BEATS.tools.duration,
    layout: 'chapter' as const,
    copy: COPY.tools,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.tools,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <ToolsBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'again',
    from: BEATS.again.from,
    duration: BEATS.again.duration,
    layout: 'chapter' as const,
    copy: COPY.again,
    calloutSide: 'right' as const,
    regions: BEAT_REGIONS.again,
    render: ({frame, frames}: {frame: number; frames: number}) => (
      <AgainBeat frame={frame} frames={frames} />
    ),
  },
  {
    id: 'close',
    from: BEATS.close.from,
    duration: BEATS.close.duration,
    layout: 'card' as const,
    card: {
      lockup: 'CTRLbot Mirror',
      line: 'Your phone or tablet, from your PC.',
    },
  },
];

const Walkthrough = ({format}: {format: WalkthroughFormat}) => (
  <WalkthroughShell
    format={format}
    contentSize={MIRROR_VIEWPORT}
    beats={MIRROR_WALKTHROUGH_BEATS}
    edit={MIRROR_WALKTHROUGH_EDIT}
    preload={<PromoPreload />}
  />
);

/** 1920x1080, narrated. The YouTube cut. */
export const MirrorWalkthrough = () => <Walkthrough format="landscape" />;

/** 1080x1920, narrated, captions burned in. The cut for the feeds. */
export const MirrorWalkthroughPortrait = () => <Walkthrough format="portrait" />;
