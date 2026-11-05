import {describe, expect, test} from 'vitest';
import {
  BOKEH_ACCENT,
  D3_ACCENT,
  parsePaletteName,
  VEGA_ACCENT,
  VEGA_BROWN_BLUE_GREEN
} from '..';

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

  test('Should throw an error for an invalid palette name', () => {
    expect(() => parsePaletteName('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized.'
    );
  });

  test('Should throw an error for an unknown vendor', () => {
    expect(() => parsePaletteName('unknown_accent')).toThrow(
      'Palette name "unknown_accent" not recognized.'
    );
  });

  test('Should throw an error for a vendor without a palette', () => {
    expect(() => parsePaletteName('vega')).toThrow(
      'Palette name "vega" not recognized.'
    );
    expect(() => parsePaletteName('vega_')).toThrow(
      'Palette name "vega_" not recognized.'
    );
  });
});
