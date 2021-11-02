#! /bin/bash

# Disable imported modules that currently do not work with Node 14 nor the `esm` package (`node -r esm`)
sed -i 's/^import/\/\/ import/g' node_modules/@bokeh/bokehjs/build/js/lib/api/palettes.js
