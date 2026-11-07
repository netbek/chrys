import {describe, expect, test} from 'vitest';
import {
  PaletteDataEmptyError,
  PaletteNotFoundError,
  VendorNotFoundError
} from '../errors.js';

describe('palette errors', () => {
  test('VendorNotFoundError', () => {
    const error = new VendorNotFoundError('unknown');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('VendorNotFoundError');
    expect(error.message).toBe('Vendor "unknown" not found.');
  });

  test('PaletteNotFoundError', () => {
    const error = new PaletteNotFoundError('vega_unknown');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('PaletteNotFoundError');
    expect(error.message).toBe('Palette "vega_unknown" not found.');
  });

  test('PaletteDataEmptyError', () => {
    const error = new PaletteDataEmptyError('vega_accent');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('PaletteDataEmptyError');
    expect(error.message).toBe('Palette data for "vega_accent" is empty.');
  });
});
