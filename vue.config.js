// vue.config.js就是整个webpack的配置表，会在webpack加载,最终会把它传给node.js去实现的
// 这里是node.js服务器，遵循commonJS规范，所以不用import引入，而用module.exports导入模块。
// 接口代理：它就是我们自己的接口，但是内部会通过node.js去转发别人的服务。跨域只有在前端浏览器才会存在，因为这是浏览器自己的安全策略，它不允许你通过localhost域名去调用其他网站的接口
module.exports = {
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
        // 当发起的请求包含'/api'时，请求就会经过代理服务器，例如：项目发起的请求地址是：'http://localhost:8000/api'经过代理服务器就变成了：'http://mall-pre.springboot.cn/api'
        target:'http://mall-pre.springboot.cn',
        changeOrigin:true,//changeOrigin是否改变主机头，是否允许跨域。
        pathRewrite:{
          // 重写请求，比如我们源访问的包含/api，那么请求会将/api替换为空。通俗讲就是前端发起了一个/api/login请求，通过代理会转发到/login接口，而不是/api/login，会自动把api去掉。
          '/api':''
        }
      }
    }
  },
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false, // 关闭eslint校验
  productionSourceMap:false, //关闭源码的展示，加速打包构建和安全
  chainWebpack:(config) => {
    config.plugins.delete('prefetch'); // 删除预加载
  }
}