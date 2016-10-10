var webpack = require('webpack');
var argv = require('yargs').argv;

module.exports = {
  context: process.env.PWD,
  entry: "./src/assets/js/entry",
  
  output: {
    path: "./dist/public/js",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel', 
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  },

  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  },

  // --prod flag
  plugins: argv.prod ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ] : []
};