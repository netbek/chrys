import _ from 'lodash';
import {scaleQuantile} from 'd3-scale';
import {PALETTE_TO_VEGA} from '../config/index.js';

/**
 * Converts a palette constant name to a Sass variable name.
 *
 * @param {string} varName Palette constant name.
 * @returns {string} Sass variable name.
 */
export function paletteSassName(varName) {
  return varName.startsWith('D3_')
    ? 'd3-' + _.kebabCase(varName.slice(3))
    : _.kebabCase(varName);
}

/**
 * Quantizes a palette into a fixed number of colors.
 *
 * @param {string[]} colors Palette colors.
 * @param {number} count Number of colors to return.
 * @returns {string[]} Quantized palette colors.
 */
export function continuousPalette(colors, count) {
  const scale = scaleQuantile(
    _.times(count, (i) => i),
    colors
  );
  return _.times(count, (i) => scale(i));
}

/**
 * Resolves a vendor palette name to its Vega palette name.
 *
 * @param {string} name Vendor palette name.
 * @returns {string} Vega-style palette name.
 */
export function toVegaName(name) {
  return PALETTE_TO_VEGA[name] || _.camelCase(name);
}

/**
 * Replaces quoted numeric object keys in serialized JSON with unquoted keys.
 *
 * @param {string} json Serialized JSON.
 * @param {number} maxSize Maximum numeric key to unquote.
 * @returns {string} Serialized JSON with unquoted numeric keys.
 */
function unquoteNumericKeys(json, maxSize) {
  let result = json;

  _.times(maxSize, (i) => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });

  return result;
}

/**
 * Creates a filename slug from a palette constant name.
 *
 * @param {string} vendor Palette vendor.
 * @param {string} constantName Palette constant name.
 * @returns {string} Kebab-case palette slug.
 */
function paletteSlug(vendor, constantName) {
  return _.kebabCase(
    constantName.replace(new RegExp('^' + vendor.toUpperCase() + '_'), '')
  );
}

/**
 * Generates JavaScript module files for each palette in a vendor.
 *
 * @param {string} vendor Palette vendor.
 * @param {object} vars Palette data keyed by constant, unique, and vendor names.
 * @param {number} maxSize Maximum palette size.
 * @param {number} docsMaxSize Maximum documentation palette size.
 * @returns {Array<{fileName: string, content: string}>} Generated module files.
 */
export function jsSerializePalettes(vendor, vars, maxSize, docsMaxSize) {
  return _.map(vars.constantNames, (uniqueName, constantName) => {
    const dataName = `${constantName}_PALETTE_DATA`;
    const docsName = `${constantName}_DOCS_PALETTE_DATA`;
    let content = '';

    content += `export const ${constantName} = ${JSON.stringify(uniqueName)}\n`;
    content += '\n';
    content += `export const ${dataName} = ${unquoteNumericKeys(
      JSON.stringify(vars.palettes[uniqueName], null, 2),
      maxSize
    )}\n`;
    content += '\n';
    content += `export const ${docsName} = ${unquoteNumericKeys(
      JSON.stringify(vars.docsPalettes[uniqueName], null, 2),
      docsMaxSize
    )}\n`;

    return {
      fileName: `${vendor}/${paletteSlug(vendor, constantName)}.js`,
      content
    };
  });
}

/**
 * Generates the JavaScript index module for a vendor.
 *
 * @param {string} vendor Palette vendor.
 * @param {object} vars Palette data keyed by constant, unique, and vendor names.
 * @returns {string} Generated module source.
 */
export function jsSerializeVendorIndex(vendor, vars) {
  const VENDOR = vendor.toUpperCase();
  const entries = _.map(vars.constantNames, (uniqueName, constantName) => ({
    constantName,
    uniqueName,
    fileName: `./${paletteSlug(vendor, constantName)}.js`
  }));

  let result = '';

  _.forEach(entries, ({constantName, fileName}) => {
    result += `import {${constantName}, ${constantName}_PALETTE_DATA, ${constantName}_DOCS_PALETTE_DATA} from '${fileName}'\n`;
  });
  result += '\n';

  _.forEach(entries, ({constantName}) => {
    result += `export {${constantName}}\n`;
  });
  result += '\n';

  result += `export const ${VENDOR}_PALETTE_DATA = {\n`;
  _.forEach(entries, ({constantName}) => {
    result += `  [${constantName}]: ${constantName}_PALETTE_DATA,\n`;
  });
  result += '}\n\n';

  result += `export const ${VENDOR}_DOCS_PALETTE_DATA = {\n`;
  _.forEach(entries, ({constantName}) => {
    result += `  [${constantName}]: ${constantName}_DOCS_PALETTE_DATA,\n`;
  });
  result += '}\n\n';

  result += `export const ${VENDOR}_PALETTE_NAMES = {\n`;
  _.forEach(entries, ({constantName, uniqueName}) => {
    result += `  ${constantName}: ${JSON.stringify(uniqueName)},\n`;
  });
  result += '}\n\n';

  result += `export const ${VENDOR}_PALETTES = {\n`;
  _.forEach(vars.vendorNames, (constantName, vendorName) => {
    result += `  [${JSON.stringify(vendorName)}]: ${constantName}_PALETTE_DATA,\n`;
  });
  result += '}\n\n';

  result += `export const ${VENDOR}_DOCS_PALETTES = {\n`;
  _.forEach(vars.vendorNames, (constantName, vendorName) => {
    result += `  [${JSON.stringify(vendorName)}]: ${constantName}_DOCS_PALETTE_DATA,\n`;
  });
  result += '}\n';

  return result;
}

/**
 * Generates the combined JavaScript module for a vendor.
 *
 * @param {string} vendor Palette vendor.
 * @param {object} vars Palette data keyed by constant, unique, and vendor names.
 * @param {number} maxSize Maximum palette size.
 * @param {number} docsMaxSize Maximum documentation palette size.
 * @returns {string} Generated module source.
 */
export function jsSerialize(vendor, vars, maxSize, docsMaxSize) {
  const VENDOR_PALETTES = `${vendor.toUpperCase()}_PALETTES`;
  const VENDOR_PALETTE_DATA = `${vendor.toUpperCase()}_PALETTE_DATA`;
  const VENDOR_PALETTE_NAMES = `${vendor.toUpperCase()}_PALETTE_NAMES`;
  const VENDOR_DOCS_PALETTES = `${vendor.toUpperCase()}_DOCS_PALETTES`;
  const VENDOR_DOCS_PALETTE_DATA = `${vendor.toUpperCase()}_DOCS_PALETTE_DATA`;

  let result = '';

  result +=
    'export const ' +
    VENDOR_PALETTE_DATA +
    ' = ' +
    JSON.stringify(vars.palettes, null, 2) +
    '\n';
  _.times(maxSize, (i) => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  result +=
    'export const ' +
    VENDOR_DOCS_PALETTE_DATA +
    ' = ' +
    JSON.stringify(vars.docsPalettes, null, 2) +
    '\n';
  _.times(docsMaxSize, (i) => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  _.forEach(vars.constantNames, (v, k) => {
    result += 'export const ' + k + ' = "' + v + '"\n';
  });
  result += '\n';

  result += `const _${VENDOR_PALETTE_NAMES} = {}\n`;
  _.forEach(vars.constantNames, (v, k) => {
    result += `_${VENDOR_PALETTE_NAMES}['${k}'] = '${v}'\n`;
  });
  result += `export const ${VENDOR_PALETTE_NAMES} = _${VENDOR_PALETTE_NAMES}\n`;
  result += '\n';

  result += `const _${VENDOR_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `_${VENDOR_PALETTES}['${k}'] = ${VENDOR_PALETTE_DATA}[${v}]\n`;
  });
  result += `export const ${VENDOR_PALETTES} = _${VENDOR_PALETTES}\n`;
  result += '\n';

  result += `const _${VENDOR_DOCS_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `_${VENDOR_DOCS_PALETTES}['${k}'] = ${VENDOR_DOCS_PALETTE_DATA}[${v}]\n`;
  });
  result += `export const ${VENDOR_DOCS_PALETTES} = _${VENDOR_DOCS_PALETTES}\n`;

  return result;
}

/**
 * Generates the combined Python module for a vendor.
 *
 * @param {string} vendor Palette vendor.
 * @param {object} vars Palette data keyed by constant, unique, and vendor names.
 * @param {number} maxSize Maximum palette size.
 * @param {number} docsMaxSize Maximum documentation palette size.
 * @returns {string} Generated Python source.
 */
export function pySerialize(vendor, vars, maxSize, docsMaxSize) {
  const VENDOR_PALETTES = `${vendor.toUpperCase()}_PALETTES`;
  const VENDOR_PALETTE_DATA = `${vendor.toUpperCase()}_PALETTE_DATA`;
  const VENDOR_PALETTE_NAMES = `${vendor.toUpperCase()}_PALETTE_NAMES`;
  const VENDOR_DOCS_PALETTES = `${vendor.toUpperCase()}_DOCS_PALETTES`;
  const VENDOR_DOCS_PALETTE_DATA = `${vendor.toUpperCase()}_DOCS_PALETTE_DATA`;

  let result = '';

  result +=
    VENDOR_PALETTE_DATA + ' = ' + JSON.stringify(vars.palettes, null, 2) + '\n';
  _.times(maxSize, (i) => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  result +=
    VENDOR_DOCS_PALETTE_DATA +
    ' = ' +
    JSON.stringify(vars.docsPalettes, null, 2) +
    '\n';
  _.times(docsMaxSize, (i) => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  _.forEach(vars.constantNames, (v, k) => {
    result += k + ' = "' + v + '"\n';
  });
  result += '\n';

  result += `${VENDOR_PALETTE_NAMES} = {}\n`;
  _.forEach(vars.constantNames, (v, k) => {
    result += `${VENDOR_PALETTE_NAMES}['${k}'] = '${v}'\n`;
  });
  result += '\n';

  result += `${VENDOR_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `${VENDOR_PALETTES}['${k}'] = ${VENDOR_PALETTE_DATA}[${v}]\n`;
  });
  result += '\n';

  result += `${VENDOR_DOCS_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `${VENDOR_DOCS_PALETTES}['${k}'] = ${VENDOR_DOCS_PALETTE_DATA}[${v}]\n`;
  });

  return result;
}
