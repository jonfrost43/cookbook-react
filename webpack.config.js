var path = require('path');

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
					presets: ['es2015', 'react']
				}
			}
		]
	},
	devServer: {
		contentBase: 'www/',
		historyApiFallback: true
	}
};
