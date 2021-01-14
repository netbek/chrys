#!/bin/bash

if [ -d "venv" ]; then
  echo "Virtual environment exists"
else
  echo "Creating virtual environment ..."
  virtualenv --python=python3.8 venv
  echo "Virtual environment created"
fi

echo "Updating virtual environment ..."
venv/bin/pip install -r requirements.txt
echo "Virtual environment updated"

echo "Updating Python dependencies ..."
pip3 install --user setuptools==51.1.2 twine==3.3.0 wheel==0.36.2
echo "Python dependencies updated"

echo "Updating Node dependencies ..."
npm ci
echo "Node dependencies updated"
