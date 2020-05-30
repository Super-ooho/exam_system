import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles';
import url from './url';
import axios from 'axios';
import JsonExcel from 'vue-json-excel';
import global from './store/global.js'

Vue.component('downloadExcel', JsonExcel)
Vue.use(VueParticles)  
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.global = global;

new Vue({
  router,
  store,
  url,
  render: h => h(App)
}).$mount("#app");
