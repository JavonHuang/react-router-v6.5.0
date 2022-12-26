// 导入webpack模块
const webpack = require('webpack');
const config = require('./../build/webpack.prod');// 读取webpack.prod.js文件中的配置

// 导出的webpack其实是一个函数
webpack(config, (err, stats) => {
    if(err || stats.hasErrors()) {
        // 构建过程出错
        console.log(err);
    }
    // 成功构建
    console.log('build success');
})
