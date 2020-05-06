import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles';
import url from './url'

Vue.use(VueParticles)  

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  url,
  render: h => h(App)
}).$mount("#app");
