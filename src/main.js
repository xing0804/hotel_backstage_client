import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "u-reset.css";
import axios from "axios";
import VCharts from 'v-charts';

Vue.use(ElementUI);
Vue.use(VCharts);

Vue.config.productionTip = false

Vue.prototype.$http=axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
