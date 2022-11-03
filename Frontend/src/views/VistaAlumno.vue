<template>
  <v-container class="mx-auto">
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
                <v-contain class="mx-auto mb-n9"> <strong> {{oferta.profesor}}</strong></v-contain>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-container>

</template>

<script>
  export default{
    data(){
      return{
        ofertas:[
          {titulo:'Tema 1 ',descripcion: 'Ejemplo 1', profesor:'Daniel Moreno'},
          {titulo:'Tema 2 ',descripcion: 'Ejemplo 2', profesor:'Daniel Moreno'},
          {titulo:'Tema 3 ',descripcion: 'Ejemplo 3', profesor:'Daniel Moreno'},
          {titulo:'Tema 4 ',descripcion: 'Ejemplo 4', profesor:'Daniel Moreno'},
        ],
      }
    }
  };
</script>
