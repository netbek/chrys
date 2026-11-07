import {PALETTE_TO_VENDOR_MAP} from '../registry.ts';
import type {ParsedPaletteName, QualifiedPaletteName} from '../types.ts';

/**
 * Parses a qualified palette name into its vendor and vendor-specific palette name.
 *
 * @param name Qualified palette name, for example `vega_accent`.
 * @returns The parsed palette name: the vendor and its vendor-specific palette name.
 * @throws If the qualified palette name is not recognized.
 */
export default function parsePaletteName(
  name: QualifiedPaletteName
): ParsedPaletteName {
  if (!Object.hasOwn(PALETTE_TO_VENDOR_MAP, name)) {
    throw new Error(`Palette name "${name}" not recognized.`);
  }

  const vendor = PALETTE_TO_VENDOR_MAP[name];
  const palette = name.substring(vendor.length + 1);

  return {vendor, palette};
}
