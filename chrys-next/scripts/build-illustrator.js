import _ from 'lodash';
import {illustratorSwatches} from 'chrys-cli';
import chroma from 'chroma-js';
import fs from 'fs-extra';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {config} from '../../config/index.js';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES
} from '../../data/bokeh-palettes.js';
import {
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../../data/vega-palettes.js';

async function buildIllustrator(destDir) {
  const illustratorPalettes = [];

  Object.keys(BOKEH_PALETTE_NAMES).forEach((varName) => {
    const sassName = _.kebabCase(varName);

    Object.values(BOKEH_PALETTE_DATA[BOKEH_PALETTE_NAMES[varName]]).forEach(
      (values) => {
        const group = sassName + '-' + values.length;

        illustratorPalettes.push({
          name: group,
          colors: values.map((color, index) => ({
            group: group,
            name: group + '-' + (index + 1),
            rgb: chroma(color).rgb()
          }))
        });
      }
    );
  });

  Object.keys(VEGA_PALETTE_NAMES).forEach((varName) => {
    const sassName = _.kebabCase(varName);

    Object.values(VEGA_PALETTE_DATA[VEGA_PALETTE_NAMES[varName]]).forEach(
      (values) => {
        const group = sassName + '-' + values.length;

        illustratorPalettes.push({
          name: group,
          colors: values.map((color, index) => ({
            group: group,
            name: group + '-' + (index + 1),
            rgb: chroma(color).rgb()
          }))
        });
      }
    );
  });

  for (const palette of illustratorPalettes) {
    const illustratorConfig = _.cloneDeep(config.illustratorTasks.swatches);
    illustratorConfig.document.mode = 'rgb';
    illustratorConfig.colors = palette.colors;

    const dist = path.join(destDir, `${palette.name}.js`);

    await illustratorSwatches(illustratorConfig, dist);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const destDir = path.join(rootDir, 'dist/illustrator');

await fs.remove(destDir);
await buildIllustrator(destDir);
