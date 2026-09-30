// The Activities Switch surface, rebuilt as live React.
//
// Derived from:
//   res/layout/switching_type.xml             Switch Type dropdown selector
//   res/layout/switching_many_to_one.xml      Many to One switching device, inputs table
//   res/layout-port/switching_end_point.xml   AVoIP encoders and decoders lists
//   res/layout/item_switching_ep_encoder.xml  AVoIP encoder row
//   res/layout/item_switching_ep_decoder.xml  AVoIP decoder row
//   Reference frames: f_0046.jpg - f_0049.jpg

import React from 'react';
import {AppIcon} from './AppIcon';
import {PhoneNavMenu} from './PhoneNavMenu';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';
import type {ActivitiesTab} from './ActivitiesPresets';

export type SwitchType = 'many_to_one' | 'many_to_many' | 'avoip';

export type SwitcherDeviceInputRow = {
  num: number;
  enabled: boolean;
  label: string;
  command: string;
};

export type AVoIPEncoder = {
  num: number;
  enabled: boolean;
  name: string;
  active?: boolean;
};

export type AVoIPDecoder = {
  num: number;
  enabled: boolean;
  name: string;
  ip?: string;
  active?: boolean;
};

export const DEFAULT_MANY_TO_ONE_INPUTS: SwitcherDeviceInputRow[] = [
  {num: 1, enabled: true, label: 'INPUT', command: 'SOURCE...'},
  {num: 2, enabled: true, label: 'INPUT', command: 'SOURCE...'},
  {num: 3, enabled: true, label: 'HDMI 1', command: 'SOURCE...'},
  {num: 4, enabled: true, label: 'HDMI 2', command: 'SOURCE...'},
];

export const DEFAULT_AVOIP_ENCODERS: AVoIPEncoder[] = [
  {num: 1, enabled: true, name: 'ConvertIP TX 1', active: true},
  {num: 2, enabled: true, name: 'ConvertIP TX 2'},
  {num: 3, enabled: true, name: 'ConvertIP TX 3'},
  {num: 4, enabled: true, name: 'ConvertIP TX 4'},
];

export const DEFAULT_AVOIP_DECODERS: AVoIPDecoder[] = [
  {num: 1, enabled: true, name: 'ConvertIP RX 1 - Rx 239.100.45.1'},
  {num: 2, enabled: true, name: 'ConvertIP RX 2 - Rx 239.100.46.1'},
  {num: 3, enabled: true, name: 'ConvertIP RX 3 - Rx 239.100.47.1'},
  {num: 4, enabled: true, name: 'ConvertIP RX 4 - Rx 239.100.48.1'},
];

export type ActivitiesSwitchProps = {
  device?: 'phone';
  activeTab?: ActivitiesTab;
  switchType?: SwitchType;
  switchTypePickerOpen?: boolean;
  deviceName?: string;
  deviceIp?: string;
  outputLabel?: string;
  inputRows?: SwitcherDeviceInputRow[];
  encoders?: AVoIPEncoder[];
  decoders?: AVoIPDecoder[];
  toast?: string;
  showNavMenu?: boolean;
};

export const ActivitiesSwitch: React.FC<ActivitiesSwitchProps> = ({
  device = 'phone',
  activeTab = 'switch',
  switchType = 'many_to_one',
  switchTypePickerOpen = false,
  deviceName = 'EPSON PowerLite - New',
  deviceIp = '192.168.0.134:3629',
  outputLabel = '',
  inputRows = DEFAULT_MANY_TO_ONE_INPUTS,
  encoders = DEFAULT_AVOIP_ENCODERS,
  decoders = DEFAULT_AVOIP_DECODERS,
  toast,
  showNavMenu = true,
}) => {
  const switchTypeLabel =
    switchType === 'avoip'
      ? 'AVoIP: Encoders Decoders'
      : switchType === 'many_to_many'
        ? 'Many to Many: Matrix Switching'
        : 'Many to One: AV Switching';

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

      {/* Top Tab Pill: Presets | Switch | Audio */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          height: 44,
          margin: '8px 10px 4px',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {[
          {id: 'presets', label: 'Presets'},
          {id: 'switch', label: 'Switch'},
          {id: 'audio', label: 'Audio'},
        ].map((tab, idx) => {
          const active = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: active ? appColors.blue : appColors.gray20,
                color: appColors.white,
                fontSize: 13,
                fontWeight: 600,
                borderRight: idx < 2 ? '1px solid rgba(0,0,0,0.3)' : undefined,
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

      {/* Scrollable Content Area */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          overflowY: 'auto',
          padding: '4px 10px 60px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Eyebrow: SWITCH TYPE */}
        <div
          style={{
            fontSize: 10,
            color: appColors.gray50,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '4px 2px 2px',
          }}
        >
          SWITCH TYPE
        </div>

        {/* Mode Selector Split Button */}
        <div
          style={{
            display: 'flex',
            height: 42,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: appColors.gray20,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 12,
              color: appColors.white,
              fontSize: 12.5,
              fontWeight: 500,
              borderRight: '1px solid rgba(0,0,0,0.4)',
            }}
          >
            {switchTypeLabel}
          </div>
          <div
            style={{
              width: 44,
              backgroundColor: appColors.gray20,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: appColors.white,
              fontSize: 12,
            }}
          >
            ▾
          </div>
        </div>

        {switchType === 'avoip' ? (
          /* AVoIP View (Reference f_0048.jpg, f_0049.jpg, switching_end_point.xml) */
          <>
            {/* Eyebrow: AVOIP: ENCODERS DECODERS */}
            <div
              style={{
                fontSize: 10,
                color: appColors.gray50,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '4px 2px 4px',
              }}
            >
              AVOIP: ENCODERS DECODERS
            </div>

            {/* Encoders + | Decoders + Buttons Row */}
            <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
              {/* Encoders Split Button */}
              <div style={{flex: 1, display: 'flex', height: 38}}>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: appColors.gray20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 12,
                    fontWeight: 600,
                    borderRight: '1px solid rgba(0,0,0,0.3)',
                  }}
                >
                  Encoders +
                </div>
                <div
                  style={{
                    width: 36,
                    backgroundColor: appColors.gray20,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 11,
                  }}
                >
                  ▾
                </div>
              </div>

              {/* Decoders Split Button */}
              <div style={{flex: 1, display: 'flex', height: 38}}>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: appColors.gray20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 12,
                    fontWeight: 600,
                    borderRight: '1px solid rgba(0,0,0,0.3)',
                  }}
                >
                  Decoders +
                </div>
                <div
                  style={{
                    width: 36,
                    backgroundColor: appColors.gray20,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 11,
                  }}
                >
                  ▾
                </div>
              </div>
            </div>

            {/* Eyebrow: SOURCE */}
            <div
              style={{
                fontSize: 10,
                color: appColors.gray50,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '6px 2px 4px',
              }}
            >
              SOURCE
            </div>

            {/* Encoders List */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12}}>
              {encoders.map((enc) => (
                <div
                  key={enc.num}
                  style={{
                    height: 48,
                    backgroundColor: '#1C1C1C',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      fontSize: 11,
                      color: appColors.gray50,
                      fontFamily: font.mono,
                      textAlign: 'center',
                    }}
                  >
                    {enc.num}
                  </span>
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: enc.enabled ? appColors.blue : appColors.gray25,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {enc.enabled ? (
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13L9 17L19 7"
                          stroke={appColors.white}
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </div>
                  {/* Icon Card */}
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AppIcon name="ic_hdmi_icon" size={24} tint={appColors.white} />
                  </div>
                  {/* Label */}
                  <div
                    style={{
                      flex: 1,
                      height: 38,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      color: appColors.white,
                      fontSize: 11.5,
                      fontWeight: 600,
                    }}
                  >
                    {enc.name}
                  </div>
                  {/* SRC Button */}
                  <div
                    style={{
                      width: 54,
                      height: 38,
                      backgroundColor: enc.active ? appColors.blue : '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.white,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    SRC
                  </div>
                </div>
              ))}
            </div>

            {/* Eyebrow: DISPLAY */}
            <div
              style={{
                fontSize: 10,
                color: appColors.gray50,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '4px 2px 4px',
              }}
            >
              DISPLAY
            </div>

            {/* Decoders List */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              {decoders.map((dec) => (
                <div
                  key={dec.num}
                  style={{
                    height: 48,
                    backgroundColor: '#1C1C1C',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      fontSize: 11,
                      color: appColors.gray50,
                      fontFamily: font.mono,
                      textAlign: 'center',
                    }}
                  >
                    {dec.num}
                  </span>
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: dec.enabled ? appColors.blue : appColors.gray25,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {dec.enabled ? (
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13L9 17L19 7"
                          stroke={appColors.white}
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </div>
                  {/* Label */}
                  <div
                    style={{
                      flex: 1,
                      height: 38,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      color: appColors.white,
                      fontSize: 11.5,
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {dec.name}
                  </div>
                  {/* DIS Button */}
                  <div
                    style={{
                      width: 54,
                      height: 38,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.white,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    DIS
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Many-to-One View (Reference f_0046.jpg, switching_many_to_one.xml) */
          <>
            {/* Eyebrow: SWITCH DEVICE */}
            <div
              style={{
                fontSize: 10,
                color: appColors.gray50,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '4px 2px 2px',
              }}
            >
              SWITCH DEVICE
            </div>

            {/* Switch Device Split Button */}
            <div style={{display: 'flex', height: 42, marginBottom: 8}}>
              <div
                style={{
                  flex: 1,
                  backgroundColor: appColors.gray20,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 12,
                  color: appColors.white,
                  fontSize: 12.5,
                  fontWeight: 500,
                  borderRight: '1px solid rgba(0,0,0,0.4)',
                }}
              >
                {deviceName}
              </div>
              <div
                style={{
                  width: 44,
                  backgroundColor: appColors.gray20,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: appColors.white,
                  fontSize: 12,
                }}
              >
                ▾
              </div>
            </div>

            {/* Device Info & Output Label Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 2px 8px',
              }}
            >
              <div>
                <div style={{fontSize: 12.5, fontWeight: 700, color: appColors.white}}>
                  {deviceName}
                </div>
                <div
                  style={{
                    fontSize: 9.5,
                    color: appColors.gray50,
                    fontFamily: font.mono,
                    marginTop: 2,
                  }}
                >
                  IP {deviceIp}
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <span
                  style={{
                    fontSize: 9,
                    color: appColors.gray50,
                    letterSpacing: '0.06em',
                    marginBottom: 2,
                  }}
                >
                  OUTPUT LABEL
                </span>
                <div
                  style={{
                    width: 100,
                    height: 28,
                    backgroundColor: appColors.white,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 6px',
                    fontSize: 11,
                    color: appColors.black,
                  }}
                >
                  {outputLabel}
                </div>
              </div>
            </div>

            {/* Inputs Table Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
                marginBottom: 6,
                fontSize: 10,
                color: appColors.gray50,
              }}
            >
              <span style={{width: 24, textAlign: 'center'}}>#</span>
              <span style={{width: 44, textAlign: 'center'}}>Enable</span>
              <span style={{width: 44, textAlign: 'center'}}>Icon</span>
              <span style={{flex: 1, paddingLeft: 8}}>Label</span>
              <span style={{width: 70, textAlign: 'center'}}>Command</span>
              <span style={{width: 60}} />
            </div>

            {/* Inputs Table Rows */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              {inputRows.map((row) => (
                <div
                  key={row.num}
                  style={{
                    height: 48,
                    backgroundColor: '#1C1C1C',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 6px',
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      fontSize: 11,
                      color: appColors.gray50,
                      fontFamily: font.mono,
                      textAlign: 'center',
                    }}
                  >
                    {row.num}
                  </span>
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: row.enabled ? appColors.blue : appColors.gray25,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {row.enabled ? (
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13L9 17L19 7"
                          stroke={appColors.white}
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </div>
                  {/* Icon Card */}
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AppIcon name="ic_hdmi_icon" size={24} tint={appColors.white} />
                  </div>
                  {/* Label Card */}
                  <div
                    style={{
                      flex: 1,
                      height: 38,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 8px',
                      color: appColors.white,
                      fontSize: 11.5,
                      fontWeight: 600,
                    }}
                  >
                    {row.label}
                  </div>
                  {/* Command Card */}
                  <div
                    style={{
                      width: 68,
                      height: 38,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.white75,
                      fontSize: 10,
                      fontFamily: font.mono,
                    }}
                  >
                    {row.command}
                  </div>
                  {/* SEND Button */}
                  <div
                    style={{
                      width: 58,
                      height: 38,
                      backgroundColor: '#2E2E2E',
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
          </>
        )}
      </div>

      {/* Switch Type Dropdown Picker Overlay (Reference f_0047.jpg) */}
      {switchTypePickerOpen ? (
        <div
          style={{
            position: 'absolute',
            top: 108,
            left: 10,
            right: 10,
            backgroundColor: '#1E1E1E',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            zIndex: 30,
            boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
            overflow: 'hidden',
          }}
        >
          {[
            {id: 'many_to_one', label: 'Many to One: AV Switching'},
            {id: 'many_to_many', label: 'Many to Many: Matrix Switching'},
            {id: 'avoip', label: 'AVoIP: Encoders Decoders'},
          ].map((item, idx) => (
            <div
              key={item.id}
              style={{
                height: 44,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                color: appColors.white,
                fontSize: 12.5,
                fontWeight: item.id === switchType ? 700 : 400,
                borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                backgroundColor: item.id === switchType ? 'rgba(0,144,255,0.1)' : 'transparent',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      ) : null}

      {/* Floating Toast (Reference f_0047.jpg) */}
      {toast ? (
        <div
          style={{
            position: 'absolute',
            bottom: showNavMenu ? 120 : 20,
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
              padding: '9px 20px',
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

      {/* Bottom Setup Navigation Bar */}
      {showNavMenu ? (
        <PhoneNavMenu expanded={false} active="activities" showRoomMenus={true} />
      ) : null}
    </div>
  );
};
