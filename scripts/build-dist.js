import Promise from 'bluebird';
import {
  buildClean,
  buildModuleJs,
  buildSassVars,
  buildSassPartials,
  buildCss,
  buildIllustrator
} from './utils';

Promise.each(
  [
    buildClean,
    buildModuleJs,
    buildSassVars,
    buildSassPartials,
    buildCss,
    buildIllustrator
  ],
  task => task()
);
