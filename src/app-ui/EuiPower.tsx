// Captured EUI power states, cropped into the same natural viewport as the live UI.
//
// These states establish context rather than expose editable controls, so the reviewed
// app captures are the faithful surface. The interactive power-button regions are still
// derived from the Android layouts:
//   layout-port/control_power_on.xml  phone welcome stack and 112dp power button
//   layout/control_power_on.xml       tablet 40/10/70 weighted power layout
//   layout/dialog_power_off.xml       powering-off progress state
//   layout/dialog_power_on.xml        powering-on progress state

import {CapturedScreen} from './CapturedScreen';
import {appDimens} from '../design/tokens.generated';
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

export const EuiPowerCapture = ({
  device,
  state,
}: {
  device: 'phone' | 'tablet';
  state: EuiPowerState;
}) => (
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
);
