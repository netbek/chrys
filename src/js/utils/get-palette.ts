import {
  PaletteDataEmptyError,
  PaletteNotFoundError,
  VendorNotFoundError
} from '../errors.ts';
import parsePaletteName from './parse-palette-name.ts';
import {PALETTE_DATA} from '../registry.ts';
import type {Palette, QualifiedPaletteName} from '../types.ts';

/**
 * Gets the discrete palette data for a qualified palette name.
 *
 * @param name Qualified palette name.
 * @returns Palette sizes mapped to color arrays.
 * @throws {VendorNotFoundError} If the vendor is not found.
 * @throws {PaletteNotFoundError} If the palette name is not found.
 * @throws {PaletteDataEmptyError} If the palette data is empty.
 */
export function getPalette(name: QualifiedPaletteName): Palette {
  const {vendor} = parsePaletteName(name);
  const vendorPalettes = PALETTE_DATA[vendor];

  if (!vendorPalettes) {
    throw new VendorNotFoundError(vendor);
  }

  const palette = vendorPalettes[name];

  if (!palette) {
    throw new PaletteNotFoundError(name);
  }

  if (Object.keys(palette).length === 0) {
    throw new PaletteDataEmptyError(name);
  }

  return palette;
}
