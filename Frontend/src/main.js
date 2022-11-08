import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'https://contruapi.herokuapp.com/api';


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

