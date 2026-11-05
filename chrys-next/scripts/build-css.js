import _ from 'lodash';
import autoprefixer from 'autoprefixer';
import browserslist from 'browserslist';
import esbuild from 'esbuild';
import fs from 'fs-extra';
import {globby} from 'globby';
import convertJs from '../vendor/acdlite/json-sass/jsToSassString.js';
import nunjucks from 'nunjucks';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import postcss from 'postcss';
import * as sass from 'sass-embedded';
import {config} from '../../config/index.js';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES
} from '../../data/bokeh-palettes.js';
import {
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../../data/vega-palettes.js';

const packageDir = fileURLToPath(new URL('..', import.meta.url));

async function buildCss(srcDir, pattern, destDir) {
  const files = await globby(pattern, {cwd: srcDir});

  for (const file of files) {
    let css = (await sass.compileAsync(path.join(srcDir, file), config.sass))
      .css;

    css = (
      await postcss([
        autoprefixer({
          overrideBrowserslist: browserslist(undefined, {path: packageDir})
        })
      ]).process(css, {
        from: undefined,
        to: destDir
      })
    ).css;

    const cssMin = (
      await esbuild.transform(css, {
        loader: 'css',
        minify: true,
        legalComments: 'none'
      })
    ).code;

    const cssPath = path.join(destDir, file.replace(/\.scss$/, '.css'));
    const cssMinPath = path.join(destDir, file.replace(/\.scss$/, '.min.css'));

    await fs.outputFile(cssPath, css, 'utf-8');
    await fs.outputFile(cssMinPath, cssMin, 'utf-8');
  }
}

function buildSassVars() {
  const sassVars = {
    '$chrys-palettes': {}
  };

  Object.keys(BOKEH_PALETTE_NAMES).forEach((varName) => {
    const sassName = _.kebabCase(varName);

    sassVars['$chrys-palettes'][sassName] = {};

    Object.values(BOKEH_PALETTE_DATA[BOKEH_PALETTE_NAMES[varName]]).forEach(
      (values) => {
        sassVars['$chrys-palettes'][sassName][values.length] = values;
      }
    );
  });

  Object.keys(VEGA_PALETTE_NAMES).forEach((varName) => {
    const sassName = _.kebabCase(varName);

    sassVars['$chrys-palettes'][sassName] = {};

    Object.values(VEGA_PALETTE_DATA[VEGA_PALETTE_NAMES[varName]]).forEach(
      (values) => {
        sassVars['$chrys-palettes'][sassName][values.length] = values;
      }
    );
  });

  const sassData = _.map(
    sassVars,
    (value, name) => name + ': ' + convertJs(value) + ';'
  ).join('\n\n');

  return fs.outputFile('src/css/_variables.scss', sassData, 'utf-8');
}

function renderTemplate(template, context) {
  return new Promise((resolve, reject) => {
    nunjucks.render(template, context, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function buildSassPartials() {
  const varNames = [
    ...Object.keys(BOKEH_PALETTE_NAMES),
    ...Object.keys(VEGA_PALETTE_NAMES)
  ];
  const sassNames = varNames.map((varName) => _.kebabCase(varName));

  for (const task of ['background-color', 'color']) {
    const data = await renderTemplate(
      'src/templates/css/' + task + '.scss.njk',
      {
        names: sassNames
      }
    );

    await fs.outputFile('src/css/' + task + '.scss', data, 'utf-8');
  }

  const tasks = [];
  sassNames.forEach((sassName) => {
    tasks.push(['color', sassName]);
    tasks.push(['background-color', sassName]);
  });

  for (const task of tasks) {
    const data = await renderTemplate(
      'src/templates/css/' + task[0] + '/index.scss.njk',
      {
        name: task[1]
      }
    );

    await fs.outputFile(
      'src/css/' + task[0] + '/' + task[1] + '.scss',
      data,
      'utf-8'
    );
  }
}

await buildSassVars();
await buildSassPartials();
await fs.remove('dist/css');
await buildCss('src/css', '**/!(_)*.scss', 'dist/css');
