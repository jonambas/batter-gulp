var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    webpack       = require('webpack'),
    argv          = require('yargs').argv,
    config        = require('../webpack.config');

var javascriptTask = function (callback) {

  var message = 'Building for ' + (argv.prod ? 'Production' : 'Development');
  gutil.log(gutil.colors.blue(message));

  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[Webpack]", stats.toString({
        chunks: false
    }));

    callback();
  });
};

gulp.task('javascript', javascriptTask);
module.exports = javascriptTask;