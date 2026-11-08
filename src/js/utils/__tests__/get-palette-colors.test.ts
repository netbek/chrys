import {afterEach, describe, expect, test, vi} from 'vitest';
import {PaletteNotFoundError} from '../../errors.js';
import {
  BOKEH_ACCENT,
  BOKEH_ACCENT_PALETTE_DATA
} from '../../palettes/bokeh/accent.js';
import {
  BOKEH_VIRIDIS,
  BOKEH_VIRIDIS_PALETTE_DATA
} from '../../palettes/bokeh/viridis.js';
import {D3_ACCENT, D3_ACCENT_PALETTE_DATA} from '../../palettes/d3/accent.js';
import {D3_BLUES} from '../../palettes/d3/blues.js';
import {
  D3_VIRIDIS,
  D3_VIRIDIS_PALETTE_DATA
} from '../../palettes/d3/viridis.js';
import {
  VEGA_ACCENT,
  VEGA_ACCENT_PALETTE_DATA
} from '../../palettes/vega/accent.js';
import {
  VEGA_VIRIDIS,
  VEGA_VIRIDIS_PALETTE_DATA
} from '../../palettes/vega/viridis.js';
import getPaletteColors, {PALETTE_MODE} from '../get-palette-colors.js';
import toContinuousColors from '../to-continuous-colors.js';
import toDiscreteColors from '../to-discrete-colors.js';
import type {Palette} from '../../types.js';

describe('getPaletteColors', () => {
  test('Should generate the largest discrete palette if size not given', () => {
    expect(getPaletteColors(VEGA_ACCENT)).toEqual(VEGA_ACCENT_PALETTE_DATA[8]);
  });

  test('Should generate the largest bokeh palette if size not given', () => {
    expect(getPaletteColors(BOKEH_ACCENT)).toEqual(
      BOKEH_ACCENT_PALETTE_DATA[8]
    );
  });

  test('Should generate a discrete d3 palette', () => {
    expect(getPaletteColors(D3_BLUES, 6)).toEqual([
      '#eff3ff',
      '#c6dbef',
      '#9ecae1',
      '#6baed6',
      '#3182bd',
      '#08519c'
    ]);
  });

  test('Should generate a discrete palette below the minimum d3 palette size', () => {
    expect(getPaletteColors(D3_ACCENT, 3)).toEqual(
      D3_ACCENT_PALETTE_DATA[8].slice(0, 3)
    );
  });

  test('Should generate a discrete palette if size given', () => {
    expect(getPaletteColors(VEGA_ACCENT, 8)).toEqual([
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

  test('Should clamp a discrete palette to its maximum size', () => {
    expect(getPaletteColors(VEGA_ACCENT, 20)).toEqual([
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

  test('Should generate the full continuous ramp if size not given', () => {
    expect(getPaletteColors(VEGA_VIRIDIS)).toEqual(
      VEGA_VIRIDIS_PALETTE_DATA[256]
    );
  });

  test('Should generate continuous bokeh and d3 palettes', () => {
    expect(getPaletteColors(BOKEH_VIRIDIS, 6)).toEqual(
      toContinuousColors(BOKEH_VIRIDIS_PALETTE_DATA[256], 6)
    );
    expect(getPaletteColors(D3_VIRIDIS, 6)).toEqual(
      toContinuousColors(D3_VIRIDIS_PALETTE_DATA[256], 6)
    );
  });

  test('Should return the first color for a continuous palette when size is one', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 1)).toEqual([
      VEGA_VIRIDIS_PALETTE_DATA[256][0]
    ]);
  });

  test('Should return the full continuous ramp', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 256)).toEqual(
      VEGA_VIRIDIS_PALETTE_DATA[256]
    );
  });

  test('Should throw an error for a continuous size above the ramp length', () => {
    expect(() => getPaletteColors(VEGA_VIRIDIS, 257)).toThrow(
      /Requested 257 colors/
    );
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => getPaletteColors('lorem ipsum')).toThrow(PaletteNotFoundError);
    expect(() => getPaletteColors('lorem ipsum')).toThrow(
      'Palette "lorem ipsum" not found.'
    );
  });

  test('Should return an empty palette when size is zero', () => {
    expect(getPaletteColors(VEGA_ACCENT, 0)).toEqual([]);
    expect(getPaletteColors(VEGA_VIRIDIS, 0)).toEqual([]);
  });

  test('Should throw an error when size is negative', () => {
    expect(() => getPaletteColors(VEGA_ACCENT, -1)).toThrow(RangeError);
  });

  test('Should throw an error when size is not an integer', () => {
    expect(() => getPaletteColors(VEGA_ACCENT, 4.5)).toThrow(RangeError);
  });
});

describe('getPaletteColors mode', () => {
  afterEach(() => {
    vi.doUnmock('../get-palette.ts');
    vi.resetModules();
  });

  test('Should use auto mode by default', () => {
    expect(getPaletteColors(VEGA_VIRIDIS)).toEqual(
      toContinuousColors(VEGA_VIRIDIS_PALETTE_DATA[256])
    );
  });

  test('Should accept auto as a string', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, undefined, 'auto')).toEqual(
      getPaletteColors(VEGA_VIRIDIS)
    );
  });

  test('Should force continuous colors', () => {
    expect(
      getPaletteColors(VEGA_VIRIDIS, undefined, PALETTE_MODE.CONTINUOUS)
    ).toEqual(VEGA_VIRIDIS_PALETTE_DATA[256]);
  });

  test('Should throw when continuous data is missing', () => {
    expect(() =>
      getPaletteColors(VEGA_ACCENT, undefined, PALETTE_MODE.CONTINUOUS)
    ).toThrow('Palette "vega_accent" has no continuous data.');
  });

  test('Should exclude the 256 ramp when discrete mode is forced', () => {
    const palette: Palette = {...VEGA_VIRIDIS_PALETTE_DATA};
    delete palette[256];

    expect(
      getPaletteColors(VEGA_VIRIDIS, undefined, PALETTE_MODE.DISCRETE)
    ).toEqual(toDiscreteColors(palette));
  });

  test('Should use discrete sizes when discrete mode is forced with a size', () => {
    const palette: Palette = {...VEGA_VIRIDIS_PALETTE_DATA};
    delete palette[256];

    expect(getPaletteColors(VEGA_VIRIDIS, 6, 'discrete')).toEqual(
      toDiscreteColors(palette, 6)
    );
  });

  test('Should throw when discrete data is missing', async () => {
    vi.doMock('../get-palette.ts', () => ({
      getPalette: () => ({256: ['#000000']})
    }));
    vi.resetModules();

    const {default: getPaletteColorsWithMockedData} =
      await import('../get-palette-colors.js');

    expect(() =>
      getPaletteColorsWithMockedData(VEGA_ACCENT, undefined, 'discrete')
    ).toThrow('Palette "vega_accent" has no discrete data.');
  });

  test('Should throw for an unknown mode', () => {
    expect(() =>
      getPaletteColors(VEGA_ACCENT, undefined, 'lorem ipsum' as never)
    ).toThrow('Unknown palette mode "lorem ipsum".');
  });
});
