// GENERATED FILE — DO NOT EDIT BY HAND.
// Source: C:/0-Repo/1 - CTRLbot.av/CTRLbot-IoT/app/src/main/res
// Regenerate: npm run sync:tokens
//
// These are the Android app's real design tokens. Import curated, video-facing
// values from './theme' rather than reaching for raw tokens in compositions.

/** Every <color> in res/values/colors.xml, alpha-normalized to CSS. */
export const appColors = {
  "purple200": "#BB86FC",
  "purple500": "#6200EE",
  "purple700": "#3700B3",
  "teal200": "#03DAC5",
  "teal700": "#018786",
  "black": "#000000",
  "white": "#FFFFFF",
  "priRed": "#FF0000",
  "priBlue": "#0000FF",
  "priGreen": "#00FF00",
  "priYellow": "#FFFF00",
  "gray90": "#E5E5E5",
  "gray800": "#424242",
  "gray75": "#BFBFBF",
  "gray700": "#616161",
  "gray600": "#757575",
  "gray50": "#808080",
  "gray300": "#E0E0E0",
  "gray25": "#404040",
  "gray20": "#383838",
  "displayCardBg": "#2F2F2F",
  "projectorCardBg": "#333333",
  "switcherCardBg": "#2D2D2D",
  "endPointCardBg": "#383838",
  "gray15": "#313131",
  "gray10": "#1A1A1A",
  "firstRunDialogBackground": "#292929",
  "green": "#4EA72E",
  "blue": "#008FD4",
  "black75": "rgba(0, 0, 0, 0.749)",
  "black50": "rgba(0, 0, 0, 0.502)",
  "black25": "rgba(0, 0, 0, 0.251)",
  "white75": "rgba(255, 255, 255, 0.749)",
  "white50": "rgba(255, 255, 255, 0.502)",
  "white25": "rgba(255, 255, 255, 0.251)",
  "blueColor": "#008FD4",
  "darkGrey": "#404040",
  "lightBlack": "rgba(64, 64, 64, 0.878)",
  "edittextBg": "#F7F9FC",
  "gray": "#747474",
  "lightBlue": "#BFBFBF",
  "statePressed": "rgba(198, 198, 198, 0.494)",
  "darkestGrey": "#404040"
} as const;

/** ColorStateLists from res/color/, resolved to CSS. */
export const appColorStates = {
  "buttonBackgroundState": {
    "selected": "#0000FF",
    "pressed": "#FFFF00",
    "default": "#383838"
  },
  "cardBackground": {
    "selected": "#008FD4",
    "default": "#313131"
  },
  "cardButtonText": {
    "pressed": "#000000",
    "selected": "#FFFFFF",
    "default": "#FFFFFF"
  },
  "cardTextPrimary": {
    "pressed": "#000000",
    "selected": "#FFFFFF",
    "default": "#FFFFFF"
  },
  "cardTextSecondary": {
    "pressed": "#000000",
    "selected": "rgba(255, 255, 255, 0.749)",
    "default": "rgba(255, 255, 255, 0.502)"
  },
  "settingsButtonBackground": {
    "pressed": "#008FD4",
    "selected": "#008FD4",
    "default": "#1A1A1A"
  },
  "textInputBoxStroke": {
    "focused": "#BFBFBF",
    "default": "#808080"
  },
  "textInputBoxStrokeWhite": {
    "focused": "#FFFFFF",
    "hovered": "#FFFFFF",
    "default": "#FFFFFF"
  }
} as const;

/** Every <dimen> in res/values/dimens.xml, in dp/sp with the unit stripped. */
export const appDimens = {
  "cornerRadiusDim": 8,
  "zoomInZoomOutWidth": 48,
  "camRemoteControllerButtonHeight": 100,
  "commandRowHeight": 60,
  "commandRowMargin": 8,
  "commandElementMargin": 10,
  "commandPadding": 10,
  "spinnerWidth": 150,
  "hexLabelMargin": 16,
  "buttonPadding": 16,
  "buttonMinWidth": 80,
  "connectionTerminalHeightLandscape": 160,
  "remoteMatrixInputHeightAdjustment": 0,
  "remoteMatrixOutputIconSize": 60,
  "headerHeight": 56,
  "navIconSize": 40,
  "widgetNavDirectionalSize": 80,
  "widgetNavCenterSize": 56,
  "buttonHeightStandard": 48,
  "buttonHeightLarge": 56,
  "buttonWidthStandard": 170,
  "phoneMenuHandleHeight": 48,
  "phoneMenuIconBarHeight": 60,
  "phoneContentBottomInset": 108,
  "phoneMenuRowHeight": 52,
  "phoneMenuEuiRowHeight": 56,
  "euiBarHeight": 90,
  "euiBarIcon": 90,
  "euiBarIconPadding": 25,
  "euiBarSmallIcon": 70,
  "euiBarSmallIconPadding": 10,
  "euiBarDividerHeight": 80,
  "euiSeekbarHeight": 100,
  "euiMatrixColumnStart": 40,
  "euiMatrixSourceTop": 30,
  "euiMatrixGridTop": 36,
  "euiMatrixArrowSize": 50,
  "euiMatrixSourceHeight": 102,
  "euiMatrixSourceGap": 15,
  "euiMatrixCellWidth": 320,
  "euiMatrixCellHeight": 240,
  "euiMatrixCellPanelHeight": 180,
  "euiMatrixCellGapEnd": 40,
  "euiMatrixCellGapBottom": 20,
  "euiMatrixCellRowGap": 24,
  "euiMatrixCellLabelGap": 14,
  "euiMatrixCellIcon": 50,
  "euiMatrixCellIconGap": 20,
  "euiNx1Padding": 20,
  "euiNx1Gap": 20,
  "euiNx1ColumnHeight": 472,
  "euiNx1ArrowSize": 100,
  "euiNx1DisplayWidth": 630,
  "euiNx1DisplayHeight": 354,
  "euiNx1DisplayLabelGap": 15,
  "euiNx1DisplayIcon": 100,
  "euiNx1DisplayIconGap": 40,
  "phoneWelcomeTitleSize": 52,
  "phoneWelcomePromptSize": 24,
  "phoneWelcomePowerSize": 112,
  "euiMatrixSourceWeight": 30,
  "euiMatrixArrowWeight": 10,
  "euiMatrixOutputWeight": 60
} as const;

/** The TextAppearance.CtrlBot.* ramp from res/values/typography.xml. */
export const appTextStyles = {
  "TitlePrimary": {
    "sizeSp": 18,
    "colorToken": "white",
    "fontFamily": null
  },
  "TitleSecondary": {
    "sizeSp": 15,
    "colorToken": "white",
    "fontFamily": null
  },
  "BodyPrimary": {
    "sizeSp": 13,
    "colorToken": "white",
    "fontFamily": null
  },
  "BodySecondary": {
    "sizeSp": 12,
    "colorToken": "white",
    "fontFamily": null
  },
  "Caption": {
    "sizeSp": 12,
    "colorToken": "white50",
    "fontFamily": null
  },
  "MonoData": {
    "sizeSp": 13,
    "colorToken": "white",
    "fontFamily": "monospace"
  }
} as const;

/** Corner geometry from res/values/shapes.xml. */
export const appCornerRadii = {
  "SplitButtonLeft": {
    "topLeft": 5,
    "bottomLeft": 5,
    "topRight": 0,
    "bottomRight": 0
  },
  "SplitButtonRight": {
    "topLeft": 0,
    "bottomLeft": 0,
    "topRight": 5,
    "bottomRight": 5
  },
  "SplitButtonMiddle": {
    "topLeft": 0,
    "bottomLeft": 0,
    "topRight": 0,
    "bottomRight": 0
  },
  "SplitButtonStandalone": {
    "topLeft": 5,
    "bottomLeft": 5,
    "topRight": 5,
    "bottomRight": 5
  }
} as const;

/** Font files copied into public/fonts by the sync script. */
export const appFontFiles = [
  "Montserrat-Thin.ttf",
  "Montserrat-Light.ttf",
  "Montserrat-Regular.ttf",
  "Montserrat-Bold.ttf",
  "Montserrat-Italic.ttf",
  "Montserrat-LightItalic.ttf",
  "Montserrat-ThinItalic.ttf",
  "Audiowide-Regular.ttf"
] as const;

/** App drawables exported into public/app-assets (vectors converted to SVG). */
export const appDrawables = [
  "ic_settings2.svg",
  "ic_power.svg",
  "ic_hdmi_icon.svg",
  "ic_hdmi_icon_sm.svg",
  "ic_display_icon.svg",
  "ic_route5.svg",
  "nav_right.svg",
  "ic_speaker_on.svg",
  "ic_speaker_off.svg",
  "ic_vol_left.svg",
  "ic_vol_right.svg",
  "ic_mic_live.svg",
  "ic_mic_off.svg",
  "ic_light1.svg",
  "ic_cam.svg",
  "ic_display_50.svg",
  "ic_projector_filled.svg",
  "ic_route2.svg",
  "ic_server.svg",
  "ic_add_24.svg",
  "ic_search.svg",
  "ic_sort.svg",
  "ic_close.svg",
  "ic_ctrlbot.svg",
  "ic_arrow_forward_24.svg",
  "ic_connect.svg",
  "ic_connected.svg",
  "ic_activities.svg",
  "ic_eui.svg",
  "disp_m_blue.png",
  "disp_m_grey.png",
  "disp_m_yellow.png",
  "disp_lg_blue.png",
  "disp_lg_grey.png",
  "bg_eui.png",
  "bg_leftmenu.png"
] as const;

export type AppColorToken = keyof typeof appColors;
export type AppDimenToken = keyof typeof appDimens;
