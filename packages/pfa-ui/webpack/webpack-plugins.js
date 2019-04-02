// @flow
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const helpers = require('./webpack-helpers');

module.exports = () => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(helpers.nodeEnv),
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(helpers.appsPath, 'index.html'),
      path: helpers.buildPath,
      filename: 'index.html',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: './../bundle-report.html',
    }),
  ];

  if (!helpers.isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (helpers.isProduction) {
    plugins.unshift(
      new CleanWebpackPlugin([helpers.buildPath], {
        root: helpers.projectPath,
        verbose: false,
        dry: false,
      }),
    );
  }

  return plugins;
};
