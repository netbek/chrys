#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p evaluation/results

uv run python evaluation/build_cases.py

./node_modules/.bin/esbuild evaluation/ts/evaluate.ts \
  --bundle --packages=external --format=esm --platform=node \
  --target=node22 --outfile=evaluation/results/evaluate.mjs
node evaluation/results/evaluate.mjs

uv run python evaluation/py/evaluate.py
node evaluation/sass/run_sass.mjs
uv run python evaluation/compare.py
