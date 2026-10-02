// The Activities Audio surface, rebuilt as live React.
//
// Derived from:
//   res/layout/audio.xml                        Presets | Switch | Audio tabs, audio device, range override
//   res/layout/item_audio_control_mapping.xml   volume up, down, set mapping cards
//   Reference frames: f_0028.jpg, f_0029.jpg

import React from 'react';
import {NAV_COLLAPSED_H, PhoneNavMenu} from './PhoneNavMenu';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
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
  toast?: string;
  showNavMenu?: boolean;
};

export type ActivitiesAudioRegionOptions = Partial<ActivitiesAudioProps> & {
  mappingsCount?: number;
};

// Layout rhythm, shared between markup and activitiesAudioRegions() so camera targets
// never drift from the controls they frame.
export const ACTIVITIES_AUDIO_LAYOUT = {
  phone: {
    railW: 0,
    padX: 10,
    tabPillH: 44,
    tabPillMarginTop: 8,
    tabPillMarginX: 10,
    tabPillMarginBottom: 4,
    navH: NAV_COLLAPSED_H, // 108

    // Audio Device row
    audioDeviceEyebrowH: 13,
    audioDeviceSelectorH: 42,
    audioDeviceMarginBottom: 8,
    audioDeviceArrowW: 44,

    // Connection status
    statusH: 14,
    statusMarginBottom: 8,

    // Volume Range Override Card
    rangeCardPadTop: 10,
    rangeCardPadX: 12,
    rangeCardPadBottom: 12,
    rangeCardMarginBottom: 10,
    rangeHeaderH: 16,
    rangeHeaderMarginBottom: 8,
    rangeFieldLabelH: 11,
    rangeFieldBoxH: 34,
    rangeFieldGap: 8,

    // Control Mappings
    mappingsHeaderH: 15,
    mappingsHeaderMarginBottom: 6,
    mappingCardPadTop: 10,
    mappingCardPadX: 12,
    mappingCardPadBottom: 10,
    mappingCardGap: 8,
    mappingCardHeaderH: 16,
    mappingCardHeaderMarginBottom: 6,
    mappingCommandRowH: 38,
    mappingCommandRowGap: 8,
    mappingTestBtnW: 66,
    mappingSubtitleH: 13,
    mappingSubtitleMarginTop: 4,
    mappingCardMappedH: 97,
    mappingCardUnmappedH: 80,
    mappingCardH: 97,
    toastBottom: 120,
    toastBottomNoNav: 20,
  },
  tablet: {
    railW: TABLET_NAV_WIDTH, // 200
    padX: 16,
    tabPillH: 46,
    tabPillMarginTop: 10,
    tabPillMarginX: 16,
    tabPillMarginBottom: 6,
    navH: 0,

    // Audio Device row
    audioDeviceEyebrowH: 14,
    audioDeviceSelectorH: 40,
    audioDeviceMarginBottom: 8,
    audioDeviceArrowW: 44,

    // Connection status
    statusH: 15,
    statusMarginBottom: 10,

    // Volume Range Override Card
    rangeCardPadTop: 12,
    rangeCardPadX: 16,
    rangeCardPadBottom: 16,
    rangeCardMarginBottom: 12,
    rangeHeaderH: 17,
    rangeHeaderMarginBottom: 10,
    rangeFieldLabelH: 12,
    rangeFieldBoxH: 36,
    rangeFieldGap: 12,

    // Control Mappings
    mappingsHeaderH: 16,
    mappingsHeaderMarginBottom: 8,
    mappingCardPadTop: 12,
    mappingCardPadX: 16,
    mappingCardPadBottom: 12,
    mappingCardGap: 10,
    mappingCardHeaderH: 16,
    mappingCardHeaderMarginBottom: 8,
    mappingCommandRowH: 40,
    mappingCommandRowGap: 10,
    mappingTestBtnW: 72,
    mappingSubtitleH: 12,
    mappingSubtitleMarginTop: 6,
    mappingCardMappedH: 107,
    mappingCardUnmappedH: 107,
    mappingCardH: 107,
    toastBottom: 28,
    toastBottomNoNav: 28,
  },
} as const;

const layoutFor = (
  device: 'phone' | 'tablet',
  options?: ActivitiesAudioRegionOptions
) => {
  const viewport = VIEWPORT[device];
  const isTablet = device === 'tablet';
  const c = isTablet
    ? ACTIVITIES_AUDIO_LAYOUT.tablet
    : ACTIVITIES_AUDIO_LAYOUT.phone;
  const railW = isTablet ? c.railW : 0;
  const contentX = railW;
  const contentW = viewport.width - railW;

  // Tab Pill
  const tabPillX = contentX + c.tabPillMarginX;
  const tabPillY = c.tabPillMarginTop;
  const tabPillW = contentW - c.tabPillMarginX * 2;
  const tabW = tabPillW / 3;

  // Scrollable Content
  const scrollAreaY = tabPillY + c.tabPillH + c.tabPillMarginBottom;
  const selectorX = contentX + c.padX;
  const selectorW = contentW - c.padX * 2;

  // Audio Device Row (scroll area has 4px padding-top; eyebrow has 4px margin-top)
  const audioDeviceEyebrowY = scrollAreaY + 4 + 4;
  const audioDeviceSelectorY =
    audioDeviceEyebrowY + c.audioDeviceEyebrowH + (isTablet ? 4 : 2);

  // Connection Status
  const connectionStatusY =
    audioDeviceSelectorY +
    c.audioDeviceSelectorH +
    c.audioDeviceMarginBottom;

  // Volume Range Override Card
  const rangeCardY =
    connectionStatusY + c.statusH + c.statusMarginBottom;
  const rangeCardH = isTablet
    ? c.rangeCardPadTop +
      c.rangeHeaderH +
      c.rangeHeaderMarginBottom +
      c.rangeFieldLabelH +
      4 +
      c.rangeFieldBoxH +
      c.rangeCardPadBottom // 12 + 17 + 10 + 12 + 4 + 36 + 16 = 107
    : c.rangeCardPadTop +
      c.rangeHeaderH +
      c.rangeHeaderMarginBottom +
      c.rangeFieldLabelH +
      3 +
      c.rangeFieldBoxH +
      c.rangeCardPadBottom; // 10 + 16 + 8 + 11 + 3 + 34 + 12 = 94

  const rangeFieldW =
    (selectorW - c.rangeCardPadX * 2 - c.rangeFieldGap * 2) / 3;
  const rangeFieldsY =
    rangeCardY +
    c.rangeCardPadTop +
    c.rangeHeaderH +
    c.rangeHeaderMarginBottom +
    c.rangeFieldLabelH +
    (isTablet ? 4 : 3);

  // Control Mappings
  const mappingsHeaderY =
    rangeCardY + rangeCardH + c.rangeCardMarginBottom + (isTablet ? 8 : 6);
  const mappingsListY =
    mappingsHeaderY + c.mappingsHeaderH + (isTablet ? 6 : c.mappingsHeaderMarginBottom);
  const mappingsCount =
    options?.mappings?.length ??
    options?.mappingsCount ??
    DEFAULT_AUDIO_MAPPINGS.length;

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
    scrollAreaY,
    selectorX,
    selectorW,
    audioDeviceEyebrowY,
    audioDeviceSelectorY,
    connectionStatusY,
    rangeCardY,
    rangeCardH,
    rangeFieldW,
    rangeFieldsY,
    mappingsHeaderY,
    mappingsListY,
    mappingsCount,
    toastY,
  };
};

/**
 * Named regions for <Camera> and annotations in ActivitiesAudio's coordinate space.
 * Follows connectionRegions(device): derived from layoutFor(device).
 */
export const activitiesAudioRegions = (
  device: 'phone' | 'tablet',
  options?: ActivitiesAudioRegionOptions
) => {
  const l = layoutFor(device, options);
  const isTablet = l.isTablet;
  const mappings = options?.mappings ?? DEFAULT_AUDIO_MAPPINGS;

  const tabIndex = (tab: ActivitiesTab | number): number => {
    if (typeof tab === 'number') return tab;
    if (tab === 'switch') return 1;
    if (tab === 'audio') return 2;
    return 0;
  };

  const getMappingIndex = (idOrIndex: number | string): number => {
    if (typeof idOrIndex === 'number') return idOrIndex;
    if (idOrIndex === 'up') return 0;
    if (idOrIndex === 'down') return 1;
    if (idOrIndex === 'set') return 2;
    const idx = mappings.findIndex(
      (m) => m.id === idOrIndex || m.title === idOrIndex
    );
    return idx >= 0 ? idx : 0;
  };

  // Helper to compute card Y and height for mapping at index
  const getCardLayout = (idx: number) => {
    let curY = l.mappingsListY;
    for (let i = 0; i < idx; i++) {
      const isMapped = mappings[i]?.status === 'Mapped';
      const cardH = isTablet
        ? l.c.mappingCardH
        : isMapped
          ? l.c.mappingCardMappedH
          : l.c.mappingCardUnmappedH;
      curY += cardH + l.c.mappingCardGap;
    }
    const currentIsMapped = mappings[idx]?.status === 'Mapped';
    const cardH = isTablet
      ? l.c.mappingCardH
      : currentIsMapped
        ? l.c.mappingCardMappedH
        : l.c.mappingCardUnmappedH;
    return {y: curY, height: cardH};
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

    // --- Audio Device Selector ---
    /** Eyebrow label: "AUDIO DEVICE" */
    audioDeviceEyebrow: {
      x: l.selectorX,
      y: l.audioDeviceEyebrowY,
      width: l.selectorW,
      height: l.c.audioDeviceEyebrowH,
    },

    /** Audio Device split button container */
    audioDeviceSelector: {
      x: l.selectorX,
      y: l.audioDeviceSelectorY,
      width: l.selectorW,
      height: l.c.audioDeviceSelectorH,
    },

    /** Left label button of audio device selector */
    audioDeviceButton: {
      x: l.selectorX,
      y: l.audioDeviceSelectorY,
      width: l.selectorW - l.c.audioDeviceArrowW,
      height: l.c.audioDeviceSelectorH,
    },

    /** Right dropdown arrow of audio device selector */
    audioDeviceArrow: {
      x: l.selectorX + l.selectorW - l.c.audioDeviceArrowW,
      y: l.audioDeviceSelectorY,
      width: l.c.audioDeviceArrowW,
      height: l.c.audioDeviceSelectorH,
    },

    /** Connection status text ("Connected") */
    connectionStatus: {
      x: l.selectorX,
      y: l.connectionStatusY,
      width: l.selectorW,
      height: l.c.statusH,
    },

    // --- Volume Range Override Card ---
    /** Volume Range Override card container */
    volumeRangeCard: {
      x: l.selectorX,
      y: l.rangeCardY,
      width: l.selectorW,
      height: l.rangeCardH,
    },

    /** Volume Range Override card header title */
    volumeRangeHeader: {
      x: l.selectorX + l.c.rangeCardPadX,
      y: l.rangeCardY + l.c.rangeCardPadTop,
      width: l.selectorW - l.c.rangeCardPadX * 2,
      height: l.c.rangeHeaderH,
    },

    /** Start Override input box */
    startOverrideField: {
      x: l.selectorX + l.c.rangeCardPadX,
      y: l.rangeFieldsY,
      width: l.rangeFieldW,
      height: l.c.rangeFieldBoxH,
    },

    /** Start Override control column (label + input box) */
    startOverrideControl: {
      x: l.selectorX + l.c.rangeCardPadX,
      y: l.rangeFieldsY - l.c.rangeFieldLabelH - (isTablet ? 4 : 3),
      width: l.rangeFieldW,
      height: l.c.rangeFieldLabelH + (isTablet ? 4 : 3) + l.c.rangeFieldBoxH,
    },

    /** End Override input box */
    endOverrideField: {
      x: l.selectorX + l.c.rangeCardPadX + l.rangeFieldW + l.c.rangeFieldGap,
      y: l.rangeFieldsY,
      width: l.rangeFieldW,
      height: l.c.rangeFieldBoxH,
    },

    /** End Override control column (label + input box) */
    endOverrideControl: {
      x: l.selectorX + l.c.rangeCardPadX + l.rangeFieldW + l.c.rangeFieldGap,
      y: l.rangeFieldsY - l.c.rangeFieldLabelH - (isTablet ? 4 : 3),
      width: l.rangeFieldW,
      height: l.c.rangeFieldLabelH + (isTablet ? 4 : 3) + l.c.rangeFieldBoxH,
    },

    /** Step Override input box */
    stepOverrideField: {
      x:
        l.selectorX +
        l.c.rangeCardPadX +
        (l.rangeFieldW + l.c.rangeFieldGap) * 2,
      y: l.rangeFieldsY,
      width: l.rangeFieldW,
      height: l.c.rangeFieldBoxH,
    },

    /** Step Override control column (label + input box) */
    stepOverrideControl: {
      x:
        l.selectorX +
        l.c.rangeCardPadX +
        (l.rangeFieldW + l.c.rangeFieldGap) * 2,
      y: l.rangeFieldsY - l.c.rangeFieldLabelH - (isTablet ? 4 : 3),
      width: l.rangeFieldW,
      height: l.c.rangeFieldLabelH + (isTablet ? 4 : 3) + l.c.rangeFieldBoxH,
    },

    // --- Control Mappings ---
    /** Control Mappings section header title */
    mappingsHeader: {
      x: l.selectorX,
      y: l.mappingsHeaderY,
      width: l.selectorW,
      height: l.c.mappingsHeaderH,
    },

    /** Control Mappings list container */
    mappingsList: {
      x: l.selectorX,
      y: l.mappingsListY,
      width: l.selectorW,
      height: l.viewport.height - l.mappingsListY,
    },

    /** Mapping card by index (0..2) or id ('up' | 'down' | 'set') */
    mappingCard: (idOrIndex: number | 'up' | 'down' | 'set' = 0) => {
      const idx = getMappingIndex(idOrIndex);
      const card = getCardLayout(idx);
      return {
        x: l.selectorX,
        y: card.y,
        width: l.selectorW,
        height: card.height,
      };
    },

    /** Mapping card title text */
    mappingTitle: (idOrIndex: number | 'up' | 'down' | 'set' = 0) => {
      const idx = getMappingIndex(idOrIndex);
      const card = getCardLayout(idx);
      return {
        x: l.selectorX + l.c.mappingCardPadX,
        y: card.y + l.c.mappingCardPadTop,
        width: l.selectorW - l.c.mappingCardPadX * 2 - 80,
        height: isTablet ? 18 : l.c.mappingCardHeaderH,
      };
    },

    /** Mapping card status badge ("Mapped" | "Unmapped") */
    mappingStatus: (idOrIndex: number | 'up' | 'down' | 'set' = 0) => {
      const idx = getMappingIndex(idOrIndex);
      const card = getCardLayout(idx);
      return {
        x: l.selectorX + l.selectorW - l.c.mappingCardPadX - 80,
        y: card.y + l.c.mappingCardPadTop,
        width: 80,
        height: l.c.mappingCardHeaderH,
      };
    },

    /** Mapping command text display box */
    mappingCommand: (idOrIndex: number | 'up' | 'down' | 'set' = 0) => {
      const idx = getMappingIndex(idOrIndex);
      const card = getCardLayout(idx);
      const rowY =
        card.y +
        l.c.mappingCardPadTop +
        l.c.mappingCardHeaderH +
        l.c.mappingCardHeaderMarginBottom;
      const cmdW =
        l.selectorW -
        l.c.mappingCardPadX * 2 -
        l.c.mappingCommandRowGap -
        l.c.mappingTestBtnW;
      return {
        x: l.selectorX + l.c.mappingCardPadX,
        y: rowY,
        width: cmdW,
        height: l.c.mappingCommandRowH,
      };
    },

    /** Mapping card Test button */
    mappingTestButton: (idOrIndex: number | 'up' | 'down' | 'set' = 0) => {
      const idx = getMappingIndex(idOrIndex);
      const card = getCardLayout(idx);
      const rowY =
        card.y +
        l.c.mappingCardPadTop +
        l.c.mappingCardHeaderH +
        l.c.mappingCardHeaderMarginBottom;
      const testX =
        l.selectorX + l.selectorW - l.c.mappingCardPadX - l.c.mappingTestBtnW;
      return {
        x: testX,
        y: rowY,
        width: l.c.mappingTestBtnW,
        height: l.c.mappingCommandRowH,
      };
    },

    // --- Brief Shot List Specific Targets ---
    /** Volume Up mapping card (index 0) */
    volumeUpCard: {
      x: l.selectorX,
      y: getCardLayout(0).y,
      width: l.selectorW,
      height: getCardLayout(0).height,
    },

    /** Volume Down mapping card (index 1) */
    volumeDownCard: {
      x: l.selectorX,
      y: getCardLayout(1).y,
      width: l.selectorW,
      height: getCardLayout(1).height,
    },

    /** Volume Set mapping card (index 2) */
    volumeSetCard: {
      x: l.selectorX,
      y: getCardLayout(2).y,
      width: l.selectorW,
      height: getCardLayout(2).height,
    },

    /** Direct aliases matching region-values.json */
    up: {
      x: l.selectorX,
      y: getCardLayout(0).y,
      width: l.selectorW,
      height: getCardLayout(0).height,
    },
    down: {
      x: l.selectorX,
      y: getCardLayout(1).y,
      width: l.selectorW,
      height: getCardLayout(1).height,
    },
    set: {
      x: l.selectorX,
      y: getCardLayout(2).y,
      width: l.selectorW,
      height: getCardLayout(2).height,
    },
    setTitle: {
      x: l.selectorX + l.c.mappingCardPadX,
      y: getCardLayout(2).y + l.c.mappingCardPadTop,
      width: l.selectorW - l.c.mappingCardPadX * 2 - 80,
      height: isTablet ? 18 : l.c.mappingCardHeaderH,
    },
    setCommand: {
      x: l.selectorX + l.c.mappingCardPadX,
      y:
        getCardLayout(2).y +
        l.c.mappingCardPadTop +
        l.c.mappingCardHeaderH +
        l.c.mappingCardHeaderMarginBottom,
      width:
        l.selectorW -
        l.c.mappingCardPadX * 2 -
        l.c.mappingCommandRowGap -
        l.c.mappingTestBtnW,
      height: l.c.mappingCommandRowH,
    },

    /** Volume Up command box */
    volumeUpCommand: {
      x: l.selectorX + l.c.mappingCardPadX,
      y:
        getCardLayout(0).y +
        l.c.mappingCardPadTop +
        l.c.mappingCardHeaderH +
        l.c.mappingCardHeaderMarginBottom,
      width:
        l.selectorW -
        l.c.mappingCardPadX * 2 -
        l.c.mappingCommandRowGap -
        l.c.mappingTestBtnW,
      height: l.c.mappingCommandRowH,
    },

    /** Volume Down command box */
    volumeDownCommand: {
      x: l.selectorX + l.c.mappingCardPadX,
      y:
        getCardLayout(1).y +
        l.c.mappingCardPadTop +
        l.c.mappingCardHeaderH +
        l.c.mappingCardHeaderMarginBottom,
      width:
        l.selectorW -
        l.c.mappingCardPadX * 2 -
        l.c.mappingCommandRowGap -
        l.c.mappingTestBtnW,
      height: l.c.mappingCommandRowH,
    },

    /** Volume Set command box */
    volumeSetCommand: {
      x: l.selectorX + l.c.mappingCardPadX,
      y:
        getCardLayout(2).y +
        l.c.mappingCardPadTop +
        l.c.mappingCardHeaderH +
        l.c.mappingCardHeaderMarginBottom,
      width:
        l.selectorW -
        l.c.mappingCardPadX * 2 -
        l.c.mappingCommandRowGap -
        l.c.mappingTestBtnW,
      height: l.c.mappingCommandRowH,
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

export const audioRegions = activitiesAudioRegions;
export const activitiesAudioRegion = activitiesAudioRegions;

export const ActivitiesAudio: React.FC<ActivitiesAudioProps> = ({
  device = 'phone',
  activeTab = 'audio',
  deviceName = 'EPSON PowerLite - New',
  connectionStatus = 'Connected',
  startOverride = '0',
  endOverride = '100',
  stepOverride = '',
  mappings = DEFAULT_AUDIO_MAPPINGS,
  toast,
  showNavMenu = true,
}) => {
  const l = layoutFor(device, {
    mappings,
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

          {/* Top Tab Pill: Presets | Switch | Audio */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              height: l.c.tabPillH,
              margin: `${l.c.tabPillMarginTop}px ${l.c.tabPillMarginX}px ${l.c.tabPillMarginBottom}px`,
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

          {/* Scrollable Content Area */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              flex: 1,
              overflowY: 'auto',
              padding: `4px ${l.c.padX}px 30px`,
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
            <div
              style={{
                display: 'flex',
                height: l.c.audioDeviceSelectorH,
                marginBottom: l.c.audioDeviceMarginBottom,
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
                  width: l.c.audioDeviceArrowW,
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
                margin: `0 2px ${l.c.statusMarginBottom}px`,
              }}
            >
              {connectionStatus}
            </div>

            {/* Volume Range Override Card */}
            <div
              style={{
                backgroundColor: '#2A2A2A',
                borderRadius: 6,
                padding: `${l.c.rangeCardPadTop}px ${l.c.rangeCardPadX}px ${l.c.rangeCardPadBottom}px`,
                marginBottom: l.c.rangeCardMarginBottom,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: appColors.white,
                  marginBottom: l.c.rangeHeaderMarginBottom,
                }}
              >
                Volume Range Override
              </div>

              <div style={{display: 'flex', gap: l.c.rangeFieldGap}}>
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
                      height: l.c.rangeFieldBoxH,
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
                      height: l.c.rangeFieldBoxH,
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
                      height: l.c.rangeFieldBoxH,
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
                margin: `8px 2px ${l.c.mappingsHeaderMarginBottom}px`,
              }}
            >
              Control Mappings
            </div>

            {/* Mapping Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: l.c.mappingCardGap,
              }}
            >
              {mappings.map((m) => {
                const isMapped = m.status === 'Mapped';
                return (
                  <div
                    key={m.id}
                    style={{
                      backgroundColor: '#2A2A2A',
                      borderRadius: 6,
                      padding: `${l.c.mappingCardPadTop}px ${l.c.mappingCardPadX}px ${l.c.mappingCardPadBottom}px`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: l.c.mappingCardHeaderMarginBottom,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: appColors.white,
                        }}
                      >
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
                    <div
                      style={{
                        display: 'flex',
                        gap: l.c.mappingCommandRowGap,
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: l.c.mappingCommandRowH,
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
                          width: l.c.mappingTestBtnW,
                          height: l.c.mappingCommandRowH,
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
                        marginTop: l.c.mappingSubtitleMarginTop,
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
          height: l.c.tabPillH,
          margin: `${l.c.tabPillMarginTop}px ${l.c.tabPillMarginX}px ${l.c.tabPillMarginBottom}px`,
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
          padding: `4px ${l.c.padX}px 60px`,
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
        <div
          style={{
            display: 'flex',
            height: l.c.audioDeviceSelectorH,
            marginBottom: l.c.audioDeviceMarginBottom,
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
            {deviceName}
          </div>
          <div
            style={{
              width: l.c.audioDeviceArrowW,
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
            margin: `0 2px ${l.c.statusMarginBottom}px`,
          }}
        >
          {connectionStatus}
        </div>

        {/* Volume Range Override Card */}
        <div
          style={{
            backgroundColor: '#2A2A2A',
            borderRadius: 6,
            padding: `${l.c.rangeCardPadTop}px ${l.c.rangeCardPadX}px ${l.c.rangeCardPadBottom}px`,
            marginBottom: l.c.rangeCardMarginBottom,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: appColors.white,
              marginBottom: l.c.rangeHeaderMarginBottom,
            }}
          >
            Volume Range Override
          </div>

          <div style={{display: 'flex', gap: l.c.rangeFieldGap}}>
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
                  height: l.c.rangeFieldBoxH,
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
                  height: l.c.rangeFieldBoxH,
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
                  height: l.c.rangeFieldBoxH,
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
            margin: `6px 2px ${l.c.mappingsHeaderMarginBottom}px`,
          }}
        >
          Control Mappings
        </div>

        {/* Mapping Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: l.c.mappingCardGap,
          }}
        >
          {mappings.map((m) => {
            const isMapped = m.status === 'Mapped';
            return (
              <div
                key={m.id}
                style={{
                  backgroundColor: '#2A2A2A',
                  borderRadius: 6,
                  padding: `${l.c.mappingCardPadTop}px ${l.c.mappingCardPadX}px ${l.c.mappingCardPadBottom}px`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: l.c.mappingCardHeaderMarginBottom,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: appColors.white,
                    }}
                  >
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
                <div
                  style={{
                    display: 'flex',
                    gap: l.c.mappingCommandRowGap,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: l.c.mappingCommandRowH,
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
                      width: l.c.mappingTestBtnW,
                      height: l.c.mappingCommandRowH,
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
                      marginTop: l.c.mappingSubtitleMarginTop,
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
