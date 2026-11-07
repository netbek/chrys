import {validateColorCount} from './validate-color-count.ts';
import type {HexColors} from '../types.ts';

/**
 * Generates a list of continuous colors from a base color list.
 *
 * @param colors Base colors in hexadecimal format.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The continuous colors.
 * @throws If `n` is invalid or exceeds the base color list's length.
 * @see https://github.com/bokeh/bokeh/blob/1.3.4/bokeh/palettes.py#L1144-L1166
 */
export default function toContinuousColors(
  colors: HexColors,
  n = 6
): HexColors {
  validateColorCount(n);

  if (n === 0) {
    return [];
  }

  if (n > colors.length) {
    throw new RangeError(
      `Requested ${n} colors, function can only return colors up to the base color list's length (${colors.length}).`
    );
  }

  if (n === 1) {
    return [colors[0]];
  }

  const step = (colors.length - 1) / (n - 1);

  return Array.from({length: n}, (_, i) => colors[Math.floor(i * step)]);
}
