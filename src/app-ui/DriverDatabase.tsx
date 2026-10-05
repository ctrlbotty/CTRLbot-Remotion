// The two surfaces behind the driver list: the detail pane, and Configure Connection.
//
// `DriverCatalog` rebuilt the left half of `res/layout/driver_database.xml` — the search
// field, the two split controls and the list. This file is the right half and the screen
// the `+` on a card opens onto:
//
//   res/layout/driver_detail.xml           the pane: model, device info, the three
//                                          accordions, control info, and the command list
//   res/layout/driver_detail_command.xml   one command row — label, category, key, payload
//   res/layout/driver_connect_edit.xml     Configure Connection, both of its transport
//                                          rows, and the RS-232 block behind the second
//
// Two details are worth stating because they look like mistakes and are not.
//
// **The type ramp is 14/13/11**, taken from those layouts, and it does not scale with the
// form factor for the same reason `DriverCatalog` does not: the app runs one sp ramp on
// both, and a tablet fits more rather than drawing bigger. Legibility in the frame is the
// camera's job, not this file's.
//
// **The RS-232 transport row has no host field.** A serial device is not on the network;
// what goes in that row is another *device* — a Global Cache End Point that already is.
// That substitution is the whole point of the last third of the cut, so the row is a
// separate component rather than a variant with the host input hidden.

import type {CSSProperties, ReactNode} from 'react';
import {Interactive} from 'remotion';
import {AppIcon, type AppIconName} from './AppIcon';
import {catalogRegions, DriverCatalog, SETUP_BACKGROUND, type DriverEntry} from './DriverCatalog';
import {TABLET_VIEWPORT} from './viewports';
import {appColors} from '../design/tokens.generated';

const FACE = 'Montserrat, sans-serif';
/** The command payloads and the connection log are the only monospaced text here. */
const MONO = '"Space Mono", Consolas, monospace';

/** driver_detail.xml / driver_connect_edit.xml — 14sp headings, 13sp values, 11sp labels. */
const SIZE = {heading: 14, value: 13, label: 11} as const;

const EDGE = 14;
const FIELD_H = 40;
const CARET_W = 34;

// ── shared parts ─────────────────────────────────────────────────────────────────────

/** The small grey caption above a value. `@color/white_50` at 11sp, everywhere. */
export const FieldLabel = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div
    style={{
      fontFamily: FACE,
      fontWeight: 400,
      fontSize: SIZE.label,
      color: appColors.white50,
      ...style,
    }}
  >
    {children}
  </div>
);

/** A section heading — 14sp bold white, the only bold in the pane. */
const SectionHeading = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div
    style={{
      fontFamily: FACE,
      fontWeight: 700,
      fontSize: SIZE.heading,
      color: appColors.white,
      ...style,
    }}
  >
    {children}
  </div>
);

/** The Material dropdown caret, drawn — the app uses the platform arrow, which has no drawable. */
const Caret = ({size = 7}: {size?: number}) => (
  <div
    style={{
      width: 0,
      height: 0,
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderTop: `${size + 1}px solid ${appColors.white}`,
    }}
  />
);

/**
 * A filled value button, with or without its caret segment.
 *
 * `bg_text_input_filled` — `@color/gray_20`, 4dp corners. The caret is a separate
 * segment divided by a `gray_25` hairline, which is how the split buttons in the filter
 * row are built too.
 */
export const ValueField = ({
  value,
  width,
  caret = true,
  mono = false,
}: {
  value: string;
  width: number;
  caret?: boolean;
  mono?: boolean;
}) => (
  <div style={{display: 'flex', height: FIELD_H, width}}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: caret ? '4px 0 0 4px' : 4,
        backgroundColor: appColors.gray20,
        fontFamily: mono ? MONO : FACE,
        fontWeight: 400,
        fontSize: SIZE.value,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: appColors.white,
      }}
    >
      {value}
    </div>
    {caret ? (
      <div
        style={{
          width: CARET_W,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0 4px 4px 0',
          borderLeft: `1px solid ${appColors.gray25}`,
          backgroundColor: appColors.gray20,
        }}
      >
        <Caret size={6} />
      </div>
    ) : null}
  </div>
);

/**
 * The list a `ValueField` drops, right-aligned under it.
 *
 * Absolutely positioned so opening one never reflows what is beneath it, and `zIndex`ed
 * because everything it opens over — command cards, the rows below it in a column — sits
 * inside a translated box, and a translated box is a stacking context.
 */
const DropList = ({
  items,
  selected,
}: {
  items: readonly string[];
  /** Drawn in the app's blue, the way the open list marks the current value. */
  selected?: string;
}) => (
  <div
    style={{
      position: 'absolute',
      zIndex: 4,
      right: 0,
      top: FIELD_H,
      minWidth: 128,
      paddingTop: 6,
      paddingBottom: 6,
      backgroundColor: appColors.black,
      boxShadow: `0 8px 24px ${appColors.black75}`,
    }}
  >
    {items.map((item) => (
      <div
        key={item}
        style={{
          paddingLeft: 14,
          paddingRight: 20,
          paddingTop: 6,
          paddingBottom: 6,
          fontFamily: FACE,
          fontWeight: 400,
          fontSize: SIZE.value,
          whiteSpace: 'nowrap',
          color: item === selected ? appColors.blue : appColors.white,
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

/** Label above a `ValueField`, which is how every setting in Control Info is drawn. */
const LabelledField = ({
  label,
  value,
  width,
  caret,
}: {
  label: string;
  value: string;
  width: number;
  caret?: boolean;
}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
    <FieldLabel>{label}</FieldLabel>
    <ValueField value={value} width={width} caret={caret} />
  </div>
);

/** Label above plain text — Port, and everything under Volume Set and Switcher Config. */
const LabelledText = ({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width?: number;
}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 2, width}}>
    <FieldLabel>{label}</FieldLabel>
    <div style={{fontFamily: FACE, fontWeight: 400, fontSize: SIZE.value, color: appColors.white}}>
      {value}
    </div>
  </div>
);

// ── the detail pane ──────────────────────────────────────────────────────────────────

/**
 * The pane, and the scroll position of everything inside it.
 *
 * The header does not scroll and the rest does, so `scroll` moves the content under a
 * fixed title — which is what the app does, and what lets one beat sit on the
 * description while a later one sits on the command list without the driver's name ever
 * leaving the screen.
 */
export const DriverDetail = ({
  title,
  scroll = 0,
  ringManufacturer = false,
  manufacturerLink = true,
  children,
}: {
  title: string;
  /** dp the pane's content is scrolled by. */
  scroll?: number;
  ringManufacturer?: boolean;
  /** Global Caché's pane has no Manufacturer link (`f_0008`); PUSR's has one (`f_0011`). */
  manufacturerLink?: boolean;
  children: ReactNode;
}) => (
  <Interactive.Div
    name="Driver detail"
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: TABLET_VIEWPORT.height,
      paddingTop: 36,
      // Wider than the app's 14 for the same reason the connection screen's is: the
      // detail beats frame this pane almost exactly, so its own padding is the only
      // margin the shot has on that side.
      paddingRight: 30,
      overflow: 'hidden',
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: 12, flex: '0 0 auto'}}>
      <SectionHeading style={{flex: 1}}>{title}</SectionHeading>
      <div
        style={{
          display: manufacturerLink ? 'flex' : 'none',
          alignItems: 'center',
          gap: 5,
          fontFamily: FACE,
          fontWeight: 400,
          fontSize: SIZE.value,
          color: appColors.white,
          outline: ringManufacturer ? `2px solid ${appColors.blue}` : undefined,
          boxShadow: ringManufacturer ? `0 0 12px ${appColors.blue}` : undefined,
          borderRadius: ringManufacturer ? 4 : undefined,
          padding: ringManufacturer ? '4px 8px' : undefined,
        }}
      >
        Manufacturer
        <AppIcon name="ic_arrow_forward_24" size={13} tint={appColors.white} />
      </div>
      <div
        style={{
          width: FIELD_H,
          height: FIELD_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 999,
          backgroundColor: appColors.gray,
        }}
      >
        <AppIcon name="ic_add_24" size={22} tint={appColors.white} />
      </div>
    </div>

    <div style={{flex: 1, overflow: 'hidden', marginTop: 14}}>
      <div style={{translate: `0px ${-scroll}px`}}>{children}</div>
    </div>
  </Interactive.Div>
);

/**
 * Where the Model row sits inside a tablet `DriverDetail`, from the pane's origin: 36dp top
 * padding, the 40dp title row, 14dp to the content, then the 11sp "Model" caption (estimated
 * at Montserrat's 1.219 line height) and 4dp. The open list hangs from the field.
 */
const MODEL_LABEL_H = SIZE.label * 1.219;
const MODEL_FIELD_TOP = 36 + FIELD_H + 14 + MODEL_LABEL_H + 4;
/** An Android spinner's dropdown row is 48dp; the list is as wide as the recording shows. */
const MODEL_ITEM_H = 48;
const MODEL_LIST_W = 248;

/**
 * Regions of a tablet `DriverDetail`, in surface dp, given the pane's region from
 * `catalogRegions('tablet', …).detailPane`. `description` assumes a Model row above Device
 * Info and is estimated the same way (headings and captions at 1.219, body at 1.45).
 */
export const driverDetailRegions = (
  pane: {x: number; y: number; width: number; height: number},
  {modelWidth = 286, items = 0, descriptionLines = 3}: {modelWidth?: number; items?: number; descriptionLines?: number} = {},
) => {
  const fieldY = pane.y + MODEL_FIELD_TOP;
  const listH = Math.min(items * MODEL_ITEM_H, pane.y + pane.height - (fieldY + FIELD_H));
  const descriptionY = fieldY + FIELD_H + 20 + SIZE.heading * 1.219 + 8 + MODEL_LABEL_H + 4;
  return {
    modelField: {x: pane.x, y: fieldY, width: modelWidth, height: FIELD_H},
    modelList: {x: pane.x, y: fieldY + FIELD_H, width: MODEL_LIST_W, height: listH},
    description: {
      x: pane.x,
      y: descriptionY,
      width: pane.width - 30,
      height: descriptionLines * SIZE.value * 1.45,
    },
  };
};

/** The model row — the dropdown of code sets, and the link out to the product page. */
export const ModelRow = ({
  model,
  productPage = true,
  width = 286,
  open,
}: {
  model: string;
  /** Global Caché has no Product Page link; its field runs the width of the pane instead. */
  productPage?: boolean;
  width?: number;
  /** The spinner's list, open under the field, in the order the app lists the models. */
  open?: readonly string[];
}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
    <FieldLabel>Model</FieldLabel>
    <div style={{position: 'relative', display: 'flex', gap: 10}}>
      <ValueField value={model} width={width} />
      {open ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 5,
            left: 0,
            top: FIELD_H,
            width: MODEL_LIST_W,
            backgroundColor: appColors.black,
            boxShadow: `0 8px 24px ${appColors.black75}`,
          }}
        >
          {open.map((item) => (
            <div
              key={item}
              style={{
                height: MODEL_ITEM_H,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 16,
                fontFamily: FACE,
                fontWeight: 400,
                fontSize: SIZE.value,
                whiteSpace: 'nowrap',
                color: appColors.white,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
      <div
        style={{
          display: productPage ? 'flex' : 'none',
          height: FIELD_H,
          alignItems: 'center',
          gap: 6,
          paddingLeft: 14,
          paddingRight: 14,
          borderRadius: 4,
          backgroundColor: appColors.gray20,
          fontFamily: FACE,
          fontWeight: 400,
          fontSize: SIZE.value,
          whiteSpace: 'nowrap',
          color: appColors.white,
        }}
      >
        Product Page
        <AppIcon name="ic_arrow_forward_24" size={13} tint={appColors.white} />
      </div>
    </div>
  </div>
);

/** Device Info, and its one caption-and-paragraph. */
export const DeviceInfo = ({children}: {children: ReactNode}) => (
  <div style={{marginTop: 20}}>
    <SectionHeading>Device Info</SectionHeading>
    <FieldLabel style={{marginTop: 8}}>Description</FieldLabel>
    <div
      style={{
        marginTop: 4,
        fontFamily: FACE,
        fontWeight: 400,
        fontSize: SIZE.value,
        lineHeight: 1.45,
        color: appColors.white,
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Specs / Setup / Support.
 *
 * Collapsed is a heading and a caret; open is the heading, an up caret, and the text
 * indented under it. The caret is the only thing that says which — there is no divider
 * and no fill — so it is drawn rather than reused from `Caret`, which only points down.
 */
export const Accordion = ({
  label,
  open = false,
  children,
}: {
  label: string;
  open?: boolean;
  children?: ReactNode;
}) => (
  <div style={{marginTop: 18}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <SectionHeading style={{flex: 1}}>{label}</SectionHeading>
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: open ? undefined : `8px solid ${appColors.white}`,
          borderBottom: open ? `8px solid ${appColors.white}` : undefined,
        }}
      />
    </div>
    {open && children ? (
      <div
        style={{
          marginTop: 10,
          paddingLeft: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          fontFamily: FACE,
          fontWeight: 400,
          fontSize: SIZE.value,
          lineHeight: 1.45,
          color: appColors.white,
        }}
      >
        {children}
      </div>
    ) : null}
  </div>
);

/**
 * Control Info — the block the rest of the app connects through.
 *
 * Two columns, because that is how the layout splits it: what the transport is on the
 * left, what the connection does once open on the right. `port` is plain text rather
 * than a field: it comes from the driver and is not edited here.
 */
export const ControlInfo = ({
  controlType,
  ipType,
  port,
  keepAlive = 'Disabled',
  onConnection = 'Disabled',
  authentication = 'No',
  show = 6,
}: {
  controlType: string;
  ipType?: string;
  port?: string;
  keepAlive?: string;
  onConnection?: string;
  authentication?: string;
  /** How many of the six settings have arrived, for a block that fills in on camera. */
  show?: number;
}) => (
  <div style={{marginTop: 20}}>
    <SectionHeading>Control Info</SectionHeading>
    <div style={{display: 'flex', gap: 40, marginTop: 10}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {show > 0 ? <LabelledField label="Control Type" value={controlType} width={170} /> : null}
        {show > 1 && ipType ? <LabelledField label="IP Type" value={ipType} width={170} /> : null}
        {show > 2 && port ? <LabelledText label="Port" value={port} /> : null}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {show > 3 ? <LabelledField label="Keep Alive" value={keepAlive} width={170} /> : null}
        {show > 4 ? <LabelledField label="On Connection" value={onConnection} width={170} /> : null}
        {show > 5 ? (
          <LabelledField label="Authentication Required" value={authentication} width={170} />
        ) : null}
      </div>
    </div>
  </div>
);

/** Volume Set and Switcher Config — the variables a room activity substitutes into. */
export const VariableBlock = ({
  heading,
  fields,
}: {
  heading: string;
  fields: {label: string; value: string}[];
}) => (
  <div style={{marginTop: 18}}>
    <FieldLabel>{heading}</FieldLabel>
    <div style={{display: 'flex', gap: 30, marginTop: 6}}>
      {fields.map((field) => (
        <LabelledText key={field.label} label={field.label} value={field.value} width={110} />
      ))}
    </div>
  </div>
);

/** The Commands heading, with its encoding and line-ending selectors. */
export const CommandsBar = ({
  encoding,
  lineEnding,
  menu,
}: {
  encoding: string;
  lineEnding: string;
  /** Line-ending options, shown hanging open under that selector. */
  menu?: readonly string[];
}) => (
  // `zIndex` for the same reason `DriverCatalog`'s filter row has one: the command cards
  // below sit inside a translated box, which is a stacking context, so an open menu
  // paints behind them without it.
  <div
    style={{
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 24,
    }}
  >
    <SectionHeading style={{flex: 1}}>Commands</SectionHeading>
    <ValueField value={encoding} width={148} />
    <div style={{position: 'relative'}}>
      <ValueField value={lineEnding} width={148} />
      {menu ? <DropList items={menu} selected={lineEnding} /> : null}
    </div>
  </div>
);

export type Command = {label: string; key: string; tag: string; payload: string};

/** One command, per driver_detail_command.xml: label + category, key, then the payload. */
export const CommandCard = ({command, style}: {command: Command; style?: CSSProperties}) => (
  <div
    style={{
      marginTop: 10,
      padding: 12,
      borderRadius: 5,
      backgroundColor: appColors.gray10,
      ...style,
    }}
  >
    <div style={{display: 'flex', alignItems: 'baseline'}}>
      <SectionHeading style={{flex: 1}}>{command.label}</SectionHeading>
      <FieldLabel>{command.tag}</FieldLabel>
    </div>
    <div
      style={{
        marginTop: 2,
        fontFamily: MONO,
        fontWeight: 400,
        fontSize: SIZE.label,
        color: appColors.white50,
      }}
    >
      {command.key}
    </div>
    <div
      style={{
        marginTop: 8,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        borderRadius: 3,
        backgroundColor: appColors.black,
        fontFamily: MONO,
        fontWeight: 400,
        fontSize: SIZE.value,
        color: appColors.white,
      }}
    >
      {command.payload}
    </div>
  </div>
);

// ── Configure Connection ─────────────────────────────────────────────────────────────

const RAIL_W = 88;

/** The rail, collapsed to icons — which is what the connection screen opens over. */
const IconRail = () => {
  const icons: AppIconName[] = [
    'ic_ctrlbot',
    'ic_server',
    'ic_connected',
    'ic_activities',
    'ic_settings2',
  ];
  return (
    <div
      style={{
        width: RAIL_W,
        height: TABLET_VIEWPORT.height,
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 22,
        gap: 26,
        backgroundColor: appColors.black,
      }}
    >
      {icons.map((icon) => (
        <AppIcon key={icon} name={icon} size={22} tint={appColors.gray50} />
      ))}
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AppIcon name="ic_eui" size={44} tint={appColors.blue} />
        <span style={{fontFamily: FACE, fontWeight: 700, fontSize: 10, color: appColors.blue}}>
          EUI
        </span>
      </div>
    </div>
  );
};

/**
 * Configure Connection.
 *
 * `saved` swaps the red ✕ for the green Save the app shows once the form has something
 * worth keeping — the one piece of state in this screen's chrome, and the reason the
 * top bar is not just a title.
 */
export const DriverConnection = ({
  name,
  saved = false,
  transport,
  scroll = 0,
  children,
}: {
  name: string;
  saved?: boolean;
  /** The transport row. Pinned under the name, like the app's — it never scrolls away. */
  transport: ReactNode;
  /** dp the body below the transport row is scrolled by. */
  scroll?: number;
  children: ReactNode;
}) => (
  <Interactive.Div
    name="Configure connection"
    style={{
      display: 'flex',
      width: TABLET_VIEWPORT.width,
      height: TABLET_VIEWPORT.height,
      overflow: 'hidden',
      background: SETUP_BACKGROUND,
    }}
  >
    <IconRail />
    {/* 44/32/24 rather than the app's 16 all round.
        A phone or tablet held in the hand has the device's own edge doing the work of a
        margin; a surface framed inside a panel has nothing, and at 16dp the camera's
        edge lands within a few pixels of the transport row's outer buttons — so the
        protocol dropdown and the connect button read as cut off rather than as placed.
        This is the one deliberate departure from `driver_connect_edit.xml`'s geometry,
        and it is a video decision, not a claim about the app. */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 44,
        paddingRight: 44,
        paddingTop: 32,
        paddingBottom: 24,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'relative', height: 34, display: 'flex', alignItems: 'center'}}>
        {saved ? (
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <AppIcon name="ic_close" size={20} tint={appColors.green} style={{rotate: '45deg'}} />
            <span
              style={{
                fontFamily: FACE,
                fontWeight: 700,
                fontSize: SIZE.value,
                color: appColors.green,
              }}
            >
              Save
            </span>
          </div>
        ) : (
          <AppIcon name="ic_close" size={22} tint={appColors.priRed} />
        )}
        <SectionHeading
          style={{position: 'absolute', left: 0, right: 0, textAlign: 'center'}}
        >
          Configure Connection
        </SectionHeading>
      </div>

      <div style={{display: 'flex', marginTop: 14, height: FIELD_H}}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px 0 0 4px',
            backgroundColor: appColors.gray20,
            fontFamily: FACE,
            fontWeight: 400,
            fontSize: SIZE.heading,
            color: appColors.white,
          }}
        >
          {name}
        </div>
        <div
          style={{
            width: CARET_W,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0 4px 4px 0',
            borderLeft: `1px solid ${appColors.gray25}`,
            backgroundColor: appColors.gray20,
          }}
        >
          <Caret size={6} />
        </div>
      </div>

      {transport}

      <div style={{flex: 1, overflow: 'hidden'}}>
        <div style={{translate: `0px ${-scroll}px`}}>{children}</div>
      </div>
    </div>
  </Interactive.Div>
);

/** The IP transport row: protocol, host, port, and the connect action. */
export const IpTransportRow = ({
  protocol = 'TCP',
  host,
  port,
  action,
}: {
  protocol?: string;
  /** Empty string shows the `Host IP Address` hint. */
  host: string;
  port: string;
  action: 'CONNECT IP' | 'DISCONNECT';
}) => (
  <div style={{display: 'flex', gap: 10, marginTop: 10, height: FIELD_H}}>
    <ValueField value={protocol} width={150} />
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 14,
        borderRadius: 4,
        backgroundColor: appColors.black,
        fontFamily: FACE,
        fontWeight: 400,
        fontSize: SIZE.heading,
        color: host ? appColors.white : appColors.gray600,
      }}
    >
      {host || 'Host IP Address'}
    </div>
    <div
      style={{
        width: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: appColors.black,
        fontFamily: FACE,
        fontWeight: 400,
        fontSize: SIZE.heading,
        color: appColors.white,
      }}
    >
      {port}
    </div>
    <ValueField value={action} width={192} />
  </div>
);

/**
 * The RS-232 transport row.
 *
 * Where the IP row has a host field this has an End Point — another device, already on
 * the network, that the serial cable is plugged into. When one has been saved the app
 * fills this in; the `+ RS232 End Point` button beside it is how the first one is made.
 */
export const EndPointTransportRow = ({endPoint}: {endPoint: string}) => (
  <div style={{display: 'flex', gap: 10, marginTop: 10, height: FIELD_H}}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        backgroundColor: appColors.gray20,
        fontFamily: FACE,
        fontWeight: 400,
        fontSize: SIZE.heading,
        whiteSpace: 'nowrap',
        color: appColors.white,
      }}
    >
      + RS232 End Point
    </div>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 14,
        borderRadius: 4,
        backgroundColor: appColors.black,
        fontFamily: FACE,
        fontWeight: 400,
        fontSize: SIZE.heading,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: endPoint ? appColors.white : appColors.gray600,
      }}
    >
      {endPoint || 'No End Point'}
    </div>
    <ValueField value="CONNECT RS-232" width={216} caret={false} />
  </div>
);

/** The RS-232 block — four settings, three of them segmented rather than dropped down. */
export const Rs232Config = ({
  baud = '115200',
  stopBits = '1',
  parity = 'None',
  flowControl = 'None',
}: {
  baud?: string;
  stopBits?: string;
  parity?: string;
  flowControl?: string;
}) => {
  const Segments = ({options, selected}: {options: string[]; selected: string}) => (
    <div style={{display: 'flex'}}>
      {options.map((option) => (
        <div
          key={option}
          style={{
            minWidth: 74,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 12,
            paddingRight: 12,
            backgroundColor: option === selected ? appColors.blue : appColors.gray20,
            fontFamily: FACE,
            fontWeight: 400,
            fontSize: SIZE.value,
            color: appColors.white,
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );

  const Row = ({label, children}: {label: string; children: ReactNode}) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 46,
        borderBottom: `1px solid ${appColors.gray15}`,
      }}
    >
      <div
        style={{
          flex: 1,
          fontFamily: FACE,
          fontWeight: 400,
          fontSize: SIZE.heading,
          color: appColors.white,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{marginTop: 16}}>
      <SectionHeading>RS-232 Configuration</SectionHeading>
      <Row label="Baud Rate:">
        <ValueField value={baud} width={128} />
      </Row>
      <Row label="Stop Bits:">
        <Segments options={['1', '2']} selected={stopBits} />
      </Row>
      <Row label="Parity:">
        <Segments options={['None', 'Odd', 'Even']} selected={parity} />
      </Row>
      <Row label="Flow Control:">
        <Segments options={['None', 'Hardware']} selected={flowControl} />
      </Row>
    </div>
  );
};

/**
 * Driver Details beside Transport Controls.
 *
 * The left column is what the driver says the device is; the right is how bytes reach
 * it. Both are read straight off the driver — which is the claim the whole cut is
 * making, so they are shown together rather than one at a time.
 */
export const ConnectionSummary = ({
  manufacturer,
  model,
  category,
  transport,
  variables = true,
}: {
  manufacturer: string;
  model: string;
  category: string;
  /**
   * `field: false` renders the value as plain text — the rows the driver states rather
   * than the ones you choose. `menu` hangs that row's list open beneath it.
   */
  transport: {label: string; value: string; field?: boolean; menu?: readonly string[]}[];
  /** Volume Set and Switcher Config under the driver details. */
  variables?: boolean;
}) => (
  // 32, not 20: in the recording the two headings clear the transport row by about
  // 40dp, and at 20 the `Driver Details` heading sits right under the host field with
  // no separation at all once a beat scrolls even slightly.
  <div style={{display: 'flex', gap: 60, marginTop: 32}}>
    <div style={{flex: 1}}>
      <SectionHeading>Driver Details</SectionHeading>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10}}>
        <LabelledText label="Manufacturer" value={manufacturer} />
        <LabelledText label="Model" value={model} />
        <LabelledText label="Category" value={category} />
      </div>
      {variables ? (
        <>
          <VariableBlock
            heading="Volume Set"
            fields={[
              {label: 'Variable', value: '%v'},
              {label: 'Start', value: '0'},
              {label: 'End', value: '100'},
            ]}
          />
          <VariableBlock
            heading="Switcher Config"
            fields={[
              {label: 'In', value: '2'},
              {label: 'Out', value: '1'},
              {label: 'In Var', value: '%n'},
              {label: 'Out Var', value: '%o'},
            ]}
          />
        </>
      ) : null}
    </div>

    <div style={{flex: 1}}>
      <SectionHeading>Transport Controls</SectionHeading>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10}}>
        {transport.map((row, index) => (
          <div
            key={row.label}
            style={{
              position: 'relative',
              // Earlier rows above later ones, so a menu dropped from the first row
              // covers the two beneath it rather than being covered by them.
              zIndex: transport.length - index,
              display: 'flex',
              alignItems: 'center',
              height: FIELD_H,
            }}
          >
            <div
              style={{
                flex: 1,
                fontFamily: FACE,
                fontWeight: 400,
                fontSize: SIZE.heading,
                color: appColors.white,
              }}
            >
              {row.label}
            </div>
            {row.field === false ? (
              <div
                style={{
                  fontFamily: FACE,
                  fontWeight: 400,
                  fontSize: SIZE.heading,
                  color: appColors.white,
                }}
              >
                {row.value}
              </div>
            ) : (
              <div style={{position: 'relative'}}>
                <ValueField value={row.value} width={128} />
                {row.menu ? <DropList items={row.menu} selected={row.value} /> : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** A command in the connection screen: label, payload, and the button that sends it. */
export const SendRow = ({
  label,
  payload,
  sent = false,
}: {
  label: string;
  payload: string;
  /** Fills the SEND button, for the frames just after it is pressed. */
  sent?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: 54,
      paddingLeft: 14,
      paddingRight: 8,
      borderBottom: `1px solid ${appColors.gray15}`,
      backgroundColor: appColors.gray10,
    }}
  >
    <div
      style={{
        width: 250,
        fontFamily: FACE,
        fontWeight: 400,
        fontSize: SIZE.heading,
        color: appColors.white,
      }}
    >
      {label}
    </div>
    <div
      style={{
        flex: 1,
        fontFamily: MONO,
        fontWeight: 400,
        fontSize: SIZE.value,
        color: appColors.white50,
      }}
    >
      {payload}
    </div>
    <div
      style={{
        width: 78,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: sent ? appColors.blue : appColors.gray20,
        fontFamily: FACE,
        fontWeight: 400,
        fontSize: SIZE.heading,
        color: appColors.white,
      }}
    >
      SEND
    </div>
  </div>
);

/**
 * Received/Sent Data.
 *
 * `pri_green` on black, monospaced — the app's own terminal colour, not a video choice.
 * It is the only place in the product where the device answers back in its own words,
 * which is why the cut ends its connect beat here rather than on the button.
 */
export const ConnectionLog = ({lines}: {lines: string[]}) => (
  <div style={{marginTop: 14}}>
    <SectionHeading>Received/Sent Data</SectionHeading>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
      {lines.map((line) => (
        <span
          key={line}
          style={{
            fontFamily: MONO,
            fontWeight: 400,
            fontSize: SIZE.value,
            lineHeight: 1.55,
            whiteSpace: 'pre',
            color: appColors.priGreen,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  </div>
);

// ── v1.0.9 end points (W05) ──────────────────────────────────────────────────────────

/** The End Points list as the W05 recording shows it (`f_0007`). */
export const END_POINT_DRIVERS: DriverEntry[] = [
  {manufacturer: 'GLOBAL CACHE', model: 'Most Models', deviceType: 'endPoint'},
  {manufacturer: 'HALL RESEARCH', model: 'HT-VERSA-4K-R', deviceType: 'endPoint'},
  {manufacturer: 'IPMX', model: 'Most Decoders', deviceType: 'endPoint'},
  {manufacturer: 'KRAMER', model: 'KDS-DEC7', deviceType: 'endPoint'},
  {manufacturer: 'MATROX', model: 'MGX D1', deviceType: 'endPoint'},
  {manufacturer: 'PUSR', model: 'USR-W630', deviceType: 'endPoint'},
];

/**
 * Global Caché's models in the app's order (`GLOBAL_CACHE_End_Points.json`), from the first
 * the open spinner shows in `f_0008`/`f_0009` ("Flex IR 3 Emitter") to the screen's bottom.
 */
export const GLOBAL_CACHE_MODELS_SHOWN = [
  'Flex IR 3 Emitter',
  'Flex IR Blaster',
  'Flex IR Emitter',
  'Flex Relay Sensor',
  'Flex Serial RS232',
  'Flex Serial RS485',
  'GC-100-06',
  'GC-100-12',
  'Global Connect IR',
  'Global Connect Relay',
  'Global Connect Serial',
  'iTach IP2CC',
] as const;

/** `PUSR_End_Points.json`'s description, as the pane shows it in `f_0011`. */
export const PUSR_DESCRIPTION =
  "The PUSR USR-W630 puts one RS-232 or RS-485 port on the network over WiFi or either of its two Ethernet ports. Serial data crosses TCP port 8899 unchanged, and the W630's own settings are read and written over UDP 48899.";

/** The pane's content width beside a 430dp list: 1280 - 200 - 430 - 30, less its 30dp padding. */
export const DETAIL_CONTENT_W = 590;

/** Global Caché End Points with the Model spinner open (`f_0008`). */
export const GlobalCacheModelsDetail = ({open = true}: {open?: boolean}) => (
  <DriverDetail title="GLOBAL CACHE End Points" manufacturerLink={false}>
    <ModelRow
      model="Most Models"
      productPage={false}
      width={DETAIL_CONTENT_W}
      open={open ? GLOBAL_CACHE_MODELS_SHOWN : undefined}
    />
  </DriverDetail>
);

/** PUSR End Points: USR-W630, its description and Control Info (`f_0011`). */
export const PusrDetail = ({ringDescription = false}: {ringDescription?: boolean}) => (
  <DriverDetail title="PUSR End Points">
    <ModelRow model="USR-W630" />
    <div
      style={{
        outline: ringDescription ? `2px solid ${appColors.blue}` : undefined,
        borderRadius: ringDescription ? 4 : undefined,
      }}
    >
      <DeviceInfo>{PUSR_DESCRIPTION}</DeviceInfo>
    </div>
    <Accordion label="Specs" />
    <Accordion label="Setup" />
    <Accordion label="Support" />
    <ControlInfo controlType="IP" ipType="UDP" keepAlive="Disabled" onConnection="Enabled" show={5} />
  </DriverDetail>
);

const EndPointCatalog = ({selected, detail}: {selected: number; detail: ReactNode}) => (
  <DriverCatalog
    device="tablet"
    drivers={END_POINT_DRIVERS}
    typeFilter="endPoint"
    selectedIndex={selected}
    findDevices="15 devices found"
    background={SETUP_BACKGROUND}
    detail={detail}
  />
);

export const TabletDetailModelsProof = () => (
  <EndPointCatalog selected={0} detail={<GlobalCacheModelsDetail />} />
);

export const TabletDetailPusrProof = () => <EndPointCatalog selected={5} detail={<PusrDetail />} />;

/** `catalogRegions` re-exported beside the pane's own, so a beat imports one place. */
export const endPointPaneRegions = () =>
  driverDetailRegions(catalogRegions('tablet', {findDevices: '15 devices found'}).detailPane, {
    modelWidth: DETAIL_CONTENT_W,
    items: GLOBAL_CACHE_MODELS_SHOWN.length,
  });
