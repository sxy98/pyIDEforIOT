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
import { codemirror } from 'vue-codemirror'
import { loadScriptsFromDirectory, loadCssFromDirectory } from '../../../public/util.js'
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

// 创建客户端实例
const options = {
  // Clean session
  clean: true,
  // 认证信息
  clientId: 'emqx_test',
}
let client = null
function mqttConnect(url, topic) {
  client = mqtt.connect(url, options)
  const onMessage = new CustomEvent('onMessage')
  const onError = new CustomEvent('onError')
  client.on('connect', () => {
    onMessage.data = {
      topic: 'js脚本', message: '连接成功'
    }
    document.dispatchEvent(onMessage)
    // 订阅主题
    client.subscribe(topic, (err) => {
      if (err) {
        onError.data = {
          message: err.message || '未知错误，连接失败'
        }
        document.dispatchEvent(onError)
      }
    })
  })
  // 发生错误
  client.on('error', (err) => {
    onError.data = {
      message: err.message || '未知错误，连接失败'
    }
    document.dispatchEvent(onError)
  })
  // 接收消息
  client.on('message', (topic, message) => {
    // message is Buffer
    onMessage.data = {
      topic, message: message.toString()
    }
    document.dispatchEvent(onMessage)
  })
  client.on('close', () => {
    onMessage.data = {
      topic: 'js脚本', message: '连接被关闭'
    }
    document.dispatchEvent(onMessage)
  })
}
export default {
  name: 'MqttEditor',
  components: {
    codemirror
  },
  data() {
    return {
      code:
`from js import document, Event
pydone = Event.new("py-done")
document.dispatchEvent(pydone)
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
  created() {
    loadCssFromDirectory('https://pyscript.net/latest/pyscript.css')
  },
  async mounted() {
    window.mqttConnect = mqttConnect
    const that = this
    const ev = new Event("message")
    document.addEventListener("py-done", () => {
      console.log('加载完成了')
      this.code = `print('*************************************************************************')
print('***python在线编辑器，可以在线完成python教学任务，学生可以在线免安装编程学习***')
print('***python在线开发还可以和物联网教学结合，通过连接MQTT，完成设备数据展示和控制*')
print('***python在线开发还可以跟influxDB结合，完成大数据查询、处理方面的教学********')
print('***python在线开发也可以跟电商配合，完成市场运营数据方面的查询、分析的教学*****')
from js import mqttConnect
from js import document
from pyodide.ffi.wrappers import add_event_listener

def onMessage(self):
  print('收到来自:'+self.data.topic+'的消息:'+self.data.message)

def onError(self):
  print('连接信息:', self.data.message)

add_event_listener(document, "onMessage", onMessage)
add_event_listener(document, "onError", onError)

mqttConnect('ws://broker.hivemq.com:8000/mqtt','/pyIDEforIOT/data')
`
      that.run()
    })
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
      Element.textContent = `
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
