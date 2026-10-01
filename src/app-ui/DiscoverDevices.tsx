// The Discover Devices surface, rebuilt as live React.
//
// Derived from:
//   res/layout-port/fragment_discover_devices.xml   top red close, title, found count, scan bar, scan/sort actions
//   res/layout-port/item_discovered_device.xml      device card with name, IP, web link, driver match, Add button
//   Reference frames: f_0035.jpg - f_0040.jpg
//
// Device data uses private IPs only (192.168.0.*).

import React from 'react';
import {PhoneNavMenu} from './PhoneNavMenu';
import {TabletNavRail} from './TabletNavRail';
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
  if (device === 'tablet') {
    return (
      <div
        style={{
          position: 'relative',
          width: VIEWPORT.tablet.width,
          height: VIEWPORT.tablet.height,
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
              height: 52,
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
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
                marginRight: 44,
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
              margin: '2px 16px 8px',
              height: 2.5,
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
              padding: '0 16px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
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
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    height: 52,
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
                  <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
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
                          height: 32,
                          padding: '0 16px',
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
                          height: 32,
                          padding: '0 16px',
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

                    <span style={{fontSize: 12, color: appColors.gray50}}>▾</span>
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
              margin: '8px 20px 14px',
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
                bottom: 28,
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
        width: VIEWPORT[device].width,
        height: VIEWPORT[device].height,
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
          height: 48,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
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
            marginRight: 44, // Balance close button
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
          margin: '0 12px 6px',
          height: 2,
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
          padding: '4px 16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
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
                padding: '12px 14px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.06)',
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
                <span style={{fontSize: 11, color: appColors.gray50}}>▾</span>
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
                    maxWidth: 180,
                  }}
                >
                  {dev.driverMatch ?? 'No matching driver'}
                </span>

                {isAdded ? (
                  <div
                    style={{
                      height: 34,
                      padding: '0 14px',
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
                      height: 34,
                      padding: '0 14px',
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
          margin: '8px 16px',
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
            bottom: showNavMenu ? 116 : 20,
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
      {showNavMenu ? <div style={{height: 108, flexShrink: 0}} /> : null}

      {/* Bottom Setup Navigation Bar */}
      {showNavMenu ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20}}>
          <PhoneNavMenu expanded={false} active="connect" showRoomMenus={true} />
        </div>
      ) : null}
    </div>
  );
};
