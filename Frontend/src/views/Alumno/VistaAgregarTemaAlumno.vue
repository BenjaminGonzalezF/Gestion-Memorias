<template>
    <v-app>
        <div align="center">
            <v-col lass="px-4">
                <h1>
                    Agregar tema
                </h1>
                <v-card height="60%" width="95%" outlined class="overflow-y-auto" max-height="600" color="#F4F4F4">
                    <v-col>
                        <v-text-field
                            label="Titulo"
                            outlined
                            dense
                            v-model="datosTitulo"
                        ></v-text-field>
                        <v-textarea
                            name="input-7-1"
                            filled
                            label="Descripción"
                            auto-grow
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                            v-model="datosdescripcion"
                            ></v-textarea>
                        <v-select v-model="estadoselect" :items="listaprofesores" label="Seleccionar Profesor Guia"></v-select>
                        <v-btn color="#f5a42a" @click="datos(datosTitulo,datosdescripcion,estadoselect)">
                            Guardar Tema y Enviar Solicitud
                        </v-btn>
                    </v-col>
                    
                </v-card>
            </v-col>    
        </div>
    </v-app>
</template>


<script>
export default {
    data() {
        return {
            listaprofesores: ["Profesor1","Profesor2","Profesor3","Profesor4","Profesor5"],
            estadoselect: null,
            nombre: null,
            datosdescripcion: null,
            datosTitulo: null,

        };
    },
    created() {
        this.cargar_datos()
    },

    methods: {
        cargar_datos() {
            this.nombre = this.$store.state.nombre
        },
        datos(titulo,descripcion,profesor){
            console.log("titulo: "+titulo)
            console.log("descrip: "+descripcion)
            console.log("profesor: "+profesor)
            //this.$store.state.id_tema_solicitar = id
            this.$store.state.id_tema_solicitar = "nuevo tema"
            console.log("idtema "+ this.$store.state.id_tema_solicitar)
            this.$store.state.vistaSeleccionada=3

        }
    }  
}

</script>