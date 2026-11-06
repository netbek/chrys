import {getPalette} from './get-palette.ts';
import toDiscretePalette from './to-discrete-palette.ts';

/**
 * Gets a discrete palette by name.
 *
 * @param name Palette name.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The discrete palette colors.
 * @throws If the palette name is not recognized or the size is unsupported.
 */
export default function discretePalette(name: string, n = 6): string[] {
  return toDiscretePalette(getPalette(name), n);
}
