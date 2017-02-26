const webpack = require('webpack');
const base = require('./webpack.base.config');
const vueConfig = require('./vue-loader.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';

const commonConfig = Object.assign({}, base, {
    plugins: (base.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"',
            'process.BROWSER': true
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            // inject: process.env.NODE_ENV !== 'production' ? 'body' : false,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            environment: process.env.NODE_ENV
        })
    ])
});

if (process.env.NODE_ENV === 'production'){

    // // 编译 .vue 文件时使用的 loader
    vueConfig.loaders = utils.cssLoaders({
        extract: isProduction
    })
    commonConfig.plugins.push(
        new ExtractTextPlugin('styles.[contenthash].css'),
        // this is needed in webpack 2 for minifying CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // minify JS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        })
    )
}

module.exports = commonConfig