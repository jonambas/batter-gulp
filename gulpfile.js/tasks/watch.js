var gulp = require('gulp');

var watchTask = function(){  
  gulp.watch('./src/assets/js/**/*.js',         ['javascript']);
  gulp.watch('./src/assets/scss/**/*.scss',     ['css']);
  gulp.watch('./src/views/**/*.html',           ['html']);
};

gulp.task('watch', watchTask);
module.exports = watchTask;