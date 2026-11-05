import {describe, expect, test} from 'vitest';
import {BOKEH_PALETTE_NAMES, D3_PALETTE_NAMES, VEGA_PALETTE_NAMES} from '..';

const paletteNameMaps = [
  ['BOKEH', BOKEH_PALETTE_NAMES],
  ['VEGA', VEGA_PALETTE_NAMES],
  ['D3', D3_PALETTE_NAMES]
] as const;

describe('palette name maps', () => {
  test('Should map upper snake case variable names', () => {
    for (const [prefix, names] of paletteNameMaps) {
      for (const variable of Object.keys(names)) {
        expect(variable).toMatch(new RegExp(`^${prefix}_[A-Z0-9_]+$`));
      }
    }
  });

  test('Should map constant names to palette names', () => {
    expect(BOKEH_PALETTE_NAMES.BOKEH_BROWN_BLUE_GREEN).toBe('bokeh_BrBG');
    expect(VEGA_PALETTE_NAMES.VEGA_BROWN_BLUE_GREEN).toBe(
      'vega_brownbluegreen'
    );
    expect(D3_PALETTE_NAMES.D3_BROWN_BLUE_GREEN).toBe('d3_brownbluegreen');
  });
});
