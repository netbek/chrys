# Best color contrast package evaluation

This directory contains a reproducible comparison of the packages that could
back `best-color-contrast` in Sass, TypeScript/JavaScript and Python.

The harness does **not** change the library. It computes the existing call
order ("current") and the corrected APCA call order ("corrected") side by side,
then compares every package with a canonical oracle.

## What is compared

| Environment | Packages |
|---|---|
| TypeScript/JavaScript | chroma-js 3.2.0, apca-w3 0.1.9, color.js 0.7.1 |
| Python | `chrys.chroma_js` port, coloraide 8.13.1 |
| Sass | sass-apca 1.2.0, prototype CSS Color 4 WCAG function |

The corrected APCA variant is evaluated with the text color first and the
background color second. WCAG is symmetric. The "current" variant reproduces
the library's existing `(bg, fg)` APCA call; the "corrected" variant uses
`(fg, bg)`.

## Corpus

`cases.json` is generated deterministically and read by every harness:

- canonical vectors from the upstream test suites;
- seeded random opaque pairs;
- edge cases;
- every unique palette color as a background with white/black candidates;
- grey and mixed foreground sets;
- an optional alpha appendix.

Alpha is reported separately and is not part of the acceptance gate.

## Run

From the repository root:

```sh
./evaluation/run.sh
```

Or step by step:

```sh
uv run python evaluation/build_cases.py

./node_modules/.bin/esbuild evaluation/ts/evaluate.ts \
  --bundle --packages=external --format=esm --platform=node \
  --target=node22 --outfile=evaluation/results/evaluate.mjs
node evaluation/results/evaluate.mjs

uv run python evaluation/py/evaluate.py
node evaluation/sass/run_sass.mjs
uv run python evaluation/compare.py
```

Outputs:

- `evaluation/results/ts.json`
- `evaluation/results/py.json`
- `evaluation/results/sass.json`
- `evaluation/results/summary.json`
- `evaluation/REPORT.md`

## Acceptance

The thresholds are stored in `cases.json`:

- APCA: absolute Lc difference ≤ `0.01`;
- WCAG: absolute ratio difference ≤ `0.001`;
- chosen foreground color: exact match with the oracle (ties use the first
  candidate, matching the library).

`apca-w3` is the APCA oracle. `coloraide` is the WCAG oracle.
