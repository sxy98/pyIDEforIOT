/**
 * 动态加载css文件
 * @param {*} url
 * @param {*} isCache
 */
export function loadCSS(url,isCache=false) {
  let element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  if (isCache) {
    element.setAttribute("href", url + "?t=" + new Date().getTime());
  } else {
    element.setAttribute("href", url);
  }
  document.head.appendChild(element);
}

/**
 * 动态加载js文件
 */
export function  loadScriptsFromDirectory(directory) {
  return new Promise((resolve, reject) => {
    // 创建一个 <script> 标签
    const script = document.createElement('script');
    // 监听脚本加载完成的事件
    script.onload = () => {
      resolve();
    };
    // 监听脚本加载错误的事件
    script.onerror = () => {
      reject(new Error(`Failed to load script from ${directory}`));
    };
    // 设置脚本的 MqttEditor 属性为目录路径
    script.src = directory;
    // 将 <script> 标签添加到 <head> 中，开始加载脚本
    document.head.appendChild(script);
  });
}

/**
 * 动态加载css文件
 */
export function  loadCssFromDirectory(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}



