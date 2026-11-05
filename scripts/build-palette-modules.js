import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';
import {jsSerializePalettes, jsSerializeVendorIndex} from './utils.js';
import * as bokeh from '../data/bokeh-palettes.js';
import * as vega from '../data/vega-palettes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const palettesDir = path.join(__dirname, '../chrys-next/src/js/palettes');

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

function build(vendor, data) {
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

build('bokeh', bokeh);
build('vega', vega);
