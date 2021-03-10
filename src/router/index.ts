import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/publicRouting/home/Home.vue'
import PublicRouting from '../views/publicRouting/PublicRouting.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'',
    component:PublicRouting,
    children:[
      {
        path:'',
        redirect:'/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页',
          icon:"https://demo.careyshop.cn/static/admin/image/theme/careyshop/logo/icon-only.png"
        }
      },
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: {
  //     title: "首页"
  //   }
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: "about",
      icon:"https://demo.careyshop.cn/static/admin/image/theme/careyshop/logo/icon-only.png"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: "登录",
      icon:"https://demo.careyshop.cn/static/admin/image/theme/careyshop/logo/icon-only.png"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta.title);
  // document.title = <string>(to.meta.icon)
  document.title = <string>(to.meta.title)
  if (to.path === '/login'){
    return next()
  }
  // 获取用户本地的token, 如果token不存在则跳转到登录页
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})


export default router
