import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  
  {
    path: '/visualizarTemas',
    name: 'visualizarTemas',
    component: () => import( '../views/visualizarTemas.vue')
  },
  {
    path: '/VistaComite',
    name: 'VistaComite',
    component: () => import(/* webpackChunkName: "about" */ '../views/Comite/VistaComite.vue')
  },
  
  {
    path: '/solicitudmemoria',
    name: 'solicitudmemoria',
    component: () => import('../views/Vistasolicitar.vue')
  },
  {
    path: '/profesor',
    name: 'Profesor',
    component: () => import('../views/Profesor/Solicitudes.vue')
  },
  {
    path: '/Alumno',
    name: 'Alumno',
    component: () => import('../views/Alumno/VistaAlumno.vue')
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
