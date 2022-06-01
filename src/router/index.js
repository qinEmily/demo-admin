import Vue from "vue";
import VueRouter from "vue-router";
//导入需要的组件
import MyHome from '../components/MyHome'
import MyLogin from '../components/MyLogin'
import Users from '../components/menus/MyUsers'
import Rights from '../components/menus/MyRights'
import Goods from '../components/menus/MyGoods'
import Orders from '../components/menus/MyOrders'
import Settings from '../components/menus/MySettings'
import UserDetail from '../components/user/MyUserDetail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: MyLogin },
    {
      path: '/home', component: MyHome, redirect: '/home/users',
      children: [
        //嵌套路由
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'settings', component: Settings },
        //用户详情页
        { path: 'userdetail/:id', component: UserDetail }
      ]
    },
  ]
})
//全局前置守卫(权限管理)
router.beforeEach((to, from, next) => {
  const pathArr = ['/home', '/home/users', '/home/rights']
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router