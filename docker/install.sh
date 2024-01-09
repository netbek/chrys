#!/bin/bash

# echo "Updating system dependencies ..."
# sudo apt install python3-testresources
# echo "System dependencies updated"

# if [ -d "venv" ]; then
#   echo "Virtual environment exists"
# else
#   echo "Creating virtual environment ..."
#   virtualenv --python=python3.8 venv
#   echo "Virtual environment created"
# fi

# echo "Updating virtual environment ..."
# venv/bin/pip install -r requirements.txt
# echo "Virtual environment updated"

# echo "Updating Python dependencies ..."
# pip3 install --user setuptools==51.1.2 twine==3.3.0 wheel==0.36.2
# echo "Python dependencies updated"

# echo "Updating Node dependencies ..."
# npm ci && ./scripts/npm/postinstall.sh
# echo "Node dependencies updated"

set -e

scripts_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root_dir="${scripts_dir}/.."

cd "${root_dir}"

docker build . -t chrys
# docker run --rm -it chrys bash
