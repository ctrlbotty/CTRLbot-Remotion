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
import {appColors, appDimens} from '../design/tokens.generated';
import {PHONE_VIEWPORT} from './viewports';

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
const STRIP_BOTTOM_MARGIN = 24; // HorizontalScrollView layout_marginBottom
const STRIP_TOP = PHONE_VIEWPORT.height - VOLUME_HEIGHT - STRIP_BOTTOM_MARGIN - STRIP_HEIGHT;

// The ALL row is a weighted middle zone in av_switch_nxo.xml — EUIFragment hands it
// the leftover once the output grid is clamped, which centres it in the band between
// the outputs and the sources. It is not pinned under the grid.
const GRID_BOTTOM = GRID_TOP + ROW_HEIGHT * 2;
const ALL_ROW_HEIGHT = 50; // ImageButton is 50dp square
const ALL_ROW_TOP = GRID_BOTTOM + (STRIP_TOP - GRID_BOTTOM - ALL_ROW_HEIGHT) / 2;

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
} as const;

export type EuiOutput = {
  label: string;
  /** Routed source label, or null for an unrouted output. */
  source: string | null;
};

export type EuiInput = {label: string};

/** One output cell: a 16:9 panel over a black label bar. */
const OutputCell = ({output}: {output: EuiOutput}) => {
  const routed = output.source !== null;

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
          backgroundImage: `url(${staticFile(
            routed ? 'app-assets/disp_m_blue.png' : 'app-assets/disp_m_grey.png',
          )})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {routed ? (
          <>
            <AppIcon name="ic_hdmi_icon" size={22} tint={appColors.white} />
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
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
          fontFamily: 'Montserrat, sans-serif',
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
const SourceCard = ({input, selected}: {input: EuiInput; selected: boolean}) => (
  <div
    style={{
      flex: '0 0 auto',
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      margin: CARD_MARGIN,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: selected ? 5 : 6,
      backgroundColor: selected ? appColors.blue : appColors.black,
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

export const PhoneEui = ({
  outputs,
  inputs,
  selectedInput,
  volume,
}: {
  outputs: EuiOutput[];
  inputs: EuiInput[];
  /** Index into `inputs`. */
  selectedInput: number;
  /** 0..1 */
  volume: number;
}) => (
  // Column layout mirrors av_switch_nxo.xml: the grid takes its natural height, the
  // ALL row absorbs the leftover and centres in it, the source strip and volume bar
  // sit at the bottom.
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: PHONE_VIEWPORT.width,
      height: PHONE_VIEWPORT.height,
      overflow: 'hidden',
      // layout-port/_end_ui.xml backs the content area with @color/gray_15.
      backgroundColor: appColors.gray15,
    }}
  >
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
      <AppIcon name="ic_settings2" size={28} tint={appColors.white} />
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
        <OutputCell key={output.label} output={output} />
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

    {/* Source strip — 2.5 cards visible, the third half-cut as the scroll cue. */}
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
      {inputs.map((input, index) => (
        <SourceCard key={input.label} input={input} selected={index === selectedInput} />
      ))}
    </div>

    {/* Volume bar */}
    <div
      style={{
        height: VOLUME_HEIGHT,
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: appColors.black,
      }}
    >
      <AppIcon name="ic_speaker_on" size={26} tint={appColors.white} />
      <AppIcon name="ic_vol_left" size={20} tint={appColors.white} />
      <div
        style={{
          position: 'relative',
          flex: 1,
          height: 12,
          backgroundColor: appColors.gray25,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${volume * 100}%`,
            backgroundColor: appColors.priYellow,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${volume * 100}%`,
            top: -8,
            width: 10,
            height: 28,
            backgroundColor: appColors.white,
          }}
        />
      </div>
      <AppIcon name="ic_vol_right" size={20} tint={appColors.white} />
    </div>
  </div>
);
