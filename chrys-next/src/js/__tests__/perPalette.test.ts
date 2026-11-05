import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {describe, expect, test} from 'vitest';
import {discretePalette, docsPalette, VEGA_VIRIDIS} from '..';
import {
  VEGA_VIRIDIS_DOCS_PALETTE_DATA,
  VEGA_VIRIDIS_PALETTE_DATA
} from '../palettes/vega/viridis.js';
import {toDiscretePalette} from '../toDiscretePalette.js';

describe('per-palette imports', () => {
  test('Should match the registry data', () => {
    expect(toDiscretePalette(VEGA_VIRIDIS_PALETTE_DATA, 6)).toEqual(
      discretePalette(VEGA_VIRIDIS, 6)
    );
    expect(VEGA_VIRIDIS_DOCS_PALETTE_DATA).toEqual(docsPalette(VEGA_VIRIDIS));
  });

  test('Should be self-contained', () => {
    const source = readFileSync(
      fileURLToPath(new URL('../palettes/vega/viridis.js', import.meta.url)),
      'utf8'
    );

    expect(source).not.toContain("from '");
    expect(source.length).toBeLessThan(10_000);
  });
});
