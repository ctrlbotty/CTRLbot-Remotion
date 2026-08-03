// A minimal PNG reader, so the frame gates can look at pixels.
//
// Written rather than installed because the obvious route does not exist here: the
// ffmpeg that ships inside @remotion/compositor is built with `--disable-filters` and a
// short whitelist, so it has no `crop`, `cropdetect`, `freezedetect`, `signalstats` or
// `tblend`. A first pass at these gates used those filters, and because ffmpeg failed on
// the missing encoder rather than the missing filter, every check silently reported
// success. A gate that cannot run must fail loudly; one that quietly passes is worse
// than none, because it is trusted.
//
// Node's zlib is all a PNG actually needs. Handles 8-bit greyscale, RGB and RGBA,
// non-interlaced — which covers everything Remotion and ffmpeg's png encoder emit.

import {inflateSync} from 'node:zlib';
import {readFileSync} from 'node:fs';

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const CHANNELS = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4};

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};

/**
 * Decode to `{width, height, channels, data}` where `data` is raw samples, row-major.
 */
export const decodePng = (filePath) => {
  const buffer = readFileSync(filePath);
  if (!buffer.subarray(0, 8).equals(SIGNATURE)) throw new Error(`Not a PNG: ${filePath}`);

  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  for (let offset = 8; offset < buffer.length; ) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const start = offset + 8;
    if (type === 'IHDR') {
      width = buffer.readUInt32BE(start);
      height = buffer.readUInt32BE(start + 4);
      bitDepth = buffer[start + 8];
      colorType = buffer[start + 9];
      if (buffer[start + 12] !== 0) throw new Error('Interlaced PNG is not supported');
    } else if (type === 'IDAT') {
      idat.push(buffer.subarray(start, start + length));
    } else if (type === 'IEND') {
      break;
    }
    offset = start + length + 4;
  }

  if (bitDepth !== 8) throw new Error(`Only 8-bit PNG is supported, got ${bitDepth}`);
  const channels = CHANNELS[colorType];
  if (!channels || colorType === 3) throw new Error(`Unsupported PNG colour type ${colorType}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const data = Buffer.alloc(stride * height);

  for (let row = 0; row < height; row += 1) {
    const filter = raw[row * (stride + 1)];
    const source = row * (stride + 1) + 1;
    const target = row * stride;
    const above = target - stride;

    for (let index = 0; index < stride; index += 1) {
      const value = raw[source + index];
      const a = index >= channels ? data[target + index - channels] : 0;
      const b = row > 0 ? data[above + index] : 0;
      const c = row > 0 && index >= channels ? data[above + index - channels] : 0;
      data[target + index] =
        (value +
          (filter === 1 ? a : filter === 2 ? b : filter === 3 ? (a + b) >> 1 : filter === 4 ? paeth(a, b, c) : 0)) &
        0xff;
    }
  }

  return {width, height, channels, data};
};

/** Perceived brightness, 0..255, of the pixel at (x, y). */
export const luminanceAt = (image, x, y) => {
  const index = (y * image.width + x) * image.channels;
  if (image.channels <= 2) return image.data[index];
  const {data} = image;
  return 0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2];
};

/** A coarse luminance grid — enough to compare two frames or find content, cheaply. */
export const luminanceGrid = (image, columns = 64, rows = 36) => {
  const grid = new Float64Array(columns * rows);
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = Math.min(image.width - 1, Math.floor(((column + 0.5) / columns) * image.width));
      const y = Math.min(image.height - 1, Math.floor(((row + 0.5) / rows) * image.height));
      grid[row * columns + column] = luminanceAt(image, x, y);
    }
  }
  return {grid, columns, rows};
};

/** Mean absolute difference between two grids, 0..255. How much changed. */
export const gridDifference = (a, b) => {
  let total = 0;
  for (let index = 0; index < a.grid.length; index += 1) {
    total += Math.abs(a.grid[index] - b.grid[index]);
  }
  return total / a.grid.length;
};

/**
 * The share of the frame containing anything above `threshold` luminance, and the
 * bounding box of it — which is how bars show up. A shot that fills the frame has a box
 * touching every edge; a 1449px image dropped in a 1920px frame does not.
 */
export const contentBox = (image, threshold = 12, columns = 64, rows = 36) => {
  const {grid} = luminanceGrid(image, columns, rows);
  let left = columns;
  let right = -1;
  let top = rows;
  let bottom = -1;
  let lit = 0;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      if (grid[row * columns + column] <= threshold) continue;
      lit += 1;
      if (column < left) left = column;
      if (column > right) right = column;
      if (row < top) top = row;
      if (row > bottom) bottom = row;
    }
  }

  if (right < 0) return {coverage: 0, width: 0, height: 0, area: 0};
  return {
    coverage: lit / (columns * rows),
    width: (right - left + 1) / columns,
    height: (bottom - top + 1) / rows,
    area: (((right - left + 1) / columns) * (bottom - top + 1)) / rows,
  };
};
