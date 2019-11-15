const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const bokehPalettes = require('bokehjs/build/js/lib/api/palettes');
const chroma = require('chroma-js');
const cssmin = require('gulp-cssmin');
const fs = require('fs-extra');
const ghPages = require('gulp-gh-pages');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const {illustratorSwatches} = require('chrys-cli');
const jsonSass = require('json-sass');
const livereload = require('livereload');
const log = require('fancy-log');
const nunjucks = require('nunjucks');
const open = require('open');
const os = require('os');
const path = require('path');
const postcssColorRgbaFallback = require('postcss-color-rgba-fallback');
const postcssOpacity = require('postcss-opacity');
const Promise = require('bluebird');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webserver = require('gulp-webserver');
const loadPalettes = require('./utils/loadPalettes');

Promise.promisifyAll(fs);

/* -----------------------------------------------------------------------------
 * Config
 ---------------------------------------------------------------------------- */

const {name: packageName} = require('./package');
const globalName = packageName;

const gulpConfig = require('./gulp-config.js');

const webpackConfig = require('./webpack.config.prod');

const livereloadOpen =
  (gulpConfig.webserver.https ? 'https' : 'http') +
  '://' +
  gulpConfig.webserver.host +
  ':' +
  gulpConfig.webserver.port +
  (gulpConfig.webserver.open ? gulpConfig.webserver.open : '/');

/* -----------------------------------------------------------------------------
 * Misc
 ---------------------------------------------------------------------------- */

const flags = {
  livereloadInit: false // Whether `livereload-init` task has been run
};
let server;

// Choose browser for node-open.
let browser = gulpConfig.webserver.browsers.default;
const platform = os.platform();
if (_.has(gulpConfig.webserver.browsers, platform)) {
  browser = gulpConfig.webserver.browsers[platform];
}

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('.'));

/**
 * Adapted from https://github.com/voxpelli/sass-color-helpers/blob/a32cfd607ca6479318452461a70a7a9ffd886eb1/stylesheets/color-helpers/_contrast.scss#L35
 *
 * @param   {String} base
 * @param   {Array} colors
 * @param   {Number} tolerance
 * @returns {String}
 */
env.addFilter('bestContrast', function(base, colors, tolerance) {
  if (_.isUndefined(colors)) {
    colors = ['#000', '#fff'];
  }
  if (_.isUndefined(tolerance)) {
    tolerance = 0;
  }

  var bestColor = colors[0];
  var bestContrast = chroma.contrast(base, bestColor);
  var color;
  var contrast;

  for (var i = 1, il = colors.length; i < il; i++) {
    color = colors[i];
    contrast = chroma.contrast(base, color);

    if (contrast - bestContrast > tolerance) {
      bestColor = color;
      bestContrast = contrast;
    }
  }

  return bestColor;
});

/* -----------------------------------------------------------------------------
 * Functions
 ---------------------------------------------------------------------------- */

/**
 *
 * @param   {String} src
 * @param   {String} dist
 * @returns {Promise}
 */
function buildCss(src, dist) {
  return new Promise(function(resolve, reject) {
    gulp
      .src(src)
      .pipe(sass(gulpConfig.css.params).on('error', sass.logError))
      .pipe(
        gulpPostcss([
          autoprefixer(gulpConfig.autoprefixer),
          postcssColorRgbaFallback,
          postcssOpacity
        ])
      )
      .pipe(gulp.dest(dist))
      .pipe(
        cssmin({
          advanced: false
        })
      )
      .pipe(
        rename({
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(dist))
      .on('end', function() {
        resolve();
      });
  });
}

function buildJs(config) {
  return new Promise((resolve, reject) => {
    webpack(config, function(err, stats) {
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

/**
 *
 * @returns {Promise}
 */
function buildModuleJs() {
  const configs = [
    {
      ...webpackConfig,
      entry: {
        [globalName]: path.join(gulpConfig.module.src, 'js/index.js'),
        [globalName + '.min']: path.join(gulpConfig.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(gulpConfig.module.dist.cjs),
        libraryTarget: 'commonjs'
      }
    },
    {
      ...webpackConfig,
      entry: {
        [globalName]: path.join(gulpConfig.module.src, 'js/index.js'),
        [globalName + '.min']: path.join(gulpConfig.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(gulpConfig.module.dist.umd),
        library: globalName,
        libraryTarget: 'umd'
      }
    }
  ];

  return Promise.mapSeries(configs, config => buildJs(config));
}

/**
 * Start a watcher.
 *
 * @param {Array} files
 * @param {Array} tasks
 * @param {Boolean} livereload Set to TRUE to force livereload to refresh the page.
 */
function startWatch(files, tasks, livereload) {
  if (livereload) {
    tasks.push('livereload-reload');
  }

  gulp.watch(files, function() {
    runSequence.apply(null, tasks);
  });
}

/* -----------------------------------------------------------------------------
 * LiveReload tasks
 ---------------------------------------------------------------------------- */

// Start webserver.
gulp.task('webserver-init', function(cb) {
  var config = _.clone(gulpConfig.webserver);
  config.open = false;

  gulp
    .src('./')
    .pipe(webserver(config))
    .on('end', cb);
});

// Start livereload server
gulp.task('livereload-init', function(cb) {
  if (!flags.livereloadInit) {
    flags.livereloadInit = true;
    server = livereload.createServer();
    open(livereloadOpen, browser);
  }

  cb();
});

// Refresh page
gulp.task('livereload-reload', function(cb) {
  server.refresh(livereloadOpen);
  cb();
});

/* -----------------------------------------------------------------------------
 * Tasks
 ---------------------------------------------------------------------------- */

gulp.task('clean', function() {
  return Promise.mapSeries(
    [
      gulpConfig.module.dist.cjs,
      'css/',
      'demo/',
      'illustrator/',
      'src/css/background-color/',
      'src/css/color/',
      'src/css/background-color.scss',
      'src/css/color.scss'
    ],
    function(file) {
      return fs.removeAsync(file);
    }
  );
});

gulp.task('build-vars', function() {
  var jsVars = {};

  var sassVars = {
    '$chrys-color-map': {}
  };

  gulpConfig.palettes.forEach(function(palette) {
    var bokehPalette = _.values(bokehPalettes[palette.bokehName]);

    // Exclude palettes with 256 colors.
    bokehPalette = bokehPalette.filter(function(value) {
      return value.length < 256;
    });

    bokehPalette = _.sortBy(bokehPalette, function(values) {
      return values.length;
    });

    var minLength = _.first(bokehPalette).length;
    var maxLength = _.last(bokehPalette).length;

    jsVars[palette.name] = _.assign(
      _.pick(palette, ['group', 'name', 'type']),
      {
        defaultSize: maxLength,
        sizes: _.times(minLength, _.constant(null))
      }
    );

    sassVars['$chrys-' + palette.name] = _.last(bokehPalette).map(function(
      value
    ) {
      return '#' + _.padStart(value.toString(16), 6, '0');
    });

    sassVars['$chrys-color-map'][palette.name] = {};

    bokehPalette.forEach(function(values) {
      var hexValues = values.map(function(value) {
        return '#' + _.padStart(value.toString(16), 6, '0');
      });

      jsVars[palette.name].sizes.push(hexValues);

      sassVars['$chrys-color-map'][palette.name][values.length] = hexValues;
    });
  });

  var jsData = 'module.exports = ' + JSON.stringify(jsVars, null, 2) + ';\n';

  var sassData = _.map(sassVars, function(value, name) {
    return name + ': ' + jsonSass.convertJs(value) + ';';
  }).join('\n\n');

  var tasks = [
    {
      dist: 'data/palettes.js',
      data: jsData
    },
    {
      dist: 'src/css/_variables.scss',
      data: sassData
    }
  ];

  return Promise.mapSeries(tasks, function(task) {
    return fs.outputFileAsync(task.dist, task.data, 'utf-8');
  });
});

gulp.task('build-sass', function() {
  var tasks = ['background-color', 'color'];
  var paletteNames = gulpConfig.palettes.map(function(palette) {
    return palette.name;
  });

  return Promise.mapSeries(tasks, function(task) {
    return new Promise(function(resolve, reject) {
      var res = nunjucks.render(
        'src/templates/css/' + task + '.scss.njk',
        {
          names: paletteNames
        },
        function(err, res) {
          if (err) {
            console.log(err);
            reject();
          } else {
            fs.writeFileAsync('src/css/' + task + '.scss', res, 'utf8').then(
              function() {
                resolve();
              }
            );
          }
        }
      );
    });
  }).then(function() {
    var tasks = [];

    gulpConfig.palettes.forEach(function(palette) {
      tasks.push(['color', palette.name]);
      tasks.push(['background-color', palette.name]);
    });

    return Promise.mapSeries(tasks, function(task) {
      return new Promise(function(resolve, reject) {
        var res = nunjucks.render(
          'src/templates/css/' + task[0] + '/index.scss.njk',
          {
            name: task[1]
          },
          function(err, res) {
            if (err) {
              console.log(err);
              reject();
            } else {
              fs.ensureDirAsync('src/css/' + task[0] + '/')
                .then(function() {
                  return fs.writeFileAsync(
                    'src/css/' + task[0] + '/' + task[1] + '.scss',
                    res,
                    'utf8'
                  );
                })
                .then(function() {
                  resolve();
                });
            }
          }
        );
      });
    });
  });
});

gulp.task('build-css', function() {
  return buildCss(['src/css/**/*.scss'], 'css/')
    .then(function() {
      return buildCss(['src/demo/css/**/*.scss'], 'demo/css/');
    })
    .then(function() {
      return new Promise(function(resolve, reject) {
        gulp
          .src(['css/**/*'])
          .pipe(gulp.dest('demo/css/'))
          .on('end', function() {
            resolve();
          });
      });
    });
});

gulp.task('build-demo-page', function(cb) {
  var context = {};

  fs.mkdirpAsync('demo/')
    .then(function() {
      return loadPalettes();
    })
    .then(function(palettes) {
      var collections = _.uniq(
        palettes.map(function(palette) {
          return palette.type;
        })
      );

      collections.sort();

      context.collections = collections.map(function(paletteType) {
        var filtered = palettes.filter(function(palette) {
          return paletteType === palette.type;
        });

        var sorted = _.sortBy(filtered, [
          function(palette) {
            return palette.name;
          }
        ]);

        return {
          name: paletteType,
          palettes: sorted
        };
      });

      return fs.readFileAsync('src/demo/index.njk', 'utf8');
    })
    .then(function(data) {
      var res = env.renderString(data, context, function(err, res) {
        if (err) {
          console.log(err);
          cb();
        } else {
          fs.writeFileAsync('demo/index.html', res, 'utf8').then(function() {
            cb();
          });
        }
      });
    });
});

gulp.task('build-demo-vendor', function() {
  return gulp
    .src(['node_modules/normalize-css/**/*.css'])
    .pipe(gulp.dest('demo/css/'));
});

gulp.task('build-illustrator', function() {
  return loadPalettes().then(function(palettes) {
    var illustratorPalettes = [];

    palettes.forEach(function(palette) {
      palette.sizes.forEach(function(size) {
        var group = palette.name + '-' + size.name;

        illustratorPalettes.push({
          name: group,
          colors: size.colors.map(function(color, index) {
            return {
              group: group,
              name: group + '-' + (index + 1),
              rgb: chroma(color).rgb()
            };
          })
        });
      });
    });

    return Promise.mapSeries(illustratorPalettes, function(palette) {
      var config = _.cloneDeep(gulpConfig.illustratorTasks.swatches);
      config.document.mode = 'rgb';
      config.colors = palette.colors;

      var dist = path.resolve('illustrator/' + palette.name + '.js');

      return illustratorSwatches(config, dist);
    });
  });
});

gulp.task('build-module-js', () => buildModuleJs());

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'build-module-js',
    'build-vars',
    'build-sass',
    'build-css',
    'build-demo-page',
    'build-demo-vendor',
    'build-illustrator',
    cb
  );
});

gulp.task('deploy', function() {
  return gulp.src('demo/**/*').pipe(ghPages());
});

gulp.task('livereload', function() {
  runSequence('build', 'webserver-init', 'livereload-init', 'watch:livereload');
});

/* -----------------------------------------------------------------------------
 * Watch tasks
 ---------------------------------------------------------------------------- */

// Watch with livereload that doesn't rebuild docs
gulp.task('watch:livereload', function(cb) {
  var livereloadTask = 'livereload-reload';

  _.forEach(gulpConfig.watchTasks, function(watchConfig) {
    var tasks = _.clone(watchConfig.tasks);
    tasks.push(livereloadTask);
    startWatch(watchConfig.files, tasks);
  });
});

/* -----------------------------------------------------------------------------
 * Default task
 ---------------------------------------------------------------------------- */

gulp.task('default', ['build']);
