import {validateColorCount} from './validate-color-count.ts';
import type {HexColors, Palette} from '../types.ts';

/**
 * Converts palette data to a list of discrete colors with at most `n` colors.
 *
 * @param palette Palette sizes mapped to color arrays.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The discrete colors.
 * @throws If `n` is invalid, the palette is empty, or the requested size is unsupported.
 */
export default function toDiscreteColors(palette: Palette, n = 6): HexColors {
  validateColorCount(n);

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
    return palette[minSize]!.slice(0, n);
  }

  if (n > maxSize) {
    return palette[maxSize]!.slice(0, n);
  }

  const colors = palette[n];

  if (colors) {
    return colors.slice(0, n);
  }

  throw new RangeError(
    `Unsupported palette size ${n}. Supported sizes: ${sizes.join(', ')}.`
  );
}
