import {getPalette} from './get-palette.ts';
import toDiscretePalette from './to-discrete-palette.ts';
import type {HexColors, QualifiedPaletteName} from '../types.ts';

/**
 * Gets a discrete palette by name.
 *
 * @param name Qualified palette name.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The discrete palette colors.
 * @throws If the qualified palette name is not recognized or the size is unsupported.
 */
export default function discretePalette(
  name: QualifiedPaletteName,
  n = 6
): HexColors {
  return toDiscretePalette(getPalette(name), n);
}
