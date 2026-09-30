// The phone-portrait End User Interface, rebuilt as live React.
//
// Geometry is taken from the app rather than eyeballed from a screenshot:
//   res/layout-port/_end_ui.xml           56dp header, exit control left, power right
//   res/layout-port/av_switch_nxo.xml     grid padding, ALL row, 128dp source strip
//   res/layout-port/item_eui_output_cell.xml   16:9 panel + 28dp label, 6dp margin
//   utilities/PhoneSourceCards.kt         104dp cards, 6dp margins, 2.5 visible slots
//   drawable/source_button_selector.xml   blue when selected, black otherwise
//
// The output-cell gradients are the app's own disp_m_*.png, so those cells are
// pixel-identical to the shipped UI while everything around them stays animatable.
//
// Coordinate space is dp at the phone viewport (see viewports.ts). <Camera> scales it,
// so every region in EUI_REGIONS is expressed in the same units the Android layout uses.

import {staticFile} from 'remotion';
import {AppIcon} from './AppIcon';
import {appColors, appDimens, appTextStyles} from '../design/tokens.generated';
import {PHONE_VIEWPORT} from './viewports';
import {font} from '../design/theme';

export {PHONE_VIEWPORT} from './viewports';

// av_switch_nxo.xml: GridLayout padding 8dp; item_eui_output_cell.xml: 6dp margin.
const GRID_PADDING = 8;
const CELL_MARGIN = 6;
const CELL_WIDTH = (PHONE_VIEWPORT.width - GRID_PADDING * 2 - CELL_MARGIN * 4) / 2; // 186
const PANEL_HEIGHT = (CELL_WIDTH * 9) / 16; // 104.6 — constraintDimensionRatio 16:9
const LABEL_HEIGHT = 28;
const LABEL_GAP = 4;
const ROW_HEIGHT = PANEL_HEIGHT + LABEL_GAP + LABEL_HEIGHT + CELL_MARGIN * 2;
const GRID_TOP = appDimens.headerHeight + 24; // ScrollView layout_marginTop

// PhoneSourceCards.kt: cards are sized so 2.5 fit the viewport, which is why the
// third card is always half-visible as the horizontal-scroll cue.
const STRIP_HEIGHT = 128;
const CARD_HEIGHT = 104;
const CARD_MARGIN = 6;
const CARD_WIDTH = (PHONE_VIEWPORT.width - 16) / 2.5 - CARD_MARGIN * 2; // 146.4
const VOLUME_HEIGHT = 56;
const AUDIO_PADDING = 14;
const AUDIO_GAP = 14;
const SPEAKER_SIZE = 26;
const VOLUME_ICON_SIZE = 20;
const VOLUME_SLIDER_X =
  AUDIO_PADDING + SPEAKER_SIZE + AUDIO_GAP + VOLUME_ICON_SIZE + AUDIO_GAP;
const VOLUME_SLIDER_WIDTH =
  PHONE_VIEWPORT.width -
  AUDIO_PADDING * 2 -
  SPEAKER_SIZE -
  VOLUME_ICON_SIZE * 2 -
  AUDIO_GAP * 3;
const STRIP_BOTTOM_MARGIN = 24; // HorizontalScrollView layout_marginBottom
const STRIP_TOP = PHONE_VIEWPORT.height - VOLUME_HEIGHT - STRIP_BOTTOM_MARGIN - STRIP_HEIGHT;

// The ALL row is a weighted middle zone in av_switch_nxo.xml — EUIFragment hands it
// the leftover once the output grid is clamped, which centres it in the band between
// the outputs and the sources. It is not pinned under the grid.
const GRID_BOTTOM = GRID_TOP + ROW_HEIGHT * 2;
const ALL_ROW_HEIGHT = 50; // ImageButton is 50dp square
const ALL_ROW_TOP = GRID_BOTTOM + (STRIP_TOP - GRID_BOTTOM - ALL_ROW_HEIGHT) / 2;

// av_switch_nx1.xml: a centred vertical stack inside the 668dp content viewport.
// TextAppearance.CtrlBot.TitleSecondary supplies the only non-dimen measurement in the
// stack; its 15sp text is rendered at a 1.2 line height, then receives the layout's 8dp
// padding above and below.
const NX1_ROOT_PADDING = 8;
const NX1_DISPLAY_WIDTH = 320;
const NX1_DISPLAY_HEIGHT = 180;
const NX1_DISPLAY_MARGIN = 8;
const NX1_LABEL_GAP = 8;
const NX1_LABEL_PADDING = 8;
const NX1_LABEL_LINE_HEIGHT = appTextStyles.TitleSecondary.sizeSp * 1.2;
const NX1_LABEL_HEIGHT = NX1_LABEL_LINE_HEIGHT + NX1_LABEL_PADDING * 2;
const NX1_ARROW_SIZE = 40;
const NX1_ARROW_MARGIN_TOP = 4;
const NX1_ARROW_MARGIN_BOTTOM = 10;
const NX1_STRIP_HEIGHT = 128;
const NX1_CONTENT_HEIGHT = PHONE_VIEWPORT.height - appDimens.headerHeight - VOLUME_HEIGHT;
const NX1_STACK_HEIGHT =
  NX1_DISPLAY_MARGIN * 2 +
  NX1_DISPLAY_HEIGHT +
  NX1_LABEL_GAP +
  NX1_LABEL_HEIGHT +
  NX1_ARROW_MARGIN_TOP +
  NX1_ARROW_SIZE +
  NX1_ARROW_MARGIN_BOTTOM +
  NX1_STRIP_HEIGHT;
const NX1_STACK_TOP =
  appDimens.headerHeight +
  NX1_ROOT_PADDING +
  (NX1_CONTENT_HEIGHT - NX1_ROOT_PADDING * 2 - NX1_STACK_HEIGHT) / 2;
const NX1_STRIP_TOP =
  NX1_STACK_TOP +
  NX1_DISPLAY_MARGIN * 2 +
  NX1_DISPLAY_HEIGHT +
  NX1_LABEL_GAP +
  NX1_LABEL_HEIGHT +
  NX1_ARROW_MARGIN_TOP +
  NX1_ARROW_SIZE +
  NX1_ARROW_MARGIN_BOTTOM;
const NX1_CARD_WIDTH =
  (PHONE_VIEWPORT.width - NX1_ROOT_PADDING * 2 - 16) / 2.5 - CARD_MARGIN * 2;

/**
 * Named regions in the EUI's own coordinate space, for <Camera> and <FocusRing>.
 * Derived from the same constants that lay the UI out, so a layout change moves
 * the camera targets with it.
 */
export const EUI_REGIONS = {
  full: {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height},
  header: {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: appDimens.headerHeight},
  exitControl: {x: 6, y: 12, width: 36, height: 32},
  powerControl: {x: PHONE_VIEWPORT.width - 44, y: 12, width: 36, height: 32},
  outputGrid: {
    x: GRID_PADDING,
    y: GRID_TOP,
    width: PHONE_VIEWPORT.width - GRID_PADDING * 2,
    height: ROW_HEIGHT * 2,
  },
  outputCell: (index: number) => ({
    x: GRID_PADDING + (index % 2) * (CELL_WIDTH + CELL_MARGIN * 2) + CELL_MARGIN,
    y: GRID_TOP + Math.floor(index / 2) * ROW_HEIGHT + CELL_MARGIN,
    width: CELL_WIDTH,
    height: PANEL_HEIGHT + LABEL_GAP + LABEL_HEIGHT,
  }),
  routeAll: {
    x: PHONE_VIEWPORT.width / 2 - 70,
    y: ALL_ROW_TOP,
    width: 140,
    height: ALL_ROW_HEIGHT,
  },
  inputStrip: {x: 0, y: STRIP_TOP, width: PHONE_VIEWPORT.width, height: STRIP_HEIGHT},
  inputTile: (index: number) => ({
    x: 8 + CARD_MARGIN + index * (CARD_WIDTH + CARD_MARGIN * 2),
    y: STRIP_TOP + (STRIP_HEIGHT - CARD_HEIGHT) / 2,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  }),
  volumeBar: {
    x: 0,
    y: PHONE_VIEWPORT.height - VOLUME_HEIGHT,
    width: PHONE_VIEWPORT.width,
    height: VOLUME_HEIGHT,
  },
  speakerControl: {
    x: AUDIO_PADDING,
    y: PHONE_VIEWPORT.height - VOLUME_HEIGHT + (VOLUME_HEIGHT - SPEAKER_SIZE) / 2,
    width: SPEAKER_SIZE,
    height: SPEAKER_SIZE,
  },
  volumeSlider: {
    x: VOLUME_SLIDER_X,
    y: PHONE_VIEWPORT.height - VOLUME_HEIGHT + (VOLUME_HEIGHT - 28) / 2,
    width: VOLUME_SLIDER_WIDTH,
    height: 28,
  },
} as const;

/** Regions for the portrait Many-to-One surface, derived from av_switch_nx1.xml. */
export const PHONE_EUI_MANY_TO_ONE_REGIONS = {
  full: {x: 0, y: 0, width: PHONE_VIEWPORT.width, height: PHONE_VIEWPORT.height},
  exitControl: {x: 6, y: 12, width: 36, height: 32},
  displayPanel: {
    x: (PHONE_VIEWPORT.width - NX1_DISPLAY_WIDTH) / 2,
    y: NX1_STACK_TOP + NX1_DISPLAY_MARGIN,
    width: NX1_DISPLAY_WIDTH,
    height: NX1_DISPLAY_HEIGHT,
  },
  inputStrip: {
    x: NX1_ROOT_PADDING,
    y: NX1_STRIP_TOP,
    width: PHONE_VIEWPORT.width - NX1_ROOT_PADDING * 2,
    height: NX1_STRIP_HEIGHT,
  },
  inputTile: (index: number) => ({
    x: NX1_ROOT_PADDING + 8 + CARD_MARGIN + index * (NX1_CARD_WIDTH + CARD_MARGIN * 2),
    y: NX1_STRIP_TOP + (NX1_STRIP_HEIGHT - CARD_HEIGHT) / 2,
    width: NX1_CARD_WIDTH,
    height: CARD_HEIGHT,
  }),
  volumeBar: {
    x: 0,
    y: PHONE_VIEWPORT.height - VOLUME_HEIGHT,
    width: PHONE_VIEWPORT.width,
    height: VOLUME_HEIGHT,
  },
} as const;

export type EuiOutput = {
  label: string;
  /** Routed source label, or null for an unrouted output. */
  source: string | null;
  selected?: boolean;
  highlight?: 'yellow' | 'blue';
};

export type EuiInput = {label: string};

/** One output cell: a 16:9 panel over a black label bar. */
const OutputCell = ({
  output,
  selectedSource,
}: {
  output: EuiOutput;
  selectedSource: string | null;
}) => {
  const routed = output.source !== null;
  const isYellow = output.highlight === 'yellow' || output.selected;
  const isBlue =
    output.highlight === 'blue' ||
    (!isYellow && routed && output.source === selectedSource);

  const bgImage = isYellow
    ? 'app-assets/disp_m_yellow.png'
    : isBlue
      ? 'app-assets/disp_m_blue.png'
      : 'app-assets/disp_m_grey.png';

  return (
    <div style={{width: CELL_WIDTH, margin: CELL_MARGIN}}>
      <div
        style={{
          width: CELL_WIDTH,
          height: PANEL_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          backgroundImage: `url(${staticFile(bgImage)})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {routed ? (
          <>
            <AppIcon name="ic_hdmi_icon" size={22} tint={appColors.white} />
            <span
              style={{
                fontFamily: font.ui,
                fontWeight: 400,
                fontSize: 13,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                color: appColors.white,
              }}
            >
              {output.source}
            </span>
          </>
        ) : null}
      </div>
      <div
        style={{
          width: CELL_WIDTH,
          height: LABEL_HEIGHT,
          marginTop: LABEL_GAP,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appColors.black,
          fontFamily: font.ui,
          fontWeight: 400,
          fontSize: 12,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: appColors.white,
        }}
      >
        {output.label}
      </div>
    </div>
  );
};

/** One source card. Selected takes @color/blue at 5dp radius; default is black at 6dp. */
const SourceCard = ({
  input,
  selected,
  selectedColor = appColors.blue,
  width = CARD_WIDTH,
}: {
  input: EuiInput;
  selected: boolean;
  selectedColor?: string;
  width?: number;
}) => (
  <div
    style={{
      flex: '0 0 auto',
      width,
      height: CARD_HEIGHT,
      margin: CARD_MARGIN,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: selected ? 5 : 6,
      backgroundColor: selected ? selectedColor : appColors.black,
    }}
  >
    <AppIcon
      name="ic_hdmi_icon_sm"
      size={44}
      tint={appColors.white}
      style={{flex: 1, width: '100%', height: 'auto'}}
    />
    <span
      style={{
        marginTop: 4,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 13,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        color: appColors.white,
      }}
    >
      {input.label}
    </span>
  </div>
);

/**
 * How far the source strip is scrolled, in dp, to bring `index` into view.
 *
 * The strip holds about two and a half cards, so selecting anything past the second one
 * highlights a card nobody can see. This is the minimum scroll that reveals the card,
 * plus a peek of the next one — the same thing a real scroll view does when you tab onto
 * an off-screen child. Exported so a scene can interpolate between two positions rather
 * than jumping.
 */
export const phoneInputScrollFor = (index: number, inputCount: number) => {
  const pitch = CARD_WIDTH + CARD_MARGIN * 2;
  const cardRight = 8 + CARD_MARGIN + index * pitch + CARD_WIDTH;
  const contentWidth = 8 + inputCount * pitch + 8;
  const peek = 30;
  return Math.max(
    0,
    Math.min(cardRight + peek - PHONE_VIEWPORT.width, contentWidth - PHONE_VIEWPORT.width),
  );
};

export const PhoneVolumeBar = ({
  volume = 0.58,
  speakerMuted = false,
}: {
  volume?: number;
  speakerMuted?: boolean;
}) => (
  <div
    style={{
      height: VOLUME_HEIGHT,
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: AUDIO_GAP,
      paddingLeft: AUDIO_PADDING,
      paddingRight: AUDIO_PADDING,
      backgroundColor: appColors.black,
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <AppIcon
      name={speakerMuted ? 'ic_speaker_off' : 'ic_speaker_on'}
      size={SPEAKER_SIZE}
      tint={speakerMuted ? appColors.priRed : appColors.white}
    />
    <AppIcon name="ic_vol_left" size={VOLUME_ICON_SIZE} tint={appColors.white} />
    {/* Track 10 against a 28 thumb — the same 2.8 ratio the tablet strip and the app
        itself run at. The phone's absolute numbers are smaller because its audio strip
        is, but the proportion is what has to match across the two surfaces or the same
        control reads as a different one. See the note on the tablet track. */}
    <div
      style={{
        position: 'relative',
        flex: 1,
        height: 10,
        backgroundColor: appColors.gray25,
        border: '1px solid #000000',
        borderRadius: 2,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          borderRadius: 1.5,
          background: 'linear-gradient(to right, #FFFFFF 0%, #FFFF48 50%, #FF0B00 100%)',
          clipPath: `inset(0 ${(1 - Math.min(1, Math.max(0, volume))) * 100}% 0 0)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${Math.min(1, Math.max(0, volume)) * 100}%`,
          top: '50%',
          translate: '-50% -50%',
          width: 10,
          height: 28,
          backgroundColor: appColors.white,
          border: '2px solid #000000',
          borderRadius: 1,
          boxSizing: 'border-box',
        }}
      />
    </div>
    <AppIcon name="ic_vol_right" size={VOLUME_ICON_SIZE} tint={appColors.white} />
  </div>
);

export type PhoneEuiProps = {
  outputs: EuiOutput[];
  inputs: EuiInput[];
  /** Index into `inputs`, or null for the cold state — nothing selected yet. */
  selectedInput: number | null;
  /** 0..1 */
  volume: number;
  speakerMuted?: boolean;
  /** Source-strip scroll in dp. See phoneInputScrollFor(). */
  inputScroll?: number;
  showExitHint?: boolean;
  selectedInputColor?: 'blue' | 'yellow';
  drag?: {
    inputIndex: number;
    x: number;
    y: number;
    opacity?: number;
    scale?: number;
  } | null;
};

export const PhoneEui = ({
  outputs,
  inputs,
  selectedInput,
  volume,
  speakerMuted = false,
  inputScroll = 0,
  showExitHint = false,
  selectedInputColor = 'blue',
  drag,
}: PhoneEuiProps) => (
  // Column layout mirrors av_switch_nxo.xml: the grid takes its natural height, the
  // ALL row absorbs the leftover and centres in it, the source strip and volume bar
  // sit at the bottom.
  <div
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: PHONE_VIEWPORT.width,
      height: PHONE_VIEWPORT.height,
      overflow: 'hidden',
      // layout-port/_end_ui.xml backs the content area with @color/gray_15.
      backgroundColor: appColors.gray15,
    }}
  >
    {/* Dragged source card overlay */}
    {drag ? (
      <div
        style={{
          position: 'absolute',
          left: drag.x,
          top: drag.y,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          zIndex: 100,
          pointerEvents: 'none',
          transform: `translate(-50%, -50%) scale(${drag.scale ?? 1.05})`,
          opacity: drag.opacity ?? 0.95,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
          borderRadius: 6,
          backgroundColor: appColors.blue,
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <AppIcon
          name="ic_hdmi_icon_sm"
          size={44}
          tint={appColors.white}
          style={{flex: 1, width: '100%', height: 'auto'}}
        />
        <span
          style={{
            marginTop: 4,
            fontFamily: font.ui,
            fontWeight: 400,
            fontSize: 13,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            color: appColors.white,
          }}
        >
          {inputs[drag.inputIndex]?.label ?? ''}
        </span>
      </div>
    ) : null}

    {/* Header — exit control left, system power right */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: appDimens.headerHeight,
        flex: '0 0 auto',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: appColors.black,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <AppIcon name="ic_settings2" size={28} tint={appColors.white} />
        {showExitHint ? (
          <span
            style={{
              marginLeft: 6,
              fontFamily: font.display,
              fontSize: 13,
              color: appColors.white,
              letterSpacing: 0.2,
            }}
          >
            Keep holding to return to Setup
          </span>
        ) : null}
      </div>
      <AppIcon name="ic_power" size={30} />
    </div>

    {/* Output grid */}
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flex: '0 0 auto',
        paddingLeft: GRID_PADDING,
        paddingRight: GRID_PADDING,
        marginTop: 24,
      }}
    >
      {outputs.map((output) => (
        <OutputCell
          key={output.label}
          output={output}
          selectedSource={
            selectedInput === null ? null : (inputs[selectedInput]?.label ?? null)
          }
        />
      ))}
    </div>

    {/* Route-all row — takes the leftover and centres in it.
        ic_route5 is rotated 270deg in the layout. */}
    <div
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <span
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: 18,
          color: appColors.white,
        }}
      >
        All
      </span>
      <AppIcon
        name="ic_route5"
        size={50}
        tint={appColors.white}
        style={{rotate: '270deg'}}
      />
    </div>

    {/* Source strip — 2.5 cards visible, the third half-cut as the scroll cue. The inner
        row slides so a selected card past the second one is actually on screen. */}
    <div
      style={{
        height: STRIP_HEIGHT,
        flex: '0 0 auto',
        marginBottom: STRIP_BOTTOM_MARGIN,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: '0 0 auto',
          translate: `${-inputScroll}px 0px`,
        }}
      >
        {inputs.map((input, index) => (
          <SourceCard
            key={input.label}
            input={input}
            selected={index === selectedInput}
            selectedColor={selectedInputColor === 'yellow' ? '#FFFF00' : appColors.blue}
          />
        ))}
      </div>
    </div>

    {/* Volume bar */}
    <PhoneVolumeBar volume={volume} speakerMuted={speakerMuted} />
  </div>
);

/**
 * Portrait Many-to-One EUI: several source cards feed one 320x180 display panel.
 * This is the live counterpart of res/layout-port/av_switch_nx1.xml.
 */
export const PhoneEuiManyToOne = ({
  inputs,
  selectedInput,
  volume,
  speakerMuted = false,
  outputLabel = 'Display 1',
  showExitHint = false,
}: {
  inputs: EuiInput[];
  /** Index into `inputs`, or null for the cold state — nothing routed yet. */
  selectedInput: number | null;
  /** 0..1 */
  volume: number;
  speakerMuted?: boolean;
  outputLabel?: string;
  showExitHint?: boolean;
}) => {
  const selectedSource = selectedInput === null ? undefined : inputs[selectedInput];
  const routed = selectedSource !== undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: PHONE_VIEWPORT.width,
        height: PHONE_VIEWPORT.height,
        overflow: 'hidden',
        backgroundColor: appColors.gray15,
      }}
    >
      {/* _end_ui.xml header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: appDimens.headerHeight,
          flex: '0 0 auto',
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: appColors.black,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center'}}>
          <AppIcon name="ic_settings2" size={28} tint={appColors.white} />
          {showExitHint ? (
            <span
              style={{
                marginLeft: 6,
                fontFamily: font.display,
                fontSize: 13,
                color: appColors.white,
                letterSpacing: 0.2,
              }}
            >
              Keep holding to return to Setup
            </span>
          ) : null}
        </div>
        <AppIcon name="ic_power" size={30} />
      </div>

      {/* av_switch_nx1.xml: the whole stack is centred inside the content viewport. */}
      <div
        style={{
          width: '100%',
          height: NX1_CONTENT_HEIGHT,
          flex: '0 0 auto',
          boxSizing: 'border-box',
          padding: NX1_ROOT_PADDING,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: appColors.gray15,
        }}
      >
        <div
          style={{
            width: '100%',
            marginTop: NX1_DISPLAY_MARGIN,
            marginBottom: NX1_DISPLAY_MARGIN,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{width: NX1_DISPLAY_WIDTH}}>
            <div
              style={{
                width: NX1_DISPLAY_WIDTH,
                height: NX1_DISPLAY_HEIGHT,
                padding: 10,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                // Grey and empty until something is routed to it — the same pair of
                // states the matrix output cells use.
                backgroundImage: `url(${staticFile(
                  routed ? 'app-assets/disp_lg_blue.png' : 'app-assets/disp_lg_grey.png',
                )})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {routed ? (
                <>
                  <AppIcon name="ic_hdmi_icon" size={60} tint={appColors.white} />
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 400,
                      fontSize: appTextStyles.TitleSecondary.sizeSp,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                      color: appColors.white,
                    }}
                  >
                    {selectedSource.label}
                  </span>
                </>
              ) : null}
            </div>
            <div
              style={{
                width: NX1_DISPLAY_WIDTH,
                marginTop: NX1_LABEL_GAP,
                paddingTop: NX1_LABEL_PADDING,
                paddingBottom: NX1_LABEL_PADDING,
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: appTextStyles.TitleSecondary.sizeSp,
                lineHeight: `${NX1_LABEL_LINE_HEIGHT}px`,
                textAlign: 'center',
                textTransform: 'uppercase',
                color: appColors.white,
                backgroundColor: appColors.black,
              }}
            >
              {outputLabel}
            </div>
          </div>
        </div>

        <div
          style={{
            width: NX1_ARROW_SIZE,
            height: NX1_ARROW_SIZE,
            flex: '0 0 auto',
            alignSelf: 'center',
            marginTop: NX1_ARROW_MARGIN_TOP,
            marginBottom: NX1_ARROW_MARGIN_BOTTOM,
          }}
        >
          <AppIcon
            name="nav_right"
            size={NX1_ARROW_SIZE}
            tint={appColors.black}
            style={{rotate: '270deg'}}
          />
        </div>

        <div
          style={{
            width: '100%',
            height: NX1_STRIP_HEIGHT,
            flex: '0 0 auto',
            boxSizing: 'border-box',
            paddingLeft: 8,
            paddingRight: 8,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {inputs.map((input, index) => (
            <SourceCard
              key={input.label}
              input={input}
              selected={index === selectedInput}
              width={NX1_CARD_WIDTH}
            />
          ))}
        </div>
      </div>

      {/* _end_ui.xml audio controls */}
      <PhoneVolumeBar volume={volume} speakerMuted={speakerMuted} />
    </div>
  );
};
