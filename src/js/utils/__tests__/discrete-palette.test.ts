import {describe, expect, test} from 'vitest';
import {
  BOKEH_ACCENT,
  BOKEH_ACCENT_PALETTE_DATA
} from '../../palettes/bokeh/accent.js';
import {
  D3_ACCENT,
  D3_ACCENT_DOCS_PALETTE_DATA
} from '../../palettes/d3/accent.js';
import {D3_BLUES} from '../../palettes/d3/blues.js';
import {D3_VIRIDIS} from '../../palettes/d3/viridis.js';
import {VEGA_ACCENT} from '../../palettes/vega/accent.js';
import {VEGA_VIRIDIS} from '../../palettes/vega/viridis.js';
import discretePalette from '../discrete-palette.js';

describe('discretePalette', () => {
  test('Should generate a palette with 6 colors if size not given', () => {
    expect(discretePalette(VEGA_ACCENT)).toEqual([
      '#7fc97f',
      '#beaed4',
      '#fdc086',
      '#ffff99',
      '#386cb0',
      '#f0027f'
    ]);
  });

  test('Should generate a bokeh palette with 6 colors if size not given', () => {
    expect(discretePalette(BOKEH_ACCENT)).toEqual(BOKEH_ACCENT_PALETTE_DATA[6]);
  });

  test('Should generate a discrete d3 palette', () => {
    expect(discretePalette(D3_BLUES, 6)).toEqual([
      '#eff3ff',
      '#c6dbef',
      '#9ecae1',
      '#6baed6',
      '#3182bd',
      '#08519c'
    ]);
  });

  test('Should generate a palette below the minimum d3 palette size', () => {
    expect(discretePalette(D3_ACCENT, 3)).toEqual(
      D3_ACCENT_DOCS_PALETTE_DATA.slice(0, 3)
    );
  });

  test('Should generate a palette if size given', () => {
    expect(discretePalette(VEGA_ACCENT, 8)).toEqual([
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
    expect(discretePalette(VEGA_ACCENT, 20)).toEqual([
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
    expect(() => discretePalette('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized'
    );
  });

  test('Should return an empty palette when size is zero', () => {
    expect(discretePalette(VEGA_ACCENT, 0)).toEqual([]);
  });

  test('Should throw an error when size is negative', () => {
    expect(() => discretePalette(VEGA_ACCENT, -1)).toThrow(RangeError);
  });

  test('Should throw an error when size is not an integer', () => {
    expect(() => discretePalette(VEGA_ACCENT, 4.5)).toThrow(RangeError);
  });

  test('Should throw an error for an unsupported size between palette sizes', () => {
    expect(() => discretePalette(VEGA_VIRIDIS, 20)).toThrow(
      /Unsupported palette size 20/
    );
    expect(() => discretePalette(VEGA_VIRIDIS, 100)).toThrow(
      /Unsupported palette size 100/
    );
  });

  test('Should clamp to the maximum supported size', () => {
    expect(discretePalette(VEGA_VIRIDIS, 300)).toHaveLength(256);
    expect(discretePalette(D3_VIRIDIS, 300)).toHaveLength(256);
  });
});
