<template>
  <v-app>
    <v-main>
    <router-view/>
  </v-main>
  <v-footer
    dark
    padless
   
  >
    <v-card
      class="flex " 
      flat
      tile
      
      
    >
    
      <v-card-title class="py-3 white--text text-center">
        <strong class="subheading "  >Contactanos en  </strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>


      <v-card-text class="py-3 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Sistema de Memorias Utalca</strong>
      </v-card-text>
    </v-card>
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
