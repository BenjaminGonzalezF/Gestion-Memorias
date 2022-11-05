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
  {
    path: '/profesor',
    name: 'Profesor',
    component: () => import('../views/Profesor/Solicitudes.vue')
  },
  {
    path: '/Alumno',
    name: 'Alumno',
    component: () => import('../views/VistaAlumno.vue')
  },
  {
    path: '/directora',
    name: 'directora',
    component: () => import('../views/VistaDirectora.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
