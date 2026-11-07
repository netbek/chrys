/**
 * Sass evaluation harness.
 *
 * Reads the shared corpus, generates a batch of Sass `@debug` calls, compiles
 * them with sass-embedded, and writes the parsed scores and choices.
 *
 * Run from the repository root:
 *
 *   node evaluation/sass/run_sass.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import * as sass from 'sass-embedded';

import {config} from '../../config/index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const resultsDir = path.join(root, 'evaluation/results');
const cases = JSON.parse(
  fs.readFileSync(path.join(root, 'evaluation/cases.json'), 'utf8')
);

const COMBOS = [
  {package: 'sass-apca', algorithm: 'apca'},
  {package: 'sass-wcag', algorithm: 'wcag'}
];

const VARIANTS = ['current', 'corrected'];
const DEBUG_PER_CHUNK = 4000;

const scores = [];
const choices = [];

function pairJobs(pair) {
  const jobs = [];
  for (const {package: packageName, algorithm} of COMBOS) {
    for (const variant of VARIANTS) {
      if (algorithm === 'apca') {
        const value =
          variant === 'current'
            ? `apca.contrast(${pair.bg}, ${pair.text})`
            : `apca.contrast(${pair.text}, ${pair.bg})`;
        jobs.push(
          `score|${pair.id}|${packageName}|apca|${variant}|#{${value}}`
        );
      } else {
        // WCAG is symmetric, so current and corrected are identical.
        jobs.push(
          `score|${pair.id}|${packageName}|wcag|${variant}|` +
            `#{wcag.contrast(${pair.text}, ${pair.bg})}`
        );
      }
    }
  }
  return jobs;
}

function bestJobs(bestCase) {
  const jobs = [];
  const fg = `(${bestCase.fg.join(', ')})`;
  for (const {package: packageName, algorithm} of COMBOS) {
    for (const variant of VARIANTS) {
      jobs.push(
        `choice|${bestCase.id}|${packageName}|${algorithm}|${variant}|` +
          `#{best.best-index(${bestCase.bg}, ${fg}, '${algorithm}', '${variant}')}`
      );
    }
  }
  return jobs;
}

const jobs = [];
for (const pair of [...cases.pairs, ...cases.alpha_pairs]) {
  jobs.push(...pairJobs(pair));
}
for (const bestCase of cases.best_cases) {
  jobs.push(...bestJobs(bestCase));
}

// Sanity check the prototype "current" variant against the actual library
// function in src/css/_functions.scss.
cases.best_cases.forEach((bestCase, index) => {
  if (index % 50 !== 0 && bestCase.group !== 'edge') {
    return;
  }
  const fg = `(${bestCase.fg.join(', ')})`;
  jobs.push(
    `sanity|${bestCase.id}|` +
      `#{_index-of(${fg}, library.best-color-contrast(${bestCase.bg}, ${fg}))}|` +
      `#{best.best-index(${bestCase.bg}, ${fg}, 'apca', 'corrected')}`
  );
});

const header = [
  "@use 'sass:list';",
  "@use 'sass:math';",
  "@use 'node_modules/sass-apca/apca';",
  "@use 'wcag';",
  "@use 'best';",
  "@use 'src/css/functions' as library;",
  '',
  '@function _index-of($list, $value) {',
  '  @for $index from 1 through list.length($list) {',
  '    @if list.nth($list, $index) == $value {',
  '      @return $index - 1;',
  '    }',
  '  }',
  '  @return -1;',
  '}'
].join('\n');

let sanityChecked = 0;
let sanityMismatches = 0;
const sanityExamples = [];

for (let start = 0; start < jobs.length; start += DEBUG_PER_CHUNK) {
  const chunk = jobs.slice(start, start + DEBUG_PER_CHUNK);
  const source = `${header}\n${chunk
    .map((job) => `@debug "${job}";`)
    .join('\n')}\n`;

  const messages = [];
  sass.compileString(source, {
    loadPaths: [root, here],
    silenceDeprecations: config.sass.silenceDeprecations,
    logger: {
      debug(message) {
        messages.push(message);
      },
      warn() {
        // Ignore deprecation warnings; the evaluation only cares about values.
      }
    }
  });

  for (const message of messages) {
    const parts = message.split('|');
    const kind = parts[0];
    if (kind === 'score') {
      const [, caseId, packageName, algorithm, variant, value] = parts;
      scores.push({
        case_id: caseId,
        package: packageName,
        algorithm,
        variant,
        value: Number(value)
      });
    } else if (kind === 'choice') {
      const [, caseId, packageName, algorithm, variant, value] = parts;
      choices.push({
        case_id: caseId,
        package: packageName,
        algorithm,
        variant,
        value: Number(value)
      });
    } else if (kind === 'sanity') {
      const [, caseId, libraryIndex, harnessIndex] = parts;
      sanityChecked += 1;
      if (libraryIndex !== harnessIndex) {
        sanityMismatches += 1;
        if (sanityExamples.length < 5) {
          sanityExamples.push({
            case_id: caseId,
            library: Number(libraryIndex),
            harness: Number(harnessIndex)
          });
        }
      }
    }
  }
}

fs.mkdirSync(resultsDir, {recursive: true});
fs.writeFileSync(
  path.join(resultsDir, 'sass.json'),
  JSON.stringify(
    {
      env: 'sass',
      generated_by: 'evaluation/sass/run_sass.mjs',
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
  `Wrote evaluation/results/sass.json: ${scores.length} scores, ${choices.length} choices`
);
