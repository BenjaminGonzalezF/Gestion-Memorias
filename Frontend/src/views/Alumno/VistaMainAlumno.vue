<template>
    <v-app>
      <v-navigation-drawer right app v-model="drawer" color="rgb(0, 204, 255)">
  
        <v-layout column class="text-center">
          <v-flex class="mt-6">
            <v-avatar size="150">
              <v-img :src="this.$store.state.img">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="white"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            </v-avatar>
            <p class="white--text subheading-1 text-weight-bold mt-2">
              {{this.$store.state.nombre}}
            </p>
          </v-flex>
          
        </v-layout>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(link, key) in items" :key="key" @click="redirigir(link.title)">
              <v-list-item-icon>
                <v-icon class="white--text">{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="white--text">{{
                    link.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar flat app color="rgb(0, 204, 255)">
        <v-img max-height="40" max-width="50" src="@/assets/utal.png">
  
        </v-img>
        <v-app-bar-nav-icon right absolute class="grey--text" @click="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
      </v-app-bar>
      <loading></loading>
      <v-main v-if="!this.$store.state.loading">
        <vistaSolicitud v-if="this.$store.state.vistaSeleccionada==1"></vistaSolicitud>
        <Estadosolicitud v-if="this.$store.state.vistaSeleccionada==2"></Estadosolicitud>
        <vistaSolicitar v-if=" this.$store.state.vistaSeleccionada==3"></vistaSolicitar>
      </v-main>
    </v-app>
  </template>
<script>
import vistaSolicitud from "./VistaOfertaTemasAlumno.vue"
import vistaSolicitar from "./VistaSolicitarTema.vue"
import Estadosolicitud from "./VistaEstadoSolicitudTema.vue"

import Loading from '@/components/loading.vue';
export default {
    data() {
        return {
            drawer: null,
            items: [
                { title: "Oferta de Temas", icon: "mdi-folder" },
                { title: "Estado de Solicitud", icon: "mdi-folder" },
                { title: "Cerrar sesion", icon: "mdi-forum" },
            ],
            hover: "red",
            vista:1,
        }
    },
    destroyed() {
        console.log("Login eliminado");
    },
    beforeCreate() {
        this.$store.state.loading = true
        this.$store.commit('cargar_datos')
    },
    components:{
        vistaSolicitud,
        Loading,
        vistaSolicitar,
        Estadosolicitud,
    },
    methods: {
        redirigir(ref) {
            if (ref == "Cerrar sesion") {
                if (this.$route.path !== "/Alumno" || this.$route.path !== "/solicitudTemas") {
                    localStorage.clear();
                    this.$store.state.nombre=null
                    this.$store.state.img=null
                    this.$router.push({ path: "/" })
                }
            }else if(ref == "Oferta de Temas"){
              this.$store.state.vistaSeleccionada=1
            }else if(ref == "Estado de Solicitud"){
              this.$store.state.vistaSeleccionada=2
            }
        }
    }
}

</script> 
 
<style>
.v-list-item:hover {
     background: #FF0182;
 }
</style>