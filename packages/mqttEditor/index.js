// packages/MqttEditor/index.js

// 导入组件，组件必须声明 name
import MqttEditor from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
MqttEditor.install = (Vue) => {
  Vue.component(MqttEditor.name, MqttEditor)
}

export default MqttEditor
