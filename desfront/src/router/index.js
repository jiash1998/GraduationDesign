import Vue from "vue";
import VueRouter from "vue-router";

//common
import Home from "../views/home.vue";
import Signin from "../views/signin.vue";
import Register from "../views/register.vue";
import Notice from "../views/notice.vue";
import Account from "../views/account.vue";

//merchart
import MerchartContral from "../views/merchartCon/merchartContral.vue";
import MerConCustom from "../views/merchartCon/merConCustom.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    component: Home,
    name: "home",
    path: "/home",
  },
  {
    component: Signin,
    name: "signin",
    path: "/signin",
  },
  {
    component: Register,
    name: "register",
    path: "/register",
  },
  {
    component: Account,
    name: "account",
    path: "/account",
  },
  {
    component: Notice,
    name: "notice",
    path: "/notice",
  },

  {
    component: MerchartContral,
    name: "merchartContral",
    path: "/merchartContral",
    children: [
      {
        path: "",
        redirect: "/merchartContral/merConCustom",
      },
      {
        component: MerConCustom,
        name: "merConCustom",
        path: "/merchartContral/merConCustom",
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
