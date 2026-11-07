import parsePaletteName from './parse-palette-name.ts';
import {PALETTE_DATA} from '../registry.ts';
import type {Palette} from '../types.ts';

/**
 * Gets the discrete palette data for a palette name.
 *
 * @param name Palette name.
 * @returns Palette sizes mapped to color arrays.
 * @throws If the palette name is not recognized or its data is missing.
 */
export function getPalette(name: string): Palette {
  const {vendor} = parsePaletteName(name);
  const palette = PALETTE_DATA[vendor][name];

  if (!palette) {
    throw new Error(`Palette data for "${name}" not found.`);
  }

  return palette;
}
