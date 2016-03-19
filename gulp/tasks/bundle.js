var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var stringify = require('stringify');
var ngAnnotate = require('browserify-ngannotate');
var yargs = require('yargs').argv;
var production = !!yargs.production;
var config = require('./config');

gulp.task('bundle', 'Bundle JavaScript app modules', function(done) {

  return gulp.src(config.bundle.entry)
    .pipe(
      browserify({
        debug: !production,
        transform: [
          stringify({
            extensions: ['.html'],
            minify: true
          }),
          ngAnnotate
        ]
      })
    )
    .pipe(rename(config.bundle.output))
    .pipe(gulp.dest(config.bundle.outputPath));
});
