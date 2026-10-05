// CTRLbot IoT Phone Walkthrough — narrated, in two shapes from one set of beats.
//
// Built from Nathan's recording (video input/CTRLbot-IoT Phone Walkthrough v1.0.9.mp4,
// ingest/iot-phone-walkthrough/transcript.md). The brief is videos/iot-phone-walkthrough.md.
//
//   iot-phone-walkthrough           1920x1080, YouTube. Captions ship as an .srt.
//   iot-phone-walkthrough-portrait  1080x1920, captions burned in. The cut for the feeds.

import {PHONE_VIEWPORT} from '../../app-ui/viewports';
import {PromoPreload} from '../eui-promo/PromoPreload';
import {WalkthroughShell, type WalkthroughBeat, type WalkthroughFormat} from '../WalkthroughShell';
import {BEAT_RENDERERS, OpenBeat} from './IotPhoneBeats';
import {IOT_PHONE_CAPTION_CORRECTIONS} from './iotPhoneWalkthroughNarration';
import {NARRATION_EDIT} from './iotPhoneWalkthroughNarration.generated';
import {IotPhoneLandscapeReview} from './IotPhoneLandscapeReview';
import {IotPhonePortraitReview} from './IotPhonePortraitReview';
import {
  IOT_PHONE_WALKTHROUGH_FRAMES,
  WALKTHROUGH_BEATS,
  type BeatName,
} from './iotPhoneWalkthroughData';

export const iotPhoneWalkthroughDuration = IOT_PHONE_WALKTHROUGH_FRAMES;

export const IOT_PHONE_WALKTHROUGH_BEATS: WalkthroughBeat[] = WALKTHROUGH_BEATS.map((beat) => ({
  ...beat,
  render: ({frame, frames}) => {
    if (beat.id === 'open' || beat.id === 'close') return null;
    const Component = BEAT_RENDERERS[beat.id as BeatName] ?? OpenBeat;
    return <Component frame={frame} frames={frames} />;
  },
}));

const Walkthrough = ({format}: {format: WalkthroughFormat}) => (
  <WalkthroughShell
    format={format}
    contentSize={PHONE_VIEWPORT}
    beats={IOT_PHONE_WALKTHROUGH_BEATS}
    edit={NARRATION_EDIT}
    corrections={IOT_PHONE_CAPTION_CORRECTIONS}
    preload={<PromoPreload />}
  />
);

/** 1920x1080, narrated. The YouTube cut. */
export const IotPhoneWalkthrough = () => <IotPhoneLandscapeReview />;

/** 1080x1920, narrated, captions burned in. The cut for the feeds. */
export const IotPhoneWalkthroughPortrait = () => <IotPhonePortraitReview />;
