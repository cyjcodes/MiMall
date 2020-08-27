import Vue from "vue";
import Router from "vue-router";
import Index from "./Pages/index";
import Home from "./Pages/home";
import Product from "./Pages/product";
import Detail from "./Pages/detail";
import Cart from "./Pages/cart";
import Order from "./Pages/order";
import OrderConfirm from "./Pages/orderConfirm";
import OrderList from "./Pages/orderList";
import OrderPay from "./Pages/orderPay";
import AliPay from "./Pages/alipay";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: Index,
        },
        {
          path: "/product/:id",
          name: "product",
          component: Product,
        },
        {
          path: "/detail/:id",
          name: "detail",
          component: Detail,
        },
      ],
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/order",
      name: "order",
      component: Order,
      children: [
        {
          path: "list",
          name: "order-list",
          component: OrderList,
        },
        {
          path: "confirm",
          name: "order-confirm",
          component: OrderConfirm,
        },
        {
          path: "pay",
          name: "order-pay",
          component: OrderPay,
        },
        {
          path: "alipay",
          name: "alipay",
          component: AliPay,
        },
      ],
    },
  ],
});
