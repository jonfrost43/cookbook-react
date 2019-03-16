var path = require('path'),
	CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'www/dist'),
		publicPath: '/dist/',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
					plugins: [
						'syntax-dynamic-import',
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
	},
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: 'www/dist/',
		historyApiFallback: true
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};
