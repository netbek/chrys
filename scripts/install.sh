#!/bin/bash

if [ -d "venv" ]; then
  echo "Virtual environment exists"
else
  echo "Creating virtual environment ..."
  virtualenv --python=python2.7 venv
  echo "Virtual environment created"
fi

echo "Updating virtual environment ..."
venv/bin/pip install -r requirements.txt
echo "Virtual environment updated"

echo "Updating Python dependencies ..."
pip install --user setuptools==41.6.0 twine==1.15.0 wheel==0.33.6
echo "Python dependencies updated"

echo "Updating Node dependencies ..."
npm ci
echo "Node dependencies updated"
