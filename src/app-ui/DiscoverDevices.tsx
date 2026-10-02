// The Discover Devices surface, rebuilt as live React.
//
// Derived from:
//   res/layout-port/fragment_discover_devices.xml   top red close, title, found count, scan bar, scan/sort actions
//   res/layout-port/item_discovered_device.xml      device card with name, IP, web link, driver match, Add button
//   Reference frames: f_0035.jpg - f_0040.jpg
//
// Device data uses private IPs only (192.168.0.*).

import React from 'react';
import {NAV_COLLAPSED_H, PhoneNavMenu} from './PhoneNavMenu';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';

export type DiscoveredDevice = {
  id: string;
  name: string;
  ip: string;
  hasWebPage?: boolean;
  driverMatch?: string;
  actionType?: 'add_driver' | 'add_direct' | 'added';
  isExpanded?: boolean;
  expandedEvidence?: string;
};

export const DEFAULT_DISCOVERED_DEVICES: DiscoveredDevice[] = [
  {
    id: 'd1',
    name: 'TP-Link Archer AX21',
    ip: '192.168.0.1',
    hasWebPage: true,
    driverMatch: 'No matching driver',
    actionType: 'add_direct',
  },
  {
    id: 'd2',
    name: 'Google Eureka Dongle',
    ip: '192.168.0.16',
    driverMatch: 'No matching driver',
    actionType: 'add_direct',
  },
  {
    id: 'd3',
    name: '192.168.0.74:64542',
    ip: '192.168.0.74',
    driverMatch: 'No matching driver',
    actionType: 'add_direct',
  },
  {
    id: 'd4',
    name: 'Sonos One SL',
    ip: '192.168.0.82',
    driverMatch: 'No matching driver',
    actionType: 'add_direct',
  },
  {
    id: 'd5',
    name: 'HP LaserJet Professional P1102w',
    ip: '192.168.0.83',
    hasWebPage: true,
    driverMatch: 'No matching driver',
    actionType: 'add_direct',
  },
  {
    id: 'd6',
    name: 'SSH-2.0-OpenSSH_10.2p1 Ubuntu-2ubuntu3.6',
    ip: '192.168.0.100',
    driverMatch: 'No matching driver',
    actionType: 'add_direct',
  },
  {
    id: 'd7',
    name: 'Matrox ConvertIP',
    ip: '192.168.0.101',
    hasWebPage: true,
    driverMatch: 'MATROX End Points',
    actionType: 'add_driver',
  },
  {
    id: 'd8',
    name: 'Matrox ConvertIP',
    ip: '192.168.0.102',
    hasWebPage: true,
    driverMatch: 'MATROX End Points',
    actionType: 'add_driver',
  },
  {
    id: 'd9',
    name: 'Matrox ConvertIP',
    ip: '192.168.0.103',
    hasWebPage: true,
    driverMatch: 'MATROX End Points',
    actionType: 'add_driver',
  },
  {
    id: 'd10',
    name: 'Logitech Harmony Hub',
    ip: '192.168.0.130',
    hasWebPage: true,
    driverMatch: 'No matching driver',
    actionType: 'add_direct',
  },
];

export type DiscoverDevicesProps = {
  device?: 'phone' | 'tablet';
  foundCount?: number;
  stillLooking?: boolean;
  scanningProgress?: number;
  devices?: DiscoveredDevice[];
  toast?: string;
  showNavMenu?: boolean;
  addedDeviceIds?: string[];
  initialScrollOffset?: number;
};

// Layout rhythm, shared between markup and discoverDevicesRegions() so camera targets
// never drift from the controls they frame.
export const DISCOVER_LAYOUT = {
  phone: {
    topBarHeight: 48,
    padX: 12,
    closeBtnSize: 44,
    statusHeight: 24, // margin 2 + text 16 + margin 6
    progressBarHeight: 2,
    progressBarMarginBottom: 6,
    listPadX: 16,
    listPadTop: 4,
    cardHeight: 104,
    cardGap: 14,
    cardPadX: 14,
    cardPadY: 12,
    actionButtonHeight: 34,
    actionButtonWidth: 94,
    btnActionWidth: 94,
    btnAddedWidth: 66,
    btnPadX: 14,
    cardItemGap: 12,
    chevronSize: 11,
    driverMatchWidth: 180,
    footerMarginTop: 8,
    footerMarginBottom: 8,
    footerMarginX: 16,
    footerHeight: 20,
    navHeight: NAV_COLLAPSED_H, // 108
    toastBottom: 116,
  },
  tablet: {
    railWidth: TABLET_NAV_WIDTH, // 200
    topBarHeight: 52,
    padX: 16,
    closeBtnSize: 44,
    progressBarHeight: 2.5,
    progressBarMarginTop: 2,
    progressBarMarginBottom: 8,
    listPadX: 16,
    listPadTop: 0,
    listPadBottom: 12,
    cardHeight: 52,
    cardGap: 8,
    cardPadX: 16,
    cardPadY: 8,
    actionButtonHeight: 32,
    actionButtonWidth: 98,
    btnActionWidth: 98,
    btnAddedWidth: 70,
    btnPadX: 16,
    chevronSize: 12,
    cardItemGap: 14,
    driverMatchWidth: 180,
    footerMarginTop: 8,
    footerMarginBottom: 14,
    footerMarginX: 20,
    footerHeight: 20,
    navHeight: 0,
    toastBottom: 28,
  },
} as const;

const layoutFor = (device: 'phone' | 'tablet') => {
  const viewport = VIEWPORT[device];
  const isTablet = device === 'tablet';
  const railW = isTablet ? TABLET_NAV_WIDTH : 0;
  const contentX = railW;
  const contentW = viewport.width - railW;
  const c = isTablet ? DISCOVER_LAYOUT.tablet : DISCOVER_LAYOUT.phone;

  const topBarH = c.topBarHeight;
  const closeBtnX = contentX + c.padX;
  const closeBtnY = (topBarH - c.closeBtnSize) / 2;

  const progressY = isTablet
    ? topBarH + DISCOVER_LAYOUT.tablet.progressBarMarginTop
    : topBarH + DISCOVER_LAYOUT.phone.statusHeight;
  const progressH = c.progressBarHeight;

  const listTopY = isTablet
    ? topBarH +
      DISCOVER_LAYOUT.tablet.progressBarMarginTop +
      progressH +
      DISCOVER_LAYOUT.tablet.progressBarMarginBottom +
      c.listPadTop
    : topBarH +
      DISCOVER_LAYOUT.phone.statusHeight +
      progressH +
      DISCOVER_LAYOUT.phone.progressBarMarginBottom +
      c.listPadTop;

  const cardW = contentW - c.listPadX * 2;
  const cardX = contentX + c.listPadX;

  const footerY =
    viewport.height - (isTablet ? 0 : c.navHeight) - c.footerMarginBottom - c.footerHeight;

  return {
    viewport,
    isTablet,
    railW,
    contentX,
    contentW,
    c,
    topBarH,
    closeBtnX,
    closeBtnY,
    progressY,
    progressH,
    listTopY,
    cardW,
    cardX,
    footerY,
  };
};

/**
 * Named regions for <Camera> and annotations in DiscoverDevices' coordinate space.
 * Follows connectionRegions(device): derived from layoutFor(device).
 */
export const discoverDevicesRegions = (device: 'phone' | 'tablet') => {
  const l = layoutFor(device);
  const isTablet = l.isTablet;

  return {
    full: {x: 0, y: 0, width: l.viewport.width, height: l.viewport.height},
    content: {x: l.contentX, y: 0, width: l.contentW, height: l.viewport.height},
    centreX: l.contentX + l.contentW / 2,
    topBar: {x: l.contentX, y: 0, width: l.contentW, height: l.topBarH},
    closeButton: {
      x: l.closeBtnX,
      y: l.closeBtnY,
      width: l.c.closeBtnSize,
      height: l.c.closeBtnSize,
    },
    title: {
      x: l.contentX + l.c.closeBtnSize + l.c.padX,
      y: 0,
      width: l.contentW - (l.c.closeBtnSize + l.c.padX) * 2,
      height: l.topBarH,
    },
    status: isTablet
      ? {
          x: l.contentX + l.c.closeBtnSize + l.c.padX,
          y: l.topBarH / 2,
          width: l.contentW - (l.c.closeBtnSize + l.c.padX) * 2,
          height: l.topBarH / 2,
        }
      : {
          x: l.contentX,
          y: l.topBarH,
          width: l.contentW,
          height: DISCOVER_LAYOUT.phone.statusHeight,
        },
    progressBar: {
      x: l.contentX + (isTablet ? l.c.padX : 12),
      y: l.progressY,
      width: l.contentW - (isTablet ? l.c.padX * 2 : 24),
      height: l.progressH,
    },
    list: {
      x: l.cardX,
      y: l.listTopY,
      width: l.cardW,
      height: l.footerY - l.listTopY,
    },
    card: (index: number) => ({
      x: l.cardX,
      y: l.listTopY + index * (l.c.cardHeight + l.c.cardGap),
      width: l.cardW,
      height: l.c.cardHeight,
    }),
    /** The Add button ("Add Driver", "Add Direct", or "Added") inside a card */
    addButton: (
      index: number,
      state?: 'add_driver' | 'add_direct' | 'added' | DiscoveredDevice
    ) => {
      const cardY = l.listTopY + index * (l.c.cardHeight + l.c.cardGap);
      const actionType =
        typeof state === 'string'
          ? state
          : state && typeof state === 'object' && 'actionType' in state && state.actionType
            ? state.actionType
            : DEFAULT_DISCOVERED_DEVICES[index]?.actionType ?? 'add_direct';
      const isAdded = actionType === 'added';
      const btnH = l.c.actionButtonHeight;
      const btnW = state !== undefined && isAdded ? l.c.btnAddedWidth : l.c.actionButtonWidth;

      if (isTablet) {
        const btnRight = l.cardX + l.cardW - l.c.cardPadX - l.c.chevronSize - l.c.cardItemGap;
        return {
          x: btnRight - btnW,
          y: cardY + (l.c.cardHeight - btnH) / 2,
          width: btnW,
          height: btnH,
        };
      }
      const btnRight = l.cardX + l.cardW - l.c.cardPadX;
      return {
        x: btnRight - btnW,
        y: cardY + l.c.cardHeight - l.c.cardPadY - btnH,
        width: btnW,
        height: btnH,
      };
    },
    /** The driver match label inside a card */
    driverMatch: (
      index: number,
      state?: 'add_driver' | 'add_direct' | 'added' | DiscoveredDevice
    ) => {
      const cardY = l.listTopY + index * (l.c.cardHeight + l.c.cardGap);
      const actionType =
        typeof state === 'string'
          ? state
          : state && typeof state === 'object' && 'actionType' in state && state.actionType
            ? state.actionType
            : DEFAULT_DISCOVERED_DEVICES[index]?.actionType ?? 'add_direct';
      const isAdded = actionType === 'added';
      const btnW = state !== undefined && isAdded ? l.c.btnAddedWidth : l.c.actionButtonWidth;

      if (isTablet) {
        const btnRight = l.cardX + l.cardW - l.c.cardPadX - l.c.chevronSize - l.c.cardItemGap;
        const btnX = btnRight - btnW;
        const matchRight = btnX - l.c.cardItemGap;
        // Conservative layout-container region representing the available driver match container consistently
        const matchLeft = Math.round(l.cardX + l.cardW * 0.5);
        const matchW = matchRight - matchLeft;
        return {
          x: matchLeft,
          y: cardY + (l.c.cardHeight - 22) / 2,
          width: matchW,
          height: 22,
        };
      }
      const btnRight = l.cardX + l.cardW - l.c.cardPadX;
      const btnX = btnRight - btnW;
      const startX = l.cardX + l.c.cardPadX;
      const broadW = Math.max(120, btnX - 8 - startX);
      return {
        x: startX,
        y: cardY + l.c.cardHeight - l.c.cardPadY - l.c.actionButtonHeight + 6,
        width: broadW,
        height: 22,
      };
    },
    footer: {
      x: l.contentX + l.c.footerMarginX,
      y: l.footerY,
      width: l.contentW - l.c.footerMarginX * 2,
      height: l.c.footerHeight,
    },
    scanAgain: {
      x: l.contentX + l.c.footerMarginX,
      y: l.footerY,
      width: 100,
      height: l.c.footerHeight,
    },
    sortBy: {
      x: l.contentX + l.contentW - l.c.footerMarginX - 80,
      y: l.footerY,
      width: 80,
      height: l.c.footerHeight,
    },
    toast: {
      x: l.contentX + (l.contentW - 240) / 2,
      y: l.viewport.height - l.c.toastBottom - 36,
      width: 240,
      height: 36,
    },
  };
};

export const discoverRegions = discoverDevicesRegions;

export const DiscoverDevices: React.FC<DiscoverDevicesProps> = ({
  device = 'phone',
  foundCount = 15,
  stillLooking = true,
  scanningProgress = 50,
  devices = DEFAULT_DISCOVERED_DEVICES,
  toast,
  showNavMenu = true,
  addedDeviceIds = [],
  initialScrollOffset = 0,
}) => {
  const l = layoutFor(device);

  if (device === 'tablet') {
    return (
      <div
        style={{
          position: 'relative',
          width: l.viewport.width,
          height: l.viewport.height,
          backgroundColor: appColors.black,
          overflow: 'hidden',
          fontFamily: font.ui,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Left Nav Rail */}
        <TabletNavRail active="connect" showRoomMenus={true} />

        {/* Right Content Area */}
        <div
          style={{
            flex: 1,
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Background glow matching setup screens */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 68% 32%, rgba(0, 143, 212, 0.22) 0%, rgba(0, 0, 0, 0) 80%)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Bar: Close (X), Title, Status */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              height: l.topBarH,
              display: 'flex',
              alignItems: 'center',
              padding: `0 ${l.c.padX}px`,
            }}
          >
            <div
              style={{
                width: l.c.closeBtnSize,
                height: l.c.closeBtnSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke={appColors.priRed}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: l.c.closeBtnSize,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: appColors.white,
                }}
              >
                Discover Devices
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: appColors.gray75,
                  marginTop: 1,
                }}
              >
                {foundCount} devices found{stillLooking ? ', still looking...' : ''}
              </div>
            </div>
          </div>

          {/* Scan Progress Bar */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              margin: `${DISCOVER_LAYOUT.tablet.progressBarMarginTop}px ${l.c.padX}px ${DISCOVER_LAYOUT.tablet.progressBarMarginBottom}px`,
              height: l.progressH,
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.max(0, scanningProgress))}%`,
                height: '100%',
                backgroundColor: appColors.blue,
              }}
            />
          </div>

          {/* Discovered Device Cards List */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              flex: 1,
              overflowY: 'auto',
              padding: `0 ${l.c.listPadX}px ${DISCOVER_LAYOUT.tablet.listPadBottom}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: l.c.cardGap,
              transform: initialScrollOffset ? `translateY(-${initialScrollOffset}px)` : undefined,
            }}
          >
            {devices.map((dev) => {
              const isAdded = dev.actionType === 'added' || addedDeviceIds.includes(dev.id);
              const isAddDriver = dev.actionType === 'add_driver';

              return (
                <div
                  key={dev.id}
                  style={{
                    backgroundColor: '#1E1E1E',
                    borderRadius: 4,
                    padding: `${l.c.cardPadY}px ${l.c.cardPadX}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    height: l.c.cardHeight,
                  }}
                >
                  {/* Left Column: Name & IP */}
                  <div style={{display: 'flex', flexDirection: 'column', gap: 3}}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: appColors.white,
                      }}
                    >
                      {dev.name}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11.5,
                      }}
                    >
                      <span style={{color: appColors.gray50}}>IP address:</span>
                      <span
                        style={{
                          color: dev.hasWebPage ? appColors.blue : appColors.white,
                          fontFamily: font.mono,
                          fontWeight: 500,
                        }}
                      >
                        {dev.ip}
                      </span>
                      {dev.hasWebPage ? (
                        <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                          <path
                            d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59L7.76 14.83l1.41 1.41L19 6.41V10h2V3h-7z"
                            fill={appColors.blue}
                          />
                        </svg>
                      ) : null}
                    </div>
                  </div>

                  {/* Right Column: Driver Match, Action Button & Arrow */}
                  <div style={{display: 'flex', alignItems: 'center', gap: l.c.cardItemGap}}>
                    <span
                      style={{
                        fontSize: 12,
                        color: appColors.gray75,
                      }}
                    >
                      {dev.driverMatch ?? 'No matching driver'}
                    </span>

                    {isAdded ? (
                      <div
                        style={{
                          height: l.c.actionButtonHeight,
                          padding: `0 ${l.c.btnPadX}px`,
                          backgroundColor: 'rgba(0, 230, 118, 0.15)',
                          border: `1px solid ${appColors.green}`,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: appColors.green,
                          fontSize: 11.5,
                          fontWeight: 700,
                        }}
                      >
                        Added
                      </div>
                    ) : (
                      <div
                        style={{
                          height: l.c.actionButtonHeight,
                          padding: `0 ${l.c.btnPadX}px`,
                          backgroundColor: appColors.blue,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: appColors.white,
                          fontSize: 11.5,
                          fontWeight: 600,
                        }}
                      >
                        {isAddDriver ? 'Add Driver' : 'Add Direct'}
                      </div>
                    )}

                    <span style={{fontSize: l.c.chevronSize, color: appColors.gray50}}>▾</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer: Scan again | Sort: IP */}
          <div
            style={{
              position: 'relative',
              zIndex: 5,
              margin: `${DISCOVER_LAYOUT.tablet.footerMarginTop}px ${DISCOVER_LAYOUT.tablet.footerMarginX}px ${DISCOVER_LAYOUT.tablet.footerMarginBottom}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{color: appColors.blue, fontSize: 13, fontWeight: 600}}>Scan again</span>
            <span style={{color: appColors.blue, fontSize: 13, fontWeight: 600}}>Sort: IP</span>
          </div>

          {/* Floating Toast */}
          {toast ? (
            <div
              style={{
                position: 'absolute',
                bottom: DISCOVER_LAYOUT.tablet.toastBottom,
                left: 0,
                right: 0,
                zIndex: 30,
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(50, 50, 50, 0.92)',
                  borderRadius: 22,
                  padding: '9px 24px',
                  color: appColors.white75,
                  fontSize: 13,
                  fontWeight: 500,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {toast}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: l.viewport.width,
        height: l.viewport.height,
        backgroundColor: appColors.black,
        overflow: 'hidden',
        fontFamily: font.ui,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background glow matching setup screens */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 68% 32%, rgba(0, 143, 212, 0.22) 0%, rgba(0, 0, 0, 0) 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar: Close (X), Title */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: l.topBarH,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${l.c.padX}px`,
        }}
      >
        <div
          style={{
            width: l.c.closeBtnSize,
            height: l.c.closeBtnSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke={appColors.priRed}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 700,
            color: appColors.white,
            marginRight: l.c.closeBtnSize,
          }}
        >
          Discover Devices
        </div>
      </div>

      {/* Status: found count, still looking */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          fontSize: 11.5,
          color: appColors.gray75,
          margin: '2px 0 6px',
        }}
      >
        {foundCount} devices found{stillLooking ? ', still looking...' : ''}
      </div>

      {/* Scan Progress Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          margin: `0 ${l.c.padX}px ${DISCOVER_LAYOUT.phone.progressBarMarginBottom}px`,
          height: l.progressH,
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.max(0, scanningProgress))}%`,
            height: '100%',
            backgroundColor: appColors.blue,
          }}
        />
      </div>

      {/* Discovered Device Cards List */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          overflow: 'hidden',
          padding: `${DISCOVER_LAYOUT.phone.listPadTop}px ${l.c.listPadX}px 0`,
          display: 'flex',
          flexDirection: 'column',
          gap: l.c.cardGap,
          transform: initialScrollOffset ? `translateY(-${initialScrollOffset}px)` : undefined,
        }}
      >
        {devices.map((dev) => {
          const isAdded = dev.actionType === 'added' || addedDeviceIds.includes(dev.id);
          const isAddDriver = dev.actionType === 'add_driver';

          return (
            <div
              key={dev.id}
              style={{
                backgroundColor: '#1E1E1E',
                borderRadius: 5,
                padding: `${l.c.cardPadY}px ${l.c.cardPadX}px`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.06)',
                height: l.c.cardHeight,
                boxSizing: 'border-box',
              }}
            >
              {/* Row 1: Name and Expand Chevron */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: appColors.white,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 280,
                  }}
                >
                  {dev.name}
                </span>
                <span style={{fontSize: l.c.chevronSize, color: appColors.gray50}}>▾</span>
              </div>

              {/* Row 2: IP Address */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11.5,
                  marginBottom: 8,
                }}
              >
                <span style={{color: appColors.white}}>IP address:</span>
                <span
                  style={{
                    color: dev.hasWebPage ? appColors.blue : appColors.white,
                    fontFamily: font.mono,
                    fontWeight: 500,
                  }}
                >
                  {dev.ip}
                </span>
                {dev.hasWebPage ? (
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59L7.76 14.83l1.41 1.41L19 6.41V10h2V3h-7z"
                      fill={appColors.blue}
                    />
                  </svg>
                ) : null}
              </div>

              {/* Row 3: Driver Match & Action Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: 11.5,
                    color: appColors.gray75,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: l.c.driverMatchWidth,
                  }}
                >
                  {dev.driverMatch ?? 'No matching driver'}
                </span>

                {isAdded ? (
                  <div
                    style={{
                      height: l.c.actionButtonHeight,
                      padding: `0 ${l.c.btnPadX}px`,
                      backgroundColor: 'rgba(0, 230, 118, 0.15)',
                      border: `1px solid ${appColors.green}`,
                      borderRadius: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.green,
                      fontSize: 11.5,
                      fontWeight: 700,
                    }}
                  >
                    Added
                  </div>
                ) : (
                  <div
                    style={{
                      height: l.c.actionButtonHeight,
                      padding: `0 ${l.c.btnPadX}px`,
                      backgroundColor: appColors.blue,
                      borderRadius: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.white,
                      fontSize: 11.5,
                      fontWeight: 600,
                    }}
                  >
                    {isAddDriver ? 'Add Driver' : 'Add Direct'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer: Scan again | Sort: IP */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          margin: `${DISCOVER_LAYOUT.phone.footerMarginTop}px ${l.c.padX + 4}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{color: appColors.blue, fontSize: 13, fontWeight: 600}}>Scan again</span>
        <span style={{color: appColors.blue, fontSize: 13, fontWeight: 600}}>Sort: IP</span>
      </div>

      {/* Floating Toast (Reference f_0039.jpg) */}
      {toast ? (
        <div
          style={{
            position: 'absolute',
            bottom: showNavMenu ? DISCOVER_LAYOUT.phone.toastBottom : 20,
            left: 0,
            right: 0,
            zIndex: 30,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(50, 50, 50, 0.92)',
              borderRadius: 22,
              padding: '8px 20px',
              color: appColors.white75,
              fontSize: 12,
              fontWeight: 500,
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {toast}
          </div>
        </div>
      ) : null}

      {/* Spacer for bottom navigation */}
      {showNavMenu ? <div style={{height: l.c.navHeight, flexShrink: 0}} /> : null}

      {/* Bottom Setup Navigation Bar */}
      {showNavMenu ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20}}>
          <PhoneNavMenu expanded={false} active="connect" showRoomMenus={true} />
        </div>
      ) : null}
    </div>
  );
};
