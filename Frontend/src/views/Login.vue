<template>
  <!-- <h1>{{$store.state.hola}}</h1> -->
  <!--Formulario ingreso-->
  <div>
    <BarraSuperior/>
  <v-container>
    <v-content>
    <v-card
    class="mx-auto"
    max-width="460"
    elevation="3"
    outlined
    >
      <v-card-title>
        Bienvenido
      </v-card-title>
      <v-card-text>
        <v-text-field label="Usuario" prepend-icon="mdi-account-circle"/>

        <v-text-field
        label="Contraseña"
        prepend-icon="mdi-lock"
        >
        </v-text-field>

        <v-card-actions class="my-n4">
          <v-card-text>
            ¿No recuerdas tu contraseña?
          </v-card-text >
          <v-btn class="white--text" color="#65727c" small>Ingresar</v-btn>
        </v-card-actions>
        
      </v-card-text>
    </v-card>
  </v-content>
  </v-container>
  </div>
  
</template>

<script>
  import BarraSuperior from './views/BarraSuperior.vue';
  export default{
    components:{
      BarraSuperior,
    }
  };
<script/>