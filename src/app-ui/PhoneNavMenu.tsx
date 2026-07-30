// The phone's setup navigation, which sits over every setup surface.
//
// Two states, both visible in the captures:
//   expanded   a labelled sheet — CTRLbot / Device / Connect / Set — under a
//              chevron-down handle, with the active item in white
//   collapsed  an icon-only bar under a chevron-up handle
//
// CTRLbot is the only label set in Audiowide, because it is the product name. The
// other three are Montserrat like the rest of the UI.
//
// Sizes come from values/dimens.xml: phone_menu_handle_height 48,
// phone_menu_icon_bar_height 60, phone_menu_row_height 52.

import {AppIcon, type AppIconName} from './AppIcon';
import {appColors, appDimens} from '../design/tokens.generated';
import {PHONE_VIEWPORT} from './PhoneEui';

export type NavItem = 'ctrlbot' | 'device' | 'connect' | 'set';

const ITEMS: {id: NavItem; label: string; icon: AppIconName}[] = [
  {id: 'ctrlbot', label: 'CTRLbot', icon: 'ic_ctrlbot'},
  {id: 'device', label: 'Device', icon: 'ic_server'},
  {id: 'connect', label: 'Connect', icon: 'ic_connect'},
  {id: 'set', label: 'Set', icon: 'ic_settings2'},
];

const HANDLE_H = appDimens.phoneMenuHandleHeight; //   48
const ICON_BAR_H = appDimens.phoneMenuIconBarHeight; // 60
const ROW_H = appDimens.phoneMenuRowHeight; //          52

export const NAV_EXPANDED_H = HANDLE_H + ROW_H * ITEMS.length; // 256
export const NAV_COLLAPSED_H = HANDLE_H + ICON_BAR_H; //         108

/** Regions for <Camera> and annotations, in the phone viewport's coordinate space. */
export const navRegions = {
  expanded: {
    x: 0,
    y: PHONE_VIEWPORT.height - NAV_EXPANDED_H,
    width: PHONE_VIEWPORT.width,
    height: NAV_EXPANDED_H,
  },
  collapsed: {
    x: 0,
    y: PHONE_VIEWPORT.height - NAV_COLLAPSED_H,
    width: PHONE_VIEWPORT.width,
    height: NAV_COLLAPSED_H,
  },
  /** One labelled row in the expanded sheet. */
  row: (index: number) => ({
    x: 0,
    y: PHONE_VIEWPORT.height - NAV_EXPANDED_H + HANDLE_H + index * ROW_H,
    width: PHONE_VIEWPORT.width,
    height: ROW_H,
  }),
  handle: {
    x: 0,
    y: PHONE_VIEWPORT.height - NAV_EXPANDED_H,
    width: PHONE_VIEWPORT.width,
    height: HANDLE_H,
  },
};

/** The chevron, drawn rather than imported — the app uses a platform arrow. */
const Chevron = ({direction}: {direction: 'up' | 'down'}) => (
  <svg width={26} height={16} viewBox="0 0 26 16" fill="none">
    <path
      d={direction === 'down' ? 'M2 3 L13 13 L24 3' : 'M2 13 L13 3 L24 13'}
      stroke={appColors.white75}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PhoneNavMenu = ({
  expanded,
  active,
}: {
  expanded: boolean;
  active: NavItem;
}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      // The sheet lifts off the surface behind it with a light-to-dark wash, which is
      // what separates it from the black content above.
      background: 'linear-gradient(to bottom, #4A4A4A 0%, #1C1C1C 42%, #050505 100%)',
    }}
  >
    <div
      style={{
        height: HANDLE_H,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Chevron direction={expanded ? 'down' : 'up'} />
    </div>

    {expanded ? (
      ITEMS.map((item) => (
        <div
          key={item.id}
          style={{
            height: ROW_H,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingLeft: 22,
          }}
        >
          <AppIcon
            name={item.icon}
            size={26}
            tint={item.id === active ? appColors.white : appColors.gray75}
          />
          <span
            style={{
              fontFamily:
                item.id === 'ctrlbot' ? 'Audiowide, sans-serif' : 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: item.id === 'ctrlbot' ? 19 : 20,
              letterSpacing: 0,
              color: item.id === active ? appColors.white : appColors.gray75,
            }}
          >
            {item.label}
          </span>
        </div>
      ))
    ) : (
      <div
        style={{
          height: ICON_BAR_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        {ITEMS.map((item) => (
          <AppIcon
            key={item.id}
            name={item.icon}
            size={30}
            tint={item.id === active ? appColors.white : appColors.gray75}
          />
        ))}
      </div>
    )}
  </div>
);
