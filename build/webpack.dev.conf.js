const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const path = require('path')

const devConfig = {
  mode: 'development',
  output: {
    // js引用路径 或者 CDN 地址
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  // 调试源码
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    port: 8000,
    hot: true,
    open: true,
    overlay: true,
    proxy: {
      '/userInfo': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
          Cookie: ''
        }
      }
    },
    // 找不到页面默认跳index.html
    historyApiFallback: true
  },
  module: {
    rules: [
      // css文件
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 使用 <style> 标签注入 css
          'style-loader',
          'css-loader',
          // 使用 sass-loader 将 scss 转为 css
          'sass-loader',
          // 使用 postcss 为 css 加上浏览器前缀
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)
