import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 某些机型、某些浏览器上点击click事件会延迟300ms执行
import fastclick from 'fastclick'
// 设置样式在所有设备显示一样
import './assets/styles/reset.css'
// 1像素边框解决文件，用户高分辨率屏幕将像素边框自动变大
import './assets/styles/border.css'

Vue.config.productionTip = false
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
