// 接口环境设置，cors和jsonp跨域使用，接口跨域不需要了
// 在开发环境下，项目的接口都写在后端人员的电脑上，前端请求服务端接口就属于跨域请求了。我们通过CORS或者JSONP的方式，解决了跨域请求的问题后，在开发环境请求服务端接口是需要写完整的接口地址的，比如这种形式：https://xxx.xxx.xxx/a/b。如果项目要部署到测试服务器或者线上服务器，那么服务端接口地址的域名就会改变，如果前端再一个个改项目里面所有的接口地址，那就太麻烦了，而且出错的概率也很大。所以设置接口环境变量，是为了提前把不同环境下的接口地址配置好，在不同环境都能正常调用服务端的接口。
let baseURL;
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'prev':
    baseURL = 'http://prev-mall-pre.springboot.cn/api';
    break;
  case 'prod':
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
}

export default {
  baseURL
}