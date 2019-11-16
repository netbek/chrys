import Promise from 'bluebird';
import {
  buildClean,
  buildJsModules,
  buildSassVars,
  buildSassPartials,
  buildCss,
  buildIllustrator
  // buildDemo
} from './utils';

Promise.each(
  [
    buildClean,
    buildJsModules,
    buildSassVars,
    buildSassPartials,
    buildCss,
    buildIllustrator
    // buildDemo
  ],
  task => task()
);
