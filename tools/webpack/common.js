const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = function () {
	return {
		context: path.resolve(__dirname, './../../'),

		entry: {
			app: ["@babel/polyfill", './src/app/App.js'],
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.pcss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:base64:5]',
                importLoaders: 1
              }
            },
            'postcss-loader',
          ]
				},
				{
					test: /\.css$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ]
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: 'file-loader?name=[name].[ext]?[hash]',
						},
						{
							loader: 'svgo-loader',
							options: {
								plugins: [
									{removeTitle: true},
									{removeUselessDefs: false},
									{convertPathData: false},
									{removeAttrs: false},
									{cleanupIDs: false},
									{removeHiddenElems: false},
								],
							},
						},
					],
				},
				{
					test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$/,
					use: 'file-loader?name=[path][name].[ext]?[hash]'
				},
				{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
				}
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				title: 'Asana Pets',
				template: `${__dirname}/template.html`
			}),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].styles.[contenthash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
      })
		],
	};
};
