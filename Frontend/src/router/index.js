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
    path: '/comite',
    name: 'VistaComite',
    component: () => import('../views/Comite/VistaComite.vue')
  },
  {
    path: '/profesor',
    name: 'VistaProfesor',
    component: () => import('../views/Profesor/VistaProfesor.vue')
  },
  {
    path: '/Alumno',
    name: 'VistaAlumno',
    component: () => import('../views/Alumno/VistaAlumno.vue')
  },
  {
    path: '/Alumno/temaAprobado/:id?',
    name: 'Alumno',
    component: () => import('../views/Alumno/TemaAprobado.vue')
  },
  {
    path: '/directora',
    name: 'directora',
    component: () => import('../views/Directora/VistaDirectora.vue')
  },
  {
    path: '/Memorista',
    name: 'memorista',
    component: () => import('../views/Memorista/VistaMemorista.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
