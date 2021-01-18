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
import MerConManager from "../views/merchartCon/merConManager.vue";
import MerConManageInner from "../views/merchartCon/merConManageInner.vue";
import MerConManagerOuter from "../views/merchartCon/merConManageOuter.vue";
import MerConFeedback from "../views/merchartCon/merConFeedback.vue";
import MerConServiceDet from "../views/merchartCon/merConServiceDet.vue";
import MerConGarDet from "../views/merchartCon/merConGarDet.vue";


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
      {
        component: MerConManager,
        name: "merConManager",
        path: "/merchartContral/merConManager",
        children: [
          {
            path: "",
            redirect: "/merchartContral/merConManager/merConManagerOuter",
          },
          {
            component: MerConManageInner,
            name: "merConManageInner",
            path: "/merchartContral/merConManager/merConManageInner",
          },
          {
            component: MerConManagerOuter,
            name: "merConManagerOuter",
            path: "/merchartContral/merConManager/merConManagerOuter",
          },
        ],
      },
      {
        component: MerConFeedback,
        name: "merConFeedback",
        path: "/merchartContral/merConFeedback",
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
