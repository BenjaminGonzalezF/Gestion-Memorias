<template>
  <v-app>
     <v-main style="background: url('https://i.pinimg.com/originals/9c/7b/e4/9c7be43979a736a8695361a544630b97.jpg') no-repeat; background-color:cover;">
         <v-card class="mx-auto mt-5" max-width="460" elevation="3" outlined>
           <v-card-title>
             Bienvenido
           </v-card-title>
           <v-card-text>
             <v-text-field v-model="correo" label="Correo" prepend-icon="mdi-account-circle"></v-text-field>
             <v-text-field v-model="contrasena" prepend-icon="mdi-lock" label="Contraseña" :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'"
              :type="mostrar ? 'text' : 'password'" name="input-10-1" counter @click:append="mostrar = !mostrar"></v-text-field>
             <v-card-actions class="my-n4">
               <v-card-text>
                 ¿No recuerdas tu contraseña?
               </v-card-text>
               <v-btn :class="vBtn" class="white--text" color="#65727c" small :disabled="vBtnIngreso" @click="ingreso()">Ingresar</v-btn>
             </v-card-actions>
           </v-card-text>
         </v-card>
     </v-main>
  </v-app>
 </template>
 
 <script>
import Swal from 'sweetalert2';
 export default {
    data() {
     return {
       correo:null,
       contrasena:"",
       vBtnIngreso:true,
       alumnos:[],
       mostrar:null
     };
   },
   computed: {
      vBtn() {
        if (this.correo=="" || this.contrasena=="") {
          this.vBtnIngreso = true
        } else {
          this.vBtnIngreso = false
        }
      },
    },
    methods:{
      ingreso(){
        this.axios.get("todos_alumnos")
          .then((response) => {
            this.alumnos = response.data;
            var ingresado=false
            var id=null
            for(var i=0; i<this.alumnos.length;i++){
              if(this.alumnos[i].correo === this.correo && this.alumnos[i].contrasena===this.contrasena){
                id=this.alumnos[i]._id
                ingresado=true
              }
            }
            if(ingresado){
              localStorage.setItem("key_usuario",id);
              this.$router.push({ path: "/Alumno" })
              Swal.fire(
                'Ingreso!',
                'Has ingresado correctamente!',
                'success'
              )
            }else{
              Swal.fire(
                'Error!',
                'Has ingresado incorrectamente!',
                'error'
              )
            }
          })
          .catch((e) => {
            console.log('error' + e);
        })
      }
    }
 }
 </script>