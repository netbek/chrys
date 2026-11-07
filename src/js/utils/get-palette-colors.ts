import {getPalette} from './get-palette.ts';
import toContinuousColors from './to-continuous-colors.ts';
import toDiscreteColors from './to-discrete-colors.ts';
import type {HexColors, QualifiedPaletteName} from '../types.ts';

/**
 * Gets a list of colors from a palette by name.
 *
 * Continuous palettes generate colors from their 256-color ramp; other palettes return
 * discrete colors.
 *
 * @param name Qualified palette name.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The palette colors.
 * @throws If the vendor or palette name is not found, its data is empty, `n` is invalid,
 *   or the requested size is unsupported.
 */
export default function getPaletteColors(
  name: QualifiedPaletteName,
  n = 6
): HexColors {
  const palette = getPalette(name);
  const continuousColors = palette[256];

  if (continuousColors) {
    return toContinuousColors(continuousColors, n);
  }

  return toDiscreteColors(palette, n);
}
