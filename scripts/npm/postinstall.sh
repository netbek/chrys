#! /bin/bash

# Disable imported modules that currently do not work with Node 14 nor the `esm` package (`node -r esm`)
# We check whether the file exists because `@bokeh/bokehjs` might not be installed by the parent package.
FILE='node_modules/@bokeh/bokehjs/build/js/lib/api/palettes.js'
if [ -f "$FILE" ]; then
  sed -i 's/^import/\/\/ import/g' "$FILE"
fi
