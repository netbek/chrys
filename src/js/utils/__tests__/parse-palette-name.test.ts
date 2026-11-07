import {describe, expect, test} from 'vitest';
import {
  PaletteNotFoundError,
  VendorNotFoundError
} from '../../errors.js';
import {BOKEH_ACCENT} from '../../palettes/bokeh/accent.js';
import {BOKEH_PALETTE_NAMES} from '../../palettes/bokeh/index.js';
import {D3_ACCENT} from '../../palettes/d3/accent.js';
import {D3_PALETTE_NAMES} from '../../palettes/d3/index.js';
import {VEGA_ACCENT} from '../../palettes/vega/accent.js';
import {VEGA_BROWN_BLUE_GREEN} from '../../palettes/vega/brown-blue-green.js';
import {VEGA_PALETTE_NAMES} from '../../palettes/vega/index.js';
import {VENDOR} from '../../registry.js';
import parsePaletteName from '../parse-palette-name.js';

describe('parsePaletteName', () => {
  test('Should parse a valid palette name', () => {
    expect(parsePaletteName(VEGA_ACCENT)).toEqual({
      vendor: 'vega',
      palette: 'accent'
    });
  });

  test('Should parse a valid d3 palette name', () => {
    expect(parsePaletteName(D3_ACCENT)).toEqual({
      vendor: 'd3',
      palette: 'accent'
    });
  });

  test('Should parse a valid bokeh palette name', () => {
    expect(parsePaletteName(BOKEH_ACCENT)).toEqual({
      vendor: 'bokeh',
      palette: 'Accent'
    });
  });

  test('Should parse a multi-word palette name', () => {
    expect(parsePaletteName(VEGA_BROWN_BLUE_GREEN)).toEqual({
      vendor: 'vega',
      palette: 'brownbluegreen'
    });
  });

  test('Should throw an error for a name without a vendor separator', () => {
    expect(() => parsePaletteName('lorem ipsum')).toThrow(
      PaletteNotFoundError
    );
    expect(() => parsePaletteName('lorem ipsum')).toThrow(
      'Palette "lorem ipsum" not found.'
    );
  });

  test('Should throw an error for an unknown vendor', () => {
    expect(() => parsePaletteName('unknown_accent')).toThrow(
      VendorNotFoundError
    );
    expect(() => parsePaletteName('unknown_accent')).toThrow(
      'Vendor "unknown" not found.'
    );
  });

  test('Should throw an error for a vendor without a palette', () => {
    expect(() => parsePaletteName('vega')).toThrow(PaletteNotFoundError);
    expect(() => parsePaletteName('vega')).toThrow(
      'Palette "vega" not found.'
    );
    expect(() => parsePaletteName('vega_')).toThrow(PaletteNotFoundError);
    expect(() => parsePaletteName('vega_')).toThrow(
      'Palette "vega_" not found.'
    );
  });

  test('Should throw an error for a known vendor with an unknown palette', () => {
    expect(() => parsePaletteName('vega_unknown')).toThrow(
      PaletteNotFoundError
    );
    expect(() => parsePaletteName('vega_unknown')).toThrow(
      'Palette "vega_unknown" not found.'
    );
  });
});

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
});
