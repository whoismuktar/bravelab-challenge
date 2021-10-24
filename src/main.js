import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import toast from './components/toastMsg'
// base scss
import "./assets/styles/base.scss"

Vue.config.productionTip = false

// inject re-useabel global toast
Vue.component('toast', toast)

// ( %Y-%m-%d ) date formatter filter
Vue.filter('ymd', function (value) {
  return `${new Date(value).toISOString().slice(0, 10)}`;
});

// Navigation Auth Guard
router.beforeEach(async (to, from, next) => {
  const status = store.getters['auth/isSignedIn']

  // Guard for Authenticated routes
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (status) {
      next();
    } else {
      next({
        path: "/",
      });
    }

  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    // Guard for Non Authenticated routes
    if (!status) {
      next();
    } else {
      next({
        path: "/dashboard",
      });
    }
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
