import {APCAcontrast, sRGBtoY} from 'apca-w3';
import type {HexColor, HexColors} from '../types.ts';

/** Matches #rgb, #rgba, #rrggbb, and #rrggbbaa. */
const HEX_COLOR = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/**
 * Parses a hexadecimal color into its 8-bit sRGB channels.
 *
 * @throws {Error} When the color is not a valid hexadecimal color.
 */
function parseHexColor(color: HexColor): [number, number, number] {
  if (!HEX_COLOR.test(color)) {
    throw new Error(`Color "${color}": unknown format.`);
  }

  let hex = color.slice(1);

  if (hex.length <= 4) {
    hex = hex
      .split('')
      .map((digit) => digit + digit)
      .join('');
  }

  return [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16)
  ];
}

/**
 * Selects the foreground color with the highest APCA contrast against a
 * background color.
 *
 * APCA is polarity-sensitive: each foreground is scored as the text color and
 * the background as the background color. Absolute scores are compared so a
 * foreground is never penalised for being lighter or darker; only the
 * magnitude of the contrast matters.
 *
 * @param bgColor Background color.
 * @param fgColors Candidate foreground colors.
 * @returns The foreground color with the highest contrast.
 * @throws {Error} When a color is invalid.
 */
export default function bestColorContrast(
  bgColor: HexColor,
  fgColors: HexColors
): HexColor {
  if (fgColors.length === 0) {
    throw new Error('At least one foreground color is required.');
  }

  const bgY = sRGBtoY(parseHexColor(bgColor));

  let bestIndex = 0;
  let bestScore = -1;

  for (let index = 0; index < fgColors.length; index += 1) {
    const fgY = sRGBtoY(parseHexColor(fgColors[index]));
    const score = Math.abs(Number(APCAcontrast(fgY, bgY)));

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return fgColors[bestIndex];
}
