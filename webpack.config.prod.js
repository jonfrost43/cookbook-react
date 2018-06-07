var path = require('path'),
	webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'www'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
					plugins: [
						'transform-class-properties',
						'transform-object-rest-spread'
					]
				}
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader']
			}
		]
	}
};
