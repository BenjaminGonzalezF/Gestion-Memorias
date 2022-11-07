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
    alumnos:[],
  }),
  beforeMount() {
    var usuario_id=null
    var alumno_sesion=null
    usuario_id=localStorage.getItem("key_usuario")
    console.log("sesionID: "+usuario_id)
    if(usuario_id!==null){
      console.log("Sesion Activa")
      this.axios.get("todos_alumnos")
          .then((response) => {
            this.alumnos = response.data;
            alumno_sesion=this.alumnos.filter(a => a._id==usuario_id)
            console.log(alumno_sesion)
            if (this.$route.path !== `/Alumno`) {
             this.$router.push({ path: "/Alumno" })
            }
          })
          .catch((e) => {
            console.log('error' + e);
        })
    }
  },
};
</script>
