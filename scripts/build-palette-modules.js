import _ from 'lodash';
import fs from 'fs-extra';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {jsSerializePalettes, jsSerializeVendorIndex} from './utils.js';
import * as bokeh from '../data/bokeh-palettes.js';
import * as vega from '../data/vega-palettes.js';
import * as d3 from '../data/d3-palettes.js';

function getVars(vendor, data) {
  const VENDOR = vendor.toUpperCase();
  const constantNames = data[`${VENDOR}_PALETTE_NAMES`];
  const palettes = {};
  const docsPalettes = {};
  const vendorNames = {};

  _.forEach(constantNames, (uniqueName, constantName) => {
    const vendorName = uniqueName.substring(vendor.length + 1);

    palettes[uniqueName] = data[`${VENDOR}_PALETTES`][vendorName];
    docsPalettes[uniqueName] = data[`${VENDOR}_DOCS_PALETTES`][vendorName];
    vendorNames[vendorName] = constantName;
  });

  return {constantNames, vendorNames, palettes, docsPalettes};
}

function getMaxSize(values) {
  return _.max(
    _.flatMap(_.values(values), (value) =>
      Array.isArray(value) ? value.length : Object.keys(value).map(Number)
    )
  );
}

function build(palettesDir, vendor, data) {
  const vars = getVars(vendor, data);
  const vendorDir = path.join(palettesDir, vendor);

  fs.emptyDirSync(vendorDir);
  _.forEach(
    jsSerializePalettes(
      vendor,
      vars,
      getMaxSize(vars.palettes),
      getMaxSize(vars.docsPalettes)
    ),
    ({fileName, content}) => {
      fs.outputFileSync(path.join(palettesDir, fileName), content);
    }
  );
  fs.outputFileSync(
    path.join(vendorDir, 'index.js'),
    jsSerializeVendorIndex(vendor, vars)
  );
}

const packageDir = fileURLToPath(new URL('..', import.meta.url));
const palettesDir = path.join(packageDir, 'src/js/palettes');

build(palettesDir, 'bokeh', bokeh);
build(palettesDir, 'vega', vega);
build(palettesDir, 'd3', d3);
