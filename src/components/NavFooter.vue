<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="https://gitee.com/a920985146/" target="_blank">cyj个人主页</a><span>|</span>
      <a href="https://cn.vuejs.org/" target="_blank">vue官方文档</a><span>|</span>
      <a href="https://gitee.com/" target="_blank">码云 Gitee.com</a><span>|</span>
      <a href="https://www.csdn.net/" target="_blank">CSDN - 专业开发者社区</a>
    </div>
    <div class="copyright">
      Copyright ©2020 <span class="domain">cyj</span> All Rights Reserved.
    </div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'
  }
</script>
<style lang="scss" scoped>
  .footer{
    height: 234px;
    border-top: 4px solid #FF6600;
    background-color: #333333;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color: #999999;
        display: inline-block;
      }
      span{
        margin: 0 10px;
      }
      margin-bottom: 13px;
    }
    .copyright{
      .domain{
        color: #FF6600;
      }
    }
  }
</style>