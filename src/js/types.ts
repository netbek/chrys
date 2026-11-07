/** A palette vendor. */
export type Vendor = 'bokeh' | 'vega' | 'd3';

/** A vendor and its vendor-specific palette name. */
export type PaletteName = {
  readonly vendor: Vendor;
  readonly palette: string;
};

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
