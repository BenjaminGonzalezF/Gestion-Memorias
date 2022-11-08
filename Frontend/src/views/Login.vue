<template>
  <v-app>
    <div class="text-center mt-12"  v-if="this.$store.state.loading">
      <h2>Loading</h2>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card color="#00CCCC" v-if="!this.$store.state.loading">
      <v-card-text height="100%">
        <v-hover v-slot="{ hover }">
          <v-btn @click="cambiar_nombre(1)" plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Alumno</v-btn>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn @click="cambiar_nombre(2)" plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Profesor
          </v-btn>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn @click="cambiar_nombre(3)" plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Directora
          </v-btn>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn @click="cambiar_nombre(4)" plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' : '#00CCCC' }">Comité</v-btn>
        </v-hover>
      </v-card-text>
    </v-card>
    <v-main v-if="!this.$store.state.loading">
      <v-card class="mx-auto mt-5" max-width="460" elevation="3" outlined>
        <v-card-title>
          Bienvenido {{this.nombre_ingreso}}
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
    </v-main>
  </v-app>
</template>
 
<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      correo: null,
      contrasena: "",
      vBtnIngreso: true,
      alumnos: [],
      profesores:[],
      directores:[],
      comite:[],
      mostrar: null,
      nombre_ingreso:"Alumno",
    };
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
      if(this.nombre_ingreso==="Alumno"){
        this.axios.get("todos_alumnos")
          .then((response) => {
            this.alumnos = response.data;
            var ingresado = false
            var id = null
            for (var i = 0; i < this.alumnos.length; i++) {
              if (this.alumnos[i].correo === this.correo && this.alumnos[i].contrasena === this.contrasena) {
                id = this.alumnos[i]._id
                ingresado = true
              }
            }
            if (ingresado) {
              localStorage.setItem("key_usuario", id);
              this.$router.push({ path: "/Alumno" })
              Swal.fire(
                'Ingreso!',
                'Has ingresado correctamente!',
                'success'
              )
            } else {
              Swal.fire(
                'Error!',
                'Has ingresado incorrectamente!',
                'error'
              )
            }
          })
          .catch((e) => {
            console.log('error' + e);
          })
      }else if(this.nombre_ingreso==="Profesor"){
        this.axios.get("todos_profesores")
          .then((response) => {
            this.profesores = response.data;
            var ingresado = false
            var id = null
            for (var i = 0; i < this.profesores.length; i++) {
              if (this.profesores[i].correo === this.correo && this.profesores[i].contrasena === this.contrasena) {
                id = this.profesores[i]._id
                ingresado = true
              }
            }
            if (ingresado) {
              localStorage.setItem("key_usuario", id);
              this.$router.push({ path: "/profesor/solicitudes" })
              Swal.fire(
                'Ingreso!',
                'Has ingresado correctamente!',
                'success'
              )
            } else {
              Swal.fire(
                'Error!',
                'Has ingresado incorrectamente!',
                'error'
              )
            }
          })
          .catch((e) => {
            console.log('error' + e);
          })
      }else if(this.nombre_ingreso==="Directora"){
        this.axios.get("todos_escuela")
          .then((response) => {
            this.directores = response.data;
            var ingresado = false
            var id = null
            for (var i = 0; i < this.directores.length; i++) {
              if (this.directores[i].correo === this.correo && this.directores[i].contrasena === this.contrasena) {
                id = this.directores[i]._id
                ingresado = true
              }
            }
            if (ingresado) {
              localStorage.setItem("key_usuario", id);
              this.$router.push({ path: "/directora" })
              Swal.fire(
                'Ingreso!',
                'Has ingresado correctamente!',
                'success'
              )
            } else {
              Swal.fire(
                'Error!',
                'Has ingresado incorrectamente!',
                'error'
              )
            }
          })
          .catch((e) => {
            console.log('error' + e);
          })
      }else{
        this.axios.get("todos_comite")
          .then((response) => {
            this.comite = response.data;
            var ingresado = false
            var id = null
            for (var i = 0; i < this.comite.length; i++) {
              if (this.comite[i].correo === this.correo && this.comite[i].contrasena === this.contrasena) {
                id = this.comite[i]._id
                ingresado = true
              }
            }
            if (ingresado) {
              localStorage.setItem("key_usuario", id);
              this.$router.push({ path: "/VistaComite" })
              Swal.fire(
                'Ingreso!',
                'Has ingresado correctamente!',
                'success'
              )
            } else {
              Swal.fire(
                'Error!',
                'Has ingresado incorrectamente!',
                'error'
              )
            }
          })
          .catch((e) => {
            console.log('error' + e);
          })
      }
    },
    cambiar_nombre(number){
      if(number==1){
        this.nombre_ingreso="Alumno"
        this.correo=""
        this.contrasena=""
      }else if(number==2){
        this.nombre_ingreso="Profesor"
        this.correo=""
        this.contrasena=""
      }else if(number==3){
        this.nombre_ingreso="Directora"
        this.correo=""
        this.contrasena=""
      }else{
        this.nombre_ingreso="Comité"
        this.correo=""
        this.contrasena=""
      }
    }
  }
}
</script>

<style>
  .fondo{
    background-image: url("../assets/logo.svg");
    height: 100%;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>