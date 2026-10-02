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
import {NAV_COLLAPSED_H, PhoneNavMenu} from './PhoneNavMenu';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
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
  device?: 'phone' | 'tablet';
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

export type ActivitiesSwitchRegionOptions = Partial<ActivitiesSwitchProps> & {
  inputRowsCount?: number;
  encodersCount?: number;
  decodersCount?: number;
};

// Layout rhythm, shared between markup and activitiesSwitchRegions() so camera targets
// never drift from the controls they frame.
export const ACTIVITIES_SWITCH_LAYOUT = {
  phone: {
    padX: 10,
    tabPillH: 44,
    tabPillMarginTop: 8,
    tabPillMarginX: 10,
    tabPillMarginBottom: 4,
    navH: NAV_COLLAPSED_H, // 108

    // Switch Type row
    switchTypeEyebrowH: 18,
    switchTypeSelectorH: 42,
    switchTypeMarginBottom: 8,
    switchTypeDropdownArrowW: 44,

    // Switch Type Picker Overlay
    pickerTop: 108,
    pickerMarginX: 10,
    pickerItemH: 44,

    // Many to One
    switchDeviceEyebrowH: 18,
    switchDeviceSelectorH: 42,
    switchDeviceMarginBottom: 8,
    deviceInfoH: 36,
    deviceInfoMarginBottom: 8,
    outputLabelW: 100,
    outputLabelH: 28,
    inputsHeaderH: 16,
    inputsHeaderMarginBottom: 6,
    inputRowH: 48,
    inputRowGap: 6,
    inputRowPadX: 6,
    inputRowCheckSize: 20,
    inputRowIconSize: 38,
    inputRowCmdW: 68,
    inputRowSendW: 58,

    // AVoIP
    avoipEyebrowH: 18,
    avoipBtnsH: 38,
    avoipBtnsGap: 8,
    avoipBtnsMarginBottom: 8,
    avoipSourceEyebrowH: 20,
    encoderRowH: 48,
    encoderRowGap: 6,
    encoderRowPadX: 8,
    encoderRowCheckSize: 18,
    encoderRowIconSize: 38,
    encoderRowSrcW: 54,
    encoderMarginBottom: 12,
    avoipDisplayEyebrowH: 18,
    decoderRowH: 48,
    decoderRowGap: 6,
    decoderRowPadX: 8,
    decoderRowCheckSize: 18,
    decoderRowDisW: 54,
    railW: 0,
    avoipColGap: 0,
    routeSectionMarginTop: 0,
    routeInputH: 0,
    routeBtnW: 0,
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

    // Switch Type row
    switchTypeEyebrowH: 20,
    switchTypeSelectorH: 40,
    switchTypeMarginBottom: 10,
    switchTypeDropdownArrowW: 44,

    // Switch Type Picker Overlay
    pickerTop: 126,
    pickerMarginX: 16,
    pickerItemH: 46,

    // Many to One
    switchDeviceEyebrowH: 20,
    switchDeviceSelectorH: 40,
    switchDeviceMarginBottom: 10,
    deviceInfoH: 40,
    deviceInfoMarginBottom: 10,
    outputLabelW: 140,
    outputLabelH: 30,
    inputsHeaderH: 18,
    inputsHeaderMarginBottom: 6,
    inputRowH: 48,
    inputRowGap: 6,
    inputRowPadX: 8,
    inputRowCheckSize: 22,
    inputRowIconSize: 36,
    inputRowCmdW: 90,
    inputRowSendW: 70,

    // AVoIP
    avoipEyebrowH: 0,
    avoipBtnsH: 38,
    avoipBtnsGap: 0,
    avoipBtnsMarginBottom: 8,
    avoipColGap: 16,
    avoipSourceEyebrowH: 18,
    encoderRowH: 44,
    encoderRowGap: 6,
    encoderRowPadX: 8,
    encoderRowCheckSize: 18,
    encoderRowIconSize: 34,
    encoderRowSrcW: 50,
    encoderMarginBottom: 0,
    avoipDisplayEyebrowH: 18,
    decoderRowH: 44,
    decoderRowGap: 6,
    decoderRowPadX: 8,
    decoderRowCheckSize: 18,
    decoderRowDisW: 50,
    routeSectionMarginTop: 14,
    routeInputH: 42,
    routeBtnW: 90,
    toastBottom: 28,
    toastBottomNoNav: 28,
  },
} as const;

const layoutFor = (
  device: 'phone' | 'tablet',
  options?: ActivitiesSwitchRegionOptions
) => {
  const viewport = VIEWPORT[device];
  const isTablet = device === 'tablet';
  const c = isTablet
    ? ACTIVITIES_SWITCH_LAYOUT.tablet
    : ACTIVITIES_SWITCH_LAYOUT.phone;
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

  // Switch Type Row
  const switchTypeEyebrowY = scrollAreaY + 4;
  const switchTypeSelectorY = switchTypeEyebrowY + c.switchTypeEyebrowH;

  // Dropdown Picker Overlay
  const pickerX = contentX + c.pickerMarginX;
  const pickerY = c.pickerTop;
  const pickerW = contentW - c.pickerMarginX * 2;

  // Many-to-One View
  const switchDeviceEyebrowY =
    switchTypeSelectorY + c.switchTypeSelectorH + c.switchTypeMarginBottom;
  const switchDeviceSelectorY =
    switchDeviceEyebrowY + c.switchDeviceEyebrowH;
  const deviceInfoY =
    switchDeviceSelectorY +
    c.switchDeviceSelectorH +
    c.switchDeviceMarginBottom;
  const outputLabelX = selectorX + selectorW - 2 - c.outputLabelW;
  const outputLabelY = deviceInfoY + (isTablet ? 18 : 14);
  const inputsHeaderY = deviceInfoY + c.deviceInfoH + (isTablet ? 4 : 2);
  const inputsListY =
    inputsHeaderY + c.inputsHeaderH + c.inputsHeaderMarginBottom;
  const inputsListX = selectorX;
  const inputsListW = selectorW;
  const inputRowsCount =
    options?.inputRows?.length ??
    options?.inputRowsCount ??
    DEFAULT_MANY_TO_ONE_INPUTS.length;
  const inputsListH =
    inputRowsCount > 0
      ? inputRowsCount * c.inputRowH + (inputRowsCount - 1) * c.inputRowGap
      : 0;

  // AVoIP View
  const avoipEyebrowY =
    switchTypeSelectorY + c.switchTypeSelectorH + c.switchTypeMarginBottom;
  const avoipBtnsY = avoipEyebrowY + c.avoipEyebrowH;

  // AVoIP Tablet side-by-side columns
  const avoipColW = isTablet ? (selectorW - c.avoipColGap) / 2 : selectorW;
  const encodersColX = selectorX;
  const decodersColX = isTablet
    ? selectorX + avoipColW + c.avoipColGap
    : selectorX;

  const encodersBtnY = isTablet ? switchDeviceEyebrowY : avoipBtnsY;
  const decodersBtnY = encodersBtnY;

  const encodersEyebrowY = isTablet
    ? encodersBtnY + c.avoipBtnsH + c.avoipBtnsMarginBottom + 2
    : avoipBtnsY + c.avoipBtnsH + c.avoipBtnsMarginBottom + 5;
  const decodersEyebrowY = isTablet ? encodersEyebrowY : 0; // computed dynamically on phone below

  const encodersListY = encodersEyebrowY + c.avoipSourceEyebrowH + 2;
  const encodersListW = avoipColW;
  const encodersCount =
    options?.encoders?.length ??
    options?.encodersCount ??
    DEFAULT_AVOIP_ENCODERS.length;
  const encodersListH =
    encodersCount > 0
      ? encodersCount * c.encoderRowH + (encodersCount - 1) * c.encoderRowGap
      : 0;

  // Phone AVoIP: Decoders follow encoders list
  const phoneDecodersEyebrowY =
    encodersListY +
    encodersListH +
    ACTIVITIES_SWITCH_LAYOUT.phone.encoderMarginBottom +
    4;
  const phoneDecodersListY =
    phoneDecodersEyebrowY +
    ACTIVITIES_SWITCH_LAYOUT.phone.avoipDisplayEyebrowH;

  const decodersListY = isTablet ? encodersListY : phoneDecodersListY;
  const decodersListW = avoipColW;
  const decodersCount =
    options?.decoders?.length ??
    options?.decodersCount ??
    DEFAULT_AVOIP_DECODERS.length;
  const decodersListH =
    decodersCount > 0
      ? decodersCount * c.decoderRowH + (decodersCount - 1) * c.decoderRowGap
      : 0;

  // Tablet AVoIP Routing Controls
  const routeSectionY = isTablet
    ? Math.max(encodersListY + encodersListH, decodersListY + decodersListH) +
      c.routeSectionMarginTop
    : 0;

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
    switchTypeEyebrowY,
    switchTypeSelectorY,
    pickerX,
    pickerY,
    pickerW,
    switchDeviceEyebrowY,
    switchDeviceSelectorY,
    deviceInfoY,
    outputLabelX,
    outputLabelY,
    inputsHeaderY,
    inputsListX,
    inputsListY,
    inputsListW,
    inputsListH,
    avoipEyebrowY,
    avoipBtnsY,
    avoipColW,
    encodersColX,
    decodersColX,
    encodersBtnY,
    decodersBtnY,
    encodersEyebrowY,
    decodersEyebrowY,
    encodersListY,
    encodersListW,
    encodersListH,
    phoneDecodersEyebrowY,
    decodersListY,
    decodersListW,
    decodersListH,
    routeSectionY,
    toastY,
  };
};

/**
 * Named regions for <Camera> and annotations in ActivitiesSwitch's coordinate space.
 * Follows connectionRegions(device): derived from layoutFor(device).
 */
export const activitiesSwitchRegions = (
  device: 'phone' | 'tablet',
  options?: ActivitiesSwitchRegionOptions
) => {
  const l = layoutFor(device, options);
  const isTablet = l.isTablet;
  const isAvoip = options?.switchType === 'avoip';

  const tabIndex = (tab: ActivitiesTab | number): number => {
    if (typeof tab === 'number') return tab;
    if (tab === 'switch') return 1;
    if (tab === 'audio') return 2;
    return 0;
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

    // --- Switch Type Selector ---
    /** Eyebrow label: "SWITCH TYPE" */
    switchTypeEyebrow: {
      x: l.selectorX,
      y: l.switchTypeEyebrowY,
      width: l.selectorW,
      height: l.c.switchTypeEyebrowH,
    },

    /** The mode selector split button container */
    switchTypeSelector: {
      x: l.selectorX,
      y: l.switchTypeSelectorY,
      width: l.selectorW,
      height: l.c.switchTypeSelectorH,
    },

    /** The left label button of the switch type selector */
    switchTypeButton: {
      x: l.selectorX,
      y: l.switchTypeSelectorY,
      width: l.selectorW - l.c.switchTypeDropdownArrowW,
      height: l.c.switchTypeSelectorH,
    },

    /** The right dropdown arrow of the switch type selector */
    switchTypeArrow: {
      x: l.selectorX + l.selectorW - l.c.switchTypeDropdownArrowW,
      y: l.switchTypeSelectorY,
      width: l.c.switchTypeDropdownArrowW,
      height: l.c.switchTypeSelectorH,
    },

    /** The dropdown picker overlay when open */
    switchTypePicker: {
      x: l.pickerX,
      y: l.pickerY,
      width: l.pickerW,
      height: l.c.pickerItemH * 3,
    },

    /** Individual option in the switch type dropdown */
    switchTypeOption: (typeOrIndex: SwitchType | number) => {
      const idx =
        typeof typeOrIndex === 'number'
          ? typeOrIndex
          : typeOrIndex === 'many_to_many'
            ? 1
            : typeOrIndex === 'avoip'
              ? 2
              : 0;
      return {
        x: l.pickerX,
        y: l.pickerY + idx * l.c.pickerItemH,
        width: l.pickerW,
        height: l.c.pickerItemH,
      };
    },

    /** Convenient alias for AVoIP option */
    switchTypeOptionAvoip: {
      x: l.pickerX,
      y: l.pickerY + 2 * l.c.pickerItemH,
      width: l.pickerW,
      height: l.c.pickerItemH,
    },

    // --- Many to One View ---
    /** Eyebrow label: "SWITCH DEVICE" */
    switchDeviceEyebrow: {
      x: l.selectorX,
      y: l.switchDeviceEyebrowY,
      width: l.selectorW,
      height: l.c.switchDeviceEyebrowH,
    },

    /** Switch Device split button container */
    switchDeviceSelector: {
      x: l.selectorX,
      y: l.switchDeviceSelectorY,
      width: l.selectorW,
      height: l.c.switchDeviceSelectorH,
    },

    /** Device name and IP header row */
    deviceInfo: {
      x: l.selectorX,
      y: l.deviceInfoY,
      width: l.selectorW - l.c.outputLabelW - 10,
      height: l.c.deviceInfoH,
    },

    /** Output label text input field */
    outputLabel: {
      x: l.outputLabelX,
      y: l.outputLabelY,
      width: l.c.outputLabelW,
      height: l.c.outputLabelH,
    },

    /** Output label control container (label + input box) */
    outputLabelControl: {
      x: l.outputLabelX,
      y: l.deviceInfoY,
      width: l.c.outputLabelW,
      height: l.c.deviceInfoH,
    },

    /** Inputs table header */
    inputsHeader: {
      x: l.inputsListX,
      y: l.inputsHeaderY,
      width: l.inputsListW,
      height: l.c.inputsHeaderH,
    },

    /** Inputs list container */
    inputsList: {
      x: l.inputsListX,
      y: l.inputsListY,
      width: l.inputsListW,
      height: l.inputsListH,
    },

    /** Input row card by index */
    inputRow: (index = 0) => ({
      x: l.inputsListX,
      y: l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap),
      width: l.inputsListW,
      height: l.c.inputRowH,
    }),

    /** Input number index within row */
    inputNumber: (index = 0) => {
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      const numW = isTablet ? 24 : 20;
      return {
        x: l.inputsListX + l.c.inputRowPadX,
        y: rowY,
        width: numW,
        height: l.c.inputRowH,
      };
    },

    /** Input enable checkbox */
    inputCheckbox: (index = 0) => {
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      const numW = isTablet ? 24 : 20;
      const gap = isTablet ? 8 : 6;
      return {
        x: l.inputsListX + l.c.inputRowPadX + numW + gap,
        y: rowY + (l.c.inputRowH - l.c.inputRowCheckSize) / 2,
        width: l.c.inputRowCheckSize,
        height: l.c.inputRowCheckSize,
      };
    },

    /** Input HDMI icon card */
    inputIcon: (index = 0) => {
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      const numW = isTablet ? 24 : 20;
      const gap = isTablet ? 8 : 6;
      const iconX =
        l.inputsListX + l.c.inputRowPadX + numW + gap + l.c.inputRowCheckSize + gap;
      return {
        x: iconX,
        y: rowY + (l.c.inputRowH - l.c.inputRowIconSize) / 2,
        width: l.c.inputRowIconSize,
        height: l.c.inputRowIconSize,
      };
    },

    /** Input label card */
    inputLabel: (index = 0) => {
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      const numW = isTablet ? 24 : 20;
      const gap = isTablet ? 8 : 6;
      const iconX =
        l.inputsListX + l.c.inputRowPadX + numW + gap + l.c.inputRowCheckSize + gap;
      const labelX = iconX + l.c.inputRowIconSize + gap;
      const rightW =
        l.c.inputRowCmdW + gap + l.c.inputRowSendW + l.c.inputRowPadX;
      const labelW = l.inputsListW - (labelX - l.inputsListX) - rightW;
      return {
        x: labelX,
        y: rowY + (l.c.inputRowH - l.c.inputRowIconSize) / 2,
        width: labelW,
        height: l.c.inputRowIconSize,
      };
    },

    /** Combined icon and label control for input row */
    inputIconAndLabel: (index = 0) => {
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      const numW = isTablet ? 24 : 20;
      const gap = isTablet ? 8 : 6;
      const iconX =
        l.inputsListX + l.c.inputRowPadX + numW + gap + l.c.inputRowCheckSize + gap;
      const rightW =
        l.c.inputRowCmdW + gap + l.c.inputRowSendW + l.c.inputRowPadX;
      const spanW = l.inputsListW - (iconX - l.inputsListX) - rightW;
      return {
        x: iconX,
        y: rowY + (l.c.inputRowH - l.c.inputRowIconSize) / 2,
        width: spanW,
        height: l.c.inputRowIconSize,
      };
    },

    /** Input command display card */
    inputCommand: (index = 0) => {
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      const gap = isTablet ? 8 : 6;
      const cmdX =
        l.inputsListX +
        l.inputsListW -
        l.c.inputRowPadX -
        l.c.inputRowSendW -
        gap -
        l.c.inputRowCmdW;
      return {
        x: cmdX,
        y: rowY + (l.c.inputRowH - l.c.inputRowIconSize) / 2,
        width: l.c.inputRowCmdW,
        height: l.c.inputRowIconSize,
      };
    },

    /** Input SEND button */
    inputSend: (index = 0) => {
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      return {
        x: l.inputsListX + l.inputsListW - l.c.inputRowPadX - l.c.inputRowSendW,
        y: rowY + (l.c.inputRowH - l.c.inputRowIconSize) / 2,
        width: l.c.inputRowSendW,
        height: l.c.inputRowIconSize,
      };
    },

    // --- AVoIP View ---
    /** Encoders + split button */
    encodersButton: {
      x: l.encodersColX,
      y: l.encodersBtnY,
      width: isTablet ? l.avoipColW : (l.selectorW - l.c.avoipBtnsGap) / 2,
      height: l.c.avoipBtnsH,
    },

    /** Decoders + split button */
    decodersButton: {
      x: isTablet
        ? l.decodersColX
        : l.selectorX + (l.selectorW - l.c.avoipBtnsGap) / 2 + l.c.avoipBtnsGap,
      y: l.decodersBtnY,
      width: isTablet ? l.avoipColW : (l.selectorW - l.c.avoipBtnsGap) / 2,
      height: l.c.avoipBtnsH,
    },

    /** Encoders eyebrow label ("SOURCE") */
    encodersEyebrow: {
      x: l.encodersColX,
      y: l.encodersEyebrowY,
      width: l.avoipColW,
      height: l.c.avoipSourceEyebrowH,
    },

    /** Encoders list container */
    encodersList: {
      x: l.encodersColX,
      y: l.encodersListY,
      width: l.encodersListW,
      height: l.encodersListH,
    },

    /** Encoder row by index */
    encoderRow: (index = 0) => ({
      x: l.encodersColX,
      y: l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap),
      width: l.encodersListW,
      height: l.c.encoderRowH,
    }),

    /** Encoder number index */
    encoderNumber: (index = 0) => {
      const rowY =
        l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap);
      return {
        x: l.encodersColX + l.c.encoderRowPadX,
        y: rowY,
        width: 16,
        height: l.c.encoderRowH,
      };
    },

    /** Encoder enable checkbox */
    encoderCheckbox: (index = 0) => {
      const rowY =
        l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap);
      return {
        x: l.encodersColX + l.c.encoderRowPadX + 16 + 8,
        y: rowY + (l.c.encoderRowH - l.c.encoderRowCheckSize) / 2,
        width: l.c.encoderRowCheckSize,
        height: l.c.encoderRowCheckSize,
      };
    },

    /** Encoder HDMI icon card */
    encoderIcon: (index = 0) => {
      const rowY =
        l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap);
      const iconX =
        l.encodersColX +
        l.c.encoderRowPadX +
        16 +
        8 +
        l.c.encoderRowCheckSize +
        8;
      return {
        x: iconX,
        y: rowY + (l.c.encoderRowH - l.c.encoderRowIconSize) / 2,
        width: l.c.encoderRowIconSize,
        height: l.c.encoderRowIconSize,
      };
    },

    /** Encoder label card */
    encoderLabel: (index = 0) => {
      const rowY =
        l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap);
      const iconX =
        l.encodersColX +
        l.c.encoderRowPadX +
        16 +
        8 +
        l.c.encoderRowCheckSize +
        8;
      const labelX = iconX + l.c.encoderRowIconSize + 8;
      const labelW =
        l.encodersListW -
        (labelX - l.encodersColX) -
        l.c.encoderRowSrcW -
        8 -
        l.c.encoderRowPadX;
      return {
        x: labelX,
        y: rowY + (l.c.encoderRowH - l.c.encoderRowIconSize) / 2,
        width: labelW,
        height: l.c.encoderRowIconSize,
      };
    },

    /** Combined icon and label control for encoder row (ringed in matrox-switch) */
    encoderIconAndLabel: (index = 0) => {
      const rowY =
        l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap);
      const iconX =
        l.encodersColX +
        l.c.encoderRowPadX +
        16 +
        8 +
        l.c.encoderRowCheckSize +
        8;
      const spanW =
        l.encodersListW -
        (iconX - l.encodersColX) -
        l.c.encoderRowSrcW -
        8 -
        l.c.encoderRowPadX;
      return {
        x: iconX,
        y: rowY + (l.c.encoderRowH - l.c.encoderRowIconSize) / 2,
        width: spanW,
        height: l.c.encoderRowIconSize,
      };
    },

    /** Encoder SRC button */
    encoderSrc: (index = 0) => {
      const rowY =
        l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap);
      return {
        x:
          l.encodersColX +
          l.encodersListW -
          l.c.encoderRowPadX -
          l.c.encoderRowSrcW,
        y: rowY + (l.c.encoderRowH - l.c.encoderRowIconSize) / 2,
        width: l.c.encoderRowSrcW,
        height: l.c.encoderRowIconSize,
      };
    },

    /** Decoders eyebrow label ("DISPLAY") */
    decodersEyebrow: {
      x: l.decodersColX,
      y: isTablet ? l.decodersEyebrowY : l.phoneDecodersEyebrowY,
      width: l.avoipColW,
      height: l.c.avoipDisplayEyebrowH,
    },

    /** Decoders list container */
    decodersList: {
      x: l.decodersColX,
      y: l.decodersListY,
      width: l.decodersListW,
      height: l.decodersListH,
    },

    /** Decoder row by index */
    decoderRow: (index = 0) => ({
      x: l.decodersColX,
      y: l.decodersListY + index * (l.c.decoderRowH + l.c.decoderRowGap),
      width: l.decodersListW,
      height: l.c.decoderRowH,
    }),

    /** Decoder number index */
    decoderNumber: (index = 0) => {
      const rowY =
        l.decodersListY + index * (l.c.decoderRowH + l.c.decoderRowGap);
      return {
        x: l.decodersColX + l.c.decoderRowPadX,
        y: rowY,
        width: 16,
        height: l.c.decoderRowH,
      };
    },

    /** Decoder enable checkbox */
    decoderCheckbox: (index = 0) => {
      const rowY =
        l.decodersListY + index * (l.c.decoderRowH + l.c.decoderRowGap);
      return {
        x: l.decodersColX + l.c.decoderRowPadX + 16 + 8,
        y: rowY + (l.c.decoderRowH - l.c.decoderRowCheckSize) / 2,
        width: l.c.decoderRowCheckSize,
        height: l.c.decoderRowCheckSize,
      };
    },

    /** Decoder label card */
    decoderLabel: (index = 0) => {
      const rowY =
        l.decodersListY + index * (l.c.decoderRowH + l.c.decoderRowGap);
      const labelX =
        l.decodersColX +
        l.c.decoderRowPadX +
        16 +
        8 +
        l.c.decoderRowCheckSize +
        8;
      const labelW =
        l.decodersListW -
        (labelX - l.decodersColX) -
        l.c.decoderRowDisW -
        8 -
        l.c.decoderRowPadX;
      return {
        x: labelX,
        y: rowY + (l.c.decoderRowH - 34) / 2,
        width: labelW,
        height: isTablet ? 34 : 38,
      };
    },

    /** Decoder DIS button */
    decoderDis: (index = 0) => {
      const rowY =
        l.decodersListY + index * (l.c.decoderRowH + l.c.decoderRowGap);
      return {
        x:
          l.decodersColX +
          l.decodersListW -
          l.c.decoderRowPadX -
          l.c.decoderRowDisW,
        y: rowY + (l.c.decoderRowH - 34) / 2,
        width: l.c.decoderRowDisW,
        height: isTablet ? 34 : 38,
      };
    },

    /** Tablet bottom routing section */
    routeSection: isTablet
      ? {
          x: l.selectorX,
          y: l.routeSectionY,
          width: l.selectorW,
          height: 80,
        }
      : {x: 0, y: 0, width: 0, height: 0},

    /** Tablet route input display */
    routeSourceInput: isTablet
      ? {
          x: l.selectorX,
          y: l.routeSectionY + 24,
          width: l.selectorW - l.c.routeBtnW - 8,
          height: l.c.routeInputH,
        }
      : {x: 0, y: 0, width: 0, height: 0},

    /** Tablet ROUTE button */
    routeButton: isTablet
      ? {
          x: l.selectorX + l.selectorW - l.c.routeBtnW,
          y: l.routeSectionY + 24,
          width: l.c.routeBtnW,
          height: l.c.routeInputH,
        }
      : {x: 0, y: 0, width: 0, height: 0},

    /**
     * Target for "icon and label control" from the brief shot list:
     * in avoip mode: encoderIconAndLabel(index)
     * in many_to_one mode: inputIconAndLabel(index)
     */
    iconAndLabelControl: (index = 0) => {
      if (isAvoip) {
        const rowY =
          l.encodersListY + index * (l.c.encoderRowH + l.c.encoderRowGap);
        const iconX =
          l.encodersColX +
          l.c.encoderRowPadX +
          16 +
          8 +
          l.c.encoderRowCheckSize +
          8;
        const spanW =
          l.encodersListW -
          (iconX - l.encodersColX) -
          l.c.encoderRowSrcW -
          8 -
          l.c.encoderRowPadX;
        return {
          x: iconX,
          y: rowY + (l.c.encoderRowH - l.c.encoderRowIconSize) / 2,
          width: spanW,
          height: l.c.encoderRowIconSize,
        };
      }
      const rowY = l.inputsListY + index * (l.c.inputRowH + l.c.inputRowGap);
      const numW = isTablet ? 24 : 20;
      const gap = isTablet ? 8 : 6;
      const iconX =
        l.inputsListX +
        l.c.inputRowPadX +
        numW +
        gap +
        l.c.inputRowCheckSize +
        gap;
      const rightW =
        l.c.inputRowCmdW + gap + l.c.inputRowSendW + l.c.inputRowPadX;
      const spanW = l.inputsListW - (iconX - l.inputsListX) - rightW;
      return {
        x: iconX,
        y: rowY + (l.c.inputRowH - l.c.inputRowIconSize) / 2,
        width: spanW,
        height: l.c.inputRowIconSize,
      };
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

export const switchRegions = activitiesSwitchRegions;
export const switchingRegions = activitiesSwitchRegions;

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

  const l = layoutFor(device, {
    switchType,
    switchTypePickerOpen,
    inputRows,
    encoders,
    decoders,
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
              padding: `4px ${l.c.padX}px 20px`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Eyebrow: SWITCH TYPE */}
            <div
              style={{
                fontSize: 11,
                color: appColors.gray50,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '4px 2px 4px',
              }}
            >
              SWITCH TYPE
            </div>

            {/* Mode Selector Split Button */}
            <div
              style={{
                display: 'flex',
                height: l.c.switchTypeSelectorH,
                marginBottom: l.c.switchTypeMarginBottom,
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
                {switchTypeLabel}
              </div>
              <div
                style={{
                  width: l.c.switchTypeDropdownArrowW,
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
              /* Tablet AVoIP View: Encoders and Decoders Side by Side (Reference f_0043.jpg) */
              <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                {/* Two Columns Side by Side */}
                <div style={{display: 'flex', gap: l.c.avoipColGap, flex: 1}}>
                  {/* Left Column: Encoders */}
                  <div
                    style={{flex: 1, display: 'flex', flexDirection: 'column'}}
                  >
                    {/* Encoders Split Button */}
                    <div
                      style={{
                        display: 'flex',
                        height: l.c.avoipBtnsH,
                        marginBottom: l.c.avoipBtnsMarginBottom,
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
                          justifyContent: 'center',
                          color: appColors.white,
                          fontSize: 12.5,
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

                    {/* Eyebrow: SOURCE */}
                    <div
                      style={{
                        fontSize: 10.5,
                        color: appColors.gray50,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        margin: '2px 2px 6px',
                      }}
                    >
                      SOURCE
                    </div>

                    {/* Encoders List */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: l.c.encoderRowGap,
                      }}
                    >
                      {encoders.map((enc) => (
                        <div
                          key={enc.num}
                          style={{
                            height: l.c.encoderRowH,
                            backgroundColor: '#1C1C1C',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            padding: `0 ${l.c.encoderRowPadX}px`,
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
                              width: l.c.encoderRowCheckSize,
                              height: l.c.encoderRowCheckSize,
                              backgroundColor: enc.enabled
                                ? appColors.blue
                                : appColors.gray25,
                              borderRadius: 3,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {enc.enabled ? (
                              <svg
                                width={12}
                                height={12}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
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
                          {/* HDMI Icon Box */}
                          <div
                            style={{
                              width: l.c.encoderRowIconSize,
                              height: l.c.encoderRowIconSize,
                              backgroundColor: '#2A2A2A',
                              borderRadius: 4,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <AppIcon
                              name="ic_hdmi_icon"
                              size={22}
                              tint={appColors.white}
                            />
                          </div>
                          {/* Label */}
                          <div
                            style={{
                              flex: 1,
                              height: 34,
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
                            {enc.name} Tx 239.100.4{enc.num}.1
                          </div>
                          {/* SRC Button */}
                          <div
                            style={{
                              width: l.c.encoderRowSrcW,
                              height: 34,
                              backgroundColor: enc.active
                                ? appColors.blue
                                : '#2A2A2A',
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
                  </div>

                  {/* Right Column: Decoders */}
                  <div
                    style={{flex: 1, display: 'flex', flexDirection: 'column'}}
                  >
                    {/* Decoders Split Button */}
                    <div
                      style={{
                        display: 'flex',
                        height: l.c.avoipBtnsH,
                        marginBottom: l.c.avoipBtnsMarginBottom,
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
                          justifyContent: 'center',
                          color: appColors.white,
                          fontSize: 12.5,
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

                    {/* Eyebrow: DISPLAY */}
                    <div
                      style={{
                        fontSize: 10.5,
                        color: appColors.gray50,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        margin: '2px 2px 6px',
                      }}
                    >
                      DISPLAY
                    </div>

                    {/* Decoders List */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: l.c.decoderRowGap,
                      }}
                    >
                      {decoders.map((dec) => (
                        <div
                          key={dec.num}
                          style={{
                            height: l.c.decoderRowH,
                            backgroundColor: '#1C1C1C',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            padding: `0 ${l.c.decoderRowPadX}px`,
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
                              width: l.c.decoderRowCheckSize,
                              height: l.c.decoderRowCheckSize,
                              backgroundColor: dec.enabled
                                ? appColors.blue
                                : appColors.gray25,
                              borderRadius: 3,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {dec.enabled ? (
                              <svg
                                width={12}
                                height={12}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
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
                              height: 34,
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
                          {/* DIS Button (Green in f_0043.jpg) */}
                          <div
                            style={{
                              width: l.c.decoderRowDisW,
                              height: 34,
                              backgroundColor: '#43A047',
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
                  </div>
                </div>

                {/* Bottom Routing Controls (Reference f_0043.jpg) */}
                <div
                  style={{
                    marginTop: l.c.routeSectionMarginTop,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div style={{fontSize: 11, color: appColors.gray50}}>
                    Select a source and a display, then route.
                  </div>
                  <div style={{display: 'flex', gap: 8, height: l.c.routeInputH}}>
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: '#1E1E1E',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 14px',
                        color: appColors.white,
                        fontSize: 13,
                        fontFamily: font.mono,
                      }}
                    >
                      Tx 239.100.41.1
                    </div>
                    <div
                      style={{
                        width: l.c.routeBtnW,
                        backgroundColor: appColors.gray25,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: appColors.white,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ROUTE
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: 11,
                      color: appColors.gray50,
                      marginTop: 4,
                    }}
                  >
                    Loading...
                  </div>
                </div>
              </div>
            ) : (
              /* Tablet Many-to-One View */
              <>
                {/* Eyebrow: SWITCH DEVICE */}
                <div
                  style={{
                    fontSize: 11,
                    color: appColors.gray50,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: '4px 2px 4px',
                  }}
                >
                  SWITCH DEVICE
                </div>

                {/* Switch Device Split Button */}
                <div
                  style={{
                    display: 'flex',
                    height: l.c.switchDeviceSelectorH,
                    marginBottom: l.c.switchDeviceMarginBottom,
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
                      width: l.c.switchTypeDropdownArrowW,
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
                    padding: '4px 2px 10px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: appColors.white,
                      }}
                    >
                      {deviceName}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: appColors.gray50,
                        fontFamily: font.mono,
                        marginTop: 2,
                      }}
                    >
                      IP {deviceIp}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9.5,
                        color: appColors.gray50,
                        letterSpacing: '0.06em',
                        marginBottom: 2,
                      }}
                    >
                      OUTPUT LABEL
                    </span>
                    <div
                      style={{
                        width: l.c.outputLabelW,
                        height: l.c.outputLabelH,
                        backgroundColor: appColors.white,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 8px',
                        fontSize: 12,
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
                    marginBottom: l.c.inputsHeaderMarginBottom,
                    fontSize: 11,
                    color: appColors.gray50,
                  }}
                >
                  <span style={{width: 28, textAlign: 'center'}}>#</span>
                  <span style={{width: 50, textAlign: 'center'}}>Enable</span>
                  <span style={{width: 50, textAlign: 'center'}}>Icon</span>
                  <span style={{flex: 1, paddingLeft: 8}}>Label</span>
                  <span style={{width: 90, textAlign: 'center'}}>Command</span>
                  <span style={{width: 70}} />
                </div>

                {/* Inputs Table Rows */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: l.c.inputRowGap,
                  }}
                >
                  {inputRows.map((row) => (
                    <div
                      key={row.num}
                      style={{
                        height: l.c.inputRowH,
                        backgroundColor: '#1C1C1C',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        padding: `0 ${l.c.inputRowPadX}px`,
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          fontSize: 12,
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
                          width: l.c.inputRowCheckSize,
                          height: l.c.inputRowCheckSize,
                          backgroundColor: row.enabled
                            ? appColors.blue
                            : appColors.gray25,
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {row.enabled ? (
                          <svg
                            width={14}
                            height={14}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
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
                      {/* Icon */}
                      <div
                        style={{
                          width: l.c.inputRowIconSize,
                          height: l.c.inputRowIconSize,
                          backgroundColor: '#2A2A2A',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <AppIcon
                          name="ic_hdmi_icon"
                          size={22}
                          tint={appColors.white}
                        />
                      </div>
                      {/* Label */}
                      <div
                        style={{
                          flex: 1,
                          height: 36,
                          backgroundColor: '#2A2A2A',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 10px',
                          color: appColors.white,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {row.label}
                      </div>
                      {/* Command Button */}
                      <div
                        style={{
                          width: l.c.inputRowCmdW,
                          height: 36,
                          backgroundColor: '#2A2A2A',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: appColors.white75,
                          fontSize: 10.5,
                          fontFamily: font.mono,
                        }}
                      >
                        {row.command}
                      </div>
                      {/* SEND Button */}
                      <div
                        style={{
                          width: l.c.inputRowSendW,
                          height: 36,
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
            height: l.c.switchTypeSelectorH,
            marginBottom: l.c.switchTypeMarginBottom,
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
              width: l.c.switchTypeDropdownArrowW,
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
            <div
              style={{
                display: 'flex',
                gap: l.c.avoipBtnsGap,
                marginBottom: l.c.avoipBtnsMarginBottom,
              }}
            >
              {/* Encoders Split Button */}
              <div style={{flex: 1, display: 'flex', height: l.c.avoipBtnsH}}>
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
              <div style={{flex: 1, display: 'flex', height: l.c.avoipBtnsH}}>
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: l.c.encoderRowGap,
                marginBottom: l.c.encoderMarginBottom,
              }}
            >
              {encoders.map((enc) => (
                <div
                  key={enc.num}
                  style={{
                    height: l.c.encoderRowH,
                    backgroundColor: '#1C1C1C',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    padding: `0 ${l.c.encoderRowPadX}px`,
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
                      width: l.c.encoderRowCheckSize,
                      height: l.c.encoderRowCheckSize,
                      backgroundColor: enc.enabled
                        ? appColors.blue
                        : appColors.gray25,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {enc.enabled ? (
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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
                      width: l.c.encoderRowIconSize,
                      height: l.c.encoderRowIconSize,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AppIcon
                      name="ic_hdmi_icon"
                      size={24}
                      tint={appColors.white}
                    />
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
                      width: l.c.encoderRowSrcW,
                      height: 38,
                      backgroundColor: enc.active
                        ? appColors.blue
                        : '#2A2A2A',
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: l.c.decoderRowGap,
              }}
            >
              {decoders.map((dec) => (
                <div
                  key={dec.num}
                  style={{
                    height: l.c.decoderRowH,
                    backgroundColor: '#1C1C1C',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    padding: `0 ${l.c.decoderRowPadX}px`,
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
                      width: l.c.decoderRowCheckSize,
                      height: l.c.decoderRowCheckSize,
                      backgroundColor: dec.enabled
                        ? appColors.blue
                        : appColors.gray25,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {dec.enabled ? (
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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
                      width: l.c.decoderRowDisW,
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
            <div
              style={{
                display: 'flex',
                height: l.c.switchDeviceSelectorH,
                marginBottom: l.c.switchDeviceMarginBottom,
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
                  width: l.c.switchTypeDropdownArrowW,
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
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: appColors.white,
                  }}
                >
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
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
                    width: l.c.outputLabelW,
                    height: l.c.outputLabelH,
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
                marginBottom: l.c.inputsHeaderMarginBottom,
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: l.c.inputRowGap,
              }}
            >
              {inputRows.map((row) => (
                <div
                  key={row.num}
                  style={{
                    height: l.c.inputRowH,
                    backgroundColor: '#1C1C1C',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    padding: `0 ${l.c.inputRowPadX}px`,
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
                      width: l.c.inputRowCheckSize,
                      height: l.c.inputRowCheckSize,
                      backgroundColor: row.enabled
                        ? appColors.blue
                        : appColors.gray25,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {row.enabled ? (
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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
                      width: l.c.inputRowIconSize,
                      height: l.c.inputRowIconSize,
                      backgroundColor: '#2A2A2A',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AppIcon
                      name="ic_hdmi_icon"
                      size={24}
                      tint={appColors.white}
                    />
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
                      width: l.c.inputRowCmdW,
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
                      width: l.c.inputRowSendW,
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
            top: l.pickerY,
            left: l.pickerX,
            right: l.pickerX,
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
                height: l.c.pickerItemH,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                color: appColors.white,
                fontSize: 12.5,
                fontWeight: item.id === switchType ? 700 : 400,
                borderBottom:
                  idx < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                backgroundColor:
                  item.id === switchType
                    ? 'rgba(0,144,255,0.1)'
                    : 'transparent',
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
