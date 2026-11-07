import _ from 'lodash';
import {color} from 'd3-color';
import {scaleQuantile} from 'd3-scale';
import {
  YlGn,
  YlGnBu,
  GnBu,
  BuGn,
  PuBuGn,
  PuBu,
  BuPu,
  RdPu,
  PuRd,
  OrRd,
  YlOrRd,
  YlOrBr,
  Purples,
  Blues,
  Greens,
  Oranges,
  Reds,
  Greys,
  PuOr,
  BrBG,
  PRGn,
  PiYG,
  RdBu,
  RdGy,
  RdYlBu,
  Spectral,
  RdYlGn,
  Inferno,
  Magma,
  Plasma,
  Viridis,
  Accent,
  Dark2,
  Paired,
  Pastel1,
  Pastel2,
  Set1,
  Set2,
  Set3,
  Category10,
  Category20,
  Category20b,
  Category20c,
  Colorblind
} from '@bokeh/bokehjs/build/js/lib/api/palettes.js';
import {
  discrete as VEGA_DISCRETE,
  continuous as VEGA_CONTINUOUS
} from 'vega-scale/src/palettes.js';
import {scheme} from 'vega-scale/src/schemes.js';
import {
  schemeAccent,
  schemeCategory10,
  schemeDark2,
  schemeObservable10,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
  schemeTableau10,
  schemeBrBG,
  schemePRGn,
  schemePiYG,
  schemePuOr,
  schemeRdBu,
  schemeRdGy,
  schemeRdYlBu,
  schemeRdYlGn,
  schemeSpectral,
  schemeBuGn,
  schemeBuPu,
  schemeGnBu,
  schemeOrRd,
  schemePuBuGn,
  schemePuBu,
  schemePuRd,
  schemeRdPu,
  schemeYlGnBu,
  schemeYlGn,
  schemeYlOrBr,
  schemeYlOrRd,
  schemeBlues,
  schemeGreens,
  schemeGreys,
  schemeOranges,
  schemePurples,
  schemeReds,
  interpolateCividis,
  interpolateCubehelixDefault,
  interpolateRainbow,
  interpolateWarm,
  interpolateCool,
  interpolateSinebow,
  interpolateTurbo,
  interpolateViridis,
  interpolateMagma,
  interpolateInferno,
  interpolatePlasma
} from 'd3-scale-chromatic';
import {PALETTE_TO_VEGA} from '../config/index.js';

/**
 * Vendor palettes used to build the documentation palettes for the demo.
 *
 * The maps are shared with the palette data generators so that both sources
 * stay in sync.
 */
export const BOKEH_DISCRETE = {
  Category10,
  Category20,
  Category20b,
  Category20c,
  Colorblind,
  Accent,
  Dark2,
  Paired,
  Pastel1,
  Pastel2,
  Set1,
  Set2,
  Set3
};

export const BOKEH_CONTINUOUS = {
  YlGn,
  YlGnBu,
  GnBu,
  BuGn,
  PuBuGn,
  PuBu,
  BuPu,
  RdPu,
  PuRd,
  OrRd,
  YlOrRd,
  YlOrBr,
  Purples,
  Blues,
  Greens,
  Oranges,
  Reds,
  Greys,
  PuOr,
  BrBG,
  PRGn,
  PiYG,
  RdBu,
  RdGy,
  RdYlBu,
  Spectral,
  RdYlGn,
  Inferno,
  Magma,
  Plasma,
  Viridis
};

export {VEGA_DISCRETE, VEGA_CONTINUOUS};

export const D3_DISCRETE = {
  Accent: [schemeAccent],
  Category10: [schemeCategory10],
  Dark2: [schemeDark2],
  Observable10: [schemeObservable10],
  Paired: [schemePaired],
  Pastel1: [schemePastel1],
  Pastel2: [schemePastel2],
  Set1: [schemeSet1],
  Set2: [schemeSet2],
  Set3: [schemeSet3],
  Tableau10: [schemeTableau10],
  BrBG: schemeBrBG,
  PRGn: schemePRGn,
  PiYG: schemePiYG,
  PuOr: schemePuOr,
  RdBu: schemeRdBu,
  RdGy: schemeRdGy,
  RdYlBu: schemeRdYlBu,
  RdYlGn: schemeRdYlGn,
  Spectral: schemeSpectral,
  BuGn: schemeBuGn,
  BuPu: schemeBuPu,
  GnBu: schemeGnBu,
  OrRd: schemeOrRd,
  PuBuGn: schemePuBuGn,
  PuBu: schemePuBu,
  PuRd: schemePuRd,
  RdPu: schemeRdPu,
  YlGnBu: schemeYlGnBu,
  YlGn: schemeYlGn,
  YlOrBr: schemeYlOrBr,
  YlOrRd: schemeYlOrRd,
  Blues: schemeBlues,
  Greens: schemeGreens,
  Greys: schemeGreys,
  Oranges: schemeOranges,
  Purples: schemePurples,
  Reds: schemeReds
};

export const D3_CONTINUOUS = {
  Cividis: interpolateCividis,
  CubehelixDefault: interpolateCubehelixDefault,
  Rainbow: interpolateRainbow,
  Warm: interpolateWarm,
  Cool: interpolateCool,
  Sinebow: interpolateSinebow,
  Turbo: interpolateTurbo,
  Viridis: interpolateViridis,
  Magma: interpolateMagma,
  Inferno: interpolateInferno,
  Plasma: interpolatePlasma
};

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
 * @returns {string[]} Quantized colors.
 */
export function continuousColors(colors, count) {
  const scale = scaleQuantile(
    _.times(count, (i) => i),
    colors
  );
  return _.times(count, (i) => scale(i));
}

/**
 * Splits a Vega palette string into hexadecimal colors.
 *
 * @param {string} palette Palette encoded as concatenated six-digit hex colors.
 * @returns {string[]} Hexadecimal colors.
 */
export function getColors(palette) {
  const n = (palette.length / 6) | 0;
  const colors = new Array(n);
  let i = 0;

  while (i < n) {
    colors[i] = '#' + palette.slice(i * 6, ++i * 6);
  }

  return colors;
}

/**
 * Quantizes a D3 interpolator into a fixed number of hexadecimal colors.
 *
 * @param {(t: number) => string} interpolator D3 color interpolator.
 * @param {number} count Number of colors to return.
 * @returns {string[]} Hexadecimal colors.
 */
export function quantizeInterpolator(interpolator, count) {
  return _.times(count, (i) =>
    color(interpolator((i + 1) / (count + 1))).formatHex()
  );
}

/**
 * Resolves a vendor-specific palette name to its Vega palette name.
 *
 * @param {string} name Vendor-specific palette name.
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
 * @returns {Array<{fileName: string, content: string}>} Generated module files.
 */
export function jsSerializePalettes(vendor, vars, maxSize) {
  return _.map(vars.constantNames, (uniqueName, constantName) => {
    const dataName = `${constantName}_PALETTE_DATA`;
    let content = '';

    content += `export const ${constantName} = ${JSON.stringify(uniqueName)}\n`;
    content += '\n';
    content += `export const ${dataName} = ${unquoteNumericKeys(
      JSON.stringify(vars.palettes[uniqueName], null, 2),
      maxSize
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
    result += `import {${constantName}, ${constantName}_PALETTE_DATA} from '${fileName}'\n`;
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

  result += `export const ${VENDOR}_PALETTE_NAMES = {\n`;
  _.forEach(entries, ({constantName, uniqueName}) => {
    result += `  ${constantName}: ${JSON.stringify(uniqueName)},\n`;
  });
  result += '}\n\n';

  result += `export const ${VENDOR}_PALETTES = {\n`;
  _.forEach(vars.vendorNames, (constantName, vendorName) => {
    result += `  [${JSON.stringify(vendorName)}]: ${constantName}_PALETTE_DATA,\n`;
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
 * @returns {string} Generated module source.
 */
export function jsSerialize(vendor, vars, maxSize) {
  const VENDOR_PALETTES = `${vendor.toUpperCase()}_PALETTES`;
  const VENDOR_PALETTE_DATA = `${vendor.toUpperCase()}_PALETTE_DATA`;
  const VENDOR_PALETTE_NAMES = `${vendor.toUpperCase()}_PALETTE_NAMES`;

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

  return result;
}

/**
 * Generates the combined Python module for a vendor.
 *
 * @param {string} vendor Palette vendor.
 * @param {object} vars Palette data keyed by constant, unique, and vendor names.
 * @param {number} maxSize Maximum palette size.
 * @returns {string} Generated Python source.
 */
export function pySerialize(vendor, vars, maxSize) {
  const VENDOR_PALETTES = `${vendor.toUpperCase()}_PALETTES`;
  const VENDOR_PALETTE_DATA = `${vendor.toUpperCase()}_PALETTE_DATA`;
  const VENDOR_PALETTE_NAMES = `${vendor.toUpperCase()}_PALETTE_NAMES`;

  let result = '';

  result +=
    VENDOR_PALETTE_DATA + ' = ' + JSON.stringify(vars.palettes, null, 2) + '\n';
  _.times(maxSize, (i) => {
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

  return result;
}

/**
 * Number of colors in a continuous documentation palette.
 */
export const DOCS_PALETTE_SIZE = 11;

/**
 * Converts Bokeh integer colors to hexadecimal strings.
 *
 * @param {number[]} palette Bokeh palette colors.
 * @returns {string[]} Hexadecimal colors.
 */
function bokehHex(palette) {
  return palette.map(
    (d) => '#' + _.padStart(d.toString(16), 8, '0').substring(0, 6)
  );
}

/**
 * Gets the first palette with the largest number of colors.
 *
 * @param {Array<Array<unknown>>} palettes Palette variants.
 * @returns {Array<unknown>} The largest palette.
 */
function largestPalette(palettes) {
  const maxSize = _.max(_.values(palettes).map((palette) => palette.length));

  return _.first(
    _.values(palettes).filter((palette) => palette.length === maxSize)
  );
}

/**
 * Builds the Bokeh documentation palettes.
 *
 * @returns {Record<string, string[]>} Documentation palettes keyed by name.
 */
export function buildBokehDocsPalettes() {
  const docs = {};

  _.forEach(BOKEH_DISCRETE, (palettes, vendorName) => {
    docs['bokeh_' + vendorName] = bokehHex(largestPalette(palettes));
  });

  _.forEach(BOKEH_CONTINUOUS, (palettes, vendorName) => {
    docs['bokeh_' + vendorName] = continuousColors(
      bokehHex(largestPalette(palettes)),
      DOCS_PALETTE_SIZE
    );
  });

  return docs;
}

/**
 * Builds the Vega documentation palettes.
 *
 * @returns {Record<string, string[]>} Documentation palettes keyed by name.
 */
export function buildVegaDocsPalettes() {
  const docs = {};

  Object.keys(VEGA_DISCRETE).forEach((vendorName) => {
    docs['vega_' + vendorName.toLowerCase()] = scheme(vendorName);
  });

  Object.keys(VEGA_CONTINUOUS).forEach((vendorName) => {
    docs['vega_' + vendorName.toLowerCase()] = continuousColors(
      getColors(VEGA_CONTINUOUS[vendorName]),
      DOCS_PALETTE_SIZE
    );
  });

  return docs;
}

/**
 * Builds the D3 documentation palettes.
 *
 * @returns {Record<string, string[]>} Documentation palettes keyed by name.
 */
export function buildD3DocsPalettes() {
  const docs = {};

  Object.keys(D3_DISCRETE).forEach((schemeName) => {
    const vendorName = toVegaName(schemeName);
    const palettes = _.compact(D3_DISCRETE[schemeName]);
    const maxSize = _.max(palettes.map((palette) => palette.length));
    const palette = _.first(
      palettes.filter((candidate) => candidate.length === maxSize)
    );

    docs['d3_' + vendorName.toLowerCase()] = palette.map((d) =>
      color(d).formatHex()
    );
  });

  Object.keys(D3_CONTINUOUS).forEach((schemeName) => {
    const vendorName = toVegaName(schemeName);

    docs['d3_' + vendorName.toLowerCase()] = continuousColors(
      quantizeInterpolator(D3_CONTINUOUS[schemeName], 256),
      DOCS_PALETTE_SIZE
    );
  });

  return docs;
}

/**
 * Builds all documentation palettes.
 *
 * @returns {Record<string, Record<string, string[]>>} Documentation palettes
 * keyed by vendor and name.
 */
export function buildDocsPalettes() {
  return {
    bokeh: buildBokehDocsPalettes(),
    vega: buildVegaDocsPalettes(),
    d3: buildD3DocsPalettes()
  };
}

/**
 * Documentation palettes keyed by vendor and name.
 */
export const DOCS_PALETTE_DATA = buildDocsPalettes();

const DOCS_PALETTE_NAMES = new Set(
  Object.values(DOCS_PALETTE_DATA).flatMap((palettes) => Object.keys(palettes))
);

/**
 * Gets the documentation palette for a qualified palette name.
 *
 * @param {string} name Qualified palette name.
 * @param {Record<string, Record<string, string[]>>} [data] Documentation
 * palette data to search.
 * @returns {string[]} The documentation palette colors.
 * @throws If the qualified palette name is not recognized or its data is missing.
 */
export function getDocsPalette(name, data = DOCS_PALETTE_DATA) {
  if (!DOCS_PALETTE_NAMES.has(name)) {
    throw new Error(`Palette name "${name}" not recognized.`);
  }

  const vendor = name.substring(0, name.indexOf('_'));
  const palette = data[vendor]?.[name];

  if (!palette) {
    throw new Error(`Documentation palette data for "${name}" not found.`);
  }

  return palette;
}

/**
 * Gets a copy of the documentation palette by name.
 *
 * @param {string} name Qualified palette name.
 * @returns {string[]} A copy of the documentation palette colors.
 * @throws If the qualified palette name is not recognized or its data is missing.
 */
export function docsPalette(name) {
  return [...getDocsPalette(name)];
}
