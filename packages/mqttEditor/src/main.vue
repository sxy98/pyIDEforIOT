<template>
  <div class="mqttEditor-wrapper">
    <div class="py-config-placeholder"></div>
    <div class="py-script-placeholder"></div>
    <div class="IDE-wrapper">
      <div class="codemirror">
        <codemirror
          v-model="code"
          :options="cmOption"
        />
      </div>
      <div class="btnCol">
        <button class="run" @click="run">
          运行<i class="icon-run"></i>
        </button>
      </div>
      <div class="py-terminal-placeholder"></div>
    </div>
  </div>
</template>

<script>
import * as mqtt from "mqtt/dist/mqtt.min"
// 创建客户端实例
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // 认证信息
  clientId: 'emqx_test',
}
let client = null
function mqttConnect(url, topic) {
  client = mqtt.connect(url, options)
  // eslint-disable-next-line no-undef
  const onmessage = pyodideGlobals.get('onMessage');
  client.on('connect', () => {
    console.log('Connected')
    // 订阅主题
    client.subscribe(topic, (err) => {
      // eslint-disable-next-line no-undef
      const funError = pyodideGlobals.get('onError');
      if (!err) {
        // 发布消息
        funError('Connected Success')
      } else {
        funError(err)
      }
    })
  })
  // 接收消息
  client.on('message', (topic, message) => {
    // message is Buffer
    console.log(topic, message.toString())
    onmessage(topic, message.toString())
    // client.end()
  })
}
function createObject(object, variableName) {
  // Bind a variable whose name is the string variableName
  // to the object called 'object'
  const execString = variableName + " = object"
  console.log("Running '" + execString + "'");
  // eslint-disable-next-line no-eval
  eval(execString)
}
</script>
<script>
import { loadScriptsFromDirectory } from '../../../public/util.js'
import { codemirror } from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'
// language
import 'codemirror/mode/python/python.js'
// theme css
import 'codemirror/theme/base16-light.css'

// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// closebrackets
import 'codemirror/addon/edit/closebrackets.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/emacs.js'

export default {
  name: 'MqttEditor',
  components: {
    codemirror
  },
  data() {
    return {
      code:
`print('*************************************************************************')
print('*****************软件研发部全体成员祝贺云开乔迁之喜*************************')
print('*************************************************************************')
print('***python在线编辑器，可以在线完成python教学任务，学生可以在线免安装编程学习***')
print('***python在线开发还可以和物联网教学结合，通过连接MQTT，完成设备数据展示和控制*')
print('***python在线开发还可以跟influxDB结合，完成大数据查询、处理方面的教学********')
print('***python在线开发也可以跟电商配合，完成市场运营数据方面的查询、分析的教学*****')
print('*******************下面展示一下与物联网教学配合连接MQTT*********************')
print('*************************************************************************')
from js import mqttConnect
from js import createObject
from pyodide.ffi import create_proxy
createObject(create_proxy(globals()), "pyodideGlobals")
def onMessage(topic, message):
   print('收到来自:'+topic+'的消息:'+message)

def onError(message):
   print('连接信息:'+message)

mqttConnect('ws://broker.emqx.io:8083/mqtt','/pyIDEforIOT/data')

`,
      cmOption: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-python',
        theme: 'base16-light',
        keyMap: "emacs"
      }
    }
  },
  async mounted() {
    this.configHandel()
    this.terminalHandel()
    this.scriptHandel()
    await loadScriptsFromDirectory('https://pyscript.net/latest/pyscript.js')
  },
  methods: {
    scriptHandel() {
      const placeholder = this.$el.querySelector('.py-script-placeholder');
      const Element = document.createElement('py-script');
      Element.textContent = this.code;
      placeholder && placeholder.replaceWith(Element);
    },
    configHandel() {
      const placeholder = this.$el.querySelector('.py-config-placeholder');
      const Element = document.createElement('py-config');
      Element.textContent =
        `
          terminal = false
        `;
      placeholder && placeholder.replaceWith(Element);
    },
    terminalHandel() {
      const placeholder = this.$el.querySelector('.py-terminal-placeholder');
      const Element = document.createElement('py-terminal');
      placeholder && placeholder.replaceWith(Element);
    },
    // 运行
    run() {
      console.log(this)
      // eslint-disable-next-line no-undef
      pyscript.interpreter.run(this.code)
    }
  }
};
</script>

<style scoped lang="scss">
.mqttEditor-wrapper{
  height: 100%;
  .IDE-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .btnCol{
    flex-shrink: 0;
    padding: 10px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .run{
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      width: 80px;
      height: 40px;
      border-radius: 4px;
      i{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 4px;
        &.icon-run {
          background-image: url(../../../public/icon/run.png);
          background-size: 100%;
        }
      }
      &:hover{
        opacity: 0.9;
      }
    }
  }
  .codemirror{
    height: 100%;
    width: calc(50% - 100px);
  }
}
</style>
<style>
@import url("../../../public/pyscript.css");
.CodeMirror{
  height: 100%;
}
.vue-codemirror{
  width: 100%;
  height: 100%;
}
py-script, py-config{
  display: none;
}
py-terminal{
  height: 100%;
  width: 50%;
}
.py-terminal{
  background: #383f4b;
  color: #78cf8a;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
