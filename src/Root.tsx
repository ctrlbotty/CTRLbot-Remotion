import {Composition, Folder, Still} from 'remotion';
import {FirstRun, firstRunDuration} from './compositions/FirstRun';
import {BrandCard, BrandBackground} from './scenes/BrandCard';
import {BuildRoom} from './scenes/BuildRoom';
import {ConnectAndTest} from './scenes/ConnectAndTest';
import {EuiHandoff} from './scenes/EuiHandoff';
import {CtrlbotIntro} from './scenes/CtrlbotIntro';
import {DeviceSetup} from './scenes/DeviceSetup';
import {StageProof} from './marketing/StageProof';
import {PlayStorePromo, promoDuration} from './marketing/play-store-promo-v1/PlayStorePromo';
import {SCENE_FRAMES} from './scenes/shared';
import {
  PhoneCaptureProof,
  PhoneCatalogProof,
  PhoneConnectionProof,
  PhoneCtrlbotProof,
  PhoneEuiProof,
  TabletCaptureProof,
  TabletCatalogProof,
  TabletConnectionProof,
  TabletCtrlbotProof,
  TabletEuiProof,
} from './scenes/SurfaceProofs';
import {MasterControlCard} from './marketing/eui-promo/MasterControlCard';
import {EuiPromo, euiPromoDuration} from './marketing/eui-promo/EuiPromo';
import {EuiPromo as EuiPromoV3, euiPromoDuration as euiPromoV3Duration} from './marketing/eui-promo-v3/EuiPromo';
import {LoopRoute} from './marketing/web-loops/LoopRoute';
import {LoopMatrix} from './marketing/web-loops/LoopMatrix';
import {LoopAudio} from './marketing/web-loops/LoopAudio';
import {WEB_LOOP} from './marketing/web-loops/webLoopData';

// Three layers, deliberately:
//
//   First-Run        the deliverable
//   Scenes           each registered on its own, so it can be retimed and keyframed in
//                    Studio in isolation — and double-clicked into from the cut
//   Surface-Proofs   an app surface at natural dp size with nothing on top, for checking
//                    fidelity against a screenshot before any of it is animated

// `Master-Control-Promo` is deliberately not registered. The composition is kept as the
// worked failure cited in docs/VIDEO_WORKFLOW.md — read it before writing a marketing
// scene — but it must not be renderable by accident, and the anti-slop linter fails it
// on three separate rules. A marketing composition returns here when one is built
// through the video assembly line.

export const RemotionRoot = () => (
  <>
    {/* The first cut through the video assembly line, kept renderable as a reference.
        Its per-beat compositions are gone — those exist so a beat can be looked at
        while it is being built, and this one is finished. A fresh run registers its
        own under `Marketing`. See videos/archive/2026-08-02-play-store-promo.md. */}
    <Folder name="Marketing-v1">
      <Composition
        id="V1-Play-Store-Promo"
        component={PlayStorePromo}
        durationInFrames={promoDuration()}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>

    <Folder name="Marketing">
      <Composition
        id="Play-Store-EUI-Promo"
        component={EuiPromo}
        defaultProps={{cut: 'master'}}
        durationInFrames={euiPromoDuration('master')}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Play-Store-EUI-Promo-30"
        component={EuiPromo}
        defaultProps={{cut: 'play'}}
        durationInFrames={euiPromoDuration('play')}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>

    <Folder name="Marketing-v3">
      <Composition
        id="Play-Store-EUI-Promo-V3"
        component={EuiPromoV3}
        defaultProps={{cut: 'master'}}
        durationInFrames={euiPromoV3Duration('master')}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Play-Store-EUI-Promo-V3-30"
        component={EuiPromoV3}
        defaultProps={{cut: 'play'}}
        durationInFrames={euiPromoV3Duration('play')}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>

    {/* Panel loops for ctrlbot.io. Not cuts — media cells. Each one ends on the state
        it opened with, because a <video loop> wraps with no dissolve and the site plays
        them silently and forever beside a paragraph. See destinations.ts,
        `website-panel-loop`, for the frame and the crop budget the cell imposes. */}
    <Folder name="Web-Loops">
      <Composition
        id="Web-Loop-Route"
        component={LoopRoute}
        durationInFrames={WEB_LOOP.frames}
        fps={30}
        width={WEB_LOOP.width}
        height={WEB_LOOP.height}
      />
      <Composition
        id="Web-Loop-Matrix"
        component={LoopMatrix}
        durationInFrames={WEB_LOOP.frames}
        fps={30}
        width={WEB_LOOP.width}
        height={WEB_LOOP.height}
      />
      <Composition
        id="Web-Loop-Audio"
        component={LoopAudio}
        durationInFrames={WEB_LOOP.frames}
        fps={30}
        width={WEB_LOOP.width}
        height={WEB_LOOP.height}
      />
    </Folder>

    <Folder name="First-Run">
      <Composition
        id="First-Run-Phone"
        component={FirstRun}
        defaultProps={{device: 'phone'}}
        durationInFrames={firstRunDuration()}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="First-Run-Tablet"
        component={FirstRun}
        defaultProps={{device: 'tablet'}}
        durationInFrames={firstRunDuration()}
        fps={30}
        width={1920}
        height={1200}
      />
    </Folder>

    <Folder name="Scenes-Phone">
      <Composition
        id="Scene-Open"
        component={BrandCard}
        defaultProps={{
          device: 'phone',
          eyebrow: 'Quick start',
          headline: 'Control your first room',
          subhead: 'No processor, no laptop, no software. So easy. Program it with your thumbs.',
          kicker: 'Phone · 2 minutes',
        }}
        durationInFrames={SCENE_FRAMES.open}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-CTRLbot"
        component={CtrlbotIntro}
        defaultProps={{device: 'phone'}}
        durationInFrames={SCENE_FRAMES.ctrlbot}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-Device"
        component={DeviceSetup}
        defaultProps={{device: 'phone'}}
        durationInFrames={SCENE_FRAMES.device}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-Connect-And-Test"
        component={ConnectAndTest}
        defaultProps={{device: 'phone'}}
        durationInFrames={SCENE_FRAMES.connect}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-Build-Room"
        component={BuildRoom}
        defaultProps={{device: 'phone'}}
        durationInFrames={SCENE_FRAMES.buildRoom}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-EUI-Handoff"
        component={EuiHandoff}
        defaultProps={{device: 'phone'}}
        durationInFrames={SCENE_FRAMES.euiHandoff}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene-Close"
        component={BrandCard}
        defaultProps={{
          device: 'phone',
          headline: 'Your room is ready',
          subhead: 'Configure it, test it, hand it over — with the setup tucked out of the way.',
          kicker: 'ctrlbot.io',
        }}
        durationInFrames={SCENE_FRAMES.close}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>

    <Folder name="Scenes-Tablet">
      <Composition
        id="Scene-Tablet-Open"
        component={BrandCard}
        defaultProps={{
          device: 'tablet',
          eyebrow: 'Quick start',
          headline: 'Control your first room',
          subhead: 'No processor, no laptop, no software. So easy. Program it with your thumbs.',
          kicker: 'Tablet · 2 minutes',
        }}
        durationInFrames={SCENE_FRAMES.open}
        fps={30}
        width={1920}
        height={1200}
      />
      <Composition
        id="Scene-Tablet-CTRLbot"
        component={CtrlbotIntro}
        defaultProps={{device: 'tablet'}}
        durationInFrames={SCENE_FRAMES.ctrlbot}
        fps={30}
        width={1920}
        height={1200}
      />
      <Composition
        id="Scene-Tablet-Device"
        component={DeviceSetup}
        defaultProps={{device: 'tablet'}}
        durationInFrames={SCENE_FRAMES.device}
        fps={30}
        width={1920}
        height={1200}
      />
      <Composition
        id="Scene-Tablet-Connect-And-Test"
        component={ConnectAndTest}
        defaultProps={{device: 'tablet'}}
        durationInFrames={SCENE_FRAMES.connect}
        fps={30}
        width={1920}
        height={1200}
      />
      <Composition
        id="Scene-Tablet-Build-Room"
        component={BuildRoom}
        defaultProps={{device: 'tablet'}}
        durationInFrames={SCENE_FRAMES.buildRoom}
        fps={30}
        width={1920}
        height={1200}
      />
      <Composition
        id="Scene-Tablet-EUI-Handoff"
        component={EuiHandoff}
        defaultProps={{device: 'tablet'}}
        durationInFrames={SCENE_FRAMES.euiHandoff}
        fps={30}
        width={1920}
        height={1200}
      />
      <Composition
        id="Scene-Tablet-Close"
        component={BrandCard}
        defaultProps={{
          device: 'tablet',
          headline: 'Your room is ready',
          subhead: 'Configure it, test it, hand it over — with the setup tucked out of the way.',
          kicker: 'ctrlbot.io',
        }}
        durationInFrames={SCENE_FRAMES.close}
        fps={30}
        width={1920}
        height={1200}
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
      <Still id="Proof-Phone-CTRLbot" component={PhoneCtrlbotProof} width={360} height={780} />
      <Still id="Proof-Tablet-CTRLbot" component={TabletCtrlbotProof} width={1280} height={800} />
      <Still id="Brand-Background-Phone" component={BrandBackground} width={1080} height={1920} />
      <Still id="Brand-Background-Landscape" component={BrandBackground} width={1920} height={1080} />
      <Still id="Proof-Stage" component={StageProof} width={1920} height={1080} />
      <Still
        id="Proof-Master-Control"
        component={() => (
          <MasterControlCard
            eyebrow="End User Interface"
            line="Anyone can walk up and *run the room.*"
            kickers={['ctrlbot.io', 'ctrlbot.ai']}
          />
        )}
        width={1920}
        height={1080}
      />
    </Folder>
  </>
);
