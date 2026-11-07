import {afterEach, describe, expect, test, vi} from 'vitest';
import {
  PaletteNotFoundError,
  VendorNotFoundError
} from '../../errors.js';
import {
  VEGA_ACCENT,
  VEGA_ACCENT_PALETTE_DATA
} from '../../palettes/vega/accent.js';
import {getPalette} from '../get-palette.js';

describe('getPalette', () => {
  test('Should return the discrete palette data for a palette name', () => {
    expect(getPalette(VEGA_ACCENT)).toEqual(VEGA_ACCENT_PALETTE_DATA);
  });

  test('Should throw an error for an unknown vendor', () => {
    expect(() => getPalette('unknown_accent')).toThrow(VendorNotFoundError);
    expect(() => getPalette('unknown_accent')).toThrow(
      'Vendor "unknown" not found.'
    );
  });

  test('Should throw an error for an unknown palette name', () => {
    expect(() => getPalette('vega_unknown')).toThrow(PaletteNotFoundError);
    expect(() => getPalette('vega_unknown')).toThrow(
      'Palette "vega_unknown" not found.'
    );
  });

  test('Should throw an error for a name without a vendor separator', () => {
    expect(() => getPalette('lorem ipsum')).toThrow(PaletteNotFoundError);
    expect(() => getPalette('lorem ipsum')).toThrow(
      'Palette "lorem ipsum" not found.'
    );
  });
});

describe('getPalette with missing data', () => {
  afterEach(() => {
    vi.doUnmock('../../palettes/vega/index.js');
    vi.resetModules();
  });

  test('Should throw an error when the vendor data is missing', async () => {
    vi.doMock('../../palettes/vega/index.js', async (importOriginal) => {
      const actual =
        await importOriginal<typeof import('../../palettes/vega/index.js')>();

      return {
        ...actual,
        VEGA_PALETTE_DATA: undefined
      };
    });
    vi.resetModules();

    const {VendorNotFoundError: MockedVendorNotFoundError} =
      await import('../../errors.js');
    const {getPalette: getPaletteWithMissingVendorData} =
      await import('../get-palette.js');

    expect(() => getPaletteWithMissingVendorData(VEGA_ACCENT)).toThrow(
      MockedVendorNotFoundError
    );
    expect(() => getPaletteWithMissingVendorData(VEGA_ACCENT)).toThrow(
      'Vendor "vega" not found.'
    );
  });

  test('Should throw an error when discrete palette data is missing', async () => {
    vi.doMock('../../palettes/vega/index.js', async (importOriginal) => {
      const actual =
        await importOriginal<typeof import('../../palettes/vega/index.js')>();

      return {
        ...actual,
        VEGA_PALETTE_DATA: {}
      };
    });
    vi.resetModules();

    const {PaletteNotFoundError: MockedPaletteNotFoundError} =
      await import('../../errors.js');
    const {getPalette: getPaletteWithMissingData} =
      await import('../get-palette.js');

    expect(() => getPaletteWithMissingData(VEGA_ACCENT)).toThrow(
      MockedPaletteNotFoundError
    );
    expect(() => getPaletteWithMissingData(VEGA_ACCENT)).toThrow(
      'Palette "vega_accent" not found.'
    );
  });

  test('Should throw an error when discrete palette data is empty', async () => {
    vi.doMock('../../palettes/vega/index.js', async (importOriginal) => {
      const actual =
        await importOriginal<typeof import('../../palettes/vega/index.js')>();

      return {
        ...actual,
        VEGA_PALETTE_DATA: {[VEGA_ACCENT]: {}}
      };
    });
    vi.resetModules();

    const {PaletteDataEmptyError: MockedPaletteDataEmptyError} =
      await import('../../errors.js');
    const {getPalette: getPaletteWithEmptyData} =
      await import('../get-palette.js');

    expect(() => getPaletteWithEmptyData(VEGA_ACCENT)).toThrow(
      MockedPaletteDataEmptyError
    );
    expect(() => getPaletteWithEmptyData(VEGA_ACCENT)).toThrow(
      'Palette data for "vega_accent" is empty.'
    );
  });
});
