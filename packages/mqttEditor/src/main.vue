<template>
  <div class="mqttEditor-wrapper">
    <div class="py-script-placeholder"></div>
    <div class="codemirror">
      <codemirror
        v-model="code"
        :options="cmOption"
      />
      <button class="run" @click="run">
        运行<i class="icon-run"></i>
      </button>
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
`# Write Python 3 code in this online editor and run it.
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
  },
  methods: {
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
  height: 400px;
  .codemirror{
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
}
</style>
<style>
.CodeMirror{
  height: 100%;
}
.vue-codemirror{
  width: 100%;
  height: calc(100% - 50px);
}
py-script{
  display: none;
}
.py-terminal{
  background: #383f4b;
  color: #78cf8a;
}
</style>
