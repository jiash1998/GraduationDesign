import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入axios cnpm install axios/cnpm install vue-axios
import axios from "axios"; //axios
import VueAxios from "vue-axios"; //axios
//引入sass
//npm install node-sass --save-dev
//npm install sass-loader --save-dev

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
