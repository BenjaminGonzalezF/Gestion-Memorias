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
  destroyed() {
    console.log("App eliminado");
  },
  beforeMount() {
    this.$store.commit('cargar_datos')
  },
};
</script>
