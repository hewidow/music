import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import swiper from 'swiper'
import message from './components/Message/index.js'

Vue.prototype.$message = message
Vue.prototype.$swiper = swiper

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
