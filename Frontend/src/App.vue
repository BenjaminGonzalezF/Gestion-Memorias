<template>
  <v-app>
        <v-app-bar color="white" app
        height="100">
            <v-img max-height="100" max-width="100" src="./assets/LOGO_UTAL.png"></v-img>
            <v-tabs centered class="ml-n9" >
                <v-tab>
                    Oferta de temas
                </v-tab>

                <v-tab>
                    Solicitud de tema
                </v-tab>

            </v-tabs> 
        </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer color="272727" padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="icono in iconos" :key="icono" color="white" text rounded class="my-2" icon>
          <v-icon size="24px">{{icono}}</v-icon>
        </v-btn>
        <v-col class="grey py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Utal</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
//import { Icon } from '@iconify/vue2';
export default {
  
  data: () => ({
    //
  }),
};
</script>
