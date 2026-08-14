import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {EUI_POWER_REGIONS, EuiPowerCapture} from '../../app-ui/EuiPower';
import {
  TABLET_EUI_MANY_TO_ONE_REGIONS,
  TABLET_VIEWPORT,
  TabletEuiManyToOne,
} from '../../app-ui/TabletEui';
import {LoopStage} from './LoopStage';
import {LoopTap} from './LoopTap';
import {
  APP_POWER_OFF_TAP_AT,
  APP_ROUTE_INPUT_AT,
  APP_WELCOME_TAP_AT,
  appPressed,
  appSelection,
  EUI_INPUTS,
  RESTING_VOLUME,
  WEB_LOOP,
  type LoopVariant,
} from './webLoopData';

const F_PHASE1 = 48; //  0..48:   Room in OFF state (Standby)
const F_PHASE2 = 72; //  48..120: Powering-on progress gauge
const F_PHASE3 = 96; //  120..216: Many-to-One switcher active
const F_PHASE4 = 60; //  216..276: Powering-off progress gauge
const F_PHASE5 = 24; //  276..300: Room in OFF state (Standby hold)

/**
 * THE APP: Room power on, many-to-one switcher, and shutdown cycle.
 *
 * 1:1 square loop for the homepage checkerboard.
 * Opens on room standby, taps power, runs the green powering-on gauge, presents the
 * Many-to-One interface with Input 1 routed to Display 1, taps power off, runs the red
 * powering-off gauge, and settles flat back into standby.
 */
export const LoopApp: React.FC<{frames?: number; variant?: LoopVariant}> = ({
  frames = WEB_LOOP.frames,
  variant = 'square',
}) => {
  const frame = useCurrentFrame();
  const t = frame / frames;

  return (
    <LoopStage
      contentSize={TABLET_VIEWPORT}
      region={TABLET_EUI_MANY_TO_ONE_REGIONS.full}
      variant={variant}
    >
      {/* Phase 1: Room Standby / Welcome */}
      <Sequence from={0} durationInFrames={F_PHASE1} layout="none" name="State: Standby">
        <EuiPowerCapture device="tablet" state="off" volume={RESTING_VOLUME} />
      </Sequence>

      {/* Phase 2: Powering On Gauge */}
      <Sequence from={F_PHASE1} durationInFrames={F_PHASE2} layout="none" name="State: Powering On">
        <EuiPowerCapture
          device="tablet"
          state="powering-on"
          durationInFrames={F_PHASE2}
          volume={RESTING_VOLUME}
        />
      </Sequence>

      {/* Phase 3: Switcher UI (Many to One) */}
      <Sequence from={F_PHASE1 + F_PHASE2} durationInFrames={F_PHASE3} layout="none" name="State: Switcher">
        <TabletEuiManyToOne
          inputs={EUI_INPUTS}
          selectedInput={appSelection(t)}
          pressed={appPressed(t)}
          volume={RESTING_VOLUME}
        />
      </Sequence>

      {/* Phase 4: Powering Off Gauge */}
      <Sequence
        from={F_PHASE1 + F_PHASE2 + F_PHASE3}
        durationInFrames={F_PHASE4}
        layout="none"
        name="State: Powering Off"
      >
        <EuiPowerCapture
          device="tablet"
          state="powering-off"
          durationInFrames={F_PHASE4}
          volume={RESTING_VOLUME}
        />
      </Sequence>

      {/* Phase 5: Standby Hold (Seamless loop wrap) */}
      <Sequence
        from={F_PHASE1 + F_PHASE2 + F_PHASE3 + F_PHASE4}
        durationInFrames={F_PHASE5}
        layout="none"
        name="State: Standby Hold"
      >
        <EuiPowerCapture device="tablet" state="off" volume={RESTING_VOLUME} />
      </Sequence>

      {/* Interactions / Taps across the timeline */}
      <LoopTap
        region={EUI_POWER_REGIONS.tablet.welcomePower}
        at={APP_WELCOME_TAP_AT}
        frames={frames}
        ring={false}
        name="Power on"
      />

      <LoopTap
        region={TABLET_EUI_MANY_TO_ONE_REGIONS.sourceRow(0)}
        at={APP_ROUTE_INPUT_AT}
        frames={frames}
        name="Input 1"
      />

      <LoopTap
        region={TABLET_EUI_MANY_TO_ONE_REGIONS.powerControl}
        at={APP_POWER_OFF_TAP_AT}
        frames={frames}
        ring={false}
        name="Power off"
      />
    </LoopStage>
  );
};
