<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer color="272727" padless>
      <v-col class="grey py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Utal</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    directora:[],
    comite:[],
    profesores:[],
    alumnos:[],
  }),
  beforeMount() {
    // Alumno
    var usuario_id=null
    var usuario_sesion=null
    usuario_id=localStorage.getItem("key_usuario")
    console.log("sesionID: "+usuario_id)
    if(usuario_id!==null){
      console.log("Sesion Activa")
      var ingresado=false
      this.axios.get("todos_escuela")
          .then((response) => {
            this.directora = response.data;
            usuario_sesion=this.directora.filter(a => a._id==usuario_id)
            if(usuario_sesion.length!==0){
              if (this.$route.path !== `/directora`) {
               this.$router.push({ path: "/directora" })
               this.$store.state.loading=false
              }
            }
          })
          .catch((e) => {
            console.log('error' + e);
        })
        usuario_sesion=null
        this.axios.get("todos_comite")
          .then((response) => {
            this.comite = response.data;
            usuario_sesion=this.comite.filter(a => a._id==usuario_id)
            if(usuario_sesion.length!==0){
              if (this.$route.path !== `/VistaComite`) {
               this.$router.push({ path: "/VistaComite" })
              }
              this.$store.state.loading=false
            }
          })
          .catch((e) => {
            console.log('error' + e);
        })
        usuario_sesion=null
        this.axios.get("todos_profesores")
          .then((response) => {
            this.profesores = response.data;
            usuario_sesion=this.profesores.filter(a => a._id==usuario_id)
            if(usuario_sesion.length!==0){
              if (this.$route.path !== `/profesor`) {
               this.$router.push({ path: "/profesor" })
              }
              this.$store.state.loading=false
            }
          })
          .catch((e) => {
            console.log('error' + e);
        })
        usuario_sesion=null
        this.axios.get("todos_alumnos")
          .then((response) => {
            this.alumnos = response.data;
            usuario_sesion=this.alumnos.filter(a => a._id==usuario_id)
            if(usuario_sesion.length!==0){
              if (this.$route.path !== `/Alumno`) {
               this.$router.push({ path: "/Alumno" })
              }
              this.$store.state.loading=false
            }
          })
          .catch((e) => {
            console.log('error' + e);
        })
    }else{
      this.$store.state.loading=false
    }
  },
};
</script>
