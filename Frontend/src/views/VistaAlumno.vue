<template>
  <div>
    <HeaderProfe2></HeaderProfe2>
    <h1 class="subheading grey--text mb-10">Ofertas de tema</h1>
    <v-container>
        <v-row>
          <v-col
          v-for="oferta in ofertas"
          :key=oferta.titulo
          cols="4"
          >
            <v-card height="200" >
              <v-container class="blue-grey">
              <v-card-title class="white--text">{{oferta.titulo}}</v-card-title>
              </v-container>
              <v-spacer></v-spacer>
              <div>
                <v-card-text>
                <p class="subheading">{{oferta.descripcion}}</p>
                </v-card-text>
              </div>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-container class="mx-auto mb-n9"> <strong> {{oferta.profesor}}</strong></v-container>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>

</template>

<script>
import HeaderProfe2 from '@/components/headerProfe2.vue';

  export default{
    data() {
        return {
            ofertas: [
                { titulo: "Tema 1 ", descripcion: "Ejemplo 1", profesor: "Daniel Moreno" },
                { titulo: "Tema 2 ", descripcion: "Ejemplo 2", profesor: "Daniel Moreno" },
                { titulo: "Tema 3 ", descripcion: "Ejemplo 3", profesor: "Daniel Moreno" },
                { titulo: "Tema 4 ", descripcion: "Ejemplo 4", profesor: "Daniel Moreno" },
            ],
        };
    },
    components: { HeaderProfe2 }
};
</script>
