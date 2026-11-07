import {describe, expect, test} from 'vitest';
import {BOKEH_PALETTE_DATA} from '../palettes/bokeh/index.js';
import {D3_PALETTE_DATA} from '../palettes/d3/index.js';
import {VEGA_PALETTE_DATA} from '../palettes/vega/index.js';
import {
  CATEGORICAL_PALETTE_VENDORS,
  CYCLICAL_PALETTE_VENDORS,
  DIVERGING_PALETTE_VENDORS,
  SEQUENTIAL_PALETTE_VENDORS,
  VENDOR
} from '../registry.js';
import type {Vendor} from '../types.js';
import parsePaletteName from '../utils/parse-palette-name.js';

const VENDORS = Object.values(VENDOR) as Vendor[];

const PALETTE_DATA: Record<Vendor, Record<string, Record<number, string[]>>> = {
  [VENDOR.BOKEH]: BOKEH_PALETTE_DATA,
  [VENDOR.VEGA]: VEGA_PALETTE_DATA,
  [VENDOR.D3]: D3_PALETTE_DATA
};

const PALETTE_GROUPS: Array<{
  name: string;
  mappings: Array<Record<Vendor, string | undefined>>;
}> = [
  {
    name: 'categorical',
    mappings: CATEGORICAL_PALETTE_VENDORS
  },
  {
    name: 'diverging',
    mappings: DIVERGING_PALETTE_VENDORS
  },
  {
    name: 'sequential',
    mappings: SEQUENTIAL_PALETTE_VENDORS
  },
  {
    name: 'cyclical',
    mappings: CYCLICAL_PALETTE_VENDORS
  }
];

describe('registry', () => {
  test('Should not contain duplicate palette names within a group', () => {
    for (const {name, mappings} of PALETTE_GROUPS) {
      const seen = new Set<string>();

      for (const mapping of mappings) {
        for (const vendor of VENDORS) {
          const paletteName = mapping[vendor];

          if (!paletteName) {
            continue;
          }

          expect(seen.has(paletteName), `${name}: ${paletteName}`).toBe(false);
          seen.add(paletteName);
        }
      }
    }
  });

  test('Should have discrete data for every grouped palette', () => {
    for (const {name, mappings} of PALETTE_GROUPS) {
      for (const mapping of mappings) {
        for (const vendor of VENDORS) {
          const paletteName = mapping[vendor];

          if (!paletteName) {
            continue;
          }

          expect(
            PALETTE_DATA[vendor][paletteName],
            `${name}: ${paletteName}`
          ).toBeDefined();
        }
      }
    }
  });

  test('Should parse every grouped palette name to its vendor', () => {
    for (const {name, mappings} of PALETTE_GROUPS) {
      for (const mapping of mappings) {
        for (const vendor of VENDORS) {
          const paletteName = mapping[vendor];

          if (!paletteName) {
            continue;
          }

          expect(
            parsePaletteName(paletteName),
            `${name}: ${paletteName}`
          ).toEqual({
            vendor,
            palette: paletteName.substring(vendor.length + 1)
          });
        }
      }
    }
  });
});
