// The First-Run Education tour and walkthrough card, rebuilt as live React.
//
// Derived from:
//   res/layout/dialog_first_run_education.xml   first_run_dialog_background (#292929),
//                                               iv_dialog_header_icon, tv_dialog_title,
//                                               tv_dialog_body
//   Reference frames: f_0003.jpg - f_0007.jpg   walkthrough card over setup screen,
//                                               step forward, close ✕ button
//
// The card steps forward over the setup screen (CtrlbotAi + PhoneNavMenu), then its
// top-right ✕ closes it, revealing the setup menus underneath.

import React from 'react';
import {AppIcon} from './AppIcon';
import {CtrlbotAi, aiRegions} from './CtrlbotAi';
import {PhoneNavMenu, navRegions} from './PhoneNavMenu';
import {TABLET_NAV_WIDTH, tabletNavRegions} from './TabletNavRail';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';

export type FirstRunStep = {
  eyebrow: string;
  title: string;
  body: string;
  tag: string;
};

export const FIRST_RUN_STEPS: FirstRunStep[] = [
  {
    eyebrow: 'QUICK START',
    title: 'CONTROL YOUR\nFIRST ROOM',
    body: 'No processor, no laptop, no software. So easy.\nProgram it with your thumbs.',
    tag: 'PHONE · 2 MINUTES',
  },
  {
    eyebrow: 'QUICK START · STEP 2',
    title: 'NAVIGATE\nSETUP MENUS',
    body: 'CTRLbot for help, Device for drivers, Connect for equipment, Set for everything else.',
    tag: 'PHONE · 2 MINUTES',
  },
];

export type FirstRunEducationProps = {
  device?: 'phone' | 'tablet';
  /** 1-based step index (1 = first room card, 2 = setup menu card, 3+ = dismissed). Default 1. */
  step?: number;
  /** Whether the top-right ✕ close button is visible. Default true. */
  showClose?: boolean;
  /** Custom opacity for the card overlay (0..1). */
  cardOpacity?: number;
  /** Custom Y offset in dp for sliding the card. */
  cardOffsetY?: number;
};

export type FirstRunEducationRegionOptions = {
  /** 1-based step index (1 = first room card, 2 = setup menu card, 3+ = dismissed). Default 1. */
  step?: number;
  /** Custom Y offset in dp for sliding the card. Default 0. */
  cardOffsetY?: number;
  /** Custom opacity for the card overlay (0..1). Default 1. */
  cardOpacity?: number;
  /** Whether the top-right ✕ close button is visible. Default true. */
  showClose?: boolean;
};

/**
 * Derived layout metrics for FirstRunEducation, shared by the component and region maps.
 */
export const layoutFor = (
  device: 'phone' | 'tablet' = 'phone',
  options?: FirstRunEducationRegionOptions
) => {
  const isTablet = device === 'tablet';
  const viewport = VIEWPORT[device];
  const step = options?.step ?? 1;
  const cardOffsetY = options?.cardOffsetY ?? 0;
  const isDismissed = step > FIRST_RUN_STEPS.length;
  const currentStep = FIRST_RUN_STEPS[Math.max(0, Math.min(step - 1, FIRST_RUN_STEPS.length - 1))];

  // Card geometry (1px border sits inside the border-box, so content starts 1px in)
  const border = 1;
  const cardTop = (isTablet ? 190 : 210) + cardOffsetY;
  const cardW = isTablet ? 480 : viewport.width - 48; // phone: 360 - 48 = 312
  const cardX = isTablet ? (viewport.width - cardW) / 2 : 24; // tablet: (1280 - 480) / 2 = 400
  const padX = isTablet ? 24 : 20;
  const padY = isTablet ? 28 : 24;
  const innerX = cardX + border + padX;
  const innerW = cardW - (border + padX) * 2; // phone: 312 - 42 = 270; tablet: 480 - 50 = 430

  // Close button geometry
  const closeSize = 36;
  const closeTop = 36;
  const closeRight = isTablet ? 36 : 22;
  const closeX = viewport.width - closeRight - closeSize; // phone: 360 - 22 - 36 = 302; tablet: 1280 - 36 - 36 = 1208
  const closeY = closeTop;

  // Flow metrics, from the rendered proofs: Montserrat's normal line box is 1.219em,
  // Space Mono's is 1.481em; the display lines set their own line-height.
  const headerIconSize = 32;
  const headerMarginBottom = 14;
  const headerY = cardTop + border + padY;
  const headerH = headerIconSize; // taller than the 18px wordmark beside it

  const eyebrowMarginBottom = 10;
  const eyebrowY = headerY + headerH + headerMarginBottom;
  const eyebrowH = 11 * 1.481;

  // Title is two lines on both steps
  const titleMarginBottom = 14;
  const titleY = eyebrowY + eyebrowH + eyebrowMarginBottom;
  const titleH = 21 * 1.24 * 2;

  // Body wraps: each paragraph is ceil(chars * 6.75 / width) lines at 13.5px Montserrat.
  // Measured: phone step 1 renders 3 lines ("So easy." wraps), tablet 2.
  const bodyMarginBottom = 20;
  const bodyY = titleY + titleH + titleMarginBottom;
  const bodyLines = currentStep.body
    .split('\n')
    .reduce((n, para) => n + Math.max(1, Math.ceil((para.length * 6.75) / innerW)), 0);
  const bodyH = 13.5 * 1.48 * bodyLines;

  // Divider + Tag
  const tagPadTop = 12;
  const tagY = bodyY + bodyH + bodyMarginBottom + 1 + tagPadTop;
  const tagH = 10.5 * 1.481;

  // Total card height, border to border
  const cardH = tagY + tagH + padY + border - cardTop;

  // Setup navigation / rail
  const railW = isTablet ? TABLET_NAV_WIDTH : 0;
  const contentX = isTablet ? TABLET_NAV_WIDTH : 0;
  const contentW = isTablet ? viewport.width - TABLET_NAV_WIDTH : viewport.width;

  return {
    viewport,
    isTablet,
    step,
    currentStep,
    isDismissed,
    cardX,
    cardTop,
    cardW,
    cardH,
    padX,
    padY,
    innerX,
    innerW,
    closeX,
    closeY,
    closeSize,
    headerY,
    headerH,
    headerIconSize,
    eyebrowY,
    eyebrowH,
    titleY,
    titleH,
    bodyY,
    bodyH,
    tagY,
    tagH,
    railW,
    contentX,
    contentW,
  };
};

/**
 * Named regions for <Camera> and annotations in FirstRunEducation's coordinate space.
 * Follows connectionRegions(device): derived from layoutFor(device).
 */
export const firstRunEducationRegions = (
  device: 'phone' | 'tablet' = 'phone',
  options?: FirstRunEducationRegionOptions
) => {
  const l = layoutFor(device, options);
  const isTablet = l.isTablet;

  return {
    full: {x: 0, y: 0, width: l.viewport.width, height: l.viewport.height},
    content: {x: l.contentX, y: 0, width: l.contentW, height: l.viewport.height},
    centreX: l.contentX + l.contentW / 2,

    /** The dim scrim behind the walkthrough card */
    scrim: {x: 0, y: 0, width: l.viewport.width, height: l.viewport.height},

    /** The walkthrough tour card */
    card: {x: l.cardX, y: l.cardTop, width: l.cardW, height: l.cardH},
    tour: {x: l.cardX, y: l.cardTop, width: l.cardW, height: l.cardH},
    tourCard: {x: l.cardX, y: l.cardTop, width: l.cardW, height: l.cardH},

    /** The close ✕ button in the top-right corner */
    closeButton: {x: l.closeX, y: l.closeY, width: l.closeSize, height: l.closeSize},
    closeX: {x: l.closeX, y: l.closeY, width: l.closeSize, height: l.closeSize},

    /** Step-specific region or card content */
    step: (stepIndex: number) => {
      const stepLayout = layoutFor(device, {...options, step: stepIndex});
      return {
        x: stepLayout.cardX,
        y: stepLayout.cardTop,
        width: stepLayout.cardW,
        height: stepLayout.cardH,
      };
    },
    steps: {x: l.cardX, y: l.cardTop, width: l.cardW, height: l.cardH},

    /** Card interior regions */
    cardHeader: {x: l.innerX, y: l.headerY, width: l.innerW, height: l.headerH},
    cardBrand: {x: l.innerX, y: l.headerY, width: l.innerW, height: l.headerH},
    cardEyebrow: {x: l.innerX, y: l.eyebrowY, width: l.innerW, height: l.eyebrowH},
    cardTitle: {x: l.innerX, y: l.titleY, width: l.innerW, height: l.titleH},
    cardBody: {x: l.innerX, y: l.bodyY, width: l.innerW, height: l.bodyH},
    cardTag: {x: l.innerX, y: l.tagY, width: l.innerW, height: l.tagH},
    tag: {x: l.innerX, y: l.tagY, width: l.innerW, height: l.tagH},

    /** Next action target — bottom action / tag area where a user taps to step forward */
    nextButton: {x: l.innerX, y: l.tagY - 6, width: l.innerW, height: l.tagH + 12},
    next: {x: l.innerX, y: l.tagY - 6, width: l.innerW, height: l.tagH + 12},

    /** Underlying setup menus */
    navMenu: isTablet ? tabletNavRegions.full : navRegions.expanded,
    navRail: tabletNavRegions.full,
    setupMenus: isTablet
      ? {
          ctrlbot: tabletNavRegions.header,
          device: tabletNavRegions.row('device'),
          connect: tabletNavRegions.row('connect'),
          set: tabletNavRegions.row('set'),
        }
      : {
          ctrlbot: navRegions.row(0),
          device: navRegions.row(1),
          connect: navRegions.row(2),
          set: navRegions.row(3),
        },
    menuRow: (menu: 'ctrlbot' | 'device' | 'connect' | 'set' | number) => {
      if (isTablet) {
        if (menu === 'ctrlbot' || menu === 0) return tabletNavRegions.header;
        if (menu === 'device' || menu === 1) return tabletNavRegions.row('device');
        if (menu === 'connect' || menu === 2) return tabletNavRegions.row('connect');
        return tabletNavRegions.row('set');
      }
      const idx =
        typeof menu === 'number'
          ? menu
          : menu === 'ctrlbot'
            ? 0
            : menu === 'device'
              ? 1
              : menu === 'connect'
                ? 2
                : 3;
      return navRegions.row(idx);
    },
    setupMenu: (menu: 'ctrlbot' | 'device' | 'connect' | 'set' | number) => {
      if (isTablet) {
        if (menu === 'ctrlbot' || menu === 0) return tabletNavRegions.header;
        if (menu === 'device' || menu === 1) return tabletNavRegions.row('device');
        if (menu === 'connect' || menu === 2) return tabletNavRegions.row('connect');
        return tabletNavRegions.row('set');
      }
      const idx =
        typeof menu === 'number'
          ? menu
          : menu === 'ctrlbot'
            ? 0
            : menu === 'device'
              ? 1
              : menu === 'connect'
                ? 2
                : 3;
      return navRegions.row(idx);
    },

    /** Underlying AI surface regions */
    aiPrompt: aiRegions(device).prompt,
    aiQuestions: aiRegions(device).questions,
    aiMark: aiRegions(device).mark,
  };
};

export const firstRunRegions = firstRunEducationRegions;
export const tourRegions = firstRunEducationRegions;

export const FirstRunEducation: React.FC<FirstRunEducationProps> = ({
  device = 'phone',
  step = 1,
  showClose = true,
  cardOpacity,
  cardOffsetY = 0,
}) => {
  const isTablet = device === 'tablet';
  const isDismissed = step > FIRST_RUN_STEPS.length;
  const currentStep = FIRST_RUN_STEPS[Math.max(0, Math.min(step - 1, FIRST_RUN_STEPS.length - 1))];
  const opacity = cardOpacity !== undefined ? cardOpacity : isDismissed ? 0 : 1;
  const tag = isTablet ? currentStep.tag.replace('PHONE', 'TABLET') : currentStep.tag;

  return (
    <div
      style={{
        position: 'relative',
        width: VIEWPORT[device].width,
        height: VIEWPORT[device].height,
        backgroundColor: appColors.black,
        overflow: 'hidden',
        fontFamily: font.ui,
      }}
    >
      {/* Underlying setup screen: CTRLbot AI (and expanded phone bottom nav sheet on phone) */}
      <CtrlbotAi device={device} promptFocused={false} visibleQuestions={isTablet ? 1 : 2} />
      {!isTablet ? <PhoneNavMenu expanded active="ctrlbot" /> : null}

      {/* Dim scrim overlay behind the walkthrough card */}
      {opacity > 0 ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: appColors.black,
            opacity: opacity * 0.72,
            pointerEvents: 'none',
          }}
        />
      ) : null}

      {/* Walkthrough tour card */}
      {opacity > 0 ? (
        <div
          style={{
            position: 'absolute',
            top: (isTablet ? 190 : 210) + cardOffsetY,
            left: isTablet ? '50%' : 24,
            right: isTablet ? undefined : 24,
            transform: isTablet ? 'translateX(-50%)' : undefined,
            width: isTablet ? 480 : undefined,
            opacity,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isTablet ? '28px 24px' : '24px 20px',
            borderRadius: 16,
            backgroundColor: appColors.firstRunDialogBackground,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxSizing: 'border-box',
          }}
        >
          {/* Header icon + brand lockup */}
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14}}>
            <AppIcon name="ic_ctrlbot" size={32} tint={appColors.white} />
            <span
              style={{
                fontFamily: font.display,
                fontSize: 18,
                color: appColors.white,
                letterSpacing: '0.04em',
              }}
            >
              CTRLbot
            </span>
          </div>

          {/* Eyebrow */}
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: appColors.blue,
              marginBottom: 10,
            }}
          >
            {currentStep.eyebrow}
          </div>

          {/* Headline in Audiowide */}
          <div
            style={{
              fontFamily: font.display,
              fontSize: 21,
              fontWeight: 700,
              lineHeight: 1.24,
              color: appColors.white,
              whiteSpace: 'pre-line',
              marginBottom: 14,
            }}
          >
            {currentStep.title}
          </div>

          {/* Body */}
          <div
            style={{
              fontFamily: font.ui,
              fontSize: 13.5,
              lineHeight: 1.48,
              color: appColors.gray90,
              whiteSpace: 'pre-line',
              marginBottom: 20,
            }}
          >
            {currentStep.body}
          </div>

          {/* Divider and Kicker / Tag */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: font.mono,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: appColors.blue,
              }}
            >
              {tag}
            </span>
          </div>
        </div>
      ) : null}

      {/* Close ✕ button in top-right */}
      {showClose ? (
        <div
          style={{
            position: 'absolute',
            top: 36,
            right: isTablet ? 36 : 22,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            boxSizing: 'border-box',
          }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke={appColors.white}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
};
