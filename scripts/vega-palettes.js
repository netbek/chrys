import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {color} from 'd3-color';
import {discrete, continuous} from 'vega-scale/src/palettes';
import {scheme, quantizeInterpolator} from 'vega-scale';

const basename = _.snakeCase(
  path.basename(__filename, path.extname(__filename))
);
const file = path.join(__dirname, '../chrys/data/' + basename + '.py');
let data = {};
let maxCount = 9;

const discreteNames = Object.keys(discrete);

data = {
  ...data,
  ..._.zipObject(
    discreteNames.map(d => d.toLowerCase()),
    _.times(discreteNames.length, () => ({}))
  )
};

discreteNames.forEach(name => {
  maxCount = Math.max(maxCount, scheme(name).length);

  for (let i = 1; i <= scheme(name).length; i++) {
    data[name.toLowerCase()][i] = scheme(name).slice(0, i);
  }
});

const continuousNames = Object.keys(continuous);

data = {
  ...data,
  ..._.zipObject(
    continuousNames.map(d => d.toLowerCase()),
    _.times(continuousNames.length, () => ({}))
  )
};

continuousNames.forEach(name => {
  maxCount = Math.max(maxCount, continuous[name].length / 6);

  for (let i = 1; i <= 9; i++) {
    data[name.toLowerCase()][i] = quantizeInterpolator(scheme(name), i).map(d =>
      color(d).formatHex()
    );
  }

  if (~['viridis', 'magma', 'inferno', 'plasma'].indexOf(name)) {
    maxCount = Math.max(maxCount, 256);

    data[name.toLowerCase()][256] = quantizeInterpolator(scheme(name), 256).map(
      d => color(d).formatHex()
    );
  }
});

data = basename.toUpperCase() + ' = ' + JSON.stringify(data, null, 2);
_.times(maxCount, i => {
  data = data.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
});

fs.outputFile(file, data);
