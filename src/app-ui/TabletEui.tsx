// The tablet-landscape End User Interface, rebuilt as live React.
//
// Geometry from the app:
//   res/layout-land/_end_ui.xml        90dp bar, exit left, power right, bg_eui backdrop
//   res/layout/av_switch_nxo.xml       30 / 10 / 60 weighted columns
//   res/layout/item_eui_output_cell.xml  320x240 cell, 180dp panel, 5dp label gap
//   values/dimens.xml                  every eui_matrix_* constant below
//   EUIFragment.createLandscapeMatrixSourceButton  102dp rows, icon start, label end
//
// This is the matrix (nxo) variant, the direct analogue of the phone grid, so the
// routing script reads identically across both cuts. The app also ships a
// many-to-one (nx1) landscape layout with a single large display — see
// eui_nx1_* in dimens.xml if a scene needs that instead.

import {staticFile} from 'remotion';
import {AppIcon} from './AppIcon';
import {appColors, appDimens, appTextStyles} from '../design/tokens.generated';
import {TABLET_VIEWPORT} from './viewports';
import type {EuiInput, EuiOutput} from './PhoneEui';

export {TABLET_VIEWPORT} from './viewports';

const BAR_HEIGHT = appDimens.euiBarHeight; //        90
const SEEKBAR_HEIGHT = appDimens.euiSeekbarHeight; // 100
const AUDIO_PADDING = 30;
const AUDIO_GAP = 24;
const SPEAKER_SIZE = 44;
const VOLUME_ICON_SIZE = 32;
const VOLUME_SLIDER_X =
  AUDIO_PADDING + SPEAKER_SIZE + AUDIO_GAP + VOLUME_ICON_SIZE + AUDIO_GAP;
const VOLUME_SLIDER_WIDTH =
  TABLET_VIEWPORT.width -
  AUDIO_PADDING * 2 -
  SPEAKER_SIZE -
  VOLUME_ICON_SIZE * 2 -
  AUDIO_GAP * 3;

// Column weights must total 100 — the app enforces the same invariant in dimens.xml.
const CONTENT_WIDTH = TABLET_VIEWPORT.width;
const SOURCE_COL = CONTENT_WIDTH * (appDimens.euiMatrixSourceWeight / 100); // 30%
const ARROW_COL = CONTENT_WIDTH * (appDimens.euiMatrixArrowWeight / 100); //   10%
const OUTPUT_COL = CONTENT_WIDTH * (appDimens.euiMatrixOutputWeight / 100); // 60%

const CELL_WIDTH = appDimens.euiMatrixCellWidth; //         320
const CELL_HEIGHT = appDimens.euiMatrixCellHeight; //       240
const PANEL_HEIGHT = appDimens.euiMatrixCellPanelHeight; // 180
const CELL_GAP_END = appDimens.euiMatrixCellGapEnd; //      40
const CELL_GAP_BOTTOM = appDimens.euiMatrixCellGapBottom; // 20
const GRID_TOP = appDimens.euiMatrixGridTop; //             36

const SOURCE_HEIGHT = appDimens.euiMatrixSourceHeight; // 102
const SOURCE_GAP = appDimens.euiMatrixSourceGap; //        15
const SOURCE_TOP = appDimens.euiMatrixSourceTop; //        30
const COLUMN_START = appDimens.euiMatrixColumnStart; //    40

const CONTENT_TOP = BAR_HEIGHT;
const CONTENT_HEIGHT = TABLET_VIEWPORT.height - BAR_HEIGHT - SEEKBAR_HEIGHT;

// res/layout/av_switch_nx1.xml: after 20dp root padding and the declared margins,
// the remaining width is divided by the 40 / 10 / 70 layout weights.
const NX1_PADDING = appDimens.euiNx1Padding;
const NX1_GAP = appDimens.euiNx1Gap;
const NX1_WEIGHT_TOTAL = 120;
const NX1_WEIGHTED_WIDTH = TABLET_VIEWPORT.width - NX1_PADDING * 2 - NX1_GAP * 4;
const NX1_SOURCE_WIDTH = NX1_WEIGHTED_WIDTH * (40 / NX1_WEIGHT_TOTAL);
const NX1_ARROW_WIDTH = NX1_WEIGHTED_WIDTH * (10 / NX1_WEIGHT_TOTAL);
const NX1_DISPLAY_COLUMN_WIDTH = NX1_WEIGHTED_WIDTH * (70 / NX1_WEIGHT_TOTAL);
const NX1_COLUMN_TOP =
  CONTENT_TOP + (CONTENT_HEIGHT - appDimens.euiNx1ColumnHeight) / 2;
const NX1_SOURCE_X = NX1_PADDING;
const NX1_ARROW_X = NX1_SOURCE_X + NX1_SOURCE_WIDTH + NX1_GAP * 2;
const NX1_DISPLAY_COLUMN_X = NX1_ARROW_X + NX1_ARROW_WIDTH + NX1_GAP * 2;
const NX1_DISPLAY_X =
  NX1_DISPLAY_COLUMN_X +
  (NX1_DISPLAY_COLUMN_WIDTH - appDimens.euiNx1DisplayWidth) / 2;

/** Named regions in the tablet EUI's coordinate space, for <Camera> and annotations. */
export const TABLET_EUI_REGIONS = {
  full: {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height},
  header: {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: BAR_HEIGHT},
  exitControl: {x: 10, y: 10, width: 70, height: 70},
  powerControl: {x: TABLET_VIEWPORT.width - 100, y: 10, width: 70, height: 70},
  sourceColumn: {
    x: COLUMN_START,
    y: CONTENT_TOP + SOURCE_TOP,
    width: SOURCE_COL - COLUMN_START,
    height: CONTENT_HEIGHT - SOURCE_TOP,
  },
  sourceRow: (index: number) => ({
    x: COLUMN_START + 10,
    y: CONTENT_TOP + SOURCE_TOP + SOURCE_GAP + index * (SOURCE_HEIGHT + SOURCE_GAP * 2),
    width: SOURCE_COL - COLUMN_START - 20,
    height: SOURCE_HEIGHT,
  }),
  routeAll: {
    x: SOURCE_COL,
    y: CONTENT_TOP + CONTENT_HEIGHT / 2 - 50,
    width: ARROW_COL,
    height: 100,
  },
  outputGrid: {
    x: SOURCE_COL + ARROW_COL,
    y: CONTENT_TOP + GRID_TOP,
    width: OUTPUT_COL,
    height: (CELL_HEIGHT + CELL_GAP_BOTTOM) * 2,
  },
  outputCell: (index: number) => ({
    x: SOURCE_COL + ARROW_COL + (index % 2) * (CELL_WIDTH + CELL_GAP_END),
    y: CONTENT_TOP + GRID_TOP + Math.floor(index / 2) * (CELL_HEIGHT + CELL_GAP_BOTTOM),
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
  }),
  volumeBar: {
    x: 0,
    y: TABLET_VIEWPORT.height - SEEKBAR_HEIGHT,
    width: TABLET_VIEWPORT.width,
    height: SEEKBAR_HEIGHT,
  },
  speakerControl: {
    x: AUDIO_PADDING,
    y: TABLET_VIEWPORT.height - SEEKBAR_HEIGHT + (SEEKBAR_HEIGHT - SPEAKER_SIZE) / 2,
    width: SPEAKER_SIZE,
    height: SPEAKER_SIZE,
  },
  volumeSlider: {
    x: VOLUME_SLIDER_X,
    y: TABLET_VIEWPORT.height - SEEKBAR_HEIGHT + (SEEKBAR_HEIGHT - 34) / 2,
    width: VOLUME_SLIDER_WIDTH,
    height: 34,
  },
} as const;

/** Regions for the landscape Many-to-One surface from res/layout/av_switch_nx1.xml. */
export const TABLET_EUI_MANY_TO_ONE_REGIONS = {
  full: {x: 0, y: 0, width: TABLET_VIEWPORT.width, height: TABLET_VIEWPORT.height},
  exitControl: {x: 10, y: 10, width: 70, height: 70},
  sourceColumn: {
    x: NX1_SOURCE_X,
    y: NX1_COLUMN_TOP,
    width: NX1_SOURCE_WIDTH,
    height: appDimens.euiNx1ColumnHeight,
  },
  sourceRow: (index: number) => ({
    x: NX1_SOURCE_X + 10,
    y: NX1_COLUMN_TOP + 10 + index * (SOURCE_HEIGHT + 20),
    width: NX1_SOURCE_WIDTH - 20,
    height: SOURCE_HEIGHT,
  }),
  displayPanel: {
    x: NX1_DISPLAY_X,
    y: NX1_COLUMN_TOP,
    width: appDimens.euiNx1DisplayWidth,
    height: appDimens.euiNx1DisplayHeight,
  },
  volumeBar: {
    x: 0,
    y: TABLET_VIEWPORT.height - SEEKBAR_HEIGHT,
    width: TABLET_VIEWPORT.width,
    height: SEEKBAR_HEIGHT,
  },
} as const;

/** One 320x240 output cell: a 180dp panel over a black label bar. */
const OutputCell = ({
  output,
  selectedSource,
}: {
  output: EuiOutput;
  selectedSource: string | null;
}) => {
  const routed = output.source !== null;
  const selected = routed && output.source === selectedSource;

  return (
    <div
      style={{
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        marginRight: CELL_GAP_END,
        marginBottom: CELL_GAP_BOTTOM,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          height: PANEL_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: appDimens.euiMatrixCellIconGap,
          backgroundImage: `url(${staticFile(
            selected ? 'app-assets/disp_m_blue.png' : 'app-assets/disp_m_grey.png',
          )})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {routed ? (
          <>
            <AppIcon
              name="ic_hdmi_icon"
              size={appDimens.euiMatrixCellIcon}
              tint={appColors.white}
            />
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: 26,
                letterSpacing: 0.6,
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
          flex: 1,
          marginTop: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appColors.black,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: 24,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: appColors.white,
        }}
      >
        {output.label}
      </div>
    </div>
  );
};

/**
 * One source row. Landscape rows put the icon at the start and right-align the label,
 * unlike the portrait cards which stack them.
 */
const SourceRow = ({input, selected}: {input: EuiInput; selected: boolean}) => (
  <div
    style={{
      width: '100%',
      height: SOURCE_HEIGHT,
      marginTop: SOURCE_GAP,
      marginBottom: SOURCE_GAP,
      paddingLeft: 20,
      paddingRight: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: selected ? 5 : 6,
      backgroundColor: selected ? appColors.blue : appColors.black,
    }}
  >
    <AppIcon name="ic_hdmi_icon_sm" size={48} tint={appColors.white} />
    <span
      style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 26,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: appColors.white,
      }}
    >
      {input.label}
    </span>
  </div>
);

export const TabletEui = ({
  outputs,
  inputs,
  selectedInput,
  volume,
  speakerMuted = false,
}: {
  outputs: EuiOutput[];
  inputs: EuiInput[];
  /** Index into `inputs`, or null for the cold state — nothing selected yet. */
  selectedInput: number | null;
  /** 0..1 */
  volume: number;
  speakerMuted?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: TABLET_VIEWPORT.width,
      height: TABLET_VIEWPORT.height,
      overflow: 'hidden',
      backgroundColor: appColors.black,
    }}
  >
    {/* Top bar — exit control left, system power right */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: BAR_HEIGHT,
        flex: '0 0 auto',
        paddingLeft: appDimens.euiBarIconPadding,
        paddingRight: appDimens.euiBarIconPadding,
        backgroundColor: appColors.black,
      }}
    >
      <AppIcon name="ic_settings2" size={52} tint={appColors.white} />
      <AppIcon name="ic_power" size={54} />
    </div>

    {/* Content — the app backs this with the bg_eui radial, not a flat fill */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        backgroundImage: `url(${staticFile('app-assets/bg_eui.png')})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Sources — weight 30 */}
      <div
        style={{
          width: SOURCE_COL,
          paddingLeft: COLUMN_START,
          paddingRight: 10,
          paddingTop: SOURCE_TOP,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {inputs.map((input, index) => (
          <SourceRow key={input.label} input={input} selected={index === selectedInput} />
        ))}
      </div>

      {/* Route-all — weight 10. Not rotated in landscape; portrait turns it 270deg. */}
      <div
        style={{
          width: ARROW_COL,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            marginBottom: 10,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 30,
            color: appColors.white,
          }}
        >
          All
        </span>
        <AppIcon
          name="ic_route5"
          size={appDimens.euiMatrixArrowSize}
          tint={appColors.white}
        />
      </div>

      {/* Outputs — weight 60 */}
      <div
        style={{
          width: OUTPUT_COL,
          paddingTop: GRID_TOP,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          overflow: 'hidden',
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
    </div>

    {/* Volume bar */}
    <div
      style={{
        height: SEEKBAR_HEIGHT,
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: AUDIO_GAP,
        paddingLeft: AUDIO_PADDING,
        paddingRight: AUDIO_PADDING,
        backgroundColor: appColors.black,
      }}
    >
      <AppIcon
        name={speakerMuted ? 'ic_speaker_off' : 'ic_speaker_on'}
        size={SPEAKER_SIZE}
        tint={appColors.white}
      />
      <AppIcon name="ic_vol_left" size={VOLUME_ICON_SIZE} tint={appColors.white} />
      <div style={{position: 'relative', flex: 1, height: 14, backgroundColor: appColors.gray25}}>
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
            top: -10,
            width: 12,
            height: 34,
            backgroundColor: appColors.white,
          }}
        />
      </div>
      <AppIcon name="ic_vol_right" size={VOLUME_ICON_SIZE} tint={appColors.white} />
    </div>
  </div>
);

const Nx1SourceRow = ({input, selected}: {input: EuiInput; selected: boolean}) => (
  <div
    style={{
      width: 'calc(100% - 20px)',
      height: SOURCE_HEIGHT,
      margin: 10,
      paddingLeft: 20,
      paddingRight: 20,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: selected ? 5 : 6,
      backgroundColor: selected ? appColors.blue : appColors.black,
    }}
  >
    <AppIcon name="ic_hdmi_icon_sm" size={48} tint={appColors.white} />
    <span
      style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 26,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: appColors.white,
      }}
    >
      {input.label}
    </span>
  </div>
);

/** Landscape Many-to-One EUI, from res/layout/av_switch_nx1.xml. */
export const TabletEuiManyToOne = ({
  inputs,
  selectedInput,
  volume,
  speakerMuted = false,
  outputLabel = 'Display 1',
}: {
  inputs: EuiInput[];
  /** Index into `inputs`, or null for the cold state — nothing routed yet. */
  selectedInput: number | null;
  /** 0..1 */
  volume: number;
  speakerMuted?: boolean;
  outputLabel?: string;
}) => {
  const selectedSource = selectedInput === null ? undefined : inputs[selectedInput];
  const routed = selectedSource !== undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: TABLET_VIEWPORT.width,
        height: TABLET_VIEWPORT.height,
        overflow: 'hidden',
        backgroundColor: appColors.black,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: BAR_HEIGHT,
          flex: '0 0 auto',
          paddingLeft: appDimens.euiBarIconPadding,
          paddingRight: appDimens.euiBarIconPadding,
          backgroundColor: appColors.black,
        }}
      >
        <AppIcon name="ic_settings2" size={52} tint={appColors.white} />
        <AppIcon name="ic_power" size={54} />
      </div>

      <div
        style={{
          width: '100%',
          height: CONTENT_HEIGHT,
          flex: '0 0 auto',
          boxSizing: 'border-box',
          padding: NX1_PADDING,
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `url(${staticFile('app-assets/bg_eui.png')})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            width: NX1_SOURCE_WIDTH,
            height: appDimens.euiNx1ColumnHeight,
            flex: '0 0 auto',
            marginRight: NX1_GAP,
            overflow: 'hidden',
          }}
        >
          {inputs.map((input, index) => (
            <Nx1SourceRow key={input.label} input={input} selected={index === selectedInput} />
          ))}
        </div>

        <div
          style={{
            width: NX1_ARROW_WIDTH,
            height: appDimens.euiNx1ColumnHeight,
            flex: '0 0 auto',
            marginLeft: NX1_GAP,
            marginRight: NX1_GAP,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppIcon
            name="nav_right"
            size={appDimens.euiNx1ArrowSize}
            tint={appColors.black}
          />
        </div>

        <div
          style={{
            width: NX1_DISPLAY_COLUMN_WIDTH,
            height: '100%',
            flex: '0 0 auto',
            marginLeft: NX1_GAP,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: appDimens.euiNx1DisplayWidth,
              height: appDimens.euiNx1ColumnHeight,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: appDimens.euiNx1DisplayWidth,
                height: appDimens.euiNx1DisplayHeight,
                padding: 10,
                boxSizing: 'border-box',
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: appDimens.euiNx1DisplayIconGap,
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
                  <AppIcon
                    name="ic_hdmi_icon"
                    size={appDimens.euiNx1DisplayIcon}
                    tint={appColors.white}
                  />
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 400,
                      fontSize: appTextStyles.TitleSecondary.sizeSp * 2,
                      letterSpacing: 0.8,
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
                flex: 1,
                marginTop: appDimens.euiNx1DisplayLabelGap,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: appTextStyles.TitleSecondary.sizeSp * 2,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                color: appColors.white,
                backgroundColor: appColors.black,
              }}
            >
              {outputLabel}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: SEEKBAR_HEIGHT,
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: AUDIO_GAP,
          paddingLeft: AUDIO_PADDING,
          paddingRight: AUDIO_PADDING,
          backgroundColor: appColors.black,
        }}
      >
        <AppIcon
          name={speakerMuted ? 'ic_speaker_off' : 'ic_speaker_on'}
          size={SPEAKER_SIZE}
          tint={appColors.white}
        />
        <AppIcon name="ic_vol_left" size={VOLUME_ICON_SIZE} tint={appColors.white} />
        <div
          style={{position: 'relative', flex: 1, height: 14, backgroundColor: appColors.gray25}}
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
              top: -10,
              width: 12,
              height: 34,
              backgroundColor: appColors.white,
            }}
          />
        </div>
        <AppIcon name="ic_vol_right" size={VOLUME_ICON_SIZE} tint={appColors.white} />
      </div>
    </div>
  );
};
