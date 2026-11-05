import {describe, expect, test} from 'vitest';
import {BOKEH_ACCENT, D3_ACCENT, docsPalette, VEGA_ACCENT} from '..';
import {BOKEH_ACCENT_DOCS_PALETTE_DATA} from '../palettes/bokeh/accent.js';
import {D3_ACCENT_DOCS_PALETTE_DATA} from '../palettes/d3/accent.js';

describe('docsPalette', () => {
  test('Should return a copy that does not mutate the shared data', () => {
    const palette = docsPalette(VEGA_ACCENT);
    const original = palette[0];

    palette[0] = '#000000';

    expect(docsPalette(VEGA_ACCENT)[0]).toEqual(original);
  });

  test('Should return the bokeh documentation palette', () => {
    expect(docsPalette(BOKEH_ACCENT)).toEqual(BOKEH_ACCENT_DOCS_PALETTE_DATA);
  });

  test('Should return the d3 documentation palette', () => {
    const palette = docsPalette(D3_ACCENT);

    expect(palette).toEqual(D3_ACCENT_DOCS_PALETTE_DATA);
    expect(palette).toHaveLength(8);
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => docsPalette('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized.'
    );
  });
});
