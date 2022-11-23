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
          <v-progress-circular class="mb-2" size="20" indeterminate color="white" v-if="this.$store.state.loading"></v-progress-circular>
            <p class="white--text subheading-1 text-weight-bold" v-else>
              {{this.$store.state.rol}}
            </p>
        </v-flex>
        <v-flex class="mt-3 mb-3">
          <cambiarRol></cambiarRol>
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
      <vistaSolicitud v-if="vista==1"></vistaSolicitud>
      <vistaTemas v-if = "vista==2"></vistaTemas>
    </v-main>
  </v-app>
</template>

<script>

import Loading from '@/components/loading.vue';
import vistaSolicitud from './VistaSolicitudProfesor.vue'
import vistaTemas from './VistaTemas.vue'
import cambiarRol from '@/components/cambiarRol.vue';

export default {
  data() {
      return {
          drawer: null,
          items: [
              { title: "Solicitudes", icon: "mdi-folder" },
              {title: "Mis temas", icon: "mdi-folder"},
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
      Loading,
      vistaSolicitud,
      vistaTemas,
      cambiarRol
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
          }else if(ref == "Solicitudes"){
              this.vista=1
          }
          else if(ref == "Mis temas"){
              this.vista=2
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