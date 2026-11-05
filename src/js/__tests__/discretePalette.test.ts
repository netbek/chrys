import {describe, expect, test} from 'vitest';
import {discretePalette, VEGA_ACCENT, VEGA_VIRIDIS} from '..';

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
  });
});
