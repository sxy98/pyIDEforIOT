/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const outputPath = 'lib'
const chalk = require('chalk')

module.exports = {
  getAssetsPath (_path = '.') { // 获取资源路径
    return path.posix.join(outputPath, _path)
  },
  resolve (_path) { // 进入路径
    return _path ? path.resolve(__dirname, _path) : path.resolve(__dirname, '..', outputPath)
  },
  isProduct: ['production', 'prod'].includes(process.env.NODE_ENV),
  env: process.env.NODE_ENV,
  chalkConsole: { // 打印内容
    success: () => {
      console.log(chalk.green('========================================='))
      console.log(chalk.green('========打包成功(build success)!========='))
      console.log(chalk.green('========================================='))
    },
    building: (index, total) => {
      console.log(chalk.blue(`正在打包第${index}/${total}个文件...`))
    }
  },
  fsExistsSync: (_path) => {
    try {
      fs.accessSync(_path, fs.F_OK)
    } catch (e) {
      return false
    }
    return true
  },
  move: (origin, target) => {
    const resolve = (dir) => path.resolve(__dirname, '..', dir)
    fs.rename(resolve(origin), resolve(target), function (err) {
      if (err) {
        throw err
      }
    })
  },
  fileDisplay: function fileDisplay (filePath, callback) { // 递归文件夹
    // 根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, (err, files) => {
      if (!err) {
        // 遍历读取到的文件列表
        files.forEach((filename) => {
          // 获取当前文件的绝对路径
          const fileDir = path.join(filePath, filename)
          // 根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(fileDir, (error, stats) => {
            if (!error) {
              const isFile = stats.isFile() // 是文件
              const isDir = stats.isDirectory() // 是文件夹
              isFile ? callback(fileDir) : fileDisplay(fileDir, callback) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          })
        })
      }
    })
  }
}
