/** A hexadecimal color string. */
export type HexColor = string;

/** A list of hexadecimal color strings. */
export type HexColors = HexColor[];

/** Palette sizes mapped to color arrays. */
export type Palette = Record<number, HexColors>;

/** An RGB color as red, green, and blue channels. */
export type RGBColor = readonly [number, number, number];

/** A list of RGB colors. */
export type RGBColors = RGBColor[];

/** Colors represented as hexadecimal strings or RGB tuples. */
export type Colors = HexColors | RGBColors;

/** A palette vendor. */
export type Vendor = 'bokeh' | 'vega' | 'd3';

/** A qualified palette name: includes its vendor prefix, for example `vega_accent`. */
export type QualifiedPaletteName = string;

/** A qualified palette name parsed into its vendor and vendor-specific palette name. */
export type ParsedPaletteName = {
  readonly vendor: Vendor;
  readonly palette: string;
};
