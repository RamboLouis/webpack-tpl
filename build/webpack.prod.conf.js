const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const path = require('path')
// 将 css 单独打包成文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩 css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 净化 CSS
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

const prodConfig = {
  mode: 'production',
  output: {
    // js引用路径 或者 CDN 地址
    publicPath: './',
    // 打包后生产的 js 文件
    filename: '[name].[contenthash].js',
    // 代码拆分后的文件名
    chunkFilename: '[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // axios: {
        //   name: 'axios',
        //   // 用于规定缓存组匹配的文件位置
        //   test: /[\\/]node_modules[\\/]axios[\\/]/,
        //   // 分离规则的优先级，优先级越高，则优先匹配
        //   priority: 10
        // },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 使用 <link> 标签注入 css
          {
            loader: MiniCssExtractPlugin.loader
          },
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
    // 分离 CSS 文件
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].css'
    }),
    // 压缩 css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // 用于优化 / 最小化 CSS 的 CSS处理器，默认为 cssnano
      cssProcessor: require('cssnano'),
      // 传递给 cssProcessor 的选项，默认为{}
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      // 布尔值，指示插件是否可以将消息打印到控制台，默认为 true
      canPrint: true
    }),
    // 清除无用 css
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './*.html'),
        path.resolve(__dirname, './src/*.js')
      ])
    })
  ]
}

module.exports = merge(baseConfig, prodConfig)
