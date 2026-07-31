// Generates src/design/tokens.generated.ts from the CTRLbot IoT Android resources.
//
// The Android app is the single source of truth for color, geometry and type scale.
// Re-run this whenever the app's res/values change; the generated file is committed so
// a drift shows up as a reviewable diff instead of going unnoticed.
//
//   node scripts/sync-app-tokens.mjs [pathToAppRepo]
//
// Default app repo: ../CTRLbot-IoT (override with CTRLBOT_APP_DIR or the CLI argument).

import {existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {vectorDrawableToSvg} from './lib/vector-drawable-to-svg.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const appRoot = resolve(
  projectRoot,
  process.argv[2] ?? process.env.CTRLBOT_APP_DIR ?? '../CTRLbot-IoT',
);
const resDir = join(appRoot, 'app/src/main/res');

if (!existsSync(resDir)) {
  console.error(`Android resources not found at ${resDir}`);
  console.error('Pass the app repo path: node scripts/sync-app-tokens.mjs ../CTRLbot-IoT');
  process.exit(1);
}

const read = (relative) => readFileSync(join(resDir, relative), 'utf8');

/** Android stores colors as #RRGGBB or #AARRGGBB. Normalize to CSS. */
const androidColorToCss = (raw) => {
  const value = raw.trim();
  if (!value.startsWith('#')) return null;
  const hex = value.slice(1);
  if (hex.length === 6) return `#${hex.toUpperCase()}`;
  if (hex.length === 8) {
    const alpha = parseInt(hex.slice(0, 2), 16);
    const rgb = hex.slice(2).toUpperCase();
    if (alpha === 255) return `#${rgb}`;
    const r = parseInt(rgb.slice(0, 2), 16);
    const g = parseInt(rgb.slice(2, 4), 16);
    const b = parseInt(rgb.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${(alpha / 255).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')})`;
  }
  return null;
};

const toCamel = (snake) =>
  snake.replace(/[_-]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^(\d)/, '_$1');

const matchAll = (xml, pattern) => [...xml.matchAll(pattern)];

// --- colors -----------------------------------------------------------------
const colorsXml = read('values/colors.xml');
const colors = {};
for (const [, name, value] of matchAll(
  colorsXml,
  /<color\s+name="([^"]+)"\s*>([^<]+)<\/color>/g,
)) {
  const css = androidColorToCss(value);
  if (css) colors[toCamel(name)] = css;
}

// --- color state lists ------------------------------------------------------
// res/color/*.xml are ColorStateLists. Their resource name is the *filename*, not a
// name= attribute, which is why they are easy to miss when grepping. They encode the
// selected/pressed/default colors the UI actually switches between, so the video needs
// them to show a selected row or a pressed button correctly.
const stateListDir = join(resDir, 'color');
const colorStateLists = {};
if (existsSync(stateListDir)) {
  for (const file of readdirSync(stateListDir).filter((n) => n.endsWith('.xml'))) {
    const xml = readFileSync(join(stateListDir, file), 'utf8');
    const states = {};
    for (const [, itemTag] of matchAll(xml, /<item\b([^>]*)\/>/g)) {
      const colorRef = itemTag.match(/android:color="([^"]+)"/);
      if (!colorRef) continue;

      const raw = colorRef[1];
      const resolved = raw.startsWith('@color/')
        ? (colors[toCamel(raw.slice('@color/'.length))] ?? null)
        : androidColorToCss(raw);
      if (!resolved) continue;

      // The first item without a state qualifier is the default, by selector semantics.
      const stateAttr = itemTag.match(/android:state_(\w+)="(true|false)"/);
      const key = stateAttr
        ? `${stateAttr[2] === 'true' ? '' : 'not'}${stateAttr[1]}`
        : 'default';
      if (!(key in states)) states[key] = resolved;
    }
    if (Object.keys(states).length) {
      colorStateLists[toCamel(file.replace(/\.xml$/, ''))] = states;
    }
  }
}

// --- dimens -----------------------------------------------------------------
// dp/sp are stripped to plain numbers. At the app's baseline density 1dp == 1px,
// so these are usable directly as layout units and then scaled per composition.
const dimensXml = read('values/dimens.xml');
const dimens = {};
for (const [, name, value] of matchAll(
  dimensXml,
  /<dimen\s+name="([^"]+)"\s*>([^<]+)<\/dimen>/g,
)) {
  const numeric = Number.parseFloat(value.replace(/(dp|sp|px)$/i, ''));
  if (Number.isFinite(numeric)) dimens[toCamel(name)] = numeric;
}
// Float dimens are declared as <item type="dimen" format="float">.
for (const [, name, value] of matchAll(
  dimensXml,
  /<item\s+name="([^"]+)"\s+type="dimen"[^>]*>([^<]+)<\/item>/g,
)) {
  const numeric = Number.parseFloat(value);
  if (Number.isFinite(numeric)) dimens[toCamel(name)] = numeric;
}

// --- type scale -------------------------------------------------------------
const typographyXml = read('values/typography.xml');
const textStyles = {};
for (const [, name, body] of matchAll(
  typographyXml,
  /<style\s+name="TextAppearance\.CtrlBot\.([^"]+)"[^>]*>([\s\S]*?)<\/style>/g,
)) {
  const size = body.match(/name="android:textSize"\s*>\s*([\d.]+)sp/);
  const color = body.match(/name="android:textColor"\s*>\s*@color\/([\w]+)/);
  const family = body.match(/name="android:fontFamily"\s*>\s*([\w@/]+)/);
  textStyles[toCamel(name)] = {
    sizeSp: size ? Number.parseFloat(size[1]) : null,
    colorToken: color ? toCamel(color[1]) : null,
    fontFamily: family ? family[1].replace('@font/', '') : null,
  };
}

// --- corner radii from shapes.xml -------------------------------------------
const shapesXml = read('values/shapes.xml');
const cornerRadii = {};
for (const [, name, body] of matchAll(
  shapesXml,
  /<style\s+name="ShapeAppearance\.([^"]+)"[^>]*>([\s\S]*?)<\/style>/g,
)) {
  const corners = {};
  for (const [, corner, value] of matchAll(
    body,
    /<item\s+name="cornerSize(\w+)"\s*>\s*([\d.]+)dp/g,
  )) {
    corners[corner.charAt(0).toLowerCase() + corner.slice(1)] = Number.parseFloat(value);
  }
  if (Object.keys(corners).length) cornerRadii[toCamel(name.replace(/\./g, '_'))] = corners;
}

// --- fonts ------------------------------------------------------------------
// Montserrat is the app's UI face; Audiowide is reserved for the CTRLbot wordmark.
const fontFiles = [
  ['font/mont_thin.ttf', 'Montserrat-Thin.ttf'],
  ['font/mont_light.ttf', 'Montserrat-Light.ttf'],
  ['font/mont_regular.ttf', 'Montserrat-Regular.ttf'],
  ['font/mont_bold.ttf', 'Montserrat-Bold.ttf'],
  ['font/mont_italic.ttf', 'Montserrat-Italic.ttf'],
  ['font/mont_light_italic.ttf', 'Montserrat-LightItalic.ttf'],
  ['font/mont_thin_italic.ttf', 'Montserrat-ThinItalic.ttf'],
  ['font/audiowide_regular.ttf', 'Audiowide-Regular.ttf'],
];

const fontsOut = join(projectRoot, 'public/fonts');
mkdirSync(fontsOut, {recursive: true});
const copiedFonts = [];
for (const [from, to] of fontFiles) {
  const source = join(resDir, from);
  if (!existsSync(source)) {
    console.warn(`  ! missing font ${from}`);
    continue;
  }
  copyFileSync(source, join(fontsOut, to));
  copiedFonts.push(to);
}

// --- drawables --------------------------------------------------------------
// The EUI's iconography and cell gradients. Vector drawables become SVG (so they
// stay crisp at any camera zoom); raster assets are copied as-is.
const drawables = [
  // EUI chrome and controls
  'ic_settings2',
  'ic_power',
  'ic_hdmi_icon',
  'ic_hdmi_icon_sm',
  'ic_display_icon',
  'ic_route5',
  'nav_right',
  'ic_speaker_on',
  'ic_speaker_off',
  'ic_vol_left',
  'ic_vol_right',
  'ic_mic_live',
  'ic_mic_off',
  'ic_light1',
  'ic_cam',
  // Driver catalog and connection surfaces. The first four are the device-type
  // icons DriverListAdapter picks between; they pair with the *_card_bg colors.
  'ic_display_50',
  'ic_projector_filled',
  'ic_route2',
  'ic_server',
  'ic_add_24',
  'ic_search',
  'ic_sort',
  'ic_close',
  // Setup nav: CTRLbot / Device / Connect / Activities / Set / EUI
  'ic_ctrlbot',
  'ic_arrow_forward_24',
  'ic_connect',
  'ic_connected',
  'ic_activities',
  'ic_eui',
  // Output-cell gradients and the landscape EUI backdrop (raster in the app;
  // copied rather than reproduced so the cells are pixel-identical).
  'disp_m_blue',
  'disp_m_grey',
  'disp_m_yellow',
  'disp_lg_blue',
  'disp_lg_grey',
  'bg_eui',
  'bg_leftmenu',
];

const drawablesOut = join(projectRoot, 'public/app-assets');
mkdirSync(drawablesOut, {recursive: true});
const exportedDrawables = [];

for (const name of drawables) {
  const xmlPath = join(resDir, `drawable/${name}.xml`);
  const pngPath = join(resDir, `drawable/${name}.png`);

  if (existsSync(xmlPath)) {
    const converted = vectorDrawableToSvg(readFileSync(xmlPath, 'utf8'), {
      resolveAppColor: (name) => colors[toCamel(name)] ?? null,
    });
    if (!converted) {
      console.warn(`  ! ${name}.xml is not a vector drawable, skipped`);
      continue;
    }
    writeFileSync(join(drawablesOut, `${name}.svg`), converted.svg, 'utf8');
    exportedDrawables.push(`${name}.svg`);
    continue;
  }

  if (existsSync(pngPath)) {
    copyFileSync(pngPath, join(drawablesOut, `${name}.png`));
    exportedDrawables.push(`${name}.png`);
    continue;
  }

  console.warn(`  ! missing drawable ${name}`);
}

// --- reference docs ---------------------------------------------------------
// The product overview lives in the app repo and is editorial source material for
// scripts. The July 29 user manual in docs/ is a frozen supporting snapshot; its source
// is no longer generated by the app repo, so sync must not imply that it is current.
const referenceDocs = [
  ['About_CTRLbot_IoT.md', 'docs/About_CTRLbot_IoT.md'],
];

const syncedDocs = [];
for (const [from, to] of referenceDocs) {
  const source = join(appRoot, from);
  if (!existsSync(source)) {
    console.warn(`  ! missing reference doc ${from}`);
    continue;
  }
  const destination = join(projectRoot, to);
  mkdirSync(dirname(destination), {recursive: true});
  copyFileSync(source, destination);
  syncedDocs.push(to);
}

// --- emit -------------------------------------------------------------------
const stringify = (value, indent) => JSON.stringify(value, null, 2).replace(/\n/g, `\n${indent}`);

const banner = `// GENERATED FILE — DO NOT EDIT BY HAND.
// Source: ${appRoot.replace(/\\/g, '/')}/app/src/main/res
// Regenerate: npm run sync:tokens
//
// These are the Android app's real design tokens. Import curated, video-facing
// values from './theme' rather than reaching for raw tokens in compositions.
`;

const output = `${banner}
/** Every <color> in res/values/colors.xml, alpha-normalized to CSS. */
export const appColors = ${stringify(colors, '')} as const;

/** ColorStateLists from res/color/, resolved to CSS. */
export const appColorStates = ${stringify(colorStateLists, '')} as const;

/** Every <dimen> in res/values/dimens.xml, in dp/sp with the unit stripped. */
export const appDimens = ${stringify(dimens, '')} as const;

/** The TextAppearance.CtrlBot.* ramp from res/values/typography.xml. */
export const appTextStyles = ${stringify(textStyles, '')} as const;

/** Corner geometry from res/values/shapes.xml. */
export const appCornerRadii = ${stringify(cornerRadii, '')} as const;

/** Font files copied into public/fonts by the sync script. */
export const appFontFiles = ${stringify(copiedFonts, '')} as const;

/** App drawables exported into public/app-assets (vectors converted to SVG). */
export const appDrawables = ${stringify(exportedDrawables, '')} as const;

export type AppColorToken = keyof typeof appColors;
export type AppDimenToken = keyof typeof appDimens;
`;

const outPath = join(projectRoot, 'src/design/tokens.generated.ts');
mkdirSync(dirname(outPath), {recursive: true});
writeFileSync(outPath, output, 'utf8');

console.log(`Synced app tokens from ${resDir}`);
console.log(`  ${Object.keys(colors).length} colors`);
console.log(`  ${Object.keys(dimens).length} dimens`);
console.log(`  ${Object.keys(textStyles).length} text styles`);
console.log(`  ${Object.keys(cornerRadii).length} shape appearances`);
console.log(`  ${copiedFonts.length} fonts -> public/fonts`);
console.log(`  ${exportedDrawables.length} drawables -> public/app-assets`);
console.log(`  ${syncedDocs.length} reference docs -> docs/`);
console.log(`  -> ${outPath.replace(/\\/g, '/')}`);
