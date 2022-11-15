import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

Vue.config.productionTip = false

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:3000/api';


export default new Vuex.Store({
  state: {
    visibilidadheader: false,
    visibilidadfooter: false,
    ingresoUsuario: false,
    loading: true,
    esprofe: false,
    esalumno: false,
    esdirector: false,
    escomite: false,
    nombre:null,
    img:null,
    id_tema_solicitar:null,//Variable que solo sirve para los alumnos
  },
  getters: {
  },
  mutations: {
    cargar_datos() {
      var usuario_id = null
      var usuario_sesion = null
      usuario_id = localStorage.getItem("key_user")
      if (usuario_id !== null) {
        axios.get(`/usuario/${usuario_id}`)
          .then((response) => {
            usuario_sesion = response.data
            if (usuario_sesion.length !== 0) {
              console.log("Token encontrado")
              this.interval = setTimeout(() => {
                this.state.esdirector=usuario_sesion.esdirector
                this.state.esalumno=usuario_sesion.esalumno
                this.state.esprofe=usuario_sesion.esprofe
                this.state.escomite=usuario_sesion.escomite
                this.state.nombre=usuario_sesion.nombre
                this.state.img=usuario_sesion.img
                console.log("alo"+this.state.img)
                if (usuario_sesion.esdirector) {
                  router.push({ path: "/directora" })
                } else if (usuario_sesion.escomite) {
                  router.push({ path: "/comite" })
                } else if (usuario_sesion.esprofe) {
                  router.push({ path: "/profesor" })
                } else {
                  router.push({ path: "/alumno" })
                }
              }, 1000)
              this.interval = setTimeout(() => {
                this.state.loading = false
                this.state.ingresoUsuario = true
              }, 1100)
            }
          })
          .catch((e) => {
            console.log("Token encontrado incorrecto")
            this.interval = setTimeout(() => {
              this.state.loading = false
              this.state.ingresoUsuario = false
              router.push("/").catch(error => {
                if (error.name != "NavigationDuplicated") {
                  console.log("Navegacion Error")
                }
              });localStorage.clear()
            }, 1000)
          })
      } else {
        console.log("token no encontrado")
        this.interval = setTimeout(() => {
          this.state.loading = false
          this.state.ingresoUsuario = false
          router.push("/").catch(error => {
            if (error.name != "NavigationDuplicated") {
              console.log("Navegacion Error")
            }
          });
        }, 1000)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
