var _ = require('lodash');
var autoprefixer = require('autoprefixer');
var chroma = require('chroma-js');
var cssmin = require('gulp-cssmin');
var fs = require('fs-extra');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gulpPostcss = require('gulp-postcss');
var livereload = require('livereload');
var nunjucks = require('nunjucks');
var open = require('open');
var os = require('os');
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

var config = require('./gulp-config.js');

var livereloadOpen = (config.webserver.https ? 'https' : 'http') + '://' + config.webserver.host + ':' + config.webserver.port + (config.webserver.open ? config.webserver.open : '/');

/*******************************************************************************
 * Misc
 ******************************************************************************/

var flags = {
  livereloadInit: false // Whether `livereload-init` task has been run
};
var server;

// Choose browser for node-open.
var browser = config.webserver.browsers.default;
var platform = os.platform();
if (_.has(config.webserver.browsers, platform)) {
  browser = config.webserver.browsers[platform];
}

/*******************************************************************************
 * Functions
 ******************************************************************************/

/**
 *
 * @param  {String} src
 * @param  {String} dist
 * @return {Stream}
 */
function buildCss(src, dist) {
  return gulp
    .src(src)
    .pipe(sass(config.css.params).on('error', sass.logError))
    .pipe(gulpPostcss([
      autoprefixer(config.autoprefixer),
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
    .pipe(gulp.dest(dist));
}

/**
 *
 * @param   {String} src
 * @returns {Promise}
 */
function loadColors(src) {
  return new Promise(function (resolve, reject) {
    var colors = {};

    gulp
      .src(src)
      .pipe(sass(config.css.params).on('error', sass.logError))
      .pipe(through2.obj(function (chunk, enc, callback) {
        var data = chunk.contents.toString(enc);
        var root = postcss.parse(data);
        var rules = postcssJs.objectify(root);

        _.forEach(rules, function (value, key) {
          var matches = key.match(/^.chrys\-(.+)\-(\d+)\-(\d+)$/i);

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
  var conf = _.clone(config.webserver);
  conf.open = false;

  gulp.src('./')
    .pipe(webserver(conf))
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
    'demo/',
    'illustrator/'
  ], function (file) {
    return fs.removeAsync(file);
  });
});

gulp.task('build-demo-css', function (cb) {
  buildCss([
      'src/css/**/*.scss',
      'src/demo/css/**/*.scss'
    ], 'demo/css/')
    .on('end', cb);
});

gulp.task('build-demo-page', function (cb) {
  var colors;

  loadColors('src/css/chrys-bg.scss')
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
  return loadColors('src/css/chrys-bg.scss')
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

      return fs.readFileAsync('src/illustrator/swatches.js', 'utf8')
        .then(function (data) {
          return Promise.mapSeries(palettes, function (palette) {
            var illustratorConfig = {
              mode: 'rgb',
              colors: palette.colors
            };

            var str = 'var config = ' + JSON.stringify(illustratorConfig) + ';\n\n';

            return fs.outputFileAsync('illustrator/' + palette.name + '.js', str + data, 'utf8');
          });
        });
    });
});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
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

  _.forEach(config.watchTasks, function (watchConfig) {
    var tasks = _.clone(watchConfig.tasks);
    tasks.push(livereloadTask);
    startWatch(watchConfig.files, tasks);
  });
});

/*******************************************************************************
 * Default task
 ******************************************************************************/

gulp.task('default', ['build']);
