// W05: one 136-second timeline (4080 frames) for both shapes, playing through WalkthroughShell.
import React from 'react';
import {TABLET_VIEWPORT} from '../../app-ui/viewports';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat, type WalkthroughFormat} from '../WalkthroughShell';
import {IOT_LATEST_CAPTION_CORRECTIONS} from './iotLatestFeaturesNarration';
import {NARRATION_EDIT} from './iotLatestFeaturesNarration.generated';
import {IOT_LATEST_FEATURES_FRAMES, walkthroughBeats, type LatestBeatName} from './iotLatestFeaturesData';
import {BEAT_RENDERERS} from './IotLatestFeaturesBeats';

export const iotLatestFeaturesDuration = IOT_LATEST_FEATURES_FRAMES;

const beatsFor = (format: WalkthroughFormat): WalkthroughBeat[] =>
  walkthroughBeats(format).map((beat) => ({
    ...beat,
    render: ({frame, frames}) => {
      const Component = BEAT_RENDERERS[beat.id as LatestBeatName];
      return Component ? <Component frame={frame} frames={frames} /> : null;
    },
  }));
const LANDSCAPE = beatsFor('landscape');
const PORTRAIT = beatsFor('portrait');

const Walkthrough = ({format}: {format: WalkthroughFormat}) => (
  <WalkthroughShell
    format={format}
    contentSize={TABLET_VIEWPORT}
    beats={format === 'portrait' ? PORTRAIT : LANDSCAPE}
    edit={NARRATION_EDIT}
    corrections={IOT_LATEST_CAPTION_CORRECTIONS}
    preload={<PromoPreload />}
    driftAnchor={format === 'landscape' ? 'top-left' : undefined}
  />
);

export const IotLatestFeatures = () => <Walkthrough format="landscape" />;
export const IotLatestFeaturesPortrait = () => <Walkthrough format="portrait" />;
