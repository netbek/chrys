import {getPalette} from './get-palette.ts';
import toDiscreteColors from './to-discrete-colors.ts';
import type {HexColors, QualifiedPaletteName} from '../types.ts';

/**
 * Gets a list of discrete colors by palette name.
 *
 * @param name Qualified palette name.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The discrete colors.
 * @throws If the vendor or palette name is not found, its data is empty, `n` is invalid,
 *   or the requested size is unsupported.
 */
export default function discreteColors(
  name: QualifiedPaletteName,
  n = 6
): HexColors {
  return toDiscreteColors(getPalette(name), n);
}
