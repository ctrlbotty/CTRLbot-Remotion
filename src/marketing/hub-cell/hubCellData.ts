// The 30-second ctrlbot.io Hub cell: timing only.
//
// Every driver fact shown by the composition remains in
// ../device-database/deviceDatabaseData.ts. This module owns only the shorter cut's
// clock, so the two videos cannot drift into separate versions of the same evidence.

/** 30fps. Six beats, exactly 30 seconds. */
export const BEATS = {
  library: {from: 0, duration: 180},
  types: {from: 180, duration: 150},
  manual: {from: 330, duration: 180},
  connection: {from: 510, duration: 150},
  api: {from: 660, duration: 150},
  close: {from: 810, duration: 90},
} as const;

export type BeatName = keyof typeof BEATS;

export const HUB_FRAMES = 900;
