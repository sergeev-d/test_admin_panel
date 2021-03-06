import Vue from 'vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from "./store";
import App from './App.vue'
import Vuetify from 'vuetify'
import VueCharts from 'vue-chartjs'
import 'vuetify/dist/vuetify.min.css'

import ApiService from "./common/api.service";
import {CHECK_AUTH} from "./store/actions.type";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Vuetify);
Vue.use(VueCharts);

const vuetifyOptions = { }
ApiService.init();

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    Promise.all([store.dispatch(CHECK_AUTH)]).then(() => {
      if (store.getters.isAuthenticated) {
        console.log("isAuthenticated")
        next();
        return
      }
      next('/login')
    })
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetifyOptions),
  render: h => h(App),
}).$mount('#app');

// https://webdevblog.ru/autentifikacii-v-vue-s-ispolzovaniem-vuex/

