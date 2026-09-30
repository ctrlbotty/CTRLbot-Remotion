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

export type ConnectTestProps = {
  device?: 'phone';
  topTab?: ConnectTestTopTab;
  testTab?: ConnectTestSubTab;
  deviceName?: string;
  connected?: boolean;
  selectedOutput?: number;
  selectedInput?: number;
  terminalLines?: TerminalEntry[];
  commands?: Array<{name: string; code: string}>;
  webUrl?: string;
  webTitle?: string;
  foundDevicesCount?: number;
  showNavMenu?: boolean;
  multiOutput?: boolean;
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
  selectedOutput = 1,
  selectedInput = 1,
  terminalLines = DEFAULT_CONNECT_TERMINAL,
  commands = DEFAULT_CONNECT_COMMANDS,
  webUrl = 'http://192.168.0.134',
  webTitle = 'EPSON Web Control',
  foundDevicesCount = 16,
  showNavMenu = true,
  multiOutput = false,
  activeOutputs = [1, 2, 3, 4],
  activeInputs = [1, 2, 3, 4],
  matrixSelection = {output: 1, input: 1},
}) => {
  const isTest = topTab === 'test';

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
            backgroundColor: connected ? appColors.green : appColors.priRed,
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
          {[
            {id: 'buttons', label: 'Buttons'},
            {id: 'switcher', label: 'Switcher'},
            {id: 'terminal', label: 'Terminal'},
            {id: 'web', label: 'Web page'},
          ].map((tab) => {
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
