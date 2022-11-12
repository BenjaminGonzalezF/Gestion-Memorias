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
    path: '/Comite',
    name: 'VistaComite',
    component: () => import(/* webpackChunkName: "about" */ '../views/Comite/SolicitudesComite.vue')
  },
  
  {
    path: '/solicitudmemoria',
    name: 'solicitudmemoria',
    component: () => import('../views/Alumno/Vistasolicitar.vue')
  },
  {
    path: '/profesor/Solicitudes',
    name: 'Profesor/Solicitudes',
    component: () => import('../views/Profesor/Solicitudes.vue')
  },
  {
    path: '/profesor/Estudiantes',
    name: 'Profesor/Estudiantes',
    component: () => import('../views/Profesor/Estudiantes.vue')
  },
  {
    path: '/profesor/Proyectos',
    name: 'Profesor/Proyectos',
    component: () => import('../views/Profesor/Proyectos.vue')
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
  {
    path: '/solicitudTemas',
    name: 'solicitudTemas',
    component: () => import('../views/Alumno/VistaSolicitudTema.vue')
  },
  {
    path: '/estudiantes',
    name: 'estudiantes',
    component: () => import('../views/Estudiantes.vue')
  }   
]

const router = new VueRouter({
  routes
})

export default router
