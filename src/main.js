import Vue from 'vue'
import VueRouter from 'vue-router'
import VuePusher from 'vue-pusher'
import App from '@/App.vue'

import routes from '@/router'
import store from '@/store'


Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})
Vue.use(VuePusher, {
  api_key: `39863c8cdba721a8c07a`,
  options: {
    cluster: `us2`,
    encrypted: true,
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
