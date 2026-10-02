// The Product Web View surface, rebuilt as live React.
//
// Derived from:
//   res/layout/fragment_product_web_view.xml   back, title, host, refresh, open external, progress bar
//   Reference frames: f_0013.jpg, f_0014.jpg
//
// Rule: Draw no website content — empty, loading page only.

import React from 'react';
import {PhoneNavMenu, NAV_COLLAPSED_H} from './PhoneNavMenu';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';

export type ProductWebViewProps = {
  device?: 'phone' | 'tablet';
  title?: string;
  host?: string;
  progress?: number;
  contentBg?: 'dark' | 'white';
  showNavMenu?: boolean;
};

// Layout rhythm, shared between markup and productWebRegions() so camera targets
// never drift from the controls they frame.
const TOP_BAR_H = 56;
const PROGRESS_H = 3;
const ACTION_BTN_SIZE = 44;

const layoutFor = (device: 'phone' | 'tablet') => {
  const viewport = VIEWPORT[device];
  const isTablet = device === 'tablet';
  const railW = isTablet ? TABLET_NAV_WIDTH : 0;
  const contentX = railW;
  const contentW = viewport.width - railW;
  const padX = isTablet ? 12 : 8;
  const marginX = isTablet ? 12 : 8;

  const backX = contentX + padX;
  const backY = (TOP_BAR_H - ACTION_BTN_SIZE) / 2;

  const rightBtnsW = ACTION_BTN_SIZE * 2;
  const addressX = backX + ACTION_BTN_SIZE + marginX;
  const addressW = contentW - padX * 2 - ACTION_BTN_SIZE - marginX * 2 - rightBtnsW;

  const refreshX = contentX + contentW - padX - rightBtnsW;
  const openExternalX = refreshX + ACTION_BTN_SIZE;

  const progressY = TOP_BAR_H;
  const webY = TOP_BAR_H + PROGRESS_H;
  const navH = !isTablet ? NAV_COLLAPSED_H : 0;
  const webH = viewport.height - webY - navH;

  return {
    viewport,
    isTablet,
    railW,
    contentX,
    contentW,
    padX,
    marginX,
    topBarH: TOP_BAR_H,
    progressH: PROGRESS_H,
    btnSize: ACTION_BTN_SIZE,
    backX,
    backY,
    addressX,
    addressW,
    refreshX,
    openExternalX,
    progressY,
    webY,
    webH,
    navH,
  };
};

/**
 * Named regions for <Camera> and annotations in ProductWebView's coordinate space.
 * Follows connectionRegions(device): derived from layoutFor(device).
 */
export const productWebRegions = (device: 'phone' | 'tablet') => {
  const l = layoutFor(device);
  return {
    full: {x: 0, y: 0, width: l.viewport.width, height: l.viewport.height},
    content: {x: l.contentX, y: 0, width: l.contentW, height: l.viewport.height},
    centreX: l.contentX + l.contentW / 2,
    appBar: {x: l.contentX, y: 0, width: l.contentW, height: l.topBarH},
    backButton: {x: l.backX, y: l.backY, width: l.btnSize, height: l.btnSize},
    addressBar: {x: l.addressX, y: 0, width: l.addressW, height: l.topBarH},
    refreshButton: {x: l.refreshX, y: l.backY, width: l.btnSize, height: l.btnSize},
    openExternalButton: {x: l.openExternalX, y: l.backY, width: l.btnSize, height: l.btnSize},
    progressBar: {x: l.contentX, y: l.progressY, width: l.contentW, height: l.progressH},
    webView: {x: l.contentX, y: l.webY, width: l.contentW, height: l.webH},
  };
};

export const productWebViewRegions = productWebRegions;

export const ProductWebView: React.FC<ProductWebViewProps> = ({
  device = 'phone',
  title = 'Manufacturer Home Page',
  host = 'epson.com',
  progress = 18,
  contentBg = 'dark',
  showNavMenu = true,
}) => {
  const l = layoutFor(device);

  if (device === 'tablet') {
    return (
      <div
        style={{
          position: 'relative',
          width: l.viewport.width,
          height: l.viewport.height,
          backgroundColor: appColors.black,
          overflow: 'hidden',
          fontFamily: font.ui,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Left Nav Rail */}
        <TabletNavRail active="device" showRoomMenus={false} />

        {/* Right Main Pane */}
        <div
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: appColors.black,
            overflow: 'hidden',
          }}
        >
          {/* Top App Bar: 56dp */}
          <div
            style={{
              height: l.topBarH,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: l.padX,
              paddingRight: l.padX,
              backgroundColor: appColors.black,
              zIndex: 2,
            }}
          >
            {/* Back Button */}
            <div
              style={{
                width: l.btnSize,
                height: l.btnSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill={appColors.white}>
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </div>

            {/* Title and Host Column */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                marginLeft: l.marginX,
                marginRight: l.marginX,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: appColors.white,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.25,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: appColors.white50,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.25,
                }}
              >
                {host}
              </div>
            </div>

            {/* Refresh Button */}
            <div
              style={{
                width: l.btnSize,
                height: l.btnSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill={appColors.white}>
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
            </div>

            {/* Open External Button */}
            <div
              style={{
                width: l.btnSize,
                height: l.btnSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill={appColors.white}>
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59L7.76 14.83l1.41 1.41L19 6.41V10h2V3h-7z" />
              </svg>
            </div>
          </div>

          {/* Progress Bar: 3dp */}
          <div
            style={{
              width: '100%',
              height: l.progressH,
              backgroundColor: 'transparent',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
                height: '100%',
                backgroundColor: appColors.blue,
              }}
            />
          </div>

          {/* Main WebView Content Area: Empty page */}
          <div
            style={{
              flex: 1,
              backgroundColor: contentBg === 'white' ? appColors.white : appColors.gray10,
              position: 'relative',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: l.viewport.width,
        height: l.viewport.height,
        backgroundColor: appColors.black,
        overflow: 'hidden',
        fontFamily: font.ui,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top App Bar: 56dp */}
      <div
        style={{
          height: l.topBarH,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: l.padX,
          paddingRight: l.padX,
          backgroundColor: appColors.black,
          zIndex: 2,
        }}
      >
        {/* Back Button */}
        <div
          style={{
            width: l.btnSize,
            height: l.btnSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill={appColors.white}>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </div>

        {/* Title and Host Column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: l.marginX,
            marginRight: l.marginX,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: appColors.white,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.25,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 11,
              color: appColors.white50,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.25,
            }}
          >
            {host}
          </div>
        </div>

        {/* Refresh Button */}
        <div
          style={{
            width: l.btnSize,
            height: l.btnSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill={appColors.white}>
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </div>

        {/* Open External Button */}
        <div
          style={{
            width: l.btnSize,
            height: l.btnSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill={appColors.white}>
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59L7.76 14.83l1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        </div>
      </div>

      {/* Progress Bar: 3dp */}
      <div
        style={{
          width: '100%',
          height: l.progressH,
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
            height: '100%',
            backgroundColor: appColors.blue,
          }}
        />
      </div>

      {/* Main WebView Content Area: Empty page */}
      <div
        style={{
          flex: 1,
          backgroundColor: contentBg === 'white' ? appColors.white : appColors.gray10,
          position: 'relative',
        }}
      />

      {/* Bottom Setup Navigation Bar */}
      {showNavMenu ? (
        <PhoneNavMenu expanded={false} active={undefined as any} showRoomMenus={false} />
      ) : null}
    </div>
  );
};
