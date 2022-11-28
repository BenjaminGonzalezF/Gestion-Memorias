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
    esmemorista:false,
    rol:false,
    img: null,
    nombre:null,
    roles:[],
    //PARCHE,
    vistaSeleccionada:1,
    id_tema_solicitar:null,
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
            this.interval = setTimeout(() => {
              this.state.roles=[]
              this.state.esdirector=usuario_sesion.esdirector
                this.state.esalumno=usuario_sesion.esalumno
                this.state.esprofe=usuario_sesion.esprofe
                this.state.escomite=usuario_sesion.escomite
                this.state.esmemorista=usuario_sesion.esmemorista
                if(usuario_sesion.esdirector){
                  this.state.roles.push("Director")
                }
                if(usuario_sesion.esprofe){
                  this.state.roles.push("Profesor")
                }
                if(usuario_sesion.escomite){
                  this.state.roles.push("Comite")
                }
                if(usuario_sesion.esalumno){
                  this.state.roles.push('Alumno')
                }
                this.state.nombre=usuario_sesion.nombre 
                this.state.img=usuario_sesion.img 
                this.state.rol=usuario_sesion.rolActivo
                if (usuario_sesion.rolActivo=="Director") {
                  if(router.history.current.path!=="/directora"){
                    router.push({ path: "/directora" })
                  }
                } else if (usuario_sesion.rolActivo=="Comite") {
                  if(router.history.current.path!=="/comite"){
                    router.push({ path: "/comite" })
                  }
                } else if (usuario_sesion.rolActivo=="Profesor") {
                  if(router.history.current.path!=="/profesor"){
                    router.push({ path: "/profesor" })
                  }
                } else{ // Alumno o memorista
                  if(router.history.current.path!=="/Alumno"){
                    router.push({ path: "/Alumno" })
                  }
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
