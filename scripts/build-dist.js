import Promise from 'bluebird';
import {
  buildClean,
  buildModuleJs,
  buildSassVars,
  buildSassPartials,
  buildCss,
  buildIllustrator
  // buildDemo
} from './utils';

Promise.each(
  [
    buildClean,
    buildModuleJs,
    buildSassVars,
    buildSassPartials,
    buildCss,
    buildIllustrator
    // buildDemo
  ],
  task => task()
);
