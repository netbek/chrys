import {describe, expect, test, vi} from 'vitest';

vi.mock('../paletteModules.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../paletteModules.js')>();

  return {
    ...actual,
    VEGA_PALETTE_DATA: {},
    VEGA_DOCS_PALETTE_DATA: {}
  };
});

import {discretePalette, docsPalette, VEGA_ACCENT} from '..';

describe('registry with missing data', () => {
  test('Should throw an error when discrete palette data is missing', () => {
    expect(() => discretePalette(VEGA_ACCENT)).toThrow(
      'Palette data for "vega_accent" not found.'
    );
  });

  test('Should throw an error when documentation palette data is missing', () => {
    expect(() => docsPalette(VEGA_ACCENT)).toThrow(
      'Documentation palette data for "vega_accent" not found.'
    );
  });
});
