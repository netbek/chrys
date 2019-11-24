import chroma from 'chroma-js';
import {passesAA} from './passesAA';
import {passesAAA} from './passesAAA';

function scoreContrast(a, b, large, AAA) {
  const contrast = chroma.contrast(a, b); // Between 1 and 21

  return (
    contrast +
    Number(AAA && passesAAA(contrast, large)) * 100 +
    Number(!AAA && passesAA(contrast, large)) * 100
  );
}

export function bestColorContrast(
  bgColor,
  fgColors,
  large = false,
  AAA = false
) {
  const scores = fgColors.map(fgColor =>
    scoreContrast(bgColor, fgColor, large, AAA)
  );

  return fgColors[scores.indexOf(Math.max(...scores))];
}
