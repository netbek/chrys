import _ from 'lodash';
import fs from 'fs-extra';
import Promise from 'bluebird';
import {config} from '../config';

function clean() {
  return Promise.each(
    [
      config.module.dist.cjs,
      config.module.dist.umd,
      'css/',
      'demo/',
      'illustrator/',
      'src/css/background-color/',
      'src/css/color/',
      'src/css/background-color.scss',
      'src/css/color.scss'
    ],
    file => fs.remove(file)
  );
}

Promise.each([clean], task => task());
