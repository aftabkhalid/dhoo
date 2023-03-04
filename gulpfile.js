
// gulpfile.js
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");
    browserSync = require("browser-sync").create();

//Paths
var paths = {
  sass: {
    src: "src/scss/style.scss",
    dest: "css"
  },

  bootstrap: {
    src: "node_modules/bootstrap/scss/bootstrap.scss",
    dest: "css"
  },

  // Easily add additional paths
  // ,html: {
  //  src: '...',
  //  dest: '...'
  // }
};

function style() {
  return (
    gulp
      //.src([paths.sass.src, paths.bootstrap.src])
      .src(paths.sass.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.sass.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  );
}

//

// A simple task to reload the page
function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "/",
    }
  });
  gulp.watch("src/sass/**/*.scss", style);
  gulp.watch('/*.html').on('change', browserSync.reload)
}

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "/"
        }
    });
});

exports.style = style;
exports.watch = watch;
exports.copy = copyFiles(arr);