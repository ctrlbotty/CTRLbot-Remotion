// The Connect and Test surface, rebuilt as live React.
//
// Derived from:
//   res/layout/menu_connections.xml            top toggle pill, + New Connection, Find Devices
//   res/layout/driver_connection.xml           remote header row, connection card
//   res/layout-port/remotes_test.xml           Buttons, Switcher, Terminal, Web page tabs, D-pad, power buttons
//   res/layout-port/av_sw_remote_nx1.xml       single-output display preview and input cards
//   Reference frames: f_0021.jpg - f_0024.jpg, f_0041.jpg

import React from 'react';
import {AppIcon} from './AppIcon';
import {PhoneNavMenu} from './PhoneNavMenu';
import {TabletNavRail} from './TabletNavRail';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';

export type ConnectTestTopTab = 'connections' | 'test';
export type ConnectTestSubTab = 'buttons' | 'switcher' | 'terminal' | 'web';

export type TerminalEntry = {
  text: string;
  kind?: 'status' | 'sent' | 'received';
};

export const DEFAULT_CONNECT_TERMINAL: TerminalEntry[] = [
  {text: '[10:25:58] Connected to 192.168.0.134:3629', kind: 'status'},
  {text: '[10:26:06] Sent: PWR ON [0D]', kind: 'sent'},
  {text: '[10:26:06] Sent: PWR OFF [0D]', kind: 'sent'},
  {text: '[10:26:19] Sent: hellow [0D]', kind: 'sent'},
  {text: '[10:26:22] Disconnected', kind: 'status'},
  {text: '[10:26:27] Connected to EPSON PowerLite - New', kind: 'status'},
  {text: '[10:26:29] Sent: KEY 35 [0D]', kind: 'sent'},
  {text: '[10:26:29] Sent: KEY 37 [0D]', kind: 'sent'},
  {text: '[10:26:30] Sent: KEY 36 [0D]', kind: 'sent'},
  {text: '[10:26:34] Sent: SOURCE 10 [0D]', kind: 'sent'},
  {text: '[10:26:35] Sent: SOURCE 20 [0D]', kind: 'sent'},
  {text: '[10:26:35] Sent: SOURCE 30 [0D]', kind: 'sent'},
];

export const DEFAULT_CONNECT_COMMANDS = [
  {name: 'POWER ON', code: 'PWR ON\\r'},
  {name: 'POWER OFF', code: 'PWR OFF\\r'},
  {name: 'POWER TOGGLE', code: 'KEY 01\\r'},
];

export type SwitcherOutput = {
  name: string;
  ip?: string;
  routed?: string | null;
};

export type SwitcherInput = {
  name: string;
  id: number;
};

export const DEFAULT_MATROX_OUTPUTS: SwitcherOutput[] = [
  {name: 'CONVERTIP RX 1', ip: '239.100.45.1'},
  {name: 'CONVERTIP RX 2', ip: '239.100.46.1'},
  {name: 'CONVERTIP RX 3', ip: '239.100.47.1'},
  {name: 'CONVERTIP RX 4', ip: '239.100.48.1'},
];

export const DEFAULT_MATROX_INPUTS: SwitcherInput[] = [
  {name: 'CONVERTIP TX 1', id: 1},
  {name: 'CONVERTIP TX 2', id: 2},
  {name: 'CONVERTIP TX 3', id: 3},
  {name: 'CONVERTIP TX 4', id: 4},
];

export const DEFAULT_MATROX_DEVICE_LIST = [
  {name: 'MATROX ConvertIP (8)', isParent: true},
  {name: 'ConvertIP RX 1', checked: true},
  {name: 'ConvertIP RX 2', checked: true},
  {name: 'ConvertIP RX 3', checked: true},
  {name: 'ConvertIP RX 4', checked: true},
  {name: 'ConvertIP TX 1', checked: true},
  {name: 'ConvertIP TX 2', checked: true},
  {name: 'ConvertIP TX 3', checked: true},
  {name: 'ConvertIP TX 4', checked: true},
];

export type ConnectTestProps = {
  device?: 'phone' | 'tablet';
  topTab?: ConnectTestTopTab;
  testTab?: ConnectTestSubTab;
  deviceName?: string;
  connected?: boolean;
  statusColor?: 'green' | 'red';
  selectedOutput?: number;
  selectedInput?: number;
  terminalLines?: TerminalEntry[];
  commands?: Array<{name: string; code: string}>;
  webUrl?: string;
  webTitle?: string;
  foundDevicesCount?: number;
  showNavMenu?: boolean;
  multiOutput?: boolean;
  outputs?: SwitcherOutput[];
  inputs?: SwitcherInput[];
  deviceSelectorOpen?: boolean;
  deviceList?: Array<{name: string; isParent?: boolean; checked?: boolean}>;
  subTabs?: Array<{id: ConnectTestSubTab; label: string}>;
  activeOutputs?: number[];
  activeInputs?: number[];
  matrixSelection?: {output: number; input: number};
};

export const ConnectTest: React.FC<ConnectTestProps> = ({
  device = 'phone',
  topTab = 'test',
  testTab = 'buttons',
  deviceName = 'EPSON PowerLite - New',
  connected = true,
  statusColor,
  selectedOutput = 1,
  selectedInput = 1,
  terminalLines = DEFAULT_CONNECT_TERMINAL,
  commands = DEFAULT_CONNECT_COMMANDS,
  webUrl = 'http://192.168.0.134',
  webTitle = 'EPSON Web Control',
  foundDevicesCount = 16,
  showNavMenu = true,
  multiOutput = false,
  outputs = DEFAULT_MATROX_OUTPUTS,
  inputs = DEFAULT_MATROX_INPUTS,
  deviceSelectorOpen = false,
  deviceList = DEFAULT_MATROX_DEVICE_LIST,
  subTabs,
  activeOutputs = [1, 2, 3, 4],
  activeInputs = [1, 2, 3, 4],
  matrixSelection = {output: 1, input: 1},
}) => {
  const isTest = topTab === 'test';

  const isRedStatus =
    statusColor === 'red' ||
    deviceName.includes('MATROX') ||
    deviceName.includes('ConvertIP');

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
        {/* Navigation Rail */}
        <TabletNavRail active="connect" showRoomMenus={true} />

        {/* Center Main Stage + Right Sidebar Container */}
        <div
          style={{
            position: 'relative',
            width: VIEWPORT.tablet.width - 200,
            height: VIEWPORT.tablet.height,
            display: 'flex',
            flexDirection: 'row',
            background:
              'radial-gradient(circle at 68% 32%, rgba(0, 143, 212, 0.22) 0%, rgba(0, 0, 0, 0) 80%)',
          }}
        >
          {/* Main Content Area (width: 1080 - 312 = 768px) */}
          <div
            style={{
              width: 768,
              height: 800,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Page Toggle Pill */}
            <div
              style={{
                display: 'flex',
                height: 48,
                margin: '8px 12px 4px',
                borderRadius: 6,
                overflow: 'hidden',
                backgroundColor: appColors.gray20,
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: !isTest ? appColors.blue : appColors.gray20,
                  color: appColors.white,
                  fontSize: 13,
                  fontWeight: 600,
                  borderRight: '1px solid rgba(0,0,0,0.3)',
                }}
              >
                Device Driver Connections
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isTest ? appColors.blue : appColors.gray20,
                  color: appColors.white,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Test Device Drivers
              </div>
            </div>

            {/* Middle Content */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '4px 12px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {!isTest ? (
                /* Connections tab: + New Connection & Find Devices buttons */
                <div style={{display: 'flex', gap: 12, marginTop: 8}}>
                  <div
                    style={{
                      flex: 1,
                      height: 48,
                      backgroundColor: appColors.gray20,
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.white,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    + New Connection
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 48,
                      backgroundColor: appColors.gray20,
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      color: appColors.white,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <circle cx={11} cy={11} r={8} stroke={appColors.white} strokeWidth={2.5} />
                      <path d="M21 21L16.65 16.65" stroke={appColors.white} strokeWidth={2.5} strokeLinecap="round" />
                    </svg>
                    <span>{foundDevicesCount} devices found</span>
                  </div>
                </div>
              ) : testTab === 'buttons' ? (
                /* Buttons Tab */
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '16px 0',
                  }}
                >
                  {/* Top Power Row */}
                  <div style={{display: 'flex', justifyContent: 'center', gap: 48, width: '100%'}}>
                    {[
                      {label: 'TOGGLE', color: appColors.priRed, active: true},
                      {label: 'ON', color: appColors.gray50, active: false},
                      {label: 'OFF', color: appColors.priRed, active: true},
                    ].map((btn) => (
                      <div key={btn.label} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
                        <div
                          style={{
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            border: `3px solid ${btn.color}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path d="M12 3V11M6.34 7.34A8 8 0 1017.66 7.34" stroke={btn.color} strokeWidth={2.8} strokeLinecap="round" />
                          </svg>
                        </div>
                        <span style={{fontSize: 11, fontWeight: 700, color: appColors.white, fontFamily: font.mono}}>
                          {btn.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* D-Pad */}
                  <div
                    style={{
                      position: 'relative',
                      width: 220,
                      height: 220,
                      borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{position: 'absolute', top: 12}}>
                      <svg width={36} height={36} viewBox="0 0 24 24" fill={appColors.gray50}>
                        <path d="M12 4L4 14H9V20H15V14H20L12 4Z" />
                      </svg>
                    </div>
                    <div style={{position: 'absolute', bottom: 12}}>
                      <svg width={36} height={36} viewBox="0 0 24 24" fill={appColors.gray50}>
                        <path d="M12 20L20 10H15V4H9V10H4L12 20Z" />
                      </svg>
                    </div>
                    <div style={{position: 'absolute', left: 12}}>
                      <svg width={36} height={36} viewBox="0 0 24 24" fill={appColors.gray50}>
                        <path d="M4 12L14 4V9H20V15H14V20L4 12Z" />
                      </svg>
                    </div>
                    <div style={{position: 'absolute', right: 12}}>
                      <svg width={36} height={36} viewBox="0 0 24 24" fill={appColors.gray50}>
                        <path d="M20 12L10 20V15H4V9H10V4L20 12Z" />
                      </svg>
                    </div>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        backgroundColor: appColors.gray50,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: appColors.white,
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      OK
                    </div>
                  </div>

                  {/* Menu / Exit Row */}
                  <div style={{display: 'flex', gap: 24, width: '100%', justifyContent: 'center'}}>
                    {['MENU', 'EXIT'].map((label) => (
                      <div
                        key={label}
                        style={{
                          width: 140,
                          height: 36,
                          backgroundColor: '#1E1E1E',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: appColors.white,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              ) : testTab === 'switcher' ? (
                /* Switcher Tab */
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 24,
                    padding: '12px 16px',
                  }}
                >
                  {/* Left Column: Source Buttons */}
                  <div
                    style={{
                      width: 220,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    {[
                      {id: 1, name: 'INPUT 1'},
                      {id: 2, name: 'INPUT 2'},
                      {id: 3, name: 'HDMI 1'},
                      {id: 4, name: 'HDMI 2'},
                    ].map((inp) => {
                      const isBlue = selectedInput === inp.id;
                      const isHighlightYellow = activeInputs ? activeInputs.includes(inp.id) : (selectedInput === 2 && inp.id === 3);
                      const bg = isHighlightYellow
                        ? appColors.priYellow
                        : isBlue
                          ? appColors.blue
                          : appColors.gray20;
                      const textColor = isHighlightYellow ? '#222222' : appColors.white;
                      const iconTint = isHighlightYellow ? '#222222' : appColors.white;

                      return (
                        <div
                          key={inp.id}
                          style={{
                            height: 76,
                            backgroundColor: bg,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 18px',
                            gap: 16,
                            boxShadow: isHighlightYellow ? '0 0 16px rgba(255, 230, 0, 0.4)' : undefined,
                            border: isBlue ? '1.5px solid #33A8FF' : '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <AppIcon name="ic_hdmi_icon" size={28} tint={iconTint} />
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: textColor,
                              fontFamily: font.mono,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {inp.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Middle Arrow */}
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px'}}>
                    <svg width={42} height={42} viewBox="0 0 42 42" fill="none">
                      <path
                        d="M0 14 H22 V4 L42 21 L22 38 V28 H0 Z"
                        fill={appColors.white}
                      />
                    </svg>
                  </div>

                  {/* Right Display Container */}
                  <div style={{width: 364, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {/* Display Box */}
                    <div
                      style={{
                        width: 364,
                        height: 205,
                        borderRadius: 4,
                        background: selectedInput === 2
                          ? 'radial-gradient(circle at 50% 50%, #157AB5 0%, #084D76 100%)'
                          : 'radial-gradient(circle at 50% 50%, #686868 0%, #3a3a3a 100%)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      {selectedInput === 2 ? (
                        <>
                          <AppIcon name="ic_hdmi_icon" size={38} tint={appColors.white} />
                          <span
                            style={{
                              color: appColors.white,
                              fontSize: 16,
                              fontWeight: 700,
                              fontFamily: font.mono,
                              letterSpacing: '0.04em',
                            }}
                          >
                            IN 2
                          </span>
                        </>
                      ) : null}
                    </div>

                    {/* OUT 1 Bar */}
                    <div
                      style={{
                        width: 364,
                        height: 38,
                        backgroundColor: '#1E1E1E',
                        marginTop: 8,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: appColors.white,
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                      }}
                    >
                      OUT 1
                    </div>
                  </div>
                </div>
              ) : testTab === 'terminal' ? (
                /* Terminal Tab */
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 4px'}}>
                  <div style={{fontSize: 13, color: appColors.gray75, marginBottom: 6, fontWeight: 600}}>
                    Terminal
                  </div>
                  {/* Terminal Log Box */}
                  <div
                    style={{
                      height: 260,
                      backgroundColor: '#121212',
                      border: '1px solid #2B2B2B',
                      borderRadius: 4,
                      padding: '10px 14px',
                      fontFamily: font.mono,
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: appColors.green,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {terminalLines.slice(-12).map((line, idx) => (
                      <div key={idx} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {line.text}
                      </div>
                    ))}
                  </div>

                  {/* Command Input Field */}
                  <div
                    style={{
                      height: 38,
                      backgroundColor: appColors.gray20,
                      borderRadius: 4,
                      marginTop: 8,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      fontSize: 13,
                      color: appColors.gray50,
                    }}
                  >
                    Command
                  </div>

                  {/* Commands Row */}
                  <div style={{fontSize: 13, fontWeight: 600, color: appColors.white, margin: '14px 0 8px'}}>
                    Commands
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                    {commands.slice(0, 3).map((cmd) => (
                      <div
                        key={cmd.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 16px',
                          backgroundColor: appColors.gray15,
                          borderRadius: 4,
                        }}
                      >
                        <div>
                          <div style={{fontSize: 13, fontWeight: 700, color: appColors.white}}>{cmd.name}</div>
                          <div style={{fontSize: 11, color: appColors.gray50, fontFamily: font.mono}}>{cmd.code}</div>
                        </div>
                        <div
                          style={{
                            height: 32,
                            padding: '0 20px',
                            backgroundColor: appColors.gray25,
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: appColors.white,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          SEND
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Web Page Tab */
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#1E1E1E',
                    borderRadius: 6,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    margin: '4px 0',
                  }}
                >
                  {/* Top Browser Bar */}
                  <div
                    style={{
                      height: 44,
                      backgroundColor: appColors.gray15,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 14px',
                      gap: 12,
                    }}
                  >
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                      <path d="M19 12H5M12 19L5 12L12 5" stroke={appColors.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 10}}>
                      <span style={{fontSize: 13, fontWeight: 700, color: appColors.white}}>{deviceName}</span>
                      <span style={{fontSize: 11.5, color: appColors.gray50, fontFamily: font.mono}}>192.168.0.134</span>
                    </div>
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                      <path d="M4 4V10H10M20 20V14H14M4 14A8 8 0 0118.9 7.1M20 10A8 8 0 015.1 16.9" stroke={appColors.white} strokeWidth={2} strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Loading progress bar */}
                  <div style={{height: 2, backgroundColor: appColors.blue, width: '45%'}} />
                  {/* Blank white page matching f_0019.jpg */}
                  <div style={{flex: 1, backgroundColor: appColors.white}} />
                </div>
              )}
            </div>

            {/* Bottom Sub-Tab Selector Row (Buttons | Switcher | Terminal | Web page) */}
            {isTest ? (
              <div
                style={{
                  height: 40,
                  margin: '4px 12px 12px',
                  display: 'flex',
                  gap: 6,
                }}
              >
                {(
                  subTabs ?? [
                    {id: 'buttons' as const, label: 'Buttons'},
                    {id: 'switcher' as const, label: 'Switcher'},
                    {id: 'terminal' as const, label: 'Terminal'},
                    {id: 'web' as const, label: 'Web page'},
                  ]
                ).map((tab) => {
                  const active = testTab === tab.id;
                  return (
                    <div
                      key={tab.id}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: active ? appColors.blue : appColors.gray20,
                        borderRadius: 4,
                        color: appColors.white,
                        fontSize: 12.5,
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      {tab.label}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Right Sidebar (width: 312px) */}
          <div
            style={{
              width: 312,
              height: 800,
              backgroundColor: '#151515',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >
            {/* Sidebar Header: Remote prefix + Device Name + Connection Button */}
            <div
              style={{
                height: 48,
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden'}}>
                <span style={{fontSize: 10.5, color: appColors.gray50, fontFamily: font.mono}}>
                  Remote:
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    color: appColors.white,
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {deviceName}
                </span>
              </div>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: isRedStatus ? appColors.priRed : connected ? appColors.green : appColors.priRed,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke={appColors.white}
                    strokeWidth={2.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Sidebar Device List */}
            <div
              style={{
                flex: 1,
                padding: '8px 10px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {deviceName.includes('MATROX') || multiOutput ? (
                deviceList.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: 42,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      backgroundColor: item.isParent ? '#2A2A2A' : '#1C1C1C',
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <AppIcon name="ic_display_icon" size={20} tint={appColors.white} />
                    <span
                      style={{
                        flex: 1,
                        marginLeft: 8,
                        fontSize: item.isParent ? 12 : 11.5,
                        fontWeight: item.isParent ? 700 : 500,
                        color: appColors.white,
                      }}
                    >
                      {item.name}
                    </span>
                    {item.checked ? (
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{marginRight: 6}}>
                        <path d="M5 13L9 17L19 7" stroke={appColors.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                      <path d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke={appColors.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    backgroundColor: '#242424',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <AppIcon name="ic_display_icon" size={22} tint={appColors.white} />
                  <span
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: appColors.white,
                    }}
                  >
                    {deviceName}
                  </span>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{marginRight: 8}}>
                    <path d="M5 13L9 17L19 7" stroke={appColors.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
                    <path d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke={appColors.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>
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
      {/* Background glow matching setup background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 68% 32%, rgba(0, 143, 212, 0.22) 0%, rgba(0, 0, 0, 0) 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header: Remote Device Status */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px 4px',
          height: 28,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
          <span style={{fontSize: 10, color: appColors.gray50, fontFamily: font.mono}}>
            Remote:
          </span>
          <span style={{fontSize: 11, color: appColors.white, fontWeight: 500}}>
            {deviceName}
          </span>
        </div>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: isRedStatus ? appColors.priRed : connected ? appColors.green : appColors.priRed,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13L9 17L19 7"
              stroke={appColors.white}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Page Toggle Pill: Device Driver Connections | Test Device Drivers */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          height: 44,
          margin: '4px 10px 8px',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: !isTest ? appColors.blue : appColors.gray20,
            color: appColors.white,
            fontSize: 11.5,
            fontWeight: 500,
            textAlign: 'center',
            padding: '0 8px',
            borderRight: '1px solid rgba(0,0,0,0.3)',
          }}
        >
          Device Driver Connections
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isTest ? appColors.blue : appColors.gray20,
            color: appColors.white,
            fontSize: 11.5,
            fontWeight: 500,
            textAlign: 'center',
            padding: '0 8px',
          }}
        >
          Test Device Drivers
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 10px',
        }}
      >
        {!isTest ? (
          /* Connections Tab: + New Connection & Find Devices buttons */
          <div style={{display: 'flex', gap: 8, marginTop: 4}}>
            <div
              style={{
                flex: 1,
                height: 46,
                backgroundColor: appColors.gray20,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appColors.white,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              + New Connection
            </div>
            <div
              style={{
                flex: 1,
                height: 46,
                backgroundColor: appColors.gray20,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: appColors.white,
                fontSize: 12.5,
                fontWeight: 600,
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <circle
                  cx={11}
                  cy={11}
                  r={8}
                  stroke={appColors.white}
                  strokeWidth={2.5}
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke={appColors.white}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              </svg>
              <span>{foundDevicesCount} devices found</span>
            </div>
          </div>
        ) : testTab === 'buttons' ? (
          /* Buttons Tab (Reference f_0041.jpg) */
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              paddingBottom: 154,
              minHeight: 0,
            }}
          >
            {/* Top Power Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
                padding: '0 16px',
              }}
            >
              {[
                {label: 'TOGGLE', color: appColors.priRed, active: true},
                {label: 'ON', color: appColors.gray50, active: false},
                {label: 'OFF', color: appColors.priRed, active: true},
              ].map((btn) => (
                <div
                  key={btn.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: `2.5px solid ${btn.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3V11M6.34 7.34A8 8 0 1017.66 7.34"
                        stroke={btn.color}
                        strokeWidth={2.6}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: appColors.white,
                      fontFamily: font.mono,
                    }}
                  >
                    {btn.label}
                  </span>
                </div>
              ))}
            </div>

            {/* D-Pad Control */}
            <div
              style={{
                position: 'relative',
                width: 176,
                height: 176,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* UP Arrow */}
              <div style={{position: 'absolute', top: 10}}>
                <svg width={32} height={32} viewBox="0 0 24 24" fill={appColors.gray50}>
                  <path d="M12 4L4 14H9V20H15V14H20L12 4Z" />
                </svg>
              </div>
              {/* DOWN Arrow */}
              <div style={{position: 'absolute', bottom: 10}}>
                <svg width={32} height={32} viewBox="0 0 24 24" fill={appColors.gray50}>
                  <path d="M12 20L20 10H15V4H9V10H4L12 20Z" />
                </svg>
              </div>
              {/* LEFT Arrow */}
              <div style={{position: 'absolute', left: 10}}>
                <svg width={32} height={32} viewBox="0 0 24 24" fill={appColors.gray50}>
                  <path d="M4 12L14 4V9H20V15H14V20L4 12Z" />
                </svg>
              </div>
              {/* RIGHT Arrow */}
              <div style={{position: 'absolute', right: 10}}>
                <svg width={32} height={32} viewBox="0 0 24 24" fill={appColors.gray50}>
                  <path d="M20 12L10 20V15H4V9H10V4L20 12Z" />
                </svg>
              </div>
              {/* OK Center */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: appColors.gray50,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: appColors.white,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                OK
              </div>
            </div>

            {/* Menu / Exit Row */}
            <div style={{display: 'flex', gap: 12, width: '100%', justifyContent: 'center'}}>
              {['MENU', 'EXIT'].map((label) => (
                <div
                  key={label}
                  style={{
                    width: 110,
                    height: 28,
                    backgroundColor: '#1E1E1E',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 10.5,
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Volume Control Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '90%',
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 5L6 9H2V15H6L11 19V5Z"
                  stroke={appColors.white}
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
                <path
                  d="M15.54 8.46A5 5 0 0115.54 15.54M19.07 4.93A10 10 0 0119.07 19.07"
                  stroke={appColors.white}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              <span style={{color: appColors.white, fontSize: 9}}>◀</span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  backgroundColor: appColors.gray25,
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '54%',
                    backgroundColor: appColors.priYellow,
                  }}
                />
              </div>
              <span style={{color: appColors.white, fontSize: 9}}>▶</span>
            </div>

            {/* Inputs Row */}
            <div style={{display: 'flex', gap: 12, width: '100%', justifyContent: 'center'}}>
              {['INPUT 1', 'INPUT 2'].map((inp, idx) => (
                <div
                  key={inp}
                  style={{
                    width: 110,
                    height: 32,
                    backgroundColor: idx === 0 ? appColors.gray20 : '#2B2B2B',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 10.5,
                    fontWeight: 600,
                  }}
                >
                  {inp}
                </div>
              ))}
            </div>
          </div>
        ) : testTab === 'switcher' ? (
          multiOutput ? (
            /* Multi-Output Switcher Tab (Reference f_0044.jpg, av_sw_remote_nxo.xml) */
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: 58,
              }}
            >
              {/* Output displays: 2-column grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 8,
                  marginTop: 2,
                }}
              >
                {outputs.map((out, idx) => {
                  const outIndex = idx + 1;
                  const isSelected = selectedOutput === outIndex;
                  return (
                    <div
                      key={out.name}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* 16:9 Display Box */}
                      <div
                        style={{
                          width: '100%',
                          height: 78,
                          borderRadius: 4,
                          background: isSelected
                            ? 'radial-gradient(circle at 50% 50%, #FFF875 0%, #FFE600 65%, #E5CE00 100%)'
                            : 'radial-gradient(circle at 50% 50%, #686868 0%, #444444 100%)',
                          border: isSelected
                            ? `1px solid ${appColors.priYellow}`
                            : '1px solid rgba(255,255,255,0.12)',
                          boxShadow: isSelected ? '0 0 14px rgba(255, 230, 0, 0.45)' : undefined,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            color: isSelected ? 'rgba(130, 110, 0, 0.75)' : '#888888',
                          }}
                        >
                          {out.routed ? out.routed : 'NOT ROUTED'}
                        </span>
                      </div>
                      {/* Display Label Bar */}
                      <div
                        style={{
                          backgroundColor: appColors.gray20,
                          borderRadius: 2,
                          padding: '3px 4px',
                          marginTop: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            color: appColors.white,
                            lineHeight: 1.2,
                          }}
                        >
                          {out.name}
                        </span>
                        {out.ip ? (
                          <span
                            style={{
                              fontSize: 9,
                              color: appColors.gray75,
                              fontFamily: font.mono,
                              lineHeight: 1.2,
                            }}
                          >
                            {out.ip}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center: ALL label + route icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '8px 0 6px',
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: appColors.white,
                    marginRight: 10,
                  }}
                >
                  All
                </span>
                <AppIcon
                  name="ic_route5"
                  size={24}
                  tint={appColors.white}
                  style={{transform: 'rotate(270deg)'}}
                />
              </div>

              {/* Horizontal Scroll of Input Cards */}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  overflowX: 'hidden',
                  padding: '2px 0',
                }}
              >
                {inputs.map((inp) => {
                  const isSelected = selectedInput === inp.id;
                  return (
                    <div
                      key={inp.id}
                      style={{
                        width: 100,
                        height: 94,
                        flexShrink: 0,
                        backgroundColor: isSelected ? appColors.blue : appColors.gray20,
                        border: isSelected
                          ? '1.5px solid #33A8FF'
                          : '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '4px 6px',
                      }}
                    >
                      <AppIcon name="ic_hdmi_icon" size={34} tint={appColors.white} />
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: appColors.white,
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                        }}
                      >
                        {inp.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Switcher Tab (Reference f_0022.jpg, av_sw_remote_nx1.xml) */
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: 58,
              }}
            >
              {/* Display Preview */}
              <div
                style={{
                  width: '100%',
                  maxWidth: 320,
                  height: 172,
                  background:
                    'radial-gradient(circle at 50% 50%, #707070 0%, #303030 100%)',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 4,
                }}
              />
              {/* OUT 1 Bar */}
              <div
                style={{
                  width: '100%',
                  maxWidth: 320,
                  height: 30,
                  backgroundColor: appColors.gray20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: appColors.white,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  marginTop: 6,
                  borderRadius: 2,
                }}
              >
                OUT 1
              </div>

              {/* Arrow pointing up */}
              <div style={{margin: '10px 0'}}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill={appColors.white}>
                  <path d="M12 4L4 14H9V20H15V14H20L12 4Z" />
                </svg>
              </div>

              {/* Input Cards Row */}
              <div style={{display: 'flex', gap: 10, width: '100%', paddingLeft: 4}}>
                {[1, 2, 3].map((inp) => (
                  <div
                    key={inp}
                    style={{
                      width: 96,
                      height: 96,
                      backgroundColor: inp === selectedInput ? '#3A3A3A' : appColors.gray15,
                      border:
                        inp === selectedInput
                          ? `1.5px solid ${appColors.blue}`
                          : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 6,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      flexShrink: 0,
                    }}
                  >
                    {/* HDMI Icon */}
                    <svg width={36} height={36} viewBox="0 0 24 24" fill={appColors.white}>
                      <path d="M8 3H16V6H19V14L16 19H8L5 14V6H8V3ZM10 8V11H11V8H10ZM13 8V11H14V8H13Z" />
                    </svg>
                    <span style={{fontSize: 11, fontWeight: 600, color: appColors.white}}>
                      INPUT {inp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : testTab === 'terminal' ? (
          /* Terminal Tab (Reference f_0023.jpg) */
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 58,
            }}
          >
            <div style={{fontSize: 12, color: appColors.gray75, marginBottom: 4}}>
              Terminal
            </div>
            {/* Terminal Log Box */}
            <div
              style={{
                height: 160,
                backgroundColor: '#121212',
                border: '1px solid #2B2B2B',
                borderRadius: 4,
                padding: '6px 8px',
                fontFamily: font.mono,
                fontSize: 9.5,
                lineHeight: 1.35,
                color: appColors.green,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {terminalLines.slice(-10).map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Command Input Field */}
            <div
              style={{
                height: 34,
                backgroundColor: appColors.gray20,
                borderRadius: 4,
                marginTop: 6,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                fontSize: 12,
                color: appColors.gray50,
              }}
            >
              Command
            </div>

            {/* Commands List */}
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: appColors.white,
                margin: '10px 0 6px',
              }}
            >
              Commands
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              {commands.map((cmd) => (
                <div
                  key={cmd.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: appColors.gray15,
                    borderRadius: 4,
                  }}
                >
                  <div>
                    <div style={{fontSize: 12, fontWeight: 700, color: appColors.white}}>
                      {cmd.name}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: appColors.gray50,
                        fontFamily: font.mono,
                      }}
                    >
                      {cmd.code}
                    </div>
                  </div>
                  <div
                    style={{
                      height: 32,
                      padding: '0 16px',
                      backgroundColor: appColors.gray25,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.white,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    SEND
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Web Page Tab (Empty Web Chrome) */
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#1E1E1E',
              borderRadius: 6,
              overflow: 'hidden',
              paddingBottom: 58,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Top Browser Bar */}
            <div
              style={{
                height: 42,
                backgroundColor: appColors.gray15,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                gap: 8,
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke={appColors.white}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  flex: 1,
                  height: 28,
                  backgroundColor: appColors.gray20,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  fontSize: 11,
                  color: appColors.white75,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {webTitle} · {webUrl}
              </div>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4V10H10M20 20V14H14M4 14A8 8 0 0118.9 7.1M20 10A8 8 0 015.1 16.9"
                  stroke={appColors.white}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* Loading progress bar */}
            <div style={{height: 2, backgroundColor: appColors.blue, width: '45%'}} />
            {/* Blank page */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#121212',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appColors.gray50,
                fontSize: 12,
              }}
            >
              Loading {webUrl}...
            </div>
          </div>
        )}
      </div>

      {/* Device Selector Dropdown Overlay (Reference f_0042.jpg) */}
      {deviceSelectorOpen ? (
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 10,
            right: 10,
            bottom: showNavMenu ? 154 : 60,
            backgroundColor: '#202020',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {deviceList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  height: 46,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: item.isParent ? '#2A2A2A' : 'transparent',
                }}
              >
                <AppIcon name="ic_display_icon" size={22} tint={appColors.white} />
                <span
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    fontSize: item.isParent ? 12.5 : 12,
                    fontWeight: item.isParent ? 700 : 500,
                    color: appColors.white,
                  }}
                >
                  {item.name} {item.isParent ? '▾' : ''}
                </span>
                {item.checked ? (
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{marginRight: 10}}
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke={appColors.white}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
                {/* Pencil Edit Icon */}
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
                    stroke={appColors.white}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>
          {/* Scrollbar rail */}
          <div
            style={{
              position: 'absolute',
              top: 4,
              right: 2,
              bottom: 4,
              width: 3,
              backgroundColor: 'rgba(255,255,255,0.18)',
              borderRadius: 2,
            }}
          />
        </div>
      ) : null}

      {/* Sub-Tab Selector Row (Buttons | Switcher | Terminal | Web page) */}
      {isTest ? (
        <div
          style={{
            position: 'absolute',
            bottom: showNavMenu ? 108 : 14,
            left: 10,
            right: 10,
            zIndex: 10,
            height: 38,
            display: 'flex',
            gap: 5,
          }}
        >
          {(
            subTabs ??
            (multiOutput
              ? [{id: 'switcher' as const, label: 'Switcher'}]
              : deviceName === 'ConvertIP TX 1'
                ? [{id: 'terminal' as const, label: 'Terminal'}]
                : [
                    {id: 'buttons' as const, label: 'Buttons'},
                    {id: 'switcher' as const, label: 'Switcher'},
                    {id: 'terminal' as const, label: 'Terminal'},
                    {id: 'web' as const, label: 'Web page'},
                  ])
          ).map((tab) => {
            const active = testTab === tab.id;
            return (
              <div
                key={tab.id}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active ? appColors.blue : appColors.gray20,
                  borderRadius: 4,
                  color: appColors.white,
                  fontSize: 11.5,
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                {tab.label}
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Bottom Setup Navigation Bar */}
      {showNavMenu ? (
        <PhoneNavMenu expanded={false} active="connect" showRoomMenus={true} />
      ) : null}
    </div>
  );
};
