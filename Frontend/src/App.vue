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
//import { Icon } from '@iconify/vue2';
export default {
  
  data: () => ({
    //
  }),
};
</script>
