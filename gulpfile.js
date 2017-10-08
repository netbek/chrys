var _ = require('lodash');
var autoprefixer = require('autoprefixer');
var chroma = require('chroma-js');
var illustratorSwatches = require('.').illustratorSwatches;
var cssmin = require('gulp-cssmin');
var fs = require('fs-extra');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gulpPostcss = require('gulp-postcss');
var jsonSass = require('json-sass');
var livereload = require('livereload');
var loadPalettes = require('.').loadPalettes;
var loadPalettesFromCss = require('.').loadPalettesFromCss;
var nunjucks = require('nunjucks');
var open = require('open');
var os = require('os');
var path = require('path');
var postcssColorRgbaFallback = require('postcss-color-rgba-fallback');
var postcssOpacity = require('postcss-opacity');
var Promise = require('bluebird');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var webserver = require('gulp-webserver');

Promise.promisifyAll(fs);

/*******************************************************************************
 * Config
 ******************************************************************************/

var gulpConfig = require('./gulp-config.js');

var livereloadOpen =
  (gulpConfig.webserver.https ? 'https' : 'http') +
  '://' +
  gulpConfig.webserver.host +
  ':' +
  gulpConfig.webserver.port +
  (gulpConfig.webserver.open ? gulpConfig.webserver.open : '/');

/*******************************************************************************
 * Misc
 ******************************************************************************/

var flags = {
  livereloadInit: false // Whether `livereload-init` task has been run
};
var server;

// Choose browser for node-open.
var browser = gulpConfig.webserver.browsers.default;
var platform = os.platform();
if (_.has(gulpConfig.webserver.browsers, platform)) {
  browser = gulpConfig.webserver.browsers[platform];
}

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('.'));

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

/*******************************************************************************
 * Functions
 ******************************************************************************/

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

/*******************************************************************************
 * Livereload tasks
 ******************************************************************************/

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

/*******************************************************************************
 * Tasks
 ******************************************************************************/

gulp.task('clean', function() {
  return Promise.mapSeries(
    [
      'css/',
      'data/',
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

// Convert Bokeh palettes TS to JS.
gulp.task('build-bokeh-data', function() {
  return gulp
    .src('src/data/*.ts')
    .pipe(
      ts({
        module: 'commonjs'
      })
    )
    .pipe(gulp.dest('src/data'));
});

gulp.task('build-sass-vars', function() {
  var bokehPalettes = require('./src/data/palettes');

  var vars = {
    '$chrys-color-map': {}
  };

  gulpConfig.palettes.forEach(function(palette) {
    var bokehPalette = _.values(bokehPalettes[palette.bokehName]);

    // Exclude palettes with 256 colors.
    bokehPalette = bokehPalette.filter(function(value) {
      return value.length < 256;
    });

    vars['$chrys-' + palette.name] = _.last(bokehPalette).map(function(value) {
      return '#' + _.padStart(value.toString(16), 6, '0');
    });

    vars['$chrys-color-map'][palette.name] = {};

    bokehPalette.forEach(function(values) {
      vars['$chrys-color-map'][palette.name][
        values.length
      ] = values.map(function(value) {
        return '#' + _.padStart(value.toString(16), 6, '0');
      });
    });
  });

  var data = _.map(vars, function(value, name) {
    return name + ': ' + jsonSass.convertJs(value) + ';';
  }).join('\n\n');

  return fs.writeFileAsync('src/css/_variables.scss', data, 'utf8');
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
            fs
              .writeFileAsync('src/css/' + task + '.scss', res, 'utf8')
              .then(function() {
                resolve();
              });
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
              fs
                .ensureDirAsync('src/css/' + task[0] + '/')
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

gulp.task('build-data', function() {
  return fs
    .mkdirpAsync('data/')
    .then(function() {
      return loadPalettesFromCss();
    })
    .then(function(palettes) {
      return fs.writeFileAsync(
        'data/palettes.json',
        JSON.stringify(palettes, null, 2),
        'utf8'
      );
    });
});

gulp.task('build-demo-page', function(cb) {
  var context = {};

  fs
    .mkdirpAsync('demo/')
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

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'build-bokeh-data',
    'build-sass-vars',
    'build-sass',
    'build-css',
    'build-data',
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

/*******************************************************************************
 * Watch tasks
 ******************************************************************************/

// Watch with livereload that doesn't rebuild docs
gulp.task('watch:livereload', function(cb) {
  var livereloadTask = 'livereload-reload';

  _.forEach(gulpConfig.watchTasks, function(watchConfig) {
    var tasks = _.clone(watchConfig.tasks);
    tasks.push(livereloadTask);
    startWatch(watchConfig.files, tasks);
  });
});

/*******************************************************************************
 * Default task
 ******************************************************************************/

gulp.task('default', ['build']);
