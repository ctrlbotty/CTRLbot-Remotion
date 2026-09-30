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

import type {ReactNode} from 'react';
import {AppIcon, type AppIconName} from './AppIcon';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
import {VIEWPORT as CATALOG_VIEWPORT} from './viewports';
import {appColors, appColorStates} from '../design/tokens.generated';

export {VIEWPORT as CATALOG_VIEWPORT} from './viewports';

/**
 * The setup screens' own background — `res/drawable/bg_setup_gradient.xml`.
 *
 * Black base with a blue radial wash centred at 68%/32%, radius 100%, falling to
 * transparent at 90%. The drawable names `@color/ctrlbot_blue_subtle` (#73008FD4), which
 * is `appColors.blue` at 45% — expressed that way here rather than as a hex literal so
 * a change to the app's blue reaches this too, and so no colour is invented.
 *
 * Opt-in via `background`, not the default. `gray_10` is what this surface has rendered
 * since it was built and it is baked into the approved First-Run cuts; switching every
 * caller at once would restyle those without anybody asking for it. See
 * Roadmap.md, Deferred — the drift is real and belongs in its own change.
 */
const blueAt = (amount: number) => {
  const value = parseInt(appColors.blue.slice(1), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${amount})`;
};

export const SETUP_BACKGROUND =
  `radial-gradient(circle at 68% 32%, ${blueAt(0.45)} 0%, ${blueAt(0)} 90%), ` +
  appColors.black;

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
  const listX = device === 'tablet' ? TABLET_NAV_WIDTH : 0;
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

/**
 * The list a split control drops, drawn under its own button.
 *
 * Absolutely positioned so opening it never reflows the row it hangs from — which is
 * what the app does, and what keeps a beat about opening a menu from also being a beat
 * where every card below jumps 200dp down the screen.
 */
const DropMenu = ({items, scale}: {items: readonly string[]; scale: number}) => (
  <div
    style={{
      position: 'absolute',
      zIndex: 3,
      left: 0,
      top: FILTER_H * scale,
      minWidth: 150 * scale,
      paddingTop: 6 * scale,
      paddingBottom: 6 * scale,
      backgroundColor: appColors.black,
      boxShadow: `0 ${8 * scale}px ${24 * scale}px ${appColors.black75}`,
    }}
  >
    {items.map((item) => (
      <div
        key={item}
        style={{
          paddingLeft: 14 * scale,
          paddingRight: 22 * scale,
          paddingTop: 7 * scale,
          paddingBottom: 7 * scale,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: 14 * scale,
          whiteSpace: 'nowrap',
          color: appColors.white,
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

/** A split control: label segment plus a dropdown segment, per ShapeAppearance.SplitButton. */
const SplitControl = ({
  label,
  icon,
  scale,
  flex,
  menu,
}: {
  label: string;
  icon?: AppIconName;
  scale: number;
  flex?: number;
  /** Items to show hanging open beneath it, or undefined for a closed control. */
  menu?: readonly string[];
}) => (
  <div style={{position: 'relative', display: 'flex', flex, flexShrink: 0, height: FILTER_H * scale}}>
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
    {menu ? <DropMenu items={menu} scale={scale} /> : null}
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
  listScroll = 0,
  openMenu,
  detail,
  background,
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
  /** dp the driver list is scrolled by. The header and filters do not move. */
  listScroll?: number;
  /** Which split control is showing its list, and what is in it. */
  openMenu?: {control: 'category' | 'sort'; items: readonly string[]};
  /** Tablet only. Fills the detail pane; without it the pane is the empty outline. */
  detail?: ReactNode;
  /** Defaults to `gray_10`. Pass `SETUP_BACKGROUND` for the app's real setup wash. */
  background?: string;
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
        background: background ?? appColors.gray10,
      }}
    >
      {/* Setup nav rail — tablet only; phone puts these in a bottom sheet. */}
      {isTablet ? <TabletNavRail active="device" /> : null}

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
        {/* `zIndex` is load-bearing: the list below scrolls inside a translated box,
            and a translated box is a stacking context — so without this the open menu
            paints *behind* the cards it is supposed to be covering. */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: isTablet ? 'row' : 'column',
            gap: FILTER_ROW_GAP * scale,
            marginTop: FILTER_GAP * scale,
          }}
        >
          <SplitControl
            label={category}
            scale={scale}
            flex={isTablet ? 1 : undefined}
            menu={openMenu?.control === 'category' ? openMenu.items : undefined}
          />
          <SplitControl
            label={sort}
            icon="ic_sort"
            scale={scale}
            flex={isTablet ? 1 : undefined}
            menu={openMenu?.control === 'sort' ? openMenu.items : undefined}
          />
        </div>

        {/* Driver list. Clipped by this box; `listScroll` moves the rows inside it, so
            the title, search field and filters stay where they are — which is what a
            RecyclerView under a fixed header does. */}
        <div style={{marginTop: LIST_GAP * scale, overflow: 'hidden'}}>
          <div style={{translate: `0px ${-listScroll * scale}px`}}>
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
      </div>

      {/* Detail pane — tablet only.

          Empty is *empty*: `driver_detail_container` in driver_database.xml is a bare
          FrameLayout with no background, so before a driver is picked the page shows
          through, and the walkthrough recording confirms it — the right of that screen
          is the setup wash, not a panel. This used to draw a bordered black box, which
          was invented; at the sizes the First-Run cut frames it that read as a dark
          area, but in a shot of the whole screen it is a void down 45% of the frame. */}
      {isTablet ? (
        <div style={{flex: 1, marginLeft: 30, overflow: 'hidden'}}>{detail}</div>
      ) : null}
    </div>
  );
};
