'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
var clean = require('gulp-clean');

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
  },
  plugin: {
    src: 'src/css/vendor/*.css',
  },
  colors: {
    src: "src/scss/colors/grape.scss",
  },
  swiper: {
    src: "src/css/swiper-bundle.min.css",
    dest: "dist/css"
  },
  clean: {
    dist: 'dist/css/*',
  }
};

gulp.task('clean', () => {
  return gulp.src([paths.clean.dist])
});

gulp.task('styles', () => {
  return gulp.src([paths.sass.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('colors', () => {
  return gulp.src([paths.colors.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('swiper', () => {
  return gulp.src([paths.swiper.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('plugin', () => {
  return gulp.src([paths.plugin.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('plugin.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('default', gulp.series(['styles'],['plugin'],['colors'],['swiper']));