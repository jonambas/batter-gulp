var gulp            = require('gulp'),
    sass            = require('gulp-ruby-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cleanCSS        = require('gulp-clean-css'),
    rename          = require('gulp-rename');

var cssTask = function() {
  return sass('./src/assets/scss/**/*.scss', { 
    style: 'expanded', 
    sourcemap: false 
  })
    .on('error', function(err) {
        notify.onError({
            title: 'Sass Error!',
            message: '<%= error.message %>',
            sound: 'Basso'
        })(err);
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/public/css'))
    .pipe(cleanCSS({processImport: false}))
    .pipe(rename({suffix: '.min' }))
    .pipe(gulp.dest('./dist/public/css'));
}

gulp.task('css', cssTask);
module.exports = cssTask;