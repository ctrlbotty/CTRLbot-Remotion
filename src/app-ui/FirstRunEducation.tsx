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
import {CtrlbotAi} from './CtrlbotAi';
import {PhoneNavMenu} from './PhoneNavMenu';
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
