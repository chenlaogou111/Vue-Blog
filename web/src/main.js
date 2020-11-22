import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import http from './http';

Vue.directive('highlight', function (el) {
  /* hljs.configure({
    useBR: true
  }); */
  let blocks = el.querySelectorAll('pre');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

// 统配 css 文件
import "./assets/css/base.css";

Vue.use(ElementUI)
Vue.use(hljs.vuePlugin)

Vue.prototype.$http = http;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')