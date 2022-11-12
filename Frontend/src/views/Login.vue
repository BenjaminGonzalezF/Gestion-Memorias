<template>
  <v-app>
    <loading></loading>
    <v-card color="#00CCCC" v-if="!this.$store.state.ingresoUsuario && !this.$store.state.loading">
      <v-card-text height="100%">
        <v-hover v-slot="{ hover }">
          <v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Alumno</v-btn>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Profesor
          </v-btn>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Directora
          </v-btn>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Comité</v-btn>
        </v-hover>
      </v-card-text>
    </v-card>
    <v-main v-if="!this.$store.state.ingresoUsuario && !this.$store.state.loading">
      <v-container class="fondo" fluid>
        <div class="mt-5">
          <v-card class="mx-auto" max-width="460"  outlined>
            <v-card-title>
              Bienvenido
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="correo" label="Correo" prepend-icon="mdi-account-circle"></v-text-field>
              <v-text-field v-model="contrasena" prepend-icon="mdi-lock" label="Contraseña"
                :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'" :type="mostrar ? 'text' : 'password'" name="input-10-1"
                counter @click:append="mostrar = !mostrar"></v-text-field>
              <v-card-actions class="my-n4">
                <v-card-text>
                  ¿No recuerdas tu contraseña?
                </v-card-text>
                <v-btn :class="vBtn" class="white--text" color="#65727c" small :disabled="vBtnIngreso" @click="ingreso()">
                  Ingresar</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
 
<script>
import loading from "@/components/loading.vue"
export default {
  data() {
    return {
      correo: null,
      contrasena: "",
      vBtnIngreso: true,
      usuarios:[],
      mostrar: null,
      nombre_ingreso:"Alumno",
    };
  },
  destroyed() {
    console.log("Login eliminado");
  },
  beforeCreate() {
    this.$store.state.loading=true
    this.$store.commit('cargar_datos')
  },
  components:{
    loading
  },
  computed: {
    vBtn() {
      if (this.correo == "" || this.contrasena == "") {
        this.vBtnIngreso = true
      } else {
        this.vBtnIngreso = false
      }
    },
  },
  methods: {
    ingreso() {
      this.axios.get(`/todos_usuarios`)
          .then((response) => {
            this.usuarios=response.data
            var usuario = this.usuarios.filter(u => u.correo == this.correo && u.contrasena == this.contrasena)
            if(usuario.length!==0){
              localStorage.setItem("key_user",usuario[0]._id)
              if (usuario[0].esdirector) {
                  this.$router.push({ path: "/directora" })
                } else if (usuario[0].escomite) {
                  this.$router.push({ path: "/VistaComite" })
                } else if (usuario[0].esprofe) {
                  this.$router.push({ path: "/profesor/Solicitudes" })
                } else {
                  this.$router.push({ path: "/Alumno" })
                }
              console.log("ingreso correcto")
            }else{
              console.log("ingreso incorrecto")
            }
          })
          .catch((e) => {
            console.log('error' + e);
          })
    },
  }
}
</script>

<style>
  .fondo{
    background-image: url('https://cdn.discordapp.com/attachments/1034862333966684261/1039324077829128202/iccExtension2.jpg');
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>