// The Product Web View surface, rebuilt as live React.
//
// Derived from:
//   res/layout/fragment_product_web_view.xml   back, title, host, refresh, open external, progress bar
//   Reference frames: f_0013.jpg, f_0014.jpg
//
// Rule: Draw no website content — empty, loading page only.

import React from 'react';
import {PhoneNavMenu} from './PhoneNavMenu';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';
import {font} from '../design/theme';

export type ProductWebViewProps = {
  device?: 'phone';
  title?: string;
  host?: string;
  progress?: number;
  contentBg?: 'dark' | 'white';
  showNavMenu?: boolean;
};

export const ProductWebView: React.FC<ProductWebViewProps> = ({
  device = 'phone',
  title = 'Manufacturer Home Page',
  host = 'epson.com',
  progress = 18,
  contentBg = 'dark',
  showNavMenu = true,
}) => {
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
      {/* Top App Bar: 56dp */}
      <div
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
          paddingRight: 8,
          backgroundColor: appColors.black,
          zIndex: 2,
        }}
      >
        {/* Back Button */}
        <div
          style={{
            width: 44,
            height: 44,
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
            marginLeft: 8,
            marginRight: 8,
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
            width: 44,
            height: 44,
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
            width: 44,
            height: 44,
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
          height: 3,
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
