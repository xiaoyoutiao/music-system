// import dependencies
import Vue from 'vue'
import axios from 'axios'
import http from './config/http'
import apis from './config/apis'
import weight from './config/weight'
// UI,style
import 'normalize.css'
import './element.config.js'
import './styles/index.scss'
import './assets/icon/iconfont.css'
// import module
import App from './App.vue'
import router from './router'
import store from './store/store'

// Config
Vue.config.productionTip = false
Vue.use(weight) // 弹窗组件
Vue.prototype.$axios = axios
Vue.prototype.$http = http
Vue.prototype.$apis = apis
new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
