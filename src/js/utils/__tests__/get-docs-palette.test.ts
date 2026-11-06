import {afterEach, describe, expect, test, vi} from 'vitest';
import {
  VEGA_ACCENT,
  VEGA_ACCENT_DOCS_PALETTE_DATA
} from '../../palettes/vega/accent.js';
import getDocsPalette from '../get-docs-palette.js';

describe('getDocsPalette', () => {
  test('Should return the documentation palette data for a palette name', () => {
    expect(getDocsPalette(VEGA_ACCENT)).toEqual(VEGA_ACCENT_DOCS_PALETTE_DATA);
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => getDocsPalette('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized.'
    );
  });
});

describe('getDocsPalette with missing data', () => {
  afterEach(() => {
    vi.doUnmock('../../palettes/vega/index.js');
    vi.resetModules();
  });

  test('Should throw an error when documentation palette data is missing', async () => {
    vi.doMock('../../palettes/vega/index.js', async (importOriginal) => {
      const actual =
        await importOriginal<typeof import('../../palettes/vega/index.js')>();

      return {
        ...actual,
        VEGA_DOCS_PALETTE_DATA: {}
      };
    });
    vi.resetModules();

    const {default: getDocsPaletteWithMissingData} =
      await import('../get-docs-palette.js');

    expect(() => getDocsPaletteWithMissingData(VEGA_ACCENT)).toThrow(
      'Documentation palette data for "vega_accent" not found.'
    );
  });
});
