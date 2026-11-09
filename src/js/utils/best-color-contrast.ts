import {APCAcontrast, sRGBtoY} from 'apca-w3';
import {parseColor} from './parse-color.ts';
import type {Color, Colors} from '../types.ts';

/**
 * Selects the foreground color with the highest APCA contrast against a
 * background color.
 *
 * Accepts hexadecimal colors and absolute rgb()/rgba() colors. Alpha is
 * ignored. APCA is polarity-sensitive: each foreground is scored as the text
 * color and the background as the background color. Absolute scores are
 * compared so a foreground is never penalised for being lighter or darker;
 * only the magnitude of the contrast matters.
 *
 * @param bgColor Background color.
 * @param fgColors Candidate foreground colors.
 * @returns The foreground color with the highest contrast.
 * @throws {Error} When a color is invalid.
 */
export default function bestColorContrast(
  bgColor: Color,
  fgColors: Colors
): Color {
  if (fgColors.length === 0) {
    throw new Error('At least one foreground color is required.');
  }

  const bgY = sRGBtoY(parseColor(bgColor));

  let bestIndex = 0;
  let bestScore = -1;

  for (let index = 0; index < fgColors.length; index += 1) {
    const fgY = sRGBtoY(parseColor(fgColors[index]));
    const score = Math.abs(Number(APCAcontrast(fgY, bgY)));

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return fgColors[bestIndex];
}
