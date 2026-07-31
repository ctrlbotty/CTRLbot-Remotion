// Activities → Switching, rebuilt as live React for the landscape cut.
//
// This surface exists because there is no tablet capture of it. Every file in
// public/captures/tablet named for switching (`switching-preview.png`, `switching.mp4`)
// is a recording of Connect → Test Device Drivers, and mapping one of those into the
// Activities scene is what put a Connect screen in the middle of the Activities beat.
//
// Sources, in order of authority:
//   docs/CTRLbot-IoT-User-Manual.md §12.1–12.3   the controls, their order, and — for the
//                                                many-to-many screen — that inputs and
//                                                outputs sit *side by side* with the
//                                                command template above and the test tool
//                                                below. Every screenshot in that manual is
//                                                a 10-inch tablet in landscape, so §12.3
//                                                is describing this layout.
//   captures/phone/switching.png                 the real control set and its content:
//                                                Switch Type, Matrix Switcher, the device
//                                                header, the %i/%o template row, and the
//                                                INPUTS table
//   TAB_GEOMETRY below                           measured off captures/tablet/presets.png
//                                                so the tab strip lines up with the two
//                                                panels either side of it in the cut
//
// **Verify this against a real build before publishing.** It is the one surface in the
// project assembled from a manual description rather than from a capture or from layout
// XML. Replace it with `CapturedScreen` the moment a real tablet screenshot exists — the
// scene takes either.

import {AppIcon} from './AppIcon';
import {TabletNavRail} from './TabletNavRail';
import {TABLET_VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';

/**
 * The Presets / Switching / Audio tab strip, in capture space.
 *
 * Measured off `captures/tablet/presets.png`. Shared with the scene so the ring it draws
 * on a captured panel and the strip this surface renders cannot drift apart.
 */
export const TAB_GEOMETRY = {
  phone: {x: 6, y: 35, width: 348, height: 46, gap: 5},
  tablet: {x: 210, y: 14, width: 1052, height: 45, gap: 3},
} as const;

export const activityTabRegion = (device: 'phone' | 'tablet', index: number) => {
  const strip = TAB_GEOMETRY[device];
  const tabWidth = (strip.width - strip.gap * 2) / 3;
  return {
    x: strip.x + index * (tabWidth + strip.gap),
    y: strip.y,
    width: tabWidth,
    height: strip.height,
  };
};

const TABS = ['Presets', 'Switching', 'Audio'];

const X = TAB_GEOMETRY.tablet.x;
const W = TAB_GEOMETRY.tablet.width;
const COLUMN_GAP = 20;
const COLUMN_W = (W - COLUMN_GAP) / 2;
const ROW_H = 42;
const ROW_GAP = 6;

/**
 * Vertical rhythm, tuned so the last port row clears the copy card.
 *
 * The card is bottom-anchored on the right of the frame and the scene's camera is locked
 * off, so anything low on this surface is simply covered — and covering half the OUTPUTS
 * column would defeat the one panel built to show inputs and outputs side by side. The
 * eight rows finish around content y 500, which is screen y 750 at 1.5x, just above where
 * the card starts. Re-check this if the callout copy ever gets longer.
 */
const SWITCH_LABEL_Y = 66;
const SWITCH_FIELD_Y = 82;
const MATRIX_LABEL_Y = 136;
const MATRIX_FIELD_Y = 152;
const DEVICE_NAME_Y = 208;
const DEVICE_IP_Y = 230;
const TEMPLATE_Y = 256;
const COLUMN_LABEL_Y = 294;
const ROWS_TOP = 306;
const FIELD_H = 46;

/** Matching the phone capture: an Extron matrix with its first inputs named. */
const INPUTS = ['Input 1', 'Input 2', 'Input 3', 'Input 4'];
const OUTPUTS = ['Output 1', 'Output 2', 'Output 3', 'Output 4'];

const FieldLabel = ({children, top}: {children: string; top: number}) => (
  <span
    style={{
      position: 'absolute',
      left: X,
      top,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      fontSize: 13,
      letterSpacing: '0.06em',
      color: appColors.gray600,
    }}
  >
    {children}
  </span>
);

/** A filled dropdown, matching the split shape the catalog and connection screens use. */
const Dropdown = ({value, top}: {value: string; top: number}) => (
  <div style={{position: 'absolute', left: X, top, width: W, height: FIELD_H, display: 'flex'}}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: appColors.gray20,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 16,
        color: appColors.white,
      }}
    >
      {value}
    </div>
    <div
      style={{
        width: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeft: `1px solid ${appColors.gray25}`,
        backgroundColor: appColors.gray20,
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `9px solid ${appColors.white}`,
        }}
      />
    </div>
  </div>
);

/** The blue enable tick. Ticked inputs and outputs are the ones the EUI will show. */
const Tick = () => (
  <div
    style={{
      width: 24,
      height: 24,
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      backgroundColor: appColors.blue,
    }}
  >
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5 L6.5 12 L13 4.5"
        stroke={appColors.white}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const PortRow = ({
  index,
  label,
  action,
  withIcon,
  left,
  top,
}: {
  index: number;
  label: string;
  action: string;
  /** Only inputs are icon-tagged — manual §12.3. */
  withIcon: boolean;
  left: number;
  top: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: COLUMN_W,
      height: ROW_H,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: appColors.gray15,
    }}
  >
    <span
      style={{
        width: 18,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 15,
        color: appColors.gray75,
      }}
    >
      {index}
    </span>
    <Tick />
    {withIcon ? (
      <div
        style={{
          width: 36,
          height: 32,
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appColors.black,
        }}
      >
        <AppIcon name="ic_hdmi_icon" size={20} tint={appColors.white} />
      </div>
    ) : null}
    <div
      style={{
        flex: 1,
        minWidth: 0,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        backgroundColor: appColors.black,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 15,
        color: appColors.white,
      }}
    >
      {label}
    </div>
    <div
      style={{
        width: 62,
        height: 32,
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: appColors.gray25,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 13,
        color: appColors.white,
      }}
    >
      {action}
    </div>
  </div>
);

export const ActivitiesSwitching = () => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      width: TABLET_VIEWPORT.width,
      height: TABLET_VIEWPORT.height,
      overflow: 'hidden',
      backgroundColor: appColors.black,
    }}
  >
    <TabletNavRail active="activities" showRoomMenus />

    {/* Tab strip — same geometry the captured panels have, so the cut does not jump. */}
    {TABS.map((tab, index) => {
      const region = activityTabRegion('tablet', index);
      const active = tab === 'Switching';
      return (
        <div
          key={tab}
          style={{
            position: 'absolute',
            left: region.x,
            top: region.y,
            width: region.width,
            height: region.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            backgroundColor: active ? appColors.blue : appColors.gray20,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: 17,
            color: appColors.white,
          }}
        >
          {tab}
        </div>
      );
    })}

    <FieldLabel top={SWITCH_LABEL_Y}>SWITCH TYPE</FieldLabel>
    <Dropdown value="Many to Many: Matrix Switching" top={SWITCH_FIELD_Y} />

    <FieldLabel top={MATRIX_LABEL_Y}>MATRIX SWITCHER</FieldLabel>
    <Dropdown value="EXTRON DXP 1616 - New" top={MATRIX_FIELD_Y} />

    {/* Device header — the selected connection and where it lives. */}
    <span
      style={{
        position: 'absolute',
        left: X,
        top: DEVICE_NAME_Y,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 16,
        color: appColors.white,
      }}
    >
      EXTRON DXP 1616 - New
    </span>
    <span
      style={{
        position: 'absolute',
        left: X,
        top: DEVICE_IP_Y,
        fontFamily: '"Space Mono", monospace',
        fontWeight: 400,
        fontSize: 14,
        color: appColors.gray75,
      }}
    >
      IP 192.168.0.95:23
    </span>

    {/* The routing template. Manual §12.3: useful when a route misbehaves and you need to
        see what CTRLbot is building. */}
    <div
      style={{
        position: 'absolute',
        left: X,
        top: TEMPLATE_Y,
        width: W,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 26,
        paddingLeft: 12,
        backgroundColor: appColors.gray10,
        fontFamily: '"Space Mono", monospace',
        fontWeight: 400,
        fontSize: 13,
        color: appColors.gray75,
      }}
    >
      <span>Input = %i</span>
      <span>Output = %o</span>
      <span>Template: %n*%o!\r</span>
    </div>

    {/* Inputs and outputs side by side — manual §12.3. */}
    <FieldLabel top={COLUMN_LABEL_Y}>INPUTS</FieldLabel>
    <span
      style={{
        position: 'absolute',
        left: X + COLUMN_W + COLUMN_GAP,
        top: COLUMN_LABEL_Y,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 13,
        letterSpacing: '0.06em',
        color: appColors.gray600,
      }}
    >
      OUTPUTS
    </span>

    {INPUTS.map((label, index) => (
      <PortRow
        key={label}
        index={index + 1}
        label={label}
        action="IN"
        withIcon
        left={X}
        top={ROWS_TOP + index * (ROW_H + ROW_GAP)}
      />
    ))}
    {OUTPUTS.map((label, index) => (
      <PortRow
        key={label}
        index={index + 1}
        label={label}
        action="OUT"
        withIcon={false}
        left={X + COLUMN_W + COLUMN_GAP}
        top={ROWS_TOP + index * (ROW_H + ROW_GAP)}
      />
    ))}

    <span
      style={{
        position: 'absolute',
        left: X,
        top: ROWS_TOP + 4 * (ROW_H + ROW_GAP) + 14,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 14,
        fontStyle: 'italic',
        color: appColors.gray600,
      }}
    >
      Select Input then Output — builds command. Then Send to test.
    </span>
  </div>
);
