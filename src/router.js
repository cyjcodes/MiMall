import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
Vue.use(Router);

export default new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:Home,
      // 首先我们加载页面的时候会先到home，home里有嵌套视图，节省每个页面去导入<nav-header>,各个路由共用home组件，通过重定向页面首先打开的是index页面
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'index',
          component: Index,
        }, {
          path: '/product/:id',
          name: 'product',
          // 路由懒加载是为了更好的用户体验，首屏组件加载的速度快一点，解决了白屏的问题.懒加载就是延迟加载或者按需加载.常用的懒加载有两种，vue异步组件和es的import.
          // component: resolve => require(['./pages/product.vue'],resolve),//vue异步组件
          component: () => import('./pages/product.vue') // 按需加载，如果用import引入的话，当项目打包时路由里的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对比较长。当你用es7语法的import这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js。
        }, {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('./pages/detail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue'),// 按需加载：es7语法的import
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/cart.vue')
    },
    
    {
      path: '/order',
      name: 'order',
      component: () => import('./pages/order.vue'),
      children:[
        {
          path: 'list',
          name: 'order-list',
          component: () => import('./pages/orderList.vue')
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('./pages/orderConfirm.vue')
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('./pages/orderPay.vue')
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('./pages/alipay.vue')
        }
      ]
    }
  ]
});