/* 
* @Author: Administrator
* @Date:   2016-12-26 18:20:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-10 18:23:06
*/

var webpack=require("webpack");
//commo.js依赖
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
//插入文件，新建html
var HtmlWebpackPlugin=require('html-webpack-plugin');
//分离css
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 添加样式前缀
var autoprefixer = require('autoprefixer');
//拷贝文件
var CopyWebpackPlugin=require('copy-webpack-plugin');
module.exports={
	
	//插件项
	plugins:[commonsPlugin],
	//页面入口文件配置
	entry:{
		index:'./app.js'
	},
	//入口文件输出配置
	output:{
		path:'dist',
		filename:'js/[name].js'
	},
	watch: true,
	//配置输出的html文件
	plugins:[new HtmlWebpackPlugin({
		title: 'app',
		filename: 'index.html',
		template:'index.html',
		inject:'head',
		hash: true
	}),new CopyWebpackPlugin([{
	    from: 'data',
	    to: 'data',
	}]),new CopyWebpackPlugin([{
	    from:'img',
	    to: 'img',
	}]),new ExtractTextPlugin(
	"css/[name].css",{allChunks: true,disable: false})],//配置css
	module:{
		//加载器配置
		loaders:[
			{test:/\.css$/,loader:ExtractTextPlugin.extract('style-loader','css-loader','postcss-loader')},
			
			{test:/\.(jpg|png|gif)$/,loader:'url-loader?limit=8192&name=../img/[name].[ext]'}
		]
	 },
	 //补前缀
	 postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
	//其它解决方案配置
	resolve:{
		//绝对路径
		root:'F:/CZR/project/ditu/gaode/',
		extensions:['','.js','.json','.scss'],
		alias:{
			jsrc:'js/',
			csrc:'css/',
			isrc:'img/'
		}
	}

	
};