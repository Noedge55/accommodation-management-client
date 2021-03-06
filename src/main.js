import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import store from './store'
import Qs from 'qs'
import axios from './myAxios'
import IconSvg from './pages/common/IconSvg'
import VueBetterScroll from 'vue2-better-scroll'
import eventBus from './config/eventBus'

import './assets/styles/iconfont/iconfont.js'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont/iconfont.css'

import global from './config/global.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs
Vue.prototype.$eventBus = eventBus
Vue.component('icon-svg', IconSvg)
Vue.use(VueBetterScroll)
Vue.use(global)
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  render: h => h(App)
})


// Vue.prototype.$axios.post("/am/test.html").then(function (res) {
//   if(res && res.data){
//     res = res.data
//     if(res.retCode == -999){
//       console.info("未登录")
//       store.commit("clearUser")
//       router.push("/toLogin")
//     }else {
//       console.info("已经登录")
//       let user = JSON.parse(sessionStorage.getItem("user"))
//       console.info(user)
//       store.commit("setUser",user)
//     }
//   }
// });
