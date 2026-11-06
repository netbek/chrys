import {afterEach, describe, expect, test, vi} from 'vitest';
import {
  VEGA_ACCENT,
  VEGA_ACCENT_PALETTE_DATA
} from '../../palettes/vega/accent.js';
import {getPalette} from '../get-palette.js';

describe('getPalette', () => {
  test('Should return the discrete palette data for a palette name', () => {
    expect(getPalette(VEGA_ACCENT)).toEqual(VEGA_ACCENT_PALETTE_DATA);
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => getPalette('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized.'
    );
  });
});

describe('getPalette with missing data', () => {
  afterEach(() => {
    vi.doUnmock('../../palettes/vega/index.js');
    vi.resetModules();
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

    const {getPalette: getPaletteWithMissingData} =
      await import('../get-palette.js');

    expect(() => getPaletteWithMissingData(VEGA_ACCENT)).toThrow(
      'Palette data for "vega_accent" not found.'
    );
  });
});
