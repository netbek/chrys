import {afterEach, describe, expect, test, vi} from 'vitest';
import {
  PaletteDataEmptyError,
  PaletteNotFoundError,
  VendorNotFoundError
} from '../../errors.js';
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

async function withMockedPalette(
  palette: Palette,
  assertions: (getColors: typeof getPaletteColors) => void
): Promise<void> {
  vi.doMock('../get-palette.ts', () => ({
    getPalette: () => palette
  }));
  vi.resetModules();

  try {
    const {default: getColors} = await import('../get-palette-colors.js');

    assertions(getColors);
  } finally {
    vi.doUnmock('../get-palette.ts');
    vi.resetModules();
  }
}

describe('getPaletteColors discrete', () => {
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

  test('Should return the maximum palette when size exceeds the maximum', () => {
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

  test('Should return an empty palette when size is zero', () => {
    expect(getPaletteColors(VEGA_ACCENT, 0)).toEqual([]);
  });

  test('Should throw an error when size is negative', () => {
    expect(() => getPaletteColors(VEGA_ACCENT, -1)).toThrow(RangeError);
  });

  test('Should throw an error when size is not an integer', () => {
    expect(() => getPaletteColors(VEGA_ACCENT, 4.5)).toThrow(RangeError);
  });

  test('Should throw an error for a size between non-contiguous palette sizes', async () => {
    const palette: Palette = {
      1: ['#000000'],
      3: ['#000000', '#111111', '#222222']
    };

    await withMockedPalette(palette, (getColors) => {
      expect(() => getColors(VEGA_ACCENT, 2)).toThrow(
        'Unsupported palette size 2. Supported sizes: 1, 3.'
      );
    });
  });

  test('Should clamp a discrete palette to its maximum size', () => {
    expect(getPaletteColors(VEGA_ACCENT, 300)).toEqual([
      '#7fc97f',
      '#beaed4',
      '#fdc086',
      '#ffff99',
      '#386cb0',
      '#f0027f',
      '#bf5b17',
      '#666666'
    ]);
    expect(getPaletteColors(D3_ACCENT, 300)).toEqual(D3_ACCENT_PALETTE_DATA[8]);
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => getPaletteColors('lorem ipsum')).toThrow(PaletteNotFoundError);
    expect(() => getPaletteColors('lorem ipsum')).toThrow(
      'Palette "lorem ipsum" not found.'
    );
  });
});

describe('getPaletteColors continuous', () => {
  test('Should return an empty palette when size is zero', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 0)).toEqual([]);
  });

  test('Should generate the full continuous ramp if size not given', () => {
    expect(getPaletteColors(VEGA_VIRIDIS)).toEqual(
      VEGA_VIRIDIS_PALETTE_DATA[256]
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

  test('Should generate a continuous bokeh palette', () => {
    expect(getPaletteColors(BOKEH_VIRIDIS, 6)).toEqual(
      toContinuousColors(BOKEH_VIRIDIS_PALETTE_DATA[256], 6)
    );
  });

  test('Should generate a continuous d3 palette', () => {
    expect(getPaletteColors(D3_VIRIDIS, 6)).toEqual(
      toContinuousColors(D3_VIRIDIS_PALETTE_DATA[256], 6)
    );
  });

  test('Should fall back to discrete colors for a discrete palette', () => {
    expect(getPaletteColors(VEGA_ACCENT, 6)).toEqual(
      VEGA_ACCENT_PALETTE_DATA[6]
    );
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

  test('Should return an empty list in continuous mode when size is zero', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 0, 'continuous')).toEqual([]);
  });

  test('Should return the first color in continuous mode when size is one', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 1, 'continuous')).toEqual([
      VEGA_VIRIDIS_PALETTE_DATA[256][0]
    ]);
  });

  test('Should return the full ramp in continuous mode when size equals the ramp length', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 256, 'continuous')).toEqual(
      VEGA_VIRIDIS_PALETTE_DATA[256]
    );
  });

  test('Should throw in continuous mode when size exceeds the ramp length', () => {
    expect(() => getPaletteColors(VEGA_VIRIDIS, 257, 'continuous')).toThrow(
      /Requested 257 colors/
    );
  });

  test('Should throw in continuous mode when size is negative', () => {
    expect(() => getPaletteColors(VEGA_VIRIDIS, -1, 'continuous')).toThrow(
      RangeError
    );
  });

  test('Should throw in continuous mode when size is not an integer', () => {
    expect(() => getPaletteColors(VEGA_VIRIDIS, 1.5, 'continuous')).toThrow(
      RangeError
    );
  });

  test('Should throw in continuous mode when size is given and data is missing', () => {
    expect(() => getPaletteColors(VEGA_ACCENT, 5, 'continuous')).toThrow(
      'Palette "vega_accent" has no continuous data.'
    );
  });

  test('Should return the ramp in continuous mode when only ramp data exists', async () => {
    const palette: Palette = {256: ['#000000', '#ffffff']};

    await withMockedPalette(palette, (getColors) => {
      expect(getColors(VEGA_ACCENT, undefined, 'continuous')).toEqual(
        palette[256]
      );
      expect(getColors(VEGA_ACCENT, 1, 'continuous')).toEqual(['#000000']);
    });
  });

  test('Should return an empty list in discrete mode when size is zero', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 0, 'discrete')).toEqual([]);
  });

  test('Should return the first color in discrete mode when size is one', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 1, 'discrete')).toEqual(
      VEGA_VIRIDIS_PALETTE_DATA[1]
    );
  });

  test('Should return the largest discrete size in discrete mode', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 9, 'discrete')).toEqual(
      VEGA_VIRIDIS_PALETTE_DATA[9]
    );
  });

  test('Should clamp in discrete mode when size exceeds the maximum', () => {
    expect(getPaletteColors(VEGA_VIRIDIS, 300, 'discrete')).toEqual(
      VEGA_VIRIDIS_PALETTE_DATA[9]
    );
  });

  test('Should throw in discrete mode for an unsupported size', async () => {
    const palette: Palette = {
      256: ['#000000'],
      1: ['#000000'],
      3: ['#000000', '#111111', '#222222']
    };

    await withMockedPalette(palette, (getColors) => {
      expect(() => getColors(VEGA_ACCENT, 2, 'discrete')).toThrow(
        'Unsupported palette size 2. Supported sizes: 1, 3.'
      );
    });
  });

  test('Should throw in discrete mode when size is negative', () => {
    expect(() => getPaletteColors(VEGA_VIRIDIS, -1, 'discrete')).toThrow(
      RangeError
    );
  });

  test('Should throw in discrete mode when size is not an integer', () => {
    expect(() => getPaletteColors(VEGA_VIRIDIS, 1.5, 'discrete')).toThrow(
      RangeError
    );
  });

  test('Should use discrete colors in discrete mode on a discrete-only palette', () => {
    expect(getPaletteColors(VEGA_ACCENT, undefined, 'discrete')).toEqual(
      VEGA_ACCENT_PALETTE_DATA[8]
    );
    expect(getPaletteColors(VEGA_ACCENT, 6, 'discrete')).toEqual(
      VEGA_ACCENT_PALETTE_DATA[6]
    );
  });

  test('Should exclude the ramp in discrete mode when only one discrete size exists', async () => {
    const palette: Palette = {
      256: ['#000000', '#111111'],
      5: ['#000000', '#111111', '#222222', '#333333', '#444444']
    };

    await withMockedPalette(palette, (getColors) => {
      expect(getColors(VEGA_ACCENT, undefined, 'discrete')).toEqual(palette[5]);
      expect(getColors(VEGA_ACCENT, 3, 'discrete')).toEqual(
        palette[5]!.slice(0, 3)
      );
    });
  });

  test('Should return an empty list in discrete mode when the discrete size is an empty array', async () => {
    const palette: Palette = {256: ['#000000'], 3: []};

    await withMockedPalette(palette, (getColors) => {
      expect(getColors(VEGA_ACCENT, undefined, 'discrete')).toEqual([]);
      expect(getColors(VEGA_ACCENT, 3, 'discrete')).toEqual([]);
    });
  });

  test('Should use continuous colors in auto mode when only ramp data exists', async () => {
    const palette: Palette = {256: ['#000000', '#ffffff']};

    await withMockedPalette(palette, (getColors) => {
      expect(getColors(VEGA_ACCENT)).toEqual(palette[256]);
      expect(getColors(VEGA_ACCENT, undefined, PALETTE_MODE.AUTO)).toEqual(
        palette[256]
      );
    });
  });

  test('Should accept auto mode on a discrete-only palette', () => {
    expect(getPaletteColors(VEGA_ACCENT, undefined, PALETTE_MODE.AUTO)).toEqual(
      VEGA_ACCENT_PALETTE_DATA[8]
    );
  });

  test('Should throw for an unknown mode with a size', () => {
    expect(() =>
      getPaletteColors(VEGA_ACCENT, 5, 'lorem ipsum' as never)
    ).toThrow('Unknown palette mode "lorem ipsum".');
  });

  test('Should throw for an unknown mode on a continuous palette', () => {
    expect(() =>
      getPaletteColors(VEGA_VIRIDIS, undefined, 'lorem ipsum' as never)
    ).toThrow('Unknown palette mode "lorem ipsum".');
  });

  test('Should throw for an unknown mode before an invalid size', () => {
    expect(() =>
      getPaletteColors(VEGA_ACCENT, -1, 'lorem ipsum' as never)
    ).toThrow('Unknown palette mode "lorem ipsum".');
  });

  test('Should throw for a non-string mode', () => {
    expect(() =>
      getPaletteColors(VEGA_ACCENT, undefined, null as never)
    ).toThrow('Unknown palette mode "null".');
    expect(() => getPaletteColors(VEGA_ACCENT, undefined, 42 as never)).toThrow(
      'Unknown palette mode "42".'
    );
  });

  test('Should throw for an uppercase mode', () => {
    expect(() =>
      getPaletteColors(VEGA_ACCENT, undefined, 'AUTO' as never)
    ).toThrow('Unknown palette mode "AUTO".');
  });

  test('Should accept an explicit undefined size with each mode', () => {
    expect(
      getPaletteColors(VEGA_VIRIDIS, undefined, PALETTE_MODE.AUTO)
    ).toEqual(getPaletteColors(VEGA_VIRIDIS));
    expect(
      getPaletteColors(VEGA_VIRIDIS, undefined, PALETTE_MODE.CONTINUOUS)
    ).toEqual(getPaletteColors(VEGA_VIRIDIS, undefined, 'continuous'));
    expect(
      getPaletteColors(VEGA_VIRIDIS, undefined, PALETTE_MODE.DISCRETE)
    ).toEqual(getPaletteColors(VEGA_VIRIDIS, undefined, 'discrete'));
  });

  test('Should throw for an unknown mode before an invalid name', () => {
    expect(() =>
      getPaletteColors('lorem ipsum', undefined, 'lorem ipsum' as never)
    ).toThrow('Unknown palette mode "lorem ipsum".');
  });

  test('Should throw for an unknown mode before empty palette data', async () => {
    vi.doMock('../get-palette.ts', () => ({
      getPalette: () => {
        throw new PaletteDataEmptyError(VEGA_ACCENT);
      }
    }));
    vi.resetModules();

    const {default: getColors} = await import('../get-palette-colors.js');

    expect(() =>
      getColors(VEGA_ACCENT, undefined, 'lorem ipsum' as never)
    ).toThrow('Unknown palette mode "lorem ipsum".');
  });

  test('Should throw a vendor error', () => {
    expect(() => getPaletteColors('unknown_accent')).toThrow(
      VendorNotFoundError
    );
    expect(() => getPaletteColors('unknown_accent')).toThrow(
      'Vendor "unknown" not found.'
    );
  });

  test('Should propagate empty palette data errors', async () => {
    vi.doMock('../get-palette.ts', () => ({
      getPalette: () => {
        throw new PaletteDataEmptyError(VEGA_ACCENT);
      }
    }));
    vi.resetModules();

    const {default: getColors} = await import('../get-palette-colors.js');

    expect(() => getColors(VEGA_ACCENT)).toThrow(PaletteDataEmptyError);
  });
});
