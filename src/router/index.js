import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Order from '../pages/order/Order'
import Detail from "../pages/detail/Detail"
import Addition from "../pages/addition/Addition"

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
    },{
      path: '/toLogin',
      redirect: '/login'
    },{
      path: '/order/:personId',
      name: 'Order',
      meta: {
        requireAuth:true,
        keepAlive:false

      },
      component: Order
    },{
      path:'/detail',
      name:'Detail',
      meta:{
        requireAuth:true,
      },
      component:Detail
    },{
      path:'/addition',
      name:'Addition',
      meta:{
        requireAuth:true,
      },
      component:Addition
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
