# webpack-tpl

基于webpack4 搭建的模板

* 安装 webpack 所需依赖

```
npm i webpack webpack-cli webpack-dev-server --save-dev
```

* 安装 babel7，因为主要是用 ES6 来编写代码，所以需要转译

```
npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime --save-dev

npm i @babel/polyfill @babel/runtime
```

* 新建 `.babelrc` 文件 来配置 babel 插件，代码如下：

```
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

如果遇到错误
```
WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option. 
 
You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands: 
 
  npm install --save core-js@2    npm install --save core-js@3 
  yarn add core-js@2              yarn add core-js@3
```

需要安装

```
npm install --save core-js@3 
```

还需要在 `.babelrc` 设置 "corejs": 3

```
{
 "presets": [
   [
     "@babel/preset-env",
     {
       "useBuiltIns": "usage",
       "corejs": 3
     }
   ]
 ],
 "plugins": ["@babel/plugin-transform-runtime"]
}
```

* 新建 `.browserslistrc` 文件配置该项目所支持的浏览器版本

也可以写在 package.json 中写

```
"browserslist": [
    "> 1%",
    "last 2 version",
    "not ie <= 8"
]
```

```
# 全球使用情况统计选择的浏览器版本
> 1%

# 每个浏览器的最后两个版本
last 2 version

# 排除小于 ie8 以下的浏览器
not ie <= 8
```

* 安装自动生成 html 依赖

```
npm i html-webpack-plugin html-loader clean-webpack-plugin --save-dev
```

* 安装 css/scss 处理依赖

css

```
npm i css-loader style-loader --save-dev
// 将 css 单独打包成文件
npm i mini-css-extract-plugin --save-dev
// 压缩 css
npm i optimize-css-assets-webpack-plugin --save-dev

```

scss

```
npm i node-sass sass-loader --save-dev
```

* 为不同内核的浏览器加上 css 前缀

```
npm i postcss-loader autoprefixer --save-dev
```

```
{
  loader: 'postcss-loader',
  options: {
    plugins: [require('autoprefixer')]
  }
}
```

配置`postcss-loader`文件时，可以新建 `postcss.config.js` 配置文件

```
module.exports = {
  plugins: [require('autoprefixer')]
}
```

* 清除项目中没有使用的 css 代码

PurifyCSS将帮助我们进行 CSS Tree Shaking 操作。为了能准确指明要进行 Tree Shaking 的 CSS 文件，还有 glob-all （另一个第三方库）。
glob-all 的作用就是帮助 PurifyCSS 进行路径处理，定位要做 Tree Shaking 的路径文件。

```
npm i glob-all purify-css purifycss-webpack --save-dev
```

* 安装对图片及字体的处理

```
npm i url-loader file-loader image-webpack-loader --save-dev
```

开发模式（development）下，需要加快编译的速度，可以热更新以及设置跨域地址，开启源码调试(devtool: 'source-map')

生产模式（production）下，则需要压缩 js/css 代码，拆分公共代码段，拆分第三方 js 库等操作

所以这里的配置分成三个文件来写，一个是基础配置，一个是开发配置，一个是生产配置

即：webpack.base.conf.js(基础配置)、webpack.dev.conf.js(开发配置)、webpack.prod.conf.js(生产配置)

也需要使用到一个插件，webpack-merge 用来合并配置.

即：开发环境就合并开发配置 + 基础配置，
生产就合并生产配置 + 基础配置
```
npm i webpack-merge --save-dev
```
