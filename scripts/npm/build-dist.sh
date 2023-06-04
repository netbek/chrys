#! /bin/bash
set -e

# Required by Webpack 4+ on Node 17+ https://github.com/webpack/webpack/issues/14532
export NODE_OPTIONS=--openssl-legacy-provider

node -r esm scripts/clean.js
node -r esm scripts/build-js.js
node -r esm scripts/build-css.js
node -r esm scripts/build-illustrator.js
node -r esm scripts/build-demo.js
rm -fr build
rm -fr dist
python3.8 setup.py sdist bdist_wheel --universal
twine check dist/*
