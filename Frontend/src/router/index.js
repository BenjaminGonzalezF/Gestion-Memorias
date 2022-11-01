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
    path: '/visualizarTemas',
    name: 'visualizarTemas',
    component: () => import(/* webpackChunkName: "about" */ '../views/visualizarTemas.vue')
  },
  
  {
    path: '/solicitudmemoria',
    name: 'solicitudmemoria',
    component: () => import(/* webpackChunkName: "about2" */ '../views/Vistasolicitar.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
