// const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	// sass: ExtractTextPlugin.extract({
	// 	fallback: 'vue-style-loader',
	// 	use: 'css-loader!sass-loader'
	// }),
  postcss: [
	require('autoprefixer')({
	  browsers: ['last 3 versions']
	})
  ]
}
