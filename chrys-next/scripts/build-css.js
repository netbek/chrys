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

async function buildCss(rootDir, cssSrcDir, pattern, destDir) {
  const files = await globby(pattern, {cwd: cssSrcDir});

  for (const file of files) {
    let css = (await sass.compileAsync(path.join(cssSrcDir, file), config.sass))
      .css;

    css = (
      await postcss([
        autoprefixer({
          overrideBrowserslist: browserslist(undefined, {path: rootDir})
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

function buildSassVars(cssSrcDir) {
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

  return fs.outputFile(
    path.join(cssSrcDir, '_variables.scss'),
    sassData,
    'utf-8'
  );
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

async function buildSassPartials(cssSrcDir, templatesSrcDir) {
  const varNames = [
    ...Object.keys(BOKEH_PALETTE_NAMES),
    ...Object.keys(VEGA_PALETTE_NAMES)
  ];
  const sassNames = varNames.map((varName) => _.kebabCase(varName));

  for (const task of ['background-color', 'color']) {
    const data = await renderTemplate(
      path.join(templatesSrcDir, 'css', `${task}.scss.njk`),
      {
        names: sassNames
      }
    );

    await fs.outputFile(path.join(cssSrcDir, `${task}.scss`), data, 'utf-8');
  }

  const tasks = [];
  sassNames.forEach((sassName) => {
    tasks.push(['color', sassName]);
    tasks.push(['background-color', sassName]);
  });

  for (const task of tasks) {
    const data = await renderTemplate(
      path.join(templatesSrcDir, 'css', task[0], 'index.scss.njk'),
      {
        name: task[1]
      }
    );

    await fs.outputFile(
      path.join(cssSrcDir, task[0], `${task[1]}.scss`),
      data,
      'utf-8'
    );
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const cssSrcDir = path.join(rootDir, 'src/css');
const templatesSrcDir = path.join(rootDir, 'src/templates');
const destDir = path.join(rootDir, 'dist/css');

await buildSassVars(cssSrcDir);
await buildSassPartials(cssSrcDir, templatesSrcDir);
await fs.remove(destDir);
await buildCss(rootDir, cssSrcDir, '**/!(_)*.scss', destDir);
