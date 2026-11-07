import {describe, expect, test} from 'vitest';
import {PaletteNotFoundError} from '../../errors.js';
import {
  BOKEH_ACCENT,
  BOKEH_ACCENT_PALETTE_DATA
} from '../../palettes/bokeh/accent.js';
import {
  D3_ACCENT,
  D3_ACCENT_PALETTE_DATA
} from '../../palettes/d3/accent.js';
import {D3_BLUES} from '../../palettes/d3/blues.js';
import {D3_VIRIDIS} from '../../palettes/d3/viridis.js';
import {VEGA_ACCENT} from '../../palettes/vega/accent.js';
import {VEGA_VIRIDIS} from '../../palettes/vega/viridis.js';
import discreteColors from '../discrete-colors.js';

describe('discreteColors', () => {
  test('Should generate a palette with 6 colors if size not given', () => {
    expect(discreteColors(VEGA_ACCENT)).toEqual([
      '#7fc97f',
      '#beaed4',
      '#fdc086',
      '#ffff99',
      '#386cb0',
      '#f0027f'
    ]);
  });

  test('Should generate a bokeh palette with 6 colors if size not given', () => {
    expect(discreteColors(BOKEH_ACCENT)).toEqual(BOKEH_ACCENT_PALETTE_DATA[6]);
  });

  test('Should generate a discrete d3 palette', () => {
    expect(discreteColors(D3_BLUES, 6)).toEqual([
      '#eff3ff',
      '#c6dbef',
      '#9ecae1',
      '#6baed6',
      '#3182bd',
      '#08519c'
    ]);
  });

  test('Should generate a palette below the minimum d3 palette size', () => {
    expect(discreteColors(D3_ACCENT, 3)).toEqual(
      D3_ACCENT_PALETTE_DATA[8].slice(0, 3)
    );
  });

  test('Should generate a palette if size given', () => {
    expect(discreteColors(VEGA_ACCENT, 8)).toEqual([
      '#7fc97f',
      '#beaed4',
      '#fdc086',
      '#ffff99',
      '#386cb0',
      '#f0027f',
      '#bf5b17',
      '#666666'
    ]);
  });

  test('Should generate a palette with the maximum number of colors that the palette supports if the given size is larger', () => {
    expect(discreteColors(VEGA_ACCENT, 20)).toEqual([
      '#7fc97f',
      '#beaed4',
      '#fdc086',
      '#ffff99',
      '#386cb0',
      '#f0027f',
      '#bf5b17',
      '#666666'
    ]);
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => discreteColors('lorem ipsum')).toThrow(
      PaletteNotFoundError
    );
    expect(() => discreteColors('lorem ipsum')).toThrow(
      'Palette "lorem ipsum" not found.'
    );
  });

  test('Should return an empty palette when size is zero', () => {
    expect(discreteColors(VEGA_ACCENT, 0)).toEqual([]);
  });

  test('Should throw an error when size is negative', () => {
    expect(() => discreteColors(VEGA_ACCENT, -1)).toThrow(RangeError);
  });

  test('Should throw an error when size is not an integer', () => {
    expect(() => discreteColors(VEGA_ACCENT, 4.5)).toThrow(RangeError);
  });

  test('Should throw an error for an unsupported size between palette sizes', () => {
    expect(() => discreteColors(VEGA_VIRIDIS, 20)).toThrow(
      /Unsupported palette size 20/
    );
    expect(() => discreteColors(VEGA_VIRIDIS, 100)).toThrow(
      /Unsupported palette size 100/
    );
  });

  test('Should clamp to the maximum supported size', () => {
    expect(discreteColors(VEGA_VIRIDIS, 300)).toHaveLength(256);
    expect(discreteColors(D3_VIRIDIS, 300)).toHaveLength(256);
  });
});
