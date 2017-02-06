import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import store from './store/'
import router from './router/'
import Resource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import ElementUi from 'element-ui'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import NProgress from 'vue-nprogress'

Vue.use(ElementUi)
Vue.use(NProgress)
Vue.use(Resource)

sync(store, router)

const { state } = store
Vue.config.devtools = true

const nprogress = new NProgress({ parent: '.nprogress-container' })

router.beforeEach((to, from, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  const token = sessionStorage.getItem('token');

  if (to.path == '/admin/login') {
    if (token != 'null' && token != null) {
      next('/');
    } else {
      next();
    }
  } else {
    if (token != 'null' && token != null) {
      next();
    } else {
      next('/admin/login')
    }
  }

})

new Vue({
  store,
  router,
  nprogress,
  ...App
}).$mount('#app')
