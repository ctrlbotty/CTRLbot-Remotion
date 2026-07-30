import {Composition, Folder, Still} from 'remotion';
import {FirstRun, firstRunDuration} from './compositions/FirstRun';
import {BrandCard} from './scenes/BrandCard';
import {BuildRoom} from './scenes/BuildRoom';
import {ConnectAndTest} from './scenes/ConnectAndTest';
import {EuiHandoff} from './scenes/EuiHandoff';
import {CtrlbotIntro} from './scenes/CtrlbotIntro';
import {DeviceSetup} from './scenes/DeviceSetup';
import {
  PhoneCaptureProof,
  PhoneCatalogProof,
  PhoneConnectionProof,
  PhoneEuiProof,
  TabletCaptureProof,
  TabletCatalogProof,
  TabletConnectionProof,
  TabletEuiProof,
} from './scenes/SurfaceProofs';

// Three layers, deliberately:
//
//   First-Run        the deliverable
//   Scenes           each registered on its own, so it can be retimed and keyframed in
//                    Studio in isolation — and double-clicked into from the cut
//   Surface-Proofs   an app surface at natural dp size with nothing on top, for checking
//                    fidelity against a screenshot before any of it is animated

export const RemotionRoot = () => (
  <>
    <Folder name="First-Run">
      <Composition
        id="First-Run-Phone"
        component={FirstRun}
        defaultProps={{device: 'phone' as const}}
        durationInFrames={firstRunDuration()}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="First-Run-Tablet"
        component={FirstRun}
        defaultProps={{device: 'tablet' as const}}
        durationInFrames={firstRunDuration()}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>

    <Folder name="Scenes-Phone">
      <Composition
        id="Scene-Open"
        component={BrandCard}
        defaultProps={{
          device: 'phone' as const,
          eyebrow: 'Quick start',
          headline: 'Program your first room',
          subhead:
            'Start to finish, from the device in your hand. No rack, no laptop, no programming.',
          kicker: 'Phone · 2 minutes',
        }}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-CTRLbot"
        component={CtrlbotIntro}
        defaultProps={{device: 'phone' as const}}
        durationInFrames={440}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-Device"
        component={DeviceSetup}
        defaultProps={{device: 'phone' as const}}
        durationInFrames={620}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-Connect-And-Test"
        component={ConnectAndTest}
        defaultProps={{device: 'phone' as const}}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-Build-Room"
        component={BuildRoom}
        defaultProps={{device: 'phone' as const}}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-EUI-Handoff"
        component={EuiHandoff}
        defaultProps={{device: 'phone' as const}}
        durationInFrames={780}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>

    <Folder name="Surface-Proofs">
      <Still id="Proof-Phone-EUI" component={PhoneEuiProof} width={360} height={780} />
      <Still id="Proof-Tablet-EUI" component={TabletEuiProof} width={1280} height={800} />
      <Still id="Proof-Phone-Catalog" component={PhoneCatalogProof} width={360} height={780} />
      <Still id="Proof-Tablet-Catalog" component={TabletCatalogProof} width={1280} height={800} />
      <Still id="Proof-Phone-Connection" component={PhoneConnectionProof} width={360} height={780} />
      <Still id="Proof-Tablet-Connection" component={TabletConnectionProof} width={1280} height={800} />
      <Still id="Proof-Phone-Capture" component={PhoneCaptureProof} width={360} height={780} />
      <Still id="Proof-Tablet-Capture" component={TabletCaptureProof} width={1280} height={800} />
    </Folder>
  </>
);
