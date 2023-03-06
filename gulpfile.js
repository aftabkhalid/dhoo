'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
//const clean = require('del');


// Paths
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
    //dest: "dist/css"
  },
  animate: {
    src: "src/css/swiper-bundle.min.css",
    //dest: "dist/css"
  }
};

// Clean dist folder
gulp.task('clean', function () {
  return gulp.src('dist/css', {read: false})
    .pipe(clean());
});

// Compile sass & css
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

gulp.task('animate', () => {
  return gulp.src([paths.animate.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('plugin', () => {
  return gulp.src([paths.plugin.src])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('plugin.css'))
    .pipe(gulp.dest('dist/css'));
});
//

gulp.task('default', gulp.series(['clean'],['styles'],['plugin'],['colors'],['swiper'],['animate']));