import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'

// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b ，当前跨域方式为接口跨域
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; //超时
// 根据环境变量获取不同的请求地址，cors和jsonp跨域使用，接口跨域不需要
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data;
  let path = location.hash;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    if (path != '#/index') {
      window.location.href = '/#/login';
    }
    return Promise.reject(res);// 抛出异常，防止认为为正常请求，直接通过到then
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  // 错误分两种，一种是接口的异常（业务的异常），一种是服务器的异常（请求得异常）。这里是服务器发来的报错，http状态码为500，来解决订单支付后，返回订单支付页会提示已支付
  // let res = error.response;
  // Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bubbles.svg'
});
Vue.prototype.$message = Message; // 先import，再通过Vue原型的方式扩展一个对象，把Message方法绑定上去，然后就可以全局运用，例如：this.$message.warning('用户名不能为空')
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
