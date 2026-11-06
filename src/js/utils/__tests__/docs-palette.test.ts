import {describe, expect, test} from 'vitest';
import {
  BOKEH_ACCENT,
  BOKEH_ACCENT_DOCS_PALETTE_DATA
} from '../../palettes/bokeh/accent.js';
import {
  BOKEH_DOCS_PALETTE_DATA,
  BOKEH_PALETTE_NAMES
} from '../../palettes/bokeh/index.js';
import {
  BOKEH_VIRIDIS,
  BOKEH_VIRIDIS_DOCS_PALETTE_DATA
} from '../../palettes/bokeh/viridis.js';
import {
  D3_ACCENT,
  D3_ACCENT_DOCS_PALETTE_DATA
} from '../../palettes/d3/accent.js';
import {
  D3_DOCS_PALETTE_DATA,
  D3_PALETTE_NAMES
} from '../../palettes/d3/index.js';
import {
  D3_VIRIDIS,
  D3_VIRIDIS_DOCS_PALETTE_DATA
} from '../../palettes/d3/viridis.js';
import {VEGA_ACCENT} from '../../palettes/vega/accent.js';
import {
  VEGA_DOCS_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../../palettes/vega/index.js';
import {
  VEGA_VIRIDIS,
  VEGA_VIRIDIS_DOCS_PALETTE_DATA
} from '../../palettes/vega/viridis.js';
import {VENDOR} from '../../registry.js';
import docsPalette from '../docs-palette.js';

const VENDORS: Array<{
  name: string;
  docs: Record<string, string[]>;
  names: Record<string, string>;
}> = [
  {
    name: VENDOR.BOKEH,
    docs: BOKEH_DOCS_PALETTE_DATA,
    names: BOKEH_PALETTE_NAMES
  },
  {
    name: VENDOR.VEGA,
    docs: VEGA_DOCS_PALETTE_DATA,
    names: VEGA_PALETTE_NAMES
  },
  {
    name: VENDOR.D3,
    docs: D3_DOCS_PALETTE_DATA,
    names: D3_PALETTE_NAMES
  }
];

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

describe('docsPalette per-palette data', () => {
  test('Should match the registry data for every palette', () => {
    for (const {name, docs, names} of VENDORS) {
      for (const [constant, paletteName] of Object.entries(names)) {
        expect(docs[paletteName], `${name}: ${constant}`).toEqual(
          docsPalette(paletteName)
        );
      }
    }
  });

  test('Should match the registry data for viridis per-palette modules', () => {
    expect(BOKEH_VIRIDIS_DOCS_PALETTE_DATA).toEqual(docsPalette(BOKEH_VIRIDIS));
    expect(VEGA_VIRIDIS_DOCS_PALETTE_DATA).toEqual(docsPalette(VEGA_VIRIDIS));
    expect(D3_VIRIDIS_DOCS_PALETTE_DATA).toEqual(docsPalette(D3_VIRIDIS));
  });
});
