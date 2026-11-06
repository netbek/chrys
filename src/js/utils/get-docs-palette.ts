import parsePaletteName from './parse-palette-name.ts';
import {DOCS_PALETTE_DATA} from '../registry.ts';

/**
 * Gets the documentation palette for a palette name.
 *
 * @param name Palette name.
 * @returns The documentation palette colors.
 * @throws If the palette name is not recognized or its data is missing.
 */
export default function getDocsPalette(name: string): string[] {
  const {vendor} = parsePaletteName(name);
  const palette = DOCS_PALETTE_DATA[vendor][name];

  if (!palette) {
    throw new Error(`Documentation palette data for "${name}" not found.`);
  }

  return palette;
}
