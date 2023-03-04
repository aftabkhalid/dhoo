'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
   return gulp.src('./src/scss/style.scss')
   .pipe(concat('abc.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./dist'));
});