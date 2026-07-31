// The tablet setup navigation rail shared by every landscape setup surface.
//
// Geometry comes from res/layout/_setup_main.xml:
//   200dp rail, 10dp horizontal padding, 48dp menu rows separated by 12dp,
//   a 28dp collapse control on the rail edge, and a bottom EUI launcher with a
//   100dp icon. Activities and EUI are revealed once connected devices exist.

import {Interactive, staticFile} from 'remotion';
import {AppIcon, type AppIconName} from './AppIcon';
import type {NavItem} from './PhoneNavMenu';
import {TABLET_VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';

export const TABLET_NAV_WIDTH = 200;

const PAD_X = 10;
const HEADER_TOP = 16;
const ROW_HEIGHT = 48;
const ROW_GAP = 12;
const TOGGLE_SIZE = 28;
const EUI_ICON_SIZE = 100;
const EUI_LABEL_GAP = 4;
const EUI_LABEL_SIZE = 12;
const EUI_LABEL_LINE_HEIGHT = 1.2;
const EUI_LABEL_HEIGHT = EUI_LABEL_SIZE * EUI_LABEL_LINE_HEIGHT * 2;
const EUI_PADDING_Y = 8;
const EUI_BOTTOM = 8;
const EUI_HEIGHT =
  EUI_PADDING_Y * 2 + EUI_ICON_SIZE + EUI_LABEL_GAP + EUI_LABEL_HEIGHT;

const ROWS: {id: NavItem; label: string; icon: AppIconName}[] = [
  {id: 'device', label: 'Device', icon: 'ic_server'},
  {id: 'connect', label: 'Connect', icon: 'ic_connected'},
  {id: 'activities', label: 'Activities', icon: 'ic_activities'},
  {id: 'set', label: 'Set', icon: 'ic_settings2'},
];

const rowIndex = (id: Exclude<NavItem, 'ctrlbot' | 'eui'>, showRoomMenus: boolean) => {
  const visible = showRoomMenus ? ROWS : ROWS.filter((item) => item.id !== 'activities');
  return visible.findIndex((item) => item.id === id);
};

/** Regions for Camera and annotations in the tablet viewport's coordinate space. */
export const tabletNavRegions = {
  full: {x: 0, y: 0, width: TABLET_NAV_WIDTH, height: TABLET_VIEWPORT.height},
  content: {
    x: TABLET_NAV_WIDTH,
    y: 0,
    width: TABLET_VIEWPORT.width - TABLET_NAV_WIDTH,
    height: TABLET_VIEWPORT.height,
  },
  header: {x: PAD_X, y: HEADER_TOP, width: TABLET_NAV_WIDTH - PAD_X * 2, height: ROW_HEIGHT},
  row: (id: Exclude<NavItem, 'ctrlbot' | 'eui'>, showRoomMenus = false) => ({
    x: PAD_X,
    y:
      HEADER_TOP +
      ROW_HEIGHT +
      ROW_GAP +
      Math.max(0, rowIndex(id, showRoomMenus)) * (ROW_HEIGHT + ROW_GAP),
    width: TABLET_NAV_WIDTH - PAD_X * 2,
    height: ROW_HEIGHT,
  }),
  toggle: {
    x: TABLET_NAV_WIDTH - TOGGLE_SIZE,
    y: (TABLET_VIEWPORT.height - TOGGLE_SIZE) / 2,
    width: TOGGLE_SIZE,
    height: TOGGLE_SIZE,
  },
  eui: {
    x: PAD_X,
    y: TABLET_VIEWPORT.height - EUI_BOTTOM - EUI_HEIGHT,
    width: TABLET_NAV_WIDTH - PAD_X * 2,
    height: EUI_HEIGHT,
  },
};

export const TabletNavRail = ({
  active,
  showRoomMenus = false,
}: {
  active: NavItem;
  /** Activities and EUI appear after connected devices make them useful. */
  showRoomMenus?: boolean;
}) => {
  const visibleRows = showRoomMenus
    ? ROWS
    : ROWS.filter((item) => item.id !== 'activities');

  return (
    <Interactive.Div
      name="Tablet setup rail"
      style={{
        position: 'relative',
        width: TABLET_NAV_WIDTH,
        height: TABLET_VIEWPORT.height,
        flex: '0 0 auto',
        paddingLeft: PAD_X,
        paddingRight: PAD_X,
        backgroundImage: `url(${staticFile('app-assets/bg_leftmenu.png')})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Interactive.Div
        name="CTRLbot rail item"
        style={{
          height: ROW_HEIGHT,
          marginTop: HEADER_TOP,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <AppIcon
          name="ic_ctrlbot"
          size={24}
          tint={active === 'ctrlbot' ? appColors.white : appColors.gray50}
        />
        <span
          style={{
            fontFamily: 'Audiowide, sans-serif',
            fontWeight: 400,
            fontSize: 18,
            color: active === 'ctrlbot' ? appColors.white : appColors.gray50,
          }}
        >
          CTRLbot
        </span>
      </Interactive.Div>

      {visibleRows.map((item) => (
        <Interactive.Div
          key={item.id}
          name={`${item.label} rail item`}
          style={{
            height: ROW_HEIGHT,
            marginTop: ROW_GAP,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <AppIcon
            name={item.icon}
            size={24}
            tint={item.id === active ? appColors.white : appColors.gray50}
          />
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: 18,
              color: item.id === active ? appColors.white : appColors.gray50,
            }}
          >
            {item.label}
          </span>
        </Interactive.Div>
      ))}

      {showRoomMenus ? (
        <Interactive.Div
          name="End User Interface rail item"
          style={{
            position: 'absolute',
            left: PAD_X,
            right: PAD_X,
            bottom: EUI_BOTTOM,
            height: EUI_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppIcon name="ic_eui" size={EUI_ICON_SIZE} tint={appColors.blue} />
          <span
            style={{
              marginTop: EUI_LABEL_GAP,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: EUI_LABEL_SIZE,
              lineHeight: EUI_LABEL_LINE_HEIGHT,
              textAlign: 'center',
              color: appColors.blue,
            }}
          >
            END USER
            <br />
            INTERFACE
          </span>
        </Interactive.Div>
      ) : null}

      <Interactive.Div
        name="Collapse tablet rail"
        style={{
          position: 'absolute',
          right: 0,
          top: (TABLET_VIEWPORT.height - TOGGLE_SIZE) / 2,
          width: TOGGLE_SIZE,
          height: TOGGLE_SIZE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.5,
        }}
      >
        <AppIcon
          name="ic_arrow_forward_24"
          size={24}
          tint={appColors.white}
          style={{rotate: '180deg'}}
        />
      </Interactive.Div>
    </Interactive.Div>
  );
};
