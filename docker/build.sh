#!/bin/bash
set -e

scripts_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root_dir="${scripts_dir}/.."

cd "${root_dir}"

src_dirs=(
    chrys
    config
    data
    scripts
    src
    tests
    webpack.config.base.js
    webpack.config.dev.js
    webpack.config.prod.js
)

dist_dirs=(
    # chrys.egg-info
    cjs
    css
    demo
    dist
    illustrator
    umd
)

cmd="docker run --rm -it"
for dir in "${src_dirs[@]}"; do
    cmd+=" -v ./$dir:/build/$dir"
done
for dir in "${dist_dirs[@]}"; do
    cmd+=" -v ./$dir:/build/$dir"
done
cmd+=" chrys"

$cmd

sudo chown -R $(id -u):$(id -g) .
