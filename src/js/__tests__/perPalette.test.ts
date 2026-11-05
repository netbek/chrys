import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {describe, expect, test} from 'vitest';
import * as chrys from '..';
import {
  BOKEH_VIRIDIS_DOCS_PALETTE_DATA,
  BOKEH_VIRIDIS_PALETTE_DATA
} from '../palettes/bokeh/viridis.js';
import {
  D3_VIRIDIS_DOCS_PALETTE_DATA,
  D3_VIRIDIS_PALETTE_DATA
} from '../palettes/d3/viridis.js';
import {
  VEGA_VIRIDIS_DOCS_PALETTE_DATA,
  VEGA_VIRIDIS_PALETTE_DATA
} from '../palettes/vega/viridis.js';
import {toDiscretePalette} from '../toDiscretePalette.js';

const VENDORS: Array<{
  name: string;
  data: Record<string, Record<number, string[]>>;
  docs: Record<string, string[]>;
  names: Record<string, string>;
}> = [
  {
    name: 'bokeh',
    data: chrys.BOKEH_PALETTE_DATA,
    docs: chrys.BOKEH_DOCS_PALETTE_DATA,
    names: chrys.BOKEH_PALETTE_NAMES
  },
  {
    name: 'vega',
    data: chrys.VEGA_PALETTE_DATA,
    docs: chrys.VEGA_DOCS_PALETTE_DATA,
    names: chrys.VEGA_PALETTE_NAMES
  },
  {
    name: 'd3',
    data: chrys.D3_PALETTE_DATA,
    docs: chrys.D3_DOCS_PALETTE_DATA,
    names: chrys.D3_PALETTE_NAMES
  }
];

describe('per-palette imports', () => {
  test('Should match the registry data for every palette', () => {
    for (const {name, data, docs, names} of VENDORS) {
      for (const [constant, paletteName] of Object.entries(names)) {
        expect(
          toDiscretePalette(data[paletteName], 6),
          `${name}: ${constant}`
        ).toEqual(chrys.discretePalette(paletteName, 6));
        expect(docs[paletteName], `${name}: ${constant}`).toEqual(
          chrys.docsPalette(paletteName)
        );
      }
    }
  });

  test('Should match the registry data for viridis per-palette modules', () => {
    expect(toDiscretePalette(BOKEH_VIRIDIS_PALETTE_DATA, 6)).toEqual(
      chrys.discretePalette(chrys.BOKEH_VIRIDIS, 6)
    );
    expect(BOKEH_VIRIDIS_DOCS_PALETTE_DATA).toEqual(
      chrys.docsPalette(chrys.BOKEH_VIRIDIS)
    );

    expect(toDiscretePalette(VEGA_VIRIDIS_PALETTE_DATA, 6)).toEqual(
      chrys.discretePalette(chrys.VEGA_VIRIDIS, 6)
    );
    expect(VEGA_VIRIDIS_DOCS_PALETTE_DATA).toEqual(
      chrys.docsPalette(chrys.VEGA_VIRIDIS)
    );

    expect(toDiscretePalette(D3_VIRIDIS_PALETTE_DATA, 6)).toEqual(
      chrys.discretePalette(chrys.D3_VIRIDIS, 6)
    );
    expect(D3_VIRIDIS_DOCS_PALETTE_DATA).toEqual(
      chrys.docsPalette(chrys.D3_VIRIDIS)
    );
  });

  test('Should be self-contained', () => {
    const files = [
      '../palettes/bokeh/viridis.js',
      '../palettes/vega/viridis.js',
      '../palettes/d3/viridis.js'
    ];

    for (const file of files) {
      const source = readFileSync(
        fileURLToPath(new URL(file, import.meta.url)),
        'utf8'
      );

      expect(source, file).not.toContain("from '");
      expect(source.length, file).toBeLessThan(10_000);
    }
  });
});
