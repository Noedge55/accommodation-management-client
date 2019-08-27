import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/',
      name: 'Home',
      meta:{
        requireAuth:true,
      },
      component: Home
    }
  ]
})

router.beforeEach(function (to, from, next) {
  console.info("to:")
  console.info(to)
  if(to.meta.requireAuth){
    console.info(sessionStorage.getItem("user"))
    if(sessionStorage.getItem("user")) {
      next()
    }else {
      next({
        path:'/login',
        query: {redirect: to.fullPath}
      })
    }
  }else {
    next()
  }
});

export default router
