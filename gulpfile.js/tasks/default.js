var gulp = require('gulp');

var defaultTask = ['serve', 'html', 'javascript', 'watch'];
var buildTask = ['html', 'css', 'javascript'];

gulp.task('default', defaultTask);
gulp.task('build', buildTask);

module.exports = defaultTask;