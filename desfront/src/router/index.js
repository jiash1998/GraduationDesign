import Vue from 'vue'
import VueRouter from 'vue-router'

//common
import Home from "../views/Home.vue";

Vue.use(VueRouter)

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
