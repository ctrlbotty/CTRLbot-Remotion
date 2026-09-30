// Live screens a short or a walkthrough can ask for by name.
//
// A beat with `source: {surface: 'terminator/scan'}` renders that scene at its natural
// size under the house camera, instead of playing footage. Each scene plays its whole
// demonstration across however long the beat is, and frame 0 is the screen at rest, which
// is what the hook holds as the poster.
//
// Add a product's scenes here as they are rebuilt: the name is `<product>/<what it shows>`.

import type {ComponentType} from 'react';
import {
  TermRawTcpScene,
  TermScanScene,
  TermSerialScene,
  TermServerScene,
  TermSshScene,
} from '../app-ui/term/TermScenes';
import {TERM_VIEWPORT} from '../app-ui/term/termData';
import {MirrorAppsScene, MirrorDevicesScene, MirrorFilesScene, MirrorMirroringScene, MirrorSetupScene, MirrorStudioScene} from '../app-ui/mirror/MirrorScenes';
import {MIRROR_VIEWPORT} from '../app-ui/mirror/mirrorData';

export type Surface = {
  /** The scene's natural size: CSS pixels for a web or desktop app, dp for Android. */
  size: {width: number; height: number};
  Scene: ComponentType<{frames: number}>;
  /**
   * Where the action is, in the scene's own units. The camera starts on the whole screen
   * and arrives here as the beat ends, unless the beat names its own focus. A live screen
   * stays sharp at any push, which is the point of rebuilding it rather than filming it.
   */
  focus?: {x: number; y: number; width: number; height: number};
};

/** Terminator's connection screens: the controls and the two logs, without the sidebar. */
const TERM_SESSION = {x: 236, y: 30, width: 880, height: 550};

export const SURFACES: Record<string, Surface> = {
  'terminator/scan': {size: TERM_VIEWPORT, Scene: TermScanScene, focus: {x: 236, y: 200, width: 1040, height: 600}},
  'terminator/server': {size: TERM_VIEWPORT, Scene: TermServerScene, focus: TERM_SESSION},
  'terminator/raw-tcp': {size: TERM_VIEWPORT, Scene: TermRawTcpScene, focus: TERM_SESSION},
  'terminator/serial': {size: TERM_VIEWPORT, Scene: TermSerialScene, focus: TERM_SESSION},
  'terminator/ssh': {size: TERM_VIEWPORT, Scene: TermSshScene, focus: TERM_SESSION},
  'mirror/setup': {size: MIRROR_VIEWPORT, Scene: MirrorSetupScene},
  'mirror/devices': {size: MIRROR_VIEWPORT, Scene: MirrorDevicesScene},
  'mirror/mirroring': {size: MIRROR_VIEWPORT, Scene: MirrorMirroringScene, focus: {x: 404, y: 32, width: 1196, height: 852}},
  'mirror/studio': {size: MIRROR_VIEWPORT, Scene: MirrorStudioScene},
  'mirror/apps': {size: MIRROR_VIEWPORT, Scene: MirrorAppsScene},
  'mirror/files': {size: MIRROR_VIEWPORT, Scene: MirrorFilesScene},
};
