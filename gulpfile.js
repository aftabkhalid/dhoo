'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function(){
  return gulp.src('src/scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist'))
});
