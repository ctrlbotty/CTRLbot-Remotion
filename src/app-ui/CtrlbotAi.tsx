// The CTRLbot AI surface — the app's built-in FAQ, manual and troubleshooter.
//
// Built from the 2026-07-30 captures rather than layout XML: this screen is newer than
// the layouts checked into the app repo, which still carry the older seven-item setup
// drawer. Re-derive from res/ once the app catches up.
//
// The prompt pill is grey while the sheet is over it and white when it has focus, which
// is the difference between the two captures.

import {AppIcon} from './AppIcon';
import {appColors} from '../design/tokens.generated';
import {PHONE_VIEWPORT} from './PhoneEui';

/** The suggested questions, verbatim from the capture. */
export const AI_QUESTIONS = [
  'What is the End User Interface?',
  'What is CTRLbot IoT?',
  'How do I get started and add my first device?',
  'What is a driver, and how do I find one for my device?',
  'How do I create a connection to a device?',
];

export const AI_PROMPT = "Spill it. What's not switching?";

const MARK_TOP = 200;
const MARK_SIZE = 74;
const PILL_TOP = 300;
const PILL_H = 52;
const LIST_TOP = 396;
const CHIP_GAP = 10;

/** Regions for <Camera> and annotations, in the phone viewport's space. */
export const aiRegions = {
  full: {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height},
  mark: {
    x: PHONE_VIEWPORT.width / 2 - MARK_SIZE / 2,
    y: MARK_TOP,
    width: MARK_SIZE,
    height: MARK_SIZE,
  },
  prompt: {x: 42, y: PILL_TOP, width: PHONE_VIEWPORT.width - 84, height: PILL_H},
  questions: {x: 24, y: LIST_TOP, width: PHONE_VIEWPORT.width - 48, height: 300},
};

export const CtrlbotAi = ({
  promptFocused = false,
  visibleQuestions = AI_QUESTIONS.length,
}: {
  /** White pill instead of grey — the state once the sheet is out of the way. */
  promptFocused?: boolean;
  /** How many suggestions have appeared, for scenes that reveal them in sequence. */
  visibleQuestions?: number;
}) => (
  <div
    style={{
      position: 'relative',
      width: PHONE_VIEWPORT.width,
      height: PHONE_VIEWPORT.height,
      overflow: 'hidden',
      backgroundColor: appColors.black,
    }}
  >
    <AppIcon
      name="ic_ctrlbot"
      size={MARK_SIZE}
      tint={appColors.white}
      style={{
        position: 'absolute',
        left: PHONE_VIEWPORT.width / 2 - MARK_SIZE / 2,
        top: MARK_TOP,
      }}
    />

    <div
      style={{
        position: 'absolute',
        left: 42,
        top: PILL_TOP,
        width: PHONE_VIEWPORT.width - 84,
        height: PILL_H,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        backgroundColor: promptFocused ? appColors.white : appColors.gray75,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize: 16,
        color: appColors.gray600,
      }}
    >
      {AI_PROMPT}
    </div>

    <div
      style={{
        position: 'absolute',
        left: 24,
        right: 24,
        top: LIST_TOP,
        display: 'flex',
        flexDirection: 'column',
        gap: CHIP_GAP,
      }}
    >
      {AI_QUESTIONS.slice(0, visibleQuestions).map((question) => (
        <div
          key={question}
          style={{
            padding: '14px 18px',
            borderRadius: 6,
            backgroundColor: appColors.gray15,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.35,
            color: appColors.white,
          }}
        >
          {question}
        </div>
      ))}
    </div>
  </div>
);
