// Captured EUI power states, cropped into the same natural viewport as the live UI.
//
// These states establish context rather than expose editable controls, so the reviewed
// app captures are the faithful surface. The interactive power-button regions are still
// derived from the Android layouts:
//   layout-port/control_power_on.xml  phone welcome stack and 112dp power button
//   layout/control_power_on.xml       tablet 40/10/70 weighted power layout
//   layout/dialog_power_off.xml       powering-off progress state
//   layout/dialog_power_on.xml        powering-on progress state

import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {CapturedScreen} from './CapturedScreen';
import {appColors, appDimens} from '../design/tokens.generated';
import {PHONE_VIEWPORT, TABLET_VIEWPORT} from './viewports';

const PHONE_CONTENT_TOP = appDimens.headerHeight;
const PHONE_CONTENT_HEIGHT =
  PHONE_VIEWPORT.height - appDimens.headerHeight - appDimens.headerHeight;
const PHONE_POWER_ROOT_PADDING_Y = 20;
const PHONE_WELCOME_TITLE_LINE_HEIGHT = appDimens.phoneWelcomeTitleSize * 1.2;
const PHONE_WELCOME_PROMPT_LINE_HEIGHT = appDimens.phoneWelcomePromptSize * 1.2;
const PHONE_WELCOME_PROMPT_GAP = 8;
const PHONE_POWER_BUTTON_GAP = 28;
const PHONE_POWER_STACK_HEIGHT =
  PHONE_WELCOME_TITLE_LINE_HEIGHT +
  PHONE_WELCOME_PROMPT_GAP +
  PHONE_WELCOME_PROMPT_LINE_HEIGHT +
  PHONE_POWER_BUTTON_GAP +
  appDimens.phoneWelcomePowerSize;
const PHONE_POWER_SPACER =
  (PHONE_CONTENT_HEIGHT - PHONE_POWER_ROOT_PADDING_Y * 2 - PHONE_POWER_STACK_HEIGHT) / 2;
const PHONE_POWER_BUTTON_Y =
  PHONE_CONTENT_TOP +
  PHONE_POWER_ROOT_PADDING_Y +
  PHONE_POWER_SPACER +
  PHONE_WELCOME_TITLE_LINE_HEIGHT +
  PHONE_WELCOME_PROMPT_GAP +
  PHONE_WELCOME_PROMPT_LINE_HEIGHT +
  PHONE_POWER_BUTTON_GAP;

const TABLET_CONTENT_TOP = appDimens.euiBarHeight;
const TABLET_CONTENT_HEIGHT =
  TABLET_VIEWPORT.height - appDimens.euiBarHeight - appDimens.euiSeekbarHeight;
const TABLET_FIXED_LEFT_WIDTH = 340;
const TABLET_WEIGHTED_REMAINDER = TABLET_VIEWPORT.width - TABLET_FIXED_LEFT_WIDTH;
const TABLET_RIGHT_COLUMN_X = TABLET_FIXED_LEFT_WIDTH + TABLET_WEIGHTED_REMAINDER / 2;
const TABLET_RIGHT_COLUMN_WIDTH = TABLET_WEIGHTED_REMAINDER / 2;
const TABLET_POWER_BUTTON_SIZE = 200;

// dialog_power_on.xml and dialog_power_off.xml use the same Material progress geometry:
// 180dp indicator, 12dp track. The captures place it at these natural-viewport
// coordinates after CapturedScreen applies its source crop.
const POWER_PROGRESS_SIZE = 180;
const POWER_PROGRESS_TRACK = 12;
const POWER_PROGRESS_RADIUS = (POWER_PROGRESS_SIZE - POWER_PROGRESS_TRACK) / 2;
const POWER_PROGRESS_CIRCUMFERENCE = 2 * Math.PI * POWER_PROGRESS_RADIUS;
const POWER_PROGRESS_FULL_HOLD_FRAMES = 12;
const POWER_PROGRESS_POSITION = {
  phone: {x: 90, y: 362},
  tablet: {x: 550, y: 313},
} as const;

const PowerProgressRing = ({
  device,
  state,
  durationInFrames,
}: {
  device: 'phone' | 'tablet';
  state: 'powering-off' | 'powering-on';
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();
  const position = POWER_PROGRESS_POSITION[device];

  return (
    <svg
      width={POWER_PROGRESS_SIZE + 4}
      height={POWER_PROGRESS_SIZE + 4}
      viewBox={`0 0 ${POWER_PROGRESS_SIZE + 4} ${POWER_PROGRESS_SIZE + 4}`}
      style={{
        position: 'absolute',
        left: position.x - 2,
        top: position.y - 2,
        backgroundColor: appColors.gray10,
        pointerEvents: 'none',
      }}
    >
      <circle
        cx={POWER_PROGRESS_SIZE / 2 + 2}
        cy={POWER_PROGRESS_SIZE / 2 + 2}
        r={POWER_PROGRESS_RADIUS}
        fill="none"
        stroke={appColors.gray25}
        strokeWidth={POWER_PROGRESS_TRACK}
      />
      <circle
        cx={POWER_PROGRESS_SIZE / 2 + 2}
        cy={POWER_PROGRESS_SIZE / 2 + 2}
        r={POWER_PROGRESS_RADIUS}
        fill="none"
        stroke={state === 'powering-off' ? appColors.priRed : appColors.priGreen}
        strokeWidth={POWER_PROGRESS_TRACK}
        strokeLinecap="butt"
        strokeDasharray={POWER_PROGRESS_CIRCUMFERENCE}
        transform={`rotate(-90 ${POWER_PROGRESS_SIZE / 2 + 2} ${POWER_PROGRESS_SIZE / 2 + 2})`}
        style={{
          strokeDashoffset: interpolate(
            frame,
            [0, durationInFrames - POWER_PROGRESS_FULL_HOLD_FRAMES - 1],
            [POWER_PROGRESS_CIRCUMFERENCE, 0],
            {
              easing: Easing.linear,
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            },
          ),
        }}
      />
    </svg>
  );
};

export const EUI_POWER_REGIONS = {
  phone: {
    full: {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height},
    welcomePower: {
      x: (PHONE_VIEWPORT.width - appDimens.phoneWelcomePowerSize) / 2,
      y: PHONE_POWER_BUTTON_Y,
      width: appDimens.phoneWelcomePowerSize,
      height: appDimens.phoneWelcomePowerSize,
    },
  },
  tablet: {
    full: {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height},
    welcomePower: {
      x:
        TABLET_RIGHT_COLUMN_X +
        (TABLET_RIGHT_COLUMN_WIDTH - TABLET_POWER_BUTTON_SIZE) / 2,
      y: TABLET_CONTENT_TOP + (TABLET_CONTENT_HEIGHT - TABLET_POWER_BUTTON_SIZE) / 2,
      width: TABLET_POWER_BUTTON_SIZE,
      height: TABLET_POWER_BUTTON_SIZE,
    },
  },
} as const;

export type EuiPowerState = 'powering-off' | 'off' | 'powering-on';

type EuiPowerCaptureProps = {device: 'phone' | 'tablet'} &
  (
    | {state: 'off'}
    | {
        state: 'powering-off' | 'powering-on';
        /** Length of the powering state; the ring closes before its final hold. */
        durationInFrames: number;
      }
  );

export const EuiPowerCapture = (props: EuiPowerCaptureProps) => {
  const {device, state} = props;

  return (
    <div
      style={{
        position: 'relative',
        width: device === 'phone' ? PHONE_VIEWPORT.width : TABLET_VIEWPORT.width,
        height: device === 'phone' ? PHONE_VIEWPORT.height : TABLET_VIEWPORT.height,
        overflow: 'hidden',
      }}
    >
      <CapturedScreen
        device={device}
        src={`captures/${device}/eui-${
          state === 'powering-off'
            ? 'power-off'
            : state === 'off'
              ? 'welcome'
              : 'power-on'
        }.png`}
      />
      {state === 'off' ? null : (
        <PowerProgressRing
          device={device}
          state={state}
          durationInFrames={props.durationInFrames}
        />
      )}
    </div>
  );
};
