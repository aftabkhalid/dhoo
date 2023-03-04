'use strict';

/* Paths */
var path = {

  dist: {
    js: 'dist/js/',
    css: 'dist/css/',
    style: 'dist/css/',
    fontcss: 'dist/css/fonts/',
    colorcss: 'dist/css/colors/'
  },
  src: {
    js: 'src/js/',
    vendorjs: 'src/js/vendor/*.*',
    themejs: 'src/js/theme.js',
    style: 'src/scss/style.scss',
    fontcss: 'src/scss/fonts/*.*',
    colorcss: ['src/scss/colors/*.scss', 'src/scss/theme/_colors.scss'],
    vendorcss: 'src/css/vendor/*.*'
  },
  watch: {
    themejs: 'src/js/theme.js',
    vendorjs: 'src/js/vendor/*.*',
    css: ['src/scss/**/*.scss', '!src/scss/fonts/*.scss', '!src/scss/colors/*.scss', '!src/scss/theme/_colors.scss'],
    fontcss: 'src/scss/fonts/*.scss',
    colorcss: ['src/scss/colors/*.scss', 'src/scss/theme/_colors.scss'],
    vendorcss: 'src/css/vendor/*.*',
    user: 'src/scss/_user-variables.scss'
  },
  clean: {
    dist: 'dist/*',
  }
};

/* Include gulp and plugins */
var gulp = require('gulp'),
    reload = webserver.reload,
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    sassUnicode = require('gulp-sass-unicode'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    beautify = require('gulp-beautify'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    jsImport = require('gulp-js-import'),
    newer = require('gulp-newer'),
    replace = require('gulp-replace'),
    touch = require('gulp-touch-cmd');
    


/* Tasks */

// Compile theme styles
gulp.task('css:dist', function () {
  return gulp.src(path.src.style)
    .pipe(newer(path.dist.style))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass()
      .on('error', function (err) {
        sass.logError(err);
        this.emit('end');
      })
    )
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.style))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile font styles
gulp.task('fontcss:dist', function () {
  return gulp.src(path.src.fontcss)
    .pipe(newer(path.dist.fontcss))
    .pipe(plumber())
    .pipe(sass()
      .on('error', function (err) {
        sass.logError(err);
        this.emit('end');
      })
    )
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false, newline_between_rules: false }))
    .pipe(gulp.dest(path.dist.fontcss))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile color styles
gulp.task('colorcss:dist', function () {
  return gulp.src(path.src.colorcss)
    .pipe(plumber())
    .pipe(sass()
      .on('error', function (err) {
        sass.logError(err);
        this.emit('end');
      })
    )
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.dist.colorcss))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile vendor styles
gulp.task('vendorcss:dist', function () {
  return gulp.src(path.src.vendorcss)
    .pipe(concat('plugins.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.dist.css))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile vendor plugins js
gulp.task('pluginsjs:dist', function() {
    return gulp.src([
      'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
      path.src.vendorjs
    ])
    .pipe(jsImport({hideConsole: true}))
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile theme js
gulp.task('themejs:dist', function () {
  return gulp.src(path.src.themejs)
    .pipe(gulp.dest(path.dist.js))
    .pipe(plumber())
    //.pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .on('end', () => { reload(); });
});

// Remove catalog dev
gulp.task('clean:dist', function () {
  return del(path.clean.dist);
});

// Clear cache
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// Assembly Dist
gulp.task('build:dist',
    gulp.series('clean:dist',
      gulp.parallel(
      'css:dist',
      'fontcss:dist',
      'colorcss:dist',
      'vendorcss:dist',
      'pluginsjs:dist',
      'themejs:dist'
      )
    )
);

// Launching tasks when files change
gulp.task('watch', function () {
    gulp.watch(path.watch.css, gulp.series('css:dist'));
    gulp.watch(path.watch.fontcss, gulp.series('fontcss:dist'));
    gulp.watch(path.watch.colorcss, gulp.series('colorcss:dist'));
    gulp.watch(path.watch.vendorcss, gulp.series('vendorcss:dist'));
    gulp.watch(path.watch.vendorjs, gulp.series('pluginsjs:dist'));
    gulp.watch(path.watch.themejs, gulp.series('themejs:dist'));
    gulp.watch(path.watch.user, gulp.series('colorcss:dist'));
});

// Serve
gulp.task('serve', gulp.series(
    gulp.parallel('webserver','watch')
));

// Dist
gulp.task('build:dist', gulp.series(
    'build:dist'
));

// Default tasks
gulp.task('default', gulp.series(
    'build:dist',
    gulp.parallel('webserver','watch')
));
