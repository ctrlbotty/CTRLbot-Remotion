import React from 'react';
import {appColors} from '../design/tokens.generated';
import {VIEWPORT} from './viewports';
import {PhoneNavMenu, navRegions, NAV_COLLAPSED_H, type NavItem} from './PhoneNavMenu';
import {TABLET_NAV_WIDTH, tabletNavRegions, TabletNavRail} from './TabletNavRail';
import {font} from '../design/theme';

export type SettingsSupportProps = {
  device?: 'phone' | 'tablet';
  resetButtonState?: 'idle' | 'pressed' | 'restored';
  showResetDialog?: boolean;
  showDocumentationHighlight?: boolean;
  toast?: string;
  snackbar?: string;
  showRoomMenus?: boolean;
  activeNav?: NavItem;
  scrollY?: number;
};

export type SettingsSupportRegionOptions = {
  resetButtonState?: 'idle' | 'pressed' | 'restored';
  showResetDialog?: boolean;
  showDocumentationHighlight?: boolean;
  toast?: string;
  snackbar?: string;
  showRoomMenus?: boolean;
  activeNav?: NavItem;
  scrollY?: number;
};

/**
 * Derived layout metrics for SettingsSupport, shared by the component and region maps.
 * Follows connectionRegions(device): accounts for device, scrollY, dialog, and nav state.
 */
export const layoutFor = (
  device: 'phone' | 'tablet' = 'phone',
  options?: SettingsSupportRegionOptions
) => {
  const isTablet = device === 'tablet';
  const viewport = VIEWPORT[device];
  const scrollY = options?.scrollY ?? 0;
  const isRestored = options?.resetButtonState === 'restored';
  const showRoomMenus = options?.showRoomMenus ?? true;
  const effectiveShowRoomMenus = isRestored ? false : showRoomMenus;
  const showResetDialog = options?.showResetDialog ?? false;
  const showDocumentationHighlight = options?.showDocumentationHighlight ?? false;

  // Rail & content container
  const railW = isTablet ? TABLET_NAV_WIDTH : 0;
  const contentX = isTablet ? TABLET_NAV_WIDTH : 0;
  const contentW = isTablet ? viewport.width - TABLET_NAV_WIDTH : viewport.width;

  // Padding inside content container
  const padX = isTablet ? 32 : 16;
  const padTop = isTablet ? 24 : 16;
  const innerX = contentX + padX;
  const innerW = contentW - padX * 2;

  // Flow metrics follow the rendered DOM: Montserrat's normal line box is 1.219em, so a
  // text row is fontSize * LH, not a rounded guess. Block margins are the component's own.
  const LH = 1.219;
  const hl = showDocumentationHighlight ? 8 : 0; // the highlight's 4px vertical padding

  // Header "Settings"
  const settingsY = padTop - scrollY;
  const settingsH = 16 * LH;
  const settingsMarginBottom = isTablet ? 12 : 16;

  // Support section title "Support"
  const supportY = settingsY + settingsH + settingsMarginBottom;
  const supportH = (isTablet ? 24 : 22) * LH;
  const supportMarginBottom = isTablet ? 4 : 6;

  // Documentation highlight / subtitle (tablet: shrink-wrapped to its text, phone: full width)
  const subtitleY = supportY + supportH + supportMarginBottom;
  const subtitleH = (isTablet ? 14 : 12.5) * LH + hl;
  const subtitleW = isTablet ? 336 + (hl ? 16 : 0) : innerW;
  const subtitleMarginBottom = isTablet ? 16 : 14;

  // Card 1: User Manual (padding + 16/14px title + 2px + 13/11.5px caption)
  const cardPadY = isTablet ? 14 : 12;
  const manualY = subtitleY + subtitleH + subtitleMarginBottom;
  const manualW = innerW;
  const manualH =
    cardPadY * 2 + (isTablet ? 16 : 14) * LH + 2 + (isTablet ? 13 : 11.5) * LH;
  const manualMarginBottom = isTablet ? 10 : 8;

  // Card 2: Quick Start
  const quickStartY = manualY + manualH + manualMarginBottom;
  const quickStartW = innerW;
  const quickStartH = manualH;
  const quickStartMarginBottom = isTablet ? 16 : 14;

  // Factory Reset and Database Management
  // Tablet: two columns side-by-side, equal height; Phone: stacked cards
  let resetCardX: number;
  let resetCardY: number;
  let resetCardW: number;
  let resetCardH: number;
  let resetBtnX: number;
  let resetBtnY: number;
  let resetBtnW: number;
  let resetBtnH: number;

  let dbCardX: number;
  let dbCardY: number;
  let dbCardW: number;
  let dbCardH: number;
  let dbBtnX: number;
  let dbBtnY: number;
  let dbBtnW: number;
  let dbBtnH: number;

  if (isTablet) {
    const colGap = 16;
    const colW = (innerW - colGap) / 2; // 500
    const colY = quickStartY + quickStartH + quickStartMarginBottom;
    // Factory Reset is the taller column (18px title, 6, one 13.5px/1.3 line, 16, 44px button, 16px padding)
    const colH = 16 + 18 * LH + 6 + 13.5 * 1.3 + 16 + 44 + 16;

    resetCardX = innerX;
    resetCardY = colY;
    resetCardW = colW;
    resetCardH = colH;
    resetBtnX = resetCardX + 18;
    resetBtnW = resetCardW - 36;
    resetBtnH = 44;
    resetBtnY = resetCardY + resetCardH - 16 - resetBtnH;

    dbCardX = innerX + colW + colGap;
    dbCardY = colY;
    dbCardW = colW;
    dbCardH = colH; // stretched to the row; its button sits on the same baseline
    dbBtnX = dbCardX + 18;
    dbBtnW = dbCardW - 36;
    dbBtnH = 44;
    dbBtnY = dbCardY + dbCardH - 16 - dbBtnH;
  } else {
    // 12 padding, 13.5px title, 4, two 11.5px/1.3 lines, 12, 42px button, 12 padding
    resetCardX = innerX;
    resetCardY = quickStartY + quickStartH + quickStartMarginBottom;
    resetCardW = innerW;
    resetCardH = 12 + 13.5 * LH + 4 + 11.5 * 1.3 * 2 + 12 + 42 + 12;
    resetBtnX = resetCardX + 14;
    resetBtnW = resetCardW - 28;
    resetBtnH = 42;
    resetBtnY = resetCardY + resetCardH - 12 - resetBtnH;

    dbCardX = innerX;
    dbCardY = resetCardY + resetCardH + 12;
    dbCardW = innerW;
    dbCardH = 12 + 13.5 * LH + 4 + 11.5 * LH + 12 + 42 + 12;
    dbBtnX = dbCardX + 14;
    dbBtnW = dbCardW - 28;
    dbBtnH = 42;
    dbBtnY = dbCardY + dbCardH - 12 - dbBtnH;
  }

  // Setup navigation button target
  // On tablet: the 'set' row in TabletNavRail
  // On phone: the 'set' icon in the collapsed bottom bar
  const navH = isTablet ? viewport.height : NAV_COLLAPSED_H;
  const navY = isTablet ? 0 : viewport.height - NAV_COLLAPSED_H;
  let setupNavRegion: {x: number; y: number; width: number; height: number};

  if (isTablet) {
    setupNavRegion = tabletNavRegions.row('set', effectiveShowRoomMenus);
  } else {
    // Phone collapsed icon bar: handle is top 48dp, icon bar is 60dp, padding 18dp left/right
    const itemCount = effectiveShowRoomMenus ? 6 : 4;
    const setItemIndex = effectiveShowRoomMenus ? 4 : 3;
    const slotW = (viewport.width - 36) / itemCount;
    const slotX = 18 + setItemIndex * slotW;
    const iconBarY = navY + 48;
    setupNavRegion = {
      x: Math.round(slotX),
      y: iconBarY,
      width: Math.round(slotW),
      height: 60,
    };
  }

  // Factory Reset Confirmation Dialog (tablet only; flex-centred over the whole 1280x800 frame).
  // Padding 24/16, header row (24px icon vs 20px title), 16, content (14px/1.5: 1+2+1+1 lines,
  // three 12px gaps), 24, 14px button row with 8px padding, 16.
  const dialogW = isTablet ? 520 : Math.min(340, viewport.width - 32);
  const dialogBtnW = 76;
  const dialogBtnH = 14 * LH + 16;
  const dialogH = 24 + Math.max(24, 20 * LH) + 16 + 5 * 14 * 1.5 + 3 * 12 + 24 + dialogBtnH + 16;
  const dialogX = (viewport.width - dialogW) / 2;
  const dialogY = (viewport.height - dialogH) / 2;
  const dialogBtnY = dialogY + dialogH - 16 - dialogBtnH;
  const dialogConfirmX = dialogX + dialogW - 24 - dialogBtnW;
  const dialogCancelX = dialogConfirmX - 20 - dialogBtnW;

  // Toast & Snackbar sit in the content column (tablet: right of the rail)
  const toastW = 200;
  const toastH = (isTablet ? 13 : 12) * LH + 16 + 2;
  const toastX = contentX + (contentW - toastW) / 2;
  const toastY = viewport.height - (isTablet ? 32 + toastH : 116 + toastH);
  const snackbarH = isTablet ? 13 * LH + 28 + 1 : 12.5 * LH + 24 + 1;
  const snackbarY = viewport.height - (isTablet ? snackbarH : 108 + snackbarH);

  return {
    viewport,
    isTablet,
    scrollY,
    effectiveShowRoomMenus,
    showResetDialog,
    showDocumentationHighlight,
    railW,
    contentX,
    contentW,
    padX,
    padTop,
    innerX,
    innerW,
    settingsY,
    settingsH,
    supportY,
    supportH,
    subtitleY,
    subtitleW,
    subtitleH,
    manualY,
    manualW,
    manualH,
    quickStartY,
    quickStartW,
    quickStartH,
    resetCardX,
    resetCardY,
    resetCardW,
    resetCardH,
    resetBtnX,
    resetBtnY,
    resetBtnW,
    resetBtnH,
    dbCardX,
    dbCardY,
    dbCardW,
    dbCardH,
    dbBtnX,
    dbBtnY,
    dbBtnW,
    dbBtnH,
    navY,
    navH,
    setupNavRegion,
    dialogX,
    dialogY,
    dialogW,
    dialogH,
    dialogCancelX,
    dialogConfirmX,
    dialogBtnY,
    dialogBtnW,
    dialogBtnH,
    toastX,
    toastY,
    toastW,
    toastH,
    snackbarY,
    snackbarH,
  };
};

/**
 * Named regions for <Camera> and annotations in SettingsSupport's coordinate space.
 * Follows connectionRegions(device): derived from layoutFor(device).
 */
export const settingsSupportRegions = (
  device: 'phone' | 'tablet' = 'phone',
  options?: SettingsSupportRegionOptions
) => {
  const l = layoutFor(device, options);
  const isTablet = l.isTablet;

  return {
    full: {x: 0, y: 0, width: l.viewport.width, height: l.viewport.height},
    content: {x: l.contentX, y: 0, width: l.contentW, height: l.viewport.height},
    centreX: l.contentX + l.contentW / 2,

    /** Settings header text */
    settings: {x: l.innerX, y: l.settingsY, width: l.innerW, height: l.settingsH},
    settingsTitle: {x: l.innerX, y: l.settingsY, width: l.innerW, height: l.settingsH},
    settingsHeader: {x: l.innerX, y: l.settingsY, width: l.innerW, height: l.settingsH},

    /** Support section title */
    support: {x: l.innerX, y: l.supportY, width: l.innerW, height: l.supportH},
    supportTitle: {x: l.innerX, y: l.supportY, width: l.innerW, height: l.supportH},

    /** Documentation highlight / subtitle banner */
    documentationHighlight: {
      x: l.innerX,
      y: l.subtitleY,
      width: l.subtitleW,
      height: l.subtitleH,
    },
    subtitle: {
      x: l.innerX,
      y: l.subtitleY,
      width: l.subtitleW,
      height: l.subtitleH,
    },

    /** User Manual card */
    userManual: {x: l.innerX, y: l.manualY, width: l.manualW, height: l.manualH},
    userManualCard: {x: l.innerX, y: l.manualY, width: l.manualW, height: l.manualH},

    /** Quick Start card */
    quickStart: {x: l.innerX, y: l.quickStartY, width: l.quickStartW, height: l.quickStartH},
    quickStartCard: {x: l.innerX, y: l.quickStartY, width: l.quickStartW, height: l.quickStartH},

    /** Factory Reset card & action button */
    factoryReset: {x: l.resetCardX, y: l.resetCardY, width: l.resetCardW, height: l.resetCardH},
    factoryResetCard: {x: l.resetCardX, y: l.resetCardY, width: l.resetCardW, height: l.resetCardH},
    factoryResetButton: {x: l.resetBtnX, y: l.resetBtnY, width: l.resetBtnW, height: l.resetBtnH},
    resetButton: {x: l.resetBtnX, y: l.resetBtnY, width: l.resetBtnW, height: l.resetBtnH},

    /** Database Management card & action button */
    databaseManagement: {x: l.dbCardX, y: l.dbCardY, width: l.dbCardW, height: l.dbCardH},
    databaseManagementCard: {x: l.dbCardX, y: l.dbCardY, width: l.dbCardW, height: l.dbCardH},
    updateDatabaseButton: {x: l.dbBtnX, y: l.dbBtnY, width: l.dbBtnW, height: l.dbBtnH},

    /** Setup navigation target (the setup button on the nav bar or rail) */
    setupButton: l.setupNavRegion,
    setupNav: l.setupNavRegion,
    setup: l.setupNavRegion,

    /** Setup nav bar / rail */
    navMenu: isTablet
      ? tabletNavRegions.full
      : {x: 0, y: l.navY, width: l.viewport.width, height: l.navH},
    navRail: tabletNavRegions.full,

    /** Reset Confirmation Dialog */
    resetDialog: {x: l.dialogX, y: l.dialogY, width: l.dialogW, height: l.dialogH},
    resetDialogCancel: {x: l.dialogCancelX, y: l.dialogBtnY, width: l.dialogBtnW, height: l.dialogBtnH},
    resetDialogConfirm: {x: l.dialogConfirmX, y: l.dialogBtnY, width: l.dialogBtnW, height: l.dialogBtnH},

    /** Toast & Snackbar */
    toast: {x: l.toastX, y: l.toastY, width: l.toastW, height: l.toastH},
    snackbar: {x: l.contentX, y: l.snackbarY, width: l.contentW, height: l.snackbarH},
  };
};

export const settingsRegions = settingsSupportRegions;
export const supportRegions = settingsSupportRegions;

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
  showResetDialog = false,
  showDocumentationHighlight = false,
  toast,
  snackbar,
  showRoomMenus = true,
  activeNav = 'set',
  scrollY = 0,
}) => {
  const isRestored = resetButtonState === 'restored';
  const effectiveShowRoomMenus = isRestored ? false : showRoomMenus;

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
        <TabletNavRail active={activeNav} showRoomMenus={effectiveShowRoomMenus} />

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

          {/* Scrollable / padded Settings Content */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              overflow: 'hidden',
              padding: '24px 32px 32px 32px',
              display: 'flex',
              flexDirection: 'column',
              transform: scrollY ? `translateY(-${scrollY}px)` : undefined,
            }}
          >
            {/* Header: Eyebrow "Settings" */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: appColors.white,
                marginBottom: 12,
              }}
            >
              Settings
            </div>

            {/* Support Section Title */}
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: appColors.white,
                marginBottom: 4,
              }}
            >
              Support
            </div>

            {/* Support Section Subtitle / Highlight Banner */}
            <div
              style={{
                position: 'relative',
                fontSize: 14,
                color: showDocumentationHighlight ? '#FFA726' : appColors.gray75,
                marginBottom: 16,
                padding: showDocumentationHighlight ? '4px 8px' : '0',
                backgroundColor: showDocumentationHighlight ? '#9A5B00' : 'transparent',
                borderRadius: showDocumentationHighlight ? 3 : 0,
                fontWeight: showDocumentationHighlight ? 600 : 400,
                alignSelf: 'flex-start',
              }}
            >
              Documentation and setup guides, available offline
            </div>

            {/* Card 1: User Manual */}
            <div
              style={{
                backgroundColor: '#262626',
                borderRadius: 5,
                padding: '14px 18px',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{marginRight: 16, display: 'flex', alignItems: 'center'}}>
                <HelpIcon size={24} color={appColors.white} />
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: 16, fontWeight: 600, color: appColors.white, marginBottom: 2}}>
                  User Manual
                </span>
                <span style={{fontSize: 13, color: appColors.gray75}}>
                  Full setup and operation reference
                </span>
              </div>
              <span style={{fontSize: 20, color: appColors.gray50, marginLeft: 8}}>&rsaquo;</span>
            </div>

            {/* Card 2: Quick Start */}
            <div
              style={{
                backgroundColor: '#262626',
                borderRadius: 5,
                padding: '14px 18px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{marginRight: 16, display: 'flex', alignItems: 'center'}}>
                <PlayIcon size={24} color={appColors.white} />
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: 16, fontWeight: 600, color: appColors.white, marginBottom: 2}}>
                  Quick Start
                </span>
                <span style={{fontSize: 13, color: appColors.gray75}}>
                  Get a first room running in a few steps
                </span>
              </div>
              <span style={{fontSize: 20, color: appColors.gray50, marginLeft: 8}}>&rsaquo;</span>
            </div>

            {/* Two Column Layout: Factory Reset & Database Management */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                marginBottom: 20,
              }}
            >
              {/* Left Column: Factory Reset */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#262626',
                  borderRadius: 5,
                  padding: '16px 18px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{fontSize: 18, fontWeight: 700, color: appColors.white, marginBottom: 6}}>
                    Factory Reset
                  </div>
                  <div style={{fontSize: 13.5, color: appColors.gray75, marginBottom: 16, lineHeight: 1.3}}>
                    Clear all settings and database. This action cannot be undone.
                  </div>
                </div>
                <div
                  style={{
                    height: 44,
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
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <WarningIcon size={18} color={appColors.white} />
                  <span>Factory Reset</span>
                </div>
              </div>

              {/* Right Column: Database Management */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#262626',
                  borderRadius: 5,
                  padding: '16px 18px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{fontSize: 18, fontWeight: 700, color: appColors.white, marginBottom: 6}}>
                    Database Management
                  </div>
                  <div style={{fontSize: 13.5, color: appColors.gray75, marginBottom: 16}}>
                    Update or reset the driver database
                  </div>
                </div>
                <div
                  style={{
                    height: 44,
                    borderRadius: 4,
                    backgroundColor: '#1E1E1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    color: appColors.white,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <RefreshIcon size={16} color={appColors.white} />
                  <span>Update Database</span>
                </div>
              </div>
            </div>

            {/* Privacy & Security Section */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: appColors.white,
                marginBottom: 4,
              }}
            >
              Privacy &amp; Security
            </div>
            <div style={{fontSize: 13.5, color: appColors.gray75, marginBottom: 12}}>
              Manage your privacy settings and security preferences
            </div>

            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: appColors.white,
                marginBottom: 8,
              }}
            >
              Privacy
            </div>

            {/* Privacy Policy Card */}
            <div
              style={{
                backgroundColor: '#262626',
                borderRadius: 5,
                padding: '14px 18px',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{flex: 1, fontSize: 15, color: appColors.white}}>
                Privacy Policy
              </div>
              <span style={{fontSize: 20, color: appColors.gray50, marginLeft: 8}}>&rsaquo;</span>
            </div>

            {/* Data Handling Card */}
            <div
              style={{
                backgroundColor: '#262626',
                borderRadius: 5,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{flex: 1, fontSize: 15, color: appColors.white}}>
                Data Handling
              </div>
              <span style={{fontSize: 20, color: appColors.gray50, marginLeft: 8}}>&rsaquo;</span>
            </div>
          </div>

          {/* Floating Toast */}
          {toast ? (
            <div
              style={{
                position: 'absolute',
                bottom: 32,
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

          {/* Bottom Snackbar */}
          {snackbar ? (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 30,
                backgroundColor: '#1A1A1A',
                padding: '14px 20px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                color: appColors.white75,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {snackbar}
            </div>
          ) : null}
        </div>

        {/* Modal Dialog for Factory Reset (f_0055.jpg) */}
        {showResetDialog && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: 520,
                backgroundColor: '#FAFAFA',
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                padding: '24px 24px 16px 24px',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: font.ui,
              }}
            >
              {/* Dialog Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <WarningIcon size={24} color="#757575" />
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#212121',
                  }}
                >
                  Factory Reset
                </span>
              </div>

              {/* Dialog Content */}
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: '#424242',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div>This returns CTRLbot to a first-run state.</div>
                <div>
                  Deleted: your connections, presets, switching setups, saved credentials,
                  host keys, and app settings.
                </div>
                <div>Kept: the bundled driver catalog, reinstalled fresh.</div>
                <div>This action cannot be undone. Proceed?</div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 20,
                  marginTop: 24,
                }}
              >
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#E65100',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    cursor: 'pointer',
                    padding: '8px 12px',
                  }}
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#E65100',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    cursor: 'pointer',
                    padding: '8px 12px',
                  }}
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
        )}
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
