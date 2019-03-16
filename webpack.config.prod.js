var path = require('path'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',
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
				include: path.resolve(__dirname, 'src'),
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
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]((?!@material-ui).)+/
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin(),

		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false
		})
	]
};
