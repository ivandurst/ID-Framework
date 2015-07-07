/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-concat gulp-cache del gulp-livereload gulp-webserver gulp-file-include gulp-plumber gulp-connect-php --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    fileinclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect-php'),
    // path vars
    paths = {},
    publicFolder = 'public';

    // cd to public
    process.chdir(publicFolder);

// Styles
gulp.task('styles', function() {
return sass('scss/main.scss', {style: 'expanded'})
    .pipe(plumber())
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  gulp.src('js/main.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// partials
gulp.task('fileinclude', function() {
  gulp.src([
    'templates/**/*.html',
    '!templates/partials/*'
  ])
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'templates/partials'
    }))
    .pipe(gulp.dest('./'));
});

// webserver
gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      port: 4003,
      livereload: true,
      open: true
    }));
});

// php server - TODO integrate with webserver/livereload
gulp.task('connect-php', function() {
  connect.server({
    port: 8004,
    base: './'
  });
});

// Clean
gulp.task('clean', function(cb) {
    del(['css/main.min.css', 'js/main.min.js'], cb)
});

// Clear cache
gulp.task('uncache', function() {
    cache.clearAll();
});

// Default task
gulp.task('default', ['webserver', 'connect-php', 'watch'], function() {

});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('scss/**/*', ['styles']);

  // Watch .js files
  gulp.watch('js/main.js', ['scripts']);

  // Watch .html files
  gulp.watch('templates/**/*', ['fileinclude']);

});
