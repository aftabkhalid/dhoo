'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');

// gulp.task('styles', () => {
//   return gulp.src('src/scss/style.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(cssnano())
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('styles', () => {
//   return gulp.src([paths.sass.src, paths.plugin.src])
//     .pipe(sass().on('error', sass.logError))
//     .pipe(cssnano())
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('default', gulp.series(['styles']));

var paths = {
  sass: {
    src: "src/scss/style.scss",
    dest: "dist"
  },
  plugin: {
    src: "src/css/vendor/*.css",
    dest: "dist"
  },
  colors: {
    src: "src/scss/colors/grape.scss",
    dest: "dist"
  }
};

gulp.task('styles', () => {
  return gulp.src([paths.sass.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

gulp.task('colors', () => {
  return gulp.src([paths.colors.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

function pluginTask() {
  return gulp.src([paths.plugin.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('plugin.css'))
    .pipe(gulp.dest('dist'))
}

gulp.task('default', gulp.series(['styles'], [pluginTask], ['colors']));