import {describe, expect, test} from 'vitest';
import {
  BOKEH_PALETTE_NAMES,
  D3_PALETTE_NAMES,
  parsePaletteName,
  VEGA_PALETTE_NAMES,
  VENDOR
} from '..';

const paletteNameMaps = [
  [VENDOR.BOKEH, BOKEH_PALETTE_NAMES],
  [VENDOR.VEGA, VEGA_PALETTE_NAMES],
  [VENDOR.D3, D3_PALETTE_NAMES]
] as const;

describe('palette name maps', () => {
  test('Should map upper snake case variable names', () => {
    for (const [vendor, names] of paletteNameMaps) {
      const prefix = vendor.toUpperCase();

      for (const variable of Object.keys(names)) {
        expect(variable).toMatch(new RegExp(`^${prefix}_[A-Z0-9_]+$`));
      }
    }
  });

  test('Should map constant names to palette names', () => {
    expect(BOKEH_PALETTE_NAMES.BOKEH_BROWN_BLUE_GREEN).toBe('bokeh_BrBG');
    expect(VEGA_PALETTE_NAMES.VEGA_BROWN_BLUE_GREEN).toBe(
      'vega_brownbluegreen'
    );
    expect(D3_PALETTE_NAMES.D3_BROWN_BLUE_GREEN).toBe('d3_brownbluegreen');
  });

  test('Should map each constant to a unique palette name', () => {
    for (const [vendor, names] of paletteNameMaps) {
      const paletteNames = Object.values(names);

      expect(new Set(paletteNames).size, vendor).toBe(paletteNames.length);
    }
  });

  test('Should parse every palette name to its vendor', () => {
    for (const [vendor, names] of paletteNameMaps) {
      for (const [constant, paletteName] of Object.entries(names)) {
        expect(parsePaletteName(paletteName), constant).toEqual({
          vendor,
          palette: paletteName.substring(vendor.length + 1)
        });
      }
    }
  });
});
