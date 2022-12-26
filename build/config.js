const isDEV = process.env.NODE_ENV === 'development'
const path = require('path')

const setPath = (str) =>path.join(__dirname, str)

module.exports = {
  setPath,
  srcPath:path.join(__dirname, '../src'),
  publicPath: '/',
  templatePublicPath: path.resolve(__dirname, '../public'),
  outputPath: path.resolve(__dirname, '../dist'),
  nodeModulesPath: path.resolve(__dirname, '../node_modules'),
  isDEV:isDEV
}