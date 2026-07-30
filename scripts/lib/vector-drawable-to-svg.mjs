// Converts an Android vector drawable (res/drawable/*.xml) into an SVG string.
//
// Vector drawables already store geometry as SVG path syntax in android:pathData, so
// this is an attribute remap rather than a real format conversion. It covers the
// subset the CTRLbot app actually uses: nested <group> transforms, <clip-path>, and
// fill/stroke paths.

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`android:${name}\\s*=\\s*"([^"]*)"`));
  return match ? match[1] : null;
};

const num = (value, fallback = 0) => {
  if (value === null) return fallback;
  const parsed = Number.parseFloat(String(value).replace(/(dp|sp|px)$/i, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
};

/** The framework colors drawables actually reference. */
const FRAMEWORK_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'rgba(0,0,0,0)',
};

/**
 * Android colors are #RRGGBB or #AARRGGBB; SVG wants #RRGGBB plus a separate opacity.
 *
 * References must resolve to something opaque. AppIcon tints by using the SVG as a CSS
 * mask, and a mask reads the alpha channel — so a path left as `fill="none"` disappears
 * entirely rather than picking up the tint. White is the safe fallback: it is what a
 * tinted drawable is authored against, and it masks to full coverage.
 *
 * @param resolveAppColor  maps an app `@color/name` to CSS; supplied by the sync script
 */
const androidColor = (value, resolveAppColor) => {
  if (!value) return null;

  if (value.startsWith('@android:color/')) {
    const name = value.slice('@android:color/'.length);
    return {color: FRAMEWORK_COLORS[name] ?? '#FFFFFF', opacity: 1};
  }
  if (value.startsWith('@color/')) {
    const resolved = resolveAppColor?.(value.slice('@color/'.length));
    return {color: resolved ?? '#FFFFFF', opacity: 1};
  }
  if (value.startsWith('@') || value.startsWith('?')) {
    // Theme attribute or a state list we cannot flatten — assume tintable.
    return {color: '#FFFFFF', opacity: 1};
  }

  const hex = value.replace('#', '');
  if (hex.length === 6) return {color: `#${hex.toUpperCase()}`, opacity: 1};
  if (hex.length === 8) {
    return {
      color: `#${hex.slice(2).toUpperCase()}`,
      opacity: Number.parseInt(hex.slice(0, 2), 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {color: `#${hex.toUpperCase()}`, opacity: 1};
  }
  return null;
};

/** Android group transforms apply as scale/rotate about a pivot, then translate. */
const groupTransform = (tag) => {
  const translateX = num(attr(tag, 'translateX'));
  const translateY = num(attr(tag, 'translateY'));
  const scaleX = num(attr(tag, 'scaleX'), 1);
  const scaleY = num(attr(tag, 'scaleY'), 1);
  const rotation = num(attr(tag, 'rotation'));
  const pivotX = num(attr(tag, 'pivotX'));
  const pivotY = num(attr(tag, 'pivotY'));

  const parts = [];
  if (translateX || translateY) parts.push(`translate(${translateX},${translateY})`);
  if (pivotX || pivotY) parts.push(`translate(${pivotX},${pivotY})`);
  if (rotation) parts.push(`rotate(${rotation})`);
  if (scaleX !== 1 || scaleY !== 1) parts.push(`scale(${scaleX},${scaleY})`);
  if (pivotX || pivotY) parts.push(`translate(${-pivotX},${-pivotY})`);
  return parts.join(' ');
};

/**
 * @param xml   raw vector drawable XML
 * @param opts  { tint } forces every fill to one color (matches app:tint on the ImageView)
 *               { resolveAppColor } maps an app @color/name to CSS
 * @returns     { svg, width, height } or null if the XML is not a <vector>
 */
export const vectorDrawableToSvg = (xml, opts = {}) => {
  const vectorTag = xml.match(/<vector\b[^>]*>/s);
  if (!vectorTag) return null;

  const viewportWidth = num(attr(vectorTag[0], 'viewportWidth'), 24);
  const viewportHeight = num(attr(vectorTag[0], 'viewportHeight'), 24);
  const width = num(attr(vectorTag[0], 'width'), viewportWidth);
  const height = num(attr(vectorTag[0], 'height'), viewportHeight);

  let clipCounter = 0;
  const defs = [];
  const body = [];
  const openGroups = [];

  // Walk tags in document order so group nesting is preserved.
  const tagPattern = /<(\/?)(vector|group|clip-path|path)\b([^>]*?)(\/?)>/gs;
  let match;
  while ((match = tagPattern.exec(xml)) !== null) {
    const [full, closing, name, , selfClosing] = match;

    if (name === 'vector') continue;

    if (name === 'group') {
      if (closing) {
        if (openGroups.length) {
          openGroups.pop();
          body.push('</g>');
        }
        continue;
      }
      const transform = groupTransform(full);
      openGroups.push(true);
      body.push(transform ? `<g transform="${transform}">` : '<g>');
      if (selfClosing) {
        openGroups.pop();
        body.push('</g>');
      }
      continue;
    }

    if (closing) continue;

    if (name === 'clip-path') {
      const pathData = attr(full, 'pathData');
      if (!pathData) continue;
      const id = `clip${clipCounter++}`;
      defs.push(`<clipPath id="${id}"><path d="${pathData}"/></clipPath>`);
      // Applies to the rest of the current group.
      body.push(`<g clip-path="url(#${id})">`);
      openGroups.push(true);
      continue;
    }

    if (name === 'path') {
      const pathData = attr(full, 'pathData');
      if (!pathData) continue;

      const attrs = [`d="${pathData}"`];

      const fill = androidColor(attr(full, 'fillColor'), opts.resolveAppColor);
      if (opts.tint) {
        attrs.push(`fill="${opts.tint}"`);
      } else if (fill) {
        attrs.push(`fill="${fill.color}"`);
        if (fill.opacity < 1) attrs.push(`fill-opacity="${fill.opacity.toFixed(3)}"`);
      } else {
        attrs.push('fill="none"');
      }

      const fillAlpha = attr(full, 'fillAlpha');
      if (fillAlpha !== null) attrs.push(`fill-opacity="${num(fillAlpha, 1)}"`);

      const fillType = attr(full, 'fillType');
      if (fillType) attrs.push(`fill-rule="${fillType.toLowerCase() === 'evenodd' ? 'evenodd' : 'nonzero'}"`);

      const stroke = androidColor(attr(full, 'strokeColor'), opts.resolveAppColor);
      if (stroke) {
        attrs.push(`stroke="${opts.tint ?? stroke.color}"`);
        const strokeWidth = attr(full, 'strokeWidth');
        if (strokeWidth !== null) attrs.push(`stroke-width="${num(strokeWidth, 1)}"`);
        const strokeAlpha = attr(full, 'strokeAlpha');
        if (strokeAlpha !== null) attrs.push(`stroke-opacity="${num(strokeAlpha, 1)}"`);
        const cap = attr(full, 'strokeLineCap');
        if (cap) attrs.push(`stroke-linecap="${cap}"`);
        const join = attr(full, 'strokeLineJoin');
        if (join) attrs.push(`stroke-linejoin="${join}"`);
      }

      body.push(`<path ${attrs.join(' ')}/>`);
    }
  }

  while (openGroups.length) {
    openGroups.pop();
    body.push('</g>');
  }

  const defsBlock = defs.length ? `<defs>${defs.join('')}</defs>` : '';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewportWidth} ${viewportHeight}"` +
    ` width="${width}" height="${height}">${defsBlock}${body.join('')}</svg>`;

  return {svg, width, height};
};
