// Each Mirror panel at its natural size in the state the recording shows it, for holding
// against a frame of the real app. Registered under Surface-Proofs as `Proof-Mirror-*`.

import {Sequence} from 'remotion';
import {Camera, centerOf, fullFrame} from '../../camera/Camera';
import {FocusRing, PointerClick, Spotlight} from '../../camera/Annotations';
import {WalkthroughShell, type NarrationEdit, type WalkthroughBeat} from '../../marketing/WalkthroughShell';
import {CATALOG_VIEWPORT, DriverCatalog} from '../DriverCatalog';
import {AppsPanel, DevicesPanel, FilesPanel, MirrorApp, MirrorStage, SetupPanel, StudioPanel, type Mirrored} from './Mirror';
import {MIRROR_CATALOG, MIRROR_DEVICE, MIRROR_VIEWPORT, mirrorRegions} from './mirrorData';

const LIVE = `Mirroring ${MIRROR_DEVICE.name}`;

const mirrored: Mirrored = {
  width: CATALOG_VIEWPORT.tablet.width,
  height: CATALOG_VIEWPORT.tablet.height,
  screen: <DriverCatalog device="tablet" drivers={MIRROR_CATALOG} />,
};

export const MirrorSetupProof = () => (
  <MirrorApp
    panel="setup"
    status="No device connected"
    hasDevice={false}
    side={<SetupPanel step={1} downloaded={0.78} />}
    stage={<MirrorStage idle={{title: 'No device selected', detail: 'Plug a phone in over USB with USB debugging turned on, then pick it from the Devices panel.'}} />}
  />
);

export const MirrorDevicesProof = () => (
  <MirrorApp panel="devices" status={LIVE} hasDevice side={<DevicesPanel selected details live />} stage={<MirrorStage mirrored={mirrored} recording="00:07" />} />
);

export const MirrorStudioProof = () => <MirrorApp panel="studio" status={LIVE} hasDevice side={<StudioPanel />} stage={<MirrorStage mirrored={mirrored} />} />;

export const MirrorAppsProof = () => <MirrorApp panel="apps" status={LIVE} hasDevice side={<AppsPanel highlight={5} />} stage={<MirrorStage mirrored={mirrored} />} />;

export const MirrorFilesProof = () => <MirrorApp panel="files" status={LIVE} hasDevice side={<FilesPanel />} stage={<MirrorStage mirrored={mirrored} />} />;

export const MirrorPointerProof = () => {
  const target = centerOf(mirrorRegions.installButton);

  return (
    <Sequence from={-4} layout="none">
      <Camera
        contentSize={MIRROR_VIEWPORT}
        shots={[{at: 0, region: fullFrame(MIRROR_VIEWPORT)}]}
      >
        <MirrorApp
          panel="setup"
          status="No device connected"
          hasDevice={false}
          side={<SetupPanel step={1} installPressed />}
          stage={
            <MirrorStage
              idle={{
                title: 'No device selected',
                detail:
                  'Plug a phone in over USB with USB debugging turned on, then pick it from the Devices panel.',
              }}
            />
          }
        />
        <PointerClick to={target} at={0} />
      </Camera>
    </Sequence>
  );
};

const PROOF_EDIT: NarrationEdit = {
  src: 'narration/mirror-walkthrough/source-normalized.m4a',
  seconds: 9,
  clips: [
    {id: 'open', at: 0, start: 0, end: 3, seconds: 3, removed: []},
    {id: 'proof', at: 3, start: 3, end: 6, seconds: 3, removed: []},
    {id: 'setup', at: 6, start: 6, end: 9, seconds: 3, removed: []},
  ],
  words: [
    {text: ' Control', startMs: 500, endMs: 1200, timestampMs: 850, confidence: null},
    {text: ' your', startMs: 1250, endMs: 1600, timestampMs: 1425, confidence: null},
    {text: ' Android', startMs: 1650, endMs: 2200, timestampMs: 1925, confidence: null},
    {text: ' phone', startMs: 2250, endMs: 2800, timestampMs: 2525, confidence: null},
    {text: ' from', startMs: 3100, endMs: 3400, timestampMs: 3250, confidence: null},
    {text: ' your', startMs: 3450, endMs: 3700, timestampMs: 3575, confidence: null},
    {text: ' PC.', startMs: 3750, endMs: 4400, timestampMs: 4075, confidence: null},
    {text: ' Setup', startMs: 6200, endMs: 6800, timestampMs: 6500, confidence: null},
    {text: ' is', startMs: 6850, endMs: 7100, timestampMs: 6975, confidence: null},
    {text: ' simple.', startMs: 7150, endMs: 7800, timestampMs: 7475, confidence: null},
  ],
  cues: {
    open: [
      {text: 'Control', ms: 500},
      {text: 'your', ms: 1250},
      {text: 'Android', ms: 1650},
      {text: 'phone', ms: 2250},
    ],
    proof: [
      {text: 'from', ms: 3100},
      {text: 'your', ms: 3450},
      {text: 'PC', ms: 3750},
    ],
    setup: [
      {text: 'Setup', ms: 6200},
      {text: 'is', ms: 6850},
      {text: 'simple', ms: 7150},
    ],
  },
};

const PROOF_BEATS: WalkthroughBeat[] = [
  {
    id: 'open',
    from: 0,
    duration: 90,
    layout: 'card',
    card: {
      lockup: 'CTRLbot Mirror',
      eyebrow: 'For Windows and Android',
      line: 'Control your Android phone or tablet from your Windows PC.',
    },
  },
  {
    id: 'proof',
    from: 90,
    duration: 90,
    layout: 'stage',
    copy: {
      eyebrow: 'Control',
      title: 'Your phone, under your mouse',
      body: 'Click, type and paste on the device from your PC.',
    },
    regions: mirrorRegions.sidePanel,
    render: () => <MirrorSetupProof />,
  },
  {
    id: 'setup',
    from: 180,
    duration: 90,
    layout: 'chapter',
    copy: {
      eyebrow: 'Setup · 1 of 5',
      title: 'Install Android platform-tools',
    },
    calloutSide: 'right',
    regions: mirrorRegions.setupStep(1),
    render: () => (
      <>
        <MirrorSetupProof />
        <Spotlight region={mirrorRegions.sidePanel} />
        <FocusRing region={mirrorRegions.installButton} />
      </>
    ),
  },
];

export const ProofWalkthroughShellLandscape = () => (
  <WalkthroughShell
    format="landscape"
    contentSize={MIRROR_VIEWPORT}
    beats={PROOF_BEATS}
    edit={PROOF_EDIT}
  />
);

export const ProofWalkthroughShellPortrait = () => (
  <WalkthroughShell
    format="portrait"
    contentSize={MIRROR_VIEWPORT}
    beats={PROOF_BEATS}
    edit={PROOF_EDIT}
  />
);


