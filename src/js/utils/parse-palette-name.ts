import {
  PaletteNotFoundError,
  VendorNotFoundError
} from '../errors.ts';
import {PALETTE_TO_VENDOR_MAP, VENDOR} from '../registry.ts';
import type {ParsedPaletteName, QualifiedPaletteName} from '../types.ts';

const VENDORS = Object.values(VENDOR) as readonly string[];

/**
 * Parses a qualified palette name into its vendor and vendor-specific palette name.
 *
 * @param name Qualified palette name, for example `vega_accent`.
 * @returns The parsed palette name: the vendor and its vendor-specific palette name.
 * @throws {VendorNotFoundError} If the vendor is not found.
 * @throws {PaletteNotFoundError} If the palette name is not found.
 */
export default function parsePaletteName(
  name: QualifiedPaletteName
): ParsedPaletteName {
  if (!Object.hasOwn(PALETTE_TO_VENDOR_MAP, name)) {
    const separatorIndex = name.indexOf('_');

    if (separatorIndex === -1) {
      throw new PaletteNotFoundError(name);
    }

    const vendor = name.slice(0, separatorIndex);

    if (!VENDORS.includes(vendor)) {
      throw new VendorNotFoundError(vendor);
    }

    throw new PaletteNotFoundError(name);
  }

  const vendor = PALETTE_TO_VENDOR_MAP[name];
  const palette = name.substring(vendor.length + 1);

  return {vendor, palette};
}
