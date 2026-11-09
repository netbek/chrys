/** A CSS color string. */
export type CssColor = string;

/** A list of CSS color strings. */
export type CssColors = CssColor[];

/** An 8-bit sRGB color expressed as channel values. */
export type RgbColor = [number, number, number];

/** A hexadecimal color string. */
export type HexColor = string;

/** A list of hexadecimal color strings. */
export type HexColors = HexColor[];

/** Palette sizes mapped to color arrays. */
export type Palette = Partial<Record<number, HexColors>>;

/** How `getPaletteColors` resolves a palette. */
export type PaletteMode = 'auto' | 'continuous' | 'discrete';

/** A palette vendor. */
export type Vendor = 'bokeh' | 'vega' | 'd3';

/** A qualified palette name: includes its vendor prefix, for example `vega_accent`. */
export type QualifiedPaletteName = string;

/** A qualified palette name parsed into its vendor and vendor-specific palette name. */
export type ParsedPaletteName = {
  readonly vendor: Vendor;
  readonly palette: string;
};
