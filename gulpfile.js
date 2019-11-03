var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function cssStyle(done){
  gulp.src('./sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole:true,
      outputStyle:"compressed"
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade:false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe( gulp.dest('./css/') )
    .pipe( browserSync.stream() );
  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchFiles(){
  gulp.watch("./sass/**/*", cssStyle);
  gulp.watch("./**/*.html", browserReload);
  gulp.watch("./**/*.php", browserReload);
  gulp.watch("./**/*.js", browserReload);
  gulp.watch("./**/*.png", browserReload);
}

gulp.task('default', gulp.parallel(sync, watchFiles));
