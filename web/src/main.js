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

// 格式化时间戳
Vue.filter('dateFormat', function (dateStr, pattern = '') {
  let dt = new Date(dateStr)
  // yyyy-mm-dd
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, '0');
  var d = dt.getDate().toString().padStart(2, '0');

  if (pattern.toLocaleLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`;
  } else {
    var hh = dt.getHours().toString().padStart(2, '0');
    var mm = dt.getMinutes().toString().padStart(2, '0');
    var sec = dt.getSeconds().toString().padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}:${sec}`;
  }
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