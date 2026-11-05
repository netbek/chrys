import {describe, expect, test} from 'vitest';
import {toDiscretePalette} from '..';

describe('toDiscretePalette', () => {
  test('Should throw an error when the palette is empty', () => {
    expect(() => toDiscretePalette({})).toThrow('Palette is empty.');
  });

  test('Should default to six colors', () => {
    const palette = {
      6: ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555']
    };

    expect(toDiscretePalette(palette)).toEqual(palette[6]);
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

    expect(toDiscretePalette(palette, 3)).toEqual([
      '#000000',
      '#111111',
      '#222222'
    ]);
  });

  test('Should return a copy when the requested size equals the minimum', () => {
    const palette = {3: ['#000000', '#111111', '#222222']};
    const colors = toDiscretePalette(palette, 3);

    colors[0] = '#ffffff';

    expect(palette[3][0]).toEqual('#000000');
  });

  test('Should return a copy when the requested size exceeds the maximum', () => {
    const palette = {2: ['#000000', '#111111']};
    const colors = toDiscretePalette(palette, 5);

    colors[0] = '#ffffff';

    expect(colors).toHaveLength(2);
    expect(palette[2][0]).toEqual('#000000');
  });

  test('Should throw an error for a size between non-contiguous palette sizes', () => {
    const palette = {
      1: ['#000000'],
      3: ['#000000', '#111111', '#222222']
    };

    expect(() => toDiscretePalette(palette, 2)).toThrow(
      'Unsupported palette size 2. Supported sizes: 1, 3.'
    );
  });

  test('Should throw an error when size is negative', () => {
    expect(() => toDiscretePalette({1: ['#000000']}, -1)).toThrow(RangeError);
  });

  test('Should throw an error when size is not an integer', () => {
    expect(() => toDiscretePalette({1: ['#000000']}, 1.5)).toThrow(RangeError);
  });

  test('Should throw an error when size is not finite', () => {
    expect(() => toDiscretePalette({1: ['#000000']}, Number.NaN)).toThrow(
      RangeError
    );
    expect(() =>
      toDiscretePalette({1: ['#000000']}, Number.POSITIVE_INFINITY)
    ).toThrow(RangeError);
  });

  test('Should return an empty palette when size is zero', () => {
    expect(toDiscretePalette({1: ['#000000']}, 0)).toEqual([]);
  });
});
