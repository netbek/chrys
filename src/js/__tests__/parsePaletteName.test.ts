import {describe, expect, test} from 'vitest';
import {D3_ACCENT, parsePaletteName, VEGA_ACCENT} from '..';

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

  test('Should throw an error for an invalid palette name', () => {
    expect(() => parsePaletteName('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized'
    );
  });
});
