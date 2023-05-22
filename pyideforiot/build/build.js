/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { run } = require('runjs')
const rimraf = require('rimraf')
const componentsUtils = require('./utils/componentsUtils')
componentsUtils()
const componentsJson = require('../components.json')
const { getAssetsPath, chalkConsole, resolve, fsExistsSync, move, fileDisplay } = require('./utils')
const styleOutputPath = 'theme'
const whiteList = ['index', 'base']

const cssFiles = []
function build ({ input, output } = {}, index, arr) {
  chalkConsole.building(index + 1, arr.length)
  run(
    `vue-cli-service build --target lib --no-clean  --name ${output} --dest ${getAssetsPath()} ${input}`
  )
  cssFiles.push(`${output}.css`)
  // 删除组件index.js文件
  !whiteList.includes(output) && fs.unlinkSync(input)
}

const pkg = []

Object.keys(componentsJson).forEach((moduleName) => {
  const component = componentsJson[moduleName]
  const input = whiteList.includes(moduleName) ? component : `${component.slice(2)}/index.js`
  const basename = path.basename(component)
  const output = basename === 'src' ? 'index' : moduleName
  pkg.push({ input, output })
})
pkg.forEach(build)
// 删除多余文件
rimraf(getAssetsPath('./demo.html'), () => {})
// 创建样式文件夹
fs.mkdirSync(getAssetsPath(styleOutputPath))
// 拷贝css文件到单独目录
fs.writeFileSync(`${getAssetsPath(styleOutputPath)}/base.css`, '')
cssFiles.forEach((cssFile) => {
  const fileUrl = getAssetsPath(styleOutputPath + '/' + cssFile)
  if (fsExistsSync(getAssetsPath(cssFile))) {
    move(getAssetsPath(cssFile), fileUrl)
  } else {
    fs.writeFileSync(fileUrl, '') // 不存在css时补css
  }
})

rimraf(getAssetsPath('./base.js'), () => {})
rimraf(getAssetsPath('./base.umd.js'), () => {})
rimraf(getAssetsPath('./base.umd.min.js'), () => {})

// 重命名common文件
fileDisplay(getAssetsPath(), (file) => {
  const reg = /.common/
  if (reg.test(file)) {
    file = `../${file}`
    move(resolve(file), resolve(file.replace(reg, '')))
  }
})

chalkConsole.success()
