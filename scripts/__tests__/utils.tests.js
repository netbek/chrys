import {describe, expect, test} from 'vitest';
import {BOKEH_ACCENT} from '../../src/js/palettes/bokeh/accent.js';
import {BOKEH_VIRIDIS} from '../../src/js/palettes/bokeh/viridis.js';
import {D3_ACCENT} from '../../src/js/palettes/d3/accent.js';
import {D3_VIRIDIS} from '../../src/js/palettes/d3/viridis.js';
import {VEGA_ACCENT} from '../../src/js/palettes/vega/accent.js';
import {VEGA_VIRIDIS} from '../../src/js/palettes/vega/viridis.js';
import {DOCS_PALETTE_DATA, docsPalette, getDocsPalette} from '../utils.js';
import expected from './fixtures/docs-palettes.json';

describe('DOCS_PALETTE_DATA', () => {
  test('Should exactly match the previous documentation palette data', () => {
    for (const [vendor, palettes] of Object.entries(expected)) {
      for (const [name, colors] of Object.entries(palettes)) {
        expect(DOCS_PALETTE_DATA[vendor][name], `${vendor}: ${name}`).toEqual(
          colors
        );
      }
    }
  });

  test('Should not contain extra documentation palettes', () => {
    for (const [vendor, palettes] of Object.entries(expected)) {
      expect(
        Object.keys(DOCS_PALETTE_DATA[vendor]).sort(),
        vendor
      ).toEqual(Object.keys(palettes).sort());
    }
  });
});

describe('docsPalette', () => {
  test('Should return a copy that does not mutate the shared data', () => {
    const palette = docsPalette(VEGA_ACCENT);
    const original = palette[0];

    palette[0] = '#000000';

    expect(docsPalette(VEGA_ACCENT)[0]).toEqual(original);
  });

  test('Should return the bokeh documentation palette', () => {
    expect(docsPalette(BOKEH_ACCENT)).toEqual(expected.bokeh[BOKEH_ACCENT]);
  });

  test('Should return the d3 documentation palette', () => {
    const palette = docsPalette(D3_ACCENT);

    expect(palette).toEqual(expected.d3[D3_ACCENT]);
    expect(palette).toHaveLength(8);
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => docsPalette('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized.'
    );
  });
});

describe('docsPalette per-palette data', () => {
  test('Should match the previous data for every palette', () => {
    for (const [vendor, palettes] of Object.entries(expected)) {
      for (const [paletteName, colors] of Object.entries(palettes)) {
        expect(docsPalette(paletteName), `${vendor}: ${paletteName}`).toEqual(
          colors
        );
      }
    }
  });

  test('Should match the previous data for viridis per-palette modules', () => {
    expect(docsPalette(BOKEH_VIRIDIS)).toEqual(expected.bokeh[BOKEH_VIRIDIS]);
    expect(docsPalette(VEGA_VIRIDIS)).toEqual(expected.vega[VEGA_VIRIDIS]);
    expect(docsPalette(D3_VIRIDIS)).toEqual(expected.d3[D3_VIRIDIS]);
  });
});

describe('getDocsPalette', () => {
  test('Should return the documentation palette data for a palette name', () => {
    expect(getDocsPalette(VEGA_ACCENT)).toEqual(expected.vega[VEGA_ACCENT]);
  });

  test('Should throw an error for an invalid palette name', () => {
    expect(() => getDocsPalette('lorem ipsum')).toThrow(
      'Palette name "lorem ipsum" not recognized.'
    );
  });
});

describe('getDocsPalette with missing data', () => {
  test('Should throw an error when documentation palette data is missing', () => {
    expect(() =>
      getDocsPalette(VEGA_ACCENT, {bokeh: {}, vega: {}, d3: {}})
    ).toThrow('Documentation palette data for "vega_accent" not found.');
  });
});
