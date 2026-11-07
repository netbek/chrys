import {describe, expect, test} from 'vitest';
import {validateColorCount} from '../validate-color-count.js';

describe('validateColorCount', () => {
  test('Should accept zero', () => {
    expect(() => validateColorCount(0)).not.toThrow();
  });

  test('Should accept a positive integer', () => {
    expect(() => validateColorCount(6)).not.toThrow();
  });

  test('Should throw for a negative number', () => {
    expect(() => validateColorCount(-1)).toThrow(RangeError);
  });

  test('Should throw for a non-integer', () => {
    expect(() => validateColorCount(1.5)).toThrow(RangeError);
  });

  test('Should throw for non-finite values', () => {
    expect(() => validateColorCount(Number.NaN)).toThrow(RangeError);
    expect(() => validateColorCount(Number.POSITIVE_INFINITY)).toThrow(
      RangeError
    );
  });

  test('Should include the invalid count in the error', () => {
    expect(() => validateColorCount(-1)).toThrow(
      'Color count must be a non-negative integer, got -1.'
    );
  });
});
