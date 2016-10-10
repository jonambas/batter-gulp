var gulp            = require('gulp'),
    nunjucksRender  = require('gulp-nunjucks-render');

var htmlTask = function () {
  return gulp.src(['./src/views/*.html'])
    .pipe(nunjucksRender({
      path: ['./src/views/']
    }))
    .pipe(gulp.dest('./dist/'));
}

gulp.task('html', htmlTask);
module.exports = htmlTask;