var path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'www'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-class-properties']
				}
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};
