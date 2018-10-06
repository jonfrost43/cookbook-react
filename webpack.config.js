var path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'www'),
		publicPath: '/',
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
		contentBase: 'www/',
		historyApiFallback: true
	}
};
