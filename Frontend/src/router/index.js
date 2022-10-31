import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/visualizarTemas',
    name: 'visualizarTemas',
    component: () => import(/* webpackChunkName: "about" */ '../views/visualizarTemas.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
