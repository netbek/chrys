import {
  BOKEH_PALETTE_DATA,
  BOKEH_DOCS_PALETTE_DATA,
  BOKEH_CATEGORY_10,
  BOKEH_CATEGORY_20,
  BOKEH_CATEGORY_20_B,
  BOKEH_CATEGORY_20_C,
  BOKEH_COLORBLIND,
  BOKEH_ACCENT,
  BOKEH_DARK_2,
  BOKEH_PAIRED,
  BOKEH_PASTEL_1,
  BOKEH_PASTEL_2,
  BOKEH_SET_1,
  BOKEH_SET_2,
  BOKEH_SET_3,
  BOKEH_YELLOW_GREEN,
  BOKEH_YELLOW_GREEN_BLUE,
  BOKEH_GREEN_BLUE,
  BOKEH_BLUE_GREEN,
  BOKEH_PURPLE_BLUE_GREEN,
  BOKEH_PURPLE_BLUE,
  BOKEH_BLUE_PURPLE,
  BOKEH_RED_PURPLE,
  BOKEH_PURPLE_RED,
  BOKEH_ORANGE_RED,
  BOKEH_YELLOW_ORANGE_RED,
  BOKEH_YELLOW_ORANGE_BROWN,
  BOKEH_PURPLES,
  BOKEH_BLUES,
  BOKEH_GREENS,
  BOKEH_ORANGES,
  BOKEH_REDS,
  BOKEH_GREYS,
  BOKEH_PURPLE_ORANGE,
  BOKEH_BROWN_BLUE_GREEN,
  BOKEH_PURPLE_GREEN,
  BOKEH_PINK_YELLOW_GREEN,
  BOKEH_RED_BLUE,
  BOKEH_RED_GREY,
  BOKEH_RED_YELLOW_BLUE,
  BOKEH_SPECTRAL,
  BOKEH_RED_YELLOW_GREEN,
  BOKEH_INFERNO,
  BOKEH_MAGMA,
  BOKEH_PLASMA,
  BOKEH_VIRIDIS,
  VEGA_PALETTE_DATA,
  VEGA_DOCS_PALETTE_DATA,
  VEGA_CATEGORY_10,
  VEGA_CATEGORY_20,
  VEGA_CATEGORY_20_B,
  VEGA_CATEGORY_20_C,
  VEGA_TABLEAU_10,
  VEGA_TABLEAU_20,
  VEGA_ACCENT,
  VEGA_DARK_2,
  VEGA_PAIRED,
  VEGA_PASTEL_1,
  VEGA_PASTEL_2,
  VEGA_SET_1,
  VEGA_SET_2,
  VEGA_SET_3,
  VEGA_BLUES,
  VEGA_GREENS,
  VEGA_GREYS,
  VEGA_ORANGES,
  VEGA_PURPLES,
  VEGA_REDS,
  VEGA_BLUE_GREEN,
  VEGA_BLUE_PURPLE,
  VEGA_GREEN_BLUE,
  VEGA_ORANGE_RED,
  VEGA_PURPLE_BLUE,
  VEGA_PURPLE_BLUE_GREEN,
  VEGA_PURPLE_RED,
  VEGA_RED_PURPLE,
  VEGA_YELLOW_GREEN,
  VEGA_YELLOW_ORANGE_BROWN,
  VEGA_YELLOW_ORANGE_RED,
  VEGA_BLUE_ORANGE,
  VEGA_BROWN_BLUE_GREEN,
  VEGA_PURPLE_GREEN,
  VEGA_PURPLE_ORANGE,
  VEGA_RED_BLUE,
  VEGA_RED_GREY,
  VEGA_YELLOW_GREEN_BLUE,
  VEGA_RED_YELLOW_BLUE,
  VEGA_RED_YELLOW_GREEN,
  VEGA_PINK_YELLOW_GREEN,
  VEGA_SPECTRAL,
  VEGA_VIRIDIS,
  VEGA_MAGMA,
  VEGA_INFERNO,
  VEGA_PLASMA,
  VEGA_RAINBOW,
  VEGA_SINEBOW,
  VEGA_BROWNS,
  VEGA_TEAL_BLUES,
  VEGA_TEALS,
  VEGA_WARM_GREYS,
  VEGA_GOLD_GREEN,
  VEGA_GOLD_ORANGE,
  VEGA_GOLD_RED,
  VEGA_LIGHT_GREY_RED,
  VEGA_LIGHT_GREY_TEAL,
  VEGA_LIGHT_MULTI,
  VEGA_LIGHT_ORANGE,
  VEGA_LIGHT_TEAL_BLUE,
  VEGA_DARK_BLUE,
  VEGA_DARK_GOLD,
  VEGA_DARK_GREEN,
  VEGA_DARK_MULTI,
  VEGA_DARK_RED,
  VEGA_OBSERVABLE_10,
  VEGA_CIVIDIS,
  VEGA_TURBO
} from './paletteModules.js';

import {toDiscretePalette} from './toDiscretePalette.js';

export const BOKEH = 'bokeh';
export const VEGA = 'vega';

type Vendor = typeof BOKEH | typeof VEGA;

export const CATEGORICAL_PALETTE_VENDORS = [
  {[BOKEH]: BOKEH_ACCENT, [VEGA]: VEGA_ACCENT},
  {
    [BOKEH]: BOKEH_CATEGORY_10,

    [VEGA]: VEGA_CATEGORY_10
  },
  {
    [BOKEH]: BOKEH_CATEGORY_20,

    [VEGA]: VEGA_CATEGORY_20
  },
  {
    [BOKEH]: BOKEH_CATEGORY_20_B,

    [VEGA]: VEGA_CATEGORY_20_B
  },
  {
    [BOKEH]: BOKEH_CATEGORY_20_C,

    [VEGA]: VEGA_CATEGORY_20_C
  },
  {[BOKEH]: BOKEH_DARK_2, [VEGA]: VEGA_DARK_2},
  {[BOKEH]: BOKEH_PAIRED, [VEGA]: VEGA_PAIRED},
  {[BOKEH]: BOKEH_PASTEL_1, [VEGA]: VEGA_PASTEL_1},
  {[BOKEH]: BOKEH_PASTEL_2, [VEGA]: VEGA_PASTEL_2},
  {[BOKEH]: BOKEH_SET_1, [VEGA]: VEGA_SET_1},
  {[BOKEH]: BOKEH_SET_2, [VEGA]: VEGA_SET_2},
  {[BOKEH]: BOKEH_SET_3, [VEGA]: VEGA_SET_3},
  {[BOKEH]: undefined, [VEGA]: VEGA_TABLEAU_10},
  {[BOKEH]: undefined, [VEGA]: VEGA_TABLEAU_20},
  {[BOKEH]: undefined, [VEGA]: VEGA_OBSERVABLE_10},
  {[BOKEH]: BOKEH_COLORBLIND, [VEGA]: undefined}
];

export const DIVERGING_PALETTE_VENDORS = [
  {[BOKEH]: undefined, [VEGA]: VEGA_BLUE_ORANGE},
  {
    [BOKEH]: BOKEH_BROWN_BLUE_GREEN,

    [VEGA]: VEGA_BROWN_BLUE_GREEN
  },
  {
    [BOKEH]: BOKEH_PURPLE_GREEN,

    [VEGA]: VEGA_PURPLE_GREEN
  },
  {
    [BOKEH]: BOKEH_PINK_YELLOW_GREEN,

    [VEGA]: VEGA_PINK_YELLOW_GREEN
  },
  {
    [BOKEH]: BOKEH_PURPLE_ORANGE,

    [VEGA]: VEGA_PURPLE_ORANGE
  },
  {[BOKEH]: BOKEH_RED_BLUE, [VEGA]: VEGA_RED_BLUE},
  {[BOKEH]: BOKEH_RED_GREY, [VEGA]: VEGA_RED_GREY},
  {
    [BOKEH]: BOKEH_RED_YELLOW_BLUE,

    [VEGA]: VEGA_RED_YELLOW_BLUE
  },
  {
    [BOKEH]: BOKEH_RED_YELLOW_GREEN,

    [VEGA]: VEGA_RED_YELLOW_GREEN
  },
  {[BOKEH]: BOKEH_SPECTRAL, [VEGA]: VEGA_SPECTRAL}
];

export const SEQUENTIAL_PALETTE_VENDORS = [
  // Single hue
  {[BOKEH]: BOKEH_BLUES, [VEGA]: VEGA_BLUES},
  {[BOKEH]: undefined, [VEGA]: VEGA_TEAL_BLUES},
  {[BOKEH]: undefined, [VEGA]: VEGA_TEALS},
  {[BOKEH]: BOKEH_GREENS, [VEGA]: VEGA_GREENS},
  {[BOKEH]: undefined, [VEGA]: VEGA_BROWNS},
  {[BOKEH]: BOKEH_ORANGES, [VEGA]: VEGA_ORANGES},
  {[BOKEH]: BOKEH_REDS, [VEGA]: VEGA_REDS},
  {[BOKEH]: BOKEH_PURPLES, [VEGA]: VEGA_PURPLES},
  {[BOKEH]: undefined, [VEGA]: VEGA_WARM_GREYS},
  {[BOKEH]: BOKEH_GREYS, [VEGA]: VEGA_GREYS},
  // Multiple hues
  {[BOKEH]: BOKEH_VIRIDIS, [VEGA]: VEGA_VIRIDIS},
  {[BOKEH]: BOKEH_MAGMA, [VEGA]: VEGA_MAGMA},
  {[BOKEH]: BOKEH_INFERNO, [VEGA]: VEGA_INFERNO},
  {[BOKEH]: BOKEH_PLASMA, [VEGA]: VEGA_PLASMA},
  {[BOKEH]: undefined, [VEGA]: VEGA_CIVIDIS},
  {[BOKEH]: undefined, [VEGA]: VEGA_TURBO},
  {[BOKEH]: BOKEH_BLUE_GREEN, [VEGA]: VEGA_BLUE_GREEN},
  {
    [BOKEH]: BOKEH_BLUE_PURPLE,

    [VEGA]: VEGA_BLUE_PURPLE
  },
  {[BOKEH]: undefined, [VEGA]: VEGA_GOLD_GREEN},
  {[BOKEH]: undefined, [VEGA]: VEGA_GOLD_ORANGE},
  {[BOKEH]: undefined, [VEGA]: VEGA_GOLD_RED},
  {[BOKEH]: BOKEH_GREEN_BLUE, [VEGA]: VEGA_GREEN_BLUE},
  {[BOKEH]: BOKEH_ORANGE_RED, [VEGA]: VEGA_ORANGE_RED},
  {
    [BOKEH]: BOKEH_PURPLE_BLUE_GREEN,

    [VEGA]: VEGA_PURPLE_BLUE_GREEN
  },
  {
    [BOKEH]: BOKEH_PURPLE_BLUE,

    [VEGA]: VEGA_PURPLE_BLUE
  },
  {[BOKEH]: BOKEH_PURPLE_RED, [VEGA]: VEGA_PURPLE_RED},
  {[BOKEH]: BOKEH_RED_PURPLE, [VEGA]: VEGA_RED_PURPLE},
  {
    [BOKEH]: BOKEH_YELLOW_GREEN_BLUE,

    [VEGA]: VEGA_YELLOW_GREEN_BLUE
  },
  {
    [BOKEH]: BOKEH_YELLOW_GREEN,

    [VEGA]: VEGA_YELLOW_GREEN
  },
  {
    [BOKEH]: BOKEH_YELLOW_ORANGE_BROWN,

    [VEGA]: VEGA_YELLOW_ORANGE_BROWN
  },
  {
    [BOKEH]: BOKEH_YELLOW_ORANGE_RED,

    [VEGA]: VEGA_YELLOW_ORANGE_RED
  },
  // For dark backgrounds
  {[BOKEH]: undefined, [VEGA]: VEGA_DARK_BLUE},
  {[BOKEH]: undefined, [VEGA]: VEGA_DARK_GOLD},
  {[BOKEH]: undefined, [VEGA]: VEGA_DARK_GREEN},
  {[BOKEH]: undefined, [VEGA]: VEGA_DARK_MULTI},
  {[BOKEH]: undefined, [VEGA]: VEGA_DARK_RED},
  // For light backgrounds
  {[BOKEH]: undefined, [VEGA]: VEGA_LIGHT_GREY_RED},
  {[BOKEH]: undefined, [VEGA]: VEGA_LIGHT_GREY_TEAL},
  {[BOKEH]: undefined, [VEGA]: VEGA_LIGHT_MULTI},
  {[BOKEH]: undefined, [VEGA]: VEGA_LIGHT_ORANGE},
  {[BOKEH]: undefined, [VEGA]: VEGA_LIGHT_TEAL_BLUE}
];

export const CYCLICAL_PALETTE_VENDORS = [
  {[BOKEH]: undefined, [VEGA]: VEGA_RAINBOW},
  {[BOKEH]: undefined, [VEGA]: VEGA_SINEBOW}
];

const PALETTE_TO_VENDOR_MAP: Record<string, Vendor> = {};
[
  DIVERGING_PALETTE_VENDORS,
  CATEGORICAL_PALETTE_VENDORS,
  SEQUENTIAL_PALETTE_VENDORS,
  CYCLICAL_PALETTE_VENDORS
].forEach((mappings): void => {
  mappings.forEach((mapping): void => {
    ([BOKEH, VEGA] as const).forEach((vendor): void => {
      const name = mapping[vendor];
      if (name) {
        PALETTE_TO_VENDOR_MAP[name] = vendor;
      }
    });
  });
});

const PALETTE_DATA: Record<Vendor, Record<string, Record<number, string[]>>> = {
  [BOKEH]: BOKEH_PALETTE_DATA,
  [VEGA]: VEGA_PALETTE_DATA
};

const DOCS_PALETTE_DATA: Record<Vendor, Record<string, string[]>> = {
  [BOKEH]: BOKEH_DOCS_PALETTE_DATA,
  [VEGA]: VEGA_DOCS_PALETTE_DATA
};

/**
 * Parses a palette name into its vendor and palette components.
 *
 * @param name Palette name, for example `vega_accent`.
 * @returns The vendor and the vendor-specific palette name.
 * @throws If the palette name is not recognized.
 */
export function parsePaletteName(name: string): {
  vendor: Vendor;
  palette: string;
} {
  if (!Object.hasOwn(PALETTE_TO_VENDOR_MAP, name)) {
    throw new Error(`Palette name "${name}" not recognized.`);
  }

  const vendor = PALETTE_TO_VENDOR_MAP[name];
  const palette = name.substring(vendor.length + 1);

  return {vendor, palette};
}

/**
 * Gets the discrete palette data for a palette name.
 *
 * @param name Palette name.
 * @returns Palette sizes mapped to color arrays.
 * @throws If the palette name is not recognized or its data is missing.
 */
function getPalette(name: string): Record<number, string[]> {
  const {vendor} = parsePaletteName(name);
  const palette = PALETTE_DATA[vendor][name];

  if (!palette) {
    throw new Error(`Palette data for "${name}" not found.`);
  }

  return palette;
}

/**
 * Gets the documentation palette for a palette name.
 *
 * @param name Palette name.
 * @returns The documentation palette colors.
 * @throws If the palette name is not recognized or its data is missing.
 */
function getDocsPalette(name: string): string[] {
  const {vendor} = parsePaletteName(name);
  const palette = DOCS_PALETTE_DATA[vendor][name];

  if (!palette) {
    throw new Error(`Documentation palette data for "${name}" not found.`);
  }

  return palette;
}

/**
 * Gets a discrete palette by name.
 *
 * @param name Palette name.
 * @param n Number of colors to return; must be a non-negative integer.
 * @returns The discrete palette colors.
 * @throws If the palette name is not recognized or the size is unsupported.
 */
export function discretePalette(name: string, n = 6): string[] {
  return toDiscretePalette(getPalette(name), n);
}

/**
 * Gets the documentation palette by name.
 *
 * @param name Palette name.
 * @returns A copy of the documentation palette colors.
 * @throws If the palette name is not recognized or its data is missing.
 */
export function docsPalette(name: string): string[] {
  return [...getDocsPalette(name)];
}
