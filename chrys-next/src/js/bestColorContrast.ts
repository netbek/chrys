import chroma from 'chroma-js';

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
export function bestColorContrast(
  bgColor: string,
  fgColors: string[],
  algorithm = ALGORITHM.APCA
): string {
  let fn;

  if (algorithm === ALGORITHM.APCA) {
    fn = chroma.contrastAPCA;
  } else {
    fn = chroma.contrast;
  }

  const scores = fgColors.map((fgColor): number =>
    Math.abs(fn(bgColor, fgColor))
  );
  const maxScore = Math.max(...scores);
  const maxScoreIndex = scores.indexOf(maxScore);

  return fgColors[maxScoreIndex];
}
