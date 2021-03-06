var browsersync = require('browser-sync'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
//    sass = require('gulp-sass'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    lost = require('lost');


// BrowserSync
gulp.task('browser-sync', function() {
  browsersync({
    server: {
      baseDir: "./"
    },
    notify: false
  });
});


// Stylus
//gulp.task('sass', function() {
//  return gulp.src('src/css/**/*.*')
gulp.task('stylus', function() {
  return gulp.src('src/css/**/*.styl')
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.beep();
        console.log(err);
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss([
      lost()
    ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browsersync.reload({ stream: true }));
});


// JSHint
gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js/'))
});


gulp.watch('src/**/*.*', ['stylus', 'jshint']);

gulp.task('default', ['stylus', 'jshint', 'browser-sync']);
