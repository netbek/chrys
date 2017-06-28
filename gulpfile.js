var _ = require('lodash');
var autoprefixer = require('autoprefixer');
var chroma = require('chroma-js');
var illustratorSwatches = require('.').illustratorSwatches;
var cssmin = require('gulp-cssmin');
var fs = require('fs-extra');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gulpPostcss = require('gulp-postcss');
var livereload = require('livereload');
var nunjucks = require('nunjucks');
var open = require('open');
var os = require('os');
var path = require('path');
var postcss = require('postcss');
var postcssColorRgbaFallback = require('postcss-color-rgba-fallback');
var postcssJs = require('postcss-js');
var postcssOpacity = require('postcss-opacity');
var Promise = require('bluebird');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var through2 = require('through2');
var webserver = require('gulp-webserver');

Promise.promisifyAll(fs);

/*******************************************************************************
 * Config
 ******************************************************************************/

var gulpConfig = require('./gulp-config.js');

var livereloadOpen = (gulpConfig.webserver.https ? 'https' : 'http') + '://' + gulpConfig.webserver.host + ':' + gulpConfig.webserver.port + (gulpConfig.webserver.open ? gulpConfig.webserver.open : '/');

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
  return new Promise(function (resolve, reject) {
    gulp
      .src(src)
      .pipe(sass(gulpConfig.css.params).on('error', sass.logError))
      .pipe(gulpPostcss([
        autoprefixer(gulpConfig.autoprefixer),
        postcssColorRgbaFallback,
        postcssOpacity
      ]))
      .pipe(gulp.dest(dist))
      .pipe(cssmin({
        advanced: false
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(dist))
      .on('end', function () {
        resolve();
      });
  });
}

/**
 *
 * @param   {String} src
 * @param   {RegExp} re
 * @returns {Promise}
 */
function loadColors(src, re) {
  return new Promise(function (resolve, reject) {
    var colors = {};

    gulp
      .src(src)
      .pipe(sass(gulpConfig.css.params).on('error', sass.logError))
      .pipe(through2.obj(function (chunk, enc, callback) {
        var data = chunk.contents.toString(enc);
        var root = postcss.parse(data);
        var rules = postcssJs.objectify(root);

        _.forEach(rules, function (value, key) {
          var matches = key.match(re);

          if (matches) {
            var name = matches[1];
            var size = matches[2];
            var index = matches[3];

            _.set(colors, name + '._' + size + '._' + index, value.backgroundColor);
          }
        });

        this.emit('end');
      }))
      .on('end', function () {
        resolve(colors);
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

  gulp.watch(files, function () {
    runSequence.apply(null, tasks);
  });
}

/*******************************************************************************
 * Livereload tasks
 ******************************************************************************/

// Start webserver.
gulp.task('webserver-init', function (cb) {
  var config = _.clone(gulpConfig.webserver);
  config.open = false;

  gulp.src('./')
    .pipe(webserver(config))
    .on('end', cb);
});

// Start livereload server
gulp.task('livereload-init', function (cb) {
  if (!flags.livereloadInit) {
    flags.livereloadInit = true;
    server = livereload.createServer();
    open(livereloadOpen, browser);
  }

  cb();
});

// Refresh page
gulp.task('livereload-reload', function (cb) {
  server.refresh(livereloadOpen);
  cb();
});

/*******************************************************************************
 * Tasks
 ******************************************************************************/

gulp.task('clean', function () {
  return Promise.mapSeries([
    'css/',
    'demo/',
    'illustrator/',
    'src/css/background-color/',
    'src/css/color/',
    'src/css/background-color.scss',
    'src/css/color.scss'
  ], function (file) {
    return fs.removeAsync(file);
  });
});

gulp.task('build-demo-scss', function () {
  var tasks = ['background-color', 'color'];

  return Promise.mapSeries(tasks, function (task) {
      return new Promise(function (resolve, reject) {
        var res = nunjucks.render('src/templates/css/' + task + '.scss.njk', {
          colors: gulpConfig.colors
        }, function (err, res) {
          if (err) {
            console.log(err);
            reject();
          }
          else {
            fs.writeFileAsync('src/css/' + task + '.scss', res, 'utf8')
              .then(function () {
                resolve();
              });
          }
        });
      });
    })
    .then(function () {
      var tasks = [];

      gulpConfig.colors.forEach(function (color) {
        tasks.push(['color', color]);
        tasks.push(['background-color', color]);
      });

      return Promise.mapSeries(tasks, function (task) {
        return new Promise(function (resolve, reject) {
          var res = nunjucks.render('src/templates/css/' + task[0] + '/index.scss.njk', {
            name: task[1]
          }, function (err, res) {
            if (err) {
              console.log(err);
              reject();
            }
            else {
              fs.ensureDirAsync('src/css/' + task[0] + '/')
                .then(function () {
                  return fs.writeFileAsync('src/css/' + task[0] + '/' + task[1] + '.scss', res, 'utf8');
                })
                .then(function () {
                  resolve();
                });
            }
          });
        });
      });
    });
});

gulp.task('build-demo-css', function () {
  return buildCss([
      'src/css/**/*.scss'
    ], 'css/')
    .then(function () {
      return buildCss([
        'src/demo/css/**/*.scss'
      ], 'demo/css/');
    })
    .then(function () {
      return new Promise(function (resolve, reject) {
        gulp.src(['css/**/*'])
          .pipe(gulp.dest('demo/css/'))
          .on('end', function () {
            resolve();
          });
      });
    });
});

gulp.task('build-demo-page', function (cb) {
  var colors;
  var src = 'src/css/background-color.scss';
  var re = /^.chrys\-background\-color\-(.+)\-(\d+)\-(\d+)$/i;
  // var re = /^.chrys__background\-color\-\-(.+)\-(\d+)\-(\d+)$/i;

  loadColors(src, re)
    .then(function (data) {
      colors = data;

      return fs.mkdirpAsync('demo/');
    })
    .then(function () {
      var res = nunjucks.render('src/demo/index.njk', {
        colors: colors
      }, function (err, res) {
        if (err) {
          console.log(err);
          cb();
        }
        else {
          fs.writeFileAsync('demo/index.html', res, 'utf8')
            .then(function () {
              cb();
            });
        }
      });
    });
});

gulp.task('build-demo-vendor', function () {
  return gulp.src([
      'node_modules/normalize-css/**/*.css'
    ])
    .pipe(gulp.dest('demo/css/'));
});

gulp.task('build-illustrator', function () {
  var src = 'src/css/background-color.scss';
  var re = /^.chrys\-background\-color\-(.+)\-(\d+)\-(\d+)$/i;
  // var re = /^.chrys__background\-color\-\-(.+)\-(\d+)\-(\d+)$/i;

  return loadColors(src, re)
    .then(function (data) {
      var palettes = [];

      _.forEach(data, function (sizes, name) {
        _.forEach(sizes, function (items, size) {
          var paletteName = name + '-' + _.trimStart(size, '_');

          palettes.push({
            name: paletteName,
            colors: _.map(items, function (item, index) {
              return {
                group: paletteName,
                name: paletteName + '-' + _.trimStart(index, '_'),
                rgb: chroma(item).rgb()
              };
            })
          });
        });
      });

      return Promise.mapSeries(palettes, function (palette) {
        var config = _.cloneDeep(gulpConfig.illustratorTasks.swatches);
        config.document.mode = 'rgb';
        config.colors = palette.colors;

        var dist = path.resolve('illustrator/' + palette.name + '.js');

        return illustratorSwatches(config, dist);
      });
    });
});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    'build-demo-scss',
    'build-demo-css',
    'build-demo-page',
    'build-demo-vendor',
    'build-illustrator',
    cb
  );
});

gulp.task('deploy', function () {
  return gulp.src('demo/**/*')
    .pipe(ghPages());
});

gulp.task('livereload', function () {
  runSequence(
    'build',
    'webserver-init',
    'livereload-init',
    'watch:livereload'
  );
});

/*******************************************************************************
 * Watch tasks
 ******************************************************************************/

// Watch with livereload that doesn't rebuild docs
gulp.task('watch:livereload', function (cb) {
  var livereloadTask = 'livereload-reload';

  _.forEach(gulpConfig.watchTasks, function (watchConfig) {
    var tasks = _.clone(watchConfig.tasks);
    tasks.push(livereloadTask);
    startWatch(watchConfig.files, tasks);
  });
});

/*******************************************************************************
 * Default task
 ******************************************************************************/

gulp.task('default', ['build']);
