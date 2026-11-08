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
