import Vue from 'vue';
import App from './App.vue';
import Pyideforiot from '../packages'
import router from './router';
import './styles/index.scss';

import store from './store';

Vue.use(Pyideforiot)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
