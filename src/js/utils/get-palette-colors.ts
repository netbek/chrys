import {getPalette} from './get-palette.ts';
import toContinuousColors from './to-continuous-colors.ts';
import toDiscreteColors from './to-discrete-colors.ts';
import type {
  HexColors,
  Palette,
  PaletteMode,
  QualifiedPaletteName
} from '../types.ts';

export const PALETTE_MODE = {
  AUTO: 'auto',
  CONTINUOUS: 'continuous',
  DISCRETE: 'discrete'
} as const;

/**
 * Gets a list of colors from a palette by name.
 *
 * Continuous palettes generate colors from their 256-color ramp; other palettes return
 * discrete colors. `mode` overrides this automatic selection.
 *
 * @param name Qualified palette name.
 * @param n Number of colors to return; must be a non-negative integer. Defaults to all
 *   available colors.
 * @param mode Palette resolution mode (`auto`, `continuous`, or `discrete`).
 * @returns The palette colors.
 * @throws If the vendor or palette name is not found, its data is empty, `n` or `mode`
 *   is invalid, or the palette lacks data for the requested mode.
 */
export default function getPaletteColors(
  name: QualifiedPaletteName,
  n?: number,
  mode: PaletteMode = PALETTE_MODE.AUTO
): HexColors {
  if (
    mode !== PALETTE_MODE.AUTO &&
    mode !== PALETTE_MODE.CONTINUOUS &&
    mode !== PALETTE_MODE.DISCRETE
  ) {
    throw new RangeError(
      `Unknown palette mode "${mode}". Expected one of: auto, continuous, discrete.`
    );
  }

  const palette = getPalette(name);

  if (mode === PALETTE_MODE.CONTINUOUS) {
    const ramp = palette[256];

    if (!ramp) {
      throw new Error(`Palette "${name}" has no continuous data.`);
    }

    return toContinuousColors(ramp, n);
  }

  if (mode === PALETTE_MODE.DISCRETE) {
    const discretePalette: Palette = {};

    for (const [size, colors] of Object.entries(palette)) {
      if (Number(size) !== 256) {
        discretePalette[Number(size)] = colors;
      }
    }

    if (Object.keys(discretePalette).length === 0) {
      throw new Error(`Palette "${name}" has no discrete data.`);
    }

    return toDiscreteColors(discretePalette, n);
  }

  const ramp = palette[256];

  if (ramp) {
    return toContinuousColors(ramp, n);
  }

  return toDiscreteColors(palette, n);
}
