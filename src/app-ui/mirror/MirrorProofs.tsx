// Each Mirror panel at its natural size in the state the recording shows it, for holding
// against a frame of the real app. Registered under Surface-Proofs as `Proof-Mirror-*`.

import {Sequence} from 'remotion';
import {Camera, centerOf, fullFrame} from '../../camera/Camera';
import {PointerClick} from '../../camera/Annotations';
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

