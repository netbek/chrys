import type {HexColors, Palette} from '../types.ts';

/**
 * Converts a palette to a discrete palette with at most `n` colors.
 *
 * @param palette Palette sizes mapped to color arrays.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The discrete palette colors.
 * @throws If `n` is invalid, the palette is empty, or the requested size is unsupported.
 */
export default function toDiscretePalette(palette: Palette, n = 6): HexColors {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(
      `Palette size must be a non-negative integer, got ${n}.`
    );
  }

  if (n === 0) {
    return [];
  }

  const sizes = Object.keys(palette)
    .map(Number)
    .sort((a, b) => a - b);

  if (sizes.length === 0) {
    throw new Error('Palette is empty.');
  }

  const minSize = sizes[0];
  const maxSize = sizes[sizes.length - 1];

  if (n <= minSize) {
    return palette[minSize].slice(0, n);
  }

  if (n > maxSize) {
    return palette[maxSize].slice(0, n);
  }

  if (palette[n]) {
    return palette[n].slice(0, n);
  }

  throw new RangeError(
    `Unsupported palette size ${n}. Supported sizes: ${sizes.join(', ')}.`
  );
}
