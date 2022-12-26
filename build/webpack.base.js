// webpack.base.js
const path = require('path')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const WebpackBar = require('webpackbar');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')


module.exports = {
  entry: config.setPath('../src/index.tsx'), // 入口文件
  context: config.srcPath,
  // 打包文件出口
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path:config.outputPath, // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: config.publicPath, // 打包后文件的公共前缀路径
  },
  // cache: {
  //   type: 'filesystem', // 使用文件缓存，使用之后，修改webpack配置有时候，不生效
  // },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': config.srcPath,
    },
    modules: [config.nodeModulesPath], // 查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    new WebpackBar({
      color: "#85d",  // 默认green，进度条颜色支持HEX
      basic: false,   // 默认true，启用一个简单的日志报告器
      profile: false,  // 默认false，启用探查器。
    }),
    new HtmlWebpackPlugin({
      template: `${config.templatePublicPath}/index.html`, // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    ///处理process报错 start
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    ///处理process报错 end
  ],
  module: {
    rules: [
      {
        include: [config.srcPath], //只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx|js)$/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /.(scss|css)$/,//匹配 scss 文件
        use: [
          config.isDEV ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test:/.(png|jpg|jpeg|gif|svg|webp)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name][chunkhash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/fonts/[name][chunkhash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/media/[name][ext]', // 文件输出目录和命名
        },
      },
    ]
  }
}