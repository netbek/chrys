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

echo "Updating Node dependencies ..."
npm ci
echo "Node dependencies updated"
