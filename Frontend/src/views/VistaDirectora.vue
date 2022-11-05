<template>
  <v-container >
    <h1 class="subheading grey--text mb-10">Solicitudes pendientes</h1>
    <v-container >
        <v-col v-for="oferta in ofertas" :key=oferta.titulo >
          <v-card  class="mx-auto" height=50% width=60%>
            <v-card-title class="white--text blue-grey">{{ oferta.titulo }}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <p class="subheading">{{ oferta.descripcion }}</p>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-contain class="mx-auto mb-n5"> <strong> {{ oferta.alumno }}</strong></v-contain>
            </v-card-actions>
          </v-card>
        </v-col>
    </v-container>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      ofertas: [
        { titulo: 'Pendiente1 ', descripcion: 'Ejemplo 1', alumno: 'Benjamin Gonzalez' },
        { titulo: 'Pendiente2', descripcion: 'Ejemplo 2', alumno: 'Benjamin Gonzalez' },
        { titulo: 'Pendiente3', descripcion: 'Ejemplo 3', alumno: 'Benjamin Gonzalez' },
        { titulo: 'Pendiente4 ', descripcion: 'Ejemplo 4', alumno: 'Benjamin Gonzalez' },
      ],
    }
  }
};
</script>