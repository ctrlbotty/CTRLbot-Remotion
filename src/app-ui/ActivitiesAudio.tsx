// The Activities Audio surface, rebuilt as live React.
//
// Derived from:
//   res/layout/audio.xml                        Presets | Switch | Audio tabs, audio device, range override
//   res/layout/item_audio_control_mapping.xml   volume up, down, set mapping cards
//   Reference frames: f_0028.jpg, f_0029.jpg

import React from 'react';
import {PhoneNavMenu} from './PhoneNavMenu';
import {TabletNavRail} from './TabletNavRail';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';
import type {ActivitiesTab} from './ActivitiesPresets';

export type AudioControlMapping = {
  id: 'up' | 'down' | 'set' | string;
  title: string;
  status: 'Mapped' | 'Unmapped';
  command: string;
};

export const DEFAULT_AUDIO_MAPPINGS: AudioControlMapping[] = [
  {
    id: 'up',
    title: 'Volume Up',
    status: 'Mapped',
    command: 'VOLUME UP (KEY 56)',
  },
  {
    id: 'down',
    title: 'Volume Down',
    status: 'Mapped',
    command: 'VOLUME DOWN (KEY 57)',
  },
  {
    id: 'set',
    title: 'Volume Set',
    status: 'Unmapped',
    command: 'Unmapped / None',
  },
];

export type ActivitiesAudioProps = {
  device?: 'phone' | 'tablet';
  activeTab?: ActivitiesTab;
  deviceName?: string;
  connectionStatus?: string;
  startOverride?: string;
  endOverride?: string;
  stepOverride?: string;
  mappings?: AudioControlMapping[];
  showNavMenu?: boolean;
};

export const ActivitiesAudio: React.FC<ActivitiesAudioProps> = ({
  device = 'phone',
  activeTab = 'audio',
  deviceName = 'EPSON PowerLite - New',
  connectionStatus = 'Connected',
  startOverride = '0',
  endOverride = '100',
  stepOverride = '',
  mappings = DEFAULT_AUDIO_MAPPINGS,
  showNavMenu = true,
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

          {/* Top Tab Pill: Presets | Switch | Audio */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              height: 46,
              margin: '10px 16px 6px',
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

          {/* Scrollable Content Area */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              flex: 1,
              overflowY: 'auto',
              padding: '4px 16px 30px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Eyebrow: AUDIO DEVICE */}
            <div
              style={{
                fontSize: 11,
                color: appColors.gray50,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '4px 2px 4px',
              }}
            >
              AUDIO DEVICE
            </div>

            {/* Audio Device Split Button */}
            <div style={{display: 'flex', height: 40, marginBottom: 8}}>
              <div
                style={{
                  flex: 1,
                  backgroundColor: appColors.gray20,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 14,
                  color: appColors.white,
                  fontSize: 13,
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

            {/* Connection Status */}
            <div
              style={{
                fontSize: 12,
                color: '#6AA0B0',
                fontWeight: 500,
                margin: '0 2px 10px',
              }}
            >
              {connectionStatus}
            </div>

            {/* Volume Range Override Card */}
            <div
              style={{
                backgroundColor: '#2A2A2A',
                borderRadius: 6,
                padding: '12px 16px 16px',
                marginBottom: 12,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: appColors.white,
                  marginBottom: 10,
                }}
              >
                Volume Range Override
              </div>

              <div style={{display: 'flex', gap: 12}}>
                {/* Start Override */}
                <div style={{flex: 1}}>
                  <div
                    style={{
                      fontSize: 9,
                      color: appColors.gray50,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: 4,
                    }}
                  >
                    START OVERRIDE
                  </div>
                  <div
                    style={{
                      height: 36,
                      backgroundColor: appColors.white,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      color: appColors.black,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {startOverride}
                  </div>
                </div>

                {/* End Override */}
                <div style={{flex: 1}}>
                  <div
                    style={{
                      fontSize: 9,
                      color: appColors.gray50,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: 4,
                    }}
                  >
                    END OVERRIDE
                  </div>
                  <div
                    style={{
                      height: 36,
                      backgroundColor: appColors.white,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      color: appColors.black,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {endOverride}
                  </div>
                </div>

                {/* Step */}
                <div style={{flex: 1}}>
                  <div
                    style={{
                      fontSize: 9,
                      color: appColors.gray50,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: 4,
                    }}
                  >
                    STEP
                  </div>
                  <div
                    style={{
                      height: 36,
                      backgroundColor: appColors.white,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      color: appColors.black,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {stepOverride}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Mappings Header */}
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 700,
                color: appColors.white,
                margin: '8px 2px 8px',
              }}
            >
              Control Mappings
            </div>

            {/* Mapping Cards */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              {mappings.map((m) => {
                const isMapped = m.status === 'Mapped';
                return (
                  <div
                    key={m.id}
                    style={{
                      backgroundColor: '#2A2A2A',
                      borderRadius: 6,
                      padding: '12px 16px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <span style={{fontSize: 13.5, fontWeight: 700, color: appColors.white}}>
                        {m.title}
                      </span>
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: isMapped ? appColors.green : appColors.priRed,
                        }}
                      >
                        {m.status}
                      </span>
                    </div>

                    {/* Command & Test Row */}
                    <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                      <div
                        style={{
                          flex: 1,
                          height: 40,
                          backgroundColor: '#1E1E1E',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 12px',
                          color: appColors.white,
                          fontSize: 12.5,
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {m.command}
                      </div>
                      <div
                        style={{
                          width: 72,
                          height: 40,
                          backgroundColor: appColors.blue,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: appColors.white,
                          fontSize: 12.5,
                          fontWeight: 600,
                        }}
                      >
                        Test
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div
                      style={{
                        fontSize: 10.5,
                        color: appColors.gray50,
                        marginTop: 6,
                      }}
                    >
                      {isMapped ? 'Command mapped' : 'Unmapped'}
                    </div>
                  </div>
                );
              })}
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
        {/* Eyebrow: AUDIO DEVICE */}
        <div
          style={{
            fontSize: 10,
            color: appColors.gray50,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '4px 2px 2px',
          }}
        >
          AUDIO DEVICE
        </div>

        {/* Audio Device Split Button */}
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

        {/* Connection Status */}
        <div
          style={{
            fontSize: 11.5,
            color: '#6AA0B0',
            fontWeight: 500,
            margin: '0 2px 8px',
          }}
        >
          {connectionStatus}
        </div>

        {/* Volume Range Override Card */}
        <div
          style={{
            backgroundColor: '#2A2A2A',
            borderRadius: 6,
            padding: '10px 12px 12px',
            marginBottom: 10,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: appColors.white,
              marginBottom: 8,
            }}
          >
            Volume Range Override
          </div>

          <div style={{display: 'flex', gap: 8}}>
            {/* Start Override */}
            <div style={{flex: 1}}>
              <div
                style={{
                  fontSize: 8.5,
                  color: appColors.gray50,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: 3,
                }}
              >
                START OVERRIDE
              </div>
              <div
                style={{
                  height: 34,
                  backgroundColor: appColors.white,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  color: appColors.black,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {startOverride}
              </div>
            </div>

            {/* End Override */}
            <div style={{flex: 1}}>
              <div
                style={{
                  fontSize: 8.5,
                  color: appColors.gray50,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: 3,
                }}
              >
                END OVERRIDE
              </div>
              <div
                style={{
                  height: 34,
                  backgroundColor: appColors.white,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  color: appColors.black,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {endOverride}
              </div>
            </div>

            {/* Step */}
            <div style={{flex: 1}}>
              <div
                style={{
                  fontSize: 8.5,
                  color: appColors.gray50,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: 3,
                }}
              >
                STEP
              </div>
              <div
                style={{
                  height: 34,
                  backgroundColor: appColors.white,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  color: appColors.black,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {stepOverride}
              </div>
            </div>
          </div>
        </div>

        {/* Control Mappings Header */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: appColors.white,
            margin: '6px 2px 6px',
          }}
        >
          Control Mappings
        </div>

        {/* Mapping Cards */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {mappings.map((m) => {
            const isMapped = m.status === 'Mapped';
            return (
              <div
                key={m.id}
                style={{
                  backgroundColor: '#2A2A2A',
                  borderRadius: 6,
                  padding: '10px 12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <span style={{fontSize: 13, fontWeight: 700, color: appColors.white}}>
                    {m.title}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: isMapped ? appColors.green : appColors.priRed,
                    }}
                  >
                    {m.status}
                  </span>
                </div>

                {/* Command & Test Row */}
                <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                  <div
                    style={{
                      flex: 1,
                      height: 38,
                      backgroundColor: '#1E1E1E',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      color: appColors.white,
                      fontSize: 11.5,
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {m.command}
                  </div>
                  <div
                    style={{
                      width: 66,
                      height: 38,
                      backgroundColor: appColors.blue,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appColors.white,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Test
                  </div>
                </div>

                {/* Subtitle */}
                {isMapped ? (
                  <div
                    style={{
                      fontSize: 10,
                      color: appColors.gray50,
                      marginTop: 4,
                    }}
                  >
                    Command mapped
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Setup Navigation Bar */}
      {showNavMenu ? (
        <PhoneNavMenu expanded={false} active="activities" showRoomMenus={true} />
      ) : null}
    </div>
  );
};
