const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .include.add(resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => options)
  },
  productionSourceMap: false
}
