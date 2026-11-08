import {describe, expect, test} from 'vitest';
import toContinuousColors from '../to-continuous-colors.js';

const COLORS = ['#000000', '#111111', '#222222', '#333333'];

describe('toContinuousColors', () => {
  test('Should return an empty list when size is zero', () => {
    expect(toContinuousColors(COLORS, 0)).toEqual([]);
  });

  test('Should return the first color when size is one', () => {
    expect(toContinuousColors(COLORS, 1)).toEqual([COLORS[0]]);
  });

  test('Should return the first and last colors when size is two', () => {
    expect(toContinuousColors(COLORS, 2)).toEqual([COLORS[0], COLORS[3]]);
  });

  test('Should return the base colors when size equals the list length', () => {
    expect(toContinuousColors(COLORS, COLORS.length)).toEqual(COLORS);
  });

  test('Should return all base colors when size is not given', () => {
    expect(toContinuousColors(COLORS)).toEqual(COLORS);
  });

  test('Should return all base colors when size is undefined', () => {
    expect(toContinuousColors(COLORS, undefined)).toEqual(COLORS);
  });

  test('Should return an empty list for empty colors', () => {
    expect(toContinuousColors([])).toEqual([]);
    expect(toContinuousColors([], 0)).toEqual([]);
  });

  test('Should throw for empty colors when size is one', () => {
    expect(() => toContinuousColors([], 1)).toThrow(/Requested 1 colors/);
  });

  test('Should return a single color when no size is given', () => {
    const colors = ['#000000'];

    expect(toContinuousColors(colors)).toEqual(colors);
    expect(toContinuousColors(colors, 1)).toEqual(colors);
  });

  test('Should throw for a single color when size is two', () => {
    expect(() => toContinuousColors(['#000000'], 2)).toThrow(
      /Requested 2 colors/
    );
  });

  test('Should return the first color for two colors when size is one', () => {
    expect(toContinuousColors(['#000000', '#ffffff'], 1)).toEqual(['#000000']);
  });

  test('Should return both colors for two colors when size is two', () => {
    const colors = ['#000000', '#ffffff'];

    expect(toContinuousColors(colors, 2)).toEqual(colors);
  });

  test('Should sample three colors from four', () => {
    expect(toContinuousColors(COLORS, 3)).toEqual([
      COLORS[0],
      COLORS[1],
      COLORS[3]
    ]);
  });

  test('Should throw when size is a boolean', () => {
    expect(() => toContinuousColors(COLORS, true as never)).toThrow(RangeError);
  });

  test('Should return a copy when size is not given', () => {
    const colors = toContinuousColors(COLORS);

    colors.pop();

    expect(COLORS).toEqual(['#000000', '#111111', '#222222', '#333333']);
  });

  test('Should return a copy when size is one', () => {
    const colors = toContinuousColors(COLORS, 1);

    colors.pop();

    expect(COLORS).toEqual(['#000000', '#111111', '#222222', '#333333']);
  });

  test('Should throw when size exceeds the list length', () => {
    expect(() => toContinuousColors(COLORS, 5)).toThrow(/Requested 5 colors/);
  });

  test('Should throw when size is negative', () => {
    expect(() => toContinuousColors(COLORS, -1)).toThrow(RangeError);
  });

  test('Should throw when size is not an integer', () => {
    expect(() => toContinuousColors(COLORS, 1.5)).toThrow(RangeError);
  });

  test('Should throw when size is not finite', () => {
    expect(() => toContinuousColors(COLORS, Number.NaN)).toThrow(RangeError);
    expect(() => toContinuousColors(COLORS, Number.POSITIVE_INFINITY)).toThrow(
      RangeError
    );
  });

  test('Should return a copy of the base colors', () => {
    const colors = toContinuousColors(COLORS, COLORS.length);

    colors[0] = '#ffffff';

    expect(COLORS[0]).toEqual('#000000');
  });
});
