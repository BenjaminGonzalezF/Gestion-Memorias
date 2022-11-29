<template>
  <v-app>
    <v-main>
    <router-view/>
  </v-main>
  <v-footer
      color="black"
      dark
    >
    <v-container class="black">
      <v-row no-gutters>
        <v-col order="first">
          <v-card
          class="pa-2"
          outlined
          tile
          color="black"
        >
          UNIVERSIDAD DE TALCA 
          <br>
          FACULTAD DE INGENIERÍA.
          LOS NICHES-CURICÓ-CHIE.
          <br>
          TELEFONO: +56 75 220 17 36
        </v-card>
      </v-col>
        <v-col >
        <v-card
          class="pa-2"
          outlined
          tile
          color="black"
        >
        <center>
        <v-img max-height="80" max-width="50" src="@/assets/logo_blanco.png">
      </v-img>
    </center>
        </v-card>
      </v-col>
      <v-col order="last">
        SIGUENOS 
          <br>
        <v-btn
            v-for="icon in icons"
            :key="icon"
            text
            dark
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
    <v-row
        justify="center"
        class="my-4 text-center"
      >
        
        <v-col
          cols="12"
          class="align-center"
          >&copy; 2022 Sitema de Memorias Utalca</v-col>
      </v-row>
    </v-footer>
  <!-- Footer -->
  </v-app>
</template>

<script>
import loading from './components/loading.vue';
export default {
  components: { loading },
  data: () => ({
    directora:[],
    comite:[],
    profesores:[],
    alumnos:[],

    icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
  }),
  destroyed() {
    console.log("App eliminado");
  },
  beforeMount() {
    this.$store.state.loading = true
    this.$store.commit('cargar_datos')
  },
};
</script>
