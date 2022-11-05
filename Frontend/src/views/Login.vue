<template>
  <!-- <h1>{{$store.state.hola}}</h1> -->
  <!--Formulario ingreso-->
  <div>
    <v-card color="#00CCCC">
      <v-card-text height="100%" >
        <v-hover v-slot="{ hover }"><v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' :  '#00CCCC'}">Alumno</v-btn></v-hover>
        <v-hover v-slot="{ hover }"><v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' :  '#00CCCC'}">Profesor</v-btn></v-hover>
        <v-hover v-slot="{ hover }"><v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' :  '#00CCCC'}">Directora</v-btn></v-hover>
        <v-hover v-slot="{ hover }"><v-btn plain class="white--text" :style="{ 'background-color': hover ? '#FF0182' :  '#00CCCC'}">Comité</v-btn></v-hover>
      </v-card-text>
    </v-card>
    <v-container>
      <v-content>
        <v-card class="mx-auto" max-width="460" elevation="3" outlined>
          <v-card-title>
            Bienvenido
          </v-card-title>
          <v-card-text>
            <v-text-field label="Usuario" prepend-icon="mdi-account-circle" />

            <v-text-field label="Contraseña" prepend-icon="mdi-lock">
            </v-text-field>

            <v-card-actions class="my-n4">
              <v-card-text>
                ¿No recuerdas tu contraseña?
              </v-card-text>
              <v-btn class="white--text" color="#65727c" small @click="$store.state.alumno">Ingresar</v-btn>
            </v-card-actions>

          </v-card-text>
        </v-card>
      </v-content>
    </v-container>
  </div>

</template>

<style>
  .fondo{
    background-image: url("../assets/prueba.jpg");
    height: 100%;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

</style>

<script>
  export default{
    data(){
      return{
        
      }
    }
  };
<script/>