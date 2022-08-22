const webpack = require('webpack');
const webpackConfigBase = require('./webpack.config.base');

module.exports = {
  ...webpackConfigBase,
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
