import {describe, expect, test} from 'vitest';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES
} from '../palettes/bokeh/index.js';
import {D3_PALETTE_DATA, D3_PALETTE_NAMES} from '../palettes/d3/index.js';
import {
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../palettes/vega/index.js';
import {VENDOR} from '../registry.js';
import parsePaletteName from '../utils/parse-palette-name.js';

const HEX_COLOR = /^#[0-9a-f]{6}$/;

const VENDORS: Array<{
  name: string;
  data: Record<string, Record<number, string[]>>;
  names: Record<string, string>;
}> = [
  {
    name: VENDOR.BOKEH,
    data: BOKEH_PALETTE_DATA,
    names: BOKEH_PALETTE_NAMES
  },
  {
    name: VENDOR.VEGA,
    data: VEGA_PALETTE_DATA,
    names: VEGA_PALETTE_NAMES
  },
  {
    name: VENDOR.D3,
    data: D3_PALETTE_DATA,
    names: D3_PALETTE_NAMES
  }
];

describe('palettes', () => {
  test('Should have a constant for every discrete palette', () => {
    for (const {name, data, names} of VENDORS) {
      const constants = Object.values(names).sort();

      expect(constants, name).toEqual(Object.keys(data).sort());
    }
  });

  test('Should have data and a parsable name for every constant', () => {
    for (const {name: vendor, data, names} of VENDORS) {
      expect(Object.keys(names).length, vendor).toBeGreaterThan(0);

      for (const [constant, paletteName] of Object.entries(names)) {
        expect(paletteName.startsWith(`${vendor}_`), constant).toBe(true);
        expect(data[paletteName], constant).toBeDefined();
        expect(parsePaletteName(paletteName), constant).toEqual({
          vendor,
          palette: paletteName.substring(vendor.length + 1)
        });
      }
    }
  });

  test('Should not have empty discrete palettes', () => {
    for (const {name, data} of VENDORS) {
      for (const [paletteName, palette] of Object.entries(data)) {
        expect(
          Object.keys(palette).length,
          `${name}: ${paletteName}`
        ).toBeGreaterThan(0);

        for (const colors of Object.values(palette)) {
          expect(colors.length, `${name}: ${paletteName}`).toBeGreaterThan(0);
        }
      }
    }
  });

  test('Should only use integer sizes from 1 to 256', () => {
    for (const {name, data} of VENDORS) {
      for (const [paletteName, palette] of Object.entries(data)) {
        for (const size of Object.keys(palette)) {
          const n = Number(size);

          expect(Number.isInteger(n), `${name}: ${paletteName}: ${size}`).toBe(
            true
          );
          expect(n, `${name}: ${paletteName}: ${size}`).toBeGreaterThan(0);
          expect(n, `${name}: ${paletteName}: ${size}`).toBeLessThanOrEqual(
            256
          );
        }
      }
    }
  });

  test('Should have as many colors as the size declares', () => {
    for (const {name, data} of VENDORS) {
      for (const [paletteName, palette] of Object.entries(data)) {
        for (const [size, colors] of Object.entries(palette)) {
          expect(colors, `${name}: ${paletteName}: ${size}`).toHaveLength(
            Number(size)
          );
        }
      }
    }
  });

  test('Should have contiguous sizes below the continuous 256-color palette', () => {
    for (const {name, data} of VENDORS) {
      for (const [paletteName, palette] of Object.entries(data)) {
        const sizes = Object.keys(palette)
          .map(Number)
          .sort((a, b) => a - b)
          .filter((size) => size !== 256);

        const expectedSizes = Array.from(
          {length: sizes.length},
          (_, index) => sizes[0] + index
        );

        expect(sizes, `${name}: ${paletteName}`).toEqual(expectedSizes);
      }
    }
  });

  test('Should use valid hexadecimal colors in every palette', () => {
    for (const {name, data} of VENDORS) {
      for (const [paletteName, palette] of Object.entries(data)) {
        for (const [size, colors] of Object.entries(palette)) {
          for (const color of colors) {
            expect(color, `${name}: ${paletteName}: ${size}`).toMatch(
              HEX_COLOR
            );
          }
        }
      }
    }
  });

  test('Should parse every discrete palette name', () => {
    for (const {name: vendor, data} of VENDORS) {
      for (const paletteName of Object.keys(data)) {
        expect(parsePaletteName(paletteName), paletteName).toEqual({
          vendor,
          palette: paletteName.substring(vendor.length + 1)
        });
      }
    }
  });
});
