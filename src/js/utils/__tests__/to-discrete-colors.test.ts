import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {describe, expect, test} from 'vitest';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES
} from '../../palettes/bokeh/index.js';
import {
  BOKEH_VIRIDIS,
  BOKEH_VIRIDIS_PALETTE_DATA
} from '../../palettes/bokeh/viridis.js';
import {D3_PALETTE_DATA, D3_PALETTE_NAMES} from '../../palettes/d3/index.js';
import {
  D3_VIRIDIS,
  D3_VIRIDIS_PALETTE_DATA
} from '../../palettes/d3/viridis.js';
import {
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../../palettes/vega/index.js';
import {
  VEGA_VIRIDIS,
  VEGA_VIRIDIS_PALETTE_DATA
} from '../../palettes/vega/viridis.js';
import getPaletteColors from '../get-palette-colors.js';
import toContinuousColors from '../to-continuous-colors.js';
import toDiscreteColors from '../to-discrete-colors.js';

const VENDORS: Array<{
  name: string;
  data: Record<string, Record<number, string[]>>;
  names: Record<string, string>;
}> = [
  {
    name: 'bokeh',
    data: BOKEH_PALETTE_DATA,
    names: BOKEH_PALETTE_NAMES
  },
  {
    name: 'vega',
    data: VEGA_PALETTE_DATA,
    names: VEGA_PALETTE_NAMES
  },
  {
    name: 'd3',
    data: D3_PALETTE_DATA,
    names: D3_PALETTE_NAMES
  }
];

describe('toDiscreteColors', () => {
  test('Should throw an error when the palette is empty', () => {
    expect(() => toDiscreteColors({})).toThrow('Palette is empty.');
  });

  test('Should return the only palette size when no size is given', () => {
    const palette = {
      6: ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555']
    };

    expect(toDiscreteColors(palette)).toEqual(palette[6]);
  });

  test('Should return all colors when size is undefined', () => {
    const palette = {
      1: ['#000000'],
      2: ['#000000', '#ffffff']
    };

    expect(toDiscreteColors(palette, undefined)).toEqual([
      '#000000',
      '#ffffff'
    ]);
  });

  test('Should return the maximum available size when no size is given', () => {
    expect(
      toDiscreteColors({
        1: ['#000000'],
        2: ['#000000', '#ffffff']
      })
    ).toEqual(['#000000', '#ffffff']);
  });

  test('Should return the first colors when the requested size is below the minimum', () => {
    const palette = {
      8: [
        '#000000',
        '#111111',
        '#222222',
        '#333333',
        '#444444',
        '#555555',
        '#666666',
        '#777777'
      ]
    };

    expect(toDiscreteColors(palette, 3)).toEqual([
      '#000000',
      '#111111',
      '#222222'
    ]);
  });

  test('Should return a copy when the requested size equals the minimum', () => {
    const palette = {3: ['#000000', '#111111', '#222222']};
    const colors = toDiscreteColors(palette, 3);

    colors[0] = '#ffffff';

    expect(palette[3][0]).toEqual('#000000');
  });

  test('Should return a copy when the requested size exceeds the maximum', () => {
    const palette = {2: ['#000000', '#111111']};
    const colors = toDiscreteColors(palette, 5);

    colors[0] = '#ffffff';

    expect(colors).toHaveLength(2);
    expect(palette[2][0]).toEqual('#000000');
  });

  test('Should return a copy for an exact supported size between the minimum and maximum', () => {
    const palette = {
      3: ['#000000', '#111111', '#222222'],
      6: ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555'],
      9: [
        '#000000',
        '#111111',
        '#222222',
        '#333333',
        '#444444',
        '#555555',
        '#666666',
        '#777777',
        '#888888'
      ]
    };
    const colors = toDiscreteColors(palette, 6);

    expect(colors).not.toBe(palette[6]);

    colors[0] = '#ffffff';

    expect(colors).toHaveLength(6);
    expect(palette[6][0]).toEqual('#000000');
  });

  test('Should return the maximum palette when the requested size equals the maximum', () => {
    const palette = {
      2: ['#000000', '#111111'],
      4: ['#000000', '#111111', '#222222', '#333333']
    };

    expect(toDiscreteColors(palette, 4)).toEqual(palette[4]);
  });

  test('Should list the supported sizes in ascending order in the error', () => {
    expect(() => toDiscreteColors({6: ['#000000'], 1: ['#000000']}, 3)).toThrow(
      'Unsupported palette size 3. Supported sizes: 1, 6.'
    );
  });

  test('Should throw an error for a size between non-contiguous palette sizes', () => {
    const palette = {
      1: ['#000000'],
      3: ['#000000', '#111111', '#222222']
    };

    expect(() => toDiscreteColors(palette, 2)).toThrow(
      'Unsupported palette size 2. Supported sizes: 1, 3.'
    );
  });

  test('Should throw an error when size is negative', () => {
    expect(() => toDiscreteColors({1: ['#000000']}, -1)).toThrow(RangeError);
  });

  test('Should throw an error when size is not an integer', () => {
    expect(() => toDiscreteColors({1: ['#000000']}, 1.5)).toThrow(RangeError);
  });

  test('Should throw an error when size is not finite', () => {
    expect(() => toDiscreteColors({1: ['#000000']}, Number.NaN)).toThrow(
      RangeError
    );
    expect(() =>
      toDiscreteColors({1: ['#000000']}, Number.POSITIVE_INFINITY)
    ).toThrow(RangeError);
  });

  test('Should return an empty palette when size is zero', () => {
    expect(toDiscreteColors({1: ['#000000']}, 0)).toEqual([]);
  });
});

describe('getPaletteColors with per-palette data', () => {
  test('Should match the registry data for every palette', () => {
    for (const {name, data, names} of VENDORS) {
      for (const [constant, paletteName] of Object.entries(names)) {
        const palette = data[paletteName];
        const expected = palette[256]
          ? toContinuousColors(palette[256], 6)
          : toDiscreteColors(palette, 6);

        expect(
          getPaletteColors(paletteName, 6),
          `${name}: ${constant}`
        ).toEqual(expected);
      }
    }
  });

  test('Should match the registry data for viridis per-palette modules', () => {
    expect(getPaletteColors(BOKEH_VIRIDIS, 6)).toEqual(
      toContinuousColors(BOKEH_VIRIDIS_PALETTE_DATA[256], 6)
    );
    expect(getPaletteColors(VEGA_VIRIDIS, 6)).toEqual(
      toContinuousColors(VEGA_VIRIDIS_PALETTE_DATA[256], 6)
    );
    expect(getPaletteColors(D3_VIRIDIS, 6)).toEqual(
      toContinuousColors(D3_VIRIDIS_PALETTE_DATA[256], 6)
    );
  });
});

describe('per-palette modules', () => {
  test('Should be self-contained', () => {
    const files = [
      '../../palettes/bokeh/viridis.js',
      '../../palettes/vega/viridis.js',
      '../../palettes/d3/viridis.js'
    ];

    for (const file of files) {
      const source = readFileSync(
        fileURLToPath(new URL(file, import.meta.url)),
        'utf8'
      );

      expect(source, file).not.toContain("from '");
      expect(source.length, file).toBeLessThan(10_000);
    }
  });
});
