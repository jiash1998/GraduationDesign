import Vue from "vue";
import VueRouter from "vue-router";

//common
import Home from "../views/home.vue";
import Signin from "../views/signin.vue";
import Register from "../views/register.vue";
import Notice from "../views/notice.vue";
import Account from "../views/account.vue";
import Test from "../views/test.vue";

//merchart
import MerchartContral from "../views/merchartCon/merchartContral.vue";
import MerConCustom from "../views/merchartCon/merConCustom.vue";
import MerConManager from "../views/merchartCon/merConManager.vue";
import MerConManageInner from "../views/merchartCon/merConManageInner.vue";
import MerConManagerOuter from "../views/merchartCon/merConManageOuter.vue";
import MerConFeedback from "../views/merchartCon/merConFeedback.vue";
import MerConServiceDet from "../views/merchartCon/merConServiceDet.vue";
import MerConGarDet from "../views/merchartCon/merConGarDet.vue";


//admin
import AdminContral from "../views/adminCon/adminContral.vue";
import AdminManage from "../views/adminCon/adminManage.vue";
import AdminFeedback from "../views/adminCon/adminFeedback.vue";
import AdminReply from "../views/adminCon/adminReply.vue";
import AdminNotice from "../views/adminCon/adminNotice.vue";
import AdminCarMap from "../views/adminCon/adminCarMap.vue";
import AdminDriver from "../views/adminCon/adminDriver.vue";
import AdminDriReg from "../views/adminCon/adminDriReg.vue";
import AdminMerchartMap from "../views/adminCon/adminMerchartMap.vue";
import AdminCustom from "../views/adminCon/adminCustom.vue";
import AdminEnter from "../views/adminCon/adminEnter.vue";
import AdminDetail from "../views/adminCon/adminDetail.vue";
import AdminEcharts from "../views/adminCon/adminEcharts.vue";
import AdminRecord from "../views/adminCon/adminRecord.vue";





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
    component: Test,
    name: "test",
    path: "/test",
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
  //merchart
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
        component: MerConServiceDet,
        name: "merConServiceDet",
        path: "/merchartContral/merConServiceDet",
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
  //admin
  {
    component: AdminContral,
    name: "adminContral",
    path: "/adminContral",
    children: [
      {
        path: "",
        redirect: "/adminContral/adminManage",
      },
      {
        component: AdminManage,
        name: "adminManage",
        path: "/adminContral/adminManage",
      },
      {
        component: AdminFeedback,
        name: "adminFeedback",
        path: "/adminContral/adminFeedback",
      },
      {
        component: AdminReply,
        name: "adminReply",
        path: "/adminContral/adminReply",
      },
      {
        component: AdminNotice,
        name: "adminNotice",
        path: "/adminContral/adminNotice",
      },
      {
        component: AdminCarMap,
        name: "adminCarMap",
        path: "/adminContral/adminCarMap",
      },
      {
        component: AdminDriver,
        name: "adminDriver",
        path: "/adminContral/adminDriver",
      },
      {
        component: AdminDriReg,
        name: "adminDriReg",
        path: "/adminContral/adminDriReg",
      },
      {
        component: AdminMerchartMap,
        name: "adminMerchartMap",
        path: "/adminContral/adminMerchartMap",
      },
      {
        component: AdminCustom,
        name: "adminCustom",
        path: "/adminContral/adminCustom",
      },
      {
        component: AdminEnter,
        name: "adminEnter",
        path: "/adminContral/adminEnter",
      },
      {
        component: AdminDetail,
        name: "adminDetail",
        path: "/adminContral/adminDetail",
      },
      {
        component: AdminEcharts,
        name: "adminEcharts",
        path: "/adminContral/adminEcharts",
      },
      {
        component: AdminRecord,
        name: "adminRecord",
        path: "/adminContral/adminRecord",
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
