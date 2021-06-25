import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import FunctionalCalendar from 'vue-functional-calendar'
import VueConfirmDialog from 'vue-confirm-dialog'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarTimes, faCalendarAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";

library.add(faCalendarTimes);
library.add(faCalendarAlt);
library.add(faWindowClose);

Vue.use(VueAxios, axios);
Vue.use(FunctionalCalendar, {
  dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
});
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueConfirmDialog);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
