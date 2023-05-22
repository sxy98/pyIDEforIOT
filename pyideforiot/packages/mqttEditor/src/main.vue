<template>
  <div>
    <div class="py-script-placeholder"></div>
  </div>
</template>

<script>
export default {
  name: 'MqttEditor',
  mounted() {
    // 获取占位符元素
    const placeholder = this.$el.querySelector('.py-script-placeholder');
    // 创建 <py-script> 元素
    const pyScriptElement = document.createElement('py-script');
    pyScriptElement.textContent = ` print('Now you can!') `;
    // 替换占位符为 <py-script> 元素
    placeholder && placeholder.replaceWith(pyScriptElement);
  }
};
</script>
