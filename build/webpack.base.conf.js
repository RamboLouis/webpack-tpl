const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist')
  },
  module: {
    rules: [
      // js文件
      {
        test: /\.js$/,
        // 排除依赖包文件夹
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      // 图片
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              // 把小于 0.1kb 的文件转成 Base64 的格式   size <= 0.1KB
              limit: 100,
              // 输出到 images 文件夹
              outputPath: 'images/'
            }
          },
          // 图片压缩
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpg/jpeg 图片
              mozjpeg: {
                progressive: true,
                // 压缩率
                quality: 65
              },
              // 压缩 png 图片
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      // 文字
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].min.[ext]',
            // 如果文字文件大小 <= 5KB, 使用 'base64'; 否则,输出 svg 文件
            limit: 5000,
            publicPath: 'fonts/',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  plugins: [
    // 自动打包html
    new HtmlWebpackPlugin({
      title: 'webpack 实战',
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'index.html'),
      minify: {
        // 删除空白符与换行符
        collapseWhitespace: true
      }
    }),
    // 清理文件夹
    new CleanWebpackPlugin()
  ],
  performance: false
}
