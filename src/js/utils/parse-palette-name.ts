import {PALETTE_TO_VENDOR_MAP, type Vendor} from '../registry.ts';

/** A vendor and its vendor-specific palette name. */
export type PaletteName = {
  readonly vendor: Vendor;
  readonly palette: string;
};

/**
 * Parses a palette name into its vendor and palette components.
 *
 * @param name Palette name, for example `vega_accent`.
 * @returns The vendor and the vendor-specific palette name.
 * @throws If the palette name is not recognized.
 */
export default function parsePaletteName(name: string): PaletteName {
  if (!Object.hasOwn(PALETTE_TO_VENDOR_MAP, name)) {
    throw new Error(`Palette name "${name}" not recognized.`);
  }

  const vendor = PALETTE_TO_VENDOR_MAP[name];
  const palette = name.substring(vendor.length + 1);

  return {vendor, palette};
}
