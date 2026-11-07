import {contrast, contrastAPCA} from 'chroma-js';
import type {HexColor, HexColors} from '../types.ts';

const ALGORITHM = {
  APCA: 'apca',
  WCAG: 'wcag'
};

/**
 * Selects the foreground color with the highest contrast against a
 * background color.
 *
 * @param bgColor Background color.
 * @param fgColors Candidate foreground colors.
 * @param algorithm Contrast algorithm to use (`apca` or `wcag`).
 * @returns The foreground color with the highest contrast.
 */
export default function bestColorContrast(
  bgColor: HexColor,
  fgColors: HexColors,
  algorithm = ALGORITHM.APCA
): HexColor {
  if (fgColors.length === 0) {
    throw new Error('At least one foreground color is required.');
  }

  let fn;

  if (algorithm === ALGORITHM.APCA) {
    fn = contrastAPCA;
  } else {
    fn = contrast;
  }

  const scores = fgColors.map((fgColor): number =>
    Math.abs(fn(bgColor, fgColor))
  );
  const maxScore = Math.max(...scores);
  const maxScoreIndex = scores.indexOf(maxScore);

  return fgColors[maxScoreIndex];
}
