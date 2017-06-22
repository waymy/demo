var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  entry:  {
    main:__dirname + "/app/main.js",
    vendor: 'moment'
  },//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: '[name].js',//打包后输出文件的文件名
  },//添加我们的插件 会自动生成一个html文件
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.css$/,
        //use: [ 'style-loader', 'css-loader' ]
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: __dirname + "/app/",
        query: {
          presets: ['es2015']
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // 指定公共 bundle 的名字。
    }),
    //压缩js代理
    new webpack.optimize.UglifyJsPlugin({
    })
  ]
}