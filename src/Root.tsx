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
import {
  AiWalkthrough,
  AiWalkthroughNarrated,
  aiWalkthroughDuration,
} from './marketing/ai-walkthrough/AiWalkthrough';
import {
  DeviceDatabase,
  deviceDatabaseDuration,
} from './marketing/device-database/DeviceDatabase';
import {
  MirrorWalkthrough,
  MirrorWalkthroughPortrait,
  mirrorWalkthroughDuration,
} from './marketing/mirror-walkthrough/MirrorWalkthrough';
import {
  TerminatorWalkthrough,
  TerminatorWalkthroughPortrait,
  terminatorWalkthroughDuration,
} from './marketing/terminator-walkthrough/TerminatorWalkthrough';
import {
  IotPhoneWalkthrough,
  IotPhoneWalkthroughPortrait,
  iotPhoneWalkthroughDuration,
} from './marketing/iot-phone-walkthrough/IotPhoneWalkthrough';
import {
  IotTabletWalkthrough,
  IotTabletWalkthroughPortrait,
  iotTabletWalkthroughDuration,
} from './marketing/iot-tablet-walkthrough/IotTabletWalkthrough';
import {HubCell, hubCellDuration} from './marketing/hub-cell/HubCell';
import {Short, assertShortReady} from './shorts/Short';
import {MirrorAppsProof, MirrorDevicesProof, MirrorFilesProof, MirrorSetupProof, MirrorStudioProof} from './app-ui/mirror/MirrorProofs';
import {TermRawTcpProof, TermScanProof, TermSerialProof, TermServerProof, TermSshProof} from './app-ui/term/TermProofs';
import {SHORTS, compositionId, frameSize, shortSeconds} from './shorts/shortsData';
import {SHORT_EXAMPLE} from './shorts/example';
import {LoopRoute} from './marketing/web-loops/LoopRoute';
import {LoopMatrix} from './marketing/web-loops/LoopMatrix';
import {LoopAudio} from './marketing/web-loops/LoopAudio';
import {LoopApp} from './marketing/web-loops/LoopApp';
import {LoopFull} from './marketing/web-loops/LoopFull';
import {LoopAi, aiLoopDuration} from './marketing/web-loops/LoopAi';
import {DevicesStill} from './marketing/web-loops/DevicesStill';
import {FirstRunEducation} from './app-ui/FirstRunEducation';
import {ConnectTest} from './app-ui/ConnectTest';
import {ProductWebView} from './app-ui/ProductWebView';
import {ActivitiesPresets} from './app-ui/ActivitiesPresets';
import {ActivitiesSwitch} from './app-ui/ActivitiesSwitch';
import {ActivitiesAudio} from './app-ui/ActivitiesAudio';
import {DiscoverDevices} from './app-ui/DiscoverDevices';
import {SettingsSupport} from './app-ui/SettingsSupport';
import {
  ConnectDiagram,
  connectDiagramDuration,
} from './marketing/connect-diagram/ConnectDiagram';
import {
  FULL_LOOP_FRAMES,
  MATRIX_LOOP_FRAMES,
  WEB_LOOP,
  WEB_LOOP_SQUARE,
} from './marketing/web-loops/webLoopData';

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

    {/* CTRLbot.AI — the web assistant, which is a different product from the Android app
        every other composition here shows. Its surface is a website, so it is framed in a
        browser rather than a bezel, and it is the one cut in this project with no camera
        move in it at all. Built from the walkthrough recording; the script of record is
        ingest/ai-walkthrough/transcript.md. */}
    {/* The 30-second shorts. One component, one data entry each, in src/shorts/shortsData.ts.
        A short whose media has not been built fails here, with the command that builds it. */}
    <Folder name="Shorts">
      {SHORTS.map((short) => (
        <Composition
          key={short.id}
          id={compositionId(short)}
          component={Short}
          durationInFrames={Math.round(shortSeconds(short) * 30)}
          fps={30}
          width={frameSize(short).width}
          height={frameSize(short).height}
          defaultProps={{id: short.id}}
          calculateMetadata={() => {
            assertShortReady(short);
            return {};
          }}
        />
      ))}
      {/* Not a release: the template on live screens, and the entry to copy for a new short. */}
      <Composition
        id="Template-Short-Live"
        component={Short}
        durationInFrames={Math.round(shortSeconds(SHORT_EXAMPLE) * 30)}
        fps={30}
        width={frameSize(SHORT_EXAMPLE).width}
        height={frameSize(SHORT_EXAMPLE).height}
        defaultProps={{id: SHORT_EXAMPLE.id, spec: SHORT_EXAMPLE}}
        calculateMetadata={() => {
          assertShortReady(SHORT_EXAMPLE);
          return {};
        }}
      />
    </Folder>

    <Folder name="CTRLbot-AI">
      <Composition
        id="AI-Walkthrough"
        component={AiWalkthrough}
        durationInFrames={aiWalkthroughDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AI-Walkthrough-Narrated"
        component={AiWalkthroughNarrated}
        durationInFrames={aiWalkthroughDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>

    <Folder name="CTRLbot-Mirror">
      <Composition
        id="mirror-walkthrough"
        component={MirrorWalkthrough}
        durationInFrames={mirrorWalkthroughDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="mirror-walkthrough-portrait"
        component={MirrorWalkthroughPortrait}
        durationInFrames={mirrorWalkthroughDuration}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>

    <Folder name="CTRLbot-Terminator">
      <Composition
        id="terminator-walkthrough"
        component={TerminatorWalkthrough}
        durationInFrames={terminatorWalkthroughDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="terminator-walkthrough-portrait"
        component={TerminatorWalkthroughPortrait}
        durationInFrames={terminatorWalkthroughDuration}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>

    <Folder name="CTRLbot-IoT-Walkthrough">
      <Composition
        id="iot-phone-walkthrough"
        component={IotPhoneWalkthrough}
        durationInFrames={iotPhoneWalkthroughDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="iot-phone-walkthrough-portrait"
        component={IotPhoneWalkthroughPortrait}
        durationInFrames={iotPhoneWalkthroughDuration}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="iot-tablet-walkthrough"
        component={IotTabletWalkthrough}
        durationInFrames={iotTabletWalkthroughDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="iot-tablet-walkthrough-portrait"
        component={IotTabletWalkthroughPortrait}
        durationInFrames={iotTabletWalkthroughDuration}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>

    {/* The device database — the tablet setup surface, not the EUI. Built from the
        walkthrough recording; the script of record is ingest/device-database/transcript.md
        and the brief is videos/archive/2026-08-14-device-database.md. This is the one marketing cut that
        moves the camera between beats: the things it is about are 13sp, and a 1280dp
        surface in a 1024px panel is 0.8x. */}
    <Folder name="Device-Database">
      <Composition
        id="device-database"
        component={DeviceDatabase}
        durationInFrames={deviceDatabaseDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>

    {/* THE HUB on ctrlbot.io: a full-bleed device-database media cell. It must loop, so
        its closing catalog state is the same picture as frame 0. */}
    <Folder name="Hub">
      <Composition
        id="hub-30"
        component={HubCell}
        durationInFrames={hubCellDuration}
        fps={30}
        width={1600}
        height={1200}
      />
      <Composition
        id="hub-30-square"
        component={HubCell}
        durationInFrames={hubCellDuration}
        fps={30}
        width={1200}
        height={1200}
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
        durationInFrames={MATRIX_LOOP_FRAMES}
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

      {/* The 1:1 tile. The site alternates a 16:10 cell with a square one down the
          wall, so whichever loop lands on a square row is rendered for that shape
          rather than cropped into it — a 16:10 frame cut to 1:1 loses a third of its
          width, and the first thing to go is the source column. */}
      <Composition
        id="Web-Loop-Matrix-Square"
        component={LoopMatrix}
        defaultProps={{variant: 'square' as const}}
        durationInFrames={MATRIX_LOOP_FRAMES}
        fps={30}
        width={WEB_LOOP_SQUARE.width}
        height={WEB_LOOP_SQUARE.height}
      />
      <Composition
        id="Web-Loop-App-Square"
        component={LoopApp}
        defaultProps={{variant: 'square' as const}}
        durationInFrames={WEB_LOOP.frames}
        fps={30}
        width={WEB_LOOP_SQUARE.width}
        height={WEB_LOOP_SQUARE.height}
      />
      <Composition
        id="Web-Loop-Full"
        component={LoopFull}
        durationInFrames={FULL_LOOP_FRAMES}
        fps={30}
        width={WEB_LOOP.width}
        height={WEB_LOOP.height}
      />
      {/* CTRLbot.AI, not the app — a website in a media cell, so it fills the frame with
          no device panel and no stage gradient. Still a cycle: the ✕ returns the page to
          the state it opened on. */}
      <Composition
        id="Web-Loop-Ai"
        component={LoopAi}
        durationInFrames={aiLoopDuration}
        fps={30}
        width={WEB_LOOP.width}
        height={WEB_LOOP.height}
      />
      <Still id="Web-Devices-Still" component={DevicesStill} width={1200} height={1200} />
    </Folder>

    {/* The connection mark for ctrlbot.io — the CTRLbot icon with a room wired back to
        it, 1:1 and black and white, with no copy in the frame at all. It is the one
        square website render here that is *not* a loop: it builds from an empty frame to
        an assembled diagram and holds there, so the site plays it once rather than
        wrapping it. `npm run loop:seam` does not apply. */}
    <Folder name="Connect-Diagram">
      <Composition
        id="Connect-Diagram"
        component={ConnectDiagram}
        durationInFrames={connectDiagramDuration}
        fps={30}
        width={1200}
        height={1200}
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
      <Still id="Proof-Phone-FirstRunEducation" component={FirstRunEducation} defaultProps={{device: 'phone'}} width={360} height={780} />
      <Still id="Proof-Tablet-FirstRunEducation" component={FirstRunEducation} defaultProps={{device: 'tablet'}} width={1280} height={800} />
      <Still id="Proof-Phone-ConnectTest" component={ConnectTest} defaultProps={{device: 'phone'}} width={360} height={780} />
      <Still id="Proof-Tablet-ConnectTest" component={ConnectTest} defaultProps={{device: 'tablet'}} width={1280} height={800} />
      <Still id="Proof-Phone-ProductWebView" component={ProductWebView} width={360} height={780} />
      <Still id="Proof-Tablet-ProductWebView" component={ProductWebView} defaultProps={{device: 'tablet'}} width={1280} height={800} />
      <Still id="Proof-Phone-ActivitiesPresets" component={ActivitiesPresets} width={360} height={780} />
      <Still id="Proof-Tablet-ActivitiesPresets" component={ActivitiesPresets} defaultProps={{device: 'tablet'}} width={1280} height={800} />
      <Still id="Proof-Phone-ActivitiesSwitch" component={ActivitiesSwitch} width={360} height={780} />
      <Still id="Proof-Tablet-ActivitiesSwitch" component={ActivitiesSwitch} defaultProps={{device: 'tablet', switchType: 'avoip'}} width={1280} height={800} />
      <Still id="Proof-Phone-ActivitiesAudio" component={ActivitiesAudio} width={360} height={780} />
      <Still id="Proof-Tablet-ActivitiesAudio" component={ActivitiesAudio} defaultProps={{device: 'tablet'}} width={1280} height={800} />
      <Still id="Proof-Phone-DiscoverDevices" component={DiscoverDevices} width={360} height={780} />
      <Still id="Proof-Tablet-DiscoverDevices" component={DiscoverDevices} defaultProps={{device: 'tablet'}} width={1280} height={800} />
      <Still id="Proof-Phone-SettingsSupport" component={SettingsSupport} width={360} height={780} />
      <Still id="Proof-Tablet-SettingsSupport" component={SettingsSupport} defaultProps={{device: 'tablet'}} width={1280} height={800} />
      {/* CTRLbot Terminator, the Windows utility: CSS pixels, its own Tailwind palette. */}
      <Still id="Proof-Term-Scan" component={TermScanProof} width={1280} height={800} />
      <Still id="Proof-Term-Server" component={TermServerProof} width={1280} height={800} />
      <Still id="Proof-Term-RawTcp" component={TermRawTcpProof} width={1280} height={800} />
      <Still id="Proof-Term-Serial" component={TermSerialProof} width={1280} height={800} />
      <Still id="Proof-Term-Ssh" component={TermSshProof} width={1280} height={800} />
      {/* CTRLbot Mirror, the Windows utility: CSS pixels, its own Tailwind palette. */}
      <Still id="Proof-Mirror-Setup" component={MirrorSetupProof} width={1600} height={940} />
      <Still id="Proof-Mirror-Devices" component={MirrorDevicesProof} width={1600} height={940} />
      <Still id="Proof-Mirror-Studio" component={MirrorStudioProof} width={1600} height={940} />
      <Still id="Proof-Mirror-Apps" component={MirrorAppsProof} width={1600} height={940} />
      <Still id="Proof-Mirror-Files" component={MirrorFilesProof} width={1600} height={940} />
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
