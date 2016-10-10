var browserSync = require('browser-sync').create();
var gulp = require('gulp');

var serveTask = function() {
  browserSync.init({

      // Static Server
      server: {
        baseDir: "./dist"
      },

      // proxy: '',

      files: [
        './dist/public/css/*.css'
      ],

      ghostMode: {
          clicks: false,
          forms: false,
          scroll: false
      },
      
      notify: false,
      open: "external"
  });

  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/public/js/*.js').on('change', browserSync.reload);
}

gulp.task('serve', ['css'], serveTask);
module.exports = serveTask;