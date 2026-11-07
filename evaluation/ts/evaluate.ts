/**
 * TypeScript/JavaScript evaluation harness.
 *
 * Runs chroma-js, apca-w3 and color.js against the shared corpus. The harness
 * records both the "current" call order used by the library (background passed
 * as the APCA text color) and the "corrected" order (foreground as text).
 *
 * Build and run from the repository root:
 *
 *   ./node_modules/.bin/esbuild evaluation/ts/evaluate.ts \
 *     --bundle --packages=external --format=esm --platform=node \
 *     --target=node22 --outfile=evaluation/results/evaluate.mjs
 *   node evaluation/results/evaluate.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import chroma from 'chroma-js';
import {calcAPCA} from 'apca-w3';
import Color from 'colorjs.io';

import bestColorContrast from '../../src/js/utils/best-color-contrast.ts';

type Algorithm = 'apca' | 'wcag';
type Variant = 'current' | 'corrected';
type PackageName = 'chroma' | 'apca-w3' | 'colorjs';

interface Pair {
  id: string;
  group: string;
  source: string;
  text: string;
  bg: string;
}

interface BestCase {
  id: string;
  group: string;
  bg: string;
  fg: string[];
}

interface Cases {
  meta: {
    tolerances: {apca: number; wcag: number};
  };
  pairs: Pair[];
  best_cases: BestCase[];
  alpha_pairs: Pair[];
}

interface ScoreRecord {
  case_id: string;
  package: PackageName;
  algorithm: Algorithm;
  variant: Variant;
  value: number;
}

interface ChoiceRecord {
  case_id: string;
  package: PackageName;
  algorithm: Algorithm;
  variant: Variant;
  value: number;
}

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const resultsDir = path.join(root, 'evaluation/results');
const cases = JSON.parse(
  fs.readFileSync(path.join(root, 'evaluation/cases.json'), 'utf8')
) as Cases;

const COMBOS: Array<{package: PackageName; algorithm: Algorithm}> = [
  {package: 'chroma', algorithm: 'apca'},
  {package: 'chroma', algorithm: 'wcag'},
  {package: 'apca-w3', algorithm: 'apca'},
  {package: 'colorjs', algorithm: 'apca'},
  {package: 'colorjs', algorithm: 'wcag'}
];

const VARIANTS: Variant[] = ['current', 'corrected'];

/**
 * Score a text color against a background color in the package's native order.
 * Every adapter exposes the same `(text, bg)` contract.
 */
function rawScore(
  packageName: PackageName,
  algorithm: Algorithm,
  text: string,
  bg: string
): number | null {
  switch (packageName) {
    case 'chroma':
      return algorithm === 'apca'
        ? chroma.contrastAPCA(text, bg)
        : chroma.contrast(text, bg);
    case 'apca-w3':
      return algorithm === 'apca' ? calcAPCA(text, bg) : null;
    case 'colorjs':
      return algorithm === 'apca'
        ? Color.contrastAPCA(bg, text)
        : Color.contrastWCAG21(text, bg);
  }
}

/**
 * Score a foreground candidate against a background.
 *
 * - `current` mirrors the library: the background is passed as the APCA text
 *   color and the candidate as the APCA background.
 * - `corrected` passes the candidate as text and the background as background.
 */
function score(
  packageName: PackageName,
  algorithm: Algorithm,
  variant: Variant,
  bg: string,
  fg: string
): number | null {
  return variant === 'current'
    ? rawScore(packageName, algorithm, bg, fg)
    : rawScore(packageName, algorithm, fg, bg);
}

/** Return the index of the candidate with the highest absolute score. */
function bestIndex(
  packageName: PackageName,
  algorithm: Algorithm,
  variant: Variant,
  bg: string,
  fgColors: string[]
): number {
  let best = 0;
  let bestScore = Math.abs(
    score(packageName, algorithm, variant, bg, fgColors[0]) as number
  );

  for (let index = 1; index < fgColors.length; index += 1) {
    const candidate = Math.abs(
      score(packageName, algorithm, variant, bg, fgColors[index]) as number
    );
    if (candidate > bestScore) {
      best = index;
      bestScore = candidate;
    }
  }

  return best;
}

const scores: ScoreRecord[] = [];
const choices: ChoiceRecord[] = [];

for (const pair of [...cases.pairs, ...cases.alpha_pairs]) {
  for (const {package: packageName, algorithm} of COMBOS) {
    for (const variant of VARIANTS) {
      const value = score(packageName, algorithm, variant, pair.bg, pair.text);
      if (value === null || !Number.isFinite(value)) {
        continue;
      }
      scores.push({
        case_id: pair.id,
        package: packageName,
        algorithm,
        variant,
        value
      });
    }
  }
}

for (const bestCase of cases.best_cases) {
  for (const {package: packageName, algorithm} of COMBOS) {
    for (const variant of VARIANTS) {
      choices.push({
        case_id: bestCase.id,
        package: packageName,
        algorithm,
        variant,
        value: bestIndex(
          packageName,
          algorithm,
          variant,
          bestCase.bg,
          bestCase.fg
        )
      });
    }
  }
}

// Sanity check: the harness "current" variant should reproduce the library
// function exactly. The library falls back to WCAG for unknown algorithms; we
// only compare the two known algorithms here.
let sanityChecked = 0;
let sanityMismatches = 0;
const sanityExamples: Array<Record<string, unknown>> = [];
const sanitySample = cases.best_cases.filter(
  (_bestCase, index) => index % 50 === 0 || _bestCase.group === 'edge'
);
for (const bestCase of sanitySample) {
  for (const algorithm of ['apca', 'wcag'] as Algorithm[]) {
    const expected =
      algorithm === 'apca'
        ? bestColorContrast(bestCase.bg, bestCase.fg)
        : bestColorContrast(bestCase.bg, bestCase.fg, 'wcag');
    const actual =
      bestCase.fg[
        bestIndex('chroma', algorithm, 'corrected', bestCase.bg, bestCase.fg)
      ];
    sanityChecked += 1;
    if (expected !== actual) {
      sanityMismatches += 1;
      if (sanityExamples.length < 5) {
        sanityExamples.push({
          case_id: bestCase.id,
          algorithm,
          expected,
          actual
        });
      }
    }
  }
}

fs.mkdirSync(resultsDir, {recursive: true});
fs.writeFileSync(
  path.join(resultsDir, 'ts.json'),
  JSON.stringify(
    {
      env: 'ts',
      generated_by: 'evaluation/ts/evaluate.ts',
      scores,
      choices,
      sanity: {
        checked: sanityChecked,
        mismatches: sanityMismatches,
        examples: sanityExamples
      }
    },
    null,
    2
  ) + '\n',
  'utf8'
);

console.log(
  `Wrote evaluation/results/ts.json: ${scores.length} scores, ` +
    `${choices.length} choices, sanity ${sanityMismatches}/${sanityChecked} mismatches`
);
