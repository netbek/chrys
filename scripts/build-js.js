import log from 'fancy-log';
import path from 'path';
import Promise from 'bluebird';
import webpack from 'webpack';
import {config} from '../config';
import webpackConfig from '../webpack.config.prod';
import {name as packageName} from '../package';

function _buildJs(buildConfig) {
  return new Promise((resolve, reject) => {
    webpack(buildConfig, function(err, stats) {
      if (err) {
        log('[webpack]', err);
        reject();
      } else {
        log(
          '[webpack]',
          stats.toString({
            cached: false,
            cachedAssets: false,
            children: true,
            chunks: false,
            chunkModules: false,
            chunkOrigins: true,
            colors: true,
            entrypoints: false,
            errorDetails: false,
            hash: false,
            modules: false,
            performance: true,
            reasons: true,
            source: false,
            timings: true,
            version: true,
            warnings: true
          })
        );
        resolve();
      }
    });
  });
}

function buildJsModules() {
  const buildConfigs = [
    {
      ...webpackConfig,
      entry: {
        index: path.join(config.module.src, 'js/index.js'),
        'index.min': path.join(config.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.resolve(config.module.dist.cjs),
        libraryTarget: 'commonjs'
      }
    },
    {
      ...webpackConfig,
      entry: {
        index: path.join(config.module.src, 'js/index.js'),
        'index.min': path.join(config.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.resolve(config.module.dist.umd),
        library: packageName,
        libraryTarget: 'umd'
      }
    }
  ];

  return Promise.each(buildConfigs, buildConfig => _buildJs(buildConfig));
}

Promise.each([buildJsModules], task => task());
