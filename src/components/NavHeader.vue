<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="!username" @click="register">注册</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a v-bind:href="'/#/product/'+item.id" target="_blank"></a>
                  <div class="pro-img">
                    <img v-lazy="item.mainImage" :alt="item.subtitle">
                  </div>
                  <div class="pro-name">{{item.name}}</div>
                  <div class="pro-price">{{item.price | currency}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank"></a>
                  <div class="pro-img">
                    <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                  </div>
                  <div class="pro-name">小米壁画电视 65英寸</div>
                  <div class="pro-price">6999元</div>
                </li>
                <li class="product">
                  <a href="" target="_blank"></a>
                  <div class="pro-img">
                    <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                  </div>
                  <div class="pro-name">小米全面屏电视E55A</div>
                  <div class="pro-price">1999元</div>
                </li>
              </ul>
              <ul>
                <li class="product">
                  <a href="" target="_blank"></a>
                  <div class="pro-img">
                    <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                  </div>
                  <div class="pro-name">小米电视4A 32英寸</div>
                  <div class="pro-price">699元</div>
                </li>
                <li class="product">
                  <a href="" target="_blank"></a>
                  <div class="pro-img">
                    <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                  </div>
                  <div class="pro-name">小米电视4A 55英寸</div>
                  <div class="pro-price">1799元</div>
                </li>
              </ul>
              <ul>
                <li class="product">
                  <a href="" target="_blank"></a>
                  <div class="pro-img">
                    <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                  </div>
                  <div class="pro-name">小米电视4A 65英寸</div>
                  <div class="pro-price">2699元</div>
                </li>
                <li class="product">
                  <a href="" target="_blank"></a>
                  <div class="pro-img">
                    <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                  </div>
                  <div class="pro-name">查看全部</div>
                  <div class="pro-price">查看全部</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default{
    name:'nav-header',
    data(){
      return {
        phoneList:[]
      }
    },
    computed:{
      /*username(){
        return this.$store.state.username;
      },
      cartCount(){
        return this.$store.state.cartCount;
      }*/
      // mapState等于上面，封装了上面的方法，是一个辅助方法帮我们展开解构username，cartCount
      ...mapState(['username','cartCount'])
    },
    // 过滤器：对后两位数字进行四舍五入
    filters:{
      currency(val){
        if (!val)return '0.00';
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      this.getProductList();
      let params = this.$route.params;
      if (params && params.from == 'login') {
        this.getCartCount();
      }
    },
    methods:{
      login(){
        this.$router.push('/login');
      },
      register(){
      this.$router.push('/register');
      },
      getProductList(){
        this.axios.get('/products',{
          params:{
            categoryId:'100012',
            pageSize:6
          }
        }).then((res)=>{
          this.phoneList = res.list
        })
      },
      logout(){
        this.axios.post('/user/logout').then(()=>{
          this.$message.success('退出成功');
          this.$cookie.set('userId','',{expires:'-1'}); // 后端只是清除会话，前端清除cookie,立刻过期
          this.$store.dispatch('saveUserName',''); // 把vuex数据清空，用户名清空
          this.$store.dispatch('saveCartCount', '0');
        })
      },
      // 因为是单页面(App.vue)的，所以会把数据存储到vuex里面去,vuex实际上是去内存里面存储的，当刷新后内存里的数据会自动消失，为保持数据的一致性，需重新获取购物车的数量，重新存到vuex里，单页面单向跳转，登录退出不会再次执行App.vue
      getCartCount(){
        this.axios.get('/carts/products/sum').then((res=0)=>{//也加默认值，防止报错
          this.$store.dispatch('saveCartCount',res);
        })
      },
      goToCart(){
        // 动态路由（传参）：进行页面跳转
        this.$router.push('/cart');
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height:39px;
      line-height:39px;
      background-color:#333333;
      color:#B0B0B0;
      .container{
        @include flex();
        a{
          display:inline-block;
          color:#B0B0B0;
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:#FF6600;
          text-align:center;
          color:#ffffff;
          margin-right:0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right:4px;
          }
        }
      }
    }
    .nav-header{
      .container{
        position:relative;
        height:112px;
        @include flex();
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          .item-menu{
            display:inline-block;
            color:#333333;
            font-weight:bold;
            font-size:16px;
            line-height:112px;
            margin-right:20px;
            span{
              cursor:pointer;
            }
            &:hover{
              color:$colorA;
              .children{
                height:220px;
                opacity:1;
              }
            }
            .children{
              position:absolute;
              top:112px;
              left:0;
              width:1226px;
              height:0;
              opacity:0;
              overflow:hidden;
              border-top:1px solid #E5E5E5;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              transition:all .5s;
              background-color: #ffffff;
              .product{
                position:relative;
                float:left;
                width:16.6%;
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;
                a{
                  display:inline-block;
                }
                img{
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{
                  color:$colorA;
                }
                &:before{
                  content:' ';
                  position:absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                &:last-child:before{
                  display:none;
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid #E0E0E0;
            display:flex;
            align-items:center;
            input{
              border:none;
              box-sizing: border-box;
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }
  }
</style>