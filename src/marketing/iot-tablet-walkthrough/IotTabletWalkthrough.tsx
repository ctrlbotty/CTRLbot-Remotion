// Revision 2: one 343.5-second timeline (10305 frames) for both shapes, playing through WalkthroughShell.
import React from 'react';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat, type WalkthroughFormat} from '../WalkthroughShell';
import {IOT_TABLET_CAPTION_CORRECTIONS} from './iotTabletWalkthroughNarration';
import {NARRATION_EDIT} from './iotTabletWalkthroughNarration.generated';
import {IOT_TABLET_WALKTHROUGH_FRAMES, WALKTHROUGH_BEATS} from './iotTabletWalkthroughData';
import {BEAT_RENDERERS, OpenBeat} from './IotTabletBeats';

export const iotTabletWalkthroughDuration = IOT_TABLET_WALKTHROUGH_FRAMES;

export const IOT_TABLET_WALKTHROUGH_BEATS: WalkthroughBeat[] = WALKTHROUGH_BEATS.map((beat) => ({
  ...beat,
  render: ({frame, frames}) => {
    if (beat.id === 'proof') {
      return <OpenBeat frame={frame} frames={frames} />;
    }
    const Component = (BEAT_RENDERERS as Record<string, React.FC<{frame: number; frames: number}>>)[beat.id];
    return Component ? <Component frame={frame} frames={frames} /> : null;
  },
}));

const Walkthrough = ({format}: {format: WalkthroughFormat}) => (
  <WalkthroughShell
    format={format}
    contentSize={TABLET_VIEWPORT}
    beats={IOT_TABLET_WALKTHROUGH_BEATS}
    edit={NARRATION_EDIT}
    corrections={IOT_TABLET_CAPTION_CORRECTIONS}
    preload={<PromoPreload />}
  />
);

export const IotTabletWalkthrough = () => <Walkthrough format="landscape" />;
export const IotTabletWalkthroughPortrait = () => <Walkthrough format="portrait" />;
