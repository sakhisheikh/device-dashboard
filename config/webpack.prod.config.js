const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

// Plugins
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.config');
const presetConfig = require("./presets/loadPresets");

const prodConfiguration = function (version, platform, presets) {
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
      ],
      output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'build'),
        publicPath: '/',
      },
    },
    presetConfig({ mode: 'production', presets })
  ]);
}

module.exports = function (env) {
  return merge(baseConfig(env), prodConfiguration(env.VERSION, env.PLATFORM, env.presets))
}