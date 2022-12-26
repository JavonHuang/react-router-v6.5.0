const config = require("./../build/webpack.dev");
const webpack = require("webpack");
const compiler = webpack(config);
var WebpackDevServer = require('webpack-dev-server');

const devServer={
  port: 3000, // 服务端口号
  compress: false, // gzip压缩,开发环境不开启,提升热更新速度
  hot: true, // 开启热更新，后面会讲react模块热替换具体配置
  historyApiFallback: true, // 解决history路由404问题
  open:false,
}
const portfinder = require('portfinder');//自动查找可用端口

portfinder.basePort =devServer.port;
portfinder.getPort(async (err, port) => {
  if (err) {
    reject(err)
  } else { 
    config.devServer.port = port;
    var server = new WebpackDevServer({...config.devServer,...devServer}, compiler);
    await server.start();
    console.log('dev server is running');
  }
})