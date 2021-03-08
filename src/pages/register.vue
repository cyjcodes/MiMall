<template>
  <div class="register">
    <div class="container">
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="register-form">
          <div class="logo-area">
            <a class="milogo" href="/#/index"><img src="https://account.xiaomi.com/static/res/349d9c1/account-static/respassport/acc-2014/img/milogo.png" alt="小米logo"></a>
          </div>
          <div class="title">
            <h4>注册帐号</h4>
          </div>
          <div class="account">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="password">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="register">注册</a>
          </div>
          <div class="tips">
            <div class="msg">已阅读并同意：用户协议和隐私政策</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://gitee.com/a920985146/" target="_blank">cyj个人主页</a><span>|</span>
        <a href="https://cn.vuejs.org/" target="_blank">vue官方文档</a><span>|</span>
        <a href="https://gitee.com/" target="_blank">码云 Gitee.com</a><span>|</span>
        <a href="https://www.csdn.net/" target="_blank">CSDN - 专业开发者社区</a>
      </div>
      <p class="copyright">Copyright ©2020 www.cyjcoder.cn All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  // 简析：data:{}全局对象，data(){}局部对象
  name: 'register',
  data(){
    return {
      username:'',
      password:'',
      userId:''
    }
  },
  methods:{
    login(){
      let { username,password } = this;
      if (!this.username) {
        this.$message.warning('登陆名不能为空')
        return
      } else if (!this.password) {
        this.$message.warning('密码不能为空')
        return
      }
      this.axios.post('/user/login',{
        username,
        password
      }).then((res)=>{
        this.$cookie.set('userId',res.id,{expires:'Session'}); // 设置过期时间会Session，关闭浏览器（进程也要杀掉）后过期
        // this.$store.dispatch('saveUserName',res.username);
        this.saveUserName(res.username);
        this.$router.push({
          name:'index',
          params:{
            from:'login'
          }
        });
      })
    },
    ...mapActions(['saveUserName']),
    register(){
      let { username,password } = this;
      this.axios.post('/user/register',{
        username,
        password
      }).then(()=>{
        this.$message.success('注册成功');
        this.login();
      }).catch(()=>{
        if (!this.username) {
          this.$message.warning('注册名不能为空')
          return
        } else if (!this.password) {
          this.$message.warning('密码不能为空')
          return
        }
      })
    }
  }
}
</script>
<style lang="scss">
// 引入的样式文件是全局的，除非加了scoped。config和mixin他们本身不是页面样式，他们是定义的变量，用来做扩展的
body{
    background: #f9f9f9;
}
.register{
  &>.container{
    height:113px;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    .container{
      height:576px;
      .register-form{
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 854px;
        height: 563px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .logo-area {
          padding-bottom: 40px;
          display: block;
          .milogo {
            width: 49px;
            height: 48px;
            margin: 0 auto;
            display: block;
            cursor: default;
            img{
              cursor: pointer;
            }
          }
        }
        .title{
          font-size: 30px;
          font-weight: normal;
          text-align: center;
        }
        .account,.password{
          margin: 39px auto;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 16px;
            font-size: 16px;
          }
        }
        .btn-box{
          text-align: center;
          .btn{
            width: 348px;
            height: 50px;
            line-height:50px;
            margin-top:20px;
            font-size:16px;
            }
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .msg{
            padding-top: 80px;
            color:#999999;
            margin: auto;
            cursor: default;
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    margin-top: 80px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>