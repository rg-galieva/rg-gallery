const {resolve} = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const commonConfig = require('./common.js');

const PUBLIC_PATH = '/';

module.exports = function () {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',
    mode: 'production',
    output: {
      filename: '[name].build.[contenthash].js',
      path: resolve(__dirname, './../../dist'),
      publicPath: PUBLIC_PATH,
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(['dist', 'build'], {
        root: process.cwd(),
        verbose: true,
        dry: false,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CopyWebpackPlugin([
        {
          from: resolve(__dirname, './../deployFiles/'),
          to: './',
        },
      ])
    ],
  });
};
