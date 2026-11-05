import _ from 'lodash';

export const BOKEH_TO_VEGA = {
  YlGn: 'yellowGreen',
  YlGnBu: 'yellowGreenBlue',
  GnBu: 'greenBlue',
  BuGn: 'blueGreen',
  PuBuGn: 'purpleBlueGreen',
  PuBu: 'purpleBlue',
  BuPu: 'bluePurple',
  RdPu: 'redPurple',
  PuRd: 'purpleRed',
  OrRd: 'orangeRed',
  YlOrRd: 'yellowOrangeRed',
  YlOrBr: 'yellowOrangeBrown',
  Purples: 'purples',
  Blues: 'blues',
  Greens: 'greens',
  Oranges: 'oranges',
  Reds: 'reds',
  Greys: 'greys',
  PuOr: 'purpleOrange',
  BrBG: 'brownBlueGreen',
  PRGn: 'purpleGreen',
  PiYG: 'pinkYellowGreen',
  RdBu: 'redBlue',
  RdGy: 'redGrey',
  RdYlBu: 'redYellowBlue',
  Spectral: 'spectral',
  RdYlGn: 'redYellowGreen',
  Inferno: 'inferno',
  Magma: 'magma',
  Plasma: 'plasma',
  Viridis: 'viridis',
  Accent: 'accent',
  Dark2: 'dark2',
  Paired: 'paired',
  Pastel1: 'pastel1',
  Pastel2: 'pastel2',
  Set1: 'set1',
  Set2: 'set2',
  Set3: 'set3',
  Category10: 'category10',
  Category20: 'category20',
  Category20b: 'category20b',
  Category20c: 'category20c',
  Colorblind: 'colorblind'
};

export const VEGA_TO_BOKEH = _.invert(BOKEH_TO_VEGA);

export const config = {
  sass: {
    loadPaths: ['.'],
    outputStyle: 'expanded',
    silenceDeprecations: [
      'abs-percent',
      'bogus-combinators',
      'call-string',
      'color-module-compat',
      'css-function-mixin',
      'duplicate-var-flags',
      'elseif',
      'feature-exists',
      'fs-importer-cwd',
      'function-units',
      'global-builtin',
      'import',
      'mixed-decls',
      'moz-document',
      'new-global',
      'null-alpha',
      'relative-canonical',
      'slash-div',
      'strict-unary'
      // 'user-authored'
    ]
  },
  illustratorTasks: {
    swatches: {
      document: {
        height: 210, // mm
        width: 297 // mm
      },
      characterStyles: [
        {
          name: 'swatchRectTitle',
          attributes: {
            size: 8 // pt
          }
        }
      ],
      swatchRect: {
        textPosition: 0.125 // Value between 0 and 1
      }
    }
  }
};
