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
const vars = {names: {}, palettes: {}};
let maxSize = 9;

const discreteNames = Object.keys(discrete);

vars.palettes = {
  ...vars.palettes,
  ..._.zipObject(
    discreteNames.map(d => d.toLowerCase()),
    _.times(discreteNames.length, () => ({}))
  )
};

discreteNames.forEach(name => {
  vars.names[_.snakeCase('vega_' + name).toUpperCase()] = name.toLowerCase();
  maxSize = Math.max(maxSize, scheme(name).length);

  for (let i = 1; i <= scheme(name).length; i++) {
    vars.palettes[name.toLowerCase()][i] = scheme(name).slice(0, i);
  }
});

const continuousNames = Object.keys(continuous);

vars.palettes = {
  ...vars.palettes,
  ..._.zipObject(
    continuousNames.map(d => d.toLowerCase()),
    _.times(continuousNames.length, () => ({}))
  )
};

continuousNames.forEach(name => {
  vars.names[_.snakeCase('vega_' + name).toUpperCase()] = name.toLowerCase();
  maxSize = Math.max(maxSize, continuous[name].length / 6);

  for (let i = 1; i <= 9; i++) {
    vars.palettes[name.toLowerCase()][i] = quantizeInterpolator(
      scheme(name),
      i
    ).map(d => color(d).formatHex());
  }

  if (~['viridis', 'magma', 'inferno', 'plasma'].indexOf(name)) {
    maxSize = Math.max(maxSize, 256);

    vars.palettes[name.toLowerCase()][256] = quantizeInterpolator(
      scheme(name),
      256
    ).map(d => color(d).formatHex());
  }
});

// Serialise data
let data = '';

_.forEach(vars.names, (v, k) => {
  data += k + ' = "' + v + '"\n';
});
data += '\n';

data += basename.toUpperCase() + ' = ' + JSON.stringify(vars.palettes, null, 2);

// Remove quoutes from numeric keys
_.times(maxSize, i => {
  data = data.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
});

fs.outputFile(file, data);
