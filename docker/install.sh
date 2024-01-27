#!/bin/bash
set -e

scripts_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root_dir="${scripts_dir}/.."

cd "${root_dir}"

docker build . -t chrys $@

# echo "Updating Python dependencies ..."
# pip3 install --user setuptools==51.1.2 twine==3.3.0 wheel==0.36.2
# echo "Python dependencies updated"
