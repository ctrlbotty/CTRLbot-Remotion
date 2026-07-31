// The CTRLbot AI surface — the app's built-in FAQ, manual and troubleshooter.
//
// Built from captures rather than layout XML, and it has to be: res/layout/menu_ctrlbot.xml
// is a WebView host, so the content inside it has no Android layout to derive from. The
// constants below are read off the curated references —
//   phone   the 2026-07-30 captures
//   tablet  public/captures/tablet/ctrlbot-ai-core.png and ctrlbot-ai-room.png
// which makes this the one surface in the project where measuring is the correct method.
// Everything else derives. Re-read the captures if the WebView is redesigned.
//
// Why this is rebuilt live rather than played as a capture: `ctrlbot-ai-core.png` has the
// right rail for this point in the story (no connection saved, so no Activities and no
// EUI) but shows a single suggestion, and `ctrlbot-ai-room.png` shows the full suggestion
// list but with the room-state rail. Neither one alone can carry a scene whose copy
// promises "pick one of the questions it already knows the answer to".
//
// The prompt pill is grey while something is over it and white when it has focus, which
// is the difference between the two phone captures.

import {AppIcon} from './AppIcon';
import {TABLET_NAV_WIDTH, TabletNavRail} from './TabletNavRail';
import {VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';

/** The suggested questions, verbatim from the capture. */
export const AI_QUESTIONS = [
  'What is the End User Interface?',
  'What is CTRLbot IoT?',
  'How do I get started and add my first device?',
  'What is a driver, and how do I find one for my device?',
  'How do I create a connection to a device?',
];

export const AI_PROMPT = "Spill it. What's not switching?";

/**
 * Layout per form factor.
 *
 * The tablet numbers are the capture measurements converted into the 1280x800 dp
 * viewport; the phone numbers are the ones this file already shipped with. Note that
 * `markTop` lands at 200 on both — the WebView centres its own content, and the two
 * viewports are within 20dp of each other in height.
 */
const LAYOUT = {
  phone: {
    contentX: 0,
    contentWidth: VIEWPORT.phone.width,
    markTop: 200,
    markSize: 74,
    pillTop: 300,
    pillWidth: VIEWPORT.phone.width - 84,
    pillHeight: 52,
    pillFontSize: 16,
    listTop: 396,
    listWidth: VIEWPORT.phone.width - 48,
    chipPadX: 18,
    chipPadY: 14,
    chipGap: 10,
    chipFontSize: 16,
    clearSize: 0, // the phone capture puts the clear control outside the framed area
  },
  tablet: {
    contentX: TABLET_NAV_WIDTH,
    contentWidth: VIEWPORT.tablet.width - TABLET_NAV_WIDTH,
    markTop: 200,
    markSize: 86,
    pillTop: 313,
    pillWidth: 520,
    pillHeight: 38,
    pillFontSize: 15,
    listTop: 432,
    listWidth: 565,
    chipPadX: 18,
    chipPadY: 8,
    chipGap: 15,
    chipFontSize: 15,
    clearSize: 22,
  },
} as const;

const CHIP_LINE_HEIGHT = 1.35;

/**
 * One chip's height, assuming a single line.
 *
 * Exact on tablet, where 565dp of list holds the longest question without wrapping —
 * which is what the capture shows, and why the tablet chips set `nowrap`. On phone the
 * longer questions do wrap, so this is a nominal value and the `questions` region is a
 * lower bound. No phone scene frames that region; if one ever does, measure it there.
 */
const chipHeight = (device: 'phone' | 'tablet') => {
  const l = LAYOUT[device];
  return l.chipPadY * 2 + l.chipFontSize * CHIP_LINE_HEIGHT;
};

/**
 * Regions for <Camera> and annotations, in the surface's own coordinate space.
 *
 * A function of `device` for the same reason `catalogRegions` and `connectionRegions`
 * are: the tablet surface carries the setup rail, so every content region is offset by
 * the rail's width and nothing can be shared as a flat constant.
 */
export const aiRegions = (device: 'phone' | 'tablet') => {
  const l = LAYOUT[device];
  const viewport = VIEWPORT[device];
  const centreX = l.contentX + l.contentWidth / 2;

  return {
    full: {x: 0, y: 0, width: viewport.width, height: viewport.height},
    /** The content plane beside the rail. On phone that is the whole surface. */
    content: {x: l.contentX, y: 0, width: l.contentWidth, height: viewport.height},
    centreX,
    mark: {
      x: centreX - l.markSize / 2,
      y: l.markTop,
      width: l.markSize,
      height: l.markSize,
    },
    prompt: {
      x: centreX - l.pillWidth / 2,
      y: l.pillTop,
      width: l.pillWidth,
      height: l.pillHeight,
    },
    questions: {
      x: centreX - l.listWidth / 2,
      y: l.listTop,
      width: l.listWidth,
      height:
        AI_QUESTIONS.length * chipHeight(device) +
        (AI_QUESTIONS.length - 1) * l.chipGap,
    },
    question: (index: number) => ({
      x: centreX - l.listWidth / 2,
      y: l.listTop + index * (chipHeight(device) + l.chipGap),
      width: l.listWidth,
      height: chipHeight(device),
    }),
  };
};

export const CtrlbotAi = ({
  device = 'phone',
  promptFocused = false,
  visibleQuestions = AI_QUESTIONS.length,
}: {
  device?: 'phone' | 'tablet';
  /** White pill instead of grey — the state once whatever was over it has cleared. */
  promptFocused?: boolean;
  /** How many suggestions have appeared, for scenes that reveal them in sequence. */
  visibleQuestions?: number;
}) => {
  const l = LAYOUT[device];
  const viewport = VIEWPORT[device];
  const isTablet = device === 'tablet';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: viewport.width,
        height: viewport.height,
        overflow: 'hidden',
        backgroundColor: appColors.black,
      }}
    >
      {/* Setup rail — tablet only; the phone puts these in a bottom sheet, which the
          scene draws over the top of this surface rather than inside it. */}
      {isTablet ? <TabletNavRail active="ctrlbot" /> : null}

      <AppIcon
        name="ic_ctrlbot"
        size={l.markSize}
        tint={appColors.white}
        style={{
          position: 'absolute',
          left: l.contentX + l.contentWidth / 2 - l.markSize / 2,
          top: l.markTop,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: l.contentX + l.contentWidth / 2 - l.pillWidth / 2,
          top: l.pillTop,
          width: l.pillWidth,
          height: l.pillHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 999,
          backgroundColor: promptFocused ? appColors.white : appColors.gray75,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: l.pillFontSize,
          color: appColors.gray600,
        }}
      >
        {AI_PROMPT}
      </div>

      {/* The clear control, sitting above the list's right edge. Only the tablet
          capture frames it; on phone it is outside the area the scene ever shows. */}
      {l.clearSize ? (
        <div
          style={{
            position: 'absolute',
            left: l.contentX + l.contentWidth / 2 + l.listWidth / 2 - l.clearSize,
            top: l.listTop - l.clearSize - 12,
            width: l.clearSize,
            height: l.clearSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppIcon name="ic_close" size={l.clearSize} tint={appColors.white75} />
        </div>
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: l.contentX + l.contentWidth / 2 - l.listWidth / 2,
          top: l.listTop,
          width: l.listWidth,
          display: 'flex',
          flexDirection: 'column',
          gap: l.chipGap,
        }}
      >
        {AI_QUESTIONS.slice(0, visibleQuestions).map((question) => (
          <div
            key={question}
            style={{
              padding: `${l.chipPadY}px ${l.chipPadX}px`,
              borderRadius: 6,
              backgroundColor: appColors.gray15,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: l.chipFontSize,
              lineHeight: CHIP_LINE_HEIGHT,
              whiteSpace: isTablet ? 'nowrap' : 'normal',
              color: appColors.white,
            }}
          >
            {question}
          </div>
        ))}
      </div>
    </div>
  );
};
