var path = require("path");
var webpack = require("webpack");
var assets_path = path.join('app', 'assets', 'javascripts');

var config = {
  context: path.resolve(assets_path),
  // the first js file loaded
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(assets_path)
  },
  eslint: {
    configFile: '.eslintrc'
  },
  externals: {
    jquery: 'var jQuery'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(assets_path)
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.js$/,
        loader: 'eslint'
      }
    ]
  }
};

module.exports = config;
