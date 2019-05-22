var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var TerserPlugin = require('terser-webpack-plugin');
var CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
	mode: 'production',
	entry: ["~/@babel/polyfill", '@/js/index.js'],
	output: {
		path: path.resolve(__dirname, '../deploy'),
		filename: 'js/main.js'
	},
	optimization: {
		minimizer: [ new TerserPlugin(), new OptimizeCSSAssetsPlugin() ]
	},
	module: {
		rules: [
		{
			test: /\.vue$/,
			loader: 'vue-loader'
		},
		{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		},
		{
			test: /\.s?css$/i,
			use: [{ 
				loader: MiniCssExtractPlugin.loader
			}, 'css-loader', 'sass-loader']
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: {
				loader: 'file-loader',
			}
		},
		{
			test: /\.(png|svg|jpg|gif)$/,
			use: {
				loader: 'file-loader',
			}
		}]
	},
	plugins: [ new CleanWebpackPlugin(), new VueLoaderPlugin(), new CleanTerminalPlugin(), new HtmlWebpackPlugin(), new MiniCssExtractPlugin({filename: 'css/main.css'}) ],
	resolve: {
		extensions: [ '*', '.js', '.vue', '.json' ],
		modules: [ path.resolve(__dirname, '../src/js'), path.resolve(__dirname, '../node_modules') ],
		alias: {
			'~' : path.resolve(__dirname, '../node_modules'),
			'@' : path.resolve(__dirname, '../src')
		}
	}
};