import React from 'react';
import {appColors} from '../design/tokens.generated';
import {VIEWPORT} from './viewports';
import {PhoneNavMenu, type NavItem} from './PhoneNavMenu';
import {font} from '../design/theme';

export type SettingsSupportProps = {
  device?: 'phone';
  resetButtonState?: 'idle' | 'pressed' | 'restored';
  showDocumentationHighlight?: boolean;
  toast?: string;
  snackbar?: string;
  showRoomMenus?: boolean;
  activeNav?: NavItem;
  scrollY?: number;
};

// Material Warning Icon
const WarningIcon = ({color = appColors.white, size = 20}: {color?: string; size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

// Material Refresh / Sync Icon
const RefreshIcon = ({color = appColors.white, size = 18}: {color?: string; size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
);

// Material Help / Question Mark Icon
const HelpIcon = ({color = appColors.white, size = 22}: {color?: string; size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
  </svg>
);

// Material Play Arrow Icon
const PlayIcon = ({color = appColors.white, size = 22}: {color?: string; size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const SettingsSupport: React.FC<SettingsSupportProps> = ({
  device = 'phone',
  resetButtonState = 'idle',
  showDocumentationHighlight = false,
  toast,
  snackbar,
  showRoomMenus = true,
  activeNav = 'set',
  scrollY = 0,
}) => {
  const isRestored = resetButtonState === 'restored';
  const effectiveShowRoomMenus = isRestored ? false : showRoomMenus;

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
      {/* Scrollable Settings View */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          overflow: 'hidden',
          padding: '16px 16px 120px',
          display: 'flex',
          flexDirection: 'column',
          transform: scrollY ? `translateY(-${scrollY}px)` : undefined,
        }}
      >
        {/* Settings Title Header */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: appColors.white,
            marginBottom: 16,
          }}
        >
          Settings
        </div>

        {/* Support Section Title */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: appColors.white,
            marginBottom: 6,
          }}
        >
          Support
        </div>

        {/* Support Section Subtitle / Highlight Banner */}
        <div
          style={{
            position: 'relative',
            fontSize: 12.5,
            color: showDocumentationHighlight ? '#FFA726' : appColors.gray75,
            marginBottom: 14,
            padding: showDocumentationHighlight ? '4px 8px' : '0',
            backgroundColor: showDocumentationHighlight ? '#9A5B00' : 'transparent',
            borderRadius: showDocumentationHighlight ? 3 : 0,
            fontWeight: showDocumentationHighlight ? 600 : 400,
          }}
        >
          Documentation and setup guides, available offline
        </div>

        {/* Card 1: User Manual */}
        <div
          style={{
            backgroundColor: '#262626',
            borderRadius: 5,
            padding: '12px 14px',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{marginRight: 14, display: 'flex', alignItems: 'center'}}>
            <HelpIcon size={24} color={appColors.white} />
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 14, fontWeight: 600, color: appColors.white, marginBottom: 2}}>
              User Manual
            </span>
            <span style={{fontSize: 11.5, color: appColors.gray75}}>
              Full setup and operation reference
            </span>
          </div>
          <span style={{fontSize: 18, color: appColors.gray50, marginLeft: 8}}>&rsaquo;</span>
        </div>

        {/* Card 2: Quick Start */}
        <div
          style={{
            backgroundColor: '#262626',
            borderRadius: 5,
            padding: '12px 14px',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{marginRight: 14, display: 'flex', alignItems: 'center'}}>
            <PlayIcon size={24} color={appColors.white} />
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 14, fontWeight: 600, color: appColors.white, marginBottom: 2}}>
              Quick Start
            </span>
            <span style={{fontSize: 11.5, color: appColors.gray75}}>
              Get a first room running in a few steps
            </span>
          </div>
          <span style={{fontSize: 18, color: appColors.gray50, marginLeft: 8}}>&rsaquo;</span>
        </div>

        {/* Card 3: Factory Reset */}
        <div
          style={{
            backgroundColor: '#262626',
            borderRadius: 5,
            padding: '12px 14px',
            marginBottom: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{fontSize: 13.5, fontWeight: 700, color: appColors.white, marginBottom: 4}}>
            Factory Reset
          </div>
          <div style={{fontSize: 11.5, color: appColors.gray75, marginBottom: 12, lineHeight: 1.3}}>
            Clear all settings and database. This action cannot be undone.
          </div>
          <div
            style={{
              height: 42,
              borderRadius: 4,
              backgroundColor:
                resetButtonState === 'pressed' ? appColors.blue : '#1E1E1E',
              backgroundImage:
                resetButtonState === 'pressed'
                  ? 'radial-gradient(circle at center, #35ABEE 0%, #008FD4 80%)'
                  : undefined,
              boxShadow:
                resetButtonState === 'pressed'
                  ? '0 0 16px rgba(0, 143, 212, 0.5)'
                  : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: appColors.white,
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            <WarningIcon size={18} color={appColors.white} />
            <span>Factory Reset</span>
          </div>
        </div>

        {/* Card 4: Database Management */}
        <div
          style={{
            backgroundColor: '#262626',
            borderRadius: 5,
            padding: '12px 14px',
            marginBottom: 16,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{fontSize: 13.5, fontWeight: 700, color: appColors.white, marginBottom: 4}}>
            Database Management
          </div>
          <div style={{fontSize: 11.5, color: appColors.gray75, marginBottom: 12}}>
            Update or reset the driver database
          </div>
          <div
            style={{
              height: 42,
              borderRadius: 4,
              backgroundColor: '#1E1E1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: appColors.white,
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            <RefreshIcon size={16} color={appColors.white} />
            <span>Update Database</span>
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: appColors.white,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          Privacy &amp; Security
        </div>
        <div style={{fontSize: 11.5, color: appColors.gray75}}>
          Manage your privacy settings and security preferences
        </div>
      </div>

      {/* Floating Toast (f_0057.jpg: "Presets saved to end UI") */}
      {toast ? (
        <div
          style={{
            position: 'absolute',
            bottom: 116,
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
              backgroundColor: 'rgba(70, 70, 70, 0.92)',
              borderRadius: 22,
              padding: '8px 20px',
              color: appColors.white,
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

      {/* Bottom Snackbar / Progress (f_0059.jpg: "Restoring first-run state...") */}
      {snackbar ? (
        <div
          style={{
            position: 'absolute',
            bottom: 108,
            left: 0,
            right: 0,
            zIndex: 30,
            backgroundColor: '#1A1A1A',
            padding: '12px 16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            color: appColors.white75,
            fontSize: 12.5,
            fontWeight: 500,
          }}
        >
          {snackbar}
        </div>
      ) : null}

      {/* Bottom Setup Navigation Bar */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20}}>
        <PhoneNavMenu
          expanded={false}
          active={activeNav}
          showRoomMenus={effectiveShowRoomMenus}
        />
      </div>
    </div>
  );
};
