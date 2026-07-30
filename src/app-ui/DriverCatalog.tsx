// The Device Drivers catalog, rebuilt as live React.
//
// Geometry and behaviour from the app:
//   res/layout/driver_database.xml     title, search field, category + sort split buttons,
//                                      driver list, and (tablet) the detail pane beside it
//   res/layout/driver_card.xml         5dp card, 12dp padding, 28dp icon, 40dp add button
//   res/color/card_background.xml      blue when selected, gray_15 otherwise
//   ui/database/DriverListAdapter.kt   icon AND card colour both key off deviceType
//
// That last one is the detail worth preserving: a projector card is #333333 with the
// projector icon, a switcher is #2D2D2D with the route icon. The list is colour-coded
// by equipment type, which is a real affordance rather than decoration.

import {AppIcon, type AppIconName} from './AppIcon';
import {VIEWPORT as CATALOG_VIEWPORT} from './viewports';
import {appColors, appColorStates} from '../design/tokens.generated';

export {VIEWPORT as CATALOG_VIEWPORT} from './viewports';

export type DeviceType = 'display' | 'projector' | 'switcher' | 'endPoint';

export type DriverEntry = {
  manufacturer: string;
  model: string;
  deviceType: DeviceType;
};

/**
 * DriverListAdapter.kt lines 84-99 — icon and card colour, chosen together.
 *
 * `emphasis` is a video-only variant. The shipped greys sit within 6 points of each
 * other (#2D2D2D / #2F2F2F / #333333), which is legible on a panel held at arm's
 * length but disappears into h264 banding at a distance. A scene that is specifically
 * teaching device types can opt into the wider spread; everything else stays exact.
 */
const DEVICE_TYPE: Record<
  DeviceType,
  {icon: AppIconName; card: string; emphasis: string; label: string}
> = {
  display: {
    icon: 'ic_display_50',
    card: appColors.displayCardBg, // #2F2F2F
    emphasis: '#34383C',
    label: 'Displays',
  },
  projector: {
    icon: 'ic_projector_filled',
    card: appColors.projectorCardBg, // #333333
    emphasis: '#3B3A33',
    label: 'Projectors',
  },
  switcher: {
    icon: 'ic_route2',
    card: appColors.switcherCardBg, // #2D2D2D
    emphasis: '#2A3138',
    label: 'Switchers',
  },
  endPoint: {
    icon: 'ic_server',
    card: appColors.endPointCardBg, // #383838
    emphasis: '#3E3442',
    label: 'End Points',
  },
};

const NAV_WIDTH = 180;

// Layout rhythm, shared by the markup and catalogRegions() so a camera target can
// never drift from the control it points at.
const EDGE = 12;
const TOP = 36;
const SEARCH_H = 56;
const FILTER_H = 50;
const FILTER_GAP = 12;
const LIST_GAP = 12;
const CARD_H = 66;
const CARD_GAP = 12;
const FILTER_ROW_GAP = 12;
const TITLE_W = 150; // 'Device Drivers' at 18sp needs ~134; the rest is its gap

/**
 * Named regions in the catalog's own coordinate space.
 *
 * Note the horizontal centring: the search field and the cards are close to full
 * width, so framing a shot on their own centre pushes the camera sideways until the
 * clamp crops the interface. Scenes should frame these on the viewport centre and use
 * only the y — which is what `centreX` is here for.
 */
export const catalogRegions = (device: 'phone' | 'tablet') => {
  const viewport = CATALOG_VIEWPORT[device];
  const listX = device === 'tablet' ? NAV_WIDTH : 0;
  const listW = device === 'tablet' ? 430 : viewport.width;
  // Phone stacks the filters, so it clears two rows before the list starts.
  const filterRows = device === 'phone' ? 2 : 1;
  const filterBlockH = FILTER_H * filterRows + FILTER_ROW_GAP * (filterRows - 1);
  const listTop = TOP + SEARCH_H + FILTER_GAP + filterBlockH + LIST_GAP;

  return {
    full: {x: 0, y: 0, width: viewport.width, height: viewport.height},
    centreX: viewport.width / 2,
    searchField: {
      x: listX + EDGE + TITLE_W,
      y: TOP,
      width: listW - EDGE * 2 - TITLE_W,
      height: SEARCH_H,
    },
    filters: {
      x: listX + EDGE,
      y: TOP + SEARCH_H + FILTER_GAP,
      width: listW - EDGE * 2,
      height: filterBlockH,
    },
    card: (index: number) => ({
      x: listX + EDGE,
      y: listTop + index * (CARD_H + CARD_GAP),
      width: listW - EDGE * 2,
      height: CARD_H,
    }),
    /** The circular add button inside a card. */
    addButton: (index: number) => ({
      x: listX + listW - EDGE - 12 - 40,
      y: listTop + index * (CARD_H + CARD_GAP) + (CARD_H - 40) / 2,
      width: 40,
      height: 40,
    }),
  };
};

const RAIL_ITEMS = [
  {icon: 'ic_server' as AppIconName, label: 'Device'},
  {icon: 'ic_connect' as AppIconName, label: 'Connect'},
  {icon: 'ic_settings2' as AppIconName, label: 'Set'},
];

/** One driver row. `selected` takes the card_background selected colour. */
const DriverCard = ({
  driver,
  selected,
  scale,
  emphasizeTypes,
}: {
  driver: DriverEntry;
  selected: boolean;
  scale: number;
  emphasizeTypes: boolean;
}) => {
  const spec = DEVICE_TYPE[driver.deviceType];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10 * scale,
        height: CARD_H * scale,
        marginBottom: CARD_GAP * scale,
        padding: 12 * scale,
        borderRadius: 5 * scale,
        backgroundColor: selected
          ? appColorStates.cardBackground.selected
          : emphasizeTypes
            ? spec.emphasis
            : spec.card,
      }}
    >
      <AppIcon name={spec.icon} size={28 * scale} tint={appColors.white} />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 2 * scale}}>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 13 * scale,
            color: appColors.white,
          }}
        >
          {driver.manufacturer} {spec.label}
        </span>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 12 * scale,
            color: appColors.white,
          }}
        >
          {driver.model}
        </span>
      </div>
      {/* Material IconButton — circular, @color/gray background, 24dp icon */}
      <div
        style={{
          width: 40 * scale,
          height: 40 * scale,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 999,
          backgroundColor: appColors.gray,
        }}
      >
        <AppIcon name="ic_add_24" size={24 * scale} tint={appColors.white} />
      </div>
    </div>
  );
};

/** A split control: label segment plus a dropdown segment, per ShapeAppearance.SplitButton. */
const SplitControl = ({
  label,
  icon,
  scale,
  flex,
}: {
  label: string;
  icon?: AppIconName;
  scale: number;
  flex?: number;
}) => (
  <div style={{display: 'flex', flex, flexShrink: 0, height: FILTER_H * scale}}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10 * scale,
        paddingLeft: 14 * scale,
        paddingRight: 14 * scale,
        borderTopLeftRadius: 5 * scale,
        borderBottomLeftRadius: 5 * scale,
        backgroundColor: appColors.gray20,
      }}
    >
      {icon ? <AppIcon name={icon} size={18 * scale} tint={appColors.white} /> : null}
      <span
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: 13 * scale,
          color: appColors.white,
        }}
      >
        {label}
      </span>
    </div>
    <div
      style={{
        width: 42 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5 * scale,
        borderBottomRightRadius: 5 * scale,
        borderLeft: `1px solid ${appColors.gray25}`,
        backgroundColor: appColors.gray20,
      }}
    >
      {/* The dropdown caret is drawn rather than imported — the app uses the
          platform's Material arrow, which has no drawable in res/. */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${7 * scale}px solid transparent`,
          borderRight: `${7 * scale}px solid transparent`,
          borderTop: `${8 * scale}px solid ${appColors.white}`,
        }}
      />
    </div>
  </div>
);

export const DriverCatalog = ({
  device,
  drivers,
  selectedIndex = null,
  searchText = '',
  category = 'IP_RS232',
  sort = 'Manufacturer',
  emphasizeTypes = false,
}: {
  device: 'phone' | 'tablet';
  drivers: DriverEntry[];
  /** Index into `drivers`, or null for no selection. */
  selectedIndex?: number | null;
  /** Empty string shows the hint. */
  searchText?: string;
  category?: string;
  sort?: string;
  /** Widen the gaps between the device-type card colours. Video only. */
  emphasizeTypes?: boolean;
}) => {
  const isTablet = device === 'tablet';
  // No scale factor. The app runs the same sp type scale on both form factors — the
  // tablet just fits more on screen. Scaling type up on tablet is what made the first
  // pass of this surface read as a blown-up phone rather than the real thing.
  const scale = 1;
  const viewport = CATALOG_VIEWPORT[device];

  return (
    <div
      style={{
        display: 'flex',
        width: viewport.width,
        height: viewport.height,
        overflow: 'hidden',
        backgroundColor: appColors.gray10,
      }}
    >
      {/* Setup nav rail — tablet only; phone puts these in a bottom icon bar */}
      {isTablet ? (
        <div
          style={{
            width: NAV_WIDTH,
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
            paddingTop: 28,
            paddingLeft: 24,
            background: 'linear-gradient(to right, #161616, #2A2A2A)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14}}>
            <AppIcon name="ic_settings2" size={22} tint={appColors.gray50} />
            <span
              style={{
                fontFamily: 'Audiowide, sans-serif',
                fontWeight: 400,
                fontSize: 16,
                letterSpacing: 0,
                color: appColors.gray50,
              }}
            >
              CTRLbot
            </span>
          </div>
          {RAIL_ITEMS.map((item, index) => (
            <div key={item.label} style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <AppIcon
                name={item.icon}
                size={22}
                tint={index === 0 ? appColors.white : appColors.gray50}
              />
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: 16,
                  color: index === 0 ? appColors.white : appColors.gray50,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {/* List column */}
      <div
        style={{
          flex: isTablet ? '0 0 auto' : 1,
          width: isTablet ? 430 : undefined,
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: EDGE * scale,
          paddingRight: EDGE * scale,
          paddingTop: TOP * scale,
          overflow: 'hidden',
        }}
      >
        {/* Title + search */}
        <div style={{display: 'flex', alignItems: 'center', gap: 12 * scale}}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: 18 * scale,
              width: (TITLE_W - 12) * scale,
              whiteSpace: 'nowrap',
              color: appColors.white,
            }}
          >
            Device Drivers
          </span>
          <div
            style={{
              flex: 1,
              height: SEARCH_H * scale,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 14 * scale,
              backgroundColor: appColors.gray20,
            }}
          >
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: 15 * scale,
                color: searchText ? appColors.white : appColors.gray600,
              }}
            >
              {searchText || 'Search drivers...'}
            </span>
          </div>
        </div>

        {/* Category and sort. The phone stacks them full-width; only the tablet has
            the width to sit them side by side. */}
        <div
          style={{
            display: 'flex',
            flexDirection: isTablet ? 'row' : 'column',
            gap: FILTER_ROW_GAP * scale,
            marginTop: FILTER_GAP * scale,
          }}
        >
          <SplitControl label={category} scale={scale} flex={isTablet ? 1 : undefined} />
          <SplitControl label={sort} icon="ic_sort" scale={scale} flex={isTablet ? 1 : undefined} />
        </div>

        {/* Driver list */}
        <div style={{marginTop: LIST_GAP * scale, overflow: 'hidden'}}>
          {drivers.map((driver, index) => (
            <DriverCard
              key={`${driver.manufacturer}-${driver.model}`}
              driver={driver}
              selected={index === selectedIndex}
              scale={scale}
              emphasizeTypes={emphasizeTypes}
            />
          ))}
        </div>
      </div>

      {/* Detail pane — tablet only. Empty until a driver is selected. */}
      {isTablet ? (
        <div
          style={{
            flex: 1,
            margin: 14,
            border: `1px solid ${appColors.gray25}`,
            backgroundColor: appColors.black,
          }}
        />
      ) : null}
    </div>
  );
};
