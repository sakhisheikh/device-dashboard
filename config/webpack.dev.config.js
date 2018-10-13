const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const nodeConfig = require('./webpack.node.config');

module.exports = merge(baseConfig, nodeConfig)