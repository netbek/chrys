/**
 * Adapted from:
 * - https://blog.addjam.com/testing-react-native-with-mocha-and-enzyme-6b77cd9e52a1
 * - https://babeljs.io/docs/usage/babel-register
 */

const path = require('path');
const register = require('@babel/register');

const webpackConfig = require(path.join(
  __dirname,
  '../../webpack.config.prod.js'
));

const babelConfig = webpackConfig.module.rules.filter(
  d => d.loader && ~d.loader.indexOf('babel-loader')
)[0].options;

register(babelConfig);
