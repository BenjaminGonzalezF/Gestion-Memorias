<template>
    <div>
        <header-profe></header-profe>
        <div class="elementos">
            <div class="elemento1">
                <div class="caja">
                    <div class="columnas">
                        <b>Su tema ha sido aprobado con exito</b>
                    </div>
                    <v-img class="columnas espacio" max-height="50" max-width="40" height="auto" width="auto" src="@/assets/check.png" ></v-img>
                </div>
                <div class="boton">
                    <v-btn> Descarga el documento</v-btn>
                    <v-img max-height="50" max-width="40" height="auto" width="auto" src="@/assets/download.png" ></v-img>
                </div>
            </div>
            <div class="elemento2">
                <h2>Información</h2>
                <div class="caja2">
                    <div v-for="(tema, index) in tema" :key="index">
                        <p>{{index}} : {{tema}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import headerProfe from '@/components/headerProfe.vue'
export default {
  components: { headerProfe },
    data (){
        return{
            idTema: "",
            tema: {"Nombre Alumno" : "Fernando Gonzalez", "Nombre del tema" : "ejemplo proyecto 2","Profesor Guía" : "Rodrigo Pavez" , "Detalles del tema": "jasdkasdjasdkj"},
        }
    },
    created(){
        this.idTema = this.$route.params.id;
    }
}
</script>

<style>
    .elementos{
        margin-top: 10%;
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
    }
    .caja2{
        border: 3px solid black;
    }

    .elemento1{
        display: flex;
        gap: 7%;
        width: 60%;
    }
    .elemento2{
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 60%;
    }
    .caja { 
        height: 70px;
        border: 3px solid black; 
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .columnas{
        display: inline-block;
    }
    .espacio{
        margin-left: 10px;
    }
    .boton{
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
    }

</style>