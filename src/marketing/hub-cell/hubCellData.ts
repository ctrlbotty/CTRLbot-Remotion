// The 48-second ctrlbot.io Hub cell: timing only.
//
// Every driver fact shown by the composition remains in
// ../device-database/deviceDatabaseData.ts. This module owns only the shorter cut's
// clock, so the two videos cannot drift into separate versions of the same evidence.

/**
 * 30fps. Eight beats, exactly 48 seconds.
 *
 * **Beat length is set by the copy, not by the picture.** The site puts an HTML paragraph
 * beside this cell and swaps the block on the beat, so a beat that is shorter than its
 * words take to read is a block nobody finishes. Every beat here is at or under four
 * words a second, which is what the panel turned out to need — the 34-second cut ran at
 * five and read as a flicker. `connect` and `terminal` were added at the same review;
 * browsing a driver is what the database is, making the connection is what it is for.
 *
 * `close` is four seconds and carries its own copy block. It has to exist, because this
 * is a loop and the last frame must be the first frame or the wrap is a jump cut —
 * `npm run loop:seam` is the gate. It must not be silent, either: on the 34-second cut it
 * had no block of its own, so THE TERMINAL stayed on the panel while the picture showed
 * the catalog, and words describing a log over a picture of a list is worse than the
 * three seconds of dead air it was meant to save.
 */
export const BEATS = {
  library: {from: 0, duration: 180},
  types: {from: 180, duration: 150},
  manual: {from: 330, duration: 210},
  connection: {from: 540, duration: 195},
  api: {from: 735, duration: 210},
  connect: {from: 945, duration: 195},
  terminal: {from: 1140, duration: 180},
  close: {from: 1320, duration: 120},
} as const;

export type BeatName = keyof typeof BEATS;

export const HUB_FRAMES = 1440;
