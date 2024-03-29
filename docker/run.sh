#!/bin/bash
set -e

scripts_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root_dir="${scripts_dir}/.."

cd "${root_dir}"

src_volumes=(
    chrys
    config
    data
    docker/scripts
    scripts
    src
    tests
    .ncurc.json
    .npmrc
    package.json
    package-lock.json
    pyproject.toml
    README.md
    setup.cfg
    setup.py
    webpack.config.base.js
    webpack.config.dev.js
    webpack.config.prod.js
)

dist_volumes=(
    cjs
    css
    demo
    dist
    illustrator
    umd
)

cmd="docker run --rm -it"
for volume in "${src_volumes[@]}"; do
    cmd+=" -v ./$volume:/build/$volume"
done
for volume in "${dist_volumes[@]}"; do
    cmd+=" -v ./$volume:/build/$volume"
done
cmd+=" chrys $@"

$cmd

sudo chown -R $(id -u):$(id -g) .
