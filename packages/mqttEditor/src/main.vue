<template>
  <div class="mqttEditor-wrapper">
    <div class="py-script-placeholder"></div>
    <div class="codemirror">
      <codemirror
        v-model="code"
        :options="cmOption"
      />
    </div>
  </div>
</template>

<script>
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
`#!/usr/bin/python
# Write Python 3 code in this online editor and run it.
print("Hello, World!");
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
  mounted() {
    // 获取占位符元素
    const placeholder = this.$el.querySelector('.py-script-placeholder');
    // 创建 <py-script> 元素
    const pyScriptElement = document.createElement('py-script');
    pyScriptElement.textContent = this.code;
    // 替换占位符为 <py-script> 元素
    placeholder && placeholder.replaceWith(pyScriptElement);
  }
};
</script>

<style scoped lang="scss">
.mqttEditor-wrapper{
  height: 400px;
  .codemirror{
    display: flex;
  }
}
</style>
