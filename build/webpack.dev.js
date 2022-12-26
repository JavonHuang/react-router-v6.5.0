// webpack.dev.js
const path = require('path')
const config = require('./config')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop')
const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient')
const baseConfig = require('./webpack.base.js')

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 源码调试模式,后面会讲
  devServer: {
    static: {
      directory: config.templatePublicPath, //托管静态资源public文件夹
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      //禁止error浏览器页面显示
      overlay: {
        entry: webpackDevClientEntry,
        // module: reactRefreshOverlayEntry,//开启后会导致，热更新process is not defined
        sockIntegration: false
      }
    }), // 添加热更新插件
  ]
})