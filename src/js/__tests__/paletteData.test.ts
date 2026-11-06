import {describe, expect, test} from 'vitest';
import {
  BOKEH_DOCS_PALETTE_DATA,
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES,
  D3_DOCS_PALETTE_DATA,
  D3_PALETTE_DATA,
  D3_PALETTE_NAMES,
  parsePaletteName,
  VEGA_DOCS_PALETTE_DATA,
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES,
  VENDOR
} from '..';

const HEX_COLOR = /^#[0-9a-f]{6}$/;

const VENDORS: Array<{
  name: string;
  data: Record<string, Record<number, string[]>>;
  docs: Record<string, string[]>;
  names: Record<string, string>;
}> = [
  {
    name: VENDOR.BOKEH,
    data: BOKEH_PALETTE_DATA,
    docs: BOKEH_DOCS_PALETTE_DATA,
    names: BOKEH_PALETTE_NAMES
  },
  {
    name: VENDOR.VEGA,
    data: VEGA_PALETTE_DATA,
    docs: VEGA_DOCS_PALETTE_DATA,
    names: VEGA_PALETTE_NAMES
  },
  {
    name: VENDOR.D3,
    data: D3_PALETTE_DATA,
    docs: D3_DOCS_PALETTE_DATA,
    names: D3_PALETTE_NAMES
  }
];

describe('palette data', () => {
  test('Should have a constant for every discrete and documentation palette', () => {
    for (const {name, data, docs, names} of VENDORS) {
      const constants = Object.values(names).sort();

      expect(constants, name).toEqual(Object.keys(data).sort());
      expect(constants, name).toEqual(Object.keys(docs).sort());
    }
  });

  test('Should not have empty discrete or documentation palettes', () => {
    for (const {name, data, docs} of VENDORS) {
      for (const [paletteName, palette] of Object.entries(data)) {
        expect(
          Object.keys(palette).length,
          `${name}: ${paletteName}`
        ).toBeGreaterThan(0);

        for (const colors of Object.values(palette)) {
          expect(colors.length, `${name}: ${paletteName}`).toBeGreaterThan(0);
        }
      }

      for (const [paletteName, colors] of Object.entries(docs)) {
        expect(colors.length, `${name}: ${paletteName}`).toBeGreaterThan(0);
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

  test('Should use valid hexadecimal colors in every documentation palette', () => {
    for (const {name, docs} of VENDORS) {
      for (const [paletteName, colors] of Object.entries(docs)) {
        for (const color of colors) {
          expect(color, `${name}: ${paletteName}`).toMatch(HEX_COLOR);
        }
      }
    }
  });

  test('Should parse every discrete and documentation palette name', () => {
    for (const {name: vendor, data, docs} of VENDORS) {
      for (const paletteName of [...Object.keys(data), ...Object.keys(docs)]) {
        expect(parsePaletteName(paletteName), paletteName).toEqual({
          vendor,
          palette: paletteName.substring(vendor.length + 1)
        });
      }
    }
  });
});
