import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    alias: ['/login'], // alias for login or base route
    component: () => import('../views/Login/'),
    meta: {
      requiresVisitor: true, // meta to determine non auth page
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/'),
    meta: {
      requiresAuth: true, // meta to determine auth rotuer
    },
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/404')
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
