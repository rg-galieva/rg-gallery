const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common.js');

module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    output: {
      filename: '[name].build.js',
      path: resolve(__dirname, './../../dist/dev'),
      publicPath: '/assets/',
    },
    mode: 'development',
    devServer: {
      historyApiFallback: true,
      compress: true,
      port: 5050,
      noInfo: false,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
  });
};
