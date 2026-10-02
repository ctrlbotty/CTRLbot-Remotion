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
import {NAV_COLLAPSED_H, PhoneNavMenu} from './PhoneNavMenu';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
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

export type ActivitiesPresetsRegionOptions = Partial<ActivitiesPresetsProps> & {
  presetsCount?: number;
  commandStepsCount?: number;
};

// Layout rhythm, shared between markup and activitiesPresetsRegions() so camera targets
// never drift from the controls they frame.
export const ACTIVITIES_PRESETS_LAYOUT = {
  phone: {
    railW: 0,
    padX: 10,
    tabPillH: 44,
    tabPillMarginY: 8,
    tabPillMarginX: 10,
    newPresetH: 46,
    newPresetMarginBottom: 12,
    listPadX: 10,
    listPadBottom: 60,
    presetCardH: 52,
    presetCardGap: 10,
    presetCardPadX: 12,
    presetIconSize: 26,
    presetNameMarginLeft: 14,
    presetNameFontSize: 13.5,
    actionIconsGap: 10,
    actionIconSize: 16,
    navH: NAV_COLLAPSED_H, // 108
    toastBottom: 120,
    toastBottomNoNav: 20,

    // Edit mode
    editTopBarH: 52,
    editTopBarPadX: 12,
    closeBtnSize: 44,
    editBodyPadX: 16,
    editBodyPadTop: 16,
    editBodyPadBottom: 60,
    headerIconSize: 32,
    headerNameMarginLeft: 14,
    headerMarginBottom: 20,
    eventsBtnH: 46,
    eventsBtnMarginBottom: 12,
    commandsBtnH: 46,
    commandsBtnMarginBottom: 12,
    cmdCardPad: 12,
    cmdCardMarginBottom: 12,
    cmdHeaderMarginBottom: 10,
    cmdSelectorH: 42,
    cmdSelectorMarginBottom: 8,
    cmdRowGap: 6,
    sendBtnW: 72,
    sendBtnH: 42,
  },
  tablet: {
    railW: TABLET_NAV_WIDTH, // 200
    padX: 16,
    tabPillH: 46,
    tabPillMarginY: 10,
    tabPillMarginX: 16,
    newPresetH: 44,
    newPresetMarginBottom: 12,
    listPadX: 16,
    listPadBottom: 40,
    presetCardH: 52,
    presetCardGap: 10,
    presetCardPadX: 16,
    presetIconSize: 26,
    presetNameMarginLeft: 16,
    presetNameFontSize: 14,
    actionIconsGap: 14,
    actionIconSize: 18,
    navH: 0,
    toastBottom: 28,
    toastBottomNoNav: 28,

    // Edit mode
    editTopBarH: 52,
    editTopBarPadX: 16,
    closeBtnSize: 44,
    editBodyPadX: 16,
    editBodyPadTop: 8,
    editBodyPadBottom: 20,
    headerIconSize: 28,
    headerNameMarginLeft: 16,
    headerMarginBottom: 16,
    eventsBtnH: 46,
    eventsBtnMarginBottom: 12,
    commandsBtnH: 46,
    commandsBtnMarginBottom: 12,
    cmdCardPad: 14,
    cmdCardMarginBottom: 12,
    cmdHeaderMarginBottom: 10,
    cmdSelectorH: 44,
    cmdSelectorMarginBottom: 8,
    cmdRowGap: 12,
    sendBtnW: 80,
    sendBtnH: 44,
  },
} as const;

const layoutFor = (
  device: 'phone' | 'tablet',
  options?: ActivitiesPresetsRegionOptions
) => {
  const viewport = VIEWPORT[device];
  const isTablet = device === 'tablet';
  const c = isTablet
    ? ACTIVITIES_PRESETS_LAYOUT.tablet
    : ACTIVITIES_PRESETS_LAYOUT.phone;
  const railW = isTablet ? c.railW : 0;
  const contentX = railW;
  const contentW = viewport.width - railW;

  // Tab Pill
  const tabPillX = contentX + c.tabPillMarginX;
  const tabPillY = c.tabPillMarginY;
  const tabPillW = contentW - c.tabPillMarginX * 2;
  const tabW = tabPillW / 3;

  // List mode: New Preset
  const newPresetX = contentX + (isTablet ? c.listPadX : c.padX);
  const newPresetY = tabPillY + c.tabPillH + c.tabPillMarginY;
  const newPresetW = contentW - (isTablet ? c.listPadX : c.padX) * 2;

  // List mode: Presets list
  const presetsListX = newPresetX;
  const presetsListY = newPresetY + c.newPresetH + c.newPresetMarginBottom;
  const presetsListW = newPresetW;
  const presetsCount =
    options?.presets?.length ?? options?.presetsCount ?? DEFAULT_PRESETS.length;
  const presetsListH =
    presetsCount > 0
      ? presetsCount * c.presetCardH + (presetsCount - 1) * c.presetCardGap
      : 0;

  // Edit mode: Top Bar
  const closeBtnX = contentX + c.editTopBarPadX;
  const closeBtnY = (c.editTopBarH - c.closeBtnSize) / 2;

  // Edit mode: Edit Body
  const editBodyX = contentX + c.editBodyPadX;
  const editBodyW = contentW - c.editBodyPadX * 2;
  const editBodyTopY = c.editTopBarH + c.editBodyPadTop;

  // Edit Header (Icon + Name)
  const headerY = editBodyTopY;
  const headerH = isTablet ? 8 + c.headerIconSize + 16 : c.headerIconSize;
  const headerIconY = isTablet ? headerY + 8 : headerY;

  // Events & Commands buttons
  const eventsY = headerY + headerH + c.headerMarginBottom;
  const commandsY = eventsY + c.eventsBtnH + c.eventsBtnMarginBottom;

  // Command steps
  const cmdStepsY = commandsY + c.commandsBtnH + c.commandsBtnMarginBottom;
  const cmdCardH = isTablet
    ? c.cmdCardPad +
      22 +
      c.cmdHeaderMarginBottom +
      c.cmdSelectorH +
      c.cmdSelectorMarginBottom +
      c.cmdSelectorH +
      c.cmdCardPad
    : c.cmdCardPad +
      18 +
      c.cmdHeaderMarginBottom +
      c.cmdSelectorH +
      c.cmdSelectorMarginBottom +
      c.cmdSelectorH +
      c.cmdSelectorMarginBottom +
      c.cmdSelectorH +
      c.cmdCardPad;

  const showNav = options?.showNavMenu ?? true;
  const toastY =
    viewport.height -
    (isTablet ? c.toastBottom : showNav ? c.toastBottom : c.toastBottomNoNav);

  return {
    viewport,
    isTablet,
    c,
    railW,
    contentX,
    contentW,
    tabPillX,
    tabPillY,
    tabPillW,
    tabW,
    newPresetX,
    newPresetY,
    newPresetW,
    presetsListX,
    presetsListY,
    presetsListW,
    presetsListH,
    closeBtnX,
    closeBtnY,
    editBodyX,
    editBodyW,
    headerY,
    headerH,
    headerIconY,
    eventsY,
    commandsY,
    cmdStepsY,
    cmdCardH,
    toastY,
  };
};

/**
 * Named regions for <Camera> and annotations in ActivitiesPresets' coordinate space.
 * Follows connectionRegions(device): derived from layoutFor(device).
 */
export const activitiesPresetsRegions = (
  device: 'phone' | 'tablet',
  options?: ActivitiesPresetsRegionOptions
) => {
  const l = layoutFor(device, options);
  const isTablet = l.isTablet;
  const isEdit = options?.mode === 'edit';

  const tabIndex = (tab: ActivitiesTab | number): number => {
    if (typeof tab === 'number') return tab;
    if (tab === 'switch') return 1;
    if (tab === 'audio') return 2;
    return 0;
  };

  const getPresetIndex = (idOrIndex: number | string): number => {
    if (typeof idOrIndex === 'number') return idOrIndex;
    const presets = options?.presets ?? DEFAULT_PRESETS;
    const idx = presets.findIndex(
      (p) => p.id === idOrIndex || p.name === idOrIndex
    );
    return idx >= 0 ? idx : 0;
  };

  return {
    full: {x: 0, y: 0, width: l.viewport.width, height: l.viewport.height},
    content: {x: l.contentX, y: 0, width: l.contentW, height: l.viewport.height},
    centreX: l.contentX + l.contentW / 2,

    /** Setup navigation bar / rail */
    navMenu: isTablet
      ? {x: 0, y: 0, width: l.railW, height: l.viewport.height}
      : {
          x: 0,
          y: l.viewport.height - l.c.navH,
          width: l.viewport.width,
          height: l.c.navH,
        },
    navRail: {x: 0, y: 0, width: l.railW, height: l.viewport.height},

    /** Top tab pill container (Presets | Switch | Audio) */
    tabPill: {
      x: l.tabPillX,
      y: l.tabPillY,
      width: l.tabPillW,
      height: l.c.tabPillH,
    },

    /** Individual top tab ('presets' | 'switch' | 'audio' or 0..2) */
    tab: (tabKey: ActivitiesTab | number) => {
      const idx = tabIndex(tabKey);
      return {
        x: l.tabPillX + idx * l.tabW,
        y: l.tabPillY,
        width: l.tabW,
        height: l.c.tabPillH,
      };
    },
    presetsTab: {
      x: l.tabPillX,
      y: l.tabPillY,
      width: l.tabW,
      height: l.c.tabPillH,
    },
    switchTab: {
      x: l.tabPillX + l.tabW,
      y: l.tabPillY,
      width: l.tabW,
      height: l.c.tabPillH,
    },
    audioTab: {
      x: l.tabPillX + l.tabW * 2,
      y: l.tabPillY,
      width: l.tabW,
      height: l.c.tabPillH,
    },

    // --- List Mode Regions ---
    /** + NEW PRESET button */
    newPresetButton: {
      x: l.newPresetX,
      y: l.newPresetY,
      width: l.newPresetW,
      height: l.c.newPresetH,
    },

    /** Presets scroll list container */
    presetsList: {
      x: l.presetsListX,
      y: l.presetsListY,
      width: l.presetsListW,
      height: l.presetsListH,
    },

    /** Preset card row by index or id */
    presetCard: (indexOrId: number | string = 0) => {
      const idx = getPresetIndex(indexOrId);
      return {
        x: l.presetsListX,
        y: l.presetsListY + idx * (l.c.presetCardH + l.c.presetCardGap),
        width: l.presetsListW,
        height: l.c.presetCardH,
      };
    },

    /** App icon within preset card */
    presetIcon: (indexOrId: number | string = 0) => {
      const idx = getPresetIndex(indexOrId);
      const cardY = l.presetsListY + idx * (l.c.presetCardH + l.c.presetCardGap);
      return {
        x: l.presetsListX + l.c.presetCardPadX,
        y: cardY + (l.c.presetCardH - l.c.presetIconSize) / 2,
        width: l.c.presetIconSize,
        height: l.c.presetIconSize,
      };
    },

    /** Preset name within preset card */
    presetName: (indexOrId: number | string = 0) => {
      const idx = getPresetIndex(indexOrId);
      const cardY = l.presetsListY + idx * (l.c.presetCardH + l.c.presetCardGap);
      const iconX = l.presetsListX + l.c.presetCardPadX;
      const nameX = iconX + l.c.presetIconSize + l.c.presetNameMarginLeft;
      const actionsW = l.c.actionIconSize * 4 + l.c.actionIconsGap * 3;
      return {
        x: nameX,
        y: cardY + 12,
        width:
          l.presetsListW -
          (nameX - l.presetsListX) -
          actionsW -
          l.c.presetCardPadX -
          8,
        height: l.c.presetCardH - 24,
      };
    },

    /** Action icons group (edit, copy, trash, play) in preset card */
    presetActions: (indexOrId: number | string = 0) => {
      const idx = getPresetIndex(indexOrId);
      const cardY = l.presetsListY + idx * (l.c.presetCardH + l.c.presetCardGap);
      const actionsW = l.c.actionIconSize * 4 + l.c.actionIconsGap * 3;
      return {
        x: l.presetsListX + l.presetsListW - l.c.presetCardPadX - actionsW,
        y: cardY + (l.c.presetCardH - l.c.actionIconSize) / 2,
        width: actionsW,
        height: l.c.actionIconSize,
      };
    },

    /** Play triangle icon button in preset card */
    presetPlay: (indexOrId: number | string = 0) => {
      const idx = getPresetIndex(indexOrId);
      const cardY = l.presetsListY + idx * (l.c.presetCardH + l.c.presetCardGap);
      return {
        x:
          l.presetsListX +
          l.presetsListW -
          l.c.presetCardPadX -
          l.c.actionIconSize,
        y: cardY + (l.c.presetCardH - l.c.actionIconSize) / 2,
        width: l.c.actionIconSize,
        height: l.c.actionIconSize,
      };
    },

    // --- Edit Mode Regions ---
    /** Edit Preset top title bar */
    editTopBar: {
      x: l.contentX,
      y: 0,
      width: l.contentW,
      height: l.c.editTopBarH,
    },

    /** Red close (X) button */
    closeButton: {
      x: l.closeBtnX,
      y: l.closeBtnY,
      width: l.c.closeBtnSize,
      height: l.c.closeBtnSize,
    },

    /** Edit Preset title text */
    editTitle: {
      x: l.closeBtnX + l.c.closeBtnSize,
      y: 0,
      width: l.contentW - (l.closeBtnX - l.contentX + l.c.closeBtnSize) * 2,
      height: l.c.editTopBarH,
    },

    /** Preset name header row (icon + name) */
    presetHeader: {
      x: l.editBodyX,
      y: l.headerY,
      width: l.editBodyW,
      height: l.headerH,
    },

    /** Preset icon in edit mode */
    editPresetIcon: {
      x: l.editBodyX,
      y: l.headerIconY,
      width: l.c.headerIconSize,
      height: l.c.headerIconSize,
    },

    /** Preset name input field in edit mode */
    presetNameField: {
      x: l.editBodyX + l.c.headerIconSize + l.c.headerNameMarginLeft,
      y: l.headerY,
      width: l.editBodyW - l.c.headerIconSize - l.c.headerNameMarginLeft,
      height: l.headerH,
    },

    /** + EVENTS button */
    eventsButton: {
      x: l.editBodyX,
      y: l.eventsY,
      width: l.editBodyW,
      height: l.c.eventsBtnH,
    },

    /** + COMMANDS button */
    commandsButton: {
      x: l.editBodyX,
      y: l.commandsY,
      width: l.editBodyW,
      height: l.c.commandsBtnH,
    },

    /** Command steps container */
    commandSteps: {
      x: l.editBodyX,
      y: l.cmdStepsY,
      width: l.editBodyW,
      height: l.viewport.height - l.cmdStepsY,
    },

    /** Individual command step card */
    commandStep: (stepIndex = 0) => ({
      x: l.editBodyX,
      y: l.cmdStepsY + stepIndex * (l.cmdCardH + l.c.cmdCardMarginBottom),
      width: l.editBodyW,
      height: l.cmdCardH,
    }),

    /** Command step device type selector ('DEVICE') */
    commandStepType: (stepIndex = 0) => {
      const cardY =
        l.cmdStepsY + stepIndex * (l.cmdCardH + l.c.cmdCardMarginBottom);
      if (isTablet) {
        const selW = (l.editBodyW - l.c.cmdCardPad * 2 - l.c.cmdRowGap) / 2;
        return {
          x: l.editBodyX + l.c.cmdCardPad,
          y: cardY + l.c.cmdCardPad + 22 + l.c.cmdHeaderMarginBottom,
          width: selW,
          height: l.c.cmdSelectorH,
        };
      }
      return {
        x: l.editBodyX + l.c.cmdCardPad,
        y: cardY + l.c.cmdCardPad + 18 + l.c.cmdHeaderMarginBottom,
        width: l.editBodyW - l.c.cmdCardPad * 2,
        height: l.c.cmdSelectorH,
      };
    },

    /** Command step device name selector ('EPSON PowerLite - New') */
    commandStepDevice: (stepIndex = 0) => {
      const cardY =
        l.cmdStepsY + stepIndex * (l.cmdCardH + l.c.cmdCardMarginBottom);
      if (isTablet) {
        const selW = (l.editBodyW - l.c.cmdCardPad * 2 - l.c.cmdRowGap) / 2;
        return {
          x: l.editBodyX + l.c.cmdCardPad + selW + l.c.cmdRowGap,
          y: cardY + l.c.cmdCardPad + 22 + l.c.cmdHeaderMarginBottom,
          width: selW,
          height: l.c.cmdSelectorH,
        };
      }
      return {
        x: l.editBodyX + l.c.cmdCardPad,
        y:
          cardY +
          l.c.cmdCardPad +
          18 +
          l.c.cmdHeaderMarginBottom +
          l.c.cmdSelectorH +
          l.c.cmdSelectorMarginBottom,
        width: l.editBodyW - l.c.cmdCardPad * 2,
        height: l.c.cmdSelectorH,
      };
    },

    /** Command step command selector ('POWER ON') */
    commandStepCommand: (stepIndex = 0) => {
      const cardY =
        l.cmdStepsY + stepIndex * (l.cmdCardH + l.c.cmdCardMarginBottom);
      if (isTablet) {
        const cmdW =
          l.editBodyW - l.c.cmdCardPad * 2 - l.c.cmdRowGap - l.c.sendBtnW;
        return {
          x: l.editBodyX + l.c.cmdCardPad,
          y:
            cardY +
            l.c.cmdCardPad +
            22 +
            l.c.cmdHeaderMarginBottom +
            l.c.cmdSelectorH +
            l.c.cmdSelectorMarginBottom,
          width: cmdW,
          height: l.c.cmdSelectorH,
        };
      }
      const cmdW =
        l.editBodyW - l.c.cmdCardPad * 2 - l.c.cmdRowGap - l.c.sendBtnW;
      return {
        x: l.editBodyX + l.c.cmdCardPad,
        y:
          cardY +
          l.c.cmdCardPad +
          18 +
          l.c.cmdHeaderMarginBottom +
          (l.c.cmdSelectorH + l.c.cmdSelectorMarginBottom) * 2,
        width: cmdW,
        height: l.c.cmdSelectorH,
      };
    },

    /** Command step SEND button */
    commandStepSend: (stepIndex = 0) => {
      const cardY =
        l.cmdStepsY + stepIndex * (l.cmdCardH + l.c.cmdCardMarginBottom);
      if (isTablet) {
        const cmdW =
          l.editBodyW - l.c.cmdCardPad * 2 - l.c.cmdRowGap - l.c.sendBtnW;
        return {
          x: l.editBodyX + l.c.cmdCardPad + cmdW + l.c.cmdRowGap,
          y:
            cardY +
            l.c.cmdCardPad +
            22 +
            l.c.cmdHeaderMarginBottom +
            l.c.cmdSelectorH +
            l.c.cmdSelectorMarginBottom,
          width: l.c.sendBtnW,
          height: l.c.sendBtnH,
        };
      }
      const cmdW =
        l.editBodyW - l.c.cmdCardPad * 2 - l.c.cmdRowGap - l.c.sendBtnW;
      return {
        x: l.editBodyX + l.c.cmdCardPad + cmdW + l.c.cmdRowGap,
        y:
          cardY +
          l.c.cmdCardPad +
          18 +
          l.c.cmdHeaderMarginBottom +
          (l.c.cmdSelectorH + l.c.cmdSelectorMarginBottom) * 2,
        width: l.c.sendBtnW,
        height: l.c.sendBtnH,
      };
    },

    /**
     * Power On command target (brief shot list: "Power On command ringed").
     * In edit mode: commandStepCommand(0).
     * In list mode: presetCard(0) or presetPlay(0).
     */
    powerOnCommand: isEdit
      ? {
          x: l.editBodyX + l.c.cmdCardPad,
          y: isTablet
            ? l.cmdStepsY +
              l.c.cmdCardPad +
              22 +
              l.c.cmdHeaderMarginBottom +
              l.c.cmdSelectorH +
              l.c.cmdSelectorMarginBottom
            : l.cmdStepsY +
              l.c.cmdCardPad +
              18 +
              l.c.cmdHeaderMarginBottom +
              (l.c.cmdSelectorH + l.c.cmdSelectorMarginBottom) * 2,
          width: l.editBodyW - l.c.cmdCardPad * 2 - l.c.cmdRowGap - l.c.sendBtnW,
          height: l.c.cmdSelectorH,
        }
      : {
          x: l.presetsListX,
          y: l.presetsListY,
          width: l.presetsListW,
          height: l.c.presetCardH,
        },

    /** Toast notification */
    toast: {
      x: l.contentX + (l.contentW - 200) / 2,
      y: l.toastY,
      width: 200,
      height: 38,
    },
  };
};

export const presetRegions = activitiesPresetsRegions;
export const presetsRegions = activitiesPresetsRegions;

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
  const l = layoutFor(device, {
    mode,
    presets,
    commandSteps,
    showNavMenu,
  });

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
                  height: l.c.editTopBarH,
                  display: 'flex',
                  alignItems: 'center',
                  padding: `0 ${l.c.editTopBarPadX}px`,
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
                  Edit Preset
                </div>
              </div>

              {/* Edit Body */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: `${l.c.editBodyPadTop}px ${l.c.editBodyPadX}px ${l.c.editBodyPadBottom}px`,
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
                    marginBottom: l.c.headerMarginBottom,
                  }}
                >
                  <AppIcon
                    name="ic_power"
                    size={l.c.headerIconSize}
                    tint={editPresetIconColor}
                  />
                  <span
                    style={{
                      marginLeft: l.c.headerNameMarginLeft,
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
                    height: l.c.eventsBtnH,
                    backgroundColor: appColors.gray20,
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.gray50,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: l.c.eventsBtnMarginBottom,
                  }}
                >
                  + EVENTS
                </div>

                {/* + COMMANDS Button */}
                <div
                  style={{
                    height: l.c.commandsBtnH,
                    backgroundColor: appColors.gray20,
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: appColors.white,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: l.c.commandsBtnMarginBottom,
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
                      padding: l.c.cmdCardPad,
                      marginBottom: l.c.cmdCardMarginBottom,
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Step Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: l.c.cmdHeaderMarginBottom,
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
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill={appColors.gray50}
                        >
                          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                        </svg>
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill={appColors.gray50}
                        >
                          <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Selectors */}
                    <div
                      style={{
                        display: 'flex',
                        gap: l.c.cmdRowGap,
                        marginBottom: l.c.cmdSelectorMarginBottom,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: l.c.cmdSelectorH,
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
                        <span style={{fontSize: 10, color: appColors.gray50}}>
                          ▾
                        </span>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: l.c.cmdSelectorH,
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
                        <span style={{fontSize: 10, color: appColors.gray50}}>
                          ▾
                        </span>
                      </div>
                    </div>

                    {/* Command & Send Row */}
                    <div style={{display: 'flex', gap: l.c.cmdRowGap}}>
                      <div
                        style={{
                          flex: 1,
                          height: l.c.cmdSelectorH,
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
                        <span style={{fontSize: 10, color: appColors.gray50}}>
                          ▾
                        </span>
                      </div>
                      <div
                        style={{
                          width: l.c.sendBtnW,
                          height: l.c.sendBtnH,
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
                  height: l.c.tabPillH,
                  margin: `${l.c.tabPillMarginY}px ${l.c.tabPillMarginX}px`,
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
                        backgroundColor: active
                          ? appColors.blue
                          : appColors.gray20,
                        color: appColors.white,
                        fontSize: 13.5,
                        fontWeight: 600,
                        borderRight:
                          idx < 2 ? '1px solid rgba(0,0,0,0.3)' : undefined,
                      }}
                    >
                      {tab.label}
                    </div>
                  );
                })}
              </div>

              {/* + NEW PRESET Button */}
              <div
                style={{
                  padding: `0 ${l.c.listPadX}px`,
                  marginBottom: l.c.newPresetMarginBottom,
                }}
              >
                <div
                  style={{
                    height: l.c.newPresetH,
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
                  padding: `0 ${l.c.listPadX}px ${l.c.listPadBottom}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: l.c.presetCardGap,
                }}
              >
                {presets.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      height: l.c.presetCardH,
                      backgroundColor: appColors.gray10,
                      borderRadius: 5,
                      display: 'flex',
                      alignItems: 'center',
                      padding: `0 ${l.c.presetCardPadX}px`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Preset Icon */}
                    <AppIcon
                      name="ic_power"
                      size={l.c.presetIconSize}
                      tint={p.iconColor ?? appColors.green}
                    />

                    {/* Preset Name */}
                    <span
                      style={{
                        flex: 1,
                        marginLeft: l.c.presetNameMarginLeft,
                        fontSize: l.c.presetNameFontSize,
                        fontWeight: 600,
                        color: appColors.white,
                      }}
                    >
                      {p.name}
                    </span>

                    {/* Action Icons */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: l.c.actionIconsGap,
                      }}
                    >
                      {/* Pencil Edit */}
                      <svg
                        width={l.c.actionIconSize}
                        height={l.c.actionIconSize}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
                          stroke={appColors.white75}
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {/* Copy */}
                      <svg
                        width={l.c.actionIconSize}
                        height={l.c.actionIconSize}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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
                      <svg
                        width={l.c.actionIconSize}
                        height={l.c.actionIconSize}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 6H21M19 6V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V6M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6"
                          stroke={appColors.white50}
                          strokeWidth={2}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Play Triangle (Green) */}
                      <svg
                        width={l.c.actionIconSize}
                        height={l.c.actionIconSize}
                        viewBox="0 0 24 24"
                        fill={appColors.green}
                      >
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
                bottom: l.c.toastBottom,
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
              height: l.c.editTopBarH,
              display: 'flex',
              alignItems: 'center',
              padding: `0 ${l.c.editTopBarPadX}px`,
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
              Edit Preset
            </div>
          </div>

          {/* Edit Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: `${l.c.editBodyPadTop}px ${l.c.editBodyPadX}px ${l.c.editBodyPadBottom}px`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header: Icon + Preset Name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: l.c.headerMarginBottom,
              }}
            >
              <AppIcon
                name="ic_power"
                size={l.c.headerIconSize}
                tint={editPresetIconColor}
              />
              <div
                style={{
                  flex: 1,
                  marginLeft: l.c.headerNameMarginLeft,
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
                height: l.c.eventsBtnH,
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appColors.gray50,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginBottom: l.c.eventsBtnMarginBottom,
              }}
            >
              + EVENTS
            </div>

            {/* + COMMANDS Button */}
            <div
              style={{
                height: l.c.commandsBtnH,
                backgroundColor: appColors.gray20,
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appColors.white,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: l.c.commandsBtnMarginBottom,
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
                  padding: l.c.cmdCardPad,
                  marginBottom: l.c.cmdCardMarginBottom,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Step Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: l.c.cmdHeaderMarginBottom,
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
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill={appColors.gray50}
                    >
                      <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                    </svg>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill={appColors.gray50}
                    >
                      <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
                    </svg>
                  </div>
                </div>

                {/* Device Type Selector */}
                <div
                  style={{
                    height: l.c.cmdSelectorH,
                    backgroundColor: appColors.gray20,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    marginBottom: l.c.cmdSelectorMarginBottom,
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
                    height: l.c.cmdSelectorH,
                    backgroundColor: appColors.gray20,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    marginBottom: l.c.cmdSelectorMarginBottom,
                    fontSize: 12,
                    color: appColors.white,
                    fontWeight: 600,
                  }}
                >
                  <span>{step.deviceName ?? 'EPSON PowerLite - New'}</span>
                  <span style={{fontSize: 10, color: appColors.gray50}}>▾</span>
                </div>

                {/* Command & Send Row */}
                <div style={{display: 'flex', gap: l.c.cmdRowGap}}>
                  <div
                    style={{
                      flex: 1,
                      height: l.c.cmdSelectorH,
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
                    <span style={{fontSize: 10, color: appColors.gray50}}>
                      ▾
                    </span>
                  </div>
                  <div
                    style={{
                      width: l.c.sendBtnW,
                      height: l.c.sendBtnH,
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
              height: l.c.tabPillH,
              margin: `${l.c.tabPillMarginY}px ${l.c.tabPillMarginX}px`,
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
                    borderRight:
                      idx < 2 ? '1px solid rgba(0,0,0,0.3)' : undefined,
                  }}
                >
                  {tab.label}
                </div>
              );
            })}
          </div>

          {/* + NEW PRESET Button */}
          <div
            style={{
              padding: `0 ${l.c.listPadX}px`,
              marginBottom: l.c.newPresetMarginBottom,
            }}
          >
            <div
              style={{
                height: l.c.newPresetH,
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
              padding: `0 ${l.c.listPadX}px ${l.c.listPadBottom}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: l.c.presetCardGap,
            }}
          >
            {presets.map((p) => (
              <div
                key={p.id}
                style={{
                  height: l.c.presetCardH,
                  backgroundColor: appColors.gray10,
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  padding: `0 ${l.c.presetCardPadX}px`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              >
                {/* Preset Icon */}
                <AppIcon
                  name="ic_power"
                  size={l.c.presetIconSize}
                  tint={p.iconColor ?? appColors.green}
                />

                {/* Preset Name */}
                <span
                  style={{
                    flex: 1,
                    marginLeft: l.c.presetNameMarginLeft,
                    fontSize: l.c.presetNameFontSize,
                    fontWeight: 600,
                    color: appColors.white,
                  }}
                >
                  {p.name}
                </span>

                {/* Action Icons */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: l.c.actionIconsGap,
                  }}
                >
                  {/* Pencil Edit */}
                  <svg
                    width={l.c.actionIconSize}
                    height={l.c.actionIconSize}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
                      stroke={appColors.white75}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Copy */}
                  <svg
                    width={l.c.actionIconSize}
                    height={l.c.actionIconSize}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
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
                  <svg
                    width={l.c.actionIconSize}
                    height={l.c.actionIconSize}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 6H21M19 6V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V6M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6"
                      stroke={appColors.white50}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Play Triangle (Green) */}
                  <svg
                    width={l.c.actionIconSize}
                    height={l.c.actionIconSize}
                    viewBox="0 0 24 24"
                    fill={appColors.green}
                  >
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
            bottom: showNavMenu ? l.c.toastBottom : l.c.toastBottomNoNav,
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
