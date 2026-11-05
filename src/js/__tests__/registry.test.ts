import {describe, expect, test} from 'vitest';
import {
  BOKEH_DOCS_PALETTE_DATA,
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES,
  CATEGORICAL_PALETTE_VENDORS,
  CYCLICAL_PALETTE_VENDORS,
  D3_DOCS_PALETTE_DATA,
  D3_PALETTE_DATA,
  D3_PALETTE_NAMES,
  DIVERGING_PALETTE_VENDORS,
  parsePaletteName,
  SEQUENTIAL_PALETTE_VENDORS,
  VEGA_DOCS_PALETTE_DATA,
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES,
  VENDOR
} from '..';

type Vendor = (typeof VENDOR)[keyof typeof VENDOR];

const VENDORS = Object.values(VENDOR) as Vendor[];

const PALETTE_DATA: Record<Vendor, Record<string, Record<number, string[]>>> = {
  [VENDOR.BOKEH]: BOKEH_PALETTE_DATA,
  [VENDOR.VEGA]: VEGA_PALETTE_DATA,
  [VENDOR.D3]: D3_PALETTE_DATA
};

const DOCS_PALETTE_DATA: Record<Vendor, Record<string, string[]>> = {
  [VENDOR.BOKEH]: BOKEH_DOCS_PALETTE_DATA,
  [VENDOR.VEGA]: VEGA_DOCS_PALETTE_DATA,
  [VENDOR.D3]: D3_DOCS_PALETTE_DATA
};

const PALETTE_NAMES: Record<Vendor, Record<string, string>> = {
  [VENDOR.BOKEH]: BOKEH_PALETTE_NAMES,
  [VENDOR.VEGA]: VEGA_PALETTE_NAMES,
  [VENDOR.D3]: D3_PALETTE_NAMES
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

  test('Should have discrete and documentation data for every grouped palette', () => {
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
          expect(
            DOCS_PALETTE_DATA[vendor][paletteName],
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

  test('Should have data, documentation, and a parsable name for every constant', () => {
    for (const vendor of VENDORS) {
      const names = PALETTE_NAMES[vendor];

      expect(Object.keys(names).length).toBeGreaterThan(0);

      for (const [constant, paletteName] of Object.entries(names)) {
        expect(paletteName.startsWith(`${vendor}_`), constant).toBe(true);
        expect(PALETTE_DATA[vendor][paletteName], constant).toBeDefined();
        expect(DOCS_PALETTE_DATA[vendor][paletteName], constant).toBeDefined();
        expect(parsePaletteName(paletteName), constant).toEqual({
          vendor,
          palette: paletteName.substring(vendor.length + 1)
        });
      }
    }
  });
});
