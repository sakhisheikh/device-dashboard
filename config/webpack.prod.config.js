const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

// Plugins
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require('./webpack.base.config');

const prodConfiguration = function (version, platform) {
  return merge([
    {
      cache: true,
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|@material-ui)[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        },
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              mangle: {
                keep_fnames: true,
              },
            },
          })
        ],
      },
      plugins: [
        new CleanWebpackPlugin(['build'], { root: path.resolve(__dirname, '..'), verbose: true }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({ 'process.env.VERSION': JSON.stringify(version) }),
        new webpack.DefinePlugin({ 'process.env.PLATFORM': JSON.stringify(platform) }),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: './statistics.html' }),
        new MiniCssExtractPlugin({
          filename: 'style.[contenthash].css',
        }),
      ],
      output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'build'),
        publicPath: '/',
      },
    },
  ]);
}

module.exports = function (env) {
  return merge(baseConfig(env), prodConfiguration(env.VERSION, env.PLATFORM))
}