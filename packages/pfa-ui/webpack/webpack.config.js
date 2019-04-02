// @flow
const path = require('path');
const getPlugins = require('./webpack-plugins');
const rules = require('./webpack-rules');
const helpers = require('./webpack-helpers');

module.exports = {
  mode: helpers.isProduction ? 'production' : 'development',
  entry: ['babel-polyfill', path.resolve(helpers.appsPath, 'index.jsx')],
  output: {
    filename: 'app-[hash].js',
    publicPath: '/',
    path: helpers.buildPath,
    globalObject: 'this',
  },
  plugins: getPlugins(),
  resolve: {
    alias: {
      apps: path.resolve(helpers.appsPath),
      shared: path.resolve(helpers.sourcePath, 'shared'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules,
  },
  devtool: helpers.isProduction ? false : 'inline-source-map',
  devServer: {
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: !helpers.isProduction,
  },
};
