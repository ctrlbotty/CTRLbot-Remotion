// The single definition of how big an app surface is.
//
// Every surface, the nav sheet, and the capture crop all lay out against these. They
// were previously declared per-file, and the moment the phone size changed one of the
// copies did not follow — which put the nav sheet 12dp below where its own region map
// said it was, and landed a focus ring on the wrong row. One constant, imported
// everywhere, makes that impossible.
//
// Phone matches the capture device (SM-A102U1, 360x780dp) so live surfaces and
// screenshots are dimensionally identical when intercut.

export const PHONE_VIEWPORT = {width: 360, height: 780} as const;
export const TABLET_VIEWPORT = {width: 1280, height: 800} as const;

export const VIEWPORT = {
  phone: PHONE_VIEWPORT,
  tablet: TABLET_VIEWPORT,
} as const;

export type DeviceKind = keyof typeof VIEWPORT;
