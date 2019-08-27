import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import store from './store'
import axios from 'axios'
import Qs from 'qs'
import './assets/styles/iconfont/iconfont.js'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont/iconfont.css'
import './config/global'

import IconSvg from './pages/common/IconSvg'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs
Vue.component('icon-svg', IconSvg)

fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  render: h => h(App)
})

