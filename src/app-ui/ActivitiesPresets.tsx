// The Activities Presets surface, rebuilt as live React.
//
// Derived from:
//   res/layout/menu_activity.xml              Presets | Switch | Audio tabs
//   res/layout/preset_list.xml                 + New Preset button, presets list
//   res/layout/preset_card.xml                 preset row card with power icon, edit, copy, trash, play
//   res/layout/preset_edit.xml                 Edit Preset screen with red close, icon, name, + EVENTS, + COMMANDS
//   res/layout-port/preset_command_card.xml    command step card with device, command selectors, SEND
//   Reference frames: f_0025.jpg - f_0027.jpg, f_0033.jpg

import React from 'react';
import {AppIcon} from './AppIcon';
import {PhoneNavMenu} from './PhoneNavMenu';
import {TabletNavRail} from './TabletNavRail';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';

export type ActivitiesTab = 'presets' | 'switch' | 'audio';

export type PresetItem = {
  id: string;
  name: string;
  icon?: 'power_on' | 'power_off' | 'power';
  iconColor?: string;
};

export type PresetCommandStep = {
  step: number;
  label?: string;
  type?: string;
  deviceName?: string;
  commandName?: string;
};

export const DEFAULT_PRESETS: PresetItem[] = [
  {id: 'p1', name: 'Power On', icon: 'power_on', iconColor: appColors.green},
  {id: 'p2', name: 'Power Off', icon: 'power_off', iconColor: appColors.priRed},
];

export const DEFAULT_COMMAND_STEPS: PresetCommandStep[] = [
  {
    step: 1,
    label: 'EPSON PowerLite - New',
    type: 'DEVICE',
    deviceName: 'EPSON PowerLite - New',
    commandName: 'POWER ON',
  },
];

export type ActivitiesPresetsProps = {
  device?: 'phone' | 'tablet';
  activeTab?: ActivitiesTab;
  mode?: 'list' | 'edit';
  presets?: PresetItem[];
  editPresetName?: string;
  editPresetIconColor?: string;
  commandSteps?: PresetCommandStep[];
  toast?: string;
  showNavMenu?: boolean;
};

export const ActivitiesPresets: React.FC<ActivitiesPresetsProps> = ({
  device = 'phone',
  activeTab = 'presets',
  mode = 'list',
  presets = DEFAULT_PRESETS,
  editPresetName = 'Power On',
  editPresetIconColor = appColors.green,
  commandSteps = [],
  toast,
  showNavMenu = true,
}) => {
  const isEdit = mode === 'edit';

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
        <TabletNavRail active="activities" showRoomMenus={true} />

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

          {isEdit ? (
            /* Tablet Edit Preset View (Reference f_0021.jpg) */
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Title Bar */}
              <div
                style={{
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
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 700,
                    color: appColors.white,
                    marginRight: 44,
                  }}
                >
                  Edit Preset
                </div>
              </div>

              {/* Edit Body */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '8px 16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Preset Name Field */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 0 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.18)',
                    marginBottom: 16,
                  }}
                >
                  <AppIcon
                    name="ic_power"
                    size={28}
                    tint={editPresetIconColor}
                  />
                  <span
                    style={{
                      marginLeft: 16,
                      fontSize: 15,
                      fontWeight: 600,
                      color: appColors.white,
                    }}
                  >
                    {editPresetName}
                  </span>
                </div>

                {/* + EVENTS Button */}
                <div
                  style={{
                    height: 46,
                    backgroundColor: appColors.gray20,
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.gray50,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: 12,
                  }}
                >
                  + EVENTS
                </div>

                {/* + COMMANDS Button */}
                <div
                  style={{
                    height: 46,
                    backgroundColor: appColors.gray20,
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: 12,
                  }}
                >
                  + COMMANDS
                </div>

                {/* Command Steps if provided */}
                {commandSteps.map((step) => (
                  <div
                    key={step.step}
                    style={{
                      backgroundColor: appColors.gray10,
                      borderRadius: 6,
                      padding: 14,
                      marginBottom: 12,
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Step Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          fontSize: 12,
                          color: appColors.gray50,
                          fontFamily: font.mono,
                        }}
                      >
                        {step.step}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontWeight: 600,
                          color: appColors.white,
                        }}
                      >
                        {step.label ?? step.deviceName}
                      </span>
                      <div style={{display: 'flex', gap: 10}}>
                        <svg width={18} height={18} viewBox="0 0 24 24" fill={appColors.gray50}>
                          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                        </svg>
                        <svg width={18} height={18} viewBox="0 0 24 24" fill={appColors.gray50}>
                          <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Selectors */}
                    <div style={{display: 'flex', gap: 12, marginBottom: 8}}>
                      <div
                        style={{
                          flex: 1,
                          height: 44,
                          backgroundColor: appColors.gray20,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          fontSize: 13,
                          color: appColors.white,
                          fontWeight: 600,
                        }}
                      >
                        <span>{step.type ?? 'DEVICE'}</span>
                        <span style={{fontSize: 10, color: appColors.gray50}}>▾</span>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: 44,
                          backgroundColor: appColors.gray20,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          fontSize: 13,
                          color: appColors.white,
                          fontWeight: 600,
                        }}
                      >
                        <span>{step.deviceName ?? 'EPSON PowerLite - New'}</span>
                        <span style={{fontSize: 10, color: appColors.gray50}}>▾</span>
                      </div>
                    </div>

                    {/* Command & Send Row */}
                    <div style={{display: 'flex', gap: 12}}>
                      <div
                        style={{
                          flex: 1,
                          height: 44,
                          backgroundColor: appColors.gray20,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          fontSize: 13,
                          color: appColors.white,
                          fontWeight: 600,
                        }}
                      >
                        <span>{step.commandName ?? 'POWER ON'}</span>
                        <span style={{fontSize: 10, color: appColors.gray50}}>▾</span>
                      </div>
                      <div
                        style={{
                          width: 80,
                          height: 44,
                          backgroundColor: appColors.gray25,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          color: appColors.white,
                        }}
                      >
                        SEND
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Tablet Presets List View (Reference f_0020.jpg, f_0022.jpg, f_0030.jpg) */
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Tab Pill: Presets | Switch | Audio */}
              <div
                style={{
                  display: 'flex',
                  height: 46,
                  margin: '10px 16px',
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
                        fontSize: 13.5,
                        fontWeight: 600,
                        borderRight: idx < 2 ? '1px solid rgba(0,0,0,0.3)' : undefined,
                      }}
                    >
                      {tab.label}
                    </div>
                  );
                })}
              </div>

              {/* + NEW PRESET Button */}
              <div style={{padding: '0 16px', marginBottom: 12}}>
                <div
                  style={{
                    height: 44,
                    backgroundColor: appColors.gray20,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  + NEW PRESET
                </div>
              </div>

              {/* Presets List */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '0 16px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {presets.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      height: 52,
                      backgroundColor: appColors.gray10,
                      borderRadius: 5,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 16px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Preset Icon */}
                    <AppIcon
                      name="ic_power"
                      size={26}
                      tint={p.iconColor ?? appColors.green}
                    />

                    {/* Preset Name */}
                    <span
                      style={{
                        flex: 1,
                        marginLeft: 16,
                        fontSize: 14,
                        fontWeight: 600,
                        color: appColors.white,
                      }}
                    >
                      {p.name}
                    </span>

                    {/* Action Icons */}
                    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                      {/* Pencil Edit */}
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                        <path
                          d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
                          stroke={appColors.white75}
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {/* Copy */}
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                        <rect
                          x="9"
                          y="9"
                          width="12"
                          height="12"
                          rx="2"
                          stroke={appColors.white50}
                          strokeWidth={2}
                        />
                        <path
                          d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5"
                          stroke={appColors.white50}
                          strokeWidth={2}
                        />
                      </svg>
                      {/* Trash */}
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 6H21M19 6V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V6M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6"
                          stroke={appColors.white50}
                          strokeWidth={2}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Play Triangle (Green) */}
                      <svg width={18} height={18} viewBox="0 0 24 24" fill={appColors.green}>
                        <path d="M8 5V19L19 12L8 5Z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floating Toast (Reference f_0022.jpg, f_0030.jpg) */}
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

      {isEdit ? (
        /* Edit Preset View (Reference f_0026.jpg, preset_edit.xml) */
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              height: 52,
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
                marginRight: 44, // Balance the close button
              }}
            >
              Edit Preset
            </div>
          </div>

          {/* Edit Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 16px 60px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header: Icon + Preset Name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <AppIcon name="ic_power" size={32} tint={editPresetIconColor} />
              <div
                style={{
                  flex: 1,
                  marginLeft: 14,
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  paddingBottom: 4,
                  color: appColors.white,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {editPresetName}
              </div>
            </div>

            {/* + EVENTS Button (Disabled / Dimmed) */}
            <div
              style={{
                height: 46,
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appColors.gray50,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginBottom: 12,
              }}
            >
              + EVENTS
            </div>

            {/* + COMMANDS Button */}
            <div
              style={{
                height: 46,
                backgroundColor: appColors.gray20,
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appColors.white,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: 12,
              }}
            >
              + COMMANDS
            </div>

            {/* Command Steps if provided */}
            {commandSteps.map((step) => (
              <div
                key={step.step}
                style={{
                  backgroundColor: appColors.gray10,
                  borderRadius: 6,
                  padding: 12,
                  marginBottom: 12,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Step Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      fontSize: 12,
                      color: appColors.gray50,
                      fontFamily: font.mono,
                    }}
                  >
                    {step.step}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 13,
                      fontWeight: 600,
                      color: appColors.white,
                    }}
                  >
                    {step.label ?? step.deviceName}
                  </span>
                  <div style={{display: 'flex', gap: 6}}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill={appColors.gray50}>
                      <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                    </svg>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill={appColors.gray50}>
                      <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
                    </svg>
                  </div>
                </div>

                {/* Device Type Selector */}
                <div
                  style={{
                    height: 42,
                    backgroundColor: appColors.gray20,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    marginBottom: 8,
                    fontSize: 12,
                    color: appColors.white,
                    fontWeight: 600,
                  }}
                >
                  <span>{step.type ?? 'DEVICE'}</span>
                  <span style={{fontSize: 10, color: appColors.gray50}}>▾</span>
                </div>

                {/* Device Name Selector */}
                <div
                  style={{
                    height: 42,
                    backgroundColor: appColors.gray20,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    marginBottom: 8,
                    fontSize: 12,
                    color: appColors.white,
                    fontWeight: 600,
                  }}
                >
                  <span>{step.deviceName ?? 'EPSON PowerLite - New'}</span>
                  <span style={{fontSize: 10, color: appColors.gray50}}>▾</span>
                </div>

                {/* Command & Send Row */}
                <div style={{display: 'flex', gap: 6}}>
                  <div
                    style={{
                      flex: 1,
                      height: 42,
                      backgroundColor: appColors.gray20,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                      fontSize: 12,
                      color: appColors.white,
                      fontWeight: 600,
                    }}
                  >
                    <span>{step.commandName ?? 'POWER ON'}</span>
                    <span style={{fontSize: 10, color: appColors.gray50}}>▾</span>
                  </div>
                  <div
                    style={{
                      width: 72,
                      height: 42,
                      backgroundColor: appColors.gray25,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: appColors.white,
                    }}
                  >
                    SEND
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Presets List View (Reference f_0025.jpg, f_0027.jpg, f_0033.jpg) */
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Tab Pill: Presets | Switch | Audio */}
          <div
            style={{
              display: 'flex',
              height: 44,
              margin: '8px 10px',
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

          {/* + NEW PRESET Button */}
          <div style={{padding: '0 10px', marginBottom: 12}}>
            <div
              style={{
                height: 46,
                backgroundColor: appColors.gray20,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appColors.white,
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              + NEW PRESET
            </div>
          </div>

          {/* Presets List */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 10px 60px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {presets.map((p) => (
              <div
                key={p.id}
                style={{
                  height: 52,
                  backgroundColor: appColors.gray10,
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              >
                {/* Preset Icon */}
                <AppIcon
                  name="ic_power"
                  size={26}
                  tint={p.iconColor ?? appColors.green}
                />

                {/* Preset Name */}
                <span
                  style={{
                    flex: 1,
                    marginLeft: 14,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: appColors.white,
                  }}
                >
                  {p.name}
                </span>

                {/* Action Icons */}
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  {/* Pencil Edit */}
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
                      stroke={appColors.white75}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Copy */}
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <rect
                      x="9"
                      y="9"
                      width="12"
                      height="12"
                      rx="2"
                      stroke={appColors.white50}
                      strokeWidth={2}
                    />
                    <path
                      d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5"
                      stroke={appColors.white50}
                      strokeWidth={2}
                    />
                  </svg>
                  {/* Trash */}
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6H21M19 6V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V6M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6"
                      stroke={appColors.white50}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Play Triangle (Green) */}
                  <svg width={16} height={16} viewBox="0 0 24 24" fill={appColors.green}>
                    <path d="M8 5V19L19 12L8 5Z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toast (Reference f_0027.jpg, f_0033.jpg) */}
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
