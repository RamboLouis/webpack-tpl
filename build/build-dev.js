const DevConfig = require('./webpack.dev.conf')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

new WebpackDevServer(Webpack(DevConfig), {
  // 用来指定上线时运行地址
  publicPath: '/',
  // 表示热加载，使用Inline:true可以自动刷新
  hot: true,
  // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
  noInfo: false,
  /*
  指的是当路径匹配的文件不存在时不出现404，也可以通过如下面设置指定
  当路径匹配的文件不存在时跳转的页面
   historyApiFallback:{
  				index:'build/index.html'
  		},
  */
  historyApiFallback: true,
  // 不检查host地址
  disableHostCheck: true
}).listen(8000, 'localhost', (err, result) => {
  if (err) {
    console.log('err:', err)
  }
  if (result) {
    console.log('result:', result)
  }
  console.log('Listening at localhost:8000')
})
